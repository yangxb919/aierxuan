import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { getCurrentAdminUser } from '@/lib/admin-auth'

interface FAQTranslation {
  locale: string
  question: string
  answer: string
}

interface UpdateFAQRequest {
  category: string
  sort_order: number
  is_active: boolean
  translations: FAQTranslation[]
}

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
    const body: UpdateFAQRequest = await request.json()
    const { category, sort_order, is_active, translations } = body
    
    // Validate input
    if (!category || !translations || translations.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate English translation exists
    const enTranslation = translations.find(t => t.locale === 'en')
    if (!enTranslation || !enTranslation.question || !enTranslation.answer) {
      return NextResponse.json(
        { error: 'English translation with question and answer is required' },
        { status: 400 }
      )
    }
    
    const supabase = createSupabaseAdminClient()
    
    // Update FAQ
    const { data: faq, error: faqError } = await supabase
      .from('faq')
      .update({
        category,
        sort_order: sort_order || 0,
        is_active: is_active !== undefined ? is_active : true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (faqError) {
      console.error('Error updating FAQ:', faqError)
      return NextResponse.json(
        { error: 'Failed to update FAQ' },
        { status: 500 }
      )
    }
    
    if (!faq) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      )
    }
    
    // Delete existing translations
    await supabase
      .from('faq_translations')
      .delete()
      .eq('faq_id', id)
    
    // Create new translations
    const translationsToInsert = translations
      .filter(t => t.question || t.answer) // Only insert translations with content
      .map(t => ({
        faq_id: id,
        locale: t.locale,
        question: t.question,
        answer: t.answer
      }))
    
    if (translationsToInsert.length > 0) {
      const { error: translationsError } = await supabase
        .from('faq_translations')
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
      faq
    })
    
  } catch (error) {
    console.error('FAQ update error:', error)
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
        { error: 'Forbidden: Only admins can delete FAQs' },
        { status: 403 }
      )
    }
    
    const { id } = await params
    const supabase = createSupabaseAdminClient()
    
    // Delete FAQ (translations will be deleted automatically due to CASCADE)
    const { error } = await supabase
      .from('faq')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting FAQ:', error)
      return NextResponse.json(
        { error: 'Failed to delete FAQ' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true
    })
    
  } catch (error) {
    console.error('FAQ deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
