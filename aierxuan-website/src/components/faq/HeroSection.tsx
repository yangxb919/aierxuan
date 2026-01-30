'use client'

import { HelpCircle, Search } from 'lucide-react'
import { useState } from 'react'

interface HeroSectionProps {
  texts: {
    title: string
    subtitle: string
    searchPlaceholder: string
  }
  onSearch?: (query: string) => void
}

export function HeroSection({ texts, onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04050a] via-[#070b18] to-[#04050a]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(900px 520px at 50% 0%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(600px 400px at 50% 100%, rgba(34,211,238,0.12), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[160px]" />

      <div className="relative mx-auto max-w-4xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur mb-8">
          <HelpCircle className="h-4 w-4 text-cyan-200" />
          <span className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
            FAQ
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {texts.title}
        </h1>
        <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto">
          {texts.subtitle}
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={texts.searchPlaceholder}
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
