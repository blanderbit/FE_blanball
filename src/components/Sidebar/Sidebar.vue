<template>
  <BugReportModal
    v-if="isBugReportModalOpened"
    @close-modal="closeBugReportModal"
  />
  <div class="b_sidebar_wrapper">
    <NotificationsSlideMenu
      v-model:is-menu-opened="isMenuOpened"
      :notifications="paginationElements"
      :notReadNotificationCount="notReadNotificationCount"
      :newNotifications="skipids.length"
      :total-notifications-count="allNotificationsCount"
      @close="isMenuOpened = false"
      @loadingInfinite="loadDataNotifications(paginationPage + 1, $event)"
      @reLoading="loadDataNotifications(1, null, true)"
      @loading="loadDataNotifications(1, null, true)"
      @showNewNotifications="loadDataNotifications(1, null, true, true)"
      @changeTab="onChangeTab"
      @removeNotifications="removeNotifications"
    />
    <div class="b_sidebar">
      <div class="b_sidebar_top-block">
        <div class="b_sidebar_picture-top">
          <img
            class="b_sidebar_arrow"
            src="../../assets/img/open-sidebar-arrow.svg"
            alt=""
          />
          <img
            src="../../assets/img/my-profile-logo.svg"
            alt=""
            @click="goToMainPage"
          />
        </div>
        <div class="b_sidebar_menu-block">
          <ul>
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              :class="[
                'b_sidebar_menu-item',
                item.class,
                { 'b_sidebar_menu-item__disabled': disabled },
              ]"
              @click="item.action && item.action()"
            >
              <Transition>
                <TabLabel
                  v-if="item.disabled && currentHoverSideBarItemID === item.id"
                  style="position: absolute; top: 8px"
                  :title="$t('profile.coming-soon-title')"
                  :text="$t('profile.coming-soon-text')"
                />
              </Transition>
              <router-link
                v-if="item.url"
                :to="item.url"
                @mouseenter="enterHoverSidebarItem(item.id)"
                @mouseleave="leaveHoverSidebarItem"
              >
                <img :src="item.img" alt="" />
              </router-link>
              <a
                v-else
                @mouseenter="enterHoverSidebarItem(item.id)"
                @mouseleave="leaveHoverSidebarItem"
              >
                <img :src="item.img" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="b_sidebar_bottom-block">
        <div class="b_sidebar_picture-bottom">
          <userAvatar
            :link="userStore.getUserAvatar"
            :full-name="userStore.getUserFullName"
            @clickByAvatar="goToProfile"
          />
          <div
            @click="logOut"
            class="b_sidebar_logout d-flex justify-content-center align-items-center"
          >
            <img src="../../assets/img/exit-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <mobile-menu
    v-if="isMobileMenuAvailableToOpen"
    class="b_mobile-menu"
    :isMenuActive="isMobMenuActive"
    :notifications="paginationElements"
    :notReadNotificationCount="notReadNotificationCount"
    :newNotifications="skipids.length"
    :total-notifications-count="allNotificationsCount"
    @close="isMenuOpened = false"
    @closed="paginationClearData()"
    @loadingInfinite="loadDataNotifications(paginationPage + 1, $event)"
    @reLoading="loadDataNotifications(1, null, true)"
    @loading="loadDataNotifications(1, null, true)"
    @close-menu="isMobMenuActive = false"
    @foundBug="foundBug"
    @showNewNotifications="loadDataNotifications(1, null, true, true)"
    @changeTab="onChangeTab"
    @removeNotifications="removeNotifications"
    @logOut="logOut"
  />
</template>

<script>
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import NotificationsSlideMenu from '../SlideMenu/NotificationsSlideMenu.vue';
import userAvatar from '../shared/userAvatar/UserAvatar.vue';
import BugReportModal from '../shared/modals/BugReportModal.vue';
import TabLabel from '../shared/tabLabel/TabLabel.vue';
import MobileMenu from './MobileMenu.vue';

import { useUserDataStore } from '../../stores/userData';
import { createNotificationFromData } from '../../workers/utils-worker';
import {
  AuthWebSocketWorkerInstance,
  GeneralSocketWorkerInstance,
} from '../../workers/web-socket-worker';
import { API } from '../../workers/api-worker/api.worker';
import { PaginationWorker } from '../../workers/pagination-worker';
import {
  NotificationsBus,
  BlanballEventBus,
} from '../../workers/event-bus-worker';
import { FilterPatch } from '../../workers/api-worker/http/filter/filter.patch';
import { useWindowWidth } from '../../utils/widthScreen';
import { logOut } from '../../utils/logOut';
import {
  finishSpinner,
  startSpinner,
} from '../../workers/loading-worker/loading.worker';

import { ROUTES } from '../../router/router.const';

import notification from '../../assets/img/notification.svg';
import notificationUnread from '../../assets/img/notificationUnread.svg';
import record from '../../assets/img/record.svg';
import members from '../../assets/img/members.svg';
import medal from '../../assets/img/medal.svg';
import settings from '../../assets/img/settings.svg';
import bugReport from '../../assets/img/warning-black.svg';
const findDublicates = (list, newList) => {
  return newList.filter((item) =>
    list.length
      ? !list.find(
          (oldItem) => oldItem.notification_id === item.notification_id
        )
      : true
  );
};

const tabTypes = {
  notRead: 'NotReadNotifications',
  allNotifications: 'AllNotifications',
};

export default {
  name: 'MainSidebar',
  components: {
    NotificationsSlideMenu,
    userAvatar,
    BugReportModal,
    TabLabel,
    MobileMenu,
  },
  setup() {
    const userStore = useUserDataStore();
    const notReadNotificationCount = ref(0);
    const allNotificationsCount = ref(0);
    const isMobMenuActive = ref(false);
    const skipids = ref([]);
    const router = useRouter();
    const isMenuOpened = ref(false);
    const isBugReportModalOpened = ref(false);
    const currentHoverSideBarItemID = ref(0);
    const { isMobile, isTablet } = useWindowWidth();

    const foundBug = () => {
      isMobMenuActive.value = false;
      isBugReportModalOpened.value = true;
    };

    const isMobileMenuAvailableToOpen = computed(() => {
      return isMobile.value || isTablet.value;
    });

    const menuItems = computed(() => [
      {
        id: 1,
        img: notReadNotificationCount.value ? notificationUnread : notification,
        action: () => (isMenuOpened.value = !isMenuOpened.value),
        disabled: false,
      },
      {
        id: 2,
        img: record,
        url: ROUTES.APPLICATION.EVENTS.absolute,
        action: () => (isMenuOpened.value = false),
        disabled: false,
      },
      {
        id: 3,
        img: medal,
        url: '',
        action: () => (isMenuOpened.value = false),
        disabled: true,
      },
      {
        id: 4,
        img: members,
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
        action: () => (isMenuOpened.value = false),
        disabled: false,
      },
      {
        id: 5,
        img: settings,
        url: '',
        action: () => (isMenuOpened.value = false),
        disabled: true,
      },
      {
        id: 6,
        img: bugReport,
        url: '',
        class: 'b-bug-report__icon',
        action: () => (isBugReportModalOpened.value = true),
        disabled: false,
      },
    ]);

    const getNotificationsCount = () =>
      API.NotificationService.getNotificationsCount().then((item) => {
        notReadNotificationCount.value =
          item.data.not_read_notifications_count || 0;
        allNotificationsCount.value = item.data.all_notifications_count || 0;
      });

    const closeBugReportModal = () => (isBugReportModalOpened.value = false);

    const enterHoverSidebarItem = (itemId) =>
      (currentHoverSideBarItemID.value = itemId);

    const leaveHoverSidebarItem = () => (currentHoverSideBarItemID.value = 0);

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.NotificationService.getNotifications({
          ...getRawFilters(),
          page,
        }),
      dataTransformation: (item) => createNotificationFromData(item),
      beforeConcat: (elements, newList) => findDublicates(elements, newList),
    });

    const { getRawFilters, updateFilter, filters, clearFilters, setFilters } =
      FilterPatch({
        router,
        filters: {
          type: {
            type: String,
            value: '',
          },
          skipids: {
            type: Array,
            value: [],
          },
        },
        afterUpdateFiltersCallBack: () => {
          paginationClearData();
        },
      });

    const loadDataNotifications = async (
      pageNumber,
      $state,
      forceUpdate,
      isLoading
    ) => {
      if (isLoading) {
        startSpinner();
      }
      if (forceUpdate) {
        paginationClearData();
        skipids.value = [];
      }

      await paginationLoad({ pageNumber, $state, forceUpdate }).then(() => {
        if (isLoading) {
          finishSpinner();
        }
      });
    };

    const onChangeTab = (tabType) => {
      switch (tabType) {
        case tabTypes.notRead:
          filters.value.type.value = 'Unread';
          loadDataNotifications(1, null, false, true);
          break;
        case tabTypes.allNotifications:
          filters.value.type.value = '';
          loadDataNotifications(1, null, false, true);
          break;
      }
    };

    const goToMainPage = () => {
      router.push(ROUTES.APPLICATION.index.path);
    };

    const handleMessageInSidebar = (instanceType) => {
      if (instanceType.notification) {
        skipids.value.push(instanceType.notification_id);
      }

      if (instanceType.updateWebSocketMessage) {
        instanceType.handleUpdate(
          {
            paginationElements,
            paginationLoad,
            paginationPage,
          },
          getNotificationsCount
        );
      }

      getNotificationsCount();
    };

    const handleGeneralMessageInSidebar = (instanceType) => {
      instanceType.handleUpdate({
        paginationElements,
        paginationLoad,
        paginationPage,
      });
    };

    const goToProfile = () => {
      router.push(ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute);
      isMenuOpened.value = false;
    };

    AuthWebSocketWorkerInstance.registerCallback(handleMessageInSidebar);
    GeneralSocketWorkerInstance.registerCallback(handleGeneralMessageInSidebar);

    NotificationsBus.on('SidebarClearData', () => {
      skipids.value = [];
      paginationClearData();
    });

    NotificationsBus.on(
      'hanlderToRemoveNewNotificationsInSidebar',
      (notificationId) => {
        const index = skipids.value.indexOf(notificationId);

        if (index > -1) {
          skipids.value.splice(index, 1);
        }
        loadDataNotifications(1, null, false, false);
      }
    );

    BlanballEventBus.on('OpenMobileMenu', () => {
      isMobMenuActive.value = true;
    });

    onBeforeUnmount(() => {
      NotificationsBus.off('SidebarClearData');
      NotificationsBus.off('hanlderToRemoveNewNotificationsInSidebar');
      BlanballEventBus.off('OpenMobileMenu');
      AuthWebSocketWorkerInstance.destroyCallback(handleMessageInSidebar);
    });

    getNotificationsCount();

    const removeNotifications = (ids) => {
      if (ids === 'All') {
        paginationElements.value = [];
      } else {
        paginationElements.value = paginationElements.value.filter(
          (item) => !ids.includes(item.notification_id)
        );
      }
    };

    return {
      paginationElements,
      paginationTotalCount,
      paginationPage,
      notReadNotificationCount,
      skipids,
      menuItems,
      isMobMenuActive,
      isMobileMenuAvailableToOpen,
      allNotificationsCount,
      isMenuOpened,
      userStore,
      currentHoverSideBarItemID,
      isBugReportModalOpened,
      loadDataNotifications,
      removeNotifications,
      goToMainPage,
      onChangeTab,
      leaveHoverSidebarItem,
      enterHoverSidebarItem,
      paginationClearData,
      foundBug,
      goToProfile,
      logOut,
      closeBugReportModal,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-efeff6: #efeff6;
$color-d3f8f7: #d3f8f7;
$color-fff4ec: #fff4ec;

.b_sidebar_wrapper {
  position: relative;

  @media (max-width: 992px) {
    display: none;
  }

  .b_sidebar {
    position: relative;
    @include calc-height;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    padding-top: 24px;
    padding-bottom: 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 12;
    background: $--b-main-white-color;

    .b_sidebar_picture-bottom {
      background: $color-efeff6;
      border-radius: 24px;
      padding: 4px;
      cursor: pointer;

      .b_sidebar_logout {
        margin-top: 6px;
        width: 40px;
        height: 40px;
        background: $--b-main-white-color;
        border: 1px solid $color-efeff6;
        border-radius: 24px;
        cursor: pointer;
      }
    }

    .b_sidebar_top-block {
      .b_sidebar_picture-top {
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgb(206, 206, 206);
        display: flex;
        position: relative;

        .b_sidebar_arrow {
          position: absolute;
          bottom: -5px;
          right: -20px;
        }

        img {
          margin: auto;
          cursor: pointer;
        }
      }

      .b_sidebar_menu-block {
        .b_sidebar_menu-item {
          width: 40px;
          height: 40px;
          list-style: none;
          position: relative;
          cursor: pointer;
          transition: 0.3s all;

          .router-link-active {
            background: $color-d3f8f7;
          }

          &:hover {
            background: rgba(220, 255, 254, 0.65);
          }

          a {
            display: flex;
            height: 100%;
            border-radius: 6px;
            justify-content: center;
            align-items: center;

            img {
              &:hover {
                animation: shake 0.4s linear;
              }
            }
          }
        }
      }
    }

    @keyframes shake {
      0% {
        transform: rotate(20deg);
      }

      20% {
        transform: rotate(-16deg);
      }

      40% {
        transform: rotate(12deg);
      }

      60% {
        transform: rotate(-8deg);
      }

      80% {
        transform: rotate(4deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  }
}

.b-bug-report__icon {
  margin-top: 20px;

  a:hover {
    background: $color-fff4ec;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.b_mobile-menu {
  @media (min-width: 992px) {
    display: none;
  }
}
</style>
