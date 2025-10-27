#!/usr/bin/env node

const http = require('http')

console.log('🧪 Testing RFQ Form Submission...\n')

// Test data
const rfqData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  phone: '+1234567890',
  product_interest: 'laptop-pro-15',
  message: 'I am interested in purchasing laptops for my company.',
  quantity: 10,
  country: 'United States'
}

const postData = JSON.stringify(rfqData)

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/rfq',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}

console.log('📤 Submitting RFQ form...')
console.log('   Data:', JSON.stringify(rfqData, null, 2))
console.log()

const req = http.request(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log('📥 Response received:')
    console.log('   Status:', res.statusCode, res.statusMessage)
    console.log()

    try {
      const response = JSON.parse(data)
      console.log('   Response body:', JSON.stringify(response, null, 2))
      console.log()

      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('✅ RFQ form submission successful!')
        console.log('   RFQ ID:', response.id || response.data?.id)
      } else {
        console.log('❌ RFQ form submission failed!')
        console.log('   Error:', response.error || response.message)
      }
    } catch (e) {
      console.log('   Raw response:', data)
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('✅ RFQ form submission successful!')
      } else {
        console.log('❌ RFQ form submission failed!')
      }
    }
  })
})

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message)
  console.log('\n💡 Make sure the development server is running:')
  console.log('   npm run dev')
})

req.write(postData)
req.end()

