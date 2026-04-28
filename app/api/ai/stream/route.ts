import { NextRequest } from 'next/server'
import { RouteError, withConcurrencyLimit } from '@/lib/server-utils'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { readJsonBody } from '@/lib/api-protection'
import { SITE_URL } from '@/lib/site-url'

export const runtime = 'nodejs'
export const maxDuration = 60

const AI_STREAM_RATE_LIMIT = { max: 20, windowMs: 60_000 }
const AI_STREAM_CONCURRENCY_LIMIT = Number(process.env.AI_STREAM_CONCURRENCY_LIMIT || 4)
const MAX_AI_STREAM_REQUEST_BYTES = Number(process.env.AI_STREAM_MAX_REQUEST_BYTES || 64 * 1024)

type AiStreamRequestBody = {
  messages?: Array<{ role: string; content: string }>
  model?: string
  system?: string
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const limit = await checkRateLimit(`ai-stream:${ip}`, AI_STREAM_RATE_LIMIT)
    if (!limit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Max 20 AI requests per minute.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const contentLength = Number(req.headers.get('content-length') || '0')
    if (Number.isFinite(contentLength) && contentLength > MAX_AI_STREAM_REQUEST_BYTES) {
      return new Response(
        JSON.stringify({ error: 'Request body is too large for the AI stream route.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const body = await readJsonBody<AiStreamRequestBody>(req, MAX_AI_STREAM_REQUEST_BYTES)
    const { messages, model = 'openai/gpt-4o-mini', system = 'You are a helpful AI assistant.' } = body

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Missing messages payload.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured. Add OPENROUTER_API_KEY to .env.local' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return await withConcurrencyLimit(
      'ai-stream',
      AI_STREAM_CONCURRENCY_LIMIT,
      async () => {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': SITE_URL,
            'X-Title': 'mtverse',
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'system', content: system }, ...messages],
            max_tokens: 2048,
            stream: true,
          }),
        })

        if (!response.ok) {
          const text = await response.text()
          return new Response(text, { status: response.status, headers: { 'Content-Type': 'application/json' } })
        }

        return new Response(response.body, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        })
      },
      'AI streaming is busy right now. Please retry in a moment.'
    )
  } catch (error) {
    if (error instanceof RouteError) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: error.status, headers: { 'Content-Type': 'application/json' } }
      )
    }
    console.error('AI stream failed:', error)
    return new Response(
      JSON.stringify({ error: 'Stream failed. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
