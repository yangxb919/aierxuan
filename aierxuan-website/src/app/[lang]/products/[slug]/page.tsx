import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { ProductDetailClient } from '@/components/features/ProductDetailClient'
import { Locale } from '@/i18n-config'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { ProductWithTranslations } from '@/types'
import { SITE_URL } from '@/lib/site-url'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { buildProductJsonLd } from '@/lib/technical-seo'

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
  const translation = product.translations?.find((t: any) => t.locale === lang)
  const fallbackTranslation = product.translations?.[0] as any
  const title = (translation as any)?.title || fallbackTranslation?.title || (translation as any)?.name || fallbackTranslation?.name || slug
  const description = (translation as any)?.short_desc || fallbackTranslation?.short_desc || (translation as any)?.short_description || fallbackTranslation?.short_description || ''

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
  const translation = product.translations?.find((t: any) => t.locale === lang) as any
  const fallbackTranslation = product.translations?.[0] as any
  const productName = translation?.title || fallbackTranslation?.title || translation?.name || fallbackTranslation?.name || slug

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
          __html: JSON.stringify(buildProductJsonLd({
            lang,
            slug,
            name: productName,
            shortDescription: translation?.short_desc || translation?.short_description,
            images: (product as any).images,
            price: product.price,
            category: (product as any).category,
            sku: (product as any).sku,
            model: (product as any).model,
            moq: product.moq,
          })),
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
