'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import { ShieldCheck, Award, Globe, Box, Calendar } from 'lucide-react'

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
    <section className="relative text-white overflow-hidden bg-slate-900">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 opacity-90" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              {/* Badge/Certifications */}
              <div className="flex flex-wrap gap-3">
                {['Intel Partner', 'CE Certified', 'FCC Certified', 'ISO 9001'].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20 text-blue-200 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
                {texts.mainTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-2xl text-blue-200 font-medium">
                {texts.subtitle}
              </p>

              {/* Description */}
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                {texts.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 w-full sm:w-auto font-semibold px-8 h-12 text-base"
                >
                  {texts.contactSales}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300 w-full sm:w-auto font-semibold px-8 h-12 text-base bg-transparent"
              >
                {texts.downloadCatalog}
              </Button>
            </div>
          </div>

          {/* Right Side - Data Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:pl-12">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300 sm:col-span-2">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">10+</div>
              <div className="text-slate-400 font-medium">Years of Experience in OEM/ODM</div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                <Box className="w-6 h-6" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-slate-400 text-sm font-medium">Units Shipped Globally</div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400 text-sm font-medium">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}