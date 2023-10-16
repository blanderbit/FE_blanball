 
 
import loader from '../../components/shared/loader/Loader.vue';

let loading;

const isLoading = ref(false);

const startSpinner = () => {
  isLoading.value = true;
};

const finishSpinner = () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

const createLoader = () => {
  loading = createApp(loader, { isLoading: isLoading }).mount('#loading');
  startSpinner();
};

export { startSpinner, finishSpinner, createLoader };
