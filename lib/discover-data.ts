export interface DiscoverList {
  id: string
  title: string
  description: string
  category: string
  slug: string
  icon: string
  itemCount: number
  updatedAt: string
  featured?: boolean
  items: DiscoverItem[]
}

export interface DiscoverItem {
  rank: number
  name: string
  logo: string
  summary: string
  bestFor: string
  pricing: string
  badge: 'internal' | 'external'
  url: string
  tags: string[]
  rating: number
}

export const DISCOVER_LISTS: DiscoverList[] = [
  {
    id: 'top-ai-tools',
    title: 'Top AI Tools',
    description: 'Curated picks for writing, research, image generation, and everyday AI-assisted work.',
    category: 'AI',
    slug: 'top-ai-tools',
    icon: 'Bot',
    itemCount: 10,
    updatedAt: '2025-12-01',
    featured: true,
    items: [
      { rank: 1, name: 'ChatGPT', logo: 'CG', summary: "OpenAI's assistant for writing, coding, and general research workflows.", bestFor: 'Writing and coding', pricing: 'Free / $20 mo', badge: 'external', url: 'https://chat.openai.com', tags: ['AI', 'Chat'], rating: 4.9 },
      { rank: 2, name: 'Claude', logo: 'CL', summary: "Anthropic's assistant for analysis, drafting, and long-form reasoning.", bestFor: 'Analysis and writing', pricing: 'Free / $20 mo', badge: 'external', url: 'https://claude.ai', tags: ['AI', 'Chat'], rating: 4.8 },
      { rank: 3, name: 'Midjourney', logo: 'MJ', summary: 'Image generation platform known for polished visual output and creative exploration.', bestFor: 'Image generation', pricing: '$10 mo', badge: 'external', url: 'https://midjourney.com', tags: ['AI', 'Images'], rating: 4.8 },
      { rank: 4, name: 'Multiverse AI', logo: 'MV', summary: 'Integrated AI workspace inside Multiverse for practical daily tasks.', bestFor: 'Everyday AI tasks', pricing: 'Free', badge: 'internal', url: '/ai', tags: ['AI', 'Tools'], rating: 4.7 },
      { rank: 5, name: 'Perplexity AI', logo: 'PX', summary: 'Research-focused answer engine with linked references and citations.', bestFor: 'Research', pricing: 'Free / $20 mo', badge: 'external', url: 'https://perplexity.ai', tags: ['AI', 'Search'], rating: 4.7 },
      { rank: 6, name: 'Runway', logo: 'RW', summary: 'Creative platform for AI video generation and editing workflows.', bestFor: 'Video generation', pricing: '$12 mo', badge: 'external', url: 'https://runwayml.com', tags: ['AI', 'Video'], rating: 4.6 },
      { rank: 7, name: 'ElevenLabs', logo: 'EL', summary: 'Voice generation platform for narration, dubbing, and synthetic speech.', bestFor: 'Voice AI', pricing: 'Free / $5 mo', badge: 'external', url: 'https://elevenlabs.io', tags: ['AI', 'Audio'], rating: 4.6 },
      { rank: 8, name: 'Gamma', logo: 'GA', summary: 'Presentation builder that turns concepts into polished slides and documents.', bestFor: 'Presentations', pricing: 'Free / $8 mo', badge: 'external', url: 'https://gamma.app', tags: ['AI', 'Design'], rating: 4.5 },
      { rank: 9, name: 'Notion AI', logo: 'NO', summary: 'Writing and note assistance built directly into the Notion workspace.', bestFor: 'Notes and docs', pricing: '$10 mo add-on', badge: 'external', url: 'https://notion.so', tags: ['AI', 'Productivity'], rating: 4.5 },
      { rank: 10, name: 'Kling AI', logo: 'KA', summary: 'Video generation product focused on cinematic AI-created visuals.', bestFor: 'Video creation', pricing: 'Free / $8 mo', badge: 'external', url: 'https://klingai.com', tags: ['AI', 'Video'], rating: 4.4 },
    ],
  },
  {
    id: 'top-photo-editors',
    title: 'Top Photo Editors',
    description: 'Popular tools for quick edits, professional retouching, and browser-based design work.',
    category: 'Design',
    slug: 'top-photo-editors',
    icon: 'Image',
    itemCount: 10,
    updatedAt: '2025-11-15',
    featured: true,
    items: [
      { rank: 1, name: 'Adobe Photoshop', logo: 'PS', summary: 'Industry-standard image editor for retouching, compositing, and advanced design work.', bestFor: 'Professional editing', pricing: '$20 mo', badge: 'external', url: 'https://adobe.com', tags: ['Photo', 'Pro'], rating: 4.9 },
      { rank: 2, name: 'Canva', logo: 'CV', summary: 'Accessible design platform for social graphics, presentations, and marketing assets.', bestFor: 'Social design', pricing: 'Free / $15 mo', badge: 'external', url: 'https://canva.com', tags: ['Design', 'Social'], rating: 4.8 },
      { rank: 3, name: 'Multiverse Image Tools', logo: 'MV', summary: 'Browser tools for resizing, compressing, converting, and preparing images.', bestFor: 'Quick edits', pricing: 'Free', badge: 'internal', url: '/tools/image', tags: ['Image', 'Free'], rating: 4.7 },
      { rank: 4, name: 'Pixlr', logo: 'PX', summary: 'Online photo editor with practical enhancement and AI-assisted editing tools.', bestFor: 'Free editing', pricing: 'Free / $5 mo', badge: 'external', url: 'https://pixlr.com', tags: ['Photo', 'Free'], rating: 4.5 },
      { rank: 5, name: 'Fotor', logo: 'FO', summary: 'Photo editing product for enhancement, design templates, and lightweight AI edits.', bestFor: 'AI enhancement', pricing: 'Free / $9 mo', badge: 'external', url: 'https://fotor.com', tags: ['Photo', 'AI'], rating: 4.4 },
      { rank: 6, name: 'GIMP', logo: 'GI', summary: 'Open-source image editor with advanced image manipulation capabilities.', bestFor: 'Advanced editing', pricing: 'Free', badge: 'external', url: 'https://gimp.org', tags: ['Photo', 'Open Source'], rating: 4.4 },
      { rank: 7, name: 'Remove.bg', logo: 'RB', summary: 'Background removal tool for product imagery and quick visual cleanup.', bestFor: 'Background removal', pricing: 'Free / $9 mo', badge: 'external', url: 'https://remove.bg', tags: ['AI', 'Background'], rating: 4.6 },
      { rank: 8, name: 'Lightroom', logo: 'LR', summary: 'Photography workflow platform for editing, presets, and image organization.', bestFor: 'Photography', pricing: '$10 mo', badge: 'external', url: 'https://adobe.com/lightroom', tags: ['Photo', 'Pro'], rating: 4.7 },
      { rank: 9, name: 'Photopea', logo: 'PP', summary: 'Browser-based editor with a familiar workflow for advanced image tasks.', bestFor: 'Free advanced editing', pricing: 'Free', badge: 'external', url: 'https://photopea.com', tags: ['Photo', 'Free'], rating: 4.5 },
      { rank: 10, name: 'Snapseed', logo: 'SN', summary: "Google's mobile editor for filters, tuning, and selective photo adjustments.", bestFor: 'Mobile editing', pricing: 'Free', badge: 'external', url: 'https://snapseed.online', tags: ['Mobile', 'Free'], rating: 4.5 },
    ],
  },
  {
    id: 'top-dev-tools',
    title: 'Top Developer Tools',
    description: 'Commonly used products for coding, deployment, planning, and engineering workflows.',
    category: 'Developer',
    slug: 'top-developer-tools',
    icon: 'Code2',
    itemCount: 10,
    updatedAt: '2025-12-05',
    featured: true,
    items: [
      { rank: 1, name: 'VS Code', logo: 'VS', summary: "Microsoft's editor for web, backend, and scripting workflows.", bestFor: 'Code editing', pricing: 'Free', badge: 'external', url: 'https://code.visualstudio.com', tags: ['IDE', 'Free'], rating: 4.9 },
      { rank: 2, name: 'GitHub Copilot', logo: 'GC', summary: 'AI-assisted code completion and chat inside the development workflow.', bestFor: 'AI coding', pricing: '$10 mo', badge: 'external', url: 'https://copilot.github.com', tags: ['AI', 'Coding'], rating: 4.8 },
      { rank: 3, name: 'Multiverse Dev Tools', logo: 'MV', summary: 'Developer utilities for JSON, Base64, regex, and quick formatting tasks.', bestFor: 'Quick development tasks', pricing: 'Free', badge: 'internal', url: '/dev', tags: ['Dev', 'Free'], rating: 4.7 },
      { rank: 4, name: 'Postman', logo: 'PM', summary: 'API platform for testing, collections, and team collaboration.', bestFor: 'API testing', pricing: 'Free / $12 mo', badge: 'external', url: 'https://postman.com', tags: ['API', 'Testing'], rating: 4.8 },
      { rank: 5, name: 'Vercel', logo: 'VC', summary: 'Deployment platform designed for modern frontend applications.', bestFor: 'Deployment', pricing: 'Free / $20 mo', badge: 'external', url: 'https://vercel.com', tags: ['Deploy', 'Hosting'], rating: 4.8 },
      { rank: 6, name: 'Figma', logo: 'FG', summary: 'Collaborative interface design and prototyping platform.', bestFor: 'UI design', pricing: 'Free / $15 mo', badge: 'external', url: 'https://figma.com', tags: ['Design', 'UI'], rating: 4.8 },
      { rank: 7, name: 'Supabase', logo: 'SB', summary: 'Backend platform for database, auth, and storage services.', bestFor: 'Backend and database', pricing: 'Free / $25 mo', badge: 'external', url: 'https://supabase.com', tags: ['Database', 'Backend'], rating: 4.7 },
      { rank: 8, name: 'Notion', logo: 'NT', summary: 'Workspace for notes, team docs, and internal planning.', bestFor: 'Documentation', pricing: 'Free / $8 mo', badge: 'external', url: 'https://notion.so', tags: ['Docs', 'Notes'], rating: 4.6 },
      { rank: 9, name: 'Linear', logo: 'LN', summary: 'Issue tracking and planning product built for modern engineering teams.', bestFor: 'Project management', pricing: 'Free / $8 mo', badge: 'external', url: 'https://linear.app', tags: ['PM', 'Issues'], rating: 4.7 },
      { rank: 10, name: 'Warp', logo: 'WP', summary: 'Modern terminal product with built-in AI and productivity features.', bestFor: 'Terminal', pricing: 'Free / $15 mo', badge: 'external', url: 'https://warp.dev', tags: ['Terminal', 'AI'], rating: 4.6 },
    ],
  },
  {
    id: 'top-learning-tools',
    title: 'Top Learning Tools',
    description: 'Useful products for study, research, writing, and academic work.',
    category: 'Education',
    slug: 'top-learning-tools',
    icon: 'GraduationCap',
    itemCount: 10,
    updatedAt: '2025-11-20',
    items: [
      { rank: 1, name: 'Notion', logo: 'NT', summary: 'Flexible workspace for notes, planning, and class organization.', bestFor: 'Notes and planning', pricing: 'Free', badge: 'external', url: 'https://notion.so', tags: ['Notes', 'Free'], rating: 4.8 },
      { rank: 2, name: 'Multiverse Learn', logo: 'MV', summary: 'Study tools for summarizing, note generation, and guided learning support.', bestFor: 'AI study support', pricing: 'Free', badge: 'internal', url: '/learn', tags: ['Study', 'AI'], rating: 4.7 },
      { rank: 3, name: 'Grammarly', logo: 'GR', summary: 'Writing assistant for grammar, tone, and clarity improvements.', bestFor: 'Writing', pricing: 'Free / $12 mo', badge: 'external', url: 'https://grammarly.com', tags: ['Writing', 'AI'], rating: 4.7 },
      { rank: 4, name: 'Anki', logo: 'AK', summary: 'Flashcard platform built around spaced repetition for memory retention.', bestFor: 'Memorization', pricing: 'Free', badge: 'external', url: 'https://apps.ankiweb.net', tags: ['Flashcards', 'Free'], rating: 4.8 },
      { rank: 5, name: 'Khan Academy', logo: 'KA', summary: 'Free educational content across foundational school and test subjects.', bestFor: 'Learning', pricing: 'Free', badge: 'external', url: 'https://khanacademy.org', tags: ['Education', 'Free'], rating: 4.8 },
      { rank: 6, name: 'Zotero', logo: 'ZT', summary: 'Reference manager for research, citations, and source collection.', bestFor: 'Research', pricing: 'Free', badge: 'external', url: 'https://zotero.org', tags: ['Research', 'Free'], rating: 4.6 },
      { rank: 7, name: 'Wolfram Alpha', logo: 'WA', summary: 'Computational engine for mathematics, science, and technical problem solving.', bestFor: 'Math and science', pricing: 'Free / $5 mo', badge: 'external', url: 'https://wolframalpha.com', tags: ['Math', 'Science'], rating: 4.7 },
      { rank: 8, name: 'Quizlet', logo: 'QZ', summary: 'Study set product with review modes and memorization support.', bestFor: 'Quizzes', pricing: 'Free / $8 mo', badge: 'external', url: 'https://quizlet.com', tags: ['Quiz', 'Study'], rating: 4.5 },
      { rank: 9, name: 'Overleaf', logo: 'OL', summary: 'Collaborative LaTeX editor for academic writing and technical papers.', bestFor: 'Academic writing', pricing: 'Free / $19 mo', badge: 'external', url: 'https://overleaf.com', tags: ['LaTeX', 'Academic'], rating: 4.6 },
      { rank: 10, name: 'ChatGPT', logo: 'CG', summary: 'General-purpose AI assistant for explanation, drafting, and tutoring support.', bestFor: 'AI assistance', pricing: 'Free / $20 mo', badge: 'external', url: 'https://chat.openai.com', tags: ['AI', 'Tutor'], rating: 4.7 },
    ],
  },
]
