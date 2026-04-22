import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCE_ROOT = path.join(ROOT, '.tmp', 'porttemp')
const STORE_PATH = path.join(ROOT, 'data', 'template-local-store.json')
const TITLE_REGISTRY_PATH = path.join(ROOT, 'data', 'template-topic-titles.txt')
const UPDATED_AT = '2026-04-22'

const TEMPLATE_CONFIG = {
  'bug-hunter': {
    title: 'Bug Hunter Developer Portfolio',
    summary:
      'A cinematic bug-bounty and developer portfolio with dark neon styling, animated sections, and a sharper security-focused personality.',
    description:
      'Built as a static HTML, CSS, and JavaScript portfolio template, Bug Hunter is ideal for security researchers, developers, and technical creators who want a darker, more tactical portfolio presence with bold personality.',
    style: 'Dark neon hacker portfolio with animated panels',
    audience: 'security researchers, bug bounty hunters, and technical freelancers',
    tags: ['developer portfolio', 'bug bounty portfolio', 'security portfolio', 'dark portfolio', 'html portfolio'],
    prompt:
      'Design a premium developer portfolio for a security researcher. Use dark surfaces, tactical typography, animated sections, hacker-inspired UI details, and a high-trust personal brand.',
    sections: ['Hero', 'About', 'Projects', 'Skills', 'Terminal-style details', 'Contact'],
    layoutNotes: [
      'The experience feels like a hacker-inspired portfolio while still staying readable for mainstream visitors.',
      'Sections use strong contrast and motion to make the personality memorable.',
      'The layout is best used when the creator wants a technical, security-heavy brand.',
    ],
    responsiveNotes: [
      'The portfolio stacks vertically on smaller screens while keeping the hero readable.',
      'Animations are decorative and do not block the core content on mobile.',
    ],
    bestFor: ['Security researchers', 'Freelance developers', 'Technical personal sites'],
    featured: true,
  },
  'designer-folio': {
    title: 'Designer Folio Editorial Portfolio',
    summary:
      'A minimal editorial-style designer portfolio with elegant typography, project storytelling, and a cleaner art-direction-led homepage.',
    description:
      'Designer Folio is a polished static portfolio template for visual designers, brand designers, and creative directors who want a calm, image-led presentation with lighter motion and stronger typography.',
    style: 'Minimal editorial portfolio with clean spacing',
    audience: 'visual designers, art directors, and creative freelancers',
    tags: ['designer portfolio', 'creative portfolio', 'editorial portfolio', 'minimal portfolio', 'html portfolio'],
    prompt:
      'Design a premium editorial portfolio for a visual designer. Keep it minimal, typographic, and image-led with strong case-study rhythm and generous whitespace.',
    sections: ['Hero', 'Selected work', 'About', 'Services', 'Contact'],
    layoutNotes: [
      'The layout uses whitespace and typography rather than heavy UI chrome.',
      'Project sections should read like a design case-study teaser rather than a busy gallery.',
    ],
    responsiveNotes: [
      'Typography and image blocks scale down cleanly for touch screens.',
      'Project cards remain legible without needing dense overlays on mobile.',
    ],
    bestFor: ['Brand designers', 'Creative portfolios', 'Case-study led personal sites'],
    featured: true,
  },
  'macos-desktop': {
    title: 'macOS Desktop Portfolio Experience',
    summary:
      'A playful desktop-style portfolio with draggable windows, dock-inspired navigation, and a standout interactive presentation for personal branding.',
    description:
      'This template recreates a macOS-inspired desktop portfolio experience using plain HTML, CSS, and JavaScript. It is ideal for developers and creative technologists who want a memorable interactive portfolio instead of a standard single-column site.',
    style: 'Desktop simulation portfolio with interactive windows',
    audience: 'creative developers, full-stack engineers, and interactive portfolio builders',
    tags: ['interactive portfolio', 'macos portfolio', 'desktop ui portfolio', 'developer portfolio', 'html portfolio'],
    prompt:
      'Design an interactive macOS-inspired portfolio with draggable windows, dock navigation, terminal flavor, and a premium playful feel without losing clarity.',
    sections: ['Desktop hero', 'About window', 'Experience window', 'Skills window', 'Terminal window', 'Contact window'],
    layoutNotes: [
      'The window system is the main product idea, so every section should feel like part of a desktop environment.',
      'This template works best when the creator wants a memorable portfolio interaction instead of a conventional page.',
    ],
    responsiveNotes: [
      'The desktop metaphor compresses into a simpler stacked experience on smaller screens.',
      'Interactive windows still remain accessible through tap-first controls.',
    ],
    bestFor: ['Interactive portfolios', 'Creative engineers', 'Personal brand sites'],
    featured: true,
  },
  'purple-wave': {
    title: 'Purple Wave Creative Portfolio',
    summary:
      'A bold gradient-led portfolio with modern motion, creative section transitions, and a vibrant visual personality for standout creators.',
    description:
      'Purple Wave is a high-energy static portfolio template built for creators who want bold color, large type, and strong first impressions while still keeping a simple HTML, CSS, and JavaScript stack.',
    style: 'Bold gradient creative portfolio with vibrant surfaces',
    audience: 'creative developers, digital artists, and startup-friendly freelancers',
    tags: ['creative portfolio', 'gradient portfolio', 'modern portfolio', 'personal website', 'html portfolio'],
    prompt:
      'Design a bold creative portfolio with a vibrant purple-led palette, large typography, premium transitions, and a startup-quality personal brand presentation.',
    sections: ['Hero', 'Projects', 'About', 'Skills', 'Contact'],
    layoutNotes: [
      'The template relies on color and motion to create identity quickly.',
      'Best used when the creator wants a louder and more expressive portfolio style.',
    ],
    responsiveNotes: [
      'Large typography scales down with preserved contrast and spacing on mobile.',
      'Animated areas remain lightweight and do not dominate the first screen on smaller devices.',
    ],
    bestFor: ['Creative freelancers', 'Design-forward developers', 'Personal brand pages'],
    featured: false,
  },
  'retro-terminal': {
    title: 'Retro Terminal Portfolio',
    summary:
      'A retro terminal-inspired portfolio with command-line storytelling, nostalgic UI details, and a focused developer identity.',
    description:
      'Retro Terminal packages a command-line inspired portfolio aesthetic into a plain HTML, CSS, and JavaScript template. It is built for developers who want a nostalgic terminal presentation without adding framework complexity.',
    style: 'Retro terminal developer portfolio with nostalgic UI',
    audience: 'developers, terminal lovers, and indie makers',
    tags: ['terminal portfolio', 'retro portfolio', 'developer website', 'command line ui', 'html portfolio'],
    prompt:
      'Design a retro terminal-inspired portfolio for a developer. Use command-line aesthetics, nostalgic motion, green-screen cues, and simple storytelling without making the interface hard to use.',
    sections: ['Terminal hero', 'Projects', 'Skills', 'Commands', 'Contact'],
    layoutNotes: [
      'The terminal framing gives the site personality, but the content still needs to be easy to scan.',
      'Works best for technical creators with a playful personal brand.',
    ],
    responsiveNotes: [
      'Terminal content wraps into compact stacked sections on mobile.',
      'Interactive command details remain optional so the portfolio still works as a normal site.',
    ],
    bestFor: ['Developer portfolios', 'Indie maker sites', 'Nostalgic personal brands'],
    featured: false,
  },
}

function stripBom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function normalizeTopic(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function stripLocalAssetTags(markup) {
  return markup
    .replace(/<link[^>]+href=["'](?:\.\/)?style\.css["'][^>]*>/gi, '')
    .replace(/<script[^>]+src=["'](?:\.\/)?script\.js["'][^>]*><\/script>/gi, '')
}

function buildPreviewHtml(html, css, js) {
  const markup = stripLocalAssetTags(html)
  return markup
    .replace('</head>', `${css ? `<style>\n${css}\n</style>` : ''}</head>`)
    .replace('</body>', `${js ? `<script>\n${js}\n</script>` : ''}</body>`)
}

async function readText(filePath) {
  return stripBom(await readFile(filePath, 'utf8'))
}

async function createTemplateEntry(folderName) {
  const config = TEMPLATE_CONFIG[folderName]
  if (!config) {
    throw new Error(`No config found for ${folderName}`)
  }

  const folder = path.join(SOURCE_ROOT, folderName)
  const html = await readText(path.join(folder, 'index.html'))
  const css = await readText(path.join(folder, 'style.css'))
  const js = await readText(path.join(folder, 'script.js'))
  const readme = await readText(path.join(folder, 'README.md'))
  const slug = slugify(config.title)

  return {
    id: `template-${slug}`,
    slug,
    title: config.title,
    seoTitle: `${config.title} - Downloadable Premium Portfolio Template | Multiverse`,
    metaDescription: config.summary,
    summary: config.summary,
    description: config.description,
    category: 'portfolio',
    categoryTitle: 'Portfolio Sites',
    platform: 'responsive',
    platformLabel: 'Responsive',
    framework: 'html-css-js',
    frameworkLabel: 'HTML + CSS + JS',
    templateType: 'template',
    industry: 'Portfolio',
    style: config.style,
    audience: config.audience,
    tags: [...config.tags],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    prompt: config.prompt,
    sections: [...config.sections],
    layoutNotes: [...config.layoutNotes],
    responsiveNotes: [...config.responsiveNotes],
    bestFor: [...config.bestFor],
    files: [
      {
        path: 'index.html',
        language: 'html',
        content: html,
        summary: `${config.title} primary markup.`,
        primary: true,
      },
      {
        path: 'style.css',
        language: 'css',
        content: css,
        summary: `${config.title} visual styling and responsive rules.`,
      },
      {
        path: 'script.js',
        language: 'js',
        content: js,
        summary: `${config.title} interactive behavior.`,
      },
      {
        path: 'README.md',
        language: 'md',
        content: readme,
        summary: `${config.title} template notes and customization guide.`,
      },
    ],
    previewHtml: buildPreviewHtml(html, css, js),
    featured: config.featured,
    updatedAt: UPDATED_AT,
    license: 'Free download',
    priceLabel: 'Free',
  }
}

async function main() {
  const sourceEntries = await readdir(SOURCE_ROOT, { withFileTypes: true })
  const folders = []

  for (const entry of sourceEntries) {
    if (!entry.isDirectory()) continue
    if (!(entry.name in TEMPLATE_CONFIG)) continue
    folders.push(entry.name)
  }

  const nextTemplates = []
  for (const folder of folders) {
    const folderPath = path.join(SOURCE_ROOT, folder)
    const info = await stat(folderPath)
    if (!info.isDirectory()) continue
    nextTemplates.push(await createTemplateEntry(folder))
  }

  const rawStore = JSON.parse(stripBom(await readFile(STORE_PATH, 'utf8')))
  const existing = Array.isArray(rawStore.templates) ? rawStore.templates : []
  const incomingIds = new Set(nextTemplates.map(template => template.id))
  const incomingSlugs = new Set(nextTemplates.map(template => template.slug))

  const merged = existing
    .filter(template => !incomingIds.has(template.id) && !incomingSlugs.has(template.slug))
    .concat(nextTemplates)
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1
      }
      return String(left.title).localeCompare(String(right.title))
    })

  const payload = {
    templates: merged,
    meta: {
      source: 'admin-bulk-save + porttemp-import',
      generatedAt: new Date().toISOString(),
      count: merged.length,
    },
  }

  await mkdir(path.dirname(STORE_PATH), { recursive: true })
  await writeFile(STORE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  const titleRegistry = merged
    .map(template => `${normalizeTopic(template.title)} | ${template.title} | ${template.slug}`)
    .join('\n')

  await writeFile(TITLE_REGISTRY_PATH, `${titleRegistry}\n`, 'utf8')

  console.log(
    JSON.stringify(
      {
        imported: nextTemplates.length,
        total: merged.length,
        slugs: nextTemplates.map(template => template.slug),
      },
      null,
      2,
    ),
  )
}

await main()
