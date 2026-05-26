import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainAppLayout } from "@/components/MainAppLayout";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jemarp.dev"),
  title: "Jemar | Senior Full-Stack Engineer",
  description:
    "High-performance SPA developer portfolio specializing in Next.js, React, and modern web applications.",
  keywords: [
    "Jemar",
    "Senior Software Engineer",
    "Next.js",
    "React",
    "Portfolio",
    "Web Developer",
  ],
  openGraph: {
    title: "Jemar | Senior Full-Stack Engineer",
    description:
      "High-performance SPA developer portfolio specializing in Next.js, React, and modern web applications.",
    url: "https://jemarp.dev",
    siteName: "jemarp.dev",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "jemarp.dev logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://jemarp.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jemar | Senior Full-Stack Engineer",
    description:
      "High-performance SPA developer portfolio specializing in Next.js, React, and modern web applications.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We need to suppress hydration warning for next-themes
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col m-0 p-0"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jemar",
              url: "https://jemarp.dev",
              jobTitle: "Senior Full-Stack Engineer",
              image: "https://jemarp.dev/logo.png",
              sameAs: [
                "https://github.com/jemar",
                "https://linkedin.com/in/jemar",
              ],
            }),
          }}
        />
        <MainAppLayout>{children}</MainAppLayout>
        <Analytics />
      </body>
    </html>
  );
}
