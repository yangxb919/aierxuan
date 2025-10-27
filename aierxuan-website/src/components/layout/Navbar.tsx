'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { useLanguage, useAppStore } from '@/store/useAppStore'
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const navigation = {
  en: [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  ru: [
    { name: 'Главная', href: '/' },
    { name: 'Продукты', href: '/products' },
    { name: 'О нас', href: '/about' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contact' },
  ],
  ja: [
    { name: 'ホーム', href: '/' },
    { name: '製品', href: '/products' },
    { name: '会社概要', href: '/about' },
    { name: 'ブログ', href: '/blog' },
    { name: 'お問い合わせ', href: '/contact' },
  ],
  fr: [
    { name: 'Accueil', href: '/' },
    { name: 'Produits', href: '/products' },
    { name: 'À propos', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  pt: [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/products' },
    { name: 'Sobre', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contact' },
  ],
  'zh-CN': [
    { name: '首页', href: '/' },
    { name: '产品', href: '/products' },
    { name: '关于我们', href: '/about' },
    { name: '博客', href: '/blog' },
    { name: '联系我们', href: '/contact' },
  ]
}

const languageOptions = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
] as const

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const language = useLanguage()
  const { setLanguage } = useAppStore()
  const navItems = navigation[language] || navigation.en // Fallback to English if language not found

  const currentLanguage = languageOptions.find(lang => lang.code === language) || languageOptions[0]

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode)
    setLanguageMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
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
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                        className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                          language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/contact">
              <Button size="sm">
                {language === 'en' ? 'Get Quote' :
                 language === 'ru' ? 'Получить предложение' :
                 language === 'ja' ? '見積もりを取得' :
                 language === 'fr' ? 'Obtenir un devis' :
                 language === 'pt' ? 'Obter cotação' :
                 '获取报价'}
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
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code as LanguageCode)
                        setMobileMenuOpen(false)
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        language === lang.code
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="px-3 py-2">
                <Link href="/contact" className="block">
                  <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    {language === 'en' ? 'Get Quote' :
                     language === 'ru' ? 'Получить предложение' :
                     language === 'ja' ? '見積もりを取得' :
                     language === 'fr' ? 'Obtenir un devis' :
                     language === 'pt' ? 'Obter cotação' :
                     '获取报价'}
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
