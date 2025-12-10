'use client'

import { ClipboardList, Wrench, Zap, Flame, Target, PackageCheck, CheckCircle2, ShieldCheck } from 'lucide-react'

interface QualitySectionProps {
  texts: {
    title: string
    subtitle: string
    processTitle: string
    certificatesTitle: string
    steps: {
      step1: string
      step2: string
      step3: string
      step4: string
      step5: string
      step6: string
      step7: string
    }
  }
}

export function QualitySection({ texts }: QualitySectionProps) {
  const qualitySteps = [
    { number: '01', title: texts.steps.step1, icon: ClipboardList },
    { number: '02', title: texts.steps.step2, icon: Wrench },
    { number: '03', title: texts.steps.step3, icon: Zap },
    { number: '04', title: texts.steps.step4, icon: Flame },
    { number: '05', title: texts.steps.step5, icon: Target },
    { number: '06', title: texts.steps.step6, icon: PackageCheck },
    { number: '07', title: texts.steps.step7, icon: CheckCircle2 }
  ]

  const certificates = [
    { name: 'CE', image: '/images/certificates/ce-certificate.webp' },
    { name: 'FCC', image: '/images/certificates/fcc-certificate.webp' },
    { name: 'ISO 9001', image: '/images/certificates/iso-9001.webp' },
    { name: 'RoHS', image: '/images/certificates/rohs-certificate.webp' }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            {texts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - 7-Step Quality Process (7 cols) */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              {texts.processTitle}
            </h3>

            <div className="space-y-6">
              {qualitySteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative pl-8 group">
                     {/* Vertical Line */}
                    {index < qualitySteps.length - 1 && (
                      <div className="absolute left-[19px] top-12 bottom-[-24px] w-[2px] bg-slate-100 group-hover:bg-blue-100 transition-colors" />
                    )}

                    <div className="flex items-start gap-6 bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-sm shadow-sm z-10 -ml-[54px] mt-1">
                        {step.number}
                      </div>

                      {/* Icon Box */}
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pt-2">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quality Metrics */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />
                <div className="text-4xl font-bold text-white mb-2 relative z-10">72h</div>
                <div className="text-sm text-blue-200 font-medium relative z-10">Burn-in Testing</div>
              </div>
              <div className="bg-blue-600 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                <div className="text-4xl font-bold text-white mb-2 relative z-10">98%</div>
                <div className="text-sm text-blue-100 font-medium relative z-10">Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
             <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full" />
                  {texts.certificatesTitle}
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
                    >
                      <div className="aspect-[3/4] bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                         {/* Placeholder for certificate image */}
                         <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                            <ShieldCheck className="w-12 h-12" />
                         </div>
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="w-full h-full object-cover relative z-10"
                        />
                      </div>
                      <h4 className="text-center font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {cert.name}
                      </h4>
                    </div>
                  ))}
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Compliance Guaranteed</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    All products meet international quality and safety standards including CE, FCC, RoHS, and ISO certifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}