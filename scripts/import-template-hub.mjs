/**
 * Migration script: Import website-template-hub templates + components
 * into Multiverse's template-local-store.json
 * 
 * Run: node scripts/import-template-hub.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const HUB_DIR = join(ROOT, 'website-template-hub-main')
const LOCAL_STORE = join(ROOT, 'data', 'template-local-store.json')

// Industry → TemplateCategoryId mapping
const INDUSTRY_TO_CATEGORY = {
  'Digital Agency': 'agency',
  'Crypto': 'crypto',
  'E-commerce': 'ecommerce',
  'Education': 'education',
  'Fitness': 'fitness',
  'Healthcare': 'healthcare',
  'Real Estate': 'real-estate',
  'Restaurant': 'restaurant',
  'SaaS': 'saas',
}

// Component category mapping
const COMPONENT_CATEGORY_MAP = {
  'badges': 'badges',
  'buttons': 'buttons',
  'cards': 'cards',
  'data': 'data-display',
  'footers': 'footers',
  'forms': 'forms',
  'heroes': 'heroes',
  'modals': 'modals',
  'navbars': 'navbars',
  'statistics': 'statistics',
  'ui': 'ui-elements',
}

// Category → SEO-friendly title
const CATEGORY_TITLES = {
  'agency': 'Digital Agency',
  'crypto': 'Crypto & Web3',
  'ecommerce': 'Ecommerce UI',
  'education': 'Education',
  'fitness': 'Fitness & Wellness',
  'healthcare': 'Healthcare',
  'real-estate': 'Real Estate',
  'restaurant': 'Restaurant & Food',
  'saas': 'SaaS Products',
  'badges': 'Badges',
  'buttons': 'Buttons',
  'cards': 'Cards',
  'data-display': 'Data Display',
  'footers': 'Footers',
  'forms': 'Forms',
  'heroes': 'Hero Sections',
  'modals': 'Modals & Dialogs',
  'navbars': 'Navigation Bars',
  'statistics': 'Statistics',
  'ui-elements': 'UI Elements',
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function stripBom(str) {
  return str.charCodeAt(0) === 0xFEFF ? str.slice(1) : str
}

function readJson(filePath) {
  return JSON.parse(stripBom(readFileSync(filePath, 'utf-8')))
}

function readHubFile(relativePath) {
  const fullPath = join(HUB_DIR, relativePath)
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ File not found: ${relativePath}`)
    return null
  }
  return readFileSync(fullPath, 'utf-8')
}

function generateSEODescription(name, industry, category) {
  const descriptions = {
    'Digital Agency': `Download ${name}, a free professional digital agency HTML template. Fully responsive, modern design built with Tailwind CSS. Perfect for creative agencies, marketing firms, and web studios. MIT licensed.`,
    'Crypto': `Download ${name}, a free cryptocurrency and Web3 HTML template. Built with Tailwind CSS for blockchain projects, DeFi protocols, and crypto startups. Fully responsive and production-ready.`,
    'E-commerce': `Download ${name}, a free e-commerce HTML template built with Tailwind CSS. Perfect for online stores, fashion brands, and retail businesses. Modern, responsive, and conversion-optimized.`,
    'Education': `Download ${name}, a free education HTML template. Built with Tailwind CSS for online courses, schools, and learning platforms. Responsive design with modern UI patterns.`,
    'Fitness': `Download ${name}, a free fitness and wellness HTML template. Built with Tailwind CSS for gyms, personal trainers, and health brands. Bold, energetic design that converts.`,
    'Healthcare': `Download ${name}, a free healthcare HTML template. Built with Tailwind CSS for medical practices, clinics, and health services. Clean, trustworthy design with accessibility in mind.`,
    'Real Estate': `Download ${name}, a free real estate HTML template. Built with Tailwind CSS for property listings, agencies, and real estate platforms. Professional design with lead-capture focus.`,
    'Restaurant': `Download ${name}, a free restaurant HTML template. Built with Tailwind CSS for restaurants, cafés, and food delivery services. Appetizing design with menu-ready layouts.`,
    'SaaS': `Download ${name}, a free SaaS product HTML template. Built with Tailwind CSS for software companies, startups, and cloud platforms. Clean, modern, and conversion-focused.`,
  }
  return descriptions[industry] || `Download ${name}, a free ${category} HTML template built with Tailwind CSS. Fully responsive, modern design, MIT licensed and production-ready.`
}

function generateComponentSEODescription(name, category) {
  return `Copy-ready ${name} UI component built with HTML and Tailwind CSS. Free, responsive ${category} component with live preview and source code. Perfect for modern web projects.`
}

// --- Import Templates ---

function importTemplates() {
  const templatesJson = readJson(join(HUB_DIR, 'data', 'templates.json'))
  console.log(`\n📦 Importing ${templatesJson.length} templates...`)
  
  const templates = []
  let imported = 0
  let skipped = 0

  for (const t of templatesJson) {
    const htmlContent = readHubFile(t.previewUrl)
    if (!htmlContent) {
      skipped++
      continue
    }

    const category = INDUSTRY_TO_CATEGORY[t.industry] || 'landing'
    const slug = slugify(t.name)
    const categoryTitle = CATEGORY_TITLES[category] || t.industry

    const entry = {
      id: `hub-${t.id}`,
      slug,
      title: t.name,
      seoTitle: `${t.name} - Free ${t.industry} Website Template | Download HTML + Tailwind CSS | Multiverse`,
      metaDescription: generateSEODescription(t.name, t.industry, t.category),
      summary: `Professional ${t.industry.toLowerCase()} one-page website template. ${t.category} specialization. Built with HTML5 and Tailwind CSS, fully responsive and free to download.`,
      description: `${t.name} is a premium-quality, production-ready ${t.industry.toLowerCase()} website template designed for ${t.category.toLowerCase()} businesses. Features modern design patterns, smooth animations, and full responsiveness across all devices. Built with clean HTML5 and Tailwind CSS, making it easy to customize and deploy.`,
      category,
      categoryTitle,
      platform: 'responsive',
      platformLabel: 'Responsive',
      framework: 'html-tailwind',
      frameworkLabel: 'HTML + Tailwind CSS',
      templateType: 'template',
      industry: t.industry,
      style: `Modern ${t.industry.toLowerCase()} landing page`,
      audience: `${t.category.toLowerCase()} businesses and professionals`,
      tags: [
        `${t.industry.toLowerCase()} template`,
        `${t.category.toLowerCase()}`,
        'html template',
        'tailwind template',
        'free template',
        'landing page',
        'one page',
        'responsive',
        slug.split('-').slice(0, 3).join(' '),
      ],
      techStack: t.tech || ['HTML', 'Tailwind CSS', 'JavaScript'],
      prompt: '',
      sections: ['Hero', 'Features', 'About', 'Contact', 'Footer'],
      layoutNotes: [`Single-page ${t.industry.toLowerCase()} layout with modern sections and smooth scrolling.`],
      responsiveNotes: ['Fully responsive across mobile, tablet, and desktop breakpoints.'],
      bestFor: [`${t.industry} websites`, `${t.category} landing pages`, 'One-page sites'],
      files: [
        {
          path: 'index.html',
          language: 'html',
          content: htmlContent,
          summary: `Main ${t.industry.toLowerCase()} template page with full layout.`,
          primary: true,
        }
      ],
      featured: false,
      updatedAt: '2026-04-17',
      license: 'MIT - Free download',
      priceLabel: 'Free',
    }

    templates.push(entry)
    imported++
    process.stdout.write(`  ✓ ${t.name}\n`)
  }

  console.log(`  📊 Templates: ${imported} imported, ${skipped} skipped`)
  return templates
}

// --- Import Components ---

function importComponents() {
  const componentsJson = readJson(join(HUB_DIR, 'data', 'components.json'))
  console.log(`\n🧩 Importing ${componentsJson.length} UI components...`)

  const components = []
  let imported = 0
  let skipped = 0

  for (const c of componentsJson) {
    const htmlContent = readHubFile(c.file)
    if (!htmlContent) {
      skipped++
      continue
    }

    const category = COMPONENT_CATEGORY_MAP[c.category] || 'ui-elements'
    const slug = slugify(c.name)
    const categoryTitle = CATEGORY_TITLES[category] || c.category

    const entry = {
      id: `component-${slug}`,
      slug: `component-${slug}`,
      title: c.name,
      seoTitle: `${c.name} - Free ${categoryTitle} UI Component | HTML + Tailwind CSS | Multiverse`,
      metaDescription: generateComponentSEODescription(c.name, categoryTitle),
      summary: `Free ${categoryTitle.toLowerCase()} UI component built with HTML and Tailwind CSS. Copy-ready code with live preview.`,
      description: `${c.name} is a premium UI ${categoryTitle.toLowerCase()} component built with clean HTML and Tailwind CSS. Features modern design patterns, smooth animations, and full responsiveness. Copy the code and use it in any project.`,
      category,
      categoryTitle,
      platform: 'responsive',
      platformLabel: 'Responsive',
      framework: 'html-tailwind',
      frameworkLabel: 'HTML + Tailwind CSS',
      templateType: 'component',
      industry: categoryTitle,
      style: `Modern ${categoryTitle.toLowerCase()} component`,
      audience: 'web developers and designers',
      tags: [
        `${categoryTitle.toLowerCase()} component`,
        `${c.category}`,
        'ui component',
        'tailwind component',
        'html component',
        'free component',
        'copy-ready',
      ],
      techStack: ['HTML', 'Tailwind CSS'],
      prompt: '',
      sections: [],
      layoutNotes: [],
      responsiveNotes: ['Fully responsive component designed for all screen sizes.'],
      bestFor: [`${categoryTitle} in web applications`, 'Modern UI projects', 'Tailwind CSS projects'],
      files: [
        {
          path: 'index.html',
          language: 'html',
          content: htmlContent,
          summary: `${c.name} component source code.`,
          primary: true,
        }
      ],
      featured: false,
      updatedAt: '2026-04-17',
      license: 'MIT - Free download',
      priceLabel: 'Free',
    }

    components.push(entry)
    imported++
    process.stdout.write(`  ✓ ${c.name}\n`)
  }

  console.log(`  📊 Components: ${imported} imported, ${skipped} skipped`)
  return components
}

// --- Main ---

function main() {
  console.log('🚀 Template Hub → Multiverse Migration')
  console.log('=' .repeat(50))

  // Load existing local store
  let existing = []
  if (existsSync(LOCAL_STORE)) {
    const raw = readJson(LOCAL_STORE)
    existing = Array.isArray(raw.templates) ? raw.templates : []
    console.log(`📂 Existing store: ${existing.length} entries`)
  }

  // Remove any previous hub imports (re-runnable)
  const filtered = existing.filter(t => !t.id?.startsWith('hub-') && !t.id?.startsWith('component-'))
  console.log(`🧹 After removing previous hub imports: ${filtered.length} entries`)

  // Import new data
  const templates = importTemplates()
  const components = importComponents()

  // Merge
  const merged = [...filtered, ...templates, ...components]

  // Sort: featured first, then alphabetically
  merged.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return a.title.localeCompare(b.title)
  })

  // Write
  const payload = {
    templates: merged,
    meta: {
      source: 'hub-migration + admin',
      generatedAt: new Date().toISOString(),
      count: merged.length,
    }
  }

  writeFileSync(LOCAL_STORE, JSON.stringify(payload, null, 2) + '\n', 'utf-8')

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Migration complete!`)
  console.log(`   📄 Templates: ${templates.length}`)
  console.log(`   🧩 Components: ${components.length}`)
  console.log(`   📦 Total entries: ${merged.length}`)
  console.log(`   💾 Saved to: ${LOCAL_STORE}`)
}

main()
