import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-tools");

export default function FreeToolsPage() {
  return <SeoLandingPage slug="free-tools" />;
}
