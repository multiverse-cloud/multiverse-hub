import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/reviews - Get reviews for a product
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      )
    }

    const reviews = await db.review.findMany({
      where: { productId },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const stats = await db.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true,
    })

    const ratingDistribution = await db.review.groupBy({
      by: ['rating'],
      where: { productId },
      _count: true,
    })

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        stats: {
          average: stats._avg.rating || 0,
          total: stats._count,
          distribution: ratingDistribution,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, rating, title, comment } = body
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Please login to review' },
        { status: 401 }
      )
    }

    // Check if already reviewed
    const existing = await db.review.findUnique({
      where: { userId_productId: { userId, productId } },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this product' },
        { status: 400 }
      )
    }

    const review = await db.review.create({
      data: {
        userId,
        productId,
        rating,
        title,
        comment,
      },
    })

    // Update product rating
    const stats = await db.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true,
    })

    await db.product.update({
      where: { id: productId },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count,
      },
    })

    return NextResponse.json({
      success: true,
      data: review,
    })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
