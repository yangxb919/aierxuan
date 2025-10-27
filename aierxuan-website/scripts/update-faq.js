const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateFAQ() {
  try {
    console.log('Starting FAQ update process...')

    // Step 1: Deactivate all existing FAQs
    console.log('\n1. Deactivating existing FAQs...')
    const { error: deactivateError } = await supabase
      .from('faq')
      .update({ is_active: false })
      .eq('is_active', true)

    if (deactivateError) {
      throw new Error(`Failed to deactivate FAQs: ${deactivateError.message}`)
    }
    console.log('✓ Existing FAQs deactivated')

    // Step 2: Insert 8 new FAQ entries
    console.log('\n2. Inserting new FAQ entries...')
    const faqEntries = [
      { category: 'general', sort_order: 1, is_active: true },
      { category: 'general', sort_order: 2, is_active: true },
      { category: 'general', sort_order: 3, is_active: true },
      { category: 'general', sort_order: 4, is_active: true },
      { category: 'general', sort_order: 5, is_active: true },
      { category: 'general', sort_order: 6, is_active: true },
      { category: 'general', sort_order: 7, is_active: true },
      { category: 'general', sort_order: 8, is_active: true }
    ]

    const { data: insertedFAQs, error: insertError } = await supabase
      .from('faq')
      .insert(faqEntries)
      .select()

    if (insertError) {
      throw new Error(`Failed to insert FAQs: ${insertError.message}`)
    }
    console.log(`✓ Inserted ${insertedFAQs.length} new FAQ entries`)

    // Step 3: Prepare translations
    const translations = {
      en: [
        {
          question: 'What is an OEM Laptop/Computer Manufacturer?',
          answer: 'An OEM (Original Equipment Manufacturer) laptop or computer manufacturer is a company that designs and produces computing hardware that can be customized and branded for other businesses. Unlike retail laptops sold under major brand names, OEM manufacturers like AIERXUAN specialize in building laptops, mini PCs, and other computing devices to your exact specifications. We handle everything from component selection, assembly, quality testing, to packaging—allowing you to sell high-quality computers under your own brand without investing in manufacturing infrastructure. This is ideal for system integrators, retailers, education institutions, and businesses looking to deploy custom computing solutions at scale.'
        },
        {
          question: 'What are the advantages of choosing AIERXUAN\'s OEM services?',
          answer: 'AIERXUAN offers several key advantages for OEM partnerships: (1) Full Customization - Configure hardware specs, I/O ports, chassis design, firmware, and branding to match your exact needs. (2) Quality Assurance - All products undergo 1000+ hours of rigorous testing including stress tests, burn-in testing, and quality control protocols meeting ISO standards. (3) Competitive Pricing - Direct manufacturer pricing without middleman markups, with flexible MOQ options for different business sizes. (4) Fast Time-to-Market - Streamlined production processes and global supply chain ensure quick turnaround times. (5) Technical Support - Dedicated engineering team provides pre-sales consultation, customization support, and after-sales technical assistance. (6) Global Logistics - Multi-warehouse strategy enables efficient delivery to 50+ countries worldwide with customs support.'
        },
        {
          question: 'What is the difference between OEM and retail laptops?',
          answer: 'The key differences between OEM and retail laptops are: (1) Customization - OEM laptops offer complete customization of components, ports, firmware, and branding, while retail laptops come in fixed configurations. (2) Pricing - OEM products typically cost 20-40% less because they bypass retail markups and marketing costs. (3) Warranty & Support - Retail laptops include manufacturer warranty and support, while OEM buyers typically provide their own customer support (though we offer technical assistance to our partners). (4) Target Market - Retail laptops target individual consumers, while OEM products are designed for business deployment, system integration, or resale. (5) Volume - OEM purchases are typically bulk orders with MOQ requirements, offering economies of scale. (6) Branding - OEM allows you to build your own brand equity, while retail products promote the manufacturer\'s brand.'
        },
        {
          question: 'Mini PC vs Desktop: Which is better for business?',
          answer: 'The choice between Mini PC and desktop depends on your business needs: Mini PCs are ideal when: (1) Space is limited - Perfect for retail POS systems, kiosks, digital signage, or cramped office environments. (2) Energy efficiency matters - Mini PCs consume 50-80% less power than traditional desktops, reducing operating costs. (3) Portability is needed - Easy to move, redeploy, or mount behind monitors using VESA brackets. (4) Silent operation required - Fanless or ultra-quiet designs work well in customer-facing areas or quiet offices. Traditional desktops are better when: (1) Maximum performance needed - More space for high-end graphics cards and cooling for intensive workloads. (2) Extensive expansion required - Multiple PCIe slots, drive bays, and RAM slots. (3) Easy upgradability - Standard form factor makes component replacement simple. For most business applications like office work, point-of-sale, digital signage, education, and light industrial control, Mini PCs offer the best balance of performance, efficiency, and total cost of ownership.'
        },
        {
          question: 'What is your minimum order quantity (MOQ) and lead time?',
          answer: 'Our MOQ and lead times are flexible based on customization level: (1) Standard Configurations - MOQ as low as 50-100 units with 2-3 weeks lead time. These use our existing designs with minor customization (logo, packaging, pre-installed software). (2) Custom Configurations - MOQ typically 200-500 units with 4-6 weeks lead time. This includes custom I/O ports, specific component selection, chassis modifications, or firmware customization. (3) Fully Custom Designs - MOQ 500-1000+ units with 8-12 weeks lead time for completely new chassis designs, tooling, or major engineering work. (4) Sample Orders - We offer sample units (1-10 pieces) for evaluation before committing to bulk orders. Lead times can be expedited for urgent projects with premium service. We maintain safety stock of popular configurations to enable faster delivery. Payment terms typically require 30-50% deposit with balance due before shipment. Contact our sales team for a customized quote based on your specific requirements and timeline.'
        },
        {
          question: 'How do you ensure product quality and reliability?',
          answer: 'AIERXUAN maintains strict quality control through multiple stages: (1) Component Selection - We source premium components from tier-1 suppliers (Intel, AMD, Samsung, Kingston) with proven reliability records. (2) Design Validation - Every product design undergoes thermal simulation, EMI testing, and structural analysis before production. (3) Manufacturing Process - ISO 9001 certified production facility with automated assembly lines, ESD protection, and clean room environment. (4) Quality Testing - 100% of products undergo: Power-on testing, Memory stress testing, Storage burn-in (8+ hours), Thermal testing under load, I/O port functionality checks, Operating system installation verification. (5) Reliability Testing - Sample units from each batch undergo extended testing: 1000+ hours continuous operation, Temperature cycling (-10°C to 60°C), Vibration and shock testing, Long-term stability monitoring. (6) Certifications - Products meet CE, FCC, RoHS, and optional certifications like medical (IEC 60601), industrial (IEC 61010), or education standards. (7) Warranty - Standard 1-year warranty with optional extended coverage. Failed unit rate typically under 0.5% thanks to our rigorous quality processes.'
        },
        {
          question: 'Can you customize the laptop/PC with our brand logo and packaging?',
          answer: 'Yes, we offer comprehensive branding and packaging customization: (1) Chassis Branding - Laser engraving or UV printing of your logo on laptop lid, palm rest, or mini PC top panel. Multiple color options and finishes (matte, glossy, metallic) available. (2) Startup Customization - Custom BIOS splash screen with your logo, Custom Windows/Linux boot logo, Pre-configured desktop wallpaper and settings. (3) Firmware/Software - BIOS customization with your branding, Pre-installed software and applications, Custom recovery partition with your support tools, Locked BIOS settings for enterprise deployment. (4) Packaging - Fully custom box design with your branding and color scheme, Retail-ready packaging with product photos and specifications, Protective foam inserts and accessories, User manual and documentation with your branding, Custom warranty cards and support information. (5) Accessories - Branded power adapters, carrying cases, and cables, Custom keyboard layouts or keycaps if needed. (6) MOQ for Customization - Logo engraving: 100+ units, Custom packaging: 200+ units, Full tooling for chassis: 500+ units. Setup costs vary based on complexity—contact us for detailed quotation and mockups.'
        },
        {
          question: 'What industries do you serve and what are typical use cases?',
          answer: 'AIERXUAN serves diverse industries with specialized computing solutions: (1) Education - Computer labs with centralized management, Student laptops with durability and long battery life, STEM education workstations for programming/robotics, Digital classrooms and interactive displays. (2) Industrial Manufacturing - Factory floor PCs with rugged construction, Industrial control systems and HMI terminals, Quality inspection workstations, Warehouse management and inventory systems, Fanless PCs for dusty/harsh environments. (3) Healthcare - Medical-grade PCs meeting IEC 60601 certification, PACS workstations for medical imaging, Electronic health record (EHR) terminals, Pharmacy and lab equipment control, Antimicrobial chassis options for infection control. (4) Retail & Hospitality - Point-of-sale (POS) systems, Self-service kiosks and check-in terminals, Digital signage and menu boards, Back-office inventory management, Hotel room control and guest services. (5) Corporate/SMB - Office productivity workstations, Conference room PCs and collaboration tools, Thin clients for VDI/virtual desktop infrastructure, IT labs and development workstations. (6) System Integrators - Embedded computing for custom solutions, OEM platforms for software vendors, White-label products for resellers. Each industry has unique requirements (certifications, I/O ports, form factors, environmental ratings) that we can accommodate through our customization services.'
        }
      ],
      'zh-CN': [
        {
          question: '什么是OEM笔记本/计算机制造商？',
          answer: 'OEM（原始设备制造商）笔记本或计算机制造商是指设计和生产可为其他企业定制和品牌化的计算硬件的公司。与以主要品牌名义销售的零售笔记本不同，像AIERXUAN这样的OEM制造商专注于根据您的确切规格构建笔记本、迷你PC和其他计算设备。我们处理从组件选择、组装、质量测试到包装的所有事务——让您能够在自己的品牌下销售高质量计算机，而无需投资制造基础设施。这非常适合系统集成商、零售商、教育机构和希望大规模部署定制计算解决方案的企业。'
        },
        {
          question: '选择AIERXUAN的OEM服务有哪些优势？',
          answer: 'AIERXUAN为OEM合作伙伴提供几个关键优势：（1）完全定制 - 配置硬件规格、I/O端口、机箱设计、固件和品牌，以满足您的确切需求。（2）质量保证 - 所有产品经过1000多小时的严格测试，包括压力测试、老化测试和符合ISO标准的质量控制协议。（3）有竞争力的价格 - 直接制造商定价，没有中间商加价，为不同规模的企业提供灵活的MOQ选项。（4）快速上市 - 简化的生产流程和全球供应链确保快速交付时间。（5）技术支持 - 专门的工程团队提供售前咨询、定制支持和售后技术援助。（6）全球物流 - 多仓库战略实现向全球50多个国家高效交付，并提供海关支持。'
        },
        {
          question: 'OEM笔记本和零售笔记本有什么区别？',
          answer: 'OEM笔记本和零售笔记本的主要区别在于：（1）定制化 - OEM笔记本提供组件、端口、固件和品牌的完全定制，而零售笔记本采用固定配置。（2）价格 - OEM产品通常便宜20-40%，因为它们绕过了零售加价和营销成本。（3）保修和支持 - 零售笔记本包含制造商保修和支持，而OEM买家通常提供自己的客户支持（尽管我们为合作伙伴提供技术援助）。（4）目标市场 - 零售笔记本面向个人消费者，而OEM产品是为企业部署、系统集成或转售而设计的。（5）数量 - OEM采购通常是有MOQ要求的批量订单，提供规模经济。（6）品牌 - OEM允许您建立自己的品牌资产，而零售产品推广制造商的品牌。'
        },
        {
          question: '迷你电脑与台式机：哪个更适合企业使用？',
          answer: '迷你电脑和台式机之间的选择取决于您的业务需求：迷你电脑适用于：（1）空间有限 - 非常适合零售POS系统、自助服务终端、数字标牌或狭小的办公环境。（2）能效很重要 - 迷你电脑的功耗比传统台式机少50-80%，降低运营成本。（3）需要便携性 - 易于移动、重新部署或使用VESA支架安装在显示器后面。（4）需要安静运行 - 无风扇或超静音设计适用于面向客户的区域或安静的办公室。传统台式机更适合：（1）需要最大性能 - 更多空间用于高端显卡和冷却，以处理密集型工作负载。（2）需要广泛扩展 - 多个PCIe插槽、驱动器托架和RAM插槽。（3）易于升级 - 标准外形使组件更换变得简单。对于大多数业务应用，如办公工作、销售点、数字标牌、教育和轻工业控制，迷你电脑提供了性能、效率和总拥有成本的最佳平衡。'
        },
        {
          question: '你们的最小起订量（MOQ）和交货时间是多少？',
          answer: '我们的MOQ和交货时间根据定制级别灵活调整：（1）标准配置 - MOQ低至50-100台，交货时间为2-3周。这些使用我们现有的设计，进行少量定制（标志、包装、预装软件）。（2）定制配置 - MOQ通常为200-500台，交货时间为4-6周。这包括定制I/O端口、特定组件选择、机箱修改或固件定制。（3）完全定制设计 - MOQ为500-1000+台，全新机箱设计、工装或重大工程工作的交货时间为8-12周。（4）样品订单 - 我们提供样品单元（1-10件）供您在承诺批量订单之前进行评估。对于紧急项目，可以通过优质服务加快交货时间。我们维护流行配置的安全库存，以实现更快的交付。付款条件通常要求30-50%的定金，余额在发货前支付。请联系我们的销售团队，根据您的具体要求和时间表获取定制报价。'
        },
        {
          question: '你们如何确保产品质量和可靠性？',
          answer: 'AIERXUAN通过多个阶段保持严格的质量控制：（1）组件选择 - 我们从一级供应商（Intel、AMD、Samsung、Kingston）采购具有可靠记录的优质组件。（2）设计验证 - 每个产品设计在生产前都要经过热模拟、EMI测试和结构分析。（3）制造流程 - ISO 9001认证的生产设施，配备自动化装配线、ESD保护和洁净室环境。（4）质量测试 - 100%的产品经过：上电测试、内存压力测试、存储老化（8小时以上）、负载下的热测试、I/O端口功能检查、操作系统安装验证。（5）可靠性测试 - 每批次的样品单元经过扩展测试：1000多小时连续运行、温度循环（-10°C至60°C）、振动和冲击测试、长期稳定性监测。（6）认证 - 产品符合CE、FCC、RoHS标准，以及可选的医疗（IEC 60601）、工业（IEC 61010）或教育标准认证。（7）保修 - 标准1年保修，可选择延长保修。由于我们严格的质量流程，故障单元率通常低于0.5%。'
        },
        {
          question: '你们能否用我们的品牌标志和包装定制笔记本/电脑？',
          answer: '是的，我们提供全面的品牌和包装定制：（1）机箱品牌 - 在笔记本盖、掌托或迷你电脑顶板上激光雕刻或UV打印您的标志。提供多种颜色选项和饰面（哑光、光泽、金属）。（2）启动定制 - 带有您标志的自定义BIOS启动画面、自定义Windows/Linux启动标志、预配置的桌面壁纸和设置。（3）固件/软件 - 带有您品牌的BIOS定制、预装软件和应用程序、带有您支持工具的自定义恢复分区、用于企业部署的锁定BIOS设置。（4）包装 - 完全定制的盒子设计，带有您的品牌和配色方案、零售就绪的包装，带有产品照片和规格、保护性泡沫插件和配件、带有您品牌的用户手册和文档、定制保修卡和支持信息。（5）配件 - 品牌电源适配器、手提箱和电缆、如果需要，定制键盘布局或键帽。（6）定制MOQ - 标志雕刻：100+台、定制包装：200+台、机箱全套工装：500+台。安装费用因复杂程度而异——请联系我们获取详细报价和样机。'
        },
        {
          question: '你们服务哪些行业，典型的使用场景是什么？',
          answer: 'AIERXUAN为各行各业提供专业化的计算解决方案：（1）教育 - 集中管理的计算机实验室、耐用且电池寿命长的学生笔记本、用于编程/机器人的STEM教育工作站、数字教室和互动显示器。（2）工业制造 - 结构坚固的工厂车间PC、工业控制系统和HMI终端、质量检查工作站、仓库管理和库存系统、适用于多尘/恶劣环境的无风扇PC。（3）医疗保健 - 符合IEC 60601认证的医疗级PC、用于医学影像的PACS工作站、电子健康记录（EHR）终端、药房和实验室设备控制、用于感染控制的抗菌机箱选项。（4）零售和酒店 - 销售点（POS）系统、自助服务终端和登机终端、数字标牌和菜单板、后台库存管理、酒店客房控制和客人服务。（5）企业/中小企业 - 办公生产力工作站、会议室PC和协作工具、用于VDI/虚拟桌面基础设施的瘦客户端、IT实验室和开发工作站。（6）系统集成商 - 用于定制解决方案的嵌入式计算、软件供应商的OEM平台、经销商的白标产品。每个行业都有独特的要求（认证、I/O端口、外形、环境等级），我们可以通过定制服务满足这些要求。'
        }
      ],
      ru: [
        {
          question: 'Что такое OEM производитель ноутбуков/компьютеров?',
          answer: 'OEM (Original Equipment Manufacturer) производитель ноутбуков или компьютеров - это компания, которая проектирует и производит компьютерное оборудование, которое может быть настроено и брендировано для других компаний. В отличие от розничных ноутбуков, продаваемых под основными брендами, OEM производители, такие как AIERXUAN, специализируются на создании ноутбуков, мини-ПК и других вычислительных устройств по вашим точным спецификациям. Мы занимаемся всем - от выбора компонентов, сборки, тестирования качества до упаковки - позволяя вам продавать высококачественные компьютеры под вашим собственным брендом без инвестиций в производственную инфраструктуру. Это идеально подходит для системных интеграторов, розничных продавцов, образовательных учреждений и предприятий, желающих развернуть индивидуальные вычислительные решения в масштабе.'
        },
        {
          question: 'Каковы преимущества выбора OEM-услуг AIERXUAN?',
          answer: 'AIERXUAN предлагает несколько ключевых преимуществ для OEM-партнерства: (1) Полная настройка - Настройте спецификации оборудования, порты I/O, дизайн корпуса, прошивку и брендинг в соответствии с вашими точными потребностями. (2) Обеспечение качества - Все продукты проходят более 1000 часов строгого тестирования, включая стресс-тесты, тестирование на надежность и протоколы контроля качества, соответствующие стандартам ISO. (3) Конкурентоспособные цены - Прямые цены производителя без наценок посредников, с гибкими вариантами MOQ для предприятий разного размера. (4) Быстрый выход на рынок - Оптимизированные производственные процессы и глобальная цепочка поставок обеспечивают быстрые сроки поставки. (5) Техническая поддержка - Выделенная инженерная команда обеспечивает предпродажные консультации, поддержку настройки и послепродажную техническую помощь. (6) Глобальная логистика - Многоскладская стратегия обеспечивает эффективную доставку в 50+ стран по всему миру с таможенной поддержкой.'
        },
        {
          question: 'В чем разница между OEM и розничными ноутбуками?',
          answer: 'Основные различия между OEM и розничными ноутбуками: (1) Настройка - OEM ноутбуки предлагают полную настройку компонентов, портов, прошивки и брендинга, в то время как розничные ноутбуки поставляются в фиксированных конфигурациях. (2) Ценообразование - OEM продукты обычно стоят на 20-40% дешевле, потому что они обходят розничные наценки и маркетинговые расходы. (3) Гарантия и поддержка - Розничные ноутбуки включают гарантию производителя и поддержку, в то время как покупатели OEM обычно предоставляют собственную поддержку клиентов (хотя мы предлагаем техническую помощь нашим партнерам). (4) Целевой рынок - Розничные ноутбуки ориентированы на индивидуальных потребителей, в то время как OEM продукты разработаны для корпоративного развертывания, системной интеграции или перепродажи. (5) Объем - Покупки OEM обычно представляют собой оптовые заказы с требованиями MOQ, предлагая экономию масштаба. (6) Брендинг - OEM позволяет вам создавать собственный капитал бренда, в то время как розничные продукты продвигают бренд производителя.'
        },
        {
          question: 'Мини-ПК против настольного компьютера: что лучше для бизнеса?',
          answer: 'Выбор между мини-ПК и настольным компьютером зависит от ваших бизнес-потребностей: Мини-ПК идеальны, когда: (1) Пространство ограничено - Идеально подходит для розничных POS-систем, киосков, цифровых вывесок или тесных офисных помещений. (2) Важна энергоэффективность - Мини-ПК потребляют на 50-80% меньше энергии, чем традиционные настольные компьютеры, снижая эксплуатационные расходы. (3) Требуется портативность - Легко перемещать, повторно развертывать или монтировать за мониторами с использованием кронштейнов VESA. (4) Требуется бесшумная работа - Безвентиляторные или ультратихие конструкции хорошо работают в зонах для клиентов или тихих офисах. Традиционные настольные компьютеры лучше, когда: (1) Требуется максимальная производительность - Больше места для высококлассных видеокарт и охлаждения для интенсивных рабочих нагрузок. (2) Требуется обширное расширение - Несколько слотов PCIe, отсеков для дисков и слотов RAM. (3) Легкая модернизация - Стандартный форм-фактор упрощает замену компонентов. Для большинства бизнес-приложений, таких как офисная работа, точки продаж, цифровые вывески, образование и легкое промышленное управление, мини-ПК предлагают лучший баланс производительности, эффективности и общей стоимости владения.'
        },
        {
          question: 'Каков ваш минимальный объем заказа (MOQ) и срок поставки?',
          answer: 'Наш MOQ и сроки поставки гибкие в зависимости от уровня настройки: (1) Стандартные конфигурации - MOQ всего 50-100 единиц со сроком поставки 2-3 недели. Они используют наши существующие конструкции с незначительной настройкой (логотип, упаковка, предустановленное программное обеспечение). (2) Пользовательские конфигурации - MOQ обычно 200-500 единиц со сроком поставки 4-6 недель. Это включает пользовательские порты I/O, выбор конкретных компонентов, модификации корпуса или настройку прошивки. (3) Полностью пользовательские конструкции - MOQ 500-1000+ единиц со сроком поставки 8-12 недель для совершенно новых конструкций корпуса, оснастки или крупных инженерных работ. (4) Образцы заказов - Мы предлагаем образцы (1-10 штук) для оценки перед тем, как совершить оптовые заказы. Сроки поставки могут быть ускорены для срочных проектов с премиальным обслуживанием. Мы поддерживаем запасы популярных конфигураций для более быстрой доставки. Условия оплаты обычно требуют 30-50% депозита с оплатой остатка до отгрузки. Свяжитесь с нашей командой продаж для индивидуального предложения на основе ваших конкретных требований и сроков.'
        },
        {
          question: 'Как вы обеспечиваете качество и надежность продукции?',
          answer: 'AIERXUAN поддерживает строгий контроль качества через несколько этапов: (1) Выбор компонентов - Мы закупаем премиальные компоненты у поставщиков первого уровня (Intel, AMD, Samsung, Kingston) с проверенными показателями надежности. (2) Проверка дизайна - Каждый дизайн продукта проходит тепловое моделирование, тестирование EMI и структурный анализ перед производством. (3) Производственный процесс - Производственное предприятие, сертифицированное по ISO 9001, с автоматизированными сборочными линиями, защитой от ESD и чистой комнатой. (4) Тестирование качества - 100% продуктов проходят: Тестирование включения, Стресс-тестирование памяти, Обкатка хранилища (8+ часов), Тепловое тестирование под нагрузкой, Проверка функциональности портов I/O, Проверка установки операционной системы. (5) Тестирование надежности - Образцы из каждой партии проходят расширенное тестирование: 1000+ часов непрерывной работы, Температурные циклы (-10°C до 60°C), Тестирование вибрации и удара, Долгосрочный мониторинг стабильности. (6) Сертификации - Продукты соответствуют CE, FCC, RoHS и дополнительным сертификациям, таким как медицинские (IEC 60601), промышленные (IEC 61010) или образовательные стандарты. (7) Гарантия - Стандартная 1-летняя гарантия с опционным расширенным покрытием. Доля отказавших устройств обычно составляет менее 0,5% благодаря нашим строгим процессам качества.'
        },
        {
          question: 'Можете ли вы настроить ноутбук/ПК с нашим логотипом бренда и упаковкой?',
          answer: 'Да, мы предлагаем комплексную настройку брендинга и упаковки: (1) Брендинг корпуса - Лазерная гравировка или УФ-печать вашего логотипа на крышке ноутбука, подставке для рук или верхней панели мини-ПК. Доступны несколько вариантов цветов и отделки (матовая, глянцевая, металлическая). (2) Настройка запуска - Пользовательский экран загрузки BIOS с вашим логотипом, Пользовательский логотип загрузки Windows/Linux, Предварительно настроенные обои рабочего стола и настройки. (3) Прошивка/Программное обеспечение - Настройка BIOS с вашим брендингом, Предустановленное программное обеспечение и приложения, Пользовательский раздел восстановления с вашими инструментами поддержки, Заблокированные настройки BIOS для корпоративного развертывания. (4) Упаковка - Полностью пользовательский дизайн коробки с вашим брендингом и цветовой схемой, Готовая к розничной продаже упаковка с фотографиями продукта и спецификациями, Защитные пенопластовые вставки и аксессуары, Руководство пользователя и документация с вашим брендингом, Пользовательские гарантийные карты и информация о поддержке. (5) Аксессуары - Брендированные адаптеры питания, футляры и кабели, Пользовательские раскладки клавиатуры или колпачки клавиш при необходимости. (6) MOQ для настройки - Гравировка логотипа: 100+ единиц, Пользовательская упаковка: 200+ единиц, Полная оснастка для корпуса: 500+ единиц. Стоимость настройки варьируется в зависимости от сложности - свяжитесь с нами для получения подробного предложения и макетов.'
        },
        {
          question: 'Какие отрасли вы обслуживаете и каковы типичные случаи использования?',
          answer: 'AIERXUAN обслуживает различные отрасли со специализированными вычислительными решениями: (1) Образование - Компьютерные классы с централизованным управлением, Студенческие ноутбуки с прочностью и длительным временем автономной работы, Рабочие станции STEM для программирования/робототехники, Цифровые классы и интерактивные дисплеи. (2) Промышленное производство - ПК для заводского цеха с прочной конструкцией, Промышленные системы управления и терминалы HMI, Рабочие станции контроля качества, Системы управления складом и запасами, Безвентиляторные ПК для пыльных/суровых сред. (3) Здравоохранение - ПК медицинского класса, соответствующие сертификации IEC 60601, Рабочие станции PACS для медицинской визуализации, Терминалы электронных медицинских записей (EHR), Управление аптечным и лабораторным оборудованием, Варианты антимикробного корпуса для контроля инфекций. (4) Розничная торговля и гостеприимство - Системы точек продаж (POS), Киоски самообслуживания и регистрационные терминалы, Цифровые вывески и меню-доски, Офисное управление запасами, Управление номерами отеля и услуги для гостей. (5) Корпоративный/МСП - Рабочие станции для офисной производительности, ПК для конференц-залов и инструменты совместной работы, Тонкие клиенты для VDI/виртуальной инфраструктуры рабочих столов, ИТ-лаборатории и рабочие станции разработки. (6) Системные интеграторы - Встраиваемые вычисления для индивидуальных решений, OEM-платформы для поставщиков программного обеспечения, Продукты белой марки для реселлеров. Каждая отрасль имеет уникальные требования (сертификации, порты I/O, форм-факторы, экологические рейтинги), которые мы можем удовлетворить с помощью наших услуг по настройке.'
        }
      ]
    }

    // Step 4-6: Insert translations for each language
    console.log('\n3. Inserting translations...')
    for (const [locale, contents] of Object.entries(translations)) {
      const translationData = insertedFAQs.map((faq, index) => ({
        faq_id: faq.id,
        locale: locale,
        question: contents[index].question,
        answer: contents[index].answer
      }))

      const { error: translationError } = await supabase
        .from('faq_translations')
        .insert(translationData)

      if (translationError) {
        throw new Error(`Failed to insert ${locale} translations: ${translationError.message}`)
      }
      console.log(`✓ Inserted ${locale} translations (${translationData.length} entries)`)
    }

    console.log('\n✅ FAQ update completed successfully!')
    console.log(`\nSummary:`)
    console.log(`- Deactivated old FAQs`)
    console.log(`- Inserted 8 new FAQ entries`)
    console.log(`- Added ${Object.keys(translations).length} language translations (${Object.keys(translations).join(', ')})`)

  } catch (error) {
    console.error('\n❌ Error updating FAQs:', error.message)
    console.error(error)
    process.exit(1)
  }
}

// Run the update
updateFAQ()
