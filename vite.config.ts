import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Minimal manifest; keeps build happy and enables install later.
      manifest: {
        name: 'PartsTracker',
        short_name: 'Parts',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0EA5E9'
      }
    })
  ]
})