import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import { HeroSection, StorySection, CTASection, FactorySection, QualitySection, MilestonesSection, AwardsExhibitionsSection } from '@/components/about'

interface AboutPageProps {
  params: Promise<{ lang: Locale }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.about

  return (
    <div className="min-h-screen">
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
  )
}
