'use client'

import { useLanguage } from '@/store/useAppStore'
import { Button } from '@/components/ui'
import Link from 'next/link'
import StaticMap from '@/components/StaticMap'

// About page translations for all 6 languages
const aboutPageTexts = {
  en: {
    title: 'About AIERXUAN',
    subtitle: 'Professional OEM/ODM Manufacturer of Custom Computing Solutions',
    heroDescription: 'Specializing in high-quality laptops, mini PCs, and industrial computing equipment tailored for businesses, institutions, and system integrators worldwide.',

    // Company Overview Section
    overviewTitle: 'Who We Are',
    overviewContent: 'AIERXUAN is a professional OEM/ODM manufacturer specializing in custom computing solutions for business and industrial applications. We design and manufacture high-quality laptops, mini PCs, and industrial computing equipment that can be fully customized and branded to meet your specific business needs. With advanced manufacturing capabilities and flexible minimum order quantities, we serve enterprises, system integrators, retailers, educational institutions, and healthcare providers in over 50 countries worldwide.',
    
    // Mission & Vision
    missionTitle: 'Our Mission',
    missionContent: 'To empower businesses worldwide with flexible, high-quality OEM/ODM computing solutions that drive operational efficiency and enable digital transformation. We make custom hardware accessible to organizations of all sizes through scalable manufacturing and transparent pricing.',
    visionTitle: 'Our Vision',
    visionContent: 'To be the world\'s most trusted OEM/ODM partner for custom computing solutions, recognized for exceptional product quality, manufacturing flexibility, and customer-centric service that helps businesses build their own branded technology solutions.',
    
    // Values
    valuesTitle: 'Why Choose AIERXUAN',
    qualityTitle: '100% Customizable',
    qualityDesc: 'Full control over hardware specs, chassis design, firmware, branding, and packaging. Build products that perfectly match your requirements.',
    innovationTitle: 'Direct Manufacturer',
    innovationDesc: 'Work directly with the factory for 20-40% cost savings, faster decision-making, and complete manufacturing transparency.',
    reliabilityTitle: 'Enterprise Quality',
    reliabilityDesc: '1000+ hours of stress testing, <0.5% failure rate, ISO 9001 certified manufacturing, and comprehensive warranty coverage.',
    serviceTitle: 'Flexible MOQ',
    serviceDesc: 'Start with as few as 50-100 units. Scale to thousands as your business grows. No compromises on quality or service.',
    
    // Certifications
    certificationsTitle: 'Certifications & Standards',
    certificationsDesc: 'Our products meet international quality and safety standards',
    iso9001: 'ISO 9001:2015 Quality Management System',
    iso14001: 'ISO 14001:2015 Environmental Management',
    ce: 'CE Marking for European Conformity',
    rohs: 'RoHS Compliance for Environmental Safety',
    fcc: 'FCC Certification for Electronic Equipment',
    
    // Contact Info
    contactTitle: 'Get In Touch',
    address: 'Juyin Science and Technology Industrial Park, Jihua Street, Longgang District, Shenzhen, China',
    phone: '4008-8228-058',
    email: 'admin@aierxuanlaptop.com',
    businessHours: 'Business Hours',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)',
    timezone: 'Saturday: 9:00 AM - 12:00 PM (GMT+8)',
    
    // CTA
    ctaTitle: 'Ready to Start Your OEM/ODM Project?',
    ctaDescription: 'Contact us today for a free consultation and custom quotation. Our team will help you bring your branded computing solution to life.',
    contactUs: 'Request Quote',
    viewProducts: 'View Products'
  },
  ru: {
    title: 'О компании AIERXUAN',
    subtitle: 'Ведущий поставщик решений промышленной автоматизации',
    heroDescription: 'Специализируемся на высококачественном оборудовании и инновационных технологиях для современных производственных сред.',
    
    overviewTitle: 'Обзор компании',
    overviewContent: 'AIERXUAN является ведущим поставщиком решений промышленной автоматизации, специализирующимся на высококачественном оборудовании и инновационных технологиях для современного производства. Имея многолетний опыт работы в отрасли, мы зарекомендовали себя как надежный партнер для предприятий, ищущих надежные и эффективные решения автоматизации.',
    
    missionTitle: 'Наша миссия',
    missionContent: 'Предоставлять передовые решения промышленной автоматизации, которые повышают производительность, надежность и эффективность для наших клиентов по всему миру.',
    visionTitle: 'Наше видение',
    visionContent: 'Стать мировым лидером в области технологий промышленной автоматизации, стимулируя инновации и совершенство в производственных процессах.',
    
    valuesTitle: 'Наши ценности',
    qualityTitle: 'Превосходство качества',
    qualityDesc: 'Мы поддерживаем высочайшие стандарты качества продукции и обслуживания.',
    innovationTitle: 'Инновации',
    innovationDesc: 'Непрерывные исследования и разработки для опережения отраслевых трендов.',
    reliabilityTitle: 'Надежность',
    reliabilityDesc: 'Надежные решения, которым наши клиенты могут доверять для критических операций.',
    serviceTitle: 'Обслуживание клиентов',
    serviceDesc: 'Техническая поддержка 24/7 и комплексное послепродажное обслуживание.',
    
    certificationsTitle: 'Сертификаты и стандарты',
    certificationsDesc: 'Наша продукция соответствует международным стандартам качества и безопасности',
    iso9001: 'ISO 9001:2015 Система менеджмента качества',
    iso14001: 'ISO 14001:2015 Экологический менеджмент',
    ce: 'Маркировка CE для европейского соответствия',
    rohs: 'Соответствие RoHS для экологической безопасности',
    fcc: 'Сертификация FCC для электронного оборудования',
    
    contactTitle: 'Контактная информация',
    address: 'Индустриальный парк науки и технологий Juyin, улица Jihua, район Longgang, Шэньчжэнь, Китай',
    phone: '4008-8228-058',
    email: 'admin@aierxuanlaptop.com',
    businessHours: 'Рабочие часы',
    hours: 'Понедельник - Пятница: 9:00 - 18:00',
    timezone: 'Суббота: 9:00 - 12:00 (GMT+8)',
    
    ctaTitle: 'Готовы начать?',
    ctaDescription: 'Свяжитесь с нами сегодня, чтобы обсудить ваши потребности в промышленной автоматизации',
    contactUs: 'Связаться с нами',
    viewProducts: 'Посмотреть продукты'
  },
  ja: {
    title: 'AIERXUANについて',
    subtitle: '産業オートメーションソリューションの大手プロバイダー',
    heroDescription: '現代の製造環境向けの高品質機器と革新的技術を専門としています。',
    
    overviewTitle: '会社概要',
    overviewContent: 'AIERXUANは産業オートメーションソリューションの大手プロバイダーであり、現代の製造業向けの高品質機器と革新的技術を専門としています。業界での長年の経験により、信頼性が高く効率的なオートメーションソリューションを求める企業の信頼できるパートナーとしての地位を確立しています。',
    
    missionTitle: '私たちの使命',
    missionContent: '世界中のクライアントの生産性、信頼性、効率性を向上させる最先端の産業オートメーションソリューションを提供すること。',
    visionTitle: '私たちのビジョン',
    visionContent: '産業オートメーション技術の世界的リーダーとなり、製造プロセスにおけるイノベーションと卓越性を推進すること。',
    
    valuesTitle: '私たちの価値観',
    qualityTitle: '品質の卓越性',
    qualityDesc: '製品品質とサービス提供において最高水準を維持しています。',
    innovationTitle: 'イノベーション',
    innovationDesc: '業界トレンドの先を行くための継続的な研究開発。',
    reliabilityTitle: '信頼性',
    reliabilityDesc: 'お客様が重要な業務で信頼できる確実なソリューション。',
    serviceTitle: 'カスタマーサービス',
    serviceDesc: '24時間365日の技術サポートと包括的なアフターサービス。',
    
    certificationsTitle: '認証・規格',
    certificationsDesc: '当社の製品は国際的な品質・安全基準を満たしています',
    iso9001: 'ISO 9001:2015 品質マネジメントシステム',
    iso14001: 'ISO 14001:2015 環境マネジメント',
    ce: 'ヨーロッパ適合性のためのCEマーキング',
    rohs: '環境安全のためのRoHS準拠',
    fcc: '電子機器のFCC認証',
    
    contactTitle: '連絡先情報',
    address: '工業地区、テクノロジーパーク、市、国',
    phone: '+86 123 456 7890',
    email: 'admin@aierxuanlaptop.com',
    businessHours: '営業時間',
    hours: '月曜日 - 金曜日: 9:00 AM - 6:00 PM',
    timezone: '土曜日: 9:00 AM - 12:00 PM (GMT+8)',
    
    ctaTitle: '始める準備はできましたか？',
    ctaDescription: '産業オートメーションのニーズについて今すぐお問い合わせください',
    contactUs: 'お問い合わせ',
    viewProducts: '製品を見る'
  },
  fr: {
    title: 'À propos d\'AIERXUAN',
    subtitle: 'Fournisseur leader de solutions d\'automatisation industrielle',
    heroDescription: 'Spécialisé dans les équipements de haute qualité et les technologies innovantes pour les environnements de fabrication modernes.',
    
    overviewTitle: 'Aperçu de l\'entreprise',
    overviewContent: 'AIERXUAN est un fournisseur leader de solutions d\'automatisation industrielle, spécialisé dans les équipements de haute qualité et les technologies innovantes pour la fabrication moderne. Avec des années d\'expérience dans l\'industrie, nous nous sommes établis comme un partenaire de confiance pour les entreprises recherchant des solutions d\'automatisation fiables et efficaces.',
    
    missionTitle: 'Notre mission',
    missionContent: 'Fournir des solutions d\'automatisation industrielle de pointe qui améliorent la productivité, la fiabilité et l\'efficacité pour nos clients dans le monde entier.',
    visionTitle: 'Notre vision',
    visionContent: 'Être le leader mondial dans la technologie d\'automatisation industrielle, stimulant l\'innovation et l\'excellence dans les processus de fabrication.',
    
    valuesTitle: 'Nos valeurs',
    qualityTitle: 'Excellence qualité',
    qualityDesc: 'Nous maintenons les plus hauts standards de qualité des produits et de prestation de services.',
    innovationTitle: 'Innovation',
    innovationDesc: 'Recherche et développement continus pour rester en avance sur les tendances de l\'industrie.',
    reliabilityTitle: 'Fiabilité',
    reliabilityDesc: 'Solutions fiables sur lesquelles nos clients peuvent compter pour les opérations critiques.',
    serviceTitle: 'Service client',
    serviceDesc: 'Support technique 24/7 et service après-vente complet.',
    
    certificationsTitle: 'Certifications et normes',
    certificationsDesc: 'Nos produits répondent aux normes internationales de qualité et de sécurité',
    iso9001: 'ISO 9001:2015 Système de management de la qualité',
    iso14001: 'ISO 14001:2015 Management environnemental',
    ce: 'Marquage CE pour la conformité européenne',
    rohs: 'Conformité RoHS pour la sécurité environnementale',
    fcc: 'Certification FCC pour équipements électroniques',
    
    contactTitle: 'Informations de contact',
    address: 'District industriel, Parc technologique, Ville, Pays',
    phone: '+86 123 456 7890',
    email: 'admin@aierxuanlaptop.com',
    businessHours: 'Heures d\'ouverture',
    hours: 'Lundi - Vendredi: 9h00 - 18h00',
    timezone: 'Samedi: 9h00 - 12h00 (GMT+8)',
    
    ctaTitle: 'Prêt à commencer?',
    ctaDescription: 'Contactez-nous aujourd\'hui pour discuter de vos besoins en automatisation industrielle',
    contactUs: 'Nous contacter',
    viewProducts: 'Voir les produits'
  },
  pt: {
    title: 'Sobre a AIERXUAN',
    subtitle: 'Fornecedor líder de soluções de automação industrial',
    heroDescription: 'Especializada em equipamentos de alta qualidade e tecnologias inovadoras para ambientes de fabricação modernos.',
    
    overviewTitle: 'Visão geral da empresa',
    overviewContent: 'A AIERXUAN é um fornecedor líder de soluções de automação industrial, especializada em equipamentos de alta qualidade e tecnologias inovadoras para fabricação moderna. Com anos de experiência na indústria, nos estabelecemos como um parceiro confiável para empresas que buscam soluções de automação confiáveis e eficientes.',
    
    missionTitle: 'Nossa missão',
    missionContent: 'Fornecer soluções de automação industrial de ponta que aumentem a produtividade, confiabilidade e eficiência para nossos clientes em todo o mundo.',
    visionTitle: 'Nossa visão',
    visionContent: 'Ser o líder global em tecnologia de automação industrial, impulsionando inovação e excelência em processos de fabricação.',
    
    valuesTitle: 'Nossos valores',
    qualityTitle: 'Excelência em qualidade',
    qualityDesc: 'Mantemos os mais altos padrões de qualidade de produto e prestação de serviços.',
    innovationTitle: 'Inovação',
    innovationDesc: 'Pesquisa e desenvolvimento contínuos para ficar à frente das tendências da indústria.',
    reliabilityTitle: 'Confiabilidade',
    reliabilityDesc: 'Soluções confiáveis nas quais nossos clientes podem confiar para operações críticas.',
    serviceTitle: 'Atendimento ao cliente',
    serviceDesc: 'Suporte técnico 24/7 e serviço pós-venda abrangente.',
    
    certificationsTitle: 'Certificações e padrões',
    certificationsDesc: 'Nossos produtos atendem aos padrões internacionais de qualidade e segurança',
    iso9001: 'ISO 9001:2015 Sistema de Gestão da Qualidade',
    iso14001: 'ISO 14001:2015 Gestão Ambiental',
    ce: 'Marcação CE para Conformidade Europeia',
    rohs: 'Conformidade RoHS para Segurança Ambiental',
    fcc: 'Certificação FCC para Equipamentos Eletrônicos',
    
    contactTitle: 'Informações de contato',
    address: 'Distrito Industrial, Parque Tecnológico, Cidade, País',
    phone: '+86 123 456 7890',
    email: 'admin@aierxuanlaptop.com',
    businessHours: 'Horário comercial',
    hours: 'Segunda - Sexta: 9:00 - 18:00',
    timezone: 'Sábado: 9:00 - 12:00 (GMT+8)',
    
    ctaTitle: 'Pronto para começar?',
    ctaDescription: 'Entre em contato conosco hoje para discutir suas necessidades de automação industrial',
    contactUs: 'Entre em contato',
    viewProducts: 'Ver produtos'
  },
  'zh-CN': {
    title: '关于AIERXUAN',
    subtitle: '工业自动化解决方案的领先供应商',
    heroDescription: '专业提供现代制造环境所需的高品质设备和创新技术。',
    
    overviewTitle: '公司概况',
    overviewContent: 'AIERXUAN是工业自动化解决方案的领先供应商，专业提供现代制造业所需的高品质设备和创新技术。凭借多年的行业经验，我们已成为寻求可靠高效自动化解决方案企业的可信赖合作伙伴。',
    
    missionTitle: '我们的使命',
    missionContent: '为全球客户提供尖端的工业自动化解决方案，提升生产力、可靠性和效率。',
    visionTitle: '我们的愿景',
    visionContent: '成为工业自动化技术的全球领导者，推动制造工艺的创新和卓越。',
    
    valuesTitle: '我们的价值观',
    qualityTitle: '卓越品质',
    qualityDesc: '我们在产品质量和服务交付方面保持最高标准。',
    innovationTitle: '创新',
    innovationDesc: '持续研发，保持行业趋势的领先地位。',
    reliabilityTitle: '可靠性',
    reliabilityDesc: '客户可以信赖的可靠解决方案，适用于关键操作。',
    serviceTitle: '客户服务',
    serviceDesc: '24/7技术支持和全面的售后服务。',
    
    certificationsTitle: '认证与标准',
    certificationsDesc: '我们的产品符合国际质量和安全标准',
    iso9001: 'ISO 9001:2015 质量管理体系',
    iso14001: 'ISO 14001:2015 环境管理',
    ce: 'CE标志欧洲合规认证',
    rohs: 'RoHS环保安全合规',
    fcc: 'FCC电子设备认证',
    
    contactTitle: '联系信息',
    address: '深圳市龙岗区吉华街道聚银科技产业园',
    phone: '4008-8228-058',
    email: 'admin@aierxuanlaptop.com',
    businessHours: '营业时间',
    hours: '周一至周五：上午9:00 - 下午6:00',
    timezone: '周六：上午9:00 - 下午12:00 (GMT+8)',
    
    ctaTitle: '准备开始了吗？',
    ctaDescription: '立即联系我们，讨论您的工业自动化需求',
    contactUs: '联系我们',
    viewProducts: '查看产品'
  }
} as const

export default function AboutPage() {
  const language = useLanguage()
  const texts = aboutPageTexts[language] || aboutPageTexts.en

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/about-hero-banner-new.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Light blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-blue-700/10"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
              {texts.title}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {texts.subtitle}
            </p>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto drop-shadow-md">
              {texts.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {texts.overviewTitle}
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {texts.overviewContent}
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/about-company-overview.jpg"
                  alt="AIERXUAN modern manufacturing facility"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {texts.missionTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {texts.missionContent}
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {texts.visionTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {texts.visionContent}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {texts.valuesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.qualityTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                {texts.qualityDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.innovationTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                {texts.innovationDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.reliabilityTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                {texts.reliabilityDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.serviceTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                {texts.serviceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {texts.certificationsTitle}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {texts.certificationsDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.iso9001}
              </h3>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.iso14001}
              </h3>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.ce}
              </h3>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.rohs}
              </h3>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {texts.fcc}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                {texts.contactTitle}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">{texts.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">{texts.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">{texts.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{texts.businessHours}</h3>
                    <p className="text-gray-600">{texts.hours}</p>
                    <p className="text-gray-600">{texts.timezone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <StaticMap
                className="w-full h-96"
                center={{ lat: 22.6589, lng: 114.2188 }}
                address={texts.address}
                title="AIERXUAN Office"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {texts.ctaTitle}
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            {texts.ctaDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-6 text-lg">
                {texts.contactUs}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 h-12 px-6 text-lg">
                {texts.viewProducts}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
