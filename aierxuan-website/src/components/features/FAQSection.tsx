'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { createSupabaseClient } from '@/lib/supabase'
import { useLanguage } from '@/store/useAppStore'
import { getTranslation } from '@/lib/utils'
import type { FAQ, FAQTranslation, LanguageCode } from '@/types'

// FAQ section translations
const faqSectionTexts = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about our products and services',
    loadingError: 'Failed to load FAQ',
    noFAQs: 'No frequently asked questions available at the moment.',
    tryAgain: 'Try Again'
  },
  ru: {
    title: 'Часто задаваемые вопросы',
    subtitle: 'Найдите ответы на распространенные вопросы о наших продуктах и услугах',
    loadingError: 'Не удалось загрузить FAQ',
    noFAQs: 'В настоящее время нет часто задаваемых вопросов.',
    tryAgain: 'Попробовать снова'
  },
  ja: {
    title: 'よくある質問',
    subtitle: '製品とサービスに関するよくある質問の答えを見つけてください',
    loadingError: 'FAQの読み込みに失敗しました',
    noFAQs: '現在、よくある質問はありません。',
    tryAgain: '再試行'
  },
  fr: {
    title: 'Questions Fréquemment Posées',
    subtitle: 'Trouvez des réponses aux questions courantes sur nos produits et services',
    loadingError: 'Échec du chargement de la FAQ',
    noFAQs: 'Aucune question fréquemment posée disponible pour le moment.',
    tryAgain: 'Réessayer'
  },
  pt: {
    title: 'Perguntas Frequentes',
    subtitle: 'Encontre respostas para perguntas comuns sobre nossos produtos e serviços',
    loadingError: 'Falha ao carregar FAQ',
    noFAQs: 'Nenhuma pergunta frequente disponível no momento.',
    tryAgain: 'Tentar Novamente'
  },
  'zh-CN': {
    title: '常见问题',
    // Updated to match provided design copy
    subtitle: '快速了解我们的服务详情',
    loadingError: '加载FAQ失败',
    noFAQs: '目前没有常见问题。',
    tryAgain: '重试'
  }
}

interface FAQWithTranslations extends FAQ {
  translations: FAQTranslation[]
}

interface FAQItemProps {
  faq: FAQWithTranslations
  language: LanguageCode
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ faq, language, isOpen, onToggle }: FAQItemProps) {
  const translation = getTranslation(faq, language)
  
  if (!translation?.question || !translation?.answer) {
    return null
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <button
        className="w-full px-5 py-4 md:px-6 md:py-5 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors rounded-xl"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-medium text-slate-900 pr-4">
          {translation.question}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-5 pb-4 md:px-6 md:pb-6">
          <div className="text-slate-700 leading-relaxed whitespace-pre-line">
            {translation.answer}
          </div>
        </div>
      )}
    </div>
  )
}

interface FAQSectionProps {
  className?: string
  maxItems?: number
}

export function FAQSection({ className = '', maxItems }: FAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQWithTranslations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const language = useLanguage()
  const supabase = createSupabaseClient()
  const texts = faqSectionTexts[language] || faqSectionTexts.en

  useEffect(() => {
    async function fetchFAQs() {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from('faq')
          .select(`
            *,
            translations:faq_translations(*)
          `)
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (maxItems) {
          query = query.limit(maxItems)
        }

        const { data, error: fetchError } = await query

        if (fetchError) {
          throw fetchError
        }

        setFaqs(data || [])
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError(texts.loadingError)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [supabase, texts.loadingError, maxItems])

  const toggleItem = (faqId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(faqId)) {
        newSet.delete(faqId)
      } else {
        newSet.add(faqId)
      }
      return newSet
    })
  }

  const retryFetch = () => {
    setError(null)
    setLoading(true)
    // Re-trigger useEffect
    window.location.reload()
  }

  if (loading) {
    return (
      <section className={`py-20 bg-gray-50 ${className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={`py-20 bg-gray-50 ${className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="text-red-800 mb-4">
              <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">{error}</p>
            </div>
            <button
              onClick={retryFetch}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {texts.tryAgain}
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (faqs.length === 0) {
    return (
      <section className={`py-20 bg-gray-50 ${className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {texts.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-8">
            {texts.subtitle}
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <p className="text-gray-600">{texts.noFAQs}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {texts.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            {texts.subtitle}
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              language={language}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
