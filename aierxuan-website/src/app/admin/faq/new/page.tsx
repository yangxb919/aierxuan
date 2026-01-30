import { requireAdminAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { Button } from '@/components/ui'
import FAQForm from '@/components/admin/FAQForm'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminFAQNewPage() {
  // Require authentication
  const user = await requireAdminAuth()
  
  return (
    <AdminShell
      user={user}
      title="Create New FAQ"
      subtitle="Add a new frequently asked question in multiple languages"
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
        <FAQForm mode="create" />
      </div>
    </AdminShell>
  )
}
