import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.css'
import YandexMetrica from '@/components/YandexMetrica'

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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const siteLang = cookieStore.get('site_lang')?.value || 'en'

  return (
    <html lang={siteLang} suppressHydrationWarning>
      <body className={inter.className}>
        <YandexMetrica />
        {children}
      </body>
    </html>
  )
}
