import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import {
  HeroSection,
  ServicesSection,
  ProcessSection,
  CapabilitiesSection,
  CertificationsSection,
  CTASection,
} from '@/components/oem'
import { SITE_URL } from '@/lib/site-url'

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
  }
}

interface OEMPageProps {
  params: Promise<{ lang: Locale }>
}

export default async function OEMPage({ params }: OEMPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.oem

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#05060a] via-[#05060a] to-[#070b18] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(900px 500px at 20% 0%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(900px 520px at 90% 20%, rgba(34,211,238,0.12), transparent 62%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
          }}
        />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <HeroSection texts={texts.hero} lang={lang} />

        {/* OEM vs ODM Services */}
        <ServicesSection texts={texts.services} />

        {/* Cooperation Process */}
        <ProcessSection texts={texts.process} />

        {/* Product Capabilities */}
        <CapabilitiesSection texts={texts.capabilities} />

        {/* Certifications & Partners */}
        <CertificationsSection texts={texts.certifications} />

        {/* CTA Section */}
        <CTASection texts={texts.cta} lang={lang} />
      </div>
    </div>
  )
}
