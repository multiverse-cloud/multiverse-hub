'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Film, Tv, Search, Star, TrendingUp, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

interface TMDBItem {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  release_date?: string
  first_air_date?: string
  media_type?: string
}

const PLACEHOLDER_MOVIES = [
  { id: 1, title: 'The Dark Knight', poster_path: '', vote_average: 9.0, overview: 'Batman faces the Joker.', release_date: '2008' },
  { id: 2, title: 'Inception', poster_path: '', vote_average: 8.8, overview: 'A thief who enters dreams.', release_date: '2010' },
  { id: 3, title: 'Interstellar', poster_path: '', vote_average: 8.6, overview: 'Space travel through wormholes.', release_date: '2014' },
  { id: 4, title: 'The Avengers', poster_path: '', vote_average: 8.0, overview: "Earth's mightiest heroes unite.", release_date: '2012' },
  { id: 5, title: 'Dune: Part Two', poster_path: '', vote_average: 8.5, overview: 'Paul Atreides unites with Fremen.', release_date: '2024' },
  { id: 6, title: 'Oppenheimer', poster_path: '', vote_average: 8.9, overview: 'Story of the atomic bomb.', release_date: '2023' },
]

function MovieCard({ item, type }: { item: TMDBItem & { title?: string; name?: string }; type: 'movie' | 'tv' }) {
  const title = item.title || item.name || 'Unknown'
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : `https://via.placeholder.com/342x513/1e1b4b/6366f1?text=${encodeURIComponent(title.slice(0,10))}`

  return (
    <Link href={`/entertainment/${type}/${item.id}`}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <Image src={posterUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white text-sm font-semibold">
            <Play className="w-3.5 h-3.5 fill-white" /> Trailer
          </div>
        </div>
      </div>
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{year}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{item.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function EntertainmentHub() {
  const [tab, setTab] = useState<'movies' | 'tv'>('movies')
  const [movies, setMovies] = useState<TMDBItem[]>([])
  const [tvShows, setTVShows] = useState<TMDBItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        if (TMDB_KEY) {
          const [mRes, tvRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`),
            fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_KEY}`)
          ])
          const [mData, tvData] = await Promise.all([mRes.json(), tvRes.json()])
          setMovies(mData.results?.slice(0, 18) || [])
          setTVShows(tvData.results?.slice(0, 18) || [])
        } else {
          setMovies(PLACEHOLDER_MOVIES as unknown as TMDBItem[])
          setTVShows(PLACEHOLDER_MOVIES as unknown as TMDBItem[])
        }
      } catch {
        setMovies(PLACEHOLDER_MOVIES as unknown as TMDBItem[])
        setTVShows(PLACEHOLDER_MOVIES as unknown as TMDBItem[])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const items = tab === 'movies' ? movies : tvShows
  const filtered = search ? items.filter(i => (i.title || i.name || '').toLowerCase().includes(search.toLowerCase())) : items

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 dark:bg-slate-100 flex items-center justify-center shadow-lg shadow-slate-900/10">
              <Film className="w-5 h-5 text-white dark:text-slate-950" />
            </div>
            <h1 className="text-2xl font-black">Entertainment</h1>
          </div>
          <p className="text-muted-foreground text-sm">Trending movies, TV series, trailers and OTT availability</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Tabs */}
          <div className="flex bg-muted rounded-xl p-1">
            {[{ id: 'movies' as const, icon: Film, label: 'Movies' }, { id: 'tv' as const, icon: Tv, label: 'TV Series' }].map(t => {
              const Icon = t.icon
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors', tab === t.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground')}>
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab}...`}
              className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
          </div>
        </div>
      </div>

      {/* Section Label */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h2 className="font-bold">Trending This Week</h2>
        {!TMDB_KEY && <span className="tag-beta text-xs">Demo mode - add TMDB API key</span>}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="bg-muted rounded-2xl aspect-[2/3] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(item => <MovieCard key={item.id} item={item} type={tab === 'movies' ? 'movie' : 'tv'} />)}
        </div>
      )}
    </div>
  )
}
