import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import noOrphans from './src/integrations/no-orphans.mjs';

export default defineConfig({
  site: 'https://aisabella.ai',

  integrations: [noOrphans()],

  vite: {
    plugins: [tailwindcss()],
  },
});
