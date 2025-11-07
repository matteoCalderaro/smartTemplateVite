import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        thankyou: 'thank-you.html',
      },
    },
  },
});