'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductGrid } from '@/components/features/ProductGrid'
import { useLanguage } from '@/store/useAppStore'
import { slugToDbValue, CATEGORY_VALUES_ZH } from '@/lib/categories'

// Products page translations
const productsPageTexts = {
  en: {
    title: 'Our Products',
    subtitle: 'Discover our complete range of industrial automation solutions',
    description: 'Browse through our carefully selected products designed to meet your industrial automation needs. Each product is engineered for reliability, performance, and efficiency.',
    allProducts: 'All Products',
    featuredProducts: 'Featured Products',
    categories: 'Categories',
    business: 'Business Laptops',
    gaming: 'Gaming Laptops',
    mini: 'Mini PCs',
    all: 'All'
  },
  ru: {
    title: 'Наши продукты',
    subtitle: 'Откройте для себя наш полный спектр решений промышленной автоматизации',
    description: 'Просмотрите наши тщательно отобранные продукты, предназначенные для удовлетворения ваших потребностей в промышленной автоматизации. Каждый продукт разработан для надежности, производительности и эффективности.',
    allProducts: 'Все продукты',
    featuredProducts: 'Рекомендуемые продукты',
    categories: 'Категории',
    business: 'Бизнес-ноутбук',
    gaming: 'Игровой ноутбук',
    mini: 'Мини ПК',
    all: 'Все'
  },
  ja: {
    title: '製品一覧',
    subtitle: '産業オートメーションソリューションの完全なラインナップをご覧ください',
    description: '産業オートメーションのニーズに応えるために厳選された製品をご覧ください。各製品は信頼性、性能、効率性を重視して設計されています。',
    allProducts: 'すべての製品',
    featuredProducts: '注目の製品',
    categories: 'カテゴリー',
    business: 'ビジネスノートPC',
    gaming: 'ゲーミングノートPC',
    mini: 'ミニPC',
    all: 'すべて'
  },
  fr: {
    title: 'Nos Produits',
    subtitle: 'Découvrez notre gamme complète de solutions d\'automatisation industrielle',
    description: 'Parcourez nos produits soigneusement sélectionnés conçus pour répondre à vos besoins d\'automatisation industrielle. Chaque produit est conçu pour la fiabilité, les performances et l\'efficacité.',
    allProducts: 'Tous les produits',
    featuredProducts: 'Produits en vedette',
    categories: 'Catégories',
    business: 'Ordinateur portable professionnel',
    gaming: 'Ordinateur portable gaming',
    mini: 'Mini PC',
    all: 'Tous'
  },
  pt: {
    title: 'Nossos Produtos',
    subtitle: 'Descubra nossa gama completa de soluções de automação industrial',
    description: 'Navegue pelos nossos produtos cuidadosamente selecionados, projetados para atender às suas necessidades de automação industrial. Cada produto é projetado para confiabilidade, desempenho e eficiência.',
    allProducts: 'Todos os Produtos',
    featuredProducts: 'Produtos em Destaque',
    categories: 'Categorias',
    business: 'Laptop empresarial',
    gaming: 'Laptop gamer',
    mini: 'Mini PC',
    all: 'Todos'
  },
  'zh-CN': {
    title: '我们的产品',
    subtitle: '探索我们完整的工业自动化解决方案系列',
    description: '浏览我们精心挑选的产品，旨在满足您的工业自动化需求。每个产品都经过精心设计，确保可靠性、性能和效率。',
    allProducts: '所有产品',
    featuredProducts: '精选产品',
    categories: '分类',
    business: '商务本',
    gaming: '游戏本',
    mini: '迷你主机',
    all: '全部'
  }
}

// Component that uses useSearchParams - must be wrapped in Suspense
function ProductsContent() {
  const language = useLanguage()
  const texts = productsPageTexts[language] || productsPageTexts.en
  const searchParams = useSearchParams()
  // category state stores DB values (Chinese) or 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isInitialized, setIsInitialized] = useState(false)

  // Read category from URL params on mount and convert to DB value
  useEffect(() => {
    if (searchParams) {
      const categoryFromUrl = searchParams.get('category')
      console.log('🔍 [ProductsPage] URL category param:', categoryFromUrl)
      if (categoryFromUrl) {
        // Convert English slug to Chinese DB value
        const dbValue = slugToDbValue(categoryFromUrl)
        console.log('🔄 [ProductsPage] Converted to DB value:', dbValue)
        console.log('📝 [ProductsPage] Setting selectedCategory to:', dbValue || categoryFromUrl)
        setSelectedCategory(dbValue || categoryFromUrl)
      } else {
        console.log('⚠️ [ProductsPage] No category in URL, using "all"')
        setSelectedCategory('all')
      }
      setIsInitialized(true)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/products-hero-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Light blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-blue-700/10"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
              {texts.title}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {texts.subtitle}
            </p>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto drop-shadow-md">
              {texts.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {texts.allProducts}
            </h2>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: texts.all, value: 'all' },
                { key: 'business', label: texts.business, value: CATEGORY_VALUES_ZH.business },
                { key: 'gaming', label: texts.gaming, value: CATEGORY_VALUES_ZH.gaming },
                { key: 'mini', label: texts.mini, value: CATEGORY_VALUES_ZH.mini },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setSelectedCategory(item.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    selectedCategory === item.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isInitialized ? (
            <>
              <ProductGrid
                featured={false}
                category={selectedCategory === 'all' ? undefined : selectedCategory}
              />

              {/* Debug info */}
              <div className="mt-4 p-4 bg-gray-100 rounded text-sm font-mono">
                <p className="font-bold mb-2">🐛 Debug Info:</p>
                <p>• Selected Category State: <span className="text-blue-600">{selectedCategory}</span></p>
                <p>• Passed to ProductGrid: <span className="text-green-600">{selectedCategory === 'all' ? 'undefined' : selectedCategory}</span></p>
                <p>• URL Param: <span className="text-purple-600">{searchParams?.get('category') || 'none'}</span></p>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
