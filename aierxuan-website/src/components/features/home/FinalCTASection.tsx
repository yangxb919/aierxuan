'use client'

import { useRef, useEffect, useState } from 'react'
import { useContactForm } from '@/hooks/useContactForm'
import { type Locale } from '@/i18n-config'

interface FinalCTASectionProps {
  texts: {
    title: string
    subtitle: string
    cta?: string
    form?: {
      submit: string
    }
    features: Array<{ icon: string; text: string }>
  }
  lang: Locale
}

export function FinalCTASection({ texts }: FinalCTASectionProps) {
  const { openContactModal } = useContactForm()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Gradient Orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
            left: `${mousePosition.x * 30}%`,
            top: `${mousePosition.y * 30}%`,
            transition: 'left 0.8s ease-out, top 0.8s ease-out',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
            right: `${mousePosition.x * 20}%`,
            bottom: `${mousePosition.y * 20}%`,
            transition: 'right 0.8s ease-out, bottom 0.8s ease-out',
          }}
        />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-blue-300 text-sm font-medium">
            Ready to Start Your Project
          </span>
        </div>

        {/* Title */}
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white">{texts.title.split(' ').slice(0, 3).join(' ')}</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            {texts.title.split(' ').slice(3).join(' ')}
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`text-xl text-gray-400 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {texts.subtitle}
        </p>

        {/* Features */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {texts.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="text-white text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={openContactModal}
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 text-lg font-semibold text-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]"
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl">
              <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
            </div>

            {/* Button Content */}
            <span className="relative z-10">{texts.cta || texts.form?.submit || 'Get Started'}</span>
            <svg
              className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-16 flex flex-wrap justify-center items-center gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm">Secure & Confidential</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Response within 24h</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm">Free Consultation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
