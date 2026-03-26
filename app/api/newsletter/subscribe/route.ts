import { NextResponse } from 'next/server'

function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { email?: string } | null
    const email = normalizeEmail(body?.email)

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_ID
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
        Origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          subscriber_email: email,
          email,
          source: 'multiverse-footer',
          site_name: 'Multiverse',
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
