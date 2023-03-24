<template>
  <Loading :is-loading="loading" />
  <div class="b-mob-menu" :style="mobMenuStyle">
    <div class="b-mob-menu__logo-block">
      <div class="b-mob-menu__logo-left">
        <div class="b-mob-menu__logo">{{ $t('menu.blanball') }}</div>
        <div class="b-mob-menu__version">
          {{ $t('slide_menu.version') }}
          <router-link
            :to="routeObject.APPLICATION.VERSION.absolute"
            @click="$emit('close')"
          >
            <span>{{ clientVersion }}</span>
          </router-link>
        </div>
      </div>
      <div class="b-mob-menu__close" @click="closeMobMenu">&times;</div>
    </div>
    <div class="b-mob-menu__user-data">
      <div class="b-mob-menu__user-info">
        <div class="b-mob-menu__user-img">
          <Avatar
            :link="userStore.getUserAvatar"
            :full-name="userStore.getUserFullName"
          >
          </Avatar>
        </div>
        <div class="b-mob-menu__text-block">
          <div class="b-mob-menu__user-name">
            {{ userStore.getUserFullName }}
          </div>
          <div class="b-mob-menu__account-type">
            {{ $t(`hashtags.${userStore.user.role}`) }}
          </div>
        </div>
      </div>
      <div class="b-mob-menu__logout-icon" @click="logOut">
        <img src="../assets/img/logout-icon.svg" alt="" />
      </div>
    </div>
    <div class="b-mob-menu__menu-block" :style="menuBlockStyle">
      <div class="b-mob-menu__line">
        <div
          class="b-mob-menu__menu-item"
          v-for="item in topMenu"
          :key="item.id"
          :style="{
            width: item.width,
            height: item.height,
            'justify-content': item.alignement,
            background: item.background,
          }"
          @click="lineMenuClick(item.id, item.url, 'top-menu')"
        >
          <img
            :src="item.isIconActive ? item.imgActive : item.imgInactive"
            alt=""
          />
          <span
            :style="{
              color: item.textColor,
            }"
            v-if="item.value_show"
          >
            {{ item.value }}
          </span>
        </div>
      </div>
      <div class="b-mob-menu__content-block">
        <div class="b-mob-menu__message-list">
          <div class="b-mob-menu__tabs">
            <div
              v-for="tab in tabs"
              :class="[
                'b-mob-menu__tab',
                { selected: tab.id === selectedTabId },
              ]"
              @click="changeTab(tab.id, tab.type)"
            >
              {{ $t(tab.text) }}
            </div>
          </div>
          <Notifications
            :notifications="notifications"
            :selectable="selectable"
            ref="notificationList"
            :deletable="false"
            v-model:selected-list="selectedList"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
            @selectNotificationAfterHold="selectNotification"
            @removePushNotificationAfterSidebarAction="
              removePushNotificationAfterSidebarAction
            "
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
                    style="margin-top: 16px"
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
        </div>
      </div>
      <div v-if="!selectedList.length" class="b-mob-menu__line">
        <div
          class="b-mob-menu__menu-item"
          v-for="item in bottomMenu"
          :key="item.id"
          :style="{
            width: item.width,
            height: item.height,
            'justify-content': item.alignement,
            background: item.background,
            color: item.textColor,
          }"
          @click="lineMenuClick(item.id, item.url)"
        >
          <img
            :src="item.isIconActive ? item.imgActive : item.imgInactive"
            alt=""
          />
          <span v-if="item.value_show">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="selectedList.length" class="b-mob-menu__control-block">
      <div class="b-control-block__block">
        <img src="../assets/img/cross.svg" alt="" 
          @click="clearSelectedList"/>
        <div class="b-selected-elements-count">
          <span>{{ selectedList.length }}</span>
        </div>
      </div>
      <div class="b-control-block__block">
        <img src="../assets/img/notifications/double-check-with-back.svg" alt=""
          @click="HandleAction.readSelected()" />
        <img src="../assets/img/notifications/trash-with-back.svg" alt="" 
          @click="HandleAction.deleteSelected()"/>
      </div>
    </div>
    <div
      v-if="isShowingFoundBug"
      class="b-mob-menu__found-error"
      @click="$emit('foundBug')"
    >
      <img src="../assets/img/white-warning-icon.svg" alt="" />
      <span>Знайшли помилку?</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { v4 as uuid } from 'uuid';

import Avatar from './Avatar.vue';
import Notifications from './sitebar-notifications/Notifications.vue';
import Notification from './Notification.vue';
import EmptyList from './EmptyList.vue';
import InfiniteLoading from '../workers/infinit-load-worker/InfiniteLoading.vue';
import ScrollToTop from './ScrollToTop.vue';
import Loading from '../workers/loading-worker/Loading.vue';

import { TokenWorker } from '../workers/token-worker';
import { useUserDataStore } from '../stores/userData';
import { NewNotifications } from '../workers/web-socket-worker/not-includes-to-socket/new_notifications';
import { API } from '../workers/api-worker/api.worker';
import { NotificationsBus } from '../workers/event-bus-worker';

import { ROUTES } from '../router/router.const';

import NotificationIcon from '../assets/img/notification-mob-default.svg';
import NotificationWhite from '../assets/img/notifications-not-read-mobile-icon.svg';
import Record from '../assets/img/record.svg';
import RecordWhite from '../assets/img/record-white.svg';
import Members from '../assets/img/members.svg';
import MembersWhite from '../assets/img/members-white.svg';
import Settings from '../assets/img/settings.svg';
import SettingsWhite from '../assets/img/settings-white.svg';

export default {
  name: 'MobileMenu',
  props: {
    isMenuActive: {
      type: Boolean,
      default: false,
    },
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
  },
  components: {
    Avatar,
    Notifications,
    Notification,
    EmptyList,
    InfiniteLoading,
    ScrollToTop,
    Loading,
  },
  emit: ['closeMenu'],
  setup(props, { emit }) {
    const router = useRouter();
    const userStore = useUserDataStore();
    const notificationList = ref();
    const selectable = ref(false);
    const loading = ref(false);
    const newNotificationInstance = ref(new NewNotifications());
    const selectedList = ref([]);
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref('');
    const isShowingFoundBug = ref(true);
    const clientVersion = ref(inject('clientVersion'));
    const { t } = useI18n();
    const selectedTabId = ref(1);

    const topMenu = ref([
      {
        id: 0,
        value: 'Сповіщення',
        value_show: true,
        imgInactive: NotificationIcon,
        imgActive: NotificationWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        textColor: '#262541',
      },
      {
        id: 1,
        value: 'Події',
        value_show: true,
        imgInactive: Record,
        imgActive: RecordWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        url: ROUTES.APPLICATION.EVENTS.absolute,
      },
    ]);
    const bottomMenu = ref([
      {
        id: 0,
        value: 'Рейтинг користувачів',
        value_show: true,
        imgInactive: Members,
        imgActive: MembersWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
      },
      {
        id: 1,
        value: 'Налаштуваня',
        value_show: true,
        imgInactive: Settings,
        imgActive: SettingsWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
      },
    ]);

    const emptyListMessages = computed(() => {
      return {
        title: t('no_records.noNotifications.title'),
        description: t('no_records.noNotifications.description'),
      };
    });

    const getNewNotificationInstance = computed(() => {
      newNotificationInstance.value.countOfNewNotifications =
        props.newNotifications;
      return newNotificationInstance.value;
    });

    const tabs = computed(() => [
      {
        id: 1,
        text: 'slide_menu.all-notifications',
        type: 'AllNotifications',
      },
      {
        id: 2,
        text: 'slide_menu.not-read',
        type: 'NotReadNotifications',
      },
    ]);

    const menuBlockHeight = ref('auto');
    const menuBlockStyle = computed(() => {
      return {
        height: menuBlockHeight.value,
        'border-radius': `${selectedList.value.length ? 0 : 8}px`
      };
    });
    const mobMenuStyle = computed(() => {
      return {
        transform: `translateX(${props.isMenuActive ? 0 : -100}%)`,
        'padding-bottom': `${selectedList.value.length ? 12 : 16}px`,
      };
    });
    const routeObject = computed(() => {
      return ROUTES;
    });

    watch(selectedList.length,
      () => {
        if (selectedList.value.length === 0) {
          selectable.value = false
        }
      }
    );

    function closeMobMenu() {
      normalizeBlock(topMenu);
      normalizeBlock(bottomMenu);
      menuBlockHeight.value = 'auto';
      emit('closeMenu');
      isShowingFoundBug.value = true;
    }
    function normalizeBlock(menu) {
      menu.value = menu.value.map((item) => {
        return {
          ...item,
          value_show: true,
          isIconActive: false,
          width: '50%',
          height: '76px',
          alignement: 'flex-start',
          background: '#FFFFFF',
          textColor: '#575775',
        };
      });
    }
    function lineMenuClick(id, url, menuType) {
      if (url) {
        router.push(url);
        closeMobMenu();
        return;
      }
      menuBlockHeight.value = '100%';
      const currentlyClickedMenu =
        menuType === 'top-menu' ? topMenu : bottomMenu;
      const spareMenu = menuType === 'top-menu' ? bottomMenu : topMenu;
      const spareId = id ? 0 : 1;
      isShowingFoundBug.value = false;

      normalizeBlock(spareMenu);

      currentlyClickedMenu.value = currentlyClickedMenu.value.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value_show: true,
            isIconActive: true,
            width: '80%',
            height: '52px',
            alignement: 'flex-start',
            background: '#575775',
            textColor: '#fff',
          };
        } else {
          return item;
        }
      });
      currentlyClickedMenu.value = currentlyClickedMenu.value.map((item) => {
        if (item.id === spareId) {
          return {
            ...item,
            value_show: false,
            isIconActive: false,
            width: '20%',
            height: '52px',
            alignement: 'center',
            background: '#FFFFFF',
            textColor: '#575775',
          };
        } else {
          return item;
        }
      });
    }

    const startLoader = () => {
      loading.value = true;
    };

    const stopLoader = () => {
      loading.value = false;
    };

    const clearSelectedList = () => {
      selectedList.value = [];
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
        removePushNotificationAfterSidebarAction({
          remove_all: true,
        });
        clearSelectedList();
        handleSelectableMode();
        stopLoader();
      },
      readAll: async () => {
        if (!context.notifications.length && !context.newNotifications) return;
        startLoader();
        await API.NotificationService.readAllMyNotifications();
        removePushNotificationAfterSidebarAction({
          remove_all: true,
        });
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
        removePushNotificationAfterSidebarAction({
          notification_ids: [...selectedList.value],
        });
        clearSelectedList();
        handleSelectableMode();
        // closeSubmitModal();
        stopLoader();
      },
      readSelected: async () => {
        if (!selectedList.value) return;
        startLoader();
        await API.NotificationService.readNotifications(selectedList.value);
        removePushNotificationAfterSidebarAction({
          notification_ids: [...selectedList.value],
        });
        if (selectedTabId.value === 2) {
          emit('reLoading')
        }
        clearSelectedList();
        handleSelectableMode();
        stopLoader();
      },
      deleteOne: async (id) => {
        startLoader();
        await API.NotificationService.deleteNotifications([id]);
        removePushNotificationAfterSidebarAction({
          notification_id: id,
        });
        stopLoader();
      },
    };

    const removePushNotificationAfterSidebarAction = (notificationInstance) => {
      NotificationsBus.emit(
        'removePushNotificationAfterSidebarAction',
        notificationInstance
      );
    };

    function selectNotification(notificationId) {
      selectable.value = true
      selectedList.value.push(notificationId)
    }


    function restartInfiniteScroll() {
      triggerForRestart.value = uuid();
    }

    const changeTab = (tabId, tabType) => {
      if (tabId !== selectedTabId.value && !selectable.value) {
        selectedTabId.value = tabId;
        emit('changeTab', tabType);
        restartInfiniteScroll();
      }
    };

    const logOut = () => {
      TokenWorker.clearToken();
      router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute);
    };

    return {
      topMenu,
      selectable,
      emptyListMessages,
      selectedList,
      bottomMenu,
      blockScrollToTopIfExist,
      clientVersion,
      isShowingFoundBug,
      notificationList,
      getNewNotificationInstance,
      menuBlockStyle,
      userStore,
      mobMenuStyle,
      routeObject,
      HandleAction,
      tabs,
      loading,
      selectedTabId,
      triggerForRestart,
      changeTab,
      clearSelectedList,
      lineMenuClick,
      selectNotification,
      closeMobMenu,
      removePushNotificationAfterSidebarAction,
      logOut,
      restartInfiniteScroll,
      scrollToFirstElement: () => {
        notificationList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-efeff6: #efeff6;
$color-8a8aa8: #8a8aa8;
$color-148581: #148581;
$color-dfdeed: #dfdeed;
$color-1ccd62: #1ccd62;

.b-mob-menu__wrapper {
  height: 100%;
}
.b-mob-menu {
  position: fixed;
  background: $color-efeff6;
  padding: 16px;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-out;

  @media (max-width: 992px) {
    width: 70%;
  }
  @include mobile {
    width: 100%;
  }

  .b-mob-menu__logo-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .b-mob-menu__logo-left {
      display: flex;
      align-items: center;
      gap: 20px;
      .b-mob-menu__logo {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 32px;
        color: $--b-main-black-color;
      }
      .b-mob-menu__version {
        @include inter(12px, 400, $color-8a8aa8);
        line-height: 16px;

        display: flex;
        align-items: center;
        text-align: center;
        margin-top: 10px;
        cursor: pointer;

        span {
          text-decoration: none;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: $color-8a8aa8;
        }
      }
    }
    .b-mob-menu__close {
      font-size: 28px;
      cursor: pointer;
    }
  }
  .b-mob-menu__user-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: $--b-main-white-color;
    border-radius: 8px;
    .b-mob-menu__user-info {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .b-mob-menu__user-img {
      img {
        display: block;
      }
    }

    .b-mob-menu__text-block {
      .b-mob-menu__user-name {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 800;
        font-size: 18px;
        line-height: 24px;
        color: $--b-main-black-color;
      }
      .b-mob-menu__account-type {
        @include inter(12px, 500, $color-148581);
        line-height: 20px;
      }
    }

    .b-mob-menu__logout-icon {
      img {
        display: block;
      }
    }
  }
  .b-mob-menu__menu-block {
    margin-top: 16px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease-out;
    .b-mob-menu__line {
      display: flex;
      border-bottom: 1.5px solid $color-dfdeed;
      &:last-child {
        border: none;
      }
      .b-mob-menu__menu-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 16px;
        border-right: 1.5px solid $color-dfdeed;
        transition: all 0.3s ease-out;
        &:last-child {
          border: none;
        }
        img {
          width: 21.5px;
          height: 21.5px;
        }
        span {
          @include inter(12px, 500);
          line-height: 16px;
          margin-left: 13px;
        }
      }
    }
    .b-mob-menu__content-block {
      background: $--b-main-white-color;
      height: 100%;
      position: relative;
      overflow-y: scroll;
      transition: all 0.3s ease-out;
      .b-mob-menu__message-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .b-mob-menu__tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;

          .b-mob-menu__tab {
            line-height: 20px;
            padding: 12px 0px;
            cursor: pointer;
            @include inter(13px, 400);

            &.selected {
              @include inter(13px, 500);
              border-bottom: 2px solid $--b-main-black-color;
              padding: 6px 0px;
            }
          }
        }
        .b-mob-menu__message {
          padding: 14px 12px;
          display: flex;
          border-bottom: 1px solid $color-efeff6;
          .b-mob-menu__left-side {
            margin-right: 12px;
            position: relative;
            .b-mob-menu__is-user-active {
              width: 10px;
              height: 10px;
              position: absolute;
              right: 0;
              bottom: 4px;
              background: $color-1ccd62;
              border: 2px solid $--b-main-white-color;
              border-radius: 50%;
            }
          }

          .b-mob-menu__right-side {
            width: 100%;
            .b-mob-menu__top-line {
              @include inter(14px, 400, $color-8a8aa8);
              line-height: 20px;

              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 4px;
            }

            .b-mob-menu__bottom-line {
              display: flex;
              align-items: center;
              justify-content: space-between;
              @include inter(14px, 600, $color-8a8aa8);
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
.b-mob-menu__control-block {
  background: #fff;
  width: 100%;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  padding: 12px;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .b-control-block__block {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 12px;

    .b-selected-elements-count {
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
  }
}
.b-mob-menu__found-error {
  background: $--b-main-gray-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  padding: 4px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  max-width: 193px;
  position: absolute;
  min-width: max-content;
  bottom: 70px;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);

  span {
    @include inter(14px, 500, $--b-main-white-color);
    line-height: 24px;
  }
}
</style>
