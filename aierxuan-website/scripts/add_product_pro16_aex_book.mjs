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
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
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

  const slug = 'pro16-aex-book'

  // Skip if exists
  const { data: existing } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing?.id) {
    console.log('Product already exists with id:', existing.id)
    return
  }

  // Create product (inactive -> not published), category stored in zh to align with site mapping
  const { data: product, error: productErr } = await supabase
    .from('products')
    .insert({
      slug,
      category: '商务本',
      status: 'inactive',
      featured: false,
      sort_order: 0,
      images: [],
    })
    .select()
    .single()

  if (productErr) {
    console.error('Create product error:', productErr)
    process.exit(1)
  }

  const longDesc = `AIERXUAN Pro16- (AEX BOOK series) is a thin-and-light 16-inch business laptop powered by Intel N100. It features an IPS LED display at 1920x1080, 16:10 aspect ratio, and 100% DCI-P3 color gamut. With optional 8/16/32GB DDR4 memory and 256GB/512GB/1TB SSD, it suits study, mobile office, entertainment and content creation. Supports touchscreen, full-size backlit keyboard and fingerprint unlock. Comes with 2-year warranty.`

  const keySpecs = {
    Brand: 'AIERXUAN',
    Model: 'Pro16- (AEX BOOK series)',
    'Release Date': '2024-01-12',
    Manufacturer: 'Shenzhen AIERXUAN Technology Co., Ltd.',
    'CPU Brand': 'Intel',
    'CPU Model': 'Intel N100',
    Memory: '8GB DDR4 / 16GB DDR4 / 32GB DDR4 (optional)',
    Storage: '256GB / 512GB / 1TB SSD (optional)',
    GPU: 'Intel UHD Graphics',
    VRAM: 'Shared system memory',
    'Display Size': '16-inch (some versions 14-inch / 15.6-inch)',
    'Panel Type': 'IPS LED',
    Resolution: '1920 x 1080',
    'Aspect Ratio': '16:10',
    Bezel: '≥ 10.0mm',
    Thickness: '10.0mm (incl.) - 15.0mm (excl.)',
    Weight: '1.0kg (incl.) - 1.5kg (excl.)',
    'Color Gamut': '100% DCI-P3',
    Fingerprint: 'Supported',
    'Input Devices': 'Touchscreen, Touchpad, Full-size backlit keyboard, Fingerprint sensor',
    Connectivity: 'Bluetooth, Wi‑Fi, Fingerprint module',
    Warranty: '2 Years',
    'Energy Efficiency': 'Level 1',
    'Laptop Type': 'Thin & Light',
    Scenarios: 'Study & Research, Mobile Office, Gaming & Entertainment, Content Creation, Home Cinema, Financial Analysis',
    Colors: 'Space Silver, Pink, Moonlight Silver, Space Gray',
    'CCC Certificate No.': '2024010902630315',
  }

  const translation = {
    product_id: product.id,
    locale: 'en',
    title: 'AIERXUAN Pro16- (AEX BOOK)',
    short_desc: '16" thin-and-light business laptop with Intel N100, IPS FHD 16:10, up to 32GB DDR4 and 1TB SSD',
    long_desc: longDesc,
    key_specs: keySpecs,
    seo_title: 'AIERXUAN Pro16- (AEX BOOK) Business Laptop',
    seo_desc: '16-inch Business Laptop, Intel N100, IPS FHD 16:10, 100% DCI-P3, fingerprint, up to 32GB RAM and 1TB SSD',
  }

  const { error: transErr } = await supabase
    .from('product_translations')
    .insert([translation])

  if (transErr) {
    console.error('Create translation error:', transErr)
    process.exit(1)
  }

  console.log('Inserted product Pro16- (AEX BOOK) (inactive). ID:', product.id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

