# AIERXUAN 行业场景图片使用指南

## 📊 图片清单

已成功生成 **5张** 专业行业场景图片，保存在 `/public/images/industries/` 目录下。

### 生成的图片列表

| # | 行业 | 文件名 | 尺寸 | 大小 | 用途 |
|---|------|--------|------|------|------|
| 1 | 教育 | `industry-education-classroom-laptops.png` | 1024x1024 | 1.5MB | IndustrySwitcher - 教育行业 |
| 2 | 工业制造 | `industry-manufacturing-mini-pc-automation.png` | 1024x1024 | 1.3MB | IndustrySwitcher - 工业行业 |
| 3 | 医疗保健 | `industry-healthcare-medical-workstation.png` | 1024x1024 | 1.4MB | IndustrySwitcher - 医疗行业 |
| 4 | 办公商务 | `industry-office-business-workspace.png` | 1024x1024 | 1.5MB | IndustrySwitcher - 办公行业 |
| 5 | 零售 | `industry-retail-pos-system.png` | 1024x1024 | 1.6MB | IndustrySwitcher - 零售行业 |

**总大小**: ~7.3MB

---

## 🎨 图片特点

### 1. **教育行业** (`industry-education-classroom-laptops.png`)
- **场景**: 现代智慧教室
- **内容**: 学生使用笔记本电脑进行协作学习
- **风格**: 明亮、温馨、教育氛围
- **关键词**: Smart Classrooms, Collaborative Learning, Educational Technology

### 2. **工业制造** (`industry-manufacturing-mini-pc-automation.png`)
- **场景**: 现代化工厂车间
- **内容**: 迷你PC控制自动化机械和机器人系统
- **风格**: 高科技、蓝色LED照明、工业感
- **关键词**: Factory Automation, Industrial IoT, Manufacturing Technology

### 3. **医疗保健** (`industry-healthcare-medical-workstation.png`)
- **场景**: 现代医疗工作站
- **内容**: 医疗专业人员使用笔记本电脑
- **风格**: 清洁、临床、专业
- **关键词**: Medical Imaging, Healthcare Technology, Patient Care

### 4. **办公商务** (`industry-office-business-workspace.png`)
- **场景**: 现代企业办公室
- **内容**: 商务人士使用笔记本电脑工作
- **风格**: 优雅、自然光、专业
- **关键词**: Enterprise Computing, Business Productivity, Modern Workspace

### 5. **零售** (`industry-retail-pos-system.png`)
- **场景**: 现代零售店铺
- **内容**: POS系统使用迷你PC
- **风格**: 明亮、整洁、客户服务导向
- **关键词**: Point of Sale, Retail Technology, Customer Service

---

## 💻 如何在代码中使用

### 方法1：更新 IndustrySwitcher 组件（推荐）

在 `IndustrySwitcher.tsx` 中添加图片展示：

```tsx
// 在组件顶部添加图片映射
const industryImages = {
  education: '/images/industries/industry-education-classroom-laptops.png',
  industrial: '/images/industries/industry-manufacturing-mini-pc-automation.png',
  medical: '/images/industries/industry-healthcare-medical-workstation.png',
  office: '/images/industries/industry-office-business-workspace.png',
  retail: '/images/industries/industry-retail-pos-system.png'
}

// 在组件的 JSX 中，替换右侧的应用列表部分：
<div className="mt-8 lg:mt-0">
  {/* 添加图片展示 */}
  <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden mb-6">
    <Image
      src={industryImages[activeIndustry]}
      alt={`${currentIndustry.name} Industry Solution`}
      fill
      className="object-cover"
      priority
    />
  </div>
  
  {/* 保留原有的应用列表 */}
  <h4 className="text-lg font-semibold text-gray-900 mb-4">
    Typical Applications
  </h4>
  {/* ... 其余代码 ... */}
</div>
```

### 方法2：作为背景图使用

```tsx
<div 
  className="relative w-full h-96 rounded-2xl overflow-hidden"
  style={{
    backgroundImage: `url('/images/industries/industry-${activeIndustry}-*.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* 添加深色蒙版 */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
  
  {/* 内容 */}
  <div className="relative z-10 p-8 text-white">
    {/* ... */}
  </div>
</div>
```

---

## 🔧 优化建议

### 1. **图片优化**
当前图片为PNG格式，建议转换为WebP格式以减小文件大小：

```bash
# 使用 sharp 或 imagemagick 转换
npm install sharp
node -e "const sharp = require('sharp'); sharp('input.png').webp({quality: 80}).toFile('output.webp')"
```

### 2. **响应式图片**
使用 Next.js Image 组件的响应式功能：

```tsx
import Image from 'next/image'

<Image
  src="/images/industries/industry-education-classroom-laptops.png"
  alt="Education Industry"
  width={1024}
  height={1024}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority
/>
```

### 3. **懒加载**
对于非首屏图片，移除 `priority` 属性以启用懒加载：

```tsx
<Image
  src={industryImages[activeIndustry]}
  alt={`${currentIndustry.name} Industry`}
  fill
  className="object-cover"
  loading="lazy"
/>
```

---

## 📝 SEO 优化

### Alt 文本建议

```tsx
const altTexts = {
  education: 'Students using laptops in modern smart classroom for collaborative learning',
  industrial: 'Mini PC controlling automated machinery in modern factory floor',
  medical: 'Healthcare professional using laptop at medical workstation in hospital',
  office: 'Business professionals working with laptops in modern corporate office',
  retail: 'Modern POS system powered by mini PC in retail store checkout'
}
```

### 文件名规范

所有图片文件名已遵循SEO最佳实践：
- ✅ 使用描述性英文名称
- ✅ 使用连字符分隔单词
- ✅ 包含关键词（industry, education, manufacturing等）
- ✅ 小写字母
- ✅ 无特殊字符

---

## 🎯 下一步建议

1. **更新 IndustrySwitcher 组件** - 集成这些图片到组件中
2. **添加图片预加载** - 提升用户体验
3. **创建缩略图** - 为移动端创建更小的版本
4. **添加图片动画** - 切换行业时添加淡入淡出效果
5. **A/B 测试** - 测试图片对转化率的影响

---

## 📊 生成统计

- **总图片数**: 5张
- **总大小**: ~7.3MB
- **平均大小**: ~1.46MB/张
- **生成时间**: ~5分钟
- **使用tokens**: ~23,000 tokens
- **图片质量**: High (1024x1024)
- **格式**: PNG (建议转换为WebP)

---

## 🔗 相关文件

- **组件文件**: `src/components/features/IndustrySwitcher.tsx`
- **图片目录**: `public/images/industries/`
- **配色文档**: `AIERXUAN_oklch_palette.md`

---

生成日期: 2025-10-09  
生成工具: 302ai MCP (gpt-image-1)  
品牌定位: "为商业而生，为性能构建"

