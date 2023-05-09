<template>
  <div
    class="c-left-block"
    :style="{ 'margin-right': isFriendsVisible ? '20px' : '-260px' }"
  >
    <div class="c-main-side">
      <div class="c-tabs">
        <div
          v-for="tab in tabs"
          :class="['c-tab', { active: tab.id === selectedTabId }]"
          @click="switchTab(tab.id)"
        >
          {{ tab.text }}
        </div>
      </div>
      <div
        v-if="selectedTabId === TABS_ENUM.FRIENDS_PLANNED"
        class="c-input-search"
      >
        <MainInput
          :title-width="0"
          :placeholder="$t('scheduler.found-user')"
          inputMode="search"
          v-model="searchFriendsValue"
          :height="36"
          :icon="icons.search"
          :backgroundColor="'#fff'"
          name="search"
        />
      </div>
      <div class="c-friends-side-block">
        <div v-if="selectedTabId === TABS_ENUM.MY_PLANNED" class="c-me-in-list">
          <LeftSidebarUserCard
            :userData="userStore.user"
            :isActive="userStore.user.id === activeUserId"
            @clickByUser="activateUser"
          />
        </div>

        <div class="c-friends-list" v-else>
          <SmartList
            :list="paginationElements"
            ref="refList"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
          >
            <template #smartListItem="slotProps">
              <LeftSidebarUserCard
                :key="slotProps.index"
                :userData="slotProps.smartListItem"
                :isActive="slotProps.smartListItem.id === activeUserId"
                @clickByUser="activateUser"
              />
            </template>
            <template #after>
              <InfiniteLoading
                :identifier="triggerForRestart"
                ref="scrollbar"
                @infinite="loadDataPaginationData(paginationPage + 1, $event)"
              >
                <div class="c-no-results">
                  {{ $t('errors.no-results') }}
                </div>
                <template #complete>
                  <ScrollToTop
                    :element-length="paginationElements"
                    :is-scroll-top-exist="blockScrollToTopIfExist"
                    @scroll-button-clicked="scrollToFirstElement()"
                  />
                </template>
              </InfiniteLoading>
            </template>
          </SmartList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

import { v4 as uuid } from 'uuid';

import MainInput from '../../shared/input/MainInput.vue';
import SmartList from '../../../components/shared/smartList/SmartList.vue';
import ScrollToTop from '../../ScrollToTop.vue';
import InfiniteLoading from '../../main/infiniteLoading/InfiniteLoading.vue';
import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';
import LeftSidebarUserCard from './LeftSidebarUserCard.vue';

import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '../../../stores/userData';

import dates from '../../../consts/dates';

import searchIcon from '../../../assets/img/scheduler/lens.svg';

const TABS_ENUM = {
  MY_PLANNED: 1,
  FRIENDS_PLANNED: 2,
};

export default {
  name: 'LeftSidebar',
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    isFriendsVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserAvatar,
    MainInput,
    SmartList,
    ScrollToTop,
    LeftSidebarUserCard,
    InfiniteLoading,
  },
  emits: ['friendsBlockSwitcher'],
  setup() {
    const refList = ref();
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref(false);
    const searchFriendsValue = ref('');
    const selectedTabId = ref(TABS_ENUM.MY_PLANNED);
    const userStore = useUserDataStore();
    const activeUserId = ref(userStore.user.id);

    const tabs = computed(() => {
      return [
        {
          id: TABS_ENUM.MY_PLANNED,
          text: 'Мої заплановані',
        },
        {
          id: TABS_ENUM.FRIENDS_PLANNED,
          text: 'Зайнятість друзів',
        },
      ];
    });

    const todayDate = computed(() => {
      const date = new Date();
      return `${date.getDate()} ${dates.monthNames[date.getMonth()]}`;
    });

    const icons = computed(() => {
      return {
        search: searchIcon,
      };
    });

    const switchTab = (tabId) => {
      if (selectedTabId.value !== tabId) {
        selectedTabId.value = tabId;
        if (tabId === TABS_ENUM.MY_PLANNED) {
          activeUserId.value = userStore.user.id;
        }
      }
    };

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const activateUser = (userId) => {
      if (activeUserId.value !== userId) {
        activeUserId.value = userId;
      }
    };

    let searchTimeout;

    const searchFriends = () => {
      clearTimeout(searchTimeout);

      const load = () => {
        paginationClearData();
        loadDataPaginationData(1, null);
        restartInfiniteScroll();
      };
      searchTimeout = setTimeout(load, 500);
    };

    watch(
      () => searchFriendsValue.value,
      () => {
        searchFriends();
      }
    );

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.UserService.getAllUsers({
          page,
          search: searchFriendsValue.value,
        }),
    });

    function loadDataPaginationData(pageNumber, $state) {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    }

    loadDataPaginationData(1, null);

    return {
      todayDate,
      icons,
      refList,
      triggerForRestart,
      paginationPage,
      blockScrollToTopIfExist,
      activeUserId,
      selectedTabId,
      paginationElements,
      userStore,
      tabs,
      TABS_ENUM,
      searchFriendsValue,
      restartInfiniteScroll,
      switchTab,
      activateUser,
      loadDataPaginationData,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-dfdeed: #dfdeed;
$color-f9f9fc: #f9f9fc;
$color-d62953: #d62953;
$color-8a8aa8: #8a8aa8;
* {
  box-sizing: border-box;
}
.c-no-results {
  @include inter(13px, 20, $--b-main-gray-color);
  line-height: 20px;
}
.c-left-block {
  width: 260px;
  height: 100%;
  z-index: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
  .c-main-side {
    padding-right: 16px;
    height: 100%;
    flex: 439px 1;
    display: flex;
    flex-direction: column;

    .c-tabs {
      background: #efeff6;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      .c-tab {
        @include inter(13px, 400, $--b-main-gray-color);
        line-height: 20px;
        padding: 12px 4px;
        text-align: center;
        cursor: pointer;

        &.active {
          background: $--b-main-white-color;
          box-shadow: 1px 2px 5px 1px rgba(56, 56, 251, 0.08);
          border-radius: 4px;
          padding: 10px 4px;
          @include inter(13px, 500);
        }
      }
    }
    .c-friends-side-block {
      height: 600px;
      margin-top: 12px;
      overflow: hidden;

      .c-friends-list {
        overflow-y: scroll;
        height: 100%;
      }
    }
  }
}
</style>
