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
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1)
    }
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

  const slug = 'dh61'

  // Create product (status: inactive = not published)
  const { data: existing, error: existingErr } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing && !existingErr) {
    console.log('Product already exists with id:', existing.id)
    process.exit(0)
  }

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

  const longDesc = `AIERXUAN DH61 is a 15.6-inch business laptop designed for professionals who need performance and portability. Powered by Intel Core i9-11900H with Intel UHD Graphics, it supports 16GB/32GB memory options and 512GB/1TB SSD storage. IPS LED panel at 1920x1080 offers clear visuals. Connectivity includes Bluetooth, Ethernet and Wi‑Fi. 1-year warranty.`

  const keySpecs = {
    Brand: 'AIERXUAN',
    Model: 'DH61',
    CPU: 'Intel Core i9-11900H',
    GPU: 'Intel UHD Graphics',
    Memory: '16GB / 32GB',
    Storage: '512GB / 1TB SSD',
    'Display Size': '15.6-inch',
    'Panel Type': 'IPS LED',
    Resolution: '1920 x 1080',
    'Product Type': 'Business Laptop',
    'Use Cases': 'Study & Research, Mobile Office, Outdoor Work, For Women, Home Entertainment, Thin & Light, Home Cinema, Gaming & Entertainment, Financial Analysis, Flagship',
    Thickness: '15.0mm (incl.) - 18.0mm (excl.)',
    Connectivity: 'Bluetooth, Ethernet (Wired LAN), Wi‑Fi',
    Warranty: '1 Year',
    Package: 'Standard Package',
    'CCC Certificate No.': '2024010902630315',
    'Release Date': '2024-12-14',
  }

  const translation = {
    product_id: product.id,
    locale: 'en',
    title: 'AIERXUAN DH61',
    short_desc: '15.6" business laptop with Intel Core i9-11900H and FHD IPS display',
    long_desc: longDesc,
    key_specs: keySpecs,
    seo_title: 'AIERXUAN DH61 Business Laptop',
    seo_desc: '15.6-inch Business Laptop with Intel Core i9-11900H, IPS FHD, 16/32GB RAM, 512GB/1TB SSD',
  }

  const { error: transErr } = await supabase
    .from('product_translations')
    .insert([translation])

  if (transErr) {
    console.error('Create translation error:', transErr)
    process.exit(1)
  }

  console.log('Inserted product DH61 (inactive) with English translation. ID:', product.id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
