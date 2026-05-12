import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-ui-components");

export default function FreeUiComponentsPage() {
  return <SeoLandingPage slug="free-ui-components" />;
}
