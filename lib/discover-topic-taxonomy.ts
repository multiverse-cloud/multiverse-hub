export type DiscoverTopicTaxonomyEntry = {
  category: string
  priority: 'highest' | 'high' | 'medium'
  topicClusters: string[]
  examplePageIdeas: string[]
}

export const DISCOVER_HIGH_TRAFFIC_TOPIC_TAXONOMY: DiscoverTopicTaxonomyEntry[] = [
  {
    category: 'AI',
    priority: 'highest',
    topicClusters: ['AI tools', 'AI use cases', 'AI workflows', 'AI comparisons', 'AI for beginners'],
    examplePageIdeas: [
      'Best AI Tools for Students',
      'Best AI Tools for Content Creation',
      'Best AI Tools for Startups',
      'How to Start Using AI Tools for Work',
    ],
  },
  {
    category: 'AI Models',
    priority: 'highest',
    topicClusters: ['coding models', 'image models', 'video models', 'speech models', 'reasoning models'],
    examplePageIdeas: [
      'Best AI Models for Coding',
      'Best AI Models for Image Generation',
      'Best AI Models for Video Generation',
      'Best AI Models for Reasoning Tasks',
    ],
  },
  {
    category: 'Apps',
    priority: 'highest',
    topicClusters: ['note apps', 'finance apps', 'study apps', 'creator apps', 'productivity apps'],
    examplePageIdeas: [
      'Best Note Taking Apps for Students',
      'Best Budget Apps for Beginners',
      'Best Productivity Apps for Daily Work',
      'Best Mobile Apps for Creators',
    ],
  },
  {
    category: 'Software',
    priority: 'highest',
    topicClusters: ['office software', 'editing software', 'developer tools', 'business software', 'design tools'],
    examplePageIdeas: [
      'Best Video Editing Software for Beginners',
      'Best Free Software for Startups',
      'Best Developer Software for Productivity',
      'Best Software for Small Teams',
    ],
  },
  {
    category: 'Tech',
    priority: 'highest',
    topicClusters: ['consumer tech', 'platform comparisons', 'internet tools', 'gadget explainers', 'productivity tech'],
    examplePageIdeas: [
      'Best Consumer Tech Products This Year',
      'Best Tech for Remote Work',
      'Best Tech Tools for Students',
      'Best Tech Platforms for Creators',
    ],
  },
  {
    category: 'Mobile Problems',
    priority: 'highest',
    topicClusters: ['battery drain', 'overheating', 'storage full', 'lagging phones', 'network issues'],
    examplePageIdeas: [
      'How to Fix Phone Battery Drain Fast',
      'How to Fix Phone Overheating',
      'How to Free Up Storage on Your Phone',
      'How to Fix Slow Android Phones',
    ],
  },
  {
    category: 'Editing Apps',
    priority: 'high',
    topicClusters: ['video editing apps', 'photo editing apps', 'reels editors', 'mobile editors'],
    examplePageIdeas: [
      'Best Editing Apps for Reels',
      'Best Mobile Video Editing Apps',
      'Best Photo Editing Apps for Beginners',
      'Best Editing Apps for YouTube Shorts',
    ],
  },
  {
    category: 'Designers',
    priority: 'high',
    topicClusters: ['UI designers', 'product designers', 'fashion designers', 'graphic designers'],
    examplePageIdeas: [
      'Best UI Designers to Follow',
      'Best Product Designers to Learn From',
      'Most Influential Modern Designers',
      'Best Designers for Brand Inspiration',
    ],
  },
  {
    category: 'YouTubers',
    priority: 'high',
    topicClusters: ['tech YouTubers', 'education creators', 'gaming YouTubers', 'business creators'],
    examplePageIdeas: [
      'Best Tech YouTubers to Follow',
      'Best Educational YouTubers for Students',
      'Best Finance YouTubers for Beginners',
      'Best Gaming YouTubers Right Now',
    ],
  },
  {
    category: 'Creator Economy',
    priority: 'high',
    topicClusters: ['content creation', 'creator tools', 'monetization', 'short-form workflows'],
    examplePageIdeas: [
      'Best Creator Tools for YouTube',
      'Best Apps for Short Form Content',
      'How to Build a Creator Workflow',
      'Best Tools for Solo Creators',
    ],
  },
  {
    category: 'Sports',
    priority: 'highest',
    topicClusters: ['greatest players', 'sports guides', 'tournaments', 'team comparisons', 'sports history'],
    examplePageIdeas: [
      'Best Football Players of All Time',
      'Best Cricket Players by Format',
      'Best Sports Documentaries to Watch',
      'How to Start Following Formula 1',
    ],
  },
  {
    category: 'Politics',
    priority: 'high',
    topicClusters: ['leaders', 'elections', 'political systems', 'party explainers'],
    examplePageIdeas: [
      'Most Influential Political Leaders in Modern History',
      'How to Understand Election Systems',
      'Best Political Documentaries to Start With',
      'Key Political Events That Changed the World',
    ],
  },
  {
    category: 'Geopolitics',
    priority: 'high',
    topicClusters: ['conflict zones', 'alliances', 'world powers', 'regional explainers'],
    examplePageIdeas: [
      'How to Start Understanding Geopolitics',
      'Most Important Geopolitical Regions to Follow',
      'Best Beginner Resources for Geopolitics',
      'Major Global Alliances Explained Simply',
    ],
  },
  {
    category: 'History',
    priority: 'high',
    topicClusters: ['ancient history', 'modern history', 'empires', 'turning points', 'historical figures'],
    examplePageIdeas: [
      'Best History Topics for Beginners',
      'Most Important Turning Points in World History',
      'Best Historical Figures to Learn About',
      'Best History Books to Start With',
    ],
  },
  {
    category: 'War & Defense',
    priority: 'high',
    topicClusters: ['battles', 'war leaders', 'military technology', 'war timelines'],
    examplePageIdeas: [
      'Most Important Battles in Modern History',
      'Best War Movies to Start With',
      'Most Influential Military Leaders',
      'How to Learn War History as a Beginner',
    ],
  },
  {
    category: 'Space',
    priority: 'high',
    topicClusters: ['space missions', 'astronauts', 'rockets', 'planets', 'space agencies'],
    examplePageIdeas: [
      'Best Space Missions of All Time',
      'Most Important Space Agencies to Know',
      'How to Start Learning About Space',
      'Best Space Documentaries for Beginners',
    ],
  },
  {
    category: 'Games',
    priority: 'highest',
    topicClusters: ['mobile games', 'pc games', 'story games', 'multiplayer games', 'gaming guides'],
    examplePageIdeas: [
      'Best Mobile Games Right Now',
      'Best Story Games for Beginners',
      'Best Multiplayer Games With Friends',
      'Best Indie Games to Play',
    ],
  },
  {
    category: 'Startups',
    priority: 'high',
    topicClusters: ['startup tools', 'founder workflows', 'growth tools', 'productivity systems'],
    examplePageIdeas: [
      'Best Tools for Startup Founders',
      'Best Startup Software for Small Teams',
      'How to Build a Startup Tool Stack',
      'Best Productivity Systems for Founders',
    ],
  },
  {
    category: 'Productivity',
    priority: 'highest',
    topicClusters: ['time management', 'focus systems', 'task management', 'workflows'],
    examplePageIdeas: [
      'Best Productivity Systems for Busy People',
      'Best Task Management Apps',
      'How to Build a Daily Productivity Workflow',
      'Best Focus Apps for Deep Work',
    ],
  },
  {
    category: 'Career',
    priority: 'high',
    topicClusters: ['career growth', 'remote work', 'portfolio building', 'learning paths'],
    examplePageIdeas: [
      'Best Career Skills to Learn Right Now',
      'Best Remote Work Tools',
      'How to Build a Strong Portfolio',
      'Best Career Resources for Beginners',
    ],
  },
  {
    category: 'Education',
    priority: 'high',
    topicClusters: ['learning tools', 'study methods', 'online courses', 'student workflows'],
    examplePageIdeas: [
      'Best Study Apps for Students',
      'Best Learning Platforms for Beginners',
      'Best Online Courses by Category',
      'How to Build a Better Study Workflow',
    ],
  },
  {
    category: 'Finance & Investing',
    priority: 'high',
    topicClusters: ['budgeting', 'investing basics', 'wealth building', 'beginner finance'],
    examplePageIdeas: [
      'Best Finance Apps for Beginners',
      'Best Investing Books to Start With',
      'How to Start Learning About Investing',
      'Best Budgeting Systems for Young Professionals',
    ],
  },
  {
    category: 'Crypto',
    priority: 'medium',
    topicClusters: ['crypto basics', 'wallets', 'blockchain explainers', 'crypto learning'],
    examplePageIdeas: [
      'Best Crypto Wallets for Beginners',
      'How to Start Learning Crypto Safely',
      'Best Crypto Resources for Beginners',
      'Key Crypto Terms Explained Simply',
    ],
  },
  {
    category: 'Cybersecurity',
    priority: 'high',
    topicClusters: ['security tools', 'password safety', 'privacy basics', 'threat awareness'],
    examplePageIdeas: [
      'Best Password Managers to Use',
      'Best Cybersecurity Tools for Beginners',
      'How to Protect Your Accounts Better',
      'Best Privacy Tools for Everyday Use',
    ],
  },
  {
    category: 'SEO & Marketing',
    priority: 'high',
    topicClusters: ['SEO basics', 'marketing tools', 'content workflows', 'keyword strategy'],
    examplePageIdeas: [
      'Best SEO Tools for Beginners',
      'Best Marketing Apps for Small Teams',
      'How to Build a Content Workflow',
      'Best Keyword Research Tools to Start With',
    ],
  },
  {
    category: 'Streaming Platforms',
    priority: 'high',
    topicClusters: ['OTT comparisons', 'platform guides', 'streaming picks', 'best by genre'],
    examplePageIdeas: [
      'Best Streaming Platforms by Content Type',
      'Best OTT Platforms for Movies',
      'How to Pick a Streaming Platform',
      'Best Platforms for Anime and Series',
    ],
  },
  {
    category: 'Smartphones',
    priority: 'highest',
    topicClusters: ['battery life', 'camera phones', 'gaming phones', 'budget phones'],
    examplePageIdeas: [
      'Best Smartphones for Battery Life',
      'Best Camera Phones Right Now',
      'Best Budget Phones by Use Case',
      'Best Phones for Gaming',
    ],
  },
  {
    category: 'Laptops',
    priority: 'high',
    topicClusters: ['student laptops', 'creator laptops', 'coding laptops', 'budget laptops'],
    examplePageIdeas: [
      'Best Laptops for Students',
      'Best Laptops for Coding',
      'Best Laptops for Video Editing',
      'Best Budget Laptops to Buy',
    ],
  },
  {
    category: 'Gadgets',
    priority: 'medium',
    topicClusters: ['smart home', 'wearables', 'desk setup', 'travel gadgets'],
    examplePageIdeas: [
      'Best Gadgets for Productivity',
      'Best Desk Setup Gadgets',
      'Best Travel Gadgets to Carry',
      'Best Smart Home Gadgets for Beginners',
    ],
  },
  {
    category: 'Cars & EVs',
    priority: 'medium',
    topicClusters: ['electric vehicles', 'car tech', 'car buying guides', 'best by use case'],
    examplePageIdeas: [
      'Best EVs for City Driving',
      'Best Cars for Long Trips',
      'How to Start Understanding EVs',
      'Best Car Tech Features Right Now',
    ],
  },
  {
    category: 'Science',
    priority: 'medium',
    topicClusters: ['science explainers', 'discoveries', 'famous scientists', 'beginner science topics'],
    examplePageIdeas: [
      'Best Science Topics for Beginners',
      'Most Important Scientific Discoveries',
      'Best Scientists to Learn About',
      'Best Science Documentaries to Start With',
    ],
  },
  {
    category: 'Internet Culture',
    priority: 'medium',
    topicClusters: ['memes', 'platform culture', 'online communities', 'creator trends'],
    examplePageIdeas: [
      'Biggest Internet Trends Right Now',
      'How to Understand Internet Culture Better',
      'Best Online Communities by Interest',
      'Top Creator Trends to Watch',
    ],
  },
] as const

