import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { translateBlogFields, translateFAQFields, translateProductFields } from '@/lib/translation/deepseek'
import { hashSessionToken } from '@/lib/auth-security'

type Params = {
  content: any
  targetLanguages: string[]
  contentType: 'blog' | 'product' | 'faq'
  sourceLanguage?: string
  languageConcurrency?: number
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length)
  if (items.length === 0) return results

  const concurrency = Math.max(1, Math.min(limit, items.length))
  let nextIndex = 0

  const runners = Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = nextIndex++
      if (i >= items.length) break
      results[i] = await worker(items[i], i)
    }
  })

  await Promise.all(runners)
  return results
}

function getLanguageRetryConfig() {
  const maxAttempts = Math.max(1, Number(process.env.TRANSLATE_LANGUAGE_MAX_ATTEMPTS || 2))
  const delayMs = Math.max(0, Number(process.env.TRANSLATE_LANGUAGE_RETRY_DELAY_MS || 1200))
  return { maxAttempts, delayMs }
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

async function ensureAdminAuth() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value
  if (!sessionToken) {
    return { ok: false as const, error: 'Unauthorized: no admin session' }
  }
  const supabase = createSupabaseAdminClient()
  const hashedToken = hashSessionToken(sessionToken)
  const { data, error } = await (supabase.rpc as any)('validate_admin_session', { token: hashedToken }) as { data: any[] | null, error: any }
  if (error || !data || data.length === 0) {
    return { ok: false as const, error: 'Unauthorized: invalid or expired session' }
  }
  return { ok: true as const }
}

function sse(data: any) {
  return `data: ${JSON.stringify(data)}\n\n`
}

export async function POST(request: NextRequest) {
  // Auth
  const auth = await ensureAdminAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  let params: Params
  try {
    params = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!params?.content || !Array.isArray(params?.targetLanguages)) {
    return NextResponse.json({ error: 'Missing content or targetLanguages' }, { status: 400 })
  }

  const wantsSSE = request.headers.get('accept')?.includes('text/event-stream')

  // Streaming mode
  if (wantsSSE) {
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          const steps = [
            { id: 'validation', name: '验证内容', status: 'processing', message: '检查源内容完整性...' },
            ...params.targetLanguages.map((l) => ({
              id: `translate-${l}`,
              name: `翻译成${l}`,
              status: 'pending',
              message: `准备翻译成${l}...`,
            })),
            { id: 'finalization', name: '完成处理', status: 'pending', message: '整理翻译结果...' },
          ]
          controller.enqueue(encoder.encode(sse({ type: 'init', steps, totalSteps: steps.length })))

          const resultsByLang = new Map<string, any>()
          let completedCount = 0

          // Validate
          controller.enqueue(
            encoder.encode(
              sse({ type: 'step_update', step: { ...steps[0], status: 'completed' }, currentStep: 0, progress: 5 })
            )
          )

          // Per language (parallel with limit)
          const requestedConcurrency = Number(params.languageConcurrency)
          const envConcurrency = Number(process.env.TRANSLATE_LANGUAGE_CONCURRENCY || 3)
          const languageConcurrency = Math.max(1, Math.min(
            Number.isFinite(requestedConcurrency) && requestedConcurrency > 0 ? requestedConcurrency : envConcurrency,
            params.targetLanguages.length
          ))

          const updateProgress = () => {
            return Math.min(
              10 + (completedCount * 80) / Math.max(1, params.targetLanguages.length),
              98
            )
          }

          await mapLimit(params.targetLanguages, languageConcurrency, async (lang) => {
            const { maxAttempts, delayMs } = getLanguageRetryConfig()
            const stepInfo = {
              id: `translate-${lang}`,
              name: `翻译成${lang}`,
              status: 'processing',
              message: `翻译中 ${lang}...`,
            }

            controller.enqueue(
              encoder.encode(
                sse({
                  type: 'step_update',
                  step: stepInfo,
                  currentStep: completedCount,
                  progress: updateProgress(),
                })
              )
            )

            let lastError: any = null
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
              try {
                if (attempt > 1) {
                  controller.enqueue(
                    encoder.encode(
                      sse({
                        type: 'step_update',
                        step: {
                          id: `translate-${lang}`,
                          name: `翻译成${lang}`,
                          status: 'processing',
                          message: `重试中 ${lang}...（第 ${attempt}/${maxAttempts} 次）`,
                        },
                        currentStep: completedCount,
                        progress: updateProgress(),
                      })
                    )
                  )
                  if (delayMs > 0) await sleep(delayMs)
                }

                let translated: any
                if (params.contentType === 'blog') {
                  translated = await translateBlogFields(params.content, lang)
                } else if (params.contentType === 'product') {
                  translated = await translateProductFields(params.content, lang)
                } else if (params.contentType === 'faq') {
                  translated = await translateFAQFields(params.content, lang)
                } else {
                  throw new Error('Unsupported content type')
                }

                const result = { language: lang, languageName: lang, success: true, content: translated }
                resultsByLang.set(lang, result)

                completedCount++
                controller.enqueue(
                  encoder.encode(
                    sse({
                      type: 'step_complete',
                      step: { id: `translate-${lang}`, name: `翻译成${lang}`, status: 'completed', message: '完成' },
                      // Include full translated content in streamed step result
                      result: { language: lang, success: true, content: translated },
                      totalTokens: 0,
                      totalCost: 0,
                      currentStep: completedCount,
                      progress: updateProgress(),
                    })
                  )
                )
                return
              } catch (e: any) {
                lastError = e
                console.error('[translate] failed', {
                  contentType: params.contentType,
                  language: lang,
                  attempt,
                  maxAttempts,
                  message: e?.message,
                })
              }
            }

            const result = { language: lang, languageName: lang, success: false, error: lastError?.message || '翻译失败' }
            resultsByLang.set(lang, result)

            completedCount++
            controller.enqueue(
              encoder.encode(
                sse({
                  type: 'step_complete',
                  step: { id: `translate-${lang}`, name: `翻译成${lang}`, status: 'error', message: lastError?.message || '失败' },
                  // Keep shape consistent even on error
                  result: { language: lang, success: false, error: lastError?.message, content: null },
                  totalTokens: 0,
                  totalCost: 0,
                  currentStep: completedCount,
                  progress: updateProgress(),
                })
              )
            )
          })

          // Finalization
          controller.enqueue(
            encoder.encode(
              sse({ type: 'step_update', step: { id: 'finalization', name: '完成处理', status: 'completed', message: '完成' }, currentStep: steps.length, progress: 100 })
            )
          )

          const orderedResults = params.targetLanguages.map((l) => resultsByLang.get(l)).filter(Boolean)

          controller.enqueue(
            encoder.encode(
              sse({
                type: 'complete',
                steps,
                results: orderedResults,
                statistics: {
                  successCount: orderedResults.filter((r: any) => r.success).length,
                  totalCount: orderedResults.length,
                  totalTokens: 0,
                  totalCost: 0,
                },
              })
            )
          )
          controller.close()
        } catch (error: any) {
          controller.enqueue(encoder.encode(sse({ type: 'error', error: error?.message || '未知错误' })))
          controller.close()
        }
      },
    })

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  }

  // Non-streaming fallback
  try {
    const requestedConcurrency = Number(params.languageConcurrency)
    const envConcurrency = Number(process.env.TRANSLATE_LANGUAGE_CONCURRENCY || 3)
    const languageConcurrency = Math.max(1, Math.min(
      Number.isFinite(requestedConcurrency) && requestedConcurrency > 0 ? requestedConcurrency : envConcurrency,
      params.targetLanguages.length
    ))

    const { maxAttempts, delayMs } = getLanguageRetryConfig()
    const results = await mapLimit(params.targetLanguages, languageConcurrency, async (lang) => {
      let lastError: any = null
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          if (attempt > 1 && delayMs > 0) await sleep(delayMs)
          let translated: any
          if (params.contentType === 'blog') {
            translated = await translateBlogFields(params.content, lang)
          } else if (params.contentType === 'product') {
            translated = await translateProductFields(params.content, lang)
          } else if (params.contentType === 'faq') {
            translated = await translateFAQFields(params.content, lang)
          } else {
            throw new Error('Unsupported content type')
          }
          return { language: lang, languageName: lang, success: true, content: translated }
        } catch (e: any) {
          lastError = e
          console.error('[translate] failed', {
            contentType: params.contentType,
            language: lang,
            attempt,
            maxAttempts,
            message: e?.message,
          })
        }
      }
      return { language: lang, languageName: lang, success: false, error: lastError?.message || '翻译失败' }
    })

    return NextResponse.json({
      steps: [],
      results,
      statistics: { successCount: results.filter(r=>r.success).length, totalCount: results.length, totalTokens: 0, totalCost: 0 },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '翻译请求失败' }, { status: 500 })
  }
}
