import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseJsonSafe } from '@/lib/utils'

// GET /api/dashboard - Get dashboard statistics (Admin only)
export async function GET(request: NextRequest) {
  try {
    const isAdmin = request.headers.get('x-user-role') === 'ADMIN'

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get totals
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      orders,
    ] = await Promise.all([
      db.product.count(),
      db.order.count(),
      db.user.count({ where: { role: 'CUSTOMER' } }),
      db.order.findMany({
        where: { paymentStatus: 'PAID' },
        select: { total: true, createdAt: true },
      }),
    ])

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    // Get recent orders
    const recentOrders = await db.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })

    // Get top products by sales
    const topProducts = await db.product.findMany({
      take: 5,
      orderBy: { reviewCount: 'desc' },
      include: { category: true },
    })

    // Calculate sales by month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const recentOrdersWithDate = orders.filter(
      (order) => order.createdAt >= sixMonthsAgo
    )

    const salesByMonth: { month: string; revenue: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const month = new Date()
      month.setMonth(month.getMonth() - i)
      const monthName = month.toLocaleString('default', { month: 'short' })
      
      const monthRevenue = recentOrdersWithDate
        .filter((order) => {
          const orderDate = new Date(order.createdAt)
          return (
            orderDate.getMonth() === month.getMonth() &&
            orderDate.getFullYear() === month.getFullYear()
          )
        })
        .reduce((sum, order) => sum + order.total, 0)

      salesByMonth.push({ month: monthName, revenue: monthRevenue })
    }

    // Calculate growth (comparing last 30 days to previous 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

    const last30DaysRevenue = orders
      .filter((o) => o.createdAt >= thirtyDaysAgo)
      .reduce((sum, o) => sum + o.total, 0)
    
    const previous30DaysRevenue = orders
      .filter((o) => o.createdAt >= sixtyDaysAgo && o.createdAt < thirtyDaysAgo)
      .reduce((sum, o) => sum + o.total, 0)

    const revenueGrowth = previous30DaysRevenue > 0
      ? ((last30DaysRevenue - previous30DaysRevenue) / previous30DaysRevenue) * 100
      : 0

    const last30DaysOrders = await db.order.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    })
    const previous30DaysOrders = await db.order.count({
      where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
    })
    
    const ordersGrowth = previous30DaysOrders > 0
      ? ((last30DaysOrders - previous30DaysOrders) / previous30DaysOrders) * 100
      : 0

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
        revenueGrowth,
        ordersGrowth,
        recentOrders: recentOrders.map((o) => ({
          ...o,
          shippingAddress: parseJsonSafe(o.shippingAddress, {}),
        })),
        topProducts: topProducts.map((p) => ({
          ...p,
          images: parseJsonSafe<string[]>(p.images, []),
          tags: parseJsonSafe<string[]>(p.tags, []),
          attributes: parseJsonSafe<Record<string, string>>(p.attributes, {}),
        })),
        salesByMonth,
      },
    })
  } catch (error) {
    console.error('Error fetching dashboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
