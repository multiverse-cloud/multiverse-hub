import { NextRequest } from 'next/server'
import { err } from '@/lib/server-utils'
import {
  buildThumbnailDownloads,
  fetchVideoInfo,
  isSupportedVideoUrl,
} from '@/lib/video-downloader'

export const runtime = 'nodejs'
export const maxDuration = 30
const INFO_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const videoUrl = url.searchParams.get('url')

  if (!videoUrl) return err('Missing ?url= parameter')
  if (!isSupportedVideoUrl(videoUrl)) {
    return err('URL not supported. Try YouTube, TikTok, Instagram, Twitter/X, Vimeo, Facebook or Dailymotion.')
  }

  try {
    const info = await fetchVideoInfo(videoUrl)
    return Response.json(info, { headers: INFO_CACHE_HEADERS })
  } catch (error) {
    const ytMatch = videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (ytMatch) {
      const thumbnailHD = `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`
      const thumbnail = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`

      return Response.json(
        {
          title: 'YouTube video',
          safeTitle: 'youtube_video',
          uploader: 'Unknown creator',
          duration: 0,
          thumbnail,
          thumbnailHQ: thumbnailHD,
          viewCount: 0,
          likeCount: 0,
          uploadDate: '',
          webpage_url: videoUrl,
          platform: 'YouTube',
          quickDownloads: [],
          videoFormats: [],
          audioFormats: [],
          thumbnailDownloads: buildThumbnailDownloads(thumbnail, thumbnailHD),
          videoId: ytMatch[1],
          error: 'yt-dlp unavailable - thumbnail only mode',
        },
        { headers: INFO_CACHE_HEADERS }
      )
    }

    return err(`Could not fetch video info: ${(error as Error).message}`, 500)
  }
}
