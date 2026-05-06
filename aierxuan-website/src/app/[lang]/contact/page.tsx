import { Suspense } from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import { RFQForm } from '@/components/forms/RFQForm'
import { getDictionary } from '@/get-dictionary'
import type { Locale } from '@/i18n-config'
import { SITE_URL } from '@/lib/site-url'
import {
  ProcessCards,
  SectionHeader,
  TechCTA,
  TechHero,
  redesignImages,
} from '@/components/redesign/TechPrimitives'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: 'Contact Us - Get a Quote | AIERXUAN',
      description: 'Contact AIERXUAN for OEM/ODM laptop and mini PC inquiries. Request a quote, get technical support, or discuss custom manufacturing solutions.',
      keywords: 'contact aierxuan, get quote, oem inquiry, laptop manufacturer contact',
    },
    ru: {
      title: 'Связаться с нами — Запросить цену | AIERXUAN',
      description: 'Свяжитесь с AIERXUAN для OEM/ODM запросов по ноутбукам и мини-ПК. Запросите цену, получите техническую поддержку.',
      keywords: 'связаться с aierxuan, запросить цену, OEM запрос, производитель ноутбуков контакт',
    },
  }
  const seo = metaByLang[lang] ?? metaByLang.en

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/contact`,
      languages: {
        'x-default': `${SITE_URL}/en/contact`,
        'en': `${SITE_URL}/en/contact`,
        'ru': `${SITE_URL}/ru/contact`,
      },
    },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const texts = dictionary.contact

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.contactHero}
        eyebrow="Quote Response Within 24 Hours"
        title="Start Your Custom Hardware Project"
        subtitle="Send your target configuration and receive a precise OEM/ODM quote within 24 hours."
        primaryLabel="Submit RFQ"
        secondaryLabel="Contact Sales"
        secondaryHref={`/${lang}/contact#rfq`}
        widgets={[
          {
            title: 'RFQ Readiness',
            rows: [
              { label: 'Sales Status', value: 'Online', status: 'live' },
              { label: 'Brief Review', value: '24h', status: 'ok' },
              { label: 'Spec Check', value: 'Ready', status: 'ok' },
            ],
          },
          {
            title: 'Required Specs',
            rows: [
              { label: 'Product Family', value: 'Needed' },
              { label: 'Quantity', value: 'Needed' },
              { label: 'Target Market', value: 'Needed' },
            ],
          },
        ]}
      />

      {/* Main Content */}
      <section id="rfq" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow="Request a Quote"
            title="Tell Us Your Target Configuration"
            description="The RFQ page asks for the inputs sales actually need, reducing back-and-forth and making the quote more precise."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="flex justify-center items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>}>
                <RFQForm lang={lang} dictionary={dictionary.rfq} variant="light" className="max-w-none shadow-[0_22px_70px_rgba(15,23,42,0.08)]" />
              </Suspense>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
                <div className="relative h-48">
                  <Image src={redesignImages.contactHero} alt="AIERXUAN sales office" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                <h3 className="text-xl font-bold text-slate-950 mb-6">
                  {texts.contactInfo}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-slate-950">{texts.address}</p>
                      <p className="text-sm text-slate-600">{texts.addressValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-slate-950">{texts.phone}</p>
                      <p className="text-sm text-slate-600">{texts.phoneValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-slate-950">{texts.email}</p>
                      <p className="text-sm text-slate-600">{texts.emailValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-slate-950">{texts.businessHours}</p>
                      <p className="text-sm text-slate-600">{texts.businessHoursValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-slate-950">{texts.responseTime}</p>
                      <p className="text-sm text-slate-600">{texts.responseTimeValue}</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-950 mb-6">
                  {texts.whyChooseUs}
                </h3>

                <ul className="space-y-3">
                  {texts.reasons.map((reason: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-slate-600">{reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-20 text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Happens Next"
            title="A Clear RFQ Follow-up Flow"
            description="International buyers should know exactly what happens after submitting product requirements."
          />
          <ProcessCards
            steps={[
              { title: 'Brief Review', description: 'Sales checks product family, quantity and destination market.' },
              { title: 'Spec Check', description: 'Engineering confirms platform, CPU, memory, storage and display feasibility.' },
              { title: 'Quotation', description: 'Pricing, sample cost, MOQ and timeline are prepared.' },
              { title: 'Sample Plan', description: 'Sample invoice, branding files and delivery details are confirmed.' },
              { title: 'Production', description: 'Mass production starts after sample and specification approval.' },
              { title: 'Support', description: 'Warranty, RMA and spare parts communication continues after shipment.' },
            ]}
          />
        </div>
      </section>

      <TechCTA
        title="Need a supplier audit or factory visit?"
        description="Send your visit schedule, product category and audit requirements. The team can coordinate factory visit details."
        href={`/${lang}/contact`}
        label="Schedule Visit"
      />
    </div>
  )
}
