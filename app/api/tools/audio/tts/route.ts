import { NextRequest } from 'next/server'
import { API_BODY_LIMITS, API_RATE_LIMITS, guardRateLimit, readJsonBody } from '@/lib/api-protection'
import { err, fileResponse, getErrorStatus } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const limited = await guardRateLimit(req, 'tools:audio:tts', API_RATE_LIMITS.toolHeavy, 'Too many text-to-speech jobs. Please retry in a moment.')
    if (limited) return limited

    const body = await readJsonBody<{
      text?: string
      voice?: string
      speed?: number
      format?: string
    }>(req, API_BODY_LIMITS.jsonSmall)

    const text = body.text?.trim() || ''
    if (!text) return err('Enter text to synthesize')

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return Response.json(
        {
          error: 'Text-to-speech requires OPENAI_API_KEY for downloadable audio output',
          hint: 'Without that key, the app will fall back to browser speech playback.',
        },
        { status: 422 }
      )
    }

    const format = body.format === 'wav' ? 'wav' : 'mp3'
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || 'tts-1',
        input: text,
        voice: body.voice || process.env.OPENAI_TTS_VOICE || 'alloy',
        response_format: format,
        speed: Math.min(Math.max(Number(body.speed) || 1, 0.25), 4),
      }),
      signal: AbortSignal.timeout(30000),
    })

    if (!response.ok) {
      const payload = await response.text()
      return err(`TTS provider failed: ${payload.slice(0, 400)}`, 502)
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    return fileResponse(buffer, `speech.${format}`, format === 'wav' ? 'audio/wav' : 'audio/mpeg')
  } catch (error) {
    return err(`Text-to-speech failed: ${(error as Error).message}`, getErrorStatus(error, 500))
  }
}
