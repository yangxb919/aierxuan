/**
 * Hero Section 文案配置
 * 支持多语言，可在此集中修改所有 Hero 相关文案
 * 修改文案时请保持各语言版本的含义一致性
 */

export interface HeroSlide {
  title: string
  subtitle: string
  description: string
  image: string
  key: string
}

export interface HeroContent {
  slides: HeroSlide[]
  cta: string
  contact: string
}

export const heroContent: Record<string, HeroContent> = {
  en: {
    slides: [
      {
        key: 'main-hero',
        title: 'Professional Laptop & Mini PC Manufacturer',
        subtitle: 'OEM/ODM Solutions for Global Partners',
        description: '✓ Flexible MOQ from 100 Units  ✓ Fast 7-15 Days Delivery  ✓ Full Customization Available  ✓ Intel Partner | CE/FCC Certified',
        image: '/images/hero-banner.jpg'
      }
    ],
    cta: 'View Products',
    contact: 'Request Quote'
  },
  ru: {
    slides: [
      {
        key: 'main-hero',
        title: 'Профессиональный Производитель Ноутбуков и Мини-ПК',
        subtitle: 'OEM/ODM Решения для Глобальных Партнеров',
        description: '✓ Гибкий MOQ от 100 Единиц  ✓ Быстрая Доставка 7-15 Дней  ✓ Полная Кастомизация  ✓ Партнер Intel | Сертификаты CE/FCC',
        image: '/images/hero-banner.jpg'
      }
    ],
    cta: 'Посмотреть продукты',
    contact: 'Запросить предложение'
  },
  ja: {
    slides: [
      {
        key: 'main-hero',
        title: 'プロフェッショナルノートPC・ミニPC製造メーカー',
        subtitle: 'グローバルパートナー向けOEM/ODMソリューション',
        description: '✓ 100台からの柔軟なMOQ  ✓ 7-15日の迅速配送  ✓ 完全カスタマイズ対応  ✓ Intelパートナー | CE/FCC認証',
        image: '/images/hero-banner.jpg'
      }
    ],
    cta: '製品を見る',
    contact: '見積もりを依頼'
  },
  fr: {
    slides: [
      {
        key: 'main-hero',
        title: 'Fabricant Professionnel d\'Ordinateurs Portables et Mini PC',
        subtitle: 'Solutions OEM/ODM pour Partenaires Mondiaux',
        description: '✓ MOQ Flexible à partir de 100 Unités  ✓ Livraison Rapide 7-15 Jours  ✓ Personnalisation Complète  ✓ Partenaire Intel | Certifié CE/FCC',
        image: '/images/hero-banner.jpg'
      }
    ],
    cta: 'Voir les produits',
    contact: 'Demander un devis'
  },
  pt: {
    slides: [
      {
        key: 'main-hero',
        title: 'Fabricante Profissional de Laptops e Mini PCs',
        subtitle: 'Soluções OEM/ODM para Parceiros Globais',
        description: '✓ MOQ Flexível a partir de 100 Unidades  ✓ Entrega Rápida 7-15 Dias  ✓ Personalização Completa  ✓ Parceiro Intel | Certificado CE/FCC',
        image: '/images/hero-banner.jpg'
      }
    ],
    cta: 'Ver Produtos',
    contact: 'Solicitar Cotação'
  },
  'zh-CN': {
    slides: [
      {
        key: 'main-hero',
        title: '专业笔记本电脑和迷你主机制造商',
        subtitle: '为全球合作伙伴提供OEM/ODM解决方案',
        description: '✓ 灵活起订量100台起  ✓ 快速交付7-15天  ✓ 全面定制服务  ✓ Intel合作伙伴 | CE/FCC认证',
        image: '/images/hero-banner.jpg'
      }
    ],
    cta: '查看产品',
    contact: '获取报价'
  }
}

// 文案长度限制（防止破坏布局）
export const HERO_CONTENT_LIMITS = {
  title: {
    max: 60,  // 字符数限制
    recommended: { min: 20, max: 40 }
  },
  subtitle: {
    max: 80,
    recommended: { min: 25, max: 50 }
  },
  description: {
    max: 200,
    recommended: { min: 80, max: 150 }
  },
  cta: {
    max: 25,
    recommended: { min: 10, max: 20 }
  },
  contact: {
    max: 25,
    recommended: { min: 10, max: 20 }
  }
} as const

// 验证文案长度函数
export function validateHeroContent(content: HeroContent, language: string): {
  isValid: boolean
  warnings: string[]
} {
  const warnings: string[] = []

  // 验证CTA和联系文案
  if (content.cta.length > HERO_CONTENT_LIMITS.cta.max) {
    warnings.push(`${language}.cta: 文案过长 (${content.cta.length}/${HERO_CONTENT_LIMITS.cta.max} 字符)`)
  }
  if (content.contact.length > HERO_CONTENT_LIMITS.contact.max) {
    warnings.push(`${language}.contact: 文案过长 (${content.contact.length}/${HERO_CONTENT_LIMITS.contact.max} 字符)`)
  }

  // 验证每个slide的文案
  content.slides.forEach((slide, index) => {
    Object.entries(slide).forEach(([key, value]) => {
      if (typeof value === 'string' && key !== 'key' && key !== 'image') {
        const limit = HERO_CONTENT_LIMITS[key as keyof typeof HERO_CONTENT_LIMITS]
        if (limit && value.length > limit.max) {
          warnings.push(`${language}.slide[${index}].${key}: 文案过长 (${value.length}/${limit.max} 字符)`)
        }
        if (limit && (value.length < limit.recommended.min || value.length > limit.recommended.max)) {
          warnings.push(`${language}.slide[${index}].${key}: 文案长度不在推荐范围内 (${value.length} 字符，推荐: ${limit.recommended.min}-${limit.recommended.max})`)
        }
      }
    })
  })

  return {
    isValid: warnings.length === 0,
    warnings
  }
}