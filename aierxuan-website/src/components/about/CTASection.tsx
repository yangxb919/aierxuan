'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react'

interface CTASectionProps {
  texts: {
    title: string
    subtitle: string
    contactSales: string
    downloadCatalog: string
    whatsapp: string
    email: string
    phone: string
    responseTime: string
  }
}

export function CTASection({ texts }: CTASectionProps) {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-10">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {texts.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {texts.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 w-full sm:w-auto font-semibold px-10 h-14 text-lg"
              >
                {texts.contactSales}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300 w-full sm:w-auto font-semibold px-10 h-14 text-lg bg-transparent"
            >
              {texts.downloadCatalog}
            </Button>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 max-w-6xl mx-auto">
            {/* WhatsApp */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white text-blue-400 transition-all duration-300">
                 <MessageCircle className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.whatsapp}</p>
              <p className="text-sm text-slate-400">+86 137 1373 6616</p>
            </div>

            {/* Email */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white text-blue-400 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.email}</p>
              <p className="text-sm text-slate-400">admin@aierxuan.com</p>
            </div>

            {/* Phone */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white text-blue-400 transition-all duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.phone}</p>
              <p className="text-sm text-slate-400">4008-8228-058</p>
            </div>

            {/* Response Time */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white text-blue-400 transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.responseTime}</p>
              <p className="text-sm text-slate-400">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}