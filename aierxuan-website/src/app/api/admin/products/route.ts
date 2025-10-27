import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { getCurrentAdminUser } from '@/lib/admin-auth'

interface ProductTranslation {
  locale: string
  title: string
  short_desc: string
  long_desc: string
  key_specs: Record<string, string>
  seo_title: string
  seo_desc: string
}

interface CreateProductRequest {
  slug: string
  category: string
  status: string
  featured: boolean
  sort_order: number
  images: string[]
  translations: ProductTranslation[]
}

const VALID_STATUSES = ['active', 'inactive', 'discontinued']

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
    
    const body: CreateProductRequest = await request.json()
    const { slug, category, status, featured, sort_order, images, translations } = body
    
    // Validate input
    if (!slug || !category || !status || !translations || translations.length === 0) {
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
    if (!enTranslation || !enTranslation.title || !enTranslation.long_desc) {
      return NextResponse.json(
        { error: 'English translation with title and description is required' },
        { status: 400 }
      )
    }
    
    const supabase = createSupabaseAdminClient()
    
    // Check if slug already exists
    const { data: existingProduct } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Create product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        slug,
        category,
        status,
        featured: featured || false,
        sort_order: sort_order || 0,
        images: images || []
      })
      .select()
      .single()
    
    if (productError) {
      console.error('Error creating product:', productError)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }
    
    // Create translations
    const translationsToInsert = translations
      .filter(t => t.title || t.long_desc) // Only insert translations with content
      .map(t => ({
        product_id: product.id,
        locale: t.locale,
        title: t.title,
        short_desc: t.short_desc || '',
        long_desc: t.long_desc,
        key_specs: t.key_specs || {},
        seo_title: t.seo_title || '',
        seo_desc: t.seo_desc || ''
      }))
    
    if (translationsToInsert.length > 0) {
      const { error: translationsError } = await supabase
        .from('product_translations')
        .insert(translationsToInsert)
      
      if (translationsError) {
        console.error('Error creating translations:', translationsError)
        // Rollback: delete the product
        await supabase.from('products').delete().eq('id', product.id)
        return NextResponse.json(
          { error: 'Failed to create translations' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json({
      success: true,
      product
    })
    
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
