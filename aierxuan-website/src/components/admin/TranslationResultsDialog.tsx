// src/components/admin/TranslationResultsDialog.tsx
'use client'

interface TranslationResult {
  language: string
  languageName: string
  success: boolean
  content?: any
  confidence?: number
  tokensUsed?: number
  cost?: number
  error?: string
}

interface TranslationResultsDialogProps {
  isOpen: boolean
  results: TranslationResult[]
  totalCost: number
  totalTokens: number
  statistics?: {
    successCount: number
    totalCount: number
    totalTokens: number
    totalCost: number
    averageQuality: number
  }
  onClose: () => void
}

export default function TranslationResultsDialog({
  isOpen,
  results,
  totalCost,
  totalTokens,
  statistics,
  onClose
}: TranslationResultsDialogProps) {
  if (!isOpen) return null

  const successResults = results.filter(r => r.success)
  const failedResults = results.filter(r => !r.success)

  const getLanguageInfo = (language: string) => {
    const info: Record<string, { name: string; flag: string; nativeName: string }> = {
      'ru': { name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
      'ja': { name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
      'fr': { name: 'French', flag: '🇫🇷', nativeName: 'Français' },
      'pt': { name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    }
    return info[language] || { name: language, flag: '🌐', nativeName: language }
  }

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500'
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (confidence?: number) => {
    if (!confidence) return '未评估'
    if (confidence >= 90) return '优秀'
    if (confidence >= 80) return '良好'
    return '需要检查'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">翻译完成！</h3>
                <p className="text-sm text-gray-500">
                  {successResults.length} 个语言成功，{failedResults.length} 个失败
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{successResults.length}</div>
              <div className="text-sm text-gray-600">翻译成功</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedResults.length}</div>
              <div className="text-sm text-gray-600">翻译失败</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTokens.toLocaleString()}</div>
              <div className="text-sm text-gray-600">总Token数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">${totalCost.toFixed(4)}</div>
              <div className="text-sm text-gray-600">预估成本</div>
            </div>
          </div>
        </div>

        {/* 结果详情 */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {/* 成功的翻译 */}
            {successResults.length > 0 && (
              <div>
                <h4 className="font-medium text-green-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  翻译成功的语言 ({successResults.length})
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {successResults.map(result => {
                    const langInfo = getLanguageInfo(result.language)
                    return (
                      <div key={result.language} className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{langInfo.flag}</span>
                            <div>
                              <div className="font-medium text-green-800">{langInfo.name}</div>
                              <div className="text-sm text-green-600">{langInfo.nativeName}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                              质量评分: {result.confidence}%
                            </div>
                            <div className="text-xs text-gray-500">
                              {getConfidenceLabel(result.confidence)}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Token数:</span>
                            <span className="ml-2 font-medium">{result.tokensUsed?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">成本:</span>
                            <span className="ml-2 font-medium">${result.cost?.toFixed(4)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">置信度:</span>
                            <div className="inline-block ml-2">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    result.confidence && result.confidence >= 90 ? 'bg-green-600' :
                                    result.confidence && result.confidence >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                                  }`}
                                  style={{ width: `${result.confidence || 0}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 内容预览 */}
                        {result.content && (
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <div className="text-xs text-gray-600 mb-1">内容预览:</div>
                            <div className="text-sm text-gray-800 bg-white rounded p-2">
                              <div className="font-medium text-gray-900 truncate">
                                {result.content.title || '无标题'}
                              </div>
                              <div className="text-gray-600 text-xs mt-1 line-clamp-2">
                                {result.content.short_desc || result.content.excerpt || '无描述'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 失败的翻译 */}
            {failedResults.length > 0 && (
              <div>
                <h4 className="font-medium text-red-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  翻译失败的语言 ({failedResults.length})
                </h4>
                <div className="space-y-2">
                  {failedResults.map(result => {
                    const langInfo = getLanguageInfo(result.language)
                    return (
                      <div key={result.language} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{langInfo.flag}</span>
                            <div>
                              <div className="font-medium text-red-800">{langInfo.name}</div>
                              <div className="text-sm text-red-600">{langInfo.nativeName}</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-red-700">
                          错误原因: {result.error}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <div className="font-medium mb-1">使用建议:</div>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>建议检查专业术语和技术参数的准确性</li>
                <li>高质量翻译(≥90%)可以直接使用，80-89%建议微调</li>
                <li>翻译结果已自动保存到表单中，可以切换语言标签页查看</li>
                <li>如果发现问题，可以手动修改或重新翻译</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            开始检查翻译结果
          </button>
        </div>
      </div>
    </div>
  )
}
