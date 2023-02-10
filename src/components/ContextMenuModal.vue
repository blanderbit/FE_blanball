<template>
  <div class="b-context-modal__wrapper" @click="wrapperClick">
    <div class="b-context-modal" :style="contextWindowStyle">
      <ul>
        <li v-for="item in menuText" :key="item.id">
          <img :src="item.img" alt="" />
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

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
        top: props.clientY + 'px',
        left: props.clientX + 'px',
      }
    })
    function wrapperClick() {
      context.emit('close-modal')
    }

    return {
      contextWindowStyle,
      wrapperClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-context-modal__wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .b-context-modal {
    width: 228px;
    background: #fff;
    position: absolute;
    filter: drop-shadow(2px 2px 10px rgba(56, 56, 251, 0.1));
    border-radius: 6px;
    ul {
      li {
        padding: 10.8px 12.8px;
        list-style: none;
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
        }
        &:hover {
          background: #e3fbfa;
        }
      }
    }
  }
}
</style>
