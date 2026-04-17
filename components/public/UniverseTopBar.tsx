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
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-6">
      <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
        <ToolBreadcrumb className="mb-0" items={items} />
        <ToolActions slug={actionSlug} name={actionName} className="mb-0 w-full justify-start md:w-auto md:justify-end" />
      </div>
    </div>
  )
}
