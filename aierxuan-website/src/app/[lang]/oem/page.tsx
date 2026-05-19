import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import { SITE_URL } from '@/lib/site-url'
import { buildOgTwitter } from '@/lib/seo'
import {
  FeatureTile,
  ProcessCards,
  SectionHeader,
  TechCTA,
  TechHero,
  iconFor,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import { brandFacts } from '@/lib/brand-facts'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang as Locale)
  const texts = dictionary.oem

  return {
    title: texts.meta.title,
    description: texts.meta.description,
    keywords: texts.meta.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/oem`,
      languages: {
        'x-default': `${SITE_URL}/en/oem`,
        'en': `${SITE_URL}/en/oem`,
        'ru': `${SITE_URL}/ru/oem`,
      },
    },
    ...buildOgTwitter({ lang, title: texts.meta.title, description: texts.meta.description, path: '/oem' }),
  }
}

interface OEMPageProps {
  params: Promise<{ lang: Locale }>
}

function normalizeOemTexts(texts: any) {
  return {
    hero: {
      badge: texts.hero.badge ?? 'OEM / ODM',
      title: texts.hero.title,
      subtitle: texts.hero.subtitle,
      description: texts.hero.description ?? texts.hero.subtitle,
      ctaQuote: texts.hero.ctaQuote ?? texts.cta?.ctaButton ?? 'Get Quote',
      ctaCatalog: texts.hero.ctaCatalog ?? 'Browse Products',
      stats: texts.hero.stats,
    },
    services: {
      title: texts.services.title,
      subtitle: texts.services.subtitle,
      oem: {
        title: texts.services.oem.title,
        description: texts.services.oem.description,
        features: texts.services.oem.features,
        moq: texts.services.oem.moq ?? texts.services.oem.ideal ?? texts.services.oem.subtitle ?? '',
      },
      odm: {
        title: texts.services.odm.title,
        description: texts.services.odm.description,
        features: texts.services.odm.features,
        moq: texts.services.odm.moq ?? texts.services.odm.ideal ?? texts.services.odm.subtitle ?? '',
      },
    },
    process: {
      title: texts.process.title,
      subtitle: texts.process.subtitle,
      steps: texts.process.steps.map((step: any) => ({
        title: step.title,
        description: step.description,
        duration: step.duration ?? step.number ?? '',
      })),
    },
    capabilities: {
      title: texts.capabilities.title,
      subtitle: texts.capabilities.subtitle,
      categories: texts.capabilities.categories.map((category: any) => ({
        name: category.name ?? category.title,
        description: category.description,
        specs: category.specs,
      })),
    },
    certifications: {
      title: texts.certifications.title,
      subtitle: texts.certifications.subtitle,
      certifications: texts.certifications.certifications ?? texts.certifications.items ?? [],
      partners: {
        title: texts.certifications.partners?.title ?? texts.certifications.partnersLabel ?? 'Technology Partners',
        items: Array.isArray(texts.certifications.partners)
          ? texts.certifications.partners
          : texts.certifications.partners?.items ?? [],
      },
    },
    cta: {
      title: texts.cta.title,
      subtitle: texts.cta.subtitle,
      primaryCta: texts.cta.primaryCta ?? texts.cta.ctaButton ?? 'Get Quote',
      secondaryCta: texts.cta.secondaryCta ?? texts.hero.ctaCatalog ?? 'Browse Products',
      features: texts.cta.features,
    },
  }
}

export default async function OEMPage({ params }: OEMPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = normalizeOemTexts(dictionary.oem)
  const heroSubtitle = `Custom laptops and Mini PCs with ${brandFacts.moqText.toLowerCase()}, certified quality, and global delivery.`

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.oemHero}
        eyebrow={`${brandFacts.moqText} | ${brandFacts.sampleLeadTimeText} Samples | CE/FCC/RoHS Certified Factory`}
        title="OEM/ODM Manufacturing From Sample to Shipment"
        subtitle={heroSubtitle}
        primaryLabel={texts.hero.ctaQuote}
        secondaryLabel="View Process"
        secondaryHref={`/${lang}/oem#process`}
        widgets={[
          {
            title: 'Project Pipeline',
            rows: [
              { label: 'Brief Review', value: brandFacts.responseTimeText, status: 'live' },
              { label: 'Samples', value: brandFacts.sampleLeadTimeText, status: 'ok' },
              { label: 'Standard Production', value: brandFacts.standardProductionLeadTimeText, status: 'ok' },
              { label: 'Custom Branding', value: 'Ready' },
            ],
          },
          {
            title: 'QA Gate',
            rows: [
              { label: 'BOM Check', value: '100%', status: 'ok' },
              { label: 'Burn-in Test', value: '72h', status: 'ok' },
              { label: 'MOQ', value: brandFacts.moq, status: 'ok' },
              { label: 'Export Docs', value: 'Ready', status: 'ok' },
            ],
          },
        ]}
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Choose Your Manufacturing Model"
            title="OEM vs ODM Services"
            description="Pick the cooperation model that fits your business stage, R&D budget and launch timeline."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                label: 'OEM Manufacturing',
                title: 'Your Design, Our Factory',
                desc: texts.services.oem.description,
                features: texts.services.oem.features,
              },
              {
                label: 'ODM Solutions',
                title: 'Our Platform, Your Brand',
                desc: texts.services.odm.description,
                features: texts.services.odm.features,
              },
            ].map((service) => (
              <div key={service.label} className="rounded-xl border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{service.label}</div>
                <h3 className="mt-4 text-3xl font-black text-slate-950">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{service.desc}</p>
                <ul className="mt-6 space-y-3">
                  {service.features.slice(0, 5).map((feature: string) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <span className="mt-1 h-2 w-2 shrink-0 bg-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative overflow-hidden bg-[#070b12] py-24 text-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Cooperation Process"
            title="A Predictable Path From Brief to Delivery"
            description="Each project moves through a clear sequence, so sourcing teams know when samples, approval and production happen."
          />
          <ProcessCards
            steps={[
              { title: 'Consultation', description: 'Define target market, SKU, volume and price band.' },
              { title: 'Solution Design', description: 'Confirm BOM, industrial design and timeline.' },
              { title: 'Sample Production', description: 'Build samples with brand elements and software.' },
              { title: 'Quality Approval', description: 'Test, refine and freeze final specifications.' },
              { title: 'Mass Production', description: 'Produce with QC checkpoints and progress updates.' },
              { title: 'Delivery & Support', description: 'Ship with documents, warranty and spare parts support.' },
            ]}
          />
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="What You Can Customize"
            title="Brand, Hardware, Software and Compliance"
            description="The page makes customization depth clear before buyers contact sales."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Logo & ID Finish', 'Logo, shell texture, labels and exterior identity.', iconFor('package')],
              ['Packaging System', 'Retail box, manuals, carton labels and accessories.', iconFor('package')],
              ['BIOS & Boot Screen', 'Brand startup visuals and firmware configuration.', iconFor('cpu')],
              ['OS Image & Drivers', 'Windows or Linux image, drivers and app preload.', iconFor('cpu')],
              ['Keyboard Layout', 'Regional languages and business-specific layouts.', iconFor('zap')],
              ['CPU/RAM/SSD', 'Configuration tiers for budget and performance targets.', iconFor('cpu')],
              ['Colorway & Shell', 'Exterior finish, color planning and mechanical options.', iconFor('quality')],
              ['Certification Support', 'CE, FCC, RoHS and export documentation support.', iconFor('globe')],
            ].map(([title, description, icon]) => (
              <FeatureTile key={title as string} light title={title as string} description={description as string} icon={icon} />
            ))}
          </div>
        </div>
      </section>

      <TechCTA
        title={texts.cta.title}
        description={`Send target SKU, volume, country, certifications and branding requirements for a ${brandFacts.responseTimeText} response.`}
        href={`/${lang}/contact`}
        label={texts.cta.primaryCta}
      />
    </div>
  )
}
