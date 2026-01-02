import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { translateBlogFields, translateProductFields } from '@/lib/translation/deepseek'
import { hashSessionToken } from '@/lib/auth-security'

type Params = {
  content: any
  targetLanguages: string[]
  contentType: 'blog' | 'product'
  sourceLanguage?: string
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

          const results: any[] = []
          let currentStep = 1

          // Validate
          controller.enqueue(
            encoder.encode(
              sse({ type: 'step_update', step: { ...steps[0], status: 'completed' }, currentStep, progress: 5 })
            )
          )

          // Per language
          for (let i = 0; i < params.targetLanguages.length; i++) {
            const lang = params.targetLanguages[i]
            const stepInfo = { id: `translate-${lang}`, name: `翻译成${lang}`, status: 'processing', message: `翻译中 ${lang}...` }
            currentStep = i + 1
            controller.enqueue(
              encoder.encode(sse({ type: 'step_update', step: stepInfo, currentStep, progress: Math.min(10 + i * 80 / params.targetLanguages.length, 95) }))
            )

            try {
              let translated: any
              if (params.contentType === 'blog') {
                translated = await translateBlogFields(params.content, lang)
              } else if (params.contentType === 'product') {
                translated = await translateProductFields(params.content, lang)
              } else {
                throw new Error('Unsupported content type')
              }
              results.push({ language: lang, languageName: lang, success: true, content: translated })
              controller.enqueue(
                encoder.encode(
                  sse({
                    type: 'step_complete',
                    step: { id: `translate-${lang}`, name: `翻译成${lang}`, status: 'completed', message: '完成' },
                    // Include full translated content in streamed step result
                    result: { language: lang, success: true, content: translated },
                    totalTokens: 0,
                    totalCost: 0,
                    progress: Math.min(10 + (i + 1) * 80 / params.targetLanguages.length, 98),
                  })
                )
              )
            } catch (e: any) {
              results.push({ language: lang, languageName: lang, success: false, error: e?.message || '翻译失败' })
              controller.enqueue(
                encoder.encode(
                  sse({
                    type: 'step_complete',
                    step: { id: `translate-${lang}`, name: `翻译成${lang}`, status: 'error', message: e?.message || '失败' },
                    // Keep shape consistent even on error
                    result: { language: lang, success: false, error: e?.message, content: null },
                    totalTokens: 0,
                    totalCost: 0,
                    progress: Math.min(10 + (i + 1) * 80 / params.targetLanguages.length, 98),
                  })
                )
              )
            }
          }

          // Finalization
          controller.enqueue(
            encoder.encode(
              sse({ type: 'step_update', step: { id: 'finalization', name: '完成处理', status: 'completed', message: '完成' }, currentStep: steps.length, progress: 100 })
            )
          )

          controller.enqueue(
            encoder.encode(
              sse({ type: 'complete', steps, results, statistics: { successCount: results.filter(r=>r.success).length, totalCount: results.length, totalTokens: 0, totalCost: 0 } })
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
    const results: any[] = []
    for (const lang of params.targetLanguages) {
      try {
        let translated: any
        if (params.contentType === 'blog') {
          translated = await translateBlogFields(params.content, lang)
        } else if (params.contentType === 'product') {
          translated = await translateProductFields(params.content, lang)
        } else {
          throw new Error('Unsupported content type')
        }
        results.push({ language: lang, languageName: lang, success: true, content: translated })
      } catch (e: any) {
        results.push({ language: lang, languageName: lang, success: false, error: e?.message || '翻译失败' })
      }
    }

    return NextResponse.json({
      steps: [],
      results,
      statistics: { successCount: results.filter(r=>r.success).length, totalCount: results.length, totalTokens: 0, totalCost: 0 },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '翻译请求失败' }, { status: 500 })
  }
}
