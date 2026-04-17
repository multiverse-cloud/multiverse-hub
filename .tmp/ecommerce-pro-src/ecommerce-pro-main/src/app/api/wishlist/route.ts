import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/wishlist - Get user's wishlist
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json({
        success: true,
        data: [],
      })
    }

    const wishlist = await db.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          include: { category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedWishlist = wishlist.map((item) => ({
      id: item.id,
      productId: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      comparePrice: item.product.comparePrice,
      image: JSON.parse(item.product.images)[0] || null,
      rating: item.product.rating,
      inStock: item.product.stock > 0,
    }))

    return NextResponse.json({
      success: true,
      data: formattedWishlist,
    })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add to wishlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId } = body
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Please login to add to wishlist' },
        { status: 401 }
      )
    }

    const existing = await db.wishlistItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already in wishlist',
        data: existing,
      })
    }

    const wishlistItem = await db.wishlistItem.create({
      data: { userId, productId },
    })

    return NextResponse.json({
      success: true,
      data: wishlistItem,
      message: 'Added to wishlist',
    })
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId } = body
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await db.wishlistItem.deleteMany({
      where: { userId, productId },
    })

    return NextResponse.json({
      success: true,
      message: 'Removed from wishlist',
    })
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
