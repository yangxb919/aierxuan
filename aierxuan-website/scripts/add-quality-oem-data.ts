/**
 * Add Quality Tests and OEM Services Data
 * 为已上传的 Xiaoxuan 系列产品添加 Quality Tests 和 OEM Services 数据
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

// 默认 Quality Tests 数据
const defaultQualityTests = [
  {
    title: 'Hinge Durability',
    value: '20,000+',
    unit: 'Cycles',
    icon: 'arrow',
    status: 'passed'
  },
  {
    title: 'Drop Test',
    value: '70',
    unit: 'Centimeters',
    icon: 'shield',
    status: 'passed'
  },
  {
    title: 'Thermal Stress',
    value: '72',
    unit: 'Hours Run-in',
    icon: 'thermometer',
    status: 'passed'
  }
]

// 默认 OEM Services 数据
const defaultOemServices = [
  {
    title: 'Laser Engraving',
    description: 'Add your logo to the chassis with precision.',
    icon: 'settings'
  },
  {
    title: 'Boot Logo',
    description: 'Custom BIOS splash screen on startup.',
    icon: 'monitor'
  },
  {
    title: 'Custom Packaging',
    description: 'Retail-ready boxes designed for your market.',
    icon: 'box'
  }
]

async function addQualityOemData() {
  console.log('开始为 Xiaoxuan 系列产品添加 Quality Tests 和 OEM Services 数据...\n')

  // 获取所有 business-laptops 分类的产品
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, slug, category')
    .eq('category', 'business-laptops')

  if (productsError || !products || products.length === 0) {
    console.error('❌ 获取产品失败:', productsError)
    return
  }

  console.log(`找到 ${products.length} 个商务本产品\n`)

  let successCount = 0
  let failCount = 0

  // 更新每个产品的翻译数据
  for (const product of products) {
    try {
      // 获取产品的英文翻译
      const { data: translations, error: translationsError } = await supabase
        .from('product_translations')
        .select('*')
        .eq('product_id', product.id)
        .eq('locale', 'en')
        .single()

      if (translationsError || !translations) {
        console.error(`❌ 获取 ${product.slug} 的翻译失败:`, translationsError)
        failCount++
        continue
      }

      // 检查是否已有数据
      const hasQualityTests = Array.isArray(translations.quality_tests) && translations.quality_tests.length > 0
      const hasOemServices = Array.isArray(translations.oem_services) && translations.oem_services.length > 0

      if (hasQualityTests && hasOemServices) {
        console.log(`⏭️  ${product.slug} - 已有完整数据,跳过`)
        successCount++
        continue
      }

      // 更新翻译数据
      const { error: updateError } = await supabase
        .from('product_translations')
        .update({
          quality_tests: hasQualityTests ? translations.quality_tests : defaultQualityTests,
          oem_services: hasOemServices ? translations.oem_services : defaultOemServices
        })
        .eq('id', translations.id)

      if (updateError) {
        console.error(`❌ 更新 ${product.slug} 失败:`, updateError)
        failCount++
        continue
      }

      console.log(`✅ ${product.slug} - 成功添加数据`)
      successCount++

    } catch (err) {
      console.error(`❌ 处理 ${product.slug} 时出错:`, err)
      failCount++
    }
  }

  console.log('\n========================================')
  console.log('完成!')
  console.log(`✅ 成功: ${successCount}`)
  console.log(`❌ 失败: ${failCount}`)
  console.log('========================================\n')
}

addQualityOemData().catch(console.error)
