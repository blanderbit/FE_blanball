<template>
  <div class="b_header">
    <div 
      class="b_header_mob-menu-icon"
      @click="$emit('menuIconClick')"
    >
      <img src="../assets/img/mob-menu-icon.svg" alt="">
    </div>
    <BreadCrumbs />
    <div class="b_header_logo">
      <img src="../assets/img/logo-header.svg" alt="">
    </div>
    <div class="b_header_search-block">
      <div class="b_header_search-input">
        <InputComponent 
          :title-width="0"
          :placeholder="$t('header.search-events')"
          :has-icon="true"
          :icon="[
            searchIcon
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from './Breadcrumbs.vue'
import InputComponent from './forms/InputComponent.vue'
import search from '../assets/img/search.svg'

export default {
  components: {
    BreadCrumbs,
    InputComponent
  },
  computed: {
    searchIcon() {
      return search
    }
  }
}
</script>

<style lang="scss" scoped>
.b_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  .b_header_mob-menu-icon {
    display: none;
    @media (max-width: 992px) {
      display: block;
    }
  }
  .b_header_logo {
    display: none;
    @media (min-width: 576px) and (max-width: 992px) {
      display: block;
    }
  }
  .b_header_search-block {
    .b_header_search-input {
      width: 220px;
      height: 40px;
    }
  }
}
</style>