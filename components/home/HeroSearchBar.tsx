import SiteSearchInput from "@/components/search/SiteSearchInput";

export default function HeroSearchBar() {
  return (
    <SiteSearchInput
      className="mb-5 w-full max-w-2xl mx-auto px-4 sm:px-0"
      placeholder="Search 150+ free tools..."
      variant="hero"
    />
  );
}
