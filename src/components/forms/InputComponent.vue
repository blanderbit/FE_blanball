<template>
  <div class="b-input__input-component">
    <div 
      class="b-input__wrapper"
      :class="{'b-form-error': modelErrorMessage}"
      :style="inputWrapper"
    >
      <div 
        v-if="outsideTitle" 
        class="b-input__outer-title"
      >
        <span>{{ title }}</span>
      </div>
      <div
        v-if="insideTitle"
        class="b-input__inner-title"
        :style="{ width: titleWidth + 'px' }"
      >
        <span>{{ title }}</span>
      </div>
      <div 
        v-if="rightIcon.length" 
        class="b-input__icon" 
        @click="iconClickAction"
      >
        <img :src="rightIcon" alt="" />
      </div>
      <div 
        v-if="iconLeft.length" 
        class="b-input__icon-left"
      >
        <img :src="iconLeft" alt="" />
      </div>
      <slot 
        name="input" 
        :type="inputType"
        :placeholder="placeholder"
        :on="modelHandlers"
        :value="modelValue"
        :style="inputStyle"
        :disabled="isDisabled"
      >
        <input
          :type="inputType"
          :placeholder="placeholder"
          v-on="modelHandlers"
          :value="modelValue"
          :style="inputStyle"
          :disabled="isDisabled"
          @click="$emit('onClickAction', $event)"
        />
      </slot>
    </div>
    <p class="b-input__error-message">{{ modelErrorMessage }}</p>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { CustomModelWorker } from "../../workers/custom-model-worker/index";

import eyeCross from '../../assets/img/eye-crossed.svg'
import eyeOpen from '../../assets/img/eye-opened.svg'

const PASSWORD_TYPES = {
  PASSWORD: 'password',
  TEXT: 'text'
}

// TODO vue 3 fully, validate message
export default {
  name: 'InputComponent',
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconLeft: {
      type: String,
      default: '',
    },
    insideTitle: {
      type: Boolean,
      default: false,
    },
    outsideTitle: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    titleWidth: {
      type: Number,
      default: 108,
    },
    type: {
      type: String,
      default: 'text',
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
    },
  },
  emits: ['iconClick', 'onClickAction'],
  setup(props, {emit}) {
    const {
        modelValue,
        modelErrorMessage,
        modelHandlers
    } = CustomModelWorker(props);

    const inputType = ref(null)
    const rightIcon = ref('')

    const inputStyle = computed(() => {
      return {
        'padding-left': 10 + props.titleWidth + 'px',
        'padding-right': rightIcon.value.length ? '52px' : '10px',
      }
    })
    const inputWrapper = computed(() => {
      return {
        height: props.height ? props.height + 2 + 'px' : '100%',
      }
    })

    function iconClickAction() {
      if (props.type === PASSWORD_TYPES.PASSWORD) {
        if (inputType.value === PASSWORD_TYPES.PASSWORD) {
          rightIcon.value = eyeOpen
          inputType.value = PASSWORD_TYPES.TEXT
        } else {
          rightIcon.value = eyeCross
          inputType.value = PASSWORD_TYPES.PASSWORD
        }
      } else {
        emit('icon-click')
      }
    }

    onMounted(() => {
      if (props.type === PASSWORD_TYPES.PASSWORD) {
        rightIcon.value = eyeCross;
        inputType.value = props.type
      } else {
        rightIcon.value = props.icon
      }
    });

    return {
      iconClickAction,
      modelValue,
      modelErrorMessage,
      modelHandlers,
      inputType,
      rightIcon,
      inputStyle,
      inputWrapper
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "forms.scss";
.b-input__input-component {
  height: 100%;
  .b-input__wrapper {
    border: 1px solid #dfdeed;
    position: relative;
    border-radius: 6px;
    width: 100%;
    .b-input__icon {
      display: flex;
      height: 100%;
      width: 48px;
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
      border-radius: 6px;
      img {
        margin: auto;
      }
    }
    .b-input__icon-left {
      display: flex;
      height: 100%;
      width: 40px;
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      border-radius: 6px;
      img {
        margin: auto;
      }
    }
    .b-input__outer-title {
      padding: 0px 4px;
      position: absolute;
      left: 8px;
      top: -8px;
      background: #ffffff;
      color: #575775;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
    .b-input__inner-title {
      display: table;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #575775;
      background: #fff;
      border-radius: 6px;
      span {
        display: table-cell;
        text-align: left;
        vertical-align: middle;
        border-right: 1px solid #dfdeed;
        padding-left: 12px;
      }
    }
    ::v-deep input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 6px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type='number'] {
        -moz-appearance: textfield;
      }
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
}
</style>