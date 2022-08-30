<template>
  <div 
    class="white-btn"
    :style="styles"
  >
    <img v-if="icon" :src="icon" alt=""></img>
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
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
    mainColor: {
      type: String,
      default: '#148783'
    },
    fontStyles: {
      type: Object,
      default: () => {}
    }
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
        height: this.height + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.white-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-right: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  img {
    margin-right: 8px;
  }
}
</style>