'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean
  recents: string[]
  addRecent: (slug: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [recents, setRecents] = useState<string[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('multiverse_favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error('Failed to parse favorites', e)
      }
    }

    const savedRecents = localStorage.getItem('multiverse_recents')
    if (savedRecents) {
      try {
        setRecents(JSON.parse(savedRecents))
      } catch (e) {
        console.error('Failed to parse recents', e)
      }
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('multiverse_favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('multiverse_recents', JSON.stringify(recents))
  }, [recents])

  const toggleFavorite = React.useCallback((slug: string) => {
    setFavorites(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug)
      }
      return [slug, ...prev]
    })
  }, [])

  const isFavorite = React.useCallback((slug: string) => favorites.includes(slug), [favorites])

  const addRecent = React.useCallback((slug: string) => {
    setRecents(prev => {
      // Remove if exists to move to top
      const filtered = prev.filter(s => s !== slug)
      // Keep only top 12
      return [slug, ...filtered].slice(0, 12)
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, recents, addRecent }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
