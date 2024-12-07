import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@fortawesome/free-solid-svg-icons'],
    },
  },
    resolve: {
    alias: {
      '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),
    },
  },
 
})
