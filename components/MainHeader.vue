<template>
  <div class="header">
    <div class="mob-menu-icon">
      <img src="../assets/img/mob-menu-icon.svg" alt="">
    </div>
    <div class="bread-crumbs">
      <ul>
        <li
          v-for="(item, idx) of breadCrumbs"
          :key="item.name"
        >
          {{ item.name }}
          <img v-if="!(idx + 1 === breadCrumbsLength)" src="../assets/img/arrow-right.svg" alt="">
        </li>
      </ul>
    </div>
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
import { computed } from 'vue'

export default {
  setup() {
    const breadCrumbsLength = computed(() => breadCrumbs.length)
    const breadCrumbs = [
      { name: 'Головна' },
      { name: 'Профіль' },
      { name: 'Особистий кабінет' }
    ]
    return {
      breadCrumbs,
      breadCrumbsLength
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
  .bread-crumbs {
    ul {
      display: flex;
      li {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        list-style: none;
        img {
          margin-left: 13.5px;
          margin-right: 13.5px;
        }
      }
    }
    @media (max-width: 992px) {
      display: none;
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