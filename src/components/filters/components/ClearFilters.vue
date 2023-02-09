<template>
  <div class="b-clear-filters" @click="$emit('clear')">
    <img src="../../../assets/img/clear-filter.svg" alt="" />
  </div>
</template>

<script>
export default {
  emits: ['clear'],
  name: 'ClearFilters',
}
</script>

<style scoped lang="scss">
.b-clear-filters {
  width: 32px;
  min-width: 32px;
  height: 32px;
  border: 1px solid #dfdeed;
  border-radius: 6px;
  display: flex;
  margin-right: 8px;
  cursor: pointer;
  img {
    margin: auto;
  }
}
</style>
