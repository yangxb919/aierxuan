import { BookOpen } from 'lucide-react'

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
    <section className="relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
      }}/>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Title & visual context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
              <span className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">Our Journey</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                {texts.title}
              </h2>
              {texts.subtitle && (
                 <p className="text-xl text-blue-300 font-medium border-l-4 border-blue-500 pl-4">
                  {texts.subtitle}
                </p>
              )}
            </div>
            
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30 flex-shrink-0">
                     <BookOpen className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold mb-2">Since 2013</h4>
                      <p className="text-sm text-gray-400">Founded with a vision to revolutionize computing hardware manufacturing.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                {texts.paragraph1}
              </p>
              <p>
                {texts.paragraph2}
              </p>
              {texts.paragraph3 && (
                <p>
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
