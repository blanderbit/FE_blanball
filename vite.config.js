import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
require('dotenv').config();
// https://vitejs.dev/config/

const globalVariables = {
  'process.browser': 'true',
  'process.env': {
      ...process.env
  }
}
if (process.env.NODE_ENV === 'development') {
  globalVariables.global = 'true'
} else {
  globalVariables.process = process 
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
       // fs: require.resolve('rollup-plugin-node-builtins'),
    }
  },
    define: globalVariables
})
