import { NextRequest } from 'next/server'
import { err, parseFormData } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 120

const TRANSCRIBE_UPLOAD_MAX_BYTES = Number(process.env.TRANSCRIBE_UPLOAD_MAX_BYTES || 25 * 1024 * 1024)

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return Response.json(
        {
          error: 'Speech-to-text requires OPENAI_API_KEY',
          hint: 'Add OPENAI_API_KEY to enable server-side audio transcription.',
        },
        { status: 422 }
      )
    }

    const { files, fields } = await parseFormData(req, { maxBytes: TRANSCRIBE_UPLOAD_MAX_BYTES })
    const audio = files.find(file => file.fieldname === 'file')
    if (!audio) return err('No audio file uploaded')

    const form = new FormData()
    form.append(
      'file',
      new Blob([Uint8Array.from(audio.buffer)], { type: audio.mimetype || 'audio/mpeg' }),
      audio.filename
    )
    form.append('model', process.env.OPENAI_STT_MODEL || 'whisper-1')
    form.append('response_format', 'json')
    if (fields.language) form.append('language', fields.language)
    if (fields.prompt) form.append('prompt', fields.prompt)

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
      signal: AbortSignal.timeout(45000),
    })

    if (!response.ok) {
      const payload = await response.text()
      return err(`Transcription provider failed: ${payload.slice(0, 400)}`, 502)
    }

    const data = (await response.json()) as {
      text?: string
      language?: string
      duration?: number
    }

    return Response.json({
      text: data.text || '',
      language: data.language || fields.language || '',
      duration: data.duration || null,
    })
  } catch (error) {
    return err(`Speech-to-text failed: ${(error as Error).message}`, 500)
  }
}
