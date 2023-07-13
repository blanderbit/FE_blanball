<template>
  <div
    class="context-modal__tooltip-wrapper"
    :style="modalWrapperStyle"
    @click.self="closeModal"
  >
    <div ref="modal" :style="modalStyle" class="context-modal__tooltip">
      <div v-for="item in modalItems">
        <div
          v-if="!item.hide"
          class="context-modal__tooltip-item"
          @click="itemClick(item)"
        >
          <img :src="item.img" alt="" />
          <span class="b-item-text">{{ $t(item.text) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useElementSize } from '@vueuse/core';

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
    backgroundColor: {
      type: String,
      default: null,
    },
  },
  emits: ['closeModal', 'itemClick'],
  setup(props, { emit }) {
    const modal = ref();
    const { width, height } = useElementSize(modal);
    const modalStyle = computed(() => {
      const modalWidth = width.value;
      const modalHeight = height.value;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let top = props.clientY;
      let left = props.clientX;

      // Check if modal is going out of screen on the right side
      if (left + modalWidth > screenWidth) {
        left = screenWidth - modalWidth;
      }

      // Check if modal is going out of screen on the bottom
      if (top + modalHeight > screenHeight) {
        top = screenHeight - modalHeight;
      }

      return {
        top: top + 'px',
        left: left + 'px',
      };
    });

    const modalWrapperStyle = computed(() => {
      if (props.backgroundColor) {
        return {
          background: props.backgroundColor,
        };
      }
    });

    function closeModal() {
      emit('closeModal');
    }

    function itemClick(item) {
      emit('itemClick', item.type, item);
      closeModal();
    }

    return {
      modalStyle,
      modal,
      modalWrapperStyle,
      closeModal,
      itemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f0f0f4: #f0f0f4;

.context-modal__tooltip-wrapper {
  @include modal-wrapper;

  .context-modal__tooltip {
    background: $--b-main-white-color;
    width: fit-content;
    min-width: 180px;
    position: absolute;
    border-radius: 6px;
    width: max-content;

    .context-modal__tooltip-item {
      display: flex;
      align-items: center;
      gap: 8px 8px;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 6px;

      &:hover {
        background: $color-f0f0f4;

        .b-item-text {
          color: $--b-main-black-color;
        }
      }

      .b-item-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: $--b-main-gray-color;
        z-index: 999;
      }
    }
  }
}
</style>
