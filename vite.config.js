import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue';

require('dotenv').config({ path: './stack.env' });
import { babel } from '@rollup/plugin-babel';

const globalVariables = {
  'process.env': process.env,
};

export default defineConfig({
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
    vue({
      script: {
        babelParserPlugins: [
          'decorators-legacy',
          'classPrivateMethods',
          'classPrivateProperties',
          'classProperties',
          'decoratorAutoAccessors',
          'destructuringPrivate',
          'doExpressions',
          'dynamicImport',
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/variables.scss"; 
        @import "@/assets/styles/mixins/fonts.scss"; 
        @import '@/assets/styles/mixins/device.scss';
        @import '@/assets/styles/mixins/modal-wrapper.scss';`,
      },
    },
  },
  define: globalVariables,
});
