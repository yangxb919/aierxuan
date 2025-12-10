'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import type { LanguageCode } from '@/types'
import type { Dictionary } from '@/get-dictionary'

// Form validation schema
const createRFQSchema = (texts: any) => z.object({
  name: z.string()
    .min(2, texts.minLength.replace('{min}', '2'))
    .max(100, texts.maxLength.replace('{max}', '100')),
  email: z.string()
    .email(texts.invalidEmail),
  company: z.string()
    .min(2, texts.minLength.replace('{min}', '2'))
    .max(200, texts.maxLength.replace('{max}', '200')),
  phone: z.string().optional(),
  productInterest: z.string()
    .min(2, texts.minLength.replace('{min}', '2'))
    .max(200, texts.maxLength.replace('{max}', '200')),
  message: z.string()
    .min(10, texts.minLength.replace('{min}', '10'))
    .max(2000, texts.maxLength.replace('{max}', '2000')),
  quantity: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  urgency: z.enum(['normal', 'urgent', 'flexible']).default('normal'),
  budgetRange: z.string().optional()
})

type RFQFormData = z.infer<ReturnType<typeof createRFQSchema>>

interface RFQFormProps {
  productSlug?: string
  onSuccess?: () => void
  className?: string
  lang: LanguageCode
  dictionary: Dictionary['rfq']
}

export function RFQForm({ productSlug, onSuccess, className = '', lang, dictionary }: RFQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createSupabaseClient()
  const texts = dictionary

  const schema = createRFQSchema(texts)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<RFQFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      productInterest: productSlug || '',
      urgency: 'normal',
      name: '',
      email: '',
      company: '',
      message: '',
      phone: '',
      quantity: '',
      country: '',
      industry: '',
      budgetRange: ''
    }
  })

  // Pre-fill form from URL parameters
  useEffect(() => {
    if (searchParams) {
      const productFromUrl = searchParams.get('product')
      if (productFromUrl && !productSlug) {
        setValue('productInterest', productFromUrl)
      }
    }
  }, [searchParams, productSlug, setValue])

  const onSubmit = async (data: RFQFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Get client information
      const clientInfo = {
        ip_address: null, // Will be handled by server
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        language_code: lang
      }

      // Submit to Supabase
      // Important: use returning: 'minimal' so anon insert doesn't require SELECT permission
      const { error } = await supabase
        .from('rfq_requests') // Updated table name
        .insert({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          product_interest: data.productInterest,
          message: data.message,
          quantity: data.quantity ? parseInt(data.quantity) : null,
          country: data.country,
          industry: data.industry,
          urgency: data.urgency,
          budget_range: data.budgetRange,
          ...clientInfo
        }, { returning: 'minimal' } as any) // Cast to any to avoid type error with returning

      if (error) {
        throw error
      }

      setSubmitStatus('success')
      reset()

      // Call success callback or redirect
      if (onSuccess) {
        onSuccess()
      } else {
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          router.push(`/${lang}/thank-you`)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting RFQ:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-black">
          {texts.title}
        </CardTitle>
        <p className="text-gray-600 text-center">
          {texts.subtitle}
        </p>
      </CardHeader>

      <CardContent>
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center font-medium">
              {texts.successMessage}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center font-medium">
              {texts.errorMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.name} *
              </label>
              <Input
                {...register('name')}
                placeholder={texts.namePlaceholder}
                error={errors.name?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.email} *
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder={texts.emailPlaceholder}
                error={errors.email?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.company} *
              </label>
              <Input
                {...register('company')}
                placeholder={texts.companyPlaceholder}
                error={errors.company?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.phone}
              </label>
              <Input
                {...register('phone')}
                placeholder={texts.phonePlaceholder}
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Product Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {texts.productInterest} *
            </label>
            <Input
              {...register('productInterest')}
              placeholder={texts.productPlaceholder}
              error={errors.productInterest?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {texts.message} *
            </label>
            <textarea
              {...register('message')}
              placeholder={texts.messagePlaceholder}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.quantity}
              </label>
              <Input
                {...register('quantity')}
                placeholder={texts.quantityPlaceholder}
                error={errors.quantity?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.country}
              </label>
              <Input
                {...register('country')}
                placeholder={texts.countryPlaceholder}
                error={errors.country?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.industry}
              </label>
              <Input
                {...register('industry')}
                placeholder={texts.industryPlaceholder}
                error={errors.industry?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.urgency}
              </label>
              <select
                {...register('urgency')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="normal">{texts.urgencyNormal}</option>
                <option value="urgent">{texts.urgencyUrgent}</option>
                <option value="flexible">{texts.urgencyFlexible}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.budgetRange}
              </label>
              <Input
                {...register('budgetRange')}
                placeholder={texts.budgetPlaceholder}
                error={errors.budgetRange?.message}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? texts.submitting : texts.submitButton}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
