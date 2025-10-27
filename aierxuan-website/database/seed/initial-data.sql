-- AIERXUAN Website Initial Data
-- 执行建表脚本后运行此脚本插入示例数据

-- =============================================
-- 示例产品数据
-- =============================================

-- 插入示例产品
INSERT INTO products (slug, category, images, status, featured, sort_order) VALUES
('laptop-pro-15', 'laptop', '["/images/products/laptop-pro-15-1.jpg", "/images/products/laptop-pro-15-2.jpg"]', 'active', true, 1),
('laptop-ultra-14', 'laptop', '["/images/products/laptop-ultra-14-1.jpg", "/images/products/laptop-ultra-14-2.jpg"]', 'active', true, 2),
('mini-pc-core', 'mini-pc', '["/images/products/mini-pc-core-1.jpg", "/images/products/mini-pc-core-2.jpg"]', 'active', false, 3),
('workstation-station', 'workstation', '["/images/products/workstation-station-1.jpg"]', 'active', false, 4);

-- 插入产品多语言数据
INSERT INTO product_translations (product_id, locale, title, short_desc, key_specs, seo_title, seo_desc) VALUES
-- Laptop Pro 15 - 中文
((SELECT id FROM products WHERE slug = 'laptop-pro-15'), 'zh-CN',
 'AIERXUAN Laptop Pro 15',
 '高性能商务笔记本电脑，配备第12代Intel处理器和独立显卡，适合专业用户使用。',
 '{"cpu": "Intel Core i7-12700H", "memory": "16GB DDR5", "storage": "512GB NVMe SSD", "display": "15.6英寸 2.5K", "graphics": "NVIDIA RTX 3060", "weight": "1.8kg"}',
 'AIERXUAN Laptop Pro 15 - 高性能商务笔记本 | AIERXUAN官网',
 'AIERXUAN Laptop Pro 15高性能商务笔记本电脑，Intel i7处理器，16GB内存，RTX 3060显卡，2.5K显示屏，适合专业办公和设计工作。'),

-- Laptop Pro 15 - 英文
((SELECT id FROM products WHERE slug = 'laptop-pro-15'), 'en',
 'AIERXUAN Laptop Pro 15',
 'High-performance business laptop with 12th Gen Intel processor and dedicated graphics, perfect for professional users.',
 '{"cpu": "Intel Core i7-12700H", "memory": "16GB DDR5", "storage": "512GB NVMe SSD", "display": "15.6" 2.5K", "graphics": "NVIDIA RTX 3060", "weight": "1.8kg"}',
 'AIERXUAN Laptop Pro 15 - High Performance Business Laptop | AIERXUAN',
 'AIERXUAN Laptop Pro 15 high-performance business laptop with Intel i7 processor, 16GB RAM, RTX 3060 graphics, 2.5K display, perfect for professional work and design.'),

-- Laptop Ultra 14 - 中文
((SELECT id FROM products WHERE slug = 'laptop-ultra-14'), 'zh-CN',
 'AIERXUAN Laptop Ultra 14',
 '超轻薄商务笔记本，重量仅1.2kg，续航长达12小时，专为移动办公设计。',
 '{"cpu": "Intel Core i5-1240P", "memory": "16GB LPDDR5", "storage": "256GB NVMe SSD", "display": "14英寸 FHD", "graphics": "Intel Iris Xe", "weight": "1.2kg", "battery": "12小时"}',
 'AIERXUAN Laptop Ultra 14 - 超轻薄商务笔记本 | AIERXUAN官网',
 'AIERXUAN Laptop Ultra 14超轻薄商务笔记本，仅重1.2kg，12小时续航，Intel i5处理器，16GB内存，适合移动办公和商务差旅。'),

-- Laptop Ultra 14 - 英文
((SELECT id FROM products WHERE slug = 'laptop-ultra-14'), 'en',
 'AIERXUAN Laptop Ultra 14',
 'Ultra-light business laptop weighing only 1.2kg with 12-hour battery life, designed for mobile professionals.',
 '{"cpu": "Intel Core i5-1240P", "memory": "16GB LPDDR5", "storage": "256GB NVMe SSD", "display": "14" FHD", "graphics": "Intel Iris Xe", "weight": "1.2kg", "battery": "12 hours"}',
 'AIERXUAN Laptop Ultra 14 - Ultra-light Business Laptop | AIERXUAN',
 'AIERXUAN Laptop Ultra 14 ultra-light business laptop, only 1.2kg weight, 12-hour battery, Intel i5 processor, 16GB RAM, perfect for mobile professionals.'),

-- Mini PC Core - 中文
((SELECT id FROM products WHERE slug = 'mini-pc-core'), 'zh-CN',
 'AIERXUAN Mini PC Core',
 '紧凑型迷你主机，体积仅1.5L，支持4K显示，适合办公室和家庭使用。',
 '{"cpu": "Intel Core i3-12100", "memory": "8GB DDR4", "storage": "256GB SSD", "graphics": "Intel UHD", "size": "1.5L", "ports": "USB 3.2 x4, HDMI 2.0 x2, Ethernet"}',
 'AIERXUAN Mini PC Core - 紧凑型迷你主机 | AIERXUAN官网',
 'AIERXUAN Mini PC Core紧凑型迷你主机，体积1.5L，Intel i3处理器，8GB内存，支持4K显示，适合办公和家庭娱乐。'),

-- Mini PC Core - 英文
((SELECT id FROM products WHERE slug = 'mini-pc-core'), 'en',
 'AIERXUAN Mini PC Core',
 'Compact mini PC with only 1.5L volume, supports 4K display, perfect for office and home use.',
 '{"cpu": "Intel Core i3-12100", "memory": "8GB DDR4", "storage": "256GB SSD", "graphics": "Intel UHD", "size": "1.5L", "ports": "USB 3.2 x4, HDMI 2.0 x2, Ethernet"}',
 'AIERXUAN Mini PC Core - Compact Mini PC | AIERXUAN',
 'AIERXUAN Mini PC Core compact mini PC, 1.5L volume, Intel i3 processor, 8GB RAM, supports 4K display, perfect for office and home entertainment.');

-- =============================================
-- 示例博客文章数据
-- =============================================

-- 插入示例博客文章
INSERT INTO blog_posts (slug, status, published_at, cover_image, featured, sort_order) VALUES
('choosing-right-business-laptop', 'published', NOW() - INTERVAL '7 days', '/images/blog/laptop-guide.jpg', true, 1),
('mini-pc-vs-tower-pc', 'published', NOW() - INTERVAL '14 days', '/images/blog/pc-comparison.jpg', false, 2);

-- 插入博客文章多语言数据
INSERT INTO blog_post_translations (post_id, locale, title, excerpt, body_md, seo_title, seo_desc) VALUES
-- Blog 1 - 中文
((SELECT id FROM blog_posts WHERE slug = 'choosing-right-business-laptop'), 'zh-CN',
 '如何选择适合您业务的商务笔记本电脑',
 '选择合适的商务笔记本电脑对提高工作效率至关重要。本文将从性能、便携性、续航和价格四个维度为您提供建议。',
 '# 如何选择适合您业务的商务笔记本电脑

在现代商务环境中，选择合适的笔记本电脑对提高工作效率至关重要。本文将为您详细介绍如何根据业务需求选择最适合的设备。

## 1. 性能需求分析

### 处理器选择
- **Intel Core i5/i7**: 适合大多数商务应用
- **AMD Ryzen 5/7**: 性价比更高的选择
- **Apple M系列**: 适合创意工作者

### 内存配置
- **8GB**: 基础办公应用
- **16GB**: 多任务处理推荐
- **32GB**: 专业设计工作

## 2. 便携性考虑

### 重量和尺寸
- **超轻薄**: <1.5kg，适合经常出差
- **标准型**: 1.5-2.5kg，性能与便携平衡
- **工作站级**: >2.5kg，追求极致性能

### 电池续航
- **8小时以上**: 全天移动办公
- **6-8小时**: 一般商务需求
- **4-6小时**: 固定场所使用

## 3. 显示和接口

### 屏幕选择
- **14英寸**: 平衡便携性和视野
- **15.6英寸**: 更大的工作空间
- **分辨率**: FHD起步，2.5K推荐

### 接口需求
- **USB-C/雷电4**: 现代设备连接
- **USB-A**: 传统设备兼容
- **HDMI**: 外接显示器
- **读卡器**: 摄影业务必备

## 4. 预算规划

### 价格区间
- **入门级**: 4000-6000元
- **主流级**: 6000-9000元
- **高端级**: 9000-15000元

### 投资回报
考虑设备的使用寿命和维护成本，选择长期价值最高的方案。

## 结论

选择商务笔记本电脑需要综合考虑性能需求、使用场景和预算限制。建议根据主要工作内容优先级来决定各项配置的重要性。',
 '如何选择商务笔记本电脑 - 购买指南 | AIERXUAN',
 'AIERXUAN专业商务笔记本电脑购买指南，从性能、便携性、续航、价格等维度分析，帮助您选择最适合业务的笔记本设备。'),

-- Blog 1 - 英文
((SELECT id FROM blog_posts WHERE slug = 'choosing-right-business-laptop'), 'en',
 'How to Choose the Right Business Laptop for Your Needs',
 'Choosing the right business laptop is crucial for improving work efficiency. This article provides recommendations from four dimensions: performance, portability, battery life, and price.',
 '# How to Choose the Right Business Laptop for Your Needs

In today''s business environment, selecting the appropriate laptop is essential for enhancing work productivity. This article will provide detailed guidance on choosing the most suitable device based on your business requirements.

## 1. Performance Requirements Analysis

### Processor Selection
- **Intel Core i5/i7**: Suitable for most business applications
- **AMD Ryzen 5/7**: More cost-effective choice
- **Apple M-series**: Ideal for creative professionals

### Memory Configuration
- **8GB**: Basic office applications
- **16GB**: Recommended for multitasking
- **32GB**: Professional design work

## 2. Portability Considerations

### Weight and Size
- **Ultra-light**: <1.5kg, suitable for frequent travel
- **Standard**: 1.5-2.5kg, balance of performance and portability
- **Workstation-grade**: >2.5kg, ultimate performance focus

### Battery Life
- **8+ hours**: All-day mobile work
- **6-8 hours**: General business needs
- **4-6 hours**: Fixed location use

## 3. Display and Connectivity

### Screen Selection
- **14-inch**: Balance of portability and viewing area
- **15.6-inch**: Larger workspace
- **Resolution**: FHD minimum, 2.5K recommended

### Port Requirements
- **USB-C/Thunderbolt 4**: Modern device connectivity
- **USB-A**: Legacy device compatibility
- **HDMI**: External monitor connection
- **Card reader**: Essential for photography businesses

## 4. Budget Planning

### Price Range
- **Entry-level**: $600-900
- **Mainstream**: $900-1350
- **Premium**: $1350-2250

### Return on Investment
Consider device lifespan and maintenance costs when selecting the best long-term value option.

## Conclusion

Choosing a business laptop requires comprehensive consideration of performance needs, usage scenarios, and budget constraints. It''s recommended to prioritize configuration importance based on primary work content.',
 'Business Laptop Buying Guide | AIERXUAN',
 'AIERXUAN professional business laptop buying guide, analyzing from performance, portability, battery life, and price dimensions to help you choose the most suitable laptop for your business.');

-- =============================================
-- 示例FAQ数据
-- =============================================

-- 插入示例FAQ
INSERT INTO faq (category, sort_order, is_active) VALUES
('product', 1, true),
('product', 2, true),
('product', 3, true),
('service', 4, true),
('service', 5, true),
('payment', 6, true),
('payment', 7, true),
('shipping', 8, true);

-- 插入FAQ多语言数据
INSERT INTO faq_translations (faq_id, locale, question, answer) VALUES
-- FAQ 1 - 中文
(1, 'zh-CN', 'AIERXUAN的产品保修期是多久？', '我们所有的笔记本电脑产品都提供2年免费保修，迷你电脑产品提供3年保修。保修期内出现非人为损坏的硬件问题，我们提供免费维修或更换服务。'),
(1, 'en', 'What is the warranty period for AIERXUAN products?', 'All our laptop products come with a 2-year free warranty, while mini PC products include a 3-year warranty. During the warranty period, we provide free repair or replacement services for non-human-caused hardware issues.'),

-- FAQ 2 - 中文
(2, 'zh-CN', '是否可以定制产品配置？', '是的，我们提供灵活的产品定制服务。您可以根据业务需求选择不同的处理器、内存、存储等配置。最低订单量为20台，具体配置方案请联系我们的销售团队。'),
(2, 'en', 'Can I customize product configurations?', 'Yes, we offer flexible product customization services. You can choose different processors, memory, storage, and other configurations based on your business needs. The minimum order quantity is 20 units. Please contact our sales team for specific configuration options.'),

-- FAQ 3 - 中文
(3, 'zh-CN', '产品是否支持全球联保？', '是的，我们的产品支持全球联保服务。在中国大陆境内，我们有超过50个授权维修中心。在其他国家和地区，我们与当地的服务商合作提供保修服务。购买时请向销售人员了解具体的保修政策。'),
(3, 'en', 'Do your products support global warranty?', 'Yes, our products support global warranty services. In mainland China, we have over 50 authorized service centers. In other countries and regions, we cooperate with local service providers to offer warranty services. Please consult with our sales staff for specific warranty policies when purchasing.'),

-- FAQ 4 - 中文
(4, 'zh-CN', '批量采购是否有折扣？', '我们为批量采购客户提供有竞争力的价格折扣。具体的折扣比例根据采购数量和合作模式而定。一般来说，10台以上可享受5-10%的折扣，50台以上可享受10-15%的折扣。请联系我们的销售团队获取详细报价。'),
(4, 'en', 'Are there discounts for bulk purchases?', 'We offer competitive price discounts for bulk purchase customers. Specific discount rates depend on purchase quantity and cooperation model. Generally, purchases of 10+ units can enjoy 5-10% discounts, while 50+ units can receive 10-15% discounts. Please contact our sales team for detailed quotations.'),

-- FAQ 5 - 中文
(5, 'zh-CN', '是否提供OEM/ODM服务？', '是的，我们提供专业的OEM/ODM服务。我们拥有完整的产品研发和制造能力，可以根据客户需求进行产品定制、外观设计、功能开发等。OEM服务的最低订单量为500台，ODM服务根据具体项目需求确定。'),
(5, 'en', 'Do you provide OEM/ODM services?', 'Yes, we provide professional OEM/ODM services. We have complete product R&D and manufacturing capabilities, and can customize products, appearance design, and functional development according to customer requirements. The minimum order quantity for OEM services is 500 units, while ODM services are determined based on specific project requirements.'),

-- FAQ 6 - 中文
(6, 'zh-CN', '支持哪些付款方式？', '我们支持多种付款方式：银行转账、支付宝、微信支付、信用卡支付。对于国内客户，我们支持30%定金，70%发货前付清的付款方式。对于海外客户，我们接受T/T电汇和L/C信用证。'),
(6, 'en', 'What payment methods do you accept?', 'We accept multiple payment methods: bank transfer, Alipay, WeChat Pay, and credit card payments. For domestic customers, we support 30% deposit with 70% payment before shipment. For overseas customers, we accept T/T wire transfers and L/C letters of credit.'),

-- FAQ 7 - 中文
(7, 'zh-CN', '发货需要多长时间？', '标准产品的发货时间为订单确认后3-5个工作日。定制产品的发货时间根据具体配置而定，一般为7-15个工作日。加急订单可以协调优先生产，可能需要额外费用。'),
(7, 'en', 'How long does shipping take?', 'Standard products are shipped within 3-5 business days after order confirmation. Custom product shipping times vary depending on specific configurations, typically 7-15 business days. Rush orders can be prioritized with potential additional fees.'),

-- FAQ 8 - 中文
(8, 'zh-CN', '是否提供国际运输服务？', '是的，我们提供全球运输服务。我们与DHL、FedEx、UPS等国际快递公司合作，可以安全快捷地将产品送达全球各地。运输费用根据目的地和重量计算，具体费用请联系销售团队。'),
(8, 'en', 'Do you provide international shipping services?', 'Yes, we provide global shipping services. We cooperate with international express companies like DHL, FedEx, and UPS to safely and quickly deliver products worldwide. Shipping costs are calculated based on destination and weight. Please contact our sales team for specific shipping costs.');

COMMIT;