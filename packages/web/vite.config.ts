import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@stretch4paws/core': path.resolve(__dirname, '../core/src'),
      '@': path.resolve(__dirname, '.'),
    },
  },
});
