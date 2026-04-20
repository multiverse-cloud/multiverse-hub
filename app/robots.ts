import type { MetadataRoute } from "next";

const BASE_URL = "https://multiverse-tools.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/admin-login",
        "/api/",
        "/dashboard",
        "/sign-in",
        "/sign-up",
        "/forgot-password",
        "/sso-callback",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
