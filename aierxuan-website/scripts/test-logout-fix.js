#!/usr/bin/env node

const baseUrl = 'http://localhost:3000'

async function testLogoutFix() {
  console.log('🧪 Testing logout fix...\n')
  
  let sessionCookie = null
  
  // Step 1: Login
  console.log('1️⃣  Step 1: Login')
  try {
    const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@aierxuan.com',
        password: 'admin123'
      })
    })
    
    const loginData = await loginResponse.json()
    
    if (loginResponse.ok && loginData.success) {
      console.log('✅ Login successful!')
      
      // Extract session cookie from response headers
      const setCookieHeader = loginResponse.headers.get('set-cookie')
      if (setCookieHeader) {
        const match = setCookieHeader.match(/admin_session=([^;]+)/)
        if (match) {
          sessionCookie = `admin_session=${match[1]}`
          console.log('   Cookie extracted:', sessionCookie.substring(0, 50) + '...')
        }
      }
    } else {
      console.error('❌ Login failed:', loginData.error)
      return
    }
  } catch (error) {
    console.error('❌ Login error:', error.message)
    return
  }
  
  // Step 2: Verify session works
  console.log('\n2️⃣  Step 2: Verify session works')
  try {
    const meResponse = await fetch(`${baseUrl}/api/admin/me`, {
      headers: {
        'Cookie': sessionCookie || ''
      }
    })
    
    const meData = await meResponse.json()
    
    if (meResponse.ok && meData.success) {
      console.log('✅ Session is valid!')
      console.log('   User:', meData.user.email)
    } else {
      console.error('❌ Session validation failed:', meData.error)
      return
    }
  } catch (error) {
    console.error('❌ Session validation error:', error.message)
    return
  }
  
  // Step 3: Logout
  console.log('\n3️⃣  Step 3: Logout')
  try {
    const logoutResponse = await fetch(`${baseUrl}/api/admin/logout`, {
      method: 'POST',
      headers: {
        'Cookie': sessionCookie || ''
      }
    })
    
    const logoutData = await logoutResponse.json()
    
    if (logoutResponse.ok && logoutData.success) {
      console.log('✅ Logout API returned success')
      
      // Check if Set-Cookie header clears the cookie
      const setCookieHeader = logoutResponse.headers.get('set-cookie')
      if (setCookieHeader) {
        console.log('   Set-Cookie header:', setCookieHeader)
        if (setCookieHeader.includes('Max-Age=0') || setCookieHeader.includes('expires=')) {
          console.log('   ✅ Cookie is being cleared')
        } else {
          console.log('   ⚠️  Cookie might not be cleared properly')
        }
      } else {
        console.log('   ⚠️  No Set-Cookie header in response')
      }
    } else {
      console.error('❌ Logout failed:', logoutData.error)
      return
    }
  } catch (error) {
    console.error('❌ Logout error:', error.message)
    return
  }
  
  // Step 4: Verify session is invalid (critical test)
  console.log('\n4️⃣  Step 4: Verify session is invalid after logout')
  try {
    const verifyResponse = await fetch(`${baseUrl}/api/admin/me`, {
      headers: {
        'Cookie': sessionCookie || ''
      }
    })
    
    const verifyData = await verifyResponse.json()
    
    if (verifyResponse.status === 401) {
      console.log('✅ Session is correctly invalidated!')
      console.log('   Status: 401 Unauthorized')
      console.log('   Error:', verifyData.error)
    } else if (verifyResponse.ok && verifyData.success) {
      console.error('❌ SECURITY ISSUE: Session is still valid after logout!')
      console.error('   User:', verifyData.user.email)
      console.error('   This is a security vulnerability!')
    } else {
      console.log('⚠️  Unexpected response:', verifyResponse.status, verifyData)
    }
  } catch (error) {
    console.error('❌ Verification error:', error.message)
  }
  
  console.log('\n✨ Test complete!')
}

testLogoutFix().catch(console.error)

