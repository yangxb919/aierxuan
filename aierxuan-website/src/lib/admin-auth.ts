import { createSupabaseAdminClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { AdminUser } from '@/types'
import { hashSessionToken } from '@/lib/auth-security'

export interface AdminAuthUser {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
  isActive: boolean
  sessionId: string
}

interface ValidateSessionResult {
  admin_user_id: string
  email: string
  role: string
  first_name: string | null
  last_name: string | null
  is_active: boolean
  session_id: string
}

/**
 * Get current admin user from session
 * Returns null if not authenticated
 */
export async function getCurrentAdminUser(): Promise<AdminAuthUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = (await cookieStore).get('admin_session')?.value

    if (!sessionToken) {
      return null
    }

    const supabase = createSupabaseAdminClient()

    // Hash the token before validating against database
    const hashedToken = hashSessionToken(sessionToken)

    // Validate session and get user info
    const { data: sessionData, error: sessionError } = await (supabase
      .rpc as any)('validate_admin_session', { token: hashedToken }) as { data: ValidateSessionResult[] | null, error: any }

    if (sessionError || !sessionData || sessionData.length === 0) {
      // Clear invalid session cookie
      (await cookieStore).set('admin_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      })
      return null
    }

    const user = sessionData[0]

    return {
      id: user.admin_user_id,
      email: user.email,
      role: user.role,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      isActive: user.is_active,
      sessionId: user.session_id
    }

  } catch (error) {
    console.error('Get current admin user error:', error)
    return null
  }
}

/**
 * Require admin authentication
 * Redirects to login page if not authenticated
 */
export async function requireAdminAuth(): Promise<AdminAuthUser> {
  const user = await getCurrentAdminUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  return user
}

/**
 * Check if user has required role
 */
export function hasRole(user: AdminAuthUser, requiredRole: string | string[]): boolean {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role)
  }
  return user.role === requiredRole
}

/**
 * Require specific role
 * Redirects to unauthorized page if user doesn't have required role
 */
export async function requireRole(requiredRole: string | string[]): Promise<AdminAuthUser> {
  const user = await requireAdminAuth()
  
  if (!hasRole(user, requiredRole)) {
    redirect('/admin/unauthorized')
  }

  return user
}

/**
 * Check if user is admin
 */
export function isAdmin(user: AdminAuthUser): boolean {
  return user.role === 'admin'
}

/**
 * Check if user is editor or admin
 */
export function canEdit(user: AdminAuthUser): boolean {
  return user.role === 'admin' || user.role === 'editor'
}

/**
 * Logout current user by revoking session
 */
export async function logoutAdminUser(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionToken = (await cookieStore).get('admin_session')?.value

    if (!sessionToken) {
      return true // Already logged out
    }

    const supabase = createSupabaseAdminClient()

    // Hash the token before querying database
    const hashedToken = hashSessionToken(sessionToken)

    // Revoke the session
    const { error: updateError } = await supabase
      .from('admin_sessions')
      .update({
        revoked_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('session_token', hashedToken)
      .is('revoked_at', null)

    if (updateError) {
      console.error('Error revoking session:', updateError)
    }

    // Clear the cookie
    (await cookieStore).set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

    return true

  } catch (error) {
    console.error('Logout admin user error:', error)
    return false
  }
}

/**
 * Revoke all sessions for a user (useful for security)
 */
export async function revokeAllUserSessions(userId: string): Promise<boolean> {
  try {
    const supabase = createSupabaseAdminClient()

    const { error } = await (supabase
      .rpc as any)('revoke_all_admin_sessions', { user_id: userId }) as { data: any, error: any }

    return !error

  } catch (error) {
    console.error('Revoke all user sessions error:', error)
    return false
  }
}

/**
 * Clean up expired sessions (utility function)
 */
export async function cleanupExpiredSessions(): Promise<number> {
  try {
    const supabase = createSupabaseAdminClient()

    const { data, error } = await (supabase
      .rpc as any)('cleanup_expired_admin_sessions') as { data: number | null, error: any }

    if (error) {
      console.error('Cleanup expired sessions error:', error)
      return 0
    }

    return data || 0

  } catch (error) {
    console.error('Cleanup expired sessions error:', error)
    return 0
  }
}
