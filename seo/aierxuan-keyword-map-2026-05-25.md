# AIERXUAN SEO / GEO Keyword Map

生成日期：2026-05-25

数据来源：

- Google Search Console API：`https://www.aierxuanlaptop.com/`，区间 2026-02-24 到 2026-05-24、2026-04-27 到 2026-05-24、2026-05-18 到 2026-05-24
- GA4：Property `a373612252p511285255`，区间 2026-04-27 到 2026-05-24、2026-05-18 到 2026-05-24
- DataForSEO MCP：United States、United Kingdom、Japan、Kazakhstan ru 代理数据，采集日期 2026-05-25
- 本地资产：`seo/topic-cluster-strategy.md`、`marketing/AIERXUAN_Google_Yandex_Ads_Plan_2026-03-06.md`、`articles/`、`aierxuan-website/src/app/[lang]/...`

## 1. 结论

当前网站的自然搜索不是“排名差很多”，而是“Google 还没有足够多的关键词入口”。GSC 90 天只有 40 impressions、6 clicks，能看到的关键词主要是品牌词和少量泛词；GA4 28 天里 Google Organic 只有 6 sessions，而 `chatgpt.com` 合计 18 sessions，说明 AI 搜索/AI 推荐已经比 Google Organic 更早出现信号。

第一阶段不要继续堆大量博客。优先做三件事：

1. 修 GA4 转化统计：`generate_lead` 当前为 0，无法判断 SEO 和 AI 流量是否带来询盘。
2. 用现有页面承接高意图词：先改 `/en`、`/en/products`、`/en/oem`、`/en/about` 的 title、H1/H2、FAQ、内链和 Schema。
3. 新增少量交易型落地页：只围绕 `custom laptop`、`wholesale laptops`、`oem laptop manufacturer`、`barebone laptop`、`custom mini pc` 做，不要追 `laptop`、`mini pc` 这种泛词。

## 2. 当前基线

### 2.1 GSC 90 天

| 指标 | 数值 |
|---|---:|
| Clicks | 6 |
| Impressions | 40 |
| CTR | 15% |
| Avg position | 8.85 |
| Query rows | 3 |
| Page rows | 12 |

当前有曝光的查询：

| Query | Clicks | Impressions | Position | 判断 |
|---|---:|---:|---:|---|
| `aierxuan laptop` | 2 | 2 | 1 | 品牌词，必须守住 |
| `laptop` | 0 | 1 | 4 | 泛词，不作为短期目标 |
| `odm oem` | 0 | 1 | 61 | 意图相关，但页面承接不足 |

当前主要页面：

| Page | Clicks | Impressions | Position | 判断 |
|---|---:|---:|---:|---|
| `/en` | 3 | 15 | 4 | 英文首页已有基础信号，应优先强化 |
| `/en/products` | 2 | 15 | 8.6 | 产品聚合页已有基础信号，应强化分类和内链 |
| `/ru/products/air15-n5095` | 1 | 1 | 12 | 俄语产品页有零星搜索信号 |
| `/en/blog/...custom-laptop...` | 0 | 2 | 7 | 文章能排名，但曝光太少 |
| `/en/blog/...oem-vs-odm...` | 0 | 3 | 7.33 | 信息型内容有潜力，需要导向交易页 |
| `/ru` | 0 | 4 | 4 | 俄语首页有排名信号，但 Google 数据不足 |
| `/ru/products` | 0 | 2 | 1 | 俄语产品页有排名信号，但曝光太少 |

### 2.2 GA4 28 天

| Channel / Source | Sessions | 判断 |
|---|---:|---|
| Direct | 91 | 占比过高，可能包含未归因流量和内部访问 |
| Organic Search | 6 | 与 GSC clicks 基本一致，Google 搜索量仍很低 |
| Referral | 6 | 高参与度，可继续观察来源 |
| `chatgpt.com / referral` | 6 | AI 搜索/AI 推荐已有信号 |
| `chatgpt.com / (not set)` | 12 | AI 来源归因需要单独标记 |

关键问题：

- `generate_lead` 为 0，不能判断哪些页面带来询盘。
- `/en` 平均互动时间较好，是第一优先级页面。
- 多个 `/zh-CN/...` landing page 有 direct 流量但平均互动为 0，暂不作为 Google SEO 主战场。

## 3. 关键词机会表

### 3.1 英文市场，优先执行

| 优先级 | Keyword | US volume | UK volume | Intent | Competition / CPC | 当前承接 | 建议动作 |
|---|---|---:|---:|---|---|---|---|
| P1 | `custom laptop` | 4,400 | 880 | Transactional | US MEDIUM / $4.32 | 现有 blog，有首页/产品页间接承接 | 新建或强化 `/en/custom-laptop-manufacturing`；现有文章改为支撑页 |
| P1 | `wholesale laptops` | 2,900 | 140 | Commercial / Transactional | US MEDIUM / $3.96 | 无清晰交易页 | 新建 `/en/wholesale-laptops-bulk-orders`，承接批发、经销商、教育/企业采购 |
| P1 | `oem laptop` | 140 | 20 | Transactional | US LOW / $3.88 | `/en/oem` | 强化 `/en/oem` title、H1、FAQ、Product/Service Schema |
| P1 | `oem laptop manufacturer` | 10 | 10 | High intent | US LOW / $0.41 | `/en/oem` | `/en/oem` 作为短期主承接；后续可建 `/en/oem-laptop-manufacturer` |
| P1 | `odm laptop` | 20 | 10 | Transactional | Low | `/en/oem` | 在 `/en/oem` 增加 OEM vs ODM 决策区块和 FAQ |
| P1 | `white label laptops` | 20 | 未采集 | Commercial / Transactional | US CPC $18.44 | `/en/oem` | 单独强化 private label/white label 区块，避免只藏在段落里 |
| P2 | `private label laptops` | 10 | 未采集 | Commercial / Transactional | 未采集 | `/en/oem` | 和 white label 合并承接 |
| P2 | `barebone laptop` | 140 | 30 | Transactional | US HIGH / $3.19 | 现有 Clevo/barebone 相关文章 | 新建 `/en/barebone-laptop-oem` 或先补 article hub |
| P2 | `bulk laptops` | 260 | 50 | Transactional | US HIGH / $3.36 | 无清晰交易页 | 合并到 wholesale 页面，不单独建页 |
| P2 | `notebook manufacturer` | 170 | 50 | Mixed / Navigational | US MEDIUM / $4.72 | 首页/About/OEM | 首页与 About 增加 manufacturer 实体描述 |
| P2 | `laptop distributor` | 90 | 未采集 | Commercial / Transactional | US LOW / $10.10 | 无专门页面 | 后续建 distributor/reseller program 区块，不先建独立页 |
| P3 | `china laptop manufacturer` | 10 | 未采集 | Commercial | US LOW / $6.74 | About/OEM | About 页强化 Shenzhen/China manufacturer 可信信息 |

执行判断：

- `custom laptop` 和 `wholesale laptops` 有明显搜索量，适合作为新增交易页。
- `oem laptop manufacturer` 搜索量低但意图强，适合先压到 `/en/oem`，不要马上拆太多页面。
- `laptop` 这类泛词虽然偶尔有曝光，但短期不追。

### 3.2 Mini PC / Industrial PC

| 优先级 | Keyword | US volume | UK volume | Intent | Competition / CPC | 当前承接 | 建议动作 |
|---|---|---:|---:|---|---|---|---|
| P2 | `custom mini pc` | 260 | 70 | Transactional | US HIGH / $1.30 | 产品页、mini pc blog | 新建或强化 `/en/custom-mini-pc`，前提是产品线能力确认 |
| P2 | `mini pc manufacturers` | 50 | 未采集 | Commercial | US HIGH | 产品页、OEM 页 | 先在 `/en/products` 增加 mini PC manufacturer 区块 |
| P2 | `mini pc supplier` | 50 | 未采集 | Commercial / Transactional | US HIGH | 产品页 | 和 custom mini pc 合并承接 |
| P3 | `mini pc wholesale` | 20 | 未采集 | Transactional | US HIGH | 现有 mini pc wholesale article | 先让文章导向产品/OEM 询盘 |
| P3 | `mini pc oem` / `oem mini pc` | 10 / 10 | 未采集 | Transactional | 未采集 | `/en/oem` | 作为 `/en/oem` 和 `/en/products` 的二级词 |
| P3 | `industrial computer manufacturer` | 90 | 50 | Commercial / Transactional | US MEDIUM / $10.55 | 产品页提到 industrial | 如果真实产品线确认，再建 industrial page |
| P3 | `industrial pc manufacturer` | 70 | 未采集 | Commercial / Transactional | US MEDIUM / $15.31 | 产品页提到 industrial | 同上，先不承诺未确认能力 |

执行判断：

- Mini PC 需要做，但不能一开始用泛词 `mini pc` 打主战场。
- `custom mini pc` 比 `mini pc manufacturer` 更适合作为 SEO 落地页主词。
- Industrial PC CPC 高，说明商业价值可能高，但必须先确认真实产品线、认证和案例。

### 3.3 俄语市场

DataForSEO 本轮无法直接返回 Russia Google keyword 数据，`location_name: Russia` 和 `Russian Federation` 均不可用。本表使用 Kazakhstan + Russian language 作为方向性参考，不作为俄罗斯投放或 SEO 最终依据。

| Keyword | Volume | Intent | Competition / CPC | 建议动作 |
|---|---:|---|---|---|
| `ноутбуки оптом` | 90 | Commercial | LOW / $1.11 | 俄语批发页值得做，但需要用 Yandex Wordstat / Yandex Webmaster 再确认 |
| `компьютеры оптом` | 30 | Commercial | HIGH | 可作为俄语产品页支撑词 |
| `поставщик ноутбуков` | 10 | Commercial | 未采集 | 可作为 `/ru/oem` 或 `/ru/products` 文案词 |
| `моноблоки оптом` | 10 | Commercial | 未采集 | 仅在产品线确认后处理 |

执行判断：

- 俄罗斯不能只看 Google。下一步应接 Yandex Webmaster / Wordstat / Metrica 数据。
- 俄语 SEO 短期优先 `/ru`、`/ru/products`、`/ru/oem`，不要先铺大量俄语博客。

### 3.4 日本市场

| Keyword | JP volume | Intent | Competition / CPC | 建议动作 |
|---|---:|---|---|---|
| `ノートパソコン メーカー` | 1,300 | Navigational / Commercial | HIGH | 有量，但需要高质量日语本地化和信任背书 |
| `ミニpc メーカー` | 480 | Commercial / Navigational | HIGH | 可作为二期市场验证 |
| `産業用pc メーカー` | 140 | Commercial / Transactional | CPC $3.45 | 如果 industrial 产品线确认，可作为日本方向 |
| `産業用ミニpc` | 50 | Transactional | 未采集 | 后续处理 |

执行判断：

- 日本有搜索量，但不是当前最短路径。
- 只有在日本市场确定为近期目标时，再投入 `/ja` 页面深度本地化。

## 4. 页面承接策略

### 4.1 先改现有页面

| 页面 | 当前状态 | 目标关键词 | 修改方向 |
|---|---|---|---|
| `/en` | GSC impressions 最高之一，GA4 互动好 | `laptop manufacturer`, `notebook manufacturer`, `custom laptop`, brand terms | 强化首屏实体定位、加 manufacturing capability 摘要、加指向 `/en/oem` 和 `/en/products` 的商业内链 |
| `/en/products` | GSC impressions 15，position 8.6 | `custom laptop`, `custom mini pc`, `mini pc supplier`, product category terms | 增加 category intro、buyer use cases、FAQ、产品分类内链 |
| `/en/oem` | 当前最适合承接高意图词 | `oem laptop`, `odm laptop`, `oem laptop manufacturer`, `white label laptops`, `private label laptops` | 重写 meta/H1/H2，补 white label/private label 区块，补 FAQ 和 Service Schema |
| `/en/about` | 有少量 impressions | `china laptop manufacturer`, `shenzhen laptop manufacturer`, credibility terms | 强化 factory proof、certifications、address、audit/visit 内容，避免只讲品牌故事 |
| `/en/blog/...custom-laptop...` | 能排名但曝光低 | `custom laptop` 支撑词 | 作为 pillar/supporting content，内链导向交易页 |
| `/en/blog/...oem-vs-odm...` | 能排名但曝光低 | `odm laptop`, `oem vs odm` | 信息型入口，内链导向 `/en/oem` |

### 4.2 后续新增页面

| 优先级 | 建议路径 | 目标词 | 目的 |
|---|---|---|---|
| P1 | `/en/custom-laptop-manufacturing` | `custom laptop` | 把高量交易词从 blog 转到正式服务页 |
| P1 | `/en/wholesale-laptops-bulk-orders` | `wholesale laptops`, `bulk laptops` | 承接经销商、教育、企业批量采购 |
| P2 | `/en/oem-laptop-manufacturer` | `oem laptop manufacturer` | 当 `/en/oem` 有稳定 impressions 后拆出 |
| P2 | `/en/barebone-laptop-oem` | `barebone laptop` | 承接 barebone/Clevo 相关高意图词 |
| P2 | `/en/custom-mini-pc` | `custom mini pc`, `mini pc supplier` | Mini PC 产品线确认后执行 |
| P3 | `/en/industrial-pc-manufacturer` | `industrial pc manufacturer`, `industrial computer manufacturer` | 仅在产品线、认证、案例确认后执行 |

新增路由时必须同步：

- Header dropdown
- Footer links
- sitemap
- 相关文章内链
- Breadcrumb JSON-LD
- 页面级 FAQ / Service / Product schema

## 5. AI 搜索 / GEO 执行重点

AI 来源已经有流量信号，所以要把页面改成更容易被 AI 摘取和引用的结构。

| 模块 | 做法 |
|---|---|
| Answer-first section | 每个交易页首屏后加 3 到 5 句直接回答：AIERXUAN 是谁、适合谁、提供什么、怎么询价 |
| Entity consistency | 全站统一使用 `AIERXUAN`, `Shenzhen-based OEM/ODM laptop and Mini PC manufacturer`, `aierxuanlaptop.com` |
| Evidence blocks | 用真实可验证信息：地址、认证、生产线、样品周期、MOQ、联系方式；未确认项标 `[待确认]` |
| FAQ extraction | 每页 5 到 8 个真实买家问题，适配 FAQ JSON-LD |
| Comparison tables | OEM vs ODM、custom laptop vs wholesale laptop、Mini PC OEM vs standard stock |
| Internal citations | Blog 文章结尾明确链接到对应服务页，不让信息型文章孤立 |
| Third-party corroboration | 后续需要 LinkedIn、Google Business/Profile、B2B directory、行业问答内容一致 |

## 6. 30 天执行方案

### Week 1：数据和转化先修好

| 任务 | Owner | 产出 |
|---|---|---|
| 修 GA4/GTM `generate_lead`、`rfq_submit`、`form_start` 归因 | Developer / Marketing Ops | GA4 能看到真实询盘事件 |
| 给 `chatgpt.com` 流量单独做来源观察 | Marketing Ops | AI referral 报表 |
| 建立 GSC weekly pull | Developer | 每周 query/page CSV |
| 用 GSC URL Inspection 抽查 `/en`、`/en/products`、`/en/oem`、重点 blog | Developer | 索引状态清单 |

### Week 2：改现有高价值页面

| 页面 | 任务 |
|---|---|
| `/en` | 重写 title/description/H1，增加 custom laptop、OEM/ODM、Mini PC 三条商业入口 |
| `/en/oem` | 强化 `oem laptop manufacturer`、`odm laptop`、`white label laptops`，补 FAQ 和 Service Schema |
| `/en/products` | 增加 category SEO intro、mini PC / laptop 分类说明、FAQ、产品到询盘 CTA |
| `/en/about` | 增加 factory proof、audit/visit、certification evidence、manufacturer entity 信息 |

### Week 3：新增两页交易页

| 页面 | 目标 |
|---|---|
| `/en/custom-laptop-manufacturing` | 承接 `custom laptop`，连接现有 custom laptop blog cluster |
| `/en/wholesale-laptops-bulk-orders` | 承接 `wholesale laptops` 和 `bulk laptops`，面向 distributors / education / enterprise buyers |

### Week 4：内链、Schema、AI 可引用资产

| 任务 | 产出 |
|---|---|
| 给 6 到 8 篇现有文章加商业内链 | Blog to service page linking map |
| 给新增页和重点页加 Breadcrumb / FAQ / Service JSON-LD | Rich result 基础 |
| 建 AI answer snippets | 每页 5 个可摘取短答案 |
| 复盘 GSC impressions | 对比改动前后 7 天、28 天 |

## 7. 暂不执行范围

本阶段不做：

- 不改网站代码
- 不新增路由
- 不重写整站设计
- 不批量生成新文章
- 不做未确认产品线承诺
- 不使用未验证的客户名、logo、testimonial、认证编号或具体销售数字

## 8. 下一步建议

建议进入 Phase 2：先做最小改动版，不新建路由，只优化 `/en`、`/en/products`、`/en/oem`、`/en/about` 四个现有页面的 SEO/GEO 承接。

Phase 2 交付物：

1. 四个页面的 title、description、H1/H2 关键词映射。
2. 每页 FAQ 和 JSON-LD 规划。
3. 现有 blog 到服务页的内链清单。
4. GA4/GTM 转化事件核查清单。

## 9. 评审后修订版

评审结论已吸收：原方向正确，但 GEO、俄罗斯/Bing 收录、技术 SEO、SERP 竞品、KPI 和工时需要补强。后续按新版 Phase 执行。

### 9.1 优先级修正

| 模块 | 原判断 | 修正 |
|---|---|---|
| GEO / AI 搜索 | 作为 SEO 的一个章节处理 | 单独作为核心增长线处理，因为 `chatgpt.com` 28 天 sessions 已高于 Google Organic |
| 俄罗斯市场 | 使用 Kazakhstan ru 作为方向性参考 | 不再用代理数据做决策，必须接 Yandex Wordstat / Yandex Webmaster / Metrica |
| 英文收录 | 重点 GSC | 增加 Bing Webmaster，覆盖 Microsoft/Bing/Edge/Windows 企业采购人群 |
| 技术 SEO | 放在 Week 1 的子任务 | 前置为 Phase 0，先排除 indexability/canonical/hreflang/CWV 问题 |
| 竞品 SERP | 暂未执行 | Phase 2 单独输出 5 个核心词的 SERP 对照表 |
| KPI | 30 天 impressions 40 到 300+ | 上调为保底 500+，目标 800-1500，拉伸 2000+ |
| 工时 | 仅列 Owner | 每个 Phase 增加工时预估和交付物 |

### 9.2 新执行顺序

| Phase | 时间 | 目标 | 交付物 |
|---|---:|---|---|
| Phase 0 | 0.5-1 天 | 技术 SEO + 数据基础 | 技术 SEO 体检表、GSC URL Inspection 清单、Bing/Yandex 接入清单、GA4/GTM 转化核查清单 |
| Phase 1 | 2-3 天 | GEO 单独拉高 | ChatGPT / Perplexity / Google AI Overview 问题矩阵、answer blocks、证据块、FAQ/Schema 规划 |
| Phase 2 | 1 天 | SERP 竞品分析 | 5 个核心商业词 Google 第一页竞品表 |
| Phase 3 | 2-4 天 | 改现有高价值页面 | `/en`、`/en/products`、`/en/oem`、`/en/about` 页面级 SEO/GEO 改动 |
| Phase 4 | 1-2 周 | 新增商业页 | `custom laptop`、`wholesale laptops`、`barebone laptop`、`custom mini pc` 等交易页 |

### 9.3 Phase 0 技术 SEO 检查项

| 检查项 | 方法 | 输出 |
|---|---|---|
| URL Inspection | GSC API 抽查 20 个核心 URL | indexed/canonical/mobile/sitemap 状态 |
| robots.txt | 公网抓取 | 是否允许核心目录抓取 |
| sitemap.xml | 公网抓取 + GSC sitemap API | URL 数量、错误、lastSubmitted |
| canonical | 抽查核心页面 HTML | 是否自引用或符合语言路径 |
| hreflang | 抽查核心页面 HTML | 是否覆盖 en/ru/x-default，是否和 canonical 冲突 |
| HTTP status | 抽查核心页面 | 200/3xx/4xx/5xx |
| metadata | 抽查 title/description | 是否重复、过短、关键词缺失 |
| structured data | 抽查 JSON-LD | Organization、Breadcrumb、Article、Product/Service、FAQ 是否匹配页面 |
| mobile/CWV | PageSpeed 或浏览器/公开数据 | 是否存在 LCP/CLS/INP 明显问题 |
| conversion tracking | GA4/GTM/页面事件 | `generate_lead`、`rfq_submit`、`form_start` 是否可用 |

### 9.4 GEO 目标平台

| 平台 | 目标 | 页面改法 |
|---|---|---|
| ChatGPT | 让 AI 正确识别 AIERXUAN 是深圳 OEM/ODM laptop 与 Mini PC manufacturer | 实体一致性、answer-first 段落、清晰服务边界、第三方资料一致 |
| Perplexity | 提高被引用和带链接引用概率 | 可引用短段落、FAQ、表格、更新日期、来源/证据块 |
| Google AI Overview | 争取在商业/解释型问题中作为来源出现 | FAQPage、Article、Service/Product schema、短答案、比较表 |

### 9.5 KPI 修正版

| 指标 | 当前基线 | 30 天保底 | 30 天目标 | 30 天拉伸 |
|---|---:|---:|---:|---:|
| GSC impressions | 40 / 90 天 | 500+ | 800-1500 | 2000+ |
| GSC clicks | 6 / 90 天 | 20+ | 40+ | 80+ |
| Google Organic sessions | 6 / 28 天 | 20+ | 40+ | 80+ |
| AI referral sessions | 18 / 28 天 | 30+ | 60+ | 100+ |
| Indexed priority URLs | 待 Phase 0 确认 | 90%+ | 95%+ | 100% |
| Tracked lead events | 0 | 修复并可记录 | 每周可复盘 | 能按 source/page 归因 |

### 9.6 仍然不做的事

- 不用 Kazakhstan 数据替代俄罗斯最终决策。
- 不虚构客户案例、认证编号、销量、奖项或 testimonial。
- 不把 `industrial PC` 做成主推页，除非产品线、认证和案例被确认。
- 不批量生成低质量 AI 文章。
- 不做隐藏文字、不可见 Schema 或关键词堆砌。
