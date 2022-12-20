<template>
  <div class="b-button-details__filters"
       :class="{
           'b-button-details__filters': active
       }"
       @click="$emit('update:active', !active)">
    <img
        class="b-main-search__set-filter"
        src="../../../assets/img/cross.svg"
        alt=""
    />
  </div>
</template>

<script>

  export default {
    name: "ButtonDetailsFilters",
    emits: [
      'update:active'
    ],
    props: {
      active: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style scoped lang="scss">
  .b-button-details__filters {
    width: 32px;
    min-width: 32px;
    height: 32px;
    background: #EFEFF6;
    border-radius: 6px;
    display: flex;
    margin-right: 8px;
    cursor: pointer;
    img {
      margin: auto;
    }
  }
</style>