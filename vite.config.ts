import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({ plugins: [react(), VitePWA({
  registerType: 'prompt',
  manifest: { name: 'Dove · Experiencia de cuidado', short_name: 'Dove', lang: 'es', start_url: '/', scope: '/', display: 'fullscreen', background_color: '#fbf9f4', theme_color: '#fbf9f4', icons: [{src:'/icons/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},{src:'/icons/icon-maskable.png',sizes:'512x512',type:'image/png',purpose:'maskable'}] },
  workbox: { globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'], navigateFallback: '/index.html', cleanupOutdatedCaches: true, maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 }
})] });
