'use client'

import { useLanguage } from '@/store/useAppStore'
import { useContactForm } from '@/hooks/useContactForm'

// Pricing info translations
const pricingContent = {
  en: {
    title: 'Flexible Pricing for Every Order Size',
    subtitle: 'From single samples to bulk orders, we accommodate all your needs',
    description: 'Our pricing is competitive and transparent. Contact us for a detailed quote based on your specific requirements.',
    orderTypes: [
      {
        icon: '📦',
        type: 'Sample Order',
        moq: '1 Unit',
        description: 'Perfect for evaluation and testing',
        priceRange: 'Contact for quote',
        features: ['Full customization available', 'Quick turnaround', 'Technical support included']
      },
      {
        icon: '📊',
        type: 'Small Batch',
        moq: '10-50 Units',
        description: 'Ideal for pilot projects and small deployments',
        priceRange: 'Typical range: FOB $XXX-XXX',
        features: ['Volume discounts apply', 'Flexible payment terms', 'Priority production']
      },
      {
        icon: '🏭',
        type: 'Bulk Order',
        moq: '50+ Units',
        description: 'Best value for large-scale deployments',
        priceRange: 'Competitive wholesale pricing',
        features: ['Maximum cost savings', 'Dedicated account manager', 'Custom packaging options']
      }
    ],
    cta: 'Get Your Custom Quote',
    note: '* Prices vary based on specifications, quantity, and customization requirements. FOB terms available.'
  },
  ru: {
    title: 'Гибкие цены для любого объема заказа',
    subtitle: 'От единичных образцов до оптовых заказов - мы удовлетворяем все ваши потребности',
    description: 'Наши цены конкурентоспособны и прозрачны. Свяжитесь с нами для получения детального предложения.',
    orderTypes: [
      {
        icon: '📦',
        type: 'Образец',
        moq: '1 единица',
        description: 'Идеально для оценки и тестирования',
        priceRange: 'Свяжитесь для предложения',
        features: ['Полная настройка', 'Быстрая доставка', 'Техническая поддержка']
      },
      {
        icon: '📊',
        type: 'Малая партия',
        moq: '10-50 единиц',
        description: 'Подходит для пилотных проектов',
        priceRange: 'Типичный диапазон: FOB $XXX-XXX',
        features: ['Скидки на объем', 'Гибкие условия оплаты', 'Приоритетное производство']
      },
      {
        icon: '🏭',
        type: 'Оптовый заказ',
        moq: '50+ единиц',
        description: 'Лучшая цена для крупных развертываний',
        priceRange: 'Конкурентные оптовые цены',
        features: ['Максимальная экономия', 'Личный менеджер', 'Индивидуальная упаковка']
      }
    ],
    cta: 'Получить предложение',
    note: '* Цены варьируются в зависимости от спецификаций, количества и требований к настройке.'
  },
  ja: {
    title: '柔軟な価格設定',
    subtitle: 'サンプルから大量注文まで、あらゆるニーズに対応',
    description: '競争力のある透明な価格設定。詳細な見積もりについてはお問い合わせください。',
    orderTypes: [
      {
        icon: '📦',
        type: 'サンプル注文',
        moq: '1台',
        description: '評価とテストに最適',
        priceRange: '見積もりについてはお問い合わせ',
        features: ['完全なカスタマイズ可能', '迅速な納期', '技術サポート込み']
      },
      {
        icon: '📊',
        type: '小ロット',
        moq: '10-50台',
        description: 'パイロットプロジェクトに最適',
        priceRange: '一般的な範囲: FOB $XXX-XXX',
        features: ['数量割引適用', '柔軟な支払条件', '優先生産']
      },
      {
        icon: '🏭',
        type: '大量注文',
        moq: '50台以上',
        description: '大規模展開に最適な価格',
        priceRange: '競争力のある卸売価格',
        features: ['最大コスト削減', '専任アカウントマネージャー', 'カスタムパッケージ']
      }
    ],
    cta: 'カスタム見積もりを取得',
    note: '* 価格は仕様、数量、カスタマイズ要件により異なります。'
  },
  fr: {
    title: 'Prix flexibles pour toutes les tailles de commande',
    subtitle: 'Des échantillons uniques aux commandes en gros',
    description: 'Nos prix sont compétitifs et transparents. Contactez-nous pour un devis détaillé.',
    orderTypes: [
      {
        icon: '📦',
        type: 'Échantillon',
        moq: '1 unité',
        description: 'Parfait pour l\'évaluation',
        priceRange: 'Contactez pour un devis',
        features: ['Personnalisation complète', 'Livraison rapide', 'Support technique inclus']
      },
      {
        icon: '📊',
        type: 'Petit lot',
        moq: '10-50 unités',
        description: 'Idéal pour projets pilotes',
        priceRange: 'Gamme typique: FOB $XXX-XXX',
        features: ['Remises sur volume', 'Conditions flexibles', 'Production prioritaire']
      },
      {
        icon: '🏭',
        type: 'Commande en gros',
        moq: '50+ unités',
        description: 'Meilleur rapport qualité-prix',
        priceRange: 'Prix de gros compétitifs',
        features: ['Économies maximales', 'Gestionnaire dédié', 'Emballage personnalisé']
      }
    ],
    cta: 'Obtenir votre devis',
    note: '* Les prix varient selon les spécifications, la quantité et les exigences de personnalisation.'
  },
  pt: {
    title: 'Preços flexíveis para qualquer tamanho de pedido',
    subtitle: 'De amostras únicas a pedidos em massa',
    description: 'Nossos preços são competitivos e transparentes. Entre em contato para um orçamento detalhado.',
    orderTypes: [
      {
        icon: '📦',
        type: 'Amostra',
        moq: '1 unidade',
        description: 'Perfeito para avaliação',
        priceRange: 'Entre em contato para cotação',
        features: ['Personalização completa', 'Entrega rápida', 'Suporte técnico incluído']
      },
      {
        icon: '📊',
        type: 'Lote pequeno',
        moq: '10-50 unidades',
        description: 'Ideal para projetos piloto',
        priceRange: 'Faixa típica: FOB $XXX-XXX',
        features: ['Descontos por volume', 'Condições flexíveis', 'Produção prioritária']
      },
      {
        icon: '🏭',
        type: 'Pedido em massa',
        moq: '50+ unidades',
        description: 'Melhor custo-benefício',
        priceRange: 'Preços competitivos no atacado',
        features: ['Economia máxima', 'Gerente dedicado', 'Embalagem personalizada']
      }
    ],
    cta: 'Obter sua cotação',
    note: '* Os preços variam de acordo com especificações, quantidade e requisitos de personalização.'
  },
  'zh-CN': {
    title: '灵活的价格方案，满足各种订单规模',
    subtitle: '从单个样品到批量订单，我们满足您的所有需求',
    description: '我们的价格具有竞争力且透明。联系我们获取基于您具体需求的详细报价。',
    orderTypes: [
      {
        icon: '📦',
        type: '样品订单',
        moq: '1台起订',
        description: '适合评估和测试',
        priceRange: '联系获取报价',
        features: ['支持完全定制', '快速交付', '包含技术支持']
      },
      {
        icon: '📊',
        type: '小批量',
        moq: '10-50台',
        description: '适合试点项目和小规模部署',
        priceRange: '典型范围: FOB $XXX-XXX',
        features: ['享受数量折扣', '灵活付款条款', '优先生产排期']
      },
      {
        icon: '🏭',
        type: '批量订单',
        moq: '50台以上',
        description: '大规模部署的最佳选择',
        priceRange: '具竞争力的批发价格',
        features: ['最大成本节约', '专属客户经理', '定制包装选项']
      }
    ],
    cta: '获取定制报价',
    note: '* 价格根据规格、数量和定制要求而有所不同。提供FOB条款。'
  }
}

export function PricingInfo() {
  const language = useLanguage()
  const { openContactModal } = useContactForm()
  const content = pricingContent[language] || pricingContent.en

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            {content.subtitle}
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content.orderTypes.map((orderType, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{orderType.icon}</div>

              {/* Type */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                {orderType.type}
              </h3>

              {/* MOQ Badge */}
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-center font-semibold mb-4 inline-block w-full">
                MOQ: {orderType.moq}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-center">
                {orderType.description}
              </p>

              {/* Price Range */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg text-center font-bold mb-6">
                {orderType.priceRange}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {orderType.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={openContactModal}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {content.cta}
          </button>
        </div>

        {/* Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {content.note}
        </p>
      </div>
    </section>
  )
}
