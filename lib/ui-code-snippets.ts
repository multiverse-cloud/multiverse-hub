import type { UiCatalogItem } from '@/lib/ui-source-components'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getEffectSlug(effect: Pick<UiCatalogItem, 'id' | 'title'>): string {
  return slugify(effect.id || effect.title)
}

function getComponentName(effect: Pick<UiCatalogItem, 'title'>): string {
  const base = slugify(effect.title)
    .split('-')
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')

  return base || 'CssEffectDemo'
}

export function buildReactSnippet(effect: UiCatalogItem): string {
  if (effect.kind === 'source' && effect.reactCode) {
    return effect.reactCode
  }
  const componentName = getComponentName(effect)

  return `import './${getEffectSlug(effect)}.css'

export default function ${componentName}() {
  return (
    <div className="effect-shell">
      ${effect.htmlCode}
    </div>
  )
}`
}

export function buildTailwindStarter(effect: UiCatalogItem): string {
  if (effect.kind === 'source') {
    return effect.usageCode || effect.reactCode || '// Source component imported from css_effects'
  }
  const componentName = `${getComponentName(effect)}Tailwind`

  return `export default function ${componentName}() {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8">
      <style jsx global>{\`
${effect.cssCode}
      \`}</style>
      ${effect.htmlCode}
    </div>
  )
}`
}

export function buildPlaygroundSnippet(effect: UiCatalogItem): string {
  if (effect.kind === 'source') {
    return effect.reactCode || effect.usageCode || '// Source component imported from css_effects'
  }
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${effect.title}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f8fafc;
        font-family: Inter, system-ui, sans-serif;
      }

${effect.cssCode}
    </style>
  </head>
  <body>
    ${effect.htmlCode}
  </body>
</html>`
}
