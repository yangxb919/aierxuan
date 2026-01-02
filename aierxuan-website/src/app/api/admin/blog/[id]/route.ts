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

interface UpdateBlogRequest {
  slug: string
  status: string
  published_at: string | null
  cover_image: string | null
  translations: BlogTranslation[]
}

const VALID_STATUSES = ['draft', 'published', 'archived']

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await getCurrentAdminUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const body: UpdateBlogRequest = await request.json()
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
    
    // Check if slug is taken by another post
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', finalSlug)
      .neq('id', id)
      .single()
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Update blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .update({
        slug: finalSlug,
        status,
        published_at: status === 'published' ? (published_at || new Date().toISOString()) : null,
        cover_image,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (postError) {
      console.error('Error updating blog post:', postError)
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      )
    }
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // Delete existing translations
    await supabase
      .from('blog_post_translations')
      .delete()
      .eq('post_id', id)

    // Create new translations
    const translationsToInsert = translations
      .filter(t => t.title || t.body) // Only insert translations with content
      .map(t => ({
        post_id: id,
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
        return NextResponse.json(
          { error: 'Failed to update translations' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json({
      success: true,
      post
    })
    
  } catch (error) {
    console.error('Blog update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await getCurrentAdminUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Only admins can delete
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only admins can delete blog posts' },
        { status: 403 }
      )
    }
    
    const { id } = await params
    const supabase = createSupabaseAdminClient()
    
    // Delete blog post (translations will be deleted automatically due to CASCADE)
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting blog post:', error)
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true
    })
    
  } catch (error) {
    console.error('Blog deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
