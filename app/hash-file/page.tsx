import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function HashFileAliasPage() {
  return <SeoLandingPage slug="hash-file" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("hash-file");
}
