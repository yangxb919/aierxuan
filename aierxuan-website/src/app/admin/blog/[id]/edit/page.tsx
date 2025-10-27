import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import BlogForm from '@/components/admin/BlogForm'
import { notFound } from 'next/navigation'

interface BlogPost {
  id: string
  slug: string
  status: string
  published_at: string | null
  cover_image: string | null
  created_at: string
  updated_at: string
  translations: {
    locale: string
    title: string
    excerpt: string
    body_md: string
    seo_desc: string
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
    status: post.status,
    published_at: post.published_at,
    cover_image: post.cover_image,
    translations: post.translations.map(t => ({
      locale: t.locale,
      title: t.title,
      excerpt: t.excerpt,
      body: t.body_md,  // Convert body_md to body
      meta_description: t.seo_desc  // Convert seo_desc to meta_description
    }))
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update blog post content and settings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/blog/${post.slug}`} target="_blank">
                <Button variant="outline">
                  View Post →
                </Button>
              </Link>
              <Link href="/admin/blog">
                <Button variant="outline">
                  ← Back to Blog List
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogForm mode="edit" postId={id} initialData={formData} />
      </div>
    </div>
  )
}
