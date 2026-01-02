'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui'

interface ImageUploadProps {
  value: string | null
   
  onChange: (url: string | null) => void
  label?: string
  aspectRatio?: string
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Cover Image',
  aspectRatio = '16/9'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewFailed, setPreviewFailed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'blog') // 添加类型参数

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setPreviewFailed(false)
        onChange(data.url)
      } else {
        setError(data.error || 'Failed to upload image')
      }
    } catch {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange(null)
    setPreviewFailed(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {value ? (
        <div className="relative group">
          <div
            className="relative overflow-hidden rounded-lg border-2 border-gray-300"
            style={{ aspectRatio }}
          >
            {!previewFailed ? (
              <img
                key={value}
                src={value}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={() => {
                  setPreviewFailed(true)
                  setError('Cover image failed to load. Please re-upload.')
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-500">
                <p className="text-sm font-medium">Preview not available</p>
                <p className="text-xs mt-1 break-all px-6 text-center">{value}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 pointer-events-auto">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white hover:bg-gray-100"
                >
                  Change
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleRemove}
                  className="bg-white text-red-600 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
          style={{ aspectRatio }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 transition-colors">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
