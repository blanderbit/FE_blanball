<template>
  <div class="bread-crumbs">
    <ul>
      <li
        v-for="(item, idx) of breadcrumbs"
        :key="item.name"
      >
        <nuxt-link :to="idx + 1 === breadcrumbs.length ? '' : item.to">
          {{ item.name }}
        </nuxt-link>
        <img v-if="!(idx + 1 === breadcrumbs.length)" src="../assets/img/arrow-right.svg" alt="">
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const { breadcrumbs } = useRouter().currentRoute.value.meta;
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