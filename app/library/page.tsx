import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import LibraryHubClient from "@/components/library/LibraryHubClient";
import { getLibraryHubData } from "@/lib/library-hub";

export const metadata: Metadata = {
  title: "Library - Premium UI Components and Website Templates | Multiverse",
  description:
    "Browse a shared library of premium UI components and website templates with live previews, code access, and direct downloads.",
  keywords: [
    "UI components",
    "web templates",
    "free templates",
    "React components",
    "UI library",
  ],
  openGraph: {
    title: "Library - Premium UI Components & Templates | Multiverse",
    description:
      "Browse premium UI components and website templates with live previews, code access, and direct downloads.",
    type: "website",
    url: "https://multiverse-tools.vercel.app/library",
  },
  twitter: {
    card: "summary_large_image",
    title: "Library - Premium UI Components & Templates | Multiverse",
    description:
      "Browse premium UI components and website templates with live previews, code access, and direct downloads.",
  },
  alternates: { canonical: "https://multiverse-tools.vercel.app/library" },
};

export default async function LibraryPage() {
  const library = await getLibraryHubData();

  return (
    <PublicLayout variant="source-hub">
      <LibraryHubClient
        uiItems={library.uiItems}
        templateItems={library.templateItems}
      />
    </PublicLayout>
  );
}
