import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookmarkPlus, Share2, Wrench } from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'
import PdfStudioPageFrame from '@/components/tools/PdfStudioPageFrame'
import ToolCard from '@/components/tools/ToolCard'
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb'
import { getLucideIcon } from '@/lib/icons'
import { PDF_STUDIO_STATIC_CONTENT } from '@/lib/pdf-studio-content'
import { ACTIVE_CATEGORIES, getToolBySlug, TOOLS, type Tool } from '@/lib/tools-data'

const ToolDetailClient = dynamic(() => import('@/components/tools/ToolDetailClient'))
const VideoDownloaderClient = dynamic(() => import('@/components/tools/VideoDownloaderClient'))
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

const PRE_RENDERED_TOOL_SLUGS = new Set([
  'all-in-one-video-downloader',
  ...Object.keys(STUDIO_COMPONENTS),
  ...TOOLS.filter(tool => tool.popular || tool.tags.includes('trending')).map(tool => tool.slug),
])

export function generateStaticParams() {
  return TOOLS.filter(tool => PRE_RENDERED_TOOL_SLUGS.has(tool.slug)).map(tool => ({
    category: tool.categorySlug,
    tool: tool.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug } = await params
  const tool = getToolBySlug(toolSlug)
  if (!tool) return {}

  if (tool.slug === 'all-in-one-video-downloader') {
    return {
      title: 'Video Downloader - MP4, WEBM, MP3, M4A and HD Thumbnail',
      description:
        'Download MP4, WEBM, MP3, M4A and HD thumbnails from YouTube, TikTok, Instagram, Twitter/X, Vimeo and more.',
    }
  }

  return {
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const { category, tool: toolSlug } = await params
  const tool = getToolBySlug(toolSlug)

  if (!tool || tool.categorySlug !== category) {
    notFound()
  }

  if (tool.slug === 'all-in-one-video-downloader') {
    return (
      <PublicLayout>
        <VideoDownloaderClient />
      </PublicLayout>
    )
  }

  const StudioComponent = STUDIO_COMPONENTS[tool.slug]
  const content = PDF_STUDIO_STATIC_CONTENT[tool.slug as keyof typeof PDF_STUDIO_STATIC_CONTENT]

  if (StudioComponent && content) {
    const relatedTools = content.relatedSlugs
      .map(slug => getToolBySlug(slug))
      .filter((item): item is Tool => Boolean(item))

    return (
      <PublicLayout>
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

  const categoryInfo = ACTIVE_CATEGORIES.find(item => item.slug === tool.categorySlug)
  const related = TOOLS.filter(item => item.categorySlug === tool.categorySlug && item.id !== tool.id).slice(0, 6)
  const CategoryIcon = getLucideIcon(categoryInfo?.icon, Wrench)

  return (
    <PublicLayout>
      <div className="premium-shell">
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
