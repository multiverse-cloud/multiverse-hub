export const DISCOVER_PRIORITY_LANGUAGES = [
  'Tamil',
  'Telugu',
  'Hindi',
  'English',
  'Korean',
  'Malayalam',
] as const

export const DISCOVER_PRIORITY_MEDIA = [
  'Movies',
  'Series',
  'Songs',
  'Actors',
  'Actresses',
  'Directors',
] as const

export const DISCOVER_EXPANSION_VERTICALS = [
  {
    category: 'War & Defense',
    clusters: ['war history', 'famous battles', 'military leaders', 'defense technology'],
  },
  {
    category: 'Sports',
    clusters: ['football', 'cricket', 'tennis', 'olympics', 'greatest players'],
  },
  {
    category: 'Politics',
    clusters: ['leaders', 'elections', 'political history', 'party explainers'],
  },
  {
    category: 'Geopolitics',
    clusters: ['global conflicts', 'alliances', 'regional flashpoints', 'world powers'],
  },
  {
    category: 'History',
    clusters: ['ancient history', 'modern history', 'empire timelines', 'turning points'],
  },
  {
    category: 'Space',
    clusters: ['missions', 'space agencies', 'rockets', 'astronauts', 'planets'],
  },
  {
    category: 'Games',
    clusters: ['best games', 'mobile games', 'pc games', 'story games', 'multiplayer'],
  },
  {
    category: 'Apps',
    clusters: ['productivity apps', 'note apps', 'finance apps', 'education apps'],
  },
  {
    category: 'Software',
    clusters: ['video editing software', 'design software', 'developer software', 'office tools'],
  },
  {
    category: 'Tech',
    clusters: ['gadgets', 'platform comparisons', 'internet tools', 'smart home'],
  },
  {
    category: 'Mobile Problems',
    clusters: ['battery drain', 'overheating', 'storage full', 'phone lag', 'network issues'],
  },
  {
    category: 'AI',
    clusters: ['AI tools', 'AI use cases', 'AI workflows', 'AI comparisons'],
  },
  {
    category: 'AI Models',
    clusters: ['LLMs', 'image models', 'video models', 'speech models', 'coding models'],
  },
  {
    category: 'Designers',
    clusters: ['famous designers', 'UI designers', 'fashion designers', 'product designers'],
  },
  {
    category: 'Editing Apps',
    clusters: ['video editing apps', 'photo editing apps', 'mobile editors', 'creator stacks'],
  },
  {
    category: 'YouTubers',
    clusters: ['tech youtubers', 'education creators', 'gaming youtubers', 'film channels'],
  },
] as const

export const DISCOVER_PRIORITY_GENRES = [
  'Thriller',
  'Action',
  'Romance',
  'Comedy',
  'Family',
  'Crime',
  'Horror',
  'Sci-Fi',
  'Emotional',
  'Feel-good',
] as const

export const DISCOVER_PRIORITY_USE_CASES = [
  'Beginners',
  'Weekend Watch',
  'Binge Watch',
  'Family Watch',
  'Couples',
  'Friends',
  'Road Trip',
  'Workout',
  'Late Night',
  'Underrated Picks',
] as const

export const DISCOVER_PAGE_FORMULAS = {
  movies: [
    'Best {language} {genre} Movies',
    'Best {language} {genre} Movies for {useCase}',
    'Top {number} {genre} Movies to Watch This {timeframe}',
    'Underrated {language} Movies You Should Watch',
    'Best Family-Friendly {language} Movies',
    'Best Beginner-Friendly {genre} Movies',
  ],
  series: [
    'Best {language} Series to Binge Watch',
    'Best {genre} Series for Beginners',
    'Best Short {genre} Series',
    'Best Crime Series Worth Watching',
    'Best Weekend Series to Finish Fast',
  ],
  songs: [
    'Best {language} Songs for {mood}',
    'Top Road Trip Songs in {language}',
    'Best {mood} Songs for Night Drive',
    'Best Wedding Songs in {language}',
    'Best Workout Songs in {language}',
  ],
  actors: [
    'Best {genre} Actors in Modern Cinema',
    'Most Versatile {language} Actors',
    'Best Family Audience Favorite Actors',
    'Best Action Actors to Watch',
  ],
  actresses: [
    'Best {language} Actresses With Strong Screen Presence',
    'Most Versatile Actresses in Modern Cinema',
    'Best Actresses for Emotional Drama Roles',
  ],
  directors: [
    'Best Thriller Directors in Modern Cinema',
    'Best Directors for Beginners to Explore',
    'Visionary Directors With Distinct Style',
  ],
  guides: [
    'How to Start With {language} {media}',
    'How to Pick the Right {genre} Movie for {useCase}',
    'How to Build a {mood} Playlist',
    'How to Explore {directorType} Movies',
    'How to Choose a Weekend Watch Fast',
  ],
} as const

export const DISCOVER_HIGH_TRAFFIC_CLUSTERS = [
  {
    category: 'Movies',
    priority: 'highest',
    seedTitles: [
      'Best Tamil Thriller Movies',
      'Best Tamil Family Movies',
      'Best Tamil Comedy Movies',
      'Best Tamil Romantic Movies',
      'Best Tamil Action Movies',
      'Underrated Tamil Movies to Watch',
      'Best Weekend Tamil Movies',
      'Best Korean Thriller Movies',
      'Best Hindi Thriller Movies',
      'Best English Sci-Fi Movies',
    ],
  },
  {
    category: 'Series',
    priority: 'highest',
    seedTitles: [
      'Best Korean Dramas for Beginners',
      'Best Crime Series Worth Bingeing',
      'Best Short Series to Finish This Weekend',
      'Best Thriller Series for Beginners',
      'Best Family-Friendly Series',
      'Best Comedy Series to Watch With Friends',
      'Best Late-Night Binge Series',
      'Best Sci-Fi Series for Beginners',
    ],
  },
  {
    category: 'Songs',
    priority: 'high',
    seedTitles: [
      'Top Tamil Road Trip Songs',
      'Best Tamil Love Songs',
      'Best Hindi Road Trip Songs',
      'Best Rainy Day Songs',
      'Best Late-Night Drive Songs',
      'Best Workout Songs in Tamil',
      'Best Wedding Songs in Tamil',
      'Best Chill Songs for Evening',
    ],
  },
  {
    category: 'Actors',
    priority: 'high',
    seedTitles: [
      'Best Action Actors in Modern Cinema',
      'Most Versatile Tamil Actors',
      'Best Family Audience Favorite Actors',
      'Best Actors for Intense Thriller Roles',
      'Best Breakout Young Actors to Watch',
    ],
  },
  {
    category: 'Actresses',
    priority: 'high',
    seedTitles: [
      'Best Actresses With Strong Screen Presence',
      'Most Versatile Actresses in Modern Cinema',
      'Best Actresses for Emotional Drama Roles',
      'Best Breakout Actresses to Watch',
    ],
  },
  {
    category: 'Directors',
    priority: 'medium',
    seedTitles: [
      'Best Thriller Directors in Modern Cinema',
      'Best Directors for Beginners to Explore',
      'Visionary Directors With Distinct Style',
      'Best Directors for Family Audience Movies',
    ],
  },
  {
    category: 'Watch Guides',
    priority: 'highest',
    seedTitles: [
      'How to Start With Korean Dramas',
      'How to Pick a Weekend Movie Fast',
      'How to Choose the Right Thriller Movie',
      'How to Build a Road Trip Playlist',
      'How to Start Exploring Tamil Movies',
      'How to Pick Family-Friendly Movies',
    ],
  },
] as const

export const DISCOVER_SCALE_TARGETS = [
  {
    phase: 'phase-1',
    goal: '50-100 strong pages',
    breakdown: {
      rankings: 35,
      guides: 15,
      hubs: 10,
    },
  },
  {
    phase: 'phase-2',
    goal: '300-500 pages',
    breakdown: {
      rankings: 220,
      guides: 80,
      hubs: 40,
    },
  },
  {
    phase: 'phase-3',
    goal: '1000+ pages',
    breakdown: {
      rankings: 600,
      guides: 180,
      hubs: 120,
    },
  },
  {
    phase: 'phase-4',
    goal: '5000+ content units',
    breakdown: {
      rankings: 900,
      guides: 600,
      hubs: 500,
      rankingItems: 2400,
      faqUnits: 600,
    },
  },
] as const
