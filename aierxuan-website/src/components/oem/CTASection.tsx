'use client'

import Link from 'next/link'
import { ArrowRight, MessageSquare, FileText } from 'lucide-react'

interface CTASectionProps {
  texts: {
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    features: string[]
  }
  lang: string
}

export function CTASection({ texts, lang }: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1a2e] to-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(800px 400px at 50% 50%, rgba(59,130,246,0.15), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {texts.title}
        </h2>
        <p className="mt-6 text-xl text-white/70">
          {texts.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {texts.features.map((feature, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 h-14 w-full sm:w-auto px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 text-base font-semibold text-white shadow-[0_18px_60px_rgba(59,130,246,0.35)] transition-transform duration-200 hover:scale-[1.02] justify-center"
          >
            <MessageSquare className="w-5 h-5" />
            {texts.primaryCta}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-2 h-14 w-full sm:w-auto px-8 rounded-2xl border border-white/20 bg-white/5 text-base font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10 justify-center"
          >
            <FileText className="w-5 h-5" />
            {texts.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  )
}
