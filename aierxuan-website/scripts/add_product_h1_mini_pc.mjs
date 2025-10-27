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

  const slug = 'h1-mini-pc-6800h'

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

  // Create product (inactive, mini pc category)
  const { data: product, error: productErr } = await supabase
    .from('products')
    .insert({
      slug,
      category: '迷你主机',
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

  const longDesc = `AIERXUAN H1 Mini PC built on AMD Ryzen 7 6800H (8C/16T, up to 4.7GHz) with Radeon 680M graphics. Ships with 32GB DDR5 4800MHz and 1TB NVMe SSD by default, expandable to 64GB RAM and up to 4TB SSD. Supports Wi‑Fi 6 and Bluetooth 5.2. Triple 4K display output via HDMI 2.0, DP 2.0 and USB‑C (DP Alt‑mode). Ultra‑quiet cooling, compact 129×129×51mm chassis, Windows 11 Pro preinstalled.`

  const keySpecs = {
    Model: 'AIERXUAN H1 Mini PC',
    CPU: 'AMD Ryzen 7 6800H, 8C/16T, 16MB L3, Base 3.2GHz / Boost up to 4.7GHz',
    GPU: 'AMD Radeon 680M, 12 CUs, 2200MHz',
    Memory: '32GB DDR5 4800MHz (dual SO‑DIMM, up to 64GB)',
    Storage: '1TB M.2 2280 NVMe PCIe 3.0×4 SSD (dual M.2, PCIe 3.0/4.0; SATA SSD not supported; up to 4TB)',
    Wireless: 'Wi‑Fi 6, Bluetooth 5.2 (M.2 2230 module)',
    'Video Output': 'HDMI 2.0 ×1 (4K@60Hz), DP 2.0 ×1 (4K@60Hz), USB 3.2 Gen2 Type‑C ×1 (4K@60Hz)',
    'Audio Output': 'HDMI 2.0 ×1, DP 2.0 ×1, USB‑C ×1, 3.5mm headphone jack ×1',
    'Ports & Buttons': '2.5G RJ45 ×1; USB 3.2 Gen2 Type‑A ×2 (front); USB 3.2 Gen1 Type‑A ×4 (rear); USB 3.2 Gen2 Type‑C ×1 (DP1.4/4K@60Hz/10Gbps/PD out); HDMI 2.0 ×1; DP 2.0 ×1; 3.5mm audio ×1; DC IN ×1; Power button ×1',
    Power: 'DC 19V / 3.42A (5.5×2.1mm)',
    OS: 'Windows 11 Pro',
    Dimensions: '129 × 129 × 51 mm',
    'Package Contents': 'Mini PC, Power Adapter, HDMI Cable, User Manual',
    Highlights: 'DDR5 memory, NVMe SSD, Wi‑Fi 6, Triple 4K display, Ultra‑quiet cooling, Multi‑OS support',
    Scenarios: 'Office, Design, Video Editing, 4K Playback, Light Gaming, Home Entertainment',
  }

  const translation = {
    product_id: product.id,
    locale: 'en',
    title: 'AIERXUAN H1 Mini PC',
    short_desc: 'Ryzen 7 6800H • Radeon 680M • 32GB DDR5 • 1TB NVMe • Triple 4K Output',
    long_desc: longDesc,
    key_specs: keySpecs,
    seo_title: 'AIERXUAN H1 Mini PC (Ryzen 7 6800H, Radeon 680M)',
    seo_desc: 'Compact Mini PC with Ryzen 7 6800H, Radeon 680M, DDR5, NVMe SSD, Wi‑Fi 6 and triple 4K display.',
  }

  const { error: transErr } = await supabase
    .from('product_translations')
    .insert([translation])

  if (transErr) {
    console.error('Create translation error:', transErr)
    process.exit(1)
  }

  console.log('Inserted product H1 Mini PC (inactive). ID:', product.id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

