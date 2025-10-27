import fs from 'fs'
import path from 'path'
import process from 'process'
import { createClient } from '@supabase/supabase-js'

function loadEnv(filePath) {
  const abs = path.resolve(filePath)
  const content = fs.readFileSync(abs, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!m) continue
    let [, key, val] = m
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1)
    }
    process.env[key] = val
  }
}

async function main() {
  const scriptDir = path.dirname(new URL(import.meta.url).pathname)
  const envPath = path.resolve(scriptDir, '../.env.local')
  loadEnv(envPath)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
  }

  const supabase = createClient(url, serviceKey)
  const slug = 'dh61'

  // 图片URL数组，按照生成顺序排列
  const images = [
    '/uploads/products/dh61-front.jpg',    // 正面视图（白底）
    '/uploads/products/dh61-side.jpg',     // 侧面视图（白底）
    '/uploads/products/dh61-back.jpg',     // 背面视图（白底）
    '/uploads/products/dh61-scenario.jpg'   // 应用场景图
  ]

  console.log('Adding images to DH61 product...')
  console.log('Images to add:', images)

  // 更新产品图片
  const { data: product, error: updateError } = await supabase
    .from('products')
    .update({
      images: images,
      status: 'active',  // 激活产品状态
      featured: true,   // 设为推荐产品
    })
    .eq('slug', slug)
    .select()
    .single()

  if (updateError) {
    console.error('Update product error:', updateError)
    process.exit(1)
  }

  console.log('✅ DH61 product updated successfully!')
  console.log('✅ Added', images.length, 'product images')
  console.log('✅ Product status changed to: active')
  console.log('✅ Product set as featured')
  console.log('Product ID:', product.id)

  // 验证图片文件是否存在
  console.log('\n📁 Verifying image files...')
  const uploadsDir = '/Users/yangxiaobo/Desktop/AIERXUAN/public/uploads/products'

  images.forEach((imageUrl, index) => {
    const filename = imageUrl.split('/').pop()
    const filepath = path.join(uploadsDir, filename)
    const exists = fs.existsSync(filepath)
    const status = exists ? '✅' : '❌'
    console.log(`${status} ${index + 1}. ${filename} - ${exists ? 'Found' : 'Missing'}`)
  })

  console.log('\n🎉 AIERXUAN DH61 is now ready and published!')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})