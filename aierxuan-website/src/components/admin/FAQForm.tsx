'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import SecureAITranslationButton from '@/components/admin/SecureAITranslationButton'

interface FAQTranslation {
  locale: string
  question: string
  answer: string
}

interface FAQFormData {
  category: string
  sort_order: number
  is_active: boolean
  translations: FAQTranslation[]
}

interface FAQFormProps {
  initialData?: FAQFormData
  faqId?: string
  mode: 'create' | 'edit'
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' }
]

const CATEGORIES = [
  'General',
  'Products',
  'Shipping',
  'Payment',
  'Technical',
  'Support',
  'Other'
]

const DEFAULT_TRANSLATION: FAQTranslation = {
  locale: 'en',
  question: '',
  answer: ''
}

export default function FAQForm({ initialData, faqId, mode }: FAQFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState('en')
  
  const [formData, setFormData] = useState<FAQFormData>(
    initialData || {
      category: CATEGORIES[0],
      sort_order: 0,
      is_active: true,
      translations: LANGUAGES.map(lang => ({
        ...DEFAULT_TRANSLATION,
        locale: lang.code
      }))
    }
  )
  
  const currentTranslation = formData.translations.find(
    t => t.locale === currentLang
  ) || DEFAULT_TRANSLATION

  const englishTranslation = formData.translations.find(t => t.locale === 'en') || DEFAULT_TRANSLATION
  
  const updateTranslation = (field: keyof FAQTranslation, value: string) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map(t =>
        t.locale === currentLang
          ? { ...t, [field]: value }
          : t
      )
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const endpoint = mode === 'create'
        ? '/api/admin/faq'
        : `/api/admin/faq/${faqId}`
      
      const method = mode === 'create' ? 'POST' : 'PATCH'
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response received:', await response.text())
        setError('Server error: Invalid response format. Please check the console for details.')
        return
      }

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/admin/faq')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save FAQ')
      }
    } catch (error) {
      console.error('Save error:', error)
      if (error instanceof SyntaxError) {
        setError('Server returned invalid data. Please check the console for details.')
      } else {
        setError('Network error. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <Input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                min="0"
              />
              <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Language Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Content (Multi-language)</h2>
              <div className="w-[260px] max-w-[55vw]">
                <SecureAITranslationButton
                  content={englishTranslation}
                  contentType="faq"
                  onTranslationComplete={(translations, results) => {
                    const raw =
                      Array.isArray(translations) && translations.length > 0
                        ? translations
                        : Array.isArray(results)
                          ? results
                              .filter((r: any) => r?.success && r?.content)
                              .map((r: any) => r.content)
                          : []

                    const normalized = raw
                      .map((item: any, idx: number) => {
                        const locale = item?.locale || (Array.isArray(results) ? (results as any[])[idx]?.language : undefined)
                        return {
                          locale: locale || 'en',
                          question: item?.question || '',
                          answer: item?.answer || ''
                        }
                      })
                      .filter((t: any) => t.locale && (t.question || t.answer))

                    const byLocale = new Map<string, any>(normalized.map((t: any) => [t.locale, t]))

                    setFormData(prev => ({
                      ...prev,
                      translations: prev.translations.map(t => {
                        const next = byLocale.get(t.locale)
                        return next ? { ...t, ...next } : t
                      })
                    }))
                  }}
                  disabled={!englishTranslation.question?.trim() || !englishTranslation.answer?.trim()}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentLang === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question ({LANGUAGES.find(l => l.code === currentLang)?.name})
            </label>
            <Input
              type="text"
              value={currentTranslation.question}
              onChange={(e) => updateTranslation('question', e.target.value)}
              placeholder="Enter the question"
              required={currentLang === 'en'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer (Markdown)
            </label>
            <textarea
              value={currentTranslation.answer}
              onChange={(e) => updateTranslation('answer', e.target.value)}
              placeholder="Enter the answer (Markdown supported)..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              required={currentLang === 'en'}
            />
            <p className="mt-1 text-sm text-gray-500">
              Supports Markdown formatting
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow p-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/faq')}
          disabled={loading}
        >
          Cancel
        </Button>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : mode === 'create' ? 'Create FAQ' : 'Update FAQ'}
        </Button>
      </div>
    </form>
  )
}
