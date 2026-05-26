"use server";

import pool from "@/db/index";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function submitInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  // Honeypot check - if a bot filled this out, silently succeed and drop the payload
  const honeypot = formData.get("website_url_honeypot") as string;
  if (honeypot) {
    return;
  }

  if (name.length > 100 || email.length > 100 || message.length > 5000) {
    throw new Error("Input exceeds maximum length");
  }

  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
  } catch (error) {
    console.error("Failed to submit inquiry", error);
    throw new Error("Failed to submit inquiry");
  } finally {
    client.release();
  }
}

export async function deleteInquiry(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const client = await pool.connect();
  try {
    await client.query("DELETE FROM inquiries WHERE id = $1", [id]);
  } catch (error) {
    console.error("Failed to delete inquiry", error);
    throw new Error("Failed to delete inquiry");
  } finally {
    client.release();
  }

  revalidatePath("/admin/inquiries");
}

export async function markInquiryRead(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const client = await pool.connect();
  try {
    await client.query("UPDATE inquiries SET is_read = true WHERE id = $1", [id]);
  } catch (error) {
    console.error("Failed to mark inquiry as read", error);
    throw new Error("Failed to update inquiry");
  } finally {
    client.release();
  }

  revalidatePath("/admin/inquiries");
}
