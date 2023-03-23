<template>
  <div class="b-dropdown">
    <div class="b-dropdown__title">
      <span>
        {{ dropdownModelValue ? mainTitle : '' }}
      </span>
    </div>
    <v-select
      :searchable="false"
      :style="{ height: height + 'px' }"
      :placeholder="!dropdownModelValue ? placeholder : ''"
      :options="options"
      :label="displayName || 'value'"
      :disabled="disabled"
      append-to-body
      taggable="taggable"
      :class="{ 'b-form-error': modelErrorMessage }"
      :calculate-position="withPopper"
      @update:modelValue="setNewValue($event)"
      maxHeight="100px"
      @open="modelHandlers.blur()"
      v-model="dropdownModelValue"
    >
      <template #option="options">
        <div class="b-dropdown__custom-option">
          <img v-if="options.iconSrc" :src="options.iconSrc" alt="icon" />
          {{ $t(options[displayName].toString()) }}
        </div>
      </template>
      <template #selected-option="options">
        <div class="b-dropdown__custom-option">
          <img v-if="options.iconSrc" :src="options.iconSrc" alt="icon" />
          <span class="b-dropdown__custom-option-text">
            {{ $t(options[displayName].toString()) }}
          </span>
        </div>
      </template>
    </v-select>
    <p class="b-input__error-message">
      {{ modelErrorMessage ? t(modelErrorMessage) : '' }}
    </p>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { createPopper } from '@popperjs/core';

import vSelect from 'vue-select';

import OpenIndicator from './OpenIndicator.vue';

import { CustomModelWorker } from '../../workers/custom-model-worker/index';

import SearchIcon from '../../assets/img/search.svg';

export default {
  name: 'dropdown-component',
  components: {
    vSelect,
    OpenIndicator,
  },
  props: {
    checkValueInitially: {
      type: Boolean,
      default: false,
    },
    checkValueImmediate: {
      type: Boolean,
      default: false,
    },
    mainTitle: {
      type: String,
      default: '',
    },
    displayName: {
      type: String,
      default: 'value',
    },
    displayValue: {
      type: String,
      default: 'value',
    },
    modelValue: Object | String,
    taggable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: 40,
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    initValue: {
      type: String,
      default: '',
    },
  },
  emits: ['new-value', 'update:modelValue'],
  setup(props, { emit }) {
    const wrapper = ref(null);
    const isOpened = ref(false);
    const dropdownModelValue = ref(null);
    const {
      modelValue: staticModelValue,
      modelErrorMessage,
      modelHandlers,
    } = CustomModelWorker(props);
    const icon = computed(() => SearchIcon);

    function selectValue(e) {
      dropdownModelValue.value =
        props.options.find((item) => {
          return item[props.displayValue] === e;
        }) || (e ? { value: e, name: e } : null);

      modelHandlers.value.input[0](e);
      modelHandlers.value.input[1](e, true);
    }

    if (props.initValue) {
      selectValue(props.initValue);
    }

    vSelect.props.components.default = () => ({ OpenIndicator });
    watch(
      () => props.options,
      () => {
        selectValue(props.modelValue);
      },
      {
        immediate: props.checkValueImmediate,
      }
    );

    if (props.checkValueInitially) {
      selectValue(props.modelValue);
    }

    watch(
      () => props.modelValue,
      () => {
        selectValue(props.modelValue);
      },
      {
        immediate: props.checkValueImmediate,
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
              // component.$el.classList.toggle(
              //   'drop-up',
              //   state.placement === 'top'
              // )
            },
          },
        ],
      });

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy();
    };

    function setNewValue(val) {
      modelHandlers.value.input[0](val?.[props.displayValue]);
      modelHandlers.value.input[1](val?.[props.displayValue], true);
      emit('new-value', val?.[props.displayValue]);
      emit('update:modelValue', val?.[props.displayValue]);
    }

    const { t } = useI18n();
    return {
      setNewValue,
      withPopper,
      staticModelValue,
      modelErrorMessage,
      modelHandlers,
      isOpened,
      wrapper,
      dropdownModelValue,
      icon,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;

@import '../../assets/styles/forms.scss';

::v-deep {
  .vs__clear {
    display: none;
  }
  .vs__search {
    margin: 0;
    padding: 0;
  }
  .vs--unsearchable:not(.vs--disabled) .vs__search {
    padding: 4px;
  }
  .v-select {
    height: 100%;
  }
  .vs__search,
  .vs__dropdown-menu,
  .v-select {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: $--b-main-gray-color;
  }
  .v-select .vs__dropdown-toggle {
    padding: 0;
    height: 100%;
  }
  .v-select.vs--open.vs--single.vs--unsearchable .vs__dropdown-toggle {
    border-bottom: var(--vs-border-width) var(--vs-border-style)
      var(--vs-border-color);
  }
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: $--b-main-gray-color;
  }
}

::v-deep {
  #vs3__listbox {
    --vs-dropdown-min-width: auto;
  }
  .vs__selected-options {
    overflow: hidden;
    flex-wrap: nowrap;
  }
  .vs__selected {
    overflow-x: hidden;
    width: 100%;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    margin: 0;
  }
  .vs--single.vs--open .vs__selected {
    height: 100%;
    width: 100%;
  }
  .vs--searchable.b-form-error {
    border-radius: 6px;
  }

  .vs--searchable .vs__dropdown-toggle,
  .vs__selected-options {
    height: 100%;
  }
  .vs--searchable .vs__dropdown-toggle {
    border-color: $color-dfdeed;
    height: 100%;
    padding: 0;
  }
}

.b-input__error-message {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $--b-error-color;
}
.v-select.drop-up.vs--open .vs__dropdown-toggle {
  border-radius: 0 0 4px 4px;
  border-top-color: transparent;
  border-bottom-color: rgba(60, 60, 60, 0.26);
  background: red;
}

[data-popper-placement='top'] {
  border-radius: 4px 4px 0 0;
  border-top-style: solid;
  border-bottom-style: none;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}
.b-dropdown {
  position: relative;
  text-align: left;
  &__title {
    position: absolute;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: $--b-main-gray-color;
    background: $--b-main-white-color;
    padding: 0px 4px;
    left: 8px;
    top: -8px;
    z-index: 10;
  }
  &__custom-option {
    display: flex;
    align-items: center;
    height: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: $--b-main-black-color;

    img {
      margin-right: 5px;
      display: block;
      width: 12px;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.b-form-error {
  border-radius: 6px;
}
</style>
