import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import VCalendar from 'v-calendar';
import Toast from "vue-toastification";

import App from './App.vue'
import router from './router'
import pkg from '../package'

import { UA_LANGUAGE } from "./i18n/ua";

import { createLoader } from "./workers/loading-worker/loading.worker";

import './assets/main.css'
import 'v-calendar/dist/style.css';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const i18n = createI18n({
  locale: 'ua',
  allowComposition: true,
  messages: {
    ua: UA_LANGUAGE
  }
});

createLoader();

const app = createApp(App);

app
  .provide('clientVersion', pkg.version)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(VCalendar, {})
  .use(Toast)
  .mount('#app');
