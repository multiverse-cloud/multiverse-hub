import { NextResponse } from 'next/server'
import { getCareerTemplateBySlug } from '@/lib/career-db'

type RouteContext = {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const template = await getCareerTemplateBySlug(slug)

  if (!template) {
    return new NextResponse('Not found', { status: 404 })
  }

  return new NextResponse(template.yamlContent, {
    headers: {
      'Content-Type': 'application/x-yaml; charset=utf-8',
      'Content-Disposition': `attachment; filename="${template.downloadFileName}"`,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
