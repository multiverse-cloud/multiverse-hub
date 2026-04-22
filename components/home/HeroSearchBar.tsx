import SiteSearchInput from "@/components/search/SiteSearchInput";

export default function HeroSearchBar() {
  return (
    <SiteSearchInput
      className="w-full max-w-2xl mx-auto px-0"
      placeholder="Search tools, UI, templates, prompts..."
      variant="hero"
    />
  );
}
