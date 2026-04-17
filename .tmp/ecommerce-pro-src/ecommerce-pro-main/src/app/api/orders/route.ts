import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseJsonSafe, generateOrderNumber } from '@/lib/utils'

// GET /api/orders - Get user's orders
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    const isAdmin = request.headers.get('x-user-role') === 'ADMIN'

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: Record<string, unknown> = isAdmin ? {} : { userId }

    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        include: {
          items: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.order.count({ where }),
    ])

    const formattedOrders = orders.map((order) => ({
      ...order,
      shippingAddress: parseJsonSafe(order.shippingAddress, {}),
    }))

    return NextResponse.json({
      success: true,
      data: {
        orders: formattedOrders,
        total,
        limit,
        offset,
      },
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = request.headers.get('x-user-id') || 'guest'
    const { items, shippingAddress, paymentMethod } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product ${item.productId} not found` },
          { status: 404 }
        )
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        )
      }

      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
        image: parseJsonSafe<string[]>(product.images, [])[0] || null,
      })
    }

    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
    const total = subtotal + tax + shipping

    const orderNumber = generateOrderNumber()

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber,
        userId,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        paymentStatus: 'PENDING',
        status: 'PENDING',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    })

    // Update product stock
    for (const item of items) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      })
    }

    // Clear user's cart if exists
    if (userId !== 'guest') {
      const cart = await db.cart.findUnique({ where: { userId } })
      if (cart) {
        await db.cartItem.deleteMany({ where: { cartId: cart.id } })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        shippingAddress: parseJsonSafe(order.shippingAddress, {}),
      },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
