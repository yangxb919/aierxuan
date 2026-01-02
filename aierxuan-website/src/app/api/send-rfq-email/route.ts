import { NextRequest, NextResponse } from 'next/server'
import * as net from 'net'
import * as tls from 'tls'

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER
const ADMIN_EMAIL = process.env.SMTP_TEST_TO || SMTP_USER

interface FormData {
  name?: string
  email: string
  company?: string
  phone?: string
  productInterest?: string
  message?: string
  quantity?: string
  country?: string
  industry?: string
  urgency?: string
  budgetRange?: string
  pageUrl?: string
  formType?: string
}

function createEmailContent(data: FormData, ip: string): string {
  const now = new Date().toUTCString()
  const urgencyMap: Record<string, string> = {
    normal: 'Normal',
    urgent: 'Urgent',
    flexible: 'Flexible'
  }

  const formTypeLabel = data.formType === 'contact' ? 'Contact Form' :
                        data.formType === 'finalcta' ? 'Final CTA Form' : 'RFQ Form'

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
- Urgency: ${data.urgency ? (urgencyMap[data.urgency] || data.urgency) : 'Not specified'}

Message:
${data.message || 'No message provided'}

---
Submission Details:
- IP Address: ${ip}
- Page URL: ${data.pageUrl || 'Not available'}
- Submitted at: ${now}
`.trim()

  const subject = data.formType === 'contact'
    ? `Contact: ${data.name || 'Anonymous'} - ${data.company || 'No Company'}`
    : `New RFQ: ${data.productInterest || 'General Inquiry'} - ${data.company || data.name || 'Anonymous'}`

  return [
    `From: ${SMTP_FROM}`,
    `To: ${ADMIN_EMAIL}`,
    `Subject: ${subject}`,
    `Date: ${now}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    body
  ].join('\r\n')
}

async function sendEmail(data: FormData, ip: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let buffer = ''
    let socket: net.Socket | tls.TLSSocket = net.createConnection({ host: SMTP_HOST, port: SMTP_PORT })
    socket.setTimeout(30000)

    const readLine = (): Promise<string> => {
      return new Promise((res) => {
        const check = () => {
          const idx = buffer.indexOf('\n')
          if (idx !== -1) {
            const line = buffer.slice(0, idx + 1)
            buffer = buffer.slice(idx + 1)
            res(line)
          } else {
            socket.once('data', (chunk) => {
              buffer += chunk.toString()
              check()
            })
          }
        }
        check()
      })
    }

    const expectCode = async (expected: number) => {
      const line = await readLine()
      const code = parseInt(line.slice(0, 3))
      if (code !== expected) throw new Error(`Expected ${expected}, got: ${line}`)
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
      buffer = ''

      writeLine('EHLO localhost')
      line = await readLine()
      while (line.charAt(3) === '-') line = await readLine()

      writeLine('AUTH LOGIN')
      await expectCode(334)
      writeLine(Buffer.from(SMTP_USER).toString('base64'))
      await expectCode(334)
      writeLine(Buffer.from(SMTP_PASS).toString('base64'))
      await expectCode(235)

      writeLine(`MAIL FROM:<${SMTP_FROM}>`)
      await expectCode(250)
      writeLine(`RCPT TO:<${ADMIN_EMAIL}>`)
      await expectCode(250)
      writeLine('DATA')
      await expectCode(354)

      socket.write(createEmailContent(data, ip) + '\r\n.\r\n')
      await expectCode(250)

      writeLine('QUIT')
      socket.end()
      resolve()
    }

    socket.on('error', reject)
    socket.on('timeout', () => reject(new Error('SMTP timeout')))
    run().catch(reject)
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ error: 'SMTP not configured' }, { status: 500 })
    }

    const data: FormData = await request.json()

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'Unknown'

    await sendEmail(data, ip)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
