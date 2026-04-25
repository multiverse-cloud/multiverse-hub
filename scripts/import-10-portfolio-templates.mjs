import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCE_ROOT = path.join(ROOT, '.tmp', '10-portfolio-templates')
const STORE_PATH = path.join(ROOT, 'data', 'template-local-store.json')
const DETAILS_DIR = path.join(ROOT, 'data', 'template-details')
const TITLE_REGISTRY_PATH = path.join(ROOT, 'data', 'template-topic-titles.txt')
const UPDATED_AT = '2026-04-25'

const TEMPLATE_CONFIG = {
  'template-01-dark-minimal': {
    title: 'Alex Morgan Dark Minimal Portfolio',
    summary:
      'A dark minimal portfolio template with editorial typography, custom cursor details, and a polished monochrome-first presentation.',
    description:
      'This portfolio template is ideal for designers, creative developers, and personal brands that want a calm premium look with darker surfaces, elegant type, and subtle motion.',
    style: 'Dark minimal editorial portfolio',
    audience: 'designers, creative developers, and personal brand sites',
    tags: ['dark portfolio', 'minimal portfolio', 'editorial portfolio', 'personal website', 'html portfolio'],
    prompt:
      'Design a premium dark minimal portfolio with editorial typography, monochrome surfaces, refined motion, and a calm luxury feel.',
    sections: ['Hero', 'Selected work', 'About', 'Services', 'Contact'],
    layoutNotes: [
      'The visual identity comes from typography, contrast, and spacing rather than busy UI framing.',
      'This template works best when the creator wants a mature, design-led personal site.',
    ],
    responsiveNotes: [
      'The dark editorial layout compresses neatly into a stacked mobile experience.',
      'Typography and spacing remain readable without needing dense overlays on mobile.',
    ],
    bestFor: ['Designer portfolios', 'Creative studios', 'Personal brand sites'],
    featured: true,
  },
  'template-02-creative-agency': {
    title: 'Creative Agency Bold Portfolio',
    summary:
      'A vibrant agency-style portfolio with bold typography, expressive color, and campaign-like case study framing.',
    description:
      'This portfolio template is built for studios and creative agencies that want a louder first impression, strong color usage, and more promotional energy across their portfolio sections.',
    style: 'Bold creative agency portfolio',
    audience: 'creative agencies, studios, and brand-first freelancers',
    tags: ['creative agency portfolio', 'studio portfolio', 'bold portfolio', 'agency website', 'html portfolio'],
    prompt:
      'Design a bold creative agency portfolio with expressive color, campaign-like typography, energetic layouts, and premium studio presentation.',
    sections: ['Hero', 'Capabilities', 'Work', 'Process', 'Team', 'Contact'],
    layoutNotes: [
      'The template is more expressive than minimal, so typography and color do most of the identity work.',
      'Best used when the brand wants a louder agency-style presentation instead of a quiet portfolio.',
    ],
    responsiveNotes: [
      'Large headlines compress into a cleaner stacked mobile layout while preserving contrast.',
      'High-energy sections remain readable on smaller screens without depending on hover interactions.',
    ],
    bestFor: ['Agencies', 'Creative studios', 'Visual brand portfolios'],
    featured: true,
  },
  'template-03-photographer': {
    title: 'Elena Voss Photographer Portfolio',
    summary:
      'A premium photographer portfolio with image-led storytelling, elegant typography, and a cleaner gallery-first layout.',
    description:
      'This template is designed for photographers and visual artists who need a high-trust personal site with large imagery, selective editorial copy, and portfolio-first presentation.',
    style: 'Minimal photography portfolio',
    audience: 'photographers, visual artists, and editorial creators',
    tags: ['photography portfolio', 'photographer website', 'gallery portfolio', 'creative portfolio', 'html portfolio'],
    prompt:
      'Design a premium photographer portfolio with clean gallery rhythm, strong image hierarchy, elegant typography, and minimal supporting copy.',
    sections: ['Hero', 'Gallery', 'Selected work', 'About', 'Contact'],
    layoutNotes: [
      'The page relies on imagery and whitespace more than interface chrome.',
      'Use this template when the work itself needs to be the dominant visual anchor.',
    ],
    responsiveNotes: [
      'Gallery blocks stack into mobile-friendly image rails with preserved rhythm.',
      'Captions and metadata remain secondary so imagery keeps visual priority.',
    ],
    bestFor: ['Photographers', 'Editorial artists', 'Gallery-style portfolios'],
    featured: true,
  },
  'template-04-developer': {
    title: 'Alex Chen Developer Terminal Portfolio',
    summary:
      'A terminal-inspired developer portfolio with code aesthetics, animated surfaces, and a sharp technical personality.',
    description:
      'Built for engineers and technical creators, this portfolio template combines developer tooling references, terminal visuals, and interactive sections in a highly recognizable personal brand format.',
    style: 'Terminal developer portfolio',
    audience: 'developers, engineers, and technical personal brands',
    tags: ['developer portfolio', 'terminal portfolio', 'code portfolio', 'engineer website', 'html portfolio'],
    prompt:
      'Design a premium terminal-style developer portfolio with code-inspired typography, matrix details, sharp technical branding, and strong readability.',
    sections: ['Hero', 'Projects', 'Experience', 'Skills', 'Contact'],
    layoutNotes: [
      'The theme is technical and immersive, but the content still needs to scan quickly.',
      'This template suits engineers who want a memorable code-centric personal site.',
    ],
    responsiveNotes: [
      'The terminal-like layout collapses into simpler sections on mobile screens.',
      'Decorative effects remain secondary so the site still feels usable on touch devices.',
    ],
    bestFor: ['Developer portfolios', 'Engineer websites', 'Technical freelancers'],
    featured: true,
  },
  'template-05-architect': {
    title: 'Architect Studio Portfolio',
    summary:
      'A structured architecture portfolio with refined grids, calm typography, and project-led spatial storytelling.',
    description:
      'This template is suited for architects and spatial designers who need a clean portfolio with stronger project framing, restrained color use, and a credible studio-like presence.',
    style: 'Architectural studio portfolio',
    audience: 'architects, interior designers, and spatial studios',
    tags: ['architect portfolio', 'architecture website', 'studio portfolio', 'project showcase', 'html portfolio'],
    prompt:
      'Design a premium architecture portfolio with strict grids, calm typography, project-led case studies, and an understated studio aesthetic.',
    sections: ['Hero', 'Projects', 'Studio', 'Approach', 'Contact'],
    layoutNotes: [
      'The layout should feel spatial, ordered, and project-first.',
      'This template fits creators who need a credible studio presence instead of a playful personal page.',
    ],
    responsiveNotes: [
      'Project grids become stacked cards without losing the ordered hierarchy.',
      'Whitespace remains generous so the portfolio stays premium on mobile screens.',
    ],
    bestFor: ['Architects', 'Interior studios', 'Spatial design portfolios'],
    featured: false,
  },
  'template-06-fashion': {
    title: 'Valentine Fashion Editorial Portfolio',
    summary:
      'A fashion-forward editorial portfolio with luxury-inspired pacing, larger imagery, and magazine-style visual rhythm.',
    description:
      'This fashion portfolio template is built for stylists, models, photographers, and editorial creatives who want a more luxurious personal site with strong visual pacing and high-contrast type.',
    style: 'Luxury fashion editorial portfolio',
    audience: 'fashion creatives, stylists, models, and editorial brands',
    tags: ['fashion portfolio', 'editorial portfolio', 'luxury portfolio', 'stylist website', 'html portfolio'],
    prompt:
      'Design a premium fashion editorial portfolio with luxury pacing, magazine-inspired composition, strong photography blocks, and clean typography.',
    sections: ['Hero', 'Editorial work', 'Lookbook', 'About', 'Contact'],
    layoutNotes: [
      'The template should feel more like a digital editorial spread than a standard portfolio grid.',
      'Large imagery and refined type carry the brand identity throughout the page.',
    ],
    responsiveNotes: [
      'Editorial sections collapse into touch-friendly image and text stacks.',
      'The visual tone stays premium without relying on overly heavy chrome on mobile.',
    ],
    bestFor: ['Fashion portfolios', 'Luxury personal brands', 'Editorial creators'],
    featured: false,
  },
  'template-07-neon-cyberpunk': {
    title: 'Neon Cyberpunk Portfolio',
    summary:
      'A cyberpunk portfolio template with neon lighting, futuristic UI surfaces, and high-energy branding for standout personal sites.',
    description:
      'This template is built for creators who want a loud futuristic portfolio with glowing accents, dark surfaces, animated visuals, and a more cinematic personal brand.',
    style: 'Cyberpunk neon portfolio',
    audience: 'creative technologists, gamers, and futuristic personal brands',
    tags: ['cyberpunk portfolio', 'neon portfolio', 'futuristic portfolio', 'dark website', 'html portfolio'],
    prompt:
      'Design a premium cyberpunk portfolio with neon lighting, futuristic surfaces, cinematic motion, and a memorable high-energy identity.',
    sections: ['Hero', 'Projects', 'Skills', 'Experience', 'Contact'],
    layoutNotes: [
      'The neon styling is the main identity layer, so sections should feel immersive without becoming unreadable.',
      'This template works best for creators who want a visually loud, memorable portfolio.',
    ],
    responsiveNotes: [
      'Large visual effects scale down into cleaner mobile sections with preserved contrast.',
      'The page avoids depending on hover-only affordances so the theme still works on touch screens.',
    ],
    bestFor: ['Creative developers', 'Gaming portfolios', 'Futuristic personal brands'],
    featured: true,
  },
  'template-08-swiss-design': {
    title: 'Swiss Design Portfolio',
    summary:
      'A Swiss-style portfolio with disciplined grids, typographic clarity, and a high-signal visual system for modern design work.',
    description:
      'This template focuses on ordered layout, sharp typography, and restrained presentation, making it ideal for designers who want a rational, gallery-quality portfolio experience.',
    style: 'Swiss grid portfolio',
    audience: 'graphic designers, art directors, and modern creative portfolios',
    tags: ['swiss design portfolio', 'grid portfolio', 'typography portfolio', 'minimal website', 'html portfolio'],
    prompt:
      'Design a premium Swiss-inspired portfolio with rigid grids, typographic precision, editorial spacing, and a clean modernist visual system.',
    sections: ['Hero', 'Work', 'About', 'Capabilities', 'Contact'],
    layoutNotes: [
      'Grids and type do the work, so extra decorative UI should stay minimal.',
      'This template is ideal when the creator wants precision and clarity over visual noise.',
    ],
    responsiveNotes: [
      'The strict grid system simplifies into aligned stacked sections on smaller screens.',
      'Spacing and text hierarchy remain the main identity even in mobile layouts.',
    ],
    bestFor: ['Graphic designers', 'Modernist portfolios', 'Editorial design sites'],
    featured: false,
  },
  'template-09-3d-interactive': {
    title: '3D Interactive Portfolio',
    summary:
      'A playful 3D-inspired portfolio with immersive visuals, interactive motion, and a modern experimental creator feel.',
    description:
      'This portfolio template is designed for motion designers, creative developers, and digital artists who want a more interactive presentation with visual depth and a modern experimental tone.',
    style: '3D interactive portfolio',
    audience: 'motion designers, digital artists, and creative technologists',
    tags: ['3d portfolio', 'interactive portfolio', 'motion portfolio', 'creative developer site', 'html portfolio'],
    prompt:
      'Design a premium interactive portfolio with 3D-inspired visuals, motion-rich sections, experimental composition, and strong creative energy.',
    sections: ['Hero', 'Work', 'Interactive showcase', 'About', 'Contact'],
    layoutNotes: [
      'The visual identity depends on motion and depth, so the composition should feel playful but still usable.',
      'This template is suited for creators whose work benefits from a more experimental presentation.',
    ],
    responsiveNotes: [
      'Interactive surfaces collapse into simpler touch-friendly modules on mobile.',
      'Visual depth remains part of the experience without hurting readability on smaller screens.',
    ],
    bestFor: ['Digital artists', 'Motion designers', 'Interactive portfolios'],
    featured: true,
  },
  'template-10-brutalist': {
    title: 'Brutalist Portfolio',
    summary:
      'A bold brutalist portfolio with hard edges, strong contrast, and poster-like typography for a standout visual identity.',
    description:
      'This template is ideal for creatives who want an unapologetically bold personal website with heavy borders, raw shapes, and a more anti-polished, expressive portfolio direction.',
    style: 'Brutalist portfolio',
    audience: 'experimental designers, art directors, and bold personal brands',
    tags: ['brutalist portfolio', 'bold portfolio', 'experimental website', 'graphic design site', 'html portfolio'],
    prompt:
      'Design a premium brutalist portfolio with poster-like typography, hard-edged shapes, high contrast blocks, and a strong anti-polished identity.',
    sections: ['Hero', 'Work', 'About', 'Services', 'Contact'],
    layoutNotes: [
      'The brutalist identity should feel deliberate and graphic rather than messy.',
      'This template works well for portfolios that want strong visual memorability over softness.',
    ],
    responsiveNotes: [
      'Hard-edged modules stack into strong mobile sections without losing visual clarity.',
      'Typography remains large and direct so the style survives smaller screens.',
    ],
    bestFor: ['Experimental portfolios', 'Art direction sites', 'Bold personal brands'],
    featured: false,
  },
}

function stripBom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

function normalizeTopic(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function stripTemplateForIndex(template) {
  return {
    ...template,
    files: template.files.map(file => ({
      ...file,
      content: '',
    })),
    previewHtml: undefined,
  }
}

async function readText(filePath) {
  return stripBom(await readFile(filePath, 'utf8'))
}

async function readStoreIndex() {
  const raw = await readFile(STORE_PATH, 'utf8')
  const parsed = JSON.parse(stripBom(raw))
  return Array.isArray(parsed.templates) ? parsed.templates : []
}

async function readExistingTemplateWithDetails(template) {
  const hasEmbeddedContent =
    template.files?.some(file => Boolean(file.content)) || Boolean(template.previewHtml?.trim())

  if (hasEmbeddedContent) {
    return template
  }

  try {
    const detailPath = path.join(DETAILS_DIR, `${template.slug}.json`)
    const raw = await readFile(detailPath, 'utf8')
    return JSON.parse(stripBom(raw))
  } catch {
    return template
  }
}

async function loadCurrentTemplatesWithDetails() {
  const indexEntries = await readStoreIndex()
  return Promise.all(indexEntries.map(readExistingTemplateWithDetails))
}

async function createTemplateEntry(folderName) {
  const config = TEMPLATE_CONFIG[folderName]
  if (!config) {
    throw new Error(`Missing template config for ${folderName}`)
  }

  const html = await readText(path.join(SOURCE_ROOT, folderName, 'index.html'))
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
        summary: `${config.title} complete template source.`,
        primary: true,
      },
    ],
    previewHtml: html,
    featured: config.featured,
    updatedAt: UPDATED_AT,
    license: 'Free download',
    priceLabel: 'Free',
    importSource: '10-portfolio-templates',
  }
}

async function writeTemplateFiles(templates) {
  await mkdir(DETAILS_DIR, { recursive: true })

  const expectedSlugs = new Set(templates.map(template => template.slug))
  const currentEntries = await readdir(DETAILS_DIR, { withFileTypes: true }).catch(() => [])

  for (const entry of currentEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    const slug = entry.name.replace(/\.json$/i, '')
    if (!expectedSlugs.has(slug)) {
      continue
    }
  }

  for (const template of templates) {
    const detailPath = path.join(DETAILS_DIR, `${template.slug}.json`)
    await writeFile(detailPath, `${JSON.stringify(template, null, 2)}\n`, 'utf8')
  }
}

async function writeIndexAndRegistry(templates) {
  const sorted = [...templates].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return String(left.title).localeCompare(String(right.title))
  })

  const payload = {
    templates: sorted.map(stripTemplateForIndex),
    meta: {
      source: 'admin-bulk-save + 10-portfolio-templates-import',
      generatedAt: new Date().toISOString(),
      count: sorted.length,
    },
  }

  await writeFile(STORE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  const titleRegistry = sorted
    .map(template => `${normalizeTopic(template.title)} | ${template.title} | ${template.slug}`)
    .join('\n')

  await writeFile(TITLE_REGISTRY_PATH, `${titleRegistry}\n`, 'utf8')
}

async function main() {
  const currentTemplates = await loadCurrentTemplatesWithDetails()
  const importedTemplates = []

  for (const folderName of Object.keys(TEMPLATE_CONFIG)) {
    importedTemplates.push(await createTemplateEntry(folderName))
  }

  const incomingSlugs = new Set(importedTemplates.map(template => template.slug))
  const incomingIds = new Set(importedTemplates.map(template => template.id))

  const merged = currentTemplates
    .filter(template => !incomingSlugs.has(template.slug) && !incomingIds.has(template.id))
    .concat(importedTemplates)

  await mkdir(path.dirname(STORE_PATH), { recursive: true })
  await writeTemplateFiles(merged)
  await writeIndexAndRegistry(merged)

  console.log(
    JSON.stringify(
      {
        imported: importedTemplates.length,
        total: merged.length,
        slugs: importedTemplates.map(template => template.slug),
      },
      null,
      2,
    ),
  )
}

await main()
