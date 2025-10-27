import { requireAdminAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { Button } from '@/components/ui'
import FAQForm from '@/components/admin/FAQForm'

export default async function AdminFAQNewPage() {
  // Require authentication
  const user = await requireAdminAuth()
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New FAQ</h1>
              <p className="mt-1 text-sm text-gray-500">
                Add a new frequently asked question in multiple languages
              </p>
            </div>
            <Link href="/admin/faq">
              <Button variant="outline">
                ← Back to FAQ List
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FAQForm mode="create" />
      </div>
    </div>
  )
}
