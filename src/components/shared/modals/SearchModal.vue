<template>
  <div class="b-search-modal" @click.self="$emit('closeModal')">
    <div class="b-search-modal__window-frame" :style="frameStyle">
      <slot name="frame-data"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchModal',
  props: {
    clientX: {
      type: Number,
      default: 0,
    },
    clientY: {
      type: Number,
      default: 0,
    },
  },
  emits: ['closeModal'],
  setup(props) {
    const frameStyle = computed(() => {
      return {
        left: `${props.clientX}px`,
        top: `${props.clientY}px`,
      };
    });

    return {
      frameStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-search-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  width: 100%;
  height: 100%;

  @media (max-width: 992px) {
    top: 40px;
  }

  &__window-frame {
    position: absolute;
    width: inherit;
  }
}
</style>
