import 'server-only'

import { promises as fs } from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'

export type CareerCategoryId =
  | 'software-engineering'
  | 'academic-research'
  | 'executive'
  | 'minimal'
  | 'creative'

export type CareerTemplateEntry = {
  id: string
  slug: string
  title: string
  seoTitle: string
  metaDescription: string
  summary: string
  description: string
  category: CareerCategoryId
  categoryTitle: string
  theme: string
  audience: string
  focus: string
  tags: string[]
  bestFor: string[]
  sections: string[]
  highlights: string[]
  atsNotes: string[]
  previewImage: string
  sourceYamlFile: string
  updatedAt: string
  featured?: boolean
}

export type CareerTemplateDetail = CareerTemplateEntry & {
  yamlContent: string
  downloadFileName: string
}

export type CareerCategoryDefinition = {
  id: CareerCategoryId
  title: string
  description: string
}

type CareerTemplateSeed = Omit<
  CareerTemplateEntry,
  'id' | 'slug' | 'seoTitle' | 'metaDescription' | 'categoryTitle'
>

const UPDATED_AT = '2026-04-26'
const EXAMPLES_DIR = path.join(process.cwd(), 'data', 'career-rendercv')

const CATEGORY_DEFS: CareerCategoryDefinition[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description: 'Resume templates for developers, platform engineers, and technical IC roles.',
  },
  {
    id: 'academic-research',
    title: 'Academic & Research',
    description: 'Long-form CV layouts for research, higher education, and scholarly work.',
  },
  {
    id: 'executive',
    title: 'Executive',
    description: 'Leadership-first resume templates for senior operators, founders, and managers.',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Quiet, ATS-friendly one-page resume templates with cleaner density.',
  },
  {
    id: 'creative',
    title: 'Creative Professional',
    description: 'Sharper presentation styles for product, design, and modern portfolio-driven careers.',
  },
]

const CATEGORY_META = Object.fromEntries(
  CATEGORY_DEFS.map(category => [category.id, category])
) as Record<CareerCategoryId, CareerCategoryDefinition>

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function createCareerTemplate(seed: CareerTemplateSeed): CareerTemplateEntry {
  const slug = slugify(seed.title)

  return {
    ...seed,
    id: `career-${slug}`,
    slug,
    seoTitle: `${seed.title} - Free ATS-Friendly Resume Template | Multiverse Career Universe`,
    metaDescription: seed.summary,
    categoryTitle: CATEGORY_META[seed.category].title,
  }
}

const TEMPLATE_SEEDS: CareerTemplateSeed[] = [
  {
    title: 'Classic Resume Template',
    summary: 'A polished general-purpose resume template with strong hierarchy, ATS-friendly spacing, and safer one-page structure.',
    description:
      'The Classic theme is the safest starting point for most professionals who want a clean resume format with readable sections, balanced white space, and strong export quality.',
    category: 'software-engineering',
    theme: 'Classic',
    audience: 'developers, operators, and general professionals',
    focus: 'balanced one-page resume for general applications',
    tags: ['resume template', 'ats resume', 'software engineer resume', 'professional cv'],
    bestFor: ['software engineers', 'product roles', 'operations', 'general applications'],
    sections: ['Summary', 'Experience', 'Education', 'Projects', 'Skills'],
    highlights: [
      'Reliable ATS-friendly structure',
      'Strong section rhythm for one-page resumes',
      'Works well for technical and non-technical roles',
    ],
    atsNotes: [
      'Uses a predictable top-to-bottom reading order.',
      'Keeps headings, dates, and bullet content machine-readable.',
      'Avoids decorative layout tricks that often break parsers.',
    ],
    previewImage: '/career/rendercv/classic.png',
    sourceYamlFile: 'John_Doe_ClassicTheme_CV.yaml',
    updatedAt: UPDATED_AT,
    featured: true,
  },
  {
    title: 'Engineering Resumes Template',
    summary: 'A technical resume template tuned for software engineering roles with stronger density and cleaner project emphasis.',
    description:
      'Engineering Resumes is built for technical candidates who need projects, impact metrics, systems work, and stack details to scan quickly without feeling cramped.',
    category: 'software-engineering',
    theme: 'Engineering Resumes',
    audience: 'backend, frontend, full-stack, and platform engineers',
    focus: 'technical hiring loops and engineering applications',
    tags: ['engineering resume', 'developer cv', 'backend resume', 'frontend resume'],
    bestFor: ['senior engineers', 'IC roles', 'platform teams', 'startup hiring'],
    sections: ['Summary', 'Experience', 'Projects', 'Skills', 'Education'],
    highlights: [
      'Great for impact-driven engineering bullets',
      'Project-heavy format without visual clutter',
      'Strong fit for technical screening workflows',
    ],
    atsNotes: [
      'Keeps technical sections explicit and readable.',
      'Supports measurable bullet points cleanly.',
      'Good fit for JD keyword coverage in experience and project sections.',
    ],
    previewImage: '/career/rendercv/engineeringresumes.png',
    sourceYamlFile: 'John_Doe_EngineeringresumesTheme_CV.yaml',
    updatedAt: UPDATED_AT,
    featured: true,
  },
  {
    title: 'Engineering Classic Resume Template',
    summary: 'A denser engineering resume layout for candidates who need a more traditional technical presentation with efficient spacing.',
    description:
      'Engineering Classic keeps the resume serious and information-first, making it useful for infrastructure, systems, embedded, and enterprise engineering roles.',
    category: 'software-engineering',
    theme: 'Engineering Classic',
    audience: 'systems engineers, enterprise engineers, and infrastructure candidates',
    focus: 'traditional engineering hiring and dense technical summaries',
    tags: ['systems engineer resume', 'infrastructure resume', 'technical cv', 'enterprise resume'],
    bestFor: ['systems engineering', 'infra roles', 'enterprise hiring', 'platform engineering'],
    sections: ['Summary', 'Experience', 'Projects', 'Education', 'Skills'],
    highlights: [
      'Traditional professional structure',
      'Dense but readable technical presentation',
      'Good for experienced engineers with many achievements',
    ],
    atsNotes: [
      'Maintains clear text ordering and heading semantics.',
      'Handles multi-role experience blocks without visual confusion.',
      'Strong for resumes with deep technical history.',
    ],
    previewImage: '/career/rendercv/engineeringclassic.png',
    sourceYamlFile: 'John_Doe_EngineeringclassicTheme_CV.yaml',
    updatedAt: UPDATED_AT,
  },
  {
    title: 'Harvard CV Template',
    summary: 'A formal academic CV layout for research, publications, honors, teaching, and scholarly applications.',
    description:
      'The Harvard theme is the right pick when the application needs publications, invited talks, honors, patents, and longer-form academic credibility.',
    category: 'academic-research',
    theme: 'Harvard',
    audience: 'researchers, PhD candidates, lecturers, and academic applicants',
    focus: 'academic CVs and research-heavy applications',
    tags: ['academic cv', 'research cv', 'phd resume', 'publication list'],
    bestFor: ['PhD applications', 'research labs', 'faculty hiring', 'academic fellowships'],
    sections: ['Education', 'Research Experience', 'Publications', 'Honors', 'Talks'],
    highlights: [
      'Excellent long-form academic structure',
      'Supports publications and honors cleanly',
      'Formal presentation without overdesign',
    ],
    atsNotes: [
      'Structured headings keep long academic content parseable.',
      'Supports publication metadata without layout hacks.',
      'Safer than visual CV layouts for institutions and grants.',
    ],
    previewImage: '/career/rendercv/harvard.png',
    sourceYamlFile: 'John_Doe_HarvardTheme_CV.yaml',
    updatedAt: UPDATED_AT,
    featured: true,
  },
  {
    title: 'SB2Nov Research Resume Template',
    summary: 'A research-oriented technical resume with cleaner scholarly presentation and practical engineering readability.',
    description:
      'SB2Nov sits between academic and engineering styles, making it useful for ML researchers, research engineers, and graduate candidates who need both rigor and clarity.',
    category: 'academic-research',
    theme: 'SB2Nov',
    audience: 'research engineers, graduate applicants, and ML candidates',
    focus: 'hybrid academic and technical applications',
    tags: ['research engineer resume', 'graduate cv', 'ml resume', 'scholarly template'],
    bestFor: ['research engineering', 'grad school', 'machine learning roles', 'applied science'],
    sections: ['Summary', 'Education', 'Experience', 'Projects', 'Publications'],
    highlights: [
      'Strong balance between academic and industry signals',
      'Great for research-heavy technical resumes',
      'Clear publication and project ordering',
    ],
    atsNotes: [
      'Readable for both ATS parsing and recruiter scans.',
      'Lets research work sit naturally beside practical engineering work.',
      'Works well when publications are important but not the whole story.',
    ],
    previewImage: '/career/rendercv/sb2nov.png',
    sourceYamlFile: 'John_Doe_Sb2novTheme_CV.yaml',
    updatedAt: UPDATED_AT,
  },
  {
    title: 'ModernCV Executive Resume Template',
    summary: 'A leadership-focused resume template for senior professionals who need a clean executive tone with modern spacing.',
    description:
      'ModernCV helps senior candidates present outcomes, team scale, scope, and leadership credibility in a way that feels sharp without becoming flashy.',
    category: 'executive',
    theme: 'ModernCV',
    audience: 'managers, founders, directors, and senior operators',
    focus: 'executive positioning and leadership storytelling',
    tags: ['executive resume', 'leadership cv', 'director resume', 'manager resume'],
    bestFor: ['senior management', 'founders', 'heads of product', 'operations leadership'],
    sections: ['Summary', 'Leadership Experience', 'Key Wins', 'Education', 'Skills'],
    highlights: [
      'Leadership-first visual hierarchy',
      'Professional but current presentation',
      'Good for senior scope and metrics',
    ],
    atsNotes: [
      'Works well for senior resumes that still need ATS readability.',
      'Preserves clear date and role ordering.',
      'Helps keep leadership bullets concise and skimmable.',
    ],
    previewImage: '/career/rendercv/moderncv.png',
    sourceYamlFile: 'John_Doe_ModerncvTheme_CV.yaml',
    updatedAt: UPDATED_AT,
    featured: true,
  },
  {
    title: 'Ink Minimal Resume Template',
    summary: 'A minimalist resume template for professionals who want a quiet, ATS-friendly presentation with strong readability.',
    description:
      'Ink is best when you want the resume to feel restrained, modern, and fast to scan, especially for product, operations, and lean one-page applications.',
    category: 'minimal',
    theme: 'Ink',
    audience: 'minimalist professionals, product candidates, and consultants',
    focus: 'clean one-page resumes with low visual noise',
    tags: ['minimal resume', 'clean cv', 'consulting resume', 'product resume'],
    bestFor: ['product roles', 'operations', 'consulting', 'one-page resumes'],
    sections: ['Summary', 'Experience', 'Projects', 'Skills', 'Education'],
    highlights: [
      'Low-noise structure with elegant spacing',
      'Very easy for recruiters to scan',
      'Clean for one-page resume workflows',
    ],
    atsNotes: [
      'Minimal layout reduces parser friction.',
      'Simple section shapes keep extraction reliable.',
      'Good default when you want safe readability over style.',
    ],
    previewImage: '/career/rendercv/ink.png',
    sourceYamlFile: 'John_Doe_InkTheme_CV.yaml',
    updatedAt: UPDATED_AT,
  },
  {
    title: 'Opal Premium Resume Template',
    summary: 'A polished premium resume template with centered header styling and cleaner designer-friendly visual balance.',
    description:
      'Opal is ideal for product designers, creative technologists, and modern professionals who want something more premium while still staying practical for real applications.',
    category: 'creative',
    theme: 'Opal',
    audience: 'designers, creative technologists, and modern product teams',
    focus: 'premium-looking resumes without breaking readability',
    tags: ['designer resume', 'creative resume', 'premium cv', 'product designer resume'],
    bestFor: ['product design', 'brand design', 'creative technology', 'portfolio-led roles'],
    sections: ['Summary', 'Experience', 'Projects', 'Skills', 'Education'],
    highlights: [
      'Premium visual tone without loud styling',
      'Centered header works well for portfolio-driven careers',
      'Still practical enough for real submissions',
    ],
    atsNotes: [
      'Keeps content text-based and structured.',
      'Better-looking than basic templates without becoming image-heavy.',
      'Good compromise between polish and parser safety.',
    ],
    previewImage: '/career/rendercv/opal.png',
    sourceYamlFile: 'John_Doe_OpalTheme_CV.yaml',
    updatedAt: UPDATED_AT,
    featured: true,
  },
  {
    title: 'Ember Premium Resume Template',
    summary: 'A stronger statement resume template for founders and senior builders who want a more distinctive premium presentation.',
    description:
      'Ember brings a little more presence while still remaining structured, making it useful for senior creators, startup operators, and candidates with standout experience.',
    category: 'creative',
    theme: 'Ember',
    audience: 'founders, startup operators, and senior creative professionals',
    focus: 'distinctive premium resumes for high-signal experience',
    tags: ['founder resume', 'startup resume', 'premium resume template', 'creative leadership cv'],
    bestFor: ['founders', 'startup leaders', 'creative direction', 'senior builder roles'],
    sections: ['Summary', 'Experience', 'Key Wins', 'Projects', 'Skills'],
    highlights: [
      'More distinctive premium feel',
      'Strong for senior or standout experience',
      'Works well when brand and clarity both matter',
    ],
    atsNotes: [
      'Still relies on structured text flow for machine reading.',
      'Good for high-signal resumes that need more personality.',
      'Avoids graphics-heavy presentation while keeping visual identity.',
    ],
    previewImage: '/career/rendercv/ember.png',
    sourceYamlFile: 'John_Doe_EmberTheme_CV.yaml',
    updatedAt: UPDATED_AT,
  },
]

const CAREER_TEMPLATES = TEMPLATE_SEEDS.map(createCareerTemplate)

const getCachedCareerTemplates = unstable_cache(
  async () => CAREER_TEMPLATES,
  ['career-templates'],
  { revalidate: 3600, tags: ['career'] }
)

async function readYamlFile(fileName: string) {
  const filePath = path.join(EXAMPLES_DIR, fileName)
  return fs.readFile(filePath, 'utf8')
}

export async function getCareerTemplates() {
  return getCachedCareerTemplates()
}

export async function getCareerTemplateBySlug(slug: string): Promise<CareerTemplateDetail | null> {
  const templates = await getCachedCareerTemplates()
  const template = templates.find(entry => entry.slug === slug)

  if (!template) {
    return null
  }

  const yamlContent = await readYamlFile(template.sourceYamlFile)

  return {
    ...template,
    yamlContent,
    downloadFileName: template.sourceYamlFile,
  }
}

export async function getCareerRelatedTemplates(slug: string, limit = 3) {
  const templates = await getCachedCareerTemplates()
  const current = templates.find(entry => entry.slug === slug)
  if (!current) return []

  const related = templates
    .filter(entry => entry.slug !== slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.category === current.category) * 10 +
        left.tags.filter(tag => current.tags.includes(tag)).length
      const rightScore =
        Number(right.category === current.category) * 10 +
        right.tags.filter(tag => current.tags.includes(tag)).length
      return rightScore - leftScore || left.title.localeCompare(right.title)
    })

  return related.slice(0, limit)
}

export async function getCareerLibraryData() {
  const templates = await getCachedCareerTemplates()
  const categories = CATEGORY_DEFS.map(category => ({
    ...category,
    count: templates.filter(template => template.category === category.id).length,
  }))

  return {
    templates,
    categories,
    featuredTemplates: templates.filter(template => template.featured),
    stats: {
      totalTemplates: templates.length,
      featuredTemplates: templates.filter(template => template.featured).length,
      categories: categories.length,
    },
  }
}
