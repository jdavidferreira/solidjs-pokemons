/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'node:path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: path.resolve('src/'),
      },
    ],
    conditions: ['development', 'browser'],
  },
  test: {
    environment: 'jsdom',
    transformMode: { web: [/\.[jt]sx?$/] },
    globals: true,
    threads: false,
    isolate: false,
    setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js'],
  },
})
