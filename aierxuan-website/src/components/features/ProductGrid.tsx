'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import { getTranslation } from '@/lib/utils'
import { normalizeAssetUrl } from '@/lib/assetUtils'
import { useContactForm } from '@/hooks/useContactForm'
import type { ProductWithTranslations, LanguageCode } from '@/types'
import { getCategoryLabel, getCategoryType } from '@/lib/categories'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

interface ProductGridProps {
  featured?: boolean
  limit?: number
  category?: string
  lang: LanguageCode
  dictionary: {
    grid: {
      noDescription: string
      sku: string
      contactForPrice: string
      viewDetails: string
      quote: string
      noProducts: string
      errorMessage: string
      tryAgain: string
      productImage: string
    }
    advantages: {
      premium: string
      cooling: string
      manufacturing: string
    }
  }
}

export function ProductGrid({ featured = false, limit, category, lang, dictionary }: ProductGridProps) {
  const [products, setProducts] = useState<ProductWithTranslations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createSupabaseClient()
  const texts = dictionary.grid

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from('products')
          .select(`
            *,
            translations:product_translations(*)
          `)
          .eq('status', 'active')

        if (featured) {
          query = query.eq('featured', true)
        }

        if (category) {
          query = query.eq('category', category)
        }

        if (limit) {
          query = query.limit(limit)
        }

        query = query.order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })

        const { data, error: fetchError } = await query

        if (fetchError) {
          throw fetchError
        }

        setProducts(data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(texts.errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [featured, limit, category, supabase, texts.errorMessage])

  if (loading) {
    return <ProductGridSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
          {texts.tryAgain}
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">{texts.noProducts}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          lang={lang}
          dictionary={dictionary}
          index={index}
        />
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: ProductWithTranslations
  lang: LanguageCode
  dictionary: ProductGridProps['dictionary']
  index: number
}

function ProductCard({ product, lang, dictionary, index }: ProductCardProps) {
  const translation = getTranslation(product, lang, 'language_code')
  const { openContactModal } = useContactForm()
  const texts = dictionary.grid
  const images = product.images as string[] | null

  // Prefer uploaded product image, otherwise choose by normalized category type
  let primaryImage = (images && images.length > 0 ? images[0] : '') as string
  if (!primaryImage) {
    primaryImage = '/images/business-laptop-series.webp'
  }
  if (!images || images.length === 0) {
    const catType = getCategoryType(product.category)
    if (catType === 'gaming') primaryImage = '/images/business-laptop-series.webp'
    else if (catType === 'mini') primaryImage = '/images/mini-pc-workstation.webp'
    else if (catType === 'business') primaryImage = '/images/business-laptop-series.webp'
  }
  // Normalize path to root to avoid locale prefixes on uploads
  primaryImage = normalizeAssetUrl(primaryImage)

  return (
    <div
      className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <Link href={`/${lang}/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={primaryImage}
          alt={translation?.name || product.slug || texts.productImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          fallback="/placeholder-product.svg"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.category && (
          <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white rounded-full">
            {getCategoryLabel(product.category as any, lang)}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link href={`/${lang}/products/${product.slug}`} className="block">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
            {translation?.name || product.slug}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {translation?.description || texts.noDescription}
        </p>

        <div className="flex items-center text-xs font-mono text-gray-500 mb-4">
          <span className="px-2 py-1 rounded bg-white/5">{texts.sku}: {product.slug}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Link
            href={`/${lang}/products/${product.slug}`}
            className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
          >
            {texts.viewDetails}
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={openContactModal}
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            {texts.quote}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="aspect-[4/3] bg-white/5 animate-pulse" />
          <div className="p-6">
            <div className="h-6 bg-white/10 rounded w-3/4 mb-3 animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-2/3 mb-4 animate-pulse" />
            <div className="h-6 bg-white/5 rounded w-24 mb-4 animate-pulse" />
            <div className="pt-4 border-t border-white/10 flex justify-between">
              <div className="h-5 bg-white/10 rounded w-24 animate-pulse" />
              <div className="h-5 bg-white/10 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
