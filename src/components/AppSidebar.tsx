"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Terminal,
  Settings,
  LayoutGrid,
  Inbox,
  Menu,
  X,
} from "lucide-react";
import { SearchTrigger } from "./SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";

type AppSidebarProps = {
  sessionActive: boolean;
};

const navItems = [
  { href: "/", label: "Portfolio Showcase", icon: FolderKanban },
  { href: "/about", label: "About Me", icon: LayoutGrid },
];

export function AppSidebar({ sessionActive }: AppSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);

    return () => window.clearTimeout(closeTimer);
  }, [pathname]);

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl print:hidden">
        <SidebarContent sessionActive={sessionActive} />
      </aside>

      <div className="md:hidden sticky top-0 z-40 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl print:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800">
              <Image
                src="/logo.png"
                alt="Jemar"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold tracking-tight">
                jemarp.dev
              </div>
              <div className="truncate text-xs text-neutral-500">
                Mobile navigation
              </div>
            </div>
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 shadow-sm outline-none transition hover:bg-neutral-50 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-brand"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden print:hidden transition-opacity ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-neutral-950/55"
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[86vw] max-w-sm overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent sessionActive={sessionActive} />
        </aside>
      </div>
    </>
  );
}

function SidebarContent({
  sessionActive,
}: {
  sessionActive: boolean;
}) {
  return (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800">
          <Image
            src="/logo.png"
            alt="Jemar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-semibold tracking-tight">jemarp.dev</div>
      </div>

      <div className="px-4 pb-4">
        <SearchTrigger />
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <NavItem key={href} href={href} icon={<Icon className="h-4 w-4" />} label={label} />
        ))}

        {sessionActive && (
          <>
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Admin
              </p>
            </div>
            <NavItem
              href="/admin"
              icon={<Terminal className="h-4 w-4" />}
              label="Admin Console"
            />
            <NavItem
              href="/admin/inquiries"
              icon={<Inbox className="h-4 w-4" />}
              label="Inquiries Inbox"
            />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
        <ThemeToggle />
        {sessionActive && (
          <NavItem
            href="/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        )}
      </div>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all group shrink-0"
    >
      <span className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}
