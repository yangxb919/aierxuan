'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseClient } from '@/lib/supabase'
import { getTranslation } from '@/lib/utils'
import type { BlogPost, BlogPostTranslation, LanguageCode } from '@/types'

interface BlogPostWithTranslations extends BlogPost {
    translations: BlogPostTranslation[]
}

interface BlogListClientProps {
    initialPosts: BlogPostWithTranslations[]
    initialTotal: number
    lang: LanguageCode
    dictionary: any // Using any for now, should be typed
}

const POSTS_PER_PAGE = 9

export function BlogListClient({ initialPosts, initialTotal, lang, dictionary }: BlogListClientProps) {
    const [posts, setPosts] = useState<BlogPostWithTranslations[]>(initialPosts)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(initialTotal)
    const [hasMore, setHasMore] = useState(initialPosts.length < initialTotal)

    const supabase = createSupabaseClient()
    const texts = dictionary

    // Reset state when category changes
    useEffect(() => {
        if (selectedCategory !== 'all') {
            fetchPosts(1, true)
        } else {
            // If switching back to 'all', we might want to reset to initialPosts if we haven't loaded more?
            // For simplicity, let's just fetch again or use initial if page is 1.
            // Actually, to keep it consistent, let's just fetch.
            fetchPosts(1, true)
        }
    }, [selectedCategory])

    async function fetchPosts(page = 1, reset = true) {
        try {
            setLoading(true)
            setError(null)

            let query = supabase
                .from('blog_posts')
                .select(`
          *,
          translations:blog_post_translations(*)
        `, { count: 'exact' })
                .eq('status', 'published')
                .order('published_at', { ascending: false })

            // Temporary fix: Comment out category filter until category column is added to database
            // if (selectedCategory !== 'all') {
            //   query = query.eq('category', selectedCategory)
            // }

            const from = (page - 1) * POSTS_PER_PAGE
            const to = from + POSTS_PER_PAGE - 1
            query = query.range(from, to)

            const { data, error: fetchError, count } = await query

            if (fetchError) {
                throw new Error(fetchError.message)
            }

            // Transform data to ensure translations array exists
            const transformedData = (data || []).map(post => ({
                ...post,
                translations: post.translations || []
            })) as BlogPostWithTranslations[]

            if (reset) {
                setPosts(transformedData)
                setCurrentPage(1)
            } else {
                setPosts(prev => [...prev, ...transformedData])
            }

            setTotalPosts(count || 0)
            setHasMore((data?.length || 0) === POSTS_PER_PAGE && (page * POSTS_PER_PAGE) < (count || 0))

        } catch (err) {
            console.error('Error fetching blog posts:', err)
            setError(texts.loadingError)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryChange = (category: string) => {
        if (category === selectedCategory) return
        setSelectedCategory(category)
    }

    const handleLoadMore = () => {
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
        fetchPosts(nextPage, false)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString(lang === 'zh-CN' ? 'zh-CN' : lang, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getPostTranslation = (post: BlogPostWithTranslations) => {
        if (!post.translations || post.translations.length === 0) {
            return null
        }
        return getTranslation(post, lang, 'locale')
    }

    const categories = [
        { key: 'all', label: texts.allCategories },
        { key: 'news', label: texts.news },
        { key: 'products', label: texts.products },
        { key: 'industry', label: texts.industry },
        { key: 'technology', label: texts.technology }
    ]

    return (
        <>
            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.key}
                                onClick={() => handleCategoryChange(category.key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading && posts.length === 0 ? (
                        <BlogPostsSkeleton />
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{texts.loadingError}</h3>
                            <button
                                onClick={() => fetchPosts(1, true)}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                {texts.tryAgain}
                            </button>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{texts.noArticles}</h3>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => {
                                    const translation = getPostTranslation(post)
                                    return (
                                        <BlogPostCard
                                            key={post.id}
                                            post={post}
                                            translation={translation}
                                            lang={lang}
                                            texts={texts}
                                            formatDate={formatDate}
                                        />
                                    )
                                })}
                            </div>

                            {/* Load More / Pagination */}
                            {hasMore && (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {texts.loading}
                                            </>
                                        ) : (
                                            texts.loadMore
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Results Count */}
                            <div className="text-center mt-8 text-sm text-gray-500">
                                {texts.showingResults
                                    .replace('{count}', posts.length.toString())
                                    .replace('{total}', totalPosts.toString())}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

// Blog Post Card Component
function BlogPostCard({
    post,
    translation,
    lang,
    texts,
    formatDate
}: {
    post: BlogPostWithTranslations
    translation: BlogPostTranslation | null | undefined
    lang: LanguageCode
    texts: any
    formatDate: (date: string) => string
}) {
    const title = translation?.title || `Blog Post ${post.id}`
    const excerpt = translation?.excerpt || ''

    return (
        <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
                {post.cover_image ? (
                    <Image
                        src={post.cover_image}
                        alt={title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time dateTime={post.published_at || post.created_at || ''}>
                        {texts.publishedOn} {formatDate(post.published_at || post.created_at || '')}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{texts.by} {texts.author}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {excerpt}
                </p>
                <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
                >
                    {texts.readMore}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </article>
    )
}

// Loading Skeleton Component
function BlogPostsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
