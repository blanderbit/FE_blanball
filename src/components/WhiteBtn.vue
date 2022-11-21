<template>
  <div 
    class="b_white-btn" 
    :style="styles" 
    @click="$emit('click-function')"
  >
    <img v-if="icon" :src="icon" alt="" />
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: 32,
    },
    mainColor: {
      type: String,
      default: '#148783',
    },
    fontStyles: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    btnWidth() {
      return this.width ? this.width + 'px' : '100%'
    },
    styles() {
      return {
        ...this.fontStyles,
        width: this.btnWidth,
        color: this.mainColor,
        border: `1px solid ${this.mainColor}`,
        height: this.height + 'px',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.b_white-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
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