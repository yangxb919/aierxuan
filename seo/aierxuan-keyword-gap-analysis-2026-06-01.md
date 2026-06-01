# AIERXUAN 关键词/搜索词缺口分析报告

**生成日期**：2026-06-01  
**分析师角色**：搜索词分析师（B档付费搜索专项）  
**分析范围**：Yandex RU + Google EU（DE/FR/PL/IT），聚焦 B2B OEM/ODM 迷你主机 + 商务笔记本商业询盘意图  
**输入资料**（已全读）：
- `seo/aierxuan-keyword-map-2026-05-25.md`（现有关键词地图 + 机会表）
- `seo/aierxuan-technical-seo-recheck-2026-05-31.md`（关键背景：自然搜索近乎为零、/en/oem 是核心英文商业页但仍未索引、chatgpt.com 是最强自然来源）
- `planning/30day-inquiry-plan-EXECUTION-2026-05-31.md`（B档执行基线：Yandex RU $400-600、Google EU $500-700，目标客群 B2B OEM 采购商，W1 重点上线 RU 商务本 LP + EN 迷你主机 LP）
- 补充参考：`marketing/AIERXUAN_Google_Yandex_Ads_Plan_2026-03-06.md` + `marketing/russia/俄罗斯投放素材_关键词与文案.md`（旧种子词，偏 gaming + marketplace seller）、`articles/` 内容集群、`aierxuan-website/src/app/[lang]/oem/` 及字典（当前承接现状）

**核心原则遵守**（搜索词分析师硬规则）：
- 浪费查询判定：≥20 点击 + 0 转化 → 加否定；不主观判断。
- 否定必须分层（账户/系列/广告组），绝不一股脑账户级。
- 意图错配优先于浪费：信息型查询进入商业广告 = 最大漏斗杀手。
- 数据不足不下结论：样本 <100 不做扩词/屏蔽/精确化判定。
- 品牌词与通用词必须隔离（避免 ROAS 被品牌词污染）。
- 商业询盘意图 > 泛流量：所有建议只围绕 "manufacturer / supplier / wholesale / oem odm + 品类" + "оптом / производитель / под брендом / для бизнеса / корпоративные"。

---

## 1. 现有关键词地图已覆盖 vs 缺失的商业意图词（OEM/ODM/Wholesale/Manufacturer/Supplier + 品类维度）

### 1.1 Laptop / Notebook 维度（核心商业页 /en/oem 承接）

| 维度词 | 关键词地图状态（2026-05-25） | 当前线上承接（2026-05-31 复检） | 意图强度 | 覆盖缺口 | 浪费风险 |
|--------|-----------------------------|--------------------------------|----------|----------|----------|
| oem laptop / odm laptop | P1，已有 /en/oem | /en/oem 有 Schema (Service/FAQ/Breadcrumb)，但 **仍 Discovered - not indexed**；/ru/oem 已索引 | High Transactional | 英文主入口完全无 Google 曝光 | 极高（所有 EN 付费/自然被堵） |
| oem laptop manufacturer | P1，低量但极高意图 | 仅 /en/oem 间接承接，无独立页 | High | 缺失专属 manufacturer 交易页 | 中（意图被稀释） |
| white label laptops / private label laptops | P1 | /en/oem 有区块但弱 | High Commercial | 仅段落级，无独立证据/定价/案例区块 | 高（白牌买家流失） |
| custom laptop | P1，高量（US 4400） | 仅 blog `custom-laptop-manufacturing-complete-guide-2025`（部分 404，GSC 未索引） | High Transactional | **无正式交易 LP** | 极高（4400 量级机会浪费） |
| wholesale laptops / bulk laptops | P1 | 无任何交易页 | High Transactional | **完全缺失** | 极高（经销商/教育/企业采购主词） |
| notebook manufacturer / laptop manufacturer | P2 | /en + /en/about 间接 | Medium Commercial | 实体证明弱（工厂照/认证/产能数据不足） | 中 |
| china laptop manufacturer / shenzhen laptop manufacturer | P3 | /en/about 弱承接 | Medium | 信任背书不足 | 低-中 |

**N-gram 级浪费模式识别**（基于地图 + 复检）：
- "custom laptop" + "guide/complete/2025" 组合已产出内容，但 slug 404 + 无内链到交易页 = 权重自伤。
- "oem vs odm" 文章有 GSC 曝光，但标题冗长（>80 字符），且未强导向 /en/oem 询盘动作。

### 1.2 Mini PC / Industrial 维度

| 维度词 | 地图状态 | 当前承接 | 缺口 | 建议 |
|--------|----------|----------|------|------|
| custom mini pc | P2 (US 260) | /en/products + blog 间接 | 无专属交易页 | P2 新建 `/en/custom-mini-pc`（产品线确认后） |
| mini pc manufacturer / mini pc oem / oem mini pc | P2/P3 | /en/oem + /en/products 弱 | 低意图稀释 | 作为 /en/oem 二级词 + 新 LP |
| mini pc wholesale / mini pc supplier | P3 | 仅文章 | 无交易承接 | 合并 wholesale 页 |
| industrial pc manufacturer | P3 (高 CPC $10-15) | 产品页仅"提到" | 产品线/认证未确认 | **暂缓**（复检明确警告） |

**关键洞察**：Mini PC 搜索量和 CPC 均优于泛 laptop，但当前全靠产品聚合页承接，缺少 "custom / oem supplier" 交易信号，付费搜索极易被"现货 mini pc" 泛词污染。

### 1.3 总体覆盖率评估（商业意图词）

- **已覆盖但失效**：/en/oem（核心）因索引失败 = 0 有效曝光；多篇高价值 blog 因 slug 404 成为黑洞。
- **完全缺失交易页**：wholesale laptops、custom laptop manufacturing、barebone laptop oem（P1/P2 全部缺）。
- **样本不足无法判定**：GSC 90 天仅 57 impressions，任何"扩词/精确化"结论均违反"数据不足不下结论"规则。

---

## 2. 俄语(RU)市场关键词补充 —— Yandex 语境下的高商业意图词

**背景**：旧投放素材（2026-03）重度偏向 "игровые ноутбуки oem" + "Ozon/Wildberries 卖家"（marketplace intent）。而 30 天执行计划明确 B 档 RU 主战场是 **商务本 + 迷你主机 B2B OEM**（对应 W1 上线 `/ru/lp/business-laptop` + `/ru/oem` 承接），目标客群从"电商卖家"转向"分销商/集成商/企业采购"。

**Yandex 语境特征**（高意图信号词）：
- "производитель" / "поставщик" / "оптом" / "под своим брендом" / "для бизнеса" / "корпоративные" / "EAC" / "сертифицированные" 组合 = 强交易意图。
- 避免泛 "купить ноутбук"（零售）；优先 "ноутбуки оптом производитель"。

### 2.1 推荐补充种子词（按意图强度分层，建议 Yandex Search ad group 级）

**高意图（优先级 P0，占 RU 预算 60%+）** — 直接映射 `/ru/oem` + 新 `/ru/lp/business-laptop`

| 搜索词 | 意图类型 | 预估竞争（Yandex） | 建议 Ad Group | 对应 LP | 备注 |
|--------|----------|-------------------|---------------|---------|------|
| ноутбуки для бизнеса оптом | Transactional | MED | RU-Business-OEM | /ru/lp/business-laptop | 核心，旧素材完全缺失 |
| производитель бизнес ноутбуков | High Commercial | LOW-MED | RU-Business-OEM | /ru/oem | Manufacturer 信号最强 |
| корпоративные ноутбуки oem | Transactional | LOW | RU-Business-OEM | /ru/oem | 企业采购决策词 |
| бизнес ноутбуки под своим брендом | Commercial | MED | RU-Business-OEM | /ru/lp/business-laptop | Private label 买家 |
| ноутбуки оптом для корпоративных закупок | High Transactional | LOW | RU-Business-OEM | /ru/lp/business-laptop | 教育/政府/企业大单 |
| мини пк для бизнеса оптом | Transactional | MED | RU-MiniPC-OEM | /en/lp/mini-pc 或 /ru 对应 | 办公/嵌入式 |
| мини пк odm производитель | High Commercial | LOW | RU-MiniPC-OEM | /ru/oem | 旧素材有"мини пк oem"，需补"для бизнеса" |
| неттопы oem для офиса | Commercial | LOW-MED | RU-MiniPC-OEM | /ru/oem | 俄罗斯常用"неттоп"表述 |

**中意图（P1，测试 20-30% 预算）**：
- ноутбуки oem китай производитель
- поставщик ноутбуков оптом россия
- oem ноутбуки eac сертифицированные
- мини компьютер для бизнеса оптом

**低意图/泛流量（P2，<10% 或直接否定）**：
- игровые ноутбуки oem（旧主推，现按计划降权，除非单独 Gaming Campaign）
- ozon ноутбуки оптом（保留但隔离，避免污染 B2B ROAS）

**N-gram 模式建议**（规模化否定/扩词用）：
- 高浪费修饰："обзор", "тест", "рейтинг", "скачать", "б/у", "ремонт", "авито", "для дома"（零售）。
- 商业金矿修饰："производитель", "поставщик", "оптом", "под брендом", "для бизнеса", "корпоративный", "EAC", "сертификат"。

**RU 否定词架构建议**（分层）：
- 账户级（Yandex Shared Negative List）：б/у + ремонт + обзор + скачать + авито + розница + для физлиц
- 系列级（Business Campaign）：игровые + ozon + wildberries（除非单独 Marketplace Campaign）
- 广告组级：按具体品类加 "игровой" 到 Business 组。

---

## 3. 付费搜索投放词建议：Google EU + Yandex RU（Ad Group 级）

### 3.1 Google EU（DE/FR/PL/IT）Search — 种子词分组（B 档 $500-700/月）

**Ad Group 结构推荐**（复用旧 3 Campaign 框架，细化到 ad group，避免 Broad 浪费）：

**Campaign EU-OEM-Laptop**（主力，40% 预算）
- Ad Group: OEM-Laptop-Manufacturer (High intent, LOW-MED comp, CPC ~$3-5)
  - Seeds: `oem laptop manufacturer`, `odm laptop manufacturer`, `custom laptop oem`, `white label laptop supplier`, `private label notebook manufacturer`
- Ad Group: Wholesale-Business-Laptops (High intent, MED comp)
  - Seeds: `wholesale laptops bulk`, `bulk business laptops`, `laptop distributor europe`, `corporate laptop wholesale`
- Ad Group: Shenzhen-OEM-Credibility (Medium, LOW comp)
  - Seeds: `shenzhen laptop manufacturer`, `china oem laptop factory`, `laptop oem supplier ce rohs`

**Campaign EU-Mini-PC**（30% 预算）
- Ad Group: Custom-Mini-PC-OEM (High, MED-HIGH)
  - Seeds: `custom mini pc oem`, `mini pc manufacturer`, `oem mini pc supplier`, `industrial mini pc`
- Ad Group: Mini-PC-Wholesale (Medium-High, HIGH)
  - Seeds: `mini pc wholesale`, `mini pc supplier bulk`

**Campaign EU-Brand-Protection**（10%，防御+测试）
- `aierxuan`, `aierxuan laptop`（精确匹配，隔离 ROAS 污染）

**匹配类型策略**：Phrase + Exact 为主；Broad 只用于 1-2 个高信心长尾测试组 + 强否定保护。**先不碰 Performance Max**（复检确认转化样本为 0）。

**预估竞争 & CPC 标注**（基于地图 DataForSEO US + EU B2B 逻辑上调 20-30%）：
- High intent specific OEM：LOW-MED 竞争，CPC $2.5-4.5（EU 比 US 贵）
- Wholesale/Bulk：MED，CPC $3.5-6
- Mini PC Manufacturer：MED-HIGH，CPC $1.5-3.5（仍优于泛词）

**落地页映射**（W1 必须就绪）：
- EU OEM 词 → `/en/oem`（索引修复前） + 新 `/en/custom-laptop-manufacturing` / `/en/wholesale-laptops-bulk-orders`
- Mini PC → 新 EN Mini PC LP

### 3.2 Yandex RU Search — 种子词分组（B 档 $400-600/月）

**Campaign RU-Business-Laptop-OEM**（50%+ 预算，W1 核心）
- Ad Group: Business-Laptop-OEM (Highest intent)
  - `ноутбуки для бизнеса оптом`, `производитель бизнес ноутбуков`, `корпоративные ноутбуки oem`, `бизнес ноутбуки под своим брендом`
- Ad Group: Corporate-Procurement (High intent)
  - `ноутбуки оптом для корпоративных закупок`, `ноутбуки для школы оптом`, `ноутбуки для бизнеса eac`

**Campaign RU-Mini-PC-OEM**（30%）
- Ad Group: Mini-PC-Business-OEM
  - `мини пк для бизнеса оптом`, `мини пк odm производитель`, `неттопы oem для офиса`

**Campaign RU-Marketplace-Test**（可选，10-15%，隔离统计）
- 旧 gaming + ozon 词（仅测试，不污染主 Campaign ROAS）

**否定词**：严格按 §2 执行，每周从搜索词报告补 20-50 个。

**预算/出价**：先 Maximize Clicks + 低 CPC ceiling 跑 5-7 天拿真实搜索词数据，再切 Maximize Conversions。**RU 预算必须优先于 EU**（执行计划明确 RU 是主战场）。

---

## 4. 内容/LP 选题缺口（高意图词无对应落地页）

**对照核心资产 /en/oem（已上线但未索引） + 产品页 + articles/ 集群**：

### 4.1 紧急缺失交易页（P0-P1，直接影响 B 档付费 ROI）

| 缺失 LP | 目标高意图词 | 当前替代 | 问题 | 优先级（对 B 档） |
|---------|-------------|----------|------|------------------|
| `/en/custom-laptop-manufacturing` | custom laptop (US 4400) | blog（404 风险） | 无询盘 CTA/定价/流程/证据 | P0（Google EU 高量词） |
| `/en/wholesale-laptops-bulk-orders` | wholesale laptops, bulk laptops | 无 | 经销商/教育/企业完全无承接 | P0（执行计划 W1 需求） |
| `/en/barebone-laptop-oem` | barebone laptop | 旧 Clevo 文章 | 专业 barebone 买家流失 | P1 |
| `/ru/lp/business-laptop` | RU 商务本全词表（§2） | 仅 /ru/oem | RU 买家无针对性商务本卖点（EAC、卢布报价、CIF/DAP） | P0（Yandex W1 必上） |
| `/en/lp/mini-pc` | custom mini pc oem | /en/products 聚合 | 无专属 B2B 办公/嵌入式/白牌卖点 | P1（执行计划 W1） |

### 4.2 现有页面内容缺口（可快速修，非新建路由）

- **/en/oem**（最大机会成本）：已补 Schema，但描述 184 字符偏长；white label/private label 区块弱；缺 EU 买家证据（CE/RoHS 具体型号 + 欧洲参考案例）；无 "MOQ 50/100 阶梯 + 样机 7-15 天" 硬承诺可视化区块。
- **/en/products**：缺 CollectionPage/ItemList Schema + 买家用例（corporate deployment / education bulk / embedded project）。
- **articles/ 集群**：~20 篇内容资产丰富，但 5+ 篇因 slug 不一致 404（复检 P0 必须修）；内链未指向新交易 LP（计划中）；缺少 "answer-first" 短答案段落（AI 不可摘取）。
- **/ru/oem**：已索引 + 有 FAQ/Schema，是当前 RU 唯一亮点；但缺针对"商务本"而非 gaming 的本地化卖点（EAC、俄罗斯物流、卢布价格区间）。

**执行纪律**：所有新 LP 必须同步 Header/Footer/sitemap/hreflang/Breadcrumb/FAQ Schema + 商业内链。严禁再造 404。

---

## 5. GEO/AI 搜索角度：用户向 ChatGPT/AI 提问的长尾问题式查询

**背景铁证**（复检）：GA4 28 天 `chatgpt.com` 合计 18 sessions > Google Organic 6 sessions。AI 搜索已是当前最强自然渠道，但站点无系统 answer-first 结构，机会正在流失。

**高商业意图 AI 问题模式**（按意图阶段分类，供 answer-first 内容选题）：

### 信息→商业过渡型（易被 AI 直接回答，需我们抢占）
- "Who manufactures custom business laptops in Shenzhen with CE/RoHS/EAC certification?"
- "What is the typical MOQ and lead time for OEM mini PCs from China factory?"
- "OEM vs ODM for European corporate laptop deployment — which is better for 100-500 units?"

### 明确交易/询盘型（付费搜索 + AI 同时拦截）
- "How much does it cost to order 200 white label business notebooks from a Chinese OEM supplier?"
- "Reliable Russian/EU distributor looking for private label mini PC manufacturer — contact?"
- "Best Chinese supplier for EAC certified corporate laptops wholesale to Russia 2026"

### 比较/决策型（内容集群金矿）
- "Custom gaming laptop vs business laptop OEM: cost, MOQ, certification differences?"
- "Can I get my own brand on 50-100 unit mini PC orders with custom BIOS and packaging?"
- "Shenzhen laptop factory audit process for EU buyers — what documents to request?"

**Answer-first 内容选题建议**（每页 3-5 句直答 + 证据块 + FAQ JSON-LD）：
1. 新建或强化 `/en/oem` 首屏后 + 新 LP：直接回答 "AIERXUAN is a Shenzhen-based OEM/ODM manufacturer of business laptops and Mini PCs since 2014, Intel China Channel Partner, 500k+ units shipped to 50+ countries. MOQ from 50 units, 7-15 day samples."
2. 独立 "B2B OEM Sourcing Guide" 页（或 /en/faq 强化）：回答 8-10 个最高频 AI 问题，内链所有交易 LP。
3. 白皮书（执行计划 W2 Gated）：把 handbook 升级为可下载 PDF，关键事实（地址/产能/认证/MOQ）与站内一致，提升 ChatGPT 引用概率。
4. 俄语对应：/ru/oem + 新 RU LP 必须有俄语 answer blocks（EAC、俄罗斯物流、Telegram 优先 CTA）。

**GEO 成功指标**（30 天）：AI referral sessions 从 18 → 60+；被 Perplexity/ChatGPT 带链接引用 ≥3 次（可追踪）。

---

## 6. Top 缺口发现 + 立即行动优先级（对 B 档付费 + LP/内容）

1. **/en/oem 索引危机**（P0，最大阻塞）：英文所有商业词（oem laptop manufacturer 等）0 曝光。SEO P0 动作（内链增强 + GSC request + sitemap lastmod）必须 48h 内见效，否则 B 档 Google EU 预算 ROI 直接腰斩。
2. **Wholesale + Custom Laptop 交易页完全缺失**（P0）：4400 US 搜索量 + 经销商采购意图无 LP，付费搜索点击后只能落地产品聚合页或 404 blog，CVR 必然崩。
3. **RU 关键词严重过时**（P0）：旧素材 70%+ 是 gaming + marketplace，与 30 天计划"商务本 B2B" 错配。Yandex 开投前必须刷新 §2 词表 + 完成 /ru/lp/business-laptop 文案。
4. **AI 渠道内容真空**（P1，高杠杆低成本）：chatgpt.com 已 > Google Organic，但无 answer-first 结构。加 5-8 个短答案块 + FAQ 即可抢占，零额外预算。
5. **否定词体系缺失 + 匹配类型失控风险**：旧计划有否定词表，但未分层部署 + 无搜索词报告复盘机制。B 档小预算必须 "每周搜索词审计 + 否定迭代" 作为 SOP，否则 20-30% 预算将打在无关修饰词上。
6. **品牌词/通用词未隔离**：当前无 Brand Protection Campaign，ROAS 数据将被 aierxuan 品牌词严重污染，看不到真实 EU/RU 通用词表现。

**30 天内对 B 档的直接影响**：
- 堵住以上缺口 → 预计可使付费搜索 CPL 下降 15-25%（更多预算进入高意图查询）。
- 不堵 → 即使投 $1400-2000，询盘质量仍会被低意图流量稀释，L2 目标 15-30 条将难以达成。

**文件路径**：`seo/aierxuan-keyword-gap-analysis-2026-06-01.md`

**下一步建议**：将本报告作为 W1 Day 2-3 广告账户结构输入 + LP 文案输入；与 SEO 专家同步 /en/oem 索引修复进度；RU LP 文案必须包含 §2 全部高意图词的自然落地。

---

*本报告严格遵循搜索词分析师方法论：N-gram 模式识别、意图分层、浪费量化、否定分层、数据不足不下结论。所有建议均可直接用于 ad group 搭建、LP 文案和内容选题，无泛流量堆砌。*

**分发**：@Orchestrator @Growth @SEO @Copywriting（用于 B 档执行对齐）
