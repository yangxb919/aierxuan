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
        title: 'AIERXUAN Smart Manufacturing',
        subtitle: 'Advanced Industrial Automation Solutions',
        description: 'Premium industrial automation equipment for modern manufacturing upgrades. From precision manufacturing to intelligent control systems, providing comprehensive technical support for your business operations.',
        image: '/images/hero-banner.jpg'
      },
      {
        key: 'performance',
        title: 'Premium Smart Manufacturing',
        subtitle: '245W Sustained Performance Release',
        description: 'Flagship processor configuration with stable 245W powerful output. Easily handles intensive computing tasks, providing professional workstation performance experience.',
        image: '/images/banner-245w-performance.jpg'
      },
      {
        key: 'cooling',
        title: 'Premium Smart Manufacturing',
        subtitle: 'Silent Liquid Cooling System',
        description: 'Innovative liquid cooling technology provides efficient heat dissipation while maintaining extreme silence. Remains stable and reliable even during long-term full-load operation.',
        image: '/images/banner-liquid-cooling.jpg'
      },
      {
        key: 'manufacturing',
        title: 'Premium Smart Manufacturing',
        subtitle: 'Foxconn Precision Manufacturing',
        description: 'Backed by Foxconn\'s world-class manufacturing standards, strict quality control systems, and precision assembly processes. Each device undergoes rigorous testing.',
        image: '/images/banner-foxconn-manufacturing.jpg'
      }
    ],
    cta: 'Explore Products',
    contact: 'Request Quote'
  },
  ru: {
    slides: [
      {
        key: 'main-hero',
        title: 'AIERXUAN Умное Производство',
        subtitle: 'Продвинутые Решения Промышленной Автоматизации',
        description: 'Промышленное оборудование премиум-класса для модернизации современного производства. От точного производства до интеллектуальных систем управления - всесторонняя техническая поддержка для ваших бизнес-операций.',
        image: '/images/hero-banner.jpg'
      },
      {
        key: 'performance',
        title: 'Премиальное умное производство',
        subtitle: '245Вт устойчивая производительность',
        description: 'Флагманская конфигурация процессора со стабильной мощностью 245Вт. Легко справляется с интенсивными вычислительными задачами.',
        image: '/images/banner-245w-performance.jpg'
      },
      {
        key: 'cooling',
        title: 'Премиальное умное производство',
        subtitle: 'Система жидкостного охлаждения',
        description: 'Инновационная технология жидкостного охлаждения обеспечивает эффективный отвод тепла при сохранении тишины.',
        image: '/images/banner-liquid-cooling.jpg'
      },
      {
        key: 'manufacturing',
        title: 'Премиальное умное производство',
        subtitle: 'Точное производство Foxconn',
        description: 'Поддержка мировых стандартов производства Foxconn, строгие системы контроля качества и точные процессы сборки.',
        image: '/images/banner-foxconn-manufacturing.jpg'
      }
    ],
    cta: 'Изучить продукты',
    contact: 'Запросить предложение'
  },
  ja: {
    slides: [
      {
        key: 'main-hero',
        title: 'AIERXUANスマート製造',
        subtitle: '先進的産業自動化ソリューション',
        description: '現代製造業のアップグレード対応するプレミアム産業自動化設備。精密製造からインテリジェント制御システムまで、ビジネスオペレーションを包括的に技術サポート。',
        image: '/images/hero-banner.jpg'
      },
      {
        key: 'performance',
        title: 'プレミアムスマート製造',
        subtitle: '245W持続性能リリース',
        description: 'フラッグシッププロセッサ構成で安定した245Wの高出力を実現。集中的なコンピューティングタスクを容易に処理。',
        image: '/images/banner-245w-performance.jpg'
      },
      {
        key: 'cooling',
        title: 'プレミアムスマート製造',
        subtitle: 'サイレント液体冷却システム',
        description: '革新的な液体冷却技術が、効率的な熱放散と極限の静音性を実現。長期間の全負荷運転でも安定信頼性。',
        image: '/images/banner-liquid-cooling.jpg'
      },
      {
        key: 'manufacturing',
        title: 'プレミアムスマート製造',
        subtitle: 'Foxconn精密製造',
        description: 'Foxconnの世界クラスの製造基準、厳格な品質管理システム、精密組立プロセスによるサポート。',
        image: '/images/banner-foxconn-manufacturing.jpg'
      }
    ],
    cta: '製品を見る',
    contact: '見積もりを依頼'
  },
  fr: {
    slides: [
      {
        key: 'main-hero',
        title: 'Fabrication Intelligente AIERXUAN',
        subtitle: 'Solutions Avancées d\'Automatisation Industrielle',
        description: 'Équipement d\'automatisation industrielle de qualité supérieure pour moderniser la fabrication. De la production de précision aux systèmes de contrôle intelligents, fournissant un support technique complet pour vos opérations commerciales.',
        image: '/images/hero-banner.jpg'
      },
      {
        key: 'performance',
        title: 'Fabrication Intelligente Premium',
        subtitle: '245W Performance Soutenue',
        description: 'Configuration processeur flagship avec sortie puissante stable 245W. Gère facilement les tâches informatiques intensives.',
        image: '/images/banner-245w-performance.jpg'
      },
      {
        key: 'cooling',
        title: 'Fabrication Intelligente Premium',
        subtitle: 'Système de Refroidissement Liquide Silencieux',
        description: 'Technologie de refroidissement liquide innovante pour dissipation thermique efficace tout en maintenant un silence extrême.',
        image: '/images/banner-liquid-cooling.jpg'
      },
      {
        key: 'manufacturing',
        title: 'Fabrication Intelligente Premium',
        subtitle: 'Fabrication de Précision Foxconn',
        description: 'Soutenu par les standards de fabrication de classe mondiale Foxconn, systèmes stricts de contrôle qualité.',
        image: '/images/banner-foxconn-manufacturing.jpg'
      }
    ],
    cta: 'Explorer les produits',
    contact: 'Demander un devis'
  },
  pt: {
    slides: [
      {
        key: 'main-hero',
        title: 'Manufatura Inteligente AIERXUAN',
        subtitle: 'Soluções Avançadas de Automação Industrial',
        description: 'Equipamentos de automação industrial de alta qualidade para modernizar a fabricação. Da produção de precisão aos sistemas de controle inteligentes, fornecendo suporte técnico completo para suas operações de negócio.',
        image: '/images/hero-banner.jpg'
      },
      {
        key: 'performance',
        title: 'Manufatura Inteligente Premium',
        subtitle: '245W Performance Sustentada',
        description: 'Configuração processador flagship com saída poderosa estável 245W. Lida facilmente com tarefas computacionais intensivas.',
        image: '/images/banner-245w-performance.jpg'
      },
      {
        key: 'cooling',
        title: 'Manufatura Inteligente Premium',
        subtitle: 'Sistema de Refrigeração Líquida Silenciosa',
        description: 'Tecnologia inovadora de refrigeração líquida para dissipação térmica eficiente mantendo silêncio extremo.',
        image: '/images/banner-liquid-cooling.jpg'
      },
      {
        key: 'manufacturing',
        title: 'Manufatura Inteligente Premium',
        subtitle: 'Fabricação de Precisão Foxconn',
        description: 'Apoiado pelos padrões de fabricação de classe mundial Foxconn, sistemas estritos de controle de qualidade.',
        image: '/images/banner-foxconn-manufacturing.jpg'
      }
    ],
    cta: 'Explorar Produtos',
    contact: 'Solicitar Cotação'
  },
  'zh-CN': {
    slides: [
      {
        key: 'main-hero',
        title: 'AIERXUAN 智能制造专家',
        subtitle: '先进工业自动化解决方案',
        description: '高品质的工业自动化设备，助力现代制造业升级。从精密制造到智能控制，为您的业务提供全方位的技术支持。',
        image: '/images/hero-banner.jpg'
      },
      {
        key: 'performance',
        title: '高端智能制造',
        subtitle: '245W持续性能释放',
        description: '旗舰级处理器配置，稳定输出245W强劲动力，轻松应对高强度计算任务，为您提供专业级工作站性能体验。',
        image: '/images/banner-245w-performance.jpg'
      },
      {
        key: 'cooling',
        title: '高端智能制造',
        subtitle: '静音水冷散热系统',
        description: '创新液体冷却技术，高效散热同时保持极致静音。即使长时间满载运行，依然稳定可靠，为您营造安静舒适的工作环境。',
        image: '/images/banner-liquid-cooling.jpg'
      },
      {
        key: 'manufacturing',
        title: '高端智能制造',
        subtitle: '富士康精密制造工艺',
        description: '依托富士康世界级制造标准，严格的品控体系，精密组装工艺。每一台设备都经过严苛测试，确保卓越品质和长久稳定运行。',
        image: '/images/banner-foxconn-manufacturing.jpg'
      }
    ],
    cta: '探索产品',
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