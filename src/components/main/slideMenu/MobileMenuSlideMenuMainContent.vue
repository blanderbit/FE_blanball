<template>
  <div class="b-mob-menu__menu-block" :style="menuBlockStyle">
    <div class="b-mob-menu__line" ref="MOBILE_MENU_TOP_LINE_BLOCK">
      <div
        class="b-mob-menu__menu-item"
        v-for="item in mobileTopMenu"
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
          {{ $t(item.value) }}
        </span>
      </div>
    </div>
    <div
      v-if="showMainContent"
      class="b-mob-menu__content-block"
      :style="mainContentHeightStyle"
    >
      <div class="b-mob-menu__message-list" :style="mainContentHeightStyle">
        <slot name="tabs"> </slot>
        <slot name="main-content"></slot>
      </div>
    </div>
    <div class="b-mob-menu__line" ref="MOBILE_MENU_BOTTOM_LINE_BLOCK">
      <div
        class="b-mob-menu__menu-item"
        v-for="item in mobileBottomMenu"
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
          {{ $t(item.value) }}
        </span>
      </div>
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

    const { height: MOBILE_MENU_BOTTOM_LINE_BLOCK_HEIGHT } = useElementSize(
      MOBILE_MENU_BOTTOM_LINE_BLOCK
    );

    const { height: MOBILE_MENU_TOP_LINE_BLOCK_HEIGHT } = useElementSize(
      MOBILE_MENU_TOP_LINE_BLOCK
    );

    const router = useRouter();
    const isBottomBlockShowing = ref(true);

    const mobileTopMenu = ref([
      {
        id: 0,
        value: 'slide_menu.messages',
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
        value: 'slide_menu.events',
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
    const mobileBottomMenu = ref([
      {
        id: 0,
        value: 'slide_menu.user-raiting',
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
        value: 'slide_menu.settings',
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

    const menuBlockHeight = ref('auto');
    const menuBlockStyle = computed(() => {
      return {
        height: menuBlockHeight.value,
        'border-radius': `${props.selectedList.length ? 0 : 8}px`,
      };
    });

    const showMainContent = ref(null);

    const mainContentHeightStyle = computed(() => {
      return {
        height: `${props.mainContentHeight }px`,
      };
    }); 

    function closeMobMenu() {
      normalizeBlock(mobileTopMenu);
      normalizeBlock(mobileBottomMenu);
      menuBlockHeight.value = 'auto';
      emit('closeMenu');
      isBottomBlockShowing.value = true;
    }
    function normalizeBlock(menu) {
      showMainContent.value = false;
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
        menuType === 'top-menu' ? mobileTopMenu : mobileBottomMenu;
      const spareMenu =
        menuType === 'top-menu' ? mobileBottomMenu : mobileTopMenu;
      const spareId = id ? 0 : 1;
      isBottomBlockShowing.value = false;

      normalizeBlock(spareMenu);

      showMainContent.value = true;

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

    expose({
      isBottomBlockShowing,
      MOBILE_MENU_TOP_LINE_BLOCK_HEIGHT,
      MOBILE_MENU_BOTTOM_LINE_BLOCK_HEIGHT,
    });

    return {
      mobileBottomMenu,
      mainContentHeightStyle,
      mobileTopMenu,
      menuBlockStyle,
      showMainContent,
      MOBILE_MENU_BOTTOM_LINE_BLOCK,
      MOBILE_MENU_TOP_LINE_BLOCK,
      lineMenuClick,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-efeff6: #efeff6;
$color-8a8aa8: #8a8aa8;
$color-148581: #148581;
$color-dfdeed: #dfdeed;
$color-1ccd62: #1ccd62;

.b-mob-menu__menu-block {
  margin-top: 16px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    overflow: hidden;
    transition: all 0.3s ease-out;
    .b-mob-menu__message-list {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

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
</style>
