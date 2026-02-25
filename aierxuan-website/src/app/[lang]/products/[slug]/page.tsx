import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { ProductDetailClient } from '@/components/features/ProductDetailClient'
import { Locale } from '@/i18n-config'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { ProductWithTranslations } from '@/types'
import { SITE_URL } from '@/lib/site-url'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

// ISR: 每30分钟重新生成
export const revalidate = 1800

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params

  const { data } = await supabase
    .from('products')
    .select(`*, translations:product_translations(*)`)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!data) return {}

  const product = data as unknown as ProductWithTranslations
  const translation = product.translations?.find((t: any) => t.language_code === lang)
  const title = translation?.name || product.translations?.[0]?.name || slug
  const description = translation?.short_description || product.translations?.[0]?.short_description || ''

  return {
    title: `${title} | AIERXUAN`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/products/${slug}`,
      languages: {
        'x-default': `${SITE_URL}/en/products/${slug}`,
        'en': `${SITE_URL}/en/products/${slug}`,
        'ru': `${SITE_URL}/ru/products/${slug}`,
      },
    },
  }
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const dictionary = await getDictionary(lang)

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      translations:product_translations(*)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error || !data) {
    console.error('Error fetching product:', error)
    notFound()
  }

  // Cast the data to ProductWithTranslations to ensure type compatibility
  // The query structure matches the type
  const product = data as unknown as ProductWithTranslations
  const translation = product.translations?.find((t: any) => t.language_code === lang)
  const productName = translation?.name || product.translations?.[0]?.name || slug

  return (
    <>
      <BreadcrumbJsonLd
        lang={lang}
        items={[
          { name: 'Home', href: '' },
          { name: 'Products', href: '/products' },
          { name: productName, href: `/products/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: productName,
            description: translation?.short_description || '',
            image: (product as any).images?.[0] || undefined,
            brand: { '@type': 'Brand', name: 'AIERXUAN' },
            manufacturer: { '@type': 'Organization', name: 'AIERXUAN' },
            url: `${SITE_URL}/${lang}/products/${slug}`,
            ...(product.price ? {
              offers: {
                '@type': 'Offer',
                priceCurrency: 'USD',
                price: product.price,
                availability: 'https://schema.org/InStock',
              },
            } : {}),
          }),
        }}
      />
      <ProductDetailClient
        product={product}
        lang={lang}
        dictionary={dictionary.products.detail}
      />
    </>
  )
}
