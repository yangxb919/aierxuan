'use client'

import { MessageSquare, FileSearch, Cpu, ClipboardCheck, Factory, Truck } from 'lucide-react'

interface ProcessSectionProps {
  texts: {
    title: string
    subtitle: string
    steps: Array<{
      title: string
      description: string
      duration: string
    }>
  }
}

const stepIcons = [MessageSquare, FileSearch, Cpu, ClipboardCheck, Factory, Truck]

export function ProcessSection({ texts }: ProcessSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(900px 500px at 50% 30%, rgba(59,130,246,0.12), transparent 60%)',
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {texts.steps.map((step, index) => {
            const Icon = stepIcons[index] || MessageSquare

            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
                    Step {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-cyan-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {step.duration}
                </div>

                {/* Connector Arrow (hidden on last item and mobile) */}
                {index < texts.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-blue-500/40">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
