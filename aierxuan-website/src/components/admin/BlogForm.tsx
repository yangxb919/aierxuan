'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import MarkdownEditor from './MarkdownEditor'
import ImageUpload from './ImageUpload'
import SecureAITranslationButton from './SecureAITranslationButton'

interface BlogTranslation {
  locale: string
  title: string
  excerpt: string
  body: string
  meta_description: string
}

interface BlogFormData {
  slug: string
  status: string
  published_at: string | null
  cover_image: string | null
  translations: BlogTranslation[]
}

interface BlogFormProps {
  initialData?: BlogFormData
  postId?: string
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

const DEFAULT_TRANSLATION: BlogTranslation = {
  locale: 'en',
  title: '',
  excerpt: '',
  body: '',
  meta_description: ''
}

export default function BlogForm({ initialData, postId, mode }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState('en')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  const [formData, setFormData] = useState<BlogFormData>(() => {
    if (!initialData) {
      // Create mode: initialize with all languages
      return {
        slug: '',
        status: 'draft',
        published_at: null,
        cover_image: null,
        translations: LANGUAGES.map(lang => ({
          ...DEFAULT_TRANSLATION,
          locale: lang.code
        }))
      }
    }

    // Edit mode: ensure all languages exist
    const existingTranslations = new Map(
      initialData.translations.map(t => [t.locale, t])
    )

    const allTranslations = LANGUAGES.map(lang => {
      if (existingTranslations.has(lang.code)) {
        return existingTranslations.get(lang.code)!
      }
      return {
        ...DEFAULT_TRANSLATION,
        locale: lang.code
      }
    })

    return {
      ...initialData,
      translations: allTranslations
    }
  })
  
  const currentTranslation = formData.translations.find(
    t => t.locale === currentLang
  ) || DEFAULT_TRANSLATION

  // Generate SEO-friendly slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove special characters except hyphens
      .replace(/[^\w\-]+/g, '')
      // Replace multiple hyphens with single hyphen
      .replace(/\-\-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      // Limit length to 100 characters
      .substring(0, 100)
  }

  const updateTranslation = (field: keyof BlogTranslation, value: string) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map(t =>
        t.locale === currentLang
          ? { ...t, [field]: value }
          : t
      )
    }))

    // Auto-generate slug from English title if not manually edited
    if (field === 'title' && currentLang === 'en' && !slugManuallyEdited) {
      const newSlug = generateSlug(value)
      setFormData(prev => ({
        ...prev,
        slug: newSlug
      }))
    }
  }
  
  const handleSubmit = async (e: React.FormEvent, publishNow: boolean = false) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const endpoint = mode === 'create'
        ? '/api/admin/blog'
        : `/api/admin/blog/${postId}`
      
      const method = mode === 'create' ? 'POST' : 'PATCH'
      
      const submitData = {
        ...formData,
        status: publishNow ? 'published' : formData.status,
        published_at: publishNow ? new Date().toISOString() : formData.published_at
      }
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
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
        router.push('/admin/blog')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save blog post')
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
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL)
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setFormData({ ...formData, slug: e.target.value })
                    setSlugManuallyEdited(true)
                  }}
                  placeholder="my-blog-post"
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const englishTitle = formData.translations.find(t => t.locale === 'en')?.title || ''
                  if (englishTitle) {
                    const newSlug = generateSlug(englishTitle)
                    setFormData({ ...formData, slug: newSlug })
                    setSlugManuallyEdited(false)
                  }
                }}
                disabled={!formData.translations.find(t => t.locale === 'en')?.title}
                className="whitespace-nowrap"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerate
              </Button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {slugManuallyEdited ? (
                <span className="text-amber-600">
                  ⚠️ Manually edited. Click "Regenerate" to auto-generate from title.
                </span>
              ) : (
                <span>
                  Auto-generated from English title. Will be: <span className="font-mono text-blue-600">/blog/{formData.slug || 'your-post-title'}</span>
                </span>
              )}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <ImageUpload
              value={formData.cover_image}
              onChange={(url) => setFormData({ ...formData, cover_image: url })}
              label="Cover Image"
            />
            <p className="mt-1 text-sm text-gray-500">
              Recommended size: 1200x630px (16:9 ratio)
            </p>
          </div>
        </div>
      </div>
      
      {/* Language Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Content (Multi-language)</h2>
              <SecureAITranslationButton
                content={formData.translations.find(t => t.locale === 'en') || DEFAULT_TRANSLATION}
                contentType="blog"
                onTranslationComplete={(translations, results) => {
                  console.log('📥 Received translations:', translations)
                  console.log('📥 Received results:', results)

                  // 详细检查results
                  if (Array.isArray(results)) {
                    console.log('🔍 Results array length:', results.length)
                    results.forEach((r, i) => {
                      console.log(`🔍 Result[${i}]:`, {
                        language: r?.language,
                        success: r?.success,
                        hasContent: !!r?.content,
                        content: r?.content
                      })
                    })
                  }

                  const normalized = (translations && translations.length > 0)
                    ? translations
                    : (Array.isArray(results) ? results.filter((r:any)=>r?.success && r?.content).map((r:any)=>r.content) : [])

                  console.log('📦 Normalized data:', normalized)
                  console.log('📦 Normalized data length:', normalized?.length)

                  setFormData(prev => {
                    console.log('📋 Previous translations:', prev.translations.map(t => ({ locale: t.locale, title: t.title?.substring(0, 30) })))

                    const byLocale = new Map<string, any>(
                      (normalized || []).map((t: any) => [t.locale, t])
                    )
                    console.log('🗺️ Locale map keys:', Array.from(byLocale.keys()))
                    console.log('🗺️ Locale map entries:', Array.from(byLocale.entries()).map(([k, v]) => [k, { title: v.title?.substring(0, 30) }]))

                    const merged = prev.translations.map(t => {
                      console.log(`🔍 Checking locale: ${t.locale}, exists in map: ${byLocale.has(t.locale)}`)
                      if (byLocale.has(t.locale)) {
                        const newData = byLocale.get(t.locale)!
                        console.log(`✅ Merging ${t.locale}:`, { title: newData.title?.substring(0, 30) })
                        return { ...t, ...newData }
                      }
                      console.log(`⏭️ Skipping ${t.locale} (no match)`)
                      return t
                    })

                    console.log('🔄 Merged translations:', merged.map(t => ({ locale: t.locale, title: t.title?.substring(0, 30) })))
                    return { ...prev, translations: merged }
                  })
                }}
                disabled={!formData.translations.find(t => t.locale === 'en')?.title}
              />
            </div>
            <div className="flex flex-wrap gap-4 border-b border-gray-200">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setCurrentLang(lang.code)}
                  className={`pb-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    currentLang === lang.code
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
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
              Title ({LANGUAGES.find(l => l.code === currentLang)?.name})
            </label>
            <Input
              type="text"
              value={currentTranslation.title}
              onChange={(e) => updateTranslation('title', e.target.value)}
              placeholder="Enter blog post title"
              required={currentLang === 'en'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              value={currentTranslation.excerpt}
              onChange={(e) => updateTranslation('excerpt', e.target.value)}
              placeholder="Brief summary of the blog post"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Content
            </label>
            <MarkdownEditor
              value={currentTranslation.body}
              onChange={(value) => updateTranslation('body', value)}
              placeholder="Write your blog post content here. You can use Markdown formatting and upload images..."
              minHeight="500px"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description (SEO)
            </label>
            <textarea
              value={currentTranslation.meta_description}
              onChange={(e) => updateTranslation('meta_description', e.target.value)}
              placeholder="Description for search engines (150-160 characters)"
              rows={2}
              maxLength={160}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">
              {currentTranslation.meta_description.length}/160 characters
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/blog')}
          disabled={loading}
        >
          Cancel
        </Button>
        
        <div className="flex items-center space-x-4">
          <Button
            type="submit"
            variant="outline"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save as Draft'}
          </Button>
          
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Now'}
          </Button>
        </div>
      </div>
    </form>
  )
}
