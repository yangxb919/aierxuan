import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import AdminShell from '@/components/admin/AdminShell'
import Image from 'next/image'
import ProductListActions from '@/components/admin/ProductListActions'

interface Product {
  id: string
  slug: string
  category: string
  images: string[]
  status: string
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
  translations: {
    locale: string
    title: string
    short_desc: string | null
  }[]
}

async function getProducts(): Promise<Product[]> {
  const supabase = createSupabaseAdminClient()

  // NOTE: The production DB uses `product_translations.locale/title/short_desc/...`.
  // Use a broad select and normalize in code to avoid type/schema drift breaking the page.
  const { data, error } = await (supabase as any)
    .from('products')
    .select(
      `
      id,
      slug,
      category,
      images,
      status,
      featured,
      sort_order,
      created_at,
      updated_at,
      translations:product_translations(*)
    `
    )
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  // Map products and prioritize translations (en > zh-CN > first available)
  return (data || []).map((product: any) => {
    const translations: any[] = product.translations || []
    // Try to get English translation first, fallback to Chinese, then any translation
    const preferredTranslation =
      translations.find(t => t.locale === 'en') ||
      translations.find(t => t.locale === 'zh-CN') ||
      translations[0]

    return {
      ...product,
      translations: preferredTranslation ? [preferredTranslation] : []
    }
  }) as Product[]
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'draft':
      return 'bg-yellow-100 text-yellow-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    case 'discontinued':
      return 'bg-red-100 text-red-800'
    case 'archived':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'active':
      return 'Active'
    case 'draft':
      return 'Draft'
    case 'inactive':
      return 'Inactive'
    case 'discontinued':
      return 'Discontinued'
    case 'archived':
      return 'Archived'
    default:
      return status
  }
}

type SearchParams = Record<string, string | string[] | undefined>
type ProductFilter = 'all' | 'active' | 'draft' | 'featured' | 'inactive'

function parseProductFilter(value: unknown): ProductFilter {
  if (value === 'active' || value === 'draft' || value === 'featured' || value === 'inactive') return value
  return 'all'
}

function getProductMatchesFilter(product: Product, filter: ProductFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'featured') return Boolean(product.featured)
  return product.status === filter
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const allProducts = await getProducts()

  const resolvedSearchParams = await Promise.resolve(searchParams)
  const filterParam = typeof resolvedSearchParams?.filter === 'string' ? resolvedSearchParams.filter : undefined
  const activeFilter = parseProductFilter(filterParam)
  const products = allProducts.filter((p) => getProductMatchesFilter(p, activeFilter))

  const activePill = 'bg-blue-100 text-blue-700 hover:bg-blue-200'
  const inactivePill = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  return (
    <AdminShell
      user={user}
      title="Product Management"
      subtitle="Manage products, specifications, and images"
      searchPlaceholder="Search products..."
    >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allProducts.length}</h3>
              <p className="text-sm text-gray-500 mt-1">Total Products</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allProducts.filter(p => p.status === 'active').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Active</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allProducts.filter(p => p.status === 'draft').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Draft</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allProducts.filter(p => p.featured).length}</h3>
              <p className="text-sm text-gray-500 mt-1">Featured</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allProducts.filter(p => p.status === 'inactive').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Inactive</p>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filter by status:</span>
                <Link
                  href="/admin/products"
                  scroll={false}
                  aria-current={activeFilter === 'all' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === 'all' ? activePill : inactivePill
                  }`}
                >
                  All ({allProducts.length})
                </Link>
                <Link
                  href="/admin/products?filter=active"
                  scroll={false}
                  aria-current={activeFilter === 'active' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === 'active' ? activePill : inactivePill
                  }`}
                >
                  Active ({allProducts.filter(p => p.status === 'active').length})
                </Link>
                <Link
                  href="/admin/products?filter=draft"
                  scroll={false}
                  aria-current={activeFilter === 'draft' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === 'draft' ? activePill : inactivePill
                  }`}
                >
                  Draft ({allProducts.filter(p => p.status === 'draft').length})
                </Link>
                <Link
                  href="/admin/products?filter=featured"
                  scroll={false}
                  aria-current={activeFilter === 'featured' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === 'featured' ? activePill : inactivePill
                  }`}
                >
                  Featured ({allProducts.filter(p => p.featured).length})
                </Link>
                <Link
                  href="/admin/products?filter=inactive"
                  scroll={false}
                  aria-current={activeFilter === 'inactive' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === 'inactive' ? activePill : inactivePill
                  }`}
                >
                  Inactive ({allProducts.filter(p => p.status === 'inactive').length})
                </Link>
              </div>
              <Link href="/admin/products/new">
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New Product
                </Button>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {allProducts.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first product.</p>
                  <Link href="/admin/products/new">
                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Product
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products match this filter</h3>
                  <p className="text-gray-500 mb-6">Try switching to “All” to see every product.</p>
                  <Link href="/admin/products">
                    <Button variant="outline">View All Products</Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const title = product.translations[0]?.title || 'Untitled'

                return (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(product.status)}`}>
                          {getStatusLabel(product.status)}
                        </span>
                        {product.featured && (
                          <span className="text-yellow-500 text-sm">⭐</span>
                        )}
                      </div>

                      <div className="flex items-center mb-4">
                        {product.images && product.images.length > 0 ? (
                          <div className="h-16 w-16 flex-shrink-0 relative">
                            <Image
                              src={product.images[0]}
                              alt={title}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-500">{product.slug}</p>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 mb-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {product.category}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Updated {new Date(product.updated_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Sort order: {product.sort_order}</span>
                        <div className="flex items-center space-x-2">
                          {product.translations.length > 0 && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                              </svg>
                              {product.translations.length} {product.translations.length === 1 ? 'language' : 'languages'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <ProductListActions productId={product.id} slug={product.slug} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
    </AdminShell>
  )
}
