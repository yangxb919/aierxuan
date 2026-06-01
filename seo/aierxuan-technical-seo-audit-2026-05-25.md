# AIERXUAN Phase 0 Technical SEO Audit

审计日期：2026-05-25

站点：`https://www.aierxuanlaptop.com/`

审计方式：

- 公网抓取：robots、sitemap、核心页面 HTTP status、HTML meta、canonical、hreflang、JSON-LD、内部链接
- Google Search Console API：URL Inspection 抽查 20 个核心 URL
- 浏览器 CDP：轻量渲染检查 `/en`、`/en/oem`、`/en/products`
- PageSpeed Insights：已尝试，但当前环境返回 API daily quota 0，正式 Core Web Vitals 需后续从 GSC 或 PSI UI 补查

## 1. 结论

当前最大问题不是 robots 或 sitemap，而是 **核心商业页和部分内容页未被 Google 索引**，同时线上存在 **占位联系信息、404 内链、多语言半公开** 这几类信任问题。

优先级排序：

1. P0：修线上占位信息和 404 内链。
2. P0：处理 `/en/oem`、`/ru/oem` 未索引问题。
3. P1：统一多语言策略，处理 `/ja`、`/fr`、`/pt`、`/zh-CN` 半公开状态。
4. P1：补页面级 Schema 和 GEO answer blocks。
5. P1：完成 GA4/GTM 转化事件实测。

## 2. 分项评分

| 维度 | 评分 | 判断 |
|---|---:|---|
| Crawlability | 82/100 | robots 和 sitemap 基础正常 |
| Indexability | 55/100 | `/en/oem` 等核心 URL 未索引，影响商业词承接 |
| Metadata | 70/100 | 核心页基本合格，部分 blog title/description 过长 |
| Canonical / hreflang | 62/100 | en/ru 结构正常，但其他语言 200 页面未纳入 sitemap/hreflang |
| Structured data | 58/100 | 有 Organization/Manufacturer，缺服务页级 Service/FAQ/Breadcrumb |
| Internal links | 60/100 | 存在 root path 重定向链接、`/en/support` 404、email protection 404 |
| GEO readiness | 55/100 | AI referral 有信号，但页面缺 answer-first、证据块和可引用段落 |
| Trust / EEAT | 45/100 | 线上出现占位地址/电话，部分数字与 sameAs 需要证据核验 |
| Tracking | 55/100 | GTM/Ads/Yandex 脚本存在，但 `generate_lead` 仍需实测确认 |

## 3. 基础抓取结果

### 3.1 robots.txt

状态：200

规则：

```txt
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.aierxuanlaptop.com/sitemap.xml
```

判断：正常。核心页面未被 robots 阻挡。

### 3.2 sitemap.xml

状态：200

GSC sitemap API：

| Sitemap | lastSubmitted | warnings | errors |
|---|---|---:|---:|
| `https://www.aierxuanlaptop.com/sitemap.xml` | 2026-02-08T14:52:17.596Z | 0 | 0 |

公网 sitemap：

- URL 数：88
- 包含 en / ru 页面和产品、博客 URL
- 不包含 `/ja`、`/fr`、`/pt`、`/zh-CN`

判断：sitemap 可用，但多语言策略不完整。

## 4. HTTP 状态抽查

| URL | HTTP | 备注 |
|---|---:|---|
| `/` | 200 | canonical 到 `/en` |
| `/en` | 200 | 正常 |
| `/en/oem` | 200 | 页面可访问，但 GSC 未索引 |
| `/en/products` | 200 | 正常 |
| `/en/about` | 200 | 正常 |
| `/en/contact` | 200 | 有占位信息风险 |
| `/en/blog` | 200 | 正常 |
| `/ru` | 200 | 正常 |
| `/ru/oem` | 200 | 页面可访问，但 GSC 未索引 |
| `/ru/products` | 200 | 正常 |
| `/ru/about` | 200 | 正常 |
| `/ru/contact` | 200 | 正常 |
| `/en/support` | 404 | thank-you 页面存在链接 |
| `/ru/support` | 404 | 同类风险 |
| `/en/thank-you` | 200 | 有占位电话和 404 support 链接 |

## 5. GSC URL Inspection 抽查

| URL | GSC coverage | Canonical | 判断 |
|---|---|---|---|
| `/` | Alternate page with proper canonical tag | Google canonical `/en` | 正常，根路径归并到英文首页 |
| `/en` | Submitted and indexed | `/en` | 正常 |
| `/en/oem` | Discovered - currently not indexed | 无 Google canonical | P0，核心商业页未索引 |
| `/en/products` | Submitted and indexed | `/en/products` | 正常 |
| `/en/about` | Submitted and indexed | `/en/about` | 正常 |
| `/en/contact` | Submitted and indexed | `/en/contact` | 正常 |
| `/en/blog` | Submitted and indexed | `/en/blog` | 正常 |
| `/en/faq` | Discovered - currently not indexed | 无 Google canonical | P1，FAQ 页未索引 |
| `/en/blog/custom-laptop-manufacturing-complete-guide-2025` | Discovered - currently not indexed | 无 Google canonical | P0/P1，高价值 custom laptop 文章未索引 |
| `/en/blog/how-to-build-custom-laptop-b2b-manufacturing-guide` | Submitted and indexed | 自引用 | 正常 |
| `/en/blog/oem-vs-odm-manufacturing-complete-guide-tech-brands-2025` | Submitted and indexed | 自引用 | 正常 |
| `/en/blog/oem-laptop-manufacturers-top-suppliers-2025` | Crawled - currently not indexed | 自引用 | P1，内容被抓取但未收录 |
| `/en/blog/mini-pc-buyers-guide-2025-b2b-wholesale-custom` | Discovered - currently not indexed | 无 Google canonical | P1 |
| `/ru` | Submitted and indexed | `/ru` | 正常 |
| `/ru/oem` | Discovered - currently not indexed | 无 Google canonical | P0，俄语商业页未索引 |
| `/ru/products` | Submitted and indexed | `/ru/products` | 正常 |
| `/ru/about` | Submitted and indexed | `/ru/about` | 正常 |
| `/ru/contact` | Submitted and indexed | `/ru/contact` | 正常 |
| `/ru/blog/oem-laptop-manufacturers-top-suppliers-2025` | Crawled - currently not indexed | 自引用 | P1 |
| `/ru/products/air15-n5095` | Submitted and indexed | 自引用 | 正常 |

核心判断：

- `/en/oem` 是最重要的 SEO/GEO 商业页之一，但当前未索引。
- `/en/blog/custom-laptop-manufacturing-complete-guide-2025` 也未索引，会影响 `custom laptop` 内容集群。
- “Discovered - currently not indexed” 通常说明 Google 知道 URL，但尚未抓取/处理；需要提升页面质量、内链权重和重新提交。
- “Crawled - currently not indexed” 说明 Google 已抓取但暂不认为值得收录，优先检查内容重复、质量、内链和搜索意图匹配。

## 6. Metadata / canonical / hreflang / Schema

抽查 20 个 URL 后：

- 核心页面 title / description 基本存在。
- 核心页面 canonical 基本自引用，根路径 canonical 到 `/en`。
- en / ru 页面均有 `x-default`、`en`、`ru` hreflang。
- `/ja`、`/fr`、`/pt`、`/zh-CN` 都返回 200，且 canonical 自指，但 sitemap / hreflang 未覆盖这些语言。
- 全站有 Organization + Manufacturer JSON-LD。
- FAQ 页有 FAQPage。
- Blog 页有 Article + BreadcrumbList。
- 产品详情页有 Product + BreadcrumbList。
- `/en/oem`、`/en/products`、`/en/about` 缺页面级 Breadcrumb/FAQ/Service JSON-LD。

明显问题：

| URL | 问题 |
|---|---|
| `/en/blog/custom-laptop-manufacturing-complete-guide-2025` | title 80 字符、description 183 字符、H1 重复 |
| `/en/blog/oem-vs-odm-manufacturing-complete-guide-tech-brands-2025` | title 82 字符、H1 重复 |
| `/en/blog/how-to-build-custom-laptop-b2b-manufacturing-guide` | description 192 字符偏长 |
| `/en/blog/mini-pc-buyers-guide-2025-b2b-wholesale-custom` | title 83 字符偏长 |
| `/ru/blog/oem-laptop-manufacturers-top-suppliers-2025` | title 84 字符、description 218 字符偏长 |

## 7. 多语言问题

现状：

| 语言路径 | HTTP | sitemap | hreflang | 判断 |
|---|---:|---|---|---|
| `/en` | 200 | 有 | 有 | 正常 |
| `/ru` | 200 | 有 | 有 | 正常 |
| `/ja` | 200 | 无 | 无 | 半公开 |
| `/fr` | 200 | 无 | 无 | 半公开 |
| `/pt` | 200 | 无 | 无 | 半公开 |
| `/zh-CN` | 200 | 无 | 无 | 半公开 |

建议二选一：

1. 如果这些语言是要做 SEO：补 sitemap、hreflang、页面内容本地化、GSC/Bing/Yandex 对应提交。
2. 如果这些语言暂不运营：加 noindex 或从公开入口移除，避免低质量/重复语言页拖累站点质量。

## 8. 内链和 404

抽查 7 个核心页面，发现 23 个内部链接，其中 7 个存在问题或重定向：

| 链接 | 状态 | 问题 |
|---|---|---|
| `/about` | 200 -> `/en/about` | 内链走 root path，产生重定向 |
| `/blog` | 200 -> `/en/blog` | 内链走 root path，产生重定向 |
| `/contact` | 200 -> `/en/contact` | 内链走 root path，产生重定向 |
| `/faq` | 200 -> `/en/faq` | 内链走 root path，产生重定向 |
| `/oem` | 200 -> `/en/oem` | 内链走 root path，产生重定向 |
| `/products` | 200 -> `/en/products` | 内链走 root path，产生重定向 |
| `/cdn-cgi/l/email-protection` | 404 | Cloudflare email protection 链接被爬虫视作 404 |

补充发现：

- `/en/thank-you` 链接到 `/en/support`，但 `/en/support` 返回 404。
- Footer 社交链接包含 `href="#"`，JSON-LD `sameAs` 使用 LinkedIn，需要核验真实 profile。

## 9. Trust / EEAT 风险

线上 `/en/contact` 和 `/en/thank-you` 出现占位信息：

| 内容 | 出现位置 | 风险 |
|---|---|---|
| `Industrial District, City, Country` | `/en/contact`、`/en/thank-you` | 明显占位地址，损害信任 |
| `+86 123 456 7890` | `/en/contact`、`/en/thank-you` | 明显占位电话，损害信任 |
| `/en/support` | `/en/thank-you` | 404 链接 |

同时，以下数字和声明应补证据或降级表达：

- `99.8% QA Pass Rate`
- `98% On-Time Delivery`
- `99.8% Customer Satisfaction`
- `500+ Global Clients`
- `50,000+ Monthly Output`
- `CE/FCC/RoHS/ISO 9001/ISO 14001`
- `Intel Partner`

说明：如果这些都有内部证据，可以保留；如果没有证据，GEO/AI 搜索会放大这些信任风险。

## 10. Tracking 检查

HTML 抽查显示以下脚本/标识存在：

| 项目 | 状态 |
|---|---|
| GTM `GTM-T3NJ8X84` | 存在 |
| Google Ads `AW-1000630085` | 存在 |
| Yandex Metrica `106511138` | 存在 |
| `dataLayer` / `gtag` | 存在 |

仍需实测：

- `form_start`
- `rfq_submit`
- `generate_lead`
- `thank_you_view`
- Yandex `reachGoal`

原因：GA4 近 28 天 `generate_lead` 为 0，不能只看脚本存在，必须用 GTM Preview 或 GA4 DebugView 做一次真实测试。

## 11. 轻量渲染检查

浏览器 CDP 抽查：

| URL | loadEventEnd | DOMContentLoaded | images without alt | links | 备注 |
|---|---:|---:|---:|---:|---|
| `/en` | 3949 ms | 2807 ms | 1 | 24 | LCP 未从 CDP performance entries 读取到 |
| `/en/oem` | 1871 ms | 574 ms | 1 | 20 | 渲染正常 |
| `/en/products` | 3059 ms | 635 ms | 1 | 23 | 渲染正常 |

PageSpeed Insights API 结果：

- 当前环境返回 `RESOURCE_EXHAUSTED`，daily quota 为 0。
- 正式 Core Web Vitals 需要后续从 GSC Experience 报告或 PageSpeed UI 查询。

## 12. P0 修复清单

| 优先级 | 任务 | 预计工时 | 目标 |
|---|---|---:|---|
| P0 | 替换 `/en/contact`、`/en/thank-you` 的占位电话/地址 | 0.5h | 去掉明显信任风险 |
| P0 | 修 `/en/thank-you` 的 `/en/support` 404 链接 | 0.5h | 消除转化后页面死链 |
| P0 | 修 Footer root path 链接为语言路径 | 1h | 减少内部重定向，提升 crawl efficiency |
| P0 | 强化 `/en/oem` 内链、内容质量、FAQ/Service Schema 后重新提交索引 | 2-4h | 让核心商业页 indexed |
| P0 | 强化 `/ru/oem` 并在 Yandex Webmaster 提交 | 2-4h | 俄语商业页进入收录 |
| P0 | 实测 GA4/GTM 转化事件 | 1h | 确认询盘能归因 |

## 13. P1 修复清单

| 优先级 | 任务 | 预计工时 | 目标 |
|---|---|---:|---|
| P1 | 明确 `/ja`、`/fr`、`/pt`、`/zh-CN` 策略 | 1h | 决定补 SEO 或 noindex |
| P1 | 给 `/en/products`、`/en/about`、`/en/oem` 加 Breadcrumb/FAQ/Service schema | 2-4h | 增强 SEO/GEO 可解析性 |
| P1 | 修 5 篇 blog 的 title/description/H1 | 2h | 提升可收录和 CTR |
| P1 | 清理 Cloudflare email protection 404 暴露 | 1h | 减少爬虫 404 噪音 |
| P1 | 核验 LinkedIn sameAs 和 footer social links | 0.5h | 避免 Schema trust 问题 |
| P1 | GSC 重新提交 sitemap，接 Bing Webmaster | 0.5h | 多渠道收录 |
| P1 | Yandex Webmaster / Wordstat 数据接入 | 1-2h | 俄罗斯市场不再靠代理数据 |

## 14. 建议下一步

建议下一步不是直接新建 SEO 页面，而是先做一个小修复包：

1. 修占位电话/地址。
2. 修 `/en/support` 404。
3. 修 Footer root path 内链。
4. 给 `/en/oem` 加 FAQ + Service schema + answer-first 内容。
5. 重新用 GSC Inspection 请求索引 `/en/oem` 和 high-value blog。

完成后再进入 SERP 竞品分析和新增商业页。

