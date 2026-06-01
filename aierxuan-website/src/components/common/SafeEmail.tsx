'use client'

import { useEffect, useState } from 'react'
import type { EmailParts } from '@/lib/public-contact'
import { PUBLIC_CONTACT_EMAIL } from '@/lib/public-contact'

type SafeEmailProps = Partial<EmailParts> & {
  className?: string
}

type SafeEmailTextProps = SafeEmailProps & {
  prefix?: string
  suffix?: string
}

function resolveParts({ local, domain }: SafeEmailProps): EmailParts {
  return {
    local: local || PUBLIC_CONTACT_EMAIL.local,
    domain: domain || PUBLIC_CONTACT_EMAIL.domain,
  }
}

function ObfuscatedText({ local, domain }: EmailParts) {
  return (
    <>
      <span>{local}</span>
      <span aria-hidden="true"> [at] </span>
      <span>{domain}</span>
    </>
  )
}

export function SafeEmail({ local, domain, className }: SafeEmailProps) {
  const [hydrated, setHydrated] = useState(false)
  const parts = resolveParts({ local, domain })

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return (
      <span className={className}>
        <ObfuscatedText {...parts} />
      </span>
    )
  }

  const email = `${parts.local}@${parts.domain}`
  return (
    <a className={className} href={`mailto:${email}`}>
      {email}
    </a>
  )
}

export function SafeEmailText({
  prefix,
  suffix,
  local,
  domain,
  className,
}: SafeEmailTextProps) {
  return (
    <span className={className}>
      {prefix ? `${prefix} ` : ''}
      <SafeEmail local={local} domain={domain} />
      {suffix ? ` ${suffix}` : ''}
    </span>
  )
}
