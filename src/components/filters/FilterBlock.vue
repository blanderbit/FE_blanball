<template>
  <div class="b-filters__wrapper">
    <div class="b-filters__background"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "FilterBlock"
  }
</script>

<style scoped lang="scss">
  .b-filters {
    &__wrapper {
      position: relative;
    }

    &__background {
      background: #F9F9FC;
      position: absolute;
      border-radius: 8px;
      top: -20px;
      padding: 20px 16px;
      left: -16px;
      width: calc(100% + 16px + 16px);
      height: 200px;
    }
  }
</style>