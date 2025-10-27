import type { LanguageCode } from '@/types'

// English slugs for URLs and database (NEW STANDARD)
export const CATEGORY_SLUGS = {
  business: 'business-laptop',
  gaming: 'gaming-laptop',
  mini: 'mini-pc'
} as const

export type CategorySlug = typeof CATEGORY_SLUGS[keyof typeof CATEGORY_SLUGS]

// Chinese values stored in DB (LEGACY - for backward compatibility)
export const CATEGORY_VALUES_ZH = {
  business: '商务本',
  gaming: '游戏本',
  mini: '迷你主机'
} as const

// Map English slugs to Chinese DB values
export const SLUG_TO_DB_VALUE: Record<CategorySlug, string> = {
  'business-laptop': '商务本',
  'gaming-laptop': '游戏本',
  'mini-pc': '迷你主机'
}

// Map Chinese DB values to English slugs
export const DB_VALUE_TO_SLUG: Record<string, CategorySlug> = {
  '商务本': 'business-laptop',
  '游戏本': 'gaming-laptop',
  '迷你主机': 'mini-pc'
}

// Localized labels for UI display
export const CATEGORY_LABELS: Record<CategorySlug, Record<LanguageCode, string>> = {
  'business-laptop': {
    'zh-CN': '商务本',
    en: 'Business Laptop',
    ru: 'Бизнес-ноутбук',
    ja: 'ビジネスノートPC',
    fr: 'Ordinateur portable professionnel',
    pt: 'Laptop empresarial'
  },
  'gaming-laptop': {
    'zh-CN': '游戏本',
    en: 'Gaming Laptop',
    ru: 'Игровой ноутбук',
    ja: 'ゲーミングノートPC',
    fr: 'Ordinateur portable gaming',
    pt: 'Laptop gamer'
  },
  'mini-pc': {
    'zh-CN': '迷你主机',
    en: 'Mini PC',
    ru: 'Мини ПК',
    ja: 'ミニPC',
    fr: 'Mini PC',
    pt: 'Mini PC'
  }
}

/**
 * Get localized label for a category
 * @param value - Can be English slug or Chinese DB value
 * @param language - Target language
 */
export function getCategoryLabel(value: string | null | undefined, language: LanguageCode): string {
  if (!value) return ''

  // Convert to slug if it's a Chinese value
  const slug = DB_VALUE_TO_SLUG[value] || value as CategorySlug

  const labels = CATEGORY_LABELS[slug]
  if (!labels) return value

  return labels[language] || labels.en || value
}

/**
 * Convert category value to English slug for URLs
 */
export function categoryToSlug(value: string | null | undefined): CategorySlug | null {
  if (!value) return null
  return DB_VALUE_TO_SLUG[value] || value as CategorySlug
}

/**
 * Convert English slug to Chinese DB value
 */
export function slugToDbValue(slug: string | null | undefined): string | null {
  if (!slug) return null
  return SLUG_TO_DB_VALUE[slug as CategorySlug] || slug
}

export function getCategoryType(value: string | null | undefined): 'business' | 'gaming' | 'mini' | 'other' {
  if (!value) return 'other'

  // Check English slugs
  if (value === 'business-laptop' || value.includes('商务') || /business/i.test(value)) return 'business'
  if (value === 'gaming-laptop' || value.includes('游戏') || /gaming/i.test(value)) return 'gaming'
  if (value === 'mini-pc' || value.includes('迷你') || /mini\s*pc|mini/i.test(value)) return 'mini'

  return 'other'
}

