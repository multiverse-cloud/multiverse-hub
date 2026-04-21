/** @type {import('next').NextConfig} */
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
    minimumCacheTTL: 60,
  },
  serverExternalPackages: [
    "sharp",
    "tesseract.js",
    "fluent-ffmpeg",
    "ytdl-core",
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
    ];
  },
};

module.exports = nextConfig;
