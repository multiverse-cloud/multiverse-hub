# 🌌 Multiverse – Universe of Free Tools

> One platform. Multiple universes. 150+ free tools, AI, entertainment, news, and marketplace — the ultimate mini internet.

## ✨ Features

- **150+ Free Tools** across PDF, Image, Video, Audio, Text, Dev, SEO, Calculators, AI
- **10 Universes**: Tools, AI Hub, Design AI, Entertainment, News, Learn, Daily, Dev, Discover, Marketplace
- **AI-Powered**: Chat with GPT-4o, Claude, Gemini via OpenRouter
- **Entertainment**: Movies & TV series via TMDB
- **News**: Live AI & Tech news via GNews
- **Marketplace**: Premium templates, projects & courses
- **Admin Panel**: Full control center at `/admin`
- **No Login Required** for any tool
- **Dark/Light Mode** with system preference
- **Fully Responsive** mobile-first design

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

| Key | Where to get | Required? |
|-----|-------------|-----------|
| `NEXT_PUBLIC_OPENROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai) | For AI tools |
| `NEXT_PUBLIC_TMDB_API_KEY` | [developer.themoviedb.org](https://developer.themoviedb.org) | For entertainment |
| `NEXT_PUBLIC_GNEWS_API_KEY` | [gnews.io](https://gnews.io) | For news |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [clerk.com](https://clerk.com) | For auth (optional) |

**Note:** All free tier keys. The platform works in demo mode without any keys.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### 4. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
multiverse/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx            # Homepage
│   ├── tools/              # Tools universe
│   │   ├── page.tsx        # All tools listing
│   │   ├── [category]/     # Category page
│   │   │   └── [tool]/     # Individual tool page
│   ├── ai/                 # AI Hub
│   ├── design/             # Design AI
│   ├── entertainment/      # Movies & TV
│   ├── news/               # News
│   ├── learn/              # Study tools
│   ├── daily/              # Daily utilities
│   ├── dev/                # Dev tools
│   ├── discover/           # Top-10 lists
│   ├── marketplace/        # Digital products
│   ├── admin/              # Admin dashboard
│   ├── sign-in/            # Auth pages
│   └── sign-up/
├── components/
│   ├── layout/             # Navbar, Footer, PublicLayout
│   ├── home/               # Homepage sections
│   ├── tools/              # ToolCard, ToolDetailClient, UploadZone
│   ├── ai/                 # AI chat interface
│   ├── entertainment/      # Media cards & grid
│   ├── news/               # Article cards
│   ├── design/             # Design AI studio
│   ├── learn/              # Study tools
│   ├── daily/              # Calculators
│   ├── dev/                # Dev utilities
│   ├── discover/           # Top-10 lists
│   ├── marketplace/        # Product cards & grid
│   └── admin/              # Admin layout & components
├── lib/
│   ├── tools-data.ts       # 150+ tool definitions
│   ├── marketplace-data.ts # Product catalogue
│   ├── discover-data.ts    # Top-10 lists
│   └── utils.ts            # Utilities & API helpers
└── .env.example            # Environment variables template
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Components | shadcn/ui + Radix UI |
| Fonts | Outfit (display) + JetBrains Mono |
| Auth | Clerk (optional) |
| AI | OpenRouter (GPT-4o, Claude, Gemini) |
| Images | Pollinations AI (free) |
| PDF Processing | pdf-lib |
| File Handling | React Dropzone |
| Themes | next-themes |
| Toasts | react-hot-toast |
| State | React useState/useMemo |
| Icons | Lucide React |

## 🔑 API Integrations

All APIs used have **free tiers**:

- **OpenRouter** – AI models (free tier includes Gemini Flash, Llama 3.1, etc.)
- **TMDB** – Movies & TV (completely free, unlimited)
- **GNews** – News (100 requests/day free)
- **Pollinations AI** – Image generation (completely free, no key)
- **QR Server** – QR codes (completely free, no key)

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

Add environment variables in Vercel dashboard.

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Adding New Tools

1. Add tool definition to `lib/tools-data.ts`:

```typescript
{
  id: 'my-new-tool',
  name: 'My New Tool',
  description: 'What it does',
  category: 'Text Tools',
  categorySlug: 'text',
  icon: 'Sparkles',
  slug: 'my-new-tool',
  tags: ['new'],
  implemented: true,
  inputType: 'text',
  outputType: 'text',
}
```

2. Add processing logic in `components/tools/ToolDetailClient.tsx` inside `processTextTool()`

3. Tool automatically appears in the listing, category page, and search!

## 🎨 Customisation

### Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --primary: 245 75% 60%;  /* Main purple-indigo */
  --background: 0 0% 100%; /* White */
  --radius: 0.75rem;        /* Border radius */
}
```

### Adding Marketplace Products
Add to `lib/marketplace-data.ts`:
```typescript
{
  id: 'my-product',
  name: 'My Product',
  price: 49,
  buyUrl: 'https://gumroad.com/l/my-product',
  // ...
}
```

## 📄 License

MIT License — free to use, modify and distribute.

---

Built with ❤️ by the Multiverse Team · [multiverse-tools.vercel.app](https://multiverse-tools.vercel.app)
