import { getDictionary } from '@/get-dictionary'
import { type Locale } from '@/i18n-config'
import {
  FeatureTile,
  ProcessCards,
  ProductFamilyCard,
  ProofStrip,
  SectionHeader,
  TechCTA,
  TechHero,
  defaultHeroStatsFor,
  iconFor,
  productFamiliesFor,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import Image from 'next/image'
import { brandFacts } from '@/lib/brand-facts'

// ISR: 每小时重新生成
export const revalidate = 3600

const homeRedesignText = {
  en: {
    hero: {
      eyebrow: `Intel Partner Since ${brandFacts.intelPartnerSince} | CE/FCC/RoHS Certified`,
      title: 'OEM/ODM Laptop & Mini PC Manufacturing',
      subtitle: 'Custom computing hardware for global brands, delivered from Shenzhen with certified quality.',
      liveLabel: 'Live',
      production: {
        title: 'Production Status',
        line: { label: 'Line 03', value: 'Running' },
        qa: { label: 'QA Pass Rate', value: '99.8%' },
        delivery: { label: 'On-Time Delivery', value: '98%' },
        output: { label: 'Monthly Output', value: brandFacts.monthlyCapacity },
      },
      quality: {
        title: 'Quality System',
      },
      stats: {
        moq: { label: 'MOQ', detail: 'Units' },
        delivery: { label: 'Delivery', detail: 'Days' },
        capacity: { label: 'Capacity', detail: '/ Month' },
        clients: { label: 'Global Clients', detail: 'Partners' },
      },
    },
    products: {
      eyebrow: 'Our Products',
      title: 'Computing Solutions Built For Your Business',
      description: 'A comprehensive range of laptops and Mini PCs engineered for performance, reliability, and enterprise deployment.',
      sidebarEyebrow: 'Private-label ready',
      sidebarTitle: 'From product idea to export-ready hardware.',
      sidebarText: 'Business laptops, gaming notebooks, Mini PCs and custom configurations for distributors, education, offices, industrial projects and regional brands.',
      viewAll: 'View All Products',
      viewOem: 'OEM/ODM Manufacturing',
      families: {
        business: {
          title: 'Business Laptop',
          description: 'Reliable, secure and efficient laptops for modern business and education.',
          specs: ['Intel Core', '8-64GB RAM', 'Custom Shell'],
        },
        gaming: {
          title: 'Gaming Laptop',
          description: 'High performance gaming laptops for immersive experiences and retail channels.',
          specs: ['RTX Ready', '144Hz Display', 'Thermal Design'],
        },
        miniPc: {
          title: 'Mini PC',
          description: 'Compact, powerful and versatile Mini PCs for any workspace or deployment.',
          specs: ['Intel/AMD', 'VESA Mount', 'Fanless Option'],
        },
      },
      proof: [
        { value: brandFacts.yearsExperience, label: 'Years Experience' },
        { value: brandFacts.globalClients, label: 'Global Clients' },
        { value: brandFacts.countriesServed, label: 'Countries Served' },
        { value: '99.8%', label: 'Customer Satisfaction' },
      ],
    },
    manufacturing: {
      eyebrow: 'Precision Manufacturing',
      title: 'Factory Capability You Can Show Buyers',
      description: 'Replace empty dark scroll areas with proof: automated production, quality testing, logistics support and certified export readiness.',
      factoryEyebrow: 'Advanced Manufacturing',
      factoryTitle: 'Automated assembly and inspection lines',
      factoryAlt: 'AIERXUAN manufacturing facility',
      tiles: {
        quality: { title: 'Quality Testing', description: 'Incoming inspection, production checks, burn-in testing and final verification before shipment.' },
        config: { title: 'Configuration Control', description: 'CPU, memory, storage, display, BIOS, OS image and regional keyboard options.' },
        branding: { title: 'Branding & Packaging', description: 'Logo, shell finish, labels, manuals and retail box systems for your market.' },
        logistics: { title: 'Global Logistics', description: 'Export documents, certifications, carton planning and worldwide delivery coordination.' },
      },
    },
    process: {
      eyebrow: 'Cooperation Flow',
      title: 'From Requirement to Shipment',
      description: 'A clear sourcing path helps buyers understand what happens after they send an inquiry.',
      steps: [
        { title: 'Consult', description: 'Share product type, target market, configuration and volume.' },
        { title: 'Proposal', description: 'Receive BOM, pricing range, sample plan and production timeline.' },
        { title: 'Sample', description: 'Validate hardware, branding, packaging and software image.' },
        { title: 'Confirm', description: 'Freeze specifications and quality acceptance standards.' },
        { title: 'Produce', description: 'Mass production with quality checkpoints and status updates.' },
        { title: 'Deliver', description: 'Export documents, logistics tracking and after-sales support.' },
      ],
    },
    cta: {
      title: 'Ready to Build Your Next Hardware Line?',
      description: 'Send your target configuration and branding requirements. Our team can respond with practical options for samples, MOQ, certifications and delivery.',
      label: 'Get Custom Quote',
    },
  },
  ru: {
    hero: {
      eyebrow: `Партнёр Intel с ${brandFacts.intelPartnerSince} | CE/FCC/RoHS`,
      title: 'OEM/ODM производство ноутбуков и мини-ПК',
      subtitle: 'Индивидуальные компьютерные решения для мировых брендов с сертифицированным качеством из Шэньчжэня.',
      liveLabel: 'В работе',
      production: {
        title: 'Статус производства',
        line: { label: 'Линия 03', value: 'Работает' },
        qa: { label: 'Прохождение QA', value: '99.8%' },
        delivery: { label: 'Доставка в срок', value: '98%' },
        output: { label: 'Месячный объём', value: '50 000+' },
      },
      quality: {
        title: 'Система качества',
      },
      stats: {
        moq: { label: 'MOQ', detail: 'шт.' },
        delivery: { label: 'Доставка', detail: 'дней' },
        capacity: { label: 'Мощность', detail: '/ мес.' },
        clients: { label: 'Клиенты в мире', detail: 'партнёров' },
      },
    },
    products: {
      eyebrow: 'Наша продукция',
      title: 'Компьютерные решения для вашего бизнеса',
      description: 'Полный ассортимент ноутбуков и мини-ПК, разработанных для производительности, надёжности и корпоративного развёртывания.',
      sidebarEyebrow: 'Готовы к private label',
      sidebarTitle: 'От идеи продукта до готового к экспорту оборудования.',
      sidebarText: 'Бизнес-ноутбуки, игровые ноутбуки, мини-ПК и индивидуальные конфигурации для дистрибьюторов, образования, офисов, промышленных проектов и региональных брендов.',
      viewAll: 'Вся продукция',
      viewOem: 'OEM/ODM производство',
      families: {
        business: {
          title: 'Бизнес-ноутбук',
          description: 'Надёжные, безопасные и эффективные ноутбуки для современного бизнеса и образования.',
          specs: ['Intel Core', '8–64 ГБ ОЗУ', 'Брендирование корпуса'],
        },
        gaming: {
          title: 'Игровой ноутбук',
          description: 'Высокопроизводительные игровые ноутбуки для глубокого погружения и розничных каналов.',
          specs: ['Поддержка RTX', '144 Гц дисплей', 'Термосистема'],
        },
        miniPc: {
          title: 'Мини-ПК',
          description: 'Компактные, мощные и универсальные мини-ПК для любого рабочего места.',
          specs: ['Intel/AMD', 'Крепление VESA', 'Безвентиляторные модели'],
        },
      },
      proof: [
        { value: '10+', label: 'лет опыта' },
        { value: '500+', label: 'клиентов в мире' },
        { value: '50+', label: 'стран обслуживания' },
        { value: '99.8%', label: 'удовлетворённость клиентов' },
      ],
    },
    manufacturing: {
      eyebrow: 'Прецизионное производство',
      title: 'Производственные мощности, которые впечатлят покупателей',
      description: 'Автоматизированное производство, контроль качества, логистика и сертификация для экспорта — реальные доказательства возможностей.',
      factoryEyebrow: 'Передовое производство',
      factoryTitle: 'Автоматизированные линии сборки и контроля',
      factoryAlt: 'Производственная площадка AIERXUAN',
      tiles: {
        quality: { title: 'Контроль качества', description: 'Входной контроль, контроль производства, прогон и финальная проверка перед отгрузкой.' },
        config: { title: 'Контроль конфигурации', description: 'CPU, память, накопители, дисплей, BIOS, образ ОС и региональные раскладки клавиатуры.' },
        branding: { title: 'Брендирование и упаковка', description: 'Логотип, отделка корпуса, этикетки, инструкции и розничная упаковка для вашего рынка.' },
        logistics: { title: 'Глобальная логистика', description: 'Экспортные документы, сертификации, планирование упаковки и координация мировых поставок.' },
      },
    },
    process: {
      eyebrow: 'Процесс сотрудничества',
      title: 'От запроса до отгрузки',
      description: 'Прозрачный путь закупок помогает покупателям понимать процесс после отправки запроса.',
      steps: [
        { title: 'Консультация', description: 'Сообщите тип продукта, целевой рынок, конфигурацию и объём.' },
        { title: 'Предложение', description: 'Получите BOM, диапазон цен, план образцов и сроки производства.' },
        { title: 'Образец', description: 'Проверка оборудования, брендирования, упаковки и программного образа.' },
        { title: 'Подтверждение', description: 'Утверждение спецификации и стандартов приёмки качества.' },
        { title: 'Производство', description: 'Массовое производство с контрольными точками и статус-апдейтами.' },
        { title: 'Доставка', description: 'Экспортные документы, отслеживание логистики и послепродажное обслуживание.' },
      ],
    },
    cta: {
      title: 'Готовы к запуску следующей линейки оборудования?',
      description: 'Пришлите целевую конфигурацию и требования к брендированию. Наша команда предложит варианты по образцам, MOQ, сертификации и доставке.',
      label: 'Получить индивидуальное предложение',
    },
  },
  ja: {
    hero: {
      eyebrow: `${brandFacts.intelPartnerSince}年からIntelパートナー | CE/FCC/RoHS認証`,
      title: 'OEM/ODMノートPC・Mini PC製造',
      subtitle: '深セン発の認証品質で、グローバルブランド向けにカスタムコンピューティングハードウェアを提供します。',
      liveLabel: '稼働中',
      production: {
        title: '生産ステータス',
        line: { label: 'ライン03', value: '稼働中' },
        qa: { label: 'QA合格率', value: '99.8%' },
        delivery: { label: '納期遵守率', value: '98%' },
        output: { label: '月間生産能力', value: brandFacts.monthlyCapacity },
      },
      quality: {
        title: '品質システム',
      },
      stats: {
        moq: { label: 'MOQ', detail: '台' },
        delivery: { label: '納期', detail: '日' },
        capacity: { label: '生産能力', detail: '/ 月' },
        clients: { label: 'グローバル顧客', detail: '社' },
      },
    },
    products: {
      eyebrow: '製品ラインアップ',
      title: 'ビジネス向けに設計されたコンピューティングソリューション',
      description: '性能、信頼性、エンタープライズ導入を重視して設計されたノートPCとMini PCの包括的な製品群です。',
      sidebarEyebrow: 'プライベートブランド対応',
      sidebarTitle: '製品アイデアから輸出対応ハードウェアまで。',
      sidebarText: '販売代理店、教育機関、オフィス、産業プロジェクト、地域ブランド向けに、ビジネスノートPC、ゲーミングノートPC、Mini PC、カスタム構成を提供します。',
      viewAll: 'すべての製品を見る',
      viewOem: 'OEM/ODM製造',
      families: {
        business: {
          title: 'ビジネスノートPC',
          description: '現代のビジネスと教育向けに、信頼性、安全性、効率性を備えたノートPCです。',
          specs: ['Intel Core', '8-64GB RAM', 'カスタム筐体'],
        },
        gaming: {
          title: 'ゲーミングノートPC',
          description: '没入型体験と小売チャネル向けの高性能ゲーミングノートPCです。',
          specs: ['RTX対応', '144Hzディスプレイ', '熱設計'],
        },
        miniPc: {
          title: 'Mini PC',
          description: 'あらゆるワークスペースや導入環境に対応する、コンパクトで高性能なMini PCです。',
          specs: ['Intel/AMD', 'VESAマウント', 'ファンレス対応'],
        },
      },
      proof: [
        { value: brandFacts.yearsExperience, label: '年の経験' },
        { value: brandFacts.globalClients, label: 'グローバル顧客' },
        { value: brandFacts.countriesServed, label: '対応国' },
        { value: '99.8%', label: '顧客満足度' },
      ],
    },
    manufacturing: {
      eyebrow: '精密製造',
      title: 'バイヤーに提示できる工場能力',
      description: '空白の説明ではなく、自動化生産、品質試験、物流支援、認証済みの輸出対応力を実証します。',
      factoryEyebrow: '高度な製造',
      factoryTitle: '自動組立・検査ライン',
      factoryAlt: 'AIERXUAN製造施設',
      tiles: {
        quality: { title: '品質試験', description: '入荷検査、生産中チェック、バーンイン試験、出荷前の最終検証を実施します。' },
        config: { title: '構成管理', description: 'CPU、メモリ、ストレージ、ディスプレイ、BIOS、OSイメージ、地域別キーボードに対応します。' },
        branding: { title: 'ブランド・梱包対応', description: 'ロゴ、筐体仕上げ、ラベル、マニュアル、小売箱を市場に合わせて設計します。' },
        logistics: { title: 'グローバル物流', description: '輸出書類、認証、カートン設計、世界各地への配送調整を支援します。' },
      },
    },
    process: {
      eyebrow: '協業フロー',
      title: '要件確認から出荷まで',
      description: '明確な調達プロセスにより、問い合わせ後の流れをバイヤーが把握しやすくなります。',
      steps: [
        { title: '相談', description: '製品タイプ、対象市場、構成、数量を共有してください。' },
        { title: '提案', description: 'BOM、価格帯、サンプル計画、生産スケジュールを提示します。' },
        { title: 'サンプル', description: 'ハードウェア、ブランド、梱包、ソフトウェアイメージを検証します。' },
        { title: '確定', description: '仕様と品質受入基準を確定します。' },
        { title: '生産', description: '品質チェックポイントと進捗共有を含む量産を行います。' },
        { title: '納品', description: '輸出書類、物流追跡、アフターサポートを提供します。' },
      ],
    },
    cta: {
      title: '次のハードウェアラインを構築しますか？',
      description: '目標構成とブランド要件をお送りください。サンプル、MOQ、認証、納期について現実的な選択肢を提案します。',
      label: 'カスタム見積もりを依頼',
    },
  },
  fr: {
    hero: {
      eyebrow: `Partenaire Intel depuis ${brandFacts.intelPartnerSince} | Certifié CE/FCC/RoHS`,
      title: 'Fabrication OEM/ODM de laptops et Mini PC',
      subtitle: 'Matériel informatique sur mesure pour marques internationales, livré depuis Shenzhen avec une qualité certifiée.',
      liveLabel: 'En cours',
      production: {
        title: 'Statut de production',
        line: { label: 'Ligne 03', value: 'En marche' },
        qa: { label: 'Taux de réussite QA', value: '99.8%' },
        delivery: { label: 'Livraison à temps', value: '98%' },
        output: { label: 'Capacité mensuelle', value: brandFacts.monthlyCapacity },
      },
      quality: {
        title: 'Système qualité',
      },
      stats: {
        moq: { label: 'MOQ', detail: 'unités' },
        delivery: { label: 'Délai', detail: 'jours' },
        capacity: { label: 'Capacité', detail: '/ mois' },
        clients: { label: 'Clients mondiaux', detail: 'partenaires' },
      },
    },
    products: {
      eyebrow: 'Nos produits',
      title: 'Solutions informatiques conçues pour votre activité',
      description: 'Une gamme complète de laptops et Mini PC conçus pour la performance, la fiabilité et les déploiements professionnels.',
      sidebarEyebrow: 'Prêt pour marque privée',
      sidebarTitle: 'De l’idée produit au matériel prêt à l’export.',
      sidebarText: 'Laptops professionnels, laptops gaming, Mini PC et configurations personnalisées pour distributeurs, éducation, bureaux, projets industriels et marques régionales.',
      viewAll: 'Voir tous les produits',
      viewOem: 'Fabrication OEM/ODM',
      families: {
        business: {
          title: 'Laptop professionnel',
          description: 'Laptops fiables, sécurisés et efficaces pour les entreprises modernes et l’éducation.',
          specs: ['Intel Core', '8-64GB RAM', 'Châssis personnalisé'],
        },
        gaming: {
          title: 'Laptop gaming',
          description: 'Laptops gaming haute performance pour expériences immersives et canaux retail.',
          specs: ['Compatible RTX', 'Écran 144Hz', 'Design thermique'],
        },
        miniPc: {
          title: 'Mini PC',
          description: 'Mini PC compacts, puissants et polyvalents pour tout poste de travail ou déploiement.',
          specs: ['Intel/AMD', 'Support VESA', 'Option fanless'],
        },
      },
      proof: [
        { value: brandFacts.yearsExperience, label: 'ans d’expérience' },
        { value: brandFacts.globalClients, label: 'clients mondiaux' },
        { value: brandFacts.countriesServed, label: 'pays servis' },
        { value: '99.8%', label: 'satisfaction client' },
      ],
    },
    manufacturing: {
      eyebrow: 'Fabrication de précision',
      title: 'Une capacité usine que vous pouvez montrer aux acheteurs',
      description: 'Des preuves concrètes: production automatisée, tests qualité, support logistique et préparation certifiée pour l’export.',
      factoryEyebrow: 'Fabrication avancée',
      factoryTitle: 'Lignes automatisées d’assemblage et d’inspection',
      factoryAlt: 'Site de fabrication AIERXUAN',
      tiles: {
        quality: { title: 'Tests qualité', description: 'Inspection entrante, contrôles de production, burn-in testing et vérification finale avant expédition.' },
        config: { title: 'Contrôle de configuration', description: 'CPU, mémoire, stockage, écran, BIOS, image OS et options de clavier régional.' },
        branding: { title: 'Branding et packaging', description: 'Logo, finition du châssis, étiquettes, manuels et boîtes retail pour votre marché.' },
        logistics: { title: 'Logistique mondiale', description: 'Documents export, certifications, planification carton et coordination des livraisons internationales.' },
      },
    },
    process: {
      eyebrow: 'Flux de coopération',
      title: 'Du besoin à l’expédition',
      description: 'Un parcours d’approvisionnement clair aide les acheteurs à comprendre ce qui suit après l’envoi d’une demande.',
      steps: [
        { title: 'Consultation', description: 'Partagez le type de produit, le marché cible, la configuration et le volume.' },
        { title: 'Proposition', description: 'Recevez la BOM, la fourchette de prix, le plan d’échantillon et le calendrier de production.' },
        { title: 'Échantillon', description: 'Validez le matériel, le branding, le packaging et l’image logicielle.' },
        { title: 'Confirmation', description: 'Figez les spécifications et les standards d’acceptation qualité.' },
        { title: 'Production', description: 'Production de masse avec checkpoints qualité et mises à jour de statut.' },
        { title: 'Livraison', description: 'Documents export, suivi logistique et support après-vente.' },
      ],
    },
    cta: {
      title: 'Prêt à créer votre prochaine gamme hardware ?',
      description: 'Envoyez votre configuration cible et vos besoins de branding. Notre équipe répondra avec des options concrètes pour échantillons, MOQ, certifications et livraison.',
      label: 'Demander un devis personnalisé',
    },
  },
  pt: {
    hero: {
      eyebrow: `Parceiro Intel desde ${brandFacts.intelPartnerSince} | Certificado CE/FCC/RoHS`,
      title: 'Fabricação OEM/ODM de laptops e Mini PCs',
      subtitle: 'Hardware de computação personalizado para marcas globais, entregue de Shenzhen com qualidade certificada.',
      liveLabel: 'Ao vivo',
      production: {
        title: 'Status da produção',
        line: { label: 'Linha 03', value: 'Em operação' },
        qa: { label: 'Taxa de aprovação QA', value: '99.8%' },
        delivery: { label: 'Entrega no prazo', value: '98%' },
        output: { label: 'Produção mensal', value: brandFacts.monthlyCapacity },
      },
      quality: {
        title: 'Sistema de qualidade',
      },
      stats: {
        moq: { label: 'MOQ', detail: 'unidades' },
        delivery: { label: 'Entrega', detail: 'dias' },
        capacity: { label: 'Capacidade', detail: '/ mês' },
        clients: { label: 'Clientes globais', detail: 'parceiros' },
      },
    },
    products: {
      eyebrow: 'Nossos produtos',
      title: 'Soluções de computação criadas para o seu negócio',
      description: 'Uma linha completa de laptops e Mini PCs projetados para desempenho, confiabilidade e implantação empresarial.',
      sidebarEyebrow: 'Pronto para marca própria',
      sidebarTitle: 'Da ideia do produto ao hardware pronto para exportação.',
      sidebarText: 'Laptops empresariais, notebooks gamer, Mini PCs e configurações personalizadas para distribuidores, educação, escritórios, projetos industriais e marcas regionais.',
      viewAll: 'Ver todos os produtos',
      viewOem: 'Fabricação OEM/ODM',
      families: {
        business: {
          title: 'Laptop empresarial',
          description: 'Laptops confiáveis, seguros e eficientes para empresas modernas e educação.',
          specs: ['Intel Core', '8-64GB RAM', 'Carcaça personalizada'],
        },
        gaming: {
          title: 'Notebook gamer',
          description: 'Notebooks gamer de alto desempenho para experiências imersivas e canais de varejo.',
          specs: ['Pronto para RTX', 'Tela 144Hz', 'Design térmico'],
        },
        miniPc: {
          title: 'Mini PC',
          description: 'Mini PCs compactos, potentes e versáteis para qualquer espaço de trabalho ou implantação.',
          specs: ['Intel/AMD', 'Montagem VESA', 'Opção fanless'],
        },
      },
      proof: [
        { value: brandFacts.yearsExperience, label: 'anos de experiência' },
        { value: brandFacts.globalClients, label: 'clientes globais' },
        { value: brandFacts.countriesServed, label: 'países atendidos' },
        { value: '99.8%', label: 'satisfação do cliente' },
      ],
    },
    manufacturing: {
      eyebrow: 'Fabricação de precisão',
      title: 'Capacidade de fábrica que você pode mostrar aos compradores',
      description: 'Provas concretas: produção automatizada, testes de qualidade, suporte logístico e prontidão certificada para exportação.',
      factoryEyebrow: 'Fabricação avançada',
      factoryTitle: 'Linhas automatizadas de montagem e inspeção',
      factoryAlt: 'Instalação de fabricação da AIERXUAN',
      tiles: {
        quality: { title: 'Testes de qualidade', description: 'Inspeção de entrada, checagens em produção, burn-in testing e verificação final antes do envio.' },
        config: { title: 'Controle de configuração', description: 'CPU, memória, armazenamento, tela, BIOS, imagem do OS e opções de teclado regional.' },
        branding: { title: 'Branding e embalagem', description: 'Logo, acabamento da carcaça, etiquetas, manuais e caixas de varejo para o seu mercado.' },
        logistics: { title: 'Logística global', description: 'Documentos de exportação, certificações, planejamento de caixas e coordenação de entrega mundial.' },
      },
    },
    process: {
      eyebrow: 'Fluxo de cooperação',
      title: 'Do requisito ao embarque',
      description: 'Um caminho de sourcing claro ajuda compradores a entender o que acontece depois do envio da consulta.',
      steps: [
        { title: 'Consulta', description: 'Compartilhe o tipo de produto, mercado-alvo, configuração e volume.' },
        { title: 'Proposta', description: 'Receba BOM, faixa de preço, plano de amostra e cronograma de produção.' },
        { title: 'Amostra', description: 'Valide hardware, branding, embalagem e imagem de software.' },
        { title: 'Confirmação', description: 'Congele especificações e padrões de aceitação de qualidade.' },
        { title: 'Produção', description: 'Produção em massa com checkpoints de qualidade e atualizações de status.' },
        { title: 'Entrega', description: 'Documentos de exportação, rastreamento logístico e suporte pós-venda.' },
      ],
    },
    cta: {
      title: 'Pronto para criar sua próxima linha de hardware?',
      description: 'Envie sua configuração-alvo e requisitos de branding. Nossa equipe pode responder com opções práticas para amostras, MOQ, certificações e entrega.',
      label: 'Solicitar cotação personalizada',
    },
  },
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = homeRedesignText[lang] ?? homeRedesignText.en

  const families = productFamiliesFor(t.products.families)
  const heroStats = defaultHeroStatsFor(t.hero.stats)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.homeHero}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        primaryLabel={dictionary.common.requestQuote}
        secondaryLabel={dictionary.common.viewProducts}
        stats={heroStats}
        liveLabel={t.hero.liveLabel}
        widgets={[
          {
            title: t.hero.production.title,
            rows: [
              { label: t.hero.production.line.label, value: t.hero.production.line.value, status: 'live' },
              { label: t.hero.production.qa.label, value: t.hero.production.qa.value, status: 'ok' },
              { label: t.hero.production.delivery.label, value: t.hero.production.delivery.value },
              { label: t.hero.production.output.label, value: t.hero.production.output.value },
            ],
          },
          {
            title: t.hero.quality.title,
            rows: [
              { label: 'IQC', value: '100%', status: 'ok' },
              { label: 'IPQC', value: '100%', status: 'ok' },
              { label: 'FQC', value: '100%', status: 'ok' },
              { label: 'OQC', value: '100%', status: 'ok' },
            ],
          },
        ]}
      />

      <section id="products" className="relative overflow-hidden bg-slate-50 py-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 opacity-40" style={{ backgroundImage: 'linear-gradient(90deg, rgba(37,99,235,0.12), transparent)' }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow={t.products.eyebrow}
            title={t.products.title}
            description={t.products.description}
          />
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{t.products.sidebarEyebrow}</div>
                <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950">{t.products.sidebarTitle}</h3>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  {t.products.sidebarText}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={`/${lang}/products`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                  {t.products.viewAll}
                  <span>→</span>
                </a>
                <a href={`/${lang}/oem`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600">
                  {t.products.viewOem}
                  <span>→</span>
                </a>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {families.map((family) => (
                <ProductFamilyCard key={family.title} family={family} href={`/${lang}/products`} />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <ProofStrip metrics={t.products.proof.map((m) => ({ value: m.value, label: m.label }))} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t.manufacturing.eyebrow}
            title={t.manufacturing.title}
            description={t.manufacturing.description}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative min-h-[460px] overflow-hidden rounded-xl border border-white/12">
              <Image src={redesignImages.factory} alt={t.manufacturing.factoryAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/86 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{t.manufacturing.factoryEyebrow}</div>
                <h3 className="mt-3 text-3xl font-black">{t.manufacturing.factoryTitle}</h3>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureTile icon={iconFor('quality')} title={t.manufacturing.tiles.quality.title} description={t.manufacturing.tiles.quality.description} />
              <FeatureTile icon={iconFor('cpu')} title={t.manufacturing.tiles.config.title} description={t.manufacturing.tiles.config.description} />
              <FeatureTile icon={iconFor('package')} title={t.manufacturing.tiles.branding.title} description={t.manufacturing.tiles.branding.description} />
              <FeatureTile icon={iconFor('truck')} title={t.manufacturing.tiles.logistics.title} description={t.manufacturing.tiles.logistics.description} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            description={t.process.description}
          />
          <ProcessCards light steps={[...t.process.steps]} />
        </div>
      </section>

      <TechCTA
        title={t.cta.title}
        description={t.cta.description}
        href={`/${lang}/contact`}
        label={t.cta.label}
      />
    </div>
  )
}
