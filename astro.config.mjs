import { fileURLToPath } from 'node:url';

import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import { defineConfig } from 'astro/config';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://ntanh-portfolio.vercel.app',
  output: 'server',
  adapter: vercel(),
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  integrations: [react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
