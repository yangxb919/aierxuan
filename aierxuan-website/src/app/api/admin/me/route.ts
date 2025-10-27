import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
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

    // Validate session and get user info
    const { data: sessionData, error: sessionError } = await supabase
      .rpc('validate_admin_session', { token: sessionToken })

    if (sessionError || !sessionData || sessionData.length === 0) {
      // Session is invalid, clear the cookie
      (await cookies()).set('admin_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        expires: new Date(0),
        path: '/' // Must match the path used when setting the cookie
      })

      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      )
    }

    const user = sessionData[0]

    // Return user info (without sensitive data)
    const userResponse = {
      id: user.admin_user_id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      isActive: user.is_active,
      sessionId: user.session_id
    }

    return NextResponse.json({
      success: true,
      user: userResponse
    })

  } catch (error) {
    console.error('Get current user error:', error)
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
