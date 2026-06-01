# AIERXUAN 全站 SEO 复检报告

复检日期：2026-05-31  
站点：`https://www.aierxuanlaptop.com/`  
目标：更新 2026-05-25 技术审计数据，核实线上真实现状。

## 0. 本次读取的基线

- `seo/aierxuan-technical-seo-audit-2026-05-25.md`
- `seo/aierxuan-keyword-map-2026-05-25.md`
- `seo/topic-cluster-strategy.md`

旧审计确认的实际站点域名是 `https://www.aierxuanlaptop.com/`。本次复检以该域名为准，同时核实 apex `aierxuanlaptop.com` 到 `www` 的跳转。

## 1. 结论

AIERXUAN 的技术 SEO 基础比 2026-05-25 有改善，但还没到“可稳定扩内容”的状态。

已修复或明显改善：

- apex 301 已生效：`http://aierxuanlaptop.com/`、`https://aierxuanlaptop.com/` 均 301 到 `https://www.aierxuanlaptop.com/`。
- `4827f51 fix(seo): improve OEM crawlability signals` 已体现在生产：`/en/oem`、`/ru/oem` 线上都有 `BreadcrumbList`、`FAQPage`、`Service` JSON-LD。
- `/ru/oem` 已从 5/25 的 `Discovered - currently not indexed` 变成 `Submitted and indexed`。
- `/en/contact`、`/en/thank-you` 的明显占位电话/地址已移除。
- `/en/thank-you` 不再暴露 `/en/support` 内链。

仍是核心问题：

- `/en/oem` 仍未被 Google 索引，状态仍是 `Discovered - currently not indexed`。这是当前最重要的英文商业页问题。
- sitemap 仍只有 `en/ru` 88 个 URL；`/ja`、`/fr`、`/pt`、`/zh-CN` 仍返回 200、自引用 canonical、无 noindex，但不在 sitemap/hreflang 内。
- 站内正文还有高频 404 内链，尤其 `/cdn-cgi/l/email-protection`、旧 blog slug 和未上线资源页。
- 公共页面响应头仍是 `Cache-Control: private, no-cache, no-store` 且设置 `site_lang` cookie，Cloudflare `cf-cache-status: BYPASS`，会拖累速度和缓存收益。
- blog on-page 问题未修：长 title、长 description、重复 H1 仍大量存在。

## 2. 复检方法

- 线上抓取：`robots.txt`、`sitemap.xml`、核心页面 HTML、headers、canonical、robots meta、hreflang、JSON-LD、内部链接。
- GSC API：sitemap 状态、90 天/28 天 performance、重点 URL Inspection。
- 浏览器渲染：mobile/tablet/desktop 三档轻量核查 viewport、横向溢出和加载时间。
- PageSpeed Insights API：已尝试，仍返回 `RESOURCE_EXHAUSTED`，当前环境 daily quota 为 0；因此本报告没有 PSI/CrUX 级正式 CWV。

## 3. 抓取与索引

### 3.1 Robots.txt

状态：200。

```txt
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.aierxuanlaptop.com/sitemap.xml
```

判断：正常。核心商业页没有被 robots 阻挡。

### 3.2 XML Sitemap

线上 sitemap 状态：200。  
GSC sitemap 状态：`lastSubmitted=2026-02-08T14:52:17.596Z`，`warnings=0`，`errors=0`。  
线上 sitemap URL 数：88。

| 语言 | URL 数 |
|---|---:|
| en | 44 |
| ru | 44 |
| ja/fr/pt/zh-CN | 0 |

抽查结果：sitemap 内 88 个 URL 当前全部返回 200。

问题：`/ja`、`/fr`、`/pt`、`/zh-CN` 仍是公开 200 页面，但未纳入 sitemap 和 hreflang，也没有 noindex。

### 3.3 HTTPS / apex / canonical domain

| URL | 当前状态 | 结果 |
|---|---:|---|
| `http://aierxuanlaptop.com/` | 301 | `https://www.aierxuanlaptop.com/` |
| `https://aierxuanlaptop.com/` | 301 | `https://www.aierxuanlaptop.com/` |
| `http://www.aierxuanlaptop.com/` | 301 | `https://www.aierxuanlaptop.com/` |
| `https://www.aierxuanlaptop.com/` | 200 | canonical 到 `/en` |
| `https://aierxuanlaptop.com/en/oem` | 301 | `https://www.aierxuanlaptop.com/en/oem` |
| `https://www.aierxuanlaptop.com/oem` | 307 | `/en/oem` |

判断：Cloudflare apex 301 已上线并生效。非语言路径仍会 307 到默认语言路径，这是正常 i18n 行为，但正文内链应尽量直接使用语言路径，避免 crawl waste。

### 3.4 Canonical / noindex

- sitemap 页面均有 canonical。
- 核心页面 canonical 正常自引用。
- 根路径 `/` 的 Google canonical 与 user canonical 都是 `/en`，属于正常归并。
- sitemap 页面未发现 `noindex`。
- 404 页面会输出 `noindex`，正常。

半公开语言页现状：

| URL | HTTP | canonical | robots | hreflang |
|---|---:|---|---|---|
| `/ja` | 200 | 自引用 | 无 noindex | 只输出 x-default/en/ru |
| `/fr` | 200 | 自引用 | 无 noindex | 只输出 x-default/en/ru |
| `/pt` | 200 | 自引用 | 无 noindex | 只输出 x-default/en/ru |
| `/zh-CN` | 200 | 自引用 | 无 noindex | 只输出 x-default/en/ru |

### 3.5 GSC URL Inspection

| URL | 5/25 状态 | 5/31 状态 | 判断 |
|---|---|---|---|
| `/` | Alternate page with proper canonical tag | Alternate page with proper canonical tag，last crawl 2026-05-30 | 正常 |
| `/en` | Submitted and indexed | Submitted and indexed，last crawl 2026-05-26 | 正常 |
| `/en/products` | Submitted and indexed | Submitted and indexed，last crawl 2026-05-30 | 正常 |
| `/en/oem` | Discovered - currently not indexed | Discovered - currently not indexed | 未修复，英文商业页仍未索引 |
| `/ru/oem` | Discovered - currently not indexed | Submitted and indexed，last crawl 2026-05-29 | 已修复 |
| `/en/faq` | Discovered - currently not indexed | Discovered - currently not indexed | 未修复 |
| `/en/blog/custom-laptop-manufacturing-complete-guide-2025` | Discovered - currently not indexed | Discovered - currently not indexed | 未修复 |
| `/en/blog/oem-laptop-manufacturers-top-suppliers-2025` | Crawled - currently not indexed | Crawled - currently not indexed | 未修复 |
| `/en/blog/mini-pc-buyers-guide-2025-b2b-wholesale-custom` | Discovered - currently not indexed | Discovered - currently not indexed | 未修复 |

补充：`/ru/oem` 的 GSC rich results 检测到 Breadcrumbs 和 FAQ，说明 4827f51 的结构化数据已经被 Google 看到；`/en/oem` 仍未进入抓取/索引处理阶段，所以还看不到同等 GSC rich result 反馈。

### 3.6 GSC performance 基线

当前 90 天：2026-03-02 到 2026-05-30。

| 指标 | 5/25 旧报告 | 5/31 当前 |
|---|---:|---:|
| Clicks | 6 | 6 |
| Impressions | 40 | 57 |
| CTR | 15.00% | 10.53% |
| Avg position | 8.85 | 7.75 |
| Query rows | 3 | 3 |
| Page rows | 12 | 13 |

当前有曝光查询仍只有：

| Query | Clicks | Impressions | Position |
|---|---:|---:|---:|
| `aierxuan laptop` | 2 | 4 | 1.5 |
| `laptop` | 0 | 1 | 4 |
| `odm oem` | 0 | 1 | 61 |

当前主要页面：

| Page | Clicks | Impressions | Position |
|---|---:|---:|---:|
| `/en` | 3 | 23 | 3.91 |
| `/en/products` | 2 | 23 | 7.26 |
| `/ru/products/air15-n5095` | 1 | 1 | 12 |
| `/en/blog/oem-vs-odm-manufacturing-complete-guide-tech-brands-2025` | 0 | 7 | 7.14 |
| `/en/blog/how-to-build-custom-laptop-b2b-manufacturing-guide` | 0 | 4 | 9 |

判断：曝光从 40 增到 57，但仍属于极低样本量；`/en/oem` 没有进入 page rows，说明英文 OEM 商业页还没有形成搜索曝光。

## 4. 技术健康

### 4.1 HTTP / HTTPS / headers

核心页面均 200，HTTPS 可访问。`/en` 响应头存在：

- `x-frame-options: DENY`
- `x-content-type-options: nosniff`
- `referrer-policy: origin-when-cross-origin`
- `set-cookie: site_lang=en`
- `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`
- `cf-cache-status: BYPASS`

问题：

- 公共营销页被设置 cookie 和 private/no-store，Cloudflare 无法正常缓存 HTML。
- 未看到 `Strict-Transport-Security`，HSTS 未启用。

### 4.2 速度 / CWV

PageSpeed Insights API 当前仍不可用：

- status：429
- message：quota exceeded
- quota limit value：0

因此本次没有正式 CrUX / field Core Web Vitals。以下是本机浏览器实验室渲染，只作为方向性参考。

| 页面 | Mobile loadEventEnd | Tablet loadEventEnd | Desktop loadEventEnd | 判断 |
|---|---:|---:|---:|---|
| `/en` | 7.99s | 23.47s | 13.30s | 首页加载不稳定，明显慢于商业页 |
| `/en/oem` | 2.54s | 1.69s | 1.55s | 可接受 |
| `/en/products` | 2.33s | 1.82s | 2.07s | 可接受 |

注意：这不是 CWV。当前仍需从 GSC Experience、CrUX API 或可用 PSI UI 获取正式 LCP/INP/CLS。

### 4.3 移动与平板适配

抽查 `/en`、`/en/oem`、`/en/products`：

- viewport：`width=device-width, initial-scale=1`
- mobile 390px：无横向滚动，未发现可见按钮溢出。
- desktop 1440px：无横向滚动。
- tablet 768px：页面本身无横向滚动，但 Header 右侧 `Contact`、`EN`、`Get Quote` 可见元素超出 viewport。

判断：移动端基础合格，但平板断点 Header 有可见溢出风险，应修。

## 5. 页面层 on-page

### 5.1 核心页面

| 页面 | Title 长度 | Description 长度 | H1 | Schema |
|---|---:|---:|---|---|
| `/en` | 53 | 127 | 1 个 | Organization, Manufacturer |
| `/en/products` | 62 | 142 | 1 个 | Organization, Manufacturer |
| `/en/oem` | 48 | 184 | 1 个 | Organization, Manufacturer, BreadcrumbList, FAQPage, Service |
| `/en/about` | 65 | 147 | 1 个 | Organization, Manufacturer |
| `/en/contact` | 35 | 141 | 1 个 | Organization, Manufacturer |
| `/en/blog` | 42 | 146 | 1 个 | Organization, Manufacturer |
| `/en/faq` | 43 | 141 | 1 个 | Organization, Manufacturer, BreadcrumbList, FAQPage |

当前核心页主要问题：

- `/en/oem` description 184 字符，偏长。
- `/en/products` title 62 字符，略长。
- `/en/about` title 65 字符，略长。
- `/en/products`、`/en/about`、`/en/contact` 仍缺页面级 Breadcrumb/WebPage/FAQ/ItemList 等更细 Schema。

### 5.2 全 sitemap on-page 统计

基于 sitemap URL 抽取：

| 问题 | 数量 |
|---|---:|
| title > 60 字符 | 53 |
| description > 160 字符 | 25 |
| H1 数量不等于 1 | 19 |
| duplicate title group | 20 |
| missing description | 0 |
| missing canonical | 0 |
| sitemap non-200 | 0 |

典型问题：

- 多篇 blog 仍有 2 个 H1，例如 `/en/blog/custom-laptop-manufacturing-complete-guide-2025`、`/en/blog/oem-vs-odm-manufacturing-complete-guide-tech-brands-2025`。
- 英俄产品详情页大量 title 完全相同，说明俄语产品页仍没有本地化 title。
- 多篇 blog title 80-110 字符，CTR 和 SERP 展示风险偏高。

### 5.3 内链与 404

sitemap 内 URL 全部 200，但站内正文存在这些问题链接：

| 问题 URL | 当前状态 | 来源数量 | 判断 |
|---|---:|---:|---|
| `/cdn-cgi/l/email-protection` | 404 | 116 | Cloudflare email protection 暴露给爬虫，最优先清理 |
| `/en/blog/what-is-oem-manufacturing-complete-explanation-b2b-buyers` | 404 | 11 | topic cluster 标记已完成，但线上未发布/slug 不一致 |
| `/en/blog/odm-vs-oem-cost-analysis-laptop-manufacturing` | 404 | 10 | 同上 |
| `/en/blog/oem-vs-odm-manufacturing-complete-guide-2025` | 404 | 10 | 当前实际 slug 含 `tech-brands-2025`，内链未同步 |
| `/en/blog/mini-pc-wholesale-b2b-pricing-moq` | 404 | 2 | 当前实际文件名/预期 slug 不一致 |
| `/consultation` -> `/en/consultation` | 404 after redirect | 10 | 未上线资源页被正文链接 |
| `/catalog` -> `/en/catalog` | 404 after redirect | 8 | 未上线资源页被正文链接 |
| `/samples` -> `/en/samples` | 404 after redirect | 3 | 未上线资源页被正文链接 |
| `/resources/oem-rfq-template` -> `/en/resources/oem-rfq-template` | 404 after redirect | 1 | 未上线资源页 |
| `/factory-tour` -> `/en/factory-tour` | 404 after redirect | 1 | 未上线资源页 |

5/25 旧问题 `/en/thank-you` 指向 `/en/support` 已修；本次未在 sitemap 页面内发现 `/en/support` 来源链接。

## 6. 结构化数据

### 6.1 当前 schema 分布

抽取结果：

| Schema 类型 | 出现情况 |
|---|---:|
| Organization | 基础全站存在 |
| Manufacturer | 基础全站存在 |
| BreadcrumbList | 大量详情页与 FAQ/OEM 页存在 |
| Article | blog 详情页存在 |
| Product | 产品详情页存在 |
| FAQPage | `/en/faq`、`/ru/faq`、`/en/oem`、`/ru/oem` |
| Service | `/en/oem`、`/ru/oem` |

### 6.2 4827f51 核实

commit `4827f51 fix(seo): improve OEM crawlability signals` 影响 9 个文件，线上已确认：

- `/en/oem` 有 `BreadcrumbList`、`FAQPage`、`Service`。
- `/ru/oem` 有 `BreadcrumbList`、`FAQPage`、`Service`。
- `/ru/oem` 已被 Google 索引，并在 GSC rich results 中检测到 Breadcrumbs 和 FAQ。
- thank-you 的 `/support` 资源链接已改到 contact/RFQ 方向。
- contact/thank-you 占位信息已移除。

仍缺：

- `/en/products` 应增加 `CollectionPage` 或 `ItemList`，并输出 Breadcrumb。
- `/en/about` 可增加 `AboutPage` / `Organization` 细化证明信息。
- `/en/contact` 可增加 `ContactPage`。
- `/en/blog` 可增加 `Blog` / `CollectionPage`。
- 俄语产品页 title/metadata 本地化不足，会削弱 hreflang 与区域相关性。

## 7. 内容覆盖：对照关键词地图

### 7.1 已有承接页

| 目标词/主题 | 当前承接 | 当前问题 |
|---|---|---|
| `oem laptop`, `odm laptop`, `white label laptops`, `private label laptops` | `/en/oem` | 页面增强已上线，但未索引 |
| `laptop manufacturer`, `notebook manufacturer` | `/en`、`/en/about` | 有曝光，但实体证明和 manufacturer 语义仍可加强 |
| `custom laptop` | blog `/en/blog/custom-laptop-manufacturing-complete-guide-2025`，首页/产品页间接承接 | blog 未索引，缺正式交易页 |
| `custom mini pc`, `mini pc supplier` | `/en/products`、Mini PC blog | 缺正式交易页 |
| `oem vs odm` | `/en/blog/oem-vs-odm-manufacturing-complete-guide-tech-brands-2025` | 有 GSC 曝光，但 title/H1 仍冗长/重复 |
| 俄语 OEM/ODM | `/ru/oem` | 已索引，是本次最大正向变化 |

### 7.2 仍缺的高意图落地页

关键词地图中建议的新路由当前仍不存在：

| 建议路径 | 目标词 | 当前状态 | 优先级 |
|---|---|---|---|
| `/en/custom-laptop-manufacturing` | `custom laptop` | 缺失 | P1 |
| `/en/wholesale-laptops-bulk-orders` | `wholesale laptops`, `bulk laptops` | 缺失 | P1 |
| `/en/oem-laptop-manufacturer` | `oem laptop manufacturer` | 缺失，当前先由 `/en/oem` 承接 | P2，等 `/en/oem` 有曝光后再拆 |
| `/en/barebone-laptop-oem` | `barebone laptop` | 缺失 | P2 |
| `/en/custom-mini-pc` | `custom mini pc`, `mini pc supplier` | 缺失 | P2 |
| `/en/industrial-pc-manufacturer` | `industrial pc manufacturer` | 缺失，且产品线/认证需先确认 | P3 |

### 7.3 主题集群与线上不一致

`seo/topic-cluster-strategy.md` 标记部分文章已完成，但线上 blog slug 并不都可访问。典型例子：

- `what-is-oem-manufacturing-complete-explanation-b2b-buyers`：本地 `articles/` 有文件，线上 `/en/blog/...` 404。
- `odm-vs-oem-cost-analysis-laptop-manufacturing`：本地有文件，线上 `/en/blog/...` 404。
- `mini-pc-wholesale-b2b-pricing-moq-guide`：本地有文件，但部分正文链接指向无 `-guide` 的旧 slug。

判断：内容资产和线上 Supabase/blog slug 需要做一次对账，不然内部链接和主题集群权重会持续泄漏。

## 8. 与 5/25 旧审计的差异

| 项目 | 5/25 | 5/31 | 结论 |
|---|---|---|---|
| apex 301 | commit 提到已上线，旧报告未核实 | 已实测 301 到 www | 已修复 |
| sitemap | 88 URL，en/ru | 88 URL，en/ru，全部 200 | 基础稳定，但语言策略未变 |
| `/en/oem` 索引 | Discovered, not indexed | Discovered, not indexed | 未修复 |
| `/ru/oem` 索引 | Discovered, not indexed | Submitted and indexed | 已修复 |
| OEM Schema | 缺 Service/FAQ/Breadcrumb | `/en/oem` 和 `/ru/oem` 已有 | 已修复 |
| `/en/contact` 占位信息 | 有占位地址/电话 | 未发现旧占位内容 | 已修复 |
| `/en/thank-you` `/en/support` 404 内链 | 存在 | 未发现来源链接 | 已修复 |
| Footer root path 内链 | 多个 root path redirect | Footer 已本地化；blog 正文仍有 root path/旧资源链接 | 部分修复 |
| Cloudflare email protection 404 | 已发现 | 仍有 116 个来源 | 未修复 |
| 多语言半公开 | `/ja` 等 200 未纳入 sitemap/hreflang | 仍存在 | 未修复 |
| blog title/description/H1 | 多篇偏长/重复 | 仍大量存在 | 未修复 |
| PSI/CWV | API quota 0 | API quota 0 | 未能获取正式 field data |
| GSC impressions | 40 | 57 | 小幅增加，但样本仍极低 |

## 9. 优先级修复清单

按影响 x 成本排序。

### P0

| 优先级 | 任务 | 影响 | 成本 | 理由 |
|---|---|---:|---:|---|
| P0 | 修站内 404 内链和旧 slug：`what-is-oem...`、`odm-vs-oem...`、`oem-vs-odm...`、`mini-pc-wholesale...`、`consultation/catalog/samples/resources/factory-tour` | 高 | 低-中 | 当前多个高价值 blog 把权重导向 404，直接影响 crawl quality |
| P0 | 清理 `/cdn-cgi/l/email-protection` 404 暴露 | 高 | 低 | 116 个来源，属于全站噪音；建议关闭 Cloudflare Email Address Obfuscation 或改邮件渲染方式 |
| P0 | 推动 `/en/oem` 索引：从 `/en`、`/en/products`、相关 indexed blog 增强可见内链，GSC request indexing，更新 sitemap lastmod 后复查 | 高 | 低 | 英文 OEM 页是核心商业入口，目前仍无 Google 曝光 |
| P0 | 修公共页缓存策略：避免营销页设置 `site_lang` cookie 和 `private/no-store`，让 Cloudflare 可缓存匿名 HTML | 高 | 中 | 首页 loadEventEnd 多次明显偏慢，CF 当前 BYPASS |

### P1

| 优先级 | 任务 | 影响 | 成本 | 理由 |
|---|---|---:|---:|---|
| P1 | 明确 `/ja`、`/fr`、`/pt`、`/zh-CN` 策略：不做就 noindex/移除入口；要做就补 sitemap/hreflang/本地化 | 中-高 | 低或高 | 当前半公开语言页会制造重复与质量不确定性 |
| P1 | 修 tablet 768px Header 溢出 | 中 | 低 | 三个核心页均有可见 Header 元素超出 viewport |
| P1 | 批量修 blog title/description/H1：优先已有 GSC 曝光和未索引高价值文章 | 中-高 | 中 | 53 个长 title、25 个长 description、19 个重复 H1 |
| P1 | 给 `/en/products` 加 `CollectionPage/ItemList/BreadcrumbList`，给 `/en/about` 加 `AboutPage`，给 `/en/contact` 加 `ContactPage` | 中 | 中 | 增强实体与页面类型可解析性 |
| P1 | 对账 `articles/`、Supabase blog、sitemap、正文内链 slug | 中 | 中 | topic cluster 已完成不等于线上可访问，需要消除资产/路由错位 |

### P2

| 优先级 | 任务 | 影响 | 成本 | 理由 |
|---|---|---:|---:|---|
| P2 | 俄语产品详情 title/description 本地化 | 中 | 中 | 当前大量 en/ru 产品 title 重复，不利于俄语相关性 |
| P2 | 获取正式 CWV：GSC Experience 或可用 PSI/CrUX API；同时单独看俄罗斯节点 TTFB | 中 | 低 | 当前只有实验室数据，不能替代 field CWV |
| P2 | 加 HSTS | 中 | 低 | HTTPS 已可用，但未看到 Strict-Transport-Security |
| P2 | 在 `/en/oem` 有曝光后，再考虑拆 `/en/oem-laptop-manufacturer` | 中 | 中 | 避免过早拆分导致权重稀释 |

### P3

| 优先级 | 任务 | 影响 | 成本 | 理由 |
|---|---|---:|---:|---|
| P3 | 新增 `/en/custom-laptop-manufacturing`、`/en/wholesale-laptops-bulk-orders` | 高 | 高 | 关键词地图中最强商业机会，但应先修 P0 crawl/index 基础 |
| P3 | 新增 `/en/custom-mini-pc`、`/en/barebone-laptop-oem` | 中 | 高 | 等产品线、证据和内链基础更稳后执行 |
| P3 | 新增 `/en/industrial-pc-manufacturer` | 待定 | 高 | 必须先确认真实产品线、认证和案例，不能虚构能力 |

## 10. 推荐下一步

先做一个小而硬的修复包，不新增大页面：

1. 修所有已发现的 404/旧 slug 内链。
2. 清掉 Cloudflare email-protection 404 噪音。
3. 修公共页缓存策略，让匿名营销页可被 Cloudflare 缓存。
4. 加强 `/en/oem` 从已索引页面来的内部链接，并提交 GSC indexing。
5. 修 tablet Header 溢出。

完成后 7-14 天复查：

- `/en/oem` URL Inspection 是否变为 crawled/indexed。
- GSC page rows 是否出现 `/en/oem`。
- 404 内链是否归零。
- 首页加载是否明显下降。
