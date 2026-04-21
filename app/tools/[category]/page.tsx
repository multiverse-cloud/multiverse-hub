import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import CategoryPage from "@/components/tools/CategoryPage";
import { ACTIVE_CATEGORIES } from "@/lib/tools-data";
import { getToolsByCategory } from "@/lib/db";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = ACTIVE_CATEGORIES.find((item) => item.slug === category);
  if (!cat) return {};

  const toolCount = cat.toolCount ?? 0;
  const countLabel = toolCount > 0 ? `${toolCount}+ ` : "";

  return {
    title: `${cat.name} - ${countLabel}Free Online ${cat.name} | Multiverse`,
    description: `${cat.description} Use our free ${cat.name.toLowerCase()} with no sign-up required. Fast, private, and browser-based.`,
    alternates: {
      canonical: `https://multiverse-tools.vercel.app/tools/${category}`,
    },
  };
}

export default async function CategoryRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = ACTIVE_CATEGORIES.find((item) => item.slug === category);

  if (!cat) {
    notFound();
  }

  const tools = await getToolsByCategory(category);

  return (
    <PublicLayout>
      <CategoryPage category={cat} tools={tools} />
    </PublicLayout>
  );
}
