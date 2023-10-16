<template>
  <ContextModal
    v-if="isMenuOpened && isPrivacyContextModalOpened"
    :clientX="privacyContextModalX"
    :clientY="privacyContextModalY"
    :modalItems="privacyContextModalItems"
    @closeModal="closePrivacyContextModal"
    @itemClick="privacyContextModalItemClick"
  />
  <div>
    <div
      v-if="isMenuOpened && menuClosable"
      class="b_slide_menu_back"
      @click="toggleMenu"
    ></div>

    <div class="b_slide_menu_wrapper" :style="slideMenuWrapperStyle">
      <div
        v-if="isMenuOpened && menuClosable"
        class="b_slide_menu_sidebar-arrow"
        @click="toggleMenu"
      >
        <img :src="arrowPosition" alt="" />
      </div>
      <div
        class="b_slide_menu_main"
        :style="slideMenuMainSideStyle"
        ref="SLIDE_MENU_WRAPPER_ALL_BLOCK"
      >
        <div class="b_slide_menu_top-block" ref="SLIDE_MENU_WRAPPER_TOP_BLOCK">
          <div class="b_slide_menu_logo">
            <slot v-if="isSlideMenuWrapperDesktop" name="logo"></slot>
            <div v-else class="b-slide_menu_mobile-logo">
              {{ $t('menu.blanball') }}
              <img src="@images/cross.svg" alt="" @click="toggleMenu" />
            </div>
          </div>
          <div class="b_slide_menu-top-side">
            <slot v-if="isSlideMenuWrapperDesktop" name="top-side"></slot>
            <div v-else class="b-slide_menu_mobile__user-data">
              <div class="b-slide_menu_mobile__user-info">
                <div class="b-slide_menu_mobile__user-img">
                  <userAvatar
                    :link="userStore.getUserAvatar"
                    :full-name="userStore.getUserFullName"
                    @clickByAvatar="goToMyProfile"
                  />
                </div>
                <div class="b-slide_menu_mobile__text-block">
                  <div
                    class="b-slide_menu_mobile__user-name"
                    @click="goToMyProfile"
                  >
                    {{ userStore.getUserFullName }}
                  </div>
                  <div class="b-slide_menu_mobile__account-type">
                    {{ $t(`hashtags.${userStore.user.role}`) }}
                  </div>
                </div>
              </div>
              <div class="b-slide_menu_mobile__logout-icon" @click="logOut">
                <img src="@images/logout-icon.svg" alt="" />
              </div>
            </div>
          </div>

          <slot
            v-if="isSlideMenuWrapperDesktop"
            name="tabs"
            class="b_slide_menu_tabs"
          >
          </slot>
        </div>
        <ul>
          <div v-if="isSlideMenuWrapperDesktop">
            <slot name="main-content"></slot>
          </div>

          <MobileMenuSlideMenuMainContent
            v-else
            ref="SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK"
            :mainContentHeight="slideMenuWrapperMainContentHeight"
            @closeMenu="toggleMenu"
          >
            <template #tabs>
              <slot name="tabs" class="b_slide_menu_tabs"> </slot>
            </template>

            <template #main-content>
              <slot name="main-content"></slot>
            </template>
          </MobileMenuSlideMenuMainContent>
        </ul>
        <div
          class="b_slide_menu_bottom-block"
          ref="SLIDE_MENU_WRAPPER_BOTTOM_BLOCK"
        >
          <slot v-if="isSlideMenuWrapperDesktop" name="bottom-block"> </slot>
          <MobileMenuSlideMenuBottomBlock
            v-if="isSlideMenuMobileBottomBlockVisible"
            @closeMenu="toggleMenu"
            @showPrivacyContextModal="showPrivacyContextModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContextModal from '@sharedComponents/modals/ContextModal.vue';
import UserAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';
import MobileMenuSlideMenuMainContent from './MobileMenuSlideMenuMainContent.vue';
import MobileMenuSlideMenuBottomBlock from './MobileMenuSlideMenuBottomBlock.vue';

import sidebarArrowBack from '@images/sidebar-arrow-back.svg';
import sidebarArrow from '@images/sidebar-arrow.svg';

import { useWindowWidth } from '@workers/window-size-worker/widthScreen';
import { logOut } from '@utils/logOut';
import { useUserDataStore } from '@stores/userData';

const SLIDE_MENU_MAIN_SIDE_PADDING = 32;
const SLIDE_MENU_TRANSITION_DELAY_MS = 0.7;
const SLIDE_MENU_TRANSITION_DELAY_MS_MOBILE = 0.3;

export default {
  components: {
    ContextModal,
    UserAvatar,
    MobileMenuSlideMenuMainContent,
    MobileMenuSlideMenuBottomBlock,
  },
  props: {
    isMenuOpened: {
      type: Boolean,
      default: false,
    },
    mainSideWidth: {
      type: Number,
      required: true,
    },
    menuClosable: {
      type: Boolean,
      default: true,
    },
    slideMenuWrapperAnimation: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup(context, { emit, expose }) {
    const SLIDE_MENU_WRAPPER_BOTTOM_BLOCK = ref();
    const SLIDE_MENU_WRAPPER_TOP_BLOCK = ref();
    const SLIDE_MENU_WRAPPER_ALL_BLOCK = ref();
    const SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK = ref();
    const slideMenuVisibilityStyle = ref('hidden');

    const userStore = useUserDataStore();

    const { detectedDevice, DEVICE_TYPES } = useWindowWidth();

    const isSlideMenuWrapperDesktop = computed(() => {
      return [
        DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP,
        DEVICE_TYPES.DESKTOP,
      ].includes(detectedDevice.value);
    });

    const isSlideMenuMobileBottomBlockVisible = computed(() => {
      return (
        !isSlideMenuWrapperDesktop.value &&
        SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK.value?.isBottomBlockShowing
      );
    });

    const {
      width: SLIDE_MENU_WRAPPER_BOTTOM_BLOCK_WIDTH,
      height: SLIDE_MENU_WRAPPER_BOTTOM_BLOCK_HEIGHT,
    } = useElementSize(SLIDE_MENU_WRAPPER_BOTTOM_BLOCK);

    const {
      width: SLIDE_MENU_WRAPPER_TOP_BLOCK_WIDTH,
      height: SLIDE_MENU_WRAPPER_TOP_BLOCK_HEIGHT,
    } = useElementSize(SLIDE_MENU_WRAPPER_TOP_BLOCK);

    const {
      width: SLIDE_MENU_WRAPPER_ALL_BLOCK_WIDTH,
      height: SLIDE_MENU_WRAPPER_ALL_BLOCK_HEIGHT,
    } = useElementSize(SLIDE_MENU_WRAPPER_ALL_BLOCK);

    const slideMenuMainSideWidth = computed(() => {
      if (isSlideMenuWrapperDesktop.value) {
        return context.mainSideWidth;
      }
      return (
        SLIDE_MENU_WRAPPER_ALL_BLOCK_WIDTH.value + SLIDE_MENU_MAIN_SIDE_PADDING
      );
    });

    const router = useRouter();
    const isPrivacyContextModalOpened = ref(false);
    const privacyContextModalX = ref(null);
    const privacyContextModalY = ref(null);

    const arrowPosition = computed(() => {
      return context.isMenuOpened ? sidebarArrowBack : sidebarArrow;
    });

    const privacyContextModalItems = ref(CONSTS.policy.ALL_POLICY_ITEMS);

    function showPrivacyContextModal(e) {
      privacyContextModalX.value = e.clientX;
      privacyContextModalY.value = e.clientY;
      isPrivacyContextModalOpened.value = true;
    }

    function closePrivacyContextModal() {
      isPrivacyContextModalOpened.value = false;
    }

    function toggleMenu() {
      emit('close');
    }

    function privacyContextModalItemClick(itemType) {
      switch (itemType) {
        case CONSTS.policy.POLICY_ITEMS_TYPES.PRIVACY:
          return router.push(ROUTES.PRIVACY_POLICY.absolute);
        case CONSTS.policy.POLICY_ITEMS_TYPES.COOKIE:
          return router.push(ROUTES.COOKIE_POLICY.absolute);
        case CONSTS.policy.POLICY_ITEMS_TYPES.DISCLAMER:
          return router.push(ROUTES.DISCLAMER.absolute);
      }
    }

    function goToMyProfile() {
      router.push(ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute);
      toggleMenu();
    }

    const slideMenuWrapperStyle = computed(() => {
      if (isSlideMenuWrapperDesktop.value) {
        return {
          transition: `all ${
            context.slideMenuWrapperAnimation
              ? SLIDE_MENU_TRANSITION_DELAY_MS
              : 0
          }s ease`,
          right: context.isMenuOpened
            ? `-${slideMenuMainSideWidth.value}px`
            : '0px',
        };
      }
    });

    const slideMenuMainSideStyle = computed(() => {
      if (!isSlideMenuWrapperDesktop.value) {
        return {
          visibility: slideMenuVisibilityStyle.value,
          left: !context.isMenuOpened
            ? `-${slideMenuMainSideWidth.value}px`
            : '0px',
        };
      }
      return {
        visibility: slideMenuVisibilityStyle.value,
        width: `${slideMenuMainSideWidth.value}px`,
      };
    });

    const slideMenuMainSideMobileBlock = computed(() => {
      if (
        SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK?.value &&
        SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK?.value
      ) {
        return (
          SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK.value
            .MOBILE_MENU_TOP_LINE_BLOCK_HEIGHT +
          SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK.value
            .MOBILE_MENU_BOTTOM_LINE_BLOCK_HEIGHT +
          SLIDE_MENU_MAIN_SIDE_PADDING
        );
      }
      return 0;
    });

    const slideMenuWrapperMainContentHeight = computed(() => {
      return (
        SLIDE_MENU_WRAPPER_ALL_BLOCK_HEIGHT.value -
        SLIDE_MENU_WRAPPER_TOP_BLOCK_HEIGHT.value -
        SLIDE_MENU_WRAPPER_BOTTOM_BLOCK_HEIGHT.value -
        slideMenuMainSideMobileBlock.value -
        SLIDE_MENU_MAIN_SIDE_PADDING
      );
    });

    watch(
      () => context.isMenuOpened,
      (newValue) => {
        if (newValue) {
          slideMenuVisibilityStyle.value = 'visible';
        } else {
          setTimeout(() => {
            slideMenuVisibilityStyle.value = 'hidden';
          }, SLIDE_MENU_TRANSITION_DELAY_MS_MOBILE * 1000);
        }
      }
    );

    expose({
      slideMenuWrapperMainContentHeight,
      showPrivacyContextModal,
    });

    return {
      SLIDE_MENU_WRAPPER_ALL_BLOCK,
      SLIDE_MENU_WRAPPER_BOTTOM_BLOCK,
      SLIDE_MENU_WRAPPER_TOP_BLOCK,
      SLIDE_MENU_WRAPPER_TOP_BLOCK_HEIGHT,
      SLIDE_MENU_MAIN_CONTENT_MOBILE_BLOCK,
      isSlideMenuMobileBottomBlockVisible,
      slideMenuMainSideWidth,
      arrowPosition,
      userStore,
      isPrivacyContextModalOpened,
      privacyContextModalY,
      privacyContextModalX,
      privacyContextModalItems,
      slideMenuWrapperMainContentHeight,
      slideMenuWrapperStyle,
      slideMenuMainSideStyle,
      isSlideMenuWrapperDesktop,
      showPrivacyContextModal,
      closePrivacyContextModal,
      privacyContextModalItemClick,
      goToMyProfile,
      toggleMenu,
      logOut,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-fcfcfc: #fcfcfc;
$color-dfdeed: #dfdeed;

.b_slide_menu_back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.b_slide_menu_bottom-block {
  padding: 16px 11px;
}

.b_slide_menu_wrapper {
  position: absolute;
  top: 0;
  right: -260px;
  height: 100%;

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
    z-index: 12;
    img {
      margin: auto;
    }

    @include allDevicesBeforeDesktop {
      display: none;
    }
  }
  .b_slide_menu_main {
    padding: 35px 20px 0 20px;
    position: absolute;
    top: 0;
    right: 0px;
    @include calc-height;
    background: $color-fcfcfc;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 0px 6px 6px 0px;
    z-index: 11;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;

    @include allDevicesBeforeDesktop {
      position: fixed;
      width: 70%;
      background: #efeff6;
      padding: 16px;
      @include calc-height;
      z-index: 990;
      transition: left 0.3s ease-out;
      left: 0;
      top: 0;
    }

    @include mobileDevice {
      width: 100%;
    }

    .b_slide_menu_top-block {
      @include allDevicesBeforeDesktop {
        height: 110px;
      }
      .b_slide_menu_logo {
        @include desktopDevice {
          padding-left: 8px;
        }

        .b-slide_menu_mobile-logo {
          @include exo(20px, 800);
          line-height: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .b-slide_menu_mobile__user-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: $--b-main-white-color;
        border-radius: 8px;
        margin-top: 16px;
        .b-slide_menu_mobile__user-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .b-slide_menu_mobile__user-img {
          img {
            display: block;
          }
        }

        .b-slide_menu_mobile__text-block {
          .b-slide_menu_mobile__user-name {
            @include exo(18px, 800);
            line-height: 24px;
          }
          .b-slide_menu_mobile__account-type {
            @include inter(12px, 500, $--b-main-green-color);
            line-height: 20px;
          }
        }

        .b-slide_menu_mobile__logout-icon {
          img {
            display: block;
          }
        }
      }
    }
  }
}
.b_slide_menu_tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $color-dfdeed;
  gap: 32px;
}
</style>
