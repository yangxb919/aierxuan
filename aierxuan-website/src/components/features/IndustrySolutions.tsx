'use client'

import Link from 'next/link'
import { useLanguage } from '@/store/useAppStore'
import { Button } from '@/components/ui'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

// Translations
const translations = {
  en: {
    title: 'Industry Solutions',
    subtitle: 'Tailored solutions for your specific industry challenges',
    learnMore: 'Learn More',
    viewCase: 'View Case Study',
    solutions: [
      {
        industry: 'Education',
        icon: '🎓',
        image: '/images/industry-education-solution.webp',
        challenge: 'Schools need reliable, cost-effective computing solutions that can handle diverse educational software and support remote learning',
        solution: 'Our education-grade laptops and mini PCs offer excellent performance, durability, and easy management for IT administrators',
        benefits: ['Budget-friendly pricing', 'Durable construction', 'Easy fleet management', 'Education software compatible'],
        color: 'blue'
      },
      {
        industry: 'Industrial Manufacturing',
        icon: '🏭',
        image: '/images/industry-manufacturing-solution.webp',
        challenge: 'Manufacturing environments require rugged systems that can withstand harsh conditions while maintaining 24/7 reliability',
        solution: 'Industrial-grade mini PCs with fanless cooling, wide temperature range, and shock-resistant design for factory floors',
        benefits: ['Fanless cooling design', 'Wide temperature range', 'Shock and vibration resistant', 'Long-term availability'],
        color: 'orange'
      },
      {
        industry: 'Healthcare',
        icon: '🏥',
        image: '/images/industry-healthcare-solution.webp',
        challenge: 'Medical facilities need certified, reliable systems for patient data management and medical imaging applications',
        solution: 'Medical-grade computing solutions with certifications, antimicrobial coatings, and silent operation for patient care areas',
        benefits: ['Medical certifications', 'Antimicrobial coating', 'Silent operation', 'HIPAA compliant'],
        color: 'green'
      },
      {
        industry: 'Retail & Hospitality',
        icon: '🛒',
        image: '/images/industry-retail-solution.webp',
        challenge: 'Retail businesses need compact, reliable POS systems that can handle high transaction volumes and integrate with existing software',
        solution: 'Compact mini PCs optimized for POS applications with multiple I/O options and reliable 24/7 operation',
        benefits: ['Compact footprint', 'Multiple I/O ports', '24/7 operation', 'POS software compatible'],
        color: 'purple'
      }
    ]
  },
  ru: {
    title: 'Отраслевые решения',
    subtitle: 'Индивидуальные решения для ваших отраслевых задач',
    learnMore: 'Узнать больше',
    viewCase: 'Посмотреть кейс',
    solutions: [
      {
        industry: 'Образование',
        icon: '🎓',
        image: '/images/industry-education-solution.webp',
        challenge: 'Школам нужны надежные и экономичные вычислительные решения для разнообразного образовательного ПО и дистанционного обучения',
        solution: 'Наши ноутбуки и мини-ПК для образования предлагают отличную производительность, долговечность и простое управление',
        benefits: ['Доступные цены', 'Прочная конструкция', 'Простое управление парком', 'Совместимость с образовательным ПО'],
        color: 'blue'
      },
      {
        industry: 'Промышленное производство',
        icon: '🏭',
        image: '/images/industry-manufacturing-solution.webp',
        challenge: 'Производственные среды требуют прочных систем, способных выдерживать суровые условия при работе 24/7',
        solution: 'Промышленные мини-ПК с безвентиляторным охлаждением, широким диапазоном температур и ударопрочным дизайном',
        benefits: ['Безвентиляторное охлаждение', 'Широкий диапазон температур', 'Устойчивость к ударам', 'Долгосрочная доступность'],
        color: 'orange'
      },
      {
        industry: 'Здравоохранение',
        icon: '🏥',
        image: '/images/industry-healthcare-solution.webp',
        challenge: 'Медицинским учреждениям нужны сертифицированные надежные системы для управления данными пациентов',
        solution: 'Медицинские вычислительные решения с сертификатами, антимикробным покрытием и бесшумной работой',
        benefits: ['Медицинские сертификаты', 'Антимикробное покрытие', 'Бесшумная работа', 'Соответствие HIPAA'],
        color: 'green'
      },
      {
        industry: 'Розничная торговля',
        icon: '🛒',
        image: '/images/industry-retail-solution.webp',
        challenge: 'Розничным предприятиям нужны компактные надежные POS-системы для высоких объемов транзакций',
        solution: 'Компактные мини-ПК, оптимизированные для POS-приложений с множественными портами I/O',
        benefits: ['Компактный размер', 'Множество портов I/O', 'Работа 24/7', 'Совместимость с POS ПО'],
        color: 'purple'
      }
    ]
  },
  ja: {
    title: '業界ソリューション',
    subtitle: '業界固有の課題に合わせたソリューション',
    learnMore: '詳細を見る',
    viewCase: 'ケーススタディを見る',
    solutions: [
      {
        industry: '教育',
        icon: '🎓',
        image: '/images/industry-education-solution.webp',
        challenge: '学校には、多様な教育ソフトウェアに対応し、遠隔学習をサポートする信頼性の高いコスト効率的なコンピューティングソリューションが必要',
        solution: '教育グレードのノートPCとミニPCは、優れた性能、耐久性、IT管理者向けの簡単な管理を提供',
        benefits: ['予算に優しい価格', '耐久性のある構造', '簡単なフリート管理', '教育ソフトウェア互換'],
        color: 'blue'
      },
      {
        industry: '産業製造',
        icon: '🏭',
        image: '/images/industry-manufacturing-solution.webp',
        challenge: '製造環境では、過酷な条件に耐えながら24時間365日の信頼性を維持できる堅牢なシステムが必要',
        solution: 'ファンレス冷却、広い温度範囲、工場フロア向けの耐衝撃設計を備えた産業グレードミニPC',
        benefits: ['ファンレス冷却設計', '広い温度範囲', '耐衝撃・耐振動', '長期供給保証'],
        color: 'orange'
      },
      {
        industry: 'ヘルスケア',
        icon: '🏥',
        image: '/images/industry-healthcare-solution.webp',
        challenge: '医療施設には、患者データ管理と医療画像アプリケーション用の認定された信頼性の高いシステムが必要',
        solution: '認証、抗菌コーティング、患者ケアエリア向けの静音動作を備えた医療グレードコンピューティングソリューション',
        benefits: ['医療認証', '抗菌コーティング', '静音動作', 'HIPAA準拠'],
        color: 'green'
      },
      {
        industry: '小売・ホスピタリティ',
        icon: '🛒',
        image: '/images/industry-retail-solution.webp',
        challenge: '小売業には、高いトランザクション量を処理し、既存のソフトウェアと統合できるコンパクトで信頼性の高いPOSシステムが必要',
        solution: 'POSアプリケーション向けに最適化された、複数のI/Oオプションと24時間365日の信頼性の高い動作を備えたコンパクトミニPC',
        benefits: ['コンパクトサイズ', '複数のI/Oポート', '24時間365日動作', 'POSソフトウェア互換'],
        color: 'purple'
      }
    ]
  },
  fr: {
    title: 'Solutions sectorielles',
    subtitle: 'Solutions sur mesure pour vos défis sectoriels spécifiques',
    learnMore: 'En savoir plus',
    viewCase: 'Voir l\'étude de cas',
    solutions: [
      {
        industry: 'Éducation',
        icon: '🎓',
        image: '/images/industry-education-solution.webp',
        challenge: 'Les écoles ont besoin de solutions informatiques fiables et rentables pour gérer divers logiciels éducatifs et l\'apprentissage à distance',
        solution: 'Nos ordinateurs portables et mini PC de qualité éducative offrent d\'excellentes performances, durabilité et gestion facile',
        benefits: ['Prix abordables', 'Construction durable', 'Gestion de flotte facile', 'Compatible logiciels éducatifs'],
        color: 'blue'
      },
      {
        industry: 'Fabrication industrielle',
        icon: '🏭',
        image: '/images/industry-manufacturing-solution.webp',
        challenge: 'Les environnements de fabrication nécessitent des systèmes robustes capables de résister à des conditions difficiles 24/7',
        solution: 'Mini PC de qualité industrielle avec refroidissement sans ventilateur, large plage de température et conception résistante aux chocs',
        benefits: ['Refroidissement sans ventilateur', 'Large plage de température', 'Résistant aux chocs', 'Disponibilité à long terme'],
        color: 'orange'
      },
      {
        industry: 'Santé',
        icon: '🏥',
        image: '/images/industry-healthcare-solution.webp',
        challenge: 'Les établissements médicaux ont besoin de systèmes certifiés et fiables pour la gestion des données patients',
        solution: 'Solutions informatiques de qualité médicale avec certifications, revêtements antimicrobiens et fonctionnement silencieux',
        benefits: ['Certifications médicales', 'Revêtement antimicrobien', 'Fonctionnement silencieux', 'Conforme HIPAA'],
        color: 'green'
      },
      {
        industry: 'Commerce de détail',
        icon: '🛒',
        image: '/images/industry-retail-solution.webp',
        challenge: 'Les entreprises de vente au détail ont besoin de systèmes POS compacts et fiables pour gérer de gros volumes de transactions',
        solution: 'Mini PC compacts optimisés pour les applications POS avec plusieurs options I/O et fonctionnement 24/7',
        benefits: ['Encombrement compact', 'Plusieurs ports I/O', 'Fonctionnement 24/7', 'Compatible logiciels POS'],
        color: 'purple'
      }
    ]
  },
  pt: {
    title: 'Soluções setoriais',
    subtitle: 'Soluções personalizadas para seus desafios específicos do setor',
    learnMore: 'Saiba mais',
    viewCase: 'Ver estudo de caso',
    solutions: [
      {
        industry: 'Educação',
        icon: '🎓',
        image: '/images/industry-education-solution.webp',
        challenge: 'As escolas precisam de soluções de computação confiáveis e econômicas para lidar com diversos softwares educacionais e aprendizado remoto',
        solution: 'Nossos laptops e mini PCs de nível educacional oferecem excelente desempenho, durabilidade e gerenciamento fácil',
        benefits: ['Preços acessíveis', 'Construção durável', 'Gerenciamento de frota fácil', 'Compatível com software educacional'],
        color: 'blue'
      },
      {
        industry: 'Fabricação industrial',
        icon: '🏭',
        image: '/images/industry-manufacturing-solution.webp',
        challenge: 'Ambientes de fabricação requerem sistemas robustos que possam suportar condições adversas mantendo confiabilidade 24/7',
        solution: 'Mini PCs de nível industrial com resfriamento sem ventilador, ampla faixa de temperatura e design resistente a choques',
        benefits: ['Design de resfriamento sem ventilador', 'Ampla faixa de temperatura', 'Resistente a choques', 'Disponibilidade a longo prazo'],
        color: 'orange'
      },
      {
        industry: 'Saúde',
        icon: '🏥',
        image: '/images/industry-healthcare-solution.webp',
        challenge: 'Instalações médicas precisam de sistemas certificados e confiáveis para gerenciamento de dados de pacientes',
        solution: 'Soluções de computação de nível médico com certificações, revestimentos antimicrobianos e operação silenciosa',
        benefits: ['Certificações médicas', 'Revestimento antimicrobiano', 'Operação silenciosa', 'Conforme HIPAA'],
        color: 'green'
      },
      {
        industry: 'Varejo',
        icon: '🛒',
        image: '/images/industry-retail-solution.webp',
        challenge: 'Empresas de varejo precisam de sistemas POS compactos e confiáveis para lidar com altos volumes de transações',
        solution: 'Mini PCs compactos otimizados para aplicações POS com múltiplas opções de I/O e operação 24/7',
        benefits: ['Tamanho compacto', 'Múltiplas portas I/O', 'Operação 24/7', 'Compatível com software POS'],
        color: 'purple'
      }
    ]
  },
  'zh-CN': {
    title: '行业解决方案',
    subtitle: '针对您特定行业挑战的定制解决方案',
    learnMore: '了解更多',
    viewCase: '查看案例',
    solutions: [
      {
        industry: '教育',
        icon: '🎓',
        image: '/images/industry-education-solution.webp',
        challenge: '学校需要可靠、经济高效的计算解决方案，能够处理各种教育软件并支持远程学习',
        solution: '我们的教育级笔记本电脑和迷你 PC 提供出色的性能、耐用性和便于 IT 管理员管理',
        benefits: ['价格实惠', '坚固耐用', '易于管理', '兼容教育软件'],
        color: 'blue'
      },
      {
        industry: '工业制造',
        icon: '🏭',
        image: '/images/industry-manufacturing-solution.webp',
        challenge: '制造环境需要坚固的系统，能够承受恶劣条件同时保持 24/7 可靠性',
        solution: '工业级迷你 PC，配备无风扇冷却、宽温度范围和抗震设计，适用于工厂车间',
        benefits: ['无风扇冷却设计', '宽温度范围', '抗震抗振', '长期供货保证'],
        color: 'orange'
      },
      {
        industry: '医疗保健',
        icon: '🏥',
        image: '/images/industry-healthcare-solution.webp',
        challenge: '医疗机构需要经过认证的可靠系统，用于患者数据管理和医学影像应用',
        solution: '医疗级计算解决方案，具有认证、抗菌涂层和静音运行，适用于患者护理区域',
        benefits: ['医疗认证', '抗菌涂层', '静音运行', '符合 HIPAA'],
        color: 'green'
      },
      {
        industry: '零售与酒店',
        icon: '🛒',
        image: '/images/industry-retail-solution.webp',
        challenge: '零售企业需要紧凑、可靠的 POS 系统，能够处理高交易量并与现有软件集成',
        solution: '针对 POS 应用优化的紧凑型迷你 PC，具有多个 I/O 选项和可靠的 24/7 运行',
        benefits: ['紧凑尺寸', '多个 I/O 端口', '24/7 运行', '兼容 POS 软件'],
        color: 'purple'
      }
    ]
  }
}

const colorClasses = {
  blue: {
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    badge: 'bg-blue-100 text-blue-700'
  },
  orange: {
    bg: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    icon: 'bg-orange-100 text-orange-600',
    badge: 'bg-orange-100 text-orange-700'
  },
  green: {
    bg: 'from-green-50 to-green-100',
    border: 'border-green-200',
    icon: 'bg-green-100 text-green-600',
    badge: 'bg-green-100 text-green-700'
  },
  purple: {
    bg: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    badge: 'bg-purple-100 text-purple-700'
  }
}

export function IndustrySolutions() {
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

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.solutions.map((solution, index) => {
            const colors = colorClasses[solution.color as keyof typeof colorClasses]
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border-2 ${colors.border} hover:shadow-xl transition-all duration-300 group`}
              >
                {/* Image or Header */}
                {solution.image ? (
                  <div className="mb-6 overflow-hidden rounded-lg group relative h-48">
                    <OptimizedImage
                      src={solution.image}
                      alt={solution.industry}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center text-3xl mr-4`}>
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {solution.industry}
                    </h3>
                  </div>
                )}

                {/* Industry Title (if image is present) */}
                {solution.image && (
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {solution.industry}
                  </h3>
                )}

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Challenge
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {solution.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Our Solution
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {solution.solution}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Key Benefits
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {solution.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 ${colors.badge} rounded-full text-sm font-medium`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link href="/products">
                    <Button variant="primary" size="sm" className="btn-solution-hover">
                      {t.learnMore}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="btn-solution-hover">
                      {t.viewCase}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

