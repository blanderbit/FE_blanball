<template>
  <div class="b-text-area__component">
    <div class="b-text-area__wrapper" :style="inputWrapper">
      <div v-if="title" class="b-text-area__outer-title">
        <span>{{ title }}</span>
      </div>
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        v-on="modelHandlers"
      >
      </textarea>
    </div>
    <p class="b-text-area__error-message">{{ modelErrorMessage }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { CustomModelWorker } from "../workers/custom-model-worker"

export default {
  name: 'InputComponent',
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: 'aggressive',
    }
  },
  setup(props) {
    const {
        modelValue,
        modelErrorMessage,
        modelHandlers
    } = CustomModelWorker(props)

    const inputWrapper = computed(() => {
      return {
        height: props.height ? props.height + 'px' : '100%',
      }
    })

    return {
      modelValue,
      modelErrorMessage,
      modelHandlers,
      inputWrapper
    }
  }
}
</script>

<style lang="scss" scoped>
.b-text-area__component {
  height: 100%;
  .b-text-area__wrapper {
    border: 1px solid #dfdeed;
    position: relative;
    border-radius: 6px;
    width: 100%;
    .b-text-area__outer-title {
      padding: 0px 4px;
      position: absolute;
      left: 8px;
      top: -8px;
      background: #ffffff;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      border-radius: 6px;
      padding: 8px 12px;
      resize: none;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
    }
  }
  .b-text-area__error-message {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #f32929;
  }
}
</style>