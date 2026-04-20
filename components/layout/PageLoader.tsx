export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-100 dark:border-indigo-950/50" />
          <div className="absolute inset-0 rounded-full border-2 border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
