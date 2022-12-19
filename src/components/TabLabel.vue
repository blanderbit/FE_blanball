<template>
  <div class="b-tab-label__label">
    <div class="b-tab-label__label-corner"></div>
    <div class="b-tab-label__label-title">
      {{ title }}
    </div>
    <div class="b-tab-label__label-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabLabel',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.b-tab-label { 
  &__label {
    display: block;
    position: absolute;
    top: 0;
    right: -164px;
    width: 152px;
    height: 56px;
    background: #262541;
    box-shadow: 3px 6px 15px rgba(8, 27, 130, 0.1);
    border-radius: 6px;
    padding: 4px 6px;
    z-index: 1;
  }
  &__label-corner { 
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent; 
    border-right: 10px solid #262541;
    position: absolute;
    left: -8px;
    top: 2px;
  }
  &__label-title { 
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #FFFFFF;
  }
  &__label-text { 
    font-family: 'Inter';
    font-style: normal;
    font-weight: 449;
    font-size: 12px;
    line-height: 16px;
    color: #EFEFEF;
  }
}
</style>