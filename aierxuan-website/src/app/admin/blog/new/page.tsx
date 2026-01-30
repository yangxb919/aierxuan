import { requireAdminAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { Button } from '@/components/ui'
import BlogForm from '@/components/admin/BlogForm'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminBlogNewPage() {
  // Require authentication
  const user = await requireAdminAuth()

  return (
    <AdminShell
      user={user}
      title="创建新博客文章"
      subtitle="撰写并发布新的博客文章，支持多语言和AI翻译"
      showSearch={false}
      showNotifications={false}
      headerActions={
        <Link href="/admin/blog">
          <Button variant="outline" size="sm">
            返回博客列表
          </Button>
        </Link>
      }
    >
      <div className="max-w-7xl mx-auto">
        <BlogForm mode="create" />
      </div>
    </AdminShell>
  )
}
