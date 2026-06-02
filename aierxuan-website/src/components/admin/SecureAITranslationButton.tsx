// src/components/admin/SecureAITranslationButton.tsx
'use client'

import { useState } from 'react'
import { useSecureTranslation } from '@/hooks/useSecureTranslation'
import TranslationProgressDialog from './TranslationProgressDialog'
import TranslationResultsDialog from './TranslationResultsDialog'

interface SecureAITranslationButtonProps {
  content: any
  contentType: 'product' | 'blog' | 'faq'
  onTranslationComplete: (translations: any[], results: any[]) => void
  disabled?: boolean
}

export default function SecureAITranslationButton({
  content,
  contentType,
  onTranslationComplete,
  disabled = false
}: SecureAITranslationButtonProps) {
  const { translateProduct, translateBlog, translateFAQ, translationState, resetTranslation, cancelTranslation } = useSecureTranslation({
    onSuccess: (translations, results) => {
      // 翻译完成：关闭进度、展示结果并把内容回填到表单
      setTranslationResults(results)
      setShowProgressDialog(false)
      setShowResultsDialog(true)
      try {
        // 通过父组件回调回填各语言内容
        onTranslationComplete(translations || [], results || [])
      } catch (e) {
        console.error('onTranslationComplete failed:', e)
      }

      // 结果提示
      const successCount = results.filter((r: any) => r.success).length
      const errorCount = results.filter((r: any) => !r.success).length
      if (errorCount === 0) {
        showNotification({
          type: 'success',
          title: '🎉 翻译全部成功',
          message: `${successCount} 种语言全部翻译完成`,
          duration: 4000
        })
      } else {
        showNotification({
          type: 'warning',
          title: '⚠️ 部分翻译成功',
          message: `${successCount} 种语言成功，${errorCount} 种语言失败`,
          duration: 6000
        })
      }
    },
    onError: (error) => {
      showNotification({
        type: 'error',
        title: '翻译失败',
        message: error,
        duration: 5000
      })
    },
    onProgress: (state) => {
      // 可以在这里处理进度更新
    }
  })

  const [showProgressDialog, setShowProgressDialog] = useState(false)
  const [showResultsDialog, setShowResultsDialog] = useState(false)
  const [translationResults, setTranslationResults] = useState<any[]>([])

  const targetLanguages = ['ru', 'ja', 'fr', 'pt']
  const [languageConcurrency, setLanguageConcurrency] = useState<number>(3)

  const hasValidSourceContent = () => {
    if (!content) return false
    if (contentType === 'product') return Boolean(content.title && content.long_desc)
    if (contentType === 'blog') return Boolean(content.title && content.body)
    if (contentType === 'faq') return Boolean(content.question && content.answer)
    return false
  }

  const handleAITranslate = async () => {
    // 验证源内容
    if (!hasValidSourceContent()) {
      showNotification({
        type: 'error',
        title: '内容不完整',
        message:
          contentType === 'faq'
            ? '请确保英文 Question 和 Answer 已填写完整'
            : '请确保标题和描述/正文已填写完整',
        duration: 4000
      })
      return
    }

    setShowProgressDialog(true)
    resetTranslation()

    try {
      if (contentType === 'product') {
        await translateProduct(content, targetLanguages, { languageConcurrency })
      } else if (contentType === 'blog') {
        await translateBlog(content, targetLanguages, { languageConcurrency })
      } else {
        await translateFAQ(content, targetLanguages, { languageConcurrency })
      }
      // 具体的回填与提示在 onSuccess 中统一处理
    } catch (error) {
      console.error('Translation failed:', error)
      setShowProgressDialog(false)
    }
  }

  const handleCancelTranslation = () => {
    cancelTranslation()
    setShowProgressDialog(false)
    showNotification({
      type: 'info',
      title: '翻译已取消',
      message: '翻译任务已被取消',
      duration: 3000
    })
  }

  const getButtonState = () => {
    if (translationState.isTranslating) {
      return {
        text: '翻译进行中...',
        className: 'bg-gray-400 cursor-not-allowed',
        showProgress: true,
        disabled: true
      }
    }

    if (translationState.errors.length > 0) {
      return {
        text: '部分翻译失败，点击重试',
        className: 'bg-yellow-600 hover:bg-yellow-700',
        showProgress: false,
        disabled: false
      }
    }

    if (translationState.results.length > 0) {
      return {
        text: '重新翻译',
        className: 'bg-purple-600 hover:bg-purple-700',
        showProgress: false,
        disabled: false
      }
    }

    return {
      text: 'DeepSeek AI 智能翻译',
      className: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
      showProgress: false,
      disabled: false
    }
  }

  const buttonState = getButtonState()

  const getCompletedTranslationCount = () => {
    // Count only translate-* steps (exclude validation/finalization)
    const translateSteps = translationState.steps.filter(s => s.id.startsWith('translate-'))
    const done = translateSteps.filter(s => s.status === 'completed' || s.status === 'error')
    return { done: done.length, total: translateSteps.length }
  }

  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      'ru': 'Russian',
      'ja': 'Japanese',
      'fr': 'French',
      'pt': 'Portuguese',
    }
    return languages[code] || code
  }

  return (
    <>
      <div className="space-y-3">
        {/* 并发设置（更稳妥：默认 3） */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-gray-500">并发</span>
          {[2, 3, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setLanguageConcurrency(n)}
              disabled={translationState.isTranslating}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${
                languageConcurrency === n
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              } ${translationState.isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={n === 5 ? '更快但更容易触发限流/失败' : '更稳妥，成功率更高'}
            >
              {n}
            </button>
          ))}
        </div>

        {/* 主翻译按钮 */}
        <button
          onClick={handleAITranslate}
          disabled={disabled || buttonState.disabled}
          className={`w-full text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 ${buttonState.className} ${
            disabled || buttonState.disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {translationState.isTranslating ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
              <div className="text-left">
                <div className="font-medium">{buttonState.text}</div>
                {translationState.currentLanguage && (
                  <div className="text-xs opacity-80">
                    {getLanguageName(translationState.currentLanguage)}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {buttonState.text}
            </div>
          )}
        </button>

        {/* 简化的进度显示 */}
        {translationState.isTranslating && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex justify-between text-sm text-blue-600 mb-2">
              <span>进度: {translationState.progress}%</span>
              <span>{getCompletedTranslationCount().done}/{getCompletedTranslationCount().total}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${translationState.progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-blue-600">
              {translationState.steps[translationState.currentStep]?.message}
            </div>

            {/* 取消按钮 */}
            <button
              onClick={handleCancelTranslation}
              className="mt-2 w-full text-xs text-red-600 hover:text-red-800 font-medium"
            >
              取消翻译
            </button>
          </div>
        )}

        {/* 快速结果预览 */}
        {!translationState.isTranslating && translationState.results.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-800">最近翻译结果</h4>
              <button
                onClick={() => setShowResultsDialog(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                查看详情
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-3">
              {translationState.results.map(result => (
                <div key={result.language} className="text-center">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs ${
                    result.success
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? '✓' : '✗'}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {getLanguageFlag(result.language)}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-green-700 space-y-1">
              <div>成功: {translationState.results.filter(r => r.success).length}/{translationState.results.length}</div>
              <div>总成本: ${translationState.totalCost.toFixed(4)}</div>
            </div>
          </div>
        )}

        {/* 安全提示 */}
        <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
          🔒 安全提示：您的API密钥已安全存储在服务端，不会暴露给浏览器
        </div>
      </div>

      {/* 翻译进度对话框 */}
      <TranslationProgressDialog
        isOpen={showProgressDialog}
        state={translationState}
        onClose={() => {
          if (!translationState.isTranslating) {
            setShowProgressDialog(false)
          }
        }}
        onCancel={handleCancelTranslation}
      />

      {/* 翻译结果详情对话框 */}
      <TranslationResultsDialog
        isOpen={showResultsDialog}
        results={translationState.results}
        totalCost={translationState.totalCost}
        totalTokens={translationState.totalTokens}
        statistics={translationState.statistics}
        onClose={() => setShowResultsDialog(false)}
      />
    </>
  )
}

// 辅助函数
function getLanguageFlag(language: string): string {
  const flags: Record<string, string> = {
    'ru': '🇷🇺',
    'ja': '🇯🇵',
    'fr': '🇫🇷',
    'pt': '🇵🇹',
  }
  return flags[language] || '🌐'
}

// 简单的通知函数（可以替换为更完整的通知系统）
function showNotification({ type, title, message, duration }: {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}) {
  // 这里可以实现更复杂的通知系统
  if (typeof window !== 'undefined') {
    // 创建一个简单的通知元素
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
      type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
      type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
      'bg-blue-50 border-blue-200 text-blue-800'
    }`
    notification.style.borderColor = type === 'success' ? '#10b981' :
                                 type === 'error' ? '#ef4444' :
                                 type === 'warning' ? '#f59e0b' : '#3b82f6'

    notification.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          ${type === 'success' ? '✅' :
            type === 'error' ? '❌' :
            type === 'warning' ? '⚠️' : 'ℹ️'}
        </div>
        <div class="ml-3">
          <h4 class="font-medium">${title}</h4>
          <p class="text-sm mt-1">${message}</p>
        </div>
        <button class="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
          ✕
        </button>
      </div>
    `

    document.body.appendChild(notification)

    // 自动移除
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, duration || 5000)
  }
}
