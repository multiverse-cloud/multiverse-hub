'use client'

import { useEffect, useMemo, useState } from 'react'
import type React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Copy,
  Download,
  FileJson,
  FileText,
  Monitor,
  Plus,
  Printer,
  RotateCcw,
  Sparkles,
  Smartphone,
  UploadCloud,
} from 'lucide-react'
import CareerMiniNav from '@/components/career/CareerMiniNav'
import { CAREER_TEMPLATES, getCareerTemplate } from '@/lib/career/career-data'
import { buildResumeYaml, DEFAULT_RESUME, type ResumeData } from '@/lib/career/resume-model'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'multiverse-career-resume-v1'

type BuilderTab = 'cv' | 'design' | 'settings' | 'yaml'
type BuilderView = 'split' | 'editor' | 'preview'

function downloadText(filename: string, content: string, type = 'text/plain') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
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
    <label className="grid gap-1.5 border-b border-slate-100 py-3 text-sm dark:border-slate-800 sm:grid-cols-[150px_1fr] sm:items-center">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-base text-slate-950 outline-none placeholder:text-slate-300 dark:text-white dark:placeholder:text-slate-600"
      />
    </label>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="grid gap-1.5 border-b border-slate-100 py-3 text-sm dark:border-slate-800">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full resize-none bg-transparent text-base leading-7 text-slate-950 outline-none placeholder:text-slate-300 dark:text-white dark:placeholder:text-slate-600"
      />
    </label>
  )
}

function ResumePreview({ resume, templateId, zoom = 100 }: { resume: ResumeData; templateId: string; zoom?: number }) {
  const template = getCareerTemplate(templateId)
  const compact = template.density === 'compact'
  const contactItems = [
    resume.location,
    resume.email,
    resume.phone,
    resume.website,
    resume.linkedin ? `LinkedIn: ${resume.linkedin}` : '',
    resume.github ? `GitHub: ${resume.github}` : '',
    ...(resume.customLinks ?? []).filter(link => link.label && link.url).map(link => `${link.label}: ${link.url}`),
  ].filter(Boolean)

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3
      className={cn(
        'border-b pb-1 text-base font-black',
        template.layout === 'editorial' && 'border-b-0 text-lg uppercase tracking-[0.16em]',
        template.layout === 'sidebar' && 'text-sm uppercase tracking-[0.14em]'
      )}
      style={{ borderColor: template.accent, color: template.accent }}
    >
      {children}
    </h3>
  )

  const ExperienceBlock = () => (
    <section className="mt-6">
      <SectionTitle>Experience</SectionTitle>
      <div className={cn('mt-3 space-y-4', template.layout === 'timeline' && 'border-l pl-4')} style={{ borderColor: template.accent }}>
        {resume.experience.map((item) => (
          <div key={item.id} className={cn(template.layout === 'timeline' && 'relative')}>
            {template.layout === 'timeline' ? (
              <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full border-2 border-white" style={{ backgroundColor: template.accent }} />
            ) : null}
            <div className="flex justify-between gap-4">
              <p className="font-black">{item.company}, <span className="font-semibold">{item.role}</span></p>
              <p className="shrink-0 text-right text-[11px] text-slate-500">{item.location}<br />{item.dates}</p>
            </div>
            <ul className="mt-1 list-disc space-y-1 pl-5 leading-5 text-slate-700">
              {item.bullets.filter(Boolean).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )

  const EducationBlock = () => (
    <section className="mt-6">
      <SectionTitle>Education</SectionTitle>
      <div className="mt-3 space-y-3">
        {resume.education.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <div>
              <p className="font-black">{item.school}</p>
              <p className="text-slate-700">{item.degree}</p>
              <p className="text-slate-600">{item.detail}</p>
            </div>
            <p className="shrink-0 text-right text-[11px] text-slate-500">{item.location}<br />{item.dates}</p>
          </div>
        ))}
      </div>
    </section>
  )

  const ProjectSkillsBlock = () => (
    <section className="mt-6 grid gap-6 sm:grid-cols-2">
      <div>
        <SectionTitle>Projects</SectionTitle>
        <div className="mt-3 space-y-3">
          {resume.projects.map((project) => (
            <div key={project.id}>
              <p className="font-black">{project.name}</p>
              <p className="leading-5 text-slate-700">{project.description}</p>
              <p className="text-[11px]" style={{ color: template.accent }}>{project.link}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>Skills</SectionTitle>
        <p className="mt-3 leading-6 text-slate-700">{resume.skills}</p>
      </div>
    </section>
  )

  const mainContent = (
    <>
      <section className="mt-8">
        <SectionTitle>{template.layout === 'academic' ? 'Research Profile' : 'Profile'}</SectionTitle>
        <p className="mt-2 leading-6 text-slate-700">{resume.summary}</p>
      </section>
      <ExperienceBlock />
      <EducationBlock />
      <ProjectSkillsBlock />
    </>
  )

  return (
    <div className="mx-auto w-full max-w-[820px] bg-slate-100 p-3 dark:bg-slate-900 sm:p-6">
      <article
        className={cn(
          'mx-auto min-h-[980px] w-full max-w-[760px] origin-top bg-white text-slate-950 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.55)] transition-transform',
          compact ? 'text-[12px]' : 'text-[13px]',
          template.layout === 'sidebar' ? 'grid grid-cols-[190px_1fr] p-0' : 'px-7 py-8 sm:px-12 sm:py-11',
          template.layout === 'compact' && 'min-h-[860px]',
          template.layout === 'editorial' && 'px-8 py-10 sm:px-14',
          template.layout === 'academic' && 'font-serif'
        )}
        style={{
          borderTop: template.layout === 'sidebar' ? undefined : `5px solid ${template.accent}`,
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          marginBottom: zoom > 100 ? `${(zoom - 100) * 8}px` : undefined,
        }}
      >
        {template.layout === 'sidebar' ? (
          <>
            <aside className="min-h-full px-6 py-8 text-white" style={{ backgroundColor: template.accent }}>
              <h2 className="text-2xl font-black tracking-tight">{resume.name || 'Your Name'}</h2>
              <p className="mt-2 text-sm font-semibold text-white/80">{resume.headline}</p>
              <div className="mt-8 space-y-2 text-[11px] text-white/80">
                {contactItems.map(item => <p key={item}>{item}</p>)}
              </div>
              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Skills</p>
                <p className="mt-2 leading-6 text-white/85">{resume.skills}</p>
              </div>
            </aside>
            <div className="px-8 py-8">
              {mainContent}
            </div>
          </>
        ) : (
          <>
            <header className={cn(template.layout === 'editorial' ? 'text-left' : 'text-center')}>
              {template.layout === 'editorial' ? <p className="mb-3 text-xs font-black uppercase tracking-[0.22em]" style={{ color: template.accent }}>{resume.headline}</p> : null}
              <h2 className={cn('font-black tracking-tight', template.layout === 'editorial' ? 'text-5xl leading-none' : 'text-3xl')} style={{ color: template.accent }}>
                {resume.name || 'Your Name'}
              </h2>
              {template.layout !== 'editorial' ? <p className="mt-2 text-sm font-semibold text-slate-700">{resume.headline}</p> : null}
              <p className="mt-3 text-[11px] text-slate-500">{contactItems.join(' | ')}</p>
            </header>
            {mainContent}
          </>
        )}
      </article>
    </div>
  )
}

export default function CareerBuilderApp() {
  const searchParams = useSearchParams()
  const [resume, setResume] = useState<ResumeData>(DEFAULT_RESUME)
  const [templateId, setTemplateId] = useState(CAREER_TEMPLATES[0].id)
  const [tab, setTab] = useState<BuilderTab>('cv')
  const [view, setView] = useState<BuilderView>('split')
  const [zoom, setZoom] = useState(92)
  const yaml = useMemo(() => buildResumeYaml(resume, templateId), [resume, templateId])
  const activeTemplate = getCareerTemplate(templateId)

  useEffect(() => {
    const requestedTemplate = searchParams?.get('template')
    if (requestedTemplate && CAREER_TEMPLATES.some((template) => template.id === requestedTemplate)) {
      setTemplateId(requestedTemplate)
      setTab('design')
    }
  }, [searchParams])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as { resume?: ResumeData; templateId?: string }
        if (parsed.resume) {
          setResume({
            ...DEFAULT_RESUME,
            ...parsed.resume,
            customLinks: parsed.resume.customLinks ?? DEFAULT_RESUME.customLinks,
          })
        }
        if (parsed.templateId) setTemplateId(parsed.templateId)
      }
    } catch {}
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ resume, templateId }))
  }, [resume, templateId])

  function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
    setResume((current) => ({ ...current, [key]: value }))
  }

  function resetResume() {
    setResume(DEFAULT_RESUME)
    setTemplateId(CAREER_TEMPLATES[0].id)
  }

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <CareerMiniNav active="builder" />
      <div className="grid min-h-[calc(100dvh-56px)] lg:grid-cols-[280px_1fr_0.96fr]">
        <aside className="hidden border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black">ResumeCV</p>
              <p className="text-xs text-slate-500">Local builder</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900" onClick={resetResume}>
              <Plus className="h-4 w-4" /> Create new CV
            </button>
            <Link href="/career/import" className="flex w-full items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
              <UploadCloud className="h-4 w-4" /> Import resume
            </Link>
          </div>
          <div className="mt-8">
            <p className="mb-2 px-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">CVs</p>
            <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">
              Example CV
            </div>
          </div>
          <div className="mt-8 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <button onClick={() => downloadText('resume.yaml', yaml)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900">
              <Download className="h-4 w-4" /> Download YAML
            </button>
            <button onClick={() => downloadText('resume.json', JSON.stringify(resume, null, 2), 'application/json')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900">
              <FileJson className="h-4 w-4" /> Download JSON
            </button>
          </div>
        </aside>

        <main className="min-w-0 bg-white dark:bg-slate-950">
          <div className="sticky top-14 z-20 border-b border-slate-200 bg-white/95 px-3 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 overflow-x-auto">
                {(['cv', 'design', 'settings', 'yaml'] as BuilderTab[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setTab(item)}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-bold capitalize transition-colors',
                      tab === item ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView(view === 'preview' ? 'split' : 'preview')}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                  aria-label="Toggle preview focus"
                >
                  {view === 'preview' ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                </button>
                <button onClick={resetResume} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900" aria-label="Reset">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button onClick={() => window.print()} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900" aria-label="Print PDF">
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className={cn('h-[calc(100dvh-112px)] overflow-y-auto px-4 py-5 custom-scrollbar sm:px-8', view === 'preview' && 'hidden lg:block')}>
            {tab === 'cv' ? (
              <div className="mx-auto max-w-3xl">
                <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-blue-600">CV Editor</p>
                <Field label="Name" value={resume.name} onChange={(value) => update('name', value)} />
                <Field label="Headline" value={resume.headline} onChange={(value) => update('headline', value)} />
                <Field label="Location" value={resume.location} onChange={(value) => update('location', value)} />
                <Field label="Email" value={resume.email} onChange={(value) => update('email', value)} />
                <Field label="Phone" value={resume.phone} onChange={(value) => update('phone', value)} />
                <Field label="Website" value={resume.website} onChange={(value) => update('website', value)} />
                <Field label="LinkedIn" value={resume.linkedin} onChange={(value) => update('linkedin', value)} />
                <Field label="GitHub" value={resume.github} onChange={(value) => update('github', value)} />
                <div className="border-b border-slate-100 py-4 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Custom label links</p>
                    <button
                      onClick={() => update('customLinks', [...(resume.customLinks ?? []), { id: `link-${Date.now()}`, label: 'Link', url: 'https://' }])}
                      className="rounded-md bg-slate-950 px-2.5 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950"
                    >
                      Add link
                    </button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {(resume.customLinks ?? []).map((link, index) => (
                      <div key={link.id} className="grid gap-2 sm:grid-cols-[0.42fr_1fr_auto]">
                        <input
                          value={link.label}
                          onChange={(event) => {
                            const next = [...(resume.customLinks ?? [])]
                            next[index] = { ...link, label: event.target.value }
                            update('customLinks', next)
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 dark:border-slate-800 dark:bg-slate-950"
                          placeholder="Label"
                        />
                        <input
                          value={link.url}
                          onChange={(event) => {
                            const next = [...(resume.customLinks ?? [])]
                            next[index] = { ...link, url: event.target.value }
                            update('customLinks', next)
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 dark:border-slate-800 dark:bg-slate-950"
                          placeholder="https://"
                        />
                        <button
                          onClick={() => update('customLinks', (resume.customLinks ?? []).filter(item => item.id !== link.id))}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 dark:border-slate-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <TextAreaField label="Summary" value={resume.summary} onChange={(value) => update('summary', value)} />
                <TextAreaField label="Skills" value={resume.skills} onChange={(value) => update('skills', value)} />

                <div className="mt-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black">Experience</h2>
                    <button
                      onClick={() =>
                        update('experience', [
                          ...resume.experience,
                          { id: `exp-${Date.now()}`, role: 'Role', company: 'Company', location: 'City', dates: '2026 - Present', bullets: ['Add a measurable achievement.'] },
                        ])
                      }
                      className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-950"
                    >
                      Add
                    </button>
                  </div>
                  {resume.experience.map((item, index) => (
                    <div key={item.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                      <Field label="Company" value={item.company} onChange={(value) => {
                        const next = [...resume.experience]
                        next[index] = { ...item, company: value }
                        update('experience', next)
                      }} />
                      <Field label="Role" value={item.role} onChange={(value) => {
                        const next = [...resume.experience]
                        next[index] = { ...item, role: value }
                        update('experience', next)
                      }} />
                      <TextAreaField label="Bullets" value={item.bullets.join('\n')} onChange={(value) => {
                        const next = [...resume.experience]
                        next[index] = { ...item, bullets: value.split('\n') }
                        update('experience', next)
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {tab === 'design' ? (
              <div className="mx-auto max-w-5xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Template Studio</p>
                <h1 className="mt-2 text-2xl font-black">Switch premium templates instantly.</h1>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {CAREER_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setTemplateId(template.id)}
                      className={cn(
                        'rounded-lg border p-4 text-left transition-all hover:-translate-y-0.5',
                        templateId === template.id ? 'border-slate-950 bg-slate-50 dark:border-white dark:bg-slate-900' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black">{template.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{template.role}</p>
                        </div>
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: template.accent }} />
                      </div>
                      <p className="mt-3 text-xs text-slate-500">{template.bestFor.slice(0, 2).join(' / ')}</p>
                      <div className="mt-3 inline-flex rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 dark:bg-slate-900">
                        {template.layout}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {tab === 'settings' ? (
              <div className="mx-auto max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Settings</p>
                <h1 className="mt-2 text-2xl font-black">Export and privacy settings</h1>
                <div className="mt-6 rounded-lg border border-slate-200 p-5 dark:border-slate-800">
                  <p className="font-black">Current template</p>
                  <p className="mt-1 text-sm text-slate-500">{activeTemplate.name} with {activeTemplate.density} density.</p>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold">Preview zoom</span>
                      <span className="text-slate-500">{zoom}%</span>
                    </div>
                    <input
                      type="range"
                      min="72"
                      max="118"
                      value={zoom}
                      onChange={(event) => setZoom(Number(event.target.value))}
                      className="mt-3 w-full accent-slate-950 dark:accent-white"
                    />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button onClick={() => downloadText('resume.yaml', yaml)} className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950">Download YAML</button>
                    <button onClick={() => downloadText('resume.json', JSON.stringify(resume, null, 2), 'application/json')} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold dark:border-slate-800">Download JSON</button>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(yaml)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300"
                  >
                    <Copy className="h-4 w-4" />
                    Copy YAML to clipboard
                  </button>
                </div>
              </div>
            ) : null}

            {tab === 'yaml' ? (
              <div className="mx-auto max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">YAML Output</p>
                <pre className="mt-5 max-h-[70vh] overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100 custom-scrollbar">{yaml}</pre>
              </div>
            ) : null}
          </div>
        </main>

        <aside className={cn('min-w-0 border-l border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900', view === 'editor' && 'hidden')}>
          <div className="sticky top-14 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Sparkles className="h-4 w-4 text-blue-600" />
              {activeTemplate.name}
            </div>
            <button onClick={() => window.print()} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white">Print</button>
          </div>
          <div className="h-[calc(100dvh-103px)] overflow-y-auto custom-scrollbar">
            <ResumePreview resume={resume} templateId={templateId} zoom={zoom} />
          </div>
        </aside>
      </div>
    </div>
  )
}
