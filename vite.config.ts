import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nathangwang.github.io/', // For GitHub Pages project site
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
