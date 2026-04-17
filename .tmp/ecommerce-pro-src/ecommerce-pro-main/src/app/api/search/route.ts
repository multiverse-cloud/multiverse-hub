import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseJsonSafe } from '@/lib/utils'

// GET /api/search - Search products with autocomplete
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!q || q.length < 2) {
      return NextResponse.json({
        success: true,
        data: { products: [], suggestions: [] },
      })
    }

    // Search products
    const products = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { description: { contains: q } },
          { sku: { contains: q } },
        ],
      },
      include: { category: true },
      take: limit,
    })

    // Get category suggestions
    const categories = await db.category.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { description: { contains: q } },
        ],
      },
      take: 5,
    })

    // Get search suggestions from product tags
    const tagSuggestions: string[] = []
    const allProducts = await db.product.findMany({
      where: {
        tags: { contains: q.toLowerCase() },
      },
      take: 20,
    })

    allProducts.forEach((p) => {
      const tags = parseJsonSafe<string[]>(p.tags, [])
      tags.forEach((tag) => {
        if (tag.toLowerCase().includes(q.toLowerCase()) && !tagSuggestions.includes(tag)) {
          tagSuggestions.push(tag)
        }
      })
    })

    return NextResponse.json({
      success: true,
      data: {
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          comparePrice: p.comparePrice,
          image: parseJsonSafe<string[]>(p.images, [])[0] || null,
          category: p.category?.name,
          rating: p.rating,
        })),
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
        })),
        suggestions: tagSuggestions.slice(0, 5),
      },
    })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}
