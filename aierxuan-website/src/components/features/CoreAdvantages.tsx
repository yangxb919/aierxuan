'use client'

import { type Dictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

interface CoreAdvantagesProps {
  dictionary: Dictionary
  lang: Locale
}

export function CoreAdvantages({ dictionary, lang }: CoreAdvantagesProps) {
  const t = dictionary.home.coreAdvantages

  const advantages = t.items.map((item, index) => ({
    ...item,
    icon: ['📦', '⚡', '🎨'][index],
    image: [
      '/images/exceptional-performance-hardware.webp',
      '/images/quality-certification-lab.webp',
      '/images/oem-customization-service.webp'
    ][index]
  }))

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image or Icon */}
              {advantage.image ? (
                <div className="mb-4 overflow-hidden rounded-lg relative h-32">
                  <OptimizedImage
                    src={advantage.image}
                    alt={advantage.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {advantage.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {advantage.title}
              </h3>

              {/* Stats Badge */}
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                {advantage.stats}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {advantage.description}
              </p>

              {/* Details - Always visible */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {advantage.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
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
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

