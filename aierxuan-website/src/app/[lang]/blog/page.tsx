import { Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { BlogListClient } from '@/components/features/BlogListClient'
import { getDictionary } from '@/get-dictionary'
import type { Locale } from '@/i18n-config'
import type { BlogPost, BlogPostTranslation } from '@/types'

// Initialize Supabase client for server-side fetching
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface BlogPostWithTranslations extends BlogPost {
  translations: BlogPostTranslation[]
}

const POSTS_PER_PAGE = 9

export const metadata = {
  title: 'Blog & News - AIERXUAN',
  description: 'Latest updates, insights, and industry news from AIERXUAN',
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.blog

  // Fetch initial posts server-side
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      translations:blog_post_translations(*)
    `, { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(0, POSTS_PER_PAGE - 1)

  const { data, count } = await query

  // Transform data to ensure translations array exists
  const initialPosts = (data || []).map((post: any) => ({
    ...post,
    translations: post.translations || []
  })) as BlogPostWithTranslations[]

  const initialTotal = count || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/blog-hero-banner.webp)',
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

      <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
        <BlogListClient
          initialPosts={initialPosts}
          initialTotal={initialTotal}
          lang={lang}
          dictionary={dictionary.blog}
        />
      </Suspense>
    </div>
  )
}
