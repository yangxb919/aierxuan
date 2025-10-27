'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { useLanguage } from '@/store/useAppStore'
import { heroContent, type HeroSlide } from '@/content/hero'
import { useContactForm } from '@/hooks/useContactForm'

export function HeroSection() {
  const language = useLanguage()
  const { openContactModal } = useContactForm()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const content = heroContent[language] || heroContent.en
  const currentSlide = content.slides[currentSlideIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === content.slides.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, content.slides.length])

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index)
    setIsAutoPlaying(false) // Pause auto-play on manual navigation
  }

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === content.slides.length - 1 ? 0 : prevIndex + 1
    )
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? content.slides.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
  }

  // Resume auto-play after inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true)
      }, 10000) // Resume after 10 seconds of inactivity

      return () => clearTimeout(timeout)
    }
  }, [isAutoPlaying, currentSlideIndex])

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden h-screen min-h-[700px] pt-16">
      {/* Background Image with Transition */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentSlide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          transform: isAutoPlaying ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 10000ms ease-out, opacity 1000ms ease-in-out'
        }}
      />

      {/* Light Blue Overlay/Mask */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-blue-700/10"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
          {/* Main Title with Transition */}
          <div className="space-y-4 transition-all duration-700 ease-out">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-relaxed animate-[fadeInUp_1s_ease-out]">
              {currentSlide.title}
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-200 leading-relaxed animate-[fadeInUp_1s_ease-out_0.2s_both]">
              {currentSlide.subtitle}
            </h2>
          </div>

          {/* Description with Transition */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl transition-all duration-700 ease-out animate-[fadeInUp_1s_ease-out_0.4s_both]">
            {currentSlide.description}
          </p>

          {/* CTA Buttons */}
          <div className="animate-[fadeInUp_1s_ease-out_0.6s_both] flex flex-col sm:flex-row gap-4 items-center">
            <Button
              onClick={openContactModal}
              className="btn-primary-hover bg-blue-600 text-white hover:bg-blue-700 px-12 py-6 text-lg font-semibold rounded-lg h-auto"
            >
              {content.contact}
            </Button>
            <a
              href="#products"
              className="btn-secondary-hover border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-6 text-lg font-semibold rounded-lg inline-flex items-center justify-center"
            >
              {content.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {content.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${
              index === currentSlideIndex
                ? 'w-12 h-3 bg-white/80 rounded-full'
                : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Auto-play/Pause indicator */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 right-8 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-20"
        aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
      >
        {isAutoPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        )}
      </button>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  )
}