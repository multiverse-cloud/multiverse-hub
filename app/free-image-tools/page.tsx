import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-image-tools");

export default function FreeImageToolsPage() {
  return <SeoLandingPage slug="free-image-tools" />;
}
