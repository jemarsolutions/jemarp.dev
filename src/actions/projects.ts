"use server";

import pool from "@/db/index";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createProject(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const hook_summary = formData.get("hook_summary") as string;
  const technical_challenge = formData.get("technical_challenge") as string;
  const category = formData.get("category") as string;
  const tagsStr = formData.get("tags") as string;
  const live_url = (formData.get("live_url") as string) || null;
  const github_url = (formData.get("github_url") as string) || null;
  const is_featured = formData.get("is_featured") === "true";

  const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO projects (title, slug, hook_summary, technical_challenge, category, tags, live_url, github_url, is_featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [title, slug, hook_summary, technical_challenge, category, tags, live_url, github_url, is_featured]
    );
  } catch (error) {
    console.error("Failed to create project", error);
    throw new Error("Failed to create project");
  } finally {
    client.release();
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const client = await pool.connect();
  try {
    await client.query("DELETE FROM projects WHERE id = $1", [id]);
  } catch (error) {
    console.error("Failed to delete project", error);
    throw new Error("Failed to delete project");
  } finally {
    client.release();
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const hook_summary = formData.get("hook_summary") as string;
  const technical_challenge = formData.get("technical_challenge") as string;
  const category = formData.get("category") as string;
  const tagsStr = formData.get("tags") as string;
  const live_url = (formData.get("live_url") as string) || null;
  const github_url = (formData.get("github_url") as string) || null;
  const is_featured = formData.get("is_featured") === "true";

  const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

  const client = await pool.connect();
  try {
    await client.query(
      `UPDATE projects 
       SET title = $1, slug = $2, hook_summary = $3, technical_challenge = $4, category = $5, tags = $6, live_url = $7, github_url = $8, is_featured = $9 
       WHERE id = $10`,
      [title, slug, hook_summary, technical_challenge, category, tags, live_url, github_url, is_featured, id]
    );
  } catch (error) {
    console.error("Failed to update project", error);
    throw new Error("Failed to update project");
  } finally {
    client.release();
  }

  revalidatePath("/");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function getSearchProjects() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, title, live_url FROM projects ORDER BY title ASC");
    return res.rows;
  } catch (error) {
    console.error("Failed to fetch search projects", error);
    return [];
  } finally {
    client.release();
  }
}
