'use client'

import Link from 'next/link'
import { useLanguage } from '@/store/useAppStore'
import { Button } from '@/components/ui'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

// Translations
const translations = {
  en: {
    title: 'Success Stories',
    subtitle: 'Real results from real customers',
    readMore: 'Read Full Case Study',
    challenge: 'Challenge',
    solution: 'Solution',
    results: 'Results',
    industry: 'Industry',
    caseStudies: [
      {
        client: 'Global Medical Center',
        industry: 'Healthcare',
        icon: '🏥',
        image: '/images/case-study-healthcare.webp',
        challenge: 'Hospital equipment required low-power consumption and long-term stable operation for 24/7 patient monitoring systems',
        solution: 'Customized industrial-grade mini PCs with optimized cooling system, medical certifications, and antimicrobial coating',
        results: [
          { metric: '60%', label: 'Reduction in equipment failure rate' },
          { metric: '2+ years', label: 'Continuous stable operation' },
          { metric: '30%', label: 'Energy cost savings' }
        ],
        color: 'green'
      },
      {
        client: 'Smart Education Institute',
        industry: 'Education',
        icon: '🎓',
        image: '/images/case-study-education.webp',
        challenge: 'Educational institution needed 500+ units of reliable, manageable laptops for computer labs and distance learning programs',
        solution: 'Deployed education-grade laptops with centralized management software, extended warranty, and on-site technical support',
        results: [
          { metric: '500+', label: 'Units deployed successfully' },
          { metric: '95%', label: 'Student satisfaction rate' },
          { metric: '40%', label: 'Reduction in IT support tickets' }
        ],
        color: 'blue'
      },
      {
        client: 'Manufacturing Solutions Inc.',
        industry: 'Industrial',
        icon: '🏭',
        image: '/images/case-study-manufacturing.webp',
        challenge: 'Factory floor required rugged computing systems capable of withstanding dust, vibration, and extreme temperatures',
        solution: 'Fanless industrial mini PCs with IP65 rating, wide temperature range (-20°C to 60°C), and shock-resistant design',
        results: [
          { metric: '99.9%', label: 'System uptime achieved' },
          { metric: '0', label: 'Hardware failures in 18 months' },
          { metric: '50%', label: 'Faster production monitoring' }
        ],
        color: 'orange'
      }
    ]
  },
  ru: {
    title: 'Истории успеха',
    subtitle: 'Реальные результаты от реальных клиентов',
    readMore: 'Читать полный кейс',
    challenge: 'Вызов',
    solution: 'Решение',
    results: 'Результаты',
    industry: 'Отрасль',
    caseStudies: [
      {
        client: 'Глобальный медицинский центр',
        industry: 'Здравоохранение',
        icon: '🏥',
        image: '/images/case-study-healthcare.webp',
        challenge: 'Больничное оборудование требовало низкого энергопотребления и долгосрочной стабильной работы для систем мониторинга пациентов 24/7',
        solution: 'Индивидуальные промышленные мини-ПК с оптимизированной системой охлаждения, медицинскими сертификатами и антимикробным покрытием',
        results: [
          { metric: '60%', label: 'Снижение частоты отказов оборудования' },
          { metric: '2+ года', label: 'Непрерывная стабильная работа' },
          { metric: '30%', label: 'Экономия энергозатрат' }
        ],
        color: 'green'
      },
      {
        client: 'Институт умного образования',
        industry: 'Образование',
        icon: '🎓',
        image: '/images/case-study-education.webp',
        challenge: 'Образовательному учреждению требовалось 500+ надежных управляемых ноутбуков для компьютерных классов и программ дистанционного обучения',
        solution: 'Развернуты ноутбуки образовательного уровня с централизованным ПО управления, расширенной гарантией и технической поддержкой на месте',
        results: [
          { metric: '500+', label: 'Успешно развернутых устройств' },
          { metric: '95%', label: 'Уровень удовлетворенности студентов' },
          { metric: '40%', label: 'Сокращение обращений в ИТ-поддержку' }
        ],
        color: 'blue'
      },
      {
        client: 'Производственные решения',
        industry: 'Промышленность',
        icon: '🏭',
        image: '/images/case-study-manufacturing.webp',
        challenge: 'Производственный цех требовал прочных вычислительных систем, способных выдерживать пыль, вибрацию и экстремальные температуры',
        solution: 'Безвентиляторные промышленные мини-ПК с рейтингом IP65, широким диапазоном температур (-20°C до 60°C) и ударопрочным дизайном',
        results: [
          { metric: '99.9%', label: 'Достигнутое время безотказной работы' },
          { metric: '0', label: 'Отказов оборудования за 18 месяцев' },
          { metric: '50%', label: 'Ускорение мониторинга производства' }
        ],
        color: 'orange'
      }
    ]
  },
  ja: {
    title: '成功事例',
    subtitle: '実際の顧客からの実際の結果',
    readMore: '完全なケーススタディを読む',
    challenge: '課題',
    solution: 'ソリューション',
    results: '結果',
    industry: '業界',
    caseStudies: [
      {
        client: 'グローバル医療センター',
        industry: 'ヘルスケア',
        icon: '🏥',
        image: '/images/case-study-healthcare.webp',
        challenge: '病院設備は、24時間365日の患者監視システムのために低消費電力と長期安定動作が必要でした',
        solution: '最適化された冷却システム、医療認証、抗菌コーティングを備えたカスタマイズされた産業グレードミニPC',
        results: [
          { metric: '60%', label: '機器故障率の削減' },
          { metric: '2年以上', label: '継続的な安定動作' },
          { metric: '30%', label: 'エネルギーコスト削減' }
        ],
        color: 'green'
      },
      {
        client: 'スマート教育研究所',
        industry: '教育',
        icon: '🎓',
        image: '/images/case-study-education.webp',
        challenge: '教育機関は、コンピュータラボと遠隔学習プログラム用に500台以上の信頼性の高い管理可能なノートPCが必要でした',
        solution: '集中管理ソフトウェア、延長保証、オンサイト技術サポート付きの教育グレードノートPCを展開',
        results: [
          { metric: '500台以上', label: '正常に展開されたユニット' },
          { metric: '95%', label: '学生満足度' },
          { metric: '40%', label: 'ITサポートチケットの削減' }
        ],
        color: 'blue'
      },
      {
        client: '製造ソリューション株式会社',
        industry: '産業',
        icon: '🏭',
        image: '/images/case-study-manufacturing.webp',
        challenge: '工場フロアには、ほこり、振動、極端な温度に耐えられる堅牢なコンピューティングシステムが必要でした',
        solution: 'IP65定格、広い温度範囲（-20°Cから60°C）、耐衝撃設計を備えたファンレス産業用ミニPC',
        results: [
          { metric: '99.9%', label: '達成されたシステム稼働時間' },
          { metric: '0', label: '18か月間のハードウェア障害' },
          { metric: '50%', label: '生産監視の高速化' }
        ],
        color: 'orange'
      }
    ]
  },
  fr: {
    title: 'Histoires de succès',
    subtitle: 'Résultats réels de vrais clients',
    readMore: 'Lire l\'étude de cas complète',
    challenge: 'Défi',
    solution: 'Solution',
    results: 'Résultats',
    industry: 'Secteur',
    caseStudies: [
      {
        client: 'Centre médical mondial',
        industry: 'Santé',
        icon: '🏥',
        image: '/images/case-study-healthcare.webp',
        challenge: 'L\'équipement hospitalier nécessitait une faible consommation d\'énergie et un fonctionnement stable à long terme pour les systèmes de surveillance des patients 24/7',
        solution: 'Mini PC de qualité industrielle personnalisés avec système de refroidissement optimisé, certifications médicales et revêtement antimicrobien',
        results: [
          { metric: '60%', label: 'Réduction du taux de panne d\'équipement' },
          { metric: '2+ ans', label: 'Fonctionnement stable continu' },
          { metric: '30%', label: 'Économies de coûts énergétiques' }
        ],
        color: 'green'
      },
      {
        client: 'Institut d\'éducation intelligente',
        industry: 'Éducation',
        icon: '🎓',
        image: '/images/case-study-education.webp',
        challenge: 'L\'établissement d\'enseignement avait besoin de plus de 500 ordinateurs portables fiables et gérables pour les laboratoires informatiques et les programmes d\'apprentissage à distance',
        solution: 'Déploiement d\'ordinateurs portables de qualité éducative avec logiciel de gestion centralisé, garantie étendue et support technique sur site',
        results: [
          { metric: '500+', label: 'Unités déployées avec succès' },
          { metric: '95%', label: 'Taux de satisfaction des étudiants' },
          { metric: '40%', label: 'Réduction des tickets de support IT' }
        ],
        color: 'blue'
      },
      {
        client: 'Solutions de fabrication Inc.',
        industry: 'Industriel',
        icon: '🏭',
        image: '/images/case-study-manufacturing.webp',
        challenge: 'L\'atelier de production nécessitait des systèmes informatiques robustes capables de résister à la poussière, aux vibrations et aux températures extrêmes',
        solution: 'Mini PC industriels sans ventilateur avec indice IP65, large plage de température (-20°C à 60°C) et conception résistante aux chocs',
        results: [
          { metric: '99.9%', label: 'Temps de disponibilité du système atteint' },
          { metric: '0', label: 'Pannes matérielles en 18 mois' },
          { metric: '50%', label: 'Surveillance de production plus rapide' }
        ],
        color: 'orange'
      }
    ]
  },
  pt: {
    title: 'Histórias de sucesso',
    subtitle: 'Resultados reais de clientes reais',
    readMore: 'Ler estudo de caso completo',
    challenge: 'Desafio',
    solution: 'Solução',
    results: 'Resultados',
    industry: 'Setor',
    caseStudies: [
      {
        client: 'Centro Médico Global',
        industry: 'Saúde',
        icon: '🏥',
        image: '/images/case-study-healthcare.webp',
        challenge: 'Equipamento hospitalar exigia baixo consumo de energia e operação estável a longo prazo para sistemas de monitoramento de pacientes 24/7',
        solution: 'Mini PCs de nível industrial personalizados com sistema de resfriamento otimizado, certificações médicas e revestimento antimicrobiano',
        results: [
          { metric: '60%', label: 'Redução na taxa de falha de equipamentos' },
          { metric: '2+ anos', label: 'Operação estável contínua' },
          { metric: '30%', label: 'Economia de custos de energia' }
        ],
        color: 'green'
      },
      {
        client: 'Instituto de Educação Inteligente',
        industry: 'Educação',
        icon: '🎓',
        image: '/images/case-study-education.webp',
        challenge: 'Instituição educacional precisava de mais de 500 laptops confiáveis e gerenciáveis para laboratórios de informática e programas de ensino à distância',
        solution: 'Implantação de laptops de nível educacional com software de gerenciamento centralizado, garantia estendida e suporte técnico no local',
        results: [
          { metric: '500+', label: 'Unidades implantadas com sucesso' },
          { metric: '95%', label: 'Taxa de satisfação dos alunos' },
          { metric: '40%', label: 'Redução em tickets de suporte de TI' }
        ],
        color: 'blue'
      },
      {
        client: 'Soluções de Fabricação Inc.',
        industry: 'Industrial',
        icon: '🏭',
        image: '/images/case-study-manufacturing.webp',
        challenge: 'Chão de fábrica exigia sistemas de computação robustos capazes de suportar poeira, vibração e temperaturas extremas',
        solution: 'Mini PCs industriais sem ventilador com classificação IP65, ampla faixa de temperatura (-20°C a 60°C) e design resistente a choques',
        results: [
          { metric: '99.9%', label: 'Tempo de atividade do sistema alcançado' },
          { metric: '0', label: 'Falhas de hardware em 18 meses' },
          { metric: '50%', label: 'Monitoramento de produção mais rápido' }
        ],
        color: 'orange'
      }
    ]
  },
}

const colorClasses = {
  green: 'from-green-50 to-green-100 border-green-200',
  blue: 'from-blue-50 to-blue-100 border-blue-200',
  orange: 'from-orange-50 to-orange-100 border-orange-200'
}

export function CaseStudies() {
  const language = useLanguage()
  const t = translations[language] || translations.en

  return (
    <section className="py-20 bg-gray-50">
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

        {/* Case Studies */}
        <div className="space-y-8">
          {t.caseStudies.map((study, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${colorClasses[study.color as keyof typeof colorClasses]} rounded-2xl p-8 lg:p-10 border-2 hover:shadow-2xl transition-all duration-300`}
            >
              {/* Case Study Image */}
              {study.image && (
                <div className="mb-6 overflow-hidden rounded-lg relative h-64">
                  <OptimizedImage
                    src={study.image}
                    alt={`${study.client} case study`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Left: Client Info & Challenge */}
                <div className="lg:col-span-1 mb-6 lg:mb-0">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">{study.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {study.client}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t.industry}: {study.industry}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      {t.challenge}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                </div>

                {/* Middle: Solution */}
                <div className="lg:col-span-1 mb-6 lg:mb-0">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    {t.solution}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                {/* Right: Results */}
                <div className="lg:col-span-1">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                    {t.results}
                  </h4>
                  <div className="space-y-4">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {result.metric}
                        </div>
                        <div className="text-sm text-gray-600">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <Link href="/contact">
                  <Button variant="primary">
                    {t.readMore}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

