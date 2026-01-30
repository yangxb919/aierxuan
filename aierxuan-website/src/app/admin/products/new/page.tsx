import { requireAdminAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { Button } from '@/components/ui'
import ProductForm from '@/components/admin/ProductForm'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminProductNewPage() {
  // Require authentication
  const user = await requireAdminAuth()

  return (
    <AdminShell
      user={user}
      title="Create New Product"
      subtitle="Add new product, configure categories, images and multilingual content"
      showSearch={false}
      showNotifications={false}
      headerActions={
        <Link href="/admin/products">
          <Button variant="outline" size="sm">
            Back to Products
          </Button>
        </Link>
      }
    >
      <div className="max-w-7xl mx-auto">
        <ProductForm mode="create" />
      </div>
    </AdminShell>
  )
}
