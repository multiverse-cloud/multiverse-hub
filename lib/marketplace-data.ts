export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: 'template' | 'project' | 'course' | 'bundle' | 'freebie'
  tags: string[]
  techStack: string[]
  image: string
  badge?: 'bestseller' | 'new' | 'updated' | 'free'
  rating: number
  reviews: number
  buyUrl: string
  demoUrl?: string
  pages?: number
  components?: number
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'saas-dashboard-pro',
    name: 'SaaS Dashboard Pro',
    description: 'Complete admin dashboard with 50+ components, dark mode, charts, and full responsiveness.',
    price: 49,
    originalPrice: 99,
    category: 'template',
    tags: ['dashboard', 'saas', 'admin'],
    techStack: ['Next.js', 'Tailwind', 'shadcn/ui', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 234,
    buyUrl: 'https://gumroad.com',
    demoUrl: '#',
    pages: 15,
    components: 60,
    featured: true,
  },
  {
    id: 'landing-page-kit',
    name: 'Landing Page Kit',
    description: '10 premium landing page templates for SaaS, apps, and agencies.',
    price: 29,
    originalPrice: 59,
    category: 'template',
    tags: ['landing', 'marketing', 'saas'],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    badge: 'new',
    rating: 4.7,
    reviews: 89,
    buyUrl: 'https://gumroad.com',
    demoUrl: '#',
    pages: 10,
    featured: true,
  },
  {
    id: 'fullstack-auth-starter',
    name: 'Full-Stack Auth Starter',
    description: 'Production-ready Next.js + Prisma + Auth.js starter with dashboard.',
    price: 69,
    category: 'project',
    tags: ['fullstack', 'auth', 'nextjs'],
    techStack: ['Next.js 14', 'Prisma', 'PostgreSQL', 'Auth.js', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    badge: 'bestseller',
    rating: 4.8,
    reviews: 156,
    buyUrl: 'https://gumroad.com',
    demoUrl: '#',
    featured: true,
  },
  {
    id: 'react-component-library',
    name: 'React Component Library',
    description: '200+ beautiful React components with Storybook documentation.',
    price: 39,
    category: 'template',
    tags: ['components', 'react', 'ui'],
    techStack: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    badge: 'updated',
    rating: 4.6,
    reviews: 312,
    buyUrl: 'https://gumroad.com',
    demoUrl: '#',
    components: 200,
  },
  {
    id: 'nextjs-mastery-course',
    name: 'Next.js 14 Mastery',
    description: 'Build 5 production-ready apps. App Router, Server Components, and deployment.',
    price: 79,
    originalPrice: 149,
    category: 'course',
    tags: ['course', 'nextjs', 'react'],
    techStack: ['Next.js 14', 'TypeScript', 'Prisma', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 567,
    buyUrl: 'https://gumroad.com',
    featured: true,
  },
  {
    id: 'ecommerce-starter',
    name: 'E-Commerce Starter',
    description: 'Complete Next.js e-commerce with Stripe, inventory, and admin panel.',
    price: 89,
    category: 'project',
    tags: ['ecommerce', 'stripe', 'fullstack'],
    techStack: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    badge: 'new',
    rating: 4.7,
    reviews: 78,
    buyUrl: 'https://gumroad.com',
    demoUrl: '#',
  },
  {
    id: 'ui-prompt-pack',
    name: 'AI UI Prompt Pack',
    description: '500+ tested prompts for generating stunning UI with AI tools.',
    price: 0,
    category: 'freebie',
    tags: ['prompts', 'ai', 'ui', 'free'],
    techStack: ['ChatGPT', 'Claude', 'Midjourney'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    badge: 'free',
    rating: 4.5,
    reviews: 892,
    buyUrl: '#',
    featured: true,
  },
  {
    id: 'tailwind-component-bundle',
    name: 'Tailwind Pro Bundle',
    description: 'Complete Tailwind UI kit with 300+ components and 20 page layouts.',
    price: 59,
    originalPrice: 119,
    category: 'bundle',
    tags: ['tailwind', 'bundle', 'components'],
    techStack: ['Tailwind CSS', 'Alpine.js', 'Vanilla JS'],
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&h=400&fit=crop',
    badge: 'bestseller',
    rating: 4.8,
    reviews: 445,
    buyUrl: 'https://gumroad.com',
    demoUrl: '#',
    components: 300,
  },
]

export const MARKETPLACE_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'LayoutGrid' },
  { id: 'template', name: 'UI Templates', icon: 'Layout' },
  { id: 'project', name: 'Full-Stack Projects', icon: 'Code2' },
  { id: 'course', name: 'Courses', icon: 'GraduationCap' },
  { id: 'bundle', name: 'Bundles', icon: 'Package' },
  { id: 'freebie', name: 'Free Resources', icon: 'Gift' },
]
