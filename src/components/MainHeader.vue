<template>
  <div class="b_header">
    <SearchModal
      v-if="isSearchBlock && searchValue" 
      :client-x="clientX"
      :client-y="clientY"
      @close-modal="closeSearchBlock"
    >
      <template #frame-data>
        <SearchBlockAll
          :width="modalSearchWidth"
          :loading="loading"
          :usersList="relevantUsersList"
          :itemIcon="icons.arrow"
          @item-list-click="openUserProfile"
        >
      </SearchBlockAll>
      </template>
    </SearchModal>
    <div class="b_header_mob-menu-icon" @click="$emit('menuIconClick')">
      <img src="../assets/img/mob-menu-icon.svg" alt="" />
    </div>
    <BreadCrumbs />
    <div class="b_header_logo">
      <img src="../assets/img/logo-header.svg" alt="" />
    </div>
    <div class="b_header_search-block">
      <div class="b_header_search-input">
        <InputComponent
          :title-width="0"
          :placeholder="$t('users.search')"
          :icon="icons.search"
          v-model="searchValue"
          @on-click-action="showSearchBlock"
          @send-input-coordinates="setInputCoordinates"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'

import BreadCrumbs from './Breadcrumbs.vue'
import InputComponent from './forms/InputComponent.vue'
import SearchModal from './ModalWindows/SearchModal.vue'
import SearchBlockAll from './SearchBlockAll.vue'
import SmallLoader from './SmallLoader.vue'

import CONSTANTS from '../consts/index'
import { ROUTES } from "../router/router.const";
import { API } from '../workers/api-worker/api.worker'

import searchIcon from '../assets/img/search.svg'
import arrowIcon from '../assets/img/arrow-right-gray.svg'


export default {
  components: {
    BreadCrumbs,
    InputComponent,
    SearchModal,
    SearchBlockAll,
    SmallLoader,
  },
  setup() {
    const isSearchBlock = ref(false)
    const clientX = ref(0)
    const router = useRouter()
    const clientY = ref(0)
    const modalSearchWidth = ref(369)
    const inputWidth = ref(0)
    const screenWidth = ref(window.innerWidth)
    const relevantUsersList = ref([])
    const searchValue = ref('')
    const loading = ref(false)
    let searchTimeout

    const openUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId))
      isSearchBlock.value = false
    }

    watch(searchValue, (searchValue, previous) => {
      clearTimeout(searchTimeout)
      loading.value = true
      const relevantSearch = () =>  {
        getRelevantUsers({'search': searchValue})
      }
      searchTimeout = setTimeout(relevantSearch, 500);
    })

    const getRelevantUsers =  async (options) => {
      loading.value = true
      let response = await API.UserService.getRelevantUsers(options)
      relevantUsersList.value = response.data.results
      loading.value = false
    }

    if (screenWidth.value < 576) {
      modalSearchWidth.value = '100%'
      clientX.value = 0
    }

    const icons = computed(() => {
      return {
        search: searchIcon,
        arrow: arrowIcon,
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
      inputWidth.value =
        modalSearchWidth.value - e.target.parentNode.clientWidth
      clientX.value = e.target.parentNode.offsetLeft - inputWidth.value
      clientY.value = e.target.parentNode.offsetHeight + 20
    }
    function setInputCoordinates({ x, y }) {
      clientX.value = x - inputWidth.value
      clientY.value = y + 20
    }
    function closeSearchBlock() {
      isSearchBlock.value = false
      searchValue.value = ''
    }
    function setScreenWidth() {
      screenWidth.value = window.innerWidth
      if (screenWidth.value < 576) {
        modalSearchWidth.value = '100%'
        clientX.value = 0
      } else {
        modalSearchWidth.value = 369
      }
    }

    onMounted(() => {
      window.addEventListener('resize', setScreenWidth)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', setScreenWidth)
    })

    return {
      showSearchBlock,
      closeSearchBlock,
      setInputCoordinates,
      openUserProfile,
      icons,
      searchValue,
      relevantUsersList,
      isSearchBlock,
      loading,
      clientX,
      clientY,
      mockData,
      modalSearchWidth
    }
  },
}
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
 $color-fafafa: #fafafa;


@import '../assets/styles/mixins/device.scss';

.b_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  .b_header_mob-menu-icon {
    display: none;
    @media (max-width: 992px) {
      display: block;
      background: #FAFAFA;
      border-radius: 6px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .b_header_logo {
    display: none;
    @include tablet {
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
