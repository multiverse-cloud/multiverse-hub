import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function Sha256CheckerAliasPage() {
  return <SeoLandingPage slug="sha256-checker" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("sha256-checker");
}
