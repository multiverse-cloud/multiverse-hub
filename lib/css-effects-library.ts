import { cssEffects, categories as rawCategories, type CSSEffect } from '@/lib/css-effects-data'
import { sourceUiComponents, type UiCatalogItem } from '@/lib/ui-source-components'
import importedUiStore from '@/data/ui-imported-store.json'
import hyperuiStore from '@/data/hyperui-components.json'
import { slugify } from '@/lib/utils'

export type { UiCatalogItem } from '@/lib/ui-source-components'

const CATEGORY_PRIORITY = [
  'button',
  'form',
  'card',
  'navbar',
  'hero',
  'feature',
  'dashboard',
  'ecommerce',
  'auth',
  'table',
  'search',
  'filter',
  'pricing',
  'footer',
  'faq',
  'cta',
  'stats',
  'testimonial',
  'checkbox',
  'radio',
  'shadow',
  'background',
  'hover',
  'shape',
] as const

const CATEGORY_PRIORITY_INDEX = new Map<string, number>(CATEGORY_PRIORITY.map((category, index) => [category, index]))
const importedUiEffects = (Array.isArray(importedUiStore.items) ? importedUiStore.items : []) as UiCatalogItem[]
const hyperuiEffects = (Array.isArray(hyperuiStore.items) ? hyperuiStore.items : []) as UiCatalogItem[]
const TARGET_TOTAL_ITEMS = 500
const TARGET_GENERATED_COUNT = Math.max(
  0,
  TARGET_TOTAL_ITEMS - sourceUiComponents.length - importedUiEffects.length - hyperuiEffects.length
)

export const generatedUiEffects = [...cssEffects]
  .sort((left, right) => {
    const leftPriority = CATEGORY_PRIORITY_INDEX.get(left.category) ?? CATEGORY_PRIORITY.length
    const rightPriority = CATEGORY_PRIORITY_INDEX.get(right.category) ?? CATEGORY_PRIORITY.length
    return leftPriority - rightPriority || left.title.localeCompare(right.title)
  })
  .slice(0, TARGET_GENERATED_COUNT)

export const uiEffects: UiCatalogItem[] = [...sourceUiComponents, ...hyperuiEffects, ...importedUiEffects, ...generatedUiEffects]

export type LibraryCategory = {
  id: string
  label: string
  count: number
}

export type UiSectionId = 'all' | 'components' | 'foundations'

export type UiSection = {
  id: UiSectionId
  label: string
  count: number
  description: string
}

export type UiCollection = LibraryCategory & {
  sectionId: Exclude<UiSectionId, 'all'>
}

const SECTION_LABELS: Record<Exclude<UiSectionId, 'all'>, string> = {
  components: 'Components',
  foundations: 'Foundations',
}

const CATEGORY_SECTION_MAP: Record<string, Exclude<UiSectionId, 'all'>> = {
  button: 'components',
  checkbox: 'components',
  radio: 'components',
  input: 'components',
  toggle: 'components',
  tooltip: 'components',
  notification: 'components',
  modal: 'components',
  avatar: 'components',
  form: 'components',
  slider: 'components',
  accordion: 'components',
  progress: 'components',
  menu: 'components',
  navbar: 'components',
  hero: 'components',
  feature: 'components',
  testimonial: 'components',
  gallery: 'components',
  pricing: 'components',
  faq: 'components',
  cta: 'components',
  stats: 'components',
  footer: 'components',
  timeline: 'components',
  social: 'components',
  data: 'components',
  auth: 'components',
  dashboard: 'components',
  sidebar: 'components',
  table: 'components',
  search: 'components',
  filter: 'components',
  ecommerce: 'components',
  card: 'components',
  layout: 'components',
  badge: 'components',
  accordions: 'components',
  alerts: 'components',
  announcements: 'components',
  banners: 'components',
  breadcrumbs: 'components',
  'blog-cards': 'components',
  'button-groups': 'components',
  buttons: 'components',
  cards: 'components',
  carts: 'components',
  checkboxes: 'components',
  'contact-forms': 'components',
  ctas: 'components',
  'details-list': 'components',
  dividers: 'components',
  dropdown: 'components',
  'empty-content': 'components',
  'empty-states': 'components',
  faqs: 'components',
  'feature-grids': 'components',
  'file-uploaders': 'components',
  filters: 'components',
  footers: 'components',
  grids: 'components',
  headers: 'components',
  inputs: 'components',
  'logo-clouds': 'components',
  loaders: 'components',
  media: 'components',
  modals: 'components',
  'newsletter-signup': 'components',
  pagination: 'components',
  polls: 'components',
  'product-cards': 'components',
  'product-collections': 'components',
  'progress-bars': 'components',
  'quantity-inputs': 'components',
  'radio-groups': 'components',
  'range-inputs': 'components',
  sections: 'components',
  selects: 'components',
  'side-menu': 'components',
  'skip-links': 'components',
  steps: 'components',
  tables: 'components',
  tabs: 'components',
  'team-sections': 'components',
  textareas: 'components',
  timelines: 'components',
  toasts: 'components',
  toggles: 'components',
  'vertical-menu': 'components',
  text: 'foundations',
  loading: 'foundations',
  background: 'foundations',
  hover: 'foundations',
  border: 'foundations',
  shadow: 'foundations',
  shape: 'foundations',
  transition: 'foundations',
  scroll: 'foundations',
  decoration: 'foundations',
  print: 'foundations',
  color: 'foundations',
  motion: 'foundations',
  container: 'foundations',
  svg: 'foundations',
  typography: 'foundations',
  houdini: 'foundations',
  weather: 'foundations',
  game: 'foundations',
  easter: 'foundations',
  'source-button': 'components',
  'source-input': 'components',
  'source-textarea': 'components',
  'source-badge': 'components',
  'source-alert': 'components',
  'source-breadcrumb': 'components',
  'source-card': 'components',
  'source-accordion': 'components',
  'source-dialog': 'components',
  'source-dropdown': 'components',
  'source-select': 'components',
  'source-switch': 'components',
  'source-table': 'components',
  'source-tabs': 'components',
  'source-tooltip': 'components',
  'source-separator': 'components',
  'source-skeleton': 'components',
}

const CATEGORY_LABEL_OVERRIDES: Record<string, string> = {
  button: 'Buttons',
  notification: 'Badges',
  badge: 'Badges',
  accordions: 'Accordions',
  alerts: 'Alerts',
  announcements: 'Announcements',
  banners: 'Banners',
  breadcrumbs: 'Breadcrumbs',
  'blog-cards': 'Blog Cards',
  'button-groups': 'Button Groups',
  buttons: 'Buttons',
  cards: 'Cards',
  carts: 'Carts',
  checkboxes: 'Checkboxes',
  'contact-forms': 'Contact Forms',
  ctas: 'CTA Sections',
  'details-list': 'Details Lists',
  dividers: 'Dividers',
  dropdown: 'Dropdowns',
  'empty-content': 'Empty Content',
  'empty-states': 'Empty States',
  faqs: 'FAQs',
  'feature-grids': 'Feature Grids',
  'file-uploaders': 'File Uploaders',
  filters: 'Filters',
  footers: 'Footers',
  grids: 'Grids',
  headers: 'Headers',
  inputs: 'Inputs',
  'logo-clouds': 'Logo Clouds',
  loaders: 'Loaders',
  media: 'Media',
  modals: 'Modals',
  'newsletter-signup': 'Newsletter Signup',
  pagination: 'Pagination',
  polls: 'Polls',
  'product-cards': 'Product Cards',
  'product-collections': 'Product Collections',
  'progress-bars': 'Progress Bars',
  'quantity-inputs': 'Quantity Inputs',
  'radio-groups': 'Radio Groups',
  'range-inputs': 'Range Inputs',
  sections: 'Sections',
  selects: 'Selects',
  'side-menu': 'Side Menu',
  'skip-links': 'Skip Links',
  steps: 'Steps',
  tables: 'Tables',
  tabs: 'Tabs',
  'team-sections': 'Team Sections',
  textareas: 'Textareas',
  timelines: 'Timelines',
  toasts: 'Toasts',
  toggles: 'Toggles',
  'vertical-menu': 'Vertical Menu',
  checkbox: 'Checkboxes',
  radio: 'Radios',
  toggle: 'Checkboxes & Toggles',
  pricing: 'Pricing & Tags',
  data: 'Charts & Data',
  menu: 'Navigation',
  navbar: 'Navbars',
  hero: 'Hero Sections',
  feature: 'Feature Sections',
  testimonial: 'Testimonials',
  card: 'Cards',
  faq: 'FAQ Sections',
  cta: 'CTA Sections',
  stats: 'Stats Blocks',
  footer: 'Footers',
  shadow: 'Shadows',
  shape: 'Shapes',
  color: 'Color Systems',
  print: 'Typography & Print',
  hover: 'Hover States',
  layout: 'Layouts',
  auth: 'Auth UI',
  modal: 'Modals & Dialogs',
  dashboard: 'Dashboards',
  sidebar: 'Sidebars',
  table: 'Tables',
  search: 'Search UI',
  filter: 'Filter UI',
  ecommerce: 'Commerce UI',
  'source-button': 'Button Component',
  'source-input': 'Input Component',
  'source-textarea': 'Textarea Component',
  'source-badge': 'Badge Component',
  'source-alert': 'Alert Component',
  'source-breadcrumb': 'Breadcrumb Component',
  'source-card': 'Card Component',
  'source-accordion': 'Accordion Component',
  'source-dialog': 'Dialog Component',
  'source-dropdown': 'Dropdown Menu Component',
  'source-select': 'Select Component',
  'source-switch': 'Switch Component',
  'source-table': 'Table Component',
  'source-tabs': 'Tabs Component',
  'source-tooltip': 'Tooltip Component',
  'source-separator': 'Separator Component',
  'source-skeleton': 'Skeleton Component',
}

export function getEffectSlug(effect: UiCatalogItem): string {
  return slugify(effect.id || effect.title)
}

export function getEffectBySlug(slug: string): UiCatalogItem | null {
  return uiEffects.find(effect => getEffectSlug(effect) === slug) || null
}

function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function getSafeCategories(): LibraryCategory[] {
  const categoryCounts = new Map<string, number>()
  for (const effect of uiEffects) {
    categoryCounts.set(effect.category, (categoryCounts.get(effect.category) || 0) + 1)
  }

  return [
    { id: 'all', label: 'All effects', count: uiEffects.length },
    ...Array.from(categoryCounts.keys())
      .map(categoryId => ({
        id: categoryId,
        label: getUiCollectionLabel(categoryId),
        count: categoryCounts.get(categoryId) || 0,
      }))
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label)),
  ]
}

export function getUiSectionIdForCategory(category: string): Exclude<UiSectionId, 'all'> {
  return CATEGORY_SECTION_MAP[category] || 'foundations'
}

export function getUiSectionLabel(sectionId: Exclude<UiSectionId, 'all'>): string {
  return SECTION_LABELS[sectionId]
}

export function getUiCollectionLabel(category: string): string {
  const fromRaw = rawCategories.find(item => item.id === category)?.label || category
  return CATEGORY_LABEL_OVERRIDES[category] || (fromRaw === category ? formatCategoryLabel(category) : fromRaw)
}

export function getUiSections(): UiSection[] {
  const counts = {
    components: 0,
    foundations: 0,
  } as Record<Exclude<UiSectionId, 'all'>, number>

  for (const effect of uiEffects) {
    counts[getUiSectionIdForCategory(effect.category)] += 1
  }

  return [
    {
      id: 'all',
      label: 'All UI',
      count: uiEffects.length,
      description: 'Everything in the UI library',
    },
    {
      id: 'components',
      label: 'Components',
      count: counts.components,
      description: 'Buttons, layouts, auth flows, commerce UI, dashboards, and reusable pieces',
    },
    {
      id: 'foundations',
      label: 'Foundations',
      count: counts.foundations,
      description: 'Text styles, shadows, shapes, motion, and visual systems',
    },
  ]
}

export function getUiCollections(sectionId: UiSectionId = 'all'): UiCollection[] {
  const categoryCounts = new Map<string, number>()
  for (const effect of uiEffects) {
    categoryCounts.set(effect.category, (categoryCounts.get(effect.category) || 0) + 1)
  }

  return Array.from(categoryCounts.keys())
    .map(categoryId => ({
      id: categoryId,
      label: getUiCollectionLabel(categoryId),
      count: categoryCounts.get(categoryId) || 0,
      sectionId: getUiSectionIdForCategory(categoryId),
    }))
    .filter(collection => sectionId === 'all' || collection.sectionId === sectionId)
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
}

export function getUiCollectionMeta(category: string) {
  const sectionId = getUiSectionIdForCategory(category)
  return {
    id: category,
    label: getUiCollectionLabel(category),
    sectionId,
    sectionLabel: getUiSectionLabel(sectionId),
  }
}

function injectPreviewGuards(markup: string) {
  const headGuard = `
    <base target="_self" />
    <style>
      html, body { overscroll-behavior: none; }
    </style>`

  const bodyGuard = `
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
    .replace('</body>', `${bodyGuard}</body>`)
}

export function buildPreviewDoc(effect: UiCatalogItem) {
  if (effect.previewDocument) {
    return injectPreviewGuards(effect.previewDocument)
  }

  const isCompactControl = ['checkbox', 'radio', 'shape'].includes(effect.category)
  const isShadowTile = effect.category === 'shadow'
  const isWideLayout = [
    'navbar',
    'hero',
    'feature',
    'testimonial',
    'pricing',
    'faq',
    'cta',
    'stats',
    'footer',
    'card',
    'form',
    'auth',
    'dashboard',
    'sidebar',
    'table',
    'search',
    'filter',
    'ecommerce',
  ].includes(effect.category)

  return injectPreviewGuards(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; }
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: ${isWideLayout ? '12px' : isShadowTile ? '22px' : '18px'};
        overflow: hidden;
        background: #ffffff;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .preview-root {
        max-width: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(${isWideLayout ? '.84' : isShadowTile ? '.9' : isCompactControl ? '.92' : '.88'});
        transform-origin: center center;
      }
      ${effect.cssCode}
    </style>
  </head>
  <body>
    <div class="preview-root">${effect.htmlCode}</div>
  </body>
</html>`)
}

function getComponentName(effect: UiCatalogItem): string {
  const base = slugify(effect.title)
    .split('-')
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')

  return base || 'CssEffectDemo'
}

export function buildReactSnippet(effect: UiCatalogItem): string {
  if ('kind' in effect && effect.kind === 'source' && effect.reactCode) {
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
  if ('kind' in effect && effect.kind === 'source') {
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
  if ('kind' in effect && effect.kind === 'source') {
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
