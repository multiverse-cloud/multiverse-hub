export type CareerTemplateTone =
  | 'classic'
  | 'executive'
  | 'engineering'
  | 'academic'
  | 'minimal'
  | 'creative'
  | 'product'
  | 'startup'

export type CareerTemplate = {
  id: string
  name: string
  role: string
  tone: CareerTemplateTone
  layout: 'classic' | 'sidebar' | 'timeline' | 'compact' | 'editorial' | 'academic'
  accent: string
  density: 'airy' | 'balanced' | 'compact'
  bestFor: string[]
  seoKeywords: string[]
}

export type CareerPageLink = {
  title: string
  href: string
  description: string
}

export type CareerFaq = {
  question: string
  answer: string
}

const templateRoles = [
  ['classic-software-engineer', 'Classic Software Engineer', 'Software Engineer', 'engineering', '#0f6fb6'],
  ['senior-frontend-engineer', 'Senior Frontend Engineer', 'Frontend Engineer', 'engineering', '#2563eb'],
  ['backend-platform-engineer', 'Backend Platform Engineer', 'Platform Engineer', 'engineering', '#0f766e'],
  ['full-stack-product-engineer', 'Full Stack Product Engineer', 'Product Engineer', 'product', '#7c3aed'],
  ['devops-sre-resume', 'DevOps and SRE Resume', 'Site Reliability Engineer', 'engineering', '#0891b2'],
  ['data-scientist-resume', 'Data Scientist Resume', 'Data Scientist', 'engineering', '#4f46e5'],
  ['machine-learning-engineer', 'Machine Learning Engineer', 'ML Engineer', 'engineering', '#1d4ed8'],
  ['product-manager-resume', 'Product Manager Resume', 'Product Manager', 'product', '#ea580c'],
  ['senior-product-manager', 'Senior Product Manager', 'Senior PM', 'product', '#c2410c'],
  ['ux-product-designer', 'UX Product Designer', 'Product Designer', 'creative', '#db2777'],
  ['brand-designer-portfolio-cv', 'Brand Designer CV', 'Brand Designer', 'creative', '#be185d'],
  ['creative-director-cv', 'Creative Director CV', 'Creative Director', 'creative', '#9333ea'],
  ['startup-founder-resume', 'Startup Founder Resume', 'Founder', 'startup', '#111827'],
  ['chief-technology-officer', 'CTO Executive Resume', 'CTO', 'executive', '#1f2937'],
  ['operations-director-resume', 'Operations Director Resume', 'Operations Director', 'executive', '#334155'],
  ['sales-director-resume', 'Sales Director Resume', 'Sales Director', 'executive', '#b45309'],
  ['marketing-manager-resume', 'Marketing Manager Resume', 'Marketing Manager', 'executive', '#e11d48'],
  ['finance-analyst-resume', 'Finance Analyst Resume', 'Financial Analyst', 'minimal', '#0369a1'],
  ['consultant-resume', 'Consultant Resume', 'Strategy Consultant', 'minimal', '#475569'],
  ['business-analyst-resume', 'Business Analyst Resume', 'Business Analyst', 'minimal', '#64748b'],
  ['hr-generalist-resume', 'HR Generalist Resume', 'HR Generalist', 'minimal', '#16a34a'],
  ['project-manager-resume', 'Project Manager Resume', 'Project Manager', 'executive', '#ca8a04'],
  ['scrum-master-resume', 'Scrum Master Resume', 'Scrum Master', 'product', '#0284c7'],
  ['customer-success-manager', 'Customer Success Manager', 'CS Manager', 'minimal', '#059669'],
  ['academic-cv-phd', 'Academic CV for PhD', 'PhD Candidate', 'academic', '#0f766e'],
  ['research-scientist-cv', 'Research Scientist CV', 'Research Scientist', 'academic', '#047857'],
  ['professor-cv', 'Professor CV', 'Professor', 'academic', '#065f46'],
  ['medical-resident-cv', 'Medical Resident CV', 'Medical Resident', 'academic', '#0e7490'],
  ['fresh-graduate-resume', 'Fresh Graduate Resume', 'Graduate Trainee', 'classic', '#2563eb'],
  ['internship-resume', 'Internship Resume', 'Intern', 'classic', '#4f46e5'],
  ['career-switcher-resume', 'Career Switcher Resume', 'Career Switcher', 'classic', '#7c3aed'],
  ['remote-work-resume', 'Remote Work Resume', 'Remote Specialist', 'minimal', '#0f766e'],
  ['freelancer-resume', 'Freelancer Resume', 'Freelance Consultant', 'creative', '#a21caf'],
  ['one-page-minimal-resume', 'One Page Minimal Resume', 'General Professional', 'minimal', '#111827'],
  ['ats-clean-resume', 'ATS Clean Resume', 'General Professional', 'classic', '#0f6fb6'],
  ['modern-two-page-cv', 'Modern Two Page CV', 'Senior Professional', 'executive', '#334155'],
] as const

const templateLayouts: CareerTemplate['layout'][] = [
  'classic',
  'sidebar',
  'timeline',
  'compact',
  'academic',
  'editorial',
]

export const CAREER_TEMPLATES: CareerTemplate[] = templateRoles.map(
  ([id, name, role, tone, accent], index) => ({
    id,
    name,
    role,
    tone,
    layout:
      tone === 'academic'
        ? 'academic'
        : tone === 'creative'
          ? 'editorial'
          : templateLayouts[index % templateLayouts.length],
    accent,
    density: index % 5 === 0 ? 'compact' : index % 3 === 0 ? 'airy' : 'balanced',
    bestFor: [
      role,
      tone === 'academic' ? 'Research applications' : 'Job applications',
      tone === 'minimal' ? 'ATS scans' : 'Premium presentation',
    ],
    seoKeywords: [
      `${role.toLowerCase()} resume template`,
      'ats friendly resume builder',
      `${tone} cv template`,
    ],
  })
)

export const CAREER_PAGES: CareerPageLink[] = [
  {
    title: 'Resume Builder',
    href: '/career/builder',
    description: 'Create a resume with editable sections, live preview, templates, YAML, and print export.',
  },
  {
    title: 'Resume Import',
    href: '/career/import',
    description: 'Start from an existing resume file or paste resume text into a structured builder flow.',
  },
  {
    title: 'Resume Parser',
    href: '/career/parser',
    description: 'Analyze resume text for ATS readability, section coverage, keywords, and contact parsing.',
  },
]

export const CAREER_FAQS: CareerFaq[] = [
  {
    question: 'Is the resume builder free to use?',
    answer:
      'Yes. The builder runs in your browser, does not require login, and is designed for fast resume editing, template switching, and print-ready export.',
  },
  {
    question: 'Are the templates ATS friendly?',
    answer:
      'The premium templates use clean headings, readable typography, and simple structure so applicant tracking systems can understand the content.',
  },
  {
    question: 'Do you store my resume data?',
    answer:
      'No public account or database is required. Resume edits stay local to your browser unless you download or copy the content yourself.',
  },
  {
    question: 'Can I import an existing resume?',
    answer:
      'You can paste resume text or upload text-based files to analyze structure and rebuild the resume in the builder. PDF extraction is handled as an import workflow with clear fallback guidance.',
  },
]

export function getCareerTemplate(id: string) {
  return CAREER_TEMPLATES.find(template => template.id === id) ?? CAREER_TEMPLATES[0]
}
