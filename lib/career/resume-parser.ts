export type ParsedResumeSignal = {
  label: string
  value: string
  status: 'strong' | 'ok' | 'missing'
}

export type ParsedResumeResult = {
  name: string
  email: string
  phone: string
  links: string[]
  sections: string[]
  keywords: string[]
  score: number
  signals: ParsedResumeSignal[]
}

const sectionNames = [
  'summary',
  'experience',
  'education',
  'projects',
  'skills',
  'certifications',
  'publications',
  'awards',
]

const keywordPool = [
  'react',
  'next.js',
  'typescript',
  'python',
  'leadership',
  'analytics',
  'design',
  'strategy',
  'research',
  'cloud',
  'aws',
  'seo',
  'automation',
  'testing',
  'performance',
  'security',
]

export function parseResumeText(text: string): ParsedResumeResult {
  const normalized = text.replace(/\s+/g, ' ').trim()
  const lower = normalized.toLowerCase()
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  const email = normalized.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? ''
  const phone = normalized.match(/(?:\+?\d[\d\s().-]{7,}\d)/)?.[0] ?? ''
  const links = normalized.match(/https?:\/\/[^\s]+|(?:linkedin|github)\.com\/[^\s]+/gi) ?? []
  const sections = sectionNames.filter(section => lower.includes(section))
  const keywords = keywordPool.filter(keyword => lower.includes(keyword))
  const name = lines.find(line => /^[A-Za-z][A-Za-z\s.'-]{3,42}$/.test(line)) ?? ''
  const wordCount = normalized ? normalized.split(/\s+/).length : 0

  const signals: ParsedResumeSignal[] = [
    {
      label: 'Contact information',
      value: email && phone ? 'Email and phone found' : email || phone ? 'One contact method found' : 'Missing email and phone',
      status: email && phone ? 'strong' : email || phone ? 'ok' : 'missing',
    },
    {
      label: 'Section structure',
      value: `${sections.length} recognizable sections`,
      status: sections.length >= 4 ? 'strong' : sections.length >= 2 ? 'ok' : 'missing',
    },
    {
      label: 'Keyword coverage',
      value: `${keywords.length} relevant keywords found`,
      status: keywords.length >= 6 ? 'strong' : keywords.length >= 3 ? 'ok' : 'missing',
    },
    {
      label: 'Resume length',
      value: `${wordCount} words`,
      status: wordCount >= 280 && wordCount <= 900 ? 'strong' : wordCount >= 120 ? 'ok' : 'missing',
    },
  ]

  const score = Math.round(
    signals.reduce((total, signal) => {
      if (signal.status === 'strong') return total + 25
      if (signal.status === 'ok') return total + 14
      return total + 4
    }, 0)
  )

  return {
    name,
    email,
    phone,
    links,
    sections,
    keywords,
    score,
    signals,
  }
}

