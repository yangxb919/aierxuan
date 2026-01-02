import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { sanitizeSchema } from '@/lib/sanitize-schema'
import { createClient } from '@supabase/supabase-js'
import { getDictionary } from '@/get-dictionary'
import { getTranslation } from '@/lib/utils'
import { Button } from '@/components/ui'
import TableOfContents from '@/components/blog/TableOfContents'
import type { BlogPost } from '@/types'
import type { Locale } from '@/i18n-config'

interface BlogPostWithTranslations extends BlogPost {
  translations: BlogPostTranslationRow[]
}

type BlogPostTranslationRow = {
  id: string
  post_id: string
  locale: string
  title: string
  excerpt: string | null
  body_md: string
  seo_title: string | null
  seo_desc: string | null
  created_at: string | null
  updated_at: string | null
}

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }>
}

function getServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params

  const supabase = getServerSupabase()
  if (!supabase) {
    return { title: 'Article Not Found' }
  }

  const { data: post } = await supabase
    .from('blog_posts')
    .select(`*, translations:blog_post_translations(*)`)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const translation = getTranslation(post as BlogPostWithTranslations, lang, 'locale')
  const title = translation?.seo_title || translation?.title || `Blog Post ${post.id}`
  const excerpt = translation?.seo_desc || translation?.excerpt || ''

  return {
    title: `${title} - AIERXUAN`,
    description: excerpt,
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { lang, slug } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.blogDetail

  const supabase = getServerSupabase()
  if (!supabase) notFound()

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

  if (postError || !postData) {
    notFound()
  }

  const post = postData as BlogPostWithTranslations
  const translation = getTranslation(post, lang, 'locale')

  const title = translation?.title || `Blog Post ${post.id}`
  // const excerpt = translation?.excerpt || '' // Unused
  const content = translation?.body_md || ''
  const contentForRender = addHardLineBreaks(content)

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const readingTime = estimateReadingTime(content)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'zh-CN' ? 'zh-CN' : lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Fetch related posts (same category, excluding current post)
  const relatedPosts: BlogPostWithTranslations[] = []
  // Category is not yet in the database, so we skip this for now
  /*
  if (post.category) {
    const { data: relatedData } = await supabase
      .from('blog_posts')
      .select(`
        *,
        translations:blog_post_translations(*)
      `)
      .eq('category', post.category)
      .eq('status', 'published')
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(3)

    if (relatedData) {
      relatedPosts = relatedData as BlogPostWithTranslations[]
    }
  }
  */

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Banner with Featured Image and Title */}
      <div className="relative h-[420px] md:h-[520px]">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-slate-900 to-[#0a0a0f]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-blue-600" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-violet-600" />

        {/* Background Image */}
        {post.cover_image && (
          <div className="absolute inset-0">
            <Image
              src={post.cover_image}
              alt={title}
              fill
              className="object-cover opacity-25 saturate-90 contrast-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/65 via-[#0a0a0f]/45 to-[#0a0a0f]/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/35 via-transparent to-[#0a0a0f]/35" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-end z-10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div className="inline-block max-w-4xl">
              <div className="rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md shadow-[0_26px_90px_-55px_rgba(0,0,0,0.95)] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-blue-500/80 via-sky-400/70 to-violet-400/70" />
                <div className="p-5 sm:p-7">
                  {/* Breadcrumb */}
                  <div className="mb-4">
                    <Link
                      href={`/${lang}/blog`}
                      className="inline-flex items-center text-white/75 hover:text-white font-medium text-sm transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      {texts.backToBlog}
                    </Link>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                    {title}
                  </h1>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <time dateTime={post.published_at || post.created_at || ''}>
                        {formatDate(post.published_at || post.created_at || '')}
                      </time>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{readingTime} {texts.readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content - Separate Cards */}
      <article className="py-8 bg-[#0a0a0f]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Card */}
            <div className="lg:w-[calc(66.666%-1rem)] flex-shrink-0">
              <div className="rounded-2xl overflow-hidden border border-black/10 bg-[#fdfcf8] shadow-[0_18px_60px_-40px_rgba(2,6,23,0.85)]">
                <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700" />
                <div className="p-8 lg:p-12">
                  <div className="mx-auto max-w-[78ch]">
                    {/* Article Content */}
                    <div id="blog-article" className="md md-light">
                      {contentForRender ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeSlug, rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
                        >
                          {contentForRender}
                        </ReactMarkdown>
                      ) : (
                        <div className="text-slate-500 italic">
                          Content not available in {lang}
                        </div>
                      )}
                    </div>

                    {/* Share Section */}
                    <div className="border-t border-black/10 pt-8 mt-10">
                      <h3 className="text-lg font-medium text-slate-900 mb-4">
                        {texts.shareArticle}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://aierxuan.com/${lang}/blog/${slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-black/10 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-black/5 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                          Twitter
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://aierxuan.com/${lang}/blog/${slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-black/10 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-black/5 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Table of Contents Card */}
            <aside className="lg:w-[calc(33.333%-1rem)] flex-shrink-0">
              <div className="rounded-2xl border border-black/10 bg-[#fdfcf8] shadow-[0_18px_60px_-40px_rgba(2,6,23,0.85)] p-6 sticky top-24">
                <TableOfContents content={contentForRender} title={texts.tableOfContents} variant="light" containerId="blog-article" />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#0a0a0f] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {texts.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedTranslation = getTranslation(relatedPost, lang, 'locale')
                const relatedTitle = relatedTranslation?.title || `Blog Post ${relatedPost.id}`
                const relatedExcerpt = relatedTranslation?.excerpt || ''

                return (
                  <article key={relatedPost.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/30">
                    <div className="aspect-video bg-slate-800 relative overflow-hidden">
                      {relatedPost.cover_image ? (
                        <Image
                          src={relatedPost.cover_image}
                          alt={relatedTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(relatedPost.published_at || relatedPost.created_at || '')}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {relatedTitle}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {relatedExcerpt}
                      </p>
                      <Link
                        href={`/${lang}/blog/${relatedPost.slug}`}
                        className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                      >
                        {texts.readMore || 'Read More'} →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a0f] text-white relative overflow-hidden border-t border-white/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
        }}></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-blue-600" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-violet-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {texts.ctaTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            {texts.ctaDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/contact`}>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white h-12 px-6 text-lg shadow-lg shadow-blue-500/25">
                {texts.contactUs}
              </Button>
            </Link>
            <Link href={`/${lang}/products`}>
              <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white hover:text-slate-900 hover:border-white h-12 px-6 text-lg bg-transparent">
                {texts.viewProducts}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function addHardLineBreaks(markdown: string) {
  const normalized = (markdown || '').replace(/\r\n/g, '\n')
  if (!normalized) return normalized

  const lines = normalized.split('\n')
  const fenceRegex = /^\s*(```|~~~)/
  const nextBlockStartRegex = /^\s*(#{1,6}\s|>+\s|([-*+]|\d+\.)\s|(```|~~~))/

  let inFence = false
  const out: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i] ?? ''
    const line = rawLine.replace(/\s+$/, '')
    const nextLine = lines[i + 1] ?? ''

    if (fenceRegex.test(line)) {
      inFence = !inFence
      out.push(rawLine)
      continue
    }

    if (inFence) {
      out.push(rawLine)
      continue
    }

    const isBlank = line.trim().length === 0
    const nextIsBlank = nextLine.trim().length === 0
    const nextStartsBlock = nextBlockStartRegex.test(nextLine)
    const isTableRow = /^\s*\|.*\|\s*$/.test(line)

    if (!isBlank && !nextIsBlank && !nextStartsBlock && !isTableRow) {
      out.push(`${line}  `)
      continue
    }

    out.push(rawLine)
  }

  return out.join('\n')
}
