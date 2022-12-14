<template>
  <div class="b-scroll-top">
    <div 
      class="b-scroll-top__return-top my-3"
      v-if="elementLength.length && isScrollTopExist"
    >
      <div>{{ $t('scroll_top_component.end-reached') }}</div>
      <button
        class="b-scroll-top__to-first-element"
        @click="$emit('scrollButtonClicked')"
      >
        {{ $t('scroll_top_component.up') }}
        <img src="../assets/img/arrow_up.svg">
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
      type: Number,
      default: 0
    },
    isScrollTopExist: {
      type: Boolean
    }
  },
  emits: ['scrollButtonClicked']
}
</script>

<style lang="scss" scoped>
.b-scroll-top {
  &__return-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__to-first-element {
    display: flex;
    justify-content: space-between;
  }
}
</style>