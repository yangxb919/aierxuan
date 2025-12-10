/**
 * Verify Quality Tests and OEM Services Data
 * 验证产品的 Quality Tests 和 OEM Services 数据
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

async function verifyQualityOemData() {
  console.log('验证产品的 Quality Tests 和 OEM Services 数据...\n')

  // 获取一个产品作为示例
  const { data: product, error: productError } = await supabase
    .from('products')
    .select(`
      id,
      slug,
      product_translations (
        locale,
        title,
        quality_tests,
        oem_services
      )
    `)
    .eq('slug', 'air14')
    .single()

  if (productError || !product) {
    console.error('❌ 获取产品失败:', productError)
    return
  }

  console.log(`产品: ${product.slug}`)
  console.log('========================================\n')

  const translations = (product as any).product_translations
  if (translations && translations.length > 0) {
    const translation = translations[0]

    console.log(`语言: ${translation.locale}`)
    console.log(`标题: ${translation.title}\n`)

    console.log('Quality Tests:')
    console.log('-------------')
    if (Array.isArray(translation.quality_tests) && translation.quality_tests.length > 0) {
      translation.quality_tests.forEach((test: any, index: number) => {
        console.log(`  ${index + 1}. ${test.title}`)
        console.log(`     Value: ${test.value} ${test.unit || ''}`)
        console.log(`     Icon: ${test.icon || 'N/A'}`)
        console.log(`     Status: ${test.status || 'N/A'}`)
        console.log()
      })
    } else {
      console.log('  ❌ 没有 Quality Tests 数据\n')
    }

    console.log('OEM Services:')
    console.log('-------------')
    if (Array.isArray(translation.oem_services) && translation.oem_services.length > 0) {
      translation.oem_services.forEach((service: any, index: number) => {
        console.log(`  ${index + 1}. ${service.title}`)
        console.log(`     Description: ${service.description}`)
        console.log(`     Icon: ${service.icon || 'N/A'}`)
        console.log()
      })
    } else {
      console.log('  ❌ 没有 OEM Services 数据\n')
    }
  }

  console.log('========================================')
}

verifyQualityOemData().catch(console.error)
