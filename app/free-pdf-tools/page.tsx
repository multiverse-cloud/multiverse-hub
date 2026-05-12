import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-pdf-tools");

export default function FreePdfToolsPage() {
  return <SeoLandingPage slug="free-pdf-tools" />;
}
