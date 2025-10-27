'use client'

import { useLanguage } from '@/store/useAppStore'
import { Button } from '@/components/ui'

// Translations
const translations = {
  en: {
    title: 'Technical Excellence',
    subtitle: 'Our R&D capabilities and quality assurance',
    downloadWhitepaper: 'Download Technical Whitepaper',
    capabilities: [
      {
        title: 'Advanced R&D',
        icon: '🔬',
        image: '/images/advanced-manufacturing-facility.jpg',
        description: 'Dedicated research and development team with 10+ years of experience in hardware design and optimization',
        features: [
          'In-house hardware design',
          'Firmware development',
          'Performance optimization',
          'Continuous innovation'
        ]
      },
      {
        title: 'Thermal Management',
        icon: '❄️',
        image: '/images/technical-thermal-management.jpg',
        description: 'Industry-leading cooling solutions ensuring optimal performance and longevity even under heavy workloads',
        features: [
          'Advanced heat pipe design',
          'Fanless cooling options',
          'Thermal simulation testing',
          'Wide temperature range support'
        ]
      },
      {
        title: 'Quality Control',
        icon: '✅',
        image: '/images/technical-quality-control.jpg',
        description: 'Rigorous multi-stage testing and quality assurance processes to guarantee reliability and performance',
        features: [
          '1000+ hours burn-in testing',
          'Comprehensive stress testing',
          'ISO 9001 certified processes',
          'Zero-defect manufacturing goal'
        ]
      },
      {
        title: 'Compatibility Testing',
        icon: '🔄',
        image: '/images/technical-compatibility-testing.jpg',
        description: 'Extensive compatibility validation with major operating systems, software, and peripheral devices',
        features: [
          'Windows/Linux certification',
          'Driver optimization',
          'Peripheral compatibility',
          'Software integration testing'
        ]
      }
    ],
    process: {
      title: 'Our Development Process',
      steps: [
        { number: '01', title: 'Requirements Analysis', description: 'Understanding customer needs and specifications' },
        { number: '02', title: 'Design & Prototyping', description: 'Creating optimized hardware designs' },
        { number: '03', title: 'Testing & Validation', description: 'Rigorous quality and performance testing' },
        { number: '04', title: 'Production & Delivery', description: 'Manufacturing and global logistics' }
      ]
    }
  },
  ru: {
    title: 'Техническое превосходство',
    subtitle: 'Наши возможности в области НИОКР и обеспечения качества',
    downloadWhitepaper: 'Скачать технический документ',
    capabilities: [
      {
        title: 'Передовые НИОКР',
        icon: '🔬',
        description: 'Специализированная команда исследований и разработок с опытом более 10 лет в проектировании и оптимизации оборудования',
        features: [
          'Внутреннее проектирование оборудования',
          'Разработка прошивки',
          'Оптимизация производительности',
          'Непрерывные инновации'
        ]
      },
      {
        title: 'Управление температурой',
        icon: '❄️',
        description: 'Ведущие в отрасли решения охлаждения, обеспечивающие оптимальную производительность и долговечность даже при высоких нагрузках',
        features: [
          'Продвинутый дизайн тепловых трубок',
          'Варианты безвентиляторного охлаждения',
          'Тестирование тепловой симуляции',
          'Поддержка широкого диапазона температур'
        ]
      },
      {
        title: 'Контроль качества',
        icon: '✅',
        description: 'Строгие многоэтапные процессы тестирования и обеспечения качества для гарантии надежности и производительности',
        features: [
          'Более 1000 часов тестирования',
          'Комплексное стресс-тестирование',
          'Сертифицированные процессы ISO 9001',
          'Цель нулевого дефекта производства'
        ]
      },
      {
        title: 'Тестирование совместимости',
        icon: '🔄',
        description: 'Обширная проверка совместимости с основными операционными системами, программным обеспечением и периферийными устройствами',
        features: [
          'Сертификация Windows/Linux',
          'Оптимизация драйверов',
          'Совместимость периферии',
          'Тестирование интеграции ПО'
        ]
      }
    ],
    process: {
      title: 'Наш процесс разработки',
      steps: [
        { number: '01', title: 'Анализ требований', description: 'Понимание потребностей и спецификаций клиента' },
        { number: '02', title: 'Проектирование и прототипирование', description: 'Создание оптимизированных аппаратных проектов' },
        { number: '03', title: 'Тестирование и валидация', description: 'Строгое тестирование качества и производительности' },
        { number: '04', title: 'Производство и доставка', description: 'Производство и глобальная логистика' }
      ]
    }
  },
  ja: {
    title: '技術的卓越性',
    subtitle: '私たちのR&D能力と品質保証',
    downloadWhitepaper: '技術ホワイトペーパーをダウンロード',
    capabilities: [
      {
        title: '高度なR&D',
        icon: '🔬',
        description: 'ハードウェア設計と最適化において10年以上の経験を持つ専任の研究開発チーム',
        features: [
          '社内ハードウェア設計',
          'ファームウェア開発',
          'パフォーマンス最適化',
          '継続的なイノベーション'
        ]
      },
      {
        title: '熱管理',
        icon: '❄️',
        description: '業界をリードする冷却ソリューションにより、高負荷下でも最適なパフォーマンスと長寿命を保証',
        features: [
          '高度なヒートパイプ設計',
          'ファンレス冷却オプション',
          '熱シミュレーションテスト',
          '広い温度範囲サポート'
        ]
      },
      {
        title: '品質管理',
        icon: '✅',
        description: '信頼性とパフォーマンスを保証するための厳格な多段階テストと品質保証プロセス',
        features: [
          '1000時間以上のバーンインテスト',
          '包括的なストレステスト',
          'ISO 9001認証プロセス',
          'ゼロ欠陥製造目標'
        ]
      },
      {
        title: '互換性テスト',
        icon: '🔄',
        description: '主要なオペレーティングシステム、ソフトウェア、周辺機器との広範な互換性検証',
        features: [
          'Windows/Linux認証',
          'ドライバー最適化',
          '周辺機器互換性',
          'ソフトウェア統合テスト'
        ]
      }
    ],
    process: {
      title: '私たちの開発プロセス',
      steps: [
        { number: '01', title: '要件分析', description: '顧客のニーズと仕様の理解' },
        { number: '02', title: '設計とプロトタイピング', description: '最適化されたハードウェア設計の作成' },
        { number: '03', title: 'テストと検証', description: '厳格な品質とパフォーマンステスト' },
        { number: '04', title: '生産と配送', description: '製造とグローバル物流' }
      ]
    }
  },
  fr: {
    title: 'Excellence technique',
    subtitle: 'Nos capacités de R&D et d\'assurance qualité',
    downloadWhitepaper: 'Télécharger le livre blanc technique',
    capabilities: [
      {
        title: 'R&D avancée',
        icon: '🔬',
        description: 'Équipe dédiée de recherche et développement avec plus de 10 ans d\'expérience en conception et optimisation matérielle',
        features: [
          'Conception matérielle interne',
          'Développement de firmware',
          'Optimisation des performances',
          'Innovation continue'
        ]
      },
      {
        title: 'Gestion thermique',
        icon: '❄️',
        description: 'Solutions de refroidissement de pointe garantissant des performances optimales et une longévité même sous charges lourdes',
        features: [
          'Conception avancée de caloduc',
          'Options de refroidissement sans ventilateur',
          'Tests de simulation thermique',
          'Support de large plage de température'
        ]
      },
      {
        title: 'Contrôle qualité',
        icon: '✅',
        description: 'Processus rigoureux de tests multi-étapes et d\'assurance qualité pour garantir fiabilité et performance',
        features: [
          'Plus de 1000 heures de tests de rodage',
          'Tests de stress complets',
          'Processus certifiés ISO 9001',
          'Objectif de fabrication zéro défaut'
        ]
      },
      {
        title: 'Tests de compatibilité',
        icon: '🔄',
        description: 'Validation extensive de compatibilité avec les principaux systèmes d\'exploitation, logiciels et périphériques',
        features: [
          'Certification Windows/Linux',
          'Optimisation des pilotes',
          'Compatibilité périphérique',
          'Tests d\'intégration logicielle'
        ]
      }
    ],
    process: {
      title: 'Notre processus de développement',
      steps: [
        { number: '01', title: 'Analyse des exigences', description: 'Comprendre les besoins et spécifications du client' },
        { number: '02', title: 'Conception et prototypage', description: 'Créer des conceptions matérielles optimisées' },
        { number: '03', title: 'Tests et validation', description: 'Tests rigoureux de qualité et de performance' },
        { number: '04', title: 'Production et livraison', description: 'Fabrication et logistique mondiale' }
      ]
    }
  },
  pt: {
    title: 'Excelência técnica',
    subtitle: 'Nossas capacidades de P&D e garantia de qualidade',
    downloadWhitepaper: 'Baixar whitepaper técnico',
    capabilities: [
      {
        title: 'P&D avançado',
        icon: '🔬',
        description: 'Equipe dedicada de pesquisa e desenvolvimento com mais de 10 anos de experiência em design e otimização de hardware',
        features: [
          'Design de hardware interno',
          'Desenvolvimento de firmware',
          'Otimização de desempenho',
          'Inovação contínua'
        ]
      },
      {
        title: 'Gerenciamento térmico',
        icon: '❄️',
        description: 'Soluções de resfriamento líderes do setor garantindo desempenho ideal e longevidade mesmo sob cargas pesadas',
        features: [
          'Design avançado de heat pipe',
          'Opções de resfriamento sem ventilador',
          'Teste de simulação térmica',
          'Suporte a ampla faixa de temperatura'
        ]
      },
      {
        title: 'Controle de qualidade',
        icon: '✅',
        description: 'Processos rigorosos de testes multi-estágios e garantia de qualidade para garantir confiabilidade e desempenho',
        features: [
          'Mais de 1000 horas de testes de burn-in',
          'Testes de estresse abrangentes',
          'Processos certificados ISO 9001',
          'Meta de fabricação zero defeito'
        ]
      },
      {
        title: 'Testes de compatibilidade',
        icon: '🔄',
        description: 'Validação extensiva de compatibilidade com principais sistemas operacionais, software e dispositivos periféricos',
        features: [
          'Certificação Windows/Linux',
          'Otimização de drivers',
          'Compatibilidade periférica',
          'Testes de integração de software'
        ]
      }
    ],
    process: {
      title: 'Nosso processo de desenvolvimento',
      steps: [
        { number: '01', title: 'Análise de requisitos', description: 'Compreender as necessidades e especificações do cliente' },
        { number: '02', title: 'Design e prototipagem', description: 'Criar designs de hardware otimizados' },
        { number: '03', title: 'Testes e validação', description: 'Testes rigorosos de qualidade e desempenho' },
        { number: '04', title: 'Produção e entrega', description: 'Fabricação e logística global' }
      ]
    }
  },
  'zh-CN': {
    title: '技术实力',
    subtitle: '我们的研发能力与质量保证',
    downloadWhitepaper: '下载技术白皮书',
    capabilities: [
      {
        title: '先进研发',
        icon: '🔬',
        description: '专业的研发团队，在硬件设计和优化方面拥有 10 年以上经验',
        features: [
          '内部硬件设计',
          '固件开发',
          '性能优化',
          '持续创新'
        ]
      },
      {
        title: '散热管理',
        icon: '❄️',
        description: '行业领先的散热解决方案，确保即使在高负载下也能保持最佳性能和使用寿命',
        features: [
          '先进热管设计',
          '无风扇冷却选项',
          '热模拟测试',
          '宽温度范围支持'
        ]
      },
      {
        title: '质量控制',
        icon: '✅',
        description: '严格的多阶段测试和质量保证流程，确保可靠性和性能',
        features: [
          '1000+ 小时老化测试',
          '全面压力测试',
          'ISO 9001 认证流程',
          '零缺陷制造目标'
        ]
      },
      {
        title: '兼容性测试',
        icon: '🔄',
        description: '与主流操作系统、软件和外围设备进行广泛的兼容性验证',
        features: [
          'Windows/Linux 认证',
          '驱动程序优化',
          '外设兼容性',
          '软件集成测试'
        ]
      }
    ],
    process: {
      title: '我们的开发流程',
      steps: [
        { number: '01', title: '需求分析', description: '了解客户需求和规格' },
        { number: '02', title: '设计与原型', description: '创建优化的硬件设计' },
        { number: '03', title: '测试与验证', description: '严格的质量和性能测试' },
        { number: '04', title: '生产与交付', description: '制造和全球物流' }
      ]
    }
  }
}

export function TechnicalCapabilities() {
  const language = useLanguage()
  const t = translations[language] || translations.en

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t.subtitle}
          </p>
          <Button size="lg" variant="outline">
            📄 {t.downloadWhitepaper}
          </Button>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {t.capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {capability.image ? (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={capability.image}
                    alt={capability.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ) : (
                <div className="text-5xl mb-4">{capability.icon}</div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {capability.description}
              </p>
              <ul className="space-y-3">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Development Process */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            {t.process.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-3">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {/* Arrow connector (hidden on last item) */}
                {index < t.process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

