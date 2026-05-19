import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { ProductsClient } from '@/components/features/ProductsClient'
import { Locale } from '@/i18n-config'
import { SITE_URL } from '@/lib/site-url'
import { buildOgTwitter } from '@/lib/seo'
import {
  ProductFamilyCard,
  ProofStrip,
  SectionHeader,
  TechCTA,
  TechHero,
  productFamilies,
  redesignImages,
} from '@/components/redesign/TechPrimitives'

// ISR: 每30分钟重新生成
export const revalidate = 1800

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang as Locale)
  const texts = dictionary.products.page

  const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: 'Products - Laptops, Mini PCs & Industrial Computers | AIERXUAN',
      description: 'Browse AIERXUAN full range of OEM/ODM laptops, gaming notebooks, mini PCs and industrial computing solutions. Custom configurations available.',
      keywords: 'laptops, mini pc, gaming laptop, industrial computer, oem laptop, odm notebook',
    },
    ru: {
      title: 'Продукция — Ноутбуки, мини-ПК и промышленные компьютеры | AIERXUAN',
      description: 'Полный каталог OEM/ODM ноутбуков, игровых ноутбуков, мини-ПК и промышленных компьютеров AIERXUAN. Индивидуальные конфигурации.',
      keywords: 'ноутбуки, мини-ПК, игровой ноутбук, промышленный компьютер, OEM ноутбук',
    },
  }
  const seo = metaByLang[lang] ?? metaByLang.en

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/products`,
      languages: {
        'x-default': `${SITE_URL}/en/products`,
        'en': `${SITE_URL}/en/products`,
        'ru': `${SITE_URL}/ru/products`,
      },
    },
    ...buildOgTwitter({ lang, title: seo.title, description: seo.description, path: '/products' }),
  }
}

export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<{ category?: string }>
}) {
  const { lang } = await params
  const { category } = await searchParams
  const dictionary = await getDictionary(lang)
  const texts = dictionary.products.page

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.productsHero}
        eyebrow="50+ Models | MOQ 100+ | Fast Samples"
        title="Product Portfolio for Global Hardware Brands"
        subtitle="Laptops, gaming notebooks, and Mini PCs ready for OEM/ODM customization."
        primaryLabel={dictionary.common.requestQuote}
        secondaryLabel="Compare Products"
        secondaryHref={`/${lang}/products#compare`}
        widgets={[
          {
            title: 'Category Mix',
            rows: [
              { label: 'Business Laptops', value: '42%', status: 'live' },
              { label: 'Gaming Laptops', value: '24%' },
              { label: 'Mini PCs', value: '28%' },
              { label: 'Custom SKUs', value: '6%' },
            ],
          },
          {
            title: 'Catalog Readiness',
            rows: [
              { label: 'ODM Platforms', value: 'Ready', status: 'ok' },
              { label: 'Private Label', value: 'Ready', status: 'ok' },
              { label: 'Certifications', value: 'CE/FCC', status: 'ok' },
            ],
          },
        ]}
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="All Product Families"
            title="Built for Sourcing Teams to Compare Fast"
            description="Start with the family, then request the exact CPU, memory, storage, display, branding and certification requirements."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {productFamilies.map((family) => (
              <ProductFamilyCard key={family.title} family={family} href={`/${lang}/products?category=all`} />
            ))}
          </div>
          <div className="mt-8">
            <ProofStrip />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative overflow-hidden bg-[#070b12] py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Live Catalog"
            title={texts.allProducts}
            description="Browse current uploaded products and send quote requests from the product card."
          />
          <ProductsClient
            lang={lang}
            dictionary={dictionary.products}
            initialCategory={category}
          />
        </div>
      </section>

      <section id="compare" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Configuration Snapshot"
            title="Key Specs Buyers Usually Compare"
            description="Use this quick matrix to decide the right family before requesting a private configuration."
          />
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-950">
                <tr>
                  {['Category', 'Typical Size', 'Core Options', 'Best For', 'MOQ'].map((head) => (
                    <th key={head} className="px-5 py-4 font-bold">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr className="transition-colors hover:bg-blue-50/70"><td className="px-5 py-4 font-semibold text-slate-900">Business Laptop</td><td className="px-5 py-4">14-15.6 inch</td><td className="px-5 py-4">Intel Core / N-series</td><td className="px-5 py-4">Education, office, distributors</td><td className="px-5 py-4">100+</td></tr>
                <tr className="transition-colors hover:bg-blue-50/70"><td className="px-5 py-4 font-semibold text-slate-900">Gaming Laptop</td><td className="px-5 py-4">15.6-17.3 inch</td><td className="px-5 py-4">High refresh / discrete graphics</td><td className="px-5 py-4">Gaming retail channels</td><td className="px-5 py-4">100+</td></tr>
                <tr className="transition-colors hover:bg-blue-50/70"><td className="px-5 py-4 font-semibold text-slate-900">Mini PC</td><td className="px-5 py-4">Compact desktop</td><td className="px-5 py-4">Intel / AMD, VESA, fanless</td><td className="px-5 py-4">Signage, kiosk, office, industrial</td><td className="px-5 py-4">100+</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <TechCTA
        title="Need a Private Configuration?"
        description="Send the model, CPU, memory, storage, destination market, logo and packaging requirements for a practical quote."
        href={`/${lang}/contact`}
      />
    </div>
  )
}
