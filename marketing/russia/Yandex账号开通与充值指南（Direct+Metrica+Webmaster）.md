# Yandex 账号开通与充值指南（Direct + Metrica + Webmaster）

面向目标：你要投放俄罗斯（Yandex 搜索为主），并把询盘（RFQ/Telegram）作为主要转化。  
适用站点：你的网站为 Next.js 多语言站（含 `/ru/*`），且已有 GTM。

---

## 1) 开通前准备（强烈建议先做）

### 1.1 统一一个 Yandex ID（一个账号打通三套产品）
1) 注册/登录 Yandex ID：`https://passport.yandex.com/`  
2) 打开账号安全设置，开启二次验证（至少绑定手机号/验证方式）。  
3) 建议用“公司专用邮箱”注册，后续把账号给团队协作更清晰。

### 1.2 准备“可能会被要求上传的资料”（影响首充与投放速度）
Yandex Direct 首次创建/使用“付款方（payer）”时，可能要求提交身份/公司文件用于校验（不同国家/币种要求不同，以下为常见情况）：
- 个人：护照/身份证件扫描件  
- 公司：公司注册证明（营业执照/登记文件）、公司信息（名称/地址/税号如适用）

### 1.3 先确认你的网站承接链路是通的
- `/ru/contact` 表单可提交并跳转 `/ru/thank-you`
- 你要用 Telegram 承接：准备一个对外账号（如 `@aierxuan_sales_ru`）+ 内部群（RU-Leads）

---

## 2) 开通 Yandex Metrica（埋点与转化统计）

官方快速开始：
- `https://yandex.com/support/metrica/en/quick-start`
- 创建与安装 Tag：`https://yandex.com/support/metrica/en/general/creating-counter`
- 检查 Tag 是否安装成功：`https://yandex.ru/support/metrica/en/general/check-counter`
- JS 事件目标（适合 SPA/URL 不变的动作）：`https://yandex.ru/support/metrica/ru/general/goal-js-event`

### 2.1 创建 Tag（Counter）
1) 进入 Metrica：`https://metrica.yandex.com/`（登录 Yandex ID）  
2) `Add tag` / `Добавить счётчик`  
3) 填写：
   - Site URL：填主域名（不要带 `https://`；可不填具体路径）
   - Time zone：建议选你团队常用时区（方便报表复盘）
   - 可选：Session Replay/Webvisor、Scroll map 等
4) 创建后复制 Tag 代码（Counter ID 会用到）

### 2.2 安装 Tag（推荐两种方式）
方式 A（推荐）：通过 GTM 安装  
1) GTM 新建 Tag：Custom HTML  
2) 粘贴 Metrica 代码  
3) Trigger：All Pages  
4) 发布

方式 B：直接写进站点 `<head>`（适合不用 GTM 时）  
把 Metrica 代码放到 Next.js 布局里（例如你站点的根布局组件），确保所有语言页面都加载。

### 2.3 设置 Goals（你这个业务建议至少 3 个）
1) **RFQ 成功**：访问 `/{lang}/thank-you`（例如 `/ru/thank-you`）  
   - 目标类型：Pageview / Посещение страниц
2) **Telegram 点击**（建议）  
   - 目标类型：JavaScript 事件（或点击链接目标，取决于你的实现）
3) **关键页面访问**（辅助优化投放）  
   - `/ru/oem`、`/ru/products?category=gaming`、`/ru/contact`

### 2.4 验证是否收数
1) Metrica → Settings → Check for tag（或类似功能）  
2) 输入 `https://aierxuanlaptop.com/ru/` 检查是否检测到 Tag  
3) 常见原因：被广告拦截插件阻止、代码加载太晚、只在部分页面加载

---

## 3) 开通 Yandex Webmaster（收录、站点健康、提交 Sitemap）

官方快速开始：
- `https://yandex.ru/support/webmaster/ru/service/quick-start`
- 添加站点入口：`https://webmaster.yandex.ru/sites/add/`
- 确认站点权限（Owner）：`https://yandex.ru/support/webmaster/ru/service/rights`

### 3.1 添加站点
1) 进入 Webmaster → `Добавить сайт`  
2) 重要：填你希望参与搜索的“主版本”（二选一，不要乱填）
   - `https://aierxuanlaptop.com`（无 www）
   - 或 `https://www.aierxuanlaptop.com`（有 www）

### 3.2 验证站点所有权（推荐顺序）
优先级 1：HTML 文件（官方推荐，最稳）  
- 下载/创建 Webmaster 给你的验证文件，放到站点根目录可访问：  
  `https://aierxuanlaptop.com/<yandex_xxx>.html`
- Next.js 做法：把该文件放到项目 `public/` 目录下（部署后即可从根路径访问）

优先级 2：Meta tag（最快，适合你这种可控代码的站）  
- 把 meta tag 放进全站 `<head>`（建议放在 Next.js layout 的 metadata/head）

优先级 3：DNS TXT  
- 有域名 DNS 权限时可用（生效时间受 DNS 缓存影响）

### 3.3 提交 sitemap 与检查
你站点已有 `https://aierxuanlaptop.com/sitemap.xml`（代码里已配置）。  
在 Webmaster 里提交 sitemap 后，重点看：
- 抓取是否正常（HTTP 200 / 重定向是否合理）
- 重要页面是否进入索引（/ru/oem、/ru/products、/ru/contact）

---

## 4) 开通 Yandex Direct（投放）

核心概念：Direct 用的是“Shared account（ общий счёт ）”统一余额。  
官方说明：
- Shared account：`https://yandex.com/support/direct/payments/shared-account.html`
- 付款方式（国际版）：`https://yandex.com/support/direct/en/payments/payment-methods`
- 付款方式（俄罗斯版）：`https://yandex.ru/support/direct/ru/payments/payment-methods`
- 付款 FAQ（含 payer、VAT 等）：`https://yandex.com/support/direct/en/payments/faq`

### 4.1 创建 Direct 账号并选择国家/币种
1) 进入 Direct：`https://direct.yandex.com/`（或俄文界面 `https://direct.yandex.ru/`）  
2) 首次进入通常会要求你确认国家/币种/账户类型（不同地区可选项不同）

### 4.2 先“建一个最小 Campaign”，再去充值（常见坑）
很多人卡在“找不到 Top up/Пополнить”，原因是：
- 账号里没有任何 Campaign，按钮/入口不显示或路径不同  

建议：先建一个最小的搜索 Campaign（哪怕先暂停），再充值。

### 4.3 绑定 Metrica（用于转化优化与报表）
1) 在 Metrica 确认目标（至少有 `/ru/thank-you`）  
2) 在 Direct 里把 Campaign 关联到对应的 Metrica Counter  
3) 确保链接带参数（如 yclid/UTM），方便追踪来源

---

## 5) 充值/付款怎么做（以及“首充最容易踩的坑”）

### 5.1 充值入口在哪里？
在 Direct 里进入 Shared account：
- 通常在账号余额处点击 → `Пополнить / Top up`

官方指引：`https://yandex.com/support/direct/payments/shared-account.html`

### 5.1.1 你的场景：个人 payer + Visa/MasterCard（最短路径）
对应官方说明（不同国家可用方式不同，以该页为准）：  
- `https://yandex.com/support/direct/en/payments/payment-methods`

按最稳流程走（建议顺序）：
1) 用同一个 Yandex ID 登录 Direct（建议走 `direct.yandex.com` 入口，海外付款更常用）  
2) 先创建 1 个最小 Campaign（可先暂停）→ 目的是保证界面里出现 `Top up/Пополнить` 等入口  
3) 创建个人 payer：`Payments and documents` → `Payers` → `Create new payer` → 选 `Individual`  
4) 按界面提示上传身份证明（通常是护照/驾照扫描件，用于核验个人付款方；审核可能需要 1–5 天）  
5) 充值：Shared account → `Top up/Пополнить` → `Bank card` → 选择 Visa/MasterCard → 确认付款  
6) 首充通过后，再设置“日预算上限/策略”，避免 100 RMB/天被快速消耗

官方页面在部分国家/地区会提示：银行卡支付通常支持 Visa/MasterCard，但可能**不接受俄罗斯或白俄罗斯银行发行的卡**（以你账号所在国家/币种页面为准）。  

### 5.2 先创建/选择付款方（Payer），再付款（首充必经）
官方 FAQ（含 payer）：`https://yandex.com/support/direct/en/payments/faq`

常见路径（不同界面文案略有差异）：
1) Direct → `My campaigns`（我的广告系列）
2) 进入 `Payments and documents`（付款与文件）
3) 找到 `Payers`（付款方）→ `Create new payer`（创建）
4) 选择类型：个人 / 公司
5) 填写公司信息（名称、地址等），按提示上传文件（若要求）
6) 等待审核通过后，再进行充值（审核期可能 1–5 天，按页面提示为准）

### 5.2 常见可用的支付方式（以官方页面为准）
Direct 的支付方式会随“你的国家/账户类型/币种”变化，**不要听第三方文章一句话结论**，以官方 country selector 为准：  
- `https://yandex.com/support/direct/en/payments/payment-methods`

通常会遇到的两类：
1) **Bank card（银行卡）**：多为 Visa/MasterCard（部分国家会限制发卡地区）  
2) **Bank transfer（电汇/对公转账）**：生成 invoice，用网银/对公支付

### 5.3 用银行卡充值（通用流程）
1) Direct → Shared account → `Top up / Пополнить`  
2) 选 `Bank card` → 选择/新增卡  
3) 确认 payer（付款方）信息正确 → 支付  
4) 到账时间通常为实时或 15–60 分钟（但**首充可能要等 payer 审核**）

### 5.3.1 银行卡支付失败时的快速排查（按概率排序）
- 卡本身限制：跨境/线上支付未开启、3DS 验证失败、单笔限额不足
- 发卡行风控：把 Yandex 识别为“海外广告/数字服务”被拒（可联系银行放行一次）
- 卡地区限制：你的 Direct 国家/币种组合不接受某些发卡地区（见官方 payment methods 页）
- payer 未审核：首笔付款需要先通过身份核验，钱可能“支付成功但不到账/待审核”
- 浏览器问题：用无插件浏览器（避免拦截脚本），或换 Chrome/Edge 重试

如果 24 小时内仍不到账：优先在 Direct 的 `Payments and documents` 查看状态/提示；必要时改用 Bank transfer（电汇）最稳。

### 5.4 用电汇/对公转账充值（最稳、但到账慢）
1) Direct → Shared account → `Top up / Пополнить`  
2) 选 `Bank transfer / По счету` → `Issue invoice / Выставить счет`  
3) 下载/打印 invoice，按 invoice 提供的收款方信息在银行发起转账  
4) **务必在“用途/备注”填写 invoice 号**（否则很容易无法自动匹配）  
5) 到账通常 1–3 个工作日（取决于银行与跨境链路）

### 5.3 首充为什么常“扣了钱但余额没到”
高频原因：
- 需要先完成 payer 资料审核（上传身份证明/公司注册文件），资金会在审核后入账  
- 账单/付款方信息填错（名称/地址/税号等）导致付款无法自动匹配  
- 电汇没填 invoice 号（用途/备注缺 invoice 编号）

### 5.4 俄罗斯本地付款 vs 海外付款（重要提醒）
- 俄区页面会提到一些本地合规信息（如税号/ERIR 等），不一定适用于海外付款方  
- 海外投放通常走 `yandex.com` 的“Other countries”规则（可用外币与不同卡种/电汇）

如果你遇到“银行卡无法支付/无法创建 payer/无法选择国家”等情况，最稳的解决路线通常是：
- 走 **Bank transfer（电汇）**  
- 或通过 **Yandex 官方/正规代理**代投代充值（不建议用来路不明的充值平台）

### 5.5 “避坑”付款清单（你按这个做，首充成功率最高）
- 先建一个最小 Campaign（可暂停）→ 再去找 `Top up / Пополнить`
- payer 信息（公司英文名/地址）保持与银行资料一致（避免风控/退回）
- 首充尽量用公司对公电汇（如果银行卡失败）
- 电汇务必带 invoice 号；金额必须与 invoice 一致（避免人工对账）
- 留出审核时间：不要指望“当天注册当天起量”，首周按“跑通链路”预期

---

## 6) 避坑清单（按你这个业务场景）

### 6.1 Metrica 常见坑
- 只在部分页面装了 Tag → 数据断层（你的站是多语言路由，必须全站加载）  
- 被 AdBlock 拦截 → 用无插件浏览器验证  
- SPA 事件没法用 URL 识别 → 用 `/ru/thank-you` 这种“明确落地页”做目标最稳

### 6.2 Webmaster 常见坑
- 验证文件放了但访问 404（CDN/重定向/部署路径问题）  
- 选错主版本（http vs https、www vs non-www）导致数据分裂  
- 服务器对 YandexBot 返回非 200（或被 WAF/防火墙拦）  

### 6.3 Direct 常见坑（预算小尤其致命）
- Search 和 RSYA 混在一起 → 预算被展示流量吃光（你应先只做 Search 高意图）  
- 不加否定词 → “游戏本”会引来大量 C 端搜索（评测/下载/维修）  
- 没有转化目标 → 后续无法做有效优化与归因  

---

## 7) 30 分钟快速 Checklist（照着做就能跑起来）

1) ✅ Yandex ID 可登录（开 2FA）  
2) ✅ Metrica Tag 已装到全站（GTM 或代码）  
3) ✅ Metrica Goals 至少有：`/ru/thank-you`  
4) ✅ Webmaster 添加站点 + 验证 owner + 提交 `https://aierxuanlaptop.com/sitemap.xml`  
5) ✅ Direct 先创建 1 个最小 Campaign（可暂停）  
6) ✅ Direct 创建 payer（公司/个人）并完成审核（首充卡点）  
7) ✅ Direct 充值（优先电汇/对公；银行卡失败就换电汇或正规代理）  
8) ✅ Campaign 绑定 Metrica Counter，确保 UTM/yclid 能追踪  

---

## 8) 充值方式补充说明（来自官方规则的关键点）

- **付款方式按国家变化**：以 `https://yandex.com/support/direct/en/payments/payment-methods` 的国家选择器为准。  
- **银行卡限制**：官方文档提到，部分国家/地区的卡支付会排除“俄罗斯或白俄罗斯银行发行的卡”（不同国家规则不同）。  
- **自动充值（Autopayment）并非所有地区可用**：官方说明中提到它通常只对特定地区/币种开放（例如卢布账户）。  
