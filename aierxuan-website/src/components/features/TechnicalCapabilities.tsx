import { Button } from '@/components/ui'
import { type Dictionary } from '@/get-dictionary'

interface TechnicalCapabilitiesProps {
  texts: Dictionary['home']['technicalCapabilities']
}

export function TechnicalCapabilities({ texts }: TechnicalCapabilitiesProps) {
  const t = texts

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t.subtitle}
          </p>
          <Button size="lg" variant="outline">
            📄 {t.downloadWhitepaper}
          </Button>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {t.capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image or Icon */}
              {(capability as any).image ? (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={(capability as any).image}
                    alt={capability.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="text-5xl mb-4">{capability.icon}</div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {capability.description}
              </p>
              <ul className="space-y-3">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Development Process */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            {t.process.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-3">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {/* Arrow connector (hidden on last item) */}
                {index < t.process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
