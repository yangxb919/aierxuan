import { createHash } from 'crypto'

// In-memory rate limiter (for single instance)
// For production with multiple instances, use Redis
const loginAttempts = new Map<string, { count: number; firstAttempt: number; lockedUntil?: number }>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000 // 30 minutes lockout

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; lockedUntil?: Date } {
  const now = Date.now()
  const record = loginAttempts.get(identifier)

  // Clean up old entries periodically
  if (loginAttempts.size > 10000) {
    for (const [key, value] of loginAttempts.entries()) {
      if (now - value.firstAttempt > WINDOW_MS && !value.lockedUntil) {
        loginAttempts.delete(key)
      }
    }
  }

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
  }

  // Check if locked
  if (record.lockedUntil && now < record.lockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      lockedUntil: new Date(record.lockedUntil)
    }
  }

  // Reset if window expired
  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(identifier)
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
  }

  const remaining = MAX_ATTEMPTS - record.count
  return { allowed: remaining > 0, remainingAttempts: Math.max(0, remaining) }
}

export function recordFailedAttempt(identifier: string): void {
  const now = Date.now()
  const record = loginAttempts.get(identifier)

  if (!record || now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now })
    return
  }

  record.count++

  // Lock account after max attempts
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS
  }
}

export function clearFailedAttempts(identifier: string): void {
  loginAttempts.delete(identifier)
}

// Hash session token for storage (don't store plaintext)
export function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

// Generate rate limit identifier from IP + email
export function getRateLimitKey(ip: string, email: string): string {
  return `${ip}:${email.toLowerCase()}`
}
