import type { Metadata } from 'next'
import Script from 'next/script'
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar'
import { Footer } from '@/components/layout/Footer'
import { ContactModalLazy } from '@/components/ui/ContactModalLazy'
import { FloatingCTAButtonLazy } from '@/components/ui/FloatingCTAButtonLazy'
import { TelegramFloatingButton } from '@/components/ui/TelegramFloatingButton'
import { HtmlLangSetter } from '@/components/layout/HtmlLangSetter'
import { i18n, type Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'
import { SITE_URL } from '@/lib/site-url'
import { buildOgTwitter } from '@/lib/seo'

const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'AIERXUAN - Professional Laptop & Mini PC Manufacturer',
    description: 'Leading OEM/ODM manufacturer of high-performance laptops, gaming notebooks, and mini PCs. Custom solutions for global partners.',
    keywords: 'laptop manufacturer, mini pc factory, oem laptop, odm notebook, gaming laptop supplier, shenzhen electronics',
  },
  ru: {
    title: 'AIERXUAN — Производитель ноутбуков и мини-ПК',
    description: 'Профессиональное OEM/ODM производство ноутбуков, игровых ноутбуков и мини-ПК. Индивидуальные решения для партнёров по всему миру.',
    keywords: 'OEM ноутбуки, ODM производство, мини-ПК оптом, производитель ноутбуков, игровые ноутбуки, электроника Шэньчжэнь',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const seo = metaByLang[lang] ?? metaByLang.en

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    icons: {
      icon: '/icon.svg',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        'x-default': `${SITE_URL}/en`,
        'en': `${SITE_URL}/en`,
        'ru': `${SITE_URL}/ru`,
      },
    },
    ...buildOgTwitter({ lang, title: seo.title, description: seo.description }),
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const dictionary = await getDictionary(lang)
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

  return (
    <>
      <HtmlLangSetter lang={lang} />

      {/* Organization Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'AIERXUAN',
            url: SITE_URL,
            logo: `${SITE_URL}/images/logo.png`,
            description: metaByLang[lang]?.description ?? metaByLang.en.description,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Shenzhen',
              addressRegion: 'Guangdong',
              addressCountry: 'CN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86-4008-8228-058',
              contactType: 'sales',
              email: 'admin@aierxuanlaptop.com',
              availableLanguage: ['English', 'Russian', 'Chinese'],
            },
            sameAs: [
              'https://www.linkedin.com/company/aierxuan',
            ],
          }),
        }}
      />

      {googleAdsId ? (
        <>
          <Script
            id="google-ads-gtag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-ads-gtag-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${googleAdsId}');`,
            }}
          />
        </>
      ) : null}

      <div className="min-h-screen flex flex-col">
        <ConditionalNavbar dictionary={dictionary} lang={lang} />
        <main className="flex-1">
          {children}
        </main>
        <Footer dictionary={dictionary.footer} lang={lang} />
      </div>

      {/* Global Contact Modal */}
      <ContactModalLazy />

      {/* Floating CTA Button */}
      <FloatingCTAButtonLazy />

      {/* Telegram Floating Button - 仅俄语页面显示 */}
      <TelegramFloatingButton />
    </>
  );
}
