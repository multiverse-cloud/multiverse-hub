import { notFound } from 'next/navigation'
import { buildPreviewDoc, getEffectBySlug } from '@/lib/css-effects-library'

type UiPreviewRouteProps = {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: UiPreviewRouteProps) {
  const { slug } = await params
  const effect = getEffectBySlug(slug)

  if (!effect || effect.kind === 'source') {
    notFound()
  }

  return new Response(buildPreviewDoc(effect), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
