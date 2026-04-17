import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseJsonSafe } from '@/lib/utils'

// GET /api/cart - Get user's cart
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      })
    }

    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    })

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: { items: [] },
      })
    }

    const items = cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      quantity: item.quantity,
      image: parseJsonSafe<string[]>(item.product.images, [])[0] || null,
      stock: item.product.stock,
    }))

    return NextResponse.json({
      success: true,
      data: { items, cartId: cart.id },
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity = 1 } = body
    const userId = request.headers.get('x-user-id') || 'guest'

    // Get or create cart
    let cart = await db.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      cart = await db.cart.create({
        data: { userId },
      })
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if item already in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })

      return NextResponse.json({
        success: true,
        data: updatedItem,
        message: 'Cart updated',
      })
    }

    // Create new cart item
    const cartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    })

    return NextResponse.json({
      success: true,
      data: cartItem,
      message: 'Item added to cart',
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    const body = await request.json().catch(() => ({}))
    const { productId } = body

    if (!userId) {
      return NextResponse.json({
        success: true,
        message: 'Guest cart cleared',
      })
    }

    const cart = await db.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      return NextResponse.json({
        success: true,
        message: 'Cart already empty',
      })
    }

    if (productId) {
      await db.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      })
    } else {
      await db.cartItem.deleteMany({
        where: { cartId: cart.id },
      })
    }

    return NextResponse.json({
      success: true,
      message: productId ? 'Item removed' : 'Cart cleared',
    })
  } catch (error) {
    console.error('Error clearing cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clear cart' },
      { status: 500 }
    )
  }
}

// PATCH /api/cart - Update item quantity
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity } = body
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 401 }
      )
    }

    const cart = await db.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      )
    }

    if (quantity <= 0) {
      await db.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      })

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart',
      })
    }

    const cartItem = await db.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: { quantity },
    })

    return NextResponse.json({
      success: true,
      data: cartItem,
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}
