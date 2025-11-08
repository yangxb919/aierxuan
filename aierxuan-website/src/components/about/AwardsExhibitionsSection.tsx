'use client'

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
    { src: '/images/events/exhibitions-1.jpg', alt: 'Trade show photo with customers at booth' },
    { src: '/images/events/exhibitions-2.jpg', alt: 'Team showcasing AIERXUAN laptops with partners' },
    { src: '/images/events/exhibitions-3.jpg', alt: 'Trade fair customer photo' },
    { src: '/images/events/exhibitions-4.jpg', alt: 'Booth meeting discussing product details' }
  ]

  const intelAwards = [
    { src: '/images/events/intel-1.jpg', alt: 'Intel processor and AIERXUAN branding display' },
    { src: '/images/events/intel-2.jpg', alt: 'Award ceremony photo with company name on screen' },
    { src: '/images/events/intel-3.jpg', alt: 'Intel conference stage award moment' },
    { src: '/images/events/intel-4.jpg', alt: 'Intel summit wide shot with winners on stage' }
  ]

  const Block = ({ title, desc, items }: { title: string; desc: string; items: { src: string; alt: string }[] }) => (
    <div className="bg-slate-50 rounded-2xl p-8 shadow-sm ring-1 ring-slate-200/60 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <p className="text-slate-600 mt-2">{desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((img, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-xl bg-slate-200 aspect-[4/3] ring-1 ring-slate-300/60">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">{texts.title}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mt-4">{texts.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Block title={texts.exhibitionsTitle} desc={texts.exhibitionsDesc} items={exhibitions} />
          <Block title={texts.intelTitle} desc={texts.intelDesc} items={intelAwards} />
        </div>
      </div>
    </section>
  )
}

