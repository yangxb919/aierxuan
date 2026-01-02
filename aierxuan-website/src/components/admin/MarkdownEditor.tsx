'use client'

import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { sanitizeSchema } from '@/lib/sanitize-schema'

interface MarkdownEditorProps {
  value: string
   
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  minHeight = '400px'
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [uploading, setUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        // Insert markdown image syntax at cursor position
        const textarea = textareaRef.current
        if (textarea) {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          const imageMarkdown = `![${file.name}](${data.url})`
          const newValue = value.substring(0, start) + imageMarkdown + value.substring(end)
          onChange(newValue)
          
          // Set cursor position after inserted text
          setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length)
          }, 0)
        }
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = before + selectedText + after
    const newValue = value.substring(0, start) + newText + value.substring(end)
    
    onChange(newValue)
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus()
      if (selectedText) {
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
      } else {
        textarea.setSelectionRange(start + before.length, start + before.length)
      }
    }, 0)
  }

  const toolbarButtons = [
    { label: 'H1', action: () => insertMarkdown('# ', '\n'), title: 'Heading 1' },
    { label: 'H2', action: () => insertMarkdown('## ', '\n'), title: 'Heading 2' },
    { label: 'H3', action: () => insertMarkdown('### ', '\n'), title: 'Heading 3' },
    { label: 'B', action: () => insertMarkdown('**', '**'), title: 'Bold', className: 'font-bold' },
    { label: 'I', action: () => insertMarkdown('*', '*'), title: 'Italic', className: 'italic' },
    { label: 'Link', action: () => insertMarkdown('[', '](url)'), title: 'Insert Link' },
    { label: 'Quote', action: () => insertMarkdown('> ', '\n'), title: 'Blockquote' },
    { label: 'Code', action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { label: 'List', action: () => insertMarkdown('- ', '\n'), title: 'Bullet List' },
    { label: '1.', action: () => insertMarkdown('1. ', '\n'), title: 'Numbered List' },
  ]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-2 flex-wrap">
        {/* Tab Switcher */}
        <div className="flex border border-gray-300 rounded-md overflow-hidden mr-4">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 text-sm font-medium ${
              activeTab === 'write'
                ? 'bg-white text-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${
              activeTab === 'preview'
                ? 'bg-white text-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Formatting Buttons */}
        {activeTab === 'write' && (
          <>
            {toolbarButtons.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={btn.action}
                title={btn.title}
                className={`px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 text-gray-700 ${btn.className || ''}`}
              >
                {btn.label}
              </button>
            ))}

            {/* Image Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
              title="Upload Image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {uploading ? 'Uploading...' : 'Image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Editor/Preview Area */}
      <div style={{ minHeight }}>
        {activeTab === 'write' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 font-mono text-sm focus:outline-none resize-none text-gray-900"
            style={{ minHeight }}
          />
        ) : (
          <div className="p-4 md md-light md-sm max-w-none overflow-auto" style={{ minHeight }}>
            {value ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
              >
                {addHardLineBreaks(value)}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">Nothing to preview</p>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500">
        <span className="font-medium">Tip:</span> Supports Markdown formatting. 
        <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
          Learn Markdown
        </a>
      </div>
    </div>
  )
}

function addHardLineBreaks(markdown: string) {
  const normalized = (markdown || '').replace(/\r\n/g, '\n')
  if (!normalized) return normalized

  const lines = normalized.split('\n')
  const fenceRegex = /^\s*(```|~~~)/
  const nextBlockStartRegex = /^\s*(#{1,6}\s|>+\s|([-*+]|\d+\.)\s|(```|~~~))/

  let inFence = false
  const out: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i] ?? ''
    const line = rawLine.replace(/\s+$/, '')
    const nextLine = lines[i + 1] ?? ''

    if (fenceRegex.test(line)) {
      inFence = !inFence
      out.push(rawLine)
      continue
    }

    if (inFence) {
      out.push(rawLine)
      continue
    }

    const isBlank = line.trim().length === 0
    const nextIsBlank = nextLine.trim().length === 0
    const nextStartsBlock = nextBlockStartRegex.test(nextLine)
    const isTableRow = /^\s*\|.*\|\s*$/.test(line)

    if (!isBlank && !nextIsBlank && !nextStartsBlock && !isTableRow) {
      out.push(`${line}  `)
      continue
    }

    out.push(rawLine)
  }

  return out.join('\n')
}
