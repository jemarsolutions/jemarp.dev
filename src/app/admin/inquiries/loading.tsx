export default function AdminInquiriesLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 animate-pulse">
      <header className="mb-8">
        <div className="h-9 w-56 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-2" />
        <div className="h-5 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
      </header>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6"
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="space-y-2">
                <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md mt-1" />
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-9 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                <div className="h-9 w-9 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-950 rounded-lg p-4 space-y-2 border border-neutral-100 dark:border-neutral-800/50">
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
