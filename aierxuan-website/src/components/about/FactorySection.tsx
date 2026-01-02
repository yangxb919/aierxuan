import Image from 'next/image'
import { Play, Factory, Settings, Microscope, Package, Box, ShieldCheck } from 'lucide-react'

interface FactorySectionProps {
  texts: {
    title: string
    subtitle: string
    videoTitle: string
    photos: {
      factoryOverview: string
      factoryOverviewDesc: string
      assemblyLine: string
      assemblyLineDesc: string
      testingLab: string
      testingLabDesc: string
      warehouse: string
      warehouseDesc: string
      rdCenter: string
      rdCenterDesc: string
      qualityControl: string
      qualityControlDesc: string
    }
  }
}

export function FactorySection({ texts }: FactorySectionProps) {
  // YouTube video ID
  const youtubeVideoId = 'DB-9Lj-G1Z8'
  
  const photoData = [
    {
      key: 'factoryOverview',
      label: texts.photos.factoryOverview,
      desc: texts.photos.factoryOverviewDesc,
      url: '/images/factory/factory-1.webp',
      alt: 'AIERXUAN Factory Exterior',
      icon: Factory
    },
    {
      key: 'assemblyLine',
      label: texts.photos.assemblyLine,
      desc: texts.photos.assemblyLineDesc,
      url: '/images/factory/factory-2.webp',
      alt: 'Laptop Assembly Line',
      icon: Settings
    },
    {
      key: 'testingLab',
      label: texts.photos.testingLab,
      desc: texts.photos.testingLabDesc,
      url: '/images/factory/factory-3.webp',
      alt: 'Quality Testing Laboratory',
      icon: Microscope
    },
    {
      key: 'warehouse',
      label: texts.photos.warehouse,
      desc: texts.photos.warehouseDesc,
      url: '/images/factory/factory-4.webp',
      alt: 'Warehouse & Logistics',
      icon: Box
    },
    {
      key: 'rdCenter',
      label: texts.photos.rdCenter,
      desc: texts.photos.rdCenterDesc,
      url: '/images/factory/factory-5.webp',
      alt: 'R&D Center',
      icon: Package
    },
    {
      key: 'qualityControl',
      label: texts.photos.qualityControl,
      desc: texts.photos.qualityControlDesc,
      url: '/images/factory/factory-6.webp',
      alt: 'Quality Control Station',
      icon: ShieldCheck
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
            Production Capacity
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {texts.subtitle}
          </p>
        </div>

        {/* Factory Tour Video */}
        <div className="mb-24 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video w-full ring-1 ring-white/10 shadow-2xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="Factory Tour Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-3 mt-6 text-gray-400 justify-center">
             <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-400" />
             </div>
             <span className="text-sm font-medium tracking-wide uppercase">{texts.videoTitle}</span>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoData.map((photo) => {
             const Icon = photo.icon;
             return (
              <div
                key={photo.key}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur border border-white/10 flex items-center justify-center text-blue-400">
                     <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {photo.label}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {photo.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
