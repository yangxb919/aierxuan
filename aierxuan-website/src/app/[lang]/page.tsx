import {
  HeroSectionNew,
  ProductShowcase,
  StatsSection,
  CapabilitiesSection,
  FinalCTASection,
} from '@/components/features/home'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'

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
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      {/* Hero Section - New Dark Theme */}
      <HeroSectionNew dictionary={{ hero: dictionary.home.hero, common: dictionary.common }} />

      {/* Product Showcase */}
      <ProductShowcase
        dictionary={{ categories: dictionary.home.categories, common: dictionary.common }}
        lang={lang}
      />

      {/* Stats & Trust Section */}
      <StatsSection dictionary={{ trustBadges: dictionary.home.trustBadges }} />

      {/* Capabilities Section */}
      <CapabilitiesSection
        dictionary={{
          coreAdvantages: dictionary.home.coreAdvantages,
          manufacturingCapability: dictionary.home.manufacturingCapability,
        }}
        lang={lang}
      />

      {/* Final CTA */}
      <FinalCTASection lang={lang} texts={dictionary.home.finalCTA} />
    </div>
  )
}
