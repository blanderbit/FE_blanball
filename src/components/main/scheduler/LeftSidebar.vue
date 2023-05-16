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
        v-if="selectedTabId === mockData.tabs.FRIENDS_PLANNED"
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
        <div
          v-if="selectedTabId === mockData.tabs.MY_PLANNED"
          class="c-me-in-list"
        >
          <LeftSidebarUserCard
            :userData="userStore.user"
            :isActive="userStore.user.id === activeUserId"
            :type="mockData.user_card_type.ME"
            @clickByUser="activateUser"
          />

          <GreenBtn
            class="c-plan-event__button"
            :text="$t('scheduler.plan-event')"
            :icon="icons.whiteClock"
            :height="32"
          />
        </div>

        <div class="c-friends-list" v-else>
          <SchedulerFriendsList
            :activeUserId="activeUserId"
            :searchValue="searchFriendsValue"
            @activateUser="activateUser"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import MainInput from '../../shared/input/MainInput.vue';
import SmartList from '../../../components/shared/smartList/SmartList.vue';
import ScrollToTop from '../../ScrollToTop.vue';
import InfiniteLoading from '../../main/infiniteLoading/InfiniteLoading.vue';
import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';
import LeftSidebarUserCard from './LeftSidebarUserCard.vue';
import GreenBtn from '../../shared/button/GreenBtn.vue';
import SchedulerFriendsList from './SchedulerFriendsList.vue';

import { useUserDataStore } from '../../../stores/userData';
import { BlanballEventBus } from '../../../workers/event-bus-worker';

import { CONSTS } from '../../../consts';

import searchIcon from '../../../assets/img/scheduler/lens.svg';
import whiteClockIcon from '../../../assets/img/scheduler/white-clock.svg';

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
    GreenBtn,
    LeftSidebarUserCard,
    InfiniteLoading,
    SchedulerFriendsList,
  },
  emits: ['friendsBlockSwitcher'],
  setup() {
    const { t } = useI18n();
    const searchFriendsValue = ref('');
    const selectedTabId = ref(CONSTS.scheduler.TABS_ENUM.MY_PLANNED);
    const userStore = useUserDataStore();
    const activeUserId = ref(userStore.user.id);

    const tabs = computed(() => {
      return [
        {
          id: mockData.value.tabs.MY_PLANNED,
          text: t('scheduler.my-planned-tab'),
        },
        {
          id: mockData.value.tabs.FRIENDS_PLANNED,
          text: t('scheduler.friends-planned-tab'),
        },
      ];
    });

    const mockData = computed(() => {
      return {
        tabs: CONSTS.scheduler.TABS_ENUM,
        user_card_type: CONSTS.scheduler.USER_CARD_TYPE,
      };
    });

    const icons = computed(() => {
      return {
        search: searchIcon,
        whiteClock: whiteClockIcon,
      };
    });

    const switchTab = (tabId) => {
      if (selectedTabId.value !== tabId) {
        selectedTabId.value = tabId;
        BlanballEventBus.emit('switchedSchedulerSidebarTab', tabId);
        if (tabId === mockData.value.tabs.MY_PLANNED) {
          activateUser(userStore.user);
        } else {
          deactivateUser();
        }
      }
    };


    function activateUser(userData) {
      if (activeUserId.value !== userData.id) {
        activeUserId.value = userData.id;
        BlanballEventBus.emit('activateUserInScheduler', userData);
      }
    }

    function deactivateUser() {
      activeUserId.value = 0;
      BlanballEventBus.emit('deactivateUser');
    }
    
    return {
      icons,
      activeUserId,
      selectedTabId,
      userStore,
      tabs,
      mockData,
      searchFriendsValue,
      switchTab,
      activateUser,
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
  min-width: 260px;
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
      border: 2px solid #efeff6;

      .c-tab {
        @include inter(13px, 400, $--b-main-gray-color);
        line-height: 20px;
        padding: 10px 4px;
        text-align: center;
        cursor: pointer;

        &.active {
          background: $--b-main-white-color;
          box-shadow: 1px 2px 5px 1px rgba(56, 56, 251, 0.08);
          border-radius: 4px;
          @include inter(13px, 500);
        }
      }
    }
    .c-friends-side-block {
      height: 600px;
      overflow: hidden;

      .c-plan-event__button {
        margin-top: 20px;
      }

      .c-friends-list {
        overflow-y: scroll;
        height: 100%;
      }
    }
  }
}
</style>
