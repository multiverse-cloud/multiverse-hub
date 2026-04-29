import 'server-only'

import type { TemplateEntry, TemplateSourceFile } from '@/lib/template-library-data'

function findFile(template: TemplateEntry, predicate: (file: TemplateSourceFile) => boolean) {
  return template.files.find(predicate) || null
}

function findIndexFile(template: TemplateEntry) {
  return (
    findFile(template, file => Boolean(file.primary)) ||
    findFile(template, file => file.path.toLowerCase() === 'index.html') ||
    findFile(template, file => file.language === 'html')
  )
}

function collectFiles(template: TemplateEntry, language: TemplateSourceFile['language']) {
  return template.files.filter(file => file.language === language)
}

function stripExternalFileTags(markup: string) {
  return markup
    .replace(/<link[^>]+href=["'][^"']+\.css["'][^>]*>/gi, '')
    .replace(/<script[^>]+src=["'][^"']+\.js["'][^>]*><\/script>/gi, '')
}

function injectPreviewGuards(markup: string) {
  const headGuard = `
<base target="_self" />
<style>
  html, body { overscroll-behavior: none; }
</style>`

  const scriptGuard = `
<script>
  (function () {
    document.addEventListener('click', function (event) {
      var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!anchor) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);

    document.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
    }, true);

    try {
      window.open = function () { return null; };
      history.pushState = function () {};
      history.replaceState = function () {};
    } catch (error) {}
  })();
</script>`

  return markup
    .replace('</head>', `${headGuard}</head>`)
    .replace('</body>', `${scriptGuard}</body>`)
}

export function buildTemplatePreviewHtml(template: TemplateEntry) {
  if (template.previewHtml?.trim()) {
    const css = collectFiles(template, 'css')
      .map(file => file.content)
      .join('\n\n')
    const js = collectFiles(template, 'js')
      .map(file => file.content)
      .join('\n\n')
    const html = stripExternalFileTags(template.previewHtml)
    const headInjection = `<meta name="robots" content="noindex" />${css ? `<style>${css}</style>` : ''}`
    const bodyInjection = `${js ? `<script>${js}</script>` : ''}`

    return injectPreviewGuards(
      html
        .replace('</head>', `${headInjection}</head>`)
        .replace('</body>', `${bodyInjection}</body>`)
    )
  }

  const htmlFile = findIndexFile(template)
  if (!htmlFile) {
    return `<!DOCTYPE html><html><body><pre>Preview unavailable for ${template.title}</pre></body></html>`
  }

  const css = collectFiles(template, 'css')
    .map(file => file.content)
    .join('\n\n')
  const js = collectFiles(template, 'js')
    .map(file => file.content)
    .join('\n\n')

  const html = stripExternalFileTags(htmlFile.content)
  const headInjection = `<meta name="robots" content="noindex" />${css ? `<style>${css}</style>` : ''}`
  const bodyInjection = `${js ? `<script>${js}</script>` : ''}`

  return injectPreviewGuards(
    html
    .replace('</head>', `${headInjection}</head>`)
    .replace('</body>', `${bodyInjection}</body>`)
  )
}

export function getTemplateDownloadFilename(template: TemplateEntry) {
  return `${template.slug}.zip`
}

export function getTemplatePrimaryFile(template: TemplateEntry) {
  return findIndexFile(template) || template.files[0] || null
}

export function getTemplateBundleBytes(template: TemplateEntry) {
  return template.files.reduce((total, file) => total + Buffer.byteLength(file.content, 'utf8'), 0)
}
