"use client";

import { useState } from "react";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { ContactForm } from "./ContactForm";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardViewProps {
  projects: Project[];
}

type Category = "all" | "modern_stack" | "headless_wp" | "wordpress";

const TABS: { id: Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "modern_stack", label: "Modern Stack" },
  { id: "wordpress", label: "WordPress" },
  { id: "headless_wp", label: "Headless WP" },
];

export function DashboardView({ projects }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredProjects = projects.filter(
    (project) => activeTab === "all" || project.category === activeTab
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
          Selected Works.
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          A showcase of high-performance web applications, headless architectures, and complex custom integrations.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar border-b border-neutral-200 dark:border-neutral-800">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                isActive 
                  ? "text-white" 
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "dark:text-neutral-900" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="col-span-full py-24 text-center text-neutral-500"
          >
            No projects found for this category yet.
          </motion.div>
        )}
      </motion.div>

      {/* Epic Footer CTA */}
      <div className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
              Let's build something <span className="text-brand">epic</span> together.
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
              Whether you need a high-performance Next.js web app, a complex API integration, or a headless architecture—I've got you covered.
            </p>
            <div className="flex gap-4 items-center text-sm font-medium text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for freelance
              </div>
              <span>•</span>
              <div>Fast response time</div>
            </div>
          </div>
          
          <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
