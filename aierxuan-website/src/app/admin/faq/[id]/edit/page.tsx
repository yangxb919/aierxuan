import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import FAQForm from '@/components/admin/FAQForm'
import AdminShell from '@/components/admin/AdminShell'
import { notFound } from 'next/navigation'

interface FAQ {
  id: string
  category: string | null
  sort_order: number | null
  is_active: boolean | null
  created_at: string | null
  updated_at: string | null
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
    translations: (translations as any[]) || []
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
  
  // Prepare form data - convert language_code to locale for form
  const formData = {
    category: faq.category || '',
    sort_order: faq.sort_order ?? 0,
    is_active: faq.is_active ?? true,
    translations: faq.translations.map(t => ({
      locale: t.locale,
      question: t.question,
      answer: t.answer
    }))
  }
  
  return (
    <AdminShell
      user={user}
      title="Edit FAQ"
      subtitle="Update FAQ content and settings"
      showSearch={false}
      showNotifications={false}
      headerActions={
        <Link href="/admin/faq">
          <Button variant="outline" size="sm">
            ← Back to FAQ List
          </Button>
        </Link>
      }
    >
      <div className="max-w-7xl mx-auto">
        <FAQForm mode="edit" faqId={id} initialData={formData} />
      </div>
    </AdminShell>
  )
}
