import { isIP } from 'node:net'
import { z } from 'zod'

const optionalText = (maxLength: number) =>
  z.string().trim().max(maxLength)
    .refine(value => !value.includes('\u0000'), 'Invalid text')
    .optional().transform(value => value || undefined)

const optionalPositiveInteger = z.preprocess(
  value => {
    if (value === '' || value === null || value === undefined) return undefined
    return typeof value === 'string' ? Number(value) : value
  },
  z.number().int().positive().max(2_147_483_647).optional(),
)

export const rfqSubmissionSchema = z.object({
  name: optionalText(100),
  email: z.string().trim().toLowerCase().email().max(254),
  company: optionalText(200),
  phone: optionalText(50),
  productInterest: optionalText(200),
  message: optionalText(4_000),
  quantity: optionalPositiveInteger,
  country: optionalText(100),
  industry: optionalText(100),
  urgency: z.enum(['normal', 'urgent', 'flexible']).default('normal'),
  budgetRange: optionalText(100),
  pageUrl: z.string().trim().max(2_048).url().optional(),
  referrer: optionalText(2_048),
  languageCode: z.enum(['zh-CN', 'en', 'ru', 'ja', 'fr', 'pt']).default('en'),
  formType: z.enum(['rfq', 'contact', 'finalcta']),
  website: optionalText(200),
}).strict().superRefine((data, context) => {
  const requireField = (
    field: 'name' | 'company' | 'productInterest' | 'message',
    minLength: number,
  ) => {
    if (!data[field] || data[field]!.length < minLength) {
      context.addIssue({
        code: 'custom',
        path: [field],
        message: `${field} is required`,
      })
    }
  }

  if (data.formType === 'rfq') {
    requireField('name', 2)
    requireField('company', 2)
    requireField('productInterest', 2)
    requireField('message', 10)
  }

  if (data.formType === 'contact') {
    requireField('name', 1)
    requireField('company', 1)
    requireField('message', 10)
  }
})

export type RFQSubmission = z.infer<typeof rfqSubmissionSchema>

export interface Mailbox {
  address: string
}

export function parseMailbox(value: string): Mailbox | null {
  const trimmed = value.trim()
  if (!trimmed || /[\r\n]/.test(trimmed)) return null

  const angleMatch = trimmed.match(/^[^<>]*<([^<>]+)>$/)
  const address = (angleMatch?.[1] || trimmed).trim().toLowerCase()
  const parsed = z.string().email().max(254).safeParse(address)

  return parsed.success ? { address: parsed.data } : null
}

export function getClientIp(headers: Headers): string | null {
  const candidates = [
    headers.get('cf-connecting-ip'),
    headers.get('x-real-ip'),
    headers.get('x-forwarded-for')?.split(',')[0],
  ]

  for (const candidate of candidates) {
    const value = candidate?.trim()
    if (value && isIP(value)) return value
  }

  return null
}

export function isAllowedRequestOrigin(headers: Headers, configuredSiteUrl?: string): boolean {
  const originHeader = headers.get('origin')
  if (!originHeader) return true

  try {
    const originHost = new URL(originHeader).host.toLowerCase()
    const requestHost = (
      headers.get('x-forwarded-host') || headers.get('host') || ''
    ).split(',')[0].trim().toLowerCase()
    const configuredHost = configuredSiteUrl
      ? new URL(configuredSiteUrl).host.toLowerCase()
      : ''

    return originHost === requestHost || originHost === configuredHost
  } catch {
    return false
  }
}

const rateLimitRecords = new Map<string, { count: number; resetAt: number }>()

const IN_MEMORY_LIMITS = {
  ip: { max: 5, windowMs: 10 * 60 * 1_000 },
  email: { max: 3, windowMs: 60 * 60 * 1_000 },
} as const

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds: number
}

export function consumeRFQRateLimit(ip: string | null, email: string): RateLimitResult {
  const now = Date.now()
  const checks = [
    ...(ip ? [{ key: `ip:${ip}`, ...IN_MEMORY_LIMITS.ip }] : []),
    { key: `email:${email.toLowerCase()}`, ...IN_MEMORY_LIMITS.email },
  ]

  let retryAfterMs = 0
  for (const check of checks) {
    const record = rateLimitRecords.get(check.key)
    if (record && record.resetAt > now && record.count >= check.max) {
      retryAfterMs = Math.max(retryAfterMs, record.resetAt - now)
    }
  }

  if (retryAfterMs > 0) {
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1_000) }
  }

  for (const check of checks) {
    const record = rateLimitRecords.get(check.key)
    if (!record || record.resetAt <= now) {
      rateLimitRecords.set(check.key, { count: 1, resetAt: now + check.windowMs })
    } else {
      record.count += 1
    }
  }

  if (rateLimitRecords.size > 10_000) {
    for (const [key, record] of rateLimitRecords) {
      if (record.resetAt <= now) rateLimitRecords.delete(key)
    }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

export function resetRFQRateLimitsForTests(): void {
  rateLimitRecords.clear()
}

function encodeHeader(value: string): string {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`
}

function encodeBody(value: string): string {
  const encoded = Buffer.from(value, 'utf8').toString('base64')
  return encoded.match(/.{1,76}/g)?.join('\r\n') || ''
}

export function createRFQEmailContent(
  data: RFQSubmission,
  ip: string | null,
  from: Mailbox,
  to: Mailbox,
): string {
  const now = new Date().toUTCString()
  const urgencyMap: Record<RFQSubmission['urgency'], string> = {
    normal: 'Normal',
    urgent: 'Urgent',
    flexible: 'Flexible',
  }
  const formTypeLabel = data.formType === 'contact'
    ? 'Contact Form'
    : data.formType === 'finalcta'
      ? 'Final CTA Form'
      : 'RFQ Form'
  const subject = data.formType === 'contact'
    ? `Contact: ${data.name || 'Anonymous'} - ${data.company || 'No Company'}`
    : `New RFQ: ${data.productInterest || 'General Inquiry'} - ${data.company || data.name || 'Anonymous'}`
  const body = `
New Inquiry from AIERXUAN Website
=========================================
Form Type: ${formTypeLabel}

Contact Information:
- Name: ${data.name || 'Not provided'}
- Email: ${data.email}
- Company: ${data.company || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
- Country: ${data.country || 'Not provided'}
- Industry: ${data.industry || 'Not provided'}

Product Information:
- Product Interest: ${data.productInterest || 'Not specified'}
- Quantity: ${data.quantity || 'Not specified'}
- Budget Range: ${data.budgetRange || 'Not specified'}
- Urgency: ${urgencyMap[data.urgency]}

Message:
${data.message || 'No message provided'}

---
Submission Details:
- IP Address: ${ip || 'Unknown'}
- Page URL: ${data.pageUrl || 'Not available'}
- Submitted at: ${now}
`.trim()

  return [
    `From: ${from.address}`,
    `To: ${to.address}`,
    `Reply-To: ${data.email}`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${now}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    encodeBody(body),
  ].join('\r\n')
}
