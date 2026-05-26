"use client";

import { Printer } from "lucide-react";

export function PrintResumeButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-sm font-bold rounded-xl transition-colors shadow-sm print:hidden w-full md:w-auto justify-center"
    >
      <Printer className="h-4 w-4" />
      Download as PDF
    </button>
  );
}
