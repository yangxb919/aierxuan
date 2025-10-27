'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { createSupabaseClient } from '@/lib/supabase'
import { useLanguage } from '@/store/useAppStore'
import { getTranslation } from '@/lib/utils'
import { Button } from '@/components/ui'
import TableOfContents from '@/components/blog/TableOfContents'
import type { BlogPost, BlogPostTranslation, LanguageCode } from '@/types'

// Blog detail page translations for all 6 languages
const blogDetailTexts = {
  en: {
    backToBlog: 'Back to Blog',
    publishedOn: 'Published on',
    by: 'by',
    author: 'AIERXUAN Team',
    readingTime: 'min read',
    shareArticle: 'Share this article',
    
    // Related/CTA
    relatedArticles: 'Related Articles',
    ctaTitle: 'Interested in Our Solutions?',
    ctaDescription: 'Contact us to learn more about our industrial automation products and services.',
    contactUs: 'Contact Us',
    viewProducts: 'View Products',
    
    // States
    loading: 'Loading article...',
    notFound: 'Article not found',
    notFoundDescription: 'The article you are looking for does not exist or has been removed.',
    loadingError: 'Failed to load article',
    tryAgain: 'Try Again',
    
    // Navigation
    previousArticle: 'Previous Article',
    nextArticle: 'Next Article'
  },
  ru: {
    backToBlog: 'Назад к блогу',
    publishedOn: 'Опубликовано',
    by: 'автор',
    author: 'Команда AIERXUAN',
    readingTime: 'мин чтения',
    shareArticle: 'Поделиться статьей',
    
    relatedArticles: 'Похожие статьи',
    ctaTitle: 'Заинтересованы в наших решениях?',
    ctaDescription: 'Свяжитесь с нами, чтобы узнать больше о наших продуктах и услугах промышленной автоматизации.',
    contactUs: 'Связаться с нами',
    viewProducts: 'Посмотреть продукты',
    
    loading: 'Загрузка статьи...',
    notFound: 'Статья не найдена',
    notFoundDescription: 'Статья, которую вы ищете, не существует или была удалена.',
    loadingError: 'Не удалось загрузить статью',
    tryAgain: 'Попробовать снова',
    
    previousArticle: 'Предыдущая статья',
    nextArticle: 'Следующая статья'
  },
  ja: {
    backToBlog: 'ブログに戻る',
    publishedOn: '公開日',
    by: '著者',
    author: 'AIERXUANチーム',
    readingTime: '分で読める',
    shareArticle: 'この記事をシェア',
    
    relatedArticles: '関連記事',
    ctaTitle: '私たちのソリューションに興味がありますか？',
    ctaDescription: '産業オートメーション製品とサービスについて詳しく知るために、お気軽にお問い合わせください。',
    contactUs: 'お問い合わせ',
    viewProducts: '製品を見る',
    
    loading: '記事を読み込み中...',
    notFound: '記事が見つかりません',
    notFoundDescription: 'お探しの記事は存在しないか、削除されました。',
    loadingError: '記事の読み込みに失敗しました',
    tryAgain: '再試行',
    
    previousArticle: '前の記事',
    nextArticle: '次の記事'
  },
  fr: {
    backToBlog: 'Retour au blog',
    publishedOn: 'Publié le',
    by: 'par',
    author: 'Équipe AIERXUAN',
    readingTime: 'min de lecture',
    shareArticle: 'Partager cet article',
    
    relatedArticles: 'Articles connexes',
    ctaTitle: 'Intéressé par nos solutions?',
    ctaDescription: 'Contactez-nous pour en savoir plus sur nos produits et services d\'automatisation industrielle.',
    contactUs: 'Nous contacter',
    viewProducts: 'Voir les produits',
    
    loading: 'Chargement de l\'article...',
    notFound: 'Article non trouvé',
    notFoundDescription: 'L\'article que vous recherchez n\'existe pas ou a été supprimé.',
    loadingError: 'Échec du chargement de l\'article',
    tryAgain: 'Réessayer',
    
    previousArticle: 'Article précédent',
    nextArticle: 'Article suivant'
  },
  pt: {
    backToBlog: 'Voltar ao blog',
    publishedOn: 'Publicado em',
    by: 'por',
    author: 'Equipe AIERXUAN',
    readingTime: 'min de leitura',
    shareArticle: 'Compartilhar este artigo',
    
    relatedArticles: 'Artigos relacionados',
    ctaTitle: 'Interessado em nossas soluções?',
    ctaDescription: 'Entre em contato conosco para saber mais sobre nossos produtos e serviços de automação industrial.',
    contactUs: 'Entre em contato',
    viewProducts: 'Ver produtos',
    
    loading: 'Carregando artigo...',
    notFound: 'Artigo não encontrado',
    notFoundDescription: 'O artigo que você está procurando não existe ou foi removido.',
    loadingError: 'Falha ao carregar artigo',
    tryAgain: 'Tentar novamente',
    
    previousArticle: 'Artigo anterior',
    nextArticle: 'Próximo artigo'
  },
  'zh-CN': {
    backToBlog: '返回博客',
    publishedOn: '发布于',
    by: '作者',
    author: 'AIERXUAN团队',
    readingTime: '分钟阅读',
    shareArticle: '分享这篇文章',
    
    relatedArticles: '相关文章',
    ctaTitle: '对我们的解决方案感兴趣？',
    ctaDescription: '联系我们了解更多关于我们的工业自动化产品和服务。',
    contactUs: '联系我们',
    viewProducts: '查看产品',
    
    loading: '正在加载文章...',
    notFound: '文章未找到',
    notFoundDescription: '您要查找的文章不存在或已被删除。',
    loadingError: '加载文章失败',
    tryAgain: '重试',
    
    previousArticle: '上一篇文章',
    nextArticle: '下一篇文章'
  }
} as const

interface BlogPostWithTranslations extends BlogPost {
  translations: BlogPostTranslation[]
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPostWithTranslations | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithTranslations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const language = useLanguage()
  const supabase = createSupabaseClient()
  const texts = blogDetailTexts[language] || blogDetailTexts.en

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug, supabase, texts.loadingError])

  async function fetchPost() {
    try {
      setLoading(true)
      setError(null)

      // Fetch the main post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          translations:blog_post_translations(*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (postError) {
        if (postError.code === 'PGRST116') {
          // No rows returned
          setPost(null)
          return
        }
        throw new Error(postError.message)
      }

      setPost(postData)

      // Fetch related posts (same category, excluding current post)
      if (postData.category) {
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select(`
            *,
            translations:blog_post_translations(*)
          `)
          .eq('category', postData.category)
          .eq('status', 'published')
          .neq('id', postData.id)
          .order('published_at', { ascending: false })
          .limit(3)

        setRelatedPosts(relatedData || [])
      }
      
    } catch (err) {
      console.error('Error fetching blog post:', err)
      setError(texts.loadingError)
    } finally {
      setLoading(false)
    }
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

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  if (loading) {
    return <BlogDetailSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{texts.loadingError}</h1>
          <button
            onClick={fetchPost}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            {texts.tryAgain}
          </button>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{texts.notFound}</h1>
          <p className="text-gray-600 mb-4">{texts.notFoundDescription}</p>
          <Link href="/blog">
            <Button>{texts.backToBlog}</Button>
          </Link>
        </div>
      </div>
    )
  }

  const translation = getPostTranslation(post)
  const title = translation?.title || `Blog Post ${post.id}`
  const excerpt = translation?.excerpt || ''
  const content = translation?.body_md || ''
  const readingTime = estimateReadingTime(content)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Featured Image and Title */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-900">
        {/* Background Image */}
        {post.cover_image && (
          <div className="absolute inset-0">
            <Image
              src={post.cover_image}
              alt={title}
              fill
              className="object-cover opacity-60"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-end">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white font-medium text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                {texts.backToBlog}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-sm text-white/90">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <time dateTime={post.published_at || post.created_at}>
                  {formatDate(post.published_at || post.created_at)}
                </time>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{readingTime} {texts.minRead}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content - Separate Cards */}
      <article className="py-8 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Card */}
            <div className="lg:w-[calc(66.666%-1rem)] flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">

          {/* Article Content */}
          <div className="prose prose-lg max-w-none
            prose-headings:text-black prose-headings:font-bold
            prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-black prose-p:leading-8 prose-p:text-[17px] prose-p:mb-8
            prose-li:text-black prose-li:leading-8 prose-li:text-[17px]
            prose-strong:text-black prose-strong:font-bold
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:text-black prose-blockquote:border-l-blue-500 prose-blockquote:pl-4
            prose-ul:my-6 prose-ol:my-6
            prose-img:rounded-lg prose-img:shadow-md">
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <div className="text-gray-500 italic">
                Content not available in {language}
              </div>
            )}
          </div>

          {/* Share Section */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {texts.shareArticle}
            </h3>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
              </div>
            </div>

            {/* Sidebar - Table of Contents Card */}
            <aside className="lg:w-[calc(33.333%-1rem)] flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <TableOfContents content={content} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {texts.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedTranslation = getPostTranslation(relatedPost)
                return (
                  <RelatedPostCard
                    key={relatedPost.id}
                    post={relatedPost}
                    translation={relatedTranslation}
                    texts={texts}
                    formatDate={formatDate}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {texts.ctaTitle}
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            {texts.ctaDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-6 text-lg">
                {texts.contactUs}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 h-12 px-6 text-lg">
                {texts.viewProducts}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Related Post Card Component
function RelatedPostCard({ 
  post, 
  translation, 
  texts, 
  formatDate 
}: {
  post: BlogPostWithTranslations
  translation: BlogPostTranslation | null
  texts: typeof blogDetailTexts.en
  formatDate: (date: string) => string
}) {
  const title = translation?.title || `Blog Post ${post.id}`
  const excerpt = translation?.excerpt || ''

  return (
    <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(post.published_at)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-500 font-medium text-sm"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
}

// Loading Skeleton Component
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="aspect-video bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
