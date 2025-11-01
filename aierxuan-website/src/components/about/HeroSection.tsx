'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'

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
      background: 'linear-gradient(135deg, #1F4E78 0%, #2E5C8A 100%)'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
            <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-medium">
              {texts.subtitle}
            </p>

            {/* Description - Increased from 16px to 18px */}
            <p className="text-lg sm:text-xl text-blue-200 leading-relaxed max-w-2xl">
              {texts.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-[#FF6B35] hover:bg-[#ff5722] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  {texts.contactSales}
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1F4E78] transition-all duration-300 w-full sm:w-auto"
              >
                {texts.downloadCatalog}
              </Button>
            </div>
          </div>

          {/* Right Side - Data Cards (40%) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* Card 1: Years of Experience */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-5xl font-bold text-white mb-2">10+</div>
                <div className="text-lg text-blue-100">Years of Experience</div>
              </div>

              {/* Card 2: Units Shipped */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-5xl font-bold text-white mb-2">500K+</div>
                <div className="text-lg text-blue-100">Units Shipped Globally</div>
              </div>

              {/* Card 3: Countries Served */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-lg text-blue-100">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

