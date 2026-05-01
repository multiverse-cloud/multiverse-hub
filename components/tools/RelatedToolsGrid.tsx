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
    <section className="mt-6 sm:mt-10">
      <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4">
        <div>
        <p className="premium-kicker">Next tools</p>
        <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-slate-50">
          {title || COPY[categorySlug || ""] || "Related tools"}
        </h2>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex min-w-max gap-2.5 sm:grid sm:min-w-0 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
          {tools.map((item) => (
            <div key={item.id} className="w-[78vw] max-w-[18rem] shrink-0 sm:w-auto sm:max-w-none">
              <ToolCard tool={item} variant="related" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
