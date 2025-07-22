import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        invoice: path.resolve(__dirname, 'invoice.html'),
        subscription: path.resolve(__dirname, 'subscription.html'),
        services: path.resolve(__dirname, 'services.html'),
        about: path.resolve(__dirname, 'about.html'),
        work: path.resolve(__dirname, 'work.html'),
        contact: path.resolve(__dirname, 'contact.html'),
      },
    },
  },
})