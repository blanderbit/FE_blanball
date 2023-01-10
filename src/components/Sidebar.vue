<template>
  <div class="b_sidebar_wrapper">
    <SlideMenu
        v-model:is-menu-opened="isMenuOpened"
        :notifications="paginationElements"
        :notReadNotificationCount="notReadNotificationCount"
        :newNotifications="skipids.length"
        :total-notifications-count="paginationTotalCount"
        @closed="paginationClearData()"
        @loadingInfinite="loadDataNotifications(paginationPage + 1, $event)"
        @reLoading="loadDataNotifications(1, null, true)"
        @loading="loadDataNotifications(1, null, true)"
    />
    <div class="b_sidebar">
      <div class="b_sidebar_top-block">
        <div class="b_sidebar_picture-top">
          <img src="../assets/img/my-profile-logo.svg" alt=""/>
        </div>
        <div class="b_sidebar_menu-block">
          <ul>
            <li
                v-for="(item, index) in menuItems"
                :key="index"
                :class="[
                    'b_sidebar_menu-item',
                ]"
                @click="item.action && item.action()"
            >
              <router-link v-if="item.url" :to="item.url">
                <img :src="item.img" alt=""/>
              </router-link>

              <a v-else>
                <img :src="item.img">
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="b_sidebar_bottom-block">
        <div class="b_sidebar_picture-bottom">
          <avatar
              full-name="Yaroslav Makovskyi"
              @click="goToProfile"
          ></avatar>
          <div @click="logOut" class="b_sidebar_logout d-flex justify-content-center align-items-center">
            <img src="../assets/img/exit-icon.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserDataStore } from '../stores/userData'
  import { useEventDataStore } from '../stores/eventsData'

  import SlideMenu from '../components/SlideMenu.vue'
  import Avatar from './../components/Avatar.vue'

  import { createNotificationFromData } from "../workers/utils-worker";
  import { AuthWebSocketWorkerInstance } from "./../workers/web-socket-worker";
  import { API } from "../workers/api-worker/api.worker";
  import { PaginationWorker } from "../workers/pagination-worker";
  import { NotificationsBus } from "../workers/event-bus-worker";


  import notification from '../assets/img/Notification.svg'
  import notificationUnread from '../assets/img/notificationUnread.svg'
  import record from '../assets/img/record.svg'
  import members from '../assets/img/members.svg'
  import medal from '../assets/img/medal.svg'
  import settings from '../assets/img/Settings.svg'
  import { TokenWorker } from "../workers/token-worker";
  import { ROUTES } from "../router/router.const";
  const findDublicates = (list, newList) => {
    return newList.filter(item => list.length ? !list.find(oldItem => oldItem.notification_id === item.notification_id) : true)
  }

  export default {
    name: 'MainSidebar',
    components: {
      SlideMenu,
      Avatar
    },
    setup() {
      const userStore = useUserDataStore()
      const eventStore = useEventDataStore()
      const notReadNotificationCount = ref(0);
      const skipids = ref([]);
      const router = useRouter();
      const isMenuOpened = ref(false);
      const menuItems = computed(() => [
        {
          img: notReadNotificationCount.value ? notificationUnread : notification,
          action: () => isMenuOpened.value = true
        },
        {
          img: record,
          url: '/application/events',
          action: () => isMenuOpened.value = false
        },
        {
          img: medal,
          url: '',
          action: () => isMenuOpened.value = false
        },
        {
          img: members,
          url: '/application/users/general',
          action: () => isMenuOpened.value = false
        },
        {
          img: settings,
          url: '',
          action: () => isMenuOpened.value = false
        }
      ]);

      const getNotificationsCount = async () => API.NotificationService
        .getNotificationsCount()
        .then(item => notReadNotificationCount.value = item.data.not_read_notifications_count || 0);

      const {
        paginationElements,
        paginationPage,
        paginationTotalCount,
        paginationClearData,
        paginationLoad
      } = PaginationWorker({
        paginationDataRequest: (page) => API.NotificationService.getNotifications({page, skipids: skipids.value}),
        dataTransformation: (item) => createNotificationFromData(item),
        beforeConcat: (elements, newList) => findDublicates(elements, newList)
      });

      const loadDataNotifications = (pageNumber, $state, forceUpdate) => {
        if (forceUpdate) {
          paginationClearData();
          skipids.value = []
        }

        paginationLoad({pageNumber, $state, forceUpdate})
      };

      const handleMessageInSidebar = (instanceType) => {
        if (instanceType.notification) {
          skipids.value.push(instanceType.notification_id);
        }

        if (instanceType.updateWebSocketMessage) {
          instanceType.handleUpdate({
            paginationElements,
            paginationLoad,
            paginationPage
          }, getNotificationsCount)
        }

        getNotificationsCount();
      };

      const goToProfile = () => router.push(ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute);

      AuthWebSocketWorkerInstance
        .registerCallback(handleMessageInSidebar);

      NotificationsBus.on('SidebarClearData', () => {
        skipids.value = [];
        paginationClearData()
      });

      onBeforeUnmount(() => {
        NotificationsBus.off('SidebarClearData');
        AuthWebSocketWorkerInstance.destroyCallback(handleMessageInSidebar)
      });

      getNotificationsCount();
      const logOut = () => {
        userStore.user = {}
        eventStore.events = {}
        TokenWorker.clearToken();
        router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute)
      }
      return {
        paginationElements,
        paginationTotalCount,
        paginationPage,
        notReadNotificationCount,
        skipids,
        menuItems,
        isMenuOpened,
        loadDataNotifications,
        paginationClearData,
        goToProfile,
        logOut
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b_sidebar_wrapper {
    position: relative;
    @media (max-width: 992px) {
      display: none;
    }
    .b_sidebar {
      position: relative;
      height: 100vh;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      padding-top: 24px;
      padding-bottom: 44px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
      background: #ffffff;
      .b_sidebar_picture-bottom {
        background: #EFEFF6;
        border-radius: 24px;
        padding: 4px;
        .b-avatar {
          cursor: pointer;
        }
        .b_sidebar_logout {
          margin-top: 6px;
          width: 40px;
          height: 40px;
          background: #FFFFFF;
          border: 1px solid #EFEFF6;
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
          img {
            margin: auto;
          }
        }
        .b_sidebar_menu-block {
          .b_sidebar_menu-item {
            width: 40px;
            height: 40px;
            list-style: none;
            cursor: pointer;
            transition: 0.3s all;
            .router-link-active {
              background: #d3f8f7;
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
</style>