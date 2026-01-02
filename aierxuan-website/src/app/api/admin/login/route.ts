import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import {
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
  hashSessionToken,
  getRateLimitKey
} from '@/lib/auth-security'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                    request.headers.get('x-real-ip') ||
                    '127.0.0.1'

    // Check rate limit
    const rateLimitKey = getRateLimitKey(clientIP, email)
    const rateLimit = checkRateLimit(rateLimitKey)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many login attempts. Please try again later.',
          lockedUntil: rateLimit.lockedUntil?.toISOString()
        },
        { status: 429 }
      )
    }

    const supabase = createSupabaseAdminClient()

    // Get admin user by email
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single()

    if (userError || !adminUser) {
      recordFailedAttempt(rateLimitKey)
      return NextResponse.json(
        { error: 'Invalid credentials', remainingAttempts: rateLimit.remainingAttempts - 1 },
        { status: 401 }
      )
    }

    // Verify password
    if (!adminUser.password_hash) {
      recordFailedAttempt(rateLimitKey)
      return NextResponse.json(
        { error: 'Invalid credentials', remainingAttempts: rateLimit.remainingAttempts - 1 },
        { status: 401 }
      )
    }
    const isValidPassword = await bcrypt.compare(password, adminUser.password_hash)
    if (!isValidPassword) {
      recordFailedAttempt(rateLimitKey)
      return NextResponse.json(
        { error: 'Invalid credentials', remainingAttempts: rateLimit.remainingAttempts - 1 },
        { status: 401 }
      )
    }

    // Clear failed attempts on successful login
    clearFailedAttempts(rateLimitKey)

    // Generate session token
    const sessionToken = randomBytes(32).toString('hex')
    const hashedToken = hashSessionToken(sessionToken) // Hash for storage
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    // Get User Agent
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    // Create session record with hashed token
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .insert({
        admin_user_id: adminUser.id,
        session_token: hashedToken, // Store hashed token
        expires_at: expiresAt.toISOString(),
        ip_address: clientIP,
        user_agent: userAgent
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Session creation error:', sessionError)
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    })

    // Return user info (without sensitive data)
    const userResponse = {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      firstName: adminUser.first_name,
      lastName: adminUser.last_name,
      lastLoginAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      sessionId: session.id
    })

  } catch (error) {
    console.error('Login error:', error)
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
