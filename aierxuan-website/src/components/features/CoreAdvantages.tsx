'use client'

import { useLanguage } from '@/store/useAppStore'

// Translations
const translations = {
  en: {
    title: 'Why Choose AIERXUAN?',
    subtitle: 'Our Core Advantages',
    advantages: [
      {
        icon: '⚡',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'Exceptional Performance',
        description: 'Premium components and advanced cooling solutions ensure reliable operation under heavy workloads',
        stats: 'Up to 40% faster',
        details: ['Latest Intel/AMD processors', 'Advanced thermal management', 'High-speed memory and storage', '24/7 operation capable']
      },
      {
        icon: '🛡️',
        image: '/images/quality-certification-lab.jpg',
        title: 'Enterprise-Grade Stability',
        description: 'Rigorous testing and quality control processes guarantee long-term reliability',
        stats: '1000+ hours tested',
        details: ['Comprehensive stress testing', 'Quality assurance protocols', 'Extended burn-in testing', 'ISO certified processes']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Flexible Customization',
        description: 'Full customization of interfaces, chassis, firmware, and branding to meet your exact needs',
        stats: '100% customizable',
        details: ['Custom I/O configurations', 'Branded chassis options', 'Firmware customization', 'Logo and packaging']
      },
      {
        icon: '🌍',
        image: '/images/global-supply-chain-logistics.jpg',
        title: 'Global Supply Chain',
        description: 'Multi-warehouse logistics and efficient delivery ensure on-time fulfillment worldwide',
        stats: '50+ countries served',
        details: ['Multiple warehouse locations', 'Fast shipping options', 'Global logistics partners', 'Customs support']
      }
    ]
  },
  ru: {
    title: 'Почему выбирают AIERXUAN?',
    subtitle: 'Наши основные преимущества',
    advantages: [
      {
        icon: '⚡',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'Исключительная производительность',
        description: 'Премиальные компоненты и передовые решения охлаждения обеспечивают надежную работу при высоких нагрузках',
        stats: 'До 40% быстрее',
        details: ['Новейшие процессоры Intel/AMD', 'Продвинутое управление температурой', 'Высокоскоростная память и хранилище', 'Работа 24/7']
      },
      {
        icon: '🛡️',
        image: '/images/quality-certification-lab.jpg',
        title: 'Стабильность корпоративного уровня',
        description: 'Строгое тестирование и контроль качества гарантируют долгосрочную надежность',
        stats: 'Более 1000 часов тестирования',
        details: ['Комплексное стресс-тестирование', 'Протоколы обеспечения качества', 'Расширенное тестирование', 'Сертифицированные процессы ISO']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Гибкая настройка',
        description: 'Полная настройка интерфейсов, корпуса, прошивки и брендинга в соответствии с вашими требованиями',
        stats: '100% настраиваемый',
        details: ['Пользовательские конфигурации I/O', 'Варианты брендированного корпуса', 'Настройка прошивки', 'Логотип и упаковка']
      },
      {
        icon: '🌍',
        image: '/images/global-supply-chain-logistics.jpg',
        title: 'Глобальная цепочка поставок',
        description: 'Многоскладская логистика и эффективная доставка обеспечивают своевременное выполнение по всему миру',
        stats: 'Обслуживание в 50+ странах',
        details: ['Несколько складских локаций', 'Быстрые варианты доставки', 'Глобальные логистические партнеры', 'Таможенная поддержка']
      }
    ]
  },
  ja: {
    title: 'AIERXUANを選ぶ理由',
    subtitle: '私たちの中核的な強み',
    advantages: [
      {
        icon: '⚡',
        image: '/images/exceptional-performance-hardware.jpg',
        title: '卓越した性能',
        description: 'プレミアムコンポーネントと高度な冷却ソリューションにより、高負荷下でも信頼性の高い動作を保証',
        stats: '最大40%高速',
        details: ['最新のIntel/AMDプロセッサ', '高度な熱管理', '高速メモリとストレージ', '24時間365日稼働可能']
      },
      {
        icon: '🛡️',
        image: '/images/quality-certification-lab.jpg',
        title: 'エンタープライズグレードの安定性',
        description: '厳格なテストと品質管理プロセスにより、長期的な信頼性を保証',
        stats: '1000時間以上のテスト',
        details: ['包括的なストレステスト', '品質保証プロトコル', '拡張バーンインテスト', 'ISO認証プロセス']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: '柔軟なカスタマイズ',
        description: 'インターフェース、シャーシ、ファームウェア、ブランディングの完全なカスタマイズが可能',
        stats: '100%カスタマイズ可能',
        details: ['カスタムI/O構成', 'ブランドシャーシオプション', 'ファームウェアカスタマイズ', 'ロゴとパッケージング']
      },
      {
        icon: '🌍',
        image: '/images/global-supply-chain-logistics.jpg',
        title: 'グローバルサプライチェーン',
        description: 'マルチ倉庫物流と効率的な配送により、世界中で時間通りの納品を実現',
        stats: '50カ国以上にサービス提供',
        details: ['複数の倉庫拠点', '高速配送オプション', 'グローバル物流パートナー', '税関サポート']
      }
    ]
  },
  fr: {
    title: 'Pourquoi choisir AIERXUAN?',
    subtitle: 'Nos avantages principaux',
    advantages: [
      {
        icon: '⚡',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'Performance exceptionnelle',
        description: 'Composants premium et solutions de refroidissement avancées garantissent un fonctionnement fiable sous charges lourdes',
        stats: 'Jusqu\'à 40% plus rapide',
        details: ['Derniers processeurs Intel/AMD', 'Gestion thermique avancée', 'Mémoire et stockage haute vitesse', 'Fonctionnement 24/7']
      },
      {
        icon: '🛡️',
        image: '/images/quality-certification-lab.jpg',
        title: 'Stabilité de niveau entreprise',
        description: 'Tests rigoureux et processus de contrôle qualité garantissent une fiabilité à long terme',
        stats: 'Plus de 1000 heures testées',
        details: ['Tests de stress complets', 'Protocoles d\'assurance qualité', 'Tests de rodage étendus', 'Processus certifiés ISO']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Personnalisation flexible',
        description: 'Personnalisation complète des interfaces, châssis, firmware et branding selon vos besoins',
        stats: '100% personnalisable',
        details: ['Configurations I/O personnalisées', 'Options de châssis de marque', 'Personnalisation du firmware', 'Logo et emballage']
      },
      {
        icon: '🌍',
        image: '/images/global-supply-chain-logistics.jpg',
        title: 'Chaîne d\'approvisionnement mondiale',
        description: 'Logistique multi-entrepôts et livraison efficace assurent une exécution ponctuelle dans le monde entier',
        stats: 'Plus de 50 pays desservis',
        details: ['Plusieurs emplacements d\'entrepôt', 'Options d\'expédition rapide', 'Partenaires logistiques mondiaux', 'Support douanier']
      }
    ]
  },
  pt: {
    title: 'Por que escolher AIERXUAN?',
    subtitle: 'Nossas principais vantagens',
    advantages: [
      {
        icon: '⚡',
        image: '/images/exceptional-performance-hardware.jpg',
        title: 'Desempenho excepcional',
        description: 'Componentes premium e soluções avançadas de resfriamento garantem operação confiável sob cargas pesadas',
        stats: 'Até 40% mais rápido',
        details: ['Processadores Intel/AMD mais recentes', 'Gerenciamento térmico avançado', 'Memória e armazenamento de alta velocidade', 'Operação 24/7']
      },
      {
        icon: '🛡️',
        image: '/images/quality-certification-lab.jpg',
        title: 'Estabilidade de nível empresarial',
        description: 'Testes rigorosos e processos de controle de qualidade garantem confiabilidade a longo prazo',
        stats: 'Mais de 1000 horas testadas',
        details: ['Testes de estresse abrangentes', 'Protocolos de garantia de qualidade', 'Testes de burn-in estendidos', 'Processos certificados ISO']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: 'Personalização flexível',
        description: 'Personalização completa de interfaces, chassis, firmware e branding para atender suas necessidades exatas',
        stats: '100% personalizável',
        details: ['Configurações de I/O personalizadas', 'Opções de chassis de marca', 'Personalização de firmware', 'Logo e embalagem']
      },
      {
        icon: '🌍',
        image: '/images/global-supply-chain-logistics.jpg',
        title: 'Cadeia de suprimentos global',
        description: 'Logística multi-armazém e entrega eficiente garantem cumprimento pontual em todo o mundo',
        stats: 'Mais de 50 países atendidos',
        details: ['Múltiplas localizações de armazém', 'Opções de envio rápido', 'Parceiros logísticos globais', 'Suporte aduaneiro']
      }
    ]
  },
  'zh-CN': {
    title: '为什么选择 AIERXUAN？',
    subtitle: '我们的核心优势',
    advantages: [
      {
        icon: '⚡',
        image: '/images/exceptional-performance-hardware.jpg',
        title: '卓越性能',
        description: '采用顶级主控与散热方案，保证长时间高负载运行',
        stats: '性能提升达 40%',
        details: ['最新 Intel/AMD 处理器', '先进散热管理', '高速内存和存储', '支持 24/7 运行']
      },
      {
        icon: '🛡️',
        image: '/images/quality-certification-lab.jpg',
        title: '企业级稳定性',
        description: '1000+ 小时严格测试与质量管控，确保长期可靠性',
        stats: '1000+ 小时测试',
        details: ['全面压力测试', '质量保证协议', '延长老化测试', 'ISO 认证流程']
      },
      {
        icon: '🎨',
        image: '/images/oem-customization-service.jpg',
        title: '灵活定制能力',
        description: '接口、外壳、固件全面可定制，满足您的精确需求',
        stats: '100% 可定制',
        details: ['自定义 I/O 配置', '品牌机箱选项', '固件定制', 'Logo 和包装']
      },
      {
        icon: '🌍',
        image: '/images/global-supply-chain-logistics.jpg',
        title: '全球供应链',
        description: '多仓储布局，准时交付全球客户',
        stats: '服务 50+ 国家',
        details: ['多个仓库位置', '快速运输选项', '全球物流合作伙伴', '海关支持']
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

