import assert from 'node:assert/strict'
import test from 'node:test'

import {
  absolutizeSiteUrl,
  buildProductJsonLd,
  stripDuplicateMarkdownH1,
  toCanonicalWwwUrl,
} from '../src/lib/technical-seo'

test('toCanonicalWwwUrl removes deployment port when redirecting bare domain', () => {
  const url = toCanonicalWwwUrl('https://aierxuanlaptop.com:3000/en/products?x=1')

  assert.equal(url.toString(), 'https://www.aierxuanlaptop.com/en/products?x=1')
})

test('toCanonicalWwwUrl always canonicalizes to HTTPS', () => {
  const url = toCanonicalWwwUrl('http://aierxuanlaptop.com/en/products')

  assert.equal(url.toString(), 'https://www.aierxuanlaptop.com/en/products')
})

test('absolutizeSiteUrl converts root-relative URLs and preserves absolute URLs', () => {
  assert.equal(
    absolutizeSiteUrl('/uploads/products/demo.webp'),
    'https://www.aierxuanlaptop.com/uploads/products/demo.webp',
  )
  assert.equal(
    absolutizeSiteUrl('https://cdn.example.com/demo.webp'),
    'https://cdn.example.com/demo.webp',
  )
})

test('buildProductJsonLd uses meaningful fallbacks for Product schema', () => {
  const schema = buildProductJsonLd({
    lang: 'en',
    slug: 'air15-ultra-i7-6600u',
    name: 'AIR15 Ultra i7 Business Laptop',
    shortDescription: '',
    images: ['/uploads/products/air15.webp'],
    price: 299,
    category: 'business-laptop',
  })

  assert.equal(schema['@type'], 'Product')
  assert.equal(schema.name, 'AIR15 Ultra i7 Business Laptop')
  assert.equal(
    schema.description,
    'AIR15 Ultra i7 Business Laptop is an AIERXUAN OEM/ODM business laptop for B2B buyers, distributors, and custom hardware projects.',
  )
  assert.equal(schema.image, 'https://www.aierxuanlaptop.com/uploads/products/air15.webp')
  assert.equal(schema.category, 'business-laptop')
  assert.equal(schema.url, 'https://www.aierxuanlaptop.com/en/products/air15-ultra-i7-6600u')
})

test('stripDuplicateMarkdownH1 removes only the first matching markdown H1', () => {
  const markdown = '# Custom Laptop Manufacturing: Complete Guide for Brands 2025\n\nIntro text.\n\n# Different Appendix\n\nMore.'

  assert.equal(
    stripDuplicateMarkdownH1(markdown, 'Custom Laptop Manufacturing: Complete Guide for Brands 2025'),
    'Intro text.\n\n# Different Appendix\n\nMore.',
  )
})
