export type DownloaderRouteEntry = {
  routeSlug: string
  toolSlug: string
  title: string
  description: string
  keywords: string[]
  platform: string
  intentLabel: string
  tabGroup: string
  contentTypes: string[]
  placeholder: string
  howToSteps: string[]
  features: string[]
  faq: Array<{
    question: string
    answer: string
  }>
}

export type DownloaderTab = {
  label: string
  routeSlug: string
}

const COMMON_FORMATS = 'MP4, WEBM, MP3, M4A, and thumbnail options appear when the public source exposes them.'

function makeFaq(platform: string, intentLabel: string, contentTypes: string[]) {
  const content = contentTypes.join(', ')

  return [
    {
      question: `Can I download private ${platform} ${intentLabel.toLowerCase()}?`,
      answer:
        `No. mtverse only supports public, accessible ${platform} links. Private, protected, deleted, login-required, geo-blocked, and DRM-protected media is not supported.`,
    },
    {
      question: `What can this ${platform} downloader save?`,
      answer:
        `This page is focused on ${content}. Available download buttons depend on the original public link and what ${platform} exposes for that media.`,
    },
    {
      question: `Does ${platform} download quality change by link?`,
      answer:
        `Yes. Each public ${platform} post can expose different quality variants. mtverse shows only the formats that are actually available for that exact URL.`,
    },
    {
      question: 'Does mtverse save my download history?',
      answer:
        'No. Public downloader pages are stateless: no public accounts, no saved history, no favorites, and no persistent user download data.',
    },
  ]
}

function makeRoute({
  routeSlug,
  toolSlug,
  platform,
  intentLabel,
  tabGroup,
  contentTypes,
  placeholder,
  description,
  keywords,
}: {
  routeSlug: string
  toolSlug: string
  platform: string
  intentLabel: string
  tabGroup: string
  contentTypes: string[]
  placeholder: string
  description: string
  keywords: string[]
}): DownloaderRouteEntry {
  const pageName =
    platform === 'All Platforms'
      ? 'All-in-One Video Downloader'
      : `${platform} ${intentLabel} Downloader`

  return {
    routeSlug,
    toolSlug,
    title:
      platform === 'All Platforms'
        ? 'All-in-One Video Downloader - Download Public Videos Online'
        : `${pageName} - Download Public ${intentLabel} Online`,
    description,
    keywords,
    platform,
    intentLabel,
    tabGroup,
    contentTypes,
    placeholder,
    howToSteps: [
      `Copy a public ${platform === 'All Platforms' ? 'media' : platform} link.`,
      `Paste the ${intentLabel.toLowerCase()} URL into the downloader input.`,
      'Review the detected title, duration, thumbnail, and available formats.',
      'Choose a format and download directly without saving history.',
    ],
    features: [
      `Supports ${contentTypes.join(', ')} from public links.`,
      COMMON_FORMATS,
      'Mobile-first input, compact result preview, and direct download actions.',
      'No public login, no saved history, and no persistent user files.',
    ],
    faq: makeFaq(platform, intentLabel, contentTypes),
  }
}

export const DOWNLOADER_ROUTES: DownloaderRouteEntry[] = [
  makeRoute({
    routeSlug: 'downloader',
    toolSlug: 'all-in-one-video-downloader',
    platform: 'All Platforms',
    intentLabel: 'Video',
    tabGroup: 'all',
    contentTypes: ['Videos', 'Short videos', 'Reels', 'Posts', 'Pins', 'GIFs', 'Audio', 'Thumbnails'],
    placeholder: 'Paste any supported public video URL',
    description:
      'Paste any supported public video URL and download videos, audio, GIFs, pins, reels, short videos, and thumbnails from major platforms in one clean downloader.',
    keywords: ['video downloader', 'all in one video downloader', 'online video downloader'],
  }),
  makeRoute({
    routeSlug: 'instagram-video-downloader',
    toolSlug: 'instagram-video-downloader',
    platform: 'Instagram',
    intentLabel: 'Video',
    tabGroup: 'instagram',
    contentTypes: ['Videos', 'Photos', 'Reels', 'Posts', 'Stories', 'Highlights', 'DP'],
    placeholder: 'Paste Instagram reel, post, story, highlight, photo, or profile URL',
    description:
      'Download Instagram videos and photos from public reels, posts, stories, highlights, and profile media in one Instagram downloader.',
    keywords: ['instagram downloader', 'instagram video downloader', 'download instagram video'],
  }),
  makeRoute({
    routeSlug: 'instagram-reels-downloader',
    toolSlug: 'instagram-reels-downloader',
    platform: 'Instagram',
    intentLabel: 'Reels',
    tabGroup: 'instagram',
    contentTypes: ['Reels', 'Videos', 'Audio', 'Thumbnails'],
    placeholder: 'Paste Instagram Reel URL',
    description:
      'Download public Instagram reels with a fast paste-first workflow for MP4 video, audio, and thumbnail options.',
    keywords: ['instagram reels downloader', 'download reels', 'reels video downloader'],
  }),
  makeRoute({
    routeSlug: 'instagram-post-downloader',
    toolSlug: 'instagram-post-downloader',
    platform: 'Instagram',
    intentLabel: 'Post',
    tabGroup: 'instagram',
    contentTypes: ['Posts', 'Videos', 'Photos', 'Carousels'],
    placeholder: 'Paste Instagram post URL',
    description:
      'Paste a public Instagram post link to save available videos, photos, and carousel media from the post.',
    keywords: ['instagram post downloader', 'download instagram post', 'instagram media downloader'],
  }),
  makeRoute({
    routeSlug: 'instagram-photo-downloader',
    toolSlug: 'instagram-post-downloader',
    platform: 'Instagram',
    intentLabel: 'Photo',
    tabGroup: 'instagram',
    contentTypes: ['Photos', 'Posts', 'Carousels'],
    placeholder: 'Paste Instagram photo or carousel URL',
    description:
      'Download public Instagram photos and carousel images with a simple mobile-friendly input and preview flow.',
    keywords: ['instagram photo downloader', 'download instagram photo', 'instagram image downloader'],
  }),
  makeRoute({
    routeSlug: 'instagram-story-downloader',
    toolSlug: 'instagram-story-downloader',
    platform: 'Instagram',
    intentLabel: 'Story',
    tabGroup: 'instagram',
    contentTypes: ['Stories', 'Videos', 'Photos'],
    placeholder: 'Paste Instagram story URL',
    description:
      'Download publicly accessible Instagram stories when the media is available without login or account access.',
    keywords: ['instagram story downloader', 'download instagram story', 'ig story downloader'],
  }),
  makeRoute({
    routeSlug: 'instagram-highlights-downloader',
    toolSlug: 'instagram-story-downloader',
    platform: 'Instagram',
    intentLabel: 'Highlights',
    tabGroup: 'instagram',
    contentTypes: ['Highlights', 'Stories', 'Videos', 'Photos'],
    placeholder: 'Paste Instagram highlight URL',
    description:
      'Save public Instagram highlights and accessible highlight stories with compact download options.',
    keywords: ['instagram highlights downloader', 'download instagram highlights', 'instagram highlight downloader'],
  }),
  makeRoute({
    routeSlug: 'instagram-dp-downloader',
    toolSlug: 'instagram-video-downloader',
    platform: 'Instagram',
    intentLabel: 'DP',
    tabGroup: 'instagram',
    contentTypes: ['Profile Photo', 'DP', 'Images'],
    placeholder: 'Paste Instagram profile URL',
    description:
      'Download publicly accessible Instagram profile photos when profile media is available from the public source.',
    keywords: ['instagram dp downloader', 'instagram profile picture downloader', 'download instagram dp'],
  }),
  makeRoute({
    routeSlug: 'facebook-video-downloader',
    toolSlug: 'facebook-video-downloader',
    platform: 'Facebook',
    intentLabel: 'Video',
    tabGroup: 'facebook',
    contentTypes: ['Videos', 'Reels', 'Live', 'Posts'],
    placeholder: 'Paste Facebook video, reel, live, or post URL',
    description:
      'Download public Facebook videos, reels, live replays, and supported post media with a direct-save flow.',
    keywords: ['facebook video downloader', 'download facebook video', 'facebook downloader'],
  }),
  makeRoute({
    routeSlug: 'facebook-reels-downloader',
    toolSlug: 'facebook-reels-downloader',
    platform: 'Facebook',
    intentLabel: 'Reels',
    tabGroup: 'facebook',
    contentTypes: ['Reels', 'Videos', 'Posts'],
    placeholder: 'Paste Facebook Reel URL',
    description:
      'Paste a public Facebook Reel URL and download available short-form video formats without account features.',
    keywords: ['facebook reels downloader', 'download facebook reels', 'fb reels downloader'],
  }),
  makeRoute({
    routeSlug: 'facebook-live-downloader',
    toolSlug: 'facebook-video-downloader',
    platform: 'Facebook',
    intentLabel: 'Live',
    tabGroup: 'facebook',
    contentTypes: ['Live Replays', 'Videos', 'Posts'],
    placeholder: 'Paste Facebook live replay URL',
    description:
      'Download public Facebook live replays and accessible stream videos when supported formats are available.',
    keywords: ['facebook live downloader', 'download facebook live', 'facebook replay downloader'],
  }),
  makeRoute({
    routeSlug: 'tiktok-video-downloader',
    toolSlug: 'tiktok-video-downloader',
    platform: 'TikTok',
    intentLabel: 'Video',
    tabGroup: 'tiktok',
    contentTypes: ['Videos', 'Short Videos', 'Audio', 'Thumbnails'],
    placeholder: 'Paste TikTok video URL',
    description:
      'Download public TikTok videos, short videos, audio, and thumbnails in a compact mobile-first downloader.',
    keywords: ['tiktok video downloader', 'download tiktok video', 'tiktok downloader'],
  }),
  makeRoute({
    routeSlug: 'tiktok-live-downloader',
    toolSlug: 'tiktok-video-downloader',
    platform: 'TikTok',
    intentLabel: 'Live',
    tabGroup: 'tiktok',
    contentTypes: ['Live Replays', 'Videos', 'Audio'],
    placeholder: 'Paste TikTok live or replay URL',
    description:
      'Download publicly accessible TikTok live replay media when the platform exposes supported formats.',
    keywords: ['tiktok live downloader', 'download tiktok live', 'tiktok replay downloader'],
  }),
  makeRoute({
    routeSlug: 'twitter-video-downloader',
    toolSlug: 'twitter-video-downloader',
    platform: 'Twitter / X',
    intentLabel: 'Video',
    tabGroup: 'twitter',
    contentTypes: ['Videos', 'GIFs', 'Posts', 'Recordings'],
    placeholder: 'Paste Twitter or X post URL',
    description:
      'Download public Twitter and X videos, GIF posts, and accessible recordings with a simple paste-and-save workflow.',
    keywords: ['twitter video downloader', 'x video downloader', 'download twitter video'],
  }),
  makeRoute({
    routeSlug: 'x-gif-downloader',
    toolSlug: 'twitter-video-downloader',
    platform: 'Twitter / X',
    intentLabel: 'GIF',
    tabGroup: 'twitter',
    contentTypes: ['GIFs', 'Videos', 'Posts'],
    placeholder: 'Paste X or Twitter GIF post URL',
    description:
      'Save public Twitter and X GIF posts when the source exposes downloadable media variants.',
    keywords: ['twitter gif downloader', 'x gif downloader', 'download twitter gif'],
  }),
  makeRoute({
    routeSlug: 'pinterest-video-downloader',
    toolSlug: 'pinterest-video-downloader',
    platform: 'Pinterest',
    intentLabel: 'Video',
    tabGroup: 'pinterest',
    contentTypes: ['Video Pins', 'Idea Pins', 'Image Pins'],
    placeholder: 'Paste Pinterest pin URL',
    description:
      'Save public Pinterest video pins, idea pins, and image pins when media extraction is supported.',
    keywords: ['pinterest video downloader', 'pinterest pin downloader', 'download pinterest video'],
  }),
  makeRoute({
    routeSlug: 'pinterest-image-downloader',
    toolSlug: 'pinterest-video-downloader',
    platform: 'Pinterest',
    intentLabel: 'Image Pin',
    tabGroup: 'pinterest',
    contentTypes: ['Image Pins', 'Idea Pins', 'Pins'],
    placeholder: 'Paste Pinterest image pin URL',
    description:
      'Download public Pinterest image pins and supported idea pin media with a clean preview-first downloader.',
    keywords: ['pinterest image downloader', 'download pinterest image', 'pinterest pin image downloader'],
  }),
  makeRoute({
    routeSlug: 'reddit-video-downloader',
    toolSlug: 'reddit-video-downloader',
    platform: 'Reddit',
    intentLabel: 'Video',
    tabGroup: 'reddit',
    contentTypes: ['Videos', 'GIFs', 'Posts', 'Embedded media'],
    placeholder: 'Paste Reddit post URL',
    description:
      'Download public Reddit hosted videos, GIF posts, and supported embedded media where available.',
    keywords: ['reddit video downloader', 'download reddit video', 'reddit media downloader'],
  }),
  makeRoute({
    routeSlug: 'reddit-gif-downloader',
    toolSlug: 'reddit-video-downloader',
    platform: 'Reddit',
    intentLabel: 'GIF',
    tabGroup: 'reddit',
    contentTypes: ['GIFs', 'Videos', 'Posts'],
    placeholder: 'Paste Reddit GIF post URL',
    description:
      'Save public Reddit GIF posts and supported media links with compact result and download options.',
    keywords: ['reddit gif downloader', 'download reddit gif', 'reddit media downloader'],
  }),
  makeRoute({
    routeSlug: 'vimeo-downloader',
    toolSlug: 'vimeo-video-downloader',
    platform: 'Vimeo',
    intentLabel: 'Video',
    tabGroup: 'vimeo',
    contentTypes: ['Videos', 'Audio', 'Thumbnails'],
    placeholder: 'Paste Vimeo video URL',
    description:
      'Fetch public Vimeo video metadata and download available public formats with a clean downloader UI.',
    keywords: ['vimeo downloader', 'vimeo video downloader', 'download vimeo video'],
  }),
  makeRoute({
    routeSlug: 'dailymotion-downloader',
    toolSlug: 'dailymotion-video-downloader',
    platform: 'Dailymotion',
    intentLabel: 'Video',
    tabGroup: 'dailymotion',
    contentTypes: ['Videos', 'Playlists', 'Audio'],
    placeholder: 'Paste Dailymotion video URL',
    description:
      'Download public Dailymotion videos and playlist media where source formats are available.',
    keywords: ['dailymotion downloader', 'download dailymotion video', 'dailymotion video downloader'],
  }),
  makeRoute({
    routeSlug: 'dailymotion-playlist-downloader',
    toolSlug: 'dailymotion-video-downloader',
    platform: 'Dailymotion',
    intentLabel: 'Playlist',
    tabGroup: 'dailymotion',
    contentTypes: ['Playlists', 'Videos', 'Audio'],
    placeholder: 'Paste Dailymotion playlist URL',
    description:
      'Analyze public Dailymotion playlists and save accessible video or audio formats when supported.',
    keywords: ['dailymotion playlist downloader', 'download dailymotion playlist', 'playlist downloader'],
  }),
  makeRoute({
    routeSlug: 'snapchat-downloader',
    toolSlug: 'snapchat-downloader',
    platform: 'Snapchat',
    intentLabel: 'Spotlight',
    tabGroup: 'snapchat',
    contentTypes: ['Spotlight', 'Public Stories', 'Videos'],
    placeholder: 'Paste Snapchat public URL',
    description:
      'Download public Snapchat Spotlight and story media when the source is accessible without login.',
    keywords: ['snapchat downloader', 'snapchat spotlight downloader', 'download snapchat video'],
  }),
  makeRoute({
    routeSlug: 'snapchat-story-downloader',
    toolSlug: 'snapchat-downloader',
    platform: 'Snapchat',
    intentLabel: 'Story',
    tabGroup: 'snapchat',
    contentTypes: ['Public Stories', 'Spotlight', 'Videos'],
    placeholder: 'Paste Snapchat public story URL',
    description:
      'Save publicly accessible Snapchat stories with a lightweight paste, preview, and download workflow.',
    keywords: ['snapchat story downloader', 'download snapchat story', 'snapchat public story downloader'],
  }),
  makeRoute({
    routeSlug: 'linkedin-video-downloader',
    toolSlug: 'linkedin-video-downloader',
    platform: 'LinkedIn',
    intentLabel: 'Video',
    tabGroup: 'linkedin',
    contentTypes: ['Video Posts', 'Live Recordings', 'Public Posts'],
    placeholder: 'Paste LinkedIn video post URL',
    description:
      'Save public LinkedIn video posts and accessible live recordings with a focused downloader workflow.',
    keywords: ['linkedin video downloader', 'download linkedin video', 'linkedin post video downloader'],
  }),
  makeRoute({
    routeSlug: 'linkedin-live-downloader',
    toolSlug: 'linkedin-video-downloader',
    platform: 'LinkedIn',
    intentLabel: 'Live',
    tabGroup: 'linkedin',
    contentTypes: ['Live Recordings', 'Video Posts', 'Public Posts'],
    placeholder: 'Paste LinkedIn public live recording URL',
    description:
      'Download accessible LinkedIn live recordings when the public source exposes supported media formats.',
    keywords: ['linkedin live downloader', 'download linkedin live', 'linkedin video downloader'],
  }),
  makeRoute({
    routeSlug: 'telegram-video-downloader',
    toolSlug: 'telegram-video-downloader',
    platform: 'Telegram',
    intentLabel: 'Video',
    tabGroup: 'telegram',
    contentTypes: ['Channel Videos', 'Public Media', 'Posts'],
    placeholder: 'Paste Telegram public post URL',
    description:
      'Download public Telegram channel videos and media posts when links are openly accessible.',
    keywords: ['telegram video downloader', 'telegram media downloader', 'download telegram video'],
  }),
  makeRoute({
    routeSlug: 'telegram-media-downloader',
    toolSlug: 'telegram-video-downloader',
    platform: 'Telegram',
    intentLabel: 'Media',
    tabGroup: 'telegram',
    contentTypes: ['Public Media', 'Channel Videos', 'Posts'],
    placeholder: 'Paste Telegram public media URL',
    description:
      'Save public Telegram media posts and channel videos with a stateless browser-friendly downloader.',
    keywords: ['telegram media downloader', 'download telegram media', 'telegram channel downloader'],
  }),
  makeRoute({
    routeSlug: 'twitch-clip-downloader',
    toolSlug: 'twitch-clip-downloader',
    platform: 'Twitch',
    intentLabel: 'Clip',
    tabGroup: 'twitch',
    contentTypes: ['Clips', 'VODs', 'Streams'],
    placeholder: 'Paste Twitch clip or VOD URL',
    description:
      'Download public Twitch clips, VODs, and stream media when supported and accessible.',
    keywords: ['twitch clip downloader', 'download twitch clips', 'twitch vod downloader'],
  }),
  makeRoute({
    routeSlug: 'twitch-vod-downloader',
    toolSlug: 'twitch-clip-downloader',
    platform: 'Twitch',
    intentLabel: 'VOD',
    tabGroup: 'twitch',
    contentTypes: ['VODs', 'Clips', 'Streams'],
    placeholder: 'Paste Twitch VOD URL',
    description:
      'Download public Twitch VOD media when the replay is accessible and supported by the source.',
    keywords: ['twitch vod downloader', 'download twitch vod', 'twitch video downloader'],
  }),
  makeRoute({
    routeSlug: 'bilibili-downloader',
    toolSlug: 'bilibili-downloader',
    platform: 'Bilibili',
    intentLabel: 'Video',
    tabGroup: 'bilibili',
    contentTypes: ['Videos', 'Streams', 'Clips'],
    placeholder: 'Paste Bilibili video URL',
    description:
      'Fetch public Bilibili videos and accessible stream media with a simple downloader interface.',
    keywords: ['bilibili downloader', 'download bilibili video', 'bilibili video downloader'],
  }),
  makeRoute({
    routeSlug: 'bilibili-stream-downloader',
    toolSlug: 'bilibili-downloader',
    platform: 'Bilibili',
    intentLabel: 'Stream',
    tabGroup: 'bilibili',
    contentTypes: ['Streams', 'Videos', 'Clips'],
    placeholder: 'Paste Bilibili public stream URL',
    description:
      'Save accessible Bilibili public stream media when downloadable formats are available.',
    keywords: ['bilibili stream downloader', 'download bilibili stream', 'bilibili downloader'],
  }),
  makeRoute({
    routeSlug: 'likee-video-downloader',
    toolSlug: 'likee-video-downloader',
    platform: 'Likee',
    intentLabel: 'Video',
    tabGroup: 'likee',
    contentTypes: ['Short Videos', 'Audio', 'Thumbnails'],
    placeholder: 'Paste Likee video URL',
    description:
      'Download public Likee short videos with quick metadata detection and direct save actions.',
    keywords: ['likee video downloader', 'download likee video', 'likee downloader'],
  }),
  makeRoute({
    routeSlug: 'mxtakatak-downloader',
    toolSlug: 'mxtakatak-downloader',
    platform: 'MX TakaTak',
    intentLabel: 'Video',
    tabGroup: 'mxtakatak',
    contentTypes: ['Short Videos', 'Audio', 'Thumbnails'],
    placeholder: 'Paste MX TakaTak video URL',
    description:
      'Save public MX TakaTak short videos where source media is supported.',
    keywords: ['mx takatak downloader', 'mxtakatak video downloader', 'download mx takatak video'],
  }),
  makeRoute({
    routeSlug: 'sharechat-video-downloader',
    toolSlug: 'sharechat-video-downloader',
    platform: 'ShareChat',
    intentLabel: 'Video',
    tabGroup: 'sharechat',
    contentTypes: ['Videos', 'Moj Shorts', 'Public Posts'],
    placeholder: 'Paste ShareChat or Moj video URL',
    description:
      'Download public ShareChat videos and Moj short videos when publicly accessible.',
    keywords: ['sharechat video downloader', 'moj video downloader', 'download sharechat video'],
  }),
  makeRoute({
    routeSlug: 'moj-video-downloader',
    toolSlug: 'sharechat-video-downloader',
    platform: 'Moj',
    intentLabel: 'Video',
    tabGroup: 'sharechat',
    contentTypes: ['Moj Shorts', 'Videos', 'Public Posts'],
    placeholder: 'Paste Moj video URL',
    description:
      'Save public Moj short videos through the ShareChat downloader workflow when media is accessible.',
    keywords: ['moj video downloader', 'download moj video', 'moj downloader'],
  }),
  makeRoute({
    routeSlug: 'roposo-video-downloader',
    toolSlug: 'roposo-video-downloader',
    platform: 'Roposo',
    intentLabel: 'Video',
    tabGroup: 'roposo',
    contentTypes: ['Short Videos', 'Posts', 'Audio'],
    placeholder: 'Paste Roposo video URL',
    description:
      'Download publicly accessible Roposo short videos with a clean mobile-first downloader.',
    keywords: ['roposo video downloader', 'download roposo video', 'roposo downloader'],
  }),
  makeRoute({
    routeSlug: 'triller-video-downloader',
    toolSlug: 'triller-video-downloader',
    platform: 'Triller',
    intentLabel: 'Video',
    tabGroup: 'triller',
    contentTypes: ['Short Videos', 'Music Clips', 'Posts'],
    placeholder: 'Paste Triller video URL',
    description:
      'Save public Triller short videos with lightweight metadata and direct download options.',
    keywords: ['triller video downloader', 'download triller video', 'triller downloader'],
  }),
]

export const DOWNLOADER_ROUTE_BY_SLUG = new Map(
  DOWNLOADER_ROUTES.map(route => [route.routeSlug, route])
)

export const DOWNLOADER_ROUTE_BY_TOOL_SLUG = DOWNLOADER_ROUTES.reduce(
  (map, route) => {
    if (!map.has(route.toolSlug)) {
      map.set(route.toolSlug, route)
    }
    return map
  },
  new Map<string, DownloaderRouteEntry>()
)

export function getDownloaderRoute(slug: string) {
  return DOWNLOADER_ROUTE_BY_SLUG.get(slug) || null
}

export function getDownloaderRouteByToolSlug(toolSlug: string) {
  return DOWNLOADER_ROUTE_BY_TOOL_SLUG.get(toolSlug) || null
}

export function getDownloaderPageName(route: DownloaderRouteEntry) {
  return route.title.split(' - ')[0] || route.title
}

export function getDownloaderTabs(route: DownloaderRouteEntry): DownloaderTab[] {
  return DOWNLOADER_ROUTES.filter(item => item.tabGroup === route.tabGroup).map(item => ({
    label: item.intentLabel,
    routeSlug: item.routeSlug,
  }))
}

export function getRelatedDownloaderRoutes(route: DownloaderRouteEntry, limit = 6) {
  const sameGroup = DOWNLOADER_ROUTES.filter(
    item => item.tabGroup === route.tabGroup && item.routeSlug !== route.routeSlug
  )
  const crossPlatform = DOWNLOADER_ROUTES.filter(
    item => item.tabGroup !== route.tabGroup && item.intentLabel === 'Video'
  )

  return [...sameGroup, ...crossPlatform].slice(0, limit)
}
