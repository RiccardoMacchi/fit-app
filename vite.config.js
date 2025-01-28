import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      base: '/fit-app/',
      registerType: 'autoUpdate',
      manifest: {
        base: '/fit-app/',
        name: 'fit-app',
        short_name: 'App',
        start_url: '/fit-app/',
        scope: '/fit-app/',
        description: 'Descrizione della tua Progressive Web App',
        theme_color: '#000000',
        icons: [
          {
            src: '/fit-app/images/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/fit-app/images/icons/icon-592x592.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
