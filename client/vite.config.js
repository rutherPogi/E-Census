import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png', 'offline-tile.png'],
      manifest: {
        name: 'E-tbayat MSWDO',
        short_name: 'E-tbayat',
        description: 'An offline E-Census with offline map for Itbayat, Batanes.',
        theme_color: '#ffffff',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallbackDenylist: [/^\/api/],
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          // OpenStreetMap tiles
          {
            urlPattern: /^https:\/\/[a-c]\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: {
                maxEntries: 1000, // Increased for better coverage
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Leaflet resources
          {
            urlPattern: /^https:\/\/unpkg\.com\/leaflet/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'leaflet-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 24 * 60 * 60 // 60 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Leaflet marker icons
          {
            urlPattern: /.*marker-icon.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'leaflet-markers',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 24 * 60 * 60 // 60 days
              }
            }
          }
        ]
      },
    }),
  ],
});