import { getDictionary } from '@/get-dictionary'
import { ProductsClient } from '@/components/features/ProductsClient'
import { Locale } from '@/i18n-config'

// ISR: 每30分钟重新生成
export const revalidate = 1800

export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<{ category?: string }>
}) {
  const { lang } = await params
  const { category } = await searchParams
  const dictionary = await getDictionary(lang)
  const texts = dictionary.products.page

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/products-hero-banner.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-[#0a0a0f]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-blue-600" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-violet-600" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">
                OEM/ODM Solutions Available
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {texts.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              {texts.subtitle}
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {texts.description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: '50+', label: 'Product Models' },
                { value: '100+', label: 'MOQ Units' },
                { value: '7-15', label: 'Days Delivery' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* Products Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ProductsClient
            lang={lang}
            dictionary={dictionary.products}
            initialCategory={category}
          />
        </div>
      </section>
    </div>
  )
}
