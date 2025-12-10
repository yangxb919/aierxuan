'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui'
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { i18n, type Locale } from '@/i18n-config'

interface NavbarProps {
  dictionary: {
    navigation: {
      home: string
      products: string
      about: string
      blog: string
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
  const pathname = usePathname()

  const navItems = [
    { name: dictionary.navigation.home, href: `/${lang}` },
    { name: dictionary.navigation.products, href: `/${lang}/products` },
    { name: dictionary.navigation.about, href: `/${lang}/about` },
    { name: dictionary.navigation.blog, href: `/${lang}/blog` },
    { name: dictionary.navigation.contact, href: `/${lang}/contact` },
  ]

  const currentLanguage = languageOptions.find(l => l.code === lang) || languageOptions[0]

  // Helper to get the path for a different language
  const getRedirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">AIERXUAN</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
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
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span>{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {languageOptions.map((option) => (
                      <Link
                        key={option.code}
                        href={getRedirectedPathName(option.code)}
                        onClick={() => setLanguageMenuOpen(false)}
                        className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${lang === option.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
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
            <Link href={`/${lang}/contact`}>
              <Button size="sm">
                {dictionary.common.getQuote}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 border-t border-gray-200 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Options */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Language / 语言</div>
                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map((option) => (
                    <Link
                      key={option.code}
                      href={getRedirectedPathName(option.code)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${lang === option.code
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
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
                <Link href={`/${lang}/contact`} className="block">
                  <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    {dictionary.common.getQuote}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
