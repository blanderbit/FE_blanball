<template>
  <div class="b_switch_wrapper">
    <div v-if="!isEditMode" class="b_switch_block"></div>
    <label class="b_switch" :for="id">
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @input="valueChange($event.target.checked)"
      />
      <div :class="['b_switch_slider', 'round', {'disabled': !isEditMode}]"></div>
    </label>
  </div>
</template>

<script>
import { CustomModelWorker } from '@workers/custom-model-worker';

export default {
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    initialValue: {
      type: Boolean,
      default: false,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['getValue'],
  setup(props, { emit }) {
    const { modelValue, modelErrorMessage, modelHandlers } =
      CustomModelWorker(props);

    function valueChange(val) {
      modelHandlers.value.input[0](val);
      modelHandlers.value.input[1](val, false);
      emit('getValue', val);
    }

    return {
      modelValue,
      modelHandlers,
      valueChange,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-a8a8bd: #a8a8bd;
// SCSS variables for hex colors
$color-ccc: #ccc;

.b_switch_wrapper {
  position: relative;
  display: inherit;
}
.b_switch_block {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 34px;
}
.b_switch {
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
}

.b_switch input {
  display: none;
}

.b_switch_slider {
  background-color: $color-ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.b_switch_slider:before {
  background-color: $--b-main-white-color;
  bottom: 2px;
  content: '';
  height: 16px;
  left: 2px;
  position: absolute;
  transition: 0.4s;
  width: 16px;
}

input:checked + .b_switch_slider {
  background-color: $--b-main-green-color;
}

.b_switch_slider.disabled {
  background: #A8A8BD !important;
}

input:checked + .b_switch_slider:before {
  transform: translateX(20px);
}

.b_switch_slider.round {
  border-radius: 34px;
}

.b_switch_slider.round:before {
  border-radius: 50%;
}
</style>
