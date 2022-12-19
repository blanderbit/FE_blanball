import { watch, ref } from 'vue'
import { cloneDeep, isEqual } from 'lodash'

export const TransformedFiltersWorker = (config) => {
  const { setupTransformedCallback, updateRealDataFromTransformed, props, emit } = config;

  if(!setupTransformedCallback || !updateRealDataFromTransformed || !props || !props?.modelValue|| !emit) {
    throw  new Error('TransformedFiltersWorker need emplement setupTransformedCallback, updateRealDataFromTransformed, props, props.modelValue, emit')
  }
  const activeFilters = ref(false);

  const transformedFilters = ref(setupTransformedCallback(activeFilters));

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
  watch(
    () => cloneDeep(transformedFilters.value),
    (a, b) => {
      if (isEqual(a, b)) {
        return
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        emit('update:value', updateRealDataFromTransformed(transformedFilters.value))
      }, 500)
    },
    {
      deep: true
    }
  );

  return {
    transformedFilters,
    activeFilters
  }
};