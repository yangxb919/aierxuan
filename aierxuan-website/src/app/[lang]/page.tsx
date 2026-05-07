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

// ISR: 每小时重新生成
export const revalidate = 3600

const homeRedesignText = {
  en: {
    hero: {
      eyebrow: 'Intel Partner | CE/FCC Certified',
      title: 'OEM/ODM Laptop & Mini PC Manufacturing',
      subtitle: 'Custom computing hardware for global brands, delivered from Shenzhen with certified quality.',
      liveLabel: 'Live',
      production: {
        title: 'Production Status',
        line: { label: 'Line 03', value: 'Running' },
        qa: { label: 'QA Pass Rate', value: '99.8%' },
        delivery: { label: 'On-Time Delivery', value: '98%' },
        output: { label: 'Monthly Output', value: '50,000+' },
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
        { value: '10+', label: 'Years Experience' },
        { value: '500+', label: 'Global Clients' },
        { value: '50+', label: 'Countries Served' },
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
      eyebrow: 'Партнёр Intel | Сертификаты CE/FCC',
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
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = homeRedesignText[lang as 'en' | 'ru'] ?? homeRedesignText.en

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
              <a href={`/${lang}/products`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                {t.products.viewAll}
                <span>→</span>
              </a>
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
