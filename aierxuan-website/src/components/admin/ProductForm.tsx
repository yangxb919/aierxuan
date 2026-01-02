'use client'

import { useState, useRef, RefObject } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { getCategoryLabel } from '@/lib/categories'
import { useLanguage } from '@/store/useAppStore'
import SecureAITranslationButton from './SecureAITranslationButton'

interface QualityTest {
  title: string
  value: string
  unit?: string
  status?: string
  icon?: string
  __gallery_meta?: boolean
  durability_images?: string[]
  oem_images?: string[]
}

interface OemService {
  title: string
  description: string
  icon?: string
}

interface FaqItem {
  question: string
  answer: string
}

interface ProductTranslation {
  locale: string
  title: string
  short_desc: string
  long_desc: string
  key_specs: Array<{ label: string; value: string }> | Record<string, string>
  seo_title: string
  seo_desc: string
  quality_tests: QualityTest[]
  oem_services: OemService[]
  faqs: FaqItem[]
  durability_images?: string[]
  oem_images?: string[]
  features?: Record<string, any> | null
}

interface ProductFormData {
  slug: string
  category: string
  status: string
  featured: boolean
  sort_order: number
  moq?: number
  price?: number
  datasheet_url?: string
  images: string[]
  translations: ProductTranslation[]
}

interface ProductFormProps {
  initialData?: ProductFormData
  productId?: string
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

// Product categories restricted to three options per requirement
const CATEGORIES = [
  '商务本',
  '游戏本',
  '迷你主机',
]

const DEFAULT_TRANSLATION: ProductTranslation = {
  locale: 'en',
  title: '',
  short_desc: '',
  long_desc: '',
  key_specs: [],
  seo_title: '',
  seo_desc: '',
  quality_tests: [],
  oem_services: [],
  faqs: [],
  durability_images: [],
  oem_images: [],
  features: {}
}

type GalleryField = 'durability_images' | 'oem_images'

const getGalleryImages = (value: any, field: GalleryField): string[] => {
  if (Array.isArray(value?.[field])) {
    return value[field].filter(Boolean)
  }
  const features = value?.features
  if (features && typeof features === 'object' && !Array.isArray(features)) {
    const fromFeatures = features[field]
    if (Array.isArray(fromFeatures)) {
      return fromFeatures.filter(Boolean)
    }
  }
  return []
}

const extractGalleryMeta = (qualityTests: any[] | undefined) => {
  const tests = Array.isArray(qualityTests) ? qualityTests : []
  let durability_images: string[] = []
  let oem_images: string[] = []
  const filtered = tests.filter((t) => {
    if (t && t.__gallery_meta) {
      durability_images = Array.isArray(t.durability_images) ? t.durability_images.filter(Boolean) : []
      oem_images = Array.isArray(t.oem_images) ? t.oem_images.filter(Boolean) : []
      return false
    }
    return true
  })
  return { filtered, durability_images, oem_images }
}

const normalizeLocale = (t: any) => ({
  ...t,
  locale: t.locale || t.language_code || 'en'
})

export default function ProductForm({ initialData, productId, mode }: ProductFormProps) {
  const router = useRouter()
  const language = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState('en')
  
  const [formData, setFormData] = useState<ProductFormData>(() => {
    if (!initialData) {
      // Create mode: initialize with all languages
      return {
        slug: '',
        category: CATEGORIES[0],
        status: 'active',
        featured: false,
        sort_order: 0,
        moq: 100,
        price: undefined,
        datasheet_url: '',
        images: [],
        translations: LANGUAGES.map(lang => ({
          ...DEFAULT_TRANSLATION,
          locale: lang.code
        }))
      }
    }

    // Edit mode: ensure all languages exist
    const existingTranslations = new Map(
      initialData.translations.map(t => {
        const normalized = normalizeLocale(t)
        return [normalized.locale, normalized]
      })
    )

    const allTranslations = LANGUAGES.map(lang => {
      if (existingTranslations.has(lang.code)) {
        const value = existingTranslations.get(lang.code)!
        const { filtered, durability_images, oem_images } = extractGalleryMeta(value.quality_tests)
        return {
          ...DEFAULT_TRANSLATION,
          ...value,
          quality_tests: filtered,
          oem_services: Array.isArray(value.oem_services) ? value.oem_services : [],
          faqs: Array.isArray(value.faqs) ? value.faqs : [],
          durability_images: getGalleryImages(value, 'durability_images').concat(durability_images).filter(Boolean),
          oem_images: getGalleryImages(value, 'oem_images').concat(oem_images).filter(Boolean),
          features: value.features || {}
        }
      }
      return {
        ...DEFAULT_TRANSLATION,
        locale: lang.code
      }
    })

    return {
      ...initialData,
      datasheet_url: initialData.datasheet_url || '',
      translations: allTranslations
    }
  })
  
  const rawTranslation = formData.translations.find(
    t => t.locale === currentLang || (t as any).language_code === currentLang
  ) || DEFAULT_TRANSLATION

  const { filtered: normalizedTests, durability_images: metaDurability, oem_images: metaOem } = extractGalleryMeta(rawTranslation.quality_tests)

  const currentTranslation = {
    ...DEFAULT_TRANSLATION,
    ...rawTranslation,
    quality_tests: normalizedTests,
    durability_images: getGalleryImages(rawTranslation, 'durability_images').concat(metaDurability).filter(Boolean),
    oem_images: getGalleryImages(rawTranslation, 'oem_images').concat(metaOem).filter(Boolean),
    features: rawTranslation?.features || {}
  }
  
  const updateTranslation = (field: keyof ProductTranslation, value: any) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map(t =>
        t.locale === currentLang
          ? { ...t, [field]: value }
          : t
      )
    }))
  }

  const updateGalleryImages = (field: GalleryField, updater: (images: string[]) => string[]) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map(t => {
        if (t.locale !== currentLang) return t
        const existing = getGalleryImages(t, field)
        const updated = updater(existing).filter(Boolean)
        const features = t.features && typeof t.features === 'object' && !Array.isArray(t.features)
          ? { ...t.features }
          : {}
        return {
          ...t,
          [field]: updated,
          features: { ...features, [field]: updated }
        }
      })
    }))
  }
  
  // Normalize key_specs to array format
  const normalizeKeySpecs = (specs: Array<{ label: string; value: string }> | Record<string, string>): Array<{ label: string; value: string }> => {
    if (Array.isArray(specs)) {
      return specs
    }
    return Object.entries(specs).map(([label, value]) => ({ label, value }))
  }

  const addSpec = () => {
    const label = prompt('Enter specification name (e.g., "Processor", "Memory"):')
    if (label) {
      const specs = normalizeKeySpecs(currentTranslation.key_specs)
      updateTranslation('key_specs', [...specs, { label, value: '' }])
    }
  }

  const updateSpec = (index: number, field: 'label' | 'value', newValue: string) => {
    const specs = normalizeKeySpecs(currentTranslation.key_specs)
    const updated = [...specs]
    updated[index] = { ...updated[index], [field]: newValue }
    updateTranslation('key_specs', updated)
  }

  const removeSpec = (index: number) => {
    const specs = normalizeKeySpecs(currentTranslation.key_specs)
    updateTranslation('key_specs', specs.filter((_, i) => i !== index))
  }

  const addQualityTest = () => {
    const tests = currentTranslation.quality_tests || []
    updateTranslation('quality_tests', [
      ...tests,
      { title: '', value: '', unit: '', status: 'passed', icon: '' }
    ])
  }

  const updateQualityTest = (index: number, field: keyof QualityTest, value: string) => {
    const tests = [...(currentTranslation.quality_tests || [])]
    tests[index] = { ...tests[index], [field]: value }
    updateTranslation('quality_tests', tests)
  }

  const removeQualityTest = (index: number) => {
    const tests = (currentTranslation.quality_tests || []).filter((_, i) => i !== index)
    updateTranslation('quality_tests', tests)
  }

  const addOemService = () => {
    const services = currentTranslation.oem_services || []
    updateTranslation('oem_services', [
      ...services,
      { title: '', description: '', icon: '' }
    ])
  }

  const updateOemService = (index: number, field: keyof OemService, value: string) => {
    const services = [...(currentTranslation.oem_services || [])]
    services[index] = { ...services[index], [field]: value }
    updateTranslation('oem_services', services)
  }

  const removeOemService = (index: number) => {
    const services = (currentTranslation.oem_services || []).filter((_, i) => i !== index)
    updateTranslation('oem_services', services)
  }

  const addFaq = () => {
    const faqs = currentTranslation.faqs || []
    updateTranslation('faqs', [
      ...faqs,
      { question: '', answer: '' }
    ])
  }

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const faqs = [...(currentTranslation.faqs || [])]
    faqs[index] = { ...faqs[index], [field]: value }
    updateTranslation('faqs', faqs)
  }

  const removeFaq = (index: number) => {
    const faqs = (currentTranslation.faqs || []).filter((_, i) => i !== index)
    updateTranslation('faqs', faqs)
  }
  
  const [showImageModal, setShowImageModal] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [sectionImageError, setSectionImageError] = useState<string | null>(null)
  const [sectionUploading, setSectionUploading] = useState<GalleryField | null>(null)
  const durabilityFileInputRef = useRef<HTMLInputElement>(null)
  const oemFileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size must be less than 5MB')
      return
    }

    setUploadingImage(true)
    setImageError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'product')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, data.url]
        }))
        setShowImageModal(false)
      } else {
        setImageError(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setImageError('Failed to upload image')
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleAddImageUrl = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }))
      setShowImageModal(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSectionImageUpload = async (field: GalleryField, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setSectionImageError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setSectionImageError('Image size must be less than 5MB')
      return
    }

    setSectionUploading(field)
    setSectionImageError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'product')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        updateGalleryImages(field, (images) => [...images, data.url])
      } else {
        setSectionImageError(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setSectionImageError('Failed to upload image')
    } finally {
      setSectionUploading(null)
      if (e.target) {
        e.target.value = ''
      }
    }
  }

  const handleAddSectionImageUrl = (field: GalleryField) => {
    const url = prompt('Enter image URL:')
    if (url) {
      updateGalleryImages(field, (images) => [...images, url])
    }
  }

  const removeSectionImage = (field: GalleryField, index: number) => {
    updateGalleryImages(field, (images) => images.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const endpoint = mode === 'create'
        ? '/api/admin/products'
        : `/api/admin/products/${productId}`

      const method = mode === 'create' ? 'POST' : 'PATCH'

      // Convert key_specs from array to object format for API
      const formDataForApi = {
        ...formData,
        translations: formData.translations.map(t => {
          const key_specs = Array.isArray(t.key_specs)
            ? t.key_specs.reduce((acc, { label, value }) => {
                if (label && label.trim()) {
                  acc[label] = value
                }
                return acc
              }, {} as Record<string, string>)
            : t.key_specs
          const durability_images = getGalleryImages(t, 'durability_images')
          const oem_images = getGalleryImages(t, 'oem_images')
          const baseTests = Array.isArray(t.quality_tests)
            ? t.quality_tests.filter((item) => !(item && item.__gallery_meta))
            : []
          const galleryMeta = { __gallery_meta: true, durability_images, oem_images }

          return {
            ...t,
            key_specs,
            quality_tests: [...baseTests, galleryMeta],
            features: undefined,
            durability_images: undefined,
            oem_images: undefined
          }
        })
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataForApi),
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
        router.push('/admin/products')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save product')
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

  const renderGallerySection = (
    field: GalleryField,
    title: string,
    hint: string,
    inputRef: RefObject<HTMLInputElement | null>
  ) => {
    const images = field === 'durability_images'
      ? currentTranslation.durability_images || []
      : currentTranslation.oem_images || []
    const isUploading = sectionUploading === field

    return (
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {title}
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="text-xs"
            >
              {isUploading ? 'Uploading...' : 'Upload image'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAddSectionImageUrl(field)}
              disabled={isUploading}
              className="text-xs"
            >
              Add via URL
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3">{hint}</p>
        {sectionImageError && (
          <p className="text-sm text-red-600 mb-2">{sectionImageError}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleSectionImageUpload(field, e)}
          className="hidden"
        />
        {images.length === 0 ? (
          <p className="text-sm text-gray-500">No images added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((url, index) => (
              <div key={`${field}-${index}`} className="relative group overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={url}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeSectionImage(field, index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL)
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="industrial-robot-arm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              { /* Ensure existing products with legacy category still display as an option */ }
              {(() => {
                const categoryOptions = CATEGORIES.includes(formData.category)
                  ? CATEGORIES
                  : [formData.category, ...CATEGORIES]
                return (
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{getCategoryLabel(cat, 'en')}</option>
                ))}
              </select>
                )
              })()}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="discontinued">Discontinued</option>
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
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>

          {/* MOQ and Price */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MOQ (Minimum Order Quantity)
              </label>
              <Input
                type="number"
                value={formData.moq || ''}
                onChange={(e) => setFormData({ ...formData, moq: parseInt(e.target.value) || undefined })}
                placeholder="100"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum units required per order</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD per unit)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || undefined })}
                placeholder="299.99"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to show "Contact for Price"</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datasheet URL (PDF)
            </label>
            <Input
              type="url"
              value={formData.datasheet_url || ''}
              onChange={(e) => setFormData({ ...formData, datasheet_url: e.target.value })}
              placeholder="https://cdn.example.com/specs/product.pdf"
            />
            <p className="text-xs text-gray-500 mt-1">Optional. Used for the “Download Spec Sheet” button.</p>
          </div>
        </div>
      </div>
      
      {/* Images */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
          <Button type="button" variant="outline" onClick={() => setShowImageModal(true)}>
            + Add Image
          </Button>
        </div>

        {formData.images.length === 0 ? (
          <p className="text-sm text-gray-500">No images added yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {formData.images.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Product Image</h3>

            {imageError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{imageError}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Upload from local */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload from Computer
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full"
                >
                  {uploadingImage ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Choose File
                    </>
                  )}
                </Button>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Add by URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add from URL
                </label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddImageUrl}
                  disabled={uploadingImage}
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Enter Image URL
                </Button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowImageModal(false)
                  setImageError(null)
                }}
                disabled={uploadingImage}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Language Tabs - Content continues in next section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Content (Multi-language)</h2>
              <SecureAITranslationButton
                content={formData.translations.find(t => t.locale === 'en') || DEFAULT_TRANSLATION}
                contentType="product"
                onTranslationComplete={(translations, results) => {
                  console.log('🎯 Product Translation Complete')
                  console.log('📥 Received translations:', translations)
                  console.log('📥 Received results:', results)

                  // 1) Build a normalized array of items with a locale and product-shaped fields
                  const raw = (Array.isArray(translations) && translations.length > 0)
                    ? translations
                    : (Array.isArray(results)
                        ? results.filter((r:any)=>r?.success && r?.content).map((r:any)=>r.content)
                        : [])

                  console.log('📦 Raw data:', raw)

                  const normalized = raw.map((item:any, idx:number) => {
                    const locale = item?.locale || (Array.isArray(results) ? results[idx]?.language : undefined)
                    const safeLocale = locale || 'en'
                    console.log(`🔍 Processing item ${idx}: locale=${locale}, safeLocale=${safeLocale}`)
                    console.log(`🔍 Item data:`, item)

                    // Accept blog-style keys as fallback to ensure backfill
                    const normalized = {
                      locale: safeLocale,
                      // Only include fields that are actually present to avoid overwriting with empty strings
                      ...(item?.title ? { title: item.title } : {}),
                      ...(item?.short_desc ? { short_desc: item.short_desc } : (item?.excerpt ? { short_desc: item.excerpt } : {})),
                      ...(item?.long_desc ? { long_desc: item.long_desc } : (item?.body ? { long_desc: item.body } : {})),
                      ...(item?.seo_title ? { seo_title: item.seo_title } : {}),
                      ...(item?.seo_desc ? { seo_desc: item.seo_desc } : (item?.meta_description ? { seo_desc: item.meta_description } : {})),
                      ...(item?.key_specs ? { key_specs: item.key_specs } : {}),
                    }
                    console.log(`✅ Normalized item ${idx}:`, normalized)
                    return normalized
                  })

                  console.log('📦 All normalized data:', normalized)

                  // 2) Merge back into form state by locale
                  setFormData(prev => {
                    console.log('📋 Previous translations:', prev.translations.map(t => ({ locale: t.locale, title: t.title?.substring(0, 30) })))

                    const byLocale = new Map<string, any>(normalized.map((t:any)=>[t.locale, t]))
                    console.log('🗺️ Locale map keys:', Array.from(byLocale.keys()))

                    const merged = prev.translations.map(t => {
                      const hasMatch = byLocale.has(t.locale)
                      console.log(`🔍 Checking ${t.locale}: hasMatch=${hasMatch}`)
                      if (hasMatch) {
                        const newData = byLocale.get(t.locale)
                        console.log(`✅ Merging ${t.locale}:`, newData)
                        return { ...t, ...newData }
                      }
                      console.log(`⏭️ Skipping ${t.locale}`)
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
              placeholder="Enter product title"
              required={currentLang === 'en'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              value={currentTranslation.short_desc}
              onChange={(e) => updateTranslation('short_desc', e.target.value)}
              placeholder="Brief product description (1-2 sentences)"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Long Description (Markdown)
            </label>
            <textarea
              value={currentTranslation.long_desc}
              onChange={(e) => updateTranslation('long_desc', e.target.value)}
              placeholder="Detailed product description with Markdown formatting..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm text-gray-900"
              required={currentLang === 'en'}
            />
          </div>

          {renderGallerySection(
            'durability_images',
            'Durability Section Images',
            'Shown in the "Engineered for Durability" collage. Upload up to three detailed internals shots.',
            durabilityFileInputRef
          )}

          {renderGallerySection(
            'oem_images',
            'OEM/ODM Collage Images',
            'Shown on the OEM/ODM services collage. Upload up to four visuals (logos, packaging, branding).',
            oemFileInputRef
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Specifications
              </label>
              <Button type="button" variant="outline" onClick={addSpec} className="text-xs">
                + Add Spec
              </Button>
            </div>

            {normalizeKeySpecs(currentTranslation.key_specs).length === 0 ? (
              <p className="text-sm text-gray-500">No specifications added yet.</p>
            ) : (
              <div className="space-y-2">
                {normalizeKeySpecs(currentTranslation.key_specs).map((spec, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        type="text"
                        value={spec.label}
                        onChange={(e) => updateSpec(index, 'label', e.target.value)}
                        placeholder="Label (e.g., Processor)"
                      />
                      <Input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        placeholder="Value"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Quality Tests
              </label>
              <Button type="button" variant="outline" onClick={addQualityTest} className="text-xs">
                + Add Test
              </Button>
            </div>
            {(currentTranslation.quality_tests || []).length === 0 ? (
              <p className="text-sm text-gray-500">No quality tests defined. Add entries to power the QA grid.</p>
            ) : (
              <div className="space-y-3">
                {(currentTranslation.quality_tests || []).map((test, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 items-end">
                    <Input
                      placeholder="Test title"
                      value={test.title}
                      onChange={(e) => updateQualityTest(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      value={test.value}
                      onChange={(e) => updateQualityTest(index, 'value', e.target.value)}
                    />
                    <Input
                      placeholder="Unit"
                      value={test.unit || ''}
                      onChange={(e) => updateQualityTest(index, 'unit', e.target.value)}
                    />
                    <Input
                      placeholder="Status (e.g., passed)"
                      value={test.status || ''}
                      onChange={(e) => updateQualityTest(index, 'status', e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Icon (shield, thermometer...)"
                        value={test.icon || ''}
                        onChange={(e) => updateQualityTest(index, 'icon', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeQualityTest(index)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Remove quality test"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                OEM / Customization Services
              </label>
              <Button type="button" variant="outline" onClick={addOemService} className="text-xs">
                + Add Service
              </Button>
            </div>
            {(currentTranslation.oem_services || []).length === 0 ? (
              <p className="text-sm text-gray-500">No OEM services configured.</p>
            ) : (
              <div className="space-y-3">
                {(currentTranslation.oem_services || []).map((service, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 items-start">
                    <Input
                      placeholder="Service title"
                      value={service.title}
                      onChange={(e) => updateOemService(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Icon (settings, monitor, box...)"
                      value={service.icon || ''}
                      onChange={(e) => updateOemService(index, 'icon', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <textarea
                        placeholder="Short description"
                        value={service.description}
                        onChange={(e) => updateOemService(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => removeOemService(index)}
                        className="text-red-600 hover:text-red-800 self-start"
                        aria-label="Remove OEM service"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                FAQs
              </label>
              <Button type="button" variant="outline" onClick={addFaq} className="text-xs">
                + Add FAQ
              </Button>
            </div>
            {(currentTranslation.faqs || []).length === 0 ? (
              <p className="text-sm text-gray-500">No FAQs added yet.</p>
            ) : (
              <div className="space-y-3">
                {(currentTranslation.faqs || []).map((faq, index) => (
                  <div key={index} className="space-y-2 border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">FAQ #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <Input
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) => updateFaq(index, 'question', e.target.value)}
                    />
                    <textarea
                      placeholder="Answer"
                      value={faq.answer}
                      onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Title
            </label>
            <Input
              type="text"
              value={currentTranslation.seo_title}
              onChange={(e) => updateTranslation('seo_title', e.target.value)}
              placeholder="SEO-optimized title (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Description
            </label>
            <textarea
              value={currentTranslation.seo_desc}
              onChange={(e) => updateTranslation('seo_desc', e.target.value)}
              placeholder="Description for search engines (150-160 characters)"
              rows={2}
              maxLength={160}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">
              {currentTranslation.seo_desc.length}/160 characters
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/products')}
          disabled={loading}
        >
          Cancel
        </Button>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
      </div>
    </form>
  )
}
