import { createApp } from 'vue';
import Loading from "./Loading.vue";

let loading;

const startSpinner = () => loading?.start?.();

const finishSpinner = () => loading?.finish?.();

const createLoader = () => {
  loading = createApp(Loading)
    .mount('#loading');
  startSpinner()
};

export {
  startSpinner,
  finishSpinner,
  createLoader
}