'use client'

import { useLanguage } from '@/store/useAppStore'

// Translations
const translations = {
  en: {
    title: 'Why Global Partners Choose AIERXUAN',
    subtitle: 'Proven advantages for B2B success',
    advantages: [
      {
        icon: '📦',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'Flexible MOQ',
        description: 'From 1 sample unit to 10,000+ bulk orders. Perfect for market testing and large-scale deployment.',
        stats: 'MOQ from 100 units',
        details: ['Sample orders: 1-10 units', 'Small batch: 100-500 units', 'Bulk orders: 1,000-10,000+ units', 'No hidden fees or surcharges']
      },
      {
        icon: '⚡',
        image: '/images/quality-certification-lab.jpg',
        title: 'Fast Turnaround',
        description: 'Industry-leading production speed with consistent quality. Rush orders supported for urgent needs.',
        stats: '7-15 days delivery',
        details: ['Standard lead time: 7-15 days', 'Rush orders: 3-5 days available', 'On-time delivery rate: 98%+', 'Real-time production tracking']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Full Customization',
        description: 'Complete OEM/ODM services including logo printing, packaging design, software pre-installation, and hardware configuration.',
        stats: '100% customizable',
        details: ['Logo printing & engraving', 'Custom packaging design', 'Software pre-installation', 'Hardware configuration options']
      }
    ]
  },
  ru: {
    title: 'Почему глобальные партнеры выбирают AIERXUAN',
    subtitle: 'Проверенные преимущества для успеха B2B',
    advantages: [
      {
        icon: '📦',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'Гибкий MOQ',
        description: 'От 1 образца до 10,000+ оптовых заказов. Идеально для тестирования рынка и крупномасштабного развертывания.',
        stats: 'MOQ от 100 единиц',
        details: ['Образцы: 1-10 единиц', 'Малая партия: 100-500 единиц', 'Оптовые заказы: 1,000-10,000+ единиц', 'Без скрытых комиссий']
      },
      {
        icon: '⚡',
        image: '/images/quality-certification-lab.jpg',
        title: 'Быстрое выполнение',
        description: 'Лидирующая в отрасли скорость производства с постоянным качеством. Срочные заказы поддерживаются.',
        stats: 'Доставка 7-15 дней',
        details: ['Стандартный срок: 7-15 дней', 'Срочные заказы: 3-5 дней', 'Своевременная доставка: 98%+', 'Отслеживание производства в реальном времени']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Полная кастомизация',
        description: 'Полные услуги OEM/ODM включая печать логотипа, дизайн упаковки, предустановку ПО и конфигурацию оборудования.',
        stats: '100% настраиваемый',
        details: ['Печать и гравировка логотипа', 'Индивидуальный дизайн упаковки', 'Предустановка программного обеспечения', 'Варианты конфигурации оборудования']
      }
    ]
  },
  ja: {
    title: 'グローバルパートナーがAIERXUANを選ぶ理由',
    subtitle: 'B2B成功のための実証済みの利点',
    advantages: [
      {
        icon: '📦',
        image: '/images/exceptional-performance-hardware.jpg',
        title: '柔軟なMOQ',
        description: '1サンプルから10,000+の大量注文まで。市場テストと大規模展開に最適。',
        stats: 'MOQ 100台から',
        details: ['サンプル注文: 1-10台', '小ロット: 100-500台', '大量注文: 1,000-10,000+台', '隠れた手数料なし']
      },
      {
        icon: '⚡',
        image: '/images/quality-certification-lab.jpg',
        title: '迅速な納期',
        description: '業界をリードする生産速度と一貫した品質。緊急注文にも対応。',
        stats: '7-15日配送',
        details: ['標準納期: 7-15日', '緊急注文: 3-5日対応可能', '定時配送率: 98%+', 'リアルタイム生産追跡']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: '完全カスタマイズ',
        description: 'ロゴ印刷、パッケージデザイン、ソフトウェアプリインストール、ハードウェア構成を含む完全なOEM/ODMサービス。',
        stats: '100%カスタマイズ可能',
        details: ['ロゴ印刷・刻印', 'カスタムパッケージデザイン', 'ソフトウェアプリインストール', 'ハードウェア構成オプション']
      }
    ]
  },
  fr: {
    title: 'Pourquoi les partenaires mondiaux choisissent AIERXUAN',
    subtitle: 'Avantages prouvés pour le succès B2B',
    advantages: [
      {
        icon: '📦',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'MOQ Flexible',
        description: 'De 1 échantillon à 10,000+ commandes en gros. Parfait pour les tests de marché et le déploiement à grande échelle.',
        stats: 'MOQ à partir de 100 unités',
        details: ['Commandes d\'échantillons: 1-10 unités', 'Petit lot: 100-500 unités', 'Commandes en gros: 1,000-10,000+ unités', 'Pas de frais cachés']
      },
      {
        icon: '⚡',
        image: '/images/quality-certification-lab.jpg',
        title: 'Délai Rapide',
        description: 'Vitesse de production leader dans l\'industrie avec qualité constante. Commandes urgentes prises en charge.',
        stats: 'Livraison 7-15 jours',
        details: ['Délai standard: 7-15 jours', 'Commandes urgentes: 3-5 jours disponibles', 'Taux de livraison à temps: 98%+', 'Suivi de production en temps réel']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Personnalisation Complète',
        description: 'Services OEM/ODM complets incluant impression de logo, conception d\'emballage, pré-installation de logiciels et configuration matérielle.',
        stats: '100% personnalisable',
        details: ['Impression et gravure de logo', 'Conception d\'emballage personnalisée', 'Pré-installation de logiciels', 'Options de configuration matérielle']
      }
    ]
  },
  pt: {
    title: 'Por que parceiros globais escolhem AIERXUAN',
    subtitle: 'Vantagens comprovadas para sucesso B2B',
    advantages: [
      {
        icon: '📦',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'MOQ Flexível',
        description: 'De 1 amostra a 10,000+ pedidos em massa. Perfeito para testes de mercado e implantação em larga escala.',
        stats: 'MOQ a partir de 100 unidades',
        details: ['Pedidos de amostra: 1-10 unidades', 'Lote pequeno: 100-500 unidades', 'Pedidos em massa: 1,000-10,000+ unidades', 'Sem taxas ocultas']
      },
      {
        icon: '⚡',
        image: '/images/quality-certification-lab.jpg',
        title: 'Entrega Rápida',
        description: 'Velocidade de produção líder do setor com qualidade consistente. Pedidos urgentes suportados.',
        stats: 'Entrega 7-15 dias',
        details: ['Prazo padrão: 7-15 dias', 'Pedidos urgentes: 3-5 dias disponíveis', 'Taxa de entrega pontual: 98%+', 'Rastreamento de produção em tempo real']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Personalização Completa',
        description: 'Serviços OEM/ODM completos incluindo impressão de logo, design de embalagem, pré-instalação de software e configuração de hardware.',
        stats: '100% personalizável',
        details: ['Impressão e gravação de logo', 'Design de embalagem personalizado', 'Pré-instalação de software', 'Opções de configuração de hardware']
      }
    ]
  },
  'zh-CN': {
    title: '全球合作伙伴为何选择AIERXUAN',
    subtitle: 'B2B成功的实证优势',
    advantages: [
      {
        icon: '📦',
        image: '/images/exceptional-performance-hardware.jpg',
        title: '灵活起订量',
        description: '从1台样品到10,000+批量订单。完美适配市场测试和大规模部署。',
        stats: '起订量100台起',
        details: ['样品订单: 1-10台', '小批量: 100-500台', '批量订单: 1,000-10,000+台', '无隐藏费用']
      },
      {
        icon: '⚡',
        image: '/images/quality-certification-lab.jpg',
        title: '快速交付',
        description: '行业领先的生产速度，品质始终如一。支持紧急订单。',
        stats: '7-15天交付',
        details: ['标准交期: 7-15天', '紧急订单: 3-5天可选', '准时交付率: 98%+', '实时生产追踪']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: '全面定制',
        description: '完整的OEM/ODM服务，包括Logo印刷、包装设计、软件预装和硬件配置。',
        stats: '100%可定制',
        details: ['Logo印刷与雕刻', '定制包装设计', '软件预装服务', '硬件配置选项']
      }
    ]
  }
}

export function CoreAdvantages() {
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
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image or Icon */}
              {advantage.image ? (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={advantage.image}
                    alt={advantage.title}
                    className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {advantage.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {advantage.title}
              </h3>

              {/* Stats Badge */}
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                {advantage.stats}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {advantage.description}
              </p>

              {/* Details - Always visible */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {advantage.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
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
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

