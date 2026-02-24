# 🎨 AIERXUAN 品牌色彩指南

**更新日期**: 2025-10-08  
**版本**: 1.0

---

## 🏢 品牌Logo颜色

### 主要Logo颜色

**AIERXUAN** Logo 使用的是 **Tailwind CSS 的 `blue-600`**

#### 🎨 色彩规格

| 格式 | 色值 |
|------|------|
| **HEX** | `#2563EB` |
| **RGB** | `rgb(37, 99, 235)` |
| **HSL** | `hsl(221, 83%, 53%)` |
| **CMYK** | `C:84 M:58 Y:0 K:8` |
| **Pantone** | **Pantone 2727 C** (最接近) |

#### 📍 使用位置

1. **导航栏Logo** (`src/components/layout/Navbar.tsx`)
   ```tsx
   <span className="text-2xl font-bold text-blue-600">AIERXUAN</span>
   ```

2. **页脚Logo** (`src/components/layout/Footer.tsx`)
   ```tsx
   <span className="text-2xl font-bold text-blue-400">{content.company.title}</span>
   ```
   注意：页脚使用 `blue-400` (#60A5FA) 因为背景是深色

---

## 🎨 完整品牌色彩系统

### 主色调 - 蓝色系列

#### Blue-600 (主要品牌色)
- **HEX**: `#2563EB`
- **RGB**: `rgb(37, 99, 235)`
- **Pantone**: **Pantone 2727 C**
- **用途**: Logo、主要按钮、链接、强调元素

#### Blue-700 (深色变体)
- **HEX**: `#1D4ED8`
- **RGB**: `rgb(29, 78, 216)`
- **Pantone**: **Pantone 2728 C**
- **用途**: 按钮悬停状态、深色背景

#### Blue-500 (亮色变体)
- **HEX**: `#3B82F6`
- **RGB**: `rgb(59, 130, 246)`
- **Pantone**: **Pantone 2726 C**
- **用途**: 悬停效果、次要强调

#### Blue-400 (浅色变体)
- **HEX**: `#60A5FA`
- **RGB**: `rgb(96, 165, 250)`
- **Pantone**: **Pantone 2718 C**
- **用途**: 深色背景上的Logo、图标

---

### 辅助色调

#### Blue-900 (深蓝色)
- **HEX**: `#1E3A8A`
- **RGB**: `rgb(30, 58, 138)`
- **Pantone**: **Pantone 2766 C**
- **用途**: Hero区域背景、深色文本

#### Blue-800 (中深蓝)
- **HEX**: `#1E40AF`
- **RGB**: `rgb(30, 64, 175)`
- **Pantone**: **Pantone 2738 C**
- **用途**: 渐变背景、深色区域

#### Blue-100 (浅蓝色)
- **HEX**: `#DBEAFE`
- **RGB**: `rgb(219, 234, 254)`
- **Pantone**: **Pantone 2707 C**
- **用途**: 浅色背景、高亮区域

#### Blue-50 (极浅蓝)
- **HEX**: `#EFF6FF`
- **RGB**: `rgb(239, 246, 255)`
- **Pantone**: **Pantone 2706 C**
- **用途**: 选中状态背景、微妙高亮

---

### 中性色调

#### Gray-900 (深灰色)
- **HEX**: `#111827`
- **RGB**: `rgb(17, 24, 39)`
- **Pantone**: **Pantone Black 6 C**
- **用途**: 主要文本、标题

#### Gray-700 (中灰色)
- **HEX**: `#374151`
- **RGB**: `rgb(55, 65, 81)`
- **Pantone**: **Pantone Cool Gray 11 C**
- **用途**: 次要文本、导航链接

#### Gray-500 (中性灰)
- **HEX**: `#6B7280`
- **RGB**: `rgb(107, 114, 128)`
- **Pantone**: **Pantone Cool Gray 8 C**
- **用途**: 占位符文本、禁用状态

#### Gray-200 (浅灰色)
- **HEX**: `#E5E7EB`
- **RGB**: `rgb(229, 231, 235)`
- **Pantone**: **Pantone Cool Gray 2 C**
- **用途**: 边框、分隔线

#### Gray-100 (极浅灰)
- **HEX**: `#F3F4F6`
- **RGB**: `rgb(243, 244, 246)`
- **Pantone**: **Pantone Cool Gray 1 C**
- **用途**: 悬停背景、卡片背景

#### Gray-50 (背景灰)
- **HEX**: `#F9FAFB`
- **RGB**: `rgb(249, 250, 251)`
- **Pantone**: **Pantone Cool Gray 1 C**
- **用途**: 页面背景、区域背景

---

### 功能色调

#### White (白色)
- **HEX**: `#FFFFFF`
- **RGB**: `rgb(255, 255, 255)`
- **用途**: 主要背景、卡片背景

#### Black (黑色)
- **HEX**: `#000000`
- **RGB**: `rgb(0, 0, 0)`
- **用途**: 深色模式背景、阴影

---

## 📐 Logo使用规范

### Logo尺寸

#### 导航栏
- **字体大小**: `text-2xl` (1.5rem / 24px)
- **字重**: `font-bold` (700)
- **颜色**: `text-blue-600` (#2563EB)

#### 页脚
- **字体大小**: `text-2xl` (1.5rem / 24px)
- **字重**: `font-bold` (700)
- **颜色**: `text-blue-400` (#60A5FA) - 深色背景

#### 移动端
- **字体大小**: 保持 `text-2xl`
- **响应式**: 自动适配

---

## 🎯 色彩使用指南

### 主要品牌色 (Blue-600) 使用场景

✅ **应该使用**:
- Logo文字
- 主要CTA按钮
- 重要链接
- 选中状态
- 品牌强调元素
- 图标高亮

❌ **不应该使用**:
- 大面积背景（使用Blue-900或Blue-800）
- 正文文本（使用Gray-900或Gray-700）
- 错误提示（使用红色系）

---

## 🖨️ 印刷规范

### Pantone色号对照

| 用途 | Tailwind类 | Pantone色号 | 备注 |
|------|-----------|------------|------|
| 主Logo | `text-blue-600` | **Pantone 2727 C** | 主要品牌色 |
| Logo深色 | `text-blue-700` | **Pantone 2728 C** | 深色变体 |
| Logo浅色 | `text-blue-400` | **Pantone 2718 C** | 深色背景用 |
| 背景深蓝 | `bg-blue-900` | **Pantone 2766 C** | Hero区域 |

### CMYK印刷色值

#### 主Logo色 (Blue-600)
```
C: 84%
M: 58%
Y: 0%
K: 8%
```

#### 深色Logo (Blue-700)
```
C: 87%
M: 64%
Y: 0%
K: 15%
```

#### 浅色Logo (Blue-400)
```
C: 62%
M: 34%
Y: 0%
K: 2%
```

---

## 📱 数字媒体规范

### 网页使用
- **主要**: HEX `#2563EB`
- **CSS类**: `text-blue-600`
- **RGB**: `rgb(37, 99, 235)`

### 社交媒体
- **Facebook/Twitter**: HEX `#2563EB`
- **Instagram**: RGB `rgb(37, 99, 235)`
- **LinkedIn**: HEX `#2563EB`

### 移动应用
- **iOS**: RGB `rgb(37, 99, 235)`
- **Android**: HEX `#2563EB`

---

## 🎨 渐变使用

### Hero区域渐变
```css
background: linear-gradient(to bottom right, 
  #1E3A8A,  /* blue-900 */
  #1E40AF,  /* blue-800 */
  #1D4ED8   /* blue-700 */
);
```

**Pantone等效**:
- 起始: Pantone 2766 C
- 中间: Pantone 2738 C
- 结束: Pantone 2728 C

---

## 📋 快速参考

### Logo主色
```
颜色名称: Blue-600
HEX: #2563EB
RGB: rgb(37, 99, 235)
Pantone: 2727 C
CMYK: C:84 M:58 Y:0 K:8
```

### 代码中使用
```tsx
// 导航栏Logo
<span className="text-2xl font-bold text-blue-600">AIERXUAN</span>

// 页脚Logo (深色背景)
<span className="text-2xl font-bold text-blue-400">AIERXUAN</span>

// 按钮
<button className="bg-blue-600 hover:bg-blue-700 text-white">
  Button
</button>

// 链接
<a className="text-blue-600 hover:text-blue-500">
  Link
</a>
```

---

## 🎯 总结

**AIERXUAN Logo 主色**:
- **Tailwind**: `blue-600`
- **HEX**: `#2563EB`
- **Pantone**: **2727 C**
- **CMYK**: C:84 M:58 Y:0 K:8

这是一个**专业、可信、科技感**的蓝色，非常适合工业自动化品牌。

---

## 📞 联系方式

如需更多品牌设计指南或色彩规范，请联系：
- **Email**: info@aierxuan.com
- **Website**: www.aierxuan.com

---

**文档版本**: 1.0  
**最后更新**: 2025-10-08
