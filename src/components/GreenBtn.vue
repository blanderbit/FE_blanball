<template>
  <div
    class="green-btn"
    :style="btnStyle"
    @click="$emit('click-function')"
  >
    <img v-if="icon" :src="icon" alt="">
    {{ text }}
    <img v-if="iconRight" :src="iconRight" alt="">
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: 32
    },
    icon: {
      type: String,
      default: null
    },
    iconRight: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: '#148783'
    },
    fontStyles: {
      type: Object,
      default: () => {}
    },
    isIconAndTextApart: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnWidth() {
      return this.width ? this.width + 'px' : '100%'
    },
    btnStyle() {
      return {
        ...this.fontStyles,
        width: this.width ? this.width + 'px' : '100%',
        height: this.height + 'px',
        background: this.backgroundColor,
        'justify-content': this.isIconAndTextApart ? 'space-around' : 'center'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.green-btn {
  border-radius: 6px;
  color: #fff;
  height: 32px;
  display: flex;
  align-items: center;
  align-items: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  img {
    margin-right: 8px;
  }
}
</style>