import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { RFQForm } from '@/components/forms/RFQForm'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import {
  FeatureTile,
  ProcessCards,
  ProofStrip,
  SectionHeader,
  TechHero,
  defaultHeroStatsFor,
  iconFor,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import { getDictionary } from '@/get-dictionary'
import type { Locale } from '@/i18n-config'
import { brandFacts } from '@/lib/brand-facts'
import { SITE_URL } from '@/lib/site-url'
import { buildOgTwitter } from '@/lib/seo'
import {
  canonicalForLocale,
  formatSeoDescription,
  localizedAlternates,
  robotsForLocale,
} from '@/lib/technical-seo'

const pagePath = '/lp/mini-pc'
const heroImage = redesignImages.miniPcLpHero

const meta = {
  title: 'Custom Mini PC Manufacturer | OEM/ODM Supplier — AIERXUAN',
  description:
    'Shenzhen OEM/ODM mini PC manufacturer. Custom mini PCs for business, office & embedded use. MOQ from 100, 7–15 day samples, CE/FCC/RoHS certified.',
  keywords:
    'custom mini pc, mini pc manufacturer, oem mini pc supplier, mini pc wholesale, industrial mini pc, embedded mini pc',
}

const proofLine = '10+ years manufacturing · Intel Partner since 2019 · 500,000+ units shipped · 50+ countries served'

const sellingPoints = [
  {
    title: 'OEM / ODM Customization',
    description:
      'Build your own mini PC line without a factory of your own. We customize CPU, RAM, storage, ports, chassis, BIOS, boot logo, and packaging to match your product roadmap and target market.',
    icon: iconFor('cpu'),
  },
  {
    title: 'Low MOQ, Flexible Volumes',
    description:
      'Start at MOQ from 100 units and scale to high-volume runs. Samples available from 1–10 units so you can validate the product before committing to a production order.',
    icon: iconFor('package'),
  },
  {
    title: 'Quality You Can Audit',
    description:
      'Every unit passes functional QC and an aging test before shipment. Our facility is ISO 9001 and ISO 14001 certified, with 6 production lines and a monthly capacity of 50,000+ units backing your order.',
    icon: iconFor('quality'),
  },
  {
    title: 'Certification & Compliance',
    description:
      'Mini PCs ship CE, FCC, and RoHS certified for global market access. We support your import paperwork and can assist with region-specific certification such as EAC for Russia/EAEU. Per-model certification status is confirmed before quoting.',
    icon: iconFor('globe'),
  },
  {
    title: 'Export & Logistics',
    description:
      'We ship to 50+ countries and work on flexible Incoterms — EXW, FOB, CIF, or DDP — so you can choose the landed-cost model that fits your supply chain. Lithium-battery-free mini PCs simplify air and sea freight.',
    icon: iconFor('truck'),
  },
  {
    title: 'Fast Sampling',
    description:
      'Get a working sample in 7–15 days. Standard production runs 15–25 days; large orders 25–45 days; rush builds in 3–5 days subject to component availability.',
    icon: iconFor('zap'),
  },
]

const processSteps = [
  {
    title: 'Share Your Requirements',
    description: 'Send us your use case, target specs, volume, and branding needs. We respond within 24 hours.',
  },
  {
    title: 'Get a Quote & Spec Sheet',
    description: 'Receive a tailored configuration, pricing by volume tier, and a draft datasheet.',
  },
  {
    title: 'Approve a Sample',
    description: 'We build and ship a sample (7–15 days) for your validation and testing.',
  },
  {
    title: 'Mass Production',
    description: 'On approval, we run production with full QC and aging tests (15–25 days standard).',
  },
  {
    title: 'Ship & Support',
    description: 'We handle export documentation and logistics to your port or door, with after-sales support.',
  },
]

const audiences = [
  {
    title: 'European & Global Distributors',
    description:
      'Add a reliable, certified mini PC line to your catalog under your own brand, with dependable lead times and restocking.',
  },
  {
    title: 'Corporate & Office IT Procurement',
    description:
      'Standardize on compact, low-power desktops for office deployment, tuned to your spec and image.',
  },
  {
    title: 'Embedded & System Integrators',
    description:
      'Source mini PC platforms for your integrated solutions, with custom I/O and configuration support. Industrial-grade and wide-temperature requirements are confirmed before quoting.',
  },
  {
    title: 'Digital Signage & Kiosk Operators',
    description:
      'Compact, always-on players for signage and kiosk networks, with fanless or multi-display SKU availability confirmed before quoting.',
  },
]

const trustStatement =
  'AIERXUAN is a Shenzhen-based OEM/ODM laptop and mini PC manufacturer founded in 2014. From a 15,000㎡ facility with 6 production lines and 50,000+ units of monthly capacity, we have shipped 500,000+ units to 500+ clients across 50+ countries. As an Intel Partner since 2019, with ISO 9001 and ISO 14001 certified operations, we build mini PCs that meet CE, FCC, and RoHS standards.'

const trustPoints = [
  ['Founded', '2014 (10+ years)'],
  ['Intel Partner since', '2019'],
  ['Units shipped', '500,000+'],
  ['Countries served', '50+'],
  ['Global clients', '500+'],
  ['Facility', '15,000㎡, Longgang District, Shenzhen, China'],
  ['Production lines', '6'],
  ['Monthly capacity', '50,000+ units'],
  ['Team', '200+'],
  ['Product certifications', 'CE · FCC · RoHS'],
  ['Facility certifications', 'ISO 9001 · ISO 14001'],
  ['First response time', 'within 24 hours'],
]

const proofImages = [
  {
    src: redesignImages.oemAssemblyLine,
    alt: 'AIERXUAN OEM production line for custom mini PC and laptop assembly',
    label: 'Production line',
    caption: '6 production lines backing standard and high-volume mini PC orders.',
  },
  {
    src: redesignImages.oemQcLab,
    alt: 'AIERXUAN QC inspection lab for mini PC functional testing',
    label: 'QC inspection',
    caption: 'Functional QC and aging tests before shipment.',
  },
  {
    src: redesignImages.oemPackagingExport,
    alt: 'AIERXUAN export packaging and logistics preparation for B2B hardware orders',
    label: 'Export packaging',
    caption: 'Packing, labels and export documentation for global delivery.',
  },
]

const faq = [
  {
    question: 'What is your minimum order quantity (MOQ) for mini PCs?',
    answer:
      'MOQ starts at 100 units. Samples are available from 1–10 units so you can evaluate quality before placing a production order. Exact MOQ depends on the configuration and level of customization.',
  },
  {
    question: 'How much can I customize?',
    answer:
      'Extensively. We customize CPU, RAM, storage, ports, chassis, BIOS, boot logo, and packaging. You can ship a fully white-label mini PC under your own brand.',
  },
  {
    question: 'How long does sampling take?',
    answer:
      'A working sample ships in 7–15 days. After sample approval, standard production takes 15–25 days, large orders 25–45 days, and rush builds 3–5 days subject to component availability.',
  },
  {
    question: 'Are your mini PCs certified?',
    answer:
      'Yes — mini PCs ship CE, FCC, and RoHS certified for global market access. For region-specific requirements such as EAC (Russia/EAEU), we assist with the certification process. Per-model certification status is confirmed before quoting.',
  },
  {
    question: 'What are your payment terms and Incoterms?',
    answer:
      'We work on flexible Incoterms — EXW, FOB, CIF, or DDP — chosen to fit your supply chain. Typical payment terms are a deposit on order with balance before shipment.',
  },
  {
    question: 'What is the production lead time for a bulk order?',
    answer:
      'Standard production is 15–25 days; large orders 25–45 days. Lead time is confirmed in your quote based on volume and component availability.',
  },
  {
    question: 'Do you offer a warranty and after-sales support?',
    answer:
      'Yes — we provide after-sales support and handle defective-unit (RMA) cases. Warranty terms are confirmed in your quote.',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const title = meta.title
  const description = formatSeoDescription(meta.description)

  return {
    title,
    description,
    keywords: meta.keywords,
    robots: lang === 'en' ? robotsForLocale(lang) : { index: false, follow: true },
    alternates: {
      canonical: canonicalForLocale(lang, pagePath),
      languages: localizedAlternates('/lp/mini-pc'),
    },
    ...buildOgTwitter({ lang, title, description, path: pagePath, image: heroImage }),
  }
}

interface MiniPcLandingPageProps {
  params: Promise<{ lang: Locale }>
}

export default async function MiniPcLandingPage({ params }: MiniPcLandingPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const quoteHref = `/${lang}/lp/mini-pc#rfq`
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Mini PC OEM and ODM Manufacturing',
    serviceType: 'OEM/ODM Mini PC manufacturing and wholesale supply',
    url: `${SITE_URL}/${lang}${pagePath}`,
    description: meta.description,
    provider: {
      '@type': ['Organization', 'Manufacturer'],
      name: brandFacts.name,
      url: SITE_URL,
      foundingDate: brandFacts.foundedYear,
      address: {
        '@type': 'PostalAddress',
        streetAddress: brandFacts.address.streetAddress,
        addressLocality: brandFacts.address.locality,
        addressRegion: brandFacts.address.region,
        addressCountry: brandFacts.address.countryCode,
      },
    },
    areaServed: ['Europe', 'Worldwide'],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Distributors, system integrators, corporate buyers, digital signage operators and kiosk operators',
    },
  }

  return (
    <>
      <BreadcrumbJsonLd
        lang={lang}
        items={[
          { name: 'Home', href: '' },
          { name: 'Mini PC OEM', href: pagePath },
        ]}
      />
      <FAQJsonLd items={faq} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0f]">
        <TechHero
          lang={lang}
          image={heroImage}
          eyebrow="Custom Mini PC | OEM/ODM Supplier | Mini PC Wholesale"
          title="Custom Mini PCs, Built to Your Spec and Brand"
          subtitle="AIERXUAN is a Shenzhen-based OEM/ODM mini PC manufacturer. We help distributors, system integrators, and corporate buyers source fully customized mini PCs — your configuration, your branding, your certifications — from sample to bulk production."
          primaryLabel="Request a Quote"
          primaryHref={quoteHref}
          secondaryLabel="Download Mini PC Catalog"
          secondaryHref={quoteHref}
          proofLine={proofLine}
          stats={defaultHeroStatsFor({
            moq: { label: 'MOQ', detail: 'Units' },
            delivery: { label: 'Samples', detail: 'Days' },
            capacity: { label: 'Monthly Capacity', detail: 'Units' },
            clients: { label: 'Global Clients', detail: 'B2B' },
          })}
          widgets={[
            {
              title: 'Quote Inputs',
              rows: [
                { label: 'Use case', value: 'Required', status: 'warn' },
                { label: 'Target specs', value: 'Required', status: 'warn' },
                { label: 'Volume', value: 'Required', status: 'warn' },
                { label: 'Branding needs', value: 'Required', status: 'warn' },
              ],
            },
            {
              title: 'Verified Facts',
              rows: [
                { label: 'Response time', value: '24h', status: 'ok' },
                { label: 'Samples', value: '7–15 days', status: 'ok' },
                { label: 'Production', value: '15–25 days', status: 'ok' },
                { label: 'Certifications', value: 'CE/FCC/RoHS', status: 'ok' },
              ],
            },
          ]}
        />

        <section id="capabilities" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Core selling points"
              title="Build a Mini PC Line Without Owning the Factory"
              description="Six operational reasons to choose AIERXUAN as your custom mini PC manufacturer and OEM mini PC supplier."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sellingPoints.map((item) => (
                <FeatureTile
                  key={item.title}
                  light
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="OEM ordering process"
              title="From Requirement Brief to Export Support"
              description="A five-step workflow for Mini PC wholesale buyers moving from first quote to repeatable supply."
            />
            <ProcessCards light steps={processSteps} />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Who it's for"
              title="Mini PC Programs for Buyers With Repeat Demand"
              description="The page is built for commercial procurement, distribution, integration and deployment teams rather than single-unit retail buyers."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {audiences.map((audience) => (
                <div key={audience.title} className="rounded-xl border border-white/12 bg-white/[0.045] p-7">
                  <h2 className="text-xl font-bold text-white">{audience.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Trust / credibility"
              title="Verified Factory Facts for Procurement Review"
              description={trustStatement}
            />
            <ProofStrip
              metrics={[
                { value: brandFacts.foundedYear, label: 'Founded' },
                { value: brandFacts.unitsShipped, label: 'Units Shipped' },
                { value: brandFacts.countriesServed, label: 'Countries Served' },
                { value: brandFacts.monthlyCapacity, label: 'Monthly Capacity' },
              ]}
            />
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_54px_rgba(15,23,42,0.08)]">
                <div className="grid grid-cols-[1fr_1.1fr] bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  <span>Proof point</span>
                  <span>Value</span>
                </div>
                {trustPoints.map(([point, value]) => (
                  <div key={point} className="grid grid-cols-[1fr_1.1fr] border-t border-slate-200 px-5 py-3 text-sm">
                    <span className="font-semibold text-slate-700">{point}</span>
                    <span className="text-slate-950">{value}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {proofImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={index === 0 ? 'sm:col-span-2' : ''}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-slate-100 shadow-[0_20px_54px_rgba(15,23,42,0.1)]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={index === 0 ? '(min-width: 1024px) 42vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'}
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-950">{image.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Mini PC OEM FAQ"
              title="Answer-first Questions for B2B Buyers"
              description="Procurement-friendly answers for buyers comparing custom mini pc, mini pc manufacturer, mini pc wholesale and embedded mini pc options."
            />
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_16px_44px_rgba(15,23,42,0.06)]">
                  <h2 className="text-lg font-bold text-slate-950">{item.question}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rfq" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Mini PC RFQ</div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Ready to Build Your Mini PC Line?
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  Tell us your specs and volume — we'll send a tailored quote and datasheet within 24 hours.
                </p>
                <div className="mt-8 grid gap-3 text-sm text-slate-700">
                  {[
                    'Use case and target specs',
                    'Volume and sample requirements',
                    'Target market and certification needs',
                    'Branding, packaging and logistics scope',
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-blue-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <Suspense fallback={<div className="flex justify-center py-12"><div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" /></div>}>
                <RFQForm
                  lang={lang}
                  dictionary={dictionary.rfq}
                  variant="light"
                  productSlug="custom-mini-pc-oem"
                  trackingSource="lp_mini_pc"
                  title="Get Your Custom Mini PC Quote"
                  subtitle="Share your requirements below. The more detail you give on configuration, volume, target market, and branding, the faster we can quote."
                  submitButtonLabel="Request My Quote"
                  reassuranceText="No obligation · Response within 24 hours · Your details stay confidential"
                  className="max-w-none shadow-[0_22px_70px_rgba(15,23,42,0.08)]"
                />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
