import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Free online tools for PDF, image, video, audio, text, developer, SEO, AI, and calculator workflows.',
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
