import { Metadata } from 'next'
import { type Locale } from '@/i18n-config'
import { SITE_URL } from '@/lib/site-url'
import { buildOgTwitter } from '@/lib/seo'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { Award, Cpu, Handshake, PackageCheck, Presentation, ShieldCheck, Truck, Users } from 'lucide-react'
import {
  ProofStrip,
  SectionHeader,
  TechCTA,
  TechHero,
  redesignImages,
} from '@/components/redesign/TechPrimitives'
import { brandFacts, brandFactText } from '@/lib/brand-facts'
import { localizedAlternates } from '@/lib/technical-seo'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const metaByLang: Record<string, { title: string; description: string; keywords: string }> = {
    en: {
      title: 'About AIERXUAN - Laptop & Mini PC Factory',
      description: 'Learn about AIERXUAN, a Shenzhen-based OEM/ODM manufacturer specializing in laptops, mini PCs and industrial computers. ISO 9001 certified factory.',
      keywords: 'about aierxuan, laptop manufacturer, shenzhen factory, oem odm, iso certified',
    },
    ru: {
      title: 'О AIERXUAN - фабрика ноутбуков и мини-ПК',
      description: 'Узнайте об AIERXUAN — OEM/ODM производителе ноутбуков, мини-ПК и промышленных компьютеров в Шэньчжэне. Сертификация ISO 9001.',
      keywords: 'об aierxuan, производитель ноутбуков, фабрика Шэньчжэнь, OEM ODM, сертификация ISO',
    },
    ja: {
      title: 'AIERXUANについて - ノートPC・Mini PC工場',
      description: 'AIERXUANは深セン拠点のOEM/ODMメーカーです。ノートPC、Mini PC、産業用コンピューターを専門とし、ISO 9001認証工場で製造します。',
      keywords: 'AIERXUANについて, ノートPCメーカー, 深セン工場, OEM ODM, ISO認証',
    },
    fr: {
      title: 'À propos d’AIERXUAN - Usine laptops & Mini PC',
      description: 'Découvrez AIERXUAN, fabricant OEM/ODM basé à Shenzhen pour laptops, Mini PC et ordinateurs industriels. Usine certifiée ISO 9001.',
      keywords: 'à propos aierxuan, fabricant laptop, usine shenzhen, oem odm, certification iso',
    },
    pt: {
      title: 'Sobre a AIERXUAN - Fábrica de laptops e Mini PCs',
      description: 'Conheça a AIERXUAN, fabricante OEM/ODM sediada em Shenzhen especializada em laptops, Mini PCs e computadores industriais. Fábrica com ISO 9001.',
      keywords: 'sobre aierxuan, fabricante de laptops, fábrica shenzhen, oem odm, certificação iso',
    },
  }
  const seo = metaByLang[lang] ?? metaByLang.en

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${SITE_URL}/${lang}/about`,
      languages: localizedAlternates('/about'),
    },
    ...buildOgTwitter({ lang, title: seo.title, description: seo.description, path: '/about' }),
  }
}

interface AboutPageProps {
  params: Promise<{ lang: Locale }>
}

const aboutRedesignText = {
  en: {
    hero: {
      eyebrow: 'Professional Laptop & Mini PC Manufacturer',
      title: 'Built in Shenzhen for Reliable Computing Brands',
      facilityTitle: 'Facility Overview',
      factorySystem: { label: 'Factory System', value: 'Active' },
      monthlyCapacity: 'Monthly Capacity',
      qualityControl: { label: 'Quality Control', value: 'ISO' },
      reachTitle: 'Global Reach',
      countries: 'Countries',
      clients: 'Clients',
      unitsShipped: 'Units Shipped',
    },
    factoryEvidence: {
      eyebrow: 'Real Factory Evidence',
      title: 'Real Factory Photos Buyers Can Verify',
      description: 'The original factory photos are now the main credibility layer: production line, assembly benches, testing workstations, packing and on-site buyer visits.',
      sideEyebrow: 'Factory Visit View',
      sideTitle: 'Real photos should carry the trust, while the interface keeps the premium technology tone.',
      sideDescription: 'These images come from the original About page assets. The new layout treats them like audit evidence: buyers can quickly see the workshop, workers, testing flow, packing area and visitor walkthroughs.',
    },
    factoryHighlights: [
      { label: 'Production Line', detail: 'Assembly benches and workshop flow' },
      { label: 'QC Station', detail: 'Testing and inspection scenes' },
      { label: 'Packing Area', detail: 'Shipment preparation evidence' },
      { label: 'Buyer Visit', detail: 'On-site walkthrough photos' },
    ],
    factoryPhotos: [
      { title: 'Assembly Line', tag: 'Real workshop photo' },
      { title: 'Buyer Factory Visit', tag: 'On-site review' },
      { title: 'Quality Control Station', tag: 'QC workflow' },
      { title: 'Testing Workstations', tag: 'Production floor' },
      { title: 'Packing and Logistics', tag: 'Shipment prep' },
      { title: 'Factory Equipment', tag: 'Facility view' },
    ],
    operationalProof: {
      eyebrow: 'Operational Proof',
      title: 'Real Scenes Behind the Supplier Story',
      description: 'Instead of only icon cards, this section pairs each trust claim with a real factory or customer-facing image from the original site.',
      cards: [
        { title: 'Integrated Production', description: 'Real production-line photography shows that buyers are not only seeing abstract capability claims.' },
        { title: 'Quality Workflow', description: 'QC workstations and inspection areas support sample review, burn-in checks and shipment verification.' },
        { title: 'Shipment Preparation', description: 'Packing and warehouse photos help overseas buyers understand export readiness before placing orders.' },
        { title: 'Customer Conversations', description: 'Trade-show and meeting photos give the About page a more human, supplier-facing credibility layer.' },
      ],
    },
    events: {
      eyebrow: 'Events and Partner Records',
      title: 'Real Customer and Intel Program Photos',
      description: 'These original event images add human proof: exhibitions, customer conversations, product showcases and channel recognition.',
      groups: [
        {
          title: 'International Exhibitions',
          description: 'Customer meetings, product demos and booth conversations from the original About page image library.',
          images: [
            'Trade show customers visiting AIERXUAN booth',
            'Business meeting with laptop samples',
            'Customer photo at electronics exhibition',
            'Product discussion at trade fair table',
          ],
        },
        {
          title: 'Intel Channel Recognition',
          description: 'Partner-event photos help connect AIERXUAN with platform programs and computing hardware channels.',
          images: [
            'Intel event display with AIERXUAN branding',
            'Intel award ceremony photo',
            'Intel conference stage recognition',
            'Intel partner summit audience and stage',
          ],
        },
      ],
    },
    timeline: {
      eyebrow: 'Company Timeline',
      title: 'Growth Built Around Computing Hardware',
      description: 'A compact timeline gives buyers a fast read on maturity and long-term supplier fit.',
      items: [
        { year: brandFacts.foundedYear, copy: 'AIERXUAN is founded in Shenzhen and begins laptop and computing hardware operations.' },
        { year: brandFacts.intelPartnerSince, copy: 'Intel channel partnership strengthens platform access.' },
        { year: '2021', copy: 'Mini PC and industrial computing programs expand.' },
        { year: '2024', copy: 'Global export catalog and OEM workflows mature.' },
        { year: '2026', copy: 'Digital experience rebuilt for global sourcing teams.' },
      ],
    },
    certifications: {
      eyebrow: 'Certifications and Trust',
      title: 'Compliance Proof for Buyer Due Diligence',
      description: 'Certification cards make market access and quality management visible before a supplier audit.',
      support: 'Verified documentation support for international market access.',
      cards: ['CE Certification', 'FCC Compliance', 'RoHS Compliant', 'ISO 9001'],
    },
    cta: {
      title: 'Plan a Factory Visit or Supplier Audit',
      description: 'Route serious buyers toward audits, samples and production planning with a clearer company credibility page.',
    },
  },
  ru: {
    hero: {
      eyebrow: 'Профессиональный производитель ноутбуков и мини-ПК',
      title: 'Производство в Шэньчжэне для надёжных компьютерных брендов',
      facilityTitle: 'Обзор производства',
      factorySystem: { label: 'Система фабрики', value: 'Активна' },
      monthlyCapacity: 'Месячная мощность',
      qualityControl: { label: 'Контроль качества', value: 'ISO' },
      reachTitle: 'Глобальный охват',
      countries: 'Страны',
      clients: 'Клиенты',
      unitsShipped: 'Отгружено устройств',
    },
    factoryEvidence: {
      eyebrow: 'Реальные доказательства фабрики',
      title: 'Фотографии фабрики, которые покупатели могут проверить',
      description: 'Оригинальные фото фабрики стали ключевым слоем доверия: производственная линия, сборочные столы, зоны тестирования, упаковка и визиты покупателей.',
      sideEyebrow: 'Вид фабричного визита',
      sideTitle: 'Реальные фото создают доверие, а интерфейс сохраняет премиальный технологичный тон.',
      sideDescription: 'Изображения взяты из оригинальных материалов страницы About. Новый макет подаёт их как доказательства аудита: покупатели быстро видят цех, сотрудников, процесс тестирования, упаковку и проходы по фабрике.',
    },
    factoryHighlights: [
      { label: 'Производственная линия', detail: 'Сборочные столы и поток цеха' },
      { label: 'Станция QC', detail: 'Сцены тестирования и инспекции' },
      { label: 'Зона упаковки', detail: 'Доказательства подготовки к отгрузке' },
      { label: 'Визит покупателя', detail: 'Фото обхода на месте' },
    ],
    factoryPhotos: [
      { title: 'Сборочная линия', tag: 'Реальное фото цеха' },
      { title: 'Визит покупателя на фабрику', tag: 'Проверка на месте' },
      { title: 'Станция контроля качества', tag: 'Процесс QC' },
      { title: 'Тестовые рабочие места', tag: 'Производственный пол' },
      { title: 'Упаковка и логистика', tag: 'Подготовка к отправке' },
      { title: 'Оборудование фабрики', tag: 'Вид площадки' },
    ],
    operationalProof: {
      eyebrow: 'Операционные доказательства',
      title: 'Реальные сцены за историей поставщика',
      description: 'Вместо одних карточек с иконками раздел связывает каждое заявление о доверии с реальным фото фабрики или общения с клиентами.',
      cards: [
        { title: 'Интегрированное производство', description: 'Фото производственной линии показывают покупателям реальные возможности, а не только абстрактные обещания.' },
        { title: 'Процесс качества', description: 'Рабочие места QC и зоны инспекции подтверждают обзор образцов, burn-in проверки и верификацию отгрузки.' },
        { title: 'Подготовка к отгрузке', description: 'Фото упаковки и склада помогают зарубежным покупателям оценить экспортную готовность до заказа.' },
        { title: 'Разговоры с клиентами', description: 'Фото выставок и встреч добавляют странице About человеческий и поставщицкий слой доверия.' },
      ],
    },
    events: {
      eyebrow: 'События и записи партнёрств',
      title: 'Реальные фото клиентов и программы Intel',
      description: 'Оригинальные фото событий добавляют человеческое подтверждение: выставки, разговоры с клиентами, демонстрации продуктов и признание канала.',
      groups: [
        {
          title: 'Международные выставки',
          description: 'Встречи с клиентами, демо продуктов и разговоры на стенде из оригинальной библиотеки изображений About.',
          images: [
            'Клиенты посещают стенд AIERXUAN на выставке',
            'Деловая встреча с образцами ноутбуков',
            'Фото клиента на выставке электроники',
            'Обсуждение продукта за столом на ярмарке',
          ],
        },
        {
          title: 'Признание канала Intel',
          description: 'Фото партнёрских событий связывают AIERXUAN с платформенными программами и каналами компьютерного оборудования.',
          images: [
            'Стенд Intel с брендингом AIERXUAN',
            'Фото церемонии награждения Intel',
            'Признание на сцене конференции Intel',
            'Аудитория и сцена партнёрского саммита Intel',
          ],
        },
      ],
    },
    timeline: {
      eyebrow: 'Хронология компании',
      title: 'Рост вокруг компьютерного оборудования',
      description: 'Краткая хронология помогает покупателям быстро оценить зрелость и долгосрочное соответствие поставщика.',
      items: [
        { year: brandFacts.foundedYear, copy: 'AIERXUAN основана в Шэньчжэне и начинает операции с ноутбуками и компьютерным оборудованием.' },
        { year: brandFacts.intelPartnerSince, copy: 'Партнёрство с каналом Intel усиливает доступ к платформам.' },
        { year: '2021', copy: 'Расширяются программы мини-ПК и промышленного компьютинга.' },
        { year: '2024', copy: 'Созревают глобальный экспортный каталог и OEM-процессы.' },
        { year: '2026', copy: 'Цифровой опыт перестроен для глобальных sourcing-команд.' },
      ],
    },
    certifications: {
      eyebrow: 'Сертификации и доверие',
      title: 'Доказательства соответствия для due diligence покупателей',
      description: 'Карточки сертификаций делают доступ к рынкам и управление качеством видимыми до аудита поставщика.',
      support: 'Подтверждённая документационная поддержка для международного доступа к рынкам.',
      cards: ['Сертификация CE', 'Соответствие FCC', 'Соответствие RoHS', 'ISO 9001'],
    },
    cta: {
      title: 'Запланировать визит на фабрику или аудит поставщика',
      description: 'Направьте серьёзных покупателей к аудитам, образцам и планированию производства через более понятную страницу доверия.',
    },
  },
  ja: {
    hero: {
      eyebrow: 'プロフェッショナルなノートPC・Mini PCメーカー',
      title: '信頼されるコンピューティングブランドのために深センで製造',
      facilityTitle: '施設概要',
      factorySystem: { label: '工場システム', value: '稼働中' },
      monthlyCapacity: '月間生産能力',
      qualityControl: { label: '品質管理', value: 'ISO' },
      reachTitle: 'グローバル対応',
      countries: '対応国',
      clients: '顧客',
      unitsShipped: '出荷台数',
    },
    factoryEvidence: {
      eyebrow: '実際の工場証拠',
      title: 'バイヤーが確認できる実際の工場写真',
      description: '生産ライン、組立ベンチ、テストワークステーション、梱包、現地訪問の写真を信頼性の中心に配置しています。',
      sideEyebrow: '工場訪問ビュー',
      sideTitle: '実際の写真で信頼を示し、インターフェースはプレミアムな技術感を維持します。',
      sideDescription: 'これらの画像は元のAboutページ資産です。新しいレイアウトでは監査証拠のように扱い、バイヤーが工場、作業者、テスト工程、梱包エリア、訪問動線をすばやく確認できます。',
    },
    factoryHighlights: [
      { label: '生産ライン', detail: '組立ベンチとワークショップの流れ' },
      { label: 'QCステーション', detail: 'テストと検査の現場' },
      { label: '梱包エリア', detail: '出荷準備の証拠' },
      { label: 'バイヤー訪問', detail: '現地ウォークスルー写真' },
    ],
    factoryPhotos: [
      { title: '組立ライン', tag: '実際の工場写真' },
      { title: 'バイヤー工場訪問', tag: '現地レビュー' },
      { title: '品質管理ステーション', tag: 'QCワークフロー' },
      { title: 'テストワークステーション', tag: '生産フロア' },
      { title: '梱包と物流', tag: '出荷準備' },
      { title: '工場設備', tag: '施設ビュー' },
    ],
    operationalProof: {
      eyebrow: '運用実績',
      title: 'サプライヤーストーリーを支える実際の現場',
      description: 'アイコンだけでなく、各信頼要素を実際の工場写真や顧客対応写真と組み合わせています。',
      cards: [
        { title: '一体化された生産', description: '生産ラインの写真により、抽象的な能力主張だけではないことをバイヤーに示します。' },
        { title: '品質ワークフロー', description: 'QC作業台と検査エリアは、サンプル確認、バーンイン、出荷検証を裏付けます。' },
        { title: '出荷準備', description: '梱包と倉庫の写真により、海外バイヤーは発注前に輸出対応力を確認できます。' },
        { title: '顧客との対話', description: '展示会や商談写真が、Aboutページに人の存在とサプライヤーとしての信頼性を加えます。' },
      ],
    },
    events: {
      eyebrow: 'イベントとパートナー記録',
      title: '実際の顧客写真とIntelプログラム写真',
      description: '展示会、顧客商談、製品展示、チャネル認定の写真が、人による信頼の証拠になります。',
      groups: [
        {
          title: '国際展示会',
          description: '元のAboutページ画像ライブラリから、顧客ミーティング、製品デモ、ブースでの商談を掲載しています。',
          images: [
            'AIERXUANブースを訪問する展示会顧客',
            'ノートPCサンプルを使った商談',
            '電子機器展示会での顧客写真',
            '展示会テーブルでの製品相談',
          ],
        },
        {
          title: 'Intelチャネル認定',
          description: 'パートナーイベント写真により、AIERXUANとプラットフォームプログラム、コンピューティングハードウェアチャネルのつながりを示します。',
          images: [
            'AIERXUANブランドが表示されたIntelイベント展示',
            'Intel表彰式の写真',
            'Intelカンファレンスステージでの認定',
            'Intelパートナーサミットの観客とステージ',
          ],
        },
      ],
    },
    timeline: {
      eyebrow: '会社沿革',
      title: 'コンピューティングハードウェアを軸にした成長',
      description: '簡潔なタイムラインにより、バイヤーは成熟度と長期的なサプライヤー適合性をすばやく把握できます。',
      items: [
        { year: brandFacts.foundedYear, copy: 'AIERXUANは深センで設立され、ノートPCとコンピューティングハードウェア事業を開始。' },
        { year: brandFacts.intelPartnerSince, copy: 'Intelチャネルパートナーシップにより、プラットフォームアクセスを強化。' },
        { year: '2021', copy: 'Mini PCと産業用コンピューティングプログラムを拡大。' },
        { year: '2024', copy: 'グローバル輸出カタログとOEMワークフローが成熟。' },
        { year: '2026', copy: 'グローバル調達チーム向けにデジタル体験を刷新。' },
      ],
    },
    certifications: {
      eyebrow: '認証と信頼',
      title: 'バイヤーのデューデリジェンスに必要な適合証拠',
      description: '認証カードにより、サプライヤー監査前に市場アクセスと品質管理を可視化します。',
      support: '国際市場アクセスに向けた検証済み文書サポート。',
      cards: ['CE認証', 'FCC準拠', 'RoHS準拠', 'ISO 9001'],
    },
    cta: {
      title: '工場訪問またはサプライヤー監査を計画',
      description: '真剣なバイヤーを監査、サンプル、生産計画へ導く、より明確な企業信頼ページです。',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Fabricant professionnel de laptops et Mini PC',
      title: 'Fabriqué à Shenzhen pour des marques informatiques fiables',
      facilityTitle: 'Vue d’ensemble de l’usine',
      factorySystem: { label: 'Système usine', value: 'Actif' },
      monthlyCapacity: 'Capacité mensuelle',
      qualityControl: { label: 'Contrôle qualité', value: 'ISO' },
      reachTitle: 'Portée mondiale',
      countries: 'Pays',
      clients: 'Clients',
      unitsShipped: 'Unités expédiées',
    },
    factoryEvidence: {
      eyebrow: 'Preuves réelles d’usine',
      title: 'Des photos d’usine que les acheteurs peuvent vérifier',
      description: 'Les photos d’origine deviennent la couche principale de crédibilité: ligne de production, postes d’assemblage, stations de test, emballage et visites sur site.',
      sideEyebrow: 'Vue de visite d’usine',
      sideTitle: 'Les vraies photos portent la confiance, tandis que l’interface conserve un ton technologique premium.',
      sideDescription: 'Ces images proviennent des actifs de la page About d’origine. Le nouveau layout les traite comme des preuves d’audit: les acheteurs voient rapidement l’atelier, les équipes, le flux de test, la zone d’emballage et les visites clients.',
    },
    factoryHighlights: [
      { label: 'Ligne de production', detail: 'Postes d’assemblage et flux atelier' },
      { label: 'Station QC', detail: 'Scènes de test et d’inspection' },
      { label: 'Zone d’emballage', detail: 'Preuve de préparation à l’expédition' },
      { label: 'Visite acheteur', detail: 'Photos de walkthrough sur site' },
    ],
    factoryPhotos: [
      { title: 'Ligne d’assemblage', tag: 'Photo réelle d’atelier' },
      { title: 'Visite d’usine acheteur', tag: 'Revue sur site' },
      { title: 'Station de contrôle qualité', tag: 'Flux QC' },
      { title: 'Postes de test', tag: 'Zone de production' },
      { title: 'Emballage et logistique', tag: 'Préparation expédition' },
      { title: 'Équipement d’usine', tag: 'Vue de l’installation' },
    ],
    operationalProof: {
      eyebrow: 'Preuves opérationnelles',
      title: 'Scènes réelles derrière l’histoire fournisseur',
      description: 'Au lieu de simples cartes d’icônes, cette section relie chaque promesse de confiance à une image réelle d’usine ou de relation client.',
      cards: [
        { title: 'Production intégrée', description: 'Les photos de ligne de production montrent aux acheteurs des capacités concrètes, pas seulement des déclarations abstraites.' },
        { title: 'Flux qualité', description: 'Les postes QC et zones d’inspection soutiennent la revue d’échantillons, les tests burn-in et la vérification avant expédition.' },
        { title: 'Préparation d’expédition', description: 'Les photos d’emballage et d’entrepôt aident les acheteurs étrangers à comprendre la préparation export avant commande.' },
        { title: 'Conversations clients', description: 'Les photos de salons et réunions ajoutent à la page About une couche de crédibilité plus humaine et fournisseur.' },
      ],
    },
    events: {
      eyebrow: 'Événements et archives partenaires',
      title: 'Photos réelles de clients et du programme Intel',
      description: 'Ces images d’événements ajoutent une preuve humaine: salons, conversations clients, démonstrations produit et reconnaissance de canal.',
      groups: [
        {
          title: 'Expositions internationales',
          description: 'Réunions clients, démonstrations produits et discussions de stand issues de la bibliothèque d’images About d’origine.',
          images: [
            'Clients visitant le stand AIERXUAN',
            'Réunion professionnelle avec échantillons de laptops',
            'Photo client lors d’un salon électronique',
            'Discussion produit à une table de salon',
          ],
        },
        {
          title: 'Reconnaissance canal Intel',
          description: 'Les photos d’événements partenaires relient AIERXUAN aux programmes plateforme et aux canaux hardware.',
          images: [
            'Affichage Intel avec branding AIERXUAN',
            'Photo de cérémonie de prix Intel',
            'Reconnaissance sur scène lors d’une conférence Intel',
            'Audience et scène du sommet partenaire Intel',
          ],
        },
      ],
    },
    timeline: {
      eyebrow: 'Chronologie de l’entreprise',
      title: 'Une croissance construite autour du hardware informatique',
      description: 'Une chronologie compacte donne aux acheteurs une lecture rapide de la maturité et de l’adéquation fournisseur à long terme.',
      items: [
        { year: brandFacts.foundedYear, copy: 'AIERXUAN est fondée à Shenzhen et démarre ses opérations laptops et hardware informatique.' },
        { year: brandFacts.intelPartnerSince, copy: 'Le partenariat canal Intel renforce l’accès aux plateformes.' },
        { year: '2021', copy: 'Les programmes Mini PC et computing industriel s’élargissent.' },
        { year: '2024', copy: 'Le catalogue export mondial et les workflows OEM arrivent à maturité.' },
        { year: '2026', copy: 'L’expérience digitale est reconstruite pour les équipes sourcing internationales.' },
      ],
    },
    certifications: {
      eyebrow: 'Certifications et confiance',
      title: 'Preuves de conformité pour la due diligence acheteur',
      description: 'Les cartes de certification rendent visibles l’accès au marché et la gestion qualité avant un audit fournisseur.',
      support: 'Support documentaire vérifié pour l’accès aux marchés internationaux.',
      cards: ['Certification CE', 'Conformité FCC', 'Conformité RoHS', 'ISO 9001'],
    },
    cta: {
      title: 'Planifier une visite d’usine ou un audit fournisseur',
      description: 'Orientez les acheteurs sérieux vers les audits, échantillons et plans de production avec une page crédibilité plus claire.',
    },
  },
  pt: {
    hero: {
      eyebrow: 'Fabricante profissional de laptops e Mini PCs',
      title: 'Produzido em Shenzhen para marcas de computação confiáveis',
      facilityTitle: 'Visão geral da fábrica',
      factorySystem: { label: 'Sistema da fábrica', value: 'Ativo' },
      monthlyCapacity: 'Capacidade mensal',
      qualityControl: { label: 'Controle de qualidade', value: 'ISO' },
      reachTitle: 'Alcance global',
      countries: 'Países',
      clients: 'Clientes',
      unitsShipped: 'Unidades enviadas',
    },
    factoryEvidence: {
      eyebrow: 'Evidência real da fábrica',
      title: 'Fotos reais da fábrica que compradores podem verificar',
      description: 'As fotos originais da fábrica agora são a principal camada de credibilidade: linha de produção, bancadas de montagem, estações de teste, embalagem e visitas de compradores.',
      sideEyebrow: 'Visão de visita à fábrica',
      sideTitle: 'Fotos reais sustentam a confiança, enquanto a interface mantém um tom tecnológico premium.',
      sideDescription: 'Estas imagens vêm dos ativos originais da página About. O novo layout as trata como evidência de auditoria: compradores veem rapidamente oficina, trabalhadores, fluxo de teste, área de embalagem e visitas no local.',
    },
    factoryHighlights: [
      { label: 'Linha de produção', detail: 'Bancadas de montagem e fluxo da oficina' },
      { label: 'Estação QC', detail: 'Cenas de teste e inspeção' },
      { label: 'Área de embalagem', detail: 'Evidência de preparação para envio' },
      { label: 'Visita do comprador', detail: 'Fotos de walkthrough no local' },
    ],
    factoryPhotos: [
      { title: 'Linha de montagem', tag: 'Foto real da oficina' },
      { title: 'Visita do comprador à fábrica', tag: 'Revisão no local' },
      { title: 'Estação de controle de qualidade', tag: 'Fluxo QC' },
      { title: 'Estações de teste', tag: 'Piso de produção' },
      { title: 'Embalagem e logística', tag: 'Preparação de envio' },
      { title: 'Equipamentos da fábrica', tag: 'Vista da instalação' },
    ],
    operationalProof: {
      eyebrow: 'Prova operacional',
      title: 'Cenas reais por trás da história do fornecedor',
      description: 'Em vez de apenas cards com ícones, esta seção conecta cada promessa de confiança a uma imagem real da fábrica ou de contato com clientes.',
      cards: [
        { title: 'Produção integrada', description: 'Fotos reais da linha de produção mostram que compradores não estão vendo apenas alegações abstratas de capacidade.' },
        { title: 'Fluxo de qualidade', description: 'Estações QC e áreas de inspeção apoiam revisão de amostras, burn-in checks e verificação de envio.' },
        { title: 'Preparação de envio', description: 'Fotos de embalagem e armazém ajudam compradores internacionais a entender a prontidão para exportação antes do pedido.' },
        { title: 'Conversas com clientes', description: 'Fotos de feiras e reuniões dão à página About uma camada de credibilidade mais humana e voltada ao fornecedor.' },
      ],
    },
    events: {
      eyebrow: 'Eventos e registros de parceiros',
      title: 'Fotos reais de clientes e do programa Intel',
      description: 'Essas imagens originais de eventos adicionam prova humana: exposições, conversas com clientes, demonstrações de produto e reconhecimento de canal.',
      groups: [
        {
          title: 'Exposições internacionais',
          description: 'Reuniões com clientes, demos de produto e conversas de estande da biblioteca original de imagens da página About.',
          images: [
            'Clientes visitando o estande da AIERXUAN',
            'Reunião de negócios com amostras de laptops',
            'Foto de cliente em exposição de eletrônicos',
            'Discussão de produto em mesa de feira',
          ],
        },
        {
          title: 'Reconhecimento de canal Intel',
          description: 'Fotos de eventos de parceiros conectam a AIERXUAN a programas de plataforma e canais de hardware de computação.',
          images: [
            'Display de evento Intel com marca AIERXUAN',
            'Foto da cerimônia de premiação Intel',
            'Reconhecimento no palco de conferência Intel',
            'Público e palco do summit de parceiros Intel',
          ],
        },
      ],
    },
    timeline: {
      eyebrow: 'Linha do tempo da empresa',
      title: 'Crescimento construído em torno de hardware de computação',
      description: 'Uma linha do tempo compacta dá aos compradores uma leitura rápida da maturidade e adequação de fornecedor de longo prazo.',
      items: [
        { year: brandFacts.foundedYear, copy: 'A AIERXUAN é fundada em Shenzhen e inicia operações com laptops e hardware de computação.' },
        { year: brandFacts.intelPartnerSince, copy: 'A parceria de canal Intel fortalece o acesso a plataformas.' },
        { year: '2021', copy: 'Programas de Mini PC e computação industrial se expandem.' },
        { year: '2024', copy: 'O catálogo global de exportação e os fluxos OEM amadurecem.' },
        { year: '2026', copy: 'A experiência digital é reconstruída para equipes globais de sourcing.' },
      ],
    },
    certifications: {
      eyebrow: 'Certificações e confiança',
      title: 'Prova de conformidade para due diligence de compradores',
      description: 'Cards de certificação tornam visíveis o acesso ao mercado e a gestão de qualidade antes de uma auditoria de fornecedor.',
      support: 'Suporte documental verificado para acesso a mercados internacionais.',
      cards: ['Certificação CE', 'Conformidade FCC', 'Conformidade RoHS', 'ISO 9001'],
    },
    cta: {
      title: 'Planejar uma visita à fábrica ou auditoria de fornecedor',
      description: 'Direcione compradores sérios para auditorias, amostras e planejamento de produção com uma página de credibilidade mais clara.',
    },
  },
}

const factoryHighlightIcons: LucideIcon[] = [Cpu, ShieldCheck, PackageCheck, Users]

const factoryPhotoAssets: Array<{ image: string; layout: string; position?: string }> = [
  {
    image: '/images/factory/factory-2.webp',
    layout: 'lg:col-span-3 lg:row-span-2',
    position: 'object-center',
  },
  {
    image: '/images/factory/factory-5.webp',
    layout: 'lg:col-span-3',
    position: 'object-center',
  },
  {
    image: '/images/factory/factory-6.webp',
    layout: 'lg:col-span-3',
    position: 'object-center',
  },
  {
    image: '/images/factory/factory-3.webp',
    layout: 'lg:col-span-2',
    position: 'object-center',
  },
  {
    image: '/images/factory/factory-4.webp',
    layout: 'lg:col-span-2',
    position: 'object-center',
  },
  {
    image: '/images/factory/factory-1.webp',
    layout: 'lg:col-span-2',
    position: 'object-center',
  },
]

const operationalProofAssets: Array<{ image: string; icon: LucideIcon }> = [
  { image: '/images/factory/factory-1.webp', icon: Cpu },
  { image: '/images/factory/factory-6.webp', icon: ShieldCheck },
  { image: '/images/factory/factory-4.webp', icon: Truck },
  { image: '/images/events/exhibitions-4.webp', icon: Handshake },
]

const eventGroupAssets: Array<{ icon: LucideIcon; images: string[] }> = [
  {
    icon: Presentation,
    images: [
      '/images/events/exhibitions-1.webp',
      '/images/events/exhibitions-2.webp',
      '/images/events/exhibitions-3.webp',
      '/images/events/exhibitions-4.webp',
    ],
  },
  {
    icon: Award,
    images: [
      '/images/events/intel-1.webp',
      '/images/events/intel-2.webp',
      '/images/events/intel-3.webp',
      '/images/events/intel-4.webp',
    ],
  },
]

const certificationImages = [redesignImages.ce, redesignImages.fcc, redesignImages.rohs, redesignImages.iso]

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const localizedFacts = brandFactText[lang] ?? brandFactText.en
  const t = aboutRedesignText[lang] ?? aboutRedesignText.en

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TechHero
        lang={lang}
        image={redesignImages.aboutHero}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={localizedFacts.companySummary}
        widgets={[
          {
            title: t.hero.facilityTitle,
            rows: [
              { label: t.hero.factorySystem.label, value: t.hero.factorySystem.value, status: 'live' },
              { label: t.hero.monthlyCapacity, value: brandFacts.monthlyCapacity },
              { label: t.hero.qualityControl.label, value: t.hero.qualityControl.value, status: 'ok' },
            ],
          },
          {
            title: t.hero.reachTitle,
            rows: [
              { label: t.hero.countries, value: brandFacts.countriesServed, status: 'ok' },
              { label: t.hero.clients, value: brandFacts.globalClients },
              { label: t.hero.unitsShipped, value: brandFacts.unitsShippedShort },
            ],
          },
        ]}
      />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow={t.factoryEvidence.eyebrow}
            title={t.factoryEvidence.title}
            description={t.factoryEvidence.description}
          />

          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.22fr] lg:items-start">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">{t.factoryEvidence.sideEyebrow}</div>
              <h3 className="mt-5 text-3xl font-black leading-tight text-slate-950">
                {t.factoryEvidence.sideTitle}
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {t.factoryEvidence.sideDescription}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {t.factoryHighlights.map((item, index) => {
                  const Icon = factoryHighlightIcons[index]
                  return (
                    <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <div className="mt-3 text-sm font-bold text-slate-950">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[220px]">
              {t.factoryPhotos.map((photo, index) => (
                <EvidencePhoto key={photo.title} {...photo} {...factoryPhotoAssets[index]} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ProofStrip />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t.operationalProof.eyebrow}
            title={t.operationalProof.title}
            description={t.operationalProof.description}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.operationalProof.cards.map((item, index) => {
              const asset = operationalProofAssets[index]
              const Icon = asset.icon
              return (
                <div key={item.title} className="group overflow-hidden rounded-xl border border-white/12 bg-white/[0.045] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.075]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <Image
                      src={asset.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-slate-950/70 text-cyan-200 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow={t.events.eyebrow}
            title={t.events.title}
            description={t.events.description}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {t.events.groups.map((group, index) => {
              const asset = eventGroupAssets[index]
              const Icon = asset.icon
              return (
                <div key={group.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-600 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-950">{group.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {asset.images.map((src, imageIndex) => (
                      <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={src}
                          alt={group.images[imageIndex]}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            eyebrow={t.timeline.eyebrow}
            title={t.timeline.title}
            description={t.timeline.description}
          />
          <div className="grid gap-4 md:grid-cols-5">
            {t.timeline.items.map(({ year, copy }) => (
              <div key={year} className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                <div className="text-3xl font-black text-slate-950">{year}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070b12] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t.certifications.eyebrow}
            title={t.certifications.title}
            description={t.certifications.description}
          />
          <div className="grid gap-5 md:grid-cols-4">
            {t.certifications.cards.map((title, index) => (
              <div key={title} className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.045]">
                <div className="relative aspect-[4/3]">
                  <Image src={certificationImages[index]} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.certifications.support}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechCTA
        title={t.cta.title}
        description={t.cta.description}
        href={`/${lang}/contact`}
      />
    </div>
  )
}

type EvidencePhotoProps = {
  title: string
  tag: string
  image: string
  layout: string
  position?: string
}

function EvidencePhoto({ title, tag, image, layout, position = 'object-center' }: EvidencePhotoProps) {
  return (
    <div
      className={`group relative min-h-[250px] overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.14)] lg:min-h-0 ${layout}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className={`object-cover ${position} transition-transform duration-700 group-hover:scale-105`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">{tag}</div>
        <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
      </div>
    </div>
  )
}
