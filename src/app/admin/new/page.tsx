import { createProject } from "@/actions/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default function NewProjectPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    await createProject(formData);
    redirect("/admin");
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <Link href="/admin" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">New Project</h1>

      <form action={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input name="title" required className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="My Awesome App" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (Unique)</label>
            <input name="slug" required className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="my-awesome-app" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Hook Summary</label>
          <input name="hook_summary" required className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="Short punchy subtitle..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Technical Challenge</label>
          <textarea name="technical_challenge" required rows={4} className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="The Problem & Solution..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select name="category" required className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white">
              <option value="modern_stack">Modern Stack</option>
              <option value="headless_wp">Headless WP</option>
              <option value="wordpress">WordPress</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (Comma separated)</label>
            <input name="tags" required className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="Next.js, Tailwind, GraphQL" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Live URL (Optional)</label>
            <input name="live_url" type="url" className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="https://..." />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL (Optional)</label>
            <input name="github_url" type="url" className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input type="checkbox" name="is_featured" id="is_featured" value="true" className="h-5 w-5 rounded border-neutral-300" />
          <label htmlFor="is_featured" className="text-sm font-medium">Feature this project on the main layout?</label>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-4">
          <Link href="/admin" className="px-6 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="px-6 py-2 rounded-lg text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
