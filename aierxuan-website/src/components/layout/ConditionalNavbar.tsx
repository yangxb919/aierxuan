'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { type Locale } from '@/i18n-config'

interface ConditionalNavbarProps {
  dictionary: any // Using any for now to avoid duplicating the full type, or import it
  lang: Locale
}

export function ConditionalNavbar({ dictionary, lang }: ConditionalNavbarProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.includes('/admin')

  if (isAdmin) {
    return null
  }

  return <Navbar dictionary={dictionary} lang={lang} />
}
