// src/components/admin/TranslationProgressDialog.tsx
'use client'

import { TranslationState } from '@/hooks/useSecureTranslation'

interface TranslationProgressDialogProps {
  isOpen: boolean
  state: TranslationState
  onClose: () => void
  onCancel?: () => void
}

export default function TranslationProgressDialog({
  isOpen,
  state,
  onClose,
  onCancel
}: TranslationProgressDialogProps) {
  if (!isOpen) return null

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
      case 'processing':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )
      case 'completed':
        return (
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'error':
        return (
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
    }
  }

  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      'ru': 'Russian',
      'ja': 'Japanese',
      'fr': 'French',
      'pt': 'Portuguese',
      'zh-CN': 'Chinese (Simplified)'
    }
    return languages[code] || code
  }

  const getElapsedTime = () => {
    if (!state.startTime) return '00:00'
    const elapsed = Date.now() - state.startTime
    const minutes = Math.floor(elapsed / 60000)
    const seconds = Math.floor((elapsed % 60000) / 1000)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const successCount = state.results.filter(r => r.success).length
  const errorCount = state.results.length - successCount
  const translateSteps = state.steps.filter(s => s.id.startsWith('translate-'))
  const completedTranslateSteps = translateSteps.filter(s => s.status === 'completed' || s.status === 'error')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                state.isTranslating ? 'bg-blue-100' :
                errorCount > 0 ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                {state.isTranslating ? (
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : errorCount > 0 ? (
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {state.isTranslating ? 'DeepSeek AI 翻译进行中' : '翻译完成'}
                </h3>
                <p className="text-sm text-gray-500">
                  {state.isTranslating
                    ? `正在处理: ${state.currentLanguage ? getLanguageName(state.currentLanguage) : '初始化中...'}`
                    : `${successCount} 个语言翻译成功${errorCount > 0 ? `, ${errorCount} 个失败` : ''}`
                  }
                </p>
              </div>
            </div>
            <button
              onClick={state.isTranslating ? (onCancel || onClose) : onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>总体进度</span>
            <span>{state.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                errorCount > 0 ? 'bg-yellow-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{ width: `${state.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>已用时间: {getElapsedTime()}</span>
            <span>语言: {completedTranslateSteps.length}/{translateSteps.length}</span>
          </div>
        </div>

        {/* 步骤详情 */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {state.steps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      step.status === 'error' ? 'text-red-600' :
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'processing' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {step.name}
                    </p>
                    {step.tokensUsed && (
                      <span className="text-xs text-gray-500">
                        {step.tokensUsed.toLocaleString()} tokens
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    step.status === 'error' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {step.message}
                  </p>
                  {step.cost && (
                    <p className="text-xs text-gray-400 mt-1">
                      成本: ${step.cost.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 错误列表 */}
          {state.errors.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-medium text-red-800 mb-2">翻译失败的语言:</h4>
              <div className="space-y-2">
                {state.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-700">
                    <span className="font-medium">{getLanguageName(error.language)}: </span>
                    <span>{error.error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 底部统计 */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                总Token: <span className="font-medium">{state.totalTokens.toLocaleString()}</span>
              </span>
              <span className="text-gray-600">
                预估成本: <span className="font-medium">${state.totalCost.toFixed(4)}</span>
              </span>
            </div>
            {!state.isTranslating && (
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                查看翻译结果
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
