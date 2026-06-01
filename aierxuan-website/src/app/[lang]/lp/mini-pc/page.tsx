import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RFQForm } from '@/components/forms/RFQForm'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import {
  FeatureTile,
  ProcessCards,
  ProofStrip,
  SectionHeader,
  TechCTA,
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
  formatSeoTitle,
  localizedAlternates,
  robotsForLocale,
} from '@/lib/technical-seo'

const pagePath = '/lp/mini-pc'
const heroImage = redesignImages.miniPcLpHero

const meta = {
  title: 'Custom Mini PC OEM Manufacturer for Wholesale Buyers',
  description:
    'Custom mini PC OEM and ODM manufacturing for European distributors, office IT rollouts and embedded integrators. Wholesale Mini PCs, branding, QA and export support from AIERXUAN.',
  keywords:
    'custom mini pc, mini pc wholesale, oem mini pc manufacturer, mini pc supplier, mini pc odm, business mini pc, embedded mini pc',
}

const directAnswers = [
  {
    title: 'Who is this Mini PC OEM page for?',
    text: 'This page is for European distributors, office IT resellers and embedded system integrators that need custom Mini PCs in wholesale quantities, with branding, QA and export support handled by one factory partner.',
  },
  {
    title: 'What can AIERXUAN customize?',
    text: 'AIERXUAN can support Mini PC configuration, memory and storage tiers, port layout planning on available platforms, BIOS and OS image requirements, logo labels, packaging and export documentation.',
  },
  {
    title: 'How does a Mini PC OEM quote start?',
    text: 'Send the target CPU class, RAM and SSD, operating system, I/O requirements, quantity, destination market and branding needs. Sales can return a structured RFQ response within 24 hours.',
  },
]

const valueProps = [
  {
    title: 'OEM / ODM customization',
    description: 'Private label Mini PC programs with configuration planning, brand labels, packaging and software image coordination.',
    icon: iconFor('cpu'),
  },
  {
    title: 'MOQ from 100 units',
    description: `${brandFacts.moqText} for standard platforms, with sample preparation available before wholesale Mini PC orders scale.`,
    icon: iconFor('package'),
  },
  {
    title: 'Factory QA gates',
    description: 'Incoming material checks, burn-in testing, functional inspection and packaging verification before export shipment.',
    icon: iconFor('quality'),
  },
  {
    title: 'Export-ready support',
    description: 'Commercial invoice, packing list, carton labels and CE/FCC/RoHS documentation support for international buyers.',
    icon: iconFor('globe'),
  },
]

const capabilities = [
  ['Business deployment', 'Windows or Linux images, VESA mounting, quiet operation and multi-screen office use.'],
  ['Embedded projects', 'Stable platforms for kiosk, signage, control rooms and light industrial edge workloads.'],
  ['Channel programs', 'Retail carton planning, distributor labels, SKU tiers and repeatable packing standards.'],
  ['EU procurement', 'CE/FCC/RoHS documentation support, export paperwork and shipment coordination for European buyers.'],
]

const scenarios = [
  {
    title: 'Office IT refresh',
    description: 'Compact desktops for call centers, education rooms and branch offices where buyers need predictable replacement cycles.',
  },
  {
    title: 'Digital signage and kiosk',
    description: 'Mini PCs for display networks, self-service kiosks and content playback with stable OS images and port planning.',
  },
  {
    title: 'Embedded integration',
    description: 'Small form factor platforms for integrators building control panels, test benches and edge computing kits.',
  },
]

const processSteps = [
  { title: 'RFQ intake', description: 'Share CPU class, memory, storage, I/O, OS, quantity, destination market and branding scope.' },
  { title: 'Platform match', description: 'Engineering checks available Mini PC platforms, thermal envelope and BOM feasibility.' },
  { title: 'Sample build', description: `Samples are normally prepared in ${brandFacts.sampleLeadTimeText} after specifications are confirmed.` },
  { title: 'QA approval', description: 'Validate image, ports, accessories, packaging and inspection requirements before production.' },
  { title: 'Mass production', description: `Standard production is usually ${brandFacts.standardProductionLeadTimeText}, depending on volume and components.` },
  { title: 'Export handoff', description: 'Ship with labels, packing list, commercial invoice and after-sales communication path.' },
]

const faq = [
  {
    question: 'Can AIERXUAN manufacture custom Mini PCs for wholesale buyers?',
    answer:
      'Yes. AIERXUAN supports custom Mini PC OEM and ODM projects for B2B buyers, including hardware configuration, brand labels, packaging, OS image coordination and export documentation.',
  },
  {
    question: 'What is the MOQ for OEM Mini PC orders?',
    answer: `${brandFacts.moqText} for standard Mini PC platforms. Final MOQ depends on CPU platform, shell availability, branding depth, packaging scope and component supply.`,
  },
  {
    question: 'Can we order samples before wholesale production?',
    answer: `Yes. Samples are available before mass production. Typical sample lead time is ${brandFacts.sampleLeadTimeText} after the target configuration and branding scope are confirmed.`,
  },
  {
    question: 'Which Mini PC specifications can be customized?',
    answer:
      'Buyers can define CPU class, RAM, SSD, wireless module, OS image, labels, packaging, accessories and available I/O options on selected platforms.',
  },
  {
    question: 'Does AIERXUAN support European Mini PC distributors?',
    answer:
      'Yes. The team supports European distributors with wholesale Mini PC programs, CE/FCC/RoHS documentation support, carton labeling, repeatable SKU tiers and export paperwork.',
  },
  {
    question: 'Is this page for retail Mini PC buyers?',
    answer:
      'No. This landing page is built for B2B OEM, ODM and wholesale Mini PC buyers. Retail single-unit orders are not the target workflow.',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const title = formatSeoTitle(meta.title)
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
      audienceType: 'European distributors, office IT resellers and embedded system integrators',
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
          eyebrow="Custom Mini PC OEM | Wholesale Supply | Export Support"
          title="Custom Mini PC OEM Manufacturing for B2B Buyers"
          subtitle="Build a private label Mini PC program for European distribution, office IT deployment or embedded integration with AIERXUAN factory support."
          primaryLabel="Get a Mini PC OEM Quote"
          primaryHref={quoteHref}
          secondaryLabel="Review Capabilities"
          secondaryHref={`/${lang}/lp/mini-pc#capabilities`}
          stats={defaultHeroStatsFor({
            moq: { label: 'MOQ', detail: 'Units' },
            delivery: { label: 'Samples', detail: 'Days' },
            capacity: { label: 'Capacity', detail: '/ Month' },
            clients: { label: 'Global Clients', detail: 'Partners' },
          })}
          widgets={[
            {
              title: 'Quote Inputs',
              rows: [
                { label: 'CPU / Platform', value: 'Required', status: 'warn' },
                { label: 'RAM / SSD tiers', value: 'Required', status: 'warn' },
                { label: 'Quantity', value: 'Required', status: 'warn' },
                { label: 'Destination market', value: 'Required', status: 'warn' },
              ],
            },
            {
              title: 'Factory Gates',
              rows: [
                { label: 'Platform match', value: 'Ready', status: 'ok' },
                { label: 'Sample lead time', value: brandFacts.sampleLeadTimeText, status: 'ok' },
                { label: 'QA inspection', value: '100%', status: 'ok' },
                { label: 'Export docs', value: 'Supported', status: 'ok' },
              ],
            },
          ]}
        />

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Answer-first overview"
              title="Mini PC OEM Supply Without the Retail Noise"
              description="This page is built for buyers comparing custom mini PC, mini PC wholesale and OEM mini PC manufacturer options."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {directAnswers.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Mini PC OEM capability"
              title="What Your Mini PC Program Can Include"
              description="A B2B Mini PC quote needs more than a CPU list. Buyers need platform control, repeatable QA, export paperwork and brand-ready packaging."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {valueProps.map((item) => (
                <FeatureTile
                  key={item.title}
                  light
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {capabilities.map(([title, description]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_20px_54px_rgba(15,23,42,0.08)]">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Use cases"
              title="Built for Business Deployment, Not Consumer Retail"
              description="The Mini PC offer is positioned around repeatable B2B rollouts: offices, signage, kiosks and embedded integration."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <div key={scenario.title} className="rounded-xl border border-white/12 bg-white/[0.045] p-7">
                  <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Factory proof"
              title="Signals B2B Buyers Can Verify"
              description="Use these facts in procurement review before asking for a formal Mini PC OEM quotation."
            />
            <ProofStrip
              metrics={[
                { value: brandFacts.foundedYear, label: 'Founded' },
                { value: brandFacts.unitsShippedShort, label: 'Units Shipped' },
                { value: brandFacts.facilityArea, label: 'Facility Area' },
                { value: brandFacts.productionLines, label: 'Production Lines' },
              ]}
            />
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="OEM process"
              title="From Mini PC RFQ to Export Handoff"
              description="A predictable process helps distributors and integrators compare suppliers on cost, risk and speed."
            />
            <ProcessCards light steps={processSteps} />
          </div>
        </section>

        <section id="rfq" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Mini PC RFQ</div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Get a Mini PC OEM Quote
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  Use the form to send target CPU, RAM, SSD, I/O, operating system, quantity, market and branding scope. A complete brief helps sales return a practical Mini PC OEM quote faster.
                </p>
                <div className="mt-8 grid gap-3 text-sm text-slate-700">
                  {[
                    'Target Mini PC platform or CPU class',
                    'RAM and SSD tiers for wholesale SKUs',
                    'Branding, packaging and label requirements',
                    'Certification and destination market needs',
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
                  className="max-w-none shadow-[0_22px_70px_rgba(15,23,42,0.08)]"
                />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              light
              eyebrow="Mini PC OEM FAQ"
              title="Answer-first Questions for B2B Buyers"
              description="Short, procurement-friendly answers for buyers searching custom mini pc, mini pc wholesale and OEM mini pc manufacturer options."
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

        <TechCTA
          title="Ready to price a private label Mini PC program?"
          description="Send the target platform, quantity, destination market and branding scope. AIERXUAN will turn the brief into a practical OEM quotation path."
          href={quoteHref}
          label="Get a Mini PC OEM Quote"
        />
      </div>
    </>
  )
}
