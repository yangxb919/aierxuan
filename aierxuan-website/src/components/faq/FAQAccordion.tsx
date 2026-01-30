'use client'

import { useState } from 'react'
import { ChevronDown, Building2, Package, Shield, Truck, Handshake } from 'lucide-react'
import '../../styles/faq.css'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  icon: string
  items: FAQItem[]
}

interface FAQAccordionProps {
  categories: FAQCategory[]
  searchQuery?: string
}

const iconMap: Record<string, typeof Building2> = {
  building: Building2,
  package: Package,
  shield: Shield,
  truck: Truck,
  handshake: Handshake,
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors hover:text-blue-400"
      >
        <span className="text-base font-medium text-white">{question}</span>
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-white/60 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-white/70 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({ categories, searchQuery = '' }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<number>(0)

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // Filter FAQs based on search query
  const filteredCategories = searchQuery
    ? categories.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : categories

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="faq-grid">
          {/* Category Navigation */}
          <div>
            <div className="lg:sticky lg:top-24">
              <nav className="space-y-2">
                {filteredCategories.map((category, index) => {
                  const Icon = iconMap[category.icon] || Building2
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(index)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left ${
                        activeCategory === index
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border border-blue-500/30 text-white'
                          : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.04] text-white/70 hover:text-white'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activeCategory === index
                            ? 'bg-blue-500/20 border border-blue-500/30'
                            : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            activeCategory === index ? 'text-blue-400' : 'text-white/60'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{category.title}</div>
                        <div className="text-sm text-white/50">{category.items.length} questions</div>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div>
            {filteredCategories.length > 0 && filteredCategories[activeCategory] && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  {(() => {
                    const Icon = iconMap[filteredCategories[activeCategory].icon] || Building2
                    return <Icon className="w-6 h-6 text-blue-400" />
                  })()}
                  <h2 className="text-xl font-bold text-white">
                    {filteredCategories[activeCategory].title}
                  </h2>
                </div>

                <div>
                  {filteredCategories[activeCategory].items.map((item, index) => (
                    <FAQItem
                      key={index}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems.has(`${activeCategory}-${index}`)}
                      onToggle={() => toggleItem(`${activeCategory}-${index}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredCategories.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 backdrop-blur text-center">
                <p className="text-white/60">No results found for your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
