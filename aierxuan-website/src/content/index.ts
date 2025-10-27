/**
 * 文案配置统一导出
 * 在此处统一管理所有文案模块
 */

// Hero 区域文案
export { heroContent, validateHeroContent, HERO_CONTENT_LIMITS } from './hero'
export type { HeroContent } from './hero'

// 导航栏文案
export { navigationContent, NAVIGATION_CONTENT_LIMITS } from './navigation'
export type { NavigationContent } from './navigation'

// 产品页面文案
export { productsContent, PRODUCTS_CONTENT_LIMITS } from './products'
export type { ProductsContent } from './products'

// 联系页面文案
export { contactContent, CONTACT_CONTENT_LIMITS } from './contact'
export type { ContactContent } from './contact'

// 行业解决方案文案
export { industrySolutionsContent, INDUSTRY_SOLUTIONS_CONTENT_LIMITS } from './industry-solutions'
export type { IndustrySolutionsContent, IndustrySolution } from './industry-solutions'

// 通用文案
export { commonContent } from './common'
export type { CommonContent } from './common'

// 文案获取 hook
export function useContent<T>(contentMap: Record<string, T>, language: string): T {
  return contentMap[language] || contentMap['en'] || Object.values(contentMap)[0]
}

// 文案验证工具
export function validateAllContent() {
  const { heroContent, validateHeroContent } = require('./hero')

  const allWarnings: string[] = []

  // 验证 Hero 文案
  Object.entries(heroContent).forEach(([lang, content]) => {
    const { warnings } = validateHeroContent(content, lang)
    allWarnings.push(...warnings)
  })

  return {
    isValid: allWarnings.length === 0,
    warnings: allWarnings
  }
}