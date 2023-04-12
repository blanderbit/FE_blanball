<template>
  <div class="b-long__radio-button d-flex">
    <radio-button
      :style="{
        width: `${100 / values.length}%`,
      }"
      v-for="(item, index) in values"
      :key="index"
      :name="name"
      :title="item.title"
      :value="item.value"
      :isDisabled="isDisabled"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    ></radio-button>
  </div>
</template>

<script>
import RadioButton from './RadioButton.vue';

export default {
  name: 'LongRadioButtonGroup',
  components: {
    RadioButton,
  },
  props: {
    values: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:modelValue'],
};
</script>

<style scoped lang="scss">
// SCSS variables for hex colors
$color-f0f0f4: #f0f0f4;
$color-efeff6: #efeff6;

.b-long__radio-button {
  background: $--b-main-white-color;
  padding: 6px;
  border: 1px solid $color-f0f0f4;
  border-radius: 6px;

  :deep {
    .b-radio {
      border: none;
      &:last-child {
        margin: 0;
      }
      input + .b-radio-label {
        display: flex;
        justify-content: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        /* identical to box height, or 154% */
        border-radius: 4px;
        width: 100%;
        padding: 4px 0;
        text-align: center;

        /* Black/600 */
      }

      input + .b-radio-label:before {
        display: none;
      }

      input:checked + .b-radio-label {
        background: $color-efeff6;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
        color: $--b-main-black-color;
      }
    }
  }
}
</style>
