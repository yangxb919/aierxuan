import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { getCurrentAdminUser } from '@/lib/admin-auth'

interface FAQTranslation {
  locale: string
  question: string
  answer: string
}

interface CreateFAQRequest {
  category: string
  sort_order: number
  is_active: boolean
  translations: FAQTranslation[]
}

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
    
    const body: CreateFAQRequest = await request.json()
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
    
    // Create FAQ
    const { data: faq, error: faqError } = await supabase
      .from('faq')
      .insert({
        category,
        sort_order: sort_order || 0,
        is_active: is_active !== undefined ? is_active : true
      })
      .select()
      .single()
    
    if (faqError) {
      console.error('Error creating FAQ:', faqError)
      return NextResponse.json(
        { error: 'Failed to create FAQ' },
        { status: 500 }
      )
    }
    
    // Create translations
    const translationsToInsert = translations
      .filter(t => t.question || t.answer) // Only insert translations with content
      .map(t => ({
        faq_id: faq.id,
        locale: t.locale,
        question: t.question,
        answer: t.answer
      }) as any)
    
    if (translationsToInsert.length > 0) {
      const { error: translationsError } = await supabase
        .from('faq_translations')
        .insert(translationsToInsert)
      
      if (translationsError) {
        console.error('Error creating translations:', translationsError)
        // Rollback: delete the FAQ
        await supabase.from('faq').delete().eq('id', faq.id)
        return NextResponse.json(
          { error: 'Failed to create translations' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json({
      success: true,
      faq
    })
    
  } catch (error) {
    console.error('FAQ creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
