# generate_lead 追踪修复规格书（Day 1 头号阻塞）

> 日期：2026-05-31｜责任：开发 / 增长黑客（GTM 配置）+ 运营（验收）
> 目标：让官网每一条询盘都能在 GA4 里以 `generate_lead` 事件被记录，并标记为关键事件（Key Event），打通"流量→线索→询盘"归因。
> 现状：GA4 `generate_lead` = 0（来自 `seo/aierxuan-keyword-map-2026-05-25.md`）。

---

## 1. 根因诊断（已查代码，结论明确）

查了 `aierxuanlaptop.com` 仓库埋点链路，根因是 **GA4 接收端缺失 + 一个表单未埋点**，不是埋点函数本身坏：

| 环节 | 现状 | 判断 |
|---|---|---|
| dataLayer push `generate_lead` | ✅ 有。`src/lib/ads-tracking.ts:57` `pushDataLayerEvent('generate_lead', …)` | 正常 |
| RFQForm 调用埋点 | ✅ 有。`src/components/forms/RFQForm.tsx:140` 成功后调 `trackLeadFormSubmit` | 正常 |
| GTM 容器加载 | ✅ 有。`NEXT_PUBLIC_GTM_ID=GTM-T3NJ8X84`（`layout.tsx:65/72`） | 正常 |
| **GA4 配置** | ❌ **代码里没有任何 GA4 Measurement ID（G-xxxxxxx）**。env 只有 `GOOGLE_ADS_ID=AW-1000630085`（这是 Google Ads，不是 GA4） | **主因①** |
| **GA4 接收 generate_lead** | ❌ 推测 GTM 容器内没有「GA4 Event 标签（触发器=Custom Event `generate_lead`）」把 dataLayer 事件转发给 GA4 | **主因②** |
| ContactModal（全站浮窗询盘） | ❌ **完全没埋点**。`src/components/ui/ContactModal.tsx` 提交后 fetch 发邮件，但从不调用 `trackLeadFormSubmit` | **主因③（代码漏洞）** |

**一句话**：表单已经把 `generate_lead` 喊进了 dataLayer，但 **GTM 里没人把它转给 GA4**（缺 GA4 标签/容器未发布），而且 **浮窗那条询盘渠道根本没喊**。所以 GA4 收到 0 条。

---

## 2. 修复改动清单（分两类）

### A. GTM 容器配置（主修，无需改仓库代码，需 GTM 编辑权限）

> 这部分增长黑客/SEO 专家可直接在 GTM 后台做。**改完必须「发布 Publish」容器，否则线上不生效。**

1. **拿到 / 确认 GA4 Measurement ID**：GA4 property `a373612252p511285255`（来自关键词地图）→ 在 GA4 后台「管理 → 数据流」取 `G-XXXXXXXXXX`。
2. **建 GA4 Configuration 标签**（若容器内尚无）：标签类型 = Google 代号「Google 跟踪代码：GA4 配置」，填上 G- ID，触发器 = All Pages / Initialization。
3. **建 GA4 Event 标签：`generate_lead`**：
   - 标签类型：GA4 Event
   - Configuration：引用上面的 GA4 配置标签
   - Event Name：`generate_lead`
   - Event Parameters（从 dataLayer 取，变量名见 §3）：`form_type`、`lead_type`、`language`、`product_interest`、`urgency`、`source`、`page_location`、`value`、`currency`
   - **触发器**：新建「自定义事件」触发器，事件名 = `generate_lead`
4. （建议）**同建 `rfq_submit` 触发器/标签**做冗余信号；并把 thank-you 页的 `thank_you_view` 作为兜底转化（防止表单成功后跳转打断主事件）。
5. **GA4 后台标记关键事件**：管理 → 事件 / 关键事件 → 把 `generate_lead` 打开为 Key Event（转化）。
6. **Google Ads 转化**：当前 `trackThankYouView` 已用 `send_to=AW-1000630085/WkULCKmYx6UZEMXOkd0D` 上报 Ads 转化（`ads-tracking.ts:69`）。确认该 Ads 转化动作有效即可，与 GA4 `generate_lead` 并行不冲突。

### B. 仓库代码改动（小，需开发改）

> 只有一处必改 + 两处增强。涉及文件已定位。

**B1（必改）给 ContactModal 补埋点** —— 否则全站浮窗这条询盘渠道永远隐形：
- 文件：`src/components/ui/ContactModal.tsx`
- 改动：`import { trackLeadFormSubmit } from '@/lib/ads-tracking'`；在提交 **成功分支**（`submitStatus==='success'` 那一步之后）调用：
  ```ts
  trackLeadFormSubmit({ lang, source: 'contact_modal', productInterest: /* 该弹窗的产品/主题，若无填 'general' */ })
  ```
  使 RFQForm 与 ContactModal 两条询盘渠道都产出 `generate_lead`，且用 `source` 区分。

**B2（建议）给 lead 加金额参数**，便于 GA4/Ads 给转化估值：
- 文件：`src/lib/ads-tracking.ts` `trackLeadFormSubmit` 的 `eventPayload`
- 改动：加 `value: 1, currency: 'USD'`（B2B 线索可先给名义值 1，后续按 L2 质量再细分）。

**B3（建议）防跳转打断**：
- 文件：`src/components/forms/RFQForm.tsx:152-156`
- 现状：成功后 setTimeout 2s 再 `router.push('/thank-you')`。dataLayer push 是同步的、GTM afterInteractive 已加载，正常能赶在跳转前发出；**但保险起见**确认 GTM 这两个标签不依赖页面停留，或把跳转延时保留 ≥1.5s（当前 2s 足够，无需改，验收时确认即可）。

---

## 3. dataLayer 字段对照（GTM 变量按此建 DLV）

`trackLeadFormSubmit` 推入 dataLayer 的结构（`ads-tracking.ts:46-57`）：

```js
dataLayer.push({
  event: 'generate_lead',   // 也会同时 push 'rfq_submit'
  form_type: 'rfq',
  lead_type: 'rfq',
  language: '<en|ru|ja|…>',
  product_interest: '<产品/unknown>',
  urgency: '<normal|urgent|flexible>',
  source: '<rfq_form|contact_modal>',
  page_location: '<完整URL>',
  // B2 后新增：value:1, currency:'USD'
})
```

在 GTM 建对应的「数据层变量（DLV）」：`form_type / lead_type / language / product_interest / urgency / source / page_location / value / currency`，挂到 GA4 Event 标签参数上。

---

## 4. 验收步骤（运营 Day 6 验收，必须全绿）

1. GTM「预览 Preview」模式打开 `aierxuanlaptop.com`。
2. 提交一次 RFQ 表单 → Tag Assistant 里看到 `generate_lead` 标签 Fired，参数齐全。
3. 触发全站浮窗 ContactModal 提交一次 → 同样看到 `generate_lead` Fired，且 `source=contact_modal`（验证 B1）。
4. GA4 → DebugView：看到两条 `generate_lead` 事件，参数正确。
5. GA4 → 实时 Realtime：`generate_lead` 计数 +2。
6. 确认 GA4 已把 `generate_lead` 标为关键事件。
7. **GTM 发布容器**（最容易漏的一步），线上复测一次真实提交。

---

## 5. 需要协调谁

| 事项 | 谁 | 缺什么 |
|---|---|---|
| GTM 容器编辑 + 发布 | 增长黑客 / SEO 专家 | GTM-T3NJ8X84 编辑权限 |
| GA4 Measurement ID + 标关键事件 | 增长黑客 / 运营 | GA4 property 管理权限 |
| ContactModal / ads-tracking 代码改 (B1/B2) | 开发 | 仓库 PR |
| 验收 | 运营 | GTM Preview + GA4 DebugView 访问 |

> 这是埋点/配置问题，**核心在 GTM 后台（A 部分），仓库只需一个小 PR（B1）**。不阻塞 W1 其他不花钱基建并行推进。
