import { NextRequest, NextResponse } from 'next/server'
import { API_BODY_LIMITS, API_RATE_LIMITS, guardRateLimit, readJsonBody } from '@/lib/api-protection'
import { SITE_URL } from '@/lib/site-url'

type FeedbackBody = {
  name?: string
  email?: string
  message?: string
}

function normalizeName(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizeMessage(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: NextRequest) {
  try {
    const limited = await guardRateLimit(request, 'feedback', API_RATE_LIMITS.toolJson, 'Too many feedback messages. Please retry in a moment.')
    if (limited) return limited

    const body = await readJsonBody<FeedbackBody>(request, API_BODY_LIMITS.jsonSmall).catch(() => null)
    const name = normalizeName(body?.name)
    const email = normalizeEmail(body?.email)
    const message = normalizeMessage(body?.message)

    if (name.length < 2) {
      return NextResponse.json({ error: 'Enter your name.' }, { status: 400 })
    }

    if (name.length > 80) {
      return NextResponse.json({ error: 'Name must be under 80 characters.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    if (message.length < 5) {
      return NextResponse.json({ error: 'Write a little more feedback before sending.' }, { status: 400 })
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Feedback must be under 2000 characters.' }, { status: 400 })
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId =
      process.env.EMAILJS_FEEDBACK_TEMPLATE_ID ||
      process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        { error: 'Feedback is not configured yet. Add EmailJS keys to enable it.' },
        { status: 503 }
      )
    }

    const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: SITE_URL,
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name,
          email,
          message,
          source: 'multiverse-feedback',
          site_name: 'mtverse',
        },
      }),
      cache: 'no-store',
    })

    if (!emailJsResponse.ok) {
      const details = await emailJsResponse.text().catch(() => '')
      return NextResponse.json({ error: details || 'Feedback submission failed.' }, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      message: 'Thanks. Your feedback was sent successfully.',
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Feedback submission failed.' },
      { status: 500 }
    )
  }
}
