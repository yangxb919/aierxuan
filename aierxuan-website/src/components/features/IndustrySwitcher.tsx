'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/store/useAppStore'
import { Button } from '@/components/ui'

// Industry types
type IndustryType = 'education' | 'industrial' | 'medical' | 'office' | 'retail'

// Industry images mapping
const industryImages: Record<IndustryType, string> = {
  education: '/images/industries/industry-education-classroom-laptops.webp',
  industrial: '/images/industries/industry-manufacturing-mini-pc-automation.webp',
  medical: '/images/industries/industry-healthcare-medical-workstation.webp',
  office: '/images/industries/industry-office-business-workspace.webp',
  retail: '/images/industries/industry-retail-pos-system.webp'
}

// Translations
const translations = {
  en: {
    title: 'Solutions by Industry',
    subtitle: 'Select your industry to discover tailored solutions',
    industries: {
      education: {
        name: 'Education',
        description: 'Reliable computing solutions for modern classrooms and educational institutions',
        applications: ['Smart Classrooms', 'Computer Labs', 'Distance Learning', 'Administrative Systems'],
        icon: '🎓'
      },
      industrial: {
        name: 'Industrial',
        description: 'Rugged and reliable systems for manufacturing and industrial environments',
        applications: ['Factory Automation', 'Quality Control', 'Production Monitoring', 'Industrial IoT'],
        icon: '🏭'
      },
      medical: {
        name: 'Medical',
        description: 'High-performance, certified solutions for healthcare facilities',
        applications: ['Medical Imaging', 'Patient Records', 'Diagnostic Systems', 'Telemedicine'],
        icon: '🏥'
      },
      office: {
        name: 'Office',
        description: 'Efficient and scalable solutions for modern business environments',
        applications: ['Enterprise Computing', 'Video Conferencing', 'Data Processing', 'Cloud Services'],
        icon: '🏢'
      },
      retail: {
        name: 'Retail',
        description: 'Reliable POS and inventory management solutions for retail businesses',
        applications: ['Point of Sale', 'Inventory Management', 'Customer Analytics', 'Digital Signage'],
        icon: '🛒'
      }
    },
    viewProducts: 'View Products',
    learnMore: 'Learn More'
  },
  ru: {
    title: 'Решения по отраслям',
    subtitle: 'Выберите свою отрасль, чтобы найти подходящие решения',
    industries: {
      education: {
        name: 'Образование',
        description: 'Надежные вычислительные решения для современных классов и образовательных учреждений',
        applications: ['Умные классы', 'Компьютерные лаборатории', 'Дистанционное обучение', 'Административные системы'],
        icon: '🎓'
      },
      industrial: {
        name: 'Промышленность',
        description: 'Прочные и надежные системы для производственных и промышленных сред',
        applications: ['Автоматизация производства', 'Контроль качества', 'Мониторинг производства', 'Промышленный IoT'],
        icon: '🏭'
      },
      medical: {
        name: 'Медицина',
        description: 'Высокопроизводительные сертифицированные решения для медицинских учреждений',
        applications: ['Медицинская визуализация', 'Медицинские карты', 'Диагностические системы', 'Телемедицина'],
        icon: '🏥'
      },
      office: {
        name: 'Офис',
        description: 'Эффективные и масштабируемые решения для современных бизнес-сред',
        applications: ['Корпоративные вычисления', 'Видеоконференции', 'Обработка данных', 'Облачные сервисы'],
        icon: '🏢'
      },
      retail: {
        name: 'Розничная торговля',
        description: 'Надежные POS и решения для управления запасами для розничного бизнеса',
        applications: ['Точка продаж', 'Управление запасами', 'Аналитика клиентов', 'Цифровые вывески'],
        icon: '🛒'
      }
    },
    viewProducts: 'Посмотреть продукты',
    learnMore: 'Узнать больше'
  },
  ja: {
    title: '業界別ソリューション',
    subtitle: '業界を選択してカスタマイズされたソリューションを見つける',
    industries: {
      education: {
        name: '教育',
        description: '現代の教室と教育機関向けの信頼性の高いコンピューティングソリューション',
        applications: ['スマート教室', 'コンピュータラボ', '遠隔学習', '管理システム'],
        icon: '🎓'
      },
      industrial: {
        name: '産業',
        description: '製造および産業環境向けの堅牢で信頼性の高いシステム',
        applications: ['工場自動化', '品質管理', '生産監視', '産業IoT'],
        icon: '🏭'
      },
      medical: {
        name: '医療',
        description: '医療施設向けの高性能認定ソリューション',
        applications: ['医療画像', '患者記録', '診断システム', '遠隔医療'],
        icon: '🏥'
      },
      office: {
        name: 'オフィス',
        description: '現代のビジネス環境向けの効率的でスケーラブルなソリューション',
        applications: ['エンタープライズコンピューティング', 'ビデオ会議', 'データ処理', 'クラウドサービス'],
        icon: '🏢'
      },
      retail: {
        name: '小売',
        description: '小売ビジネス向けの信頼性の高いPOSおよび在庫管理ソリューション',
        applications: ['販売時点情報管理', '在庫管理', '顧客分析', 'デジタルサイネージ'],
        icon: '🛒'
      }
    },
    viewProducts: '製品を見る',
    learnMore: '詳細を見る'
  },
  fr: {
    title: 'Solutions par secteur',
    subtitle: 'Sélectionnez votre secteur pour découvrir des solutions sur mesure',
    industries: {
      education: {
        name: 'Éducation',
        description: 'Solutions informatiques fiables pour les salles de classe modernes et les établissements d\'enseignement',
        applications: ['Salles de classe intelligentes', 'Laboratoires informatiques', 'Enseignement à distance', 'Systèmes administratifs'],
        icon: '🎓'
      },
      industrial: {
        name: 'Industriel',
        description: 'Systèmes robustes et fiables pour les environnements de fabrication et industriels',
        applications: ['Automatisation d\'usine', 'Contrôle qualité', 'Surveillance de production', 'IoT industriel'],
        icon: '🏭'
      },
      medical: {
        name: 'Médical',
        description: 'Solutions certifiées haute performance pour les établissements de santé',
        applications: ['Imagerie médicale', 'Dossiers patients', 'Systèmes de diagnostic', 'Télémédecine'],
        icon: '🏥'
      },
      office: {
        name: 'Bureau',
        description: 'Solutions efficaces et évolutives pour les environnements professionnels modernes',
        applications: ['Informatique d\'entreprise', 'Visioconférence', 'Traitement de données', 'Services cloud'],
        icon: '🏢'
      },
      retail: {
        name: 'Commerce',
        description: 'Solutions POS et de gestion des stocks fiables pour les entreprises de vente au détail',
        applications: ['Point de vente', 'Gestion des stocks', 'Analyse client', 'Affichage numérique'],
        icon: '🛒'
      }
    },
    viewProducts: 'Voir les produits',
    learnMore: 'En savoir plus'
  },
  pt: {
    title: 'Soluções por setor',
    subtitle: 'Selecione seu setor para descobrir soluções personalizadas',
    industries: {
      education: {
        name: 'Educação',
        description: 'Soluções de computação confiáveis para salas de aula modernas e instituições educacionais',
        applications: ['Salas de aula inteligentes', 'Laboratórios de informática', 'Ensino à distância', 'Sistemas administrativos'],
        icon: '🎓'
      },
      industrial: {
        name: 'Industrial',
        description: 'Sistemas robustos e confiáveis para ambientes de fabricação e industriais',
        applications: ['Automação de fábrica', 'Controle de qualidade', 'Monitoramento de produção', 'IoT industrial'],
        icon: '🏭'
      },
      medical: {
        name: 'Médico',
        description: 'Soluções certificadas de alto desempenho para instalações de saúde',
        applications: ['Imagem médica', 'Registros de pacientes', 'Sistemas de diagnóstico', 'Telemedicina'],
        icon: '🏥'
      },
      office: {
        name: 'Escritório',
        description: 'Soluções eficientes e escaláveis para ambientes de negócios modernos',
        applications: ['Computação empresarial', 'Videoconferência', 'Processamento de dados', 'Serviços em nuvem'],
        icon: '🏢'
      },
      retail: {
        name: 'Varejo',
        description: 'Soluções POS e de gerenciamento de estoque confiáveis para negócios de varejo',
        applications: ['Ponto de venda', 'Gerenciamento de estoque', 'Análise de clientes', 'Sinalização digital'],
        icon: '🛒'
      }
    },
    viewProducts: 'Ver produtos',
    learnMore: 'Saiba mais'
  },
  'zh-CN': {
    title: '行业解决方案',
    subtitle: '选择您的行业，探索定制化解决方案',
    industries: {
      education: {
        name: '教育',
        description: '为现代教室和教育机构提供可靠的计算解决方案',
        applications: ['智慧教室', '计算机实验室', '远程教学', '行政管理系统'],
        icon: '🎓'
      },
      industrial: {
        name: '工业',
        description: '为制造和工业环境提供坚固可靠的系统',
        applications: ['工厂自动化', '质量控制', '生产监控', '工业物联网'],
        icon: '🏭'
      },
      medical: {
        name: '医疗',
        description: '为医疗机构提供高性能认证解决方案',
        applications: ['医学影像', '患者记录', '诊断系统', '远程医疗'],
        icon: '🏥'
      },
      office: {
        name: '办公',
        description: '为现代商业环境提供高效可扩展的解决方案',
        applications: ['企业计算', '视频会议', '数据处理', '云服务'],
        icon: '🏢'
      },
      retail: {
        name: '零售',
        description: '为零售企业提供可靠的 POS 和库存管理解决方案',
        applications: ['销售终端', '库存管理', '客户分析', '数字标牌'],
        icon: '🛒'
      }
    },
    viewProducts: '查看产品',
    learnMore: '了解更多'
  }
}

export function IndustrySwitcher() {
  const language = useLanguage()
  const t = translations[language] || translations.en
  const [activeIndustry, setActiveIndustry] = useState<IndustryType>('education')

  const industries: IndustryType[] = ['education', 'industrial', 'medical', 'office', 'retail']
  const currentIndustry = t.industries[activeIndustry]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${activeIndustry === industry
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              <span className="mr-2 text-xl">{t.industries[industry].icon}</span>
              {t.industries[industry].name}
            </button>
          ))}
        </div>

        {/* Industry Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left: Description */}
            <div>
              <div className="text-6xl mb-6">{currentIndustry.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentIndustry.name}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {currentIndustry.description}
              </p>

              {/* Applications List */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Typical Applications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentIndustry.applications.map((app, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
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
                      <span className="text-gray-700 font-medium text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg">
                  {t.viewProducts}
                </Button>
                <Button variant="outline" size="lg">
                  {t.learnMore}
                </Button>
              </div>
            </div>

            {/* Right: Industry Image */}
            <div className="mt-8 lg:mt-0">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={industryImages[activeIndustry]}
                  alt={`${currentIndustry.name} Industry Solution - ${currentIndustry.description}`}
                  fill
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

