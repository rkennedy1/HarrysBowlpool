import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build'
    },
    resolve: {
      alias: {
        '@/http':
          process.env.NODE_ENV === 'development'
            ? path.resolve(__dirname, './src/services/http.dev.ts')
            : path.resolve(__dirname, './src/services/http.ts'),
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [react()]
  };
});
