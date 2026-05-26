import pool from "@/db/index";
import { DashboardView } from "@/components/DashboardView";
import { Project } from "@/types";

// Revalidate this page every 60 seconds (ISR) or on demand
export const revalidate = 60;

export default async function PortfolioPage() {
  let projects: Project[] = [];

  try {
    const client = await pool.connect();
    
    // We create the table dynamically here if it doesn't exist for demo purposes, 
    // but typically this should be handled by migration scripts.
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        slug text UNIQUE NOT NULL,
        hook_summary text NOT NULL,
        technical_challenge text NOT NULL,
        category text NOT NULL CHECK (category IN ('modern_stack', 'headless_wp', 'wordpress')),
        tags text[] NOT NULL,
        live_url text,
        github_url text,
        is_featured boolean DEFAULT false,
        created_at timestamp DEFAULT current_timestamp NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        message text NOT NULL,
        is_read boolean DEFAULT false,
        created_at timestamp DEFAULT current_timestamp NOT NULL
      );
    `);

    const result = await client.query("SELECT * FROM projects ORDER BY is_featured DESC, created_at DESC");
    projects = result.rows as Project[];
    
    client.release();
  } catch (error) {
    console.error("Failed to fetch projects from database:", error);
    // Graceful fallback to empty array
  }

  return (
    <div className="min-h-full">
      <DashboardView projects={projects} />
    </div>
  );
}
