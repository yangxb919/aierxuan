# Claude Code 综合任务：俄语页面优化 + Telegram 按钮 + 广告准备

## 任务概述
在本地完成以下所有修改，然后统一上传到 VPS 部署。

---

## 网站技术栈信息
- **框架**: Next.js (App Router)
- **语言路由**: `/[lang]/` 模式
- **支持语言**: en, ru, ja, fr, pt, zh-CN
- **项目路径**: `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website`
- **俄语词典**: `src/dictionaries/ru.json`
- **内容文件**: `src/content/*.ts`

---

## Telegram 信息
- **用户名**: @aierxuan_russia
- **链接**: https://t.me/aierxuan_russia

---

# 第一部分：添加 Telegram 联系按钮

## 任务 1.1：Footer 添加 Telegram 社交图标（仅俄语）

**文件**: `src/components/layout/Footer.tsx`

**修改位置**: 第 51-65 行（Social Links 区域）

**修改内容**:
1. 添加 `lang` 参数的判断
2. 在 Social Links 中添加 Telegram 图标（仅当 `lang === 'ru'`）

**参考代码**:
```tsx
{/* Social Links */}
<div className="flex space-x-4">
  {/* 现有的 LinkedIn 和 Twitter 图标保持不变 */}

  {/* Telegram - 仅俄语显示 */}
  {lang === 'ru' && (
    <a
      href="https://t.me/aierxuan_russia"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[#0088cc] transition-colors"
    >
      <span className="sr-only">Telegram</span>
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    </a>
  )}
</div>
```

---

## 任务 1.2：FloatingCTAButton 添加 Telegram 选项（仅俄语）

**文件**: `src/components/ui/FloatingCTAButton.tsx`

**修改内容**:

### 步骤 A: 在 translations 对象添加 Telegram 文案

在第 8-33 行的 `translations` 对象中，为 `ru` 添加 telegram 字段：

```typescript
ru: {
  getQuote: 'Получить предложение',
  requestSample: 'Запросить образец',
  telegram: 'Telegram чат'  // 新增
},
```

### 步骤 B: 在展开菜单中添加 Telegram 按钮

在第 76-94 行的展开菜单区域，在 "Request Sample" 按钮后添加：

```tsx
{/* Telegram button - 仅俄语显示 */}
{language === 'ru' && (
  <a
    href="https://t.me/aierxuan_russia"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => setIsExpanded(false)}
    className="bg-white text-[#0088cc] px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base hover:scale-105 border-2 border-[#0088cc] flex items-center space-x-2"
    aria-label={t.telegram || 'Telegram'}
  >
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
    <span>💬 {t.telegram || 'Telegram'}</span>
  </a>
)}
```

---

## 任务 1.3：创建独立 Telegram 浮动按钮（左下角）

**新建文件**: `src/components/ui/TelegramFloatingButton.tsx`

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/store/useAppStore'

export function TelegramFloatingButton() {
  const language = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  // 仅在俄语页面显示
  if (language !== 'ru') return null

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', toggleVisibility)
    // 初始检查
    toggleVisibility()
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <a
      href="https://t.me/aierxuan_russia"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 bg-[#0088cc] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:bg-[#006699] animate-pulse"
      aria-label="Связаться в Telegram"
      title="Telegram: @aierxuan_russia"
    >
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    </a>
  )
}
```

**引入位置**: 在 `src/app/[lang]/layout.tsx` 中引入并使用该组件

---

## 任务 1.4：更新俄语词典添加 Telegram 联系方式

**文件**: `src/dictionaries/ru.json`

**修改位置**: `footer.contact` 部分（第 620-625 行附近）

**修改内容**:
```json
"contact": {
  "title": "Контактная информация",
  "email": "admin@aierxuanlaptop.com",
  "phone": "4008-8228-058",
  "address": "Район Longgang, Шэньчжэнь, Китай",
  "telegram": "@aierxuan_russia"
}
```

同时在 `faq.contact` 部分（第 1077-1085 行）添加 Telegram：
```json
"contact": {
  "title": "Не нашли ответ?",
  "subtitle": "Свяжитесь с нашей командой для получения персональной консультации",
  "contactButton": "Связаться с нами",
  "emailLabel": "Электронная почта",
  "emailValue": "admin@aierxuanlaptop.com",
  "phoneLabel": "WhatsApp",
  "phoneValue": "+86 182 1908 3671",
  "telegramLabel": "Telegram",
  "telegramValue": "@aierxuan_russia"
}
```

---

# 第二部分：俄语落地页优化

## 任务 2.1：OEM 页面添加电商卖家专属内容

**文件**: `src/dictionaries/ru.json`

**修改位置**: `oem.services` 部分

**新增内容** - 在 `oem.services` 中添加针对 Ozon/Wildberries 卖家的说明：

```json
"marketplace": {
  "title": "Для продавцов на маркетплейсах",
  "subtitle": "Ozon, Wildberries, Яндекс.Маркет",
  "description": "Специальные условия для селлеров: готовые карточки товаров, быстрая поставка, private label.",
  "features": [
    "Готовые фото и описания для карточек",
    "Логистика до склада маркетплейса",
    "Private Label — ваш бренд",
    "Поддержка с сертификацией EAC"
  ]
}
```

---

## 任务 2.2：联系页面强化 B2B 信息

**文件**: `src/dictionaries/ru.json`

**修改位置**: `contact` 部分

**优化内容** - 添加样机政策和快速响应承诺：

```json
"contact": {
  "title": "Свяжитесь с нами",
  "subtitle": "Свяжитесь с нашей командой для персонализированных решений",
  "description": "Готовы обсудить ваш проект? Наши эксперты ответят в течение 2 часов в рабочее время.",
  "samplePolicy": {
    "title": "Политика образцов",
    "description": "Образцы доступны по запросу. Стоимость образца может быть возвращена при заказе от 100 единиц.",
    "note": "Цена образца зависит от конфигурации"
  },
  "responseTime": {
    "title": "Время ответа",
    "value": "В течение 2 часов (рабочее время GMT+8)"
  },
  "telegram": {
    "label": "Telegram",
    "value": "@aierxuan_russia",
    "note": "Быстрая связь на русском языке"
  }
}
```

---

## 任务 2.3：首页 Hero 优化（针对 B2B）

**文件**: `src/dictionaries/ru.json` 或 `src/content/hero.ts`

**当前内容**: 已经有好的 B2B 描述

**建议优化** - 更强调俄罗斯市场：

```json
"hero": {
  "slides": [
    {
      "title": "Профессиональный Производитель Ноутбуков и Мини-ПК",
      "subtitle": "OEM/ODM Решения для Российских Партнеров",
      "description": "✓ MOQ от 100 единиц  ✓ Доставка 7-15 дней  ✓ Русская клавиатура  ✓ Поддержка сертификации EAC  ✓ Telegram: @aierxuan_russia"
    }
  ]
}
```

---

# 第三部分：广告 Campaign 配置准备

## 任务 3.1：创建 Yandex Direct Campaign 配置文件

**新建文件**: `marketing/russia/yandex_campaign_config.md`

此文件已有广告素材，但需要整理成可直接复制到 Yandex Direct 的格式。

**Campaign 结构**:

```
Campaign 名称: RU_Search_GamingLaptop_OEM
├── Ad Group 1: Gaming OEM/ODM
│   ├── 关键词: 11个 (见下方)
│   ├── 广告文案: 模板A
│   └── 落地页: /ru/oem?utm_source=yandex&utm_medium=cpc&utm_campaign=gaming_oem
│
├── Ad Group 2: Mini PC OEM
│   ├── 关键词: 5个
│   ├── 广告文案: 模板B
│   └── 落地页: /ru/oem?utm_source=yandex&utm_medium=cpc&utm_campaign=mini_pc
│
└── Ad Group 3: Marketplace Sellers
    ├── 关键词: 3个
    ├── 广告文案: 模板D
    └── 落地页: /ru/oem?utm_source=yandex&utm_medium=cpc&utm_campaign=marketplace
```

---

# 第四部分：部署准备

## 任务 4.1：本地构建测试

在 Claude Code 中执行：

```bash
cd /Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website

# 安装依赖（如有需要）
npm install

# 本地构建测试
npm run build

# 本地预览（可选）
npm run start
```

检查：
- 构建是否成功
- 俄语页面 `/ru` 是否正常显示
- Telegram 按钮是否正确显示

---

## 任务 4.2：上传到 VPS

构建成功后，使用以下命令上传到 VPS：

```bash
# 方式1：直接 SSH + rsync（推荐）
rsync -avz --delete \
  /Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/ \
  user@your-vps-ip:/path/to/website/

# 方式2：如果使用 Git
cd /Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website
git add .
git commit -m "feat(ru): 添加 Telegram 联系按钮，优化俄语落地页"
git push origin main

# 然后在 VPS 上拉取并重新部署
ssh user@your-vps-ip "cd /path/to/website && git pull && npm run build && pm2 restart all"
```

---

# Claude Code 一键执行提示词

复制以下内容到 Claude Code 执行：

```
请帮我完成以下网站修改任务（俄罗斯市场推广）：

项目路径: /Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website
Telegram: @aierxuan_russia (https://t.me/aierxuan_russia)

=== 第一部分：Telegram 按钮 ===

【1.1】修改 src/components/layout/Footer.tsx
- 在 Social Links 区域添加 Telegram 图标
- 仅当 lang === 'ru' 时显示
- 使用 Telegram 品牌色 #0088cc

【1.2】修改 src/components/ui/FloatingCTAButton.tsx
- 在 translations.ru 添加: telegram: 'Telegram чат'
- 在展开菜单添加 Telegram 按钮（仅俄语）

【1.3】新建 src/components/ui/TelegramFloatingButton.tsx
- 创建独立浮动按钮，固定左下角
- 仅俄语页面显示
- 在 src/app/[lang]/layout.tsx 引入

【1.4】修改 src/dictionaries/ru.json
- 在 footer.contact 添加 telegram: "@aierxuan_russia"
- 在 faq.contact 添加 telegramLabel 和 telegramValue

=== 第二部分：落地页优化 ===

【2.1】修改 src/dictionaries/ru.json 的 oem.services
- 添加 marketplace 对象，针对 Ozon/Wildberries 卖家

【2.2】修改 src/dictionaries/ru.json 的 contact
- 添加 samplePolicy（样机政策）
- 添加 responseTime（响应时间承诺）
- 添加 telegram 联系方式

【2.3】修改 home.hero.slides[0].description
- 添加 "✓ Telegram: @aierxuan_russia"

=== 第三部分：验证 ===

完成所有修改后：
1. 运行 npm run build 确认构建成功
2. 运行 npm run start 预览检查
3. 访问 /ru 页面确认 Telegram 按钮显示正确

请逐步执行并报告进度。
```

---

# 预期效果

| 页面 | 变化 |
|------|------|
| `/ru` 首页 | Hero 描述添加 Telegram 信息 |
| `/ru` 所有页面 | 左下角 Telegram 浮动按钮 |
| `/ru` 所有页面 | 右下角 FloatingCTA 展开后有 Telegram 选项 |
| `/ru` 页脚 | 社交链接区显示 Telegram 图标 |
| `/ru/oem` | 新增电商卖家专属内容 |
| `/ru/contact` | 新增样机政策和 Telegram 联系方式 |
| 其他语言 | 无变化 |

---

# 完成后清单

- [ ] Footer Telegram 图标（仅俄语）
- [ ] FloatingCTA Telegram 选项（仅俄语）
- [ ] 独立 Telegram 浮动按钮（仅俄语）
- [ ] ru.json 添加 Telegram 信息
- [ ] OEM 页面添加电商卖家内容
- [ ] 联系页面添加样机政策
- [ ] Hero 描述添加 Telegram
- [ ] 本地构建测试通过
- [ ] 上传到 VPS
- [ ] 线上验证

---

**文档创建时间**: 2026年1月30日
**文档版本**: v2.0（整合版）
**关联任务**: 俄罗斯市场推广
