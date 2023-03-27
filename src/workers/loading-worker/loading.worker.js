
import { ref } from 'vue';
import { createApp } from 'vue';
import Loading from './Loading.vue';

let loading;

const isLoading = ref(false);

const startSpinner = () => {
  isLoading.value = true
}

const finishSpinner = () => {
  setTimeout(() => {
    isLoading.value = false
  }, 300);
}

const createLoader = () => {
  loading = createApp(Loading, {isLoading: isLoading}).mount('#loading');
  startSpinner();
};

export { startSpinner, finishSpinner, createLoader };
