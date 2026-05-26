export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 animate-pulse">
      <header className="mb-12">
        <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4" />
        <div className="h-6 w-full max-w-2xl bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="h-6 w-3/4 max-w-xl bg-neutral-200 dark:bg-neutral-800 rounded-lg mt-2" />
      </header>

      {/* Tabs Skeleton */}
      <div className="flex pb-4 mb-8 gap-2 border-b border-neutral-200 dark:border-neutral-800">
        <div className="h-9 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-9 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-9 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm h-[22rem]">
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800" />
            
            {/* Content Placeholder */}
            <div className="flex-1 p-6 flex flex-col gap-4">
              <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              </div>
              <div className="flex gap-2 mt-auto">
                <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
