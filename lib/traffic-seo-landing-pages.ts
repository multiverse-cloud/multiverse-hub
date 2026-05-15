import type { SeoLandingPageData } from '@/lib/seo-landing-pages'

type ClusterConfig = {
  slug: string
  title: string
  h1: string
  eyebrow: string
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  stats: Array<{ label: string; value: string }>
  sections: SeoLandingPageData['sections']
  useCases: string[]
  faqs: SeoLandingPageData['faqs']
  related: SeoLandingPageData['related']
}

function page(config: ClusterConfig): SeoLandingPageData {
  return {
    slug: config.slug,
    title: config.title,
    h1: config.h1,
    eyebrow: config.eyebrow,
    description: config.description,
    metaTitle: config.metaTitle,
    metaDescription: config.metaDescription,
    keywords: config.keywords,
    primaryCta: config.primary,
    secondaryCta: config.secondary,
    stats: config.stats,
    sections: config.sections,
    useCases: config.useCases,
    faqs: config.faqs,
    related: config.related,
  }
}

function toolPage(config: {
  slug: string
  title: string
  h1: string
  toolName: string
  toolHref: string
  categoryHref: string
  job: string
  keywords: string[]
  extraLinks?: SeoLandingPageData['sections'][number]['links']
}) {
  return page({
    slug: config.slug,
    title: config.title,
    h1: config.h1,
    eyebrow: 'Free online tool',
    description: `${config.job} Use the related mtverse tool without sign-in, then move into adjacent PDF, image, text, developer, and SEO utilities from one clean workspace.`,
    metaTitle: `${config.title} | Free Online Tool | mtverse`,
    metaDescription: `${config.job} Open a free, mobile-friendly ${config.toolName} workflow on mtverse with no public account required.`,
    keywords: config.keywords,
    primary: { label: `Open ${config.toolName}`, href: config.toolHref },
    secondary: { label: 'Browse related tools', href: config.categoryHref },
    stats: [
      { label: 'Access', value: 'Free' },
      { label: 'Sign-in', value: 'No' },
      { label: 'Mobile', value: 'Ready' },
    ],
    sections: [
      {
        title: `Use ${config.toolName} for the exact task`,
        body: `${config.title} is built for people who search with a clear job to finish. The page links directly to the live tool and nearby utilities so visitors can complete the task quickly.`,
        links: [
          { label: config.toolName, href: config.toolHref, note: config.job },
          { label: 'All free tools', href: '/free-tools', note: 'Browse the broader mtverse utility library.' },
          ...(config.extraLinks || []),
        ],
      },
      {
        title: 'Related workflows',
        body: 'Most file, text, and developer tasks happen in small chains. Use the next link when you need to compress, convert, inspect, format, or publish the result.',
        links: [
          { label: 'Image tools', href: '/free-image-tools', note: 'Compress, resize, convert, and prepare images.' },
          { label: 'PDF tools', href: '/free-pdf-tools', note: 'Merge, split, compress, and convert PDFs.' },
          { label: 'Developer tools', href: '/free-developer-tools', note: 'Format JSON, encode strings, generate hashes, and test snippets.' },
          { label: 'SEO tools', href: '/free-seo-tools', note: 'Prepare metadata, sitemap files, and SERP previews.' },
        ],
      },
    ],
    useCases: [
      'Finish a specific file or text task from search.',
      'Use the live tool without installing software.',
      'Move to related utilities from the same workspace.',
      'Work from mobile or desktop with the same URL.',
    ],
    faqs: [
      {
        question: `Is ${config.toolName} free?`,
        answer: `Yes. The public ${config.toolName} workflow on mtverse is free to open and does not require a public account.`,
      },
      {
        question: 'Do I need to install an app?',
        answer: 'No. The workflow is designed for browser use, with lightweight server processing only where the tool requires it.',
      },
      {
        question: 'What should I use after this tool?',
        answer: 'Use the related tools on the page for common next steps such as compressing, formatting, converting, checking, or publishing your result.',
      },
    ],
    related: [
      { label: 'Free tools', href: '/free-tools' },
      { label: 'Free image tools', href: '/free-image-tools' },
      { label: 'Free PDF tools', href: '/free-pdf-tools' },
      { label: 'Free developer tools', href: '/free-developer-tools' },
    ],
  })
}

function promptPage(config: {
  slug: string
  title: string
  h1: string
  collectionHref: string
  intent: string
  keywords: string[]
}) {
  return page({
    slug: config.slug,
    title: config.title,
    h1: config.h1,
    eyebrow: 'Free AI prompts',
    description: `${config.intent} Browse copy-ready prompt ideas, adapt the subject and style safely, and jump into related prompt collections without login.`,
    metaTitle: `${config.title} | Free AI Prompt Collection | mtverse`,
    metaDescription: `${config.intent} Explore free copy-ready AI prompts on mtverse for image generation, editing, ChatGPT workflows, and social visuals.`,
    keywords: config.keywords,
    primary: { label: 'Browse prompts', href: config.collectionHref },
    secondary: { label: 'Open Prompt Hub', href: '/prompts' },
    stats: [
      { label: 'Copy-ready', value: 'Yes' },
      { label: 'Access', value: 'Free' },
      { label: 'Prompt hub', value: '1k+' },
    ],
    sections: [
      {
        title: 'Prompt ideas for real search intent',
        body: 'Each prompt page points to a focused collection instead of a random feed. Use the collection to find variants, then refine the subject, scene, camera, tone, and output format.',
        links: [
          { label: config.title, href: config.collectionHref, note: config.intent },
          { label: 'Free AI prompts', href: '/free-ai-prompts', note: 'Open the main AI prompt landing page.' },
          { label: 'Prompt Hub', href: '/prompts', note: 'Search all prompt categories and visual examples.' },
        ],
      },
      {
        title: 'Related prompt clusters',
        body: 'Google traffic grows when visitors can move between adjacent intent pages. These links connect image prompts, photo edits, social prompt ideas, and writing workflows.',
        links: [
          { label: 'ChatGPT prompts', href: '/prompts/collections/free-chatgpt-prompts', note: 'Writing, planning, coding, and productivity prompts.' },
          { label: 'AI image prompts', href: '/prompts/collections/free-ai-image-prompts', note: 'Visual prompts for portraits, products, posters, and concepts.' },
          { label: 'AI photo editing prompts', href: '/prompts/collections/ai-photo-editing-prompts', note: 'Retouching, relighting, background, and transformation prompts.' },
          { label: 'Viral AI prompts', href: '/prompts/collections/viral-ai-prompts', note: 'Trend-focused prompts for social experiments.' },
        ],
      },
    ],
    useCases: [
      'Find a prompt from search and copy it quickly.',
      'Adapt prompts for safe public image workflows.',
      'Explore adjacent prompt categories from one hub.',
      'Use free prompt pages as evergreen discovery content.',
    ],
    faqs: [
      {
        question: 'Are these AI prompts free?',
        answer: 'Yes. mtverse prompt pages are free to browse and copy without a public account.',
      },
      {
        question: 'Can I edit the prompt before using it?',
        answer: 'Yes. Replace subject, style, camera, tone, platform, and output format to match your goal.',
      },
      {
        question: 'Which AI tools can use these prompts?',
        answer: 'Most prompts can be adapted for ChatGPT, Gemini, Midjourney, Flux, and other image or text generation tools.',
      },
    ],
    related: [
      { label: 'Free AI prompts', href: '/free-ai-prompts' },
      { label: 'Prompt Hub', href: '/prompts' },
      { label: 'Free templates', href: '/free-website-templates' },
    ],
  })
}

function templatePage(config: {
  slug: string
  title: string
  h1: string
  query: string
  intent: string
  keywords: string[]
}) {
  return page({
    slug: config.slug,
    title: config.title,
    h1: config.h1,
    eyebrow: 'Free website templates',
    description: `${config.intent} Preview templates, compare layouts, and use download/live-preview links from the mtverse template universe.`,
    metaTitle: `${config.title} | Free Website Templates | mtverse`,
    metaDescription: `${config.intent} Browse free website templates on mtverse with previews, related templates, and code/download paths for fast launches.`,
    keywords: config.keywords,
    primary: { label: 'Browse templates', href: `/templates?q=${config.query}` },
    secondary: { label: 'Template library', href: '/templates' },
    stats: [
      { label: 'Preview', value: 'Live' },
      { label: 'Access', value: 'Free' },
      { label: 'Types', value: '100+' },
    ],
    sections: [
      {
        title: `${config.title} for faster launches`,
        body: 'A focused template landing page helps searchers reach the correct template type without browsing every category manually.',
        links: [
          { label: config.title, href: `/templates?q=${config.query}`, note: config.intent },
          { label: 'All website templates', href: '/free-website-templates', note: 'Open the main template SEO hub.' },
          { label: 'UI components', href: '/free-ui-components', note: 'Pair templates with smaller interface pieces.' },
        ],
      },
      {
        title: 'Related template categories',
        body: 'Most projects need more than one page. Use related template categories to compare portfolios, landing pages, dashboards, SaaS pages, and ecommerce layouts.',
        links: [
          { label: 'Portfolio templates', href: '/free-portfolio-templates', note: 'Personal sites and creative profile layouts.' },
          { label: 'SaaS templates', href: '/free-saas-templates', note: 'Startup, software, and product marketing pages.' },
          { label: 'Landing page templates', href: '/free-landing-page-templates', note: 'Launch pages and conversion-focused sections.' },
          { label: 'Dashboard templates', href: '/free-dashboard-templates', note: 'Admin, analytics, and product UI layouts.' },
        ],
      },
    ],
    useCases: [
      'Start with a template instead of a blank page.',
      'Compare layouts before downloading code.',
      'Use templates for SEO, startup, portfolio, and product pages.',
      'Combine templates with UI components from the library.',
    ],
    faqs: [
      {
        question: `Are ${config.title.toLowerCase()} free?`,
        answer: 'The mtverse template universe is built around free public preview and download workflows.',
      },
      {
        question: 'Can I preview templates first?',
        answer: 'Yes. Template pages include previews and related templates so you can compare before choosing.',
      },
      {
        question: 'Can I use a template for a real project?',
        answer: 'Use the template detail page to check the available download/source links and adapt the code for your project.',
      },
    ],
    related: [
      { label: 'Free website templates', href: '/free-website-templates' },
      { label: 'Free UI components', href: '/free-ui-components' },
      { label: 'Template library', href: '/templates' },
    ],
  })
}

function hashPage(config: {
  slug: string
  title: string
  h1: string
  intent: string
  keywords: string[]
}) {
  return toolPage({
    slug: config.slug,
    title: config.title,
    h1: config.h1,
    toolName: 'File Hash Checker',
    toolHref: '/tools/file/file-hash-checker',
    categoryHref: '/tools/file',
    job: config.intent,
    keywords: config.keywords,
    extraLinks: [
      { label: 'SHA-256 checker', href: '/sha256-checker', note: 'Verify SHA-256 checksums from a browser.' },
      { label: 'MD5 checker', href: '/md5-checker', note: 'Check MD5 values for legacy checksum workflows.' },
      { label: 'Checksum checker', href: '/checksum-checker', note: 'Compare downloaded file checksums safely.' },
    ],
  })
}

export const TRAFFIC_SEO_LANDING_PAGES: SeoLandingPageData[] = [
  hashPage({
    slug: 'hash-file',
    title: 'Hash File',
    h1: 'Hash file online with SHA-256, SHA-512, SHA-1, or MD5',
    intent: 'Generate a hash for a file and compare checksums for downloads, software files, archives, and document verification.',
    keywords: ['hash file', 'file hash', 'hash file online', 'generate file hash', 'file checksum'],
  }),
  hashPage({
    slug: 'file-hash-checker',
    title: 'File Hash Checker',
    h1: 'File hash checker for SHA-256, SHA-512, SHA-1, and MD5',
    intent: 'Check a file hash against a known checksum and verify whether a downloaded file matches the expected value.',
    keywords: ['file hash checker', 'check file hash', 'file checksum checker', 'SHA256 file checker', 'MD5 file checker'],
  }),
  hashPage({
    slug: 'file-hasher',
    title: 'File Hasher',
    h1: 'File hasher online for quick checksum generation',
    intent: 'Create file hashes in the browser for verification, support tickets, software releases, and archive integrity checks.',
    keywords: ['file hasher', 'online file hasher', 'file hash generator', 'checksum generator', 'hash generator'],
  }),
  hashPage({
    slug: 'hash-check-online',
    title: 'Hash Check Online',
    h1: 'Hash check online for downloaded files',
    intent: 'Compare a hash value online and confirm whether your file matches the checksum published by a trusted source.',
    keywords: ['hash check online', 'online hash checker', 'check hash online', 'file hash check', 'verify checksum online'],
  }),
  hashPage({
    slug: 'check-file-hash',
    title: 'Check File Hash',
    h1: 'Check file hash online before using a download',
    intent: 'Verify file integrity by checking SHA-256, SHA-512, SHA-1, or MD5 values before opening or sharing downloads.',
    keywords: ['check file hash', 'check hash of file', 'verify file hash', 'file integrity checker', 'checksum verify'],
  }),
  hashPage({
    slug: 'md5-checker',
    title: 'MD5 Checker',
    h1: 'MD5 checker online for legacy file checksums',
    intent: 'Check or generate MD5 hashes for legacy checksum workflows while keeping stronger SHA options nearby.',
    keywords: ['MD5 checker', 'MD5 file checker', 'check MD5 hash', 'MD5 checksum checker', 'MD5 online'],
  }),
  hashPage({
    slug: 'sha256-checker',
    title: 'SHA256 Checker',
    h1: 'SHA256 checker online for secure file verification',
    intent: 'Generate or compare SHA-256 hashes for downloaded files, releases, archives, and security-sensitive file checks.',
    keywords: ['SHA256 checker', 'SHA-256 checker', 'SHA256 file checker', 'check SHA256 hash', 'SHA256 checksum'],
  }),
  hashPage({
    slug: 'checksum-checker',
    title: 'Checksum Checker',
    h1: 'Checksum checker online for files and downloads',
    intent: 'Use a checksum checker to verify file integrity across SHA-256, SHA-512, SHA-1, and MD5 workflows.',
    keywords: ['checksum checker', 'file checksum checker', 'verify checksum', 'checksum online', 'download checksum checker'],
  }),
  toolPage({
    slug: 'compress-image-to-100kb',
    title: 'Compress Image to 100KB',
    h1: 'Compress image to 100KB online for free',
    toolName: 'Compress Image',
    toolHref: '/tools/image/compress-image',
    categoryHref: '/tools/image',
    job: 'Reduce JPG, PNG, or WebP image size for forms, uploads, email, and web publishing.',
    keywords: ['compress image to 100KB', 'compress image online', 'reduce image size', 'free image compressor'],
  }),
  toolPage({
    slug: 'compress-jpg-online',
    title: 'Compress JPG Online',
    h1: 'Compress JPG online without signup',
    toolName: 'Compress Image',
    toolHref: '/tools/image/compress-image',
    categoryHref: '/tools/image',
    job: 'Make JPG photos smaller while keeping them usable for websites, documents, forms, and sharing.',
    keywords: ['compress JPG online', 'JPG compressor', 'reduce JPG size', 'free JPG compressor'],
  }),
  toolPage({
    slug: 'compress-png-online',
    title: 'Compress PNG Online',
    h1: 'Compress PNG online for faster uploads',
    toolName: 'Compress Image',
    toolHref: '/tools/image/compress-image',
    categoryHref: '/tools/image',
    job: 'Shrink PNG images for websites, app assets, documentation, and upload forms from one browser page.',
    keywords: ['compress PNG online', 'PNG compressor', 'reduce PNG size', 'free PNG compressor'],
  }),
  toolPage({
    slug: 'resize-image-online',
    title: 'Resize Image Online',
    h1: 'Resize images online for social, web, and documents',
    toolName: 'Resize Image',
    toolHref: '/tools/image/resize-image',
    categoryHref: '/tools/image',
    job: 'Resize images for profile photos, social posts, thumbnails, website assets, and document uploads.',
    keywords: ['resize image online', 'image resizer', 'resize photo online', 'free image resize tool'],
  }),
  toolPage({
    slug: 'merge-pdf-online',
    title: 'Merge PDF Online',
    h1: 'Merge PDF files online for free',
    toolName: 'Merge PDF',
    toolHref: '/tools/pdf/merge-pdf',
    categoryHref: '/tools/pdf',
    job: 'Combine multiple PDF files into one document for forms, reports, invoices, and school or office work.',
    keywords: ['merge PDF online', 'combine PDF files', 'free PDF merger', 'merge PDF files online'],
  }),
  toolPage({
    slug: 'compress-pdf-online',
    title: 'Compress PDF Online',
    h1: 'Compress PDF online for email and uploads',
    toolName: 'Compress PDF',
    toolHref: '/tools/pdf/compress-pdf',
    categoryHref: '/tools/pdf',
    job: 'Reduce PDF file size so documents are easier to email, upload, archive, and share.',
    keywords: ['compress PDF online', 'reduce PDF size', 'free PDF compressor', 'compress PDF for email'],
  }),
  toolPage({
    slug: 'split-pdf-online',
    title: 'Split PDF Online',
    h1: 'Split PDF pages online for free',
    toolName: 'Split PDF',
    toolHref: '/tools/pdf/split-pdf',
    categoryHref: '/tools/pdf',
    job: 'Extract pages from PDFs and create smaller files for forms, chapters, invoices, or selected pages.',
    keywords: ['split PDF online', 'extract PDF pages', 'free PDF splitter', 'separate PDF pages'],
  }),
  toolPage({
    slug: 'word-counter-online',
    title: 'Word Counter Online',
    h1: 'Word counter online for writing and SEO',
    toolName: 'Word Counter',
    toolHref: '/tools/text/word-counter',
    categoryHref: '/tools/text',
    job: 'Count words, characters, paragraphs, sentences, and reading time for essays, posts, descriptions, and SEO copy.',
    keywords: ['word counter online', 'character counter', 'reading time calculator', 'free word counter'],
  }),
  toolPage({
    slug: 'json-formatter-online',
    title: 'JSON Formatter Online',
    h1: 'JSON formatter online for clean readable data',
    toolName: 'JSON Formatter',
    toolHref: '/tools/dev/json-formatter',
    categoryHref: '/tools/dev',
    job: 'Format, inspect, and clean JSON data for APIs, configs, debugging, and developer documentation.',
    keywords: ['JSON formatter online', 'format JSON', 'JSON beautifier', 'free JSON formatter'],
  }),
  toolPage({
    slug: 'base64-encoder-online',
    title: 'Base64 Encoder Online',
    h1: 'Base64 encoder and decoder online',
    toolName: 'Base64 Encoder/Decoder',
    toolHref: '/tools/dev/base64-encoder-decoder',
    categoryHref: '/tools/dev',
    job: 'Encode and decode Base64 strings for API testing, config values, tokens, and quick developer checks.',
    keywords: ['Base64 encoder online', 'Base64 decoder', 'encode Base64', 'decode Base64'],
  }),
  promptPage({
    slug: 'free-chatgpt-image-prompts',
    title: 'Free ChatGPT Image Prompts',
    h1: 'Free ChatGPT image prompts for visual ideas',
    collectionHref: '/prompts/collections/chatgpt-image-prompts',
    intent: 'Find free ChatGPT image prompts for portraits, posters, products, social posts, and creative visual workflows.',
    keywords: ['free ChatGPT image prompts', 'ChatGPT image prompt', 'AI image prompt for ChatGPT', 'free image prompts'],
  }),
  promptPage({
    slug: 'free-instagram-ai-prompts',
    title: 'Free Instagram AI Prompts',
    h1: 'Free Instagram AI prompts for viral visuals',
    collectionHref: '/prompts/collections/instagram-ai-photo-prompts',
    intent: 'Find Instagram-style AI prompts for profile photos, edits, social visuals, lifestyle posts, and creative experiments.',
    keywords: ['Instagram AI prompts', 'free Instagram prompts', 'AI photo prompt for Instagram', 'viral photo prompt'],
  }),
  promptPage({
    slug: 'free-midjourney-prompts-for-portraits',
    title: 'Free Midjourney Portrait Prompts',
    h1: 'Free Midjourney prompts for portraits',
    collectionHref: '/prompts/collections/midjourney-prompts',
    intent: 'Browse Midjourney portrait prompt structures with lighting, camera, style, and composition cues.',
    keywords: ['free Midjourney portrait prompts', 'Midjourney prompts', 'portrait AI prompts', 'cinematic portrait prompts'],
  }),
  promptPage({
    slug: 'free-nano-banana-prompts',
    title: 'Free Nano Banana Prompts',
    h1: 'Free Nano Banana style prompts',
    collectionHref: '/prompts/collections/nano-banana-prompts',
    intent: 'Explore Nano Banana style visual prompts, image ideas, and copy-ready trend concepts.',
    keywords: ['free Nano Banana prompts', 'Nano Banana prompts', 'viral AI prompt trends', 'AI image prompt trends'],
  }),
  promptPage({
    slug: 'free-ai-photo-editing-prompts',
    title: 'Free AI Photo Editing Prompts',
    h1: 'Free AI photo editing prompts for clean edits',
    collectionHref: '/prompts/collections/ai-photo-editing-prompts',
    intent: 'Copy AI photo editing prompts for retouching, relighting, background edits, restoration, and social-ready transformations.',
    keywords: ['free AI photo editing prompts', 'AI photo edit prompt', 'photo editing prompt', 'Gemini photo prompt'],
  }),
  promptPage({
    slug: 'ai-couple-photo-prompts',
    title: 'AI Couple Photo Prompts',
    h1: 'AI couple photo prompts for creative edits',
    collectionHref: '/prompts/collections/free-ai-image-prompts',
    intent: 'Find couple photo prompt ideas for cinematic, romantic, lifestyle, and social-ready AI image concepts.',
    keywords: ['AI couple photo prompts', 'couple AI image prompt', 'romantic AI photo prompt', 'free couple prompts'],
  }),
  promptPage({
    slug: 'ai-saree-photo-prompts',
    title: 'AI Saree Photo Prompts',
    h1: 'AI saree photo prompts for cultural portraits',
    collectionHref: '/prompts/collections/celebrity-style-fashion-prompts',
    intent: 'Browse saree-inspired AI fashion portrait prompts with respectful styling, lighting, and cultural detail cues.',
    keywords: ['AI saree photo prompts', 'saree AI prompt', 'Indian fashion AI prompt', 'cultural portrait prompts'],
  }),
  promptPage({
    slug: 'ai-linkedin-headshot-prompts',
    title: 'AI LinkedIn Headshot Prompts',
    h1: 'AI LinkedIn headshot prompts for professional photos',
    collectionHref: '/prompts/collections/free-ai-image-prompts',
    intent: 'Use professional AI headshot prompts for LinkedIn, resumes, creator profiles, and personal branding visuals.',
    keywords: ['AI LinkedIn headshot prompts', 'professional headshot prompt', 'AI profile photo prompt', 'LinkedIn AI photo prompt'],
  }),
  promptPage({
    slug: 'ai-product-photo-prompts',
    title: 'AI Product Photo Prompts',
    h1: 'AI product photo prompts for ecommerce visuals',
    collectionHref: '/prompts/collections/free-ai-image-prompts',
    intent: 'Find product photography prompt ideas for ecommerce, ads, marketplaces, launch pages, and social posts.',
    keywords: ['AI product photo prompts', 'product photography prompt', 'ecommerce AI image prompt', 'free product prompts'],
  }),
  promptPage({
    slug: 'viral-ai-image-prompts',
    title: 'Viral AI Image Prompts',
    h1: 'Viral AI image prompts to test trending ideas',
    collectionHref: '/prompts/collections/viral-ai-prompts',
    intent: 'Explore viral AI image prompts for social experiments, creative edits, cinematic posts, and visual trend testing.',
    keywords: ['viral AI image prompts', 'trending AI prompts', 'free viral prompts', 'AI image trend prompts'],
  }),
  templatePage({
    slug: 'free-portfolio-templates',
    title: 'Free Portfolio Templates',
    h1: 'Free portfolio templates for developers and creators',
    query: 'portfolio',
    intent: 'Find free portfolio templates for developers, designers, photographers, creators, and personal brand websites.',
    keywords: ['free portfolio templates', 'developer portfolio template', 'personal website template', 'portfolio website template'],
  }),
  templatePage({
    slug: 'free-saas-templates',
    title: 'Free SaaS Templates',
    h1: 'Free SaaS website templates for startups',
    query: 'saas',
    intent: 'Browse free SaaS website templates for software products, startup landing pages, feature sections, and pricing pages.',
    keywords: ['free SaaS templates', 'SaaS landing page template', 'startup website template', 'software website template'],
  }),
  templatePage({
    slug: 'free-landing-page-templates',
    title: 'Free Landing Page Templates',
    h1: 'Free landing page templates for launches',
    query: 'landing',
    intent: 'Find free landing page templates for products, waitlists, creators, agencies, campaigns, and startup launches.',
    keywords: ['free landing page templates', 'landing page template', 'startup landing page', 'product launch template'],
  }),
  templatePage({
    slug: 'free-dashboard-templates',
    title: 'Free Dashboard Templates',
    h1: 'Free dashboard templates for admin and analytics UI',
    query: 'dashboard',
    intent: 'Browse free dashboard templates for admin panels, analytics, SaaS apps, data products, and internal tools.',
    keywords: ['free dashboard templates', 'admin dashboard template', 'analytics dashboard template', 'SaaS dashboard UI'],
  }),
  templatePage({
    slug: 'free-ecommerce-templates',
    title: 'Free Ecommerce Templates',
    h1: 'Free ecommerce templates for online stores',
    query: 'ecommerce',
    intent: 'Find free ecommerce templates for product pages, storefronts, collections, fashion shops, and marketplace-style layouts.',
    keywords: ['free ecommerce templates', 'online store template', 'product page template', 'ecommerce website template'],
  }),
]
