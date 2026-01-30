'use client'

import { Cpu, Palette, Package, Wrench } from 'lucide-react'

interface ServicesSectionProps {
  texts: {
    title: string
    subtitle: string
    oem: {
      title: string
      description: string
      features: string[]
      moq: string
    }
    odm: {
      title: string
      description: string
      features: string[]
      moq: string
    }
  }
}

export function ServicesSection({ texts }: ServicesSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b18] to-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
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

        <div className="grid gap-8 lg:grid-cols-2">
          {/* OEM Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                <Package className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">OEM</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">{texts.oem.title}</h3>
              <p className="mt-4 text-white/70 leading-relaxed">{texts.oem.description}</p>

              <ul className="mt-6 space-y-3">
                {texts.oem.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                <span className="text-sm text-blue-300">{texts.oem.moq}</span>
              </div>
            </div>
          </div>

          {/* ODM Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-500/20" />

            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
                <Palette className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400">ODM</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">{texts.odm.title}</h3>
              <p className="mt-4 text-white/70 leading-relaxed">{texts.odm.description}</p>

              <ul className="mt-6 space-y-3">
                {texts.odm.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                <span className="text-sm text-cyan-300">{texts.odm.moq}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
