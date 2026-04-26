import { NextRequest } from 'next/server'
import { err, RouteError, withConcurrencyLimit } from '@/lib/server-utils'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

const SYSTEM_PROMPTS: Record<string, string> = {
  summarize: 'You are an expert summarizer. Provide a clear, concise summary in 3-5 bullet points with key takeaways. Be informative and accurate.',
  paraphrase: 'Rephrase the given text in a natural, clear way while preserving the original meaning. Vary the vocabulary and sentence structure.',
  grammar: 'Fix all grammar, spelling, punctuation, and style errors in the text. Return the corrected version followed by a brief list of changes made.',
  translate: 'You are a professional translator. Translate the text accurately. If the target language is not specified, detect it and translate to English.',
  code: 'You are an expert software engineer. Write clean, well-commented, production-ready code. Include a brief explanation of how it works.',
  email: 'Write a professional, clear, and concise email based on the provided context. Include subject line as the first line.',
  seo: 'Write an SEO-optimized article with H1, H2, H3 headings, keyword-rich content, meta description, and a clear structure. Target 800-1200 words.',
  hashtags: 'Generate 25-30 relevant, trending hashtags grouped by: broad (5), niche (10), engagement (10), and community (5). Format as #hashtag.',
  resume: 'Create a professional, ATS-optimized resume in clean Markdown format. Include Summary, Experience, Skills, Education sections.',
  'cover-letter': 'Write a compelling, personalized cover letter that highlights relevant experience and enthusiasm. Keep it under 400 words.',
  explain: 'Explain this concept clearly and engagingly, as if teaching someone for the first time. Use analogies and examples.',
  'improve-writing': 'Improve the clarity, flow, and impact of this text while preserving the author\'s voice. Fix any issues with structure or expression.',
  'blog-post': 'Write an engaging, well-structured blog post with a compelling introduction, clear sections, and actionable conclusion.',
  'product-description': 'Write a compelling product description that highlights benefits, features, and addresses customer pain points.',
  default: 'You are a helpful AI assistant. Answer clearly and accurately.',
}

const AI_RATE_LIMIT = { max: 20, windowMs: 60_000 }
const AI_CONCURRENCY_LIMIT = Number(process.env.AI_CONCURRENCY_LIMIT || 6)
const MAX_AI_REQUEST_BYTES = Number(process.env.AI_MAX_REQUEST_BYTES || 64 * 1024)

type AiRequestBody = {
  tool?: string
  input?: string
  model?: string
  messages?: Array<{ role: string; content: string }>
  systemPrompt?: string
  maxTokens?: number
  temperature?: number
}

type OpenRouterErrorBody = {
  error?: {
    message?: string
  }
}

type OpenRouterResponseBody = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
  model?: string
  usage?: {
    prompt_tokens?: number
    completion_tokens?: number
    total_tokens?: number
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const limit = await checkRateLimit(`ai:${ip}`, AI_RATE_LIMIT)
    if (!limit.allowed) {
      return err('Rate limit exceeded. Max 20 AI requests per minute.', 429)
    }

    const contentLength = Number(req.headers.get('content-length') || '0')
    if (Number.isFinite(contentLength) && contentLength > MAX_AI_REQUEST_BYTES) {
      return err('Request body is too large for the AI route.', 413)
    }

    const body = (await req.json()) as AiRequestBody
    const { tool = 'default', input, model = 'openai/gpt-4o-mini', messages, systemPrompt } = body

    if (!input && !messages) return err('Missing input or messages')

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return Response.json({
        error: 'OpenRouter API key not configured',
        hint: 'Add OPENROUTER_API_KEY to your .env.local file',
        docs: 'https://openrouter.ai',
      }, { status: 503 })
    }

    const sysPrompt = systemPrompt || SYSTEM_PROMPTS[tool] || SYSTEM_PROMPTS.default
    const msgs = messages || [{ role: 'user', content: input }]

    return await withConcurrencyLimit(
      'ai-chat',
      AI_CONCURRENCY_LIMIT,
      async () => {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://multiverse-tools.vercel.app',
            'X-Title': 'Multiverse Tools',
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'system', content: sysPrompt }, ...msgs],
            max_tokens: body.maxTokens || 2048,
            temperature: body.temperature || 0.7,
            stream: false,
          }),
        })

        if (!response.ok) {
          const errData = (await response.json().catch(() => ({}))) as OpenRouterErrorBody
          return err(`OpenRouter error: ${errData.error?.message || response.statusText}`, response.status)
        }

        const data = (await response.json()) as OpenRouterResponseBody
        const result = data.choices?.[0]?.message?.content || ''
        const usage = data.usage || {}

        return Response.json({
          result,
          model: data.model,
          tokens: {
            prompt: usage.prompt_tokens,
            completion: usage.completion_tokens,
            total: usage.total_tokens,
          },
        })
      },
      'AI capacity is busy right now. Please retry in a moment.'
    )
  } catch (e) {
    if (e instanceof RouteError) {
      return err(e.message, e.status)
    }
    return err(`AI request failed: ${(e as Error).message}`, 500)
  }
}
