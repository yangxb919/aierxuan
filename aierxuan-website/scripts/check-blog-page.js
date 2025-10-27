#!/usr/bin/env node

/**
 * Script to check Blog page for errors
 */

async function checkBlogPage() {
  console.log('🔍 Checking Blog page for errors...\n')
  
  const baseUrl = 'http://localhost:3000'
  
  try {
    console.log('📡 Fetching Blog page...')
    const response = await fetch(`${baseUrl}/blog`)
    
    if (!response.ok) {
      console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`)
      return
    }
    
    const html = await response.text()
    
    // Check for errors
    const hasRuntimeError = html.includes('Runtime TypeError') || html.includes('Runtime Error')
    const hasError = html.includes('Error:') || html.includes('error')
    const hasUndefined = html.includes('Cannot read properties of undefined')
    
    console.log('\n📊 Analysis Results:')
    console.log('='.repeat(50))
    console.log(`Runtime TypeError: ${hasRuntimeError ? '❌ FOUND' : '✅ NOT FOUND'}`)
    console.log(`Generic Error: ${hasError ? '⚠️  FOUND' : '✅ NOT FOUND'}`)
    console.log(`Undefined Error: ${hasUndefined ? '❌ FOUND' : '✅ NOT FOUND'}`)
    
    // Check for specific content
    const hasTitle = html.includes('Blog') || html.includes('News')
    const hasContent = html.includes('Blog &amp; News') || html.includes('Latest updates')
    const hasCategories = html.includes('All Categories')
    
    console.log('\n📄 Content Check:')
    console.log('='.repeat(50))
    console.log(`Title: ${hasTitle ? '✅ FOUND' : '❌ NOT FOUND'}`)
    console.log(`Hero Content: ${hasContent ? '✅ FOUND' : '❌ NOT FOUND'}`)
    console.log(`Categories: ${hasCategories ? '✅ FOUND' : '❌ NOT FOUND'}`)
    
    // Extract error details if found
    if (hasRuntimeError || hasUndefined) {
      console.log('\n🐛 Error Details:')
      console.log('='.repeat(50))
      
      const errorMatch = html.match(/Runtime TypeError[^<]*/)
      if (errorMatch) {
        console.log(`Error Message: ${errorMatch[0]}`)
      }
      
      const locationMatch = html.match(/src\/[^<\s]+/)
      if (locationMatch) {
        console.log(`Location: ${locationMatch[0]}`)
      }
    }
    
    console.log('\n' + '='.repeat(50))
    
    if (!hasRuntimeError && !hasUndefined) {
      console.log('✅ Blog page is working correctly!')
    } else {
      console.log('❌ Blog page has errors that need to be fixed')
    }
    
  } catch (error) {
    console.error('\n❌ Failed to check Blog page:', error.message)
  }
}

// Run the check
checkBlogPage()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Check error:', error)
    process.exit(1)
  })
