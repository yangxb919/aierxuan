import { MetadataRoute } from 'next'

const BASE_URL = 'https://aierxuanlaptop.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ru']
  const pages = ['', '/products', '/oem', '/about', '/contact', '/blog', '/faq']

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page}`,
            ru: `${BASE_URL}/ru${page}`,
          },
        },
      })
    }
  }

  return entries
}
