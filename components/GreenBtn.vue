<template>
  <div class="green-btn">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.green-btn {
  background: #148783;
  border-radius: 6px;
  color: #fff;
  width: 89px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
}
</style>