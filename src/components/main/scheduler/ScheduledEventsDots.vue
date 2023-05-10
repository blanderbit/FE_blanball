<template>
  <div class="c-schdeduled-events__dots">
    <div
      v-for="dot in visibleDotsCount"
      class="c-schdeduled-events__dot"
      :key="dot.id"
      :style="`background: ${dotsColor}`"
    ></div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    dotsCount: {
      type: Number,
      required: true,
    },
    dotsColor: {
      type: String,
      default: '#148783',
    },
    maxDotsCount: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const visibleDotsCount = ref(
      props.maxDotsCount && props.dotsCount
        ? props.maxDotsCount
        : props.dotsCount
    );

    return {
      visibleDotsCount,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-schdeduled-events__dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .c-schdeduled-events__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}
</style>
