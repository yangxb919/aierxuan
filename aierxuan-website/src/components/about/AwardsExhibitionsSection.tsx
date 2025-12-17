'use client'

import { Trophy, Presentation } from 'lucide-react'

interface AwardsExhibitionsProps {
  texts: {
    title: string
    subtitle: string
    exhibitionsTitle: string
    intelTitle: string
    exhibitionsDesc: string
    intelDesc: string
  }
}

export function AwardsExhibitionsSection({ texts }: AwardsExhibitionsProps) {
  const exhibitions = [
    { src: '/images/events/exhibitions-1.webp', alt: 'Trade show photo with customers at booth' },
    { src: '/images/events/exhibitions-2.webp', alt: 'Team showcasing AIERXUAN laptops with partners' },
    { src: '/images/events/exhibitions-3.webp', alt: 'Trade fair customer photo' },
    { src: '/images/events/exhibitions-4.webp', alt: 'Booth meeting discussing product details' }
  ]

  const intelAwards = [
    { src: '/images/events/intel-1.webp', alt: 'Intel processor and AIERXUAN branding display' },
    { src: '/images/events/intel-2.webp', alt: 'Award ceremony photo with company name on screen' },
    { src: '/images/events/intel-3.webp', alt: 'Intel conference stage award moment' },
    { src: '/images/events/intel-4.webp', alt: 'Intel summit wide shot with winners on stage' }
  ]

  const Block = ({ title, desc, items, icon: Icon }: { title: string; desc: string; items: { src: string; alt: string }[], icon: any }) => (
    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
        <div className="flex items-start gap-4 max-w-2xl">
           <div className="w-12 h-12 rounded-xl bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-600">
              <Icon className="w-6 h-6" />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed">{desc}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((img, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
            <img 
               src={img.src} 
               alt={img.alt} 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6">{texts.title}</h2>
          <p className="text-xl text-slate-600">{texts.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <Block title={texts.exhibitionsTitle} desc={texts.exhibitionsDesc} items={exhibitions} icon={Presentation} />
          <Block title={texts.intelTitle} desc={texts.intelDesc} items={intelAwards} icon={Trophy} />
        </div>
      </div>
    </section>
  )
}