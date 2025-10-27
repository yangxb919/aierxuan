import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import FAQForm from '@/components/admin/FAQForm'
import { notFound } from 'next/navigation'

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

async function getFAQ(id: string): Promise<FAQ | null> {
  const supabase = createSupabaseAdminClient()
  
  const { data: faq, error: faqError } = await supabase
    .from('faq')
    .select('*')
    .eq('id', id)
    .single()
  
  if (faqError || !faq) {
    return null
  }
  
  const { data: translations, error: translationsError } = await supabase
    .from('faq_translations')
    .select('*')
    .eq('faq_id', id)
  
  if (translationsError) {
    console.error('Error fetching translations:', translationsError)
    return null
  }
  
  return {
    ...faq,
    translations: translations || []
  }
}

export default async function AdminFAQEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const { id } = await params
  const faq = await getFAQ(id)
  
  if (!faq) {
    notFound()
  }
  
  // Prepare form data
  const formData = {
    category: faq.category,
    sort_order: faq.sort_order,
    is_active: faq.is_active,
    translations: faq.translations
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit FAQ</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update FAQ content and settings
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
        <FAQForm mode="edit" faqId={id} initialData={formData} />
      </div>
    </div>
  )
}
