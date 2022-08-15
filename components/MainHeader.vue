<template>
  <div class="header">
    <div class="mob-menu-icon">
      <img src="../assets/img/mob-menu-icon.svg" alt="">
    </div>
    <BreadCrumbs />
    <div class="logo">
      <img src="../assets/img/Blanball.png" alt="">
    </div>
    <div class="search-block">
      <img src="../assets/img/search.svg" alt="">
      <input type="text" placeholder="Пошук">
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '../components/Breadcrumbs.vue'

export default {
  components: {
    BreadCrumbs
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
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
    position: relative;
    height: 40px;
    width: 220px;
    min-width: 220px;
    img {
      position: absolute;
      right: 15.5px;
      top: 13.5px;
      z-index: 1;
      cursor: pointer;
    }
    input {
      position: absolute;
      width: 220px;
      min-width: 220px;
      height: 40px;
      border: 1px solid #DFDEED;
      border-radius: 6px;
      outline: none;
      padding-left: 15px;
      padding-right: 40px;
    }
  }
}
</style>