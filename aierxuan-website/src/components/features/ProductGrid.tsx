'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import { getTranslation } from '@/lib/utils'
import { useContactForm } from '@/hooks/useContactForm'
import type { ProductWithTranslations, LanguageCode } from '@/types'
import { getCategoryLabel, getCategoryType } from '@/lib/categories'
import { ArrowRight, MessageSquare } from 'lucide-react'

// Ensure image path is absolute to avoid locale prefix being prepended
function ensureAbsolutePath(path: string): string {
  if (!path) return '/placeholder-product.svg'
  // If already absolute URL (http/https) or starts with /, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path
  }
  // Add leading slash for relative paths
  return '/' + path
}

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
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          {texts.tryAgain}
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{texts.noProducts}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          lang={lang}
          dictionary={dictionary}
        />
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: ProductWithTranslations
  lang: LanguageCode
  dictionary: ProductGridProps['dictionary']
}

function ProductCard({ product, lang, dictionary }: ProductCardProps) {
  const translation = getTranslation(product, lang, 'locale')
  const { openContactModal } = useContactForm()
  const texts = dictionary.grid
  const images = product.images as string[] | null

  // Prefer uploaded product image, otherwise choose by normalized category type
  let primaryImage = (images && images.length > 0 ? images[0] : '') as string
  if (!primaryImage) {
    primaryImage = '/images/business-laptop-series.jpg'
  }
  if (!images || images.length === 0) {
    const catType = getCategoryType(product.category)
    if (catType === 'gaming') primaryImage = '/images/business-laptop-series.jpg'
    else if (catType === 'mini') primaryImage = '/images/mini-pc-workstation.jpg'
    else if (catType === 'business') primaryImage = '/images/business-laptop-series.jpg'
  }
  // Ensure image path is absolute to avoid locale prefix issues
  primaryImage = ensureAbsolutePath(primaryImage)

  return (
    <div className="group flex flex-col h-full">
      {/* Image Container */}
      <Link href={`/${lang}/products/${product.slug}`} className="block overflow-hidden rounded-2xl bg-gray-100 mb-6 relative aspect-[4/3]">
        <img
          src={primaryImage}
          alt={translation?.title || product.slug || texts.productImage}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder-product.svg'
          }}
        />
        {/* Overlay on hover for quick access - optional, but adds a premium feel */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 rounded-full shadow-sm">
            {getCategoryLabel(product.category as any, lang)}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="mb-auto">
          <Link href={`/${lang}/products/${product.slug}`} className="block">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {translation?.title || product.slug}
            </h3>
          </Link>
          
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {translation?.short_desc || translation?.long_desc || texts.noDescription}
          </p>
          
          <div className="flex items-center text-xs font-mono text-gray-400 mb-6">
            {texts.sku}: {product.slug}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
          <Link 
            href={`/${lang}/products/${product.slug}`}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
          >
            {texts.viewDetails}
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <button 
            onClick={openContactModal}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse mb-6"></div>
          <div className="h-6 bg-gray-100 rounded w-3/4 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-50 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-50 rounded w-2/3 mb-6 animate-pulse"></div>
          <div className="pt-4 border-t border-gray-50 flex justify-between">
            <div className="h-5 bg-gray-100 rounded w-24 animate-pulse"></div>
            <div className="h-5 bg-gray-100 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
