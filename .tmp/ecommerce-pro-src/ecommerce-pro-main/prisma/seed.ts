import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Clear existing data
  await db.cartItem.deleteMany()
  await db.cart.deleteMany()
  await db.orderItem.deleteMany()
  await db.order.deleteMany()
  await db.review.deleteMany()
  await db.wishlistItem.deleteMany()
  await db.address.deleteMany()
  await db.product.deleteMany()
  await db.category.deleteMany()
  await db.user.deleteMany()
  await db.coupon.deleteMany()
  await db.setting.deleteMany()

  console.log('Cleared existing data')

  // Create categories
  const categories = await Promise.all([
    db.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      },
    }),
    db.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      },
    }),
    db.category.create({
      data: {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Furniture and home decor',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      },
    }),
    db.category.create({
      data: {
        name: 'Sports & Outdoors',
        slug: 'sports-outdoors',
        description: 'Sports equipment and outdoor gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      },
    }),
    db.category.create({
      data: {
        name: 'Beauty & Health',
        slug: 'beauty-health',
        description: 'Skincare, makeup, and wellness products',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      },
    }),
    db.category.create({
      data: {
        name: 'Books & Media',
        slug: 'books-media',
        description: 'Books, music, and entertainment',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      },
    }),
  ])

  console.log('Created categories')

  // Create admin user
  const adminUser = await db.user.create({
    data: {
      email: 'admin@shopelite.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // Create sample customer
  const customerUser = await db.user.create({
    data: {
      email: 'customer@example.com',
      name: 'John Doe',
      role: 'CUSTOMER',
    },
  })

  console.log('Created users')

  // Product data
  const productData = [
    {
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals.',
      price: 299.99,
      comparePrice: 399.99,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
      categoryId: categories[0].id,
      sku: 'ELEC-001',
      stock: 45,
      featured: true,
      trending: true,
      rating: 4.8,
      reviewCount: 128,
      tags: ['audio', 'wireless', 'premium'],
    },
    {
      name: 'Smart Watch Pro',
      description: 'Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration. Water-resistant up to 50 meters.',
      price: 449.99,
      comparePrice: 549.99,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
      categoryId: categories[0].id,
      sku: 'ELEC-002',
      stock: 32,
      featured: true,
      trending: true,
      rating: 4.9,
      reviewCount: 256,
      tags: ['wearable', 'smart', 'fitness'],
    },
    {
      name: 'Ultra-Slim Laptop Stand',
      description: 'Ergonomic aluminum laptop stand with adjustable height and angle. Compatible with all laptop sizes up to 17 inches.',
      price: 79.99,
      comparePrice: 99.99,
      images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'],
      categoryId: categories[0].id,
      sku: 'ELEC-003',
      stock: 78,
      featured: false,
      trending: true,
      rating: 4.5,
      reviewCount: 89,
      tags: ['accessories', 'ergonomic', 'office'],
    },
    {
      name: 'Designer Leather Jacket',
      description: 'Premium genuine leather jacket with a modern fit. Features multiple pockets and a soft quilted lining for comfort.',
      price: 399.99,
      comparePrice: 549.99,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'],
      categoryId: categories[1].id,
      sku: 'FASH-001',
      stock: 23,
      featured: true,
      trending: false,
      rating: 4.7,
      reviewCount: 67,
      tags: ['clothing', 'leather', 'premium'],
    },
    {
      name: 'Classic Denim Jeans',
      description: 'Timeless straight-fit jeans made from premium denim. Features classic five-pocket styling and comfortable stretch.',
      price: 89.99,
      comparePrice: null,
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'],
      categoryId: categories[1].id,
      sku: 'FASH-002',
      stock: 156,
      featured: false,
      trending: true,
      rating: 4.4,
      reviewCount: 203,
      tags: ['clothing', 'denim', 'casual'],
    },
    {
      name: 'Minimalist Watch',
      description: 'Elegant minimalist watch with a genuine leather strap and Japanese quartz movement. Water-resistant and scratch-resistant glass.',
      price: 159.99,
      comparePrice: 199.99,
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600'],
      categoryId: categories[1].id,
      sku: 'FASH-003',
      stock: 67,
      featured: true,
      trending: false,
      rating: 4.6,
      reviewCount: 145,
      tags: ['accessories', 'watch', 'minimalist'],
    },
    {
      name: 'Scandinavian Floor Lamp',
      description: 'Modern floor lamp with adjustable arm and natural wood finish. Provides warm ambient lighting perfect for any room.',
      price: 189.99,
      comparePrice: 249.99,
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600'],
      categoryId: categories[2].id,
      sku: 'HOME-001',
      stock: 34,
      featured: true,
      trending: true,
      rating: 4.8,
      reviewCount: 92,
      tags: ['lighting', 'scandinavian', 'modern'],
    },
    {
      name: 'Organic Cotton Bedding Set',
      description: 'Luxurious 100% organic cotton bedding set. Includes duvet cover, fitted sheet, and two pillowcases. Machine washable.',
      price: 129.99,
      comparePrice: 179.99,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600'],
      categoryId: categories[2].id,
      sku: 'HOME-002',
      stock: 89,
      featured: false,
      trending: true,
      rating: 4.9,
      reviewCount: 178,
      tags: ['bedding', 'organic', 'comfort'],
    },
    {
      name: 'Ceramic Plant Pot Set',
      description: 'Set of 3 handmade ceramic plant pots in different sizes. Includes drainage holes and matching saucers.',
      price: 49.99,
      comparePrice: 69.99,
      images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600'],
      categoryId: categories[2].id,
      sku: 'HOME-003',
      stock: 123,
      featured: false,
      trending: false,
      rating: 4.3,
      reviewCount: 56,
      tags: ['decor', 'plants', 'ceramic'],
    },
    {
      name: 'Professional Yoga Mat',
      description: 'Extra-thick eco-friendly yoga mat with non-slip surface. Perfect for yoga, pilates, and stretching exercises.',
      price: 69.99,
      comparePrice: null,
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'],
      categoryId: categories[3].id,
      sku: 'SPORT-001',
      stock: 201,
      featured: false,
      trending: true,
      rating: 4.7,
      reviewCount: 234,
      tags: ['yoga', 'fitness', 'eco-friendly'],
    },
    {
      name: 'Running Shoes Elite',
      description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for marathons and daily training.',
      price: 159.99,
      comparePrice: 199.99,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
      categoryId: categories[3].id,
      sku: 'SPORT-002',
      stock: 67,
      featured: true,
      trending: true,
      rating: 4.8,
      reviewCount: 312,
      tags: ['running', 'shoes', 'athletic'],
    },
    {
      name: 'Natural Skincare Set',
      description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Made with natural ingredients suitable for all skin types.',
      price: 89.99,
      comparePrice: 129.99,
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600'],
      categoryId: categories[4].id,
      sku: 'BEAUTY-001',
      stock: 145,
      featured: true,
      trending: false,
      rating: 4.6,
      reviewCount: 189,
      tags: ['skincare', 'natural', 'gift'],
    },
    {
      name: 'Premium Hair Dryer',
      description: 'Professional-grade hair dryer with ionic technology for faster drying and reduced frizz. Multiple heat and speed settings.',
      price: 179.99,
      comparePrice: 249.99,
      images: ['https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600'],
      categoryId: categories[4].id,
      sku: 'BEAUTY-002',
      stock: 56,
      featured: false,
      trending: true,
      rating: 4.5,
      reviewCount: 98,
      tags: ['hair', 'professional', 'ionic'],
    },
    {
      name: 'Bestseller Book Bundle',
      description: 'Collection of 5 bestselling novels from top authors. Includes fiction and non-fiction titles. Perfect for book lovers.',
      price: 49.99,
      comparePrice: 79.99,
      images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'],
      categoryId: categories[5].id,
      sku: 'BOOK-001',
      stock: 89,
      featured: false,
      trending: false,
      rating: 4.7,
      reviewCount: 145,
      tags: ['books', 'bundle', 'bestseller'],
    },
    {
      name: 'Wireless Gaming Mouse',
      description: 'High-precision wireless gaming mouse with customizable RGB lighting and 16,000 DPI sensor. Ultra-low latency.',
      price: 129.99,
      comparePrice: 169.99,
      images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'],
      categoryId: categories[0].id,
      sku: 'ELEC-004',
      stock: 78,
      featured: true,
      trending: true,
      rating: 4.8,
      reviewCount: 267,
      tags: ['gaming', 'wireless', 'RGB'],
    },
    {
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery life. Perfect for outdoor adventures.',
      price: 99.99,
      comparePrice: 149.99,
      images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'],
      categoryId: categories[0].id,
      sku: 'ELEC-005',
      stock: 134,
      featured: false,
      trending: true,
      rating: 4.6,
      reviewCount: 198,
      tags: ['audio', 'portable', 'waterproof'],
    },
  ]

  // Create products
  for (const product of productData) {
    await db.product.create({
      data: {
        name: product.name,
        slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice,
        images: JSON.stringify(product.images),
        categoryId: product.categoryId,
        sku: product.sku,
        stock: product.stock,
        featured: product.featured,
        trending: product.trending,
        rating: product.rating,
        reviewCount: product.reviewCount,
        tags: JSON.stringify(product.tags),
      },
    })
  }

  console.log('Created products')

  // Create sample orders
  const products = await db.product.findMany({ take: 3 })
  
  await db.order.create({
    data: {
      orderNumber: 'ORD-DEMO-001',
      userId: customerUser.id,
      status: 'DELIVERED',
      subtotal: 549.97,
      tax: 43.99,
      shipping: 0,
      total: 593.96,
      shippingAddress: JSON.stringify({
        name: 'John Doe',
        phone: '+1 555-123-4567',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      }),
      paymentMethod: 'Credit Card',
      paymentStatus: 'PAID',
      items: {
        create: products.map((p) => ({
          productId: p.id,
          productName: p.name,
          productSku: p.sku,
          quantity: 1,
          price: p.price,
          total: p.price,
          image: JSON.parse(p.images)[0],
        })),
      },
    },
  })

  console.log('Created sample order')
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
