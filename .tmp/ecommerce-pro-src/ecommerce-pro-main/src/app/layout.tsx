import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopElite - Premium Ecommerce Platform",
  description: "Discover premium products with exceptional quality and unbeatable prices. Shop the latest electronics, fashion, home decor, and more.",
  keywords: ["ecommerce", "online shopping", "premium products", "electronics", "fashion", "home decor"],
  authors: [{ name: "ShopElite Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ShopElite - Premium Ecommerce",
    description: "Discover premium products with exceptional quality and unbeatable prices",
    siteName: "ShopElite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopElite - Premium Ecommerce",
    description: "Discover premium products with exceptional quality and unbeatable prices",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
