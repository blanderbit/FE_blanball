<template>
  <div class="b-clear-filters" @click="$emit('clear')">
    <img src="@images/clear-filter.svg" alt="" />
  </div>
</template>

<script>
export default {
  emits: ['clear'],
  name: 'ClearFilters',
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;

.b-clear-filters {
  width: 32px;
  min-width: 32px;
  height: 32px;
  border: 1px solid $color-dfdeed;
  border-radius: 6px;
  display: flex;
  margin-right: 8px;
  background: #efeff6;
  cursor: pointer;
  img {
    margin: auto;
  }
}
</style>
