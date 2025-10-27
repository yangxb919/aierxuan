'use client'

import { useState } from 'react'

const testImages = [
  '/uploads/blog/1761035881355-xvkezzjygnq.png',
  '/uploads/blog/1761035852481-aaz963rrxeq.png',
  '/uploads/blog/1761035761551-yl6f29nhuu.png',
  '/uploads/blog/1761035822765-vfh3yabtfn.png',
  '/uploads/blog/1761035744515-20d94bec5he.png'
]

export default function TestImagesPage() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: 'loading' | 'loaded' | 'error' }>(
    testImages.reduce((acc, url) => ({ ...acc, [url]: 'loading' }), {})
  )

  const handleImageLoad = (url: string) => {
    setLoadingStates(prev => ({ ...prev, [url]: 'loaded' }))
  }

  const handleImageError = (url: string) => {
    console.error(`Failed to load image: ${url}`)
    setLoadingStates(prev => ({ ...prev, [url]: 'error' }))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">图片显示测试页面</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testImages.map((imageUrl, index) => (
            <div key={imageUrl} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">测试图片 {index + 1}</h2>
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  {loadingStates[imageUrl] === 'loading' && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-500">加载中...</div>
                    </div>
                  )}

                  {loadingStates[imageUrl] === 'error' && (
                    <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
                      <div className="text-red-600 text-center">
                        <div className="text-lg font-semibold">加载失败</div>
                        <div className="text-sm mt-1">图片可能不存在或路径错误</div>
                      </div>
                    </div>
                  )}

                  <img
                    src={imageUrl}
                    alt={`测试图片 ${index + 1}`}
                    className={`w-full h-full object-cover ${loadingStates[imageUrl] === 'loaded' ? 'block' : 'hidden'}`}
                    onLoad={() => handleImageLoad(imageUrl)}
                    onError={() => handleImageError(imageUrl)}
                  />
                </div>

                <div className="mt-3">
                  <p className="text-sm text-gray-600 font-mono break-all">{imageUrl}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      loadingStates[imageUrl] === 'loaded'
                        ? 'bg-green-100 text-green-800'
                        : loadingStates[imageUrl] === 'error'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {loadingStates[imageUrl] === 'loaded' && '✓ 加载成功'}
                      {loadingStates[imageUrl] === 'error' && '✗ 加载失败'}
                      {loadingStates[imageUrl] === 'loading' && '⟳ 加载中'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">诊断信息</h2>
          <div className="space-y-2 text-sm">
            <p><strong>当前页面URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>当前域名:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
            <p><strong>协议:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'N/A'}</p>
            <div className="mt-4">
              <strong>测试直接链接:</strong>
              <div className="mt-2 space-y-1">
                {testImages.map((url, index) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800 underline"
                  >
                    打开图片 {index + 1} (新标签页)
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}