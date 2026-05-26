"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { Code, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!project.live_url) return;
    try {
      const urlStr = project.live_url.startsWith("http") ? project.live_url : `https://${project.live_url}`;
      const domain = new URL(urlStr).hostname;
      fetch(`/api/favicon?domain=${domain}`)
        .then(r => r.json())
        .then(data => { if (data.iconUrl) setFaviconUrl(data.iconUrl); })
        .catch(() => {});
    } catch {}
  }, [project.live_url]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col bg-white dark:bg-neutral-900 border rounded-2xl p-6 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 ${
        project.is_featured 
          ? 'border-brand/50 ring-1 ring-brand/20' 
          : 'border-neutral-200 dark:border-neutral-800'
      }`}
    >
      {project.is_featured && (
        <div className="absolute -top-3 -right-3 h-8 w-8 bg-brand rounded-full flex items-center justify-center shadow-lg transform rotate-12">
          <Star className="h-4 w-4 text-white fill-white" />
        </div>
      )}
      {faviconUrl && (
        <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden p-1">
          <img 
            src={faviconUrl}
            alt="project icon"
            className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2">
          {project.github_url && (
            <Link 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md p-1"
            >
              <Code className="h-5 w-5" />
            </Link>
          )}
          {project.live_url && (
            <Link 
              href={project.live_url} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live website`}
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md p-1"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>

      <p className="text-sm font-medium text-brand mb-2">
        {project.hook_summary}
      </p>
      
      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-6 flex-1">
        {project.technical_challenge}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
