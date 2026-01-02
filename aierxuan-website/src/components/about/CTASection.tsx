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
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
      }}></div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 bg-blue-600 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center space-y-10">
          
          <span className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
             Get In Touch
          </span>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white">{texts.title}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {texts.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link href="/contact" className="w-full sm:w-auto">
              <div className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold text-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] w-full sm:w-auto cursor-pointer">
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <span className="relative z-10">{texts.contactSales}</span>
              </div>
            </Link>
            
            <button
              type="button"
              className="h-[68px] w-full rounded-2xl border-2 border-white/20 bg-white/5 px-10 text-lg font-semibold text-gray-200 backdrop-blur transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/50 sm:w-auto"
            >
              {texts.downloadCatalog}
            </button>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 max-w-6xl mx-auto">
            {/* WhatsApp */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/30">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white text-blue-400 transition-all duration-300 border border-blue-500/30">
                 <MessageCircle className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.whatsapp}</p>
              <p className="text-sm text-gray-500">+86 137 1373 6616</p>
            </div>

            {/* Email */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/30">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white text-blue-400 transition-all duration-300 border border-blue-500/30">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.email}</p>
              <p className="text-sm text-gray-500">admin@aierxuanlaptop.com</p>
            </div>

            {/* Phone */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/30">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white text-blue-400 transition-all duration-300 border border-blue-500/30">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.phone}</p>
              <p className="text-sm text-gray-500">4008-8228-058</p>
            </div>

            {/* Response Time */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/30">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white text-blue-400 transition-all duration-300 border border-blue-500/30">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-white mb-1">{texts.responseTime}</p>
              <p className="text-sm text-gray-500">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
