import { Suspense } from 'react'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { BlogListClient } from '@/components/features/BlogListClient'
import { getDictionary } from '@/get-dictionary'
import type { Locale } from '@/i18n-config'
import type { BlogPost, BlogPostTranslation } from '@/types'

// ISR: 每小时重新生成
export const revalidate = 3600

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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <section className="relative text-white overflow-hidden">
          <Image
            src="/images/blog-hero-banner.webp"
            alt="Blog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/85 via-slate-900/80 to-[#0a0a0f]/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                {texts.title}
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                {texts.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
              <div className="text-red-400 mb-3 font-semibold">Blog data unavailable</div>
              <div className="text-gray-300 text-sm">
                Missing `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
              </div>
              <div className="text-gray-500 text-xs mt-3">
                After editing `.env.local`, restart `next dev` and hard refresh the browser.
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Fetch initial posts server-side
  const query = supabase
    .from('blog_posts')
    .select(`
      *,
      translations:blog_post_translations(*)
    `, { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(0, POSTS_PER_PAGE - 1)

  const { data, count, error } = await query

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <section className="relative text-white overflow-hidden">
          <Image
            src="/images/blog-hero-banner.webp"
            alt="Blog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/85 via-slate-900/80 to-[#0a0a0f]/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                {texts.title}
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                {texts.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
              <div className="text-red-400 mb-3 font-semibold">Blog data unavailable</div>
              <div className="text-gray-300 text-sm">
                {error.message}
              </div>
              <div className="text-gray-500 text-xs mt-3">
                If you recently rotated Supabase keys, restart `next dev` and hard refresh.
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Transform data to ensure translations array exists
  const initialPosts = (data || []).map((post: any) => ({
    ...post,
    translations: post.translations || []
  })) as BlogPostWithTranslations[]

  const initialTotal = count || 0

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/blog-hero-banner.webp"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/85 via-slate-900/80 to-[#0a0a0f]/85" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 bg-blue-600" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-violet-600" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              {texts.title}
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              {texts.subtitle}
            </p>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
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
