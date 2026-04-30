import type { Tool } from "@/lib/tools-data";
import ToolCard from "./ToolCard";

const COPY: Record<string, string> = {
  audio: "More audio tools",
  calculator: "More calculators",
  dev: "More developer tools",
  file: "More file tools",
  image: "More image tools",
  pdf: "More PDF tools",
  seo: "More SEO tools",
  text: "More text tools",
  video: "More video tools",
};

export default function RelatedToolsGrid({
  tools,
  categorySlug,
  title,
}: {
  tools: Tool[];
  categorySlug?: string;
  title?: string;
}) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-3 sm:mb-4">
        <p className="premium-kicker">Next tools</p>
        <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-slate-50">
          {title || COPY[categorySlug || ""] || "Related tools"}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
        {tools.map((item) => (
          <ToolCard key={item.id} tool={item} variant="related" />
        ))}
      </div>
    </section>
  );
}
