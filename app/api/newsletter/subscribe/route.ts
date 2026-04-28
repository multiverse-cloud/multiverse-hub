import { NextRequest, NextResponse } from 'next/server'
import { API_BODY_LIMITS, API_RATE_LIMITS, guardRateLimit, readJsonBody } from '@/lib/api-protection'
import { SITE_URL } from '@/lib/site-url'

function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

function normalizeText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const limited = await guardRateLimit(request, 'newsletter', API_RATE_LIMITS.toolJson, 'Too many newsletter requests. Please retry in a moment.')
    if (limited) return limited

    const body = await readJsonBody<{ name?: string; email?: string; message?: string }>(request, API_BODY_LIMITS.jsonSmall).catch(() => null)
    const name = normalizeText(body?.name, 'Newsletter subscriber')
    const email = normalizeEmail(body?.email)
    const message = normalizeText(body?.message, 'Newsletter signup from footer.')

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId =
      process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID ||
      process.env.EMAILJS_FEEDBACK_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        { error: 'Newsletter is not configured yet. Add EmailJS keys to enable it.' },
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
          subscriber_email: email,
          email,
          message,
          source: 'multiverse-footer',
          site_name: 'mtverse',
        },
      }),
      cache: 'no-store',
    })

    if (!emailJsResponse.ok) {
      const details = await emailJsResponse.text().catch(() => '')
      return NextResponse.json({ error: details || 'Newsletter subscription failed.' }, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      message: 'Subscribed successfully. You will get tool and product updates.',
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Newsletter subscription failed.' },
      { status: 500 }
    )
  }
}
