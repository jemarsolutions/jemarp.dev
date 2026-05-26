# jemar.dev — Developer Portfolio & CMS

A high-performance, full-stack developer portfolio built with **Next.js 15 (App Router)**, featuring a custom headless CMS, an admin dashboard, a print-optimized resume, and advanced SEO capabilities.

Live at: **[jemar.dev](https://jemar.dev)**

---

## ✨ Features

### Public Portfolio
- **Project Showcase** — Filterable project grid by category (Modern Stack, WordPress, Headless WP) with Framer Motion animations
- **Smart Favicon Resolver** — API proxy that intelligently scrapes real project icons from live URLs with Google Favicon fallback
- **Featured Projects** — Star-badged, brand-colored border highlight for pinned work
- **Command Palette** — `Ctrl/Cmd + K` search across all pages and projects with keyboard navigation (↑↓ Enter)
- **Contact Form** — Honeypot anti-spam, input length validation, and instant success feedback

### About / Resume
- **Print-Optimized Resume** — A4-formatted PDF via browser print with custom `@media print` CSS (no headers/footers)
- **Work Experience Timeline** — Animated, alternating zigzag timeline with brand color accents
- **Technical Skills Grid** — Hover-effect skill badges

### Admin CMS
- **Admin Dashboard** — Authenticated CRUD management for all projects
- **Inquiries Inbox** — Read/delete contact form submissions with unread badge counter
- **Session-Protected** — Server-side auth checks on both layout routes and Server Actions

### Technical
- **Progressive Web App (PWA)** — Installable via `manifest.ts`, opens without browser chrome
- **Skeleton Loading States** — Next.js `loading.tsx` Suspense boundaries on all data-fetching pages
- **JSON-LD Structured Data** — Google Knowledge Graph / Person schema for SEO
- **Dynamic Brand Contrast** — `#00D4FF` in dark mode, `#007799` in light mode for WCAG AA compliance
- **ARIA Accessibility** — Labels on all icon-only buttons, `focus-visible` rings throughout
- **Vercel Analytics** — Lightweight, privacy-friendly page view tracking

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Database | Neon Serverless PostgreSQL |
| Auth | NextAuth.js v4 (JWT + bcryptjs) |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A [Neon](https://neon.tech) database (free tier works fine)

### 1. Clone & Install

```bash
git clone https://github.com/jemar/jemar.dev.git
cd jemar.dev
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://...your-neon-connection-string...
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=http://localhost:3000
```

> **Tip:** Generate a secure `NEXTAUTH_SECRET` with: `openssl rand -base64 32`

### 3. Seed the Admin User

On first run, seed your admin account:

```bash
npx tsx seed-admin.ts
```

This creates the `admins` table and inserts a default admin with a bcrypt-hashed password. **Delete the script after running it.**

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # Resume & Contact page (static, pre-rendered)
│   ├── admin/          # Protected admin dashboard & inquiries
│   │   ├── loading.tsx # Table skeleton loader
│   │   └── inquiries/
│   │       └── loading.tsx
│   ├── api/
│   │   ├── auth/       # NextAuth.js route handler
│   │   └── favicon/    # Smart favicon proxy API
│   ├── layout.tsx      # Root layout (SEO metadata, JSON-LD, Analytics)
│   ├── loading.tsx     # Portfolio grid skeleton loader
│   ├── manifest.ts     # PWA manifest
│   ├── robots.ts       # Search engine crawl rules
│   └── sitemap.ts      # Dynamic sitemap.xml
├── actions/
│   ├── inquiries.ts    # Server Actions (submit, delete, mark-read)
│   └── projects.ts     # Server Actions (create, update, delete, search)
├── components/
│   ├── CommandMenu.tsx     # Global command palette (Ctrl+K)
│   ├── ContactForm.tsx     # Honeypot-protected contact form
│   ├── DashboardView.tsx   # Filterable project grid + CTA section
│   ├── MainAppLayout.tsx   # Root sidebar layout
│   ├── ProjectCard.tsx     # Individual project card with favicon resolver
│   ├── SearchTrigger.tsx   # Sidebar search button
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   └── ThemeToggle.tsx     # Light / System / Dark switcher
└── db/
    └── index.ts        # Neon connection pool
```

---

## 🔐 Security Model

| Threat | Defense |
|---|---|
| Unauthorized CMS access | `getServerSession` on layout + every Server Action |
| Brute force admin login | Bcrypt password hashing (cost factor 10) |
| Contact form spam (bots) | CSS honeypot field validated server-side |
| Payload flooding (DoS) | Input length limits (name: 100, email: 100, message: 5000 chars) |
| Admin route indexing | `robots.ts` disallows `/admin/` and `/api/` |
| Duplicate content SEO | Canonical URL enforced via metadata |

---

## 🌍 Deployment (Vercel)

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add the following **Environment Variables** in Vercel's project settings:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → `https://jemar.dev`
4. Deploy and link your custom domain

---

## 📝 License

Private — All rights reserved. © Jemar Paltingca
