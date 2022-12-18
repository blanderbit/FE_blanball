<template>
  <div class="b_header">
    <SearchModal
      v-if="isSearchBlock"
      :client-x="clientX"
      :client-y="clientY"
      @close-modal="closeSearchBlock"
    >
      <template #frame-data>
        <SearchBlockAll 
          :width="modalSearchWidth"
          :tags="mockData.tags"
          :filtered-teams="mockData.teams"
          :list-item-icon="icons.arrow"
        />
      </template>
    </SearchModal>
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
          :icon="icons.search"
          @on-click-action="showSearchBlock"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import BreadCrumbs from './Breadcrumbs.vue'
import InputComponent from './forms/InputComponent.vue'
import SearchModal from './SearchModal.vue'
import SearchBlockAll from './SearchBlockAll.vue'

import searchIcon from '../assets/img/search.svg'
import arrowIcon from '../assets/img/arrow-long-right.svg'

import CONSTANTS from '../consts/index'

export default {
  components: {
    BreadCrumbs,
    InputComponent,
    SearchModal,
    SearchBlockAll
  },
  setup() {
    const isSearchBlock = ref(false)
    const clientX = ref(0)
    const clientY = ref(0)
    const modalSearchWidth = ref(369)
    const icons = computed(() => {
      return {
        search: searchIcon,
        arrow: arrowIcon
      }
    })

    const mockData = computed(() => {
      return {
        tags: CONSTANTS.manage_event.tags,
        teams: CONSTANTS.manage_event.teams
      }
    })

    function showSearchBlock(e) {
      isSearchBlock.value = true
      console.log(e)
      const inputWidth = modalSearchWidth.value - e.target.parentNode.clientWidth
      clientX.value = e.target.parentNode.offsetLeft - inputWidth
      clientY.value = e.target.parentNode.offsetHeight + 20

    }
    function closeSearchBlock() {
      isSearchBlock.value = false
    }

    return {
      showSearchBlock,
      closeSearchBlock,
      icons,
      isSearchBlock,
      clientX,
      clientY,
      mockData,
      modalSearchWidth
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
      height: 44px;
    }
  }
}
</style>