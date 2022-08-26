<template>
  <div class="header">
    <div class="mob-menu-icon">
      <img src="../assets/img/mob-menu-icon.svg" alt="">
    </div>
    <BreadCrumbs />
    <div class="logo">
      <img src="../assets/img/Logo.png" alt="">
    </div>
    <div class="search-block">
      <div class="search-input">
        <InputComponent 
          :title-width="0"
          :placeholder="'Пошук серед подій'"
          :has-icon="true"
          :icon="[
            require('../assets/img/search.svg')
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '../components/Breadcrumbs.vue'
import InputComponent from '../components/InputComponent.vue'

export default {
  components: {
    BreadCrumbs,
    InputComponent
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