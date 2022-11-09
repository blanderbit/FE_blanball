<template>
  <div class="b_sidebar_wrapper">
    <SlideMenu
        :notifications="notifications"
        :notReadNotificationCount="notReadNotificationCount"
        :newNotifications="skipids.length"
        @closed="clearData()"
        @loadingInfinite="loadDataNotifications(page + 1, $event)"
        @loadingDowngradeInfinite="loadDataNotifications(page - 1, $event)"
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
                v-for="item in menuItems"
                :key="item.id"
                :class="[
                    'b_sidebar_menu-item',
                     item.type !== 'notification' && { b_sidebar_active: item.isActive }
                 ]"
                @click="menuItemClick(item.id)"
            >
              <router-link :to="item.url">
                <img v-if="item.type === 'notification'"
                     :src="notReadNotificationCount ? item.img[0] : item.img[1]" alt=""/>
                <img v-else :src="item.img" alt=""/>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="b_sidebar_bottom-block">
        <div class="b_sidebar_picture-bottom">
          <img
              src="../assets/img/my-profile-pic.svg"
              alt=""
              @click="goToProfile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import SlideMenu from '../components/SlideMenu.vue'
  import { ref } from 'vue'
  import notification from '../assets/img/Notification.svg'
  import notificationUnread from '../assets/img/notificationUnread.svg'
  import record from '../assets/img/record.svg'
  import members from '../assets/img/members.svg'
  import { AuthWebSocketWorkerInstance } from "./../workers/web-socket-worker";
  import { API } from "../workers/api-worker/api.worker";
  import { PaginationWorker } from "../workers/pagination-worker";
  import { NotificationsBus } from "../workers/event-bus-worker";

  function createNotificationFromData(message) {
    const constructor = AuthWebSocketWorkerInstance.messages.find(item => item.messageType === message.message_type);

    if (constructor) {
      return new constructor(message)
    }
  }

  export default {
    name: 'MainSidebar',
    components: {
      SlideMenu,
    },
    setup() {
      const notReadNotificationCount = ref(0);
      const skipids = ref([]);

      const getNotificationsCount = async () => {
        return API.NotificationService
          .getNotificationsCount()
          .then(item => notReadNotificationCount.value = item.data.not_read_notifications_count || 0)
      };

      const {
        elements: notifications,
        loadNotification,
        clearData,
        page
      } = PaginationWorker({
        paginationDataRequest: (page) => API.NotificationService.getNotifications({ page, skipids: skipids.value}),
        dataTransformation: (item) => {
          item.notification_id = item.id;
          return createNotificationFromData(item);
        }
      });

      const loadDataNotifications = (pageNumber, $state, isNewNotifications) => {
        pageNumber = pageNumber < 1 ? 1 : pageNumber;
        if (pageNumber === page.value) return;
        loadNotification({ pageNumber, $state })
          .then(() => {
            if (isNewNotifications) {
              skipids.value = []
            }
          })
      };

      AuthWebSocketWorkerInstance
        .registerCallback((instanceType) => {
          if (instanceType.notification) {
            getNotificationsCount();
            skipids.value.push(instanceType.notification_id);
          }

          if (instanceType.updateWebSocketMessage) {
            instanceType.handleUpdate(notifications, getNotificationsCount)
          }
        });

      NotificationsBus.on('SidebarReloadLastLoadedPage', () => {
        loadDataNotifications(page.value);
      });


      getNotificationsCount();
      return {
        notifications,
        notReadNotificationCount,
        loading,
        skipids,
        loadDataNotifications,
        clearData,
        page
      }
    },
    data() {
      return {
        menuItems: [
          {
            id: 0,
            type: 'notification',
            img: [notificationUnread, notification],
            url: '',
            isActive: false, // should be dinamically
          },
          {
            id: 2,
            img: record,
            url: '/application/events',
            isActive: false,
          },
          {
            id: 4,
            img: members,
            url: '/application/users/general',
            isActive: false,
          },
        ],
      }
    },
    methods: {
      menuItemClick(id) {
        this.menuItems = this.menuItems
          .map((item) => ({...item, isActive: false}))
          .map((item) => {
            if (item.id === id) {
              return {
                ...item,
                isActive: true,
              }
            } else {
              return item
            }
          })
      },
      goToProfile() {
        this.$router.push('/application/profile/my-profile')
      },
    },
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
            border-radius: 6px;
            list-style: none;
            cursor: pointer;
            &.b_sidebar_active {
              background: #d3f8f7;
            }
            a {
              display: flex;
              height: 100%;
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