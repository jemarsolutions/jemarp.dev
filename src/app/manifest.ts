import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'jemarp.dev | Portfolio',
    short_name: 'jemarp.dev',
    description: 'High-performance SPA developer portfolio specializing in Next.js, React, and modern web applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#00D4FF',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
