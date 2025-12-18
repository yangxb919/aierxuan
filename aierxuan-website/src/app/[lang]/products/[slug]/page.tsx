import { getDictionary } from '@/get-dictionary'
import { ProductDetailClient } from '@/components/features/ProductDetailClient'
import { Locale } from '@/i18n-config'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { ProductWithTranslations } from '@/types'

// ISR: 每30分钟重新生成
export const revalidate = 1800

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

  return (
    <ProductDetailClient
      product={product}
      lang={lang}
      dictionary={dictionary.products.detail}
    />
  )
}
