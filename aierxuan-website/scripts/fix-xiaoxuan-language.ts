/**
 * Fix Xiaoxuan Products Language
 * 将小轩系列产品的语言从 zh-CN 改为 en
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

// 需要修复的产品 slugs
const productSlugs = [
  'air15-ultra-i7-6600u',
  'yaoxing-15s-n100',
  'air14',
  'air14-pro2025-i3-6100u',
  'du61-i9-11900h',
  'air15'
]

async function fixLanguage() {
  console.log('开始修复产品语言设置...\n')

  let successCount = 0
  let failCount = 0

  for (const slug of productSlugs) {
    console.log(`处理产品: ${slug}`)

    try {
      // 获取产品
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('id, slug')
        .eq('slug', slug)
        .single()

      if (productError || !product) {
        console.log(`  ❌ 未找到产品`)
        failCount++
        continue
      }

      // 获取中文翻译
      const { data: zhTranslation, error: zhError } = await supabase
        .from('product_translations')
        .select('*')
        .eq('product_id', product.id)
        .eq('locale', 'zh-CN')
        .single()

      if (zhError || !zhTranslation) {
        console.log(`  ❌ 未找到中文翻译`)
        failCount++
        continue
      }

      // 检查是否已有英文翻译
      const { data: enTranslation } = await supabase
        .from('product_translations')
        .select('id')
        .eq('product_id', product.id)
        .eq('locale', 'en')
        .single()

      if (enTranslation) {
        console.log(`  ⚠️  已存在英文翻译,先删除旧的`)
        await supabase
          .from('product_translations')
          .delete()
          .eq('id', enTranslation.id)
      }

      // 更新翻译语言为英文
      const { error: updateError } = await supabase
        .from('product_translations')
        .update({ locale: 'en' })
        .eq('id', zhTranslation.id)

      if (updateError) {
        console.error(`  ❌ 更新失败:`, updateError.message)
        failCount++
        continue
      }

      console.log(`  ✅ 成功更新为英文`)
      successCount++

    } catch (error: any) {
      console.error(`  ❌ 处理失败:`, error.message)
      failCount++
    }
  }

  console.log('\n\n=== 修复完成 ===')
  console.log(`成功: ${successCount}`)
  console.log(`失败: ${failCount}`)
  console.log(`总计: ${productSlugs.length}`)
}

// 运行修复
fixLanguage().catch(console.error)
