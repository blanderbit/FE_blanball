import { watch, ref } from 'vue'
import { cloneDeep, isEqual } from 'lodash'

export const TransformedFiltersWorker = (config) => {
  const { 
    checkSliderValues, 
    setupTransformedCallback, 
    updateRealDataFromTransformed,
    windowWidth,
    // sendDataFromModal,
    props, 
    emit 
  } = config;

  if(!setupTransformedCallback || !updateRealDataFromTransformed || !props || !props?.modelValue|| !emit) {
    throw  new Error('TransformedFiltersWorker need emplement checkSliderValues, setupTransformedCallback, updateRealDataFromTransformed, props, props.modelValue, emit')
  }

  const activeFilters = ref(false);

  const transformedFilters = ref(setupTransformedCallback(activeFilters));

  activeFilters.value = checkSliderValues && checkSliderValues(transformedFilters.value.profile__age)

  watch(
    () => props.modelValue,
    () => {
      transformedFilters.value = setupTransformedCallback(activeFilters)
    },
    {
      deep: true
    }
  );

  let timeout;
  let isChangesInModal = ref(false);
  watch(
    () => cloneDeep(transformedFilters.value),
    (a, b) => {
      if (isEqual(a, b)) {
        return
      }
      if (windowWidth.value < 768) {
        isChangesInModal.value = true
      } else {
        updateRealData()
      }
    },
    {
      deep: true
    }
  );
  // watch(
  //   () => sendDataFromModal.value,
  //   (a, b) => {
  //   if (a && isChangesInModal.value) {
  //     updateRealData()
  //     sendDataFromModal.value = false
  //     isChangesInModal.value = false
  //   } else {
  //     sendDataFromModal.value = false
  //   }
  // })

  function updateRealData() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      emit('update:value', updateRealDataFromTransformed(transformedFilters.value))
    }, 500)
  }

  return {
    transformedFilters,
    activeFilters
  }
};