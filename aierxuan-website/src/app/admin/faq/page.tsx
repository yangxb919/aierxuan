import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import AdminShell from '@/components/admin/AdminShell'
import FAQListActions from '@/components/admin/FAQListActions'

interface FAQ {
  id: string
  category: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  translations: {
    locale: string
    question: string
    answer: string
  }[]
}

async function getFAQs(): Promise<FAQ[]> {
  const supabase = createSupabaseAdminClient()

  // NOTE: The production DB uses `faq_translations.locale`.
  // Fetch all translations and pick the preferred one in code to avoid schema drift issues.
  const { data, error } = await (supabase as any)
    .from('faq')
    .select(
      `
      id,
      category,
      sort_order,
      is_active,
      created_at,
      updated_at,
      translations:faq_translations(*)
    `
    )
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
  
  return (data || []).map((faq: any) => {
    const translations: any[] = faq.translations || []
    const preferred =
      translations.find(t => t.locale === 'en') ||
      translations.find(t => t.locale === 'zh-CN') ||
      translations[0]

    return {
      ...faq,
      translations: preferred ? [preferred] : []
    }
  }) as FAQ[]
}

type SearchParams = Record<string, string | string[] | undefined>
type FAQStatusFilter = 'all' | 'active' | 'inactive'

function parseFAQStatusFilter(value: unknown): FAQStatusFilter {
  if (value === 'active' || value === 'inactive') return value
  return 'all'
}

export default async function AdminFAQPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const allFAQs = await getFAQs()

  const resolvedSearchParams = await Promise.resolve(searchParams)
  const statusParam = typeof resolvedSearchParams?.status === 'string' ? resolvedSearchParams.status : undefined
  const activeStatus = parseFAQStatusFilter(statusParam)
  const faqs = allFAQs.filter((f) => {
    if (activeStatus === 'all') return true
    return activeStatus === 'active' ? Boolean(f.is_active) : !f.is_active
  })

  const activePill = 'bg-orange-100 text-orange-700 hover:bg-orange-200'
  const inactivePill = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  return (
    <AdminShell
      user={user}
      title="FAQ Management"
      subtitle="Manage frequently asked questions in multiple languages"
      searchPlaceholder="Search FAQs..."
    >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allFAQs.length}</h3>
              <p className="text-sm text-gray-500 mt-1">Total FAQs</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allFAQs.filter(f => f.is_active).length}</h3>
              <p className="text-sm text-gray-500 mt-1">Active</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allFAQs.filter(f => !f.is_active).length}</h3>
              <p className="text-sm text-gray-500 mt-1">Inactive</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{new Set(allFAQs.map(f => f.category)).size}</h3>
              <p className="text-sm text-gray-500 mt-1">Categories</p>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filter by status:</span>
                <Link
                  href="/admin/faq"
                  scroll={false}
                  aria-current={activeStatus === 'all' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'all' ? activePill : inactivePill
                  }`}
                >
                  All ({allFAQs.length})
                </Link>
                <Link
                  href="/admin/faq?status=active"
                  scroll={false}
                  aria-current={activeStatus === 'active' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'active' ? activePill : inactivePill
                  }`}
                >
                  Active ({allFAQs.filter(f => f.is_active).length})
                </Link>
                <Link
                  href="/admin/faq?status=inactive"
                  scroll={false}
                  aria-current={activeStatus === 'inactive' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'inactive' ? activePill : inactivePill
                  }`}
                >
                  Inactive ({allFAQs.filter(f => !f.is_active).length})
                </Link>
              </div>
              <Link href="/admin/faq/new">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New FAQ
                </Button>
              </Link>
            </div>
          </div>

          {/* FAQs Grid */}
          {faqs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {allFAQs.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs yet</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first FAQ.</p>
                  <Link href="/admin/faq/new">
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create FAQ
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs match this filter</h3>
                  <p className="text-gray-500 mb-6">Try switching to “All” to see every FAQ.</p>
                  <Link href="/admin/faq">
                    <Button variant="outline">View All FAQs</Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqs.map((faq) => {
                const question = faq.translations[0]?.question || 'Untitled'
                const answer = faq.translations[0]?.answer || ''

                return (
                  <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          faq.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {faq.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-xs text-gray-400">#{faq.sort_order}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {question}
                      </h3>

                      <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                        {answer}
                      </p>

                      <div className="text-sm text-gray-500 mb-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {faq.category}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Updated {new Date(faq.updated_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Order: {faq.sort_order}</span>
                        <div className="flex items-center space-x-2">
                          {faq.translations.length > 0 && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                              </svg>
                              {faq.translations.length} {faq.translations.length === 1 ? 'language' : 'languages'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <FAQListActions faqId={faq.id} />
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
