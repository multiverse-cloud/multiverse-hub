import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb'
import ToolActions from '@/components/tools/ToolActions'

type UniverseTopBarItem = {
  label: string
  href?: string
}

export default function UniverseTopBar({
  items,
  actionName,
  actionSlug,
}: {
  items: UniverseTopBarItem[]
  actionName: string
  actionSlug: string
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="flex items-center justify-between gap-2">
        <ToolBreadcrumb className="mb-0 text-[10px]" items={items} />
        <ToolActions slug={actionSlug} name={actionName} className="mb-0 w-auto justify-end" />
      </div>
    </div>
  )
}
