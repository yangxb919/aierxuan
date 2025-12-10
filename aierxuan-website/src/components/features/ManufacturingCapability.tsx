'use client'

import { type Dictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'

interface ManufacturingCapabilityProps {
  dictionary: Dictionary
  lang: Locale
}

export function ManufacturingCapability({ dictionary, lang }: ManufacturingCapabilityProps) {
  const t = dictionary.home.manufacturingCapability

  const capabilities = t.items.map((item, index) => ({
    ...item,
    image: [
      '/images/manufacturing/manufacturing-1.webp',
      '/images/manufacturing/manufacturing-2.webp',
      '/images/manufacturing/manufacturing-3.webp',
      '/images/manufacturing/manufacturing-4.webp'
    ][index],
    icon: ['🏭', '⚙️', '🔬', '📦'][index]
  }))

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {t.subtitle}
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${capability.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {capability.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {capability.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {t.title.replace('Our ', '').replace('我们的', '')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
