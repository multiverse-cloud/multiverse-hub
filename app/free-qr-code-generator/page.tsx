import type { Metadata } from "next";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export default function FreeQrCodeGeneratorAliasPage() {
  return <SeoLandingPage slug="free-qr-code-generator" />;
}

export function generateMetadata(): Metadata {
  return createSeoLandingMetadata("free-qr-code-generator");
}
