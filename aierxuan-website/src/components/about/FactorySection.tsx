'use client'

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
      url: '/images/factory/factory-1.webp',
      alt: 'AIERXUAN Factory Exterior'
    },
    {
      key: 'assemblyLine',
      label: texts.photos.assemblyLine,
      desc: texts.photos.assemblyLineDesc,
      url: '/images/factory/factory-2.webp',
      alt: 'Laptop Assembly Line'
    },
    {
      key: 'testingLab',
      label: texts.photos.testingLab,
      desc: texts.photos.testingLabDesc,
      url: '/images/factory/factory-3.webp',
      alt: 'Quality Testing Laboratory'
    },
    {
      key: 'warehouse',
      label: texts.photos.warehouse,
      desc: texts.photos.warehouseDesc,
      url: '/images/factory/factory-4.webp',
      alt: 'Warehouse & Logistics'
    },
    {
      key: 'rdCenter',
      label: texts.photos.rdCenter,
      desc: texts.photos.rdCenterDesc,
      url: '/images/factory/factory-5.webp',
      alt: 'R&D Center'
    },
    {
      key: 'qualityControl',
      label: texts.photos.qualityControl,
      desc: texts.photos.qualityControlDesc,
      url: '/images/factory/factory-6.webp',
      alt: 'Quality Control Station'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {texts.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>
        </div>

        {/* Factory Tour Video */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            {texts.videoTitle}
          </h3>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video max-w-5xl mx-auto ring-1 ring-slate-200/60">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="Factory Tour Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-slate-500 text-center mt-4">
            * Video can be replaced with actual factory tour footage
          </p>
        </div>

        {/* Photo Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoData.map((photo) => (
            <div
              key={photo.key}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-slate-200/60"
            >
              <div className="aspect-[4/3] bg-slate-200">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white text-xl font-bold">
                    {photo.label}
                  </h4>
                </div>
              </div>
              {/* Label below image */}
              <div className="bg-white p-5 border-t border-slate-200">
                <h4 className="text-slate-900 font-semibold text-center mb-1 text-lg">
                  {photo.label}
                </h4>
                <p className="text-slate-600 text-sm text-center">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note about placeholders */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 italic">
            * Photo placeholders will be replaced with actual factory photos
          </p>
        </div>
      </div>
    </section>
  )
}

