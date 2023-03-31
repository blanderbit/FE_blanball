import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';

import { createDeviceDetector } from 'next-vue-device-detector';

import VCalendar from 'v-calendar';
import Toast from 'vue-toastification';
import PortalVue from 'portal-vue';

import { createLoader } from './workers/loading-worker/loading.worker';
import Maska from './workers/phone-maska-worker';

import App from './App.vue';
import router from './router';
import pkg from '../package';
import '../src/components/maps/map.init';
import { UA_LANGUAGE } from './i18n/ua';

import './assets/styles/main.scss';
import 'v-calendar/dist/style.css';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'vue-select/dist/vue-select.css';
import 'cropperjs/dist/cropper.css';
import '@vueform/slider/themes/default.css';
import '@mcistudio/vue-colorpicker/dist/style.css';

export const i18n = createI18n({
  locale: 'ua',
  allowComposition: true,
  messages: {
    ua: UA_LANGUAGE,
  },
});
createLoader();

const app = createApp(App);

const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2l-4.2-4.2 1.4-1.4 2.8 2.8 6.6-6.6 1.4 1.4z"/></svg>`;
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 2h2v12h-2zm0 14h2v2h-2z"/><path d="M11 18h2v4h-2z"/><path d="M13 22h-2v-4h2z"/><path d="M19.71 6.71l-1.42-1.42c-2.34-2.34-6.14-2.34-8.48 0L4.29 9.29c-2.34 2.34-2.34 6.14 0 8.48l1.42 1.42c2.34 2.34 6.14 2.34 8.48 0l5.66-5.66c2.34-2.34 2.34-6.14 0-8.48zM7.83 14.83l-.71-.71 6.36-6.36.71.71-6.36 6.36z"/></svg>`;


app
  .provide('clientVersion', pkg.version)
  .use(createPinia())
  .use(router)
  .use(PortalVue)
  .use(i18n)
  .use(VCalendar, {})
  .use(Toast, {
    icon: {
      success: successIcon,
      error: errorIcon,
    },
  })
  .use(Maska)
  .use(createDeviceDetector())
  .mount('#app');
