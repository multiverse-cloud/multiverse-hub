/** @type {import('next').NextConfig} */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: https://va.vercel-scripts.com https://cdnjs.cloudflare.com https://unpkg.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://www.google.com https://translate.googleusercontent.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com https://www.gstatic.com https://www.google.com https://translate.googleusercontent.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://images.unsplash.com https://img.youtube.com https://via.placeholder.com https://api.dicebear.com https://image.pollinations.ai https://api.qrserver.com https://res.cloudinary.com https://*.cloudinary.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.gstatic.com https://fonts.gstatic.com https://translate.google.com https://translate.googleapis.com https://www.google.com https://translate.googleusercontent.com",
  "media-src 'self' blob: data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://cdnjs.cloudflare.com https://unpkg.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://adtrafficquality.google https://*.adtrafficquality.google https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.google.com https://translate.googleusercontent.com",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://translate.google.com https://translate.googleapis.com https://www.google.com https://translate.googleusercontent.com",
  "worker-src 'self' blob: https://cdnjs.cloudflare.com",
].join('; ')

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "image.pollinations.ai" },
      { protocol: "https", hostname: "api.qrserver.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  serverExternalPackages: [
    "sharp",
    "tesseract.js",
    "fluent-ffmpeg",
    "pdf-lib",
    "jszip",
  ],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compress: true,
  generateEtags: true,
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "/admin-login",
        permanent: false,
      },
      {
        source: "/sign-up",
        destination: "/admin-login",
        permanent: false,
      },
      {
        source: "/forgot-password",
        destination: "/admin-login",
        permanent: false,
      },
      {
        source: "/sso-callback",
        destination: "/admin-login",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/tools",
        permanent: false,
      },
      {
        source: "/youtube-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/youtube-video-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/youtube-shorts-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/youtube-playlist-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/youtube-live-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/tools/video/youtube-video-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/tools/video/youtube-shorts-downloader",
        destination: "/tools/video",
        permanent: false,
      },
      {
        source: "/tools/video/youtube-playlist-downloader",
        destination: "/tools/video",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/prompt-previews/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/template-cards/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/template-previews/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/hyperui/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
