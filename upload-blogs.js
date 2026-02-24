#!/usr/bin/env node

/**
 * 批量上传博客文章到 Supabase 数据库
 * 使用 service_role key 绕过认证限制
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Supabase 配置
const SUPABASE_URL = 'https://dudvgnkvukujhqatolqm.supabase.co'
const SUPABASE_KEY = 'REDACTED_SUPABASE_SERVICE_ROLE_V2'

// 创建 Supabase 客户端
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// 文章列表
const articles = [
  {
    slug: 'odm-vs-oem-cost-analysis-laptop-manufacturing',
    title: 'ODM vs OEM: Cost Analysis for Laptop Manufacturing',
    excerpt: 'Comprehensive cost analysis comparing ODM and OEM laptop manufacturing models. Learn about initial investment, per-unit costs, ROI calculations, and decision frameworks.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/odm-vs-oem-cost-analysis-laptop-manufacturing.md'
  },
  {
    slug: 'oem-laptop-manufacturers-top-suppliers-2025',
    title: 'OEM Laptop Manufacturers: Top Suppliers in 2025',
    excerpt: 'Discover the top OEM laptop manufacturers serving B2B buyers in 2025, including evaluation criteria, MOQ requirements, pricing structures, and how to start partnerships.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/oem-laptop-manufacturers-top-suppliers-2025.md'
  },
  {
    slug: 'custom-laptop-manufacturing-complete-guide-2025',
    title: 'Custom Laptop Manufacturing: Complete Guide for Brands 2025',
    excerpt: 'Complete guide to custom laptop manufacturing for brands. Learn about OEM processes, customization options, MOQ requirements, quality control, and how to launch your own laptop brand.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/custom-laptop-manufacturing-complete-guide-2025.md'
  },
  {
    slug: 'custom-gaming-laptop-manufacturing-oem-solutions',
    title: 'Custom Gaming Laptop Manufacturing: OEM Solutions',
    excerpt: 'Learn how to manufacture custom gaming laptops with OEM solutions. Covering GPU options, cooling systems, chassis design, and brand positioning for gaming laptop manufacturers.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/custom-gaming-laptop-manufacturing-oem-solutions.md'
  },
  {
    slug: 'business-laptop-customization-corporate-solutions',
    title: 'Business Laptop Customization: Corporate Solutions',
    excerpt: 'Discover how B2B buyers can customize business laptops for corporate needs. Covering security features, branding options, bulk deployment, and enterprise support solutions.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/business-laptop-customization-corporate-solutions.md'
  },
  {
    slug: 'laptop-specifications-guide-cpu-ram-storage-custom-orders',
    title: 'Laptop Specifications Guide: CPU, RAM, Storage for Custom Orders',
    excerpt: 'Complete guide to laptop specifications for custom OEM orders. Understanding CPU choices, RAM configurations, storage options, and how to spec laptops for different use cases.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/laptop-specifications-guide-cpu-ram-storage-custom-orders.md'
  },
  {
    slug: 'mini-pc-buyers-guide-2025-b2b-wholesale-custom',
    title: 'Mini PC Buyer\'s Guide 2025: B2B Wholesale & Custom Solutions',
    excerpt: 'Comprehensive Mini PC buyer\'s guide for B2B buyers. Covering types, specifications, use cases, wholesale pricing, customization options, and manufacturer selection.',
    filePath: '/Users/yangxiaobo/Desktop/AIERXUAN/articles/mini-pc-buyers-guide-2025-b2b-wholesale-custom.md'
  }
]

// 读取文章内容

async function uploadArticles() {
  console.log('开始上传文章...\n')

  for (const article of articles) {
    console.log(`处理文章: ${article.title}`)

    try {
      // 读取文件内容
      const content = fs.readFileSync(article.filePath, 'utf8')

      // 移除第一行的标题（# Title），因为我们会单独存储标题
      const bodyMd = content.replace(/^#\s+.+?\n/, '')

      // 检查是否已存在
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', article.slug)
        .single()

      if (existing) {
        console.log(`  ⚠️ 文章已存在，跳过\n`)
        continue
      }

      // 创建博客文章
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .insert({
          slug: article.slug,
          status: 'draft',
          published_at: null,
          cover_image: null,
          author_id: null, // 使用当前登录用户ID，或者留空
          featured: false
        })
        .select()
        .single()

      if (postError) {
        console.error(`  ❌ 创建文章失败: ${postError.message}\n`)
        continue
      }

      // 创建英文翻译
      const { error: transError } = await supabase
        .from('blog_post_translations')
        .insert({
          post_id: post.id,
          locale: 'en',
          title: article.title,
          excerpt: article.excerpt,
          body_md: bodyMd,
          seo_title: article.title,
          seo_desc: article.excerpt
        })

      if (transError) {
        console.error(`  ❌ 创建翻译失败: ${transError.message}`)
        // 回滚：删除文章
        await supabase.from('blog_posts').delete().eq('id', post.id)
        console.log(`  已回滚文章\n`)
        continue
      }

      console.log(`  ✅ 上传成功: ${post.id}\n`)

    } catch (error) {
      console.error(`  ❌ 处理失败: ${error.message}\n`)
    }
  }

  console.log('所有文章上传完成!')
}

// 执行上传
uploadArticles().catch(console.error)
