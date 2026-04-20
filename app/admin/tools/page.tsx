export const dynamic = "force-dynamic";

import AdminToolsClient from "@/components/admin/AdminToolsClient";
import { ACTIVE_CATEGORIES } from "@/lib/tools-data";
import { getTools } from "@/lib/db";

export default async function AdminToolsPage() {
  const allTools = await getTools();

  const categories = ACTIVE_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.name,
  }));

  const tools = allTools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    categorySlug: tool.categorySlug,
    slug: tool.slug,
    tags: tool.tags,
    enabled: tool.enabled !== false, // Default to true if missing
  }));

  return <AdminToolsClient categories={categories} tools={tools} />;
}
