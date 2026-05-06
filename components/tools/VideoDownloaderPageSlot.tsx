'use client'

import dynamic from 'next/dynamic'
import type { Tool } from '@/lib/tools-data'
import type { DownloaderRouteEntry } from '@/lib/downloader-route-data'

type DownloaderRouteTab = {
  label: string
  href: string
  active?: boolean
}

type RelatedDownloaderRoute = {
  label: string
  href: string
  description: string
}

type VideoDownloaderPageSlotProps = {
  tool: Tool
  route?: DownloaderRouteEntry
  routeTabs?: DownloaderRouteTab[]
  relatedRoutes?: RelatedDownloaderRoute[]
}

function VideoDownloaderPageLoading() {
  return (
    <div className="premium-shell" data-tool-shell="true">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 md:py-8">
        <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 sm:p-6">
          <div className="mx-auto h-6 w-56 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mx-auto mt-5 h-12 max-w-2xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-900" />
            <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-900" />
            <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-900" />
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoDownloaderClient = dynamic(
  () => import('@/components/tools/VideoDownloaderClient'),
  {
    ssr: false,
    loading: () => <VideoDownloaderPageLoading />,
  },
)

export default function VideoDownloaderPageSlot(props: VideoDownloaderPageSlotProps) {
  return <VideoDownloaderClient {...props} />
}
