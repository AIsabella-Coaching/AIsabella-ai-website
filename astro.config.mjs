import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import noOrphans from './src/integrations/no-orphans.mjs';

export default defineConfig({
  site: 'https://aisabella.ai',

  // Leerzeichen wie bis Astro 6 behandeln (verlustfrei). Der neue Standard
  // ab Astro 7 ('jsx') löscht Leerzeichen an Zeilenumbrüchen vor Links und
  // <span>s – z. B. „in meiner Datenschutzerklärung“ → „meinerDatenschutzerklärung“.
  compressHTML: true,

  integrations: [noOrphans()],

  vite: {
    plugins: [tailwindcss()],
  },
});
