<template>
  <BugReportModal
    v-if="isBugReportModalOpened"
    @close-modal="closeBugReportModal"
  />
  <div class="b_sidebar_wrapper">
    <slide-menu
        v-if="activeSlideElement"
        :config="activeSlideElement"
        @openTab="openTab($event)"
    >

    </slide-menu>
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
                { 'b_sidebar_menu-item__disabled': item.disabled },
              ]"
              @click="clickByMenuItem(item)"
            >
              <Transition>
                <TabLabel
                  v-if="item.disabled && currentHoverSideBarItemID === item.uniqueName"
                  style="position: absolute; top: 8px"
                  :title="$t('profile.coming-soon-title')"
                  :text="$t('profile.coming-soon-text')"
                />
              </Transition>
              <router-link
                v-if="item.actionType && item.actionType.type === 'URL'"
                :to="item.actionType.url"
                @mouseenter="enterHoverSidebarItem(item.uniqueName)"
                @mouseleave="leaveHoverSidebarItem"
              >
                <img :src="item.icon" alt="" />
              </router-link>
              <a
                v-else
                @mouseenter="enterHoverSidebarItem(item.uniqueName)"
                @mouseleave="leaveHoverSidebarItem"
              >
                <img :src="item.icon.value || item.icon" />
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
  <!--<mobile-menu-->
    <!--v-if="isMobileMenuAvailableToOpen"-->
    <!--class="b_mobile-menu"-->
    <!--:isMenuActive="isMobMenuActive"-->
    <!--:notifications="paginationElements"-->
    <!--:notReadNotificationCount="notReadNotificationCount"-->
    <!--:newNotifications="skipids.length"-->
    <!--:total-notifications-count="allNotificationsCount"-->
    <!--@close="isMenuOpened = false"-->
    <!--@closed="paginationClearData()"-->
    <!--@loadingInfinite="loadDataNotifications(paginationPage + 1, $event)"-->
    <!--@reLoading="loadDataNotifications(1, null, true)"-->
    <!--@loading="loadDataNotifications(1, null, true)"-->
    <!--@close-menu="isMobMenuActive = false"-->
    <!--@foundBug="foundBug"-->
    <!--@showNewNotifications="loadDataNotifications(1, null, true, true)"-->
    <!--@changeTab="onChangeTab"-->
    <!--@removeNotifications="removeNotifications"-->
    <!--@logOut="logOut"-->
  <!--/>-->
</template>

<script>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import SlideMenu from '../SlideMenu/SlideMenu.vue';
import userAvatar from '../shared/userAvatar/UserAvatar.vue';
import BugReportModal from '../shared/modals/BugReportModal.vue';
import TabLabel from '../shared/tabLabel/TabLabel.vue';
import MobileMenu from './MobileMenu.vue';

import { useUserDataStore } from '../../stores/userData';
import {
  NotificationsBus,
  BlanballEventBus,
} from '../../workers/event-bus-worker';
import { useWindowWidth } from '../../utils/widthScreen';
import { logOut } from '../../utils/logOut';

import { ROUTES } from '../../router/router.const';

import { dinamicMenu } from "./menus/menu.config";


export default {
  name: 'MainSidebar',
  components: {
    SlideMenu,
    userAvatar,
    BugReportModal,
    TabLabel,
    MobileMenu,
  },
  setup() {
    const userStore = useUserDataStore();
    const isMobMenuActive = ref(false);
    const router = useRouter();
    const isMenuOpened = ref(false);
    const activeSlideElement = ref();
    const isBugReportModalOpened = ref(false);
    const currentHoverSideBarItemID = ref(0);
    const { onResize, isMobile, isTablet } = useWindowWidth();

    const foundBug = () => {
      isMobMenuActive.value = false;
      isBugReportModalOpened.value = true;
    };

    const isMobileMenuAvailableToOpen = computed(() => {
      return isMobile.value || isTablet.value;
    });

    const menuItems = dinamicMenu({
      router
    }).slideBarMenu;

    const closeBugReportModal = () => (isBugReportModalOpened.value = false);

    const enterHoverSidebarItem = (itemId) =>
      (currentHoverSideBarItemID.value = itemId);

    const leaveHoverSidebarItem = () => (currentHoverSideBarItemID.value = 0);

    const goToMainPage = () => {
      router.push(ROUTES.APPLICATION.index.path);
    };

    const goToProfile = () => {
      router.push(ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute);
      isMenuOpened.value = false;
    };

    BlanballEventBus.on('OpenMobileMenu', () => {
      isMobMenuActive.value = true;
    });

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      NotificationsBus.off('SidebarClearData');
      NotificationsBus.off('hanlderToRemoveNewNotificationsInSidebar');
      BlanballEventBus.off('OpenMobileMenu');
      // AuthWebSocketWorkerInstance.destroyCallback(handleMessageInSidebar); TODO
      window.removeEventListener('resize', onResize);
    });


    //
    // const removeNotifications = (ids) => {
    //   if (ids === 'All') {
    //     paginationElements.value = [];
    //   } else {
    //     paginationElements.value = paginationElements.value.filter(
    //       (item) => !ids.includes(item.notification_id)
    //     );
    //   }
    // };

    return {
      menuItems,
      isMobMenuActive,
      isMobileMenuAvailableToOpen,
      isMenuOpened,
      userStore,
      currentHoverSideBarItemID,
      isBugReportModalOpened,
      // removeNotifications,
      activeSlideElement,
      goToMainPage,
      leaveHoverSidebarItem,
      enterHoverSidebarItem,
      foundBug,
      goToProfile,
      logOut,
      closeBugReportModal,
      clickByMenuItem (item) {
        if(item.slideConfig) {
          activeSlideElement.value = item;
        }
        item.actionType && item.actionType.type === 'BUTTON' && item.actionType.action()
      },
      openTab(tabName) {
        const item = menuItems.value.find(item => item.findTab(tabName))
         if(item) item.openTab(tabName)
      }
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