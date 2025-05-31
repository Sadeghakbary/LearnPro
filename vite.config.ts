import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    port: 3085,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
