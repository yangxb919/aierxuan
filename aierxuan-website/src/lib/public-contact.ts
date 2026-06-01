export const PUBLIC_CONTACT_EMAIL = {
  local: 'admin',
  domain: 'aierxuanlaptop.com',
} as const

export type EmailParts = {
  local: string
  domain: string
}

export function publicEmailParts(): EmailParts {
  return PUBLIC_CONTACT_EMAIL
}

export function splitPublicEmailText(text?: string | null) {
  const value = text ?? ''
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)

  if (!match) {
    return {
      prefix: value,
      suffix: '',
      email: PUBLIC_CONTACT_EMAIL,
    }
  }

  return {
    prefix: value.slice(0, match.index).trimEnd(),
    suffix: value.slice((match.index ?? 0) + match[0].length).trimStart(),
    email: PUBLIC_CONTACT_EMAIL,
  }
}
