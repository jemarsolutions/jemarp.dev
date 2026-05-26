import pool from "@/db/index";
import { Project } from "@/types";
import { deleteProject } from "@/actions/projects";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";

export const dynamic = "force-dynamic"; // Always fresh data for admin

export default async function AdminDashboard() {
  const client = await pool.connect();
  let projects: Project[] = [];
  try {
    const result = await client.query("SELECT * FROM projects ORDER BY created_at DESC");
    projects = result.rows as Project[];
  } finally {
    client.release();
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-2">Manage your portfolio projects</p>
        </div>
        <Link 
          href="/admin/new" 
          className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity w-fit"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </header>

      <div className="md:hidden space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">{project.title}</div>
                <div className="mt-1 text-xs inline-flex px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                  {project.category}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-neutral-400 hover:text-brand transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <form action={deleteProject.bind(null, project.id)}>
                  <button type="submit" className="text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              Featured: {project.is_featured ? "Yes" : "No"}
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-500">
            No projects found. Create one to get started.
          </div>
        )}
      </div>

      <div className="hidden md:block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    <span className="px-2.5 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {project.is_featured ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Yes</span>
                    ) : (
                      <span className="text-neutral-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-neutral-400 hover:text-brand transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <form action={deleteProject.bind(null, project.id)}>
                        <button type="submit" className="text-neutral-400 hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    No projects found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
