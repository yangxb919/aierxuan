import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(new URL('..', import.meta.url).pathname)

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath))
}

function collectHrefValues(value, out = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectHrefValues(item, out))
    return out
  }
  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      if (key === 'href' && typeof nested === 'string') out.push(nested)
      collectHrefValues(nested, out)
    }
  }
  return out
}

const residualArticleSlugs = [
  'barebones-laptop-kit-oem-solutions',
  'best-mini-pc-gaming-2025-oem',
  'custom-gaming-laptop-manufacturing-oem',
  'custom-laptop-builder-specifications-guide',
  'how-to-build-custom-laptop-b2b-guide',
  'how-to-choose-laptop-manufacturer-b2b-guide',
  'mini-pc-digital-signage-commercial',
  'mini-pc-digital-signage-commercial-solutions',
  'mini-pc-wholesale-b2b-pricing-moq-guide',
]

const checks = [
  [
    'public localized routes do not emit NextResponse.next from proxy',
    () => {
      const proxy = read('src/proxy.ts')
      assert(!/return\s+NextResponse\.next\(\)/.test(proxy))
    },
  ],
  [
    'sitemap alternates include x-default for indexable URLs',
    () => {
      const sitemap = read('src/app/sitemap.ts')
      assert(sitemap.includes("'x-default'"))
    },
  ],
  [
    'unsupported public locales are marked noindex instead of entering sitemap',
    () => {
      const layout = read('src/app/[lang]/layout.tsx')
      const sitemap = read('src/app/sitemap.ts')
      assert(layout.includes('robotsForLocale'))
      assert(sitemap.includes("const locales = ['en', 'ru']"))
      for (const locale of ['ja', 'fr', 'pt']) {
        assert(!sitemap.includes(`/${locale}`), `${locale} leaked into sitemap`)
      }
    },
  ],
  [
    'legacy blog slugs redirect to current published slugs',
    () => {
      const technicalSeo = read('src/lib/technical-seo.ts')
      const blogPage = read('src/app/[lang]/blog/[slug]/page.tsx')
      assert(technicalSeo.includes('BLOG_SLUG_ALIASES'))
      assert(blogPage.includes('permanentRedirect'))
      for (const slug of [
        ...residualArticleSlugs,
        'oem-vs-odm-manufacturing-complete-guide-2025',
        'mini-pc-wholesale-b2b-pricing-moq',
        'odm-vs-oem-cost-analysis-laptop-manufacturing',
      ]) {
        assert(technicalSeo.includes(slug), `${slug} alias missing`)
      }
    },
  ],
  [
    'markdown body links are normalized away from 404 resources and mailto links',
    () => {
      const technicalSeo = read('src/lib/technical-seo.ts')
      const blogPage = read('src/app/[lang]/blog/[slug]/page.tsx')
      assert(technicalSeo.includes('normalizeInternalMarkdownLinks'))
      assert(blogPage.includes('normalizeInternalMarkdownLinks'))
      for (const pathName of ['/consultation', '/catalog', '/samples', '/resources/mini-pc-spec-guide.pdf', '/resources/oem-rfq-template', '/factory-tour']) {
        assert(technicalSeo.includes(pathName), `${pathName} normalization missing`)
      }
    },
  ],
  [
    'public email rendering avoids Cloudflare email-obfuscation URLs',
    () => {
      const footer = read('src/components/layout/Footer.tsx')
      const contact = read('src/app/[lang]/contact/page.tsx')
      const thankYou = read('src/app/[lang]/thank-you/page.tsx')
      const aboutCta = read('src/components/about/CTASection.tsx')
      const layout = read('src/app/[lang]/layout.tsx')
      assert(footer.includes('SafeEmail'))
      assert(contact.includes('SafeEmail'))
      assert(thankYou.includes('SafeEmail'))
      assert(aboutCta.includes('SafeEmail'))
      assert(!layout.includes('email: brandFacts.contact.email'))
      assert(!aboutCta.includes('admin@aierxuanlaptop.com'))
    },
  ],
  [
    'on-page metadata is length-normalized and duplicate markdown H1 is stripped',
    () => {
      const technicalSeo = read('src/lib/technical-seo.ts')
      const blogPage = read('src/app/[lang]/blog/[slug]/page.tsx')
      const productPage = read('src/app/[lang]/products/[slug]/page.tsx')
      assert(technicalSeo.includes('formatSeoTitle'))
      assert(technicalSeo.includes('formatSeoDescription'))
      assert(technicalSeo.includes('stripMarkdownH1ForArticle'))
      assert(blogPage.includes('formatSeoTitle'))
      assert(blogPage.includes('stripMarkdownH1ForArticle'))
      assert(productPage.includes('formatSeoTitle'))
    },
  ],
  [
    'product detail pages select localized translations by locale (real DB column)',
    () => {
      const productPage = read('src/app/[lang]/products/[slug]/page.tsx')
      // Production product_translations uses the `locale` column (verified against live DB);
      // use a defensive (locale || language_code) lookup so neither raw nor remapped shapes regress.
      assert(productPage.includes('(t.locale || t.language_code) === lang'))
      assert(!productPage.includes('t.language_code === lang'))
    },
  ],
  [
    'tablet navbar uses mobile menu before lg to avoid header overflow',
    () => {
      const navbar = read('src/components/layout/Navbar.tsx')
      assert(navbar.includes('hidden lg:block'))
      assert(navbar.includes('hidden lg:flex'))
      assert(navbar.includes('lg:hidden'))
    },
  ],
  [
    'dictionary resource links do not point to unpublished /support',
    () => {
      for (const locale of ['en', 'ru', 'ja', 'fr', 'pt']) {
        const hrefs = collectHrefValues(readJson(`src/dictionaries/${locale}.json`))
        assert(!hrefs.includes('/support'), `${locale}.json still links to /support`)
      }
    },
  ],
  [
    'zh-CN locale is removed from public runtime code and redirects to /en',
    () => {
      assert(!fs.existsSync(path.join(root, 'src/dictionaries/zh-CN.json')))
      for (const relativePath of [
        'src/i18n-config.ts',
        'src/get-dictionary.ts',
        'src/components/layout/Navbar.tsx',
        'src/lib/technical-seo.ts',
        'src/app/[lang]/layout.tsx',
        'src/app/[lang]/page.tsx',
        'src/app/[lang]/about/page.tsx',
      ]) {
        assert(!read(relativePath).includes('zh-CN'), `${relativePath} still references zh-CN`)
      }

      const proxy = read('src/proxy.ts')
      assert(proxy.includes("pathname === '/zh-CN'"))
      assert(proxy.includes('NextResponse.redirect(url, 301)'))
    },
  ],
  [
    'home and about pages carry copy for all active locales',
    () => {
      const home = read('src/app/[lang]/page.tsx')
      const about = read('src/app/[lang]/about/page.tsx')
      for (const locale of ['en', 'ru', 'ja', 'fr', 'pt']) {
        assert(home.includes(`${locale}: {`), `home copy missing ${locale}`)
        assert(about.includes(`${locale}: {`), `about copy missing ${locale}`)
      }
      assert(!home.includes("lang as 'en' | 'ru'"))
      assert(!about.includes("lang === 'ru' ? 'ru' : 'en'"))
    },
  ],
]

let failed = 0
for (const [name, run] of checks) {
  try {
    run()
    console.log(`ok - ${name}`)
  } catch (error) {
    failed += 1
    console.error(`not ok - ${name}`)
    console.error(`  ${error.message}`)
  }
}

if (failed > 0) {
  console.error(`\n${failed} SEO P0 check(s) failed.`)
  process.exit(1)
}

console.log('\nAll SEO P0 checks passed.')
