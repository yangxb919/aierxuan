import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-url'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'ru']
  const pages = ['', '/products', '/oem', '/about', '/contact', '/blog', '/faq']
  const enOnlyPages = ['/lp/mini-pc']
  const alternatesFor = (path: string) => ({
    'x-default': `${SITE_URL}/en${path}`,
    en: `${SITE_URL}/en${path}`,
    ru: `${SITE_URL}/ru${path}`,
  })
  const priorityFor = (page: string) => {
    if (page === '') return 1
    if (page === '/oem') return 0.95
    return 0.8
  }

  const entries: MetadataRoute.Sitemap = []

  // Static pages
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: priorityFor(page),
        alternates: {
          languages: alternatesFor(page),
        },
      })
    }
  }

  for (const page of enOnlyPages) {
    entries.push({
      url: `${SITE_URL}/en${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'x-default': `${SITE_URL}/en${page}`,
          en: `${SITE_URL}/en${page}`,
        },
      },
    })
  }

  // Blog detail pages
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')

  if (blogPosts) {
    for (const post of blogPosts) {
      for (const locale of locales) {
        entries.push({
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
          lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: {
            languages: alternatesFor(`/blog/${post.slug}`),
          },
        })
      }
    }
  }

  // Product detail pages
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('status', 'active')

  if (products) {
    for (const product of products) {
      for (const locale of locales) {
        entries.push({
          url: `${SITE_URL}/${locale}/products/${product.slug}`,
          lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: {
            languages: alternatesFor(`/products/${product.slug}`),
          },
        })
      }
    }
  }

  return entries
}
