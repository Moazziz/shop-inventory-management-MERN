import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Detect environment
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: isDev
            ? 'http://localhost:8000/' // 🧩 Backend (local)
            : 'https://shop-inventory-management-mern.onrender.com/', // 🧩 Backend (Render)
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
