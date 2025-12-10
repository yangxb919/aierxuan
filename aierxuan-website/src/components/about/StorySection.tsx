'use client'

import { BookOpen, Target } from 'lucide-react'

interface StorySectionProps {
  texts: {
    title: string
    subtitle?: string
    paragraph1: string
    paragraph2: string
    paragraph3?: string
  }
}

export function StorySection({ texts }: StorySectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Title & visual context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {texts.title}
              </h2>
              {texts.subtitle && (
                <div className="flex items-center gap-3 text-blue-600 font-medium text-lg">
                  <div className="w-8 h-0.5 bg-blue-600 rounded-full" />
                  <p>{texts.subtitle}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
              <p className="text-lg">
                {texts.paragraph1}
              </p>
              <p className="text-lg">
                {texts.paragraph2}
              </p>
              {texts.paragraph3 && (
                <p className="text-lg">
                  {texts.paragraph3}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}