import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import LibraryHubClient from "@/components/library/LibraryHubClient";
import { getLibraryHubData } from "@/lib/library-hub";

export const metadata: Metadata = {
  title: "Library - Premium UI Components and Website Templates | mtverse",
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
    title: "Library - Premium UI Components & Templates | mtverse",
    description:
      "Browse premium UI components and website templates with live previews, code access, and direct downloads.",
    type: "website",
    url: "https://mtverse.dev/library",
  },
  twitter: {
    card: "summary_large_image",
    title: "Library - Premium UI Components & Templates | mtverse",
    description:
      "Browse premium UI components and website templates with live previews, code access, and direct downloads.",
  },
  alternates: { canonical: "https://mtverse.dev/library" },
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
