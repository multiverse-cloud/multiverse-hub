import { NextResponse } from 'next/server'
import JSZip from 'jszip'
import { getTemplateBySlug } from '@/lib/template-db'
import { fileResponse } from '@/lib/server-utils'

function buildMetadata(template: NonNullable<Awaited<ReturnType<typeof getTemplateBySlug>>>) {
  return {
    slug: template.slug,
    title: template.title,
    summary: template.summary,
    description: template.description,
    category: template.category,
    categoryTitle: template.categoryTitle,
    platform: template.platform,
    platformLabel: template.platformLabel,
    framework: template.framework,
    frameworkLabel: template.frameworkLabel,
    templateType: template.templateType,
    industry: template.industry,
    tags: template.tags,
    techStack: template.techStack,
    sections: template.sections,
    bestFor: template.bestFor,
    liveUrl: template.liveUrl || null,
    previewImage: template.previewImage || null,
    updatedAt: template.updatedAt,
    license: template.license,
    priceLabel: template.priceLabel,
  }
}

function buildReadme(template: NonNullable<Awaited<ReturnType<typeof getTemplateBySlug>>>) {
  const primaryFile = template.files.find(file => file.primary) || template.files[0] || null

  return [
    `# ${template.title}`,
    '',
    template.summary,
    '',
    '## Quick start',
    '',
    primaryFile ? `- Start with \`${primaryFile.path}\`` : null,
    `- Framework: ${template.frameworkLabel}`,
    `- Platform: ${template.platformLabel}`,
    template.liveUrl ? `- Live preview: ${template.liveUrl}` : null,
    '',
    '## Included files',
    '',
    ...template.files.map(file => `- \`${file.path}\` - ${file.summary}`),
    '',
  ]
    .filter(Boolean)
    .join('\n')
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

  const zip = new JSZip()
  const root = zip.folder(template.slug)

  if (!root) {
    return NextResponse.json({ error: 'Failed to prepare template archive.' }, { status: 500 })
  }

  root.file('metadata.json', `${JSON.stringify(buildMetadata(template), null, 2)}\n`)
  root.file('README.md', `${buildReadme(template)}\n`)

  for (const file of template.files) {
    root.file(file.path, file.content)
  }

  if (template.previewHtml) {
    root.file('preview.html', template.previewHtml)
  }

  const archive = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  })

  return fileResponse(archive, `${template.slug}.zip`, 'application/zip')
}
