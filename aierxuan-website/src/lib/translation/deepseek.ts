// Utilities for DeepSeek-powered translation with chunking and markdown safety

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

// Simple masks for code blocks and inline code to avoid translation
export function maskMarkdown(text: string) {
  const codeBlocks: string[] = []
  const inlineCodes: string[] = []

  let masked = text
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

  const body = {
    model: process.env.TRANSLATE_MODEL || 'deepseek-chat',
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

  const resp = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    const err = await resp.text().catch(() => '')
    throw new Error(`DeepSeek error: ${resp.status} ${resp.statusText} ${err}`)
  }

  const data = (await resp.json()) as any
  const output = data.choices?.[0]?.message?.content ?? ''
  return unmask(output)
}

export async function translateMarkdownChunked(
  text: string,
  targetLang: string,
  maxChars = Number(process.env.TRANSLATE_MAX_CHARS_PER_CHUNK || 3000)
): Promise<string> {
  const chunks = chunkMarkdown(text, maxChars)
  const translated: string[] = []
  for (let i = 0; i < chunks.length; i++) {
    const part = chunks[i]
    const out = await translateTextDeepSeek(part, { targetLang })
    translated.push(out)
    // tiny delay to be gentle
    await new Promise((r) => setTimeout(r, 50))
  }
  return translated.join('\n\n')
}

export async function translateBlogFields(
  content: any,
  targetLang: string
): Promise<{ locale: string; title: string; excerpt: string; body: string; meta_description: string }> {
  const title = content.title ? await translateTextDeepSeek(content.title, { targetLang }) : ''
  const excerpt = content.excerpt ? await translateTextDeepSeek(content.excerpt, { targetLang }) : ''
  const body = content.body ? await translateMarkdownChunked(content.body, targetLang) : ''
  const meta = content.meta_description
    ? await translateTextDeepSeek(content.meta_description, { targetLang })
    : ''
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
  const title = content.title ? await translateTextDeepSeek(content.title, { targetLang }) : ''
  const short_desc = content.short_desc
    ? await translateTextDeepSeek(content.short_desc, { targetLang })
    : ''
  const long_desc = content.long_desc
    ? await translateMarkdownChunked(content.long_desc, targetLang)
    : ''
  const seo_title = content.seo_title
    ? await translateTextDeepSeek(content.seo_title, { targetLang })
    : ''
  const seo_desc = content.seo_desc
    ? await translateTextDeepSeek(content.seo_desc, { targetLang })
    : ''

  // Translate key_specs values when they are strings; keep others as-is
  const key_specs: Record<string, any> = {}
  try {
    const src = (content.key_specs || {}) as Record<string, any>
    for (const [k, v] of Object.entries(src)) {
      if (typeof v === 'string') {
        key_specs[k] = await translateTextDeepSeek(v, { targetLang })
      } else {
        key_specs[k] = v
      }
    }
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
