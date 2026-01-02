'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { useContactForm } from '@/hooks/useContactForm'

interface HeroSectionNewProps {
  dictionary: {
    hero: {
      slides: Array<{
        title: string
        subtitle: string
        description: string
      }>
    }
    common: {
      requestQuote: string
      viewProducts: string
    }
  }
}

export function HeroSectionNew({ dictionary }: HeroSectionNewProps) {
  const { openContactModal } = useContactForm()
  const [isLoaded, setIsLoaded] = useState(false)

  const content = dictionary.hero.slides[0]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.webp"
          alt="AIERXUAN Professional Laptop & Mini PC Manufacturer"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-16">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/20 backdrop-blur-sm transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-sm font-medium tracking-wide">
                Intel Partner | CE/FCC Certified
              </span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-100 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="text-white">{content.title}</span>
              </h1>

              <h2
                className={`text-xl sm:text-2xl lg:text-3xl text-blue-300 font-medium transition-all duration-700 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {content.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p
              className={`text-gray-300 text-lg leading-relaxed max-w-xl transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {content.description}
            </p>

            {/* Stats Grid */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {[
                { label: 'MOQ', value: '100+', unit: 'Units' },
                { label: 'Delivery', value: '7-15', unit: 'Days' },
                { label: 'Custom', value: '100%', unit: 'Full' },
                { label: 'Experience', value: '10+', unit: 'Years' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.unit}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                onClick={openContactModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl h-auto shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all"
              >
                {dictionary.common.requestQuote}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
              >
                {dictionary.common.viewProducts}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div
            className={`relative hidden lg:block transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-2xl" />

              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/images/category-business-laptop.webp"
                    alt="AIERXUAN Business Laptop"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Stats Cards */}
                <div className="absolute -top-4 -right-4 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-xl">
                  <div className="text-xs text-gray-400">Monthly Capacity</div>
                  <div className="text-xl font-bold text-white">50,000+</div>
                  <div className="text-xs text-blue-400">Units</div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-xl">
                  <div className="text-xs text-gray-400">Global Clients</div>
                  <div className="text-xl font-bold text-white">500+</div>
                  <div className="text-xs text-green-400">Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
