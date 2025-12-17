const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function replaceExtension(url) {
  if (!url) return url
  return url.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp')
}

async function updateProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, images')

  if (error) {
    console.error('Error fetching products:', error)
    return
  }

  let updated = 0
  for (const product of products) {
    if (!product.images || !Array.isArray(product.images)) continue

    const newImages = product.images.map(replaceExtension)
    const hasChanges = JSON.stringify(newImages) !== JSON.stringify(product.images)

    if (hasChanges) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: newImages })
        .eq('id', product.id)

      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError)
      } else {
        console.log(`✓ Updated product ${product.id}`)
        updated++
      }
    }
  }
  console.log(`Products updated: ${updated}`)
}

async function updateBlogs() {
  const { data: blogs, error } = await supabase
    .from('blog_posts')
    .select('id, cover_image')

  if (error) {
    console.error('Error fetching blogs:', error)
    return
  }

  let updated = 0
  for (const blog of blogs) {
    if (blog.cover_image && /\.(png|jpg|jpeg|gif)$/i.test(blog.cover_image)) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ cover_image: replaceExtension(blog.cover_image) })
        .eq('id', blog.id)

      if (updateError) {
        console.error(`Error updating blog ${blog.id}:`, updateError)
      } else {
        console.log(`✓ Updated blog cover ${blog.id}`)
        updated++
      }
    }
  }
  console.log(`Blog covers updated: ${updated}`)
}

async function updateBlogTranslations() {
  const { data: translations, error } = await supabase
    .from('blog_post_translations')
    .select('id, body_md')

  if (error) {
    console.error('Error fetching blog translations:', error)
    return
  }

  let updated = 0
  for (const t of translations) {
    if (!t.body_md) continue

    const newBody = t.body_md.replace(
      /\/uploads\/blog\/[^)\s"']+\.(png|jpg|jpeg|gif)/gi,
      (match) => replaceExtension(match)
    )

    if (newBody !== t.body_md) {
      const { error: updateError } = await supabase
        .from('blog_post_translations')
        .update({ body_md: newBody })
        .eq('id', t.id)

      if (updateError) {
        console.error(`Error updating translation ${t.id}:`, updateError)
      } else {
        console.log(`✓ Updated blog translation ${t.id}`)
        updated++
      }
    }
  }
  console.log(`Blog translations updated: ${updated}`)
}

async function main() {
  console.log('Updating database image URLs...\n')
  await updateProducts()
  console.log('')
  await updateBlogs()
  console.log('')
  await updateBlogTranslations()
  console.log('\nDone!')
}

main().catch(console.error)
