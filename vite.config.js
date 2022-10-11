import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
require('dotenv').config();

const globalVariables = {
    'process.env': process.env,
};

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
