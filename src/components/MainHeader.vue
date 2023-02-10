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
          :loading="loading"
          :tags="relevantTags"
          :filtered-users="paginationElements"
          :list-item-icon="icons.arrow"
          @itemListClick="getItemDetail"
        >
        <template v-slot:users>
          <div class="b-modal-items__container" v-for="user in relevantUsersList">
            <div  @click="openUserProfile(user.id)"  class="b-user b-modal-item  w-100">
              <avatar
                class="b-user__image"
                :link="user.profile.avatar_url"
                :full-name="`${user.profile.name} ${user.profile.last_name}`"
              ></avatar>
              <div class="b-user-main-info__container">
                <div class="b-user__name">
                {{ user.profile.name }} {{ user.profile.last_name }}
              </div>
                <img
                  class="b-show-user-profile__button" 
                  src="../assets/img/arrow-right-gray.svg" 
                  alt="arrow-right-gray">
              </div>
            </div>
          </div>
          <span class="b-modal-no__results" v-if="!relevantUsersList.length">
            {{ $t('errors.no-results') }}
          </span>
        </template>
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
          :placeholder="$t('header.search-events')"
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
import SearchModal from './SearchModal.vue'
import SearchBlockAll from './SearchBlockAll.vue'
import Avatar from './Avatar.vue'
import SmallLoader from './SmallLoader.vue'


import searchIcon from '../assets/img/search.svg'
import arrowIcon from '../assets/img/arrow-long-right.svg'

import CONSTANTS from '../consts/index'
import { ROUTES } from "../router/router.const";
import { API } from '../workers/api-worker/api.worker'


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
    const router = useRouter()
    const clientY = ref(0)
    const modalSearchWidth = ref(369)
    const inputWidth = ref(0)
    const screenWidth = ref(window.innerWidth)
    const relevantTags = ref(CONSTANTS.manage_event.tags)
    const relevantUsersList = ref([])
    const searchValue = ref('')
    const loading = ref(false)
    let searchTimeout

    const openUserProfile =  (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId))
      isSearchBlock.value = false
    }

    watch(searchValue, (searchValue, previous) => {
      clearTimeout(searchTimeout)
      const relevantSearch = () => getRelevantUsers({'search': searchValue})
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

    getRelevantUsers()

    return {
      showSearchBlock,
      closeSearchBlock,
      setInputCoordinates,
      getItemDetail,
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
.b-user-main-info__container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
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

.b-user__name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #262541;
  margin-left: 8px;
}
.b-modal-item {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 6px;
  &:hover {
    background: #f0f0f4;

    .b-show-user-profile__button {
      display: block;
    }
  }
}
.b-user__image {
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  border-radius: 4px;
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}
.b-show-user-profile__button {
  cursor: pointer;
  display: none;
}
.b-modal-no__results {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #575775;
}
</style>
