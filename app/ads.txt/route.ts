import { NextResponse } from 'next/server'
import { getGoogleAdsTxtLine } from '@/lib/adsense'

export const revalidate = 3600

export function GET() {
  const line = getGoogleAdsTxtLine()
  const body = line || '# Google AdSense is not configured for this deployment yet.'

  return new NextResponse(`${body}\n`, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

