'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import { useLanguage } from '@/store/useAppStore'
import { getTranslation } from '@/lib/utils'
import { useContactForm } from '@/hooks/useContactForm'
import type { ProductWithTranslations, LanguageCode } from '@/types'
import { getCategoryLabel, getCategoryType } from '@/lib/categories'

// Product grid translations
const productGridTexts = {
  en: {
    noDescription: 'No description available',
    sku: 'SKU',
    contactForPrice: 'Contact for Price',
    viewDetails: 'View Details',
    quote: 'Quote',
    noProducts: 'No products found',
    errorMessage: 'Failed to load products',
    tryAgain: 'Try Again',
    productImage: 'Product Image'
  },
  ru: {
    noDescription: 'Описание недоступно',
    sku: 'Артикул',
    contactForPrice: 'Уточнить цену',
    viewDetails: 'Подробнее',
    quote: 'Запрос',
    noProducts: 'Продукты не найдены',
    errorMessage: 'Не удалось загрузить продукты',
    tryAgain: 'Попробовать снова',
    productImage: 'Изображение продукта'
  },
  ja: {
    noDescription: '説明がありません',
    sku: '品番',
    contactForPrice: '価格についてお問い合わせ',
    viewDetails: '詳細を見る',
    quote: '見積もり',
    noProducts: '製品が見つかりません',
    errorMessage: '製品の読み込みに失敗しました',
    tryAgain: '再試行',
    productImage: '製品画像'
  },
  fr: {
    noDescription: 'Aucune description disponible',
    sku: 'Référence',
    contactForPrice: 'Contactez pour le prix',
    viewDetails: 'Voir les détails',
    quote: 'Devis',
    noProducts: 'Aucun produit trouvé',
    errorMessage: 'Échec du chargement des produits',
    tryAgain: 'Réessayer',
    productImage: 'Image du produit'
  },
  pt: {
    noDescription: 'Nenhuma descrição disponível',
    sku: 'Código',
    contactForPrice: 'Entre em contato para preço',
    viewDetails: 'Ver Detalhes',
    quote: 'Cotação',
    noProducts: 'Nenhum produto encontrado',
    errorMessage: 'Falha ao carregar produtos',
    tryAgain: 'Tentar Novamente',
    productImage: 'Imagem do Produto'
  },
  'zh-CN': {
    noDescription: '暂无描述',
    sku: '产品编号',
    contactForPrice: '联系询价',
    viewDetails: '查看详情',
    quote: '询价',
    noProducts: '未找到产品',
    errorMessage: '加载产品失败',
    tryAgain: '重试',
    productImage: '产品图片'
  }
}

interface ProductGridProps {
  featured?: boolean
  limit?: number
  category?: string
}

export function ProductGrid({ featured = false, limit, category }: ProductGridProps) {
  const [products, setProducts] = useState<ProductWithTranslations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const language = useLanguage()
  const supabase = createSupabaseClient()
  const texts = productGridTexts[language] || productGridTexts.en

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        console.log('🔍 ProductGrid - Fetching with params:', {
          category,
          featured,
          limit,
          timestamp: new Date().toISOString()
        })

        let query = supabase
          .from('products')
          .select(`
            *,
            translations:product_translations(*)
          `)
          .eq('status', 'active')

        if (featured) {
          console.log('✅ Applying featured filter')
          query = query.eq('featured', true)
        }

        if (category) {
          console.log('✅ Applying category filter:', category)
          query = query.eq('category', category)
        } else {
          console.log('⚠️ No category filter applied')
        }

        if (limit) {
          console.log('✅ Applying limit:', limit)
          query = query.limit(limit)
        }

        query = query.order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })

        console.log('🚀 Executing query...')
        const { data, error: fetchError } = await query

        if (fetchError) {
          throw fetchError
        }

        console.log('📦 Fetched products:', data?.length, 'items')
        if (data && data.length > 0) {
          console.log('📋 Product categories:', data.map(p => `${p.slug}: ${p.category}`).join(', '))
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
  }, [featured, limit, category, supabase])

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} language={language} texts={texts} />
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: ProductWithTranslations
  language: LanguageCode
  texts: typeof productGridTexts.en
}

function ProductCard({ product, language, texts }: ProductCardProps) {
  const translation = getTranslation(product, language, 'locale')
  const { openContactModal } = useContactForm()
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

  // Core advantages tags for all products
  const getAdvantageLabel = (key: string) => {
    const labels = {
      premium: {
        'zh-CN': '高端制造',
        'en': 'Premium',
        'ru': 'Премиум',
        'ja': 'プレミアム',
        'fr': 'Premium',
        'pt': 'Premium'
      },
      cooling: {
        'zh-CN': '静音水冷',
        'en': 'Silent Cooling',
        'ru': 'Тихое охлаждение',
        'ja': '静音冷却',
        'fr': 'Refroidissement Silencieux',
        'pt': 'Silent Cooling'
      },
      manufacturing: {
        'zh-CN': '富士康制造',
        'en': 'Foxconn',
        'ru': 'Foxconn',
        'ja': 'Foxconn',
        'fr': 'Foxconn',
        'pt': 'Foxconn'
      }
    }
    return labels[key as keyof typeof labels]?.[language] || labels[key as keyof typeof labels]?.['en'] || key
  }

  const coreAdvantages = [
    { key: 'premium', label: getAdvantageLabel('premium'), icon: '🏆', primary: true },
    { key: 'performance', label: '245W', icon: '🔥', primary: false },
    { key: 'cooling', label: getAdvantageLabel('cooling'), icon: '❄️', primary: false },
    { key: 'manufacturing', label: getAdvantageLabel('manufacturing'), icon: '🏭', primary: false }
  ]

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={primaryImage}
            alt={translation?.title || product.slug || texts.productImage}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder-product.svg'
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <CardTitle className="text-lg mb-2 line-clamp-2">
          {translation?.title || product.slug}
        </CardTitle>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {translation?.short_desc || translation?.long_desc || texts.noDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {texts.sku}: {product.slug}
          </div>
          <div className="text-sm font-medium text-blue-600">
            {texts.contactForPrice}
          </div>
        </div>

        {/* Core Advantages Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {coreAdvantages.map((advantage) => (
            <span
              key={advantage.key}
              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                advantage.primary
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
              }`}
            >
              <span className="text-xs">{advantage.icon}</span>
              {advantage.label}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button size="sm" className="w-full btn-card-hover">
              {texts.viewDetails}
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={openContactModal} className="btn-outline-hover">
            {texts.quote}
          </Button>
        </div>

        {product.category && (
          <div className="mt-3">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {getCategoryLabel(product.category as any, language)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="p-0">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="flex justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded flex-1"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
