<template>
  <div class="header">
    <div class="mob-menu-icon">
      <img src="../assets/img/mob-menu-icon.svg" alt="">
    </div>
    <BreadCrumbs />
    <div class="logo">
      <img src="../assets/img/logo-header.svg" alt="">
    </div>
    <div class="search-block">
      <div class="search-input">
        <InputComponent 
          :title-width="0"
          :placeholder="'Пошук серед подій'"
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
import InputComponent from './InputComponent.vue'
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  .mob-menu-icon {
    display: none;
    @media (max-width: 992px) {
      display: block;
    }
  }
  .logo {
    display: none;
    @media (min-width: 576px) and (max-width: 992px) {
      display: block;
    }
  }
  .search-block {
    .search-input {
      width: 220px;
      height: 40px;
    }
  }
}
</style>