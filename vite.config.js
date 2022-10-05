import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
require('dotenv').config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
       // fs: require.resolve('rollup-plugin-node-builtins'),
    }
  },
    define: {
        'process.browser': 'true',
        'global': 'true',
        'process.env': {
            ...process.env
        }
    },
})
