import { MetadataRoute } from 'next';
import pool from '@/db/index';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URLs
  const routes = [
    '',
    '/about',
  ].map((route) => ({
    url: `https://jemar.dev${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // You can optionally fetch project slugs here if you implement project detail pages
  // Example: 
  // const client = await pool.connect();
  // const res = await client.query('SELECT slug FROM projects');
  // client.release();
  // const projectRoutes = res.rows.map((row) => ({
  //   url: `https://jemar.dev/projects/${row.slug}`,
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }));

  return [...routes];
}
