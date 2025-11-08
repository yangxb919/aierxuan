'use client'

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
    { number: '01', title: texts.steps.step1, icon: '📋' },
    { number: '02', title: texts.steps.step2, icon: '🔧' },
    { number: '03', title: texts.steps.step3, icon: '⚡' },
    { number: '04', title: texts.steps.step4, icon: '🔥' },
    { number: '05', title: texts.steps.step5, icon: '🎯' },
    { number: '06', title: texts.steps.step6, icon: '📦' },
    { number: '07', title: texts.steps.step7, icon: '✅' }
  ]

  const certificates = [
    { name: 'CE', image: 'CE+Certificate' },
    { name: 'FCC', image: 'FCC+Certificate' },
    { name: 'ISO 9001', image: 'ISO+9001' },
    { name: 'RoHS', image: 'RoHS+Certificate' }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            {texts.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Side - 7-Step Quality Process (60%) */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              {texts.processTitle}
            </h3>

            <div className="space-y-4">
              {qualitySteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < qualitySteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-blue-500/20" />
                  )}

                  {/* Step Card */}
                  <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group ring-1 ring-slate-200/60">
                    {/* Step Number Circle */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{step.icon}</span>
                        <h4 className="text-lg font-bold text-slate-900">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Metrics */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm ring-1 ring-slate-200/60 hover:shadow-md transition-all">
                <div className="text-4xl font-bold text-blue-600 mb-2">72h</div>
                <div className="text-sm text-slate-600 font-medium">Burn-in Testing</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm ring-1 ring-slate-200/60 hover:shadow-md transition-all">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-sm text-slate-600 font-medium">Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Certifications (40%) */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              {texts.certificatesTitle}
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group ring-1 ring-slate-200/60"
                >
                  <div className="aspect-[3/4] bg-slate-100 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={`https://placehold.co/300x400/3B82F6/FFFFFF?text=${cert.image}`}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-center font-bold text-slate-900">
                    {cert.name}
                  </h4>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/60">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Compliance Guaranteed</h4>
                  <p className="text-sm text-slate-600">
                    All products meet international quality and safety standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note about placeholders */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 italic">
            * Certificate images are placeholders and will be replaced with actual certificates
          </p>
        </div>
      </div>
    </section>
  )
}

