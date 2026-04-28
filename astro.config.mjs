import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aisabella.ai',

  vite: {
    plugins: [tailwindcss()],
  },
});