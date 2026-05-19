'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import {
  FeatureTile,
  SectionHeader,
  TechCTA,
  TechHero,
  iconFor,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import { brandFacts } from '@/lib/brand-facts'

interface FAQPageClientProps {
  texts: {
    hero: {
      title: string
      subtitle: string
      searchPlaceholder: string
    }
    categories: Array<{
      title: string
      icon: string
      items: Array<{
        question: string
        answer: string
      }>
    }>
    contact: {
      title: string
      subtitle: string
      contactButton: string
      emailLabel: string
      emailValue: string
      phoneLabel: string
      phoneValue: string
    }
  }
  lang: string
}

export default function FAQPageClient({ texts, lang }: FAQPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(0)

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return texts.categories
    return texts.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          `${item.question} ${item.answer}`.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [searchQuery, texts.categories])

  const active = searchQuery ? filteredCategories[0] : texts.categories[activeCategory] ?? texts.categories[0]

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.faqHero}
        eyebrow={`${brandFacts.moqText} | ${brandFacts.sampleLeadTimeText} Samples | Quality | Logistics`}
        title="Answers for Sourcing, Procurement and Brand Teams"
        subtitle="Fast answers about MOQ, lead time, customization, quality control, payment, logistics, and support."
        primaryLabel="Search Answers"
        secondaryLabel={texts.contact.contactButton}
        secondaryHref={`/${lang}/contact`}
        widgets={[
          {
            title: 'FAQ Coverage',
            rows: [
              { label: 'Company', value: 'Ready', status: 'ok' },
              { label: 'Products', value: 'Ready', status: 'ok' },
              { label: 'Quality', value: 'Ready', status: 'ok' },
              { label: 'Logistics', value: 'Ready', status: 'ok' },
            ],
          },
          {
            title: 'Support Status',
            rows: [
              { label: 'Quote Response', value: brandFacts.responseTimeText, status: 'live' },
              { label: 'Sample Window', value: brandFacts.sampleLeadTimeText },
              { label: 'Sales Team', value: 'Online', status: 'ok' },
            ],
          },
        ]}
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Frequently Asked Questions"
            title="Find Answers Before You Request a Quote"
            description="Grouped by sourcing topic so buyers can quickly understand qualification, customization, quality, logistics and partnership terms."
          />

          <div className="mb-8 flex min-h-14 items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
            <Search className="h-5 w-5 text-blue-600" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={texts.hero.searchPlaceholder}
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
            <aside className="h-fit rounded-xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
              {texts.categories.map((category, index) => (
                <button
                  key={category.title}
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory(index)
                  }}
                  className={`block w-full rounded-lg px-4 py-4 text-left text-sm font-bold transition-colors ${
                    !searchQuery && activeCategory === index
                      ? 'bg-blue-50 text-slate-950'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </aside>

            <div>
              {(searchQuery ? filteredCategories.flatMap((category) => category.items) : active?.items ?? []).map((item) => (
                <details
                  key={item.question}
                  open
                  className="mb-4 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]"
                >
                  <summary className="cursor-pointer list-none text-xl font-black text-slate-950">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-20 text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Support Proof"
            title="Sourcing Support That Reduces Back-and-forth"
            description="The FAQ page turns repeated questions into trust-building proof before the RFQ form."
          />
          <div className="grid gap-5 md:grid-cols-4">
            <FeatureTile icon={iconFor('mail')} title={`${brandFacts.responseTimeText} Quote Response`} description="Structured inquiries can receive practical next steps within one business day." />
            <FeatureTile icon={iconFor('zap')} title={`${brandFacts.sampleLeadTimeText} Samples`} description="Sample timelines depend on configuration, branding and component availability." />
            <FeatureTile icon={iconFor('quality')} title="CE/FCC/RoHS" description="Certification support helps importers prepare for target market requirements." />
            <FeatureTile icon={iconFor('package')} title="Warranty Support" description="After-sales support, RMA coordination and spare parts planning are available." />
          </div>
        </div>
      </section>

      <TechCTA
        title={texts.contact.title}
        description={texts.contact.subtitle}
        href={`/${lang}/contact`}
        label={texts.contact.contactButton}
      />
    </div>
  )
}
