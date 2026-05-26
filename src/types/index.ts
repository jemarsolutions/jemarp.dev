export interface Project {
  id: string;
  title: string;
  slug: string;
  hook_summary: string;
  technical_challenge: string;
  category: 'modern_stack' | 'headless_wp' | 'wordpress';
  tags: string[];
  live_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  created_at: Date;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}
