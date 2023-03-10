<template>
  <div class="b-event-join__tooltip-wrapper" @click.self="$emit('closeModal')">
    <div :style="modalStyle" class="b-event-join__tooltip">
      <div
        v-for="item in modalItems"
        class="b-event-join__tooltip-item"
        @click="$emit('itemClick', item.type)"
      >
        <img :src="item.img" alt="" />
        <span class="b-item-text">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    clientX: {
      type: Number,
      default: null,
      require: true,
    },
    clientY: {
      type: Number,
      default: null,
      require: true,
    },
    modalItems: {
      type: Array,
      dafault: () => [],
      require: true,
    },
  },
  setup(props) {
    const modalStyle = computed(() => {
      return {
        top: props.clientY - 50 + 'px',
        left: props.clientX + 'px',
      };
    });

    return {
      modalStyle,
    };
  },
};
</script>

<style lang="scss" scoped>


// SCSS variables for hex colors
$color-f0f0f4: #f0f0f4;

.b-event-join__tooltip-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 37, 65, 0.2);
  z-index: 999;

  .b-event-join__tooltip {
    background: $--b-main-white-color;
    width: 180px;
    position: absolute;
    border-radius: 6px;

    .b-event-join__tooltip-item {
      display: flex;
      align-items: center;
      gap: 8px 8px;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 6px;

      &:hover {
        background: $color-f0f0f4;
      }

      .b-item-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: $--b-main-black-color;
        z-index: 999;
      }
    }
  }
}
</style>
