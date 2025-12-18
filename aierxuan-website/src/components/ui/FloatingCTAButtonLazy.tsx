'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const FloatingCTAButton = dynamic(
  () => import('./FloatingCTAButton').then((m) => m.FloatingCTAButton),
  { ssr: false }
)

export function FloatingCTAButtonLazy() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    let cancelled = false
    const requestIdleCallback: ((cb: () => void, opts?: { timeout: number }) => number) | undefined =
      (window as any).requestIdleCallback
    const cancelIdleCallback: ((id: number) => void) | undefined =
      (window as any).cancelIdleCallback

    const enable = () => {
      if (cancelled) return
      setEnabled(true)
      window.removeEventListener('scroll', enableOnScroll)
    }

    const enableOnScroll = () => enable()

    window.addEventListener('scroll', enableOnScroll, { passive: true })

    const idle = requestIdleCallback
      ? requestIdleCallback(enable, { timeout: 2000 })
      : window.setTimeout(enable, 1200)

    return () => {
      cancelled = true
      window.removeEventListener('scroll', enableOnScroll)
      if (cancelIdleCallback) {
        cancelIdleCallback(idle)
      } else {
        window.clearTimeout(idle as number)
      }
    }
  }, [])

  if (!enabled) return null
  return <FloatingCTAButton />
}
