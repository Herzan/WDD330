import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
        destination: resolve(__dirname, 'src/destination/index.html'),
        booking: resolve(__dirname, 'src/booking/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        thankyou: resolve(__dirname, 'src/checkout/thank-you.html'),
      },
    },
  },
});
