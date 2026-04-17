// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  images: string[]
  categoryId: string | null
  sku: string
  stock: number
  featured: boolean
  trending: boolean
  rating: number
  reviewCount: number
  tags: string[]
  attributes: Record<string, string>
  createdAt: string
  updatedAt: string
  category?: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  productCount?: number
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: OrderStatus
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  shippingAddress: ShippingAddress
  paymentMethod: string | null
  paymentStatus: PaymentStatus
  trackingNumber: string | null
  notes: string | null
  createdAt: string
  items: OrderItem[]
}

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productSku: string
  quantity: number
  price: number
  total: number
  image: string | null
}

export interface ShippingAddress {
  name: string
  phone?: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Review Types
export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  title: string | null
  comment: string | null
  verified: boolean
  helpful: number
  createdAt: string
  user?: {
    name: string | null
    image: string | null
  }
}

// Dashboard Stats
export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenueGrowth: number
  ordersGrowth: number
  recentOrders: Order[]
  topProducts: Product[]
  salesByMonth: { month: string; revenue: number }[]
}

// User Types
export interface User {
  id: string
  email: string
  name: string | null
  role: 'CUSTOMER' | 'ADMIN'
  image: string | null
}
