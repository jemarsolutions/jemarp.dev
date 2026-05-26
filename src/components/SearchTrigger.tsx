"use client";

import React from "react";
import { Search } from "lucide-react";

export function SearchTrigger() {
  return (
    <button 
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("open-command-menu"));
        }
      }}
      className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-500 bg-neutral-100 dark:bg-neutral-800/50 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-brand transition-all"
    >
      <span className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        Search...
      </span>
      <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700">⌘K</kbd>
    </button>
  );
}
