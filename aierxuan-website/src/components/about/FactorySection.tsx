'use client'

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
  // YouTube video ID - can be changed later
  const youtubeVideoId = 'reX_Rmg9_jk'
  
  const photoData = [
    {
      key: 'factoryOverview',
      label: texts.photos.factoryOverview,
      desc: texts.photos.factoryOverviewDesc,
      url: '/images/factory/factory-1.webp?v=2',
      alt: 'AIERXUAN Factory Exterior',
      icon: Factory
    },
    {
      key: 'assemblyLine',
      label: texts.photos.assemblyLine,
      desc: texts.photos.assemblyLineDesc,
      url: '/images/factory/factory-2.webp?v=2',
      alt: 'Laptop Assembly Line',
      icon: Settings
    },
    {
      key: 'testingLab',
      label: texts.photos.testingLab,
      desc: texts.photos.testingLabDesc,
      url: '/images/factory/factory-3.webp?v=2',
      alt: 'Quality Testing Laboratory',
      icon: Microscope
    },
    {
      key: 'warehouse',
      label: texts.photos.warehouse,
      desc: texts.photos.warehouseDesc,
      url: '/images/factory/factory-4.webp?v=2',
      alt: 'Warehouse & Logistics',
      icon: Box
    },
    {
      key: 'rdCenter',
      label: texts.photos.rdCenter,
      desc: texts.photos.rdCenterDesc,
      url: '/images/factory/factory-5.webp?v=2',
      alt: 'R&D Center',
      icon: Package
    },
    {
      key: 'qualityControl',
      label: texts.photos.qualityControl,
      desc: texts.photos.qualityControlDesc,
      url: '/images/factory/factory-6.webp?v=2',
      alt: 'Quality Control Station',
      icon: ShieldCheck
    }
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            {texts.subtitle}
          </p>
        </div>

        {/* Factory Tour Video */}
        <div className="mb-24">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 aspect-video w-full ring-1 ring-slate-900/5">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="Factory Tour Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-3 mt-6 text-slate-500 justify-center">
             <Play className="w-4 h-4" />
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
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {photo.label}
                    </h4>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
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