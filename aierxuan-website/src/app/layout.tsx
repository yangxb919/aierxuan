import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import YandexMetrica from '@/components/YandexMetrica'
import { i18n } from '@/i18n-config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'AIERXUAN',
  description: 'AIERXUAN Global Manufacturing Platform',
  verification: {
    yandex: 'cae9fe4eb8159f38',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The locale is injected as a request header by the middleware (src/proxy.ts)
  // so the server-rendered <html lang> is correct for crawlers/AI, instead of
  // being fixed client-side after hydration.
  const headerLocale = (await headers()).get('x-locale')
  const lang =
    headerLocale && i18n.locales.includes(headerLocale as (typeof i18n.locales)[number])
      ? headerLocale
      : i18n.defaultLocale

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <YandexMetrica />
        {children}
      </body>
    </html>
  )
}
