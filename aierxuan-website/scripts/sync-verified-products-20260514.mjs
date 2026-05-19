import fs from 'fs'
import path from 'path'
import process from 'process'
import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'

const SOURCE_ROOT = '/Users/yangxiaobo/Desktop/AIERXUAN/网站图片和核对后文档_20260514/网站图片'
const scriptDir = path.dirname(new URL(import.meta.url).pathname)
const appRoot = path.resolve(scriptDir, '..')
const uploadsRoot = path.join(appRoot, 'public', 'uploads', 'products', 'verified-20260514')
const publicBase = '/uploads/products/verified-20260514'
const cjkPattern = /[\u3400-\u9FFF\uF900-\uFAFF]/

function loadEnv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!match) continue
    const [, key, rawValue] = match
    let value = rawValue.trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

const products = [
  {
    slug: 'r5-7430-business-laptop',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '灵感系列',
    productName: 'R5-7430',
    productModel: 'W042-45A-ID12',
    shopModel: 'aierxuan幻影Air14/R5-7430',
    folder: ['爱尔轩', '灵感系列', 'R5-7430'],
    category: '商务本',
    processor: 'AMD Ryzen 5 7430',
    graphics: 'Integrated graphics',
    display: '14-inch class business laptop',
  },
  {
    slug: 'linggan-i5-12450h',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '灵感系列',
    productName: '灵感I5-12450H',
    productModel: '灵感i5-12450H',
    shopModel: '灵感14Pro/i5-12450H',
    folder: ['爱尔轩', '灵感系列', '灵感I5-12450H'],
    category: '商务本',
    processor: 'Intel Core i5-12450H',
    graphics: 'Integrated graphics',
    display: '14-inch class business laptop',
  },
  {
    slug: 'linggan-i3-1215u',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '灵感系列',
    productName: '灵感i3-1215U',
    productModel: '灵感i3-1215U',
    shopModel: '灵感14Air/i3-1215U',
    folder: ['爱尔轩', '灵感系列', '灵感i3-1215U'],
    category: '商务本',
    processor: 'Intel Core i3-1215U',
    graphics: 'Integrated graphics',
    display: '14-inch class business laptop',
  },
  {
    slug: 'linggan-i7-13620h',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '灵感系列',
    productName: '灵感I7-13620H',
    productModel: '灵感i5-13620H',
    shopModel: '灵感14Ultra/i7-13620H',
    folder: ['爱尔轩', '灵感系列', '灵感I7-13620H'],
    category: '商务本',
    processor: 'Intel Core i7-13620H',
    graphics: 'Integrated graphics',
    display: '14-inch class business laptop',
  },
  {
    slug: 'air15-ultra-i7-6600u',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '小轩系列',
    productName: 'I7-6600U',
    productModel: '15.4寸',
    shopModel: 'Air15-Ultra/I7-6600U',
    folder: ['爱尔轩', '小轩系列', 'I7-6600U'],
    category: '商务本',
    processor: 'Intel Core i7-6600U',
    graphics: 'Integrated graphics',
    display: '15.4-inch business laptop',
  },
  {
    slug: 'yaoxing-15s-n100-dual-screen',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '小轩系列',
    productName: 'X133 N100双屏',
    productModel: '15.6寸',
    shopModel: '耀星15S/N100',
    folder: ['爱尔轩', '小轩系列', 'X133_N100双屏'],
    category: '商务本',
    processor: 'Intel N100',
    graphics: 'Integrated graphics',
    display: '15.6-inch dual-screen laptop',
  },
  {
    slug: 'air14-n5095',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '小轩系列',
    productName: 'Air14/N5095',
    productModel: 'V14/XU141',
    shopModel: 'Air14',
    folder: ['爱尔轩', '小轩系列', 'Air14_N5095'],
    category: '商务本',
    processor: 'Intel Celeron N5095',
    graphics: 'Intel UHD Graphics',
    display: '14-inch business laptop',
  },
  {
    slug: 'air14-pro2025-i3-6100u',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '小轩系列',
    productName: 'i3-6100U',
    productModel: '14英寸TU140',
    shopModel: 'Air14-Pro2025/i3-6100U',
    folder: ['爱尔轩', '小轩系列', 'i3-6100U'],
    category: '商务本',
    processor: 'Intel Core i3-6100U',
    graphics: 'Integrated graphics',
    display: '14-inch business laptop',
  },
  {
    slug: 'du61-i9-11900h',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '小轩系列',
    productName: 'DU61/i9-11900H',
    productModel: 'DU61',
    shopModel: 'DU61/i9-11900H',
    folder: ['爱尔轩', '小轩系列', 'DU61_i9-11900H'],
    category: '商务本',
    processor: 'Intel Core i9-11900H',
    graphics: 'Integrated graphics',
    display: '15.6-inch business laptop',
  },
  {
    slug: 'air15-n5095',
    brand: 'AIERXUAN',
    brandZh: '爱尔轩',
    series: '小轩系列',
    productName: 'Air15/N5095',
    productModel: 'V15/XU156',
    shopModel: 'Air15',
    folder: ['爱尔轩', '小轩系列', 'Air15_N5095'],
    category: '商务本',
    processor: 'Intel Celeron N5095',
    graphics: 'Intel UHD Graphics',
    display: '15.6-inch business laptop',
  },
  {
    slug: 'i7-8750h-gtx1050-gaming',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: 'i7 8750H-1050',
    productModel: 'i7 8750H-1050',
    shopModel: '魂圣X16 Y715/I7 8750H-1050',
    folder: ['玩家战魂', '青龙系列', 'i7_8750H-1050'],
    category: '游戏本',
    processor: 'Intel Core i7-8750H',
    graphics: 'NVIDIA GeForce GTX 1050',
    display: '15.6-inch gaming laptop',
  },
  {
    slug: 'qinglong-i7-8850h-p106',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: '自营店铺i7 8850H-P106',
    productModel: 'i7 8850H-P106',
    shopModel: '魂圣X16 Y715/I7 8850H-P106',
    folder: ['玩家战魂', '青龙系列', '自营店铺i7_8850H-P106'],
    category: '游戏本',
    processor: 'Intel Core i7-8850H',
    graphics: 'NVIDIA P106',
    display: '15.6-inch gaming laptop',
  },
  {
    slug: 'qinglong-i7-8850h-gtx1060',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: '非自营店铺i7 8850H-GTX1060(P106)',
    productModel: 'i7 8850H-GTX1060',
    shopModel: 'I7 8850H-GTX1060',
    folder: ['玩家战魂', '青龙系列', '非自营店铺i7_8850H-GTX1060(P106)'],
    category: '游戏本',
    processor: 'Intel Core i7-8850H',
    graphics: 'NVIDIA GeForce GTX 1060',
    display: '15.6-inch gaming laptop',
  },
  {
    slug: 'qinglong-i9-11900h-rtx3060',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: 'i9 11900H-RTX3060',
    productModel: '11900H-RTX3060',
    shopModel: '凯王16Pro/i9 11900H-RTX3060',
    folder: ['玩家战魂', '青龙系列', 'i9_11900H-RTX3060'],
    category: '游戏本',
    processor: 'Intel Core i9-11900H',
    graphics: 'NVIDIA GeForce RTX 3060',
    display: '16-inch class gaming laptop',
  },
  {
    slug: 'qinglong-i7-9750h-rtx3050',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: 'i7 9750H-3050',
    productModel: 'i7 9750H-3050',
    shopModel: '魂圣X16 Y735/I7 9750H-3050',
    folder: ['玩家战魂', '青龙系列', 'i7_9750H-3050'],
    category: '游戏本',
    processor: 'Intel Core i7-9750H',
    graphics: 'NVIDIA GeForce RTX 3050',
    display: '15.6-inch gaming laptop',
  },
  {
    slug: 'qinglong-i9-12900hk-rtx3060',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: 'i9 12900HK-RTX3060',
    productModel: '12900HK-RTX3060',
    shopModel: '凯王X16/i9 12900H-RTX3060',
    folder: ['玩家战魂', '青龙系列', 'i9_12900HK-RTX3060'],
    category: '游戏本',
    processor: 'Intel Core i9-12900HK',
    graphics: 'NVIDIA GeForce RTX 3060',
    display: '16-inch class gaming laptop',
  },
  {
    slug: 'qinglong-i7-11850h-rtx3060',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: 'i7 11850H-RTX3060',
    productModel: '11850H-RTX3060',
    shopModel: '凯王16Pro/i7 11850H-RTX3060',
    folder: ['玩家战魂', '青龙系列', 'i7_11850H-RTX3060'],
    category: '游戏本',
    processor: 'Intel Core i7-11850H',
    graphics: 'NVIDIA GeForce RTX 3060',
    display: '16-inch class gaming laptop',
  },
  {
    slug: 'qinglong-i7-13620h-rtx5060',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '青龙系列',
    productName: 'i7 13620H-RTX5060',
    productModel: 'GT161/i7 13620H-RTX5060',
    shopModel: '青龙16Pro/i7 13620H-RTX5060',
    folder: ['玩家战魂', '青龙系列', 'i7_13620H-RTX5060'],
    category: '游戏本',
    processor: 'Intel Core i7-13620H',
    graphics: 'NVIDIA GeForce RTX 5060',
    display: '16-inch 2560x1600 165Hz gaming laptop',
  },
  {
    slug: 'zhuque-n95-mx230',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '朱雀系列',
    productName: 'N95-MX230',
    productModel: 'N95-MX230',
    shopModel: '玩家战魂极光X16 N923/N95MX230',
    folder: ['玩家战魂', '朱雀系列', 'N95-MX230'],
    category: '游戏本',
    processor: 'Intel N95',
    graphics: 'NVIDIA GeForce MX230',
    display: '16-inch laptop',
  },
  {
    slug: 'zhuque-r5-7430u-15-6',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '朱雀系列',
    productName: 'R5-7430U(15.6寸)',
    productModel: 'R5-7430U 15.6寸',
    shopModel: '无界X15/R5-7430U',
    folder: ['玩家战魂', '朱雀系列', 'R5-7430U(15.6寸)'],
    category: '游戏本',
    processor: 'AMD Ryzen 5 7430U',
    graphics: 'Integrated graphics',
    display: '15.6-inch laptop',
  },
  {
    slug: 'zhuque-12900hk',
    brand: 'GameSoul',
    brandZh: '玩家战魂',
    series: '朱雀系列',
    productName: '12900HK',
    productModel: 'NB07',
    shopModel: '极光X15 12900HK',
    folder: ['玩家战魂', '朱雀系列', '12900HK'],
    category: '游戏本',
    processor: 'Intel Core i9-12900HK',
    graphics: 'Integrated graphics',
    display: '15-inch class laptop',
  },
]

function imageLabel(fileName) {
  if (fileName.includes('主图')) return 'main-factory'
  if (fileName.includes('正面')) return 'front-open'
  if (fileName.includes('俯视')) return 'keyboard-top'
  if (fileName.includes('后盖')) return 'closed-back'
  if (fileName.includes('侧视')) return 'closed-side'
  if (fileName.includes('接口')) return 'ports'
  return path.basename(fileName, path.extname(fileName)).replace(/[^\w-]+/g, '-')
}

async function prepareImages(product) {
  const sourceDir = path.join(SOURCE_ROOT, ...product.folder, '网站图')
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Missing image folder: ${sourceDir}`)
  }

  const sourceFiles = fs.readdirSync(sourceDir)
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))

  if (sourceFiles.length === 0) {
    throw new Error(`No product images found: ${sourceDir}`)
  }

  const outDir = path.join(uploadsRoot, product.slug)
  fs.mkdirSync(outDir, { recursive: true })

  const urls = []
  for (let index = 0; index < sourceFiles.length; index += 1) {
    const fileName = sourceFiles[index]
    const sequence = String(index + 1).padStart(2, '0')
    const outName = `${sequence}-${imageLabel(fileName)}.webp`
    const inputPath = path.join(sourceDir, fileName)
    const outputPath = path.join(outDir, outName)
    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath)
    urls.push(`${publicBase}/${product.slug}/${outName}`)
  }

  return urls
}

const seriesLabels = {
  '灵感系列': 'Linggan Series',
  '小轩系列': 'Xiaoxuan Series',
  '青龙系列': 'Qinglong Series',
  '朱雀系列': 'Zhuque Series',
}

const categorySlugs = {
  '商务本': 'business-laptop',
  '游戏本': 'gaming-laptop',
  '迷你主机': 'mini-pc',
}

const categoryLabels = {
  '商务本': 'Business Laptop',
  '游戏本': 'Gaming Laptop',
  '迷你主机': 'Mini PC',
}

const shopModelLabels = {
  'r5-7430-business-laptop': 'Aierxuan Huanying Air14/R5-7430',
  'linggan-i5-12450h': 'Linggan 14 Pro/i5-12450H',
  'linggan-i3-1215u': 'Linggan 14 Air/i3-1215U',
  'linggan-i7-13620h': 'Linggan 14 Ultra/i7-13620H',
  'air15-ultra-i7-6600u': 'Air15-Ultra/I7-6600U',
  'yaoxing-15s-n100-dual-screen': 'Yaoxing 15S/N100',
  'air14-n5095': 'Air14',
  'air14-pro2025-i3-6100u': 'Air14-Pro2025/i3-6100U',
  'du61-i9-11900h': 'DU61/i9-11900H',
  'air15-n5095': 'Air15',
  'i7-8750h-gtx1050-gaming': 'Hunsheng X16 Y715/I7 8750H-1050',
  'qinglong-i7-8850h-p106': 'Hunsheng X16 Y715/I7 8850H-P106',
  'qinglong-i7-8850h-gtx1060': 'I7 8850H-GTX1060',
  'qinglong-i9-11900h-rtx3060': 'Kaiwang 16Pro/i9 11900H-RTX3060',
  'qinglong-i7-9750h-rtx3050': 'Hunsheng X16 Y735/I7 9750H-3050',
  'qinglong-i9-12900hk-rtx3060': 'Kaiwang X16/i9 12900H-RTX3060',
  'qinglong-i7-11850h-rtx3060': 'Kaiwang 16Pro/i7 11850H-RTX3060',
  'qinglong-i7-13620h-rtx5060': 'Qinglong 16Pro/i7 13620H-RTX5060',
  'zhuque-n95-mx230': 'Wanjia Zhanhun Jiguang X16 N923/N95MX230',
  'zhuque-r5-7430u-15-6': 'Wujie X15/R5-7430U',
  'zhuque-12900hk': 'Jiguang X15 12900HK',
}

const productModelLabels = {
  'linggan-i5-12450h': 'Linggan i5-12450H',
  'linggan-i3-1215u': 'Linggan i3-1215U',
  'linggan-i7-13620h': 'Linggan i5-13620H',
  'air15-ultra-i7-6600u': '15.4-inch',
  'yaoxing-15s-n100-dual-screen': '15.6-inch',
  'air14-pro2025-i3-6100u': '14-inch TU140',
  'zhuque-r5-7430u-15-6': 'R5-7430U 15.6-inch',
}

function normalizeProduct(product) {
  return {
    ...product,
    brandLabel: product.brand,
    seriesLabel: seriesLabels[product.series] || product.series,
    productModelLabel: productModelLabels[product.slug] || product.productModel,
    shopModelLabel: shopModelLabels[product.slug] || product.shopModel,
    category: categorySlugs[product.category] || product.category,
    categoryLabel: categoryLabels[product.category] || product.category,
    family: categoryLabels[product.category] || 'Computer Hardware',
  }
}

function sanitizeManifestProduct(product) {
  const normalized = normalizeProduct(product)
  return {
    slug: normalized.slug,
    brand: normalized.brandLabel,
    series: normalized.seriesLabel,
    productModel: normalized.productModelLabel,
    shopModel: normalized.shopModelLabel,
    category: normalized.category,
    categoryLabel: normalized.categoryLabel,
    processor: normalized.processor,
    graphics: normalized.graphics,
    display: normalized.display,
    images: normalized.images,
  }
}

function assertNoCjk(label, value) {
  const serialized = JSON.stringify(value)
  if (cjkPattern.test(serialized)) {
    throw new Error(`${label} still contains Chinese/CJK characters: ${serialized}`)
  }
}

function keySpecs(product) {
  return {
    Brand: product.brandLabel,
    Series: product.seriesLabel,
    'Product Model': product.productModelLabel,
    'Shop Model': product.shopModelLabel,
    Processor: product.processor,
    Graphics: product.graphics,
    Display: product.display,
    Category: product.categoryLabel,
    MOQ: '100+ units',
    Warranty: '12 months standard hardware warranty',
  }
}

function buildCopy(product) {
  const specs = keySpecs(product)
  const title = `${product.brandLabel} ${product.shopModelLabel} ${product.family}`
  const shortDesc = `${product.processor}${product.graphics ? ` / ${product.graphics}` : ''} ${product.family} from ${product.seriesLabel}, prepared for OEM/ODM sourcing and bulk quotation.`
  const longDesc = `## Product Overview

${title} is part of the ${product.brandLabel} ${product.seriesLabel}. This model is prepared for distributors, system integrators, education and office procurement teams, and channel buyers who need bulk sourcing and OEM/ODM customization.

## Key Configuration

- Brand: ${product.brandLabel}
- Series: ${product.seriesLabel}
- Product model: ${product.productModelLabel}
- Shop model: ${product.shopModelLabel}
- Processor: ${product.processor}
- Graphics: ${product.graphics}
- Display / form factor: ${product.display}

## Buyer Fit

Prepared for distributors, system integrators, education and office procurement teams, and channel buyers who need bulk sourcing and OEM/ODM customization. Logo, OS image, packaging, and shipment requirements can be discussed during quotation.`

  return {
    title,
    short_desc: shortDesc,
    long_desc: longDesc,
    key_specs: specs,
    seo_title: `${title} | AIERXUAN`,
    seo_desc: shortDesc,
  }
}

function preserveRichExisting(existing, next) {
  if (!existing) return next
  const merged = { ...next }

  if (existing.long_desc && existing.long_desc.length > next.long_desc.length + 300 && !cjkPattern.test(existing.long_desc)) {
    merged.long_desc = existing.long_desc
  }

  for (const key of ['quality_tests', 'oem_services', 'faqs']) {
    if (Array.isArray(existing[key]) && existing[key].length > 0 && !cjkPattern.test(JSON.stringify(existing[key]))) {
      merged[key] = existing[key]
    }
  }

  return merged
}

async function upsertTranslation(supabase, productId, locale, nextCopy) {
  const { data: existing, error: existingError } = await supabase
    .from('product_translations')
    .select('*')
    .eq('product_id', productId)
    .eq('locale', locale)
    .maybeSingle()

  if (existingError) throw existingError

  const payload = preserveRichExisting(existing, {
    product_id: productId,
    locale,
    ...nextCopy,
    quality_tests: [],
    oem_services: [],
    faqs: [],
  })

  const { error } = await supabase
    .from('product_translations')
    .upsert(payload, { onConflict: 'product_id,locale' })

  if (error) throw error
}

async function syncTranslations(supabase, productId, nextCopy) {
  const { data: existingTranslations, error } = await supabase
    .from('product_translations')
    .select('locale')
    .eq('product_id', productId)

  if (error) throw error

  const locales = new Set(['en', 'zh-CN'])
  for (const row of existingTranslations || []) {
    if (row.locale) locales.add(row.locale)
  }

  for (const locale of locales) {
    await upsertTranslation(supabase, productId, locale, nextCopy)
  }
}

async function syncDatabase(manifest) {
  loadEnv(path.join(appRoot, '.env.local'))
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !secretKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY')
  }

  const supabase = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const sourceSlugs = new Set(manifest.map((item) => item.slug))

  for (let index = 0; index < manifest.length; index += 1) {
    const product = normalizeProduct(manifest[index])
    const copy = buildCopy(product)
    assertNoCjk(product.slug, { product: sanitizeManifestProduct(product), copy })
    const { data: row, error } = await supabase
      .from('products')
      .upsert({
        slug: product.slug,
        category: product.category,
        status: 'active',
        featured: index < 6,
        sort_order: index + 1,
        moq: 100,
        price: null,
        datasheet_url: null,
        images: product.images,
      }, { onConflict: 'slug' })
      .select('id, slug')
      .single()

    if (error) throw error

    await syncTranslations(supabase, row.id, copy)
    console.log(`Synced ${index + 1}/${manifest.length}: ${product.slug}`)
  }

  const { data: allProducts, error: allError } = await supabase
    .from('products')
    .select('id, slug, status')

  if (allError) throw allError

  const outsideSource = allProducts.filter((item) => !sourceSlugs.has(item.slug) && item.status !== 'inactive')
  if (outsideSource.length > 0) {
    const { error } = await supabase
      .from('products')
      .update({ status: 'inactive', featured: false })
      .in('id', outsideSource.map((item) => item.id))

    if (error) throw error
    console.log(`Deactivated ${outsideSource.length} products outside the verified 2026-05-14 source set.`)
  }

  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  if (countError) throw countError
  console.log(`Active product count after sync: ${count}`)
}

async function main() {
  console.log('Preparing verified product images...')
  const manifest = []
  for (const product of products) {
    const images = await prepareImages(product)
    manifest.push({ ...product, images })
    console.log(`Prepared ${images.length} images: ${product.slug}`)
  }

  const manifestPath = path.join(uploadsRoot, 'manifest.json')
  const publicManifest = manifest.map(sanitizeManifestProduct)
  assertNoCjk('public manifest', publicManifest)
  fs.writeFileSync(manifestPath, JSON.stringify(publicManifest, null, 2))
  console.log(`Manifest written: ${manifestPath}`)

  if (process.env.SYNC_PRODUCTS_SKIP_DB === '1') {
    console.log('Skipping database sync because SYNC_PRODUCTS_SKIP_DB=1')
    return
  }

  await syncDatabase(manifest)
  console.log('Verified product sync complete.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
