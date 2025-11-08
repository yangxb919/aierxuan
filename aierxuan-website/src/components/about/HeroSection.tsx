'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'

interface HeroSectionProps {
  texts: {
    mainTitle: string
    subtitle: string
    description: string
    contactSales: string
    downloadCatalog: string
  }
}

export function HeroSection({ texts }: HeroSectionProps) {
  return (
    <section className="relative text-white overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)'
    }}>
      {/* Modern Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Crect x='0' y='0' width='2' height='40'/%3E%3Crect x='0' y='0' width='40' height='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Title - Increased from 48px to 56px */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              {texts.mainTitle}
            </h1>

            {/* Certification Icons - Moved between title and subtitle */}
            <div className="flex flex-wrap items-center gap-4 -mt-2">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-base font-bold">Intel Partner</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-base font-bold">CE</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-base font-bold">FCC</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-base font-bold">ISO 9001</span>
              </div>
            </div>

            {/* Subtitle - Increased from 16px to 20px */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-200 font-medium">
              {texts.subtitle}
            </p>

            {/* Description - Increased from 16px to 18px */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {texts.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto font-semibold px-8"
                >
                  {texts.contactSales}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 w-full sm:w-auto font-semibold px-8"
              >
                {texts.downloadCatalog}
              </Button>
            </div>
          </div>

          {/* Right Side - Data Cards (40%) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* Card 1: Years of Experience */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">10+</div>
                <div className="text-lg text-slate-200">Years of Experience</div>
              </div>

              {/* Card 2: Units Shipped */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">500K+</div>
                <div className="text-lg text-slate-200">Units Shipped Globally</div>
              </div>

              {/* Card 3: Countries Served */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">50+</div>
                <div className="text-lg text-slate-200">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

