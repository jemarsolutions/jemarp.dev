import { Pool } from '@neondatabase/serverless';

// We use the Pool method to manage multiple connections automatically,
// which is highly recommended for Serverless/Edge environments.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
