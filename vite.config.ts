import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/auth': {
        target: 'http://localhost:9090/user-mgmt',
        changeOrigin: true,
        secure: false,

      },
      // Proxy all profile-related requests
      '/api/v1/profile': {
        target: 'http://localhost:9090/user-mgmt',
        changeOrigin: true,
        secure: false,

      },
      // Proxy all book-related requests
      '/api/v1': {
        target: 'http://localhost:9090/book-mgmt',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
