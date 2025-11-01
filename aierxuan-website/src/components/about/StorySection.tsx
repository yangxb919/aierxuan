'use client'

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
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Title - Increased from 32px to 40px */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            {texts.title}
          </h2>

          {/* Subtitle */}
          {texts.subtitle && (
            <p className="text-xl text-[#1F4E78] font-semibold -mt-4">
              {texts.subtitle}
            </p>
          )}

          {/* Paragraphs */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-left sm:text-center">
              {texts.paragraph1}
            </p>
            <p className="text-left sm:text-center">
              {texts.paragraph2}
            </p>
            {texts.paragraph3 && (
              <p className="text-left sm:text-center">
                {texts.paragraph3}
              </p>
            )}
          </div>

          {/* Optional: Founder Quote Section */}
          {/* Uncomment when founder photo is available
          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="https://placehold.co/200x200/1F4E78/FFFFFF?text=Founder"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-xl italic text-gray-600 max-w-2xl">
                "Our mission is to empower the youth generation with cutting-edge AI technology and high-performance computing solutions."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Founder Name</p>
                <p className="text-sm text-gray-600">Founder & CEO</p>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  )
}

