<template>
  <div>
    <v-select
      :options="options"
      :label="displayName || 'value'"
      append-to-body
      :class="{'b-form-error': modelErrorMessage}"
      :calculate-position="withPopper"
      @update:modelValue="setNewValue($event)"
      maxHeight="100px"
      @open="modelHandlers.blur()"
      v-model="dropdownModelValue"
    >
    </v-select>
    <p class="b-input__error-message">{{ modelErrorMessage }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { CustomModelWorker } from "../../workers/custom-model-worker/index"
import vSelect from "vue-select";
import { createPopper } from '@popperjs/core'
export default {
  name: 'dropdown-component',
  components: {
    vSelect
  },
  props: {
    insideTitle: {
      type: Boolean,
      default: false
    },
    mainTitle: {
      type: String,
      default: 'Title'
    },
    displayName: {
      type: String,
      default: 'value'
    },
    displayValue: {
      type: String,
      default: 'value'
    },
    options: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    name: String
  },
  emits: ['new-value'],
  setup(props, {emit}) {
    const wrapper = ref(null);
    const isOpened = ref(false);
    const dropdownModelValue = ref(null);
    const currentValue = ref(props.options[0].value);
    const {
        modelValue,
        modelErrorMessage,
        modelHandlers
    } = CustomModelWorker(props);

    modelHandlers.value.input[0](props.options[0]?.[props.displayValue]);
    modelHandlers.value.input[1](props.options[0]?.[props.displayValue], true);

    watch(
      () => modelValue.value,
      () => {
        dropdownModelValue.value = props.options.find(item => {
          return item[props.displayValue] === modelValue.value
        })
      },
      {
        immediate: true
      }
    );
    const withPopper = (dropdownList, component, context) => {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = context.width;

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            },
          },
        ],
      });

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy()
    }

    function setNewValue(val) {
      modelHandlers.value.input[0](val?.[props.displayValue]);
      modelHandlers.value.input[1](val?.[props.displayValue], true);
      emit('new-value',val?.[props.displayValue] )
    }

    return {
      setNewValue,
      withPopper,
      modelValue,
      modelErrorMessage,
      modelHandlers,
      isOpened,
      currentValue,
      wrapper,
      dropdownModelValue
    }
  }
}
</script>

<style lang="scss" scoped >
  @import "forms.scss";
  /*::v-deep {*/

  /*}*/


::v-deep {
  .vs__clear {
    display: none;
  }
  .vs__dropdown-menu {
    width: 500px;
  }
}

::v-deep {
  #vs3__listbox {
    --vs-dropdown-min-width: auto;
  }
}



  .b-input__error-message {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #F32929;
  }

  .v-select.drop-up.vs--open .vs__dropdown-toggle {
    border-radius: 0 0 4px 4px;
    border-top-color: transparent;
    border-bottom-color: rgba(60, 60, 60, 0.26);
  }

  [data-popper-placement='top'] {
    border-radius: 4px 4px 0 0;
    border-top-style: solid;
    border-bottom-style: none;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
  }
</style>