<template>
  <div 
    class="white-btn"
    :style="{ width: btnWidth }"
  >
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
    }
  },
  computed: {
    btnWidth() {
      return this.width ? this.width + 'px' : '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
.white-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border: 1px solid #148783;
  border-radius: 6px;
  color: #148783;
  margin-right: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}
</style>