'use client'

import { useEffect } from 'react'
import { trackThankYouView } from '@/lib/ads-tracking'

interface ThankYouTrackingProps {
  lang: string
}

export function ThankYouTracking({ lang }: ThankYouTrackingProps) {
  useEffect(() => {
    trackThankYouView(lang)
  }, [lang])

  return null
}
