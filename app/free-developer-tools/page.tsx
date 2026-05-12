import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-developer-tools");

export default function FreeDeveloperToolsPage() {
  return <SeoLandingPage slug="free-developer-tools" />;
}
