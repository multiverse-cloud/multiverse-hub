export type ResumeSectionKey = 'summary' | 'education' | 'experience' | 'projects' | 'skills'

export type ResumeEducation = {
  id: string
  degree: string
  school: string
  location: string
  dates: string
  detail: string
}

export type ResumeExperience = {
  id: string
  role: string
  company: string
  location: string
  dates: string
  bullets: string[]
}

export type ResumeProject = {
  id: string
  name: string
  description: string
  link: string
}

export type ResumeCustomLink = {
  id: string
  label: string
  url: string
}

export type ResumeData = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  website: string
  linkedin: string
  github: string
  customLinks: ResumeCustomLink[]
  summary: string
  education: ResumeEducation[]
  experience: ResumeExperience[]
  projects: ResumeProject[]
  skills: string
}

export const DEFAULT_RESUME: ResumeData = {
  name: 'Arun Pandian',
  headline: 'Mechanical Engineer',
  location: 'San Francisco, CA',
  email: 'john.doe@email.com',
  phone: '+1 555 123 4567',
  website: 'https://rendercv.com',
  linkedin: 'rendercv',
  github: 'rendercv',
  customLinks: [
    {
      id: 'link-portfolio',
      label: 'Portfolio',
      url: 'https://arun.dev',
    },
    {
      id: 'link-calendly',
      label: 'Book Call',
      url: 'https://cal.com/arun',
    },
  ],
  summary:
    'Engineer with strong product thinking, practical delivery, and a record of building reliable systems with measurable outcomes.',
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
        'Scaled engineering team from 3 to 28 across research, platform, and applied AI divisions.',
        'Reduced inference latency by 73% compared to baseline deployment.',
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
  projects: [
    {
      id: 'project-1',
      name: 'Real-time Analytics Platform',
      description: 'Designed a production dashboard that reduced reporting latency from hours to minutes.',
      link: 'github.com/rendercv',
    },
  ],
  skills: 'TypeScript, Python, Systems Design, Product Strategy, Research, Leadership',
}

export function buildResumeYaml(resume: ResumeData, template: string) {
  const esc = (value: string) => value.replace(/"/g, '\\"')

  return [
    'cv:',
    `  name: "${esc(resume.name)}"`,
    `  headline: "${esc(resume.headline)}"`,
    `  location: "${esc(resume.location)}"`,
    `  email: "${esc(resume.email)}"`,
    `  phone: "${esc(resume.phone)}"`,
    `  website: "${esc(resume.website)}"`,
    '  social_networks:',
    `    - network: "LinkedIn"`,
    `      username: "${esc(resume.linkedin)}"`,
    `    - network: "GitHub"`,
    `      username: "${esc(resume.github)}"`,
    ...resume.customLinks.flatMap(link => [
      `    - network: "${esc(link.label)}"`,
      `      url: "${esc(link.url)}"`,
    ]),
    '  sections:',
    '    summary:',
    `      - "${esc(resume.summary)}"`,
    '    education:',
    ...resume.education.flatMap(item => [
      `      - institution: "${esc(item.school)}"`,
      `        area: "${esc(item.degree)}"`,
      `        location: "${esc(item.location)}"`,
      `        dates: "${esc(item.dates)}"`,
      '        highlights:',
      `          - "${esc(item.detail)}"`,
    ]),
    '    experience:',
    ...resume.experience.flatMap(item => [
      `      - company: "${esc(item.company)}"`,
      `        position: "${esc(item.role)}"`,
      `        location: "${esc(item.location)}"`,
      `        dates: "${esc(item.dates)}"`,
      '        highlights:',
      ...item.bullets.map(bullet => `          - "${esc(bullet)}"`),
    ]),
    '    projects:',
    ...resume.projects.flatMap(item => [
      `      - name: "${esc(item.name)}"`,
      `        link: "${esc(item.link)}"`,
      '        highlights:',
      `          - "${esc(item.description)}"`,
    ]),
    '    skills:',
    `      - "${esc(resume.skills)}"`,
    'design:',
    `  theme: "${esc(template)}"`,
  ].join('\n')
}
