import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://friendly-ladybug-nexmentors-ce2a9f3d.koyeb.app'
    }
  },
  plugins: [react()],
})
