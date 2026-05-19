import { SITE_URL } from './site-url'

const CANONICAL_HOST = 'www.aierxuanlaptop.com'

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
