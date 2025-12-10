'use client'

import Link from 'next/link'
import { CATEGORY_SLUGS } from '@/lib/categories'

interface ProductCategoriesProps {
  dictionary: {
    categories: {
      title: string
      subtitle: string
      items: {
        business: CategoryItem
        gaming: CategoryItem
        mini: CategoryItem
      }
    }
    common: {
      requestQuote: string
    }
  }
  lang: string
}

interface CategoryItem {
  name: string
  description: string
  features: string[]
  moq: string
  useCase: string
}

// Color schemes for each category
const colorSchemes = {
  blue: {
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200 hover:border-blue-400',
    text: 'text-blue-600',
    icon: 'bg-blue-100 text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white'
  },
  purple: {
    bg: 'from-purple-50 to-purple-100',
    border: 'border-purple-200 hover:border-purple-400',
    text: 'text-purple-600',
    icon: 'bg-purple-100 text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700 text-white'
  },
  green: {
    bg: 'from-green-50 to-green-100',
    border: 'border-green-200 hover:border-green-400',
    text: 'text-green-600',
    icon: 'bg-green-100 text-green-600',
    button: 'bg-green-600 hover:bg-green-700 text-white'
  }
}

export function ProductCategories({ dictionary, lang }: ProductCategoriesProps) {
  const content = dictionary.categories

  // Reconstruct the array structure expected by the render loop
  // We map the dictionary items back to the structure with metadata (images, icons, colors)
  // This metadata should ideally be in the dictionary too or kept separate if it's not translatable.
  // For now, we keep non-translatable data here and merge with translations.

  const categoryMetadata = [
    {
      id: 'business',
      slug: CATEGORY_SLUGS.business,
      icon: '💼',
      image: '/images/category-business-laptop.jpg',
      color: 'blue'
    },
    {
      id: 'gaming',
      slug: CATEGORY_SLUGS.gaming,
      icon: '🎮',
      image: '/images/category-gaming-laptop.jpg',
      color: 'purple'
    },
    {
      id: 'mini',
      slug: CATEGORY_SLUGS.mini,
      icon: '🖥️',
      image: '/images/category-mini-pc.jpg',
      color: 'green'
    }
  ]

  const categories = categoryMetadata.map(meta => {
    const translation = content.items[meta.id as keyof typeof content.items]
    return {
      ...meta,
      ...translation
    }
  })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const colors = colorSchemes[category.color as keyof typeof colorSchemes]

            return (
              <Link
                key={category.id}
                href={`/${lang}/products?category=${encodeURIComponent(category.slug)}`}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
                  {/* Category Image */}
                  <div className="relative h-40 mb-6 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${category.image})` }}>
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {category.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <svg className={`w-4 h-4 mr-2 ${colors.text}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* MOQ Badge */}
                  {category.moq && (
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} text-sm font-semibold rounded-full`}>
                        {category.moq}
                      </span>
                    </div>
                  )}

                  {/* Use Case */}
                  {category.useCase && (
                    <p className="text-xs text-gray-500 mb-4 italic">
                      {category.useCase}
                    </p>
                  )}

                  {/* CTA Button */}
                  <div className={`${colors.button} px-6 py-3 rounded-lg text-center font-semibold group-hover:scale-105 transition-transform duration-300`}>
                    {dictionary.common.requestQuote}
                  </div>

                  {/* Hover Effect Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

