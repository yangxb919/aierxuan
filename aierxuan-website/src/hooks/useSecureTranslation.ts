// src/hooks/useSecureTranslation.ts
import { useState, useCallback, useRef } from 'react'

export interface TranslationStep {
  id: string
  name: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  message: string
  startTime?: number
  endTime?: number
  tokensUsed?: number
  cost?: number
}

export interface TranslationResult {
  language: string
  languageName: string
  success: boolean
  content?: any
  confidence?: number
  tokensUsed?: number
  cost?: number
  error?: string
}

export interface TranslationState {
  isTranslating: boolean
  currentStep: number
  totalSteps: number
  currentLanguage: string
  progress: number
  totalTokens: number
  totalCost: number
  estimatedTime: number
  startTime?: number
  steps: TranslationStep[]
  results: TranslationResult[]
  errors: Array<{
    language: string
    error: string
    timestamp: number
  }>
  statistics?: {
    successCount: number
    totalCount: number
    totalTokens: number
    totalCost: number
    averageQuality: number
  }
}

export interface UseSecureTranslationOptions {
  onSuccess?: (translations: any[], results: TranslationResult[]) => void
  onError?: (error: string) => void
  onProgress?: (state: TranslationState) => void
}

type ContentType = 'product' | 'blog' | 'faq'
type TranslationOptions = {
  languageConcurrency?: number
}

export function useSecureTranslation({
  onSuccess,
  onError,
  onProgress
}: UseSecureTranslationOptions = {}) {
  const runIdRef = useRef(0)
  const [translationState, setTranslationState] = useState<TranslationState>({
    isTranslating: false,
    currentStep: 0,
    totalSteps: 0,
    currentLanguage: '',
    progress: 0,
    totalTokens: 0,
    totalCost: 0,
    estimatedTime: 0,
    steps: [],
    results: [],
    errors: []
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const stateRef = useRef<TranslationState>(translationState)

  // keep an always-fresh snapshot for callbacks
  const setStateAndSyncRef = useCallback((updater: (prev: TranslationState) => TranslationState) => {
    setTranslationState(prev => {
      const next = updater(prev)
      stateRef.current = next
      return next
    })
  }, [])

  // 从步骤ID获取当前语言
  const getCurrentLanguageFromStep = useCallback((stepId: string): string => {
    const match = stepId.match(/translate-(.+)/)
    return match ? match[1] : ''
  }, [])

  // 检查用户是否已登录（简单检查）
  const checkUserAuth = async (): Promise<void> => {
    // 现在认证由后端API自动处理，我们只需要确保用户已登录管理后台
    // 如果API返回401，错误处理逻辑会显示相应的错误信息
  }

  // 获取语言名称
  const getLanguageName = useCallback((code: string): string => {
    const languages: Record<string, string> = {
      'ru': 'Russian',
      'ja': 'Japanese',
      'fr': 'French',
      'pt': 'Portuguese',
    }
    return languages[code] || code
  }, [])

  // 重置翻译状态
  const resetTranslation = useCallback(() => {
    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = null

    const next: TranslationState = {
      isTranslating: false,
      currentStep: 0,
      totalSteps: 0,
      currentLanguage: '',
      progress: 0,
      totalTokens: 0,
      totalCost: 0,
      estimatedTime: 0,
      steps: [],
      results: [],
      errors: []
    }
    stateRef.current = next
    setTranslationState(next)
  }, [])

  // 处理流数据
  const handleStreamData = useCallback((runId: number, data: any) => {
    if (runId !== runIdRef.current) return
    switch (data.type) {
      case 'init':
        setTranslationState(prev => ({
          ...prev,
          steps: data.steps,
          totalSteps: data.totalSteps
        }))
        break

      case 'step_update': {
        setStateAndSyncRef(prev => ({
          ...prev,
          steps: prev.steps.map(step => (step.id === data.step.id ? data.step : step)),
          currentStep: data.currentStep,
          progress: data.progress,
          currentLanguage: getCurrentLanguageFromStep(data.step.id),
        }))
        onProgress?.(stateRef.current)
        break
      }

      case 'step_complete': {
        console.log(`✅ Step complete for ${data.result.language}`)
        console.log('📦 Result data:', data.result)
        console.log('🔍 Has content?', !!data.result.content)

        setStateAndSyncRef(prev => {
          const updatedResults: TranslationResult[] = [...prev.results]
          const existingIndex = updatedResults.findIndex(r => r.language === data.result.language)

          if (existingIndex >= 0) {
            updatedResults[existingIndex] = data.result
            console.log(`🔄 Updated existing result at index ${existingIndex}`)
          } else {
            updatedResults.push(data.result)
            console.log(`➕ Added new result, total: ${updatedResults.length}`)
          }

          console.log('📊 Updated results array:', updatedResults)

          const next: TranslationState = {
            ...prev,
            steps: prev.steps.map(step =>
              step.id === data.step.id ? data.step : step
            ),
            results: updatedResults,
            totalTokens: data.totalTokens,
            totalCost: data.totalCost,
            progress: data.progress
          }
          return next
        })
        onProgress?.(stateRef.current)
        break
      }

      case 'complete': {
        console.log('🎉 Translation complete event received')
        console.log('📊 Complete data:', data)
        console.log('📋 Results array:', data.results)

        const finalState: TranslationState = {
          ...stateRef.current,
          isTranslating: false,
          progress: 100,
          steps: data.steps,
          results: data.results,
          statistics: data.statistics,
          totalTokens: data.statistics.totalTokens,
          totalCost: data.statistics.totalCost
        }

        setTranslationState(finalState)
        stateRef.current = finalState

        // 调用成功回调
        const translations = data.results
          .filter((r: TranslationResult) => r.success)
          .map((r: TranslationResult) => r.content)

        console.log('✅ Extracted translations:', translations)
        console.log('📤 Calling onSuccess with:', { translations, results: data.results })

        onSuccess?.(translations, data.results)
        break
      }

      case 'error':
        setTranslationState(prev => ({
          ...prev,
          isTranslating: false,
          errors: [...prev.errors, {
            language: 'system',
            error: data.error,
            timestamp: Date.now()
          }]
        }))
        onError?.(data.error)
        break
    }
  }, [getCurrentLanguageFromStep, onSuccess, onError, onProgress, setStateAndSyncRef])

  // 使用fetch进行流式翻译
  const startStreamTranslation = async (params: any, runId: number) => {
    if (runId !== runIdRef.current) return
    try {
      // allow cancel via AbortController
      const controller = new AbortController()
      abortControllerRef.current?.abort()
      abortControllerRef.current = controller

      const response = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(params),
        signal: controller.signal
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || '翻译请求失败')
      }

      if (!response.body) {
        throw new Error('响应体为空')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        if (runId !== runIdRef.current) {
          controller.abort()
          try { await reader.cancel() } catch {}
          return
        }
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // 保留不完整的行

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6))
              handleStreamData(runId, data)
            } catch (parseError) {
              console.error('Failed to parse SSE data:', parseError)
            }
          }
        }
      }

    } catch (error) {
      if (runId !== runIdRef.current) return
      if ((error as any)?.name === 'AbortError' || abortControllerRef.current?.signal.aborted) return
      console.error('Stream translation failed:', error)
      // 如果流式请求失败，尝试普通API调用
      await fallbackToNormalAPI(params, runId, abortControllerRef.current?.signal)
    }
  }

  // 备用API调用（当流式请求失败时）
  const fallbackToNormalAPI = async (params: any, runId: number, signal?: AbortSignal) => {
    if (runId !== runIdRef.current) return
    try {
      const response = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
        signal
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || '翻译请求失败')
      }

      const data = await response.json()

      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        progress: 100,
        steps: data.steps,
        results: data.results,
        statistics: data.statistics,
        totalTokens: data.statistics.totalTokens,
        totalCost: data.statistics.totalCost
      }))

      const translations = data.results
        .filter((r: TranslationResult) => r.success)
        .map((r: TranslationResult) => r.content)

      onSuccess?.(translations, data.results)

    } catch (error) {
      if (runId !== runIdRef.current) return
      if ((error as any)?.name === 'AbortError' || signal?.aborted) return
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        errors: [...prev.errors, {
          language: 'system',
          error: errorMessage,
          timestamp: Date.now()
        }]
      }))
      onError?.(errorMessage)
      throw error
    }
  }

  // 翻译产品
  const translateProduct = useCallback(async (
    englishContent: any,
    targetLanguages: string[],
    options?: TranslationOptions
  ) => {
    return await translateContent({
      content: englishContent,
      targetLanguages,
      contentType: 'product',
      sourceLanguage: 'en',
      languageConcurrency: options?.languageConcurrency
    })
  }, [])

  // 翻译博客
  const translateBlog = useCallback(async (
    englishContent: any,
    targetLanguages: string[],
    options?: TranslationOptions
  ) => {
    return await translateContent({
      content: englishContent,
      targetLanguages,
      contentType: 'blog',
      sourceLanguage: 'en',
      languageConcurrency: options?.languageConcurrency
    })
  }, [])

  // 翻译 FAQ
  const translateFAQ = useCallback(async (
    englishContent: any,
    targetLanguages: string[],
    options?: TranslationOptions
  ) => {
    return await translateContent({
      content: englishContent,
      targetLanguages,
      contentType: 'faq',
      sourceLanguage: 'en',
      languageConcurrency: options?.languageConcurrency
    })
  }, [])

  // 核心翻译函数
  const translateContent = useCallback(async (params: {
    content: any
    targetLanguages: string[]
    contentType: ContentType
    sourceLanguage?: string
    languageConcurrency?: number
  }) => {
    try {
      const runId = ++runIdRef.current
      // 重置状态
      resetTranslation()

      // 检查用户认证状态（后端会自动处理）
      await checkUserAuth()

      // 初始化状态
      const steps: TranslationStep[] = [
        {
          id: 'validation',
          name: '验证内容',
          status: 'pending',
          message: '检查源内容完整性...'
        },
        ...params.targetLanguages.map(lang => ({
          id: `translate-${lang}`,
          name: `翻译成${getLanguageName(lang)}`,
          status: 'pending' as const,
          message: `准备翻译成${getLanguageName(lang)}...`
        })),
        {
          id: 'finalization',
          name: '完成处理',
          status: 'pending' as const,
          message: '整理翻译结果...'
        }
      ]

      setTranslationState({
        isTranslating: true,
        currentStep: 0,
        totalSteps: steps.length,
        currentLanguage: '',
        progress: 0,
        totalTokens: 0,
        totalCost: 0,
        estimatedTime: params.targetLanguages.length * 15,
        startTime: Date.now(),
        steps,
        results: [],
        errors: []
      })

      // 使用流式翻译
      await startStreamTranslation(params, runId)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      console.error('Translation error:', error)
      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        errors: [...prev.errors, {
          language: 'system',
          error: errorMessage,
          timestamp: Date.now()
        }]
      }))
      onError?.(errorMessage)
    }
  }, [resetTranslation, getLanguageName, onError])

  // 取消翻译
  const cancelTranslation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    resetTranslation()
  }, [resetTranslation])

  // 重试失败的语言
  const retryFailedLanguages = useCallback(async () => {
    const failedResults = translationState.results.filter(r => !r.success)
    if (failedResults.length === 0) return

    const failedLanguages = failedResults.map(r => r.language)

    // 这里可以实现重试逻辑
    console.log('Retrying failed languages:', failedLanguages)

    // 重新翻译失败的语言
    // ...
  }, [translationState.results])

  return {
    translateProduct,
    translateBlog,
    translateFAQ,
    translationState,
    resetTranslation,
    cancelTranslation,
    retryFailedLanguages
  }
}
