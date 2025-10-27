'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return null
  return <Navbar />
}

