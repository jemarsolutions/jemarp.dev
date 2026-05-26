import { Pool } from "@neondatabase/serverless";
import fs from "fs";

const envLocal = fs.readFileSync(".env.local", "utf-8");
const dbUrl = envLocal.split("\n").find(line => line.startsWith("DATABASE_URL="))?.split("=")[1]?.trim().replace(/['"]/g, "");

const pool = new Pool({
  connectionString: dbUrl,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Dropping old constraint...");
    await client.query("ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;");
    
    console.log("Updating existing records...");
    await client.query("UPDATE projects SET category = 'wordpress' WHERE category = 'custom_wordpress';");
    
    console.log("Adding new constraint...");
    await client.query("ALTER TABLE projects ADD CONSTRAINT projects_category_check CHECK (category IN ('modern_stack', 'headless_wp', 'wordpress'));");
    
    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
