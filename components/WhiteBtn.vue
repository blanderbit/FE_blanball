<template>
  <div class="white-btn">
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
.white-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98px;
  height: 32px;
  border: 1px solid #148783;
  border-radius: 6px;
  color: #148783;
  margin-right: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
}
</style>