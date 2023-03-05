<template>
  <div class="b-filters__wrapper">
    <div class="b-filters__background"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FilterBlock',
}
</script>

<style scoped lang="scss">

// SCSS variables for hex colors
 $color-f9f9fc: #f9f9fc;


.b-filters {
  &__wrapper {
    position: relative;
  }

  &__background {
    background: $color-f9f9fc;
    position: absolute;
    border-radius: 8px;
    top: -20px;
    padding: 20px 16px;
    left: -16px;
    width: calc(100% + 16px + 16px);
    height: 200px;
    @media (max-width: 992px) {
      display: none;
    }
  }
}
</style>
