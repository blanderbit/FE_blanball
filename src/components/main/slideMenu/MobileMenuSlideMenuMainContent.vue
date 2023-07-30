<template>
  <div class="b-mobile-menu-block">
    <div :class="['b-mobile-menu-items', { 'ative-item': isAnyElementActive }]">
      <div
        v-if="isAnyElementActive"
        class="b-return-to-all-items-button"
        @click="returnToAllItemList"
      >
        <img src="@images/arrow-left-gray.svg" alt="" />
      </div>
      <div
        v-for="item in mobileMenuItems"
        :class="[
          'b-mobile-menu-item',
          { active: activeElementId === item.id },
          { hide: activeElementId && activeElementId !== item.id },
        ]"
        @click="itemClick(item)"
      >
        <img class="b-item-image" :src="item.imgInactive" alt="" />
        <div class="b-item-text">{{ $t(item.value) }}</div>
      </div>
    </div>
    <div
      v-if="isAnyElementActive"
      class="b-mobile-menu-main-content-block"
      :style="mainContentHeightStyle"
    >
      <slot name="tabs"> </slot>
      <slot name="main-content"></slot>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useElementSize } from '@vueuse/core';

import { ROUTES } from '@/routes/router.const';

import NotificationIcon from '@images/notification-mob-default.svg';
import NotificationWhite from '@images/notifications-not-read-mobile-icon.svg';
import Record from '@images/record.svg';
import RecordWhite from '@images/record-white.svg';
import Members from '@images/members.svg';
import MembersWhite from '@images/members-white.svg';
import Settings from '@images/settings.svg';
import SettingsWhite from '@images/settings-white.svg';
import Chats from '@images/chat/sidebar-chats-icon.svg';

export default {
  props: {
    selectedList: {
      type: Array,
      default: () => [],
    },
    mainContentHeight: {
      type: Number,
      required: true,
    },
  },
  emits: ['closeMenu'],
  setup(props, { emit, expose }) {
    const MOBILE_MENU_BOTTOM_LINE_BLOCK = ref();
    const MOBILE_MENU_TOP_LINE_BLOCK = ref();
    const router = useRouter();

    const { height: MOBILE_MENU_BOTTOM_LINE_BLOCK_HEIGHT } = useElementSize(
      MOBILE_MENU_BOTTOM_LINE_BLOCK
    );

    const { height: MOBILE_MENU_TOP_LINE_BLOCK_HEIGHT } = useElementSize(
      MOBILE_MENU_TOP_LINE_BLOCK
    );

    const isBottomBlockShowing = ref(true);

    const activeElementId = ref(null);

    const isAnyElementActive = computed(() => {
      return activeElementId.value;
    });

    const mainContentHeightStyle = computed(() => {
      return {
        height: `${props.mainContentHeight}px`,
      };
    });

    const mobileMenuItems = ref([
      {
        id: 1,
        value: 'slide_menu.messages',
        imgInactive: NotificationIcon,
        imgActive: NotificationWhite,
        isIconActive: false,
        showMainContent: true,
      },
      {
        id: 2,
        value: 'slide_menu.events',
        imgInactive: Record,
        imgActive: RecordWhite,
        url: ROUTES.APPLICATION.EVENTS.absolute,
      },
      {
        id: 3,
        value: 'slide_menu.user-raiting',
        imgInactive: Members,
        imgActive: MembersWhite,
        isIconActive: false,
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
      },
      {
        id: 4,
        value: 'slide_menu.settings',
        imgInactive: Settings,
        imgActive: SettingsWhite,
        isIconActive: false,
        url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
      },
      {
        id: 5,
        value: 'chat.chats',
        imgInactive: Chats,
        imgActive: SettingsWhite,
        isIconActive: false,
        url: ROUTES.APPLICATION.CHATS.absolute,
        showMainContent: true,
      },
    ]);

    function itemClick(item) {
      if (item.url) {
        router.push(item.url);
        if (!item.showMainContent) {
          closeMobileMenu();
          isBottomBlockShowing.value = true;
        }
      }
      if (item.showMainContent) {
        activeElementId.value = item.id;
        isBottomBlockShowing.value = false;
      }
    }

    function returnToAllItemList() {
      activeElementId.value = null;
      isBottomBlockShowing.value = true;
    }

    function closeMobileMenu() {
      emit('closeMenu');
    }

    expose({
      isBottomBlockShowing,
      MOBILE_MENU_TOP_LINE_BLOCK_HEIGHT,
      MOBILE_MENU_BOTTOM_LINE_BLOCK_HEIGHT,
    });

    return {
      MOBILE_MENU_BOTTOM_LINE_BLOCK,
      MOBILE_MENU_TOP_LINE_BLOCK,
      mobileMenuItems,
      isAnyElementActive,
      activeElementId,
      mainContentHeightStyle,
      itemClick,
      returnToAllItemList,
      closeMobileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
$-active-element-height: 44px;
$color-f0f0f4: #f0f0f4;

.b-mobile-menu-block {
  margin-top: 16px;

  .b-mobile-menu-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
    border-radius: 12px;

    &.ative-item {
      border-radius: 0px;
      flex-wrap: nowrap;
    }

    .b-return-to-all-items-button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $-active-element-height;
      padding: 0px 16px;
      gap: 12px;
      border-bottom: 1px solid var(--border-items-default, #f0f0f4);
      background: $--b-main-white-color;
      flex-basis: 10%;
      border-radius: 8px 0px 0px 0px;
      cursor: pointer;
    }

    .b-mobile-menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-basis: 50%;
      padding: 0px 16px;
      height: 56px;
      background: $--b-main-white-color;
      cursor: pointer;
      border-left: 1px solid $color-f0f0f4;
      border-top: 1px solid $color-f0f0f4;
      .b-item-text {
        @include inter(13px, 500, $--b-main-gray-color);
        line-height: 16px;
      }
      .b-item-image {
        width: 20px;
        height: 20px;
      }

      &.active {
        background: $--b-main-gray-color;
        flex-basis: 90%;
        height: $-active-element-height;
        border-radius: 0px 8px 0px 0px;

        .b-item-text {
          @include inter(13px, 500, $--b-main-white-color);
          line-height: 16px;
        }
      }
      &.hide {
        display: none;
      }
    }
  }

  .b-mobile-menu-main-content-block {
    background: $--b-main-white-color;
  }
}

// .b-mob-menu__menu-block {
//   margin-top: 16px;
//   overflow: hidden;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   transition: all 0.3s ease-out;
//   .b-mob-menu__line {
//     display: flex;
//     border-bottom: 1.5px solid $color-dfdeed;
//     &:last-child {
//       border: none;
//     }
//     .b-mob-menu__menu-item {
//       display: flex;
//       align-items: center;
//       justify-content: flex-start;
//       padding: 0 16px;
//       border-right: 1.5px solid $color-dfdeed;
//       transition: all 0.3s ease-out;
//       &:last-child {
//         border: none;
//       }
//       img {
//         width: 21.5px;
//         height: 21.5px;
//       }
//       span {
//         @include inter(12px, 500);
//         line-height: 16px;
//         margin-left: 13px;
//       }
//     }
//   }
//   .b-mob-menu__content-block {
//     background: $--b-main-white-color;
//     height: 100%;
//     position: relative;
//     overflow: hidden;
//     transition: all 0.3s ease-out;
//     .b-mob-menu__message-list {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;

//       .b-mob-menu__tabs {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         gap: 20px;

//         .b-mob-menu__tab {
//           line-height: 20px;
//           padding: 12px 0px;
//           cursor: pointer;
//           @include inter(13px, 400);

//           &.selected {
//             @include inter(13px, 500);
//             border-bottom: 2px solid $--b-main-black-color;
//             padding: 6px 0px;
//           }
//         }
//       }
//       .b-mob-menu__message {
//         padding: 14px 12px;
//         display: flex;
//         border-bottom: 1px solid $color-efeff6;
//         .b-mob-menu__left-side {
//           margin-right: 12px;
//           position: relative;
//           .b-mob-menu__is-user-active {
//             width: 10px;
//             height: 10px;
//             position: absolute;
//             right: 0;
//             bottom: 4px;
//             background: $color-1ccd62;
//             border: 2px solid $--b-main-white-color;
//             border-radius: 50%;
//           }
//         }

//         .b-mob-menu__right-side {
//           width: 100%;
//           .b-mob-menu__top-line {
//             @include inter(14px, 400, $color-8a8aa8);
//             line-height: 20px;

//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             margin-bottom: 4px;
//           }

//           .b-mob-menu__bottom-line {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             @include inter(14px, 600, $color-8a8aa8);
//             line-height: 20px;
//           }
//         }
//       }
//     }
//   }
// }
</style>
