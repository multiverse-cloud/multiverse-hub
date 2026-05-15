import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function HashCheckOnlineAliasPage() {
  return <SeoLandingPage slug="hash-check-online" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("hash-check-online");
}
