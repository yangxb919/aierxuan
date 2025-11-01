'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/store/useAppStore'
import { useContactForm } from '@/hooks/useContactForm'

// Translations for the floating button
const translations = {
  en: {
    getQuote: 'Get Quote',
    requestSample: 'Request Sample'
  },
  ru: {
    getQuote: 'Получить предложение',
    requestSample: 'Запросить образец'
  },
  ja: {
    getQuote: '見積もりを取得',
    requestSample: 'サンプルを依頼'
  },
  fr: {
    getQuote: 'Obtenir un devis',
    requestSample: 'Demander un échantillon'
  },
  pt: {
    getQuote: 'Obter cotação',
    requestSample: 'Solicitar amostra'
  },
  'zh-CN': {
    getQuote: '获取报价',
    requestSample: '索取样品'
  }
}

export function FloatingCTAButton() {
  const language = useLanguage()
  const { openContactModal } = useContactForm()
  const t = translations[language] || translations.en
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Show button after scrolling down a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleGetQuote = () => {
    openContactModal()
    setIsExpanded(false)
  }

  const handleRequestSample = () => {
    // For sample request, we can also open the contact modal
    // The user can specify they want a sample in the message
    openContactModal()
    setIsExpanded(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main floating button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-3">
        {/* Expanded menu options */}
        {isExpanded && (
          <div className="flex flex-col items-end space-y-2 animate-[slideInUp_0.3s_ease-out]">
            {/* Get Quote button */}
            <button
              onClick={handleGetQuote}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base hover:scale-105 border-2 border-blue-600"
              aria-label={t.getQuote}
            >
              📋 {t.getQuote}
            </button>

            {/* Request Sample button */}
            <button
              onClick={handleRequestSample}
              className="bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base hover:scale-105 border-2 border-green-600"
              aria-label={t.requestSample}
            >
              📦 {t.requestSample}
            </button>
          </div>
        )}

        {/* Main CTA button - Large and prominent */}
        <button
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false)
            } else {
              setIsExpanded(true)
            }
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-lg hover:scale-110 flex items-center space-x-3 animate-bounce-slow"
          aria-label={isExpanded ? 'Close menu' : 'Open inquiry menu'}
        >
          {isExpanded ? (
            <>
              <span>✕</span>
              <span>Close</span>
            </>
          ) : (
            <>
              <span className="text-2xl">💬</span>
              <span>{t.getQuote}</span>
            </>
          )}
        </button>
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .animate-bounce-slow:hover {
          animation: none;
        }
      `}</style>
    </>
  )
}
