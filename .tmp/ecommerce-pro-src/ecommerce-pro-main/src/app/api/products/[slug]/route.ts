import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseJsonSafe } from '@/lib/utils'

// GET /api/products/[slug] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const product = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        images: parseJsonSafe<string[]>(product.images, []),
        tags: parseJsonSafe<string[]>(product.tags, []),
        attributes: parseJsonSafe<Record<string, string>>(product.attributes, {}),
      },
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[slug] - Update product (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()

    const existingProduct = await db.product.findUnique({ where: { slug } })
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    
    if (body.name) {
      updateData.name = body.name
      updateData.slug = body.name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-') + '-' + existingProduct.id.slice(0, 6)
    }
    if (body.description) updateData.description = body.description
    if (body.price) updateData.price = parseFloat(body.price)
    if (body.comparePrice !== undefined) updateData.comparePrice = body.comparePrice ? parseFloat(body.comparePrice) : null
    if (body.images) updateData.images = JSON.stringify(body.images)
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId
    if (body.sku) updateData.sku = body.sku
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock)
    if (body.featured !== undefined) updateData.featured = body.featured
    if (body.trending !== undefined) updateData.trending = body.trending
    if (body.tags) updateData.tags = JSON.stringify(body.tags)
    if (body.attributes) updateData.attributes = JSON.stringify(body.attributes)

    const product = await db.product.update({
      where: { slug },
      data: updateData,
      include: { category: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        images: parseJsonSafe<string[]>(product.images, []),
        tags: parseJsonSafe<string[]>(product.tags, []),
        attributes: parseJsonSafe<Record<string, string>>(product.attributes, {}),
      },
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[slug] - Delete product (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    await db.product.delete({ where: { slug } })

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
