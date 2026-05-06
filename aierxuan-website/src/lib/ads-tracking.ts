'use client'

import { YANDEX_METRICA_ID } from '@/components/YandexMetrica'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    ym?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

interface LeadTrackingPayload {
  lang: string
  productInterest?: string
  urgency?: string
  source?: string
}

const GOOGLE_ADS_LEAD_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO

function pushDataLayerEvent(event: string, payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...payload,
  })
}

function reachYandexGoal(goalName: string, payload: Record<string, unknown>) {
  if (typeof window.ym !== 'function') return

  window.ym(YANDEX_METRICA_ID, 'reachGoal', goalName, payload)
}

function trackGoogleAdsConversion(payload: Record<string, unknown>) {
  if (!GOOGLE_ADS_LEAD_SEND_TO || typeof window.gtag !== 'function') return

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_LEAD_SEND_TO,
    ...payload,
  })
}

export function trackLeadFormSubmit(payload: LeadTrackingPayload) {
  const eventPayload = {
    form_type: 'rfq',
    lead_type: 'rfq',
    language: payload.lang,
    product_interest: payload.productInterest || 'unknown',
    urgency: payload.urgency || 'normal',
    source: payload.source || 'website',
    page_location: window.location.href,
  }

  pushDataLayerEvent('rfq_submit', eventPayload)
  pushDataLayerEvent('generate_lead', eventPayload)
  reachYandexGoal('rfq_submit', eventPayload)
}

export function trackThankYouView(lang: string) {
  const eventPayload = {
    page_type: 'thank_you',
    language: lang,
    page_location: window.location.href,
  }

  pushDataLayerEvent('thank_you_view', eventPayload)
  trackGoogleAdsConversion(eventPayload)
}

export function trackTelegramClick(lang: string) {
  const eventPayload = {
    channel: 'telegram',
    language: lang,
    page_location: window.location.href,
  }

  pushDataLayerEvent('telegram_click', eventPayload)
  reachYandexGoal('telegram_click', eventPayload)
}
