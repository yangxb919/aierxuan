-- Replace existing FAQ with SEO-optimized content
-- Based on DataForSEO keyword research and customer pain point analysis
-- Created: 2025-10-26

-- Step 1: Deactivate all existing FAQ entries
UPDATE faq SET is_active = false WHERE is_active = true;

-- Step 2: Insert 8 new FAQ entries with proper sort order
INSERT INTO faq (category, sort_order, is_active) VALUES
('general', 1, true),
('general', 2, true),
('general', 3, true),
('general', 4, true),
('general', 5, true),
('general', 6, true),
('general', 7, true),
('general', 8, true);

-- Step 3: Insert English translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT
  f.id,
  'en',
  CASE f.sort_order
    WHEN 1 THEN 'What is an OEM Laptop/Computer Manufacturer?'
    WHEN 2 THEN 'What are the advantages of choosing AIERXUAN''s OEM services?'
    WHEN 3 THEN 'What is the difference between OEM and retail laptops?'
    WHEN 4 THEN 'Mini PC vs Desktop: Which is better for business?'
    WHEN 5 THEN 'What is your minimum order quantity (MOQ) and lead time?'
    WHEN 6 THEN 'How do you ensure product quality and reliability?'
    WHEN 7 THEN 'Can you customize the laptop/PC with our brand logo and packaging?'
    WHEN 8 THEN 'What industries do you serve and what are typical use cases?'
  END,
  CASE f.sort_order
    WHEN 1 THEN E'An OEM (Original Equipment Manufacturer) produces computing hardware that other companies rebrand and sell under their own names. AIERXUAN is a leading OEM/ODM manufacturer specializing in business laptops, gaming laptops, and mini PCs for global partners.\n\nUnlike retail brands, we offer:\n• Full customization of hardware specifications\n• Custom branding (logo, packaging, firmware)\n• Competitive wholesale pricing with flexible MOQ\n• Direct factory quality control and testing\n\nOur OEM services are ideal for distributors, system integrators, educational institutions, and enterprises looking to launch their own branded computing products.'
    WHEN 2 THEN E'AIERXUAN offers distinct advantages for businesses:\n\n**Enterprise-Grade Quality**\n• 1000+ hours of rigorous testing per product\n• Premium Intel/AMD processors with advanced cooling\n• ISO-certified manufacturing processes\n\n**Full Customization Capability**\n• 100% customizable I/O configurations\n• Custom firmware and BIOS options\n• Your brand logo on chassis and packaging\n\n**Competitive Pricing & Fast Delivery**\n• Direct factory pricing without middlemen\n• Flexible MOQ starting from 100 units\n• Multiple warehouses in 50+ countries\n• 15-30 day production lead time\n\n**Comprehensive Support**\n• 24/7 technical support\n• 3-year warranty options\n• After-sales service in your region'
    WHEN 3 THEN E'**OEM Laptops (AIERXUAN):**\n✅ Customizable hardware specifications\n✅ Your brand name and logo\n✅ Bulk pricing (30-50% lower than retail)\n✅ Flexible warranty terms\n✅ Direct factory support\n✅ Minimum order quantities apply\n\n**Retail Laptops (Dell, HP, Lenovo):**\n❌ Fixed configurations\n❌ Manufacturer''s branding only\n❌ Higher per-unit costs\n❌ Standard warranty only\n❌ Retail channel support\n❌ Single unit purchase available\n\n**Best For:**\n• OEM: Businesses, resellers, system integrators, educational institutions\n• Retail: Individual consumers, small businesses with limited quantities'
    WHEN 4 THEN E'Mini PCs are increasingly preferred for business environments:\n\n**Mini PC Advantages:**\n• Space Efficient: 90% smaller than traditional desktops\n• Energy Savings: 50-70% lower power consumption\n• Silent Operation: Fanless designs available\n• Easy Deployment: VESA mount behind monitors\n• Lower Total Cost: Reduced electricity and cooling costs\n\n**Best Mini PC Applications:**\n• Digital signage and kiosks\n• Point-of-sale (POS) systems\n• Industrial automation and control\n• Educational computer labs\n• Remote work setups\n\n**AIERXUAN Mini PC Specs:**\n• Intel Core i5/i7/i9 or AMD Ryzen\n• Up to 64GB RAM\n• Multiple display outputs (HDMI, DisplayPort)\n• Fanless or ultra-quiet cooling\n• 24/7 operation capable'
    WHEN 5 THEN E'**Flexible MOQ for Different Business Needs:**\n\n**Standard Products:**\n• MOQ: 100 units per model\n• Lead Time: 15-20 business days\n• Quick sampling: 1-5 units within 7 days\n\n**Custom Configuration:**\n• MOQ: 200 units per custom SKU\n• Lead Time: 25-30 business days\n• Includes: Custom I/O, branding, firmware\n\n**Full ODM Development:**\n• MOQ: 500 units\n• Lead Time: 45-60 days (prototype + production)\n• Includes: Mold design, custom chassis\n\n**Volume Discounts:**\n• 500+ units: 5-8% discount\n• 1000+ units: 10-15% discount\n• 5000+ units: Custom negotiation\n\n**Fast Track Options:**\n• Express production: +15% fee for 50% faster delivery'
    WHEN 6 THEN E'**AIERXUAN''s Comprehensive Quality Assurance:**\n\n**Component Selection**\n• Only Tier-1 suppliers (Intel, AMD, Samsung, Micron)\n• 100% authentic components with traceability\n\n**Manufacturing Standards**\n• ISO 9001:2015 certified facility\n• ESD-protected workstations\n• Automated testing equipment\n\n**Testing Protocol (1000+ Hours)**\n• Burn-in Testing: 48-72 hours at full load\n• Stress Testing: CPU, GPU, memory, storage\n• Temperature Testing: -10°C to 70°C operation\n• Drop & Vibration Testing\n• Quality Sampling: 5% of each batch\n\n**Certifications**\n• CE, FCC, RoHS compliance\n• Energy Star certified models\n\n**Warranty & Support**\n• Standard: 1-year warranty\n• Extended: Up to 3-year options\n• On-site support in major markets\n\n**Metrics:**\n• Failure Rate: <0.3% DOA\n• Customer Satisfaction: 96%'
    WHEN 7 THEN E'**Yes! Full Branding & Customization Services:**\n\n**Logo Placement Options:**\n• Chassis/lid engraving or printing\n• Keyboard area branding\n• BIOS splash screen customization\n• Boot logo and firmware branding\n\n**Packaging Customization:**\n• Custom box design with your branding\n• User manual with your company info\n• Branded accessories (cables, adapters)\n• Anti-counterfeiting labels available\n\n**Software/Firmware:**\n• Pre-installed OS (Windows 10/11 Pro, Linux)\n• Custom software bundles\n• Pre-configured BIOS settings\n• Your recovery partition\n\n**Additional Customization:**\n• Color options for chassis\n• Custom I/O port configurations\n• Storage and memory upgrades\n• Battery capacity options\n\n**Timeline:** 7-14 days for branding preparation + standard lead time'
    WHEN 8 THEN E'**AIERXUAN serves diverse industries:**\n\n**1. Education (K-12, Universities)**\n• Solutions: Business laptops with EDU pricing\n• Volume: 500-5000 units per deployment\n• Use Cases: Computer labs, student devices\n\n**2. Healthcare (Hospitals, Clinics)**\n• Solutions: Fanless mini PCs, medical cart computers\n• Certifications: FDA, CE Medical, HIPAA-compliant\n• Use Cases: Patient terminals, medical imaging\n\n**3. Industrial Manufacturing**\n• Solutions: Industrial mini PCs with IP65 rating\n• Features: -10°C to 70°C operation, fanless cooling\n• Use Cases: Factory automation, quality control\n\n**4. Retail & Hospitality**\n• Solutions: Compact POS systems, 24/7 operation\n• Features: Multiple serial ports, touchscreen support\n• Use Cases: Point-of-sale, digital signage\n\n**5. Government & Enterprise**\n• Solutions: Business laptops with TPM 2.0\n• Features: Remote management (Intel vPro)\n• Use Cases: Office workstations, remote work\n\n**6. System Integrators & VARs**\n• Solutions: Wide product range, white-label options\n• Support: Technical pre-sales, local after-sales'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft
    WHERE ft.faq_id = f.id AND ft.locale = 'en'
  );

-- Step 4: Insert Chinese (Simplified) translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT
  f.id,
  'zh-CN',
  CASE f.sort_order
    WHEN 1 THEN '什么是OEM笔记本/计算机制造商?'
    WHEN 2 THEN '选择艾尔轩OEM服务有什么优势?'
    WHEN 3 THEN 'OEM笔记本和零售笔记本有什么区别?'
    WHEN 4 THEN '迷你主机和台式机:哪个更适合商业使用?'
    WHEN 5 THEN '你们的最小起订量(MOQ)和交付周期是多少?'
    WHEN 6 THEN '你们如何确保产品质量和可靠性?'
    WHEN 7 THEN '你们能定制我们品牌的Logo和包装吗?'
    WHEN 8 THEN '你们服务哪些行业,典型应用场景有哪些?'
  END,
  CASE f.sort_order
    WHEN 1 THEN E'OEM(原始设备制造商)生产计算机硬件,供其他公司贴牌销售。艾尔轩是领先的OEM/ODM制造商,专注于为全球合作伙伴提供商务笔记本、游戏笔记本和迷你主机。\n\n与零售品牌不同,我们提供:\n• 硬件规格的完全定制\n• 自定义品牌(Logo、包装、固件)\n• 具有竞争力的批发价格和灵活的MOQ\n• 工厂直接质量控制和测试\n\n我们的OEM服务非常适合分销商、系统集成商、教育机构和希望推出自有品牌计算机产品的企业。'
    WHEN 2 THEN E'艾尔轩为企业提供独特优势:\n\n**企业级质量**\n• 每款产品经过1000+小时严格测试\n• 采用顶级Intel/AMD处理器与先进散热\n• ISO认证制造流程\n\n**100%定制能力**\n• 可定制I/O接口配置\n• 定制固件和BIOS选项\n• 机箱和包装印制您的品牌Logo\n\n**具有竞争力的价格与快速交付**\n• 工厂直销,无中间商加价\n• 灵活MOQ,100台起订\n• 在50+国家设有多仓储中心\n• 15-30天生产周期\n\n**全面支持**\n• 24/7技术支持\n• 3年保修选项\n• 本地化售后服务'
    WHEN 3 THEN E'**OEM笔记本(艾尔轩):**\n✅ 可定制硬件规格\n✅ 您的品牌名称和Logo\n✅ 批量价格(比零售低30-50%)\n✅ 灵活的保修条款\n✅ 工厂直接支持\n✅ 需满足最小起订量\n\n**零售笔记本(戴尔、惠普、联想):**\n❌ 固定配置\n❌ 仅制造商品牌\n❌ 单价更高\n❌ 仅标准保修\n❌ 零售渠道支持\n❌ 可单台购买\n\n**最适合:**\n• OEM: 企业、经销商、系统集成商、教育机构\n• 零售: 个人消费者、小批量小型企业'
    WHEN 4 THEN E'迷你主机在商业环境中越来越受欢迎:\n\n**迷你主机优势:**\n• 节省空间: 比传统台式机小90%\n• 节能: 功耗降低50-70%\n• 静音运行: 提供无风扇设计\n• 易于部署: 可VESA挂载在显示器后\n• 更低总成本: 减少电费和冷却成本\n\n**迷你主机最佳应用场景:**\n• 数字标牌和自助终端\n• POS收银系统\n• 工业自动化和控制\n• 教育计算机实验室\n• 远程办公设置\n\n**艾尔轩迷你主机规格:**\n• Intel Core i5/i7/i9或AMD Ryzen\n• 最高64GB内存\n• 多显示输出(HDMI、DisplayPort)\n• 无风扇或超静音冷却\n• 支持24/7运行'
    WHEN 5 THEN E'**灵活的MOQ满足不同业务需求:**\n\n**标准产品:**\n• MOQ: 每款100台\n• 交付周期: 15-20个工作日\n• 快速样品: 1-5台可在7天内提供\n\n**定制配置:**\n• MOQ: 每个定制SKU 200台\n• 交付周期: 25-30个工作日\n• 包括: 定制I/O、品牌、固件\n\n**全ODM开发:**\n• MOQ: 500台\n• 交付周期: 45-60天(原型+生产)\n• 包括: 模具设计、定制机箱\n\n**批量折扣:**\n• 500+台: 5-8%折扣\n• 1000+台: 10-15%折扣\n• 5000+台: 定制协商\n\n**快速通道选项:**\n• 加急生产: 支付15%费用可缩短50%交付时间'
    WHEN 6 THEN E'**艾尔轩全面的质量保证体系:**\n\n**元器件选择**\n• 仅选用一线供应商(Intel、AMD、三星、镁光)\n• 100%正品元器件,可追溯\n\n**制造标准**\n• ISO 9001:2015认证工厂\n• 防静电工作站\n• 自动化测试设备\n\n**测试协议(1000+小时)**\n• 老化测试: 满载48-72小时\n• 压力测试: CPU、GPU、内存、存储\n• 温度测试: -10°C至70°C运行\n• 跌落与振动测试\n• 质量抽检: 每批次随机抽检5%\n\n**认证**\n• CE、FCC、RoHS合规\n• 部分型号Energy Star认证\n\n**保修与支持**\n• 标准: 1年保修\n• 延保: 最高3年选项\n• 主要市场提供上门支持\n\n**指标:**\n• DOA故障率: <0.3%\n• 客户满意度: 96%'
    WHEN 7 THEN E'**可以!全面的品牌与定制服务:**\n\n**Logo放置选项:**\n• 机箱/顶盖雕刻或印刷\n• 键盘区域品牌\n• BIOS启动画面定制\n• 启动Logo和固件品牌\n\n**包装定制:**\n• 带有您品牌的定制包装盒设计\n• 印有您公司信息的用户手册\n• 品牌配件(线缆、适配器)\n• 可提供防伪标签\n\n**软件/固件:**\n• 预装操作系统(Windows 10/11专业版、Linux)\n• 定制软件包\n• 预配置BIOS设置\n• 您的恢复分区\n\n**其他定制:**\n• 机箱颜色选项\n• 定制I/O端口配置\n• 存储和内存升级\n• 电池容量选项\n\n**时间周期:** 品牌设计准备7-14天 + 标准交付周期'
    WHEN 8 THEN E'**艾尔轩为多个行业提供专业解决方案:**\n\n**1. 教育(K-12、大学)**\n• 解决方案: 教育折扣商务笔记本\n• 批量: 每次部署500-5000台\n• 应用场景: 计算机实验室、学生设备\n\n**2. 医疗保健(医院、诊所)**\n• 解决方案: 无风扇迷你主机、医疗推车电脑\n• 认证: FDA、CE医疗、HIPAA合规\n• 应用场景: 患者数据终端、医学影像\n\n**3. 工业制造**\n• 解决方案: IP65级工业迷你主机\n• 特点: -10°C至70°C运行、无风扇冷却\n• 应用场景: 工厂自动化、质量控制\n\n**4. 零售与酒店**\n• 解决方案: 紧凑型POS系统、24/7运行\n• 特点: 多串口、支持触摸屏\n• 应用场景: 收银系统、数字标牌\n\n**5. 政府与企业**\n• 解决方案: 配备TPM 2.0的商务笔记本\n• 特点: 远程管理(Intel vPro)\n• 应用场景: 办公工作站、远程办公\n\n**6. 系统集成商与增值经销商**\n• 解决方案: 广泛产品系列、白标选项\n• 支持: 技术售前、本地售后支持'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft
    WHERE ft.faq_id = f.id AND ft.locale = 'zh-CN'
  );

-- Step 5: Add Russian translations (optional, can be expanded later)
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT
  f.id,
  'ru',
  CASE f.sort_order
    WHEN 1 THEN 'Что такое OEM производитель ноутбуков/компьютеров?'
    WHEN 2 THEN 'Каковы преимущества выбора OEM услуг AIERXUAN?'
    WHEN 3 THEN 'В чем разница между OEM и розничными ноутбуками?'
    WHEN 4 THEN 'Мини-ПК против настольного компьютера: что лучше для бизнеса?'
    WHEN 5 THEN 'Каков ваш минимальный объем заказа (MOQ) и сроки поставки?'
    WHEN 6 THEN 'Как вы обеспечиваете качество и надежность продукции?'
    WHEN 7 THEN 'Можете ли вы настроить ноутбук/ПК с нашим брендом и упаковкой?'
    WHEN 8 THEN 'Какие отрасли вы обслуживаете и каковы типичные случаи использования?'
  END,
  CASE f.sort_order
    WHEN 1 THEN 'OEM (Original Equipment Manufacturer) производит компьютерное оборудование, которое другие компании ребрендируют и продают под своими именами. AIERXUAN является ведущим OEM/ODM производителем, специализирующимся на бизнес-ноутбуках, игровых ноутбуках и мини-ПК для глобальных партнеров.'
    WHEN 2 THEN 'AIERXUAN предлагает отличительные преимущества для бизнеса: корпоративное качество с 1000+ часами тестирования, 100% возможности настройки, конкурентные цены с гибким MOQ от 100 единиц, и комплексную поддержку с 3-летними гарантийными опциями.'
    WHEN 3 THEN 'OEM ноутбуки (AIERXUAN) предлагают настраиваемые спецификации, ваш бренд, оптовые цены (на 30-50% ниже розничных), гибкие гарантийные условия и прямую заводскую поддержку. Розничные ноутбуки имеют фиксированные конфигурации, только брендинг производителя и более высокие цены за единицу.'
    WHEN 4 THEN 'Мини-ПК все чаще предпочитают в бизнес-средах благодаря экономии пространства (на 90% меньше), энергосбережению (на 50-70% меньше потребления), бесшумной работе и простому развертыванию. Идеально подходит для цифровых вывесок, POS-систем, промышленной автоматизации и удаленной работы.'
    WHEN 5 THEN 'Гибкий MOQ для различных бизнес-потребностей: стандартные продукты - 100 единиц (15-20 рабочих дней), индивидуальная конфигурация - 200 единиц (25-30 дней), полная ODM разработка - 500 единиц (45-60 дней). Объемные скидки: 500+ единиц (5-8%), 1000+ единиц (10-15%).'
    WHEN 6 THEN 'Комплексное обеспечение качества AIERXUAN включает: компоненты только от поставщиков первого уровня, производственный объект с сертификацией ISO 9001:2015, 1000+ часов протокола тестирования, сертификаты CE/FCC/RoHS, и коэффициент отказов <0.3% DOA с 96% удовлетворенностью клиентов.'
    WHEN 7 THEN 'Да! Полные услуги брендинга и настройки: размещение логотипа на шасси/клавиатуре/BIOS, индивидуальный дизайн упаковки, предустановленная ОС, индивидуальные пакеты программного обеспечения, цветовые варианты шасси и индивидуальные конфигурации портов I/O. Сроки: 7-14 дней на подготовку брендинга.'
    WHEN 8 THEN 'AIERXUAN обслуживает различные отрасли: образование (компьютерные лаборатории), здравоохранение (медицинские терминалы с сертификацией FDA), промышленное производство (заводская автоматизация), розничная торговля (POS-системы), правительство и предприятия (рабочие станции), системные интеграторы (варианты белой метки).'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft
    WHERE ft.faq_id = f.id AND ft.locale = 'ru'
  );

-- Step 6: Update timestamps
UPDATE faq SET updated_at = NOW() WHERE is_active = true;

-- Step 7: Verify the data
SELECT
  f.id,
  f.sort_order,
  f.category,
  f.is_active,
  ft.locale,
  ft.question
FROM faq f
LEFT JOIN faq_translations ft ON f.id = ft.faq_id
WHERE f.is_active = true
ORDER BY f.sort_order, ft.locale;
