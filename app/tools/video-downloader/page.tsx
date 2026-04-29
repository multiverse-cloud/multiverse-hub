import { notFound, redirect } from 'next/navigation'

export default function VideoDownloaderPage() {
  const videoDownloadersEnabled =
    process.env.VIDEO_DOWNLOADERS_ENABLED === 'true' ||
    process.env.NEXT_PUBLIC_VIDEO_DOWNLOADERS_ENABLED === 'true'

  if (!videoDownloadersEnabled) notFound()

  redirect('/tools/video/all-in-one-video-downloader')
}
