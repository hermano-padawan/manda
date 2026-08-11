// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://hermano-padawan.github.io',
  base: '/manda',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
