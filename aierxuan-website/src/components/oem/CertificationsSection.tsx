'use client'

import { ShieldCheck, Award, FileCheck, Globe2 } from 'lucide-react'

interface CertificationsSectionProps {
  texts: {
    title: string
    subtitle: string
    certifications: Array<{
      name: string
      description: string
    }>
    partners: {
      title: string
      items: string[]
    }
  }
}

export function CertificationsSection({ texts }: CertificationsSectionProps) {
  const certIcons = [ShieldCheck, Award, FileCheck, Globe2, ShieldCheck, Award]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(600px 400px at 20% 50%, rgba(34,211,238,0.08), transparent 60%), radial-gradient(600px 400px at 80% 50%, rgba(59,130,246,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {texts.title}
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {texts.certifications.map((cert, index) => {
            const Icon = certIcons[index] || ShieldCheck

            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{cert.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Technology Partners */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
          <h3 className="text-center text-xl font-bold text-white mb-8">{texts.partners.title}</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {texts.partners.items.map((partner, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white/70 font-medium"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
