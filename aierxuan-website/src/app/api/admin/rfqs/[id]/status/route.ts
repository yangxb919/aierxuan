import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { getCurrentAdminUser } from '@/lib/admin-auth'

const VALID_STATUSES = ['new', 'contacted', 'quoted', 'closed', 'spam']

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
    const { status } = await request.json()
    
    // Validate status
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + VALID_STATUSES.join(', ') },
        { status: 400 }
      )
    }
    
    const supabase = createSupabaseAdminClient()
    
    // Update RFQ status
    const { data, error } = await supabase
      .from('rfqs')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating RFQ status:', error)
      return NextResponse.json(
        { error: 'Failed to update RFQ status' },
        { status: 500 }
      )
    }
    
    if (!data) {
      return NextResponse.json(
        { error: 'RFQ not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      rfq: data
    })
    
  } catch (error) {
    console.error('RFQ status update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
