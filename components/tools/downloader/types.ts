import type { DownloadOption } from '@/lib/video-downloader'

export interface VideoInfo {
  title: string
  safeTitle: string
  uploader: string
  duration: number
  thumbnail: string
  thumbnailHQ?: string
  viewCount: number
  likeCount: number
  uploadDate: string
  webpage_url: string
  platform: string
  quickDownloads: DownloadOption[]
  videoFormats: DownloadOption[]
  audioFormats: DownloadOption[]
  thumbnailDownloads: DownloadOption[]
  error?: string
}

export interface DownloadState {
  id: string
  phase: 'preparing' | 'downloading' | 'opening'
  progress: number | null
}
