import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import ToolActions from "@/components/tools/ToolActions";

type UniverseTopBarItem = {
  label: string;
  href?: string;
};

export default function UniverseTopBar({
  items,
  actionName,
  actionSlug,
}: {
  items: UniverseTopBarItem[];
  actionName: string;
  actionSlug: string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="flex items-start justify-between gap-3">
        <ToolBreadcrumb className="mb-0 flex-1" items={items} />
        <ToolActions
          slug={actionSlug}
          name={actionName}
          className="mb-0 w-auto shrink-0 justify-end"
        />
      </div>
    </div>
  );
}
