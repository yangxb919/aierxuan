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
  const cookieStore = await cookies()
  const siteLang = cookieStore.get('site_lang')?.value || 'en'

  return (
    <html lang={siteLang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T3NJ8X84');`}} />
      </head>
      <body className={inter.className}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3NJ8X84"
height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <YandexMetrica />
        {children}
      </body>
    </html>
  )
}
