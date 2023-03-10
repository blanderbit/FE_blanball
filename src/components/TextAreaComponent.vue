<template>
  <div class="b-text-area__component">
    <div class="b-text-area__wrapper" :style="inputWrapper">
      <div v-if="title" class="b-text-area__outer-title">
        <span>{{ title }}</span>
      </div>
      <div v-if="maxTextValue" class="b-text-area__min-max-label">
        {{ modelValue ? modelValue.length : 0 }} / {{ maxTextValue }}
      </div>
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        v-on="modelHandlers"
      >
      </textarea>
      <label v-if="textareaIcon">
        <input multiple="multiple" type="file" @change="onFileSelected" />
        <img
          v-if="textareaIcon"
          class="b-text-area__icon"
          :src="textareaIcon"
          alt="icon"
        />
      </label>
    </div>
    <p class="b-text-area__error-message">{{ modelErrorMessage ? $t(modelErrorMessage) : '' }}</p>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import { CustomModelWorker } from '../workers/custom-model-worker'

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
    modelValue: Object | String,
    placeholder: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: null,
    },
    textareaIcon: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    maxTextValue: {
      type: Number,
    },
  },
  emits: ['icon-click'],
  setup(props, { emit }) {
    const { modelValue, modelErrorMessage, modelHandlers } =
      CustomModelWorker(props)
    const toast = useToast()
    const { t } = useI18n()

    const IMAGE_TYPES = ['image/jpeg', 'image/png']

    function onFileSelected(e) {

      for (let file of e.target.files) {
        if (!IMAGE_TYPES.includes(file.type)) {
          toast.error(t('notifications.file-bad-format', {name: file.name}))
        } else if (file.size > 1000000) {
          toast.error(t('notifications.file-max-size', {name: file.name}))
        } else {
          emit('icon-click', file)
        }
      }
    }
    const inputWrapper = computed(() => {
      return {
        height: props.height ? props.height + 'px' : '100%',
      }
    })

    return {
      modelValue,
      modelErrorMessage,
      modelHandlers,
      inputWrapper,
      onFileSelected,
    }
  },
}
</script>

<style lang="scss" scoped>


// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;
 $color-f9f9fc: #f9f9fc;
 $color-e2e2e9: #e2e2e9;


.b-text-area__component {
  height: 100%;
  .b-text-area__wrapper {
    border: 1px solid $color-dfdeed;
    position: relative;
    border-radius: 6px;
    width: 100%;
    .b-text-area__min-max-label {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: $--b-main-gray-color;
      padding: 0px 2px;
      position: absolute;
      right: 8px;
      bottom: -8px;
      background: $color-f9f9fc;
      border: 1px solid $color-e2e2e9;
      border-radius: 4px;
    }
    .b-text-area__icon {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    .b-text-area__outer-title {
      padding: 0px 4px;
      position: absolute;
      left: 8px;
      top: -8px;
      background: $--b-main-white-color;
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
    color: $--b-error-color;
  }
}
input[type='file'] {
  display: none;
}
</style>
