'use client'

import { useState } from 'react'
import { HeroSection, FAQAccordion, ContactCTA } from '@/components/faq'

interface FAQPageClientProps {
  texts: {
    hero: {
      title: string
      subtitle: string
      searchPlaceholder: string
    }
    categories: Array<{
      title: string
      icon: string
      items: Array<{
        question: string
        answer: string
      }>
    }>
    contact: {
      title: string
      subtitle: string
      contactButton: string
      emailLabel: string
      emailValue: string
      phoneLabel: string
      phoneValue: string
    }
  }
  lang: string
}

export default function FAQPageClient({ texts, lang }: FAQPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#05060a] via-[#05060a] to-[#070b18] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(900px 500px at 20% 0%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(900px 520px at 90% 20%, rgba(34,211,238,0.12), transparent 62%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
          }}
        />
      </div>

      <div className="relative">
        {/* Hero Section with Search */}
        <HeroSection texts={texts.hero} onSearch={setSearchQuery} />

        {/* FAQ Accordion */}
        <FAQAccordion categories={texts.categories} searchQuery={searchQuery} />

        {/* Contact CTA */}
        <ContactCTA texts={texts.contact} lang={lang} />
      </div>
    </div>
  )
}
