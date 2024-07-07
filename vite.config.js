import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, 'node_modules/bootstrap/scss')],
      },
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})
