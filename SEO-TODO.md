# AIERXUAN SEO 优化清单

## Day 1-2：技术 SEO 修复

- [x] 1. 修复 canonical 标签 — 每个页面的 canonical 应指向自身 URL
- [x] 2. 修复 www/非www 重复收录 — 统一 301 重定向（middleware 已添加 non-www → www 301 redirect）
- [x] 3. 为每个页面设置独立的 title
- [x] 4. 为每个页面设置独立的 description
- [x] 5. 清理 Footer 死链（已确认无死链，所有链接指向有效页面）

## Day 3-4：内容优化

- [ ] 6. 丰富产品页内容（每个产品类别页至少 500+ 词）— 需手动编写内容
- [ ] 7. 优化首页关键词布局（融入 laptop manufacturer、oem laptop 等目标词）— 需手动优化文案
- [x] 8. 为博客文章添加 Article 结构化数据（blog/[slug]/page.tsx 已有 Article JSON-LD）

## Day 5：结构化数据 & Schema

- [x] 9. 添加 Organization Schema（layout.tsx 全局注入）
- [x] 10. 添加 Product Schema（products/[slug]/page.tsx 已有 Product JSON-LD）
- [x] 11. 添加 BreadcrumbList Schema（FAQ、博客详情、产品详情页均已添加）
- [x] 12. 添加 FAQ Schema（faq/page.tsx 已有 FAQJsonLd）

## Day 6：多语言 SEO 优化

- [x] 13. 检查并修复 hreflang 标签（所有页面均有 en/ru/x-default alternates）
- [x] 14. 俄语页面独立 title/description 本地化优化
- [x] 15. 俄语页面关键词优化

## Day 7：外链建设 & 提交

- [ ] 16. 确认 sitemap 已提交到 Google Search Console 和 Yandex Webmaster — 需手动操作
- [x] 17. 检查并优化 robots.txt（已配置 allow/disallow 规则和 sitemap 引用）
