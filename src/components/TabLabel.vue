<template>
  <div :class="['b-tab-label__label', `b-tab-label__label-${position}`]">
    <div
      :class="[
        'b-tab-label__label-corner',
        `b-tab-label__label-corner-${position}`,
      ]"
    ></div>
    <div class="b-tab-label__label-title">
      {{ title }}
    </div>
    <div class="b-tab-label__label-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabLabel',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right', 'top', 'bottom'].includes(v),
    },
  },
};
</script>

<style lang="scss" scoped>

// SCSS variables for hex colors
$color-efefef: #efefef;

.b-tab-label {
  &__label {
    display: block;
    position: absolute;
    width: 152px;
    height: 56px;
    background: $--b-main-black-color;
    box-shadow: 3px 6px 15px rgba(8, 27, 130, 0.1);
    border-radius: 6px;
    padding: 4px 6px;
    z-index: 1;

    &-right {
      left: calc(100% + 10px);
      top: 50%;
    }
    &-bottom {
      top: calc(100% + 10px);
    }
    &-left {
      right: calc(100% + 10px);
    }
    &-top {
      bottom: calc(100% + 10px);
    }
  }
  &__label-corner {
    width: 0;
    height: 0;
    position: absolute;
    &-right {
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid $--b-main-black-color;
      left: -8px;
      top: 0px;
    }
    &-bottom {
      right: 50%;
      top: 0;
      border-bottom: 10px solid transparent;
      border-right: 20px solid $--b-main-black-color;
      transform: rotate(-45deg);
    }
    &-left {
      right: 0px;
      top: 50%;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid $--b-main-black-color;
    }
    &-top {
      right: 50%;
      bottom: 0;
      border-top: 10px solid transparent;
      border-left: 20px solid $--b-main-black-color;
      transform: rotate(-45deg);
    }
  }
  &__label-title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: $--b-main-white-color;
  }
  &__label-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 449;
    font-size: 12px;
    line-height: 16px;
    color: $color-efefef;
  }
}
</style>
