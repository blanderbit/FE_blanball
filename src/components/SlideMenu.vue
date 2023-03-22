<template>
  <Loading :is-loading="loading" />
  <div>
    <div
      v-if="isMenuOpened"
      class="b_slide_menu_back"
      @click="toggleMenu"
    ></div>
    <div
      class="b_slide_menu_wrapper"
      :style="{
        right: isMenuOpened ? '-464px' : '0px',
      }"
    >
      <div
        v-if="isMenuOpened"
        class="b_slide_menu_sidebar-arrow"
        @click="toggleMenu"
      >
        <img :src="arrowPosition" alt="" />
      </div>
      <div class="b_slide_menu_main">
        <div class="b_slide_menu_top-block">
          <div class="b_slide_menu_logo">
            <img src="../assets/img/logo-sidebar.svg" alt="" />
          </div>
          <div
            class="b_slide_menu_items d-flex justify-content-between align-items-center mb-2"
            v-if="notifications.length"
          >
            <div
              class="b-read-all-notifications__button d-flex align-items-center"
              v-if="notifications.length && notReadNotificationCount"
              @click="HandleAction.readAll()"
            >
              <img
                src="../assets/img/notifications/double-check.svg"
                height="16"
                alt=""
              />
              <span class="b-button-text">
                {{ $t('slide_menu.read-all') }}
              </span>
            </div>

            <button
              class="b-notifictions-actions__button"
              @click="handleSelectableMode"
            >
              <span v-if="!selectable" class="b-button-text">
                {{ $t('slide_menu.notifications-manage') }}
              </span>
              <span v-else class="b-button-text">
                {{ $t('slide_menu.cancel-manage') }}
              </span>
              <img v-if="!selectable" src="../assets/img/dots.svg" alt="" />
            </button>
          </div>
          <div
            v-if="selectable && notifications.length && selectedList.length"
            class="d-flex mb-2 justify-content-between"
          >
            <div class="b-selected-elements__count">
              <img
                src="../assets/img/cross.svg"
                alt=""
                @click="clearSelectedList"
              />
              <span>{{ selectedList.length }}</span>
              <div
                v-if="selectedList.length >= 100"
                class="b-selected-elements__max"
              >
                (макс.)
              </div>
            </div>

            <div class="d-flex">
              <button
                @click="HandleAction.readSelected()"
                class="d-flex align-items-center"
              >
                <img
                  src="../assets/img/notifications/double-check.svg"
                  height="16"
                  alt=""
                />
                {{ $t('slide_menu.mark-as-viewed') }}
              </button>

              <button
                @click="HandleAction.deleteSelected()"
                class="d-flex align-items-center"
              >
                <img
                  src="../assets/img/notifications/trash.svg"
                  height="16"
                  alt=""
                />
                {{ $t('buttons.delete') }}
              </button>
            </div>
          </div>
          <div
            v-if="isMenuOpened"
            class="b-notifications__tabs"
            :style="`margin-top: ${notifications.length ? 16 : 28}px; 
                     margin-bottom: ${notifications.length ? 0 : 16}px;`"
          >
            <div
              v-for="tab in tabs"
              :class="[
                'b-notification-tab',
                { selected: tab.id === selectedTabId },
              ]"
              @click="changeTab(tab.id, tab.type)"
            >
              <div class="b-notifications-title me-1">
                {{ $t(tab.text) }}
              </div>
              <div
                class="b-notification-unreaded d-flex align-items-center justify-content-center me-1"
                v-if="tab.count > 0"
              >
                {{ tab.count }}
              </div>
            </div>
          </div>
          <ul
            class="b_slide_menu_notification"
            :style="{
              height: `calc(100vh - ${
                selectedList.length > 0 ? 110 : 80
              }px - 100px - 70px)`,
            }"
            v-if="isMenuOpened"
            ref="test"
          >
            <Notifications
              :notifications="notifications"
              :selectable="selectable"
              ref="notificationList"
              v-model:selected-list="selectedList"
              v-model:scrollbar-existing="blockScrollToTopIfExist"
              @delete="HandleAction.deleteOne"
              @removeNewNotification="removeNewNotification"
            >
              <template #before>
                <Notification
                  v-if="newNotifications"
                  class="b-new-notification"
                  :notificationInstance="getNewNotificationInstance"
                  :not-collapsible="true"
                  :deletable="false"
                  @handler-action="$emit('reLoading'), restartInfiniteScroll()"
                >
                </Notification>
              </template>
              <template #after>
                <InfiniteLoading
                  :identifier="triggerForRestart"
                  ref="scrollbar"
                  @infinite="$emit('loadingInfinite', $event)"
                >
                  <template #complete>
                    <empty-list
                      v-if="!notifications.length && !newNotifications"
                      :title="emptyListMessages.title"
                      :description="emptyListMessages.description"
                      :is-notification="true"
                    >
                    </empty-list>
                    <ScrollToTop
                      :element-length="notifications"
                      :is-scroll-top-exist="blockScrollToTopIfExist"
                      @scroll-button-clicked="scrollToFirstElement()"
                    />
                  </template>
                </InfiniteLoading>
              </template>
            </Notifications>
          </ul>
        </div>
        <div class="b_slide_menu_bottom-block">
          <div class="b_slide_menu_top-line d-flex justify-content-between">
            <div class="b_slide_menu_name">
              {{ userData.profile.name }} {{ userData.profile.last_name }}
            </div>
            <div class="b_slide_menu_position">
              {{ $t(`hashtags.${userData.role}`) }}
            </div>
          </div>
          <div class="b_slide_menu_bottom-line">
            <div class="b-blanball-version">
              {{ $t('slide_menu.version') }}
              <router-link
                :to="routeObject.APPLICATION.VERSION.absolute"
                @click="$emit('close')"
              >
                <span>{{ clientVersion }}</span>
              </router-link>
            </div>
            <div class="b-blanball-made-by-flumx">
              Розроблено: FlumX
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { v4 as uuid } from 'uuid';
import { storeToRefs } from 'pinia';

import Notifications from './sitebar-notifications/Notifications.vue';
import Notification from './Notification.vue';
import EmptyList from './EmptyList.vue';
import InfiniteLoading from '../workers/infinit-load-worker/InfiniteLoading.vue';
import ScrollToTop from './ScrollToTop.vue';
import Loading from '../workers/loading-worker/Loading.vue';

import { useUserDataStore } from '../stores/userData';
import { NewNotifications } from '../workers/web-socket-worker/not-includes-to-socket/new_notifications';
import { API } from '../workers/api-worker/api.worker';

import { ROUTES } from '../router/router.const';

import sidebarArrowBack from '../assets/img/sidebar-arrow-back.svg';
import sidebarArrow from '../assets/img/sidebar-arrow.svg';

export default {
  components: {
    InfiniteLoading,
    Notification,
    Loading,
    EmptyList,
    Notifications,
    ScrollToTop,
  },
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
    notReadNotificationCount: {
      type: Number,
      default: 0,
    },
    newNotifications: {
      type: Number,
      default: 0,
    },
    totalNotificationsCount: {
      type: Number,
      default: 0,
    },
    isMenuOpened: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'closed',
    'close',
    'reLoading',
    'loading',
    'loadingInfinite',
    'update:isMenuOpened',
  ],
  setup(context, { emit }) {
    const notificationList = ref();
    const loading = ref(false);
    const selectable = ref(false);
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref('');
    const selectedList = ref([]);
    const userStore = useUserDataStore();
    const { user } = storeToRefs(userStore);
    const newNotificationInstance = ref(new NewNotifications());
    const clientVersion = ref(inject('clientVersion'));
    const { t } = useI18n();
    const selectedTabId = ref(1);

    const tabs = computed(() => [
      {
        id: 1,
        text: 'slide_menu.all-notifications',
        type: 'AllNotifications',
        count: context.totalNotificationsCount - context.newNotifications,
      },
      {
        id: 2,
        text: 'slide_menu.not-read',
        type: 'NotReadNotifications',
        count: context.notReadNotificationCount - context.newNotifications,
      },
    ]);

    const userData = computed(() => {
      return user.value;
    });

    watch(
      () => context.isMenuOpened,
      () => {
        if (!context.isMenuOpened) {
          emit('closed');
        }
      }
    );

    const arrowPosition = computed(() => {
      return context.isMenuOpened ? sidebarArrowBack : sidebarArrow;
    });

    const routeObject = computed(() => {
      return ROUTES;
    });

    function toggleMenu() {
      emit('update:isMenuOpened', !context.isMenuOpened);
    }

    const getNewNotificationInstance = computed(() => {
      newNotificationInstance.value.countOfNewNotifications =
        context.newNotifications;
      return newNotificationInstance.value;
    });

    const emptyListMessages = computed(() => {
      return {
        title: t('no_records.noNotifications.title'),
        description: t('no_records.noNotifications.description'),
      };
    });

    const clearSelectedList = () => {
      selectedList.value = [];
    };

    const startLoader = () => {
      loading.value = true;
    };

    const stopLoader = () => {
      loading.value = false;
    };

    const handleSelectableMode = () => {
      selectable.value = !selectable.value;
      clearSelectedList();
    };

    const HandleAction = {
      deleteAll: async () => {
        if (!context.notifications.length && !context.newNotifications) return;
        startLoader();
        await API.NotificationService.deleteAllMyNotifications();
        clearSelectedList();
        handleSelectableMode();
        stopLoader();
      },
      readAll: async () => {
        if (!context.notifications.length && !context.newNotifications) return;
        startLoader();
        await API.NotificationService.readAllMyNotifications();
        clearSelectedList();
        if (selectable.value) {
          handleSelectableMode();
        }
        if (selectedTabId.value === 2) {
          emit('reLoading');
        }
        stopLoader();
      },
      deleteSelected: async () => {
        if (!selectedList.value) return;
        startLoader();
        await API.NotificationService.deleteNotifications(selectedList.value);
        clearSelectedList();
        handleSelectableMode();
        stopLoader();
      },
      readSelected: async () => {
        if (!selectedList.value) return;
        startLoader();
        await API.NotificationService.readNotifications(selectedList.value);
        clearSelectedList();
        handleSelectableMode();
        stopLoader();
      },
      deleteOne: async (id) => {
        startLoader();
        await API.NotificationService.deleteNotifications([id]);
        stopLoader();
      },
    };

    function restartInfiniteScroll() {
      triggerForRestart.value = uuid();
    }

    const changeTab = (tabId, tabType) => {
      if (tabId !== selectedTabId.value && !selectable.value) {
        selectedTabId.value = tabId;
        emit('changeTab', tabType);
        restartInfiniteScroll()
      }
    };

    const removeNewNotification = (notification) => {
      debugger
    }

    return {
      clientVersion,
      arrowPosition,
      userData,
      getNewNotificationInstance,
      emptyListMessages,
      routeObject,
      selectedList,
      HandleAction,
      triggerForRestart,
      selectable,
      notificationList,
      loading,
      blockScrollToTopIfExist,
      tabs,
      selectedTabId,
      removeNewNotification,
      handleSelectableMode,
      toggleMenu,
      changeTab,
      clearSelectedList,
      restartInfiniteScroll,
      scrollToFirstElement: () => {
        notificationList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f0f0f4: #f0f0f4;
$color-8a8aa8: #8a8aa8;
$color-fcfcfc: #fcfcfc;
$color-dfdeed: #dfdeed;
$color-e9f6ff: #e9f6ff;
$color-1c4fc5: #1c4fc5;
$color-efeff6: #efeff6;

.b_slide_menu_back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.b_slide_menu_wrapper {
  transition: all 0.7s ease;
  position: absolute;
  top: 0;
  right: -260px;
  height: 100%;
  .b_slide_menu_new_notifications {
    padding: 8px;
    background: $color-f0f0f4;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: $color-8a8aa8;
  }
  .b_slide_menu_sidebar-arrow {
    position: absolute;
    width: 32px;
    height: 32px;
    right: -20px;
    top: 72px;
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    display: flex;
    cursor: pointer;
    z-index: 3;
    img {
      margin: auto;
    }
  }
  .b_slide_menu_main {
    width: 464px;
    padding: 35px 20px 0 20px;
    position: absolute;
    top: 0;
    right: 0px;
    height: 100vh;
    background: $color-fcfcfc;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .b_slide_menu_top-block {
      height: calc(100% - 102px);
      .b_slide_menu_logo {
        padding-left: 8px;
      }
      .b_slide_menu_items {
        margin-top: 12px;
        padding-top: 12px;
        .b_slide_menu_title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: $--b-main-gray-color;
        }
        ul {
          margin-top: 22px;
          li {
            list-style: none;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $--b-main-black-color;
            img {
              margin-right: 12px;
            }
          }
        }
      }
    }
    .b_slide_menu_bottom-block {
      padding: 16px 11px;

      .b_slide_menu_top-line {
        width: 100%;
        margin-bottom: 8px;
        .b_slide_menu_position {
          background: $color-e9f6ff;
          border-radius: 4px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: $color-1c4fc5;
          width: fit-content;
          padding: 1px 4px;
        }
        .b_slide_menu_name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 24px;
          color: $--b-main-black-color;
        }
      }
      .b_slide_menu_bottom-line {
        text-align: left;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: $color-8a8aa8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;

        a {
          text-decoration: none;
          color: $color-8a8aa8;
        }

        .b-blanball-version,
        .b-blanball-made-by-flumx {
          border-bottom: 1px dashed #dfdeed;
        }
      }
    }
  }
}

button {
  font-family: 'Inter';
  padding: 4px 8px;
  border: 1px solid $color-dfdeed;
  border-radius: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $--b-main-black-color;
  background: white;
  margin-right: 5px;
  cursor: pointer;
  img {
    margin-right: 3px;
  }
}

.b-selected-elements__count {
  span {
    font-family: 'Inter';
    background: $--b-main-gray-color;
    border-radius: 100px;
    padding: 0px 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    width: fit-content;
    height: 20px;
    min-width: 20px;
    color: $--b-main-white-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  display: flex;
  align-items: center;
  gap: 12px;
}
.b-button-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $--b-main-black-color;
}
.b-notifications-title {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  font-family: 'Inter';
  color: $--b-main-black-color;
}

.b-notification-unreaded {
  font-family: 'Inter';
  background: $--b-main-gray-color;
  border-radius: 100px;
  padding: 0px 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: fit-content;
  height: 20px;
  min-width: 20px;
  color: $--b-main-white-color;
  display: flex;
  align-items: center;
  justify-content: center;
}

.b-button-scroll__to-first-element {
  align-items: center;
  padding: 2px 12px;
  background: $color-efeff6;
  border-radius: 6px;
  img {
    margin-left: 12px;
  }
}
.b-notifications__tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $color-dfdeed;
  gap: 32px;
}
.b-read-all-notifications__button {
  border-bottom: 1px dashed $color-dfdeed;
  gap: 6px;
  cursor: pointer;
}
.b-notification-tab {
  display: flex;
  align-items: center;
  padding: 0px 4px 8px 8px;
  cursor: pointer;

  &.selected {
    border-bottom: 2px solid #262541;
  }
}
.b-notifictions-actions__button {
  display: flex;
  align-items: center;
  gap: 12px;
}
.b-selected-elements__max {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  /* or 185% */

  /* txt/primary */

  color: #262541;
}
</style>
