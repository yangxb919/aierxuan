# 联系表单弹窗使用说明

## 概述

项目中已集成一个全局可复用的联系表单弹窗，支持多语言，可以在任何页面中调用。

## 功能特性

### ✅ 已实现功能

1. **全局弹窗组件** - 在根布局中加载，可在任何地方调用
2. **多语言支持** - 支持6种语言：中文、英语、俄语、日语、法语、葡萄牙语
3. **表单验证** - 包含完整的客户端验证逻辑
4. **响应式设计** - 适配移动端和桌面端
5. **状态管理** - 使用Zustand进行全局状态管理
6. **可复用钩子** - 提供便捷的钩子函数

### 📝 表单字段

1. **姓名** (必填)
2. **公司** (必填)
3. **邮箱** (必填，含格式验证)
4. **留言内容** (必填，最少10字符)

## 使用方法

### 1. 在React组件中使用

```tsx
import { useContactForm } from '@/hooks/useContactForm'

function MyComponent() {
  const { openContactModal, closeContactModal, isOpen } = useContactForm()

  return (
    <div>
      <button onClick={openContactModal}>
        联系我们
      </button>
    </div>
  )
}
```

### 2. 直接访问状态

```tsx
import { useAppStore } from '@/store/useAppStore'

function MyComponent() {
  const { contactModalOpen, setContactModalOpen } = useAppStore()

  return (
    <div>
      <button onClick={() => setContactModalOpen(true)}>
        打开联系表单
      </button>
    </div>
  )
}
```

## 已集成的位置

### 1. 首页Banner
- **位置**: HeroSection组件
- **按钮**: "获取报价" (中文) / "Request Quote" (英文)
- **样式**: 蓝色主按钮

### 2. 产品页面
- **位置**: ProductCard组件
- **按钮**: "询价" (中文) / "Quote" (英文)
- **样式**: Outline样式按钮

## 样式特性

### 视觉效果
- 模态背景遮罩 (50%透明度)
- 毛玻璃效果 (backdrop-blur-sm)
- 平滑的打开/关闭动画
- 悬停状态和焦点状态

### 响应式
- 移动端：全宽度，较小间距
- 桌面端：固定宽度(max-w-md)，居中显示
- 表单字段自适应布局

## 验证规则

### 字段验证
1. **姓名**: 非空验证
2. **公司**: 非空验证
3. **邮箱**: 非空 + 格式验证 (正则表达式)
4. **留言**: 非空 + 最小长度验证 (10字符)

### 错误处理
- 实时验证反馈
- 清晰的错误信息
- 多语言错误提示

## 提交流程

### 当前状态
- 表单验证通过后显示提交动画
- 模拟API调用 (2秒延迟)
- 显示成功消息
- 3秒后自动关闭弹窗

### 实际集成
需要替换ContactModal.tsx中的模拟提交逻辑：

```tsx
// 找到这段代码
try {
  // Simulate API call - replace with actual implementation
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 替换为实际的API调用
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  if (!response.ok) throw new Error('Failed to submit')
} catch (error) {
  // 错误处理
}
```

## 多语言配置

### 文案位置
`/src/content/contact-form.ts`

### 添加新语言
1. 在contactFormContent对象中添加新语言键值对
2. 更新ContactFormContent类型定义
3. 确保所有字段都有对应翻译

### 字段说明
- `title`: 弹窗标题
- `subtitle`: 弹窗副标题
- `fields.*.label`: 字段标签
- `fields.*.placeholder`: 字段占位符
- `fields.*.required`: 必填验证信息
- `fields.*.invalid`: 格式错误信息
- `buttons.*`: 按钮文本
- `messages.*`: 状态消息

## 自定义样式

### 主要类名
- `.modal-backdrop`: 背景遮罩
- `.modal-content`: 弹窗容器
- `.form-field`: 表单字段
- `.error-message`: 错误信息
- `.success-state`: 成功状态

### 主题定制
在tailwind.config.css中添加自定义颜色：
```css
:root {
  --modal-backdrop: rgba(0, 0, 0, 0.5);
  --modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

## 技术栈

- **React 19.1.0** - 组件框架
- **TypeScript** - 类型安全
- **Zustand** - 状态管理
- **Tailwind CSS** - 样式框架
- **Next.js 15.5.4** - 应用框架

## 文件结构

```
src/
├── components/ui/
│   └── ContactModal.tsx        # 主要弹窗组件
├── hooks/
│   └── useContactForm.ts        # 便捷钩子
├── content/
│   └── contact-form.ts          # 多语言文案
├── store/
│   └── useAppStore.ts           # 全局状态管理
└── app/
    └── layout.tsx               # 根布局 (全局集成)
```

## 故障排除

### 常见问题

1. **弹窗不显示**
   - 检查是否在layout.tsx中导入了ContactModal
   - 确认状态管理正确连接

2. **按钮点击无效**
   - 确认使用了正确的钩子函数
   - 检查事件处理器是否正确绑定

3. **样式问题**
   - 确认Tailwind CSS正确加载
   - 检查z-index层级设置

4. **多语言不工作**
   - 检查语言状态是否正确传递
   - 确认文案配置文件正确

### 调试技巧

1. 打开浏览器开发者工具
2. 在控制台中查看状态变化
3. 检查网络请求 (当集成真实API时)
4. 使用React DevTools查看组件状态

---

## 🎉 总结

联系表单弹窗已完全集成并可以在任何页面使用！它具有完整的多语言支持、表单验证和响应式设计。只需要替换模拟提交逻辑为真实的API调用即可投入生产使用。