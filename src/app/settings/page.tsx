"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Monitor, Moon, Sun, Settings2, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Transparent placeholder to prevent layout shift */}
        <div className="h-96 opacity-0">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
          <Settings2 className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-neutral-500">Manage your application preferences and appearance.</p>
      </div>

      <div className="space-y-12">
        
        {/* Appearance Section */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Appearance</h2>
            <p className="text-sm text-neutral-500 mt-1">Customize how the interface looks on your device.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ThemeCard 
              active={theme === "light"} 
              onClick={() => setTheme("light")} 
              icon={<Sun className="h-6 w-6 mb-3" />} 
              label="Light" 
            />
            <ThemeCard 
              active={theme === "dark"} 
              onClick={() => setTheme("dark")} 
              icon={<Moon className="h-6 w-6 mb-3" />} 
              label="Dark" 
            />
            <ThemeCard 
              active={theme === "system"} 
              onClick={() => setTheme("system")} 
              icon={<Monitor className="h-6 w-6 mb-3" />} 
              label="System" 
            />
          </div>
        </section>

        {/* Future Settings Placeholders */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Notifications</h2>
            <p className="text-sm text-neutral-500 mt-1">Manage email and alert preferences.</p>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-start gap-4 opacity-60">
            <Bell className="h-6 w-6 text-neutral-400 mt-1" />
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">Email Alerts</h3>
              <p className="text-sm text-neutral-500 mt-1">Notification modules are coming in v2.0.</p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Security</h2>
            <p className="text-sm text-neutral-500 mt-1">Account protection and session management.</p>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-start gap-4 opacity-60">
            <Shield className="h-6 w-6 text-neutral-400 mt-1" />
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-neutral-500 mt-1">Security settings are configured by your administrator.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function ThemeCard({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
        active 
          ? "border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800" 
          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-transparent"
      }`}
    >
      <div className={active ? "text-neutral-900 dark:text-white" : "text-neutral-500"}>
        {icon}
      </div>
      <span className={`font-medium ${active ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`}>
        {label}
      </span>
    </button>
  );
}
