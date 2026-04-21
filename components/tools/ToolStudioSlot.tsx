'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import { VIDEO_DOWNLOADER_TOOL_SLUGS, type Tool } from '@/lib/tools-data'
import { CALCULATOR_STUDIO_SLUGS } from '@/lib/calculator-studio'

type StudioComponent = ComponentType<{ tool: Tool }>

function StudioLoading() {
  return (
    <div className="p-5 md:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="h-72 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />
      </div>
    </div>
  )
}

const dynamicStudio = (loader: () => Promise<{ default: StudioComponent }>) =>
  dynamic(loader, {
    ssr: false,
    loading: () => <StudioLoading />,
  })

const ToolDetailClientSelector = dynamicStudio(() => import('@/components/tools/ToolDetailClientSelector'))
const VideoDownloaderClient = dynamicStudio(() => import('@/components/tools/VideoDownloaderClient'))
const VideoStudio = dynamicStudio(() => import('@/components/tools/VideoStudio'))
const AudioStudio = dynamicStudio(() => import('@/components/tools/AudioStudio'))
const TextStudio = dynamicStudio(() => import('@/components/tools/TextStudio'))
const DevStudio = dynamicStudio(() => import('@/components/tools/DevStudio'))
const SeoStudio = dynamicStudio(() => import('@/components/tools/SeoStudio'))
const CalculatorStudio = dynamicStudio(() => import('@/components/tools/CalculatorStudio'))
const FileViewerStudio = dynamicStudio(() => import('@/components/tools/FileViewerStudio'))
const CompressPdfStudio = dynamicStudio(() => import('@/components/tools/CompressPdfStudio'))
const PdfToWordStudio = dynamicStudio(() => import('@/components/tools/PdfToWordStudio'))
const MergePdfStudio = dynamicStudio(() => import('@/components/tools/MergePdfStudio'))
const SplitPdfStudio = dynamicStudio(() => import('@/components/tools/SplitPdfStudio'))
const PdfToExcelStudio = dynamicStudio(() => import('@/components/tools/PdfToExcelStudio'))
const WordToPdfStudio = dynamicStudio(() => import('@/components/tools/WordToPdfStudio'))
const JpgToPdfStudio = dynamicStudio(() => import('@/components/tools/JpgToPdfStudio'))
const PdfToJpgStudio = dynamicStudio(() => import('@/components/tools/PdfToJpgStudio'))
const PdfOcrStudio = dynamicStudio(() => import('@/components/tools/PdfOcrStudio'))
const UnlockPdfStudio = dynamicStudio(() => import('@/components/tools/UnlockPdfStudio'))
const PdfTranslatorStudio = dynamicStudio(() => import('@/components/tools/PdfTranslatorStudio'))
const PdfSummarizerStudio = dynamicStudio(() => import('@/components/tools/PdfSummarizerStudio'))
const ImagePaletteStudio = dynamicStudio(() => import('@/components/tools/ImagePaletteStudio'))
const ImageToPdfStudio = dynamicStudio(() => import('@/components/tools/ImageToPdfStudio'))
const ImageTransformStudio = dynamicStudio(() => import('@/components/tools/ImageTransformStudio'))
const QrCodeStudio = dynamicStudio(() => import('@/components/tools/QrCodeStudio'))

const PDF_STUDIO_COMPONENTS: Record<string, StudioComponent> = {
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

const IMAGE_STUDIO_COMPONENTS: Record<string, StudioComponent> = {
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
  'cron-generator',
  'gradient-generator',
  'gitignore-generator',
  'hash-generator',
  'html-previewer',
  'json-formatter',
  'jwt-decoder',
  'js-minifier',
  'regex-tester',
  'sql-formatter',
  'url-encoder-decoder',
  'uuid-generator',
  'css-gradient-generator',
  'html-to-markdown',
  'json-to-csv-converter',
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

const FILE_STUDIO_SLUGS = new Set(['csv-viewer', 'json-file-viewer', 'zip-extractor'])
const CALCULATOR_STUDIO_SLUGS_SET = new Set<string>(CALCULATOR_STUDIO_SLUGS)

export default function ToolStudioSlot({ tool }: { tool: Tool }) {
  if (VIDEO_DOWNLOADER_TOOL_SLUGS.has(tool.slug)) return <VideoDownloaderClient tool={tool} />
  if (PDF_STUDIO_COMPONENTS[tool.slug]) {
    const Studio = PDF_STUDIO_COMPONENTS[tool.slug]
    return <Studio tool={tool} />
  }
  if (IMAGE_STUDIO_COMPONENTS[tool.slug]) {
    const Studio = IMAGE_STUDIO_COMPONENTS[tool.slug]
    return <Studio tool={tool} />
  }
  if (VIDEO_STUDIO_SLUGS.has(tool.slug)) return <VideoStudio tool={tool} />
  if (AUDIO_STUDIO_SLUGS.has(tool.slug)) return <AudioStudio tool={tool} />
  if (TEXT_STUDIO_SLUGS.has(tool.slug)) return <TextStudio tool={tool} />
  if (DEV_STUDIO_SLUGS.has(tool.slug)) return <DevStudio tool={tool} />
  if (SEO_STUDIO_SLUGS.has(tool.slug)) return <SeoStudio tool={tool} />
  if (CALCULATOR_STUDIO_SLUGS_SET.has(tool.slug)) return <CalculatorStudio tool={tool} />
  if (FILE_STUDIO_SLUGS.has(tool.slug)) return <FileViewerStudio tool={tool} />

  return <ToolDetailClientSelector tool={tool} />
}
