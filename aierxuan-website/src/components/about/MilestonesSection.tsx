'use client'

import { Trophy, Package, Globe, Factory, Zap, Star } from 'lucide-react'

interface MilestonesSectionProps {
  texts: {
    title: string
    subtitle: string
    milestones: {
      years: { value: string; label: string }
      units: { value: string; label: string }
      countries: { value: string; label: string }
      factory: { value: string; label: string }
      testing: { value: string; label: string }
      satisfaction: { value: string; label: string }
    }
  }
}

export function MilestonesSection({ texts }: MilestonesSectionProps) {
  const milestones = [
    {
      value: texts.milestones.years.value,
      label: texts.milestones.years.label,
      icon: Trophy
    },
    {
      value: texts.milestones.units.value,
      label: texts.milestones.units.label,
      icon: Package
    },
    {
      value: texts.milestones.countries.value,
      label: texts.milestones.countries.label,
      icon: Globe
    },
    {
      value: texts.milestones.factory.value,
      label: texts.milestones.factory.label,
      icon: Factory
    },
    {
      value: texts.milestones.testing.value,
      label: texts.milestones.testing.label,
      icon: Zap
    },
    {
      value: texts.milestones.satisfaction.value,
      label: texts.milestones.satisfaction.label,
      icon: Star
    }
  ]

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-slate-100"
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-6 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {milestone.value}
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                  {milestone.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}