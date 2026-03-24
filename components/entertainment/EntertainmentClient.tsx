'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Clock3,
  ExternalLink,
  Film,
  Play,
  Search,
  Star,
  TrendingUp,
  Tv,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const TMDB_IMG = 'https://image.tmdb.org/t/p'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || ''

interface MediaItem {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  release_date?: string
  first_air_date?: string
}

const DEMO_MOVIES: MediaItem[] = [
  {
    id: 1,
    title: 'Dune: Part Two',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.5,
    overview:
      'Paul Atreides joins the Fremen while confronting the forces responsible for the destruction of his family.',
    release_date: '2024-03-01',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.9,
    overview: 'A historical drama following J. Robert Oppenheimer and the creation of the atomic bomb.',
    release_date: '2023-07-21',
  },
  {
    id: 3,
    title: 'Deadpool & Wolverine',
    poster_path: '',
    backdrop_path: '',
    vote_average: 7.8,
    overview: 'Deadpool and Wolverine are pulled into a larger multiverse conflict.',
    release_date: '2024-07-26',
  },
  {
    id: 4,
    title: 'Inside Out 2',
    poster_path: '',
    backdrop_path: '',
    vote_average: 7.7,
    overview: 'A new emotional chapter begins as Riley faces adolescence and a changing inner world.',
    release_date: '2024-06-14',
  },
  {
    id: 5,
    title: 'Alien: Romulus',
    poster_path: '',
    backdrop_path: '',
    vote_average: 7.3,
    overview: 'A group of young colonizers encounters one of the universe’s most dangerous life forms.',
    release_date: '2024-08-16',
  },
  {
    id: 6,
    title: 'Kingdom of the Planet of the Apes',
    poster_path: '',
    backdrop_path: '',
    vote_average: 7.0,
    overview: 'A new ape leader begins a journey that challenges the future of both apes and humans.',
    release_date: '2024-05-10',
  },
]

const DEMO_SHOWS: MediaItem[] = [
  {
    id: 101,
    name: 'House of the Dragon',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.4,
    overview: 'The Targaryen dynasty faces power struggles generations before Game of Thrones.',
    first_air_date: '2022-08-21',
  },
  {
    id: 102,
    name: 'The Bear',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.6,
    overview: 'A gifted chef returns home to run the family restaurant under intense pressure.',
    first_air_date: '2022-06-23',
  },
  {
    id: 103,
    name: 'Shogun',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.9,
    overview: 'Power, strategy, and survival collide in feudal Japan.',
    first_air_date: '2024-02-27',
  },
  {
    id: 104,
    name: 'The Last of Us',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.7,
    overview: 'Joel and Ellie cross a devastated America in a story of survival and connection.',
    first_air_date: '2023-01-15',
  },
  {
    id: 105,
    name: 'Fallout',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.4,
    overview: 'Vault-dwellers and survivors navigate a sharp, dangerous post-apocalyptic world.',
    first_air_date: '2024-04-11',
  },
  {
    id: 106,
    name: 'Severance',
    poster_path: '',
    backdrop_path: '',
    vote_average: 8.7,
    overview: 'A corporation splits the memories of employees between work and personal life.',
    first_air_date: '2022-02-18',
  },
]

const PLATFORM_ITEMS = [
  { name: 'Netflix', tone: 'bg-red-600 text-white', mark: 'N' },
  { name: 'Prime Video', tone: 'bg-sky-600 text-white', mark: 'P' },
  { name: 'Disney+', tone: 'bg-blue-700 text-white', mark: 'D' },
  { name: 'Apple TV+', tone: 'bg-slate-800 text-white', mark: 'A' },
  { name: 'Hulu', tone: 'bg-green-600 text-white', mark: 'H' },
  { name: 'Max', tone: 'bg-indigo-700 text-white', mark: 'M' },
]

function MediaCard({ item, type }: { item: MediaItem; type: 'movie' | 'tv' }) {
  const title = item.title || item.name || ''
  const date = item.release_date || item.first_air_date || ''
  const year = date ? new Date(date).getFullYear() : ''
  const typeLabel = type === 'movie' ? 'Movie' : 'Series'
  const TypeIcon = type === 'movie' ? Film : Tv

  return (
    <div className="premium-card group overflow-hidden hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {item.poster_path && API_KEY ? (
          <Image
            src={`${TMDB_IMG}/w300${item.poster_path}`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-700">
              <TypeIcon className="h-6 w-6 text-slate-700 dark:text-slate-100" />
            </div>
            <p className="mt-4 line-clamp-3 font-display text-base font-bold text-slate-900 dark:text-slate-50">
              {title}
            </p>
          </div>
        )}

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {item.vote_average.toFixed(1)}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm">
            <Play className="ml-0.5 h-5 w-5 fill-white" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-display text-base font-bold text-slate-950 transition-colors group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-300">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{year}</span>
          <span>&middot;</span>
          <span>{typeLabel}</span>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.overview}</p>
      </div>
    </div>
  )
}

export default function EntertainmentClient() {
  const [tab, setTab] = useState<'movies' | 'tv'>('movies')
  const [search, setSearch] = useState('')

  const items = tab === 'movies' ? DEMO_MOVIES : DEMO_SHOWS
  const filtered = search
    ? items.filter(item => (item.title || item.name || '').toLowerCase().includes(search.toLowerCase()))
    : items

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <Film className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              Entertainment Universe
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              Movies and Series
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Track trending titles, browse featured releases, and keep your watchlist aligned across major platforms.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search movies or series"
                value={search}
                onChange={event => setSearch(event.target.value)}
                className="premium-field pl-11"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[105px] z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="page-frame flex items-center gap-2 py-3">
          {[
            { key: 'movies', label: 'Movies', icon: Film },
            { key: 'tv', label: 'TV Series', icon: Tv },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as 'movies' | 'tv')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                tab === key
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="page-content">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
          <h2 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
            Trending {tab === 'movies' ? 'Movies' : 'TV Series'}
          </h2>
          {!API_KEY && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
              Demo data
            </span>
          )}
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map(item => (
            <MediaCard key={item.id} item={item} type={tab === 'movies' ? 'movie' : 'tv'} />
          ))}
        </div>

        <div className="mt-12 premium-card p-6">
          <h2 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">Streaming Platforms</h2>
          <div className="mt-5 grid gap-4 grid-cols-3 sm:grid-cols-6">
            {PLATFORM_ITEMS.map(platform => (
              <div
                key={platform.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-center transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className={cn('mx-auto flex h-11 w-11 items-center justify-center rounded-2xl text-base font-bold', platform.tone)}>
                  {platform.mark}
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-200">{platform.name}</p>
              </div>
            ))}
          </div>
        </div>

        {!API_KEY && (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                <Clock3 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-amber-900 dark:text-amber-100">
                  Connect TMDB for live data
                </p>
                <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-200">
                  Add <code className="rounded bg-amber-100 px-1 py-0.5 dark:bg-amber-900/40">NEXT_PUBLIC_TMDB_API_KEY</code> to
                  enable live posters, ratings, cast data, and release updates.
                </p>
                <a
                  href="https://developer.themoviedb.org"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-900 hover:underline dark:text-amber-100"
                >
                  Get TMDB API key
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
