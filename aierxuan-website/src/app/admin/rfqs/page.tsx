import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import RFQListActions from '@/components/admin/RFQListActions'

import type { RFQ } from '@/types'

async function getRFQs(): Promise<RFQ[]> {
  const supabase = createSupabaseAdminClient()

  const { data, error } = await supabase
    .from('rfqs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching RFQs:', error)
    return []
  }

  return (data || []) as RFQ[]
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'contacted':
      return 'bg-yellow-100 text-yellow-800'
    case 'quoted':
      return 'bg-purple-100 text-purple-800'
    case 'closed':
      return 'bg-green-100 text-green-800'
    case 'spam':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'new':
      return 'New'
    case 'contacted':
      return 'Contacted'
    case 'quoted':
      return 'Quoted'
    case 'closed':
      return 'Closed'
    case 'spam':
      return 'Spam'
    default:
      return status
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

type SearchParams = Record<string, string | string[] | undefined>
type RFQStatusFilter = 'all' | 'new' | 'contacted' | 'quoted' | 'closed' | 'spam'

function parseRFQStatusFilter(value: unknown): RFQStatusFilter {
  if (value === 'new' || value === 'contacted' || value === 'quoted' || value === 'closed' || value === 'spam') return value
  return 'all'
}

function getRFQStatus(rfq: RFQ): Exclude<RFQStatusFilter, 'all'> {
  return ((rfq as any).status || 'new') as Exclude<RFQStatusFilter, 'all'>
}

export default async function AdminRFQsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const allRFQs = await getRFQs()

  const resolvedSearchParams = await Promise.resolve(searchParams)
  const statusParam = typeof resolvedSearchParams?.status === 'string' ? resolvedSearchParams.status : undefined
  const activeStatus = parseRFQStatusFilter(statusParam)
  const rfqs = allRFQs.filter((r) => activeStatus === 'all' || getRFQStatus(r) === activeStatus)

  const activePill = 'bg-blue-100 text-blue-700 hover:bg-blue-200'
  const inactivePill = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  return (
    <AdminShell
      user={user}
      title="RFQ Management"
      subtitle="Manage customer inquiries and requests for quotation"
      searchPlaceholder="Search RFQs..."
    >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allRFQs.length}</h3>
              <p className="text-sm text-gray-500 mt-1">Total RFQs</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allRFQs.filter(r => getRFQStatus(r) === 'new').length}</h3>
              <p className="text-sm text-gray-500 mt-1">New Requests</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allRFQs.filter(r => getRFQStatus(r) === 'contacted').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Contacted</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allRFQs.filter(r => getRFQStatus(r) === 'quoted').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Quoted</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filter by status:</span>
                <Link
                  href="/admin/rfqs"
                  scroll={false}
                  aria-current={activeStatus === 'all' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'all' ? activePill : inactivePill
                  }`}
                >
                  All ({allRFQs.length})
                </Link>
                <Link
                  href="/admin/rfqs?status=new"
                  scroll={false}
                  aria-current={activeStatus === 'new' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'new' ? activePill : inactivePill
                  }`}
                >
                  New ({allRFQs.filter(r => getRFQStatus(r) === 'new').length})
                </Link>
                <Link
                  href="/admin/rfqs?status=contacted"
                  scroll={false}
                  aria-current={activeStatus === 'contacted' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'contacted' ? activePill : inactivePill
                  }`}
                >
                  Contacted ({allRFQs.filter(r => getRFQStatus(r) === 'contacted').length})
                </Link>
                <Link
                  href="/admin/rfqs?status=quoted"
                  scroll={false}
                  aria-current={activeStatus === 'quoted' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'quoted' ? activePill : inactivePill
                  }`}
                >
                  Quoted ({allRFQs.filter(r => getRFQStatus(r) === 'quoted').length})
                </Link>
                <Link
                  href="/admin/rfqs?status=closed"
                  scroll={false}
                  aria-current={activeStatus === 'closed' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'closed' ? activePill : inactivePill
                  }`}
                >
                  Closed ({allRFQs.filter(r => getRFQStatus(r) === 'closed').length})
                </Link>
                <Link
                  href="/admin/rfqs?status=spam"
                  scroll={false}
                  aria-current={activeStatus === 'spam' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'spam' ? activePill : inactivePill
                  }`}
                >
                  Spam ({allRFQs.filter(r => getRFQStatus(r) === 'spam').length})
                </Link>
              </div>
            </div>
          </div>

          {/* RFQs Grid */}
          {rfqs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {allRFQs.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs yet</h3>
                  <p className="text-gray-500">No customer inquiries have been submitted yet.</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs match this filter</h3>
                  <p className="text-gray-500">Try switching to “All” to see every RFQ.</p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rfqs.map((rfq) => (
                <div key={rfq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(getRFQStatus(rfq))}`}>
                        {getStatusLabel(getRFQStatus(rfq))}
                      </span>
                      <span className="text-xs text-gray-400">
                        {rfq.priority && (
                          <span className="flex items-center text-red-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {rfq.priority}
                          </span>
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {(rfq as any).company || (rfq as any).company_name || 'Individual Customer'}
                    </h3>

                    <div className="text-sm text-gray-500 mb-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {rfq.name}
                      </div>
                      <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {rfq.email}
                      </div>
                      {rfq.phone && (
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {rfq.phone}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Product Interest:</div>
                      <div className="text-sm text-gray-900">
                        {rfq.product_interest || 'Not specified'}
                      </div>
                      {((rfq as any).quantity || (rfq as any).quantity_needed) && (
                        <div className="text-sm text-gray-500 mt-1">
                          Quantity: {(rfq as any).quantity || (rfq as any).quantity_needed}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{rfq.created_at ? formatDate(rfq.created_at) : 'N/A'}</span>
                      {rfq.industry && (
                        <span className="bg-gray-100 px-2 py-1 rounded">{rfq.industry}</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <RFQListActions rfqId={rfq.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
    </AdminShell>
  )
}
