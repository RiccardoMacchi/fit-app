import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // Esponi il server su tutte le interfacce di rete
    port: 5173,        // Porta predefinita, puoi cambiarla se necessario
  },
})
