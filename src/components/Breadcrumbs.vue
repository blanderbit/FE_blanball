<template>
  <div class="bread-crumbs">
    <ul>
      <li
        v-for="(item, idx) in breadcrumbs"
        :key="item.name"
      >
        <router-link :to="idx + 1 === breadcrumbs.length ? '' : item.path">
          {{ item.name }}
        </router-link>
        <img v-if="!(idx + 1 === breadcrumbs.length)" src="../assets/img/arrow-right.svg" alt="">
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const { breadcrumbs } = useRouter().currentRoute.value.meta;

console.log(breadcrumbs)
</script>

<style lang="scss" scoped>
.bread-crumbs {
  ul {
    display: flex;
    li {
      list-style: none;
      a {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        text-decoration: none;
        color: #262541;
      }
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
</style>