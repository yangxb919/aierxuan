'use client'

import { useLanguage } from '@/store/useAppStore'

// Translations
const translations = {
  en: {
    title: 'Our Manufacturing Capability',
    subtitle: 'State-of-the-art facilities and quality control',
    description: 'With advanced manufacturing facilities and strict quality control processes, we ensure every product meets the highest standards.',
    capabilities: [
      {
        title: 'Modern Factory',
        description: 'State-of-the-art manufacturing facility with automated production lines',
        image: 'https://file.302.ai/gpt/imgs/20251031/85e9de0383c3348e13c6973187a9caf0.jpg',
        icon: '🏭',
        stats: [
          { value: '50,000+', label: 'Units/Month Capacity' },
          { value: '10,000㎡', label: 'Production Floor' }
        ]
      },
      {
        title: 'Production Line',
        description: 'Advanced automated assembly and testing systems ensuring consistent quality',
        image: 'https://file.302.ai/gpt/imgs/20251031/089e2f33ad540234f1175bb0c9c92686.jpg',
        icon: '⚙️',
        stats: [
          { value: '15+', label: 'Production Lines' },
          { value: '98%', label: 'Automation Rate' }
        ]
      },
      {
        title: 'Quality Control',
        description: 'Comprehensive testing and inspection at every production stage',
        image: 'https://file.302.ai/gpt/imgs/20251031/434d2532537298ba008198c4720e1252.jpg',
        icon: '🔬',
        stats: [
          { value: '100%', label: 'Product Testing' },
          { value: 'ISO 9001', label: 'Certified' }
        ]
      },
      {
        title: 'Warehouse & Logistics',
        description: 'Efficient inventory management and global shipping capabilities',
        image: 'https://file.302.ai/gpt/imgs/20251031/aa6de7b61bc38a45c14a2f47175fdcb0.jpg',
        icon: '📦',
        stats: [
          { value: '24-48h', label: 'Fast Delivery' },
          { value: '100+', label: 'Countries Served' }
        ]
      }
    ],
    features: [
      'Advanced manufacturing equipment',
      'Strict quality control system',
      'Experienced technical team',
      'Global logistics network'
    ]
  },
  ru: {
    title: 'Наши производственные мощности',
    subtitle: 'Современное оборудование и контроль качества',
    description: 'Благодаря передовым производственным мощностям и строгим процессам контроля качества мы гарантируем соответствие каждого продукта высочайшим стандартам.',
    capabilities: [
      {
        title: 'Современный завод',
        description: 'Современное производственное предприятие с автоматизированными линиями',
        image: 'https://file.302.ai/gpt/imgs/20251031/85e9de0383c3348e13c6973187a9caf0.jpg',
        icon: '🏭',
        stats: [
          { value: '50,000+', label: 'Единиц/месяц' },
          { value: '10,000㎡', label: 'Производственная площадь' }
        ]
      },
      {
        title: 'Производственная линия',
        description: 'Передовые автоматизированные системы сборки и тестирования',
        image: 'https://file.302.ai/gpt/imgs/20251031/089e2f33ad540234f1175bb0c9c92686.jpg',
        icon: '⚙️',
        stats: [
          { value: '15+', label: 'Производственных линий' },
          { value: '98%', label: 'Уровень автоматизации' }
        ]
      },
      {
        title: 'Контроль качества',
        description: 'Комплексное тестирование и проверка на каждом этапе производства',
        image: 'https://file.302.ai/gpt/imgs/20251031/434d2532537298ba008198c4720e1252.jpg',
        icon: '🔬',
        stats: [
          { value: '100%', label: 'Тестирование продукции' },
          { value: 'ISO 9001', label: 'Сертифицировано' }
        ]
      },
      {
        title: 'Склад и логистика',
        description: 'Эффективное управление запасами и возможности глобальной доставки',
        image: 'https://file.302.ai/gpt/imgs/20251031/aa6de7b61bc38a45c14a2f47175fdcb0.jpg',
        icon: '📦',
        stats: [
          { value: '24-48ч', label: 'Быстрая доставка' },
          { value: '100+', label: 'Обслуживаемых стран' }
        ]
      }
    ],
    features: [
      'Передовое производственное оборудование',
      'Строгая система контроля качества',
      'Опытная техническая команда',
      'Глобальная логистическая сеть'
    ]
  },
  ja: {
    title: '製造能力',
    subtitle: '最新設備と品質管理',
    description: '先進的な製造設備と厳格な品質管理プロセスにより、すべての製品が最高基準を満たすことを保証します。',
    capabilities: [
      {
        title: '最新工場',
        description: '自動化された生産ラインを備えた最先端の製造施設',
        image: 'https://file.302.ai/gpt/imgs/20251031/85e9de0383c3348e13c6973187a9caf0.jpg',
        icon: '🏭',
        stats: [
          { value: '50,000+', label: '月間生産能力' },
          { value: '10,000㎡', label: '生産フロア' }
        ]
      },
      {
        title: '生産ライン',
        description: '一貫した品質を保証する高度な自動組立・試験システム',
        image: 'https://file.302.ai/gpt/imgs/20251031/089e2f33ad540234f1175bb0c9c92686.jpg',
        icon: '⚙️',
        stats: [
          { value: '15+', label: '生産ライン' },
          { value: '98%', label: '自動化率' }
        ]
      },
      {
        title: '品質管理',
        description: 'すべての生産段階での包括的なテストと検査',
        image: 'https://file.302.ai/gpt/imgs/20251031/434d2532537298ba008198c4720e1252.jpg',
        icon: '🔬',
        stats: [
          { value: '100%', label: '製品テスト' },
          { value: 'ISO 9001', label: '認証取得' }
        ]
      },
      {
        title: '倉庫・物流',
        description: '効率的な在庫管理とグローバル配送能力',
        image: 'https://file.302.ai/gpt/imgs/20251031/aa6de7b61bc38a45c14a2f47175fdcb0.jpg',
        icon: '📦',
        stats: [
          { value: '24-48時間', label: '迅速配送' },
          { value: '100+', label: 'サービス提供国' }
        ]
      }
    ],
    features: [
      '先進的な製造装置',
      '厳格な品質管理システム',
      '経験豊富な技術チーム',
      'グローバル物流ネットワーク'
    ]
  },
  fr: {
    title: 'Nos capacités de fabrication',
    subtitle: 'Installations de pointe et contrôle qualité',
    description: 'Avec des installations de fabrication avancées et des processus de contrôle qualité stricts, nous garantissons que chaque produit répond aux normes les plus élevées.',
    capabilities: [
      {
        title: 'Usine moderne',
        description: 'Installation de fabrication de pointe avec lignes de production automatisées',
        image: 'https://file.302.ai/gpt/imgs/20251031/85e9de0383c3348e13c6973187a9caf0.jpg',
        icon: '🏭',
        stats: [
          { value: '50,000+', label: 'Unités/mois' },
          { value: '10,000㎡', label: 'Surface de production' }
        ]
      },
      {
        title: 'Ligne de production',
        description: 'Systèmes d\'assemblage et de test automatisés avancés',
        image: 'https://file.302.ai/gpt/imgs/20251031/089e2f33ad540234f1175bb0c9c92686.jpg',
        icon: '⚙️',
        stats: [
          { value: '15+', label: 'Lignes de production' },
          { value: '98%', label: 'Taux d\'automatisation' }
        ]
      },
      {
        title: 'Contrôle qualité',
        description: 'Tests et inspections complets à chaque étape de production',
        image: 'https://file.302.ai/gpt/imgs/20251031/434d2532537298ba008198c4720e1252.jpg',
        icon: '🔬',
        stats: [
          { value: '100%', label: 'Tests produits' },
          { value: 'ISO 9001', label: 'Certifié' }
        ]
      },
      {
        title: 'Entrepôt et logistique',
        description: 'Gestion efficace des stocks et capacités d\'expédition mondiale',
        image: 'https://file.302.ai/gpt/imgs/20251031/aa6de7b61bc38a45c14a2f47175fdcb0.jpg',
        icon: '📦',
        stats: [
          { value: '24-48h', label: 'Livraison rapide' },
          { value: '100+', label: 'Pays desservis' }
        ]
      }
    ],
    features: [
      'Équipement de fabrication avancé',
      'Système de contrôle qualité strict',
      'Équipe technique expérimentée',
      'Réseau logistique mondial'
    ]
  },
  pt: {
    title: 'Nossa capacidade de fabricação',
    subtitle: 'Instalações de última geração e controle de qualidade',
    description: 'Com instalações de fabricação avançadas e processos rigorosos de controle de qualidade, garantimos que cada produto atenda aos mais altos padrões.',
    capabilities: [
      {
        title: 'Fábrica moderna',
        description: 'Instalação de fabricação de ponta com linhas de produção automatizadas',
        image: 'https://file.302.ai/gpt/imgs/20251031/85e9de0383c3348e13c6973187a9caf0.jpg',
        icon: '🏭',
        stats: [
          { value: '50,000+', label: 'Unidades/mês' },
          { value: '10,000㎡', label: 'Área de produção' }
        ]
      },
      {
        title: 'Linha de produção',
        description: 'Sistemas avançados de montagem e teste automatizados',
        image: 'https://file.302.ai/gpt/imgs/20251031/089e2f33ad540234f1175bb0c9c92686.jpg',
        icon: '⚙️',
        stats: [
          { value: '15+', label: 'Linhas de produção' },
          { value: '98%', label: 'Taxa de automação' }
        ]
      },
      {
        title: 'Controle de qualidade',
        description: 'Testes e inspeções abrangentes em cada estágio de produção',
        image: 'https://file.302.ai/gpt/imgs/20251031/434d2532537298ba008198c4720e1252.jpg',
        icon: '🔬',
        stats: [
          { value: '100%', label: 'Testes de produtos' },
          { value: 'ISO 9001', label: 'Certificado' }
        ]
      },
      {
        title: 'Armazém e logística',
        description: 'Gestão eficiente de estoque e capacidades de envio global',
        image: 'https://file.302.ai/gpt/imgs/20251031/aa6de7b61bc38a45c14a2f47175fdcb0.jpg',
        icon: '📦',
        stats: [
          { value: '24-48h', label: 'Entrega rápida' },
          { value: '100+', label: 'Países atendidos' }
        ]
      }
    ],
    features: [
      'Equipamento de fabricação avançado',
      'Sistema rigoroso de controle de qualidade',
      'Equipe técnica experiente',
      'Rede logística global'
    ]
  },
  'zh-CN': {
    title: '我们的制造能力',
    subtitle: '先进设备与严格品控',
    description: '凭借先进的制造设备和严格的质量控制流程，我们确保每一件产品都符合最高标准。',
    capabilities: [
      {
        title: '现代化工厂',
        description: '配备自动化生产线的先进制造设施',
        image: 'https://file.302.ai/gpt/imgs/20251031/85e9de0383c3348e13c6973187a9caf0.jpg',
        icon: '🏭',
        stats: [
          { value: '50,000+', label: '月产能（台）' },
          { value: '10,000㎡', label: '生产车间面积' }
        ]
      },
      {
        title: '生产线',
        description: '先进的自动化组装和测试系统，确保稳定的产品质量',
        image: 'https://file.302.ai/gpt/imgs/20251031/089e2f33ad540234f1175bb0c9c92686.jpg',
        icon: '⚙️',
        stats: [
          { value: '15+', label: '条生产线' },
          { value: '98%', label: '自动化率' }
        ]
      },
      {
        title: '质量控制',
        description: '每个生产环节都进行全面的测试和检验',
        image: 'https://file.302.ai/gpt/imgs/20251031/434d2532537298ba008198c4720e1252.jpg',
        icon: '🔬',
        stats: [
          { value: '100%', label: '产品测试覆盖率' },
          { value: 'ISO 9001', label: '认证' }
        ]
      },
      {
        title: '仓储物流',
        description: '高效的库存管理和全球配送能力',
        image: 'https://file.302.ai/gpt/imgs/20251031/aa6de7b61bc38a45c14a2f47175fdcb0.jpg',
        icon: '📦',
        stats: [
          { value: '24-48小时', label: '快速发货' },
          { value: '100+', label: '服务国家' }
        ]
      }
    ],
    features: [
      '先进的制造设备',
      '严格的质量控制体系',
      '经验丰富的技术团队',
      '全球物流网络'
    ]
  }
}

export function ManufacturingCapability() {
  const language = useLanguage()
  const t = translations[language] || translations.en

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {t.subtitle}
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {t.capabilities.map((capability, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${capability.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {capability.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {capability.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {t.title.replace('Our ', '').replace('我们的', '')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
