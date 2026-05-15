import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function CheckFileHashAliasPage() {
  return <SeoLandingPage slug="check-file-hash" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("check-file-hash");
}
