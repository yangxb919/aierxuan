import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import BlogForm from '@/components/admin/BlogForm'
import AdminShell from '@/components/admin/AdminShell'
import { notFound } from 'next/navigation'

interface BlogPost {
  id: string
  slug: string
  status: string | null
  published_at: string | null
  cover_image: string | null
  created_at: string | null
  updated_at: string | null
  translations: {
    locale: string
    title: string
    excerpt: string | null
    body_md: string
    seo_desc: string | null
  }[]
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const supabase = createSupabaseAdminClient()
  
  const { data: post, error: postError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  
  if (postError || !post) {
    return null
  }
  
  const { data: translations, error: translationsError } = await supabase
    .from('blog_post_translations')
    .select('*')
    .eq('post_id', id)
  
  if (translationsError) {
    console.error('Error fetching translations:', translationsError)
    return null
  }
  
  return {
    ...post,
    translations: translations || []
  }
}

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const { id } = await params
  const post = await getBlogPost(id)
  
  if (!post) {
    notFound()
  }
  
  // Prepare form data - convert database field names to form field names
  const formData = {
    slug: post.slug,
    status: post.status || 'draft',
    published_at: post.published_at,
    cover_image: post.cover_image,
    translations: post.translations.map(t => ({
      locale: t.locale,
      title: t.title,
      excerpt: t.excerpt || '',
      body: t.body_md,
      meta_description: t.seo_desc || ''
    }))
  }
  
  return (
    <AdminShell
      user={user}
      title="Edit Blog Post"
      subtitle="Update blog post content and settings"
      showSearch={false}
      showNotifications={false}
      headerActions={
        <>
          <Link href={`/blog/${post.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              View Post →
            </Button>
          </Link>
          <Link href="/admin/blog">
            <Button variant="outline" size="sm">
              ← Back to Blog List
            </Button>
          </Link>
        </>
      }
    >
      <div className="max-w-7xl mx-auto">
        <BlogForm mode="edit" postId={id} initialData={formData} />
      </div>
    </AdminShell>
  )
}
