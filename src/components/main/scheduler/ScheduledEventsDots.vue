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
      default: 3,
    },
  },
  setup(props) {
    const visibleDotsCount = ref(getVisibleDotsCount());

    watch(
      () => props.dotsCount,
      () => {
        visibleDotsCount.value = getVisibleDotsCount();
      }
    );

    function getVisibleDotsCount() {
      if (props.maxDotsCount && props.dotsCount) {
        return props.dotsCount > props.maxDotsCount
          ? props.maxDotsCount
          : props.dotsCount;
      } else {
        return props.dotsCount;
      }
    }

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
