export default function AdminLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 animate-pulse">
      <header className="flex justify-between items-end mb-8">
        <div>
          <div className="h-9 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-2" />
          <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </div>
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      </header>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="px-6 py-4"><div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" /></th>
                <th className="px-6 py-4"><div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" /></th>
                <th className="px-6 py-4"><div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" /></th>
                <th className="px-6 py-4 text-right"><div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded ml-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="px-6 py-4"><div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md" /></td>
                  <td className="px-6 py-4"><div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md" /></td>
                  <td className="px-6 py-4"><div className="h-5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                      <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
