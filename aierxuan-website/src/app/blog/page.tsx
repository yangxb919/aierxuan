'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseClient } from '@/lib/supabase'
import { useLanguage } from '@/store/useAppStore'
import { getTranslation } from '@/lib/utils'
import type { BlogPost, BlogPostTranslation, LanguageCode } from '@/types'

// Blog page translations for all 6 languages
const blogPageTexts = {
  en: {
    title: 'Blog & News',
    subtitle: 'Latest updates, insights, and industry news from AIERXUAN',
    heroDescription: 'Stay informed about the latest developments in industrial automation, product updates, and company news.',
    
    // Categories
    allCategories: 'All Categories',
    news: 'News',
    products: 'Products',
    industry: 'Industry',
    technology: 'Technology',
    
    // Content
    readMore: 'Read More',
    publishedOn: 'Published on',
    by: 'by',
    author: 'AIERXUAN Team',
    
    // States
    loading: 'Loading articles...',
    noArticles: 'No articles found',
    loadingError: 'Failed to load articles',
    tryAgain: 'Try Again',
    
    // Pagination
    loadMore: 'Load More Articles',
    showingResults: 'Showing {count} of {total} articles'
  },
  ru: {
    title: 'Блог и новости',
    subtitle: 'Последние обновления, аналитика и отраслевые новости от AIERXUAN',
    heroDescription: 'Будьте в курсе последних разработок в области промышленной автоматизации, обновлений продуктов и новостей компании.',
    
    allCategories: 'Все категории',
    news: 'Новости',
    products: 'Продукты',
    industry: 'Индустрия',
    technology: 'Технологии',
    
    readMore: 'Читать далее',
    publishedOn: 'Опубликовано',
    by: 'автор',
    author: 'Команда AIERXUAN',
    
    loading: 'Загрузка статей...',
    noArticles: 'Статьи не найдены',
    loadingError: 'Не удалось загрузить статьи',
    tryAgain: 'Попробовать снова',
    
    loadMore: 'Загрузить больше статей',
    showingResults: 'Показано {count} из {total} статей'
  },
  ja: {
    title: 'ブログ・ニュース',
    subtitle: 'AIERXUANからの最新アップデート、洞察、業界ニュース',
    heroDescription: '産業オートメーションの最新動向、製品アップデート、企業ニュースについて最新情報をお届けします。',
    
    allCategories: 'すべてのカテゴリ',
    news: 'ニュース',
    products: '製品',
    industry: '業界',
    technology: 'テクノロジー',
    
    readMore: '続きを読む',
    publishedOn: '公開日',
    by: '著者',
    author: 'AIERXUANチーム',
    
    loading: '記事を読み込み中...',
    noArticles: '記事が見つかりません',
    loadingError: '記事の読み込みに失敗しました',
    tryAgain: '再試行',
    
    loadMore: 'さらに記事を読み込む',
    showingResults: '{total}件中{count}件を表示'
  },
  fr: {
    title: 'Blog et actualités',
    subtitle: 'Dernières mises à jour, insights et actualités de l\'industrie d\'AIERXUAN',
    heroDescription: 'Restez informé des derniers développements en automatisation industrielle, mises à jour produits et actualités de l\'entreprise.',
    
    allCategories: 'Toutes les catégories',
    news: 'Actualités',
    products: 'Produits',
    industry: 'Industrie',
    technology: 'Technologie',
    
    readMore: 'Lire la suite',
    publishedOn: 'Publié le',
    by: 'par',
    author: 'Équipe AIERXUAN',
    
    loading: 'Chargement des articles...',
    noArticles: 'Aucun article trouvé',
    loadingError: 'Échec du chargement des articles',
    tryAgain: 'Réessayer',
    
    loadMore: 'Charger plus d\'articles',
    showingResults: 'Affichage de {count} sur {total} articles'
  },
  pt: {
    title: 'Blog e notícias',
    subtitle: 'Últimas atualizações, insights e notícias da indústria da AIERXUAN',
    heroDescription: 'Mantenha-se informado sobre os últimos desenvolvimentos em automação industrial, atualizações de produtos e notícias da empresa.',
    
    allCategories: 'Todas as categorias',
    news: 'Notícias',
    products: 'Produtos',
    industry: 'Indústria',
    technology: 'Tecnologia',
    
    readMore: 'Leia mais',
    publishedOn: 'Publicado em',
    by: 'por',
    author: 'Equipe AIERXUAN',
    
    loading: 'Carregando artigos...',
    noArticles: 'Nenhum artigo encontrado',
    loadingError: 'Falha ao carregar artigos',
    tryAgain: 'Tentar novamente',
    
    loadMore: 'Carregar mais artigos',
    showingResults: 'Mostrando {count} de {total} artigos'
  },
  'zh-CN': {
    title: '博客与新闻',
    subtitle: 'AIERXUAN的最新更新、见解和行业新闻',
    heroDescription: '了解工业自动化的最新发展、产品更新和公司新闻。',
    
    allCategories: '所有分类',
    news: '新闻',
    products: '产品',
    industry: '行业',
    technology: '技术',
    
    readMore: '阅读更多',
    publishedOn: '发布于',
    by: '作者',
    author: 'AIERXUAN团队',
    
    loading: '正在加载文章...',
    noArticles: '未找到文章',
    loadingError: '加载文章失败',
    tryAgain: '重试',
    
    loadMore: '加载更多文章',
    showingResults: '显示 {count} / {total} 篇文章'
  }
} as const

interface BlogPostWithTranslations extends BlogPost {
  translations: BlogPostTranslation[]
}

const POSTS_PER_PAGE = 9

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostWithTranslations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  
  const language = useLanguage()
  const supabase = createSupabaseClient()
  const texts = blogPageTexts[language] || blogPageTexts.en

  useEffect(() => {
    fetchPosts()
  }, [supabase, texts.loadingError, selectedCategory])

  async function fetchPosts(page = 1, reset = true) {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          translations:blog_post_translations(*)
        `, { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      // Temporary fix: Comment out category filter until category column is added to database
      // TODO: Uncomment after running: database/migrations/add-category-to-blog-posts.sql
      // if (selectedCategory !== 'all') {
      //   query = query.eq('category', selectedCategory)
      // }

      const from = (page - 1) * POSTS_PER_PAGE
      const to = from + POSTS_PER_PAGE - 1
      query = query.range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        throw new Error(fetchError.message)
      }

      // Transform data to ensure translations array exists
      const transformedData = (data || []).map(post => ({
        ...post,
        translations: post.translations || []
      }))

      if (reset) {
        setPosts(transformedData)
        setCurrentPage(1)
      } else {
        setPosts(prev => [...prev, ...transformedData])
      }

      setTotalPosts(count || 0)
      setHasMore((data?.length || 0) === POSTS_PER_PAGE && (page * POSTS_PER_PAGE) < (count || 0))

    } catch (err) {
      console.error('Error fetching blog posts:', err)
      setError(texts.loadingError)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchPosts(nextPage, false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPostTranslation = (post: BlogPostWithTranslations) => {
    if (!post.translations || post.translations.length === 0) {
      return null
    }
    return getTranslation(post, language, 'locale')
  }

  const categories = [
    { key: 'all', label: texts.allCategories },
    { key: 'news', label: texts.news },
    { key: 'products', label: texts.products },
    { key: 'industry', label: texts.industry },
    { key: 'technology', label: texts.technology }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/blog-hero-banner.jpg)',
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
              {texts.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && posts.length === 0 ? (
            <BlogPostsSkeleton />
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{texts.loadingError}</h3>
              <button
                onClick={() => fetchPosts()}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                {texts.tryAgain}
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{texts.noArticles}</h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const translation = getPostTranslation(post)
                  return (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      translation={translation}
                      language={language}
                      texts={texts}
                      formatDate={formatDate}
                    />
                  )
                })}
              </div>

              {/* Load More / Pagination */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {texts.loading}
                      </>
                    ) : (
                      texts.loadMore
                    )}
                  </button>
                </div>
              )}

              {/* Results Count */}
              <div className="text-center mt-8 text-sm text-gray-500">
                {texts.showingResults
                  .replace('{count}', posts.length.toString())
                  .replace('{total}', totalPosts.toString())}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

// Blog Post Card Component
function BlogPostCard({ 
  post, 
  translation, 
  language, 
  texts, 
  formatDate 
}: {
  post: BlogPostWithTranslations
  translation: BlogPostTranslation | null
  language: LanguageCode
  texts: typeof blogPageTexts.en
  formatDate: (date: string) => string
}) {
  const title = translation?.title || `Blog Post ${post.id}`
  const excerpt = translation?.excerpt || ''

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gray-200 relative">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={post.published_at}>
            {texts.publishedOn} {formatDate(post.published_at)}
          </time>
          <span className="mx-2">•</span>
          <span>{texts.by} {texts.author}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
        >
          {texts.readMore}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </article>
  )
}

// Loading Skeleton Component
function BlogPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div className="aspect-video bg-gray-200"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
