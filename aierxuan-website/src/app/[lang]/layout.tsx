import type { Metadata } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar'
import { Footer } from '@/components/layout/Footer'
import { ContactModal } from '@/components/ui/ContactModal'
import { FloatingCTAButton } from '@/components/ui/FloatingCTAButton'
import { HtmlLangSetter } from '@/components/layout/HtmlLangSetter'
import { i18n, type Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

export const metadata: Metadata = {
  title: 'AIERXUAN - Professional Laptop & Mini PC Manufacturer',
  description: 'Leading OEM/ODM manufacturer of high-performance laptops, gaming notebooks, and mini PCs. Custom solutions for global partners.',
  keywords: 'laptop manufacturer, mini pc factory, oem laptop, odm notebook, gaming laptop supplier, shenzhen electronics',
  icons: {
    icon: '/favicon.ico',
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <>
      <HtmlLangSetter lang={lang} />
      <Head>
        <link rel="preload" href="/images/hero-banner.webp" as="image" />
        <link rel="preconnect" href="https://vjllsepqgqkkxwnqikzi.supabase.co" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className="min-h-screen flex flex-col">
        <ConditionalNavbar dictionary={dictionary} lang={lang} />
        <main className="flex-1">
          {children}
        </main>
        <Footer dictionary={dictionary.footer} lang={lang} />
      </div>

      {/* Global Contact Modal */}
      <ContactModal />

      {/* Floating CTA Button */}
      <FloatingCTAButton />

      {/* Google Maps API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />

      {/* WUUNU SNIPPET - DON'T CHANGE THIS (START) */}
      {process.env.NODE_ENV !== "production" && (
        <>
          <Script id="wuunu-ws" strategy="afterInteractive">
            {`window.__WUUNU_WS__ = "http://127.0.0.1:53676/";`}
          </Script>
          <Script
            id="wuunu-widget"
            src="https://cdn.jsdelivr.net/npm/@wuunu/widget@0.1?cacheParam=962"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </>
      )}
      {/* WUUNU SNIPPET - DON'T CHANGE THIS (END) */}
    </>
  );
}
