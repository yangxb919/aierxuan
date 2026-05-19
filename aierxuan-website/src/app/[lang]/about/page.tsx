import { Metadata } from 'next'
import { type Locale } from '@/i18n-config'
import { SITE_URL } from '@/lib/site-url'
import { buildOgTwitter } from '@/lib/seo'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { Award, Cpu, Handshake, PackageCheck, Presentation, ShieldCheck, Truck, Users } from 'lucide-react'
import {
  ProofStrip,
  SectionHeader,
  TechCTA,
  TechHero,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import { brandFacts, brandFactText } from '@/lib/brand-facts'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: `About AIERXUAN - Professional Laptop & PC Manufacturer Since ${brandFacts.foundedYear}`,
      description: 'Learn about AIERXUAN, a Shenzhen-based OEM/ODM manufacturer specializing in laptops, mini PCs and industrial computers. ISO 9001 certified factory.',
      keywords: 'about aierxuan, laptop manufacturer, shenzhen factory, oem odm, iso certified',
    },
    ru: {
      title: `О компании AIERXUAN — Производитель ноутбуков и ПК с ${brandFacts.foundedYear} года`,
      description: 'Узнайте об AIERXUAN — OEM/ODM производителе ноутбуков, мини-ПК и промышленных компьютеров в Шэньчжэне. Сертификация ISO 9001.',
      keywords: 'об aierxuan, производитель ноутбуков, фабрика Шэньчжэнь, OEM ODM, сертификация ISO',
    },
  }
  const seo = metaByLang[lang] ?? metaByLang.en

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/about`,
      languages: {
        'x-default': `${SITE_URL}/en/about`,
        'en': `${SITE_URL}/en/about`,
        'ru': `${SITE_URL}/ru/about`,
      },
    },
    ...buildOgTwitter({ lang, title: seo.title, description: seo.description, path: '/about' }),
  }
}

interface AboutPageProps {
  params: Promise<{ lang: Locale }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const localizedFacts = brandFactText[lang === 'ru' ? 'ru' : 'en']

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.aboutHero}
        eyebrow="Professional Laptop & Mini PC Manufacturer"
        title="Built in Shenzhen for Reliable Computing Brands"
        subtitle={localizedFacts.companySummary}
        widgets={[
          {
            title: 'Facility Overview',
            rows: [
              { label: 'Factory System', value: 'Active', status: 'live' },
              { label: 'Monthly Capacity', value: brandFacts.monthlyCapacity },
              { label: 'Quality Control', value: 'ISO', status: 'ok' },
            ],
          },
          {
            title: 'Global Reach',
            rows: [
              { label: 'Countries', value: brandFacts.countriesServed, status: 'ok' },
              { label: 'Clients', value: brandFacts.globalClients },
              { label: 'Units Shipped', value: brandFacts.unitsShippedShort },
            ],
          },
        ]}
      />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Real Factory Evidence"
            title="Real Factory Photos Buyers Can Verify"
            description="The original factory photos are now the main credibility layer: production line, assembly benches, testing workstations, packing and on-site buyer visits."
          />

          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.22fr] lg:items-start">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Factory Visit View</div>
              <h3 className="mt-5 text-3xl font-black leading-tight text-slate-950">
                Real photos should carry the trust, while the interface keeps the premium technology tone.
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                These images come from the original About page assets. The new layout treats them like audit evidence: buyers can quickly see the workshop, workers, testing flow, packing area and visitor walkthroughs.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {factoryHighlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <div className="mt-3 text-sm font-bold text-slate-950">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[220px]">
              {factoryPhotos.map((photo) => (
                <EvidencePhoto key={photo.title} {...photo} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ProofStrip />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Operational Proof"
            title="Real Scenes Behind the Supplier Story"
            description="Instead of only icon cards, this section pairs each trust claim with a real factory or customer-facing image from the original site."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {operationalProof.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="group overflow-hidden rounded-xl border border-white/12 bg-white/[0.045] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.075]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-slate-950/70 text-cyan-200 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Events and Partner Records"
            title="Real Customer and Intel Program Photos"
            description="These original event images add human proof: exhibitions, customer conversations, product showcases and channel recognition."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {eventGroups.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-600 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-950">{group.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {group.images.map((image) => (
                      <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Company Timeline"
            title="Growth Built Around Computing Hardware"
            description="A compact timeline gives buyers a fast read on maturity and long-term supplier fit."
          />
          <div className="grid gap-4 md:grid-cols-5">
            {[
              [brandFacts.foundedYear, 'AIERXUAN is founded in Shenzhen and begins laptop and computing hardware operations.'],
              [brandFacts.intelPartnerSince, 'Intel channel partnership strengthens platform access.'],
              ['2021', 'Mini PC and industrial computing programs expand.'],
              ['2024', 'Global export catalog and OEM workflows mature.'],
              ['2026', 'Digital experience rebuilt for global sourcing teams.'],
            ].map(([year, copy]) => (
              <div key={year} className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                <div className="text-3xl font-black text-slate-950">{year}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Certifications and Trust"
            title="Compliance Proof for Buyer Due Diligence"
            description="Certification cards make market access and quality management visible before a supplier audit."
          />
          <div className="grid gap-5 md:grid-cols-4">
            {[
              ['CE Certification', redesignImages.ce],
              ['FCC Compliance', redesignImages.fcc],
              ['RoHS Compliant', redesignImages.rohs],
              ['ISO 9001', redesignImages.iso],
            ].map(([title, image]) => (
              <div key={title} className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.045]">
                <div className="relative aspect-[4/3]">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Verified documentation support for international market access.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechCTA
        title="Plan a Factory Visit or Supplier Audit"
        description="Route serious buyers toward audits, samples and production planning with a clearer company credibility page."
        href={`/${lang}/contact`}
      />
    </div>
  )
}

type EvidencePhotoProps = {
  title: string
  tag: string
  image: string
  layout: string
  position?: string
}

const factoryHighlights: Array<{ label: string; detail: string; icon: LucideIcon }> = [
  { label: 'Production Line', detail: 'Assembly benches and workshop flow', icon: Cpu },
  { label: 'QC Station', detail: 'Testing and inspection scenes', icon: ShieldCheck },
  { label: 'Packing Area', detail: 'Shipment preparation evidence', icon: PackageCheck },
  { label: 'Buyer Visit', detail: 'On-site walkthrough photos', icon: Users },
]

const factoryPhotos: EvidencePhotoProps[] = [
  {
    title: 'Assembly Line',
    tag: 'Real workshop photo',
    image: '/images/factory/factory-2.webp',
    layout: 'lg:col-span-3 lg:row-span-2',
    position: 'object-center',
  },
  {
    title: 'Buyer Factory Visit',
    tag: 'On-site review',
    image: '/images/factory/factory-5.webp',
    layout: 'lg:col-span-3',
    position: 'object-center',
  },
  {
    title: 'Quality Control Station',
    tag: 'QC workflow',
    image: '/images/factory/factory-6.webp',
    layout: 'lg:col-span-3',
    position: 'object-center',
  },
  {
    title: 'Testing Workstations',
    tag: 'Production floor',
    image: '/images/factory/factory-3.webp',
    layout: 'lg:col-span-2',
    position: 'object-center',
  },
  {
    title: 'Packing and Logistics',
    tag: 'Shipment prep',
    image: '/images/factory/factory-4.webp',
    layout: 'lg:col-span-2',
    position: 'object-center',
  },
  {
    title: 'Factory Equipment',
    tag: 'Facility view',
    image: '/images/factory/factory-1.webp',
    layout: 'lg:col-span-2',
    position: 'object-center',
  },
]

const operationalProof: Array<{ title: string; description: string; image: string; icon: LucideIcon }> = [
  {
    title: 'Integrated Production',
    description: 'Real production-line photography shows that buyers are not only seeing abstract capability claims.',
    image: '/images/factory/factory-1.webp',
    icon: Cpu,
  },
  {
    title: 'Quality Workflow',
    description: 'QC workstations and inspection areas support sample review, burn-in checks and shipment verification.',
    image: '/images/factory/factory-6.webp',
    icon: ShieldCheck,
  },
  {
    title: 'Shipment Preparation',
    description: 'Packing and warehouse photos help overseas buyers understand export readiness before placing orders.',
    image: '/images/factory/factory-4.webp',
    icon: Truck,
  },
  {
    title: 'Customer Conversations',
    description: 'Trade-show and meeting photos give the About page a more human, supplier-facing credibility layer.',
    image: '/images/events/exhibitions-4.webp',
    icon: Handshake,
  },
]

const eventGroups: Array<{
  title: string
  description: string
  icon: LucideIcon
  images: Array<{ src: string; alt: string }>
}> = [
  {
    title: 'International Exhibitions',
    description: 'Customer meetings, product demos and booth conversations from the original About page image library.',
    icon: Presentation,
    images: [
      { src: '/images/events/exhibitions-1.webp', alt: 'Trade show customers visiting AIERXUAN booth' },
      { src: '/images/events/exhibitions-2.webp', alt: 'Business meeting with laptop samples' },
      { src: '/images/events/exhibitions-3.webp', alt: 'Customer photo at electronics exhibition' },
      { src: '/images/events/exhibitions-4.webp', alt: 'Product discussion at trade fair table' },
    ],
  },
  {
    title: 'Intel Channel Recognition',
    description: 'Partner-event photos help connect AIERXUAN with platform programs and computing hardware channels.',
    icon: Award,
    images: [
      { src: '/images/events/intel-1.webp', alt: 'Intel event display with AIERXUAN branding' },
      { src: '/images/events/intel-2.webp', alt: 'Intel award ceremony photo' },
      { src: '/images/events/intel-3.webp', alt: 'Intel conference stage recognition' },
      { src: '/images/events/intel-4.webp', alt: 'Intel partner summit audience and stage' },
    ],
  },
]

function EvidencePhoto({ title, tag, image, layout, position = 'object-center' }: EvidencePhotoProps) {
  return (
    <div
      className={`group relative min-h-[250px] overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.14)] lg:min-h-0 ${layout}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className={`object-cover ${position} transition-transform duration-700 group-hover:scale-105`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">{tag}</div>
        <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
      </div>
    </div>
  )
}
