/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import { readdirSync, lstatSync } from 'fs'
import Pages from 'vite-plugin-pages'
import Inspect from 'vite-plugin-inspect'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: readdirSync(resolve(__dirname, 'src'))
      .filter((f) => lstatSync(resolve(resolve(__dirname, 'src'), f)).isDirectory())
      .map((f) => ({ find: `@${f}`, replacement: resolve(__dirname, `src/${f}`) })),
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    AutoImport({
      imports: ['vue'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: resolve(__dirname, '.eslintrc-auto-import.json'),
      },
    }),
    Pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      extensions: ['vue', 'md'],
      exclude: ['**/components/*.vue'],
      nuxtStyle: true,
    }),
    Inspect(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  clearScreen: false,
  envPrefix: ['VITE_', 'TAURI_'],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: './dist',
    // See https://tauri.app/v1/references/webview-versions for details
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !!!process.env.TAURI_DEBUG,
    sourcemap: !!process.env.TAURI_DEBUG,
    emptyOutDir: true,
  },
  test: {
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
