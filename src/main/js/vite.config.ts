import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


const config: UserConfigExport = {
  plugins: [vue()],
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    config.server = {
      proxy: {
        '/api': 'http://localhost:8080'
      }
    }
    config.build.sourcemap = "inline";
    return config;
  } else {
    config.build = {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: "Bundle",
        fileName: "bundle"
      },
      outDir: "../resources/static",
      emptyOutDir: true
    };
    config.define = {
      'process.env': {}
    };
    if (mode === "development") {
      config.build.sourcemap = "inline";
    }
    return config
  }
})
