import { HeroSection } from '@/components/features/HeroSection'
import { ProductCategories } from '@/components/features/ProductCategories'
import { CoreAdvantages } from '@/components/features/CoreAdvantages'
import { TrustBadges } from '@/components/features/TrustBadges'
import { ManufacturingCapability } from '@/components/features/ManufacturingCapability'
import { TechnicalCapabilities } from '@/components/features/TechnicalCapabilities'
import { FinalCTA } from '@/components/features/FinalCTA'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection dictionary={{ hero: dictionary.home.hero, common: dictionary.common }} />

      {/* Product Categories */}
      <ProductCategories dictionary={{ categories: dictionary.home.categories, common: dictionary.common }} lang={lang} />

      {/* Core Advantages */}
      {/* Core Advantages */}
      <CoreAdvantages dictionary={dictionary} lang={lang} />

      {/* Trust Badges */}
      <TrustBadges dictionary={dictionary} lang={lang} />

      {/* Manufacturing Capability */}
      <ManufacturingCapability dictionary={dictionary} lang={lang} />

      {/* Technical Capabilities */}
      <TechnicalCapabilities texts={dictionary.home.technicalCapabilities} />

      {/* Final CTA */}
      <FinalCTA lang={lang} texts={dictionary.home.finalCTA} />
    </div>
  )
}
