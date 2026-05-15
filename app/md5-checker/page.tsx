import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function Md5CheckerAliasPage() {
  return <SeoLandingPage slug="md5-checker" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("md5-checker");
}
