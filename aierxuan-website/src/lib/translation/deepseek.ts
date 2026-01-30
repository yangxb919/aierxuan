// Utilities for DeepSeek-powered translation with chunking and markdown safety

import { createHash } from 'node:crypto'

type TranslateOptions = {
  targetLang: string
  systemPrompt?: string
}

const DEFAULT_SYSTEM_PROMPT = `You are a professional translator. Translate the user's content into the target language.
Rules:
- Preserve Markdown structure and formatting.
- Do NOT translate code blocks, inline code, URLs, filenames, or HTML tags.
- Keep lists, headings, tables, and links intact.
- Do not hallucinate or add content.
- If content is already in target language, keep it natural and correct typos.
`

type CacheEntry = {
  value: string
  expiresAt: number
}

const translationCache = new Map<string, CacheEntry>()

function sha256(input: string) {
  return createHash('sha256').update(input).digest('hex')
}

function getCacheLimits() {
  const maxEntries = Math.max(0, Number(process.env.TRANSLATE_CACHE_MAX || 500))
  const ttlMs = Math.max(0, Number(process.env.TRANSLATE_CACHE_TTL_MS || 10 * 60 * 1000))
  return { maxEntries, ttlMs }
}

function getGlobalConcurrencyLimit() {
  // Prefer speed by default; still cap to avoid runaway parallelism.
  return Math.max(1, Number(process.env.TRANSLATE_GLOBAL_CONCURRENCY || 10))
}

function createLimiter(limit: number) {
  let active = 0
  const queue: Array<() => void> = []

  const next = () => {
    if (active >= limit) return
    const run = queue.shift()
    if (!run) return
    active++
    run()
  }

  return async function limitFn<T>(fn: () => Promise<T>): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      const task = () => {
        Promise.resolve()
          .then(fn)
          .then(resolve, reject)
          .finally(() => {
            active--
            next()
          })
      }
      queue.push(task)
      next()
    })
  }
}

let globalLimiter: ReturnType<typeof createLimiter> | null = null
let globalLimiterLimit = 0

function withGlobalLimit<T>(fn: () => Promise<T>) {
  const desired = getGlobalConcurrencyLimit()
  if (!globalLimiter || globalLimiterLimit !== desired) {
    globalLimiter = createLimiter(desired)
    globalLimiterLimit = desired
  }
  return globalLimiter(fn)
}

function getRetryConfig() {
  const maxRetries = Math.max(0, Number(process.env.TRANSLATE_MAX_RETRIES || 2))
  const baseDelayMs = Math.max(0, Number(process.env.TRANSLATE_RETRY_BASE_DELAY_MS || 800))
  const maxDelayMs = Math.max(baseDelayMs, Number(process.env.TRANSLATE_RETRY_MAX_DELAY_MS || 8_000))
  return { maxRetries, baseDelayMs, maxDelayMs }
}

function isRetryableStatus(status: number) {
  // Rate limit / transient upstream errors
  return status === 408 || status === 409 || status === 425 || status === 429 || (status >= 500 && status <= 599)
}

function parseRetryAfterMs(value: string | null) {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  // Retry-After can be seconds or HTTP date; we handle seconds here.
  const seconds = Number(trimmed)
  if (!Number.isFinite(seconds) || seconds < 0) return null
  return seconds * 1000
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

// Simple masks for code blocks and inline code to avoid translation
export function maskMarkdown(text: string) {
  const codeBlocks: string[] = []
  const inlineCodes: string[] = []

  const masked = text
    // Triple backtick code blocks
    .replace(/```[\s\S]*?```/g, (m) => {
      const id = codeBlocks.push(m) - 1
      return `[[CODE_BLOCK_${id}]]`
    })
    // Inline code
    .replace(/`[^`\n]+`/g, (m) => {
      const id = inlineCodes.push(m) - 1
      return `[[CODE_INLINE_${id}]]`
    })

  return {
    masked,
    unmask: (s: string) =>
      s
        .replace(/\[\[CODE_BLOCK_(\d+)\]\]/g, (_, i) => codeBlocks[Number(i)] || '')
        .replace(/\[\[CODE_INLINE_(\d+)\]\]/g, (_, i) => inlineCodes[Number(i)] || ''),
  }
}

// Naive chunking by headings/blank lines with a soft char budget per chunk
export function chunkMarkdown(text: string, maxChars = 3000): string[] {
  if (!text) return []
  const paragraphs = text.split(/\n\n+/)
  const chunks: string[] = []
  let current = ''
  for (const p of paragraphs) {
    const add = (current ? current + '\n\n' : '') + p
    if (add.length > maxChars && current) {
      chunks.push(current)
      current = p
    } else if (add.length > maxChars) {
      // paragraph itself too big - hard split by lines
      let part = ''
      for (const line of p.split(/\n/)) {
        const maybe = (part ? part + '\n' : '') + line
        if (maybe.length > maxChars && part) {
          chunks.push(part)
          part = line
        } else {
          part = maybe
        }
      }
      if (part) chunks.push(part)
      current = ''
    } else {
      current = add
    }
  }
  if (current) chunks.push(current)
  return chunks
}

export async function translateTextDeepSeek(
  text: string,
  { targetLang, systemPrompt = DEFAULT_SYSTEM_PROMPT }: TranslateOptions
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY is not configured')

  const { masked, unmask } = maskMarkdown(text)

  const model = process.env.TRANSLATE_MODEL || 'deepseek-chat'
  const cacheKey = sha256(`${model}\n${targetLang}\n${systemPrompt}\n${masked}`)
  const { maxEntries, ttlMs } = getCacheLimits()
  if (maxEntries > 0 && ttlMs > 0) {
    const hit = translationCache.get(cacheKey)
    if (hit && hit.expiresAt > Date.now()) {
      return unmask(hit.value)
    }
    if (hit) translationCache.delete(cacheKey)
  }

  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Target language: ${targetLang}\n\nTranslate the following content. Return only translated content, preserve placeholders like [[CODE_BLOCK_x]] and [[CODE_INLINE_x]].\n\nContent:\n\n${masked}`,
      },
    ],
    temperature: 0.2,
    stream: false,
  }

  const baseTimeoutMs = Math.max(1_000, Number(process.env.TRANSLATE_REQUEST_TIMEOUT_MS || 240_000))
  const maxTimeoutMs = Math.max(baseTimeoutMs, Number(process.env.TRANSLATE_REQUEST_TIMEOUT_MAX_MS || 600_000))
  const retryTimeoutMultiplier = Math.max(1, Number(process.env.TRANSLATE_RETRY_TIMEOUT_MULTIPLIER || 1.6))
  const { maxRetries, baseDelayMs, maxDelayMs } = getRetryConfig()

  const outputWithPlaceholders = await withGlobalLimit(async () => {
    let attempt = 0
    while (true) {
      const attemptTimeoutMs = Math.min(maxTimeoutMs, Math.round(baseTimeoutMs * retryTimeoutMultiplier ** attempt))
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), attemptTimeoutMs)
      try {
        const resp = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        })

        if (!resp.ok) {
          const err = await resp.text().catch(() => '')
          const msg = `DeepSeek error: ${resp.status} ${resp.statusText} ${err}`
          if (attempt < maxRetries && isRetryableStatus(resp.status)) {
            attempt++
            const retryAfterMs = parseRetryAfterMs(resp.headers.get('retry-after'))
            const jitter = 0.8 + Math.random() * 0.6
            const backoffDelay = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1)) * jitter
            const delay = retryAfterMs != null ? Math.max(retryAfterMs, backoffDelay) : backoffDelay
            await sleep(delay)
            continue
          }
          throw new Error(msg)
        }

        const data = (await resp.json()) as any
        return data.choices?.[0]?.message?.content ?? ''
      } catch (e: any) {
        const isAbort = e?.name === 'AbortError'
        const isAbortMessage = typeof e?.message === 'string' && /aborted/i.test(e.message)
        const isNetwork = typeof e?.message === 'string' && /fetch failed|ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND/i.test(e.message)
        if (attempt < maxRetries && (isAbort || isAbortMessage || isNetwork)) {
          attempt++
          const jitter = 0.8 + Math.random() * 0.6
          const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1)) * jitter
          await sleep(delay)
          continue
        }
        throw e
      } finally {
        clearTimeout(timeout)
      }
    }
  })

  if (maxEntries > 0 && ttlMs > 0) {
    translationCache.set(cacheKey, { value: outputWithPlaceholders, expiresAt: Date.now() + ttlMs })
    // simple cap eviction (FIFO-ish via Map iteration order)
    while (translationCache.size > maxEntries) {
      const firstKey = translationCache.keys().next().value as string | undefined
      if (!firstKey) break
      translationCache.delete(firstKey)
    }
  }

  return unmask(outputWithPlaceholders)
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

export async function translateMarkdownChunked(
  text: string,
  targetLang: string,
  maxChars = Number(process.env.TRANSLATE_MAX_CHARS_PER_CHUNK || 12000)
): Promise<string> {
  const minChars = Math.max(2000, Number(process.env.TRANSLATE_MIN_CHARS_PER_CHUNK || 4000))

  const run = async (chars: number): Promise<string> => {
    const chunks = chunkMarkdown(text, chars)
    const chunkConcurrency = Math.max(1, Number(process.env.TRANSLATE_CHUNK_CONCURRENCY || 2))
    const chunkDelayMs = Math.max(0, Number(process.env.TRANSLATE_CHUNK_DELAY_MS || 0))

    const translated = await mapLimit(chunks, chunkConcurrency, async (part) => {
      const out = await translateTextDeepSeek(part, { targetLang })
      if (chunkDelayMs > 0) await new Promise((r) => setTimeout(r, chunkDelayMs))
      return out
    })

    return translated.join('\n\n')
  }

  try {
    return await run(maxChars)
  } catch (e: any) {
    const msg = String(e?.message || '')
    const looksLikeTooLarge =
      /context|maximum context|token|too long|prompt is too long|length exceeded|max_tokens/i.test(msg)

    const nextChars = Math.floor(maxChars / 2)
    if (looksLikeTooLarge && nextChars >= minChars) {
      return await run(nextChars)
    }
    throw e
  }
}

export async function translateBlogFields(
  content: any,
  targetLang: string
): Promise<{ locale: string; title: string; excerpt: string; body: string; meta_description: string }> {
  const titlePromise = content.title
    ? translateTextDeepSeek(content.title, { targetLang })
    : Promise.resolve('')
  const excerptPromise = content.excerpt
    ? translateTextDeepSeek(content.excerpt, { targetLang })
    : Promise.resolve('')
  const metaPromise = content.meta_description
    ? translateTextDeepSeek(content.meta_description, { targetLang })
    : Promise.resolve('')
  const bodyPromise = content.body
    ? translateMarkdownChunked(content.body, targetLang)
    : Promise.resolve('')

  const [title, excerpt, body, meta] = await Promise.all([titlePromise, excerptPromise, bodyPromise, metaPromise])
  return { locale: targetLang, title, excerpt, body, meta_description: meta }
}

// Translate product fields used by admin ProductForm
export async function translateProductFields(
  content: any,
  targetLang: string
): Promise<{
  locale: string
  title: string
  short_desc: string
  long_desc: string
  seo_title: string
  seo_desc: string
  key_specs: Record<string, any>
}> {
  const titlePromise = content.title
    ? translateTextDeepSeek(content.title, { targetLang })
    : Promise.resolve('')
  const shortDescPromise = content.short_desc
    ? translateTextDeepSeek(content.short_desc, { targetLang })
    : Promise.resolve('')
  const longDescPromise = content.long_desc
    ? translateMarkdownChunked(content.long_desc, targetLang)
    : Promise.resolve('')
  const seoTitlePromise = content.seo_title
    ? translateTextDeepSeek(content.seo_title, { targetLang })
    : Promise.resolve('')
  const seoDescPromise = content.seo_desc
    ? translateTextDeepSeek(content.seo_desc, { targetLang })
    : Promise.resolve('')

  const [title, short_desc, long_desc, seo_title, seo_desc] = await Promise.all([
    titlePromise,
    shortDescPromise,
    longDescPromise,
    seoTitlePromise,
    seoDescPromise,
  ])

  // Translate key_specs values when they are strings; keep others as-is
  const key_specs: Record<string, any> = {}
  try {
    const src = (content.key_specs || {}) as Record<string, any>
    const keys = Object.keys(src)
    const values = await mapLimit(keys, Math.max(1, Number(process.env.TRANSLATE_KEY_SPECS_CONCURRENCY || 2)), async (k) => {
      const v = src[k]
      if (typeof v === 'string') return [k, await translateTextDeepSeek(v, { targetLang })] as const
      return [k, v] as const
    })
    for (const [k, v] of values) key_specs[k] = v
  } catch {
    // fallback: keep original
    Object.assign(key_specs, content.key_specs || {})
  }

  return {
    locale: targetLang,
    title,
    short_desc,
    long_desc,
    seo_title,
    seo_desc,
    key_specs,
  }
}

export async function translateFAQFields(
  content: any,
  targetLang: string
): Promise<{ locale: string; question: string; answer: string }> {
  const question = content.question ? await translateTextDeepSeek(content.question, { targetLang }) : ''
  const answer = content.answer ? await translateMarkdownChunked(content.answer, targetLang) : ''
  return { locale: targetLang, question, answer }
}
