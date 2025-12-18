'use client'

import { useState } from 'react'
import Image from 'next/image'
import { type Dictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'

// Client logos with actual images
const clientLogos = [
  { name: 'Tech Corp', image: '/images/client-logo-tech-corp.webp' },
  { name: 'Global Systems', image: '/images/client-logo-global-systems.webp' },
  { name: 'Innovation Ltd', image: '/images/client-logo-innovation-ltd.webp' },
  { name: 'Digital Solutions', image: '/images/client-logo-digital-solutions.webp' },
  { name: 'Smart Industries', image: '/images/client-logo-smart-industries.webp' },
  { name: 'Future Tech', image: '/images/client-logo-future-tech.webp' },
  { name: 'Enterprise Co', image: '/images/client-logo-enterprise-co.webp' },
  { name: 'Advanced Systems', image: '/images/client-logo-advanced-systems.webp' },
  { name: 'NextGen Tech', image: '/images/client-logo-nextgen-tech.webp' },
  { name: 'MegaCorp Industries', image: '/images/client-logo-megacorp-industries.webp' },
  { name: 'Quantum Systems', image: '/images/client-logo-quantum-systems.webp' },
  { name: 'Alpha Technologies', image: '/images/client-logo-alpha-technologies.webp' },
  { name: 'Beta Solutions', image: '/images/client-logo-beta-solutions.webp' },
  { name: 'Gamma Innovations', image: '/images/client-logo-gamma-innovations.webp' },
  { name: 'Delta Digital', image: '/images/client-logo-delta-digital.webp' }
]

// Certifications with actual images
const certifications = [
  { name: 'CE', description: 'European Conformity', image: '/images/certification-ce-european-conformity.webp' },
  { name: 'FCC', description: 'Federal Communications Commission', image: '/images/certification-fcc-federal-communications.webp' },
  { name: 'RoHS', description: 'Restriction of Hazardous Substances', image: '/images/certification-rohs-hazardous-substances.webp' },
  { name: 'UL', description: 'Underwriters Laboratories', image: '/images/certification-ul-underwriters-laboratories.webp' },
  { name: 'ISO 9001', description: 'Quality Management', image: '/images/certification-iso-9001-quality-management.webp' },
  { name: 'ISO 14001', description: 'Environmental Management', image: '/images/certification-iso-14001-environmental-management.webp' }
]

// Technology partners with actual logos
const partners = [
  { name: 'Intel', image: '/images/partner-logo-intel.svg' },
  { name: 'AMD', image: '/images/partner-logo-amd.svg' },
  { name: 'Microsoft', image: '/images/partner-logo-microsoft.svg' },
  { name: 'Linux', image: '/images/partner-logo-linux.svg' }
]

// Client Carousel Component - 单个移动轮播
function ClientCarousel({ logos }: { logos: typeof clientLogos }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleItems = 6 // 一次显示6个logo
  const totalItems = logos.length
  // 为了实现无缝循环，在数组前后添加一些元素
  const extendedLogos = [...logos, ...logos.slice(0, visibleItems)]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // 如果在第一个位置，先重置到末尾位置以实现无缝循环
        setTimeout(() => setCurrentIndex(totalItems), 50)
        return totalItems
      }
      return prevIndex - 1
    })
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= totalItems) {
        // 如果超过原始数组长度，重置到开头
        setTimeout(() => setCurrentIndex(1), 50)
        return 1
      }
      return prevIndex + 1
    })
  }

  const getVisibleLogos = () => {
    return extendedLogos.slice(currentIndex, currentIndex + visibleItems)
  }

  if (logos.length <= visibleItems) {
    // If there are 6 or fewer logos, show them all without carousel
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {logos.map((client, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl p-6 flex items-center justify-center hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-blue-400 group overflow-hidden"
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            {/* Logo容器 */}
            <div className="relative z-10">
              <img
                src={client.image}
                alt={`${client.name} logo`}
                width={180}
                height={64}
                className="w-full h-auto object-contain max-h-16 transition-all duration-500 group-hover:scale-125 drop-shadow-sm"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = document.createElement('div')
                  fallback.className = 'text-center'
                  fallback.innerHTML = `<div class="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${client.name}</div>`
                  target.parentElement?.appendChild(fallback)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-400 group"
        aria-label="Previous logos"
      >
        <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-400 group"
        aria-label="Next logos"
      >
        <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Logo Grid with transition */}
      <div className="mx-16 overflow-hidden">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${0}px)` // 我们将通过JS来控制单个项目的移动
          }}
        >
          {getVisibleLogos().map((client, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="relative bg-white rounded-2xl p-6 flex items-center justify-center hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-blue-400 group overflow-hidden"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* 悬浮光效 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

              {/* Logo容器 */}
              <div className="relative z-10">
                <img
                  src={client.image}
                  alt={`${client.name} logo`}
                  width={180}
                  height={64}
                  className="w-full h-auto object-contain max-h-16 transition-all duration-500 group-hover:scale-125 drop-shadow-sm"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-center'
                    fallback.innerHTML = `<div class="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${client.name}</div>`
                    target.parentElement?.appendChild(fallback)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex % totalItems
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8 shadow-lg'
              : 'bg-gray-300 hover:bg-gray-400 w-2'
              }`}
            aria-label={`Go to logo ${index + 1}`}
          />
        ))}
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fadeIn:nth-child(1) { animation-delay: 0.1s; }
        .animate-fadeIn:nth-child(2) { animation-delay: 0.15s; }
        .animate-fadeIn:nth-child(3) { animation-delay: 0.2s; }
        .animate-fadeIn:nth-child(4) { animation-delay: 0.25s; }
        .animate-fadeIn:nth-child(5) { animation-delay: 0.3s; }
        .animate-fadeIn:nth-child(6) { animation-delay: 0.35s; }
      `}</style>
    </div>
  )
}

interface TrustBadgesProps {
  dictionary: Dictionary
  lang: Locale
}

export function TrustBadges({ dictionary, lang }: TrustBadgesProps) {
  const t = dictionary.home.trustBadges

  // Merge dictionary certification descriptions with local images
  const certificationsWithTrans = certifications.map((cert) => {
    const transItem = t.certificationItems?.find(item => item.name === cert.name)
    return {
      ...cert,
      description: transItem?.description || cert.description
    }
  })

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Clients Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
            {t.clients}
          </h3>
          <ClientCarousel logos={clientLogos} />
        </div>

        {/* Certifications Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
            {t.certifications}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certificationsWithTrans.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-green-200 hover:border-green-400 group"
              >
                {/* Certification Image */}
                <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    className="w-full h-full object-contain"
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const fallback = document.createElement('div')
                      fallback.className = 'w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center'
                      fallback.innerHTML = '<svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
                      target.parentElement?.appendChild(fallback)
                    }}
                  />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">
                  {cert.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Partners Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
            {t.partners}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-100 hover:to-blue-100 group transform hover:scale-105"
              >
                <img
                  src={partner.image}
                  alt={`${partner.name} logo`}
                  width={180}
                  height={80}
                  className="w-full h-auto object-contain max-h-20 transition-transform duration-300 group-hover:scale-125 drop-shadow-md"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-center'
                    fallback.innerHTML = `<div class="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">${partner.name}</div>`
                    target.parentElement?.appendChild(fallback)
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{t.stats.clients.value}</div>
              <div className="text-gray-600">{t.stats.clients.label}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{t.stats.countries.value}</div>
              <div className="text-gray-600">{t.stats.countries.label}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{t.stats.experience.value}</div>
              <div className="text-gray-600">{t.stats.experience.label}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{t.stats.satisfaction.value}</div>
              <div className="text-gray-600">{t.stats.satisfaction.label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
