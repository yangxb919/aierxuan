import { requireAdminAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { Button } from '@/components/ui'
import ProductForm from '@/components/admin/ProductForm'

export default async function AdminProductNewPage() {
  // Require authentication
  const user = await requireAdminAuth()

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
            <Link href="/admin/rfqs" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              RFQ Management
            </Link>
            <Link href="/admin/products" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white">
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

        <div className="mt-auto p-4 text-gray-400 text-sm">
          <Link href="/" className="flex items-center hover:text-white">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-5 4l-5 5m0 0l-5-5m5 5V3" />
            </svg>
            Back to Website
          </Link>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Create New Product</h1>
              <p className="text-sm text-gray-500">Add new product, configure categories, images and multilingual content</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/products">
                <Button variant="outline" size="sm">Back to Products</Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <ProductForm mode="create" />
          </div>
        </main>
      </div>
    </div>
  )
}
