import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { LanguageCode, ProductWithTranslations, BlogPostWithTranslations, FAQWithTranslations } from '@/types'

// Tailwind CSS class utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatDate(date: string | Date, locale: LanguageCode = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  const localeMap = {
    en: 'en-US',
    ru: 'ru-RU',
    ja: 'ja-JP',
    fr: 'fr-FR',
    pt: 'pt-PT',
    'zh-CN': 'zh-CN'
  }
  
  return dateObj.toLocaleDateString(localeMap[locale], options)
}

export function formatDateTime(date: string | Date, locale: LanguageCode = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  const localeMap = {
    en: 'en-US',
    ru: 'ru-RU',
    ja: 'ja-JP',
    fr: 'fr-FR',
    pt: 'pt-PT',
    'zh-CN': 'zh-CN'
  }

  return dateObj.toLocaleDateString(localeMap[locale], options)
}

export function timeAgo(date: string | Date, locale: LanguageCode = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  // Use Intl.RelativeTimeFormat for better internationalization
  try {
    const rtf = new Intl.RelativeTimeFormat(locale === 'zh-CN' ? 'zh-CN' : locale, { numeric: 'auto' })

    if (diffInSeconds < 60) {
      return rtf.format(0, 'second')
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
    }
  } catch (error) {
    // Fallback for unsupported locales
    const labels = {
      en: 'ago',
      ru: 'назад',
      ja: '前',
      fr: 'il y a',
      pt: 'atrás',
      'zh-CN': '前'
    }

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ${labels[locale] || labels.en}`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ${labels[locale] || labels.en}`
    return `${Math.floor(diffInSeconds / 86400)}d ${labels[locale] || labels.en}`
  }
}

// String utilities
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Translation utilities
export function getTranslation<T extends { translations: any[]; currentTranslation?: any }>(
  item: T,
  language: LanguageCode,
  languageFieldName: 'language_code' | 'locale' = 'locale',
  fallbackLanguage: LanguageCode = 'en'
): T['translations'][0] | undefined {
  if (item.currentTranslation) {
    return item.currentTranslation
  }

  // Check if translations array exists and is not empty
  if (!item.translations || item.translations.length === 0) {
    return undefined
  }

  // Try to find translation for requested language
  let translation = item.translations.find(t => t[languageFieldName] === language)

  // Fallback to fallback language if not found
  if (!translation && language !== fallbackLanguage) {
    translation = item.translations.find(t => t[languageFieldName] === fallbackLanguage)
  }

  // Fallback to first available translation
  if (!translation && item.translations.length > 0) {
    translation = item.translations[0]
  }

  return translation
}

export function getLocalizedContent(
  item: ProductWithTranslations | BlogPostWithTranslations | FAQWithTranslations,
  language: LanguageCode,
  field: string
): string {
  const translation = getTranslation(item, language)
  return translation?.[field] || ''
}

// URL utilities
export function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(path, window.location.origin)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }
  
  return url.toString()
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

// Number utilities
export function formatNumber(num: number, locale: LanguageCode = 'en'): string {
  const localeMap = {
    en: 'en-US',
    ru: 'ru-RU',
    ja: 'ja-JP',
    fr: 'fr-FR',
    pt: 'pt-PT',
    'zh-CN': 'zh-CN'
  }

  return num.toLocaleString(localeMap[locale])
}

// Storage utilities
export function getFromStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function setToStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore storage errors
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore storage errors
  }
}
