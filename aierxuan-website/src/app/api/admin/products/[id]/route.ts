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
  quality_tests?: any[]
  oem_services?: any[]
  faqs?: any[]
  durability_images?: string[]
  oem_images?: string[]
  features?: Record<string, any> | null
}

interface UpdateProductRequest {
  slug: string
  category: string
  status: string
  featured: boolean
  sort_order: number
  moq?: number
  price?: number
  datasheet_url?: string
  images: string[]
  translations: ProductTranslation[]
}

const VALID_STATUSES = ['active', 'inactive', 'discontinued', 'draft']

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
    const body: UpdateProductRequest = await request.json()
    const { slug, category, status, featured, sort_order, moq, price, datasheet_url, images, translations } = body
    
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
    
    // Check if slug is taken by another product
    const { data: existingProduct } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .single()
    
    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Update product
    const { data: product, error: productError } = await supabase
      .from('products')
      .update({
        slug,
        category,
        status,
        featured: featured || false,
        sort_order: sort_order || 0,
        moq: moq || null,
        price: price || null,
        datasheet_url: datasheet_url || null,
        images: images || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (productError) {
      console.error('Error updating product:', productError)
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Delete existing translations
    await supabase
      .from('product_translations')
      .delete()
      .eq('product_id', id)
    
    // Create new translations
    const translationsToInsert = translations
      .filter(t => t.title || t.long_desc) // Only insert translations with content
      .map(t => {
        // Map form fields to database column names (production schema uses locale/title/short_desc/long_desc)
        const translation: any = {
          product_id: id,
          locale: t.locale,
          title: t.title,
          short_desc: t.short_desc || '',
          long_desc: t.long_desc,
          key_specs: t.key_specs || {},
          seo_title: t.seo_title || '',
          seo_desc: t.seo_desc || '',
          quality_tests: t.quality_tests || [],
          oem_services: t.oem_services || [],
          faqs: t.faqs || []
        }

        // Remove undefined fields to avoid database errors
        Object.keys(translation).forEach(key => {
          if (translation[key] === undefined) {
            delete translation[key]
          }
        })

        return translation
      })
    
    if (translationsToInsert.length > 0) {
      const { error: translationsError } = await supabase
        .from('product_translations')
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
      product
    })
    
  } catch (error) {
    console.error('Product update error:', error)
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
        { error: 'Forbidden: Only admins can delete products' },
        { status: 403 }
      )
    }
    
    const { id } = await params
    const supabase = createSupabaseAdminClient()
    
    // Delete product (translations will be deleted automatically due to CASCADE)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true
    })
    
  } catch (error) {
    console.error('Product deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
