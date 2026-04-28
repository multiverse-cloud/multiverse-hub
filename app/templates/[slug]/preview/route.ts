import { NextRequest } from 'next/server'
import { getTemplateBySlug } from '@/lib/template-db'
import { buildTemplatePreviewHtml } from '@/lib/template-preview'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params
  const template = await getTemplateBySlug(slug)

  if (!template) {
    return new Response('Template preview not found.', { status: 404 })
  }

  if (!template.previewHtml && template.files.length === 0 && template.liveUrl) {
    return Response.redirect(template.liveUrl)
  }

  const html = buildTemplatePreviewHtml(template)
  const embed = request.nextUrl.searchParams.get('embed') === '1'
  const body = embed ? html.replace('<body', '<body data-embed="1"') : html

  return new Response(body, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
