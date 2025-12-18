'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/store/useAppStore'
import { createSupabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

// Translations
const translations = {
  en: {
    title: 'Latest News & Insights',
    subtitle: 'Stay updated with industry trends and company news',
    readMore: 'Read More',
    viewAll: 'View All Articles',
    loading: 'Loading articles...',
    error: 'Failed to load articles',
    noArticles: 'No articles available'
  },
  ru: {
    title: 'Последние новости и аналитика',
    subtitle: 'Будьте в курсе отраслевых тенденций и новостей компании',
    readMore: 'Читать далее',
    viewAll: 'Посмотреть все статьи',
    loading: 'Загрузка статей...',
    error: 'Не удалось загрузить статьи',
    noArticles: 'Нет доступных статей'
  },
  ja: {
    title: '最新ニュースと洞察',
    subtitle: '業界のトレンドと会社のニュースを最新の状態に保つ',
    readMore: '続きを読む',
    viewAll: 'すべての記事を見る',
    loading: '記事を読み込んでいます...',
    error: '記事の読み込みに失敗しました',
    noArticles: '利用可能な記事はありません'
  },
  fr: {
    title: 'Dernières nouvelles et perspectives',
    subtitle: 'Restez informé des tendances de l\'industrie et des nouvelles de l\'entreprise',
    readMore: 'Lire la suite',
    viewAll: 'Voir tous les articles',
    loading: 'Chargement des articles...',
    error: 'Échec du chargement des articles',
    noArticles: 'Aucun article disponible'
  },
  pt: {
    title: 'Últimas notícias e insights',
    subtitle: 'Mantenha-se atualizado com tendências do setor e notícias da empresa',
    readMore: 'Leia mais',
    viewAll: 'Ver todos os artigos',
    loading: 'Carregando artigos...',
    error: 'Falha ao carregar artigos',
    noArticles: 'Nenhum artigo disponível'
  },
  'zh-CN': {
    title: '最新资讯与洞察',
    subtitle: '了解行业趋势和公司新闻',
    readMore: '阅读更多',
    viewAll: '查看所有文章',
    loading: '加载文章中...',
    error: '加载文章失败',
    noArticles: '暂无文章'
  }
}

interface BlogPost {
  id: string
  slug: string
  cover_image: string | null
  published_at: string
  translations: Array<{
    language_code?: string
    locale?: string
    title: string
    excerpt: string
  }>
}

export function LatestNews() {
  const language = useLanguage()
  const t = translations[language] || translations.en
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const supabase = useMemo(() => createSupabaseClient(), [])

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(false)

        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(`
            id,
            slug,
            cover_image,
            published_at,
            translations:blog_post_translations(*)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3)

        if (fetchError) throw fetchError

        setPosts(data || [])
      } catch (err: any) {
        const details = err?.message || err?.error_description || JSON.stringify(err)
        console.error('Error fetching blog posts:', details)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Get translation for current language
  const getTranslation = (post: BlogPost) => {
    const findBy = (code: string) =>
      post.translations.find(t => (t.language_code || t.locale) === code)

    return (
      findBy(language) ||
      findBy('en') ||
      post.translations[0]
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">{t.loading}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{t.error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">{t.noArticles}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => {
            const translation = getTranslation(post)
            const title = translation?.title || 'Blog Post'
            const excerpt = translation?.excerpt || ''
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Featured Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  {post.cover_image ? (
                    <OptimizedImage
                      src={post.cover_image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="text-sm text-gray-500 mb-3">
                    {formatDate(post.published_at)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    {t.readMore}
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button size="lg">
              {t.viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
