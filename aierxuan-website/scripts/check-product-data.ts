/**
 * Check Product Data Script
 * 检查产品的 key_specs 数据格式
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// 加载环境变量
config({ path: resolve(__dirname, '../.env.local') })

// Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkProductData() {
  console.log('检查产品数据...\n')

  // 获取一个产品来检查
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      slug,
      status,
      product_translations (
        locale,
        title,
        key_specs
      )
    `)
    .eq('slug', 'air14')
    .single()

  if (error || !products) {
    console.error('❌ 获取产品失败:', error)
    return
  }

  console.log('产品信息:')
  console.log(`  Slug: ${products.slug}`)
  console.log(`  Status: ${products.status}`)
  console.log()

  const translations = (products as any).product_translations
  if (translations && translations.length > 0) {
    const translation = translations[0]
    console.log(`语言: ${translation.locale}`)
    console.log(`标题: ${translation.title}`)
    console.log()
    console.log('Key Specs 数据类型:', Array.isArray(translation.key_specs) ? 'Array' : 'Object')
    console.log('Key Specs 内容:')
    console.log(JSON.stringify(translation.key_specs, null, 2))
  }
}

checkProductData().catch(console.error)
