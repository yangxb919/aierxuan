import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import {
  FeatureTile,
  ProcessCards,
  ProductFamilyCard,
  ProofStrip,
  SectionHeader,
  TechCTA,
  TechHero,
  iconFor,
  productFamilies,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import Image from 'next/image'

// ISR: 每小时重新生成
export const revalidate = 3600

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.homeHero}
        eyebrow="Intel Partner | CE/FCC Certified"
        title="OEM/ODM Laptop & Mini PC Manufacturing"
        subtitle="Custom computing hardware for global brands, delivered from Shenzhen with certified quality."
        primaryLabel={dictionary.common.requestQuote}
        secondaryLabel={dictionary.common.viewProducts}
        widgets={[
          {
            title: 'Production Status',
            rows: [
              { label: 'Line 03', value: 'Running', status: 'live' },
              { label: 'QA Pass Rate', value: '99.8%', status: 'ok' },
              { label: 'On-Time Delivery', value: '98%' },
              { label: 'Monthly Output', value: '50,000+' },
            ],
          },
          {
            title: 'Quality System',
            rows: [
              { label: 'IQC', value: '100%', status: 'ok' },
              { label: 'IPQC', value: '100%', status: 'ok' },
              { label: 'FQC', value: '100%', status: 'ok' },
              { label: 'OQC', value: '100%', status: 'ok' },
            ],
          },
        ]}
      />

      <section id="products" className="relative overflow-hidden bg-slate-50 py-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 opacity-40" style={{ backgroundImage: 'linear-gradient(90deg, rgba(37,99,235,0.12), transparent)' }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Our Products"
            title="Computing Solutions Built For Your Business"
            description="A comprehensive range of laptops and Mini PCs engineered for performance, reliability, and enterprise deployment."
          />
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Private-label ready</div>
                <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950">From product idea to export-ready hardware.</h3>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  Business laptops, gaming notebooks, Mini PCs and custom configurations for distributors, education, offices, industrial projects and regional brands.
                </p>
              </div>
              <a href={`/${lang}/products`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                View All Products
                <span>→</span>
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {productFamilies.map((family) => (
                <ProductFamilyCard key={family.title} family={family} href={`/${lang}/products`} />
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
            eyebrow="Precision Manufacturing"
            title="Factory Capability You Can Show Buyers"
            description="Replace empty dark scroll areas with proof: automated production, quality testing, logistics support and certified export readiness."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative min-h-[460px] overflow-hidden rounded-xl border border-white/12">
              <Image src={redesignImages.factory} alt="AIERXUAN manufacturing facility" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/86 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Advanced Manufacturing</div>
                <h3 className="mt-3 text-3xl font-black">Automated assembly and inspection lines</h3>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureTile icon={iconFor('quality')} title="Quality Testing" description="Incoming inspection, production checks, burn-in testing and final verification before shipment." />
              <FeatureTile icon={iconFor('cpu')} title="Configuration Control" description="CPU, memory, storage, display, BIOS, OS image and regional keyboard options." />
              <FeatureTile icon={iconFor('package')} title="Branding & Packaging" description="Logo, shell finish, labels, manuals and retail box systems for your market." />
              <FeatureTile icon={iconFor('truck')} title="Global Logistics" description="Export documents, certifications, carton planning and worldwide delivery coordination." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Cooperation Flow"
            title="From Requirement to Shipment"
            description="A clear sourcing path helps buyers understand what happens after they send an inquiry."
          />
          <ProcessCards
            light
            steps={[
              { title: 'Consult', description: 'Share product type, target market, configuration and volume.' },
              { title: 'Proposal', description: 'Receive BOM, pricing range, sample plan and production timeline.' },
              { title: 'Sample', description: 'Validate hardware, branding, packaging and software image.' },
              { title: 'Confirm', description: 'Freeze specifications and quality acceptance standards.' },
              { title: 'Produce', description: 'Mass production with quality checkpoints and status updates.' },
              { title: 'Deliver', description: 'Export documents, logistics tracking and after-sales support.' },
            ]}
          />
        </div>
      </section>

      <TechCTA
        title="Ready to Build Your Next Hardware Line?"
        description="Send your target configuration and branding requirements. Our team can respond with practical options for samples, MOQ, certifications and delivery."
        href={`/${lang}/contact`}
      />
    </div>
  )
}
