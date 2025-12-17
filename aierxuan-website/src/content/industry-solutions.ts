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
  'zh-CN': {
    title: '行业解决方案',
    subtitle: '针对特定行业挑战的定制解决方案',
    learnMore: '了解更多',
    viewCase: '查看案例研究',
    solutions: [
      {
        title: '教育行业',
        icon: '🎓',
        image: '/images/corporate-business-solution.webp',
        challenge: '学校需要可靠、高性价比的计算解决方案，能够处理多样化的教育软件并支持远程学习',
        solution: '我们的教育级笔记本电脑和迷你PC为IT管理员提供卓越的性能、耐用性和简便的管理',
        benefits: ['经济实惠的价格', '耐用的构造', '简单的设备管理', '教育软件兼容'],
        color: 'blue'
      },
      {
        title: '工业制造',
        icon: '🏭',
        image: '/images/industry-solution-manufacturing.webp',
        challenge: '制造环境需要坚固的系统，能够承受恶劣条件并保持24/7的可靠性',
        solution: '工业级迷你PC，具有无风扇冷却、宽温度范围和抗冲击设计，适用于工厂车间',
        benefits: ['无风扇冷却设计', '宽温度范围', '抗冲击和振动', '长期可用性'],
        color: 'orange'
      },
      {
        title: '医疗保健',
        icon: '🏥',
        image: '/images/industry-solution-healthcare.webp',
        challenge: '医疗机构需要经过认证的可靠系统，用于患者数据管理和医学成像应用',
        solution: '医疗级计算解决方案，具有认证、抗菌涂层和静音操作，适用于患者护理区域',
        benefits: ['医疗认证', '抗菌涂层', '静音操作', '符合HIPAA标准'],
        color: 'green'
      },
      {
        title: '零售酒店业',
        icon: '🛒',
        image: '/images/industry-solution-retail.webp',
        challenge: '零售企业需要紧凑、可靠的POS系统，能够处理高交易量并与现有软件集成',
        solution: '为POS应用优化的紧凑型迷你PC，具有多种I/O选项和可靠的24/7运行',
        benefits: ['紧凑的外形', '多个I/O端口', '24/7运行', 'POS软件兼容'],
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