'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import { type Dictionary } from '@/get-dictionary'

import { type Locale } from '@/i18n-config'

interface FinalCTAProps {
  lang: Locale
  texts: Dictionary['home']['finalCTA']
}

export function FinalCTA({ lang, texts }: FinalCTAProps) {
  const t = texts
  const router = useRouter()
  const supabase = createSupabaseClient()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    productInterest: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Only email is required
    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)

    try {
      // Important: use returning: 'minimal' so anon insert doesn't require SELECT permission
      const { error } = await supabase.from('rfqs').insert([
        {
          name: formData.name || null,
          email: formData.email,
          country: formData.country || null,
          product_interest: formData.productInterest || null,
          message: formData.message || null,
          status: 'new',
          source: 'website',
          language_code: lang
        } as any
      ])

      if (error) throw error

      // Send email notification (non-blocking)
      fetch('/api/send-rfq-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          country: formData.country,
          productInterest: formData.productInterest,
          message: formData.message,
          formType: 'finalcta',
          pageUrl: window.location.href
        })
      }).catch(console.error)

      // Redirect to thank you page
      router.push(`/${lang}/thank-you`)
    } catch (error) {
      console.error('Error submitting RFQ:', error)
      alert(t.error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/final-cta-background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-900 opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left: Content */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              {t.subtitle}
            </p>
            <p className="text-blue-100 mb-8">
              {t.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <span className="text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.name}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.form.namePlaceholder}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.email} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.form.emailPlaceholder}
                  className={errors.email ? 'border-red-500' : ''}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.country}
                </label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder={t.form.countryPlaceholder}
                />
              </div>

              {/* Product Interest */}
              <div>
                <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.productInterest}
                </label>
                <select
                  id="productInterest"
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.form.productInterestPlaceholder}</option>
                  {t.productCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Response Time Promise */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                {t.responseTime}
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 italic">
                {t.privacyNote}
              </p>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={submitting}
                disabled={submitting}
              >
                {submitting ? t.form.submitting : t.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
