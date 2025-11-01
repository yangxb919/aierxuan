'use client'

import { useLanguage } from '@/store/useAppStore'
import { HeroSection, StorySection, CTASection, FactorySection, QualitySection, MilestonesSection } from '@/components/about'

// About page translations for all 6 languages
const aboutPageTexts = {
  en: {
    // Hero Section
    hero: {
      mainTitle: 'Professional AI Laptop & Gaming PC Manufacturer',
      subtitle: '10+ Years Experience | Intel Partner | OEM/ODM Services | Global Delivery',
      description: 'AIERXUAN is a professional laptop manufacturer based in Shenzhen. We specialize in OEM/ODM solutions for global partners since 2014.',
      contactSales: 'Contact Sales Team',
      downloadCatalog: 'Download Product Catalog'
    },

    // Story Section
    story: {
      title: 'About AIERXUAN',
      subtitle: 'Professional Laptop Manufacturer Since 2014',
      paragraph1: 'Founded in 2014, AIERXUAN specializes in high-performance laptops and mini PCs for B2B clients worldwide. As an Intel China Channel Partner since 2019, we\'ve shipped 500,000+ units to customers in 50+ countries.',
      paragraph2: 'Our 15,000㎡ facility combines advanced manufacturing with strict quality control. We offer flexible MOQ from 1 sample to bulk orders, full OEM/ODM customization, and fast 7-15 day delivery.'
    },

    // Factory Section
    factory: {
      title: 'Manufacturing Capability',
      subtitle: '15,000㎡ facility with 6 production lines and 200+ team members',
      videoTitle: 'Factory Tour Video',
      photos: {
        factoryOverview: 'Factory Overview',
        factoryOverviewDesc: '15,000㎡ modern facility',
        assemblyLine: 'Assembly Line',
        assemblyLineDesc: '6 automated production lines',
        testingLab: 'Testing Laboratory',
        testingLabDesc: '72-hour burn-in testing',
        warehouse: 'Warehouse & Logistics',
        warehouseDesc: 'Fast global shipping',
        rdCenter: 'R&D Center',
        rdCenterDesc: 'Dedicated engineering team',
        qualityControl: 'Quality Control',
        qualityControlDesc: 'Multi-stage inspection process'
      }
    },

    // Quality Section
    quality: {
      title: 'Quality Assurance',
      subtitle: 'Rigorous 7-step quality control process ensures every product meets the highest standards',
      processTitle: '7-Step Quality Control Process',
      certificatesTitle: 'Certifications',
      steps: {
        step1: 'Incoming Material Inspection',
        step2: 'Component Assembly Check',
        step3: 'Power-On Testing',
        step4: '72-Hour Burn-In Test',
        step5: 'Final Quality Inspection',
        step6: 'Packaging Quality Check',
        step7: 'Pre-Shipment Verification'
      }
    },

    // Milestones Section
    milestones: {
      title: 'By The Numbers',
      subtitle: 'Trusted by businesses worldwide for quality and reliability',
      milestones: {
        years: { value: '10+', label: 'Years Experience' },
        units: { value: '500K+', label: 'Units Shipped' },
        countries: { value: '50+', label: 'Countries Served' },
        factory: { value: '15,000㎡', label: 'Factory Space' },
        testing: { value: '72h', label: 'Burn-in Testing' },
        satisfaction: { value: '98%', label: 'Satisfaction Rate' }
      }
    },

    // CTA Section
    cta: {
      title: 'Ready to Partner With Us?',
      subtitle: 'Get a custom quote within 24 hours',
      contactSales: 'Contact Sales Team',
      downloadCatalog: 'Download Catalog',
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Phone',
      responseTime: 'Response Time'
    }
  },
  ru: {
    hero: {
      mainTitle: 'Профессиональный производитель AI ноутбуков и игровых ПК',
      subtitle: '10+ лет опыта | Партнер Intel | OEM/ODM услуги | Глобальная доставка',
      description: 'AIERXUAN - профессиональный производитель ноутбуков из Шэньчжэня. Мы специализируемся на OEM/ODM решениях для глобальных партнеров с 2014 года.',
      contactSales: 'Связаться с отделом продаж',
      downloadCatalog: 'Скачать каталог продукции'
    },
    story: {
      title: 'О компании AIERXUAN',
      subtitle: 'Профессиональный производитель ноутбуков с 2014 года',
      paragraph1: 'Основанная в 2014 году, AIERXUAN специализируется на высокопроизводительных ноутбуках и мини-ПК для B2B клиентов по всему миру. Как партнер Intel China Channel с 2019 года, мы отправили 500 000+ единиц клиентам в 50+ странах.',
      paragraph2: 'Наше производство площадью 15 000㎡ сочетает передовое производство со строгим контролем качества. Мы предлагаем гибкий MOQ от 1 образца до оптовых заказов, полную OEM/ODM кастомизацию и быструю доставку 7-15 дней.'
    },
    factory: {
      title: 'Производственные мощности',
      subtitle: 'Производство 15 000㎡ с 6 производственными линиями и командой 200+ человек',
      videoTitle: 'Видео-тур по заводу',
      photos: {
        factoryOverview: 'Обзор завода',
        factoryOverviewDesc: 'Современное производство 15 000㎡',
        assemblyLine: 'Сборочная линия',
        assemblyLineDesc: '6 автоматизированных производственных линий',
        testingLab: 'Испытательная лаборатория',
        testingLabDesc: '72-часовое тестирование на выгорание',
        warehouse: 'Склад и логистика',
        warehouseDesc: 'Быстрая глобальная доставка',
        rdCenter: 'Центр R&D',
        rdCenterDesc: 'Специализированная инженерная команда',
        qualityControl: 'Контроль качества',
        qualityControlDesc: 'Многоэтапный процесс проверки'
      }
    },
    quality: {
      title: 'Обеспечение качества',
      subtitle: 'Строгий 7-этапный процесс контроля качества гарантирует соответствие каждого продукта высочайшим стандартам',
      processTitle: '7-этапный процесс контроля качества',
      certificatesTitle: 'Сертификаты',
      steps: {
        step1: 'Входной контроль материалов',
        step2: 'Проверка сборки компонентов',
        step3: 'Тестирование включения',
        step4: '72-часовой тест на выгорание',
        step5: 'Финальная проверка качества',
        step6: 'Контроль качества упаковки',
        step7: 'Предотгрузочная проверка'
      }
    },
    milestones: {
      title: 'В цифрах',
      subtitle: 'Нам доверяют компании по всему миру за качество и надежность',
      milestones: {
        years: { value: '10+', label: 'Лет опыта' },
        units: { value: '500K+', label: 'Отгружено единиц' },
        countries: { value: '50+', label: 'Обслуживаемых стран' },
        factory: { value: '15,000㎡', label: 'Площадь производства' },
        testing: { value: '72h', label: 'Тестирование на выгорание' },
        satisfaction: { value: '98%', label: 'Удовлетворенность клиентов' }
      }
    },
    cta: {
      title: 'Готовы к сотрудничеству?',
      subtitle: 'Получите индивидуальное предложение в течение 24 часов',
      contactSales: 'Связаться с отделом продаж',
      downloadCatalog: 'Скачать каталог',
      whatsapp: 'WhatsApp',
      email: 'Эл. почта',
      phone: 'Телефон',
      responseTime: 'Время ответа'
    }
  },
  ja: {
    hero: {
      mainTitle: 'プロフェッショナルAIラップトップ＆ゲーミングPCメーカー',
      subtitle: '10年以上の経験 | Intelパートナー | OEM/ODMサービス | グローバル配送',
      description: 'AIERXUANは中国深センに拠点を置く信頼できるラップトップメーカーです。グローバルパートナー向けの大量注文とOEM/ODMカスタマイズを専門としています。',
      contactSales: '営業チームに連絡',
      downloadCatalog: '製品カタログをダウンロード'
    },
    story: {
      title: 'AIERXUANについて',
      subtitle: '2014年以来のプロフェッショナルラップトップメーカー',
      paragraph1: '2014年に深センで設立されたAIERXUANは、グローバルパートナー向けの高性能ラップトップとミニPCを専門としています。2019年以来Intel China Channelパートナーとして、50カ国以上のクライアントに50万台以上を納入しました。',
      paragraph2: '15,000㎡の施設は、先進的な製造と厳格な品質管理を組み合わせています。柔軟なMOQ、完全なOEM/ODMカスタマイズ、迅速なサービスでビジネスの成長をサポートします。'
    },
    factory: {
      title: '製造能力',
      subtitle: '最先端の設備と高度な生産ラインおよび品質管理システム',
      videoTitle: '🎥 工場見学ビデオ',
      photos: {
        factoryOverview: '工場概要',
        assemblyLine: '組立ライン',
        testingLab: '試験室',
        warehouse: '倉庫・物流',
        rdCenter: 'R&Dセンター',
        qualityControl: '品質管理'
      }
    },
    quality: {
      title: '品質保証',
      subtitle: '厳格な7段階の品質管理プロセスにより、すべての製品が最高基準を満たすことを保証',
      processTitle: '7段階品質管理プロセス',
      certificatesTitle: '認証',
      steps: {
        step1: '入荷材料検査',
        step2: '部品組立チェック',
        step3: '電源投入テスト',
        step4: '72時間バーンインテスト',
        step5: '最終品質検査',
        step6: '梱包品質チェック',
        step7: '出荷前検証'
      }
    },
    milestones: {
      title: '数字で見る実績',
      subtitle: '世界中の企業から信頼される品質と信頼性',
      milestones: {
        years: { value: '10+', label: '年の経験' },
        units: { value: '50万+', label: '出荷台数' },
        countries: { value: '50+', label: 'サービス提供国' },
        factory: { value: '15,000㎡', label: '工場面積' },
        testing: { value: '72時間', label: 'バーンインテスト' },
        satisfaction: { value: '98%', label: '満足度' }
      }
    },
    cta: {
      title: 'パートナーシップの準備はできていますか？',
      subtitle: 'カスタム見積もりを取得するか、今すぐ無料サンプルをリクエストしてください',
      contactSales: '営業チームに連絡',
      downloadCatalog: 'カタログをダウンロード',
      whatsapp: 'WhatsApp',
      email: 'メール',
      phone: '電話',
      responseTime: '応答時間'
    }
  },
  fr: {
    hero: {
      mainTitle: 'Fabricant professionnel d\'ordinateurs portables AI et PC de jeu',
      subtitle: '10+ ans d\'expérience | Partenaire Intel | Services OEM/ODM | Livraison mondiale',
      description: 'AIERXUAN est un fabricant d\'ordinateurs portables de confiance basé à Shenzhen, Chine. Nous nous spécialisons dans les commandes en gros et la personnalisation OEM/ODM pour les partenaires mondiaux.',
      contactSales: 'Contacter l\'équipe commerciale',
      downloadCatalog: 'Télécharger le catalogue produits'
    },
    story: {
      title: 'À propos d\'AIERXUAN',
      subtitle: 'Fabricant professionnel d\'ordinateurs portables depuis 2014',
      paragraph1: 'Fondée en 2014 à Shenzhen, AIERXUAN se spécialise dans les ordinateurs portables haute performance et les mini PC pour les partenaires mondiaux. En tant que partenaire Intel China Channel depuis 2019, nous avons livré plus de 500 000 unités à des clients dans plus de 50 pays.',
      paragraph2: 'Notre installation de 15 000㎡ combine une fabrication avancée avec un contrôle qualité strict. Nous offrons un MOQ flexible, une personnalisation OEM/ODM complète et un service réactif pour aider votre entreprise à croître.'
    },
    factory: {
      title: 'Capacité de fabrication',
      subtitle: 'Installations de pointe avec des lignes de production avancées et des systèmes de contrôle qualité',
      videoTitle: '🎥 Visite vidéo de l\'usine',
      photos: {
        factoryOverview: 'Vue d\'ensemble de l\'usine',
        assemblyLine: 'Chaîne d\'assemblage',
        testingLab: 'Laboratoire de test',
        warehouse: 'Entrepôt et logistique',
        rdCenter: 'Centre R&D',
        qualityControl: 'Contrôle qualité'
      }
    },
    quality: {
      title: 'Assurance qualité',
      subtitle: 'Un processus rigoureux de contrôle qualité en 7 étapes garantit que chaque produit répond aux normes les plus élevées',
      processTitle: 'Processus de contrôle qualité en 7 étapes',
      certificatesTitle: 'Certifications',
      steps: {
        step1: 'Inspection des matériaux entrants',
        step2: 'Vérification de l\'assemblage des composants',
        step3: 'Test de mise sous tension',
        step4: 'Test de rodage de 72 heures',
        step5: 'Inspection qualité finale',
        step6: 'Contrôle qualité de l\'emballage',
        step7: 'Vérification avant expédition'
      }
    },
    milestones: {
      title: 'En chiffres',
      subtitle: 'Approuvé par des entreprises du monde entier pour la qualité et la fiabilité',
      milestones: {
        years: { value: '10+', label: 'Années d\'expérience' },
        units: { value: '500K+', label: 'Unités expédiées' },
        countries: { value: '50+', label: 'Pays desservis' },
        factory: { value: '15,000㎡', label: 'Surface d\'usine' },
        testing: { value: '72h', label: 'Test de rodage' },
        satisfaction: { value: '98%', label: 'Taux de satisfaction' }
      }
    },
    cta: {
      title: 'Prêt à devenir partenaire?',
      subtitle: 'Obtenez un devis personnalisé ou demandez un échantillon gratuit aujourd\'hui',
      contactSales: 'Contacter l\'équipe commerciale',
      downloadCatalog: 'Télécharger le catalogue',
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Téléphone',
      responseTime: 'Temps de réponse'
    }
  },
  pt: {
    hero: {
      mainTitle: 'Fabricante profissional de laptops AI e PCs para jogos',
      subtitle: '10+ anos de experiência | Parceiro Intel | Serviços OEM/ODM | Entrega global',
      description: 'AIERXUAN é um fabricante confiável de laptops sediado em Shenzhen, China. Especializamo-nos em pedidos em massa e personalização OEM/ODM para parceiros globais.',
      contactSales: 'Contatar equipe de vendas',
      downloadCatalog: 'Baixar catálogo de produtos'
    },
    story: {
      title: 'Sobre a AIERXUAN',
      subtitle: 'Fabricante profissional de laptops desde 2014',
      paragraph1: 'Fundada em 2014 em Shenzhen, a AIERXUAN especializa-se em laptops de alto desempenho e mini PCs para parceiros globais. Como parceiro Intel China Channel desde 2019, entregamos mais de 500.000 unidades para clientes em mais de 50 países.',
      paragraph2: 'Nossa instalação de 15.000㎡ combina fabricação avançada com controle de qualidade rigoroso. Oferecemos MOQ flexível, personalização OEM/ODM completa e serviço responsivo para ajudar seu negócio a crescer.'
    },
    factory: {
      title: 'Capacidade de fabricação',
      subtitle: 'Instalações de última geração com linhas de produção avançadas e sistemas de controle de qualidade',
      videoTitle: '🎥 Vídeo tour da fábrica',
      photos: {
        factoryOverview: 'Visão geral da fábrica',
        assemblyLine: 'Linha de montagem',
        testingLab: 'Laboratório de testes',
        warehouse: 'Armazém e logística',
        rdCenter: 'Centro de P&D',
        qualityControl: 'Controle de qualidade'
      }
    },
    quality: {
      title: 'Garantia de qualidade',
      subtitle: 'Processo rigoroso de controle de qualidade em 7 etapas garante que cada produto atenda aos mais altos padrões',
      processTitle: 'Processo de controle de qualidade em 7 etapas',
      certificatesTitle: 'Certificações',
      steps: {
        step1: 'Inspeção de material de entrada',
        step2: 'Verificação de montagem de componentes',
        step3: 'Teste de ligação',
        step4: 'Teste de queima de 72 horas',
        step5: 'Inspeção de qualidade final',
        step6: 'Verificação de qualidade de embalagem',
        step7: 'Verificação pré-envio'
      }
    },
    milestones: {
      title: 'Em números',
      subtitle: 'Confiado por empresas em todo o mundo pela qualidade e confiabilidade',
      milestones: {
        years: { value: '10+', label: 'Anos de experiência' },
        units: { value: '500K+', label: 'Unidades enviadas' },
        countries: { value: '50+', label: 'Países atendidos' },
        factory: { value: '15,000㎡', label: 'Espaço da fábrica' },
        testing: { value: '72h', label: 'Teste de queima' },
        satisfaction: { value: '98%', label: 'Taxa de satisfação' }
      }
    },
    cta: {
      title: 'Pronto para fazer parceria?',
      subtitle: 'Obtenha uma cotação personalizada ou solicite uma amostra grátis hoje',
      contactSales: 'Contatar equipe de vendas',
      downloadCatalog: 'Baixar catálogo',
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Telefone',
      responseTime: 'Tempo de resposta'
    }
  },
  'zh-CN': {
    hero: {
      mainTitle: '专业AI笔记本电脑和游戏PC制造商',
      subtitle: '10年以上经验 | Intel合作伙伴 | OEM/ODM服务 | 全球配送',
      description: 'AIERXUAN（爱尔轩）是位于中国深圳的可信赖笔记本电脑制造商。我们专注于为全球合作伙伴提供批量订单和OEM/ODM定制服务。',
      contactSales: '联系销售团队',
      downloadCatalog: '下载产品目录'
    },
    story: {
      title: '关于AIERXUAN',
      subtitle: '自2014年以来的专业笔记本电脑制造商',
      paragraph1: '2014年在深圳成立，AIERXUAN专注于为全球合作伙伴提供高性能笔记本电脑和迷你PC。作为2019年以来的Intel中国区渠道合作伙伴，我们已向50多个国家的客户交付超过50万台设备。',
      paragraph2: '我们15,000㎡的工厂结合了先进的制造工艺和严格的质量控制。我们提供灵活的MOQ、完整的OEM/ODM定制以及快速响应的服务，助力您的业务增长。'
    },
    factory: {
      title: '制造能力',
      subtitle: '配备先进生产线和质量控制系统的最先进设施',
      videoTitle: '🎥 工厂参观视频',
      photos: {
        factoryOverview: '工厂概览',
        assemblyLine: '组装生产线',
        testingLab: '测试实验室',
        warehouse: '仓库物流',
        rdCenter: '研发中心',
        qualityControl: '质量控制'
      }
    },
    quality: {
      title: '质量保证',
      subtitle: '严格的7步质量控制流程确保每件产品都符合最高标准',
      processTitle: '7步质量控制流程',
      certificatesTitle: '认证证书',
      steps: {
        step1: '来料检验',
        step2: '组件装配检查',
        step3: '开机测试',
        step4: '72小时老化测试',
        step5: '最终质量检验',
        step6: '包装质量检查',
        step7: '出货前验证'
      }
    },
    milestones: {
      title: '数据说话',
      subtitle: '全球企业信赖的质量与可靠性',
      milestones: {
        years: { value: '10+', label: '年经验' },
        units: { value: '50万+', label: '出货量' },
        countries: { value: '50+', label: '服务国家' },
        factory: { value: '15,000㎡', label: '工厂面积' },
        testing: { value: '72小时', label: '老化测试' },
        satisfaction: { value: '98%', label: '满意度' }
      }
    },
    cta: {
      title: '准备与我们合作了吗？',
      subtitle: '立即获取定制报价或申请免费样品',
      contactSales: '联系销售团队',
      downloadCatalog: '下载目录',
      whatsapp: 'WhatsApp',
      email: '邮箱',
      phone: '电话',
      responseTime: '响应时间'
    }
  }
} as const

export default function AboutPage() {
  const language = useLanguage()
  const texts = aboutPageTexts[language] || aboutPageTexts.en

  return (
    <div className="min-h-screen">
      {/* Module 1: Hero Section */}
      <HeroSection texts={texts.hero} />

      {/* Module 2: Our Story */}
      <StorySection texts={texts.story} />

      {/* Module 3: Factory Capability */}
      <FactorySection texts={texts.factory} />

      {/* Module 4: Quality Assurance */}
      <QualitySection texts={texts.quality} />

      {/* Module 5: Milestones */}
      <MilestonesSection texts={texts.milestones} />

      {/* Module 8: CTA Section */}
      <CTASection texts={texts.cta} />
    </div>
  )
}
