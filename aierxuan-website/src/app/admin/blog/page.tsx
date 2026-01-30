import { requireAdminAuth } from '@/lib/admin-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui'
import AdminShell from '@/components/admin/AdminShell'
import BlogListActions from '@/components/admin/BlogListActions'

interface BlogPost {
  id: string
  slug: string
  status: string
  published_at: string | null
  created_at: string
  updated_at: string
  translations: {
    locale: string
    title: string
  }[]
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createSupabaseAdminClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      slug,
      status,
      published_at,
      created_at,
      updated_at,
      translations:blog_post_translations (
        locale,
        title
      )
    `)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  
  return data.map(post => ({
    ...post,
    translations: (post as any).translations || []
  })) as BlogPost[]
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    case 'archived':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'published':
      return 'Published'
    case 'draft':
      return 'Draft'
    case 'archived':
      return 'Archived'
    default:
      return status
  }
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Not published'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

type SearchParams = Record<string, string | string[] | undefined>
type BlogStatusFilter = 'all' | 'published' | 'draft' | 'archived'

function parseBlogStatusFilter(value: unknown): BlogStatusFilter {
  if (value === 'published' || value === 'draft' || value === 'archived') return value
  return 'all'
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams
}) {
  // Require authentication
  const user = await requireAdminAuth()
  const allPosts = await getBlogPosts()

  const resolvedSearchParams = await Promise.resolve(searchParams)
  const statusParam = typeof resolvedSearchParams?.status === 'string' ? resolvedSearchParams.status : undefined
  const activeStatus = parseBlogStatusFilter(statusParam)
  const posts = allPosts.filter((p) => activeStatus === 'all' || p.status === activeStatus)

  const activePill = 'bg-purple-100 text-purple-700 hover:bg-purple-200'
  const inactivePill = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  return (
    <AdminShell
      user={user}
      title="Blog Management"
      subtitle="Create and manage blog posts in multiple languages"
      searchPlaceholder="Search blog posts..."
    >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allPosts.length}</h3>
              <p className="text-sm text-gray-500 mt-1">Total Posts</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allPosts.filter(p => p.status === 'published').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Published</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allPosts.filter(p => p.status === 'draft').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Drafts</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{allPosts.filter(p => p.status === 'archived').length}</h3>
              <p className="text-sm text-gray-500 mt-1">Archived</p>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filter by status:</span>
                <Link
                  href="/admin/blog"
                  scroll={false}
                  aria-current={activeStatus === 'all' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'all' ? activePill : inactivePill
                  }`}
                >
                  All ({allPosts.length})
                </Link>
                <Link
                  href="/admin/blog?status=published"
                  scroll={false}
                  aria-current={activeStatus === 'published' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'published' ? activePill : inactivePill
                  }`}
                >
                  Published ({allPosts.filter(p => p.status === 'published').length})
                </Link>
                <Link
                  href="/admin/blog?status=draft"
                  scroll={false}
                  aria-current={activeStatus === 'draft' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'draft' ? activePill : inactivePill
                  }`}
                >
                  Drafts ({allPosts.filter(p => p.status === 'draft').length})
                </Link>
                <Link
                  href="/admin/blog?status=archived"
                  scroll={false}
                  aria-current={activeStatus === 'archived' ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeStatus === 'archived' ? activePill : inactivePill
                  }`}
                >
                  Archived ({allPosts.filter(p => p.status === 'archived').length})
                </Link>
              </div>
              <Link href="/admin/blog/new">
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New Blog Post
                </Button>
              </Link>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              {allPosts.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
                  <Link href="/admin/blog/new">
                    <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Blog Post
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts match this filter</h3>
                  <p className="text-gray-500 mb-6">Try switching to “All” to see every post.</p>
                  <Link href="/admin/blog">
                    <Button variant="outline">View All Posts</Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const title = (post.translations.find(t => t.locale === 'en')?.title)
                  || post.translations[0]?.title
                  || post.slug
                  || 'Untitled'

                return (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(post.status)}`}>
                          {getStatusLabel(post.status)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <BlogListActions postId={post.id} slug={post.slug} />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {title}
                      </h3>

                      <div className="text-sm text-gray-500 mb-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {post.slug}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(post.published_at)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Updated {formatDate(post.updated_at)}</span>
                        <div className="flex items-center space-x-2">
                          {post.translations.length > 0 && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                              </svg>
                              {post.translations.length} {post.translations.length === 1 ? 'language' : 'languages'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <Link href={`/admin/blog/${post.id}/edit`} className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        Edit Post →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
    </AdminShell>
  )
}
