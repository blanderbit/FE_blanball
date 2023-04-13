import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
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
      // "plugins": [
      //     ["@babel/plugin-proposal-decorators", {
      //         "legacy": true,
      //     }],
      //     ["@babel/plugin-proposal-class-properties", {"loose" : true}]
      //     // ["@babel/plugin-proposal-private-property-in-object", {"loose" : true}],
      // ]
    }),
    vue({
      // template: {
      //     compilerOptions: {
      //         isCustomElement: (tag) => ['InfiniteLoading'].includes(tag),
      //     }
      // },
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
      // fs: require.resolve('rollup-plugin-node-builtins'),
    },
  },
  css: {
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
