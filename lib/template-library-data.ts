export type TemplateCategoryId =
  | 'landing'
  | 'dashboard'
  | 'auth'
  | 'mobile'
  | 'ecommerce'
  | 'portfolio'
  | 'pricing'
  | 'onboarding'
  // Hub industry categories
  | 'agency'
  | 'crypto'
  | 'education'
  | 'fitness'
  | 'healthcare'
  | 'real-estate'
  | 'restaurant'
  | 'saas'
  // UI component categories
  | 'badges'
  | 'buttons'
  | 'cards'
  | 'data-display'
  | 'footers'
  | 'forms'
  | 'heroes'
  | 'modals'
  | 'navbars'
  | 'statistics'
  | 'ui-elements'

export type TemplatePlatformId = 'web' | 'mobile' | 'responsive'
export type TemplateFrameworkId = 'html-css-js' | 'html-tailwind' | 'react-tailwind' | 'next-tailwind'

export type TemplateType = 'template' | 'component'

export type TemplateSourceFile = {
  path: string
  language: 'html' | 'css' | 'js' | 'tsx' | 'ts' | 'md' | 'json'
  content: string
  summary: string
  primary?: boolean
}

export type TemplateEntry = {
  id: string
  slug: string
  title: string
  seoTitle: string
  metaDescription: string
  summary: string
  description: string
  category: TemplateCategoryId
  categoryTitle: string
  platform: TemplatePlatformId
  platformLabel: string
  framework: TemplateFrameworkId
  frameworkLabel: string
  templateType: TemplateType
  industry: string
  style: string
  audience: string
  tags: string[]
  techStack: string[]
  prompt: string
  sections: string[]
  layoutNotes: string[]
  responsiveNotes: string[]
  bestFor: string[]
  files: TemplateSourceFile[]
  previewHtml?: string
  previewImage?: string
  previewCapturedAt?: string
  liveUrl?: string
  downloadUrl?: string
  featured?: boolean
  updatedAt: string
  license: string
  priceLabel: string
}

export type TemplateCategoryDefinition = {
  id: TemplateCategoryId
  title: string
  description: string
}

export type TemplatePlatformDefinition = {
  id: TemplatePlatformId
  title: string
}

type TemplateSeed = Omit<
  TemplateEntry,
  | 'id'
  | 'slug'
  | 'seoTitle'
  | 'metaDescription'
  | 'categoryTitle'
  | 'platformLabel'
  | 'frameworkLabel'
  | 'templateType'
  | 'license'
  | 'priceLabel'
>

const UPDATED_AT = '2026-04-01'

export const TEMPLATE_CATEGORY_DEFS: TemplateCategoryDefinition[] = [
  // Original categories
  { id: 'landing', title: 'Landing Pages', description: 'Downloadable launch-ready marketing pages.' },
  { id: 'dashboard', title: 'Dashboards', description: 'Operational UI systems with premium information density.' },
  { id: 'auth', title: 'Auth Screens', description: 'Trust-heavy sign-in and gated access flows.' },
  { id: 'mobile', title: 'Mobile Apps', description: 'Mobile-first templates for consumer and utility products.' },
  { id: 'ecommerce', title: 'Ecommerce UI', description: 'Storefront templates built around merchandising and conversion.' },
  { id: 'portfolio', title: 'Portfolio Sites', description: 'Portfolio and case-study templates for builders and studios.' },
  { id: 'pricing', title: 'Pricing Pages', description: 'Plan and packaging layouts with stronger conversion clarity.' },
  { id: 'onboarding', title: 'Onboarding Flows', description: 'Activation-first onboarding experiences and checklists.' },
  // Hub industry categories
  { id: 'agency', title: 'Digital Agency', description: 'Creative agency and marketing firm website templates.' },
  { id: 'crypto', title: 'Crypto & Web3', description: 'Blockchain, DeFi, and cryptocurrency project templates.' },
  { id: 'education', title: 'Education', description: 'Online learning, courses, and educational platform templates.' },
  { id: 'fitness', title: 'Fitness & Wellness', description: 'Gym, personal training, and wellness brand templates.' },
  { id: 'healthcare', title: 'Healthcare', description: 'Medical practice, clinic, and health service templates.' },
  { id: 'real-estate', title: 'Real Estate', description: 'Property listings, agencies, and real estate platform templates.' },
  { id: 'restaurant', title: 'Restaurant & Food', description: 'Restaurant, café, and food service brand templates.' },
  { id: 'saas', title: 'SaaS Products', description: 'Software-as-a-service product landing and dashboard templates.' },
  // UI component categories
  { id: 'badges', title: 'Badges', description: 'Status indicators, notification badges, and label components.' },
  { id: 'buttons', title: 'Buttons', description: 'Interactive button components with premium hover effects.' },
  { id: 'cards', title: 'Cards', description: 'Content cards, product cards, and information display panels.' },
  { id: 'data-display', title: 'Data Display', description: 'Tables, charts, and data visualization components.' },
  { id: 'footers', title: 'Footers', description: 'Website footer sections with navigation and branding.' },
  { id: 'forms', title: 'Forms', description: 'Input forms, contact forms, and interactive form elements.' },
  { id: 'heroes', title: 'Hero Sections', description: 'Full-width hero banners and above-the-fold sections.' },
  { id: 'modals', title: 'Modals & Dialogs', description: 'Overlay modals, popups, and dialog components.' },
  { id: 'navbars', title: 'Navigation Bars', description: 'Header navigation, sidebars, and menu components.' },
  { id: 'statistics', title: 'Statistics', description: 'Stats counters, metric displays, and KPI components.' },
  { id: 'ui-elements', title: 'UI Elements', description: 'Miscellaneous UI components and interface building blocks.' },
]

export const TEMPLATE_PLATFORM_DEFS: TemplatePlatformDefinition[] = [
  { id: 'web', title: 'Web' },
  { id: 'mobile', title: 'Mobile' },
  { id: 'responsive', title: 'Responsive' },
]

export const TEMPLATE_FRAMEWORK_LABELS: Record<TemplateFrameworkId, string> = {
  'html-css-js': 'HTML + CSS + JS',
  'html-tailwind': 'HTML + Tailwind CSS',
  'react-tailwind': 'React + Tailwind',
  'next-tailwind': 'Next.js + Tailwind',
}

const CATEGORY_META = Object.fromEntries(
  TEMPLATE_CATEGORY_DEFS.map(category => [category.id, category])
) as Record<TemplateCategoryId, TemplateCategoryDefinition>

const PLATFORM_LABELS = Object.fromEntries(
  TEMPLATE_PLATFORM_DEFS.map(platform => [platform.id, platform.title])
) as Record<TemplatePlatformId, string>

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function createFile(
  path: string,
  language: TemplateSourceFile['language'],
  summary: string,
  content: string,
  primary = false
): TemplateSourceFile {
  return { path, language, summary, content, primary }
}

function createTemplate(seed: TemplateSeed): TemplateEntry {
  const slug = slugify(seed.title)

  return {
    ...seed,
    id: `template-${slug}`,
    slug,
    seoTitle: `${seed.title} - Downloadable Premium UI Template | Multiverse`,
    metaDescription: seed.summary,
    categoryTitle: CATEGORY_META[seed.category]?.title || seed.category,
    platformLabel: PLATFORM_LABELS[seed.platform],
    frameworkLabel: TEMPLATE_FRAMEWORK_LABELS[seed.framework],
    templateType: 'template',
    updatedAt: seed.updatedAt || UPDATED_AT,
    license: 'Free download',
    priceLabel: 'Free',
  }
}

const TEMPLATE_SEEDS: TemplateSeed[] = [
  {
    title: 'Obsidian Launchpad',
    summary: 'A free premium landing page template for AI and SaaS products with strong hero framing, proof sections, and a cleaner launch narrative.',
    description:
      'Built as a premium Next.js and Tailwind starter, this landing system is designed for AI products that need visual trust, strong hierarchy, and a restrained premium aesthetic without gradient-heavy noise.',
    category: 'landing',
    platform: 'responsive',
    framework: 'next-tailwind',
    industry: 'AI SaaS',
    style: 'Dark premium launch page with editorial rhythm',
    audience: 'startup founders and product marketers',
    tags: ['ai landing page', 'saas ui', 'startup website', 'launch page'],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    prompt:
      'Design a premium dark landing page for an AI workspace product. Use a sharp hero, proof metrics, workflow cards, product surface, testimonial block, and a measured final CTA. Keep it elegant, restrained, and conversion-ready with no loud gradients.',
    sections: ['Hero', 'Trust strip', 'Workflow cards', 'Product surface', 'Case-study style proof', 'Final CTA'],
    layoutNotes: [
      'The hero pairs proof copy with a product panel so the promise and the interface arrive together.',
      'Sections alternate between sales narrative and interface proof instead of stacking generic feature cards.',
      'The page uses contrast, spacing, and framing to feel premium without relying on decorative gradients.',
    ],
    responsiveNotes: [
      'Hero content stacks cleanly and keeps the CTA above the fold on smaller screens.',
      'Workflow cards become a single vertical rail with larger spacing on mobile.',
      'Metrics and logos compress into compact rows without shrinking text too aggressively.',
    ],
    bestFor: ['AI launch sites', 'Demo-first product marketing', 'Waitlist pages'],
    files: [
      createFile(
        'index.html',
        'html',
        'Main landing page markup.',
        String.raw`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neural Stack</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-mark"></span>
          <span>Neural Stack</span>
        </div>
        <nav class="nav">
          <a href="#workflow">Workflow</a>
          <a href="#product">Product</a>
          <a href="#proof">Proof</a>
          <a href="#cta">Get access</a>
        </nav>
      </header>
      <main>
        <section class="hero">
          <div class="hero-copy">
            <p class="eyebrow">AI workspace system</p>
            <h1>Ship faster with one command center for briefs, prompts, and execution.</h1>
            <p class="hero-text">
              Neural Stack helps teams move from messy context to production-ready work with a premium
              workspace built for operators, researchers, and product teams.
            </p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#cta">Request access</a>
              <a class="btn btn-secondary" href="#product">View interface</a>
            </div>
            <div class="metric-row">
              <div><strong>38%</strong><span>faster launch cycles</span></div>
              <div><strong>12h</strong><span>saved per weekly sprint</span></div>
              <div><strong>4.9/5</strong><span>operator satisfaction</span></div>
            </div>
          </div>
          <div class="hero-panel">
            <div class="window">
              <div class="window-bar">
                <span></span><span></span><span></span>
              </div>
              <div class="window-body">
                <aside class="mini-sidebar">
                  <div class="mini-pill active">Sprint brief</div>
                  <div class="mini-pill">Prompt lab</div>
                  <div class="mini-pill">Launch ops</div>
                </aside>
                <div class="workspace">
                  <div class="workspace-card workspace-card-large">
                    <p class="label">Campaign brief</p>
                    <h3>Q2 launch narrative</h3>
                    <p>Position the product as the calmest AI workspace for execution-heavy teams.</p>
                  </div>
                  <div class="workspace-grid">
                    <div class="workspace-card"><p class="label">Prompt chain</p><p>Research -> messaging -> rollout</p></div>
                    <div class="workspace-card"><p class="label">Quality gate</p><p>Brand voice, risk checks, launch review</p></div>
                    <div class="workspace-card"><p class="label">Channel pack</p><p>Web, lifecycle, sales enablement</p></div>
                    <div class="workspace-card"><p class="label">Status</p><p>Ready for stakeholder review</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="trust-strip" id="proof">
          <p>Trusted by focused operators across product, growth, and AI launch teams.</p>
          <div class="logo-row"><span>Northstar</span><span>Parallel Labs</span><span>Atlas Cloud</span><span>Signal Foundry</span></div>
        </section>
        <section class="workflow" id="workflow">
          <div class="section-heading">
            <p class="eyebrow">Workflow architecture</p>
            <h2>Built to move messy work into a clear operating rhythm.</h2>
          </div>
          <div class="workflow-grid">
            <article class="info-card"><span>01</span><h3>Capture context</h3><p>Bring notes, customer calls, links, and rough thoughts into one structured workspace.</p></article>
            <article class="info-card"><span>02</span><h3>Shape the prompt stack</h3><p>Turn research into system prompts, reusable instructions, and task-specific execution flows.</p></article>
            <article class="info-card"><span>03</span><h3>Ship the output</h3><p>Move from insight to launch copy, product docs, and channel-ready assets with cleaner review loops.</p></article>
          </div>
        </section>
        <section class="product" id="product">
          <div class="product-copy">
            <p class="eyebrow">Product surface</p>
            <h2>One interface for planning, generating, and checking the work before it leaves the room.</h2>
            <p>The layout is built around operators who need visibility, not just generation. Tasks, status, review, and narrative all sit in the same frame.</p>
          </div>
          <div class="product-board">
            <div class="board-column"><p class="column-title">Planning</p><div class="board-card">Launch goals</div><div class="board-card">Audience map</div><div class="board-card">Offer angles</div></div>
            <div class="board-column"><p class="column-title">Execution</p><div class="board-card accent">Landing page draft</div><div class="board-card">Lifecycle email set</div><div class="board-card">Founder narrative</div></div>
            <div class="board-column"><p class="column-title">Review</p><div class="board-card">Brand QA</div><div class="board-card">Risk pass</div><div class="board-card">Final sign-off</div></div>
          </div>
        </section>
        <section class="quote-block">
          <p class="quote">"The difference is not more AI output. It is finally having a workspace that makes the work feel controlled."</p>
          <p class="quote-meta">Maya Shah, Head of Growth at Signal Foundry</p>
        </section>
        <section class="cta-panel" id="cta">
          <div>
            <p class="eyebrow">Ready to launch</p>
            <h2>Use this template to launch a product page that feels calm, sharp, and credible.</h2>
          </div>
          <a class="btn btn-primary" href="#">Download the template</a>
        </section>
      </main>
    </div>
    <script src="script.js"></script>
  </body>
</html>`,
        true
      ),
      createFile(
        'styles.css',
        'css',
        'Template styling, layout, and responsive rules.',
        String.raw`:root {
  color-scheme: dark;
  --bg: #0b1020;
  --card: rgba(14, 22, 40, 0.92);
  --soft: rgba(255, 255, 255, 0.08);
  --line: rgba(255, 255, 255, 0.12);
  --text: #f7f8fc;
  --muted: #9da7bf;
  --accent: #88a7ff;
  --accent-strong: #eef3ff;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif; background: radial-gradient(circle at top, #16213a 0%, var(--bg) 56%); color: var(--text); }
a { color: inherit; text-decoration: none; }
.shell { max-width: 1180px; margin: 0 auto; padding: 24px; }
.topbar, .hero, .workflow, .product, .cta-panel { display: grid; gap: 24px; }
.topbar { grid-template-columns: 1fr auto; align-items: center; padding: 18px 0 10px; }
.brand { display: inline-flex; gap: 12px; align-items: center; font-weight: 700; }
.brand-mark { width: 14px; height: 14px; border-radius: 999px; background: linear-gradient(135deg, #7bd2f5, #8f9cff); box-shadow: 0 0 0 6px rgba(136, 167, 255, 0.12); }
.nav { display: flex; gap: 20px; color: var(--muted); font-size: 14px; }
.hero { grid-template-columns: 1.08fr 0.92fr; padding: 72px 0 44px; align-items: center; }
.eyebrow { margin: 0 0 14px; color: #9eb2ff; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
h1, h2, h3, p { margin: 0; }
h1 { font-size: clamp(2.8rem, 5vw, 4.75rem); line-height: 1.02; letter-spacing: -0.04em; max-width: 12ch; }
h2 { font-size: clamp(2rem, 3.8vw, 3.2rem); line-height: 1.04; letter-spacing: -0.04em; max-width: 13ch; }
h3 { font-size: 1.05rem; line-height: 1.2; }
.hero-text, .product-copy p, .quote-meta { color: var(--muted); line-height: 1.75; max-width: 64ch; }
.cta-row, .metric-row, .logo-row { display: flex; flex-wrap: wrap; gap: 12px; }
.cta-row { margin: 28px 0 26px; }
.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 18px; border-radius: 16px; border: 1px solid var(--line); font-weight: 700; }
.btn-primary { background: var(--accent-strong); color: #0b1020; }
.btn-secondary { background: rgba(255, 255, 255, 0.03); }
.metric-row > div, .workspace-card, .info-card, .board-card, .quote-block, .cta-panel, .window { border: 1px solid var(--line); background: var(--card); backdrop-filter: blur(18px); }
.metric-row > div { min-width: 154px; padding: 14px 16px; border-radius: 18px; }
.metric-row strong { display: block; font-size: 1.25rem; margin-bottom: 6px; }
.metric-row span { color: var(--muted); font-size: 0.9rem; }
.window { border-radius: 26px; overflow: hidden; }
.window-bar { display: flex; gap: 8px; padding: 14px 16px; border-bottom: 1px solid var(--line); }
.window-bar span { width: 10px; height: 10px; border-radius: 999px; background: rgba(255, 255, 255, 0.26); }
.window-body { display: grid; grid-template-columns: 150px 1fr; min-height: 440px; }
.mini-sidebar { border-right: 1px solid var(--line); padding: 18px; display: grid; gap: 12px; align-content: start; }
.mini-pill { padding: 12px 14px; border-radius: 16px; background: rgba(255,255,255,0.03); color: var(--muted); font-size: 14px; }
.mini-pill.active { background: rgba(136, 167, 255, 0.14); color: var(--text); }
.workspace { padding: 18px; display: grid; gap: 16px; }
.workspace-card { border-radius: 22px; padding: 18px; }
.workspace-card-large { padding: 22px; }
.label, .column-title { color: #a6b8ff; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 10px; }
.workspace-card p:last-child { color: var(--muted); line-height: 1.7; }
.workspace-grid, .workflow-grid, .product-board { display: grid; gap: 16px; }
.workspace-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.trust-strip, .quote-block, .cta-panel { padding: 22px 24px; border-radius: 24px; }
.trust-strip { display: grid; gap: 16px; margin: 10px 0 28px; border: 1px solid var(--line); background: rgba(255,255,255,0.03); }
.trust-strip p, .logo-row { color: var(--muted); }
.logo-row { justify-content: space-between; text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; }
.workflow, .product { padding: 52px 0 18px; }
.section-heading { display: grid; gap: 16px; }
.workflow-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.info-card { border-radius: 24px; padding: 24px; }
.info-card span { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; border-radius: 999px; background: rgba(136, 167, 255, 0.12); margin-bottom: 18px; color: #d7deff; font-size: 13px; font-weight: 700; }
.info-card p { color: var(--muted); margin-top: 10px; line-height: 1.75; }
.product { grid-template-columns: 0.88fr 1.12fr; align-items: start; }
.product-board { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.board-column { border-radius: 22px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.03); padding: 16px; }
.board-card { padding: 16px; border-radius: 18px; margin-top: 12px; color: var(--muted); }
.board-card.accent { background: rgba(136, 167, 255, 0.12); color: var(--text); }
.quote-block { margin-top: 26px; }
.quote { max-width: 36ch; font-size: clamp(1.45rem, 3vw, 2.2rem); line-height: 1.18; letter-spacing: -0.03em; }
.quote-meta { margin-top: 14px; }
.cta-panel { margin: 30px 0 28px; grid-template-columns: 1fr auto; align-items: center; }
@media (max-width: 980px) {
  .topbar, .hero, .product, .cta-panel, .window-body { grid-template-columns: 1fr; }
  .nav { display: none; }
  .workflow-grid, .product-board, .workspace-grid { grid-template-columns: 1fr; }
  .logo-row { gap: 14px; justify-content: flex-start; }
}
@media (max-width: 640px) {
  .shell { padding: 18px; }
  .hero { padding-top: 46px; }
  .trust-strip, .quote-block, .cta-panel { padding: 18px; }
  .mini-sidebar { grid-template-columns: repeat(3, minmax(0, 1fr)); border-right: 0; border-bottom: 1px solid var(--line); }
}`,
      ),
      createFile(
        'script.js',
        'js',
        'Small interaction polish for CTA and nav state.',
        String.raw`document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href')
    if (!href || href === '#') return
    const target = document.querySelector(href)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})`,
      ),
      createFile(
        'README.md',
        'md',
        'Quick start and editing notes.',
        String.raw`# AI Workspace Launch Landing System

This is a premium HTML, CSS, and JS landing page starter for AI SaaS launches.

## Included files

- \`index.html\`
- \`styles.css\`
- \`script.js\`

## Edit quickly

1. Replace the product name in \`index.html\`
2. Update metrics, logos, and quotes with your own proof
3. Change section copy without touching layout classes
4. Adjust colors in \`styles.css\` under \`:root\`
`,
      ),
    ],
    featured: true,
    updatedAt: UPDATED_AT,
  },
  {
    title: 'Aether Dashboard',
    summary: 'A premium dark analytics dashboard kit with sidebar nav, KPI headers, chart panels, pipeline rows, and operator-friendly density.',
    description:
      'This starter dashboard is designed to feel like a real product surface instead of a generic admin kit. It gives teams a usable analytics and operations frame with strong grouping, dense but readable cards, and calm hierarchy.',
    category: 'dashboard',
    platform: 'web',
    framework: 'next-tailwind',
    industry: 'Operations analytics',
    style: 'Dark operations dashboard with disciplined density',
    audience: 'SaaS product teams and internal tools builders',
    tags: ['dashboard ui', 'analytics dashboard', 'admin template', 'saas dashboard'],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    prompt:
      'Design a premium analytics dashboard for operators. Include a compact sidebar, KPI row, trend chart, pipeline status, insight feed, and recent actions. Keep density high but readable, with premium spacing and zero template clutter.',
    sections: ['Sidebar', 'KPI header', 'Trend panel', 'Pipeline board', 'Insight feed', 'Team activity'],
    layoutNotes: [
      'High-frequency metrics stay in a short KPI header instead of being buried deep in the screen.',
      'The center column prioritizes trend reading while the side rail surfaces actions and risks.',
      'The layout is intentionally dense, but every block keeps a single responsibility.',
    ],
    responsiveNotes: [
      'The dashboard collapses into stacked modules for tablet and mobile review states.',
      'The left navigation becomes a top utility bar on narrow breakpoints.',
      'Wide tables convert into card lists so the dashboard still scans cleanly on smaller screens.',
    ],
    bestFor: ['Internal dashboards', 'SaaS analytics', 'Ops command centers'],
    files: [
      createFile(
        'index.html',
        'html',
        'Main dashboard markup.',
        String.raw`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signal Deck</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><span class="brand-dot"></span><strong>Signal Deck</strong></div>
        <nav class="menu">
          <a class="active" href="#">Overview</a><a href="#">Pipeline</a><a href="#">Revenue</a><a href="#">Customers</a><a href="#">Alerts</a><a href="#">Settings</a>
        </nav>
        <div class="sidebar-card"><p class="meta">Today</p><h3>5 risks require review</h3><p>Two expansion deals slipped, and three onboarding accounts are blocked.</p></div>
      </aside>
      <main class="dashboard">
        <header class="dashboard-head">
          <div><p class="eyebrow">Performance command center</p><h1>See revenue, pipeline, and delivery risk in one operating view.</h1></div>
          <div class="head-actions"><button>Share report</button><button class="accent">Create snapshot</button></div>
        </header>
        <section class="kpi-grid">
          <article class="panel"><p class="meta">Net revenue</p><strong>$482K</strong><span>+14% vs last month</span></article>
          <article class="panel"><p class="meta">Qualified pipeline</p><strong>$1.26M</strong><span>8 deals in proposal stage</span></article>
          <article class="panel"><p class="meta">Onboarding health</p><strong>92%</strong><span>2 accounts need intervention</span></article>
          <article class="panel"><p class="meta">Expansion rate</p><strong>28%</strong><span>3 renewals close this week</span></article>
        </section>
        <section class="main-grid">
          <div class="panel chart-panel">
            <div class="panel-head"><div><p class="meta">Revenue trend</p><h2>Quarterly velocity</h2></div><span class="pill">Updated 6m ago</span></div>
            <div class="chart"><span style="height: 38%"></span><span style="height: 56%"></span><span style="height: 48%"></span><span style="height: 72%"></span><span style="height: 88%"></span><span style="height: 76%"></span><span style="height: 96%"></span></div>
          </div>
          <div class="panel side-feed">
            <div class="panel-head"><div><p class="meta">Insight feed</p><h2>Actionable signals</h2></div></div>
            <div class="feed-item"><strong>Enterprise deal momentum improved</strong><p>Proposal response speed is up 19% after simplifying the pricing review step.</p></div>
            <div class="feed-item"><strong>Three accounts at risk</strong><p>Usage dipped below the success threshold after week two onboarding.</p></div>
            <div class="feed-item"><strong>Expansion window open</strong><p>Teams with workflow automation enabled upgrade 2.1x faster.</p></div>
          </div>
        </section>
        <section class="lower-grid">
          <div class="panel">
            <div class="panel-head"><div><p class="meta">Pipeline board</p><h2>What moves this week</h2></div></div>
            <div class="table">
              <div class="row row-head"><span>Account</span><span>Stage</span><span>Owner</span><span>Value</span></div>
              <div class="row"><span>Northstar AI</span><span>Security review</span><span>Imani</span><span>$86K</span></div>
              <div class="row"><span>Atlas Health</span><span>Proposal</span><span>Jon</span><span>$64K</span></div>
              <div class="row"><span>Frame Systems</span><span>Expansion</span><span>Lina</span><span>$42K</span></div>
              <div class="row"><span>River Labs</span><span>Onboarding</span><span>Arun</span><span>$18K</span></div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-head"><div><p class="meta">Team activity</p><h2>Recent updates</h2></div></div>
            <div class="activity-list">
              <div class="activity-item"><span class="dot"></span><p>Growth ops published a refreshed Q2 board for leadership review.</p></div>
              <div class="activity-item"><span class="dot"></span><p>Support flagged a setup blocker across three new enterprise accounts.</p></div>
              <div class="activity-item"><span class="dot"></span><p>Revenue team approved revised pricing notes for the Atlas Health proposal.</p></div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <script src="script.js"></script>
  </body>
</html>`,
        true
      ),
      createFile(
        'styles.css',
        'css',
        'Dashboard styles and responsive behavior.',
        String.raw`:root {
  color-scheme: dark;
  --bg: #09111f;
  --panel: #101a2c;
  --panel-soft: #0d1627;
  --line: rgba(255,255,255,0.08);
  --text: #eff4ff;
  --muted: #8fa0bf;
  --accent: #90b4ff;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif; background: linear-gradient(180deg, #0a1020 0%, var(--bg) 100%); color: var(--text); }
button, a { font: inherit; color: inherit; }
.app-shell { min-height: 100vh; display: grid; grid-template-columns: 260px 1fr; }
.sidebar { border-right: 1px solid var(--line); padding: 26px 20px; background: rgba(5, 10, 18, 0.5); }
.brand, .menu, .sidebar-card, .dashboard { display: grid; gap: 14px; }
.brand { grid-auto-flow: column; justify-content: start; align-items: center; font-size: 1.05rem; }
.brand-dot { width: 12px; height: 12px; border-radius: 999px; background: var(--accent); box-shadow: 0 0 0 6px rgba(144,180,255,0.12); }
.menu { margin-top: 14px; }
.menu a { padding: 12px 14px; border-radius: 14px; color: var(--muted); text-decoration: none; }
.menu a.active, .menu a:hover { background: rgba(255,255,255,0.05); color: var(--text); }
.sidebar-card, .panel { border: 1px solid var(--line); border-radius: 22px; background: var(--panel); }
.sidebar-card { margin-top: 20px; padding: 18px; color: var(--muted); line-height: 1.7; }
.sidebar-card h3 { margin: 8px 0 10px; color: var(--text); line-height: 1.25; }
.dashboard { padding: 26px; align-content: start; }
.dashboard-head, .main-grid, .lower-grid, .kpi-grid { display: grid; gap: 18px; }
.dashboard-head { grid-template-columns: 1fr auto; align-items: end; }
.eyebrow, .meta { color: var(--accent); text-transform: uppercase; letter-spacing: 0.16em; font-size: 12px; font-weight: 700; }
h1, h2, h3, p, strong { margin: 0; }
h1 { font-size: clamp(2rem, 3vw, 3.6rem); line-height: 1.04; letter-spacing: -0.04em; max-width: 13ch; }
h2 { font-size: 1.1rem; }
.head-actions { display: flex; gap: 10px; }
.head-actions button { min-height: 44px; padding: 0 16px; border: 1px solid var(--line); border-radius: 14px; background: transparent; }
.head-actions .accent { background: #eef4ff; color: #09111f; }
.kpi-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.panel { padding: 18px; }
.panel strong { display: block; font-size: 1.9rem; margin: 10px 0 6px; letter-spacing: -0.03em; }
.panel span, .feed-item p, .activity-item p { color: var(--muted); line-height: 1.7; }
.main-grid { grid-template-columns: 1.2fr 0.8fr; }
.panel-head { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
.pill { border: 1px solid var(--line); border-radius: 999px; padding: 8px 12px; color: var(--muted); font-size: 12px; }
.chart { display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; align-items: end; height: 280px; margin-top: 20px; }
.chart span { display: block; border-radius: 16px 16px 8px 8px; background: linear-gradient(180deg, #9eb6ff, #4d74f7); }
.feed-item, .activity-item { padding: 14px 0; border-top: 1px solid var(--line); }
.feed-item:first-of-type, .activity-item:first-of-type { border-top: 0; padding-top: 0; }
.lower-grid { grid-template-columns: 1.08fr 0.92fr; }
.table { margin-top: 18px; display: grid; gap: 8px; }
.row { display: grid; grid-template-columns: 1.2fr 1fr 0.8fr 0.7fr; gap: 12px; padding: 12px 14px; border-radius: 16px; background: var(--panel-soft); color: var(--muted); }
.row-head { background: transparent; padding: 0 4px 8px; color: #a9b8d5; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
.activity-list { margin-top: 18px; display: grid; gap: 14px; }
.activity-item { display: grid; grid-template-columns: 16px 1fr; gap: 12px; }
.dot { margin-top: 8px; width: 8px; height: 8px; border-radius: 999px; background: var(--accent); box-shadow: 0 0 0 6px rgba(144,180,255,0.12); }
@media (max-width: 1100px) {
  .app-shell, .dashboard-head, .main-grid, .lower-grid { grid-template-columns: 1fr; }
  .sidebar { border-right: 0; border-bottom: 1px solid var(--line); }
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 680px) {
  .dashboard { padding: 18px; }
  .kpi-grid { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; }
}`,
      ),
      createFile(
        'script.js',
        'js',
        'Small dashboard interaction.',
        String.raw`document.querySelectorAll('.menu a').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault()
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'))
    item.classList.add('active')
  })
})`,
      ),
      createFile(
        'README.md',
        'md',
        'Quick start and editing notes.',
        String.raw`# Signal Deck Analytics Command Center

This template is a premium dashboard starter built with plain HTML, CSS, and JS.

## Included files

- \`index.html\`
- \`styles.css\`
- \`script.js\`

## Customize

1. Swap KPI values and labels in \`index.html\`
2. Change navigation items for your product modules
3. Replace trend bars or pipeline rows with your own charts and data
4. Adjust colors and density in \`styles.css\`
`,
      ),
    ],
    featured: true,
    updatedAt: UPDATED_AT,
  },
  {
    title: 'Identity Auth Kit',
    summary: 'A polished auth and waitlist screen with trust messaging, sign-in form, invite request state, and premium split-screen framing.',
    description:
      'This auth starter is built for products that want a clean login experience and a separate request-access flow. It feels intentional, premium, and product-led instead of generic.',
    category: 'auth',
    platform: 'responsive',
    framework: 'react-tailwind',
    industry: 'Membership products',
    style: 'Clean split-screen auth with gated-access flow',
    audience: 'founders launching private beta products',
    tags: ['auth template', 'login page', 'private beta', 'waitlist ui'],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    prompt:
      'Design a premium split-screen auth page for a private beta product. Include a clean sign-in form, invite request state, trust copy, and a product-side panel that feels calm and exclusive without overdesign.',
    sections: ['Brand panel', 'Sign in form', 'Invite request tab', 'Trust messages', 'Feature bullets'],
    layoutNotes: [
      'The form stays central, while the brand panel gives context and aspiration without distracting from the task.',
      'Tabs make it clear that returning members and new prospects have different paths.',
      'The product panel uses a few strong proof points instead of a noisy visual collage.',
    ],
    responsiveNotes: [
      'The split screen collapses into a single column while keeping the form first.',
      'Secondary proof content moves below the primary action on small screens.',
      'Tabs and form fields remain large enough for touch-first interaction.',
    ],
    bestFor: ['Private beta launches', 'Premium login pages', 'Invite-only products'],
    files: [
      createFile(
        'index.html',
        'html',
        'Main auth page markup.',
        String.raw`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nova Key</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main class="auth-shell">
      <section class="brand-panel">
        <div class="brand-lockup"><span class="brand-badge"></span><strong>Nova Key</strong></div>
        <p class="eyebrow">Private beta access</p>
        <h1>Access the workspace built for discreet launches and high-trust collaboration.</h1>
        <p class="brand-copy">Nova Key is opening carefully. Members use it to share plans, assets, and approvals without turning product work into chaos.</p>
        <div class="feature-stack">
          <div class="feature-card"><h3>Secure workrooms</h3><p>Keep launch materials, design reviews, and stakeholder approvals in a single protected room.</p></div>
          <div class="feature-card"><h3>Invite-first growth</h3><p>Control access by invite code while still capturing serious interest from the waitlist.</p></div>
        </div>
      </section>
      <section class="form-panel">
        <div class="switcher">
          <button class="tab active" data-panel="signin">Member sign in</button>
          <button class="tab" data-panel="invite">Request invite</button>
        </div>
        <div class="panel active" id="signin">
          <p class="eyebrow">Welcome back</p>
          <h2>Continue to your private workspace.</h2>
          <form class="stack">
            <label><span>Email</span><input type="email" placeholder="founder@company.com" /></label>
            <label><span>Password</span><input type="password" placeholder="Enter password" /></label>
            <button type="button" class="btn btn-primary">Sign in</button>
          </form>
          <div class="trust-row"><span>Encrypted session</span><span>Invite-only workspaces</span><span>Priority support</span></div>
        </div>
        <div class="panel" id="invite">
          <p class="eyebrow">Request access</p>
          <h2>Tell us what you are building.</h2>
          <form class="stack">
            <label><span>Name</span><input type="text" placeholder="Your full name" /></label>
            <label><span>Work email</span><input type="email" placeholder="team@company.com" /></label>
            <label><span>Why do you want access?</span><textarea rows="4" placeholder="We are preparing a private launch and need a cleaner approval workspace."></textarea></label>
            <button type="button" class="btn btn-primary">Join the waitlist</button>
          </form>
          <p class="note">Most qualified requests receive a response within 48 hours.</p>
        </div>
      </section>
    </main>
    <script src="script.js"></script>
  </body>
</html>`,
        true
      ),
      createFile(
        'styles.css',
        'css',
        'Auth template styling and responsive behavior.',
        String.raw`:root {
  --bg: #f4f1eb;
  --panel: #ffffff;
  --ink: #121520;
  --muted: #5f687d;
  --line: rgba(18,21,32,0.1);
  --accent: #111827;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif; background: var(--bg); color: var(--ink); }
h1, h2, h3, p { margin: 0; }
.auth-shell { min-height: 100vh; display: grid; grid-template-columns: 1.05fr 0.95fr; }
.brand-panel, .form-panel { padding: 42px; display: grid; align-content: start; gap: 22px; }
.brand-panel { background: #161d2d; color: #f7f5f1; }
.brand-lockup { display: inline-flex; align-items: center; gap: 12px; font-weight: 700; }
.brand-badge { width: 14px; height: 14px; border-radius: 999px; background: linear-gradient(135deg, #e8d2ac, #f6f2e8); box-shadow: 0 0 0 6px rgba(255,255,255,0.08); }
.eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #9fa8bc; }
.brand-panel h1 { font-size: clamp(2.3rem, 4.4vw, 4rem); line-height: 1.02; letter-spacing: -0.04em; max-width: 11ch; }
.brand-copy { max-width: 56ch; color: #bcc5d6; line-height: 1.75; }
.feature-stack { display: grid; gap: 14px; margin-top: 12px; }
.feature-card { border: 1px solid rgba(255,255,255,0.12); border-radius: 22px; padding: 20px; background: rgba(255,255,255,0.04); }
.feature-card h3 { margin-bottom: 8px; }
.feature-card p { color: #bcc5d6; line-height: 1.7; }
.form-panel { justify-content: center; background: var(--panel); }
.switcher { display: inline-grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; padding: 8px; border-radius: 18px; background: #f3efe7; max-width: 420px; }
.tab { min-height: 46px; border: 0; border-radius: 14px; background: transparent; font-weight: 700; color: var(--muted); }
.tab.active { background: #fff; color: var(--ink); box-shadow: 0 6px 20px rgba(18,21,32,0.08); }
.panel { display: none; max-width: 440px; }
.panel.active { display: grid; gap: 18px; }
.form-panel h2 { font-size: clamp(2rem, 3.2vw, 2.8rem); line-height: 1.05; letter-spacing: -0.04em; max-width: 12ch; }
.stack { display: grid; gap: 14px; }
label { display: grid; gap: 8px; font-size: 14px; font-weight: 600; }
input, textarea { width: 100%; border: 1px solid var(--line); border-radius: 16px; padding: 14px 16px; font: inherit; background: #fbfaf7; color: var(--ink); }
textarea { resize: vertical; }
.btn { min-height: 50px; border: 0; border-radius: 16px; font-weight: 700; }
.btn-primary { background: var(--accent); color: #fff; }
.trust-row, .note { color: var(--muted); font-size: 14px; line-height: 1.7; }
.trust-row { display: flex; flex-wrap: wrap; gap: 10px 18px; }
@media (max-width: 980px) { .auth-shell { grid-template-columns: 1fr; } .brand-panel, .form-panel { padding: 24px 20px; } }
@media (max-width: 560px) { .switcher { width: 100%; max-width: none; } }`,
      ),
      createFile(
        'script.js',
        'js',
        'Tab switch behavior between sign-in and invite panels.',
        String.raw`const tabs = document.querySelectorAll('.tab')
const panels = document.querySelectorAll('.panel')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-panel')
    tabs.forEach(item => item.classList.remove('active'))
    panels.forEach(panel => panel.classList.remove('active'))
    tab.classList.add('active')
    const panel = document.getElementById(target)
    if (panel) panel.classList.add('active')
  })
})`,
      ),
      createFile(
        'README.md',
        'md',
        'Quick start and editing notes.',
        String.raw`# Private Beta Auth Suite for Premium Products

This template provides a polished auth page with two flows:

- Member sign in
- Invite request / waitlist

## Included files

- \`index.html\`
- \`styles.css\`
- \`script.js\`

## Customize

1. Replace the product name and headline
2. Update the trust bullets and feature cards
3. Connect form actions to your own auth or waitlist backend
4. Adjust colors in \`styles.css\` to match your brand
`,
      ),
    ],
    featured: true,
    updatedAt: UPDATED_AT,
  },
]

export const BASE_TEMPLATES = TEMPLATE_SEEDS.map(createTemplate)



