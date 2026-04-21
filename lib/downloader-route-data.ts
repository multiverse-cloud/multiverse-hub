export type DownloaderRouteEntry = {
  routeSlug: string
  toolSlug: string
  title: string
  description: string
  keywords: string[]
}

export const DOWNLOADER_ROUTES: DownloaderRouteEntry[] = [
  {
    routeSlug: 'downloader',
    toolSlug: 'all-in-one-video-downloader',
    title: 'All-in-One Video Downloader - Download Public Videos Online',
    description: 'Paste any supported public video URL and download videos, audio, and thumbnails from major platforms in one fast downloader.',
    keywords: ['video downloader', 'all in one video downloader', 'online video downloader'],
  },
  {
    routeSlug: 'youtube-downloader',
    toolSlug: 'youtube-video-downloader',
    title: 'YouTube Downloader - Download Public YouTube Videos',
    description: 'Download public YouTube videos, audio, thumbnails, shorts, and available live recordings with a clean browser-based tool.',
    keywords: ['youtube downloader', 'youtube video downloader', 'download youtube video'],
  },
  {
    routeSlug: 'youtube-shorts-downloader',
    toolSlug: 'youtube-shorts-downloader',
    title: 'YouTube Shorts Downloader - Save Public Shorts Online',
    description: 'Paste a YouTube Shorts URL to fetch video information and download available public shorts formats quickly.',
    keywords: ['youtube shorts downloader', 'download youtube shorts', 'shorts video downloader'],
  },
  {
    routeSlug: 'youtube-playlist-downloader',
    toolSlug: 'youtube-playlist-downloader',
    title: 'YouTube Playlist Downloader - Public Playlist Media Tool',
    description: 'Analyze public YouTube playlist URLs and fetch available public media options when supported by the source.',
    keywords: ['youtube playlist downloader', 'download youtube playlist', 'playlist downloader'],
  },
  {
    routeSlug: 'instagram-reels-downloader',
    toolSlug: 'instagram-reels-downloader',
    title: 'Instagram Reels Downloader - Download Public Reels',
    description: 'Download public Instagram reels with a simple paste-first workflow designed for mobile and desktop.',
    keywords: ['instagram reels downloader', 'download reels', 'reels video downloader'],
  },
  {
    routeSlug: 'instagram-post-downloader',
    toolSlug: 'instagram-post-downloader',
    title: 'Instagram Post Downloader - Save Public Posts',
    description: 'Paste a public Instagram post URL to fetch supported video or image media downloads.',
    keywords: ['instagram post downloader', 'download instagram post', 'instagram media downloader'],
  },
  {
    routeSlug: 'instagram-story-downloader',
    toolSlug: 'instagram-story-downloader',
    title: 'Instagram Story Downloader - Public Stories and Highlights',
    description: 'Download publicly accessible Instagram stories and highlights when the media is available without login.',
    keywords: ['instagram story downloader', 'instagram highlights downloader', 'download instagram story'],
  },
  {
    routeSlug: 'facebook-video-downloader',
    toolSlug: 'facebook-video-downloader',
    title: 'Facebook Video Downloader - Download Public Facebook Videos',
    description: 'Save public Facebook videos, reels, and available live recordings with a clean direct-download flow.',
    keywords: ['facebook video downloader', 'download facebook video', 'facebook reels downloader'],
  },
  {
    routeSlug: 'facebook-reels-downloader',
    toolSlug: 'facebook-reels-downloader',
    title: 'Facebook Reels Downloader - Save Public Reels',
    description: 'Paste a public Facebook Reel URL and download available video formats without account features or history.',
    keywords: ['facebook reels downloader', 'download facebook reels', 'fb reels downloader'],
  },
  {
    routeSlug: 'tiktok-video-downloader',
    toolSlug: 'tiktok-video-downloader',
    title: 'TikTok Video Downloader - Download Public TikTok Videos',
    description: 'Download public TikTok videos and audio in a fast, compact, mobile-first downloader.',
    keywords: ['tiktok video downloader', 'download tiktok video', 'tiktok downloader'],
  },
  {
    routeSlug: 'twitter-video-downloader',
    toolSlug: 'twitter-video-downloader',
    title: 'Twitter / X Video Downloader - Save Public Videos',
    description: 'Download public Twitter and X videos, GIF posts, and accessible recordings when supported.',
    keywords: ['twitter video downloader', 'x video downloader', 'download twitter video'],
  },
  {
    routeSlug: 'pinterest-video-downloader',
    toolSlug: 'pinterest-video-downloader',
    title: 'Pinterest Video Downloader - Video Pins and Idea Pins',
    description: 'Save publicly accessible Pinterest video pins, idea pins, and image pins when media extraction is supported.',
    keywords: ['pinterest video downloader', 'pinterest pin downloader', 'download pinterest video'],
  },
  {
    routeSlug: 'reddit-video-downloader',
    toolSlug: 'reddit-video-downloader',
    title: 'Reddit Video Downloader - Public Reddit Media',
    description: 'Download public Reddit hosted videos, GIF posts, and embedded public media where available.',
    keywords: ['reddit video downloader', 'download reddit video', 'reddit media downloader'],
  },
  {
    routeSlug: 'vimeo-downloader',
    toolSlug: 'vimeo-video-downloader',
    title: 'Vimeo Downloader - Download Public Vimeo Videos',
    description: 'Fetch public Vimeo video metadata and download available public formats with a clean downloader UI.',
    keywords: ['vimeo downloader', 'vimeo video downloader', 'download vimeo video'],
  },
  {
    routeSlug: 'dailymotion-downloader',
    toolSlug: 'dailymotion-video-downloader',
    title: 'Dailymotion Downloader - Download Public Videos',
    description: 'Download public Dailymotion videos and playlists where source media is available.',
    keywords: ['dailymotion downloader', 'download dailymotion video', 'dailymotion video downloader'],
  },
  {
    routeSlug: 'snapchat-downloader',
    toolSlug: 'snapchat-downloader',
    title: 'Snapchat Downloader - Spotlight and Public Stories',
    description: 'Download publicly accessible Snapchat Spotlight and story media when supported by the source.',
    keywords: ['snapchat downloader', 'snapchat spotlight downloader', 'download snapchat video'],
  },
  {
    routeSlug: 'linkedin-video-downloader',
    toolSlug: 'linkedin-video-downloader',
    title: 'LinkedIn Video Downloader - Public Video Posts',
    description: 'Save public LinkedIn video posts and accessible live recordings with a focused downloader workflow.',
    keywords: ['linkedin video downloader', 'download linkedin video', 'linkedin post video downloader'],
  },
  {
    routeSlug: 'telegram-video-downloader',
    toolSlug: 'telegram-video-downloader',
    title: 'Telegram Video Downloader - Public Channel Media',
    description: 'Download public Telegram channel videos and media posts when links are publicly accessible.',
    keywords: ['telegram video downloader', 'telegram media downloader', 'download telegram video'],
  },
  {
    routeSlug: 'twitch-clip-downloader',
    toolSlug: 'twitch-clip-downloader',
    title: 'Twitch Clip Downloader - Clips and Public VODs',
    description: 'Download public Twitch clips, VODs, and stream media when supported and accessible.',
    keywords: ['twitch clip downloader', 'download twitch clips', 'twitch vod downloader'],
  },
  {
    routeSlug: 'bilibili-downloader',
    toolSlug: 'bilibili-downloader',
    title: 'Bilibili Downloader - Public Videos and Streams',
    description: 'Fetch public Bilibili videos and accessible stream media with a simple downloader interface.',
    keywords: ['bilibili downloader', 'download bilibili video', 'bilibili video downloader'],
  },
  {
    routeSlug: 'likee-video-downloader',
    toolSlug: 'likee-video-downloader',
    title: 'Likee Video Downloader - Public Short Videos',
    description: 'Download public Likee short videos with quick metadata detection and direct save actions.',
    keywords: ['likee video downloader', 'download likee video', 'likee downloader'],
  },
  {
    routeSlug: 'mxtakatak-downloader',
    toolSlug: 'mxtakatak-downloader',
    title: 'MX TakaTak Downloader - Public Short Videos',
    description: 'Save public MX TakaTak short videos where source media is supported.',
    keywords: ['mx takatak downloader', 'mxtakatak video downloader', 'download mx takatak video'],
  },
  {
    routeSlug: 'sharechat-video-downloader',
    toolSlug: 'sharechat-video-downloader',
    title: 'ShareChat Video Downloader - ShareChat and Moj Media',
    description: 'Download public ShareChat videos and Moj short videos when publicly accessible.',
    keywords: ['sharechat video downloader', 'moj video downloader', 'download sharechat video'],
  },
  {
    routeSlug: 'roposo-video-downloader',
    toolSlug: 'roposo-video-downloader',
    title: 'Roposo Video Downloader - Public Short Videos',
    description: 'Download publicly accessible Roposo short videos with a clean mobile-first downloader.',
    keywords: ['roposo video downloader', 'download roposo video', 'roposo downloader'],
  },
  {
    routeSlug: 'triller-video-downloader',
    toolSlug: 'triller-video-downloader',
    title: 'Triller Video Downloader - Public Short Videos',
    description: 'Save public Triller short videos with lightweight metadata and direct download options.',
    keywords: ['triller video downloader', 'download triller video', 'triller downloader'],
  },
]

export const DOWNLOADER_ROUTE_BY_SLUG = new Map(
  DOWNLOADER_ROUTES.map(route => [route.routeSlug, route])
)

export const DOWNLOADER_ROUTE_BY_TOOL_SLUG = new Map(
  DOWNLOADER_ROUTES.map(route => [route.toolSlug, route])
)

export function getDownloaderRoute(slug: string) {
  return DOWNLOADER_ROUTE_BY_SLUG.get(slug) || null
}

export function getDownloaderRouteByToolSlug(toolSlug: string) {
  return DOWNLOADER_ROUTE_BY_TOOL_SLUG.get(toolSlug) || null
}
