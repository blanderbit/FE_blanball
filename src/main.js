import { createApp } from 'vue';

import { createDeviceDetector } from 'next-vue-device-detector';

import VCalendar from 'v-calendar';
import Toast from 'vue-toastification';

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import { createLoader } from './workers/loading-worker/loading.worker';
import Maska from './workers/phone-maska-worker';

import App from './App.vue';
import router from './router';
import { i18n } from './plugins/i18n.plugin';
import { pinia } from './plugins/pinia.plugin';
import pkg from '../package';

import { hintsDirective } from './directives';

import './guards/tech-works-page-guard';
import './workers/map-worker/map.init';

import './assets/styles/main.scss';
import './assets/styles/normalize.scss';
import 'v-calendar/dist/style.css';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'vue-select/dist/vue-select.css';
import 'cropperjs/dist/cropper.css';
import '@vueform/slider/themes/default.css';
import '@mcistudio/vue-colorpicker/dist/style.css';
import 'vue3-emoji-picker/css';

createLoader();

const app = createApp(App);

app
  .provide('clientVersion', pkg.version)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(VCalendar, {})
  .use(Toast)
  .use(Maska)
  .use(createDeviceDetector())
  .directive('hints', hintsDirective)
  .mount('#app');
