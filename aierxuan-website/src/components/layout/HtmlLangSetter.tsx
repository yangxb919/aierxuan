'use client'

import { useEffect } from 'react'

interface HtmlLangSetterProps {
  lang: string
}

export function HtmlLangSetter({ lang }: HtmlLangSetterProps) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return null
}
