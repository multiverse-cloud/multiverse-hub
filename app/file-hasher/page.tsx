import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function FileHasherAliasPage() {
  return <SeoLandingPage slug="file-hasher" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("file-hasher");
}
