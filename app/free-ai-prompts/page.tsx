import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { createSeoLandingMetadata } from "@/lib/seo-landing-pages";

export const revalidate = 3600;
export const metadata = createSeoLandingMetadata("free-ai-prompts");

export default function FreeAiPromptsPage() {
  return <SeoLandingPage slug="free-ai-prompts" />;
}
