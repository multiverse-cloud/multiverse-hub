'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Heart,
  Package,
  Settings,
  LogOut,
  LayoutDashboard,
  X,
  ChevronDown,
} from 'lucide-react'
import { useCartStore, useUIStore, useAuthStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Shop', href: '#products', hasDropdown: true, items: ['New Arrivals', 'Best Sellers', 'Sale'] },
  { name: 'Categories', href: '#categories' },
  { name: 'Deals', href: '#deals' },
  { name: 'About', href: '#about' },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { items, getTotal, getItemCount, removeItem, updateQuantity } = useCartStore()
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen, searchOpen } = useUIStore()
  const { user, logout } = useAuthStore()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const itemCount = mounted ? getItemCount() : 0
  const cartItems = mounted ? items : []
  const cartTotal = mounted ? getTotal() : 0
  const hydratedUser = mounted ? user : null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching:', searchQuery)
    }
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" 
        : "bg-white dark:bg-gray-900"
    )}>
      {/* Top Bar */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white">
        <div className="page-shell">
          <div className="flex min-h-10 items-center justify-between gap-3 py-2 text-sm">
            <div className="flex items-center gap-6">
              <span className="hidden sm:flex items-center gap-2">
                <Package className="h-4 w-4" />
                Free shipping on orders over $100
              </span>
              <span className="hidden md:flex items-center gap-2">
                30-Day Returns
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:underline hidden sm:block">Track Order</Link>
              <Link href="#" className="hover:underline">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="page-shell">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3 lg:min-h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ShopElite
              </span>
              <p className="text-[10px] text-muted-foreground -mt-1">Premium Store</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </a>
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border p-2 min-w-45">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem}
                          href="#"
                          className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 items-center max-w-md mx-6 xl:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 h-11 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex h-10 w-10 relative">
              <Heart className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">0</span>
            </Button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-lg">Shopping Cart</span>
                        <p className="text-sm font-normal text-muted-foreground">{itemCount} items</p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="font-medium mb-2">Your cart is empty</p>
                        <p className="text-sm text-muted-foreground mb-6">Add some items to get started</p>
                        <Button className="bg-linear-to-r from-emerald-500 to-teal-500">
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="p-4 space-y-4">
                        <AnimatePresence>
                          {cartItems.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                            >
                              <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                {item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <Package className="h-8 w-8 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{item.name}</p>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {formatPrice(item.price)}
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center border rounded-lg">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    >
                                      -
                                    </Button>
                                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    >
                                      +
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end justify-between">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeItem(item.productId)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                  
                  {cartItems.length > 0 && (
                    <div className="p-6 border-t bg-white dark:bg-gray-900">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="text-emerald-600">Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                          <span>Total</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                      </div>
                      <Button className="w-full h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl">
                        Proceed to Checkout
                      </Button>
                      <Button variant="outline" className="w-full h-12 mt-3 rounded-xl">
                        Continue Shopping
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            {hydratedUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden sm:flex items-center gap-2 h-10 px-3">
                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                      {hydratedUser.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden md:inline">{hydratedUser.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl">
                  <div className="px-3 py-3 border-b">
                    <p className="font-medium">{hydratedUser.name}</p>
                    <p className="text-sm text-muted-foreground">{hydratedUser.email}</p>
                  </div>
                  <div className="p-2">
                    {hydratedUser.role === 'ADMIN' && (
                      <DropdownMenuItem className="rounded-lg">
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="rounded-lg">
                      <Package className="mr-3 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg">
                      <Heart className="mr-3 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <DropdownMenuItem onClick={logout} className="rounded-lg text-red-600">
                      <LogOut className="mr-3 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button size="sm" className="bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden pb-4"
            >
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 h-11 bg-gray-100 dark:bg-gray-800 border-0 rounded-full"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="lg:hidden overflow-hidden border-t bg-white dark:bg-gray-900"
          >
            <nav className="page-shell space-y-1 py-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t flex items-center gap-2">
                <Button variant="outline" className="flex-1 h-11 rounded-xl">Sign In</Button>
                <Button className="flex-1 h-11 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500">Sign Up</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
