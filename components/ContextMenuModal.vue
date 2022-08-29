<template>
  <div 
    class="context-modal-wrapper"
    @click="wrapperClick"
  >
    <div 
      class="context-modal"
      :style="contextWindowStyle"
    >
      <ul>
        <li 
          v-for="item in menuText"
          :key="item.id"
        >
          <img :src="item.img" alt="">
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    clientX: {
      type: Number,
      default: null,
      require: true
    },
    clientY: {
      type: Number,
      default: null,
      require: true
    },
    menuText: {
      type: Array,
      dafault: () => [],
      require: true
    }
  },
  computed: {
    contextWindowStyle() {
      return {
        top: this.clientY + 'px',
        left: this.clientX + 'px'
      }
    }
  },
  methods: {
    wrapperClick() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.context-modal-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .context-modal {
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
          background: #E3FBFA;
        }
      }
    }
  }
}
</style>