import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import FAQPageClient from './FAQPageClient'
import { SITE_URL } from '@/lib/site-url'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang as Locale)
  const texts = dictionary.faq

  return {
    title: texts.meta.title,
    description: texts.meta.description,
    keywords: texts.meta.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/faq`,
      languages: {
        'x-default': `${SITE_URL}/en/faq`,
        'en': `${SITE_URL}/en/faq`,
        'ru': `${SITE_URL}/ru/faq`,
      },
    },
  }
}

interface FAQPageProps {
  params: Promise<{ lang: Locale }>
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.faq

  return <FAQPageClient texts={texts} lang={lang} />
}
