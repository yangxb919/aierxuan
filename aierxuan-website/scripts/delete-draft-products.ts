/**
 * Delete Draft Products Script
 * 删除所有草稿状态的产品
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

async function deleteDraftProducts() {
  console.log('开始删除草稿产品...\n')

  try {
    // 查询所有草稿状态的产品
    const { data: draftProducts, error: queryError } = await supabase
      .from('products')
      .select(`
        id,
        slug,
        category,
        status,
        product_translations!inner (
          locale,
          title
        )
      `)
      .eq('status', 'draft')

    if (queryError) {
      console.error('❌ 查询草稿产品失败:', queryError.message)
      return
    }

    if (!draftProducts || draftProducts.length === 0) {
      console.log('✅ 没有找到草稿产品')
      return
    }

    console.log(`找到 ${draftProducts.length} 个草稿产品:\n`)

    // 显示即将删除的产品
    for (const product of draftProducts) {
      const translation = product.product_translations?.[0]
      console.log(`  - ${translation?.title || product.slug} (${product.id})`)
    }

    console.log('\n开始删除...\n')

    let successCount = 0
    let failCount = 0

    // 删除每个产品
    for (const product of draftProducts) {
      const translation = product.product_translations?.[0]
      const productName = translation?.title || product.slug

      try {
        // 删除产品 (翻译会因为 ON DELETE CASCADE 自动删除)
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', product.id)

        if (deleteError) {
          console.log(`  ❌ 删除失败: ${productName}`)
          console.error(`     错误: ${deleteError.message}`)
          failCount++
        } else {
          console.log(`  ✅ 已删除: ${productName}`)
          successCount++
        }
      } catch (error: any) {
        console.log(`  ❌ 删除失败: ${productName}`)
        console.error(`     错误: ${error.message}`)
        failCount++
      }
    }

    console.log('\n=== 删除完成 ===')
    console.log(`成功删除: ${successCount}`)
    console.log(`删除失败: ${failCount}`)
    console.log(`总计: ${draftProducts.length}`)

  } catch (error: any) {
    console.error('❌ 删除过程出错:', error.message)
  }
}

// 运行删除
deleteDraftProducts().catch(console.error)
