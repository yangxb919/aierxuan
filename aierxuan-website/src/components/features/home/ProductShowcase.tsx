'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/i18n-config'

interface ProductShowcaseProps {
  dictionary: {
    categories: {
      title: string
      subtitle: string
      items: {
        business: {
          name: string
          description: string
          features: string[]
          moq: string
          useCase: string
        }
        gaming: {
          name: string
          description: string
          features: string[]
          moq: string
          useCase: string
        }
        mini: {
          name: string
          description: string
          features: string[]
          moq: string
          useCase: string
        }
      }
    }
    common: {
      viewAll: string
    }
  }
  lang: Locale
}

const products = [
  {
    key: 'business',
    image: '/images/category-business-laptop.webp',
    gradient: 'from-blue-600 to-cyan-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'gaming',
    image: '/images/category-gaming-laptop.webp',
    gradient: 'from-violet-600 to-fuchsia-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    key: 'mini',
    image: '/images/category-mini-pc.webp',
    gradient: 'from-emerald-600 to-teal-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
]

export function ProductShowcase({ dictionary, lang }: ProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const activeProduct = products[activeIndex]
  const activeData = dictionary.categories.items[activeProduct.key as keyof typeof dictionary.categories.items]

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            Our Products
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {dictionary.categories.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {dictionary.categories.subtitle}
          </p>
        </div>

        {/* Product Tabs */}
        <div
          className={`flex justify-center gap-4 mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {products.map((product, index) => {
            const data = dictionary.categories.items[product.key as keyof typeof dictionary.categories.items]
            return (
              <button
                key={product.key}
                onClick={() => setActiveIndex(index)}
                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  {product.icon}
                  {data.name}
                </span>
                {activeIndex === index && (
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${product.gradient}`} />
                )}
              </button>
            )
          })}
        </div>

        {/* Product Display */}
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Product Image */}
          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r ${activeProduct.gradient} rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-2 border border-white/10">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={activeProduct.image}
                  alt={activeData.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${activeProduct.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2 shadow-2xl">
              <span className="text-sm text-gray-400">{activeData.moq}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${activeProduct.gradient} text-white text-sm font-medium mb-4`}>
                {activeProduct.icon}
                {activeData.name}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {activeData.description}
              </h3>
              <p className="text-gray-400 text-lg">
                {activeData.useCase}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-gray-500">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeProduct.gradient}`} />
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/products`}
                className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${activeProduct.gradient} text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25`}
              >
                {dictionary.common.viewAll}
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Navigation Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {products.map((product, index) => (
            <button
              key={product.key}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? `bg-gradient-to-r ${product.gradient} w-8`
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to ${dictionary.categories.items[product.key as keyof typeof dictionary.categories.items].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
