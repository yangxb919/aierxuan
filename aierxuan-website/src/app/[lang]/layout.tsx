import type { Metadata } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar'
import { Footer } from '@/components/layout/Footer'
import { ContactModalLazy } from '@/components/ui/ContactModalLazy'
import { FloatingCTAButtonLazy } from '@/components/ui/FloatingCTAButtonLazy'
import { HtmlLangSetter } from '@/components/layout/HtmlLangSetter'
import { i18n, type Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

export const metadata: Metadata = {
  title: 'AIERXUAN - Professional Laptop & Mini PC Manufacturer',
  description: 'Leading OEM/ODM manufacturer of high-performance laptops, gaming notebooks, and mini PCs. Custom solutions for global partners.',
  keywords: 'laptop manufacturer, mini pc factory, oem laptop, odm notebook, gaming laptop supplier, shenzhen electronics',
  icons: {
    icon: '/icon.svg',
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <>
      <HtmlLangSetter lang={lang} />
      <Head>
        {/* DNS 预取 */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* 预连接关键域名 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vjllsepqgqkkxwnqikzi.supabase.co" />
        {gtmId ? <link rel="preconnect" href="https://www.googletagmanager.com" /> : null}
        {/* 预加载首屏关键图片 */}
        <link rel="preload" href="/images/hero-banner.webp" as="image" type="image/webp" />
      </Head>

      {/* Google Tag Manager - lazyOnload 策略 */}
      {gtmId ? (
        <>
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
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
    </>
  );
}
