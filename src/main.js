import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

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
import pinia from './plugins/pinia';
import pkg from '../package';
import './workers/map-worker/map.init';
import { UA_LANGUAGE } from './i18n/ua';
import { BlanballEventBus } from './workers/event-bus-worker';
import { useHintsStore } from './stores/hints';

import './assets/styles/main.scss';
import './assets/styles/normalize.scss';
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

app
  .provide('clientVersion', pkg.version)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(VCalendar, {})
  .use(Toast)
  .use(Maska)
  .use(createDeviceDetector())
  .directive('hints', (el, hintsData) => {
    const hintsStore = useHintsStore();

    const hintsToShow = hintsData.value.filter((result) => {
      return hintsStore.hintsData.results.some(
        (value) => value.name === result.name
      );
    });

    const calculatePosition = (hint) => {
      return {
        ...hint,
        top: el.getBoundingClientRect().top + el.offsetHeight + hint.marginTop,
        left: el.getBoundingClientRect().left - (hint.width / 2)
      }
    }

    hintsToShow.map(calculatePosition);

    if (hintsToShow.length) {
      BlanballEventBus.emit('createHints', { hints: hintsToShow, element: el });
    }
  })

  .mount('#app');
