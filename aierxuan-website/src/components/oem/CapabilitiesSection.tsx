'use client'

import { Laptop, Monitor, Server, Tablet, Keyboard, HardDrive } from 'lucide-react'

interface CapabilitiesSectionProps {
  texts: {
    title: string
    subtitle: string
    categories: Array<{
      name: string
      description: string
      specs: string[]
    }>
  }
}

const categoryIcons = [Laptop, Monitor, Server, Tablet, Keyboard, HardDrive]

export function CapabilitiesSection({ texts }: CapabilitiesSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#070b18] to-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {texts.title}
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {texts.categories.map((category, index) => {
            const Icon = categoryIcons[index] || Laptop

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{category.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
