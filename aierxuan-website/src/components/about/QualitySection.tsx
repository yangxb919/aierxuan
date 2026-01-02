import Image from 'next/image'
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
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            Quality Assurance
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {texts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - 7-Step Quality Process (7 cols) */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
              {texts.processTitle}
            </h3>

            <div className="space-y-6">
              {qualitySteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative pl-8 group">
                     {/* Vertical Line */}
                    {index < qualitySteps.length - 1 && (
                      <div className="absolute left-[19px] top-12 bottom-[-24px] w-[2px] bg-white/10 group-hover:bg-blue-500/30 transition-colors" />
                    )}

                    <div className="flex items-start gap-6 bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold text-sm z-10 -ml-[54px] mt-1 shadow-lg shadow-blue-900/50">
                        {step.number}
                      </div>

                      {/* Icon Box */}
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pt-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
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
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
                 <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                <div className="text-4xl font-bold text-white mb-2 relative z-10">72h</div>
                <div className="text-sm text-blue-300 font-medium relative z-10">Burn-in Testing</div>
              </div>
              <div className="bg-blue-600 rounded-2xl p-8 text-center relative overflow-hidden group shadow-lg shadow-blue-900/20">
                 <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                <div className="text-4xl font-bold text-white mb-2 relative z-10">98%</div>
                <div className="text-sm text-blue-100 font-medium relative z-10">Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
             <div>
                <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                  {texts.certificatesTitle}
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group text-center"
                    >
                        <div className="aspect-[3/4] bg-slate-800 rounded-xl mb-4 overflow-hidden relative border border-white/5">
                         {/* Placeholder for certificate image */}
                         <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                            <ShieldCheck className="w-12 h-12" />
                         </div>
                        <Image
                          src={cert.image}
                          alt={cert.name}
                          fill
                          sizes="(min-width: 1024px) 18vw, (min-width: 768px) 24vw, 42vw"
                          className="object-cover relative z-10"
                        />
                      </div>
                      <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                        {cert.name}
                      </h4>
                    </div>
                  ))}
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-600/10 rounded-2xl p-8 border border-blue-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Compliance Guaranteed</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
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
