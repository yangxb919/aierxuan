import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site-url'

const DEFAULT_OG_IMAGE = '/images/redesign/home-hero.webp'

export function buildOgTwitter({
  lang,
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
}: {
  lang: string
  title: string
  description: string
  path?: string
  image?: string
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = `${SITE_URL}/${lang}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const locale = lang === 'ru' ? 'ru_RU' : 'en_US'

  return {
    openGraph: {
      type: 'website',
      siteName: 'AIERXUAN',
      title,
      description,
      url,
      locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}
