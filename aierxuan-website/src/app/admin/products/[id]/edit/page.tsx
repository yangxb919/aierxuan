import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

interface Product {
  id: string
  slug: string
  category: string
  images: string[]
  status: string
  featured: boolean
  sort_order: number
  moq?: number
  price?: number
  datasheet_url?: string
  created_at: string
  updated_at: string
  translations: {
    locale: string
    language_code?: string
    title: string
    short_desc: string
    long_desc: string
    key_specs: Record<string, string>
    seo_title: string
    seo_desc: string
    quality_tests?: any
    oem_services?: any
    faqs?: any
    durability_images?: any
    oem_images?: any
    features?: any
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
    translations: (translations || []).map((t) => ({
      ...t,
      locale: (t as any).locale || t.language_code || 'en',
      quality_tests: Array.isArray(t.quality_tests) ? t.quality_tests : [],
      oem_services: Array.isArray(t.oem_services) ? t.oem_services : [],
      faqs: Array.isArray(t.faqs) ? t.faqs : [],
      durability_images: Array.isArray((t as any).durability_images) ? (t as any).durability_images : Array.isArray((t as any).features?.durability_images) ? (t as any).features.durability_images : [],
      oem_images: Array.isArray((t as any).oem_images) ? (t as any).oem_images : Array.isArray((t as any).features?.oem_images) ? (t as any).features.oem_images : [],
      features: (t as any).features || {}
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
  
  // Prepare form data
  const formData = {
    slug: product.slug,
    category: product.category,
    status: product.status,
    featured: product.featured,
    sort_order: product.sort_order,
    moq: product.moq,
    price: product.price,
    datasheet_url: product.datasheet_url || '',
    images: product.images || [],
    translations: product.translations
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
