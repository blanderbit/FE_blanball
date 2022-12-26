<template>
  <div class="b-radio" :class="{'b-form-error': modelErrorMessage}">
    <input
        :id="id"
        :name="name"
        type="radio"
        :value="value"
        v-on="modelHandlers"
        :checked="modelValue === staticModelValue || modelValue === value"
    >
    <label :for="id" class="b-radio-label">
      {{title}}
      <img v-if="url" :src="url" alt="">
    </label>
  </div>
</template>

<script>
  import { CustomModelWorker } from "../../workers/custom-model-worker";
  import { v4 as uuid } from "uuid";
  import { ref } from "vue";
  export default {
    name: "RadioButton",
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
        required: true
      },
    },
    emits: ['update:modelValue'],
    setup(props, {emit}) {
      const {
        modelValue: staticModelValue,
        modelErrorMessage,
        modelHandlers
      } = CustomModelWorker(props, emit);

      return {
        staticModelValue,
        modelErrorMessage,
        modelHandlers,
        id: ref(uuid())
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "forms.scss";
  $color1: #f4f4f4;
  $color2: #148783;
  .b-radio {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #FFFFFF;
    border: 1px solid #DFDEED;
    border-radius: 6px;
    margin-right: 12px;
    input[type="radio"] {
      position: absolute;
      opacity: 0;
      + .b-radio-label {
        padding: 6px 12px;
        display: flex;
        align-items: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;
        text-transform: capitalize;
        color: #262541;
        justify-content: space-between;
        width: 120px;
        img {
          margin-right: 4px;
        }
        &::before {
          content: '';
          border-radius: 100%;
          border: 1px solid #262541;
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
</style>