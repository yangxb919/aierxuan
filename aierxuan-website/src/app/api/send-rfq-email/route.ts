import { NextRequest, NextResponse } from 'next/server'
import * as net from 'node:net'
import * as tls from 'node:tls'
import { createSupabaseAdminClient } from '@/lib/supabase'
import {
  consumeRFQRateLimit,
  createRFQEmailContent,
  getClientIp,
  isAllowedRequestOrigin,
  parseMailbox,
  rfqSubmissionSchema,
  type RFQSubmission,
  type Mailbox,
} from '@/lib/rfq-submission'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16 * 1024
const IP_HOURLY_LIMIT = 10
const EMAIL_DAILY_LIMIT = 3
const DEFAULT_GLOBAL_DAILY_LIMIT = 50

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER
const ADMIN_EMAIL = process.env.SMTP_TEST_TO || SMTP_USER

function jsonResponse(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

function getGlobalDailyLimit(value: unknown): number {
  const parsed = typeof value === 'number'
    ? value
    : typeof value === 'string'
      ? Number(value)
      : Number.NaN

  return Number.isInteger(parsed) && parsed > 0 && parsed <= 10_000
    ? parsed
    : DEFAULT_GLOBAL_DAILY_LIMIT
}

async function checkPersistentRateLimits(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  ip: string | null,
  email: string,
): Promise<{ allowed: boolean; unavailable?: boolean }> {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1_000).toISOString()
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1_000).toISOString()

  const ipCountQuery = ip
    ? supabase
        .from('rfqs')
        .select('id', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gte('created_at', hourAgo)
    : Promise.resolve({ count: 0, error: null })

  const [ipResult, emailResult, globalResult, settingResult] = await Promise.all([
    ipCountQuery,
    supabase
      .from('rfqs')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', dayAgo),
    supabase
      .from('rfqs')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', dayAgo),
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'max_rfqs_per_day')
      .maybeSingle(),
  ])

  if (ipResult.error || emailResult.error || globalResult.error || settingResult.error) {
    console.error('RFQ rate-limit storage unavailable')
    return { allowed: false, unavailable: true }
  }

  const globalDailyLimit = getGlobalDailyLimit(settingResult.data?.value)
  return {
    allowed:
      (ipResult.count || 0) < IP_HOURLY_LIMIT &&
      (emailResult.count || 0) < EMAIL_DAILY_LIMIT &&
      (globalResult.count || 0) < globalDailyLimit,
  }
}

async function sendEmail(
  data: RFQSubmission,
  ip: string | null,
  from: Mailbox,
  to: Mailbox,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let buffer = ''
    let settled = false
    let socket: net.Socket | tls.TLSSocket = net.createConnection({
      host: SMTP_HOST,
      port: SMTP_PORT,
    })

    const finish = (error?: Error) => {
      if (settled) return
      settled = true
      if (error) {
        socket.destroy()
        reject(error)
      } else {
        resolve()
      }
    }

    const handleSocketError = (error: Error) => finish(error)
    const handleSocketTimeout = () => finish(new Error('SMTP timeout'))
    const attachSocketHandlers = () => {
      socket.on('error', handleSocketError)
      socket.on('timeout', handleSocketTimeout)
      socket.setTimeout(30_000)
    }

    attachSocketHandlers()

    const readLine = (): Promise<string> => new Promise((lineResolve) => {
      const check = () => {
        const index = buffer.indexOf('\n')
        if (index !== -1) {
          const line = buffer.slice(0, index + 1)
          buffer = buffer.slice(index + 1)
          lineResolve(line)
          return
        }

        socket.once('data', chunk => {
          buffer += chunk.toString()
          check()
        })
      }

      check()
    })

    const expectCode = async (expected: number) => {
      const line = await readLine()
      const code = Number.parseInt(line.slice(0, 3), 10)
      if (code !== expected) {
        throw new Error(`Unexpected SMTP response code ${code || 'unknown'}`)
      }
    }

    const writeLine = (line: string) => socket.write(`${line}\r\n`)

    const run = async () => {
      await expectCode(220)
      writeLine('EHLO localhost')
      let line = await readLine()
      while (line.charAt(3) === '-') line = await readLine()

      writeLine('STARTTLS')
      await expectCode(220)

      socket = tls.connect({ socket, servername: SMTP_HOST, minVersion: 'TLSv1.2' })
      attachSocketHandlers()
      buffer = ''

      writeLine('EHLO localhost')
      line = await readLine()
      while (line.charAt(3) === '-') line = await readLine()

      writeLine('AUTH LOGIN')
      await expectCode(334)
      writeLine(Buffer.from(SMTP_USER, 'utf8').toString('base64'))
      await expectCode(334)
      writeLine(Buffer.from(SMTP_PASS, 'utf8').toString('base64'))
      await expectCode(235)

      writeLine(`MAIL FROM:<${from.address}>`)
      await expectCode(250)
      writeLine(`RCPT TO:<${to.address}>`)
      await expectCode(250)
      writeLine('DATA')
      await expectCode(354)

      socket.write(`${createRFQEmailContent(data, ip, from, to)}\r\n.\r\n`)
      await expectCode(250)

      writeLine('QUIT')
      socket.end()
      finish()
    }

    run().catch(error => finish(error instanceof Error ? error : new Error('SMTP failure')))
  })
}

export async function POST(request: NextRequest) {
  if (!isAllowedRequestOrigin(
    request.headers,
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aierxuanlaptop.com',
  )) {
    return jsonResponse({ error: 'Request origin not allowed' }, 403)
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonResponse({ error: 'Content-Type must be application/json' }, 415)
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Request body too large' }, 413)
  }

  let rawBody = ''
  try {
    rawBody = await request.text()
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400)
  }

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return jsonResponse({ error: 'Request body too large' }, 413)
  }

  let rawData: unknown
  try {
    rawData = JSON.parse(rawBody)
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400)
  }

  const parsed = rfqSubmissionSchema.safeParse(rawData)
  if (!parsed.success) {
    return jsonResponse({ error: 'Invalid form data' }, 400)
  }

  const data = parsed.data

  // Honeypot submissions receive a neutral response but are not stored or sent.
  if (data.website) {
    return jsonResponse({ success: true }, 202)
  }

  const ip = getClientIp(request.headers)
  const memoryLimit = consumeRFQRateLimit(ip, data.email)
  if (!memoryLimit.allowed) {
    return jsonResponse(
      { error: 'Too many requests. Please try again later.' },
      429,
      { 'Retry-After': String(memoryLimit.retryAfterSeconds) },
    )
  }

  let supabase: ReturnType<typeof createSupabaseAdminClient>
  try {
    supabase = createSupabaseAdminClient()
  } catch {
    console.error('RFQ persistence is not configured')
    return jsonResponse({ error: 'Submission service temporarily unavailable' }, 503)
  }

  let persistentLimit: Awaited<ReturnType<typeof checkPersistentRateLimits>>
  try {
    persistentLimit = await checkPersistentRateLimits(supabase, ip, data.email)
  } catch {
    console.error('RFQ rate-limit check failed')
    return jsonResponse({ error: 'Submission service temporarily unavailable' }, 503)
  }
  if (!persistentLimit.allowed) {
    if (persistentLimit.unavailable) {
      return jsonResponse({ error: 'Submission service temporarily unavailable' }, 503)
    }

    return jsonResponse(
      { error: 'Too many requests. Please try again later.' },
      429,
      { 'Retry-After': '3600' },
    )
  }

  const { error: insertError } = await supabase.from('rfqs').insert({
    name: data.name || '',
    email: data.email,
    company: data.company || null,
    phone: data.phone || null,
    product_interest: data.productInterest || null,
    message: data.message || null,
    quantity: data.quantity || null,
    budget_range: data.budgetRange || null,
    country: data.country || null,
    industry: data.industry || null,
    urgency: data.urgency,
    status: 'new',
    priority: 'medium',
    assigned_to: null,
    source: 'website',
    ip_address: ip,
    user_agent: request.headers.get('user-agent')?.slice(0, 1_000) || null,
    referrer: data.referrer || data.pageUrl || null,
    language_code: data.languageCode,
    contacted_at: null,
    admin_notes: null,
    follow_up_date: null,
  })

  if (insertError) {
    console.error('RFQ persistence failed:', insertError.code)
    return jsonResponse({ error: 'Submission service temporarily unavailable' }, 503)
  }

  const from = parseMailbox(SMTP_FROM)
  const to = parseMailbox(ADMIN_EMAIL)
  const smtpReady =
    SMTP_HOST &&
    SMTP_USER &&
    SMTP_PASS &&
    Number.isInteger(SMTP_PORT) &&
    SMTP_PORT > 0 &&
    SMTP_PORT <= 65_535 &&
    from &&
    to

  if (smtpReady && from && to) {
    try {
      await sendEmail(data, ip, from, to)
    } catch {
      // The lead is already stored. Do not make the customer resubmit and create
      // a duplicate because the notification transport is temporarily down.
      console.error('RFQ notification email failed after persistence')
    }
  } else {
    console.error('RFQ notification email is not safely configured')
  }

  return jsonResponse({ success: true }, 201)
}
