import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FolderKanban, Terminal, Settings, LayoutGrid, Inbox } from "lucide-react";
import { ThemeProvider } from "./ThemeProvider";
import { CommandMenu } from "./CommandMenu";
import { SearchTrigger } from "./SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface MainAppLayoutProps {
  children: React.ReactNode;
}

export async function MainAppLayout({ children }: MainAppLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen print:h-auto w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-hidden print:overflow-visible font-sans print:block">
        
        {/* Desktop Sidebar Panel */}
        <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl print:hidden">
          <div className="p-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800">
              <Image src="/logo.png" alt="Jemar" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <div className="font-semibold tracking-tight">jemar.dev</div>
          </div>
          
          <div className="px-4 pb-4">
            <SearchTrigger />
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <NavItem href="/" icon={<FolderKanban className="h-4 w-4" />} label="Portfolio Showcase" />
            <NavItem href="/about" icon={<LayoutGrid className="h-4 w-4" />} label="About Me" />
            
            {session && (
              <>
                <div className="pt-4 pb-1">
                  <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Admin</p>
                </div>
                <NavItem href="/admin" icon={<Terminal className="h-4 w-4" />} label="Admin Console" />
                <NavItem href="/admin/inquiries" icon={<Inbox className="h-4 w-4" />} label="Inquiries Inbox" />
              </>
            )}
          </nav>

          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <ThemeToggle />
            {session && (
              <NavItem href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            )}
          </div>
        </aside>

        {/* Main Viewport Content */}
        <main className="flex-1 relative h-full print:h-auto overflow-y-auto overflow-x-hidden print:overflow-visible print:w-full">
          {children}
        </main>
        
        {/* Global Overlays */}
        <CommandMenu isAdmin={!!session} />
      </div>
    </ThemeProvider>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all group"
    >
      <span className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}

