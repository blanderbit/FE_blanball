<template>
  <div class="b-context-modal__wrapper" @click="wrapperClick">
    <div class="b-context-modal" :style="contextWindowStyle">
      <ul>
        <li
          @click.stop="itemClick(item.type)"
          v-for="item in menuText"
          :key="item.id"
        >
          <img :src="item.img" alt="" />
          <span class="b-context-modal__text">{{ item.text }}</span>
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
      default: null,
      require: true,
    },
    clientY: {
      type: Number,
      default: null,
      require: true,
    },
    menuText: {
      type: Array,
      dafault: () => [],
      require: true,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const contextWindowStyle = computed(() => {
      return {
        top: props.clientY - 200 + 'px',
        left: props.clientX - 200 + 'px',
      };
    });

    function itemClick(itemType) {
      context.emit('itemClick', itemType);
      context.emit('close-modal');
    }

    function wrapperClick() {
      context.emit('close-modal');
    }

    return {
      contextWindowStyle,
      wrapperClick,
      itemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f0f0f4: #f0f0f4;

.b-context-modal__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;

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
        }
      }
    }
  }
}
</style>
