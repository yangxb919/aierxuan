import { SITE_URL } from './site-url'

const CANONICAL_HOST = 'www.aierxuanlaptop.com'
export const INDEXABLE_LOCALES = ['en', 'ru'] as const

export const BLOG_SLUG_ALIASES: Record<string, string> = {
  'barebones-laptop-kit-oem-solutions': 'clevo-oem-laptop-manufacturing-b2b-buyers',
  'best-mini-pc-gaming-2025-oem': 'best-mini-pc-gaming-2025-oem-solutions',
  'custom-gaming-laptop-manufacturing-oem': 'custom-gaming-laptop-manufacturing-oem-solutions',
  'custom-laptop-builder-specifications-guide': 'laptop-specifications-guide-cpu-ram-storage-custom-orders',
  'how-to-build-custom-laptop-b2b-guide': 'how-to-build-custom-laptop-b2b-manufacturing-guide',
  'how-to-choose-laptop-manufacturer-b2b-guide': 'oem-laptop-manufacturers-top-suppliers-2025',
  'mini-pc-digital-signage-commercial': 'mini-pc-buyers-guide-2025-b2b-wholesale-custom',
  'mini-pc-digital-signage-commercial-solutions': 'mini-pc-buyers-guide-2025-b2b-wholesale-custom',
  'mini-pc-wholesale-b2b-pricing-moq-guide': 'mini-pc-buyers-guide-2025-b2b-wholesale-custom',
  'what-is-oem-manufacturing-complete-explanation-b2b-buyers': 'what-is-oem-manufacturing-complete-explanation-for-b2b-buyers',
  'odm-vs-oem-cost-analysis-laptop-manufacturing': 'oem-vs-odm-manufacturing-complete-guide-tech-brands-2025',
  'oem-vs-odm-manufacturing-complete-guide-2025': 'oem-vs-odm-manufacturing-complete-guide-tech-brands-2025',
  'mini-pc-wholesale-b2b-pricing-moq': 'mini-pc-buyers-guide-2025-b2b-wholesale-custom',
  'clevo-oem-laptop-manufacturing-guide': 'clevo-oem-laptop-manufacturing-b2b-buyers',
}

const BROKEN_RESOURCE_PATHS = [
  '/consultation',
  '/catalog',
  '/samples',
  '/resources/mini-pc-spec-guide.pdf',
  '/resources/oem-rfq-template',
  '/factory-tour',
]

type ProductJsonLdInput = {
  lang: string
  slug: string
  name: string
  shortDescription?: string | null
  images?: unknown
  price?: number | string | null
  category?: string | null
  sku?: string | null
  model?: string | null
  moq?: number | string | null
}

export function toCanonicalWwwUrl(input: string | URL) {
  const url = new URL(input.toString())
  url.protocol = 'https:'
  url.hostname = CANONICAL_HOST
  url.port = ''
  return url
}

export function absolutizeSiteUrl(value?: string | null) {
  if (!value) return undefined
  if (/^https?:\/\//i.test(value)) return value
  if (value.startsWith('//')) return `https:${value}`
  return `${SITE_URL}/${value.replace(/^\/+/, '')}`
}

export function isIndexableLocale(lang: string) {
  return (INDEXABLE_LOCALES as readonly string[]).includes(lang)
}

export function robotsForLocale(lang: string) {
  if (isIndexableLocale(lang)) {
    return {
      index: true,
      follow: true,
    }
  }

  return {
    index: false,
    follow: true,
  }
}

export function localizedAlternates(path = '') {
  const normalizedPath = normalizePath(path)

  return {
    'x-default': `${SITE_URL}/en${normalizedPath}`,
    en: `${SITE_URL}/en${normalizedPath}`,
    ru: `${SITE_URL}/ru${normalizedPath}`,
  }
}

export function canonicalForLocale(lang: string, path = '') {
  return `${SITE_URL}/${lang}${normalizePath(path)}`
}

export function formatSeoTitle(title: string, brand = 'AIERXUAN', maxLength = 60) {
  const cleanTitle = normalizeInlineText(title)
    .replace(/\s+[-|]\s+AIERXUAN$/i, '')
    .replace(/\s+AIERXUAN$/i, '')
  const suffix = ` | ${brand}`
  const available = Math.max(20, maxLength - suffix.length)
  const base = truncateText(cleanTitle, available)
  return `${base}${suffix}`
}

export function formatSeoDescription(description?: string | null, maxLength = 155) {
  return truncateText(normalizeInlineText(description || ''), maxLength)
}

export function stripDuplicateMarkdownH1(markdown: string, title: string) {
  const normalizedTitle = normalizeHeadingText(title)
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const index = lines.findIndex((line) => {
    const match = line.match(/^#\s+(.+?)\s*#*\s*$/)
    return match ? normalizeHeadingText(match[1]) === normalizedTitle : false
  })

  if (index === -1) return markdown

  const nextIndex = lines[index + 1]?.trim() === '' ? index + 2 : index + 1
  return lines.slice(0, index).concat(lines.slice(nextIndex)).join('\n').trimStart()
}

export function stripMarkdownH1ForArticle(markdown: string, title: string) {
  const withoutExactDuplicate = stripDuplicateMarkdownH1(markdown, title)
  const lines = withoutExactDuplicate.replace(/\r\n/g, '\n').split('\n')
  let removedPrimary = false

  const normalized = lines.flatMap((line) => {
    const match = line.match(/^#\s+(.+?)\s*#*\s*$/)
    if (!match) return [line]

    if (!removedPrimary) {
      removedPrimary = true
      return []
    }

    return [`## ${match[1].trim()}`]
  })

  return normalized.join('\n').trimStart()
}

export function resolveBlogSlugAlias(slug: string) {
  return BLOG_SLUG_ALIASES[slug] || null
}

export function normalizeInternalMarkdownLinks(markdown: string, lang: string) {
  const locale = isIndexableLocale(lang) ? lang : 'en'
  let normalized = markdown || ''

  normalized = normalized.replace(
    /(?:https?:\/\/(?:www\.)?aierxuanlaptop\.com)?\/(?:en|ru|ja|fr|pt)?\/?blog\/([a-z0-9-]+)/gi,
    (match, slug: string) => {
      const cleanSlug = slug.toLowerCase()
      const targetSlug = resolveBlogSlugAlias(cleanSlug)
      return targetSlug ? `/${locale}/blog/${targetSlug}` : match
    }
  )

  normalized = normalized.replace(
    /(?:https?:\/\/(?:www\.)?aierxuanlaptop\.com)?\/articles\/([a-z0-9-]+)/gi,
    (_match, slug: string) => {
      const cleanSlug = slug.toLowerCase()
      return `/${locale}/blog/${resolveBlogSlugAlias(cleanSlug) || cleanSlug}`
    }
  )

  const resourceReplacements: Array<[RegExp, string]> = BROKEN_RESOURCE_PATHS.map((pathName) => [
    new RegExp(
      `(?:https?:\\/\\/(?:www\\.)?aierxuanlaptop\\.com)?\\/(?:en|ru|ja|fr|pt)?\\/?${escapeRegExp(pathName.startsWith('/') ? pathName.slice(1) : pathName)}\\b`,
      'gi'
    ),
    pathName === '/factory-tour' ? `/${locale}/about` : `/${locale}/contact#rfq`,
  ])

  resourceReplacements.push([/mailto:[^\s)"']+/gi, `/${locale}/contact#rfq`])

  for (const [pattern, replacement] of resourceReplacements) {
    normalized = normalized.replace(pattern, replacement)
  }

  return normalized.replace(
    /(?:admin|sales|info)@(?:aierxuanlaptop\.com|aierxuan\.com)/gi,
    'AIERXUAN sales team'
  )
}

export function buildProductJsonLd({
  lang,
  slug,
  name,
  shortDescription,
  images,
  price,
  category,
  sku,
  model,
  moq,
}: ProductJsonLdInput) {
  const description = shortDescription?.trim()
    || `${name} is an AIERXUAN OEM/ODM ${categoryLabel(category)} for B2B buyers, distributors, and custom hardware projects.`
  const image = absolutizeSiteUrl(firstImage(images))

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image ? { image } : {}),
    ...(category ? { category } : {}),
    ...(sku ? { sku } : {}),
    ...(model ? { model } : {}),
    brand: { '@type': 'Brand', name: 'AIERXUAN' },
    manufacturer: { '@type': 'Organization', name: 'AIERXUAN', url: SITE_URL },
    url: `${SITE_URL}/${lang}/products/${slug}`,
    ...(moq ? {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Minimum Order Quantity',
          value: String(moq),
        },
      ],
    } : {}),
    ...(price ? {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price,
        availability: 'https://schema.org/InStock',
      },
    } : {}),
  }
}

function normalizeHeadingText(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase()
}

function normalizeInlineText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value

  const hardLimit = Math.max(10, maxLength - 3)
  const softLimit = value.lastIndexOf(' ', hardLimit)
  const cutAt = softLimit >= Math.floor(maxLength * 0.65) ? softLimit : hardLimit
  return `${value.slice(0, cutAt).trim()}...`
}

function normalizePath(path: string) {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function firstImage(images: unknown) {
  if (Array.isArray(images)) {
    return typeof images[0] === 'string' ? images[0] : undefined
  }
  return typeof images === 'string' ? images : undefined
}

function categoryLabel(category?: string | null) {
  if (!category) return 'computer hardware product'
  return category.replace(/[-_]+/g, ' ')
}
