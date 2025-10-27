import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { notFound } from 'next/navigation'
import RFQStatusUpdater from '@/components/admin/RFQStatusUpdater'

interface RFQ {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  country: string | null
  product_interest: string | null
  quantity: number | null
  message: string | null
  status: string
  budget_range: string | null
  urgency: string | null
  industry: string | null
  priority: string | null
  created_at: string
  updated_at: string
}

async function getRFQ(id: string): Promise<RFQ | null> {
  const supabase = createSupabaseAdminClient()
  
  const { data, error } = await supabase
    .from('rfqs')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching RFQ:', error)
    return null
  }
  
  return data
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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

export default async function AdminRFQDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const { id } = await params
  const rfq = await getRFQ(id)
  
  if (!rfq) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RFQ Details</h1>
              <p className="mt-1 text-sm text-gray-500">
                Request for Quotation #{rfq.id.slice(0, 8)}
              </p>
            </div>
            <Link href="/admin/rfqs">
              <Button variant="outline">
                ← Back to RFQs
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                  <p className="mt-1 text-sm text-gray-900">{rfq.name}</p>
                </div>
                {rfq.company && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Company Name</label>
                    <p className="mt-1 text-sm text-gray-900">{rfq.company}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-sm text-gray-900">
                      <a href={`mailto:${rfq.email}`} className="text-blue-600 hover:text-blue-800">
                        {rfq.email}
                      </a>
                    </p>
                  </div>
                  {rfq.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">
                        <a href={`tel:${rfq.phone}`} className="text-blue-600 hover:text-blue-800">
                          {rfq.phone}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rfq.country && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Country</label>
                      <p className="mt-1 text-sm text-gray-900">{rfq.country}</p>
                    </div>
                  )}
                  {rfq.industry && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Industry</label>
                      <p className="mt-1 text-sm text-gray-900">{rfq.industry}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                {rfq.product_interest && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Product Interest</label>
                    <p className="mt-1 text-sm text-gray-900">{rfq.product_interest}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rfq.quantity && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Quantity</label>
                      <p className="mt-1 text-sm text-gray-900">{rfq.quantity}</p>
                    </div>
                  )}
                  {rfq.urgency && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Urgency</label>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{rfq.urgency}</p>
                    </div>
                  )}
                </div>
                {rfq.budget_range && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Budget Range</label>
                    <p className="mt-1 text-sm text-gray-900">{rfq.budget_range}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message */}
            {rfq.message && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Message</h2>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{rfq.message}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeColor(rfq.status)}`}>
                    {getStatusLabel(rfq.status)}
                  </span>
                </div>
                <RFQStatusUpdater rfqId={rfq.id} currentStatus={rfq.status} />
              </div>
            </div>
            
            {/* Metadata */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Metadata</h2>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(rfq.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(rfq.updated_at)}</p>
                </div>
                {rfq.priority && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Priority</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{rfq.priority}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
              </div>
              <div className="px-6 py-4 space-y-2">
                <a
                  href={`mailto:${rfq.email}?subject=Re: Your RFQ${rfq.company ? ` - ${rfq.company}` : ''}`}
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </a>
                {rfq.phone && (
                  <a href={`tel:${rfq.phone}`} className="block w-full">
                    <Button variant="outline" className="w-full">
                      Call Customer
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
