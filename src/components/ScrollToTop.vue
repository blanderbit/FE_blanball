<template>
  <div class="b-scroll-top">
    <div
      class="b-scroll-top__return-top"
      v-if="elementLength.length && isScrollTopExist"
    >
      <div class="b-scroll-top__scroll-text">
        {{ $t('scroll_top_component.end-reached') }}
      </div>
      <button
        class="b-scroll-top__to-first-element"
        @click="$emit('scrollButtonClicked')"
      >
        {{ $t('scroll_top_component.up') }}
        <img src="../assets/img/arrow-up.svg" />
      </button>
    </div>
    <div v-if="!isScrollTopExist"></div>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: {
    elementLength: {
      type: Array,
      default: () => [],
    },
    isScrollTopExist: {
      type: Boolean,
    },
  },
  emits: ['scrollButtonClicked'],
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-efeff6: #efeff6;

.b-scroll-top {
  &__return-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px;
  }
  &__scroll-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: $--b-main-gray-color;
  }
  &__to-first-element {
    display: flex;
    justify-content: space-between;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: $--b-main-gray-color;
    padding: 2px 12px;
    background: $color-efeff6;
    border-radius: 6px;
    border: none;
    align-items: center;
    cursor: pointer;
    img {
      margin-left: 12px;
    }
  }
}
</style>
