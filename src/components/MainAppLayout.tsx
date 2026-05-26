import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CommandMenu } from "./CommandMenu";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppSidebar } from "./AppSidebar";

interface MainAppLayoutProps {
  children: React.ReactNode;
}

export async function MainAppLayout({ children }: MainAppLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col md:flex-row print:h-auto w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-visible md:overflow-hidden print:overflow-visible font-sans print:block">
        <AppSidebar sessionActive={!!session} />

        {/* Main Viewport Content */}
        <main className="flex-1 min-h-0 relative print:h-auto overflow-y-auto overflow-x-hidden print:overflow-visible print:w-full">
          {children}
        </main>
        
        {/* Global Overlays */}
        <CommandMenu isAdmin={!!session} />
      </div>
    </ThemeProvider>
  );
}
