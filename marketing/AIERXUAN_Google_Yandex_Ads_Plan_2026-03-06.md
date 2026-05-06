# AIERXUAN Google + Yandex 广告投放计划

更新日期：2026-03-06

## 1. 当前审计结论

### 1.1 账户现状

- Google Ads 已有账户：`443-435-6759`
- Google Ads 当前状态：**账户已取消（cancelled）**，需要先点击 `Reactivate`
- Google Ads 当前 Campaign 数：`0`
- Google Ads 当前已存在 1 个网站转化动作：`发送询盘`
- Google Ads 该转化动作状态：`Needs attention`
- Yandex Direct 账户 `yangxb919` 可登录
- Yandex Direct 当前余额：`100.00 $`
- Yandex Direct 当前 Campaign 数：`0`
- Yandex Direct `Conversions` 页当前未看到已接入的站内转化来源

### 1.2 站点现状

- 生产站 `https://aierxuanlaptop.com/ru/contact` 可正常打开
- 生产站 `https://aierxuanlaptop.com/ru/oem` 当前返回 `HTTP 500`
- 这个问题会直接浪费 Yandex / Google 搜索广告点击
- 线上页面已加载：
  - Google Tag Manager：`GTM-T3NJ8X84`
  - Yandex Metrica Counter：`106511138`
- 但代码里原本没有明确的广告事件打点：
  - 无明确 Google Ads conversion event 调用
  - 无明确 Yandex `reachGoal` 调用

### 1.3 数据现状

- GA4 近 28 天数据极少，只有约 1 个 session 级别样本
- 这意味着前期不能靠“历史转化率”优化
- 前 2-4 周必须先看：
  - 搜索词质量
  - 微转化
  - 表单提交
  - Telegram 点击
  - 有效询盘率

## 2. 我已完成的执行项

我已在网站代码里补上广告追踪基础设施，但**还未部署到生产环境**：

- `rfq_submit`
  - 表单提交成功时推送到 `dataLayer`
  - 同时发送 Yandex `reachGoal`
- `generate_lead`
  - 表单提交成功时同步推送到 `dataLayer`
- `telegram_click`
  - 俄语页 Telegram 悬浮按钮点击时推送到 `dataLayer`
  - 同时发送 Yandex `reachGoal`
- `thank_you_view`
  - 感谢页访问时推送到 `dataLayer`
- 本地已修复 `/ru/oem` 的字典映射问题，项目可成功构建

相关文件：

- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/src/lib/ads-tracking.ts`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/src/components/forms/RFQForm.tsx`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/src/components/ui/TelegramFloatingButton.tsx`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/src/components/thank-you/ThankYouTracking.tsx`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/src/app/[lang]/thank-you/page.tsx`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/src/app/[lang]/oem/page.tsx`

## 3. 先决条件

在正式开启广告前，先做这 5 件事：

1. 部署最新网站代码，确保 `/ru/oem` 不再报 500
2. 在 Google Ads 中重新激活账户
3. 在 GTM 中把 `rfq_submit` / `generate_lead` / `telegram_click` 配成触发器
4. 在 Yandex Metrica 中建立 JS goals：
   - `rfq_submit`
   - `telegram_click`
5. 在 Yandex Direct `Conversions from site` 中接入对应 Metrica goals

如果以上 5 件没完成，不建议放量。

## 4. Google Ads 投放计划

### 4.1 渠道选择

第一阶段只做 `Google Search`，不建议一开始上：

- Performance Max
- Display
- Discovery
- YouTube

原因：

- 当前站点流量极低
- 转化样本不足
- PMax 会把预算过快打散，难以控词

### 4.2 地区建议

首批测试地区：

- United States
- Canada
- United Kingdom
- Germany
- UAE

如果预算更紧，只先跑：

- United States
- Canada

### 4.3 语言建议

- 英语 Campaign：主力
- 俄语 Campaign：优先放在 Yandex，不建议先在 Google 俄语流量重投

### 4.4 Campaign 结构

建议第一阶段只开 3 个 Search Campaign：

#### Campaign A：OEM Laptop

意图：找 OEM/ODM 笔记本工厂

Ad Groups：

- `oem laptop manufacturer`
- `odm laptop manufacturer`
- `custom laptop manufacturer`
- `white label laptop`

#### Campaign B：Mini PC Manufacturer

意图：找 mini pc 工厂/供应商

Ad Groups：

- `mini pc manufacturer`
- `industrial mini pc manufacturer`
- `mini pc oem`
- `mini pc odm`

#### Campaign C：Brand + Factory Credibility

意图：品牌词和高信任词

Ad Groups：

- `aierxuan`
- `aierxuan laptop`
- `shenzhen laptop manufacturer`
- `laptop factory china`

### 4.5 匹配方式

第一阶段以这两类为主：

- Phrase Match
- Exact Match

不建议一开始大量使用 Broad Match。

### 4.6 Google 关键词优先级

基于 2026-03-06 的 DataForSEO（US）：

- `mini pc manufacturer`
  - Search volume：`50`
  - Competition：`HIGH`
  - CPC：约 `$0.92`
- `white label laptop`
  - Search volume：`20`
  - Competition：`MEDIUM`
  - CPC：约 `$0.20`
- `oem laptop manufacturer`
  - Search volume：`10`
  - Competition：`LOW`
  - 交易意图：`transactional`
- `odm laptop manufacturer`
  - Search volume：`10`
  - Competition：`LOW`
- `custom laptop manufacturer`
  - Search volume：`10`
  - Competition：`LOW`

结论：

- `mini pc manufacturer` 量最大，但竞争明显更高
- `oem/odm/custom` 虽量小，但意图更纯、更适合 B2B 早期测试
- 第一阶段不要追泛词 `laptop` / `mini pc`，会烧掉预算

### 4.7 Google 广告文案方向

核心卖点统一：

- OEM/ODM Manufacturer in Shenzhen
- MOQ from 50 / 100
- Custom Logo / Packaging / Specs
- Sample Available
- 7-15 Day Lead Time
- Factory Direct Pricing

RSA 标题建议池：

- OEM Laptop Manufacturer
- ODM Laptop Factory
- Mini PC Manufacturer
- Custom Laptop Solutions
- Private Label Laptop Supplier
- MOQ From 50/100 Units
- Factory Direct Pricing
- Sample Available
- Fast Lead Time 7-15 Days
- OEM/ODM for Global Brands

描述建议池：

- Launch custom laptops and mini PCs with your own brand, packaging and configuration.
- Factory-direct OEM/ODM production with sample support, flexible MOQ and global shipping.
- Send your specs and get a quotation within 24 hours.

### 4.8 Google 落地页

优先级：

1. `/ru/oem` 修复并部署后，仅供俄语流量
2. 英语流量使用 `/en/oem`
3. 暂时替代页：`/ru/contact` 或 `/en/contact`

不建议把英文搜索广告直接送到俄语页。

### 4.9 Google 否定词

第一批就加：

- review
- reviews
- reddit
- driver
- drivers
- repair
- used
- second hand
- cheap retail
- amazon
- ebay
- best laptop
- gaming review
- benchmark
- wallpaper

每 3 天看一次搜索词报告，持续补否定词。

### 4.10 Google 预算

测试期 14 天：

- Campaign A：`$12/day`
- Campaign B：`$12/day`
- Campaign C：`$6/day`

合计：`$30/day`

如果预算更谨慎，可先 `US only + $15/day`：

- OEM Laptop：`$6/day`
- Mini PC：`$6/day`
- Brand/Credibility：`$3/day`

### 4.11 Google 出价

第 1 阶段：

- 如果转化还不稳定：`Maximize Clicks` + CPC ceiling
- 如果转化已开始回流：切到 `Maximize Conversions`

不要一开始就上 `Target CPA`。

## 5. Yandex Direct 投放计划

### 5.1 当前结论

- 账户已准备好，有余额
- 但还没有任何 Campaign 真正在跑
- 转化源也还没接起来
- 因此当前不是“投放效果不好”，而是“尚未真正开始”

### 5.2 渠道策略

第一阶段只做：

- Yandex Search

不建议首月做：

- YAN 广告网络
- 大范围再营销
- 自动扩量

### 5.3 Campaign 结构

建议先建 3 个 Search Campaign：

#### Campaign RU-01：Gaming OEM/ODM

来源可直接沿用你现有文档里的关键词：

- игровые ноутбуки oem
- игровой ноутбук oem
- производство игровых ноутбуков
- игровой ноутбук под своим брендом
- игровые ноутбуки под брендом
- игровые ноутбуки оптом производитель
- производитель игровых ноутбуков китай
- oem gaming laptop
- gaming laptop oem
- gaming laptop manufacturer

#### Campaign RU-02：Mini PC OEM/ODM

- мини пк oem
- производство мини пк odm
- мини пк оптом производитель
- неттопы под брендом
- мини компьютер для бизнеса оптом

#### Campaign RU-03：Marketplace / Seller Intent

- для Ozon / Wildberries / Яндекс.Маркет 卖家
- private label / под своим брендом
- оптом / производитель / поставщик

### 5.4 Yandex 否定词

沿用你已有词表，并建议作为首批全局否定词：

- б/у
- бу
- авито
- ремонт
- сервис
- драйвер
- скачать
- установка
- прошивка
- обзор
- рейтинг
- тест
- сравнение
- отзывы

保留，不要轻易否定：

- ozon
- wildberries
- маркетплейс
- селлер
- поставщик

### 5.5 Yandex 落地页

在 `/ru/oem` 生产修复前：

- 所有俄区广告统一先导向 `/ru/contact`

修复上线后再切换：

- Gaming OEM/ODM -> `/ru/oem`
- Mini PC OEM/ODM -> `/ru/oem`
- Seller/Marketplace -> `/ru/oem` 或专门俄语 seller landing page

### 5.6 Yandex 预算

根据你现有台账，先按 `100 元/天` 是合理的。

建议分配：

- Gaming OEM/ODM：`45 元/天`
- Mini PC OEM/ODM：`35 元/天`
- Marketplace / Seller：`20 元/天`

### 5.7 Yandex 文案方向

主文案继续沿用你现有模板即可，重点强化：

- MOQ
- Private Label
- Sample Available
- 交期
- 认证
- EAC / 出口支持
- 适合 Ozon / Wildberries 卖家

### 5.8 Yandex 出价与节奏

第 1 周：

- 手动或保守自动策略
- 先拿真实搜索词
- 不追求点击量，先看词是否精准

第 2 周：

- 依据搜索词报告删词/补词
- 只保留有停留、有 Telegram 点击、有表单的词组

第 3-4 周：

- 逐步扩词
- 再考虑 retargeting

## 6. 转化与归因方案

### 6.1 站内事件命名

建议统一使用：

- `rfq_submit`
- `generate_lead`
- `telegram_click`
- `thank_you_view`

### 6.2 GTM 配置建议

在 GTM 新建：

1. Custom Event Trigger：`rfq_submit`
2. Custom Event Trigger：`generate_lead`
3. Custom Event Trigger：`telegram_click`
4. 可选：Page View Trigger for `/thank-you`

然后把 Google Ads 的转化动作 `发送询盘` 绑到：

- `rfq_submit`

如果你希望把 Telegram 也纳入优化：

- 新建第二个 Google Ads 转化：`Telegram Click`

### 6.3 Yandex Metrica 配置建议

在 Metrica 建立 JS event goals：

- `rfq_submit`
- `telegram_click`

然后在 Yandex Direct 的 `Conversions from site` 里接入这两个 goal。

### 6.4 UTM 规范

Google Ads：

- `utm_source=google`
- `utm_medium=cpc`
- `utm_campaign={campaign}`
- `utm_content={adgroup_or_ad}`
- `utm_term={keyword}`

Yandex：

- `utm_source=yandex`
- `utm_medium=cpc`
- `utm_campaign={campaign}`
- `utm_content={ad_id}`
- `utm_term={keyword}`

## 7. 14 天执行节奏

### Day 1-2

- 部署修复版网站
- Reactivate Google Ads
- GTM 建立 3 个自定义事件触发器
- Yandex Metrica 建立 2 个 JS goals
- Yandex Direct 接入 conversion sources

### Day 3-4

- 上线 Google Search 3 个 Campaign
- 上线 Yandex Search 3 个 Campaign
- 所有广告带 UTM

### Day 5-7

- 查看搜索词报告
- 删除泛词
- 补否定词
- 观察：
  - 表单提交
  - Telegram 点击
  - thank-you page

### Day 8-10

- 暂停无效 ad group
- 把预算向高意图 ad group 集中
- 优化广告标题与描述

### Day 11-14

- 对有点击无转化词降价
- 对有 Telegram / RFQ 的词提价
- 判断是否进入第二阶段扩量

## 8. KPI 目标

测试期先看质量，不先看大盘量：

- CTR：Google `> 4%`，Yandex `> 5%`
- 表单提交：每周至少 `2-5` 次真实线索
- Telegram 点击：每周至少 `5-15` 次
- 搜索词否定词新增：每周 `20-50` 个
- 无效词预算占比：第 2 周降到 `30%` 以下

## 9. 对你现有 Yandex 方案的改进建议

你原来的俄区文档方向是对的，但要改这几项：

1. 不要再把主承接页默认写成 `/ru/oem`，在生产修复前必须改成 `/ru/contact`
2. 台账文件目前更像模板，缺少真实投放回填，后续必须按天记录：
   - 展现
   - 点击
   - CTR
   - CPC
   - Telegram 点击
   - RFQ 提交
   - 有效询盘数
3. Yandex Direct 当前不是“效果差”，而是“Campaign 还没真正创建”
4. Yandex Direct `Conversions from site` 需要尽快接上 Metrica goals，否则无法优化
5. Marketplace 相关词建议单独成 Campaign，不要和 OEM 泛词混投

## 10. 当前最重要的结论

- 现在最核心的问题不是“怎么扩量”，而是“基础投放链路还没闭环”
- Google Ads 账户需要重新激活
- Yandex Direct 账户虽然有余额，但当前没有 Campaign
- 生产环境 `/ru/oem` 报 500，是最直接的广告浪费点
- 转化追踪原来不完整，我已经把代码侧事件补上，但还需要你在 GTM / Metrica / Ads 后台完成映射

## 11. 建议的下一步

优先顺序：

1. 部署我刚修的代码
2. 我继续帮你检查并配置 GTM / Google Ads conversion mapping
3. 我继续帮你在 Yandex Direct 里把第一个 Search Campaign 建出来
4. 我帮你把现有 `俄罗斯投放_100元每天_预算与KPI台账.xlsx` 改成可直接回填的日监控表
