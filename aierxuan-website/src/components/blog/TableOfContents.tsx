'use client'

import { useEffect, useRef, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  title: string
  variant?: 'dark' | 'light'
  containerId?: string
}

export default function TableOfContents({
  content,
  title,
  variant = 'dark',
  containerId,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const isLight = variant === 'light'
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : document
    if (!container) {
      setHeadings([])
      return
    }

    const selector = 'h1[id], h2[id], h3[id], h4[id]'
    const nodes = Array.from(container.querySelectorAll<HTMLElement>(selector))
    const extracted = nodes
      .map((node) => {
        const level = Number(node.tagName.replace('H', '')) || 2
        const text = (node.textContent || '').trim()
        return { id: node.id, text, level }
      })
      .filter((h) => h.id && h.text)

    setHeadings(extracted)
  }, [content, containerId])

  useEffect(() => {
    if (headings.length === 0) {
      setActiveId('')
      return
    }

    let rafId = 0
    const offset = 96

    const getHeadingElements = () =>
      headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[]

    let headingEls = getHeadingElements()

    const updateActive = () => {
      const y = window.scrollY + offset + 1
      let current = headingEls[0]?.id || ''

      for (const el of headingEls) {
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= y) current = el.id
        else break
      }

      if (!current) return
      setActiveId((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(updateActive)
    }

    const onResize = () => {
      headingEls = getHeadingElements()
      onScroll()
    }

    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [headings])

  useEffect(() => {
    if (!activeId) return
    const nav = navRef.current
    if (!nav) return
    const activeEl = nav.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`)
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length === 0) {
    return null
  }

  const titleClasses = isLight ? 'text-slate-900' : 'text-white'
  const iconClasses = isLight ? 'text-blue-700' : 'text-blue-400'
  const dividerClasses = isLight ? 'border-black/10' : 'border-white/10'
  const activeItemClasses = isLight
    ? 'text-blue-700 font-semibold'
    : 'text-blue-400 font-semibold'
  const inactiveItemClasses = isLight
    ? 'text-slate-600 hover:text-slate-900'
    : 'text-gray-400 hover:text-blue-400'

  return (
    <nav ref={navRef} className="max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div className={`flex items-center mb-4 pb-3 border-b ${dividerClasses}`}>
        <svg className={`w-5 h-5 mr-2 ${iconClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <h3 className={`text-lg font-bold ${titleClasses}`}>
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              data-toc-id={heading.id}
              className={`text-left w-full text-sm leading-relaxed transition-colors ${activeId === heading.id
                  ? activeItemClasses
                  : inactiveItemClasses
                }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
