import { NextResponse } from 'next/server'
import { getTemplateBySlug } from '@/lib/template-db'
import { fileResponse } from '@/lib/server-utils'

function getMimeType(language: string) {
  switch (language) {
    case 'css':
      return 'text/css; charset=utf-8'
    case 'js':
      return 'application/javascript; charset=utf-8'
    case 'json':
      return 'application/json; charset=utf-8'
    case 'md':
      return 'text/markdown; charset=utf-8'
    case 'ts':
    case 'tsx':
      return 'text/plain; charset=utf-8'
    default:
      return 'text/html; charset=utf-8'
  }
}

function buildBundle(templateTitle: string, files: Array<{ path: string; content: string }>) {
  const parts = [`# ${templateTitle}`, '']

  for (const file of files) {
    parts.push(`--- FILE: ${file.path} ---`)
    parts.push(file.content)
    parts.push('')
  }

  return parts.join('\n')
}

type RouteContext = {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params
  const template = await getTemplateBySlug(slug)

  if (!template) {
    return NextResponse.json({ error: 'Template not found.' }, { status: 404 })
  }

  const primaryFile = template.files.find(file => file.primary) || template.files[0]

  if (!primaryFile) {
    return NextResponse.json({ error: 'Template source is unavailable.' }, { status: 404 })
  }

  if (template.files.length === 1) {
    const filename = primaryFile.path.split('/').pop() || `${template.slug}.html`
    return fileResponse(Buffer.from(primaryFile.content, 'utf8'), filename, getMimeType(primaryFile.language))
  }

  const bundle = buildBundle(template.title, template.files.map(file => ({ path: file.path, content: file.content })))
  return fileResponse(Buffer.from(bundle, 'utf8'), `${template.slug}-code-bundle.txt`, 'text/plain; charset=utf-8')
}
