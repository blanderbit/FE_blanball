<template>
  <div 
    class="green-btn"
    :style="btnStyle"
  >
    <img v-if="icon" :src="icon" alt="">
    {{ text }}
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
    }
  },
  computed: {
    btnWidth() {
      return this.width ? this.width + 'px' : '100%'
    },
    btnStyle() {
      return {
        width: this.width ? this.width + 'px' : '100%',
        height: this.height + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.green-btn {
  background: #148783;
  border-radius: 6px;
  color: #fff;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
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