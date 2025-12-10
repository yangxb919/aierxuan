/**
 * Upload Xiaoxuan Series Products Script
 * 上传小轩系列商务本产品到数据库(草稿状态)
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

// 产品数据
const products = [
  {
    "product_group": "Xiaoxuan Series",
    "specification_name": "I7-6600U Product Specification",
    "shop_model": "Air15-Ultra/I7-6600U",
    "internal_model": "15.4 inch",
    "physical_specs": {
      "dimensions": "348.5*221.7*18.4mm",
      "material": "Metal (A cover) / Plastic (C/D covers)",
      "color": "Space Gray",
      "weight": "Approx. 1.538kg"
    },
    "display": {
      "size": "15.4 inches",
      "details": "15.4-inch IPS Screen / Resolution 1920×1080"
    },
    "hardware": {
      "cpu_info": {
        "model": "Intel® Core™ i7-6600U",
        "graphics": "Intel® HD Graphics 520",
        "cores": "2",
        "threads": "4",
        "max_freq": "3.4GHz",
        "base_freq": "2.6GHz",
        "cache": "4M",
        "tdp": "15W"
      },
      "benchmark": {
        "tool": "Master Lu",
        "score": ""
      },
      "ram": {
        "type": "SODIMM*2 _8GB/16GB/32GB (Optional)"
      },
      "storage": {
        "type": "M.2 Interface (2280)*1, Supports SATA"
      }
    },
    "peripherals": {
      "camera": "HD Web Camera, 0.3MP",
      "keyboard_language": "US English",
      "keyboard_backlight": "Built-in Backlit Keyboard",
      "touchpad": "HID-I2C",
      "audio": {
        "speakers": "Stereo Dual Speakers 8Ω/1.0W",
        "mic": "Built-in Digital Mic*1"
      }
    },
    "battery_power": {
      "battery_type": "Rechargeable Lithium-ion Polymer Battery 7.6V",
      "capacity": "5000mAh/38Wh/Approx. 3 hours battery life",
      "adapter": "Input 100-240V~1.0A AC, 50/60Hz Universal, Output 19V×2.37A",
      "indicator_light": "Not Charging/On: Charging light solid on\nStandby: Light blinking\nOff: Light off\nCharging: Red light solid on"
    },
    "interfaces": {
      "left": "Port 1: USB Type C (USB3.0)\nPort 2: DC Jack (Diameter 3.5mm)\nPort 3: Charging Indicator\nPort 4: mini HDMI",
      "right": "Port 1: Security Lock, Physical Lock Slot\nPort 2: USB Type C (USB3.0)\nPort 3: 3.5mm Standard Headphone Jack\nPort 4: TF Card Slot"
    },
    "connectivity": {
      "security": "fTPM 2.0",
      "wifi_module": "M.2 2230 Form Factor",
      "wifi_standard": "WIFI 5 Dual Band - Support 802.11B/G/N&AC (Optional)",
      "bluetooth": "BT 4.2"
    },
    "os": "Windows10/Windows11"
  },
  {
    "product_group": "Xiaoxuan Series",
    "specification_name": "X133 N100 Dual Screen Product Specification",
    "shop_model": "Yaoxing 15S/N100",
    "internal_model": "15.6 inch",
    "physical_specs": {
      "dimensions": "357*225*21.3mm",
      "material": "Composite Plastic",
      "color": "Space Gray",
      "weight": "Approx. 1.6kg"
    },
    "display": {
      "size": "Dual Screen: Main 15.6-inch + Secondary 7-inch with touch (10-point touch)",
      "details": "Main: 15.6-inch Full Screen 2K HD 1920*1080 Resolution - 60Hz\nSecondary: 1280*800 (Supports touch, supports 1024 pressure sensitivity pen, 10-point touch)"
    },
    "hardware": {
      "cpu_info": {
        "model": "Intel® Processor N100",
        "graphics": "Intel® UHD Graphics",
        "cores": "4",
        "threads": "4",
        "max_freq": "3.4GHz",
        "base_freq": "0.8GHz",
        "cache": "6M",
        "tdp": "6W"
      },
      "benchmark": {
        "tool": "Master Lu",
        "version": "6.1022.3440.1020",
        "score": "360562"
      },
      "ram": {
        "type": "DDR4 - 16GB/32GB Single Slot"
      },
      "storage": {
        "type": "M.2 Interface (2280)*1, 512G/1TB/2TB Ultra-fast SSD (approx. 6x faster than standard SSD), Supports SATA Protocol"
      }
    },
    "peripherals": {
      "camera": "0.3M HD Web Camera",
      "keyboard_language": "US English",
      "keyboard_backlight": "Built-in Backlit Keyboard",
      "touchpad": "119X85mm Touchpad with Fingerprint Function",
      "audio": {
        "speakers": "Built-in Dual Channel Cavity Speakers 8R/1.0W*2",
        "mic": "Built-in Digital Mic*1"
      }
    },
    "battery_power": {
      "battery_type": "7.7V Polymer Lithium Battery",
      "capacity": "5400mAh 7.7v",
      "adapter": "Input 100-240V~1.0A AC, 50/60Hz Universal, Output 12V×3A",
      "indicator_light": "Not Charging/On: Charging light solid on\nStandby: Light blinking\nOff: Light off\nCharging: Red light solid on"
    },
    "interfaces": {
      "left": "Port 4: USB Type C (USB3.0)\nPort 5: mini HDMI Interface\nPort 6: DC Interface 12V/3A\nPort 7: USB3.0",
      "right": "Port 1: USB3.0\nPort 2: 3.5mm Standard Headphone Jack\nPort 3: TF Card Slot (Max support 128G)"
    },
    "connectivity": {
      "security": "fTPM 2.0",
      "wifi_module": "M.2 2230 Form Factor",
      "wifi_standard": "WIFI 5 Dual Band - WIFI 802.11ac/b/g/n+BT",
      "bluetooth": "BT 4.2"
    },
    "os": "Windows10/Windows11"
  },
  {
    "product_group": "Xiaoxuan Series",
    "specification_name": "Air14/N5095 Product Specification",
    "shop_model": "Air14",
    "internal_model": "V14/XU141",
    "physical_specs": {
      "dimensions": "322*210*21mm",
      "material": "Composite Material",
      "color": "Silver",
      "weight": "1.4KG±20g"
    },
    "display": {
      "size": "14 inches",
      "details": "14-inch IPS Full Screen (1920*1080) Aspect Ratio: 16:9 / Brightness: 400 nits / Color Gamut: 72% NTSC / Refresh Rate: 60Hz"
    },
    "hardware": {
      "cpu_info": {
        "model": "Intel® Celeron® Processor N5095",
        "graphics": "Intel® UHD Graphics",
        "cores": "4",
        "threads": "4",
        "max_freq": "2.9GHz",
        "base_freq": "2.0GHz",
        "cache": "4M",
        "tdp": "15W"
      },
      "benchmark": {
        "tool": "Master Lu",
        "version": "6.1025.4190.306",
        "score": "237798"
      },
      "ram": {
        "type": "LPDDR4 6GB/8GB/12GB/16GB/32GB (Optional) (Onboard Memory)"
      },
      "storage": {
        "type": "M.2 (2280), SATA 3.0"
      }
    },
    "peripherals": {
      "camera": "0.3MP HD Web Camera",
      "keyboard_language": "US English",
      "keyboard_backlight": "Backlit Keyboard",
      "touchpad": "Material: PC + Spray Coating",
      "audio": {
        "speakers": "Built-in Dual Speakers 8Ω/1.0W",
        "mic": "Supports Digital Microphone"
      }
    },
    "battery_power": {
      "battery_type": "Rechargeable Lithium-ion Polymer Battery 7.7V",
      "capacity": "5000mAh/38Wh",
      "adapter": "Input 100-240V AC, 50/60Hz Universal, Output 12V/3A DC Charging",
      "indicator_light": "Not Charging/On: Light solid on\nStandby: Light blinking\nOff: Off\nCharging: Red light solid on"
    },
    "interfaces": {
      "left": "Port 1: USB 3.0\nPort 2: DC Charging Port\nPort 3: mini HDMI Interface",
      "right": "Port 1: USB 2.0\nPort 2: Headphone/Mic Combo Port\nPort 3: TF Card Slot"
    },
    "connectivity": {
      "security": "fTPM 2.0",
      "wifi_module": "M.2 2230 Form Factor",
      "wifi_standard": "Fn-Link6221 - Support 802.11B/G/N&AC",
      "bluetooth": "BT4.2"
    },
    "os": "Windows11/Window10"
  },
  {
    "product_group": "Xiaoxuan Series",
    "specification_name": "i3-6100U Product Specification",
    "shop_model": "Air14-Pro2025/i3-6100U",
    "internal_model": "14 inch TU140",
    "physical_specs": {
      "dimensions": "314.4mm*220mm*19.9mm",
      "material": "ABS+PC",
      "color": "Silver",
      "weight": "Approx. 1.6kg"
    },
    "display": {
      "size": "14 inches",
      "details": "14-inch EDP FHD Screen / Resolution 1920×1200 / 16:10 Narrow Bezel"
    },
    "hardware": {
      "cpu_info": {
        "model": "Intel® Core™ i3-6100U Processor",
        "graphics": "Intel® HD Graphics 520",
        "cores": "2",
        "threads": "4",
        "max_freq": "/",
        "base_freq": "2.3GHz",
        "lithography": "14nm",
        "tdp": "15W"
      },
      "benchmark": {
        "tool": "Master Lu",
        "version": "6.1024.4075.925",
        "score": "641756"
      },
      "ram": {
        "type": "2*SODIMM DDR4 Up to 32GB"
      },
      "storage": {
        "type": "M.2 Interface (2280)*1, Supports SATA/NVME"
      }
    },
    "peripherals": {
      "camera": "HD Web Camera, 0.3MP",
      "keyboard_language": "US English",
      "keyboard_backlight": "/",
      "touchpad": "Yes (Integrated)",
      "audio": {
        "speakers": "Stereo Dual Speakers",
        "mic": "Built-in Digital Mic*1"
      }
    },
    "battery_power": {
      "battery_type": "Lithium-ion Polymer Battery 7.7V",
      "capacity": "2-Cell 2S1P 7.7V 5000Mah",
      "adapter": "Input 100-240V~1.0A AC, 50/60Hz Universal, Output 19V×3.42A",
      "indicator_light": "Not Charging/On: Light solid on\nStandby: Light blinking\nOff: Light off\nCharging: Red light solid on"
    },
    "interfaces": {
      "left": "Port 1: DC Interface (Diameter 3.5mm) 19V 3.42A\nPort 2: Type-C (Default USB3.0, Optional USB+DP)\nPort 3: HDMI (Support 4K 24HZ)\nPort 4: USB Type C (USB3.0)\nPort 5: Security Lock",
      "right": "Port 1: 3.5mm Standard Headphone Jack\nPort 2: USB Type C (USB3.0)\nPort 3: USB Type C (USB3.0)\nPort 4: TF Card Slot"
    },
    "connectivity": {
      "security": "fTPM 2.0",
      "wifi_module": "M.2 2230 Form Factor",
      "wifi_standard": "WIFI 5 Dual Band - Support 802.11B/G/N&AC",
      "bluetooth": "BT 4.0"
    },
    "os": "Windows10/Windows11"
  },
  {
    "product_group": "Xiaoxuan Series",
    "specification_name": "DU61/i9-11900H Product Specification",
    "shop_model": "DU61/i9-11900H",
    "internal_model": "DU61",
    "physical_specs": {
      "dimensions": "357*226*19mm",
      "material": "Aluminum Alloy (A Cover) + Plastic Composite (B/C/D Covers)",
      "color": "Silver",
      "weight": "1.7KG±20g"
    },
    "display": {
      "size": "15.6 inches",
      "details": "15.6-inch HD Screen (1920*1080) Aspect Ratio: 16:9 / Material: IPS Panel / Refresh Rate: 60Hz"
    },
    "hardware": {
      "cpu_info": {
        "model": "Intel® Core™ i9-11900H Processor",
        "graphics": "Intel® UHD Graphics",
        "cores": "8",
        "threads": "16",
        "max_freq": "4.9GHz",
        "base_freq": "2.5GHz",
        "cache": "6MB",
        "tdp": "45W"
      },
      "benchmark": {
        "tool": "Master Lu",
        "score": ""
      },
      "ram": {
        "type": "DDR4 16GB/2666MHz (Removable/Upgradable), Supports 32G (Single Slot)"
      },
      "storage": {
        "type": "1 x M.2 2280 Interface, Supports NVMe PCIe 4.0"
      }
    },
    "peripherals": {
      "camera": "HD Web Camera, 1.0MP",
      "keyboard_language": "US English",
      "keyboard_backlight": "Backlit Keyboard",
      "touchpad": "Material: PC + Spray Coating with Fingerprint",
      "audio": {
        "speakers": "Built-in Dual Speakers",
        "mic": "Supports Digital Microphone"
      }
    },
    "battery_power": {
      "battery_type": "Rechargeable Lithium-ion Polymer Battery 11.55V",
      "capacity": "5000mAh/57.75Wh",
      "adapter": "Input 100-240V AC, 50/60Hz Universal, Output 20V/5A",
      "indicator_light": "Not Charging/On: Light solid on\nStandby: Light blinking\nOff: Off\nCharging: Red light solid on"
    },
    "interfaces": {
      "left": "Port 1: DC Charging Port 20V5A\nPort 2: Type C Interface\nPort 3: HDMI Port\nPort 4: USB 3.0 Interface\nPort 5: Computer Lock",
      "right": "Port 1: Headphone/Mic Combo Interface\nPort 2: USB 3.0 Interface\nPort 3: USB 3.0 Interface\nPort 4: TF Card Slot"
    },
    "connectivity": {
      "security": "fTPM 2.0",
      "wifi_module": "M.2 2230 Form Factor",
      "wifi_standard": "AX200/AX101",
      "bluetooth": "BT 5.0"
    },
    "os": "Windows11"
  },
  {
    "product_group": "Xiaoxuan Series",
    "specification_name": "Air15/N5095 Product Specification",
    "shop_model": "Air15",
    "internal_model": "V15/XU156",
    "physical_specs": {
      "dimensions": "357*230*20.5mm",
      "material": "Composite Material",
      "color": "Silver, Pink",
      "weight": "1.6KG±20g"
    },
    "display": {
      "size": "15.6 inches",
      "details": "15.6-inch IPS Full Screen (1920*1080) Aspect Ratio: 16:9 / Brightness: 400 nits / Color Gamut: 72% NTSC / Refresh Rate: 60Hz"
    },
    "hardware": {
      "cpu_info": {
        "model": "Intel® Celeron® Processor N5095",
        "graphics": "Intel® UHD Graphics",
        "cores": "4",
        "threads": "4",
        "max_freq": "2.9",
        "base_freq": "2.0GHz",
        "cache": "4M",
        "tdp": "15W"
      },
      "benchmark": {
        "tool": "Master Lu",
        "score": "262022"
      },
      "ram": {
        "type": "LPDDR4 6GB/8GB/12GB/16GB/32GB (Optional) (Onboard Memory)"
      },
      "storage": {
        "type": "M.2 (2280), SATA 3.0"
      }
    },
    "peripherals": {
      "camera": "0.3MP HD Web Camera",
      "keyboard_language": "US English",
      "keyboard_backlight": "Backlit Keyboard",
      "touchpad": "Material: PC + Spray Coating",
      "audio": {
        "speakers": "Built-in Dual Speakers 8Ω/1.0W",
        "mic": "Supports Digital Microphone"
      }
    },
    "battery_power": {
      "battery_type": "Rechargeable Lithium-ion Polymer Battery 7.7V",
      "capacity": "5400mAh/38Wh",
      "adapter": "Input 100-240V AC, 50/60Hz Universal, Output 12V/3A DC Charging",
      "indicator_light": "Not Charging/On: Light solid on\nStandby: Light blinking\nOff: Off\nCharging: Red light solid on"
    },
    "interfaces": {
      "left": "Port 1: USB 3.0\nPort 2: DC Charging Port\nPort 3: mini HDMI Interface",
      "right": "Port 1: USB 2.0\nPort 2: Headphone/Mic Combo Port\nPort 3: TF Card Slot"
    },
    "connectivity": {
      "security": "fTPM 2.0",
      "wifi_module": "M.2 2230 Form Factor",
      "wifi_standard": "Fn-Link6221 - Support 802.11B/G/N&AC",
      "bluetooth": "BT4.2"
    },
    "os": "Windows11/Window10"
  }
]

// 生成 slug
function generateSlug(shopModel: string): string {
  return shopModel
    .toLowerCase()
    .replace(/[®™©]/g, '')
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// 格式化产品规格为 key_specs
function formatKeySpecs(product: any) {
  const specs = []

  // CPU信息
  if (product.hardware?.cpu_info) {
    const cpu = product.hardware.cpu_info
    specs.push({
      label: 'Processor',
      value: cpu.model
    })
    if (cpu.cores) {
      specs.push({
        label: 'CPU Cores/Threads',
        value: `${cpu.cores} Cores / ${cpu.threads} Threads`
      })
    }
    if (cpu.base_freq) {
      specs.push({
        label: 'Base Frequency',
        value: cpu.base_freq
      })
    }
    if (cpu.max_freq && cpu.max_freq !== '/') {
      specs.push({
        label: 'Max Frequency',
        value: cpu.max_freq
      })
    }
    if (cpu.graphics) {
      specs.push({
        label: 'Graphics',
        value: cpu.graphics
      })
    }
  }

  // 内存
  if (product.hardware?.ram?.type) {
    specs.push({
      label: 'Memory',
      value: product.hardware.ram.type
    })
  }

  // 存储
  if (product.hardware?.storage?.type) {
    specs.push({
      label: 'Storage',
      value: product.hardware.storage.type
    })
  }

  // 显示屏
  if (product.display) {
    if (product.display.size) {
      specs.push({
        label: 'Display Size',
        value: product.display.size
      })
    }
    if (product.display.details) {
      specs.push({
        label: 'Display Details',
        value: product.display.details
      })
    }
  }

  // 电池
  if (product.battery_power?.capacity) {
    specs.push({
      label: 'Battery',
      value: product.battery_power.capacity
    })
  }

  // 重量
  if (product.physical_specs?.weight) {
    specs.push({
      label: 'Weight',
      value: product.physical_specs.weight
    })
  }

  // 尺寸
  if (product.physical_specs?.dimensions) {
    specs.push({
      label: 'Dimensions',
      value: product.physical_specs.dimensions
    })
  }

  // 操作系统
  if (product.os) {
    specs.push({
      label: 'Operating System',
      value: product.os
    })
  }

  return specs
}

// 生成产品描述
function generateDescription(product: any): { short: string; long: string } {
  const cpu = product.hardware?.cpu_info?.model || 'Processor'
  const display = product.display?.size || 'Display'
  const ram = product.hardware?.ram?.type || 'Memory'
  const storage = product.hardware?.storage?.type || 'Storage'

  const shortDesc = `${cpu} ${display} Business Laptop with ${ram.includes('GB') ? ram.split(' ')[0] : 'expandable'} memory and ${storage.includes('M.2') ? 'SSD' : 'storage'}.`

  const longDesc = `
<h2>Product Overview</h2>
<p>The ${product.shop_model} is a professional business laptop from the ${product.product_group}, designed for productivity and portability.</p>

<h3>Key Features</h3>
<ul>
  <li><strong>Processor:</strong> ${product.hardware?.cpu_info?.model || 'N/A'}</li>
  <li><strong>Display:</strong> ${product.display?.details || product.display?.size || 'N/A'}</li>
  <li><strong>Memory:</strong> ${product.hardware?.ram?.type || 'N/A'}</li>
  <li><strong>Storage:</strong> ${product.hardware?.storage?.type || 'N/A'}</li>
  ${product.hardware?.cpu_info?.graphics ? `<li><strong>Graphics:</strong> ${product.hardware.cpu_info.graphics}</li>` : ''}
  ${product.battery_power?.capacity ? `<li><strong>Battery:</strong> ${product.battery_power.capacity}</li>` : ''}
  ${product.physical_specs?.weight ? `<li><strong>Weight:</strong> ${product.physical_specs.weight}</li>` : ''}
</ul>

<h3>Connectivity</h3>
<ul>
  ${product.connectivity?.wifi_standard ? `<li><strong>WiFi:</strong> ${product.connectivity.wifi_standard}</li>` : ''}
  ${product.connectivity?.bluetooth ? `<li><strong>Bluetooth:</strong> ${product.connectivity.bluetooth}</li>` : ''}
  ${product.interfaces?.left ? `<li><strong>Left Ports:</strong> ${product.interfaces.left.replace(/\n/g, ', ')}</li>` : ''}
  ${product.interfaces?.right ? `<li><strong>Right Ports:</strong> ${product.interfaces.right.replace(/\n/g, ', ')}</li>` : ''}
</ul>

<h3>Design & Build</h3>
<ul>
  ${product.physical_specs?.material ? `<li><strong>Material:</strong> ${product.physical_specs.material}</li>` : ''}
  ${product.physical_specs?.color ? `<li><strong>Color:</strong> ${product.physical_specs.color}</li>` : ''}
  ${product.physical_specs?.dimensions ? `<li><strong>Dimensions:</strong> ${product.physical_specs.dimensions}</li>` : ''}
</ul>
`.trim()

  return {
    short: shortDesc,
    long: longDesc
  }
}

async function uploadProducts() {
  console.log('开始上传小轩系列商务本产品...\n')

  let successCount = 0
  let failCount = 0

  for (const productData of products) {
    const slug = generateSlug(productData.shop_model)
    console.log(`\n处理产品: ${productData.shop_model}`)
    console.log(`  Slug: ${slug}`)

    try {
      // 检查是否已存在
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('slug', slug)
        .single()

      if (existing) {
        console.log(`  ⚠️  产品已存在,跳过`)
        continue
      }

      // 生成描述
      const { short: shortDesc, long: longDesc } = generateDescription(productData)
      const keySpecs = formatKeySpecs(productData)

      // 插入产品
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          slug: slug,
          category: 'business-laptops',
          images: [],
          status: 'draft',
          featured: false,
          moq: 100,
          price: null,
          sort_order: 0
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
        // 回滚:删除已创建的产品
        await supabase.from('products').delete().eq('id', product.id)
        failCount++
        continue
      }

      console.log(`  ✅ 成功上传`)
      successCount++

    } catch (error: any) {
      console.error(`  ❌ 上传失败:`, error.message)
      failCount++
    }
  }

  console.log('\n\n=== 上传完成 ===')
  console.log(`成功: ${successCount}`)
  console.log(`失败: ${failCount}`)
  console.log(`总计: ${products.length}`)
}

// 运行上传
uploadProducts().catch(console.error)
