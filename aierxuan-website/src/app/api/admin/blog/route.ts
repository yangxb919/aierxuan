import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { slugify } from '@/lib/utils'
import { getCurrentAdminUser } from '@/lib/admin-auth'

interface BlogTranslation {
  locale: string
  title: string
  excerpt: string
  body: string
  meta_description: string
}

interface CreateBlogRequest {
  slug: string
  status: string
  published_at: string | null
  cover_image: string | null
  translations: BlogTranslation[]
}

const VALID_STATUSES = ['draft', 'published', 'archived']

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentAdminUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body: CreateBlogRequest = await request.json()
    const { slug, status, published_at, cover_image, translations } = body
    
    // Validate input
    if (!slug || !status || !translations || translations.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate status
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + VALID_STATUSES.join(', ') },
        { status: 400 }
      )
    }
    
    // Validate English translation exists
    const enTranslation = translations.find(t => t.locale === 'en')
    if (!enTranslation || !enTranslation.title || !enTranslation.body) {
      return NextResponse.json(
        { error: 'English translation with title and body is required' },
        { status: 400 }
      )
    }
    
    // Normalize slug server-side to avoid invalid URL characters
    const finalSlug = slugify(slug || enTranslation.title)
    if (!finalSlug) {
      return NextResponse.json(
        { error: 'Invalid slug generated from title. Please edit the title or slug.' },
        { status: 400 }
      )
    }
    
    const supabase = createSupabaseAdminClient()
    
    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', finalSlug)
      .single()
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Create blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        slug: finalSlug,
        status,
        published_at: status === 'published' ? (published_at || new Date().toISOString()) : null,
        cover_image,
        author_id: user.id,
        featured: false
      })
      .select()
      .single()
    
    if (postError) {
      console.error('Error creating blog post:', postError)
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      )
    }
    
    // Create translations
    const translationsToInsert = translations
      .filter(t => t.title || t.body) // Only insert translations with content
      .map(t => ({
        post_id: post.id,
        locale: t.locale,
        title: t.title,
        excerpt: t.excerpt || '',
        body_md: t.body,
        seo_title: t.title || '',
        seo_desc: t.meta_description || ''
      }))
    
    if (translationsToInsert.length > 0) {
      const { error: translationsError } = await supabase
        .from('blog_post_translations')
        .insert(translationsToInsert)
      
      if (translationsError) {
        console.error('Error creating translations:', translationsError)
        // Rollback: delete the post
        await supabase.from('blog_posts').delete().eq('id', post.id)
        return NextResponse.json(
          { error: 'Failed to create translations' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json({
      success: true,
      post
    })
    
  } catch (error) {
    console.error('Blog creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
