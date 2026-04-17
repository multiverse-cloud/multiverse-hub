'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Search,
  X,
} from 'lucide-react'
import { useFilterStore, ProductFilters } from '@/lib/store'
import { formatPrice, cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  total: number
  categories?: { id: string; name: string; slug: string }[]
}

interface ActiveFiltersProps {
  filters: ProductFilters
  categories: { id: string; name: string; slug: string }[]
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  resetFilters: () => void
  activeFiltersCount: number
}

function ActiveFilters({ filters, categories, setFilter, resetFilters, activeFiltersCount }: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.category && (
        <Badge variant="secondary" className="gap-1">
          Category: {categories.find(c => c.slug === filters.category)?.name}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => setFilter('category', null)}
          />
        </Badge>
      )}
      {filters.minPrice && (
        <Badge variant="secondary" className="gap-1">
          Min: {formatPrice(filters.minPrice)}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => setFilter('minPrice', null)}
          />
        </Badge>
      )}
      {filters.maxPrice && (
        <Badge variant="secondary" className="gap-1">
          Max: {formatPrice(filters.maxPrice)}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => setFilter('maxPrice', null)}
          />
        </Badge>
      )}
      {filters.rating && (
        <Badge variant="secondary" className="gap-1">
          {filters.rating}+ Stars
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => setFilter('rating', null)}
          />
        </Badge>
      )}
      {filters.inStock && (
        <Badge variant="secondary" className="gap-1">
          In Stock
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => setFilter('inStock', false)}
          />
        </Badge>
      )}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs"
          onClick={resetFilters}
        >
          Clear all
        </Button>
      )}
    </div>
  )
}

interface FilterContentProps {
  categories: { id: string; name: string; slug: string }[]
  filters: ProductFilters
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  resetFilters: () => void
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  activeFiltersCount: number
}

function FilterContent({ 
  categories, 
  filters, 
  setFilter, 
  resetFilters, 
  priceRange, 
  setPriceRange,
  activeFiltersCount 
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-base font-semibold">Categories</Label>
        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.category === category.slug ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() =>
                setFilter(
                  'category',
                  filters.category === category.slug ? null : category.slug
                )
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-base font-semibold">Price Range</Label>
        <div className="mt-3 px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            step={10}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <Button
            className="w-full mt-3"
            size="sm"
            onClick={() => {
              setFilter('minPrice', priceRange[0])
              setFilter('maxPrice', priceRange[1])
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Rating */}
      <div>
        <Label className="text-base font-semibold">Rating</Label>
        <div className="mt-3 space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() =>
                setFilter('rating', filters.rating === rating ? null : rating)
              }
            >
              {rating}+ Stars
            </Button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <Button
          variant={filters.inStock ? 'default' : 'outline'}
          className="w-full"
          onClick={() => setFilter('inStock', !filters.inStock)}
        >
          In Stock Only
        </Button>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <Button variant="destructive" className="w-full" onClick={resetFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )
}

export function ProductGrid({ products, total, categories = [] }: ProductGridProps) {
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid')
  const { filters, setFilter, resetFilters } = useFilterStore()
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [filterOpen, setFilterOpen] = useState(false)

  const activeFiltersCount = [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.rating,
    filters.inStock,
  ].filter(Boolean).length

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = !filters.category || product.category?.slug === filters.category
      const searchTerm = filters.search.trim().toLowerCase()
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      const matchesMinPrice = filters.minPrice === null || product.price >= filters.minPrice
      const matchesMaxPrice = filters.maxPrice === null || product.price <= filters.maxPrice
      const matchesRating = filters.rating === null || product.rating >= filters.rating
      const matchesStock = !filters.inStock || product.stock > 0

      return (
        matchesCategory &&
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesStock
      )
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'popular':
          return b.reviewCount - a.reviewCount
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  return (
    <div id="products" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl text-center sm:text-left">
          <h2 className="text-3xl font-bold tracking-tight">All Products</h2>
          <p className="mt-2 text-muted-foreground">
            {filteredProducts.length} of {total} products shown
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Sort */}
          <Select
            value={filters.sort}
            onValueChange={(value: ProductFilters['sort']) => setFilter('sort', value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button - Mobile */}
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent 
                  categories={categories}
                  filters={filters}
                  setFilter={setFilter}
                  resetFilters={resetFilters}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Grid Toggle */}
          <div className="hidden sm:flex border rounded-lg p-1">
            <Button
              variant={gridView === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setGridView('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={gridView === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setGridView('list')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <ActiveFilters 
        filters={filters}
        categories={categories}
        setFilter={setFilter}
        resetFilters={resetFilters}
        activeFiltersCount={activeFiltersCount}
      />

      <div className="flex gap-6 xl:gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <h3 className="font-semibold mb-4">Filters</h3>
            <FilterContent 
              categories={categories}
              filters={filters}
              setFilter={setFilter}
              resetFilters={resetFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
              <Button variant="link" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-6",
                gridView === 'grid'
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={gridView === 'list' ? 'default' : 'default'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
