import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/site-url'

export type SeoLandingSlug =
  | 'free-tools'
  | 'free-ai-prompts'
  | 'free-website-templates'
  | 'free-ui-components'
  | 'free-pdf-tools'
  | 'free-image-tools'
  | 'free-developer-tools'
  | 'free-seo-tools'

export type SeoLandingPageData = {
  slug: SeoLandingSlug
  title: string
  h1: string
  eyebrow: string
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  stats: Array<{ label: string; value: string }>
  sections: Array<{
    title: string
    body: string
    links: Array<{ label: string; href: string; note: string }>
  }>
  useCases: string[]
  faqs: Array<{ question: string; answer: string }>
  related: Array<{ label: string; href: string }>
}

export const SEO_LANDING_PAGES: SeoLandingPageData[] = [
  {
    slug: 'free-tools',
    title: 'Free Tools',
    h1: 'Free online tools for everyday work',
    eyebrow: 'Free tools hub',
    description:
      'Use fast browser-first tools for PDFs, images, text, developer utilities, calculators, and SEO checks without creating an account.',
    metaTitle: 'Free Tools - Online PDF, Image, Text, Developer & SEO Tools | mtverse',
    metaDescription:
      'Use free online tools for PDF, image, text, developer, calculator, and SEO workflows. No signup required, mobile-friendly, and built for quick everyday tasks.',
    keywords: ['free tools', 'free online tools', 'online utilities', 'PDF tools', 'image tools', 'developer tools', 'SEO tools'],
    primaryCta: { label: 'Explore all tools', href: '/tools' },
    secondaryCta: { label: 'Search mtverse', href: '/search' },
    stats: [
      { label: 'Tool categories', value: '9+' },
      { label: 'Public access', value: 'No login' },
      { label: 'Mobile ready', value: 'Yes' },
    ],
    sections: [
      {
        title: 'Most-used free tools',
        body: 'Start with the practical utilities people search for every day: PDF cleanup, image optimization, text analysis, and developer formatting.',
        links: [
          { label: 'Merge PDF', href: '/tools/pdf/merge-pdf', note: 'Combine pages into one file.' },
          { label: 'Compress Image', href: '/tools/image/compress-image', note: 'Reduce image size for web and sharing.' },
          { label: 'Word Counter', href: '/tools/text/word-counter', note: 'Count words, characters, and reading time.' },
          { label: 'JSON Formatter', href: '/tools/dev/json-formatter', note: 'Format and validate JSON quickly.' },
        ],
      },
      {
        title: 'Browse by workflow',
        body: 'Each category has a focused landing page, related tools, and clear task intent so visitors can move from search to result faster.',
        links: [
          { label: 'PDF tools', href: '/tools/pdf', note: 'Merge, split, compress, convert, and protect PDFs.' },
          { label: 'Image tools', href: '/tools/image', note: 'Resize, crop, compress, convert, and generate image assets.' },
          { label: 'Developer tools', href: '/tools/dev', note: 'JSON, Base64, hashes, UUIDs, and code helpers.' },
          { label: 'SEO tools', href: '/tools/seo', note: 'Meta tags, robots.txt, sitemap, and SERP checks.' },
        ],
      },
    ],
    useCases: [
      'Prepare files before email or upload.',
      'Clean text, code, and metadata before publishing.',
      'Run quick daily calculations without installing apps.',
      'Use mobile-friendly tools from any browser.',
    ],
    faqs: [
      {
        question: 'Are mtverse tools free?',
        answer: 'Yes. Public tools on mtverse are free to use and do not require a public account.',
      },
      {
        question: 'Do I need to install anything?',
        answer: 'No. The tools run in the browser or through lightweight server routes where needed.',
      },
      {
        question: 'Which free tools should I try first?',
        answer: 'Popular starting points are Merge PDF, Compress PDF, Compress Image, Word Counter, JSON Formatter, and QR Code Generator.',
      },
    ],
    related: [
      { label: 'Free PDF tools', href: '/free-pdf-tools' },
      { label: 'Free image tools', href: '/free-image-tools' },
      { label: 'Free developer tools', href: '/free-developer-tools' },
    ],
  },
  {
    slug: 'free-ai-prompts',
    title: 'Free AI Prompts',
    h1: 'Free AI prompts for images, writing, and workflows',
    eyebrow: 'Prompt discovery',
    description:
      'Browse copy-ready AI prompts for ChatGPT, image generation, editing, product visuals, social posts, and creative workflows.',
    metaTitle: 'Free AI Prompts - ChatGPT, Image, Nano Banana & Creative Prompts | mtverse',
    metaDescription:
      'Explore free AI prompts for ChatGPT, AI images, photo editing, Nano Banana-style trends, product visuals, writing, and creative workflows.',
    keywords: ['free AI prompts', 'ChatGPT prompts', 'AI image prompts', 'free prompt templates', 'Nano Banana prompts', 'AI editing prompts'],
    primaryCta: { label: 'Browse prompts', href: '/prompts' },
    secondaryCta: { label: 'Image prompts', href: '/prompts?category=image-generation' },
    stats: [
      { label: 'Prompt library', value: '1k+' },
      { label: 'Copy-ready', value: 'Yes' },
      { label: 'Signup', value: 'None' },
    ],
    sections: [
      {
        title: 'Prompt categories people search for',
        body: 'The prompt hub is organized around real search intent: viral image edits, social visuals, product photos, ChatGPT writing, and creative workflows.',
        links: [
          { label: 'AI image prompts', href: '/prompts?category=image-generation', note: 'Portraits, product visuals, posters, and cinematic scenes.' },
          { label: 'AI editing prompts', href: '/prompts?category=image-editing', note: 'Retouch, background, lighting, and transformation prompts.' },
          { label: 'ChatGPT prompts', href: '/prompts?model=ChatGPT', note: 'Writing, planning, creative, and productivity workflows.' },
          { label: 'Nano Banana prompts', href: '/prompts?q=nano%20banana', note: 'Trend-focused creative prompt ideas.' },
        ],
      },
      {
        title: 'How to use free prompts well',
        body: 'Start with a prompt, then add your subject, format, platform, lighting, and style constraints. Better inputs produce more consistent outputs.',
        links: [
          { label: 'Prompt collections', href: '/prompts/collections/free-ai-image-prompts', note: 'Grouped prompts for faster discovery.' },
          { label: 'Trending prompts', href: '/prompts?sort=hot', note: 'High-demand prompts for creative testing.' },
          { label: 'New prompts', href: '/prompts?sort=new', note: 'Recently added prompt ideas.' },
        ],
      },
    ],
    useCases: [
      'Create social media image ideas.',
      'Generate product photography directions.',
      'Write stronger ChatGPT instructions.',
      'Test viral AI image trends quickly.',
    ],
    faqs: [
      {
        question: 'Are these AI prompts free to copy?',
        answer: 'Yes. The prompts are designed to be copied and adapted for your own creative workflows.',
      },
      {
        question: 'Do the prompts work with ChatGPT and image tools?',
        answer: 'Many prompts include broad structure that can be adapted for ChatGPT, image generation, and editing tools.',
      },
      {
        question: 'Can I edit a prompt before using it?',
        answer: 'Yes. Replace the subject, style, platform, camera angle, or output format to match your exact goal.',
      },
    ],
    related: [
      { label: 'Prompt Hub', href: '/prompts' },
      { label: 'Free tools', href: '/free-tools' },
      { label: 'Free templates', href: '/free-website-templates' },
    ],
  },
  {
    slug: 'free-website-templates',
    title: 'Free Website Templates',
    h1: 'Free website templates for fast launches',
    eyebrow: 'Template library',
    description:
      'Explore free website templates for portfolios, landing pages, SaaS products, dashboards, agencies, ecommerce, and modern startup pages.',
    metaTitle: 'Free Website Templates - Portfolio, Landing Page, SaaS & Dashboard UI | mtverse',
    metaDescription:
      'Browse free website templates for portfolios, landing pages, SaaS products, dashboards, ecommerce, agencies, and modern startup websites.',
    keywords: ['free website templates', 'free portfolio templates', 'landing page templates', 'SaaS templates', 'dashboard templates', 'React templates'],
    primaryCta: { label: 'Browse templates', href: '/templates' },
    secondaryCta: { label: 'Open library', href: '/library' },
    stats: [
      { label: 'Template types', value: '100+' },
      { label: 'Live previews', value: 'Yes' },
      { label: 'Download links', value: 'Ready' },
    ],
    sections: [
      {
        title: 'Templates by project type',
        body: 'Use templates as starting points for portfolio sites, campaign pages, startup products, admin dashboards, and content-led websites.',
        links: [
          { label: 'Portfolio templates', href: '/templates?q=portfolio', note: 'Personal websites, developer portfolios, and creative profiles.' },
          { label: 'Landing page templates', href: '/templates?q=landing', note: 'Product launches, waitlists, and conversion pages.' },
          { label: 'Dashboard templates', href: '/templates?q=dashboard', note: 'Admin layouts, analytics screens, and product panels.' },
          { label: 'Ecommerce templates', href: '/templates?q=ecommerce', note: 'Product pages, collections, and storefront ideas.' },
        ],
      },
      {
        title: 'Launch faster with code-backed previews',
        body: 'Template detail pages include preview, download, and related templates so visitors can compare options before using one.',
        links: [
          { label: 'Template library', href: '/templates', note: 'Browse all current templates.' },
          { label: 'UI components', href: '/ui', note: 'Pair full templates with smaller interface components.' },
          { label: 'New launches', href: '/whats-new', note: 'See recently added template and content updates.' },
        ],
      },
    ],
    useCases: [
      'Start a portfolio without designing from scratch.',
      'Build a SaaS landing page faster.',
      'Preview dashboard UI ideas.',
      'Combine templates with UI components.',
    ],
    faqs: [
      {
        question: 'Are the website templates free?',
        answer: 'The template hub is built around free preview and download workflows for public users.',
      },
      {
        question: 'Can I preview templates before downloading?',
        answer: 'Yes. Template pages include previews and related templates so you can compare before choosing.',
      },
      {
        question: 'What template types are included?',
        answer: 'The library includes portfolio, SaaS, landing page, dashboard, ecommerce, agency, and modern product layouts.',
      },
    ],
    related: [
      { label: 'Free UI components', href: '/free-ui-components' },
      { label: 'Template library', href: '/templates' },
      { label: 'Library hub', href: '/library' },
    ],
  },
  {
    slug: 'free-ui-components',
    title: 'Free UI Components',
    h1: 'Free UI components with live previews',
    eyebrow: 'UI component library',
    description:
      'Find free UI components, CSS effects, buttons, cards, forms, loaders, navigation blocks, and interface patterns for modern websites.',
    metaTitle: 'Free UI Components - Buttons, Cards, Forms, Loaders & CSS Effects | mtverse',
    metaDescription:
      'Browse free UI components with live previews: buttons, cards, forms, loaders, navigation, hover effects, CSS patterns, and interface blocks.',
    keywords: ['free UI components', 'CSS components', 'free CSS effects', 'button components', 'card components', 'form UI components'],
    primaryCta: { label: 'Browse UI', href: '/ui' },
    secondaryCta: { label: 'Open library', href: '/library' },
    stats: [
      { label: 'UI items', value: '600+' },
      { label: 'Live preview', value: 'Yes' },
      { label: 'Copy code', value: 'Ready' },
    ],
    sections: [
      {
        title: 'Popular UI building blocks',
        body: 'Use smaller components when you do not need a full template: buttons, inputs, cards, loaders, navigation, and visual effects.',
        links: [
          { label: 'Buttons', href: '/ui?q=button', note: 'CTA, icon, outline, and action button ideas.' },
          { label: 'Cards', href: '/ui?q=card', note: 'Product cards, content cards, and preview cards.' },
          { label: 'Forms', href: '/ui?q=form', note: 'Inputs, checkboxes, radios, and field groups.' },
          { label: 'Loaders', href: '/ui?q=loader', note: 'Loading states and micro-interactions.' },
        ],
      },
      {
        title: 'From component to page',
        body: 'Pair UI components with templates and tools to move from idea to launch without designing every interaction manually.',
        links: [
          { label: 'Website templates', href: '/templates', note: 'Use complete page layouts.' },
          { label: 'Design tools', href: '/design', note: 'Generate and refine visual ideas.' },
          { label: 'Developer tools', href: '/tools/dev', note: 'Format code and prepare assets.' },
        ],
      },
    ],
    useCases: [
      'Copy a button or form pattern.',
      'Preview hover and loading states.',
      'Build a page from reusable UI pieces.',
      'Find component ideas for a design system.',
    ],
    faqs: [
      {
        question: 'Are UI components free to browse?',
        answer: 'Yes. UI components are public and available without a public account.',
      },
      {
        question: 'Do components include live previews?',
        answer: 'Component cards and detail pages are designed around live preview and copy-first workflows.',
      },
      {
        question: 'Can I use UI components with templates?',
        answer: 'Yes. The UI and template libraries are linked so you can combine small blocks with full page layouts.',
      },
    ],
    related: [
      { label: 'Free website templates', href: '/free-website-templates' },
      { label: 'UI Universe', href: '/ui' },
      { label: 'Free developer tools', href: '/free-developer-tools' },
    ],
  },
  {
    slug: 'free-pdf-tools',
    title: 'Free PDF Tools',
    h1: 'Free PDF tools for documents',
    eyebrow: 'PDF utilities',
    description:
      'Merge, split, compress, convert, unlock, protect, and organize PDF files with simple free tools built for everyday document work.',
    metaTitle: 'Free PDF Tools - Merge, Compress, Split, Convert & Edit PDFs | mtverse',
    metaDescription:
      'Use free PDF tools to merge, compress, split, convert, unlock, protect, and organize PDF files online. No signup required.',
    keywords: ['free PDF tools', 'merge PDF', 'compress PDF', 'split PDF', 'PDF converter', 'PDF editor online'],
    primaryCta: { label: 'Browse PDF tools', href: '/tools/pdf' },
    secondaryCta: { label: 'Merge PDF', href: '/tools/pdf/merge-pdf' },
    stats: [
      { label: 'PDF tasks', value: 'Merge' },
      { label: 'Compression', value: 'Ready' },
      { label: 'Conversion', value: 'Included' },
    ],
    sections: [
      {
        title: 'Core PDF workflows',
        body: 'The PDF toolkit focuses on frequent document tasks: combine files, reduce size, extract pages, and prepare documents for sharing.',
        links: [
          { label: 'Merge PDF', href: '/tools/pdf/merge-pdf', note: 'Combine multiple PDF files into one.' },
          { label: 'Compress PDF', href: '/tools/pdf/compress-pdf', note: 'Reduce file size for email and upload.' },
          { label: 'Split PDF', href: '/tools/pdf/split-pdf', note: 'Extract pages or separate documents.' },
          { label: 'PDF to JPG', href: '/tools/pdf/pdf-to-jpg', note: 'Turn pages into images.' },
        ],
      },
      {
        title: 'When to use PDF tools',
        body: 'Use them before submitting forms, emailing documents, uploading files to portals, or converting pages into images.',
        links: [
          { label: 'All PDF tools', href: '/tools/pdf', note: 'Browse the full PDF category.' },
          { label: 'File tools', href: '/tools/file', note: 'Compress, extract, and manage files.' },
          { label: 'Image tools', href: '/tools/image', note: 'Prepare images before converting to PDF.' },
        ],
      },
    ],
    useCases: [
      'Combine scanned pages into one PDF.',
      'Shrink a file before email upload.',
      'Extract selected pages from a document.',
      'Convert PDF pages into images.',
    ],
    faqs: [
      {
        question: 'What are the most popular free PDF tools?',
        answer: 'Merge PDF, Compress PDF, Split PDF, PDF to JPG, and PDF OCR are common starting points.',
      },
      {
        question: 'Can I use PDF tools on mobile?',
        answer: 'Yes. The tools are responsive and designed for phones, tablets, and desktops.',
      },
      {
        question: 'Do PDF tools require signup?',
        answer: 'No. Public PDF tools are available without creating a public account.',
      },
    ],
    related: [
      { label: 'Free tools', href: '/free-tools' },
      { label: 'Free image tools', href: '/free-image-tools' },
      { label: 'Tools hub', href: '/tools' },
    ],
  },
  {
    slug: 'free-image-tools',
    title: 'Free Image Tools',
    h1: 'Free image tools for web and social',
    eyebrow: 'Image utilities',
    description:
      'Compress, resize, crop, convert, generate QR codes, extract palettes, and prepare images for websites, social posts, and documents.',
    metaTitle: 'Free Image Tools - Compress, Resize, Crop, Convert & QR Code | mtverse',
    metaDescription:
      'Use free image tools to compress, resize, crop, convert, create QR codes, extract palettes, and prepare visuals for web or social.',
    keywords: ['free image tools', 'compress image', 'resize image', 'crop image', 'image converter', 'QR code generator'],
    primaryCta: { label: 'Browse image tools', href: '/tools/image' },
    secondaryCta: { label: 'Compress image', href: '/tools/image/compress-image' },
    stats: [
      { label: 'Image prep', value: 'Fast' },
      { label: 'Mobile', value: 'Ready' },
      { label: 'Web output', value: 'Clean' },
    ],
    sections: [
      {
        title: 'Image tools people need most',
        body: 'Image tools help you reduce upload size, create shareable assets, and prepare visuals before posting or publishing.',
        links: [
          { label: 'Compress Image', href: '/tools/image/compress-image', note: 'Reduce image file size.' },
          { label: 'Resize Image', href: '/tools/image/resize-image', note: 'Change image dimensions quickly.' },
          { label: 'Crop Image', href: '/tools/image/crop-image', note: 'Frame images for web and social.' },
          { label: 'QR Code Generator', href: '/tools/image/qr-code-generator', note: 'Create QR codes for links and text.' },
        ],
      },
      {
        title: 'Prepare assets before publishing',
        body: 'Use image utilities before uploading to websites, sending through chat, building template previews, or publishing social posts.',
        links: [
          { label: 'All image tools', href: '/tools/image', note: 'Browse the image category.' },
          { label: 'Free AI prompts', href: '/free-ai-prompts', note: 'Generate creative image ideas.' },
          { label: 'Templates', href: '/templates', note: 'Use optimized images in page templates.' },
        ],
      },
    ],
    useCases: [
      'Compress a photo before uploading.',
      'Resize images for cards and banners.',
      'Create QR codes for marketing pages.',
      'Extract colors for a design palette.',
    ],
    faqs: [
      {
        question: 'Are image tools free?',
        answer: 'Yes. Public image tools are free to use without a public login.',
      },
      {
        question: 'Can image tools help website speed?',
        answer: 'Yes. Compressing and resizing images can reduce page weight and improve loading experience.',
      },
      {
        question: 'Which image tools are best for creators?',
        answer: 'Compress Image, Resize Image, Crop Image, Image Converter, Palette Extractor, and QR Code Generator are useful for creators.',
      },
    ],
    related: [
      { label: 'Free AI prompts', href: '/free-ai-prompts' },
      { label: 'Free website templates', href: '/free-website-templates' },
      { label: 'Free tools', href: '/free-tools' },
    ],
  },
  {
    slug: 'free-developer-tools',
    title: 'Free Developer Tools',
    h1: 'Free developer tools for cleaner code',
    eyebrow: 'Developer utilities',
    description:
      'Format JSON, encode URLs, generate UUIDs, hash text, minify code, test regex, and prepare common developer outputs in one place.',
    metaTitle: 'Free Developer Tools - JSON Formatter, URL Encoder, UUID, Regex & Hashes | mtverse',
    metaDescription:
      'Use free developer tools including JSON formatter, URL encoder, UUID generator, regex tester, hash generator, minifier, and code utilities.',
    keywords: ['free developer tools', 'JSON formatter', 'URL encoder', 'UUID generator', 'regex tester', 'hash generator', 'code tools'],
    primaryCta: { label: 'Browse dev tools', href: '/tools/dev' },
    secondaryCta: { label: 'JSON formatter', href: '/tools/dev/json-formatter' },
    stats: [
      { label: 'Code helpers', value: 'Fast' },
      { label: 'Copy output', value: 'Easy' },
      { label: 'Browser', value: 'Ready' },
    ],
    sections: [
      {
        title: 'Everyday developer utilities',
        body: 'Use these tools when you need quick transformations without opening a full IDE or installing a package.',
        links: [
          { label: 'JSON Formatter', href: '/tools/dev/json-formatter', note: 'Format, inspect, and clean JSON.' },
          { label: 'URL Encoder Decoder', href: '/tools/dev/url-encoder-decoder', note: 'Encode and decode URL strings.' },
          { label: 'UUID Generator', href: '/tools/dev/uuid-generator', note: 'Generate unique identifiers.' },
          { label: 'Regex Tester', href: '/tools/dev/regex-tester', note: 'Test patterns quickly.' },
        ],
      },
      {
        title: 'Useful for debugging and publishing',
        body: 'Developer tools support quick formatting, validation, and copy-paste workflows for product builders and content teams.',
        links: [
          { label: 'Dev universe', href: '/dev', note: 'A focused workspace for developer utilities.' },
          { label: 'SEO tools', href: '/tools/seo', note: 'Prepare metadata and crawler files.' },
          { label: 'UI components', href: '/ui', note: 'Pair utilities with interface code.' },
        ],
      },
    ],
    useCases: [
      'Format API responses.',
      'Encode links before sharing.',
      'Generate IDs for tests and examples.',
      'Validate regex and hashes quickly.',
    ],
    faqs: [
      {
        question: 'What developer tools are included?',
        answer: 'JSON formatting, URL encoding, UUID generation, regex testing, hash generation, minification, and related utilities.',
      },
      {
        question: 'Are developer tools browser-based?',
        answer: 'Most utilities are designed for fast browser workflows with simple copy output.',
      },
      {
        question: 'Do I need an account?',
        answer: 'No. Public developer tools are available without sign-up.',
      },
    ],
    related: [
      { label: 'Free SEO tools', href: '/free-seo-tools' },
      { label: 'Free UI components', href: '/free-ui-components' },
      { label: 'Dev tools', href: '/tools/dev' },
    ],
  },
  {
    slug: 'free-seo-tools',
    title: 'Free SEO Tools',
    h1: 'Free SEO tools for cleaner search previews',
    eyebrow: 'SEO utilities',
    description:
      'Create meta tags, generate robots.txt, build XML sitemaps, preview SERP snippets, and prepare crawl-friendly page metadata.',
    metaTitle: 'Free SEO Tools - Meta Tags, Robots.txt, Sitemap & SERP Preview | mtverse',
    metaDescription:
      'Use free SEO tools to create meta tags, robots.txt files, XML sitemaps, SERP previews, keyword ideas, and crawl-friendly metadata.',
    keywords: ['free SEO tools', 'meta tag generator', 'robots.txt generator', 'sitemap generator', 'SERP preview', 'SEO checker'],
    primaryCta: { label: 'Browse SEO tools', href: '/tools/seo' },
    secondaryCta: { label: 'Meta tag generator', href: '/tools/seo/meta-tag-generator' },
    stats: [
      { label: 'Crawler files', value: 'Ready' },
      { label: 'SERP preview', value: 'Included' },
      { label: 'No login', value: 'Yes' },
    ],
    sections: [
      {
        title: 'SEO tools for page publishing',
        body: 'Use SEO tools before publishing pages so titles, descriptions, canonical URLs, robots files, and sitemap entries are easier to validate.',
        links: [
          { label: 'Meta Tag Generator', href: '/tools/seo/meta-tag-generator', note: 'Build title, description, OG, and canonical tags.' },
          { label: 'Robots.txt Generator', href: '/tools/seo/robots-txt-generator', note: 'Create crawler rules.' },
          { label: 'Sitemap Generator', href: '/tools/seo/sitemap-generator', note: 'Create XML sitemap structures.' },
          { label: 'SERP Preview', href: '/tools/seo/serp-preview', note: 'Preview title and description snippets.' },
          { label: 'Keyword Density', href: '/tools/seo/keyword-density', note: 'Check repeated terms and page focus.' },
        ],
      },
      {
        title: 'Connect SEO with content quality',
        body: 'SEO tools help search engines understand pages, but traffic grows when the page itself is useful, specific, and easy to navigate.',
        links: [
          { label: 'Discover guides', href: '/discover', note: 'Browse educational and growth content.' },
          { label: 'Free tools', href: '/free-tools', note: 'Link SEO pages to useful tools.' },
          { label: "What's New", href: '/whats-new', note: 'Track fresh content drops.' },
        ],
      },
    ],
    useCases: [
      'Create metadata before publishing.',
      'Check title and description length.',
      'Build robots.txt and sitemap files.',
      'Prepare crawl-friendly internal links.',
    ],
    faqs: [
      {
        question: 'Can SEO tools guarantee rankings?',
        answer: 'No tool can guarantee rankings. They help with technical clarity, while useful content, links, and page experience drive long-term growth.',
      },
      {
        question: 'Which SEO tool should I use first?',
        answer: 'Start with Meta Tag Generator, SERP Preview, Robots.txt Generator, and Sitemap Generator.',
      },
      {
        question: 'Are these SEO tools free?',
        answer: 'Yes. Public SEO tools are free and available without sign-up.',
      },
    ],
    related: [
      { label: 'Free developer tools', href: '/free-developer-tools' },
      { label: 'SEO tools category', href: '/tools/seo' },
      { label: 'Free tools', href: '/free-tools' },
    ],
  },
]

export const SEO_LANDING_SLUGS = SEO_LANDING_PAGES.map((page) => page.slug)

export function getSeoLandingPage(slug: string) {
  return SEO_LANDING_PAGES.find((page) => page.slug === slug)
}

export function createSeoLandingMetadata(slug: SeoLandingSlug): Metadata {
  const page = getSeoLandingPage(slug)

  if (!page) {
    return {
      title: 'mtverse',
    }
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: absoluteUrl(`/${page.slug}`),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(`/${page.slug}`),
      type: 'website',
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
          width: 1200,
          height: 630,
          alt: `${page.title} on mtverse`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [absoluteUrl('/opengraph-image')],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}
