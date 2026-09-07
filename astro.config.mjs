import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    format: 'file'
  },
  redirects: {
    '/tools': '/fankit.html',
    '/tools/icongen': '/fankit.html',
    '/tools/imprint': '/fankit.html'
  }
});
