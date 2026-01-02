import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

interface Product {
  id: string
  slug: string
  category: string | null
  images: string[]
  status: string | null
  featured: boolean | null
  sort_order: number | null
  moq?: number | null
  price?: number | null
  datasheet_url?: string | null
  created_at: string | null
  updated_at: string | null
  translations: {
    locale: string
    title: string
    short_desc: string
    long_desc: string
    key_specs: Record<string, string>
    seo_title: string
    seo_desc: string
    quality_tests?: any
    oem_services?: any
    faqs?: any
  }[]
}

async function getProduct(id: string): Promise<Product | null> {
  const supabase = createSupabaseAdminClient()
  
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (productError || !product) {
    return null
  }
  
  const { data: translations, error: translationsError } = await supabase
    .from('product_translations')
    .select('*')
    .eq('product_id', id)
  
  if (translationsError) {
    console.error('Error fetching translations:', translationsError)
    return null
  }
  
  return {
    ...product,
    category: product.category,
    images: Array.isArray(product.images) ? (product.images as string[]) : [],
    translations: (translations || []).map((t: any) => ({
      locale: t.locale || 'en',
      title: t.title || '',
      short_desc: t.short_desc || '',
      long_desc: t.long_desc || '',
      key_specs: t.key_specs || {},
      seo_title: t.seo_title || '',
      seo_desc: t.seo_desc || '',
      quality_tests: Array.isArray(t.quality_tests) ? t.quality_tests : [],
      oem_services: Array.isArray(t.oem_services) ? t.oem_services : [],
      faqs: Array.isArray(t.faqs) ? t.faqs : []
    }))
  }
}

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const { id } = await params
  const product = await getProduct(id)
  
  if (!product) {
    notFound()
  }
  
  // Prepare form data - convert database field names to form field names
  const formData = {
    slug: product.slug,
    category: product.category || '',
    status: product.status || 'draft',
    featured: product.featured ?? false,
    sort_order: product.sort_order ?? 0,
    moq: product.moq ?? undefined,
    price: product.price ?? undefined,
    datasheet_url: product.datasheet_url || '',
    images: product.images || [],
    translations: product.translations.map(t => ({
      locale: t.locale,
      title: t.title,
      short_desc: t.short_desc,
      long_desc: t.long_desc,
      key_specs: t.key_specs,
      seo_title: t.seo_title,
      seo_desc: t.seo_desc,
      quality_tests: t.quality_tests,
      oem_services: t.oem_services,
      faqs: t.faqs
    }))
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update product information and specifications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/en/products/${product.slug}`} target="_blank">
                <Button variant="outline">
                  View Product →
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="outline">
                  ← Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm mode="edit" productId={id} initialData={formData} />
      </div>
    </div>
  )
}
