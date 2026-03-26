import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookmarkPlus, Share2, Wrench } from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'
import ImageStudioPageFrame from '@/components/tools/ImageStudioPageFrame'
import PdfStudioPageFrame from '@/components/tools/PdfStudioPageFrame'
import VideoStudioPageFrame from '@/components/tools/VideoStudioPageFrame'
import WorkbenchStudioPageFrame from '@/components/tools/WorkbenchStudioPageFrame'
import ImagePaletteStudio from '@/components/tools/ImagePaletteStudio'
import ImageToPdfStudio from '@/components/tools/ImageToPdfStudio'
import ImageTransformStudio from '@/components/tools/ImageTransformStudio'
import QrCodeStudio from '@/components/tools/QrCodeStudio'
import ToolCard from '@/components/tools/ToolCard'
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb'
import RecentTracker from '@/components/tools/RecentTracker'
import SEOContent from '@/components/tools/SEOContent'
import { getLucideIcon } from '@/lib/icons'
import { CALCULATOR_STUDIO_SLUGS } from '@/lib/calculator-studio'
import { PDF_STUDIO_STATIC_CONTENT } from '@/lib/pdf-studio-content'
import { ACTIVE_CATEGORIES, type Tool } from '@/lib/tools-data'
import { getTools, getToolBySlug } from '@/lib/db'

const ToolDetailClient = dynamic(() => import('@/components/tools/ToolDetailClient'))
const VideoDownloaderClient = dynamic(() => import('@/components/tools/VideoDownloaderClient'))
const VideoStudio = dynamic(() => import('@/components/tools/VideoStudio'))
const AudioStudio = dynamic(() => import('@/components/tools/AudioStudio'))
const TextStudio = dynamic(() => import('@/components/tools/TextStudio'))
const DevStudio = dynamic(() => import('@/components/tools/DevStudio'))
const SeoStudio = dynamic(() => import('@/components/tools/SeoStudio'))
const CalculatorStudio = dynamic(() => import('@/components/tools/CalculatorStudio'))
const FileViewerStudio = dynamic(() => import('@/components/tools/FileViewerStudio'))
const CompressPdfStudio = dynamic(() => import('@/components/tools/CompressPdfStudio'))
const PdfToWordStudio = dynamic(() => import('@/components/tools/PdfToWordStudio'))
const MergePdfStudio = dynamic(() => import('@/components/tools/MergePdfStudio'))
const SplitPdfStudio = dynamic(() => import('@/components/tools/SplitPdfStudio'))
const PdfToExcelStudio = dynamic(() => import('@/components/tools/PdfToExcelStudio'))
const WordToPdfStudio = dynamic(() => import('@/components/tools/WordToPdfStudio'))
const JpgToPdfStudio = dynamic(() => import('@/components/tools/JpgToPdfStudio'))
const PdfToJpgStudio = dynamic(() => import('@/components/tools/PdfToJpgStudio'))
const PdfOcrStudio = dynamic(() => import('@/components/tools/PdfOcrStudio'))
const UnlockPdfStudio = dynamic(() => import('@/components/tools/UnlockPdfStudio'))
const PdfTranslatorStudio = dynamic(() => import('@/components/tools/PdfTranslatorStudio'))
const PdfSummarizerStudio = dynamic(() => import('@/components/tools/PdfSummarizerStudio'))

interface Props {
  params: Promise<{ category: string; tool: string }>
}

export const revalidate = 3600

const STUDIO_COMPONENTS: Record<string, ComponentType<{ tool: Tool }>> = {
  'compress-pdf': CompressPdfStudio,
  'pdf-to-word': PdfToWordStudio,
  'merge-pdf': MergePdfStudio,
  'split-pdf': SplitPdfStudio,
  'pdf-to-excel': PdfToExcelStudio,
  'word-to-pdf': WordToPdfStudio,
  'jpg-to-pdf': JpgToPdfStudio,
  'pdf-to-jpg': PdfToJpgStudio,
  'pdf-ocr': PdfOcrStudio,
  'unlock-pdf': UnlockPdfStudio,
  'pdf-translator': PdfTranslatorStudio,
  'pdf-summarizer': PdfSummarizerStudio,
}

const IMAGE_STUDIO_COMPONENTS: Record<string, ComponentType<{ tool: Tool }>> = {
  'compress-image': ImageTransformStudio,
  'resize-image': ImageTransformStudio,
  'convert-image': ImageTransformStudio,
  'crop-image': ImageTransformStudio,
  'remove-background': ImageTransformStudio,
  'blur-background': ImageTransformStudio,
  'passport-photo-maker': ImageTransformStudio,
  'image-to-text': ImageTransformStudio,
  'image-upscaler': ImageTransformStudio,
  'color-palette-generator': ImagePaletteStudio,
  'qr-code-generator': QrCodeStudio,
  'image-to-pdf': ImageToPdfStudio,
  'favicon-generator': ImageTransformStudio,
  'instagram-grid-maker': ImageTransformStudio,
  'svg-to-png': ImageTransformStudio,
  'meme-generator': ImageTransformStudio,
}

const FILE_STUDIO_SLUGS = new Set([
  'csv-viewer-editor',
  'json-file-viewer',
  'zip-extractor',
])

const VIDEO_STUDIO_SLUGS = new Set([
  'compress-video',
  'trim-video',
  'merge-video',
  'video-to-gif',
  'video-to-mp3',
  'change-video-speed',
  'rotate-video',
  'add-subtitles',
  'screen-recorder',
  'gif-maker',
  'mute-video',
])

const AUDIO_STUDIO_SLUGS = new Set([
  'compress-audio',
  'convert-audio',
  'trim-audio',
  'audio-equalizer',
  'audio-metadata-editor',
  'speech-to-text',
  'change-audio-speed',
  'merge-audio',
  'remove-vocals',
  'audio-text-to-speech',
  'trim-silence',
  'volume-booster',
])

const TEXT_STUDIO_SLUGS = new Set([
  'ai-text-generator',
  'text-case-converter',
  'remove-duplicate-lines',
  'text-grammar-checker',
  'paraphrasing-tool',
  'plagiarism-checker',
  'text-speech-to-text',
  'text-diff-checker',
  'text-summarizer',
  'text-to-speech',
  'text-url-encoder-decoder',
  'word-counter',
  'password-generator',
  'lorem-ipsum-generator',
  'emoji-copy-paste',
  'fancy-text-generator',
  'random-name-picker',
])

const DEV_STUDIO_SLUGS = new Set([
  'api-tester',
  'base64-encoder-decoder',
  'code-formatter',
  'color-converter',
  'css-minifier',
  'hash-generator',
  'html-previewer',
  'json-formatter',
  'jwt-decoder',
  'regex-tester',
  'sql-formatter',
  'uuid-generator',
  'css-gradient-generator',
  'html-to-markdown',
  'json-to-csv',
  'cron-expression-generator',
  'markdown-previewer',
])

const SEO_STUDIO_SLUGS = new Set([
  'backlink-checker',
  'broken-link-checker',
  'domain-authority-checker',
  'image-seo-checker',
  'keyword-generator',
  'meta-tag-generator',
  'page-speed-checker',
  'robots-txt-generator',
  'seo-analyzer',
  'serp-preview',
  'sitemap-generator',
  'url-slug-generator',
  'og-image-generator',
  'schema-markup-generator',
  'redirect-checker',
])

const CALCULATOR_STUDIO_SLUGS_SET = new Set(CALCULATOR_STUDIO_SLUGS)

export async function generateStaticParams() {
  const TOOLS = await getTools()
  const trendingSlugs = TOOLS.filter(tool => tool.popular || tool.tags.includes('trending')).map(tool => tool.slug)
  
  const PRE_RENDERED_TOOL_SLUGS = new Set([
    'all-in-one-video-downloader',
    ...Object.keys(STUDIO_COMPONENTS),
    ...Object.keys(IMAGE_STUDIO_COMPONENTS),
    ...VIDEO_STUDIO_SLUGS,
    ...AUDIO_STUDIO_SLUGS,
    ...TEXT_STUDIO_SLUGS,
    ...DEV_STUDIO_SLUGS,
    ...SEO_STUDIO_SLUGS,
    ...CALCULATOR_STUDIO_SLUGS,
    ...FILE_STUDIO_SLUGS,
    ...trendingSlugs,
  ])

  return TOOLS.filter(tool => PRE_RENDERED_TOOL_SLUGS.has(tool.slug)).map(tool => ({
    category: tool.categorySlug,
    tool: tool.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug } = await params
  const tool = await getToolBySlug(toolSlug)
  if (!tool) return {}

  if (tool.slug === 'all-in-one-video-downloader') {
    return {
      title: 'Video Downloader - MP4, WEBM, MP3, M4A and HD Thumbnail',
      description:
        'Download MP4, WEBM, MP3, M4A and HD thumbnails from YouTube, TikTok, Instagram, Twitter/X, Vimeo and more.',
      keywords: ['video downloader', 'youtube downloader', 'mp4 download', 'mp3 converter', 'tiktok downloader'],
    }
  }

  const title = `${tool.name} - Free Online Tool | Multiverse`
  const description = `${tool.description} Free, fast, no login required. Use ${tool.name} online instantly.`

  return {
    title,
    description,
    keywords: [
      tool.name.toLowerCase(),
      `${tool.name.toLowerCase()} online`,
      `free ${tool.name.toLowerCase()}`,
      `${tool.category.toLowerCase()} tool`,
      ...tool.tags,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://multiverse-tools.vercel.app/tools/${tool.categorySlug}/${tool.slug}`,
    },
  }
}

export default async function ToolPage({ params }: Props) {
  const { category, tool: toolSlug } = await params
  const tool = await getToolBySlug(toolSlug)

  if (!tool || tool.categorySlug !== category || tool.enabled === false) {
    notFound()
  }

  const TOOLS = await getTools()

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    url: `https://multiverse-tools.vercel.app/tools/${tool.categorySlug}/${tool.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://multiverse-tools.vercel.app/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tools',
        'item': 'https://multiverse-tools.vercel.app/tools'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': tool.category,
        'item': `https://multiverse-tools.vercel.app/tools/${tool.categorySlug}`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': tool.name,
        'item': `https://multiverse-tools.vercel.app/tools/${tool.categorySlug}/${tool.slug}`
      }
    ]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `How do I use ${tool.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Simply upload your input, adjust settings if needed, and click the process button. Our tool handles everything in-browser for maximum speed and privacy.`
        }
      },
      {
        '@type': 'Question',
        'name': `Is this ${tool.name} tool free?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Yes, all tools on Multiverse are 100% free to use. No registration or credit card is required to access our professional utility features.`
        }
      },
      {
        '@type': 'Question',
        'name': `Is my data secure while using ${tool.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Absolutely. We use WASM-based client-side processing, meaning your files never leave your computer. Processing happens locally on your device for total privacy.`
        }
      }
    ]
  }

  const combinedSchema = [schemaMarkup, breadcrumbSchema, faqSchema]

  const DOWNLOADER_SLUGS = new Set(['all-in-one-video-downloader', 'tiktok-downloader', 'instagram-reels-downloader', 'youtube-shorts-downloader'])

  if (DOWNLOADER_SLUGS.has(tool.slug)) {
    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <VideoDownloaderClient />
      </PublicLayout>
    )
  }

  const StudioComponent = STUDIO_COMPONENTS[tool.slug]
  const content = PDF_STUDIO_STATIC_CONTENT[tool.slug as keyof typeof PDF_STUDIO_STATIC_CONTENT]

  if (StudioComponent && content) {
    const relatedToolsData = await Promise.all(content.relatedSlugs.map(slug => getToolBySlug(slug)))
    const relatedTools = relatedToolsData.filter((item): item is Tool => Boolean(item))

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <PdfStudioPageFrame
          tool={tool}
          content={{
            ...content,
            relatedTools,
          }}
        >
          <StudioComponent tool={tool} />
        </PdfStudioPageFrame>
      </PublicLayout>
    )
  }

  const ImageStudioComponent = IMAGE_STUDIO_COMPONENTS[tool.slug]
  if (ImageStudioComponent) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'image' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <ImageStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <ImageStudioComponent tool={tool} />
        </ImageStudioPageFrame>
      </PublicLayout>
    )
  }

  if (VIDEO_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'video' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <VideoStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <VideoStudio tool={tool} />
        </VideoStudioPageFrame>
      </PublicLayout>
    )
  }

  if (AUDIO_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'audio' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <AudioStudio tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    )
  }

  if (TEXT_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'text' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <TextStudio tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    )
  }

  if (DEV_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'dev' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <DevStudio tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    )
  }

  if (SEO_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'seo' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <SeoStudio tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    )
  }

  if (CALCULATOR_STUDIO_SLUGS_SET.has(tool.slug as (typeof CALCULATOR_STUDIO_SLUGS)[number])) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'calculator' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <CalculatorStudio tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    )
  }

  if (FILE_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = TOOLS.filter(
      item => item.categorySlug === 'file' && item.slug !== tool.slug
    ).slice(0, 4)

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame tool={tool} relatedTools={relatedTools}>
          <FileViewerStudio tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    )
  }

  const categoryInfo = ACTIVE_CATEGORIES.find(item => item.slug === tool.categorySlug)
  const related = TOOLS.filter(item => item.categorySlug === tool.categorySlug && item.id !== tool.id).slice(0, 6)
  const CategoryIcon = getLucideIcon(categoryInfo?.icon, Wrench)

  return (
    <PublicLayout>
      <div className="premium-shell" data-tool-shell="true">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-6 md:py-10">
          <ToolBreadcrumb
            items={[
              { label: 'All Tools', href: '/tools' },
              { label: tool.category, href: `/tools/${tool.categorySlug}` },
              { label: tool.name },
            ]}
          />

          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <CategoryIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h1 className="font-display text-2xl font-extrabold md:text-3xl">{tool.name}</h1>
                  {tool.tags.includes('beta') && <span className="tag-beta">Beta</span>}
                </div>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <button className="btn-secondary flex items-center gap-2 px-3 py-2 text-sm">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="btn-secondary flex items-center gap-2 px-3 py-2 text-sm">
                <BookmarkPlus className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>

          <div className="premium-panel mb-8 overflow-hidden">
            <ToolDetailClient tool={tool} />
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="premium-card p-6">
              <h2 className="mb-4 font-display text-lg font-bold">How it works</h2>
              <ol className="space-y-3">
                {tool.inputType === 'file' && (
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      1
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Upload your {tool.acceptedFormats?.join(', ') || 'file'}
                    </span>
                  </li>
                )}
                {tool.inputType === 'text' && (
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      1
                    </span>
                    <span className="text-sm text-muted-foreground">Enter or paste your text input</span>
                  </li>
                )}
                {tool.inputType === 'url' && (
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      1
                    </span>
                    <span className="text-sm text-muted-foreground">Paste the source URL you want to process</span>
                  </li>
                )}
                {tool.inputType === 'both' && (
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      1
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Upload a supported file or enter a prompt to generate your result
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    2
                  </span>
                  <span className="text-sm text-muted-foreground">Configure options if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    3
                  </span>
                  <span className="text-sm text-muted-foreground">Click process and wait a few seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    4
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Download or copy your {tool.outputType === 'file' ? 'file' : 'result'}
                  </span>
                </li>
              </ol>
            </div>

            <div className="premium-card p-6">
              <h2 className="mb-4 font-display text-lg font-bold">Key features</h2>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500">+</span>
                  100% free, no account required
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500">+</span>
                  Fast processing, results in seconds
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500">+</span>
                  Your files are never stored
                </li>
                {(tool.inputType === 'file' || tool.inputType === 'both') && (
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-500">+</span>
                    Drag and drop support
                  </li>
                )}
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500">+</span>
                  Works on desktop and mobile
                </li>
                {tool.outputType === 'file' && (
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-500">+</span>
                    Instant download after processing
                  </li>
                )}
              </ul>
            </div>
          </div>

          <SEOContent tool={tool} />

          {related.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Related tools</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {related.map(item => (
                  <ToolCard key={item.id} tool={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
