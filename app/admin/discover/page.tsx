import AdminDiscoverClient from "@/components/admin/AdminDiscoverClient";
import { DISCOVER_CATEGORIES } from "@/lib/discover-data";
import { getAdminDiscoverLists } from "@/lib/discover-db";

export const dynamic = "force-dynamic";

export default async function AdminDiscoverPage() {
  const lists = await getAdminDiscoverLists();

  return <AdminDiscoverClient lists={lists} categories={DISCOVER_CATEGORIES} />;
}
