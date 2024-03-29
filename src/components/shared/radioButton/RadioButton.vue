<template>
  <div
    class="b-radio"
    :class="{
      'b-form-error': modelErrorMessage,
      'b-radio-selected':
        modelValue === staticModelValue ||
        modelValue === value ||
        staticModelValue === value,
    }"
  >
    <input
      :id="id"
      :name="name"
      type="radio"
      :value="value"
      v-on="modelHandlers"
      :disabled="isDisabled"
      v-validate="{ rules: 'required', disabled: checked }"
      :checked="
        modelValue === staticModelValue ||
        modelValue === value ||
        staticModelValue === value
      "
    />
    <label :for="id" class="b-radio-label" :style="labelStyle">
      <span>{{ title }}</span>
      <img v-if="url" :src="url" alt="" />
    </label>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

import { v4 as uuid } from 'uuid';

import { CustomModelWorker } from '../../../workers/custom-model-worker';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
    width: {
      type: String,
      default: '120px',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'getRadioValue'],
  setup(props, { emit }) {
    const {
      modelValue: staticModelValue,
      modelErrorMessage,
      modelHandlers,
    } = CustomModelWorker(props, emit);

    watch(
      () => staticModelValue.value,
      (newVal) => {
        emit('getRadioValue', newVal);
      }
    );

    const labelStyle = computed(() => {
      return {
        width: props.width,
        color: `${props.isDisabled ? '#7F7DB5' : '$--b-main-black-color'}`,
      };
    });

    return {
      staticModelValue,
      modelErrorMessage,
      modelHandlers,
      labelStyle,
      id: ref(uuid()),
    };
  },
};
</script>

<style scoped lang="scss">
// SCSS variables for hex colors
$color-f4f4f4: #f4f4f4;
$color-dfdeed: #dfdeed;

@import '../../../assets/styles/forms.scss';

$color1: $color-f4f4f4;
$color2: $--b-main-green-color;
.b-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: $--b-main-white-color;
  border: 1px solid $color-dfdeed;
  border-radius: 6px;
  margin-right: 12px;
  padding: 6px 12px;

  .b-radio__icon {
    margin-right: 10px;
  }
  input[type='radio'] {
    position: absolute;
    opacity: 0;
    + .b-radio-label {
      display: flex;
      align-items: center;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      justify-content: space-between;
      img {
        margin-right: 4px;
      }
      &::before {
        content: '';
        border-radius: 100%;
        border: 1px solid $--b-main-black-color;
        display: inline-block;
        width: 13px;
        height: 13px;
        position: relative;
        top: 0px;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + .b-radio-label {
        &:before {
          border: 1px solid $color2;
          background-color: $color2;
          box-shadow: inset 0 0 0 3px $color1;
        }
      }
    }
    &:focus {
      + .b-radio-label {
        &:before {
          outline: none;
          border-color: $color2;
        }
      }
    }
    &:disabled {
      + .b-radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px $color1;
          border-color: darken($color1, 25%);
          background: darken($color1, 25%);
        }
      }
    }
    + .b-radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}

.b-radio-selected {
  border: 1px solid $--b-main-green-color;
}
</style>
