<template>
  <div class="b_header">
    <SearchModal
      v-if="isSearchBlock && searchValue.length"
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
      <img src="@images/mob-menu-icon.svg" alt="" />
    </div>
    <BreadCrumbs />
    <div class="b_header_logo">
      <img src="@images/logo-header.svg" alt="" />
    </div>

    <div class="b_header-right-side">
      <div
        :class="[
          'b-scheduler-buttons',
          { active: isGoBackSchedulerIconVisible },
        ]"
        :style="`z-index: ${isSchedulerOpened ? 1000 : 0}`"
      >
        <img
          v-hints="[HINTS_DATA.scheduler_onboarding]"
          class="b_scheduler_open-close-button"
          :src="icons.scheduler"
          alt=""
          @click="$emit('openCloseScheduler')"
        />
        <img
          v-if="isGoBackSchedulerIconVisible"
          class="b_shceduler-go-back-button"
          src="@images/arrow-left.svg"
          alt=""
          @click="goBackSchedulerButtonConfig?.action()"
        />
      </div>
      <div class="b_header_search-block">
        <div class="b_header_search-input">
          <MainInput
            :title-width="0"
            :placeholder="$t('users.search')"
            inputMode="search"
            :icon="icons.search"
            v-model="searchValue"
            @on-click-action="showSearchBlock"
            @send-input-coordinates="setInputCoordinates"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';

import BreadCrumbs from '@sharedComponents/breadcrumbs/Breadcrumbs.vue';
import MainInput from '@sharedComponents/input/MainInput.vue';
import SearchModal from '@sharedComponents/modals/SearchModal.vue';
import SearchBlockAll from '@components/SearchBlockAll.vue';

import { CONSTS } from '@consts/index';
import { ROUTES } from '@/router/router.const';
import { API } from '@workers/api-worker/api.worker';
import { BlanballEventBus } from '@workers/event-bus-worker';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';

import { HINTS_DATA } from '@workers/hints-worker/hints.data';

import searchIcon from '@images/search.svg';
import arrowIcon from '@images/arrow-right-gray.svg';
import schedulerDefaultIcon from '@images/calendar.svg';
import schedulerActiveIcon from '@images/scheduler/scheduler-active-icon.svg';

export default {
  components: {
    BreadCrumbs,
    MainInput,
    SearchModal,
    SearchBlockAll,
  },
  props: {
    isSchedulerOpened: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isSearchBlock = ref(false);
    const clientX = ref(0);
    const router = useRouter();
    const clientY = ref(0);
    const modalSearchWidth = ref(369);
    const inputWidth = ref(0);
    const screenWidth = ref(window.innerWidth);
    const relevantUsersList = ref([]);
    const searchValue = ref('');
    const loading = ref(false);
    const goBackSchedulerButtonConfig = ref(null);
    let searchTimeout;

    const { isMobileSmall } = useWindowWidth();

    const isGoBackSchedulerIconVisible = computed(() => {
      return (
        props.isSchedulerOpened &&
        goBackSchedulerButtonConfig.value &&
        isMobileSmall.value
      );
    });

    const openUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId));
      searchValue.value = '';
      isSearchBlock.value = false;
    };

    watch(searchValue, (searchValue, previous) => {
      clearTimeout(searchTimeout);
      loading.value = true;
      const relevantSearch = () => {
        getRelevantUsers({ search: searchValue });
      };
      searchTimeout = setTimeout(relevantSearch, 500);
    });

    const getRelevantUsers = async (options) => {
      loading.value = true;
      let response = await API.UserService.getRelevantUsers(options);
      relevantUsersList.value = response.data.results;
      loading.value = false;
    };

    if (screenWidth.value < 576) {
      modalSearchWidth.value = '100%';
      clientX.value = 0;
    }

    const icons = computed(() => {
      return {
        search: searchIcon,
        arrow: arrowIcon,
        scheduler: props.isSchedulerOpened
          ? schedulerActiveIcon
          : schedulerDefaultIcon,
      };
    });

    const mockData = computed(() => {
      return {
        tags: CONSTS.manage_event.tags,
      };
    });

    function showSearchBlock(e) {
      isSearchBlock.value = true;
      inputWidth.value =
        modalSearchWidth.value - e.target.parentNode.clientWidth;
      clientX.value = e.target.parentNode.offsetLeft - inputWidth.value;
      clientY.value = e.target.parentNode.offsetHeight + 20;
    }
    function setInputCoordinates({ x, y }) {
      clientX.value = x - inputWidth.value;
      clientY.value = y + 20;
    }
    function closeSearchBlock() {
      isSearchBlock.value = false;
      searchValue.value = '';
    }
    function setScreenWidth() {
      screenWidth.value = window.innerWidth;
      if (screenWidth.value < 576) {
        modalSearchWidth.value = '100%';
        clientX.value = 0;
      } else {
        modalSearchWidth.value = 369;
      }
    }

    BlanballEventBus.on(
      'configureSchedulerGoBackButtonOnMobile',
      (buttonConfig) => {
        goBackSchedulerButtonConfig.value = buttonConfig;
      }
    );

    onMounted(() => {
      window.addEventListener('resize', setScreenWidth);
    });

    onBeforeUnmount(() => {
      BlanballEventBus.off('configureSchedulerGoBackButtonOnMobile');
      window.removeEventListener('resize', setScreenWidth);
    });

    return {
      showSearchBlock,
      closeSearchBlock,
      setInputCoordinates,
      openUserProfile,
      icons,
      searchValue,
      relevantUsersList,
      goBackSchedulerButtonConfig,
      isSearchBlock,
      loading,
      clientX,
      isGoBackSchedulerIconVisible,
      clientY,
      HINTS_DATA,
      mockData,
      modalSearchWidth,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-dfdeed: #dfdeed;
$color-fafafa: #fafafa;

@import '@sytles/mixins/device.scss';

.b_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  .b_header_mob-menu-icon {
    display: none;
    @media (max-width: 992px) {
      display: block;
      background: $color-fafafa;
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
  .b_header-right-side {
    display: flex;
    align-items: center;
    gap: 12px;

    .b-scheduler-buttons {
      display: flex;
      align-items: center;
      gap: 4px;

      &.active {
        padding: 2px;
        background: #ecfcfb;
        border-radius: 6px;
      }
      .b_scheduler_open-close-button {
        padding: 10px 16px;
        border: 1px solid $color-dfdeed;
        border-radius: 6px;
        cursor: pointer;
        background: $--b-main-white-color;

        @include tabletAndMobile {
          border: none;
          background: none;
          padding: 6px;
        }
      }

      .b_shceduler-go-back-button {
        background: $--b-main-white-color;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 4px;
        padding: 8px 10px;
        cursor: pointer;
      }
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
