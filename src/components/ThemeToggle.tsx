"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-800" />;
  }

  return (
    <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800/50 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <button 
        onClick={() => setTheme("light")} 
        title="Light Mode"
        aria-label="Switch to light mode"
        className={`flex-1 flex justify-center py-1.5 rounded-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand ${theme === 'light' ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button 
        onClick={() => setTheme("system")} 
        title="System Preference"
        aria-label="Switch to system theme"
        className={`flex-1 flex justify-center py-1.5 rounded-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand ${theme === 'system' ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
      >
        <Monitor className="h-4 w-4" />
      </button>
      <button 
        onClick={() => setTheme("dark")} 
        title="Dark Mode"
        aria-label="Switch to dark mode"
        className={`flex-1 flex justify-center py-1.5 rounded-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand ${theme === 'dark' ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
