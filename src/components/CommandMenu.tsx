"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderKanban, Terminal, X, Settings2, Inbox, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSearchProjects } from "@/actions/projects";

export function CommandMenu({ isAdmin = false }: { isAdmin?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projects, setProjects] = useState<{id: string, title: string, live_url: string | null}[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && projects.length === 0) {
      getSearchProjects().then(setProjects);
    }
  }, [isOpen, projects.length]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    const openMenu = () => setIsOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-menu", openMenu);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-menu", openMenu);
    };
  }, []);


  let actions = [
    { icon: FolderKanban, label: "View Portfolio", onSelect: () => { router.push("/"); setIsOpen(false); } }
  ];

  if (isAdmin) {
    actions = [
      ...actions,
      { icon: Terminal, label: "Admin Dashboard", onSelect: () => { router.push("/admin"); setIsOpen(false); } },
      { icon: Inbox, label: "Inquiries Inbox", onSelect: () => { router.push("/admin/inquiries"); setIsOpen(false); } },
      { icon: Settings2, label: "Settings", onSelect: () => { router.push("/settings"); setIsOpen(false); } }
    ];
  }

  const projectActions = projects.map(p => ({
    icon: ExternalLink,
    label: `Project: ${p.title}`,
    onSelect: () => {
      if (p.live_url) {
        window.open(p.live_url.startsWith('http') ? p.live_url : `https://${p.live_url}`, '_blank');
      } else {
        router.push("/");
      }
      setIsOpen(false);
    }
  }));

  const allActions = [...actions, ...projectActions];

  const filteredActions = allActions.filter((action) =>
    action.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onSelect();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-2xl backdrop-blur-xl mx-4"
        >
          <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
            <Search className="h-5 w-5 text-neutral-500" />
            <input
              autoFocus
              className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredActions.length === 0 ? (
              <div className="py-6 text-center text-sm text-neutral-500">
                No results found.
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {filteredActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onSelect}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                      i === selectedIndex 
                        ? "bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100" 
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/30 dark:hover:bg-neutral-800/30"
                    }`}
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer Info */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 text-xs text-neutral-500 flex justify-between">
            <span>Use <kbd className="px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">↑</kbd> <kbd className="px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">ESC</kbd> to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
