<template>
  <div
    class="c-left-block"
    :style="{ 'margin-right': isFriendsVisible ? '20px' : '-260px' }"
  >
    <div class="c-main-side">
      <SchedulerTabs :selectedTabId="selectedTabId" @switchTab="switchTab" />
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
          :width="10"
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
          <SchedulerUserCard
            :userData="userStore.user"
            :isActive="userStore.user.id === activeUserId"
            :type="mockData.user_card_type.ME"
            @clickByUserToActivate="activateUser"
            @clickByUserToDiactivate="deactivateUser"
          />

          <GreenBtn
            class="c-plan-event__button"
            :text="$t('scheduler.plan-event')"
            :icon="icons.whiteClock"
            :height="32"
            @click-function="goToTheCreateEventPage"
          />
        </div>

        <div class="c-friends-list" v-else>
          <SchedulerFriendsList
            :activeUserId="activeUserId"
            :searchValue="searchFriendsValue"
            @activateUser="activateUser"
            @deactivateUser="deactivateUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import MainInput from '@sharedComponents/input/MainInput.vue';
import SmartList from '@sharedComponents/smartList/SmartList.vue';
import ScrollToTop from '@sharedComponents/scrollToTop/ScrollToTop.vue';
import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import UserAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';
import SchedulerUserCard from './SchedulerUserCard.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import SchedulerFriendsList from './SchedulerFriendsList.vue';
import SchedulerTabs from './SchedulerTabs.vue';

import { useUserDataStore } from '@/stores/userData';
import { BlanballEventBus } from '@workers/event-bus-worker';

import { CONSTS } from '@consts';
import { ROUTES } from '@routes/router.const';

import searchIcon from '@images/scheduler/lens.svg';
import whiteClockIcon from '@images/scheduler/white-clock.svg';

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
    SchedulerTabs,
    SchedulerUserCard,
    InfiniteLoading,
    SchedulerFriendsList,
  },
  emits: ['friendsBlockSwitcher'],
  setup() {
    const router = useRouter();
    const searchFriendsValue = ref('');
    const selectedTabId = ref(CONSTS.scheduler.TABS_ENUM.MY_PLANNED);
    const userStore = useUserDataStore();
    const activeUserId = ref(userStore.user.id);

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

    function goToTheCreateEventPage() {
      if (
        router.currentRoute.value.name === ROUTES.APPLICATION.EVENTS.CREATE.name
      ) {
        BlanballEventBus.emit('closeScheduler');
      } else {
        router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute);
      }
    }

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

    BlanballEventBus.on('schedulerSidebarForceSwitchTab', (data) => {
      switchTab(data.tabId);
      if (data.userData) {
        activateUser(data.userData);
      } else {
        deactivateUser();
      }
    });

    onBeforeUnmount(() => {
      BlanballEventBus.off('schedulerSidebarForceSwitchTab');
    });

    return {
      icons,
      activeUserId,
      selectedTabId,
      userStore,
      mockData,
      searchFriendsValue,
      switchTab,
      goToTheCreateEventPage,
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

:deep(.c-tabs) {
  margin-bottom: 8px;
}
:deep(input) {
  width: 240px !important;
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
