'use client'

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
      icon: '🏆'
    },
    {
      value: texts.milestones.units.value,
      label: texts.milestones.units.label,
      icon: '📦'
    },
    {
      value: texts.milestones.countries.value,
      label: texts.milestones.countries.label,
      icon: '🌍'
    },
    {
      value: texts.milestones.factory.value,
      label: texts.milestones.factory.label,
      icon: '🏭'
    },
    {
      value: texts.milestones.testing.value,
      label: texts.milestones.testing.label,
      icon: '⚡'
    },
    {
      value: texts.milestones.satisfaction.value,
      label: texts.milestones.satisfaction.label,
      icon: '⭐'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {texts.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:animate-bounce">
                {milestone.icon}
              </div>
              
              {/* Value */}
              <div className="text-4xl sm:text-5xl font-bold text-[#1F4E78] mb-2 group-hover:text-[#2E5C8A] transition-colors duration-300">
                {milestone.value}
              </div>
              
              {/* Label */}
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                {milestone.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Divider */}
        <div className="mt-16 border-t border-gray-200"></div>
      </div>
    </section>
  )
}

