import { Suspense } from 'react'
import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { BlogListClient } from '@/components/features/BlogListClient'
import { getDictionary } from '@/get-dictionary'
import type { Locale } from '@/i18n-config'
import type { BlogPost, BlogPostTranslation } from '@/types'
import { SITE_URL } from '@/lib/site-url'
import { SectionHeader, TechCTA, TechHero, redesignImages } from '@/components/redesign/TechPrimitives'

// ISR: 每小时重新生成
export const revalidate = 3600

interface BlogPostWithTranslations extends BlogPost {
  translations: BlogPostTranslation[]
}

const POSTS_PER_PAGE = 9

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: 'Blog & News - Industry Insights | AIERXUAN',
      description: 'Latest updates, industry insights, and technology news from AIERXUAN. Stay informed about laptop manufacturing, mini PC trends, and OEM solutions.',
      keywords: 'aierxuan blog, laptop news, mini pc trends, oem manufacturing insights',
    },
    ru: {
      title: 'Блог и новости — Отраслевые обзоры | AIERXUAN',
      description: 'Последние новости, отраслевые обзоры и технологические тренды от AIERXUAN. Производство ноутбуков, мини-ПК и OEM решения.',
      keywords: 'блог aierxuan, новости ноутбуков, тренды мини-ПК, OEM производство',
    },
  }
  const seo = metaByLang[lang] ?? metaByLang.en

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        'x-default': `${SITE_URL}/en/blog`,
        'en': `${SITE_URL}/en/blog`,
        'ru': `${SITE_URL}/ru/blog`,
      },
    },
  }
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
        <BlogHero lang={lang} texts={texts} />

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
        <BlogHero lang={lang} texts={texts} />

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
      <BlogHero lang={lang} texts={texts} />

      <section className="relative overflow-hidden bg-[#070b12] py-20 text-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured Insight"
            title="How to Evaluate a Laptop OEM Factory Before You Order"
            description="Turn common sourcing questions into practical articles about MOQ, samples, quality checks, certifications, packaging and import documentation."
          />
          <div className="rounded-xl border border-white/12 bg-white/[0.045] p-6 sm:p-8">
            <div className="flex flex-wrap gap-3">
              {['OEM/ODM', 'Buyer Checklist', '8 min read', 'Quality Guide'].map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase text-cyan-200">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">
              Use the blog as a buyer education hub, not only a news list. Every article should help importers and distributors ask better questions before requesting a quote.
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

      <TechCTA
        title="Have a Product Question?"
        description="Every article can lead buyers into a qualified sales conversation with real product requirements."
        href={`/${lang}/contact`}
      />
    </div>
  )
}

function BlogHero({ lang, texts }: { lang: Locale; texts: any }) {
  void texts

  return (
    <TechHero
      lang={lang}
      image={redesignImages.blogHero}
      eyebrow="OEM Insights | Product Trends | Quality Guides"
      title="Manufacturing Insights for Hardware Buyers"
      subtitle="Sourcing guides, product trends, and quality notes for laptop and Mini PC importers."
      primaryLabel="Read Latest"
      secondaryLabel="Ask a Question"
      secondaryHref={`/${lang}/contact`}
      widgets={[
        {
          title: 'Trending Topics',
          rows: [
            { label: 'OEM Factory Audit', value: 'Hot', status: 'live' },
            { label: 'Mini PC Specs', value: 'New' },
            { label: 'Certification', value: 'Guide', status: 'ok' },
          ],
        },
        {
          title: 'Buyer Checklist',
          rows: [
            { label: 'MOQ', value: '100+' },
            { label: 'Samples', value: '7-15d', status: 'ok' },
            { label: 'Quote Path', value: '24h', status: 'ok' },
          ],
        },
      ]}
    />
  )
}
