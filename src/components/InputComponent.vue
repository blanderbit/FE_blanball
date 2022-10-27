<template>
  <div class="b-input__input-component">
    <div 
      class="b-input__wrapper" 
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
        v-if="hasIcon" 
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
      <input
        :type="inputType"
        :placeholder="placeholder"
        v-on="handlers"
        :value="value"
        :style="inputStyle"
        :disabled="isDisabled"
      />
    </div>
    <p class="b-input__error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
import { computed, toRef } from 'vue'
import { modes } from './__tests__/interactionModes'

// TODO vue 3 fully, validate message
export default {
  name: 'InputComponent',
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Array,
      default: () => [],
    },
    iconLeft: {
      type: String,
      default: '',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    insideTitle: {
      type: Boolean,
      default: false,
    },
    outsideTitle: {
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
    titleWidth: {
      type: Number,
      default: 108,
    },
    type: {
      type: Array,
      default: () => ['text'],
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
  setup(props) {
    const { meta, value, errorMessage, handleChange, handleBlur } = useField(
      toRef(props, 'name'),
      null,
      {
        validateOnValueUpdate: false,
      }
    )
    const handlers = computed(() => {
      const on = {
        blur: handleBlur,
        // default input event to sync the value
        // the `false` here prevents validation
        input: [(e) => handleChange(e, false)],
      }

      // Get list of validation events based on the current mode
      const triggers = modes[props.mode]({
        errorMessage,
        meta,
      })

      // add them to the "on" handlers object
      triggers.forEach((t) => {
        if (Array.isArray(on[t])) {
          on[t].push(handleChange)
        } else {
          on[t] = handleChange
        }
      })

      return on
    })

    return {
      handlers,
      errorMessage,
      value,
    }
  },
  data() {
    return {
      mainValue: '',
      iconCount: 0,
      inputType: null,
    }
  },
  computed: {
    inputStyle() {
      return {
        'padding-left': 10 + this.titleWidth + 'px',
        'padding-right': this.hasIcon ? '52px' : '10px',
      }
    },
    inputWrapper() {
      return {
        height: this.height ? this.height + 'px' : '100%',
      }
    },
    rightIcon() {
      return this.icon[this.iconCount]
    },
  },
  watch: {
    mainValue(newVal, oldVal) {
      this.$emit('new-value', newVal)
    },
  },
  methods: {
    iconClickAction() {
      if (this.type[0] === 'password') {
        this.iconCount = this.iconCount === 0 ? 1 : 0
        this.inputType = this.inputType === 'password' ? 'text' : 'password'
      } else {
        this.$emit('icon-click')
      }
    },
  },
  mounted() {
    this.inputType = this.type[0]
  },
}
</script>

<style lang="scss" scoped>
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
    input {
      width: 100%;
      height: 100%;
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