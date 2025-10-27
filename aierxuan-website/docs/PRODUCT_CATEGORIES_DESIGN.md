# 产品类目入口设计文档

## 📋 概述

将首页的 **Featured Products** 模块改造为 **产品类目入口**，展示三个主要产品类别：
- 商务本 (Business Laptop)
- 游戏本 (Gaming Laptop)
- 迷你主机 (Mini PC)

---

## 🎨 设计特点

### 1. 卡片式布局
- **3列网格布局** (桌面端)
- **1列布局** (移动端)
- **响应式设计** - 自适应不同屏幕尺寸

### 2. 视觉设计

#### 配色方案
每个类目使用独特的颜色主题：

| 类目 | 主色调 | 渐变背景 | 图标背景 |
|------|--------|---------|---------|
| 商务本 | 蓝色 | `from-blue-50 to-blue-100` | `bg-blue-100` |
| 游戏本 | 紫色 | `from-purple-50 to-purple-100` | `bg-purple-100` |
| 迷你主机 | 绿色 | `from-green-50 to-green-100` | `bg-green-100` |

#### 卡片元素
```
┌─────────────────────────────┐
│  [图标]              [箭头]  │
│                             │
│  类目名称                    │
│  描述文字                    │
│                             │
│  ✓ 特性1                    │
│  ✓ 特性2                    │
│  ✓ 特性3                    │
│                             │
│  [查看产品按钮]              │
└─────────────────────────────┘
```

### 3. 交互效果

#### Hover效果
- ✨ **卡片阴影增强** - `hover:shadow-2xl`
- 🎯 **边框颜色变化** - `hover:border-{color}-400`
- 📈 **图标放大** - `group-hover:scale-110`
- 🔼 **按钮放大** - `group-hover:scale-105`
- ➡️ **箭头显示** - `opacity-0 group-hover:opacity-100`

#### 动画
- **过渡时间**: 300ms
- **缓动函数**: ease-in-out
- **平滑过渡**: 所有交互都有流畅的动画

---

## 🔗 功能实现

### 1. 路由跳转

点击卡片跳转到产品页面，并自动筛选对应类目：

```typescript
href={`/products?category=${encodeURIComponent(category.slug)}`}
```

**示例**:
- 商务本 → `/products?category=商务本`
- 游戏本 → `/products?category=游戏本`
- 迷你主机 → `/products?category=迷你主机`

### 2. 多语言支持

支持6种语言：
- 🇬🇧 English (en)
- 🇨🇳 简体中文 (zh-CN)
- 🇷🇺 Русский (ru)
- 🇯🇵 日本語 (ja)
- 🇫🇷 Français (fr)
- 🇧🇷 Português (pt)

每种语言都有完整的翻译：
- 标题和副标题
- 类目名称和描述
- 特性列表
- 按钮文字

---

## 📁 文件结构

### 新增文件
```
src/components/features/ProductCategories.tsx  (新建)
```

### 修改文件
```
src/app/page.tsx  (修改)
```

---

## 🎯 类目配置

### 商务本 (Business Laptop)

**图标**: 💼  
**颜色**: 蓝色  
**描述**: 专为商务生产力和可靠性设计的专业笔记本  
**特性**:
- Intel Core i9
- 长续航
- 企业级安全

---

### 游戏本 (Gaming Laptop)

**图标**: 🎮  
**颜色**: 紫色  
**描述**: 配备尖端显卡的高性能游戏笔记本  
**特性**:
- RTX显卡
- 高刷新率
- 先进散热

---

### 迷你主机 (Mini PC)

**图标**: 🖥️  
**颜色**: 绿色  
**描述**: 紧凑而强大的迷你主机，节省空间的计算解决方案  
**特性**:
- 紧凑设计
- 静音运行
- 节能高效

---

## 💻 代码示例

### 使用组件

```tsx
import { ProductCategories } from '@/components/features/ProductCategories'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductCategories />  {/* 产品类目入口 */}
      <CoreAdvantages />
    </div>
  )
}
```

### 自定义颜色

如果需要修改颜色方案，编辑 `colorSchemes` 对象：

```typescript
const colorSchemes = {
  blue: {
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200 hover:border-blue-400',
    text: 'text-blue-600',
    icon: 'bg-blue-100 text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white'
  },
  // ... 其他颜色
}
```

---

## 🧪 测试步骤

### 1. 视觉测试
- [ ] 查看首页，确认3个类目卡片正常显示
- [ ] 检查每个卡片的颜色主题是否正确
- [ ] 验证图标、标题、描述、特性列表都正确显示

### 2. 交互测试
- [ ] Hover每个卡片，查看阴影和动画效果
- [ ] 点击卡片，确认跳转到正确的产品页面
- [ ] 验证URL参数 `?category=xxx` 是否正确

### 3. 响应式测试
- [ ] 桌面端 (>1024px) - 3列布局
- [ ] 平板端 (768px-1024px) - 3列布局
- [ ] 移动端 (<768px) - 1列布局

### 4. 多语言测试
- [ ] 切换到中文 - 查看翻译
- [ ] 切换到英文 - 查看翻译
- [ ] 切换到其他语言 - 查看翻译

---

## 🎨 设计理念

### 1. 清晰的视觉层次
- **大图标** - 快速识别类目
- **粗体标题** - 突出类目名称
- **简洁描述** - 说明类目特点
- **特性列表** - 展示核心优势

### 2. 引导用户行动
- **明显的CTA按钮** - "查看产品"
- **Hover效果** - 鼓励点击
- **箭头图标** - 暗示可点击

### 3. 品牌一致性
- **配色方案** - 与网站整体风格一致
- **圆角设计** - 现代感
- **渐变背景** - 柔和视觉

---

## 📊 与原设计对比

### 原设计 (Featured Products)
- ❌ 显示6个具体产品
- ❌ 需要加载产品数据
- ❌ 用户需要浏览多个产品
- ❌ 不够聚焦

### 新设计 (Product Categories)
- ✅ 显示3个产品类目
- ✅ 静态内容，加载快
- ✅ 用户快速找到目标类目
- ✅ 清晰的导航结构

---

## 🚀 优势

### 1. 用户体验
- **更快的决策** - 用户直接选择类目
- **清晰的导航** - 3个选项，不会overwhelm
- **视觉吸引力** - 彩色卡片，图标化设计

### 2. 性能
- **无需数据库查询** - 静态内容
- **快速加载** - 无异步请求
- **SEO友好** - 静态HTML

### 3. 维护性
- **易于修改** - 集中配置
- **多语言支持** - 统一管理
- **可扩展** - 易于添加新类目

---

## 🔧 未来扩展

### 1. 添加图片
如果需要为每个类目添加背景图片：

```typescript
{
  id: 'business',
  name: '商务本',
  image: '/images/category-business.jpg',  // 添加图片
  // ...
}
```

然后在卡片中显示：

```tsx
<div className="relative h-48 mb-6 rounded-lg overflow-hidden">
  <img 
    src={category.image} 
    alt={category.name}
    className="w-full h-full object-cover"
  />
</div>
```

### 2. 添加产品数量
显示每个类目下的产品数量：

```tsx
<div className="text-sm text-gray-500">
  {category.productCount} 款产品
</div>
```

### 3. 添加热门标签
为热门类目添加标签：

```tsx
{category.isHot && (
  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
    热门
  </span>
)}
```

---

## ✅ 完成状态

- ✅ 创建 `ProductCategories.tsx` 组件
- ✅ 修改 `page.tsx` 使用新组件
- ✅ 实现3个类目卡片
- ✅ 添加多语言支持
- ✅ 实现Hover动画效果
- ✅ 配置路由跳转
- ✅ 响应式布局

---

**现在请刷新首页，查看新的产品类目入口！** 🎉

