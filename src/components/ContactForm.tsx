"use client";

import { useState } from "react";
import { submitInquiry } from "@/actions/inquiries";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    try {
      await submitInquiry(formData);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand/10 border border-brand/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4"
      >
        <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center text-brand">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Message Sent!</h3>
          <p className="text-neutral-600 dark:text-neutral-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
      {/* Honeypot field - Invisible to humans, tempting to bots */}
      <input 
        type="text" 
        name="website_url_honeypot" 
        tabIndex={-1} 
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 top-0 left-0 h-0 w-0 z-[-1] pointer-events-none"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="John Doe"
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/50 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="john@company.com"
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/50 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Message</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={4}
          placeholder="Tell me about your project, timeline, and goals..."
          className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/50 transition-all resize-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
        />
      </div>
      
      {status === "error" && (
        <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again.</p>
      )}

      <button 
        type="submit" 
        disabled={status === "loading"}
        className="mt-2 w-full sm:w-auto self-end flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-neutral-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
