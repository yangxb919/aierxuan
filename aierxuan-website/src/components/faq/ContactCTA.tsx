'use client'

import Link from 'next/link'
import { MessageSquare, Mail, Phone } from 'lucide-react'

interface ContactCTAProps {
  texts: {
    title: string
    subtitle: string
    contactButton: string
    emailLabel: string
    emailValue: string
    phoneLabel: string
    phoneValue: string
  }
  lang: string
}

export function ContactCTA({ texts, lang }: ContactCTAProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1a2e] to-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(600px 400px at 50% 50%, rgba(59,130,246,0.12), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12 backdrop-blur text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {texts.title}
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            {texts.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-xs text-white/50">{texts.emailLabel}</div>
                <div className="text-sm font-medium text-white">{texts.emailValue}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left">
                <div className="text-xs text-white/50">{texts.phoneLabel}</div>
                <div className="text-sm font-medium text-white">{texts.phoneValue}</div>
              </div>
            </div>
          </div>

          <Link
            href={`/${lang}/contact`}
            className="mt-8 inline-flex items-center gap-2 h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 text-base font-semibold text-white shadow-[0_18px_60px_rgba(59,130,246,0.35)] transition-transform duration-200 hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5" />
            {texts.contactButton}
          </Link>
        </div>
      </div>
    </section>
  )
}
