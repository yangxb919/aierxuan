/**
 * Verify Products Script
 * 验证产品是否成功上传到数据库
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

async function verifyProducts() {
  console.log('开始验证产品...\n')

  try {
    // 查询所有草稿状态的产品
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        id,
        slug,
        category,
        status,
        moq,
        price,
        created_at
      `)
      .eq('status', 'draft')
      .order('created_at', { ascending: false })

    if (productsError) {
      console.error('查询产品失败:', productsError.message)
      return
    }

    if (!products || products.length === 0) {
      console.log('❌ 没有找到草稿状态的产品')
      return
    }

    console.log(`✅ 找到 ${products.length} 个草稿产品:\n`)

    for (const product of products) {
      console.log(`产品 ID: ${product.id}`)
      console.log(`  Slug: ${product.slug}`)
      console.log(`  分类: ${product.category}`)
      console.log(`  状态: ${product.status}`)
      console.log(`  MOQ: ${product.moq}`)
      console.log(`  价格: ${product.price || '未设置'}`)
      console.log(`  创建时间: ${new Date(product.created_at).toLocaleString('zh-CN')}`)

      // 查询该产品的翻译
      const { data: translations, error: transError } = await supabase
        .from('product_translations')
        .select('locale, title, short_desc')
        .eq('product_id', product.id)

      if (transError) {
        console.log(`  ⚠️  翻译查询失败: ${transError.message}`)
      } else if (translations && translations.length > 0) {
        console.log(`  翻译 (${translations.length}):`)
        translations.forEach(t => {
          console.log(`    - ${t.locale}: ${t.title}`)
          console.log(`      ${t.short_desc?.substring(0, 80)}...`)
        })
      } else {
        console.log(`  ⚠️  没有找到翻译`)
      }

      console.log('') // 空行
    }

    console.log('\n=== 验证完成 ===')
    console.log(`总计找到 ${products.length} 个草稿产品`)

  } catch (error: any) {
    console.error('验证失败:', error.message)
  }
}

// 运行验证
verifyProducts().catch(console.error)
