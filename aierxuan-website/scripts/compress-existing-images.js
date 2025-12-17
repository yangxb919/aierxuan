const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const UPLOADS_DIR = path.join(__dirname, '../public/uploads')
const QUALITY = 80
const MAX_WIDTH = 1920

async function compressImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) return null

  const dir = path.dirname(inputPath)
  const basename = path.basename(inputPath, ext)
  const outputPath = path.join(dir, `${basename}.webp`)

  // Skip if already webp or already converted
  if (ext === '.webp' || fs.existsSync(outputPath)) return null

  const originalSize = fs.statSync(inputPath).size

  try {
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    const newSize = fs.statSync(outputPath).size
    const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1)

    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (saved ${saved}%)`)

    return {
      original: inputPath,
      converted: outputPath,
      originalSize,
      newSize
    }
  } catch (err) {
    console.error(`✗ Failed: ${inputPath}`, err.message)
    return null
  }
}

async function processDirectory(dir) {
  const results = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      results.push(...await processDirectory(filePath))
    } else {
      const result = await compressImage(filePath)
      if (result) results.push(result)
    }
  }

  return results
}

async function main() {
  console.log('Starting image compression...\n')

  const results = await processDirectory(UPLOADS_DIR)

  if (results.length === 0) {
    console.log('\nNo images to compress.')
    return
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0)
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0)
  const totalSaved = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)

  console.log(`\n========================================`)
  console.log(`Compressed ${results.length} images`)
  console.log(`Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`New: ${(totalNew / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Saved: ${totalSaved}%`)
  console.log(`========================================`)

  // Output mapping for database update
  console.log('\n--- URL Mapping (for database update) ---')
  results.forEach(r => {
    const oldUrl = r.original.replace(path.join(__dirname, '../public'), '')
    const newUrl = r.converted.replace(path.join(__dirname, '../public'), '')
    console.log(`${oldUrl} → ${newUrl}`)
  })
}

main().catch(console.error)
