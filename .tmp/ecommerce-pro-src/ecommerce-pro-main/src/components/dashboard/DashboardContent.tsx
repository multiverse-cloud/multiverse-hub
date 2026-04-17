'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, Heart, User, Settings, ShoppingBag, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react'
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: { productName: string; quantity: number }[]
}

interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string | null
  slug: string
}

const statusIcons: Record<string, React.ElementType> = {
  PENDING: Clock,
  PROCESSING: Package,
  SHIPPED: Truck,
  DELIVERED: CheckCircle2,
  CANCELLED: XCircle,
  REFUNDED: XCircle,
}

export function DashboardContent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes] = await Promise.all([
          fetch('/api/orders?limit=10'),
        ])
        
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json()
          if (ordersData.success) {
            setOrders(ordersData.data.orders)
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                JD
              </div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <ShoppingBag className="h-5 w-5" />
                My Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Heart className="h-5 w-5" />
                Wishlist
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <User className="h-5 w-5" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Orders</h2>
              <span className="text-sm text-muted-foreground">{orders.length} orders</span>
            </div>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                  <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500">
                    <Link href="/">Start Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || Clock
                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4 bg-muted/50">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                              <StatusIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium">{order.orderNumber}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map((item, i) => (
                                <div
                                  key={i}
                                  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium"
                                >
                                  {item.productName.charAt(0)}
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{formatPrice(order.total)}</p>
                              <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-4">
            <h2 className="text-2xl font-bold">My Wishlist</h2>
            {wishlist.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">Save items you love to your wishlist</p>
                  <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500">
                    <Link href="/">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 mb-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        )}
                      </div>
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="font-semibold">{formatPrice(item.price)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <p className="mt-1">John</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <p className="mt-1">Doe</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="mt-1">john.doe@example.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="mt-1">+1 555-123-4567</p>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
