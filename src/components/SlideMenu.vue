<template>
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
              class="d-flex align-items-center"
              :style="{ opacity: selectedList.length ? '1' : '0' }"
            >
              <img
                src="../assets/img/cross.svg"
                height="10"
                alt=""
                class="me-2"
                @click="clearSelectedList"
              />
              <div class="d-flex">
                <div class="b-selected-elements__count me-1">
                  {{ selectedList.length }}
                </div>
                / {{ totalNotificationsCount }}
              </div>
            </div>
            <button @click=";(selectable = !selectable), clearSelectedList()">
              <span v-if="!selectable">Выбрать записи</span>
              <span v-else>Отменить выбор</span>
            </button>
          </div>
          <div class="d-flex mb-2">
            <button
              v-if="notifications.length"
              @click="HandleAction.deleteAll()"
              class="d-flex align-items-center"
            >
              <img
                src="../assets/img/notifications/trash.svg"
                alt=""
                height="16"
              />
              Удалить все
            </button>
            <button
              v-if="notifications.length && notReadNotificationCount"
              @click="HandleAction.readAll()"
              class="d-flex align-items-center"
            >
              <img
                src="../assets/img/notifications/double-check.svg"
                height="16"
                alt=""
              />
              Прочитать все
            </button>
            <button
              v-if="selectable && notifications.length && selectedList.length"
              @click="HandleAction.deleteSelected()"
              class="d-flex align-items-center"
            >
              <img
                src="../assets/img/notifications/trash.svg"
                height="16"
                alt=""
              />
              Удалить
            </button>
            <button
              v-if="selectable && notifications.length && selectedList.length"
              @click="HandleAction.readSelected()"
              class="d-flex align-items-center"
            >
              <img
                src="../assets/img/notifications/double-check.svg"
                height="16"
                alt=""
              />
              Прочитать
            </button>
          </div>
          <div class="d-flex">
            <div class="b-notifications-title me-1">
              {{ $t('slide_menu.notifications') }}
            </div>
            <div
              class="b-notification-unreaded d-flex align-items-center justify-content-center me-1"
              v-if="notReadNotificationCount"
            >
              {{ notReadNotificationCount }}
            </div>
          </div>
          <ul
            class="b_slide_menu_notification"
            :style="{
              height: `calc(100vh - ${selectable ? 95 : 60}px - 100px - 70px)`,
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
            >
              <template #before>
                <Notification
                  v-if="newNotifications"
                  class="b-new-notification"
                  :notificationInstance="getNewNotificationInstance"
                  :not-collapsible="true"
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
                      v-if="!notifications.length"
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
            <div class="b_slide_menu_name">{{ userFullName }}</div>
            <div class="b_slide_menu_position">тренер</div>
          </div>
          <div class="b_slide_menu_bottom-line">
            {{ $t('slide_menu.version') }}
            <router-link
              :to="routeObject.APPLICATION.VERSION.absolute"
              @click="$emit('close')"
            >
              <span>{{ clientVersion }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed, watch } from 'vue'
import { v4 as uuid } from 'uuid'

import Notifications from './sitebar-notifications/Notifications.vue'
import Notification from './Notification.vue'
import EmptyList from './EmptyList.vue'
import ScrollToTop from './ScrollToTop.vue'

import sidebarArrowBack from '../assets/img/sidebar-arrow-back.svg'
import sidebarArrow from '../assets/img/sidebar-arrow.svg'

import { useUserDataStore } from '../stores/userData'

import InfiniteLoading from '../workers/infinit-load-worker/InfiniteLoading.vue'
import { NewNotifications } from '../workers/web-socket-worker/not-includes-to-socket/new_notifications'
import { API } from '../workers/api-worker/api.worker'

import CONSTANTS from '../consts/index'
import { ROUTES } from '../router/router.const'

export default {
  components: {
    InfiniteLoading,
    Notification,
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
    const notificationList = ref()
    const selectable = ref(false)
    const blockScrollToTopIfExist = ref(false)
    const triggerForRestart = ref('')
    const selectedList = ref([])
    const store = useUserDataStore()
    const newNotificationInstance = ref(new NewNotifications())
    const clientVersion = ref(inject('clientVersion'))

    const userFullName = ref(`${store.user.profile.name} ${store.user.profile.last_name}`)

    watch(
      () => context.isMenuOpened,
      () => {
        if (!context.isMenuOpened) {
          emit('closed')
          selectedList.value = []
        }
      }
    )

    const arrowPosition = computed(() => {
      return context.isMenuOpened ? sidebarArrowBack : sidebarArrow
    })

    const routeObject = computed(() => {
      return ROUTES
    })

    function toggleMenu() {
      emit('update:isMenuOpened', !context.isMenuOpened)
    }

    const getNewNotificationInstance = computed(() => {
      newNotificationInstance.value.countOfNewNotifications =
        context.newNotifications
      return newNotificationInstance.value
    })

    const emptyListMessages = computed(() => {
      return {
        title: CONSTANTS.no_data_notifications.noNotifications.title,
        description:
          CONSTANTS.no_data_notifications.noNotifications.description,
      }
    })

    const clearSelectedList = () => {
      selectedList.value = []
    }

    const HandleAction = {
      deleteAll: () => {
        if (!context.notifications.length && !context.newNotifications) return
        API.NotificationService.deleteAllMyNotifications()
        clearSelectedList()
      },
      readAll: () => {
        if (!context.notifications.length && !context.newNotifications) return
        API.NotificationService.readAllMyNotifications()
        clearSelectedList()
      },
      deleteSelected: () => {
        if (!selectedList.value) return
        API.NotificationService.deleteNotifications(selectedList.value)
        clearSelectedList()
      },
      readSelected: () => {
        if (!selectedList.value) return
        API.NotificationService.readNotifications(selectedList.value)
        clearSelectedList()
      },
    }

    return {
      clientVersion,
      arrowPosition,
      toggleMenu,
      getNewNotificationInstance,
      emptyListMessages,
      routeObject,
      userFullName,
      selectedList,
      HandleAction,
      triggerForRestart,
      selectable,
      notificationList,
      blockScrollToTopIfExist,
      clearSelectedList,
      restartInfiniteScroll: () => {
        triggerForRestart.value = uuid()
      },
      scrollToFirstElement: () => {
        notificationList.value.scrollToFirstElement()
      },
    }
  },
}
</script>

<style lang="scss" scoped>
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
    background: #f0f0f4;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #8a8aa8;
  }
  .b_slide_menu_sidebar-arrow {
    position: absolute;
    width: 32px;
    height: 32px;
    right: -20px;
    top: 72px;
    background: #ffffff;
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
    padding: 24px 20px 0 20px;
    position: absolute;
    top: 0;
    right: 0px;
    height: 100vh;
    background: #fcfcfc;
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
        border-top: 1px solid #dfdeed;
        padding-top: 12px;
        .b_slide_menu_title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #575775;
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
            color: #262541;
            img {
              margin-right: 12px;
            }
          }
        }
      }
    }
    .b_slide_menu_bottom-block {
      padding: 16px 11px;
      border-top: 1px solid #dfdeed;
      .b_slide_menu_top-line {
        width: 100%;
        margin-bottom: 8px;
        .b_slide_menu_position {
          background: #e9f6ff;
          border-radius: 4px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #1c4fc5;
          width: fit-content;
          padding: 1px 4px;
        }
        .b_slide_menu_name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 24px;
          color: #262541;
        }
      }
      .b_slide_menu_bottom-line {
        text-align: left;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8a8aa8;

        span {
          text-decoration: none;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: #8a8aa8;
        }
      }
    }
  }
}

.b-new-notification {
  border-bottom: 1px solid #262541;
}

button {
  padding: 4px 8px;
  border: 1px solid #dfdeed;
  border-radius: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #262541;
  background: white;
  margin-right: 5px;
  img {
    margin-right: 3px;
  }
}

.b-selected-elements__count {
  background: #575775;
  border-radius: 6px;
  padding: 0px 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
}

.b-notifications-title {
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #262541;
}

.b-notification-unreaded {
  padding: 0px 4px;
  background: #575775;
  border-radius: 100px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
}

.b-button-scroll__to-first-element {
  align-items: center;
  padding: 2px 12px;
  background: #efeff6;
  border-radius: 6px;
  img {
    margin-left: 12px;
  }
}
</style>
