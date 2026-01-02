/* eslint-disable no-console */
const net = require('net')
const tls = require('tls')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT || 0)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER
const SMTP_TEST_TO = process.env.SMTP_TEST_TO
const SMTP_TEST_SUBJECT = process.env.SMTP_TEST_SUBJECT || 'SMTP Test - AIERXUAN'

function mask(value) {
  if (!value) return '(empty)'
  if (value.length <= 4) return '*'.repeat(value.length)
  return `${value.slice(0, 2)}***${value.slice(-2)}`
}

function createLineReader(socket) {
  let buffer = ''
  const queue = []
  const waiters = []

  socket.on('data', (chunk) => {
    buffer += chunk.toString('utf8')
    while (true) {
      const idx = buffer.indexOf('\n')
      if (idx === -1) break
      const line = buffer.slice(0, idx + 1)
      buffer = buffer.slice(idx + 1)
      queue.push(line)
      const w = waiters.shift()
      if (w) w()
    }
  })

  socket.on('error', () => {
    const w = waiters.shift()
    if (w) w()
  })

  return {
    async readLine() {
      if (queue.length > 0) return queue.shift()
      await new Promise((resolve) => waiters.push(resolve))
      return queue.shift()
    },
  }
}

async function readReply(reader) {
  // Handles multiline replies: "250-..." then "250 ..."
  const lines = []
  let firstCode = null
  while (true) {
    const line = await reader.readLine()
    if (!line) throw new Error('Connection closed while waiting for SMTP reply')
    const trimmed = line.toString().trimEnd()
    lines.push(trimmed)

    const m = trimmed.match(/^(\d{3})([ -])(.*)$/)
    if (!m) continue
    const code = Number(m[1])
    const sep = m[2]
    if (firstCode == null) firstCode = code
    if (sep === ' ' && code === firstCode) {
      return { code, lines }
    }
  }
}

function writeLine(socket, line) {
  socket.write(`${line}\r\n`)
}

async function expectCode(reader, expected) {
  const reply = await readReply(reader)
  if (reply.code !== expected) {
    const msg = reply.lines.join('\n')
    throw new Error(`Unexpected SMTP reply: expected ${expected}, got ${reply.code}\n${msg}`)
  }
  return reply
}

async function smtpAuthLogin(socket, reader, user, pass) {
  writeLine(socket, 'AUTH LOGIN')
  await expectCode(reader, 334)
  writeLine(socket, Buffer.from(user, 'utf8').toString('base64'))
  await expectCode(reader, 334)
  writeLine(socket, Buffer.from(pass, 'utf8').toString('base64'))
  await expectCode(reader, 235)
}

async function sendTestMail(socket, reader) {
  if (!SMTP_FROM) throw new Error('Missing SMTP_FROM (or SMTP_USER)')
  if (!SMTP_TEST_TO) throw new Error('Missing SMTP_TEST_TO')

  writeLine(socket, `MAIL FROM:<${SMTP_FROM}>`)
  await expectCode(reader, 250)

  writeLine(socket, `RCPT TO:<${SMTP_TEST_TO}>`)
  await expectCode(reader, 250)

  writeLine(socket, 'DATA')
  await expectCode(reader, 354)

  const now = new Date().toUTCString()
  const message =
    [
      `From: ${SMTP_FROM}`,
      `To: ${SMTP_TEST_TO}`,
      `Subject: ${SMTP_TEST_SUBJECT}`,
      `Date: ${now}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      '',
      'This is a test email sent from the AIERXUAN local environment.',
      `Time: ${now}`,
      '',
      'If you received this, your SMTP configuration is working.',
    ].join('\r\n') + '\r\n'

  socket.write(message)
  socket.write('\r\n.\r\n')
  await expectCode(reader, 250)
}

async function main() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error('Missing required env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS')
    process.exit(1)
  }

  console.log('SMTP config:')
  console.log(`- SMTP_HOST: ${SMTP_HOST}`)
  console.log(`- SMTP_PORT: ${SMTP_PORT}`)
  console.log(`- SMTP_USER: ${mask(SMTP_USER)}`)
  console.log(`- SMTP_PASS: ${mask(SMTP_PASS)}`)
  console.log(`- SMTP_FROM: ${SMTP_FROM ? mask(SMTP_FROM) : '(empty)'}`)
  console.log(`- SMTP_TEST_TO: ${SMTP_TEST_TO ? mask(SMTP_TEST_TO) : '(not set)'}`)

  const rawSocket = net.createConnection({ host: SMTP_HOST, port: SMTP_PORT })
  rawSocket.setTimeout(20_000)

  rawSocket.on('timeout', () => {
    rawSocket.destroy(new Error('SMTP connection timeout'))
  })

  let socket = rawSocket
  let reader = createLineReader(socket)

  await expectCode(reader, 220)
  writeLine(socket, 'EHLO localhost')
  const ehlo1 = await readReply(reader)
  if (ehlo1.code !== 250) {
    throw new Error(`EHLO failed:\n${ehlo1.lines.join('\n')}`)
  }

  const supportsStartTls = ehlo1.lines.some((l) => /STARTTLS/i.test(l))
  if (!supportsStartTls) {
    throw new Error('Server did not advertise STARTTLS on this port')
  }

  writeLine(socket, 'STARTTLS')
  await expectCode(reader, 220)

  socket = tls.connect({
    socket,
    servername: SMTP_HOST,
    minVersion: 'TLSv1.2',
  })
  socket.setTimeout(20_000)
  socket.on('timeout', () => socket.destroy(new Error('SMTP TLS socket timeout')))
  reader = createLineReader(socket)

  writeLine(socket, 'EHLO localhost')
  const ehlo2 = await readReply(reader)
  if (ehlo2.code !== 250) {
    throw new Error(`EHLO (after STARTTLS) failed:\n${ehlo2.lines.join('\n')}`)
  }

  await smtpAuthLogin(socket, reader, SMTP_USER, SMTP_PASS)
  console.log('✅ SMTP auth succeeded')

  if (SMTP_TEST_TO) {
    await sendTestMail(socket, reader)
    console.log(`✅ Test email accepted for delivery to ${mask(SMTP_TEST_TO)}`)
  } else {
    console.log('ℹ️  SMTP_TEST_TO not set; skipped sending test email (auth-only check).')
    console.log('    To send a real test email, set SMTP_TEST_TO in .env.local and rerun this script.')
  }

  writeLine(socket, 'QUIT')
  await readReply(reader).catch(() => {})
  socket.end()
}

main().catch((err) => {
  console.error('❌ SMTP test failed:')
  console.error(err?.message || err)
  process.exit(1)
})

