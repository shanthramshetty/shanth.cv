import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d-compat'],
  },
})
