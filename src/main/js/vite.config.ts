import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: "Bundle",
      fileName: "bundle"
    },
    outDir: "../resources/static",
    emptyOutDir: true
  },
  define: {
      'process.env': {}
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
