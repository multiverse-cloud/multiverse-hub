import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function ChecksumCheckerAliasPage() {
  return <SeoLandingPage slug="checksum-checker" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("checksum-checker");
}
