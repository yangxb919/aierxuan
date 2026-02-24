# VS Code 快速做出好看 UI 的实战手册（AIERXUAN）

> 目标：在 **VS Code** 里把“设计力”落到代码里，做出一致、现代、好看的 B2B 界面。面向 **Next.js 14 + React 18 + Tailwind** 技术栈。

---

## 1) 先有“设计系统”，再写组件

**先定 6 类 Design Tokens（可放 `tailwind.config.js` 或 `tokens.css`）：**
- 颜色（主色 / 强调色 / 中性色阶）：`primary`, `accent`, `neutral-50..900`
- 字体与字号（标题/正文/代码）：`--font-sans`, `--font-mono`，type scale：12/14/16/20/24/30/36/48
- 间距：`4 8 12 16 20 24 32 40 48 64`
- 圆角：`4 6 8 12`
- 阴影：`xs sm md lg`
- 动效：`duration-150/200/300` + `ease-out/cubic-bezier`

> **B2B 风格建议**：冷静、留白、对比清晰；慎用彩色大面积背景，强调“可信赖、专业”。

---

## 2) VS Code 插件清单（装了立马变强）

- **Tailwind CSS IntelliSense**（类名补全、跳转）
- **Headwind**（自动排序 Tailwind 类）
- **ESLint** + **eslint-plugin-jsx-a11y**（可访问性 & 规范）
- **Prettier**（统一格式）
- **Error Lens**（错误就地高亮）
- **Icon Themes**（文件图标，快速识别结构）
- **Color Highlight**（颜色预览）
- **vscode-styled-components**（如有 css-in-js 片段）

> `extensions.json`
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "heybourn.headwind",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "usernamehw.errorlens",
    "naumovs.color-highlight",
    "formulahendry.auto-close-tag"
  ]
}
```

---

## 3) VS Code 设置（让排版与视觉更统一）

> `.vscode/settings.json`
```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.eol": "\n",
  "prettier.singleQuote": true,
  "prettier.printWidth": 100,
  "editor.rulers": [100],
  "editor.guides.bracketPairs": true,
  "css.validate": false,
  "tailwindCSS.emmetCompletions": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

---

## 4) Tailwind 设计基线（开箱就“好看”的基础）

> `tailwind.config.js` 片段
```js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        primary: { DEFAULT: '#0A2540', fg: '#E6F0FF' },
        accent: { DEFAULT: '#10B981', fg: '#06291F' }
      },
      borderRadius: { md: '8px', lg: '12px' },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.06)',
        md: '0 4px 12px rgba(0,0,0,0.08)'
      },
      transitionDuration: { 150: '150ms', 200: '200ms', 300: '300ms' }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
```

> `globals.css` 里开启基础排版：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #ffffff;
    --fg: #0f172a;
    --muted: #64748b;
  }
  html, body { @apply bg-[var(--bg)] text-[var(--fg)] antialiased; }
  h1,h2,h3 { @apply tracking-tight; }
}
```

---

## 5) 组件从“线框块”开始（先结构，后装饰）

**Hero.tsx（可复用到任何页）**
```tsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-20 lg:py-28">
        <p className="mb-4 text-sm uppercase tracking-widest text-slate-500">AIERXUAN</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          为商业而生的高性能笔记本与迷你 PC
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          专注 OEM / ODM 定制，面向全球企业提供稳定、可靠、可扩展的硬件解决方案。
        </p>
        <div className="mt-8 flex gap-3">
          <a className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-white shadow-md hover:opacity-95 transition">
            获取报价
          </a>
          <a className="inline-flex items-center rounded-md border px-5 py-3 text-slate-800 hover:bg-slate-50 transition">
            了解产品
          </a>
        </div>
      </div>
    </section>
  );
}
```

**SectionTitle.tsx（统一每个区块的标题风格）**
```tsx
export function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <header className="mb-10">
      {kicker && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{kicker}</p>}
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-slate-600">{desc}</p>}
    </header>
  );
}
```

> **方法论**：先用这些“骨架组件”搭版，确认信息层级与节奏，再逐步加图标、色彩、插图和动效。

---

## 6) 三步变美公式（落地流程）

1. **先放内容，再定布局**：把文案/数据填满，按信息权重排版（大标题 > 关键数字 > 主要按钮 > 次要链接）。  
2. **加一条“对比线”**：每屏只设置 1 个视觉焦点（颜色/尺寸/留白制造层级）。  
3. **统一微交互**：所有按钮/卡片使用同一套 hover/active 阴影与过渡时间（如 `duration-200 ease-out`）。

---

## 7) 质量保障清单（合格即发布）

- [ ] Hero 首屏 3 秒内可读（标题 12 个字以内、副标题 26 字以内）
- [ ] 首屏有主 CTA，并在导航也能直达“获取报价”
- [ ] 每屏内容不超过 1 个主视觉焦点
- [ ] 间距遵循 8pt 体系（4/8/12/16/24/32…）
- [ ] 颜色对比度 AA（正文对比度 ≥ 4.5）
- [ ] 所有图片 < 200KB（大图懒加载）
- [ ] Lighthouse Performance ≥ 85, Accessibility ≥ 90
- [ ] eslint / prettier / headwind 无报错

---

## 8) 进阶：让 UI 一直“更好看”

- **Storybook**：组件文档化 + 视觉回归测试（Chromatic）
- **设计资产**：把图标统一成一个库（Radix Icons / Lucide），插图统一风格（线条/几何）
- **组件库借鉴**：Radix UI（无样式 a11y 基件） + shadcn/ui（可抄可改的样式）
- **数据驱动优化**：埋点统计每个 CTA 的点击率，迭代文案与布局
- **可访问性审计**：`eslint-plugin-jsx-a11y` + Axe DevTools

---

## 9) 你可以直接复制用的命令

```bash
# 安装基础依赖
npm i -D prettier eslint eslint-plugin-react eslint-plugin-jsx-a11y        @tailwindcss/forms @tailwindcss/typography

# VS Code 插件（命令面板里输入）
# > Extensions: Install Extensions -> 搜索并安装清单里的插件
```

---

### 总结
在 VS Code 里“设计出好看的 UI”，关键不在编辑器，而在 **可落地的设计系统 + 严谨的工程化流程**。把 **Tokens → 组件骨架 → 一致的微交互 → 质量清单** 串起来，你的页面自然就会“好看而专业”。
