import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

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
    AutoImport({
      dts: './auto-imports.d.ts',
      dirs: ['./src/workers/api-worker', './src/workers/event-bus-worker'],
      extensions: ['vue', 'js'],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': ['useElementSize'],
        },
        {
          'vue-i18n': ['useI18n'],
        },
        {
          'vue-toastification': ['useToast'],
        },
      ],
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
      '@sytles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@mainComponents': fileURLToPath(
        new URL('./src/components/main', import.meta.url)
      ),
      '@sharedComponents': fileURLToPath(
        new URL('./src/components/shared', import.meta.url)
      ),
      '@workers': fileURLToPath(new URL('./src/workers', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@consts': fileURLToPath(new URL('./src/consts', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
    },
  },
  css: {
    minify: true,
    postcss: {
      plugins: [autoprefixer({})],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/variables.scss"; 
        @import "@/assets/styles/mixins/fonts.scss"; 
        @import '@/assets/styles/mixins/device.scss';
        @import '@/assets/styles/mixins/modal-wrapper.scss';
        @import '@/assets/styles/mixins/calc-height.scss';
        @import '@/assets/styles/mixins/scrollbar/remove-scrollbar.scss';`,
      },
    },
  },
  define: globalVariables,
});
