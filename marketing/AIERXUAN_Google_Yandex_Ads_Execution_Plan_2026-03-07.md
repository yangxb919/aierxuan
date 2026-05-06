# AIERXUAN Google + Yandex 广告执行方案

更新日期：2026-03-07

## 1. 当前状态

### 1.1 已确认的平台状态

- Google Ads 账户：`443-435-6759`
- Google Ads 账户状态：`cancelled`
- Google Ads 当前已确认 Campaign 数：`0`
- Google Ads 已有 1 个网站转化动作：`发送询盘`
- Google Ads 转化代码已改为站点直连，生产页 `https://aierxuanlaptop.com/ru/thank-you` 已实测发出：
  - `AW-1000630085`
  - `label=WkULCKmYx6UZEMXOkd0D`
- Yandex Direct 账户：`yangxb919`
- Yandex Direct 已完成站内转化源接入：
  - `rfq_submit`，Goal ID `518346477`
  - `telegram_click`，Goal ID `518346701`
- 生产页 `/ru/oem` 已恢复，不再是 `HTTP 500`

### 1.2 站点与自然流量状态

- DataForSEO 在 `2026-03-07` 查询 `aierxuanlaptop.com` 的美国 Google 排名数据时，没有拉到可用的自然排名样本
- 这说明站点在英文市场当前几乎没有稳定 SEO 基盘
- 因此投放初期不能依赖历史转化模型，只能靠：
  - 关键词意图控制
  - 落地页承接
  - 否定词
  - 快速跟进

### 1.3 当前最重要的判断

- 现在已经具备“开始投放测试”的技术条件
- 但还不具备“直接放量”的条件
- Google 侧的最大阻塞不是代码，而是账户还没恢复
- Yandex 侧的最大阻塞不是追踪，而是是否已经搭好真正的 Campaign 结构和搜索词/否定词迭代机制

## 2. 研究结论

### 2.1 Google 英文高意图关键词

DataForSEO（United States，2026-03-07）显示：

- `oem laptop manufacturer`
  - 搜索量：`10`
  - 竞争度：`LOW`
  - 意图：`transactional`
- `odm laptop manufacturer`
  - 搜索量：`10`
  - 竞争度：`LOW`
- `custom laptop manufacturer`
  - 搜索量：`10`
  - 竞争度：`LOW`
  - 意图：`transactional`
- `white label laptop`
  - 搜索量：`20`
  - 竞争度：`MEDIUM`
  - CPC：约 `$0.20`
  - 意图：`transactional`
- `private label laptop`
  - 搜索量：`10`
  - 意图：`transactional`
- `mini pc manufacturer`
  - 搜索量：`50`
  - 竞争度：`HIGH`
  - CPC：约 `$0.92`
  - 意图：`transactional`
- `mini pc oem`
  - 搜索量：`10`
  - 竞争度：`HIGH`
  - CPC：约 `$3.48`

### 2.2 哪些词该投，哪些词先别碰

优先投：

- `oem laptop manufacturer`
- `odm laptop manufacturer`
- `custom laptop manufacturer`
- `white label laptop`
- `private label laptop`
- `mini pc oem`

谨慎低预算测试：

- `mini pc manufacturer`
  - 原因：量更大，但 SERP 明显更偏消费品牌和整机品牌站

第一阶段不建议投：

- `gaming laptop manufacturer`
  - 虽然搜索量高达 `1600`
  - 但 SERP 实际被消费级榜单、评测、零售和品牌页占据
  - 这类词很容易把 B2B 预算拉去打 C 端

### 2.3 SERP 对标结论

#### `oem laptop manufacturer`

Google 首页更容易看到：

- B2B 工厂页
- ODM/OEM 厂商介绍页
- Alibaba / Global Sources / Made-in-China 这类平台页

这说明：

- AIERXUAN 有机会拿到这类搜索流量
- 但文案必须更“工厂/B2B/定制”而不是泛产品介绍

#### `white label laptop`

Google 首页更容易看到：

- Alibaba
- VVDN
- Made-in-China
- AVADirect

这说明：

- `white label laptop` 是可以投的
- 但广告和落地页必须直接写：
  - private label
  - OEM/ODM
  - logo / packaging / BIOS / software
  - MOQ
  - lead time

#### `mini pc manufacturer`

Google 首页更容易看到：

- GEEKOM
- Peladn
- Minisforum
- GMKtec
- Azulle
- Beelink

这类结果明显更偏“品牌整机 + 消费型/准消费型 mini PC”。

结论：

- `mini pc manufacturer` 不适合拿大预算直接打
- 更适合作为：
  - 低预算精确测试词
  - 或拆成更窄的工业/项目型词

### 2.4 竞品落地页在强调什么

DataForSEO 抓取的竞品页里，重复出现的卖点是：

- OEM-ready / white-label
- bulk order
- custom branding
- flexible configurations
- quick turnaround
- enterprise / education / commercial use
- warranty / after-sales / local warehouse

而 AIERXUAN 当前 `/en/oem` 和 `/ru/oem` 的问题是：

- 有“能力介绍”，但首屏“交易信息”还不够强
- 缺少更直白的：
  - MOQ
  - sample policy
  - FOB / shipping
  - Russia logistics note
  - project / channel / marketplace seller 场景

## 3. 预算建议

### 3.1 如果你的总测试预算只有 100 RMB/天

不要同时重投 Google + Yandex。

建议：

- Yandex：`100 RMB/天`
- Google：`0`

原因：

- 100 RMB/天拆两边后，两个平台都会学不到东西
- 俄罗斯俄语高意图搜索更适合先在 Yandex 跑出首批询盘模型

### 3.2 如果你的总测试预算是 300 RMB/天

建议：

- Google Search：`200 RMB/天`
- Yandex Search：`100 RMB/天`

原因：

- Google 需要至少 2 个 Campaign 才能测出 OEM Laptop 与 Mini PC 的差异
- Yandex 俄语侧保留低成本高意图测试即可

### 3.3 如果你的总测试预算是 500 RMB/天以上

建议：

- Google Search：`300 RMB/天`
- Yandex Search：`150 RMB/天`
- Yandex Remarketing / Brand：`50 RMB/天`

## 4. Google Ads 方案

### 4.1 启动前提

先完成这 2 件事：

1. Reactivate Google Ads 账户
2. 确认 billing 正常可投

### 4.2 第一阶段只做 Search

前 14 天不要上：

- Performance Max
- Display
- Discovery
- YouTube

原因：

- 站点数据太少
- 转化样本太少
- 搜索词控制比广泛流量更重要

### 4.3 Google Campaign 结构

#### Campaign G1：OEM Laptop / White Label

目标：

- 接住明确找 OEM/ODM/贴牌笔记本工厂的人

Ad Groups：

- `oem laptop manufacturer`
- `odm laptop manufacturer`
- `custom laptop manufacturer`
- `white label laptop`
- `private label laptop`
- `laptop factory china`

落地页：

- 主落地页：`/en/oem`
- 表单承接页：`/en/contact`

#### Campaign G2：Mini PC OEM

目标：

- 接住项目型 / OEM 型 mini PC 需求

Ad Groups：

- `mini pc oem`
- `mini pc manufacturer`
- `industrial mini pc`
- `industrial mini pc manufacturer`

落地页：

- 主落地页：`/en/oem`
- 如果后续补一版更强的 mini PC 项目页，再切

#### Campaign G3：Brand

目标：

- 品牌保护
- 承接已有品牌搜索

Ad Groups：

- `aierxuan`
- `aierxuan laptop`
- `aierxuan mini pc`

预算：

- 极低即可

### 4.4 地区与语言

第一阶段地区：

- United States
- Canada
- United Kingdom
- UAE

如预算有限，只先跑：

- United States
- Canada

语言：

- 仅英语

### 4.5 匹配方式

第一阶段：

- Exact Match
- Phrase Match

不建议一开始大开 Broad Match。

### 4.6 Google 否定词

通用否定词：

- `best`
- `review`
- `reddit`
- `vs`
- `comparison`
- `under 1000`
- `cheap`
- `refurbished`
- `used`
- `repair`
- `driver`
- `amazon`
- `walmart`
- `best buy`

针对 gaming 方向的否定词：

- `asus`
- `alienware`
- `legion`
- `rog`
- `msi`
- `acer`
- `razer`

说明：

- 这些否定词不是说以后永远不用
- 而是第一阶段先把预算锁在 B2B 工厂意图上

### 4.7 Google 广告文案池

标题建议：

- OEM Laptop Manufacturer
- ODM Laptop Factory in Shenzhen
- White Label Laptop Supplier
- Custom Laptop Solutions
- Mini PC OEM / ODM
- MOQ From 50 / 100 Units
- Samples Available
- 7–15 Day Lead Time
- Factory Direct Pricing
- 24h Custom Quote

描述建议：

- Launch your own laptop or mini PC brand with custom logo, packaging and configuration.
- Factory-direct OEM/ODM manufacturing with samples, flexible MOQ and fast lead time.
- We support branding, BIOS/software customization, QC, and global B2B shipping.
- Get a custom quote within 24 hours for laptops, gaming notebooks and mini PCs.

### 4.8 Google 出价策略

前 7–10 天：

- `Maximize Clicks`，并设置 CPC 上限

观察指标：

- 搜索词质量
- 表单提交
- 感谢页转化

当 30 天内累计 15+ 有效转化后，再考虑切：

- `Maximize Conversions`

## 5. Yandex Direct 方案

### 5.1 Yandex 的角色

Yandex 不是 Google 的附属补充，而是俄语需求捕获主力。

特别是当你的客户画像包括：

- 俄罗斯渠道商
- Ozon / Wildberries 卖家
- B2B 采购商
- 小批量试单客户

### 5.2 Yandex Campaign 结构

#### Campaign Y1：OEM/ODM Laptop

关键词方向：

- `oem ноутбуки`
- `odm ноутбуки`
- `ноутбук под своим брендом`
- `контрактное производство ноутбуков`
- `ноутбуки оптом производитель`
- `производитель ноутбуков китай oem`

#### Campaign Y2：Gaming OEM/ODM

关键词方向：

- `игровые ноутбуки oem`
- `производство игровых ноутбуков`
- `игровой ноутбук под своим брендом`

说明：

- 这一组只投“带 OEM / под брендом / производство”的词
- 不碰泛 `игровой ноутбук`

#### Campaign Y3：Mini PC OEM

关键词方向：

- `мини пк oem`
- `мини пк оптом производитель`
- `неттопы под брендом`

#### Campaign Y4：Brand / Remarketing

开启时机：

- 第 15 天后
- 前提是已经有一定点击和访问

### 5.3 Yandex 落地页策略

优先级：

1. `/ru/oem`
2. `/ru/contact`

建议：

- 一般 OEM/ODM 搜索词先落 `/ru/oem`
- 对“强询盘型”广告组可以测试直落 `/ru/contact`

### 5.4 Yandex 文案要点

广告必须直说：

- `MOQ от 100`
- `MOQ от 50`
- `образец по запросу`
- `логотип / упаковка / конфигурации`
- `7–15 дней`
- `FOB Shenzhen`

推荐描述写法：

- `OEM/ODM ноутбуки под вашим брендом. MOQ от 100 шт. Логотип, упаковка, конфигурации. Получите предложение.`
- `Мини-ПК OEM/ODM для проектов и дистрибуции. MOQ от 50 шт. Быстрый расчет цены и образцы по запросу.`

### 5.5 Yandex 否定词

延续你现有俄语素材中的核心否定词：

- `б/у`
- `бу`
- `ремонт`
- `сервис`
- `драйвер`
- `скачать`
- `обзор`
- `рейтинг`
- `отзывы`
- `купить в розницу`
- `авито`

保留，不要一开始否定：

- `ozon`
- `wildberries`
- `маркетплейс`
- `селлер`
- `поставщик`

### 5.6 我对你当前 Yandex 投放的改进建议

基于我在 `2026-03-06` 的账户核查结果，你的 Yandex 准备更像“基础设施已搭好”，而不是“投放结构已跑起来”。

优先改进：

1. 不要先开 RSYA
2. 先只做搜索广告
3. 每日看搜索词报告并加否定词
4. 把俄语广告组按意图拆开，不要把 Gaming / OEM / Mini PC 混在一个组里
5. Telegram 点击只能算微转化，不能当成最终有效询盘

## 6. 落地页改进清单

### 6.1 `/en/oem` 必补

首屏直接增加：

- MOQ from 100 for laptops / MOQ from 50 for mini PCs
- Sample available
- 7–15 day lead time
- FOB Shenzhen
- Logo / packaging / BIOS / software customization
- Quote in 24 hours

### 6.2 `/ru/oem` 必补

首屏直接增加俄语版交易信息：

- `MOQ от 100 / от 50`
- `образец по запросу`
- `срок 7–15 дней`
- `FOB Шэньчжэнь`
- `логотип / упаковка / конфигурация`
- `доставка в РФ: авиа / ж/д`

### 6.3 你现在最缺的不是“更多设计”，而是更强的交易信息

竞品页普遍写得很直接：

- for enterprise / education / commercial
- bulk order
- white-label
- quick turnaround
- warranty / service

AIERXUAN 也应该把这些信息提前，而不是放在页面中后段。

## 7. 转化口径

### 7.1 最终转化

- `thank_you_view`

### 7.2 微转化

- `rfq_submit`
- `telegram_click`

### 7.3 业务判断

真正用于算 CPL 的，建议只认：

- RFQ 提交成功
- 或者人工确认的有效询盘

不要把：

- 页面停留
- Telegram 点击
- 滚动

直接当成有效线索。

## 8. 14 天执行节奏

### Day 1–2

- Reactivate Google Ads
- 建 Google 2 个 Search Campaign
- 建 Yandex 2–3 个 Search Campaign
- 所有链接统一带 UTM

### Day 3–4

- 检查搜索词报告
- 新增第一轮否定词
- 看 `/en/oem` 和 `/ru/oem` 跳出率与表单触发

### Day 5–7

- 砍掉低质量词
- 保留有点击但不离谱的高意图词
- 对 Google 的 `mini pc manufacturer` 降预算或改为 exact-only

### Day 8–10

- 上第二轮广告文案
- 测试 `/ru/contact` 直落版本
- 检查是否已有 1–3 个有效线索

### Day 11–14

- 输出第一轮结论：
  - 哪个平台 CPL 更低
  - 哪个关键词组最像真 B2B
  - 哪个页面承接更强

## 9. 我建议你现在怎么投

### 如果你今天就要开始

我的建议不是“两边同时猛开”，而是：

#### 方案 A：保守

- 先投 Yandex 14 天
- Google 先恢复账户和建结构，不急着放量

适用：

- 总预算低
- 你更看重俄语市场

#### 方案 B：平衡

- Google Search：测试 OEM / white-label / mini pc
- Yandex Search：只跑俄语 OEM / Gaming OEM / Mini PC

适用：

- 总预算至少 300 RMB/天
- 想同时验证英语和俄语市场

### 我的最终推荐

在没有拿到更多历史转化数据之前：

- Google：只投 `OEM/ODM/white-label/mini pc OEM`
- Yandex：只投 `俄语 B2B OEM / под брендом / оптом`
- 暂时不投泛 `gaming laptop manufacturer`
- 暂时不投 RSYA / PMax

## 10. 下一步

如果继续执行，我建议按这个顺序：

1. 我先把 Google Ads Campaign / Ad Group / Keyword / Negative Keyword / RSA 文案整理成可直接建户的表
2. 再把 Yandex Direct 的 Campaign / Group / Keyword / Negatives / 文案整理成俄语版建户表
3. 最后补一份 `/en/oem` 与 `/ru/oem` 的首屏改稿清单，直接服务广告转化
