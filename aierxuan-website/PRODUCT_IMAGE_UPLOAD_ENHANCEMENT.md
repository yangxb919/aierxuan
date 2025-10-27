# 产品图片上传功能增强

## 📋 概述

已成功将产品图片上传功能从单一的 URL 输入方式升级为支持**本地文件上传**和 **URL 链接输入**两种方式。

---

## ✅ 实现的功能

### 1. 双模式图片上传

用户现在可以通过两种方式添加产品图片：

#### 方式 1: 本地文件上传
- ✅ 点击 "Choose File" 按钮选择本地图片
- ✅ 支持的格式: PNG, JPG, JPEG, GIF, WEBP
- ✅ 文件大小限制: 最大 5MB
- ✅ 自动上传到服务器
- ✅ 实时显示上传进度
- ✅ 上传成功后自动添加到产品图片列表

#### 方式 2: URL 链接输入
- ✅ 点击 "Enter Image URL" 按钮
- ✅ 在弹出的提示框中输入图片 URL
- ✅ 立即添加到产品图片列表
- ✅ 适合使用外部图片链接

---

## 🎨 用户界面

### 图片上传模态框

点击 "+ Add Image" 按钮后，会弹出一个模态框，包含：

```
┌─────────────────────────────────────┐
│  Add Product Image                  │
├─────────────────────────────────────┤
│                                     │
│  Upload from Computer               │
│  ┌─────────────────────────────┐   │
│  │  📷 Choose File             │   │
│  └─────────────────────────────┘   │
│  PNG, JPG, GIF up to 5MB           │
│                                     │
│  ─────────── OR ───────────         │
│                                     │
│  Add from URL                       │
│  ┌─────────────────────────────┐   │
│  │  🔗 Enter Image URL         │   │
│  └─────────────────────────────┘   │
│                                     │
│              [Cancel]               │
└─────────────────────────────────────┘
```

### 功能特点

1. **清晰的视觉分隔**: 使用 "OR" 分隔线区分两种上传方式
2. **图标提示**: 每个按钮都有相应的图标（📷 和 🔗）
3. **加载状态**: 上传时显示旋转的加载动画
4. **错误提示**: 上传失败时显示红色错误消息
5. **文件限制说明**: 明确显示支持的文件类型和大小限制

---

## 🔧 技术实现

### 1. 修改的文件

#### `src/components/admin/ProductForm.tsx`

**新增状态**:
```typescript
const [showImageModal, setShowImageModal] = useState(false)
const [uploadingImage, setUploadingImage] = useState(false)
const [imageError, setImageError] = useState<string | null>(null)
const fileInputRef = useRef<HTMLInputElement>(null)
```

**新增函数**:
- `handleImageUpload()`: 处理本地文件上传
- `handleAddImageUrl()`: 处理 URL 输入
- `removeImage()`: 删除图片（保持不变）

**UI 改进**:
- 添加了图片上传模态框
- 支持文件选择和 URL 输入
- 显示上传进度和错误信息

#### `src/app/api/admin/upload/route.ts`

**新增参数**:
```typescript
const type = formData.get('type') as string || 'blog' // 'blog' or 'product'
```

**动态上传目录**:
```typescript
const uploadSubDir = type === 'product' ? 'products' : 'blog'
const uploadDir = join(process.cwd(), 'public', 'uploads', uploadSubDir)
```

**返回 URL**:
```typescript
const url = `/uploads/${uploadSubDir}/${filename}`
```

---

## 📁 文件结构

### 上传目录

```
public/
└── uploads/
    ├── blog/           # 博客图片
    │   └── [timestamp]-[random].jpg
    └── products/       # 产品图片 (新增)
        └── [timestamp]-[random].jpg
```

### 文件命名规则

```
[timestamp]-[random].[extension]

示例:
1734168133277-abc123def.jpg
```

---

## 🔒 安全特性

### 1. 文件类型验证
```typescript
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
```

### 2. 文件大小限制
```typescript
const maxSize = 5 * 1024 * 1024 // 5MB
```

### 3. 唯一文件名
- 使用时间戳 + 随机字符串
- 防止文件名冲突
- 防止覆盖现有文件

### 4. 目录自动创建
```typescript
if (!existsSync(uploadDir)) {
  await mkdir(uploadDir, { recursive: true })
}
```

---

## 🧪 测试步骤

### 测试本地上传

1. 访问 `http://localhost:3000/admin/products/new`
2. 滚动到 "Product Images" 部分
3. 点击 "+ Add Image" 按钮
4. 在模态框中点击 "Choose File"
5. 选择一张图片（PNG, JPG, GIF, WEBP）
6. 等待上传完成
7. 验证图片出现在产品图片列表中

### 测试 URL 输入

1. 访问 `http://localhost:3000/admin/products/new`
2. 滚动到 "Product Images" 部分
3. 点击 "+ Add Image" 按钮
4. 在模态框中点击 "Enter Image URL"
5. 输入图片 URL（例如: `https://example.com/image.jpg`）
6. 点击确定
7. 验证图片出现在产品图片列表中

### 测试错误处理

1. **文件类型错误**: 尝试上传非图片文件（如 PDF）
   - 应显示错误: "Please select an image file"

2. **文件大小错误**: 尝试上传超过 5MB 的图片
   - 应显示错误: "Image size must be less than 5MB"

3. **网络错误**: 断开网络后尝试上传
   - 应显示错误: "Failed to upload image"

---

## 📊 API 端点

### POST `/api/admin/upload`

**请求**:
```typescript
Content-Type: multipart/form-data

FormData:
- file: File (图片文件)
- type: 'product' | 'blog' (可选，默认 'blog')
```

**成功响应**:
```json
{
  "success": true,
  "url": "/uploads/products/1734168133277-abc123def.jpg",
  "filename": "1734168133277-abc123def.jpg"
}
```

**错误响应**:
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🎯 使用场景

### 场景 1: 使用本地图片
适合：
- 刚拍摄的产品照片
- 本地编辑过的图片
- 需要上传到服务器的图片

### 场景 2: 使用外部 URL
适合：
- 已经托管在 CDN 的图片
- 供应商提供的图片链接
- 临时测试图片

---

## 🚀 优势

1. **灵活性**: 支持两种上传方式，满足不同需求
2. **用户友好**: 清晰的界面和操作流程
3. **安全性**: 完善的文件验证和错误处理
4. **可扩展性**: 易于添加更多上传方式（如拖拽上传）
5. **性能**: 自动生成唯一文件名，避免冲突

---

## 📝 后续改进建议

1. **拖拽上传**: 支持拖拽文件到上传区域
2. **图片裁剪**: 上传前允许用户裁剪图片
3. **批量上传**: 一次选择多张图片上传
4. **图片压缩**: 自动压缩大图片以节省空间
5. **CDN 集成**: 将图片上传到 CDN 服务
6. **图片预览**: 上传前预览图片
7. **进度条**: 显示详细的上传进度百分比

---

## 🎉 总结

产品图片上传功能已成功增强，现在支持：

- ✅ 本地文件上传（最大 5MB）
- ✅ URL 链接输入
- ✅ 文件类型验证
- ✅ 错误处理和提示
- ✅ 上传进度显示
- ✅ 独立的产品图片目录

用户现在可以根据实际需求选择最合适的上传方式，大大提升了产品管理的灵活性和效率！

