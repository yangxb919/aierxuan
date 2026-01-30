import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { Button } from '@/components/ui'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'

// Dashboard stats interface
interface DashboardStats {
  totalRFQs: number
  newRFQs: number
  totalProducts: number
  activeProducts: number
  totalBlogPosts: number
  publishedPosts: number
  totalFAQs: number
  activeFAQs: number
}

async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createSupabaseAdminClient()

  try {
    // Get RFQ stats
    const [
      { count: totalRFQs },
      { count: newRFQs },
      { count: totalProducts },
      { count: activeProducts },
      { count: totalBlogPosts },
      { count: publishedPosts },
      { count: totalFAQs },
      { count: activeFAQs }
    ] = await Promise.all([
      supabase.from('rfqs').select('*', { count: 'exact', head: true }),
      supabase.from('rfqs').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('faq').select('*', { count: 'exact', head: true }),
      supabase.from('faq').select('*', { count: 'exact', head: true }).eq('is_active', true)
    ])

    return {
      totalRFQs: totalRFQs || 0,
      newRFQs: newRFQs || 0,
      totalProducts: totalProducts || 0,
      activeProducts: activeProducts || 0,
      totalBlogPosts: totalBlogPosts || 0,
      publishedPosts: publishedPosts || 0,
      totalFAQs: totalFAQs || 0,
      activeFAQs: activeFAQs || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalRFQs: 0,
      newRFQs: 0,
      totalProducts: 0,
      activeProducts: 0,
      totalBlogPosts: 0,
      publishedPosts: 0,
      totalFAQs: 0,
      activeFAQs: 0
    }
  }
}

export default async function AdminDashboardPage() {
  // Require authentication
  const user = await requireAdminAuth()
  const stats = await getDashboardStats()

  return (
    <AdminShell
      user={user}
      title="Dashboard"
      subtitle={`Welcome back, ${user.firstName} ${user.lastName}`}
      searchPlaceholder="Search..."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* RFQ Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +{stats.newRFQs} new
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalRFQs}</h3>
              <p className="text-sm text-gray-500 mt-1">Total RFQs</p>
              <div className="mt-4 flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-green-600 font-medium">{stats.newRFQs}</span>
                <span className="text-gray-500 ml-1">new requests</span>
              </div>
            </div>

            {/* Products Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {stats.activeProducts} active
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
              <p className="text-sm text-gray-500 mt-1">Total Products</p>
              <div className="mt-4 flex items-center text-sm">
                <div className="w-8 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${stats.totalProducts > 0 ? (stats.activeProducts / stats.totalProducts) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-xs">
                  {stats.totalProducts > 0 ? Math.round((stats.activeProducts / stats.totalProducts) * 100) : 0}% active
                </span>
              </div>
            </div>

            {/* Blog Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {stats.publishedPosts} published
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalBlogPosts}</h3>
              <p className="text-sm text-gray-500 mt-1">Blog Posts</p>
              <div className="mt-4 flex items-center text-sm">
                <div className="w-8 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: `${stats.totalBlogPosts > 0 ? (stats.publishedPosts / stats.totalBlogPosts) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-xs">
                  {stats.totalBlogPosts > 0 ? Math.round((stats.publishedPosts / stats.totalBlogPosts) * 100) : 0}% published
                </span>
              </div>
            </div>

            {/* FAQ Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {stats.activeFAQs} active
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalFAQs}</h3>
              <p className="text-sm text-gray-500 mt-1">FAQ Items</p>
              <div className="mt-4 flex items-center text-sm">
                <div className="w-8 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: `${stats.totalFAQs > 0 ? (stats.activeFAQs / stats.totalFAQs) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-xs">
                  {stats.totalFAQs > 0 ? Math.round((stats.activeFAQs / stats.totalFAQs) * 100) : 0}% active
                </span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* RFQ Overview Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">RFQ Overview</h3>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">RFQ trend chart will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Product Categories Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Product distribution chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/rfqs">
                <Button className="w-full justify-start h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Manage RFQs
                </Button>
              </Link>
              <Link href="/admin/products/new">
                <Button className="w-full justify-start h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Add Product
                </Button>
              </Link>
              <Link href="/admin/blog/new">
                <Button className="w-full justify-start h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Write Blog
                </Button>
              </Link>
              <Link href="/admin/faq/new">
                <Button className="w-full justify-start h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add FAQ
                </Button>
              </Link>
            </div>
          </div>
    </AdminShell>
  )
}
