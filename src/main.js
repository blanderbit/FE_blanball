import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import { createDeviceDetector } from 'next-vue-device-detector'

import VCalendar from 'v-calendar'
import Toast from 'vue-toastification'
import PortalVue from 'portal-vue'

import { createLoader } from './workers/loading-worker/loading.worker'
import Maska from './workers/phone-maska-worker'

import App from './App.vue'
import router from './router'
import pkg from '../package'
import '../src/components/maps/map.init'
import { UA_LANGUAGE } from './i18n/ua'

import './assets/styles/main.scss'
import 'v-calendar/dist/style.css'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'vue-select/dist/vue-select.css'
import 'cropperjs/dist/cropper.css'
import '@vueform/slider/themes/default.css'
import '@mcistudio/vue-colorpicker/dist/style.css'

export const i18n = createI18n({
  locale: 'ua',
  allowComposition: true,
  messages: {
    ua: UA_LANGUAGE,
  },
})
createLoader()

const app = createApp(App)

app
  .provide('clientVersion', pkg.version)
  .use(createPinia())
  .use(router)
  .use(PortalVue)
  .use(i18n)
  .use(VCalendar, {})
  .use(Toast)
  .use(Maska)
  .use(createDeviceDetector())
  .mount('#app')