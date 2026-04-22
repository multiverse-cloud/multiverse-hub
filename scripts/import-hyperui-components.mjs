import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const hyperuiRoot = path.join(root, 'hyperui-main')
const examplesRoot = path.join(hyperuiRoot, 'public', 'examples')
const contentRoot = path.join(hyperuiRoot, 'src', 'content', 'collection')
const outputPath = path.join(root, 'data', 'hyperui-components.json')
const publicRuntimeDir = path.join(root, 'public', 'hyperui')

const collectionLabels = {
  application: 'Application',
  marketing: 'Marketing',
  neobrutalism: 'Neobrutalism',
}

function slugToTitle(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}

  const data = {}
  let currentList = null

  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trimEnd()
    if (!line.trim()) continue

    const listMatch = line.match(/^-\s+(.+)$/)
    if (currentList && listMatch) {
      currentList.push(listMatch[1].replace(/^['"]|['"]$/g, ''))
      continue
    }

    currentList = null

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!pair) continue

    const [, key, rawValue] = pair
    if (!rawValue) {
      data[key] = []
      currentList = data[key]
      continue
    }

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      data[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
      continue
    }

    data[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }

  data.components = parseComponents(match[1])

  return data
}

function parseScalar(value) {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }
  return trimmed.replace(/^['"]|['"]$/g, '')
}

function parseComponentLine(target, value) {
  const pair = value.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
  if (!pair) return
  target[pair[1]] = parseScalar(pair[2])
}

function parseInlineComponent(value) {
  const item = {}
  for (const part of value
    .replace(/^\{|\}$/g, '')
    .split(/,(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/)) {
    parseComponentLine(item, part.trim())
  }
  return item
}

function parseComponents(frontmatter) {
  const components = []
  let inside = false
  let current = null

  for (const rawLine of frontmatter.split(/\r?\n/)) {
    if (/^components:\s*$/.test(rawLine.trim())) {
      inside = true
      continue
    }

    if (!inside) continue

    if (/^[A-Za-z0-9_-]+:\s*/.test(rawLine)) break

    const trimmed = rawLine.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('- ')) {
      if (current) components.push(current)
      const value = trimmed.slice(2).trim()
      current = value.startsWith('{') ? parseInlineComponent(value) : {}
      if (!value.startsWith('{')) parseComponentLine(current, value)
      continue
    }

    if (current) parseComponentLine(current, trimmed)
  }

  if (current) components.push(current)
  return components.filter(item => item.title)
}

function getBodyInner(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return (match?.[1] || html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .trim()
}

function patchPreviewDocument(html, title) {
  return html
    .replace(/<link href="\/component\.css" rel="stylesheet" \/>/g, '<link href="/hyperui/component.css" rel="stylesheet" />')
    .replace(/<script src="\/component\.js" defer><\/script>/g, '<script src="/hyperui/component.js" defer></script>')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
}

function getExampleMeta(frontmatter, fileName) {
  const dark = fileName.includes('-dark')
  const baseIndex = Number.parseInt(fileName.replace('-dark', '').replace('.html', ''), 10)
  const componentIndex = Number.isFinite(baseIndex) ? baseIndex - 1 : 0
  const component = Array.isArray(frontmatter.components) ? frontmatter.components[componentIndex] : null
  const baseTitle = component?.title || frontmatter.title || `Component ${baseIndex || ''}`.trim()
  return {
    baseIndex,
    dark,
    baseTitle,
    title: dark ? `${baseTitle} Dark` : baseTitle,
    plugins: component?.plugins || [],
  }
}

function buildTags(collection, category, frontmatter, meta) {
  return Array.from(
    new Set([
      'hyperui',
      collection,
      category,
      ...(Array.isArray(frontmatter.terms) ? frontmatter.terms : []),
      ...meta.plugins,
      meta.dark ? 'dark' : 'light',
      'tailwind',
      'component',
    ])
  ).filter(Boolean)
}

function main() {
  if (!fs.existsSync(examplesRoot)) {
    throw new Error(`HyperUI examples not found at ${examplesRoot}`)
  }

  fs.mkdirSync(publicRuntimeDir, { recursive: true })
  fs.copyFileSync(path.join(hyperuiRoot, 'public', 'component.css'), path.join(publicRuntimeDir, 'component.css'))
  fs.copyFileSync(path.join(hyperuiRoot, 'public', 'component.js'), path.join(publicRuntimeDir, 'component.js'))

  const items = []

  for (const collection of fs.readdirSync(examplesRoot).sort()) {
    const collectionPath = path.join(examplesRoot, collection)
    if (!fs.statSync(collectionPath).isDirectory()) continue

    for (const category of fs.readdirSync(collectionPath).sort()) {
      const categoryPath = path.join(collectionPath, category)
      if (!fs.statSync(categoryPath).isDirectory()) continue

      const mdxPath = path.join(contentRoot, collection, `${category}.mdx`)
      const frontmatter = fs.existsSync(mdxPath)
        ? parseFrontmatter(fs.readFileSync(mdxPath, 'utf8'))
        : { title: slugToTitle(category), description: `${slugToTitle(category)} components from HyperUI.` }

      for (const fileName of fs
        .readdirSync(categoryPath)
        .filter(file => file.endsWith('.html'))
        .sort((left, right) => {
          const leftNumber = Number.parseInt(left, 10)
          const rightNumber = Number.parseInt(right, 10)
          if (leftNumber !== rightNumber) return leftNumber - rightNumber
          if (left.includes('-dark') !== right.includes('-dark')) {
            return left.includes('-dark') ? 1 : -1
          }
          return left.localeCompare(right)
        })) {
        const html = fs.readFileSync(path.join(categoryPath, fileName), 'utf8')
        const meta = getExampleMeta(frontmatter, fileName)
        const collectionLabel = collectionLabels[collection] || slugToTitle(collection)
        const categoryTitle = frontmatter.title || slugToTitle(category)
        const title =
          meta.baseTitle.toLowerCase() === categoryTitle.toLowerCase()
            ? `${collectionLabel} ${categoryTitle}${meta.dark ? ' Dark' : ''}`
            : `${collectionLabel} ${categoryTitle} ${meta.title}`
        const id = `hyperui-${collection}-${category}-${fileName.replace('.html', '')}`
        const description =
          frontmatter.description ||
          `${meta.title} ${slugToTitle(category).toLowerCase()} component from HyperUI with responsive Tailwind markup.`

        items.push({
          id,
          title,
          category,
          description,
          tags: buildTags(collection, category, frontmatter, meta),
          cssCode: '/* HyperUI preview uses /hyperui/component.css generated from Tailwind CSS v4. */',
          htmlCode: getBodyInner(html),
          previewClass: id,
          previewDocument: patchPreviewDocument(html, title),
          kind: 'generated',
          sourcePath: `hyperui-main/public/examples/${collection}/${category}/${fileName}`,
          publishedAt: '2026-04-22',
          featured: collection !== 'neobrutalism' && meta.baseIndex === 1 && !meta.dark,
          provider: 'hyperui',
          frameworkLabel: 'HTML + Tailwind v4',
          collection,
          collectionLabel,
          variantLabel: meta.title,
          darkVariant: meta.dark,
          plugins: meta.plugins,
          license: 'MIT',
        })
      }
    }
  }

  fs.writeFileSync(
    outputPath,
    `${JSON.stringify(
      {
        source: 'hyperui-main',
        generatedAt: '2026-04-22',
        itemCount: items.length,
        items,
      },
      null,
      2
    )}\n`
  )

  console.log(`Imported ${items.length} HyperUI examples into ${path.relative(root, outputPath)}`)
  console.log(`Copied HyperUI runtime assets into ${path.relative(root, publicRuntimeDir)}`)
}

main()
