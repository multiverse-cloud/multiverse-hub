import type { LucideIcon } from 'lucide-react'
import {
  Clapperboard,
  Download,
  Headphones,
  ImageIcon,
  Layers3,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Zap,
} from 'lucide-react'

export const SUPPORTED_SITES = ['YouTube', 'TikTok', 'Instagram', 'Twitter/X', 'Vimeo', 'Facebook', 'Dailymotion']

export const FORMAT_BADGES = ['MP4 360p', 'MP4 480p', 'MP4 720p', 'MP4 1080p', 'WEBM 2K', 'WEBM 4K', 'MP3', 'M4A', 'HD Thumbnail']

export const HOW_TO_STEPS = [
  {
    step: '1',
    title: 'Copy the link',
    description: 'Open the video post and copy the shared URL.',
  },
  {
    step: '2',
    title: 'Paste the URL',
    description: 'Drop the link into the analyzer at the top of the page.',
  },
  {
    step: '3',
    title: 'Choose the format',
    description: 'Pick MP4, WEBM, MP3, M4A, or the thumbnail output.',
  },
  {
    step: '4',
    title: 'Download instantly',
    description: 'Save the selected file with live download status in the button.',
  },
]

export const FEATURE_ITEMS: Array<{
  icon: LucideIcon
  title: string
  description: string
}> = [
  {
    icon: Layers3,
    title: 'Multiple Formats',
    description: 'Save in MP4, WEBM, MP3, M4A and thumbnail outputs with one streamlined workflow.',
  },
  {
    icon: Clapperboard,
    title: 'Premium Quality',
    description: 'Support for 360p, 480p, 720p, 1080p, 2K and 4K where the source provides it.',
  },
  {
    icon: Headphones,
    title: 'Video With Audio',
    description: 'Merged video downloads keep audio included for ready-to-play results.',
  },
  {
    icon: ImageIcon,
    title: 'HD Thumbnails',
    description: 'Grab landscape thumbnail artwork in high quality directly from the result.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Built for quick analysis and smooth download handoff on desktop and mobile.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean Experience',
    description: 'Minimal, focused UI with a strong SaaS layout that scales across the platform.',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'Which platforms are supported?',
    answer: 'YouTube, TikTok, Instagram, Twitter/X, Vimeo, Facebook and Dailymotion are supported.',
  },
  {
    question: 'Which formats are available?',
    answer: 'MP4 360p, 480p, 720p, 1080p, WEBM 2K, WEBM 4K, MP3, M4A and HD thumbnail downloads.',
  },
  {
    question: 'Do video downloads include audio?',
    answer: 'Yes. Video outputs are prepared with audio so the downloaded file is ready to play.',
  },
  {
    question: 'Can I download the thumbnail only?',
    answer: 'Yes. Thumbnail download options appear with the preview and in the thumbnail section.',
  },
  {
    question: 'Why does quality availability vary?',
    answer: 'Available qualities depend on the source upload, platform delivery and the original master quality.',
  },
  {
    question: 'Does this work on mobile and desktop?',
    answer: 'Yes. The UI and download flow are designed to stay responsive across device sizes.',
  },
]

export const THUMBNAIL_PLACEHOLDERS = [
  { name: 'HD Thumbnail', meta: '1920 x 1080', accent: 'bg-indigo-500' },
  { name: 'Standard Thumbnail', meta: '1280 x 720', accent: 'bg-slate-400' },
]

export const HERO_TRUST_ITEMS = ['4K Support', 'Video With Audio', 'HD Thumbnails']

export const CTA_POINTS = [
  {
    icon: Download,
    label: 'Instant access',
  },
  {
    icon: Sparkles,
    label: 'Premium UI',
  },
  {
    icon: WandSparkles,
    label: 'Reusable system',
  },
]
