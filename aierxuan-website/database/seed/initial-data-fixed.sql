-- AIERXUAN Website Initial Data (English Version)
-- Run this script after executing the schema creation script

-- =============================================
-- Sample Product Data
-- =============================================

-- Insert sample products
INSERT INTO products (slug, category, images, status, featured, sort_order) VALUES
('laptop-pro-15', 'laptop', ARRAY['/images/products/laptop-pro-15-1.jpg', '/images/products/laptop-pro-15-2.jpg'], 'active', true, 1),
('laptop-ultra-14', 'laptop', ARRAY['/images/products/laptop-ultra-14-1.jpg', '/images/products/laptop-ultra-14-2.jpg'], 'active', true, 2),
('mini-pc-core', 'mini-pc', ARRAY['/images/products/mini-pc-core-1.jpg', '/images/products/mini-pc-core-2.jpg'], 'active', false, 3),
('workstation-pro', 'workstation', ARRAY['/images/products/workstation-pro-1.jpg'], 'active', false, 4);

-- Insert product multilingual data
INSERT INTO product_translations (product_id, locale, title, short_desc, key_specs, seo_title, seo_desc) VALUES
-- Laptop Pro 15 - English
((SELECT id FROM products WHERE slug = 'laptop-pro-15'), 'en',
 'AIERXUAN Laptop Pro 15',
 'High-performance business laptop with 12th Gen Intel processor and dedicated graphics, perfect for professional users.',
 '{"cpu": "Intel Core i7-12700H", "memory": "16GB DDR5", "storage": "512GB NVMe SSD", "display": "15.6-inch 2.5K", "graphics": "NVIDIA RTX 3060", "weight": "1.8kg"}',
 'AIERXUAN Laptop Pro 15 - High Performance Business Laptop | AIERXUAN',
 'AIERXUAN Laptop Pro 15 high-performance business laptop with Intel i7 processor, 16GB RAM, RTX 3060 graphics, 2.5K display, perfect for professional work and design.'),

-- Laptop Pro 15 - Chinese
((SELECT id FROM products WHERE slug = 'laptop-pro-15'), 'zh-CN',
 'AIERXUAN Laptop Pro 15',
 'High-performance business laptop with 12th Gen Intel processor and dedicated graphics, perfect for professional users.',
 '{"cpu": "Intel Core i7-12700H", "memory": "16GB DDR5", "storage": "512GB NVMe SSD", "display": "15.6-inch 2.5K", "graphics": "NVIDIA RTX 3060", "weight": "1.8kg"}',
 'AIERXUAN Laptop Pro 15 - High Performance Business Laptop | AIERXUAN',
 'AIERXUAN Laptop Pro 15 high-performance business laptop with Intel i7 processor, 16GB RAM, RTX 3060 graphics, 2.5K display, perfect for professional work and design.'),

-- Laptop Ultra 14 - English
((SELECT id FROM products WHERE slug = 'laptop-ultra-14'), 'en',
 'AIERXUAN Laptop Ultra 14',
 'Ultra-light business laptop weighing only 1.2kg with 12-hour battery life, designed for mobile professionals.',
 '{"cpu": "Intel Core i5-1240P", "memory": "16GB LPDDR5", "storage": "256GB NVMe SSD", "display": "14-inch FHD", "graphics": "Intel Iris Xe", "weight": "1.2kg", "battery": "12 hours"}',
 'AIERXUAN Laptop Ultra 14 - Ultra-light Business Laptop | AIERXUAN',
 'AIERXUAN Laptop Ultra 14 ultra-light business laptop, only 1.2kg weight, 12-hour battery, Intel i5 processor, 16GB RAM, perfect for mobile professionals.'),

-- Laptop Ultra 14 - Chinese
((SELECT id FROM products WHERE slug = 'laptop-ultra-14'), 'zh-CN',
 'AIERXUAN Laptop Ultra 14',
 'Ultra-light business laptop weighing only 1.2kg with 12-hour battery life, designed for mobile professionals.',
 '{"cpu": "Intel Core i5-1240P", "memory": "16GB LPDDR5", "storage": "256GB NVMe SSD", "display": "14-inch FHD", "graphics": "Intel Iris Xe", "weight": "1.2kg", "battery": "12 hours"}',
 'AIERXUAN Laptop Ultra 14 - Ultra-light Business Laptop | AIERXUAN',
 'AIERXUAN Laptop Ultra 14 ultra-light business laptop, only 1.2kg weight, 12-hour battery, Intel i5 processor, 16GB RAM, perfect for mobile professionals.'),

-- Mini PC Core - English
((SELECT id FROM products WHERE slug = 'mini-pc-core'), 'en',
 'AIERXUAN Mini PC Core',
 'Compact mini PC with only 1.5L volume, supports 4K display, perfect for office and home use.',
 '{"cpu": "Intel Core i3-12100", "memory": "8GB DDR4", "storage": "256GB SSD", "graphics": "Intel UHD", "size": "1.5L", "ports": "USB 3.2 x4, HDMI 2.0 x2, Ethernet"}',
 'AIERXUAN Mini PC Core - Compact Mini PC | AIERXUAN',
 'AIERXUAN Mini PC Core compact mini PC, 1.5L volume, Intel i3 processor, 8GB RAM, supports 4K display, perfect for office and home entertainment.'),

-- Mini PC Core - Chinese
((SELECT id FROM products WHERE slug = 'mini-pc-core'), 'zh-CN',
 'AIERXUAN Mini PC Core',
 'Compact mini PC with only 1.5L volume, supports 4K display, perfect for office and home use.',
 '{"cpu": "Intel Core i3-12100", "memory": "8GB DDR4", "storage": "256GB SSD", "graphics": "Intel UHD", "size": "1.5L", "ports": "USB 3.2 x4, HDMI 2.0 x2, Ethernet"}',
 'AIERXUAN Mini PC Core - Compact Mini PC | AIERXUAN',
 'AIERXUAN Mini PC Core compact mini PC, 1.5L volume, Intel i3 processor, 8GB RAM, supports 4K display, perfect for office and home entertainment.'),

-- Workstation Pro - English
((SELECT id FROM products WHERE slug = 'workstation-pro'), 'en',
 'AIERXUAN Workstation Pro',
 'Professional workstation with high-end specifications for demanding tasks like 3D rendering, CAD, and video editing.',
 '{"cpu": "Intel Core i9-12900K", "memory": "32GB DDR5", "storage": "1TB NVMe SSD", "display": "17.3-inch 4K", "graphics": "NVIDIA RTX 4070", "weight": "2.8kg"}',
 'AIERXUAN Workstation Pro - Professional Workstation | AIERXUAN',
 'AIERXUAN Workstation Pro professional workstation with Intel i9 processor, 32GB RAM, RTX 4070 graphics, 4K display, perfect for demanding professional tasks.'),

-- Workstation Pro - Chinese
((SELECT id FROM products WHERE slug = 'workstation-pro'), 'zh-CN',
 'AIERXUAN Workstation Pro',
 'Professional workstation with high-end specifications for demanding tasks like 3D rendering, CAD, and video editing.',
 '{"cpu": "Intel Core i9-12900K", "memory": "32GB DDR5", "storage": "1TB NVMe SSD", "display": "17.3-inch 4K", "graphics": "NVIDIA RTX 4070", "weight": "2.8kg"}',
 'AIERXUAN Workstation Pro - Professional Workstation | AIERXUAN',
 'AIERXUAN Workstation Pro professional workstation with Intel i9 processor, 32GB RAM, RTX 4070 graphics, 4K display, perfect for demanding professional tasks.');

-- =============================================
-- Sample Blog Post Data
-- =============================================

-- Insert sample blog posts
INSERT INTO blog_posts (slug, status, published_at, cover_image, featured, sort_order) VALUES
('choosing-right-business-laptop', 'published', NOW() - INTERVAL '7 days', '/images/blog/laptop-guide.jpg', true, 1),
('mini-pc-vs-tower-pc', 'published', NOW() - INTERVAL '14 days', '/images/blog/pc-comparison.jpg', false, 2),
('future-of-remote-work-technology', 'published', NOW() - INTERVAL '21 days', '/images/blog/remote-work.jpg', false, 3);

-- Insert blog post multilingual data
INSERT INTO blog_post_translations (post_id, locale, title, excerpt, body_md, seo_title, seo_desc) VALUES
-- Blog 1 - English
((SELECT id FROM blog_posts WHERE slug = 'choosing-right-business-laptop'), 'en',
 'How to Choose the Right Business Laptop for Your Needs',
 'Choosing the right business laptop is crucial for improving work efficiency. This article provides recommendations from four dimensions: performance, portability, battery life, and price.',
 $$
# How to Choose the Right Business Laptop for Your Needs

In today's business environment, selecting the appropriate laptop is essential for enhancing work productivity. This article will provide detailed guidance on choosing the most suitable device based on your business requirements.

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

Choosing a business laptop requires comprehensive consideration of performance needs, usage scenarios, and budget constraints. It's recommended to prioritize configuration importance based on primary work content.
$$,
 'Business Laptop Buying Guide | AIERXUAN',
 'AIERXUAN professional business laptop buying guide, analyzing from performance, portability, battery life, and price dimensions to help you choose the most suitable laptop for your business.'),

-- Blog 1 - Chinese
((SELECT id FROM blog_posts WHERE slug = 'choosing-right-business-laptop'), 'zh-CN',
 'How to Choose the Right Business Laptop for Your Needs',
 'Choosing the right business laptop is crucial for improving work efficiency. This article provides recommendations from four dimensions: performance, portability, battery life, and price.',
 $$
# How to Choose the Right Business Laptop for Your Needs

In today's business environment, selecting the appropriate laptop is essential for enhancing work productivity. This article will provide detailed guidance on choosing the most suitable device based on your business requirements.

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

Choosing a business laptop requires comprehensive consideration of performance needs, usage scenarios, and budget constraints. It's recommended to prioritize configuration importance based on primary work content.
$$,
 'Business Laptop Buying Guide | AIERXUAN',
 'AIERXUAN professional business laptop buying guide, analyzing from performance, portability, battery life, and price dimensions to help you choose the most suitable laptop for your business.'),

-- Blog 2 - English
((SELECT id FROM blog_posts WHERE slug = 'mini-pc-vs-tower-pc'), 'en',
 'Mini PC vs Tower PC: Which is Right for Your Business?',
 'Comparing mini PCs and traditional tower PCs to help you make the best choice for your business needs, considering space, performance, and cost factors.',
 $$
# Mini PC vs Tower PC: Which is Right for Your Business?

When setting up office workstations, one of the key decisions is choosing between mini PCs and traditional tower PCs. Each option has distinct advantages and considerations that can significantly impact your business operations.

## Space and Design Considerations

### Mini PC Advantages
- **Compact footprint**: Takes up minimal desk space
- **Clean aesthetics**: Reduces cable clutter
- **Flexible mounting**: Can be mounted behind monitors or under desks
- **Quiet operation**: Generally produces less noise

### Tower PC Advantages
- **Better cooling**: Larger chassis allows for superior thermal management
- **Expansion slots**: More room for additional components
- **Easy maintenance**: Easier access for upgrades and repairs

## Performance Comparison

### Processing Power
- **Mini PCs**: Suitable for office tasks, web browsing, and light productivity work
- **Tower PCs**: Better for demanding applications, multitasking, and resource-intensive tasks

### Graphics Capabilities
- **Mini PCs**: Integrated graphics sufficient for business applications
- **Tower PCs**: Can accommodate dedicated graphics cards for specialized work

## Cost Analysis

### Initial Investment
- **Mini PCs**: Generally lower upfront cost
- **Tower PCs**: Higher initial investment but better price-to-performance ratio

### Long-term Costs
- **Mini PCs**: Lower power consumption, reduced cooling costs
- **Tower PCs**: Higher energy usage but longer upgrade lifecycle

## Use Case Recommendations

### Choose Mini PC When:
- Office space is limited
- Primary use is basic business applications
- Energy efficiency is a priority
- Minimal noise is important

### Choose Tower PC When:
- Performance is the top priority
- Future expandability is needed
- Running resource-intensive applications
- Budget allows for higher initial investment

## Conclusion

The choice between mini PC and tower PC depends on your specific business needs, space constraints, and performance requirements. Mini PCs excel in space-constrained environments with basic computing needs, while tower PCs are better for performance-demanding applications.
$$,
 'Mini PC vs Tower PC Comparison | AIERXUAN',
 'Compare mini PCs and tower PCs for business use. Learn about space, performance, and cost considerations to make the best choice for your office setup.'),

-- Blog 2 - Chinese
((SELECT id FROM blog_posts WHERE slug = 'mini-pc-vs-tower-pc'), 'zh-CN',
 'Mini PC vs Tower PC: Which is Right for Your Business?',
 'Comparing mini PCs and traditional tower PCs to help you make the best choice for your business needs, considering space, performance, and cost factors.',
 $$
# Mini PC vs Tower PC: Which is Right for Your Business?

When setting up office workstations, one of the key decisions is choosing between mini PCs and traditional tower PCs. Each option has distinct advantages and considerations that can significantly impact your business operations.

## Space and Design Considerations

### Mini PC Advantages
- **Compact footprint**: Takes up minimal desk space
- **Clean aesthetics**: Reduces cable clutter
- **Flexible mounting**: Can be mounted behind monitors or under desks
- **Quiet operation**: Generally produces less noise

### Tower PC Advantages
- **Better cooling**: Larger chassis allows for superior thermal management
- **Expansion slots**: More room for additional components
- **Easy maintenance**: Easier access for upgrades and repairs

## Performance Comparison

### Processing Power
- **Mini PCs**: Suitable for office tasks, web browsing, and light productivity work
- **Tower PCs**: Better for demanding applications, multitasking, and resource-intensive tasks

### Graphics Capabilities
- **Mini PCs**: Integrated graphics sufficient for business applications
- **Tower PCs**: Can accommodate dedicated graphics cards for specialized work

## Cost Analysis

### Initial Investment
- **Mini PCs**: Generally lower upfront cost
- **Tower PCs**: Higher initial investment but better price-to-performance ratio

### Long-term Costs
- **Mini PCs**: Lower power consumption, reduced cooling costs
- **Tower PCs**: Higher energy usage but longer upgrade lifecycle

## Use Case Recommendations

### Choose Mini PC When:
- Office space is limited
- Primary use is basic business applications
- Energy efficiency is a priority
- Minimal noise is important

### Choose Tower PC When:
- Performance is the top priority
- Future expandability is needed
- Running resource-intensive applications
- Budget allows for higher initial investment

## Conclusion

The choice between mini PC and tower PC depends on your specific business needs, space constraints, and performance requirements. Mini PCs excel in space-constrained environments with basic computing needs, while tower PCs are better for performance-demanding applications.
$$,
 'Mini PC vs Tower PC Comparison | AIERXUAN',
 'Compare mini PCs and tower PCs for business use. Learn about space, performance, and cost considerations to make the best choice for your office setup.');

-- =============================================
-- Sample FAQ Data
-- =============================================

-- Insert sample FAQ entries (using UUID references)
WITH faq_inserts AS (
  INSERT INTO faq (category, sort_order, is_active) VALUES
  ('product', 1, true),
  ('product', 2, true),
  ('product', 3, true),
  ('service', 4, true),
  ('service', 5, true),
  ('payment', 6, true),
  ('payment', 7, true),
  ('shipping', 8, true)
  RETURNING id, sort_order
)
-- Insert FAQ multilingual data using proper UUID references
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT
  fi.id,
  'en',
  CASE fi.sort_order
    WHEN 1 THEN 'What is the warranty period for AIERXUAN products?'
    WHEN 2 THEN 'Can I customize product configurations?'
    WHEN 3 THEN 'Do your products support global warranty?'
    WHEN 4 THEN 'Are there discounts for bulk purchases?'
    WHEN 5 THEN 'Do you provide OEM/ODM services?'
    WHEN 6 THEN 'What payment methods do you accept?'
    WHEN 7 THEN 'How long does shipping take?'
    WHEN 8 THEN 'Do you provide international shipping services?'
  END,
  CASE fi.sort_order
    WHEN 1 THEN 'All our laptop products come with a 2-year free warranty, while mini PC products include a 3-year warranty. During the warranty period, we provide free repair or replacement services for non-human-caused hardware issues.'
    WHEN 2 THEN 'Yes, we offer flexible product customization services. You can choose different processors, memory, storage, and other configurations based on your business needs. The minimum order quantity is 20 units. Please contact our sales team for specific configuration options.'
    WHEN 3 THEN 'Yes, our products support global warranty services. In mainland China, we have over 50 authorized service centers. In other countries and regions, we cooperate with local service providers to offer warranty services. Please consult with our sales staff for specific warranty policies when purchasing.'
    WHEN 4 THEN 'We offer competitive price discounts for bulk purchase customers. Specific discount rates depend on purchase quantity and cooperation model. Generally, purchases of 10+ units can enjoy 5-10% discounts, while 50+ units can receive 10-15% discounts. Please contact our sales team for detailed quotations.'
    WHEN 5 THEN 'Yes, we provide professional OEM/ODM services. We have complete product R&D and manufacturing capabilities, and can customize products, appearance design, and functional development according to customer requirements. The minimum order quantity for OEM services is 500 units, while ODM services are determined based on specific project requirements.'
    WHEN 6 THEN 'We accept multiple payment methods: bank transfer, credit card payments, and wire transfers. For domestic customers, we support 30% deposit with 70% payment before shipment. For international customers, we accept T/T wire transfers and L/C letters of credit.'
    WHEN 7 THEN 'Standard products are shipped within 3-5 business days after order confirmation. Custom product shipping times vary depending on specific configurations, typically 7-15 business days. Rush orders can be prioritized with potential additional fees.'
    WHEN 8 THEN 'Yes, we provide global shipping services. We cooperate with international express companies like DHL, FedEx, and UPS to safely and quickly deliver products worldwide. Shipping costs are calculated based on destination and weight. Please contact our sales team for specific shipping costs.'
  END
FROM faq_inserts fi;

-- Insert Chinese translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT
  f.id,
  'zh-CN',
  CASE f.sort_order
    WHEN 1 THEN 'What is the warranty period for AIERXUAN products?'
    WHEN 2 THEN 'Can I customize product configurations?'
    WHEN 3 THEN 'Do your products support global warranty?'
    WHEN 4 THEN 'Are there discounts for bulk purchases?'
    WHEN 5 THEN 'Do you provide OEM/ODM services?'
    WHEN 6 THEN 'What payment methods do you accept?'
    WHEN 7 THEN 'How long does shipping take?'
    WHEN 8 THEN 'Do you provide international shipping services?'
  END,
  CASE f.sort_order
    WHEN 1 THEN 'All our laptop products come with a 2-year free warranty, while mini PC products include a 3-year warranty. During the warranty period, we provide free repair or replacement services for non-human-caused hardware issues.'
    WHEN 2 THEN 'Yes, we offer flexible product customization services. You can choose different processors, memory, storage, and other configurations based on your business needs. The minimum order quantity is 20 units. Please contact our sales team for specific configuration options.'
    WHEN 3 THEN 'Yes, our products support global warranty services. In mainland China, we have over 50 authorized service centers. In other countries and regions, we cooperate with local service providers to offer warranty services. Please consult with our sales staff for specific warranty policies when purchasing.'
    WHEN 4 THEN 'We offer competitive price discounts for bulk purchase customers. Specific discount rates depend on purchase quantity and cooperation model. Generally, purchases of 10+ units can enjoy 5-10% discounts, while 50+ units can receive 10-15% discounts. Please contact our sales team for detailed quotations.'
    WHEN 5 THEN 'Yes, we provide professional OEM/ODM services. We have complete product R&D and manufacturing capabilities, and can customize products, appearance design, and functional development according to customer requirements. The minimum order quantity for OEM services is 500 units, while ODM services are determined based on specific project requirements.'
    WHEN 6 THEN 'We accept multiple payment methods: bank transfer, credit card payments, and wire transfers. For domestic customers, we support 30% deposit with 70% payment before shipment. For international customers, we accept T/T wire transfers and L/C letters of credit.'
    WHEN 7 THEN 'Standard products are shipped within 3-5 business days after order confirmation. Custom product shipping times vary depending on specific configurations, typically 7-15 business days. Rush orders can be prioritized with potential additional fees.'
    WHEN 8 THEN 'Yes, we provide global shipping services. We cooperate with international express companies like DHL, FedEx, and UPS to safely and quickly deliver products worldwide. Shipping costs are calculated based on destination and weight. Please contact our sales team for specific shipping costs.'
  END
FROM faq f
WHERE f.is_active = true;

COMMIT;