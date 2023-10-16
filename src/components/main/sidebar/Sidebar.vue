<template>
  <BugReportModal
    v-if="isBugReportModalOpened"
    @close-modal="closeBugReportModal"
  />
  <div class="b_sidebar_wrapper">
    <slide-menu :config="activeSlideElement" @openTab="openTab($event)" />
    <div class="b_sidebar">
      <div class="b_sidebar_top-block">
        <div class="b_sidebar_picture-top">
          <img
            class="b_sidebar_arrow"
            src="@images/open-sidebar-arrow.svg"
            alt=""
          />
          <img src="@images/my-profile-logo.svg" alt="" @click="goToMainPage" />
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
                  v-if="
                    item.disabled &&
                    currentHoverSideBarItemID === item.uniqueName
                  "
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
            <img src="@images/exit-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideMenu from '@mainComponents/slideMenu/SlideMenu.vue';
import userAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';
import BugReportModal from '@sharedComponents/modals/BugReportModal.vue';
import TabLabel from '@sharedComponents/tabLabel/TabLabel.vue';

import { useUserDataStore } from '@stores/userData';
import { logOut } from '@utils/logOut';

import { dinamicMenu } from './menus/menu.config';

export default {
  name: 'MainSidebar',
  components: {
    SlideMenu,
    userAvatar,
    BugReportModal,
    TabLabel,
  },
  setup() {
    const userStore = useUserDataStore();
    const router = useRouter();
    const isBugReportModalOpened = ref(false);
    const currentHoverSideBarItemID = ref(0);

    const activeSlideElement = ref();

    const menuItems = dinamicMenu({
      router,
    }).slideBarMenu;

    function setDefaultSlideMenu() {
      activeSlideElement.value = menuItems.value.find(
        (item) => item.uniqueName === 'notification.point'
      );
    }

    const closeBugReportModal = () => (isBugReportModalOpened.value = false);

    const enterHoverSidebarItem = (itemId) =>
      (currentHoverSideBarItemID.value = itemId);

    const leaveHoverSidebarItem = () => (currentHoverSideBarItemID.value = 0);

    const goToMainPage = () => {
      router.push(ROUTES.APPLICATION.index.path);
    };

    const goToProfile = () => {
      router.push(ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute);
    };

    const OpenMobileMenu = () => {
      clickByMenuItem(
        menuItems.value.find((item) => item.uniqueName === 'notification.point')
      );
    };

    const OpenBugReportModal = () => {
      isBugReportModalOpened.value = true;
    };

    const activateSlideMenuByUniqName = () => {
      clickByMenuItem(
        menuItems.value.find((item) => item.uniqueName === uniqueName)
      );
    };

    EventBusInstance.on('OpenMobileMenu', OpenMobileMenu);
    EventBusInstance.on('OpenBugReportModal', OpenBugReportModal);
    EventBusInstance.on(
      'activateSlideMenuByUniqName',
      activateSlideMenuByUniqName
    );

    onBeforeUnmount(() => {
      EventBusInstance.off('OpenMobileMenu', OpenMobileMenu);
      EventBusInstance.off(
        'activateSlideMenuByUniqName',
        activateSlideMenuByUniqName
      );
      EventBusInstance.off('OpenBugReportModal', OpenBugReportModal);
    });

    function clickByMenuItem(item) {
      if (item.slideConfig) {
        activeSlideElement.value = item;
      } else if (!item.slideConfig) {
        setDefaultSlideMenu();
      }
      if (typeof item.actionType?.action === 'function') {
        item.actionType.action();
      }
    }

    setDefaultSlideMenu();

    return {
      menuItems,
      userStore,
      currentHoverSideBarItemID,
      // removeNotifications,
      activeSlideElement,
      isBugReportModalOpened,
      goToMainPage,
      leaveHoverSidebarItem,
      enterHoverSidebarItem,
      goToProfile,
      logOut,
      closeBugReportModal,
      clickByMenuItem,
      openTab(tabName) {
        const item = menuItems.value.find((item) => item.findTab(tabName));
        if (item) item.openTab(tabName);
      },
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

  .b_sidebar {
    position: relative;
    @include calc-height;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    padding-top: 24px;
    padding-bottom: 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 12;
    background: $--b-main-white-color;

    @include allDevicesBeforeDesktop {
      display: none;
    }

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
              max-width: 20px;
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

.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: opacity 0.4s ease;
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  opacity: 0;
}

.b_mobile-menu {
  @include desktopDevice {
    display: none;
  }
}
</style>
