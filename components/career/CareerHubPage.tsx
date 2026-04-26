'use client'

import Link from 'next/link'
import {
  ArrowDownToLine,
  Briefcase,
  Check,
  ChevronDown,
  Copy,
  FileText,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  PanelLeft,
  Plus,
  Printer,
  RotateCcw,
  Sparkles,
  Upload,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CareerCategoryDefinition, CareerTemplateEntry } from '@/lib/career-db'
import { cn } from '@/lib/utils'

type BuilderTheme = 'classic' | 'modern' | 'academic' | 'compact'
type BuilderMode = 'form' | 'yaml'

type EducationItem = {
  id: string
  degree: string
  school: string
  location: string
  dates: string
  detail: string
}

type ExperienceItem = {
  id: string
  role: string
  company: string
  location: string
  dates: string
  bullets: string[]
}

type ResumeState = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  website: string
  linkedin: string
  github: string
  summary: string
  education: EducationItem[]
  experience: ExperienceItem[]
  skills: string
}

type CareerHubPageProps = {
  templates: CareerTemplateEntry[]
  categories: Array<CareerCategoryDefinition & { count: number }>
  initialQuery?: string
  initialCategory?: string
}

const INITIAL_RESUME: ResumeState = {
  name: 'Arun Pandian',
  headline: 'Mechanical Engineer',
  location: 'San Francisco, CA',
  email: 'john.doe@email.com',
  phone: '+1 555 123 4567',
  website: 'https://rendercv.com',
  linkedin: 'rendercv',
  github: 'rendercv',
  summary:
    'Engineer with strong product thinking, practical project delivery, and a clear record of building reliable systems with measurable outcomes.',
  education: [
    {
      id: 'edu-1',
      degree: 'PhD in Computer Science',
      school: 'Princeton University',
      location: 'Princeton, NJ',
      dates: 'Sept 2018 - May 2023',
      detail: 'Thesis: Efficient architecture search for resource-constrained deployment.',
    },
    {
      id: 'edu-2',
      degree: 'BS in Computer Engineering',
      school: 'Bogazici University',
      location: 'Istanbul, Turkiye',
      dates: 'Sept 2014 - June 2018',
      detail: 'GPA: 3.97/4.00, valedictorian.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Co-Founder and CTO',
      company: 'Nexus AI',
      location: 'San Francisco, CA',
      dates: 'June 2023 - Present',
      bullets: [
        'Built foundation model infrastructure serving 2M+ monthly API requests with 99.97% uptime.',
        'Scaled engineering team from 3 to 28 across ML research, platform, and applied AI divisions.',
        'Reduced inference latency by 73% compared to baseline deployments.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Research Intern',
      company: 'NVIDIA Research',
      location: 'Santa Clara, CA',
      dates: 'May 2022 - Aug 2022',
      bullets: [
        'Designed sparse attention mechanism reducing transformer memory footprint by 4.2x.',
        'Co-authored paper accepted at NeurIPS 2022 spotlight presentation.',
      ],
    },
  ],
  skills: 'TypeScript, Python, Systems Design, Product Strategy, Research, Leadership',
}

const FIELD_STYLES =
  'w-full border-0 border-b border-slate-200 bg-transparent px-0 py-2 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-800 dark:text-slate-50 dark:focus:border-blue-400'

const LABEL_STYLES = 'text-sm font-medium text-slate-500 dark:text-slate-400'

function buildYaml(resume: ResumeState, theme: BuilderTheme) {
  const escapeValue = (value: string) => value.replace(/"/g, '\\"')
  const lines = [
    'cv:',
    `  name: "${escapeValue(resume.name)}"`,
    `  headline: "${escapeValue(resume.headline)}"`,
    `  location: "${escapeValue(resume.location)}"`,
    `  email: "${escapeValue(resume.email)}"`,
    `  phone: "${escapeValue(resume.phone)}"`,
    `  website: "${escapeValue(resume.website)}"`,
    '  social_networks:',
    `    - network: "LinkedIn"`,
    `      username: "${escapeValue(resume.linkedin)}"`,
    `    - network: "GitHub"`,
    `      username: "${escapeValue(resume.github)}"`,
    '  sections:',
    '    summary:',
    `      - "${escapeValue(resume.summary)}"`,
    '    education:',
    ...resume.education.flatMap(item => [
      `      - institution: "${escapeValue(item.school)}"`,
      `        area: "${escapeValue(item.degree)}"`,
      `        location: "${escapeValue(item.location)}"`,
      `        dates: "${escapeValue(item.dates)}"`,
      `        highlights:`,
      `          - "${escapeValue(item.detail)}"`,
    ]),
    '    experience:',
    ...resume.experience.flatMap(item => [
      `      - company: "${escapeValue(item.company)}"`,
      `        position: "${escapeValue(item.role)}"`,
      `        location: "${escapeValue(item.location)}"`,
      `        dates: "${escapeValue(item.dates)}"`,
      `        highlights:`,
      ...item.bullets.map(bullet => `          - "${escapeValue(bullet)}"`),
    ]),
    '    skills:',
    `      - "${escapeValue(resume.skills)}"`,
    'design:',
    `  theme: "${theme}"`,
  ]

  return lines.join('\n')
}

function downloadText(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'application/x-yaml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="grid grid-cols-[132px_minmax(0,1fr)] items-center gap-4 border-b border-slate-100 py-1.5 dark:border-slate-900 sm:grid-cols-[150px_minmax(0,1fr)]">
      <span className={LABEL_STYLES}>{label}</span>
      <input
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        className={FIELD_STYLES}
      />
    </label>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: typeof UserRound
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-950 dark:text-slate-50">{title}</h2>
      </div>
      {action}
    </div>
  )
}

function ResumePreview({ resume, theme, zoom }: { resume: ResumeState; theme: BuilderTheme; zoom: number }) {
  const accent = {
    classic: 'text-blue-700 border-blue-500',
    modern: 'text-slate-950 border-slate-950',
    academic: 'text-emerald-700 border-emerald-600',
    compact: 'text-zinc-900 border-zinc-900',
  }[theme]

  return (
    <div className="flex justify-center bg-[#f5f3fb] px-5 py-8 dark:bg-slate-950">
      <article
        className={cn(
          'min-h-[980px] w-[760px] origin-top bg-white px-16 py-14 font-serif text-[12px] leading-[1.45] text-black shadow-[0_24px_70px_-40px_rgba(15,23,42,0.45)]',
          theme === 'compact' && 'px-12 py-11 text-[11px]',
          theme === 'modern' && 'font-sans',
          theme === 'academic' && 'font-serif'
        )}
        style={{ transform: `scale(${zoom / 100})`, marginBottom: `${(zoom - 100) * 4}px` }}
      >
        <header className="text-center">
          <p className="mb-4 text-right text-[10px] italic text-slate-500">Last updated in Apr 2026</p>
          <h1 className={cn('text-3xl font-bold', accent)}>{resume.name || 'Your Name'}</h1>
          <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-blue-700">
            {resume.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {resume.location}
              </span>
            ) : null}
            {resume.email ? (
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {resume.email}
              </span>
            ) : null}
            {resume.website ? (
              <span className="inline-flex items-center gap-1">
                <Link2 className="h-3 w-3" />
                {resume.website.replace(/^https?:\/\//, '')}
              </span>
            ) : null}
            {resume.linkedin ? <span>linkedin: {resume.linkedin}</span> : null}
            {resume.github ? <span>github: {resume.github}</span> : null}
          </div>
        </header>

        <section className="mt-7">
          <h2 className={cn('border-b pb-1 text-base font-bold', accent)}>Profile</h2>
          <p className="mt-2">{resume.summary}</p>
        </section>

        <section className="mt-5">
          <h2 className={cn('border-b pb-1 text-base font-bold', accent)}>Education</h2>
          <div className="mt-2 space-y-3">
            {resume.education.map(item => (
              <div key={item.id}>
                <div className="flex justify-between gap-6">
                  <p>
                    <strong>{item.degree}</strong>, {item.school}
                  </p>
                  <p className="shrink-0 text-right">{item.location}</p>
                </div>
                <div className="flex justify-between gap-6 text-[11px]">
                  <p>{item.detail}</p>
                  <p className="shrink-0 text-right">{item.dates}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h2 className={cn('border-b pb-1 text-base font-bold', accent)}>Experience</h2>
          <div className="mt-2 space-y-4">
            {resume.experience.map(item => (
              <div key={item.id}>
                <div className="flex justify-between gap-6">
                  <p>
                    <strong>{item.company}</strong>, {item.role}
                  </p>
                  <p className="shrink-0 text-right">{item.location}</p>
                </div>
                <p className="text-right text-[11px]">{item.dates}</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {item.bullets.filter(Boolean).map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h2 className={cn('border-b pb-1 text-base font-bold', accent)}>Skills</h2>
          <p className="mt-2">{resume.skills}</p>
        </section>
      </article>
    </div>
  )
}

export default function CareerHubPage({ templates }: CareerHubPageProps) {
  const [resume, setResume] = useState<ResumeState>(INITIAL_RESUME)
  const [theme, setTheme] = useState<BuilderTheme>('classic')
  const [mode, setMode] = useState<BuilderMode>('form')
  const [zoom, setZoom] = useState(100)
  const [copied, setCopied] = useState(false)
  const yaml = useMemo(() => buildYaml(resume, theme), [resume, theme])

  const updateResume = <Key extends keyof ResumeState>(key: Key, value: ResumeState[Key]) => {
    setResume(current => ({ ...current, [key]: value }))
  }

  const updateEducation = (id: string, patch: Partial<EducationItem>) => {
    setResume(current => ({
      ...current,
      education: current.education.map(item => (item.id === id ? { ...item, ...patch } : item)),
    }))
  }

  const updateExperience = (id: string, patch: Partial<ExperienceItem>) => {
    setResume(current => ({
      ...current,
      experience: current.experience.map(item => (item.id === id ? { ...item, ...patch } : item)),
    }))
  }

  const addExperience = () => {
    setResume(current => ({
      ...current,
      experience: [
        ...current.experience,
        {
          id: `exp-${Date.now()}`,
          role: 'New Role',
          company: 'Company',
          location: 'City',
          dates: '2024 - Present',
          bullets: ['Describe one measurable achievement.'],
        },
      ],
    }))
  }

  const copyYaml = async () => {
    await navigator.clipboard.writeText(yaml).catch(() => undefined)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="min-h-screen bg-[#f7f6fc] text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <div className="grid min-h-[calc(100vh-112px)] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(560px,1fr)_minmax(520px,0.85fr)]">
        <aside className="border-b border-slate-200 bg-[#fbfaff] px-4 py-5 dark:border-slate-800 dark:bg-slate-950 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-normal">ResumeCV</p>
              <p className="text-xs text-slate-500">Local CV builder</p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              onClick={() => setResume(INITIAL_RESUME)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <Plus className="h-4 w-4" />
              Create new CV
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg border border-dashed border-slate-300 px-3 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-white dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <Upload className="h-4 w-4" />
              <span>
                <span className="block font-semibold">Import YAML</span>
                <span className="text-xs text-slate-500">PDF parsing can be added locally later</span>
              </span>
            </button>
          </div>

          <div className="mt-6">
            <p className="px-2 text-xs font-semibold text-slate-500">CVs</p>
            <button
              type="button"
              className="mt-2 flex w-full items-center gap-2 rounded-lg bg-[#ece9fb] px-3 py-2 text-left text-sm font-medium text-slate-950 dark:bg-slate-900 dark:text-slate-50"
            >
              <FileText className="h-4 w-4" />
              Example CV
            </button>
          </div>

          <div className="mt-8">
            <p className="px-2 text-xs font-semibold text-slate-500">Templates</p>
            <div className="mt-2 max-h-72 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
              {templates.slice(0, 9).map(template => (
                <Link
                  key={template.id}
                  href={`/career/${template.slug}`}
                  className="block rounded-lg px-3 py-2 text-xs text-slate-600 transition-colors hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                >
                  {template.theme}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800" type="button">
                <PanelLeft className="h-4 w-4" />
              </button>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800" type="button" onClick={() => setResume(INITIAL_RESUME)}>
                <RotateCcw className="h-4 w-4" />
              </button>
              <div className="ml-0 flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 sm:ml-2">
                {(['form', 'yaml'] as const).map(nextMode => (
                  <button
                    key={nextMode}
                    type="button"
                    onClick={() => setMode(nextMode)}
                    className={cn(
                      'px-4 py-2 text-sm font-semibold capitalize transition-colors',
                      mode === nextMode
                        ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950'
                        : 'bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300'
                    )}
                  >
                    {nextMode === 'form' ? 'CV' : 'YAML'}
                  </button>
                ))}
              </div>
              <div className="relative">
                <select
                  value={theme}
                  onChange={event => setTheme(event.target.value as BuilderTheme)}
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm font-medium outline-none dark:border-slate-800 dark:bg-slate-950"
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="academic">Academic</option>
                  <option value="compact">Compact</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="h-[calc(100vh-180px)] overflow-y-auto px-5 py-6 custom-scrollbar lg:h-[calc(100vh-128px)]">
            {mode === 'yaml' ? (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h1 className="text-base font-semibold">RenderCV YAML</h1>
                  <button
                    type="button"
                    onClick={copyYaml}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold dark:border-slate-800"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <textarea
                  value={yaml}
                  readOnly
                  className="min-h-[720px] w-full resize-none rounded-lg border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 outline-none dark:border-slate-800"
                />
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-8">
                <section>
                  <SectionHeader icon={UserRound} title="Basics" />
                  <div>
                    <Field label="Name" value={resume.name} onChange={value => updateResume('name', value)} />
                    <Field label="Headline" value={resume.headline} onChange={value => updateResume('headline', value)} />
                    <Field label="Location" value={resume.location} onChange={value => updateResume('location', value)} />
                    <Field label="Email" value={resume.email} onChange={value => updateResume('email', value)} />
                    <Field label="Phone" value={resume.phone} onChange={value => updateResume('phone', value)} />
                    <Field label="Website" value={resume.website} onChange={value => updateResume('website', value)} />
                    <Field label="LinkedIn" value={resume.linkedin} onChange={value => updateResume('linkedin', value)} />
                    <Field label="GitHub" value={resume.github} onChange={value => updateResume('github', value)} />
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Sparkles} title="Profile" />
                  <textarea
                    value={resume.summary}
                    onChange={event => updateResume('summary', event.target.value)}
                    className="min-h-24 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950"
                  />
                </section>

                <section>
                  <SectionHeader icon={GraduationCap} title="Education" />
                  <div className="space-y-5">
                    {resume.education.map(item => (
                      <div key={item.id} className="space-y-1 border-l-2 border-slate-200 pl-4 dark:border-slate-800">
                        <Field label="Degree" value={item.degree} onChange={value => updateEducation(item.id, { degree: value })} />
                        <Field label="School" value={item.school} onChange={value => updateEducation(item.id, { school: value })} />
                        <Field label="Location" value={item.location} onChange={value => updateEducation(item.id, { location: value })} />
                        <Field label="Dates" value={item.dates} onChange={value => updateEducation(item.id, { dates: value })} />
                        <Field label="Detail" value={item.detail} onChange={value => updateEducation(item.id, { detail: value })} />
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader
                    icon={Briefcase}
                    title="Experience"
                    action={
                      <button
                        type="button"
                        onClick={addExperience}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold dark:border-slate-800"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add
                      </button>
                    }
                  />
                  <div className="space-y-6">
                    {resume.experience.map(item => (
                      <div key={item.id} className="space-y-1 border-l-2 border-blue-200 pl-4 dark:border-blue-950">
                        <Field label="Role" value={item.role} onChange={value => updateExperience(item.id, { role: value })} />
                        <Field label="Company" value={item.company} onChange={value => updateExperience(item.id, { company: value })} />
                        <Field label="Location" value={item.location} onChange={value => updateExperience(item.id, { location: value })} />
                        <Field label="Dates" value={item.dates} onChange={value => updateExperience(item.id, { dates: value })} />
                        {item.bullets.map((bullet, index) => (
                          <Field
                            key={`${item.id}-${index}`}
                            label={`Bullet ${index + 1}`}
                            value={bullet}
                            onChange={value => {
                              const bullets = [...item.bullets]
                              bullets[index] = value
                              updateExperience(item.id, { bullets })
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader icon={FileText} title="Skills" />
                  <textarea
                    value={resume.skills}
                    onChange={event => updateResume('skills', event.target.value)}
                    className="min-h-20 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950"
                  />
                </section>
              </div>
            )}
          </div>
        </section>

        <section className="min-w-0 bg-[#f5f3fb] dark:bg-slate-950">
          <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-[#f7f6fc]/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setZoom(value => Math.max(80, value - 10))} className="h-9 w-9 rounded-lg border border-slate-200 text-lg font-semibold dark:border-slate-800">
                -
              </button>
              <div className="flex h-9 min-w-20 items-center justify-center border-y border-slate-200 px-3 text-sm font-semibold dark:border-slate-800">
                {zoom}%
              </div>
              <button type="button" onClick={() => setZoom(value => Math.min(130, value + 10))} className="h-9 w-9 rounded-lg border border-slate-200 text-lg font-semibold dark:border-slate-800">
                +
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadText(`${resume.name || 'resume'}.yaml`, yaml)}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold dark:border-slate-800 dark:bg-slate-900"
              >
                <ArrowDownToLine className="h-4 w-4" />
                YAML
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-950"
              >
                <Printer className="h-4 w-4" />
                Print PDF
              </button>
            </div>
          </div>
          <div className="h-[calc(100vh-180px)] overflow-auto custom-scrollbar lg:h-[calc(100vh-128px)]">
            <ResumePreview resume={resume} theme={theme} zoom={zoom} />
          </div>
        </section>
      </div>
    </div>
  )
}
