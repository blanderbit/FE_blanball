<template>
  <div class="b-text-area__component">
    <div class="b-text-area__wrapper" :style="inputWrapper">
      <div v-if="title" class="b-text-area__outer-title">
        <span>{{ title }}</span>
      </div>
      <textarea
        :placeholder="placeholder"
        :value="value"
        :disabled="isDisabled"
      >
      </textarea>
    </div>
    <p class="b-text-area__error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
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
  },
  setup() {
    return {}
  },
  computed: {
    inputWrapper() {
      return {
        height: this.height ? this.height + 'px' : '100%',
      }
    },
  },
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