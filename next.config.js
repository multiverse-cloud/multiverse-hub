/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'image.pollinations.ai' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  serverExternalPackages: [
    'sharp',
    '@imgly/background-removal-node',
    'tesseract.js',
    'fluent-ffmpeg',
    'ytdl-core',
    'pdf-lib',
    'jszip',
  ],
}

module.exports = nextConfig
