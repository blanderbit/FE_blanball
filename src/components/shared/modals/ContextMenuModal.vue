<template>
  <div class="b-context-modal__wrapper" @click="closeModal">
    <div class="b-context-modal" :style="contextWindowStyle">
      <ul>
        <li
          @click.stop="item.action ? item.action() : itemClick(item.type)"
          v-for="item in contextMenuItems"
          :key="item.id"
        >
          <img :src="item?.img" alt="" />
          <span class="b-context-modal__text">{{ $t(item.text) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ContextMenu',
  props: {
    clientX: {
      type: Number,
      required: true,
    },
    clientY: {
      type: Number,
      required: true,
    },
    contextMenuItems: {
      type: Array,
      require: true,
    },
  },
  emits: ['close-modal'],
  setup(props, { emit }) {
    const contextWindowStyle = computed(() => {
      return {
        top: props.clientY + 'px',
        left: props.clientX + 'px',
      };
    });

    function itemClick(itemType) {
      emit('itemClick', itemType);
      closeModal();
    }

    function closeModal() {
      emit('close-modal');
    }

    return {
      contextWindowStyle,
      closeModal,
      itemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f0f0f4: #f0f0f4;

.b-context-modal__wrapper {
  @include modal-wrapper(transperent);

  .b-context-modal {
    width: 228px;
    background: $--b-main-white-color;
    position: absolute;
    filter: drop-shadow(2px 2px 10px rgba(56, 56, 251, 0.1));
    border-radius: 6px;

    .b-context-modal__text {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: $--b-main-gray-color;
    }

    ul {
      li {
        padding: 8px 12px;
        list-style: none;
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
        }

        &:hover {
          background: $color-f0f0f4;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
