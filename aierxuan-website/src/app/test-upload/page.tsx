'use client'

import { useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>('/uploads/blog/1761035881355-xvkezzjygnq.png') // 预设一个测试图片

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ImageUpload 组件测试</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">上传组件测试</h2>

          <div className="space-y-4">
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              label="测试图片上传"
              aspectRatio="16/9"
            />

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">当前状态:</h3>
              <p className="text-sm text-gray-600">
                {imageUrl ? (
                  <>
                    <span className="text-green-600">✓ 图片已设置</span><br/>
                    <span className="font-mono break-all">{imageUrl}</span>
                  </>
                ) : (
                  <span className="text-yellow-600">⚠ 未设置图片</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">原始图片预览</h2>

          {imageUrl && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-300" style={{ aspectRatio: '16/9' }}>
                <img
                  src={imageUrl}
                  alt="原始预览"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Original preview failed to load:', imageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Original preview loaded successfully:', imageUrl);
                  }}
                />
              </div>

              <div className="flex gap-4">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  在新标签页中打开图片
                </a>

                <button
                  onClick={() => setImageUrl(null)}
                  className="text-red-600 hover:text-red-800 underline text-sm"
                >
                  清除图片
                </button>

                <button
                  onClick={() => setImageUrl('/uploads/blog/1761035881355-xvkezzjygnq.png')}
                  className="text-green-600 hover:text-green-800 underline text-sm"
                >
                  设置测试图片
                </button>
              </div>
            </div>
          )}

          {!imageUrl && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">请上传图片或点击下方按钮设置测试图片</p>
              <button
                onClick={() => setImageUrl('/uploads/blog/1761035881355-xvkezzjygnq.png')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                设置测试图片
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">测试说明:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 上传区域应该显示当前的图片（如果有）</li>
            <li>• 鼠标悬停时应该显示 Change 和 Remove 按钮</li>
            <li>• 点击 Change 可以选择新图片</li>
            <li>• 点击 Remove 可以清除当前图片</li>
            <li>• 下方的原始预览区域用于对比显示</li>
          </ul>
        </div>
      </div>
    </div>
  )
}