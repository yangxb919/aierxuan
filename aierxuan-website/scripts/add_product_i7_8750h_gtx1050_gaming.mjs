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

  const slug = 'i7-8750h-gtx1050-gaming'

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
      category: '游戏本',
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

  const longDesc = `An Intel Core i7-8750H gaming laptop with dedicated NVIDIA GeForce GTX 1050 (4GB). 16-inch IPS LED display at 1920x1200 for immersive visuals. Configurable with 16GB/32GB memory and 512GB/1TB/2TB SSD. Robust mecha-styled chassis, 12‑month warranty, and rich connectivity including Bluetooth, Wi‑Fi and Ethernet. Full‑size backlit keyboard included.`

  const keySpecs = {
    Brand: 'AIERXUAN',
    'Product Name': 'Intel Core i7 Gaming Laptop',
    GPU: 'NVIDIA GeForce GTX 1050 (Dedicated)',
    'GPU Memory': '4GB',
    CPU: 'Intel Core i7-8750H',
    Memory: '16GB / 32GB',
    Storage: '512GB / 1TB / 2TB SSD',
    'Display Size': '16-inch',
    Resolution: '1920 x 1200',
    'Panel Type': 'IPS LED',
    Color: 'Mecha-styled chassis',
    Warranty: '12 months',
    Scenarios: 'Gaming & Entertainment, Mobile Office, Home Cinema',
    Weight: '2.2 kg',
    Accessories: 'Full-size backlit keyboard',
    Connectivity: 'Bluetooth, Wi‑Fi, Ethernet',
  }

  const translation = {
    product_id: product.id,
    locale: 'en',
    title: 'AIERXUAN Intel Core i7 Gaming Laptop',
    short_desc: '16" IPS 1920×1200, i7‑8750H, GTX 1050 4GB, up to 2TB SSD',
    long_desc: longDesc,
    key_specs: keySpecs,
    seo_title: 'AIERXUAN i7‑8750H GTX 1050 Gaming Laptop',
    seo_desc: '16-inch IPS 1920×1200 gaming laptop with Intel Core i7-8750H and GTX 1050 4GB',
  }

  const { error: transErr } = await supabase
    .from('product_translations')
    .insert([translation])

  if (transErr) {
    console.error('Create translation error:', transErr)
    process.exit(1)
  }

  console.log('Inserted product i7‑8750H + GTX 1050 (inactive). ID:', product.id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

