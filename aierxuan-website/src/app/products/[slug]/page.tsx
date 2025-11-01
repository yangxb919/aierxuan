'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import { useLanguage } from '@/store/useAppStore'
import { getTranslation } from '@/lib/utils'
import type { ProductWithTranslations, LanguageCode } from '@/types'
import { getCategoryLabel } from '@/lib/categories'

// Product detail page translations
const productDetailTexts = {
  en: {
    specifications: 'Specifications',
    requestQuote: 'Request Quote',
    contactForPrice: 'Contact for Price',
    category: 'Category',
    sku: 'SKU',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    backToProducts: 'Back to Products',
    productNotFound: 'Product not found',
    loadingError: 'Failed to load product',
    tryAgain: 'Try Again',
    productImages: 'Product Images',
    noDescription: 'No description available',
    features: 'Features',
    overview: 'Overview',
    moq: 'MOQ',
    price: 'Price',
    units: 'units',
    pricePerUnit: 'per unit',
    startingFrom: 'Starting from'
  },
  ru: {
    specifications: 'Технические характеристики',
    requestQuote: 'Запросить предложение',
    contactForPrice: 'Уточнить цену',
    category: 'Категория',
    sku: 'Артикул',
    status: 'Статус',
    active: 'Активный',
    inactive: 'Неактивный',
    backToProducts: 'Назад к продуктам',
    productNotFound: 'Продукт не найден',
    loadingError: 'Не удалось загрузить продукт',
    tryAgain: 'Попробовать снова',
    productImages: 'Изображения продукта',
    noDescription: 'Описание недоступно',
    features: 'Особенности',
    overview: 'Обзор',
    moq: 'MOQ',
    price: 'Цена',
    units: 'единиц',
    pricePerUnit: 'за единицу',
    startingFrom: 'От'
  },
  ja: {
    specifications: '仕様',
    requestQuote: '見積もりを依頼',
    contactForPrice: '価格についてお問い合わせ',
    category: 'カテゴリー',
    sku: '品番',
    status: 'ステータス',
    active: 'アクティブ',
    inactive: '非アクティブ',
    backToProducts: '製品一覧に戻る',
    productNotFound: '製品が見つかりません',
    loadingError: '製品の読み込みに失敗しました',
    tryAgain: '再試行',
    productImages: '製品画像',
    noDescription: '説明がありません',
    features: '特徴',
    overview: '概要',
    moq: 'MOQ',
    price: '価格',
    units: '台',
    pricePerUnit: '台あたり',
    startingFrom: '〜'
  },
  fr: {
    specifications: 'Spécifications',
    requestQuote: 'Demander un devis',
    contactForPrice: 'Contactez pour le prix',
    category: 'Catégorie',
    sku: 'Référence',
    status: 'Statut',
    active: 'Actif',
    inactive: 'Inactif',
    backToProducts: 'Retour aux produits',
    productNotFound: 'Produit non trouvé',
    loadingError: 'Échec du chargement du produit',
    tryAgain: 'Réessayer',
    productImages: 'Images du produit',
    noDescription: 'Aucune description disponible',
    features: 'Caractéristiques',
    overview: 'Aperçu',
    moq: 'MOQ',
    price: 'Prix',
    units: 'unités',
    pricePerUnit: 'par unité',
    startingFrom: 'À partir de'
  },
  pt: {
    specifications: 'Especificações',
    requestQuote: 'Solicitar Cotação',
    contactForPrice: 'Entre em contato para preço',
    category: 'Categoria',
    sku: 'Código',
    status: 'Status',
    active: 'Ativo',
    inactive: 'Inativo',
    backToProducts: 'Voltar aos Produtos',
    productNotFound: 'Produto não encontrado',
    loadingError: 'Falha ao carregar produto',
    tryAgain: 'Tentar Novamente',
    productImages: 'Imagens do Produto',
    noDescription: 'Nenhuma descrição disponível',
    features: 'Recursos',
    overview: 'Visão Geral',
    moq: 'MOQ',
    price: 'Preço',
    units: 'unidades',
    pricePerUnit: 'por unidade',
    startingFrom: 'A partir de'
  },
  'zh-CN': {
    specifications: '技术规格',
    requestQuote: '询价',
    contactForPrice: '联系询价',
    category: '分类',
    sku: '产品编号',
    status: '状态',
    active: '有效',
    inactive: '无效',
    backToProducts: '返回产品列表',
    productNotFound: '未找到产品',
    loadingError: '加载产品失败',
    tryAgain: '重试',
    productImages: '产品图片',
    noDescription: '暂无描述',
    moq: '起订量',
    price: '价格',
    units: '台',
    pricePerUnit: '每台',
    startingFrom: '起',
    features: '特性',
    overview: '概述'
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [product, setProduct] = useState<ProductWithTranslations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const language = useLanguage()
  const supabase = createSupabaseClient()
  const texts = productDetailTexts[language] || productDetailTexts.en
  const [activeTab, setActiveTab] = useState<'description' | 'specification' | 'faq'>('description')

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('products')
          .select(`
            *,
            translations:product_translations(*)
          `)
          .eq('slug', slug)
          .eq('status', 'active')
          .single()

        if (fetchError) {
          throw fetchError
        }

        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(texts.loadingError)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug, supabase, texts.loadingError])

  // Keep selected image in sync with product images
  useEffect(() => {
    const imgs = (product?.images as string[] | null) || []
    if (imgs.length > 0) {
      setSelectedImage(imgs[0])
    } else {
      setSelectedImage(null)
    }
  }, [product])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || texts.productNotFound}
          </h1>
          <Button onClick={() => window.location.reload()}>
            {texts.tryAgain}
          </Button>
        </div>
      </div>
    )
  }

  const translation = getTranslation(product, language)
  const images = (product.images as string[] | null) || []
  const primaryImage = images[0] || '/placeholder-product.svg'
  const keySpecs = ((translation?.key_specs || {}) as Record<string, any>) || {}

  const getSpec = (...candidates: string[]) => {
    for (const k of candidates) {
      const v = keySpecs[k]
      if (v !== undefined && v !== null && String(v).trim() !== '') return String(v)
    }
    return ''
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            ← {texts.backToProducts}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <Image
                src={selectedImage || primaryImage}
                alt={translation?.title || product.slug}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional images if available */}
            {images && images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm ${
                      selectedImage === image ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${translation?.title || product.slug} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6 lg:sticky lg:top-24 self-start">
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {translation?.title || product.slug}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {translation?.short_desc || translation?.long_desc || texts.noDescription}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>{texts.sku}: {product.slug}</span>
                {product.category && (
                  <span>{texts.category}: {getCategoryLabel(product.category as any, language)}</span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status === 'active' ? texts.active : texts.inactive}
                </span>
              </div>

              {/* Tabs are moved below the image/gallery as second section */}
            </div>

              {/* Price and CTA */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="space-y-4">
                  {/* MOQ and Price Display */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* MOQ */}
                    {product.moq && (
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">{texts.moq}</p>
                        <p className="text-2xl font-bold text-blue-900">
                          {product.moq} <span className="text-sm font-normal text-gray-600">{texts.units}</span>
                        </p>
                      </div>
                    )}

                    {/* Price */}
                    {product.price && (
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">{texts.price}</p>
                        <p className="text-2xl font-bold text-blue-900">
                          ${Number(product.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">{texts.pricePerUnit}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    {!product.price && (
                      <p className="text-lg font-medium text-blue-900 mb-4">
                        {texts.contactForPrice}
                      </p>
                    )}
                    <Link href={`/contact?product=${encodeURIComponent(translation?.title || product.slug)}`}>
                      <Button size="lg" className="w-full sm:w-auto">
                        {texts.requestQuote}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Specs */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Specs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const rows: Array<{ label: string; value: string }> = []
                      const display = [
                        { label: 'Processor', value: getSpec('CPU', 'Processor') },
                        { label: 'Graphics', value: getSpec('GPU', 'Graphics') },
                        { label: 'Memory', value: getSpec('Memory', 'RAM') },
                        { label: 'Storage', value: getSpec('Storage', 'SSD', 'Hard Drive') },
                        {
                          label: 'Display',
                          value:
                            [getSpec('Display Size'), getSpec('Resolution'), getSpec('Panel Type')]
                              .filter(Boolean)
                              .join(' • '),
                        },
                        { label: 'Wireless', value: getSpec('Wireless', 'Wireless Connectivity', 'Connectivity') },
                      ]
                      for (const r of display) if (r.value) rows.push(r)
                      return rows.length ? (
                        rows.map((r) => (
                          <div key={r.label} className="flex justify-between gap-4 py-1 border-b border-gray-100 last:border-0">
                            <span className="text-gray-700 font-medium">{r.label}</span>
                            <span className="text-gray-600 text-right flex-1">{r.value}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No quick specs available.</p>
                      )
                    })()}
                  </div>
                </CardContent>
              </Card>


              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Why choose us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 rounded px-3 py-2">✅ OEM/ODM Service</div>
                    <div className="bg-gray-50 rounded px-3 py-2">🌍 Global Shipping</div>
                    <div className="bg-gray-50 rounded px-3 py-2">🕑 24/7 Support</div>
                    <div className="bg-gray-50 rounded px-3 py-2">🏷️ Custom Branding</div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>

        {/* Second Section: Tabs (full width below gallery) */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="flex justify-center gap-8 px-6 pt-4">
                {[
                  { key: 'description', label: texts.overview },
                  { key: 'specification', label: texts.specifications },
                  { key: 'faq', label: 'FAQ' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-3 text-sm md:text-base font-semibold border-b-2 -mb-px transition-colors ${
                      activeTab === tab.key
                        ? 'text-gray-900 border-gray-900'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {translation?.long_desc || texts.noDescription}
                  </p>
                </div>
              )}

              {activeTab === 'specification' && (
                <div className="divide-y divide-gray-100">
                  {Object.entries((translation?.key_specs || {}) as Record<string, any>).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-3">
                      <div className="col-span-1 text-gray-700 font-medium">{k}</div>
                      <div className="col-span-2 text-gray-600">{String(v)}</div>
                    </div>
                  ))}
                  {Object.keys(translation?.key_specs || {}).length === 0 && (
                    <p className="text-gray-500">No specifications available.</p>
                  )}
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="text-gray-600">No FAQ for this product yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div className="flex gap-4 mb-6">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
