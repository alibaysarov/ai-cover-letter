import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure environment variables are loaded
  define: {
    // This ensures env vars are available at build time
  },
})
