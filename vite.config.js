import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://disappointed-jaquelyn-nexmentors-8a6117f1.koyeb.app/'
    }
  },
  plugins: [react()],
})
