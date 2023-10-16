<template>
  <div class="b_breadcrumbs">
    <ul>
      <li v-for="(item, idx) in getBreadcrumbsList" :key="item.name">
        <router-link
          :to="idx + 1 === getBreadcrumbsList.length ? '' : item.path"
          :class="{ 'b-current-route': idx + 1 === getBreadcrumbsList.length }"
        >
          {{ item.name }}
        </router-link>
        <img
          v-if="!(idx + 1 === getBreadcrumbsList.length)"
          src="@images/arrow-right.svg"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  setup() {
    const { tm } = useI18n();
    const route = useRoute();
    const getBreadcrumbsList = computed(() => tm(route.meta.breadcrumbs.i18n));

    return {
      getBreadcrumbsList,
    };
  },
};
</script>

<style lang="scss" scoped>
.b_breadcrumbs {
  ul {
    display: flex;
    li {
      list-style: none;
      a {
        @include inter(12px, 400, $--b-main-gray-color);
        text-decoration: none;

        &.b-current-route {
          @include inter(12px, 400);
        }
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
