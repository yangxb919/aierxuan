/**
 * 行业解决方案页面文案配置
 */

export interface IndustrySolution {
  title: string
  icon: string
  image: string
  challenge: string
  solution: string
  benefits: string[]
  color: string
}

export interface IndustrySolutionsContent {
  title: string
  subtitle: string
  learnMore: string
  viewCase: string
  solutions: IndustrySolution[]
}

export const industrySolutionsContent: Record<string, IndustrySolutionsContent> = {
  en: {
    title: 'Industry Solutions',
    subtitle: 'Tailored solutions for your specific industry challenges',
    learnMore: 'Learn More',
    viewCase: 'View Case Study',
    solutions: [
      {
        title: 'Education',
        icon: '🎓',
        image: '/images/corporate-business-solution.webp',
        challenge: 'Schools need reliable, cost-effective computing solutions that can handle diverse educational software and support remote learning',
        solution: 'Our education-grade laptops and mini PCs offer excellent performance, durability, and easy management for IT administrators',
        benefits: ['Budget-friendly pricing', 'Durable construction', 'Easy fleet management', 'Education software compatible'],
        color: 'blue'
      },
      {
        title: 'Industrial Manufacturing',
        icon: '🏭',
        image: '/images/industry-solution-manufacturing.webp',
        challenge: 'Manufacturing environments require rugged systems that can withstand harsh conditions while maintaining 24/7 reliability',
        solution: 'Industrial-grade mini PCs with fanless cooling, wide temperature range, and shock-resistant design for factory floors',
        benefits: ['Fanless cooling design', 'Wide temperature range', 'Shock and vibration resistant', 'Long-term availability'],
        color: 'orange'
      },
      {
        title: 'Healthcare',
        icon: '🏥',
        image: '/images/industry-solution-healthcare.webp',
        challenge: 'Medical facilities need certified, reliable systems for patient data management and medical imaging applications',
        solution: 'Medical-grade computing solutions with certifications, antimicrobial coatings, and silent operation for patient care areas',
        benefits: ['Medical certifications', 'Antimicrobial coating', 'Silent operation', 'HIPAA compliant'],
        color: 'green'
      },
      {
        title: 'Retail & Hospitality',
        icon: '🛒',
        image: '/images/industry-solution-retail.webp',
        challenge: 'Retail businesses need compact, reliable POS systems that can handle high transaction volumes and integrate with existing software',
        solution: 'Compact mini PCs optimized for POS applications with multiple I/O options and reliable 24/7 operation',
        benefits: ['Compact footprint', 'Multiple I/O ports', '24/7 operation', 'POS software compatible'],
        color: 'purple'
      }
    ]
  },
  // 其他语言版本...
  ru: {
    title: 'Отраслевые решения',
    subtitle: 'Индивидуальные решения для ваших отраслевых задач',
    learnMore: 'Узнать больше',
    viewCase: 'Посмотреть кейс',
    solutions: [
      {
        title: 'Образование',
        icon: '🎓',
        image: '/images/corporate-business-solution.webp',
        challenge: 'Школам нужны надежные и экономичные вычислительные решения для разнообразного образовательного ПО и дистанционного обучения',
        solution: 'Наши ноутбуки и мини-ПК для образования предлагают отличную производительность, долговечность и простое управление',
        benefits: ['Доступные цены', 'Прочная конструкция', 'Простое управление парком', 'Совместимость с образовательным ПО'],
        color: 'blue'
      },
      {
        title: 'Промышленное производство',
        icon: '🏭',
        image: '/images/industry-solution-manufacturing.webp',
        challenge: 'Производственные среды требуют прочных систем, способных выдерживать суровые условия при работе 24/7',
        solution: 'Промышленные мини-ПК с безвентиляторным охлаждением, широким диапазоном температур и ударопрочным дизайном',
        benefits: ['Безвентиляторное охлаждение', 'Широкий диапазон температур', 'Устойчивость к ударам', 'Долгосрочная доступность'],
        color: 'orange'
      },
      {
        title: 'Здравоохранение',
        icon: '🏥',
        image: '/images/industry-solution-healthcare.webp',
        challenge: 'Медицинским учреждениям нужны сертифицированные надежные системы для управления данными пациентов',
        solution: 'Медицинские вычислительные решения с сертификатами, антимикробным покрытием и бесшумной работой',
        benefits: ['Медицинские сертификаты', 'Антимикробное покрытие', 'Бесшумная работа', 'Соответствие HIPAA'],
        color: 'green'
      },
      {
        title: 'Розничная торговля',
        icon: '🛒',
        image: '/images/industry-solution-retail.webp',
        challenge: 'Розничным предприятиям нужны компактные надежные POS-системы для высоких объемов транзакций',
        solution: 'Компактные мини-ПК, оптимизированные для POS-приложений с множественными портами I/O',
        benefits: ['Компактный размер', 'Множество портов I/O', 'Работа 24/7', 'Совместимость с POS ПО'],
        color: 'purple'
      }
    ]
  }
}

export const INDUSTRY_SOLUTIONS_CONTENT_LIMITS = {
  title: { max: 40, recommended: { min: 10, max: 25 } },
  subtitle: { max: 100, recommended: { min: 20, max: 60 } },
  challenge: { max: 200, recommended: { min: 50, max: 150 } },
  solution: { max: 200, recommended: { min: 50, max: 150 } }
} as const