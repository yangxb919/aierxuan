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
      icon: Trophy,
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      value: texts.milestones.units.value,
      label: texts.milestones.units.label,
      icon: Package,
      gradient: 'from-violet-500 to-purple-400'
    },
    {
      value: texts.milestones.countries.value,
      label: texts.milestones.countries.label,
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-400'
    },
    {
      value: texts.milestones.factory.value,
      label: texts.milestones.factory.label,
      icon: Factory,
      gradient: 'from-amber-500 to-orange-400'
    },
    {
      value: texts.milestones.testing.value,
      label: texts.milestones.testing.label,
      icon: Zap,
      gradient: 'from-pink-500 to-rose-400'
    },
    {
      value: texts.milestones.satisfaction.value,
      label: texts.milestones.satisfaction.label,
      icon: Star,
      gradient: 'from-indigo-500 to-blue-400'
    }
  ]

  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            Company Growth
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                {/* Icon */}
                <div className={`w-12 h-12 mx-auto mb-6 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${milestone.gradient} shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {milestone.value}
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-gray-400">
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
