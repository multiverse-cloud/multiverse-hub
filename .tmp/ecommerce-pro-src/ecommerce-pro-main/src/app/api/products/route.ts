import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getMockProducts } from '@/lib/mock-catalog'
import { parseJsonSafe } from '@/lib/utils'

function filterMockProducts(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const featured = searchParams.get('featured')
  const trending = searchParams.get('trending')
  const search = searchParams.get('search')?.trim().toLowerCase()
  const sort = searchParams.get('sort') || 'newest'
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  const filteredProducts = getMockProducts()
    .filter((product) => {
      if (category && product.category?.slug !== category) return false
      if (minPrice && product.price < parseFloat(minPrice)) return false
      if (maxPrice && product.price > parseFloat(maxPrice)) return false
      if (featured === 'true' && !product.featured) return false
      if (trending === 'true' && !product.trending) return false

      if (search) {
        const haystack = `${product.name} ${product.description}`.toLowerCase()
        if (!haystack.includes(search)) return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sort) {
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

  return {
    products: filteredProducts.slice(offset, offset + limit),
    total: filteredProducts.length,
    limit,
    offset,
  }
}

// GET /api/products - List products with filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const featured = searchParams.get('featured')
    const trending = searchParams.get('trending')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'newest'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: Record<string, unknown> = {}

    if (category) {
      const categoryRecord = await db.category.findUnique({
        where: { slug: category },
      })
      if (categoryRecord) {
        where.categoryId = categoryRecord.id
      }
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice)
      if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice)
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (trending === 'true') {
      where.trending = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const orderBy: Record<string, string> = {}
    switch (sort) {
      case 'price-asc':
        orderBy.price = 'asc'
        break
      case 'price-desc':
        orderBy.price = 'desc'
        break
      case 'rating':
        orderBy.rating = 'desc'
        break
      case 'popular':
        orderBy.reviewCount = 'desc'
        break
      default:
        orderBy.createdAt = 'desc'
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      db.product.count({ where }),
    ])

    const formattedProducts = products.map((product) => ({
      ...product,
      images: parseJsonSafe<string[]>(product.images, []),
      tags: parseJsonSafe<string[]>(product.tags, []),
      attributes: parseJsonSafe<Record<string, string>>(product.attributes, {}),
    }))

    return NextResponse.json({
      success: true,
      data: {
        products: formattedProducts.length > 0 ? formattedProducts : filterMockProducts(request).products,
        total: formattedProducts.length > 0 ? total : filterMockProducts(request).total,
        limit,
        offset,
      },
      fallback: formattedProducts.length === 0,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    const fallbackData = filterMockProducts(request)

    return NextResponse.json({
      success: true,
      data: fallbackData,
      fallback: true,
    })
  }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      price,
      comparePrice,
      images,
      categoryId,
      sku,
      stock,
      featured,
      trending,
      tags,
      attributes,
    } = body

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '-' + Date.now().toString(36)

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        images: JSON.stringify(images || []),
        categoryId,
        sku,
        stock: parseInt(stock) || 0,
        featured: featured || false,
        trending: trending || false,
        tags: JSON.stringify(tags || []),
        attributes: JSON.stringify(attributes || {}),
      },
      include: {
        category: true,
      },
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
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
