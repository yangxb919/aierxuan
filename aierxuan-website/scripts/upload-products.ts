/**
 * Product Upload Script
 * 批量上传产品到数据库(草稿状态)
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

interface ProductParams {
  series: string
  product_model: string
  shop_model: string
  slug: string
  params: string[]
}

// 解析产品参数为结构化数据
function parseProductParams(params: string[]) {
  const specs: Record<string, any> = {}
  const display: Record<string, string> = {}
  const hardware: Record<string, string> = {}
  const connectivity: Record<string, string> = {}
  const battery: Record<string, string> = {}
  const ports: Record<string, string> = {}

  let currentSection = ''

  for (let i = 0; i < params.length; i++) {
    const param = params[i].trim()

    // 跳过空行
    if (!param) continue

    // 检测章节
    if (param.includes('显示器')) {
      currentSection = 'display'
      continue
    } else if (param.includes('硬件信息')) {
      currentSection = 'hardware'
      continue
    } else if (param.includes('连接性')) {
      currentSection = 'connectivity'
      continue
    } else if (param.includes('电池')) {
      currentSection = 'battery'
      continue
    } else if (param.includes('接口')) {
      currentSection = 'ports'
      continue
    }

    // 解析键值对
    if (param.includes('：') || param.includes(':')) {
      const [key, ...valueParts] = param.split(/[：:]/)
      const value = valueParts.join(':').trim()

      if (key && value) {
        switch (currentSection) {
          case 'display':
            display[key.trim()] = value
            break
          case 'hardware':
            hardware[key.trim()] = value
            break
          case 'connectivity':
            connectivity[key.trim()] = value
            break
          case 'battery':
            battery[key.trim()] = value
            break
          case 'ports':
            ports[key.trim()] = value
            break
          default:
            specs[key.trim()] = value
        }
      }
    }
  }

  return {
    display,
    hardware,
    connectivity,
    battery,
    ports,
    general: specs
  }
}

// 从参数中提取产品信息
function extractProductInfo(product: ProductParams) {
  const specs = parseProductParams(product.params)

  // 提取尺寸
  const sizeMatch = product.params.find(p => p.includes('尺寸：'))
  const size = sizeMatch ? sizeMatch.split('：')[1]?.trim() : ''

  // 提取重量
  const weightMatch = product.params.find(p => p.includes('重量'))
  const weight = weightMatch ? weightMatch.split(/[：:]/)[1]?.trim() : ''

  // 提取显示器信息
  const displaySize = specs.display['尺寸'] || ''
  const resolution = specs.display['分辨率'] || ''
  const refreshRate = specs.display['刷新率'] || ''

  // 提取处理器信息
  const cpuModel = product.product_model.split('-')[0] || ''
  const gpuModel = product.product_model.split('-')[1] || ''

  // 提取跑分
  const scoreMatch = product.params.find(p => p.includes('鲁大师跑分分数'))
  const benchmarkScore = scoreMatch ? scoreMatch.split(/[：:]/)[1]?.trim() : ''

  // 提取操作系统
  const osMatch = product.params.find(p => p.includes('WIN'))
  const os = osMatch || 'WIN11'

  return {
    size,
    weight,
    displaySize,
    resolution,
    refreshRate,
    cpuModel,
    gpuModel,
    benchmarkScore,
    os,
    specs
  }
}

// 生成产品描述
function generateProductDescription(product: ProductParams, info: any) {
  const { cpuModel, gpuModel, displaySize, resolution, refreshRate } = info

  return `${product.series} ${product.shop_model}

产品型号: ${product.product_model}
系列: ${product.series}

核心配置:
- 处理器: ${cpuModel}
- 显卡: ${gpuModel}
- 显示屏: ${displaySize} ${resolution} ${refreshRate}

${product.params.join('\n')}
`
}

// 生成简短描述
function generateShortDescription(product: ProductParams, info: any) {
  const { cpuModel, gpuModel, displaySize, refreshRate } = info
  return `${product.series} - ${cpuModel}/${gpuModel} | ${displaySize} ${refreshRate}高刷屏 | 专业游戏本`
}

// 生成规格数据
function generateKeySpecs(product: ProductParams, info: any) {
  const { specs } = info

  return {
    processor: info.cpuModel,
    graphics: info.gpuModel,
    display: `${info.displaySize} ${info.resolution} ${info.refreshRate}`,
    memory: specs.general['内存'] || 'DDR4 2666MHz 最高支持32G',
    storage: specs.general['硬盘存储'] || 'M.2 NVMe SSD',
    os: info.os,
    weight: info.weight,
    size: info.size,
    benchmark: info.benchmarkScore,
    ...specs.hardware,
    ...specs.connectivity,
    ...specs.battery
  }
}

// 产品数据
const productsData: ProductParams[] = [
  {
    "series": "青龙系列",
    "product_model": "i7 8750H-1050",
    "shop_model": "魂圣X16 Y715/I7 8750H-1050",
    "slug": "qinglong-i7-8750h-1050",
    "params": [
      "产品型号 : i7 8750H-1050   店铺型号：魂圣X16 Y715/I7 8750H-1050",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: NVIDIA GeForce GTX1050 GDDR5 3G/4G",
      "独显功耗：75W",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "i7 8850H-P106",
    "shop_model": "魂圣X16 Y715/I7 8850H-P106",
    "slug": "qinglong-i7-8850h-p106",
    "params": [
      "产品型号 : i7 8850H-P106   店铺型号：魂圣X16 Y715/I7 8850H-P106",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: NVIDIA P106",
      "GPU显存: 6 GB GDDR5",
      "独显功耗：75W",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "i7 8850H-GTX1060",
    "shop_model": "I7 8850H-GTX1060",
    "slug": "qinglong-i7-8850h-gtx1060",
    "params": [
      "产品型号 : i7 8850H-GTX1060  店铺型号：I7 8850H-GTX1060",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: NVIDIA GeForce GTX1060",
      "GPU显存: 6 GB GDDR5",
      "独显功耗：75W",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "11900H-RTX3060",
    "shop_model": "凯王16Pro/i9 11900H-RTX3060",
    "slug": "qinglong-11900h-rtx3060",
    "params": [
      "产品型号 : 11900H-RTX3060   店铺型号：凯王16Pro/i9 11900H-RTX3060",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: GeForce RTX3060",
      "GPU显存: 6GB GDDR6",
      "独显功耗：75W",
      "鲁大师跑分分数: 1291199",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "i7 9750H-3050",
    "shop_model": "魂圣X16 Y735/I7 9750H-3050",
    "slug": "qinglong-i7-9750h-3050",
    "params": [
      "产品型号 : i7 9750H-3050   店铺型号：魂圣X16 Y735/I7 9750H-3050",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: NVIDIA GeForce RTX3050",
      "GPU显存: 4GB GDDR6",
      "独显功耗：75W",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "12900HK-RTX3060",
    "shop_model": "凯王X16/i9 12900H-RTX3060",
    "slug": "qinglong-12900hk-rtx3060",
    "params": [
      "产品型号 : 12900HK-RTX3060   店铺型号：凯王X16/i9 12900H-RTX3060",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: GeForce RTX3060",
      "GPU显存: 6GB GDDR6",
      "独显功耗：75W",
      "鲁大师跑分分数: 1400000",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "11850H-RTX3060",
    "shop_model": "凯王16Pro/i7 11850H-RTX3060",
    "slug": "qinglong-11850h-rtx3060",
    "params": [
      "产品型号 : 11850H-RTX3060   店铺型号：凯王16Pro/i7 11850H-RTX3060",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 15.6英寸",
      "比例: 16：9",
      "分辨率: 1920*1080",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 144Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: GeForce RTX3060",
      "GPU显存: 6GB GDDR6",
      "独显功耗：75W",
      "鲁大师跑分分数: 1250000",
      "内存: DDR4 2666MHz 3200MHz 内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2280接口，支持NVMe PCIe 3.0或SATA协议",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 180W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "GT161/i7 13620H-RTX5060",
    "shop_model": "青龙16Pro/i7 13620H-RTX5060",
    "slug": "qinglong-gt161-i7-13620h-rtx5060",
    "params": [
      "产品型号 :GT161/i7 13620H-RTX5060  店铺型号：青龙16Pro/i7 13620H-RTX5060",
      "尺寸：360*262*26mm",
      "壳体材料: 金属(铝合金)+塑胶(ABS+PC)",
      "产品颜色: 灰色",
      "重量: 约 2.3kg",
      "显示器",
      "尺寸: 16英寸",
      "比例: 16：10",
      "分辨率: 2560*1600",
      "色域: 100% sRGB",
      "背光: LED",
      "刷新率: 165Hz",
      "硬件信息",
      "热设计功耗:45W",
      "显卡型号: GeForce RTX5060",
      "GPU显存: 8GB GDDR6",
      "独显功耗：75W",
      "鲁大师跑分分数: 1400000",
      "内存: DDR5 4800MHz 内存 最高可支持至64G",
      "硬盘存储: 2个M.2 2280接口，支持NVMe PCIe 4.0",
      "相机: FHD 1080P 摄像头",
      "连接性",
      "WIFI: 802.11ax",
      "蓝牙: 蓝牙5.2",
      "操作系统: WIN11",
      "电源适配器: 230W",
      "电池",
      "电池类型: 锂电池",
      "容量: 62Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  },
  {
    "series": "青龙系列",
    "product_model": "N95-MX230",
    "shop_model": "玩家战魂极光X16/N95MX230",
    "slug": "qinglong-n95-mx230",
    "params": [
      "产品型号 : N95-MX230   店铺型号：玩家战魂极光X16/N95MX230",
      "尺寸：358*244*22mm",
      "壳体材料: 塑料",
      "产品颜色: 灰色",
      "重量: 1.8KG±20g",
      "显示器",
      "尺寸: 16英寸",
      "比例: 16：10",
      "分辨率: 1920*1200",
      "色域: 45% sRGB",
      "背光: LED",
      "刷新率: 60Hz",
      "硬件信息",
      "热设计功耗:15W",
      "显卡型号: Intel® UHD Graphics 和MX230",
      "GPU显存: 2 GB GDDR5",
      "鲁大师跑分分数: 约 300000",
      "内存: 单卡槽，DDR4 2666MHz 3200MHz内存 最高可支持至32G",
      "硬盘存储: 1个M.2 2242接口，支持NVMe PCIe 3.0或SATA协议",
      "相机: 720P 摄像头",
      "连接性",
      "WIFI: 802.11ac",
      "蓝牙: 蓝牙4.2",
      "操作系统: WIN11",
      "电源适配器: 65W",
      "电池",
      "电池类型: 锂电池",
      "容量: 48Wh",
      "保修政策: 整机1年质保，上门服务/地址维修"
    ]
  }
]

async function uploadProducts() {
  console.log('开始上传产品...\n')

  let successCount = 0
  let failCount = 0

  for (const productData of productsData) {
    console.log(`处理产品: ${productData.shop_model}`)

    try {
      // 检查产品是否已存在
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('slug', productData.slug)
        .single()

      if (existing) {
        console.log(`  ⚠️  产品已存在，跳过: ${productData.slug}`)
        continue
      }

      const info = extractProductInfo(productData)
      const longDesc = generateProductDescription(productData, info)
      const shortDesc = generateShortDescription(productData, info)
      const keySpecs = generateKeySpecs(productData, info)

      // 插入产品主表
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          slug: productData.slug,
          category: productData.series,
          status: 'draft', // 草稿状态
          featured: false,
          sort_order: 0,
          moq: 100,
          price: null,
          datasheet_url: null,
          images: [] // 图片先留空
        })
        .select()
        .single()

      if (productError) {
        console.error(`  ❌ 创建产品失败:`, productError.message)
        failCount++
        continue
      }

      // 插入中文翻译
      const { error: translationError } = await supabase
        .from('product_translations')
        .insert({
          product_id: product.id,
          locale: 'zh-CN',
          title: productData.shop_model,
          short_desc: shortDesc,
          long_desc: longDesc,
          key_specs: keySpecs,
          quality_tests: [],
          oem_services: [],
          faqs: [],
          seo_title: productData.shop_model,
          seo_desc: shortDesc
        })

      if (translationError) {
        console.error(`  ❌ 创建翻译失败:`, translationError.message)
        // 回滚：删除已创建的产品
        await supabase.from('products').delete().eq('id', product.id)
        failCount++
        continue
      }

      console.log(`  ✅ 成功创建产品 (ID: ${product.id})`)
      successCount++

    } catch (error: any) {
      console.error(`  ❌ 处理失败:`, error.message)
      failCount++
    }

    console.log('') // 空行
  }

  console.log('\n=== 上传完成 ===')
  console.log(`成功: ${successCount}`)
  console.log(`失败: ${failCount}`)
  console.log(`总计: ${productsData.length}`)
}

// 运行上传
uploadProducts().catch(console.error)
