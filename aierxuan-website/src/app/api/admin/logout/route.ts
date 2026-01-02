import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { hashSessionToken } from '@/lib/auth-security'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No active session found' },
        { status: 401 }
      )
    }

    const supabase = createSupabaseAdminClient()

    // Tokens are stored hashed in the DB
    const hashedToken = hashSessionToken(sessionToken)

    // Revoke the session
    const { data: revokeData, error: revokeError } = await supabase
      .from('admin_sessions')
      .update({
        revoked_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('session_token', hashedToken)
      .is('revoked_at', null) // Only revoke if not already revoked
      .select()

    if (revokeError) {
      console.error('Session revocation error:', revokeError)
      // Continue with logout even if database update fails
    } else {
      console.log('Session revoked successfully:', revokeData)
    }

    // Clear the cookie
    cookieStore.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      expires: new Date(0), // Ensure immediate expiration
      path: '/' // Must match the path used when setting the cookie
    })

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
