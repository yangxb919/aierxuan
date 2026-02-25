import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import { HeroSection, StorySection, CTASection, FactorySection, QualitySection, MilestonesSection, AwardsExhibitionsSection } from '@/components/about'
import { SITE_URL } from '@/lib/site-url'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: 'About AIERXUAN - Professional Laptop & PC Manufacturer Since 2017',
      description: 'Learn about AIERXUAN, a Shenzhen-based OEM/ODM manufacturer specializing in laptops, mini PCs and industrial computers. ISO 9001 certified factory.',
      keywords: 'about aierxuan, laptop manufacturer, shenzhen factory, oem odm, iso certified',
    },
    ru: {
      title: 'О компании AIERXUAN — Производитель ноутбуков и ПК с 2017 года',
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
  }
}

interface AboutPageProps {
  params: Promise<{ lang: Locale }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.about

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
        {/* Module 1: Hero Section */}
        <HeroSection texts={texts.hero} />

        {/* Module 2: Our Story */}
        <StorySection texts={texts.story} />

        {/* Module 3: Factory Capability */}
        <FactorySection texts={texts.factory} />

        {/* Module 4: Quality Assurance */}
        <QualitySection texts={texts.quality} />

        {/* Module 5: Exhibitions & Intel Awards */}
        <AwardsExhibitionsSection texts={texts.events} />

        {/* Module 5: Milestones */}
        <MilestonesSection texts={texts.milestones} />

        {/* Module 8: CTA Section */}
        <CTASection texts={texts.cta} />
      </div>
    </div>
  )
}
