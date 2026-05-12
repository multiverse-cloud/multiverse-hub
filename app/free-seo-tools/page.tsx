import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-seo-tools");

export default function FreeSeoToolsPage() {
  return <SeoLandingPage slug="free-seo-tools" />;
}
