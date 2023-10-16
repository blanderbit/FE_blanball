import { useField } from '@system.it.flumx.com/vee-validate';
import { modes } from './interactionModes';

export const CustomModelWorker = (props, emit) => {
  const {
    meta: modelMeta,
    value: modelValue,
    errorMessage: modelErrorMessage,
    handleChange: modelHandleChange,
    handleBlur: modelHandleBlur,
  } = useField(toRef(props, 'name'), null, {
    validateOnValueUpdate: false,
  });
  const modelHandlers = computed(() => {
    const on = {
      blur: modelHandleBlur,
      input: [
        (e) => {
          if (emit)
            emit(
              'update:modelValue',
              (typeof e?.target?.value === 'string'
                ? e?.target?.value
                : null) || e
            );
          modelHandleChange(e, false);
        },
      ],
    };

    // Get list of validation events based on the current mode
    const triggers = modes[props.mode]({
      errorMessage: modelErrorMessage,
      meta: modelMeta,
    });

    // add them to the "on" handlers object
    triggers.forEach((t) => {
      if (Array.isArray(on[t])) {
        on[t].push(modelHandleChange);
      } else {
        on[t] = modelHandleChange;
      }
    });

    return on;
  });

  watch(
    () => props.modelValue,
    () => {
      modelHandlers.value.input[0](props.modelValue);
      modelHandlers.value.input[1](props.modelValue, false);
    }
  );

  return {
    modelMeta,
    modelValue,
    modelErrorMessage,
    modelHandleChange,
    modelHandleBlur,
    modelHandlers,
  };
};
