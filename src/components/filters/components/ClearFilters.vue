<template>
  <div class="b-clear-filters" @click="$emit('clear')">
    <img src="../../../assets/img/clear-filter.svg" alt="" />
  </div>
</template>

<script>
  export default {
    emits: [
      'clear'
    ],
    name: "ClearFilters",
  }
</script>

<style scoped lang="scss">
  .b-clear-filters {
    width: 36px;
    min-width: 36px;
    height: 36px;
    border: 1px solid #DFDEED;
    border-radius: 6px;
    display: flex;
    margin-right: 8px;
    cursor: pointer;
    img {
      margin: auto;
    }
  }
</style>