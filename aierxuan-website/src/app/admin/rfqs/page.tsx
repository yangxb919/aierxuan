import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'

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

export default async function AdminRFQsPage() {
  // Require authentication
  const user = await requireAdminAuth()
  const rfqs = await getRFQs()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 min-h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">AIERXUAN</h2>
          <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Link href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link href="/admin/rfqs" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              RFQ Management
            </Link>
            <Link href="/admin/products" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Products
            </Link>
            <Link href="/admin/blog" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Blog
            </Link>
            <Link href="/admin/faq" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">RFQ Management</h1>
              <p className="text-sm text-gray-500">Manage customer inquiries and requests for quotation</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search RFQs..."
                  className="w-64 px-4 py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </div>
                <form action="/api/admin/logout" method="POST">
                  <Button type="submit" variant="outline" size="sm" className="ml-2">
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* RFQ Content */}
        <main className="p-6">
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
              <h3 className="text-2xl font-bold text-gray-900">{rfqs.length}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900">{rfqs.filter(r => r.status === 'new').length}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900">{rfqs.filter(r => r.status === 'contacted').length}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900">{rfqs.filter(r => r.status === 'quoted').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Quoted</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filter by status:</span>
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                  All ({rfqs.length})
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                  New ({rfqs.filter(r => r.status === 'new').length})
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                  Contacted ({rfqs.filter(r => r.status === 'contacted').length})
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                  Quoted ({rfqs.filter(r => r.status === 'quoted').length})
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                  Closed ({rfqs.filter(r => r.status === 'closed').length})
                </button>
              </div>
            </div>
          </div>

          {/* RFQs Grid */}
          {rfqs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs yet</h3>
              <p className="text-gray-500">No customer inquiries have been submitted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rfqs.map((rfq) => (
                <div key={rfq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(rfq.status || 'new')}`}>
                        {getStatusLabel(rfq.status || 'new')}
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
                    <Link href={`/admin/rfqs/${rfq.id}`} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
