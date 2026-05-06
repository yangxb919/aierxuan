'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { i18n, type Locale } from '@/i18n-config'

interface NavbarProps {
  dictionary: {
    navigation: {
      home: string
      products: string
      oem: string
      about: string
      blog: string
      faq: string
      contact: string
    }
    common: {
      getQuote: string
    }
  }
  lang: Locale
}

const languageOptions = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
] as const

export function Navbar({ dictionary, lang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Defensive: ensure `lang` is a valid locale (prevents hydration mismatch if an unexpected value is ever passed)
  const safeLang = (() => {
    const raw = String(lang || '')
    const first = raw.split('/').filter(Boolean)[0] || i18n.defaultLocale
    return (i18n.locales.includes(first as any) ? first : i18n.defaultLocale) as Locale
  })()

  const navItems = [
    { name: dictionary.navigation.home, href: `/${safeLang}` },
    { name: dictionary.navigation.products, href: `/${safeLang}/products` },
    { name: dictionary.navigation.oem, href: `/${safeLang}/oem` },
    { name: dictionary.navigation.about, href: `/${safeLang}/about` },
    { name: dictionary.navigation.blog, href: `/${safeLang}/blog` },
    { name: dictionary.navigation.faq, href: `/${safeLang}/faq` },
    { name: dictionary.navigation.contact, href: `/${safeLang}/contact` },
  ]

  const currentLanguage = languageOptions.find(l => l.code === safeLang) || languageOptions[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Helper to get the path for a different language
  const getRedirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === `/${safeLang}`) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-white/10 bg-[#070a10]/86 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl'
          : 'border-white/10 bg-[#070a10]/34 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-[68px] items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${safeLang}`} className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-black italic tracking-tight text-white drop-shadow-[0_0_12px_rgba(37,99,235,0.45)]">
                  AIERXUAN
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-2 py-6 text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-2 h-0.5 bg-blue-400 transition-all duration-300 ${
                      isActive(item.href) ? 'w-[calc(100%-1rem)]' : 'w-0 group-hover:w-[calc(100%-1rem)]'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-blue-300/40 hover:text-white"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span>{currentLanguage.code.toUpperCase()}</span>
                <ChevronDownIcon className="h-3.5 w-3.5" />
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-lg border border-white/10 bg-[#0b111c]/95 shadow-2xl backdrop-blur-xl z-50">
                  <div className="py-1">
                    {languageOptions.map((option) => (
                      <Link
                        key={option.code}
                        href={getRedirectedPathName(option.code)}
                        onClick={() => setLanguageMenuOpen(false)}
                        className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-white/10 ${safeLang === option.code ? 'bg-blue-500/18 text-white' : 'text-gray-300'
                          }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href={`/${safeLang}/contact`}>
              <span className="inline-flex min-h-10 items-center rounded-lg border border-blue-400/40 bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500">
                {dictionary.common.getQuote}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-gray-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-4 pt-3 sm:px-3 border-t border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href) ? 'bg-blue-500/18 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Options */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-400 mb-2">Language / 语言</div>
                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map((option) => (
                    <Link
                      key={option.code}
                      href={getRedirectedPathName(option.code)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${safeLang === option.code
                          ? 'bg-blue-500/18 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                        }`}
                    >
                      <span>{option.flag}</span>
                      <span>{option.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="px-3 py-2">
                <Link href={`/${safeLang}/contact`} className="block">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-blue-400/40 bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.32)]"
                  >
                    {dictionary.common.getQuote}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
