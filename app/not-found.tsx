import PublicLayout from "@/components/layout/PublicLayout";
import ErrorExperience from "@/components/errors/ErrorExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 – Page Not Found | Multiverse",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <PublicLayout>
      <ErrorExperience
        badge="404 Not Found"
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        actions={[
          { label: "Go Home", href: "/", variant: "primary" },
          { label: "Browse Tools", href: "/tools" },
          { label: "Search", href: "/search" },
        ]}
      />
    </PublicLayout>
  );
}
