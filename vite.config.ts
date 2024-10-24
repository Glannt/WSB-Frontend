import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
import { codecovVitePlugin } from '@codecov/vite-plugin';
// import dotenv from 'dotenv';
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   base: process.env.PUBLIC_URL,
// });

export default defineConfig({
  plugins: [
    react(),
    vercel(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'wsb-frontend', // Đặt tên bundle dự án ở đây
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: process.env.PUBLIC_URL,
  optimizeDeps: {
    include: ['tailwind-merge'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Your Spring Boot backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // If necessary, adjust path
      },
    },
    port: 3000, // You can set the dev server port here
  },
});
