'use client'

import { Button } from '@/components/ui'
import { useLanguage } from '@/store/useAppStore'
import { useContent } from '@/content'

export function HeroSection() {
  const language = useLanguage()
  const t = useContent(require('@/content/hero').heroContent, language)

  return (
    <section
      className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden h-screen min-h-[700px]"
      style={{
        backgroundImage: 'url(/images/aierxuan-oem-manufacturing-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        transition: 'transform 10000ms ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {/* Light Blue Overlay/Mask - matching blog page */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-blue-700/10"></div>

      {/* Subtle pattern overlay - same as blog page */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
          {/* Main Title - Two lines, centered */}
          <div className="space-y-4 animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-relaxed">
              {t.title}
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-relaxed">
              {t.subtitle}
            </h2>
          </div>

          {/* Description - Fade in from bottom */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl animate-[fadeInUp_1s_ease-out_0.3s_both]">
            {t.description}
          </p>

          {/* CTA Button - Fade in from bottom with delay */}
          <div className="animate-[fadeInUp_1s_ease-out_0.6s_both]">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 px-12 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 rounded-lg"
            >
              {t.cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bounce animation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  )
}