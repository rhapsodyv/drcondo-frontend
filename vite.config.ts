import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: true,
    proxy: {
      // 1. Simple shorthand: maps /api to http://localhost:5000
      '/api': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',

      // // 2. Advanced configuration
      // '/api-v1': {
      //   target: 'http://typicode.com',
      //   changeOrigin: true, // Rewrites the Origin header to match the target
      //   rewrite: (path) => path.replace(/^\/api-v1/, ''), // Removes '/api-v1' before sending to target
      //   secure: false, // Set to false if using self-signed SSL certificates
      // }
    }
  },
  build: {
    rollupOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [
            {
              test: /node_modules\/react-aria-components/,
              name: 'rac',
            },
            {
              test: /node_modules\/react/,
              name: 'react',
            },
            {
              name: 'vendor',
              test: /node_modules/,
            },
          ],
        },
      },
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
