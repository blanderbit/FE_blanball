<template>
  <div class="b_breadcrumbs">
    <ul v-if="breadcrumbs.i18n">
      <li v-for="(item, idx) in getBreadcrumbsList" :key="item.name">
        <router-link
          :to="idx + 1 === getBreadcrumbsList.length ? '' : item.path"
        >
          {{ item.name }}
        </router-link>
        <img
          v-if="!(idx + 1 === getBreadcrumbsList.length)"
          src="../assets/img/arrow-right.svg"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const { breadcrumbs } = useRouter().currentRoute.value.meta
const getBreadcrumbsList = computed(() => tm(breadcrumbs.i18n))
</script>

<style lang="scss" scoped>
.b_breadcrumbs {
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
