import { defineConfig } from 'vite';

// Define chrome as the default browser for the dev server
process.env.BROWSER = 'chrome';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
