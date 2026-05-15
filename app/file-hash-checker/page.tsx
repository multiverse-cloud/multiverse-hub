import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function FileHashCheckerAliasPage() {
  return <SeoLandingPage slug="file-hash-checker" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("file-hash-checker");
}
