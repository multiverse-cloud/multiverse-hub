import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-website-templates");

export default function FreeWebsiteTemplatesPage() {
  return <SeoLandingPage slug="free-website-templates" />;
}
