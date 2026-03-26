import { NextRequest } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

const AI_STREAM_RATE_LIMIT = { max: 20, windowMs: 60_000 }

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const limit = checkRateLimit(`ai-stream:${ip}`, AI_STREAM_RATE_LIMIT)
    if (!limit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Max 20 AI requests per minute.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()
    const { messages, model = 'openai/gpt-4o-mini', system = 'You are a helpful AI assistant.' } = body

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured. Add OPENROUTER_API_KEY to .env.local' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

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
        messages: [{ role: 'system', content: system }, ...messages],
        max_tokens: 2048,
        stream: true,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      return new Response(text, { status: response.status, headers: { 'Content-Type': 'application/json' } })
    }

    // Forward the SSE stream directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Stream failed: ${(e as Error).message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
