import { getDictionary } from '@/get-dictionary'
import { ProductsClient } from '@/components/features/ProductsClient'
import { Locale } from '@/i18n-config'

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/products-hero-banner.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Light blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-blue-700/10"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
              {texts.title}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {texts.subtitle}
            </p>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto drop-shadow-md">
              {texts.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
