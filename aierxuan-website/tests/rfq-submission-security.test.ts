import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  consumeRFQRateLimit,
  createRFQEmailContent,
  getClientIp,
  isAllowedRequestOrigin,
  parseMailbox,
  resetRFQRateLimitsForTests,
  rfqSubmissionSchema,
} from '../src/lib/rfq-submission'

test('server schema rejects client-controlled administration fields', () => {
  const result = rfqSubmissionSchema.safeParse({
    email: 'buyer@example.com',
    formType: 'finalcta',
    status: 'quoted',
    assigned_to: '00000000-0000-0000-0000-000000000000',
  })

  assert.equal(result.success, false)
})

test('server schema enforces form-specific required fields', () => {
  const invalidContact = rfqSubmissionSchema.safeParse({
    email: 'buyer@example.com',
    formType: 'contact',
    name: 'Buyer',
    company: 'Example Ltd',
    message: 'short',
  })
  const validFinalCTA = rfqSubmissionSchema.safeParse({
    email: 'BUYER@EXAMPLE.COM',
    formType: 'finalcta',
    languageCode: 'en',
  })

  assert.equal(invalidContact.success, false)
  assert.equal(validFinalCTA.success, true)
  if (validFinalCTA.success) assert.equal(validFinalCTA.data.email, 'buyer@example.com')
})

test('mailbox parser rejects CRLF and accepts a display-name mailbox', () => {
  assert.equal(parseMailbox('sales@example.com\r\nBcc: attacker@example.com'), null)
  assert.deepEqual(parseMailbox('AIERXUAN <sales@example.com>'), {
    address: 'sales@example.com',
  })
})

test('email headers never contain raw user-controlled subject lines', () => {
  const parsed = rfqSubmissionSchema.parse({
    email: 'buyer@example.com',
    formType: 'finalcta',
    productInterest: 'Mini PC\r\nBcc: attacker@example.com',
    message: 'Hello\r\n.\r\nMAIL FROM:<attacker@example.com>',
  })
  const content = createRFQEmailContent(
    parsed,
    '203.0.113.5',
    { address: 'sender@example.com' },
    { address: 'sales@example.com' },
  )
  const [headers, encodedBody] = content.split('\r\n\r\n')

  assert.match(headers, /^Subject: =\?UTF-8\?B\?/m)
  assert.doesNotMatch(headers, /Bcc: attacker@example.com/)
  assert.doesNotMatch(content, /\r\n\.\r\nMAIL FROM:/)
  assert.match(Buffer.from(encodedBody.replace(/\r\n/g, ''), 'base64').toString('utf8'), /MAIL FROM/)
})

test('client IP parsing accepts only valid proxy addresses', () => {
  assert.equal(getClientIp(new Headers({ 'x-real-ip': 'not-an-ip' })), null)
  assert.equal(
    getClientIp(new Headers({ 'x-forwarded-for': '203.0.113.10, 10.0.0.1' })),
    '203.0.113.10',
  )
})

test('same-site origin check rejects a foreign browser origin', () => {
  const headers = new Headers({
    host: 'www.aierxuanlaptop.com',
    origin: 'https://attacker.example',
  })

  assert.equal(
    isAllowedRequestOrigin(headers, 'https://www.aierxuanlaptop.com'),
    false,
  )
})

test('in-memory limiter blocks the fourth hourly request for one email', () => {
  resetRFQRateLimitsForTests()

  assert.equal(consumeRFQRateLimit(null, 'buyer@example.com').allowed, true)
  assert.equal(consumeRFQRateLimit(null, 'buyer@example.com').allowed, true)
  assert.equal(consumeRFQRateLimit(null, 'buyer@example.com').allowed, true)
  assert.equal(consumeRFQRateLimit(null, 'buyer@example.com').allowed, false)
})

test('all public forms submit only through the secure server endpoint', () => {
  const formFiles = [
    '../src/components/forms/RFQForm.tsx',
    '../src/components/ui/ContactModal.tsx',
    '../src/components/features/FinalCTA.tsx',
  ]

  for (const file of formFiles) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8')
    assert.doesNotMatch(source, /createSupabaseClient/)
    assert.doesNotMatch(source, /\.from\(['"]rfqs['"]\)/)
    assert.match(source, /await fetch\(['"]\/api\/send-rfq-email['"]/)
    assert.match(source, /if \(!response\.ok\)/)
  }
})
