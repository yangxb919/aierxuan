'use client'

import dynamic from 'next/dynamic'
import { useAppStore } from '@/store/useAppStore'

const ContactModal = dynamic(
  () => import('./ContactModal').then((m) => m.ContactModal),
  { ssr: false }
)

export function ContactModalLazy() {
  const isOpen = useAppStore((s) => s.contactModalOpen)
  if (!isOpen) return null
  return <ContactModal />
}

