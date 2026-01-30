import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { getCurrentAdminUser } from '@/lib/admin-auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentAdminUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can delete RFQs
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only admins can delete RFQs' },
        { status: 403 }
      )
    }

    const { id } = await params
    const supabase = createSupabaseAdminClient()

    const { error } = await supabase.from('rfqs').delete().eq('id', id)

    if (error) {
      console.error('Error deleting RFQ:', error)
      return NextResponse.json({ error: 'Failed to delete RFQ' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('RFQ deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

