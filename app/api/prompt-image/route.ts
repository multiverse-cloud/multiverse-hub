import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_HOSTS = new Set([
  'promptimg.ionicerrrrscode.com',
  'res.cloudinary.com',
])

export const runtime = 'edge'
export const revalidate = 2592000

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url')

  if (!rawUrl) {
    return NextResponse.json({ error: 'Missing image URL.' }, { status: 400 })
  }

  let target: URL

  try {
    target = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: 'Invalid image URL.' }, { status: 400 })
  }

  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: 'Image host is not allowed.' }, { status: 400 })
  }

  const upstream = await fetch(target.toString(), {
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'User-Agent': 'mtverse-image-proxy/1.0',
    },
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  })

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Image could not be loaded.' }, { status: 502 })
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800',
    },
  })
}
