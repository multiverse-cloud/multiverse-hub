import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const STORE_PATH = path.join(ROOT, 'data', 'template-local-store.json')
const DETAILS_DIR = path.join(ROOT, 'data', 'template-details')
const EXPORT_ROOT = path.join(ROOT, 'template-repo-export')
const TEMPLATES_DIR = path.join(EXPORT_ROOT, 'templates')
const GENERATED_AT = new Date().toISOString()

function stripUtf8Bom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

function cleanMarkdownLinks(content) {
  return content.replace(/\[([^\]]+)\]\((\/[A-Za-z]:[^)]+)\)/g, '`$1`')
}

function normalizeFileContent(file) {
  if (file.language === 'md') {
    return cleanMarkdownLinks(file.content)
  }

  return file.content
}

function hasEmbeddedTemplateContent(template) {
  return Array.isArray(template.files) && template.files.some(file => file?.content) || Boolean(template.previewHtml)
}

async function loadFullTemplates() {
  const raw = await readFile(STORE_PATH, 'utf8')
  const parsed = JSON.parse(stripUtf8Bom(raw))
  const templates = Array.isArray(parsed.templates) ? parsed.templates : []

  return Promise.all(
    templates.map(async template => {
      if (hasEmbeddedTemplateContent(template)) {
        return template
      }

      const detailPath = path.join(DETAILS_DIR, `${template.slug}.json`)

      try {
        const detailRaw = await readFile(detailPath, 'utf8')
        return JSON.parse(stripUtf8Bom(detailRaw))
      } catch {
        return template
      }
    })
  )
}

function toFolderReadme(template) {
  const primaryFile =
    template.files.find(file => file.primary) || template.files[0] || null

  const lines = [
    `# ${template.title}`,
    '',
    template.summary,
    '',
    '## Metadata',
    '',
    `- Slug: \`${template.slug}\``,
    `- Category: ${template.categoryTitle}`,
    `- Platform: ${template.platformLabel}`,
    `- Framework: ${template.frameworkLabel}`,
    `- Type: ${template.templateType}`,
    `- License: ${template.license}`,
    template.liveUrl ? `- Live preview: ${template.liveUrl}` : null,
    '',
    '## Included files',
    '',
    ...template.files.map(file => `- \`${file.path}\` - ${file.summary}`),
    '',
    primaryFile ? `## Start with\n\nOpen \`${primaryFile.path}\` first.` : null,
    '',
    template.techStack.length
      ? `## Tech stack\n\n${template.techStack.map(item => `- ${item}`).join('\n')}`
      : null,
    '',
    template.bestFor.length
      ? `## Best for\n\n${template.bestFor.map(item => `- ${item}`).join('\n')}`
      : null,
    '',
  ].filter(Boolean)

  return `${lines.join('\n')}\n`
}

function toRootReadme(templates) {
  const intro = [
    '# Multiverse Templates Export',
    '',
    'This folder is a GitHub-repo-ready export of the current Multiverse template library.',
    '',
    `Generated: ${GENERATED_AT}`,
    `Templates: ${templates.length}`,
    '',
    '## Structure',
    '',
    '```text',
    '/templates/<template-slug>',
    '  metadata.json',
    '  README.md',
    '  ...source files',
    '```',
    '',
    '## Templates',
    '',
  ]

  const rows = templates.map(template => {
    const live = template.liveUrl ? ` | live: ${template.liveUrl}` : ''
    return `- \`${template.slug}\` - ${template.title} (${template.frameworkLabel})${live}`
  })

  return `${[...intro, ...rows, ''].join('\n')}`
}

async function writeTemplateFolder(template) {
  const folder = path.join(TEMPLATES_DIR, template.slug)
  await mkdir(folder, { recursive: true })

  const metadata = {
    id: template.id,
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
    style: template.style,
    audience: template.audience,
    tags: template.tags,
    techStack: template.techStack,
    sections: template.sections,
    layoutNotes: template.layoutNotes,
    responsiveNotes: template.responsiveNotes,
    bestFor: template.bestFor,
    previewImage: template.previewImage || null,
    previewCapturedAt: template.previewCapturedAt || null,
    liveUrl: template.liveUrl || null,
    downloadUrl: template.downloadUrl || null,
    featured: Boolean(template.featured),
    updatedAt: template.updatedAt,
    license: template.license,
    priceLabel: template.priceLabel,
    generatedAt: GENERATED_AT,
  }

  await writeFile(
    path.join(folder, 'metadata.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
    'utf8'
  )

  await writeFile(path.join(folder, 'README.md'), toFolderReadme(template), 'utf8')

  for (const file of template.files) {
    const outputPath = path.join(folder, file.path)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, normalizeFileContent(file), 'utf8')
  }

  if (template.previewHtml) {
    await writeFile(path.join(folder, 'preview.html'), template.previewHtml, 'utf8')
  }
}

async function resetExportRoot() {
  await mkdir(EXPORT_ROOT, { recursive: true })
  const entries = await readdir(EXPORT_ROOT, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === '.git') continue
    await rm(path.join(EXPORT_ROOT, entry.name), { recursive: true, force: true })
  }
}

async function main() {
  const templates = await loadFullTemplates()

  await resetExportRoot()
  await mkdir(TEMPLATES_DIR, { recursive: true })

  const catalog = templates.map(template => ({
    slug: template.slug,
    title: template.title,
    category: template.category,
    categoryTitle: template.categoryTitle,
    framework: template.framework,
    frameworkLabel: template.frameworkLabel,
    templateType: template.templateType,
    liveUrl: template.liveUrl || null,
    downloadUrl: template.downloadUrl || null,
    relativePath: `templates/${template.slug}`,
  }))

  for (const template of templates) {
    await writeTemplateFolder(template)
  }

  await writeFile(
    path.join(EXPORT_ROOT, 'catalog.json'),
    `${JSON.stringify(
      { generatedAt: GENERATED_AT, count: templates.length, templates: catalog },
      null,
      2
    )}\n`,
    'utf8'
  )

  await writeFile(path.join(EXPORT_ROOT, 'README.md'), toRootReadme(templates), 'utf8')
  await writeFile(
    path.join(EXPORT_ROOT, 'package.json'),
    `${JSON.stringify(
      {
        name: 'multiverse-templates',
        private: true,
        version: '1.0.0',
        description: 'Exported Multiverse templates catalog',
      },
      null,
      2
    )}\n`,
    'utf8'
  )
  await writeFile(
    path.join(EXPORT_ROOT, '.gitignore'),
    ['node_modules/', '.DS_Store', 'Thumbs.db', ''].join('\n'),
    'utf8'
  )

  console.log(
    JSON.stringify(
      {
        exportRoot: path.relative(ROOT, EXPORT_ROOT),
        count: templates.length,
      },
      null,
      2
    )
  )
}

await main()
