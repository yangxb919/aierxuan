'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { type Locale } from '@/i18n-config'

interface CapabilitiesSectionProps {
  dictionary: {
    coreAdvantages: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        stats: string
        details: string[]
      }>
    }
    manufacturingCapability: {
      title: string
      subtitle: string
      description: string
      items: Array<{
        title: string
        description: string
        stats: Array<{ value: string; label: string }>
      }>
    }
  }
  lang: Locale
}

export function CapabilitiesSection({ dictionary }: CapabilitiesSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeAdvantage, setActiveAdvantage] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const advantageIcons = [
    // Flexible MOQ
    <svg key="moq" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>,
    // Fast Turnaround
    <svg key="fast" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Full Customization
    <svg key="custom" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>,
  ]

  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-amber-500 to-orange-400',
    'from-violet-500 to-purple-400',
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Core Advantages Section */}
        <div className="mb-32">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {dictionary.coreAdvantages.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {dictionary.coreAdvantages.subtitle}
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {dictionary.coreAdvantages.items.map((item, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveAdvantage(index)}
              >
                <div
                  className={`relative h-full p-8 rounded-2xl border transition-all duration-500 ${
                    activeAdvantage === index
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradients[index]} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    {advantageIcons[index]}
                  </div>

                  {/* Stats Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${gradients[index]} text-white text-sm font-bold mb-4`}>
                    {item.stats}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6">{item.description}</p>

                  {/* Details */}
                  <ul className="space-y-3">
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradients[index]} mt-2 flex-shrink-0`} />
                        <span className="text-gray-300 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative Corner */}
                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${gradients[index]} opacity-5 blur-3xl`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing Capability Section */}
        <div>
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              Manufacturing Excellence
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {dictionary.manufacturingCapability.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {dictionary.manufacturingCapability.description}
            </p>
          </div>

          {/* Manufacturing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dictionary.manufacturingCapability.items.map((item, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-1000 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="relative h-full rounded-2xl overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={`/images/manufacturing/manufacturing-${index + 1}.webp`}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                    {/* Stats */}
                    <div className="flex gap-4">
                      {item.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex-1">
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
