import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8')
}

test('EN mini PC landing page is wired for SEO and lead tracking', () => {
  const page = read('src/app/[lang]/lp/mini-pc/page.tsx')
  const sitemap = read('src/app/sitemap.ts')
  const rfqForm = read('src/components/forms/RFQForm.tsx')

  assert.match(page, /Get a Mini PC OEM Quote/)
  assert.match(page, /trackingSource="lp_mini_pc"/)
  assert.match(page, /BreadcrumbJsonLd/)
  assert.match(page, /FAQJsonLd/)
  assert.match(page, /formatSeoTitle/)
  assert.match(page, /localizedAlternates\('\/lp\/mini-pc'\)/)
  assert.match(sitemap, /\/lp\/mini-pc/)
  assert.match(rfqForm, /trackingSource/)
  assert.match(rfqForm, /source: trackingSource/)
})
