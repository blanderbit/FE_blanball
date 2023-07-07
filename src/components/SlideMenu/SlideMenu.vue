<template>
  <!--<SubmitModal-->
    <!--v-if="isSubmitModalOpened"-->
    <!--:config="submitModalConfig"-->
    <!--@closeModal="closeSubmitModal"-->
    <!--@deleteNotifications="HandleAction.deleteSelected()"-->
    <!--@continue="closeSubmitModal"-->
  <!--/>-->
  <ContextMenu
    v-if="isContextMenuActive"
    :clientX="contextMenuX"
    :clientY="contextMenuY"
    :menu-text="mockData.menu_text"
    @close-modal="closeContextMenu"
    @itemClick="contextMenuItemClick"
  />

  <SlideMenuWrapper
    :isMenuOpened="config.activity"
    @close="$emit('update:isMenuOpened', $event)"
  >
    <!--<template #logo>-->
      <!--<img src="../../assets/img/logo-sidebar.svg" alt="" />-->
    <!--</template>-->

    <!--<template #filters>-->
      <!--<components  v-for="item in config.activeTab.filters" :is="item" :props="{contextMenu, Selectable}"></components>-->
    <!--</template>-->
    <!--<template #tabs>-->
      <!--<components  v-for="item in config.activeTab.filters" :is="item" :props="{contextMenu, Selectable}"></components>-->
    <!--</template>-->
    <!--<template #content>-->
      <!--<components :is="instance.record" :props="{contextMenu, Selectable}"></components>-->
    <!--</template>-->
    <!--&lt;!&ndash;<template #top-side>&ndash;&gt;-->
      <!--<div-->
        <!--class="b_slide_menu_items d-flex justify-content-between align-items-center mb-2"-->
        <!--v-if="notifications.length"-->
      <!--&gt;-->
        <!--<div-->
          <!--class="b-read-all-notifications__button d-flex align-items-center"-->
          <!--v-if="notifications.length && notReadNotificationCount"-->
          <!--@click="HandleAction.readAll()"-->
        <!--&gt;-->
          <!--<img-->
            <!--src="../../assets/img/notifications/double-check.svg"-->
            <!--height="16"-->
            <!--alt=""-->
          <!--/>-->
          <!--<span class="b-button-text">-->
            <!--{{ $t('slide_menu.read-all') }}-->
          <!--</span>-->
        <!--</div>-->

        <!--<button-->
          <!--class="b-notifictions-actions__button"-->
          <!--@click="handleSelectableMode"-->
        <!--&gt;-->
          <!--<span v-if="!selectable" class="b-button-text">-->
            <!--{{ $t('slide_menu.notifications-manage') }}-->
          <!--</span>-->
          <!--<span v-else class="b-button-text">-->
            <!--{{ $t('slide_menu.cancel-manage') }}-->
          <!--</span>-->
          <!--<img v-if="!selectable" src="../../assets/img/dots.svg" alt="" />-->
        <!--</button>-->
      <!--</div>-->
      <!--<div-->
        <!--v-if="selectable && notifications.length && selectedList.length"-->
        <!--class="d-flex mb-2 justify-content-between"-->
      <!--&gt;-->
        <!--<div class="b-selected-elements__count">-->
          <!--<img-->
            <!--src="../../assets/img/cross.svg"-->
            <!--alt=""-->
            <!--@click="clearSelectedList"-->
          <!--/>-->
          <!--<span>{{ selectedList.length }}</span>-->
          <!--<div-->
            <!--v-if="selectedList.length >= 100"-->
            <!--class="b-selected-elements__max"-->
          <!--&gt;-->
            <!--(макс.)-->
          <!--</div>-->
        <!--</div>-->

        <!--<div class="d-flex">-->
          <!--<button-->
            <!--@click="HandleAction.readSelected()"-->
            <!--class="d-flex align-items-center"-->
          <!--&gt;-->
            <!--<img-->
              <!--src="../../assets/img/notifications/double-check.svg"-->
              <!--height="16"-->
              <!--alt=""-->
            <!--/>-->
            <!--{{ $t('slide_menu.mark-as-viewed') }}-->
          <!--</button>-->

          <!--<button-->
            <!--@click="-->
              <!--selectedList.length > 1-->
                <!--? showSubmitModal()-->
                <!--: HandleAction.deleteSelected()-->
            <!--"-->
            <!--class="d-flex align-items-center"-->
          <!--&gt;-->
            <!--<img-->
              <!--src="../../assets/img/notifications/trash.svg"-->
              <!--height="16"-->
              <!--alt=""-->
            <!--/>-->
            <!--{{ $t('buttons.delete') }}-->
          <!--</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</template>-->

    <template #tabs>
      <div
        v-if="config.activeTab"
        class="b-notifications__tabs"
        :style="`margin-top: ${config.activeTab.paginationElements.length ? 16 : 28}px;
                     margin-bottom: ${config.activeTab.paginationElements.length ? 0 : 16}px;`"
      >
        <div
          v-for="tab in config.slideConfig.tabs"
          :class="[
            'b-notification-tab',
            { selected: tab.uniqueName === config.activeTab.uniqueName },
          ]"
          @click="$emit('openTab', tab.uniqueName)"
        >
          <div class="b-notifications-title me-1">
            {{ $t(tab.title) }}
          </div>
          <div
            class="b-notification-unreaded d-flex align-items-center justify-content-center me-1"
            v-if="tab.badge.count > 0"
          >
            {{ tab.badge.count }}
          </div>
        </div>
      </div>
    </template>

    <template #main-content>
      <ul
        class="b_slide_menu_notification"
        v-if="config.activity && config.activeTab"
        :style="`height: ${slideMenuHeight}`"
      >
        <virtual-list
          :elements="config.activeTab.paginationElements"
          :selectable="config.activeTab.records.selectable"
          v-model:selected-list="config.activeTab.records.selectedList"
          v-model:scrollbar-existing="config.activeTab.records.blockScrollToTopIfExist"
          @openContextMenu="openContextMenu"
          @removePushNotificationAfterSidebarAction="
            removePushNotificationAfterSidebarAction
          "
        >
          <template #before>
            <components :is="instance" :props="{contextMenu, Selectable}"></components>
            <!--<Notification-->
              <!--v-if="newNotifications"-->
              <!--class="b-new-notification"-->
              <!--:notificationInstance="getNewNotificationInstance"-->
              <!--:not-collapsible="true"-->
              <!--@handler-action="$emit('reLoading'), restartInfiniteScroll()"-->
            <!--&gt;-->
            <!--</Notification>-->
          </template>
          <template #after>
            <InfiniteLoading
              :identifier="triggerForRestart"
              ref="scrollbar"
              @infinite="test"
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
        </virtual-list>
      </ul>
    </template>

    <template #bottom-block>
      <div class="b_slide_menu_top-line d-flex justify-content-between">
        <div class="b_slide_menu_name">
          {{ userStore.getUserFullName }}
        </div>
        <div class="b_slide_menu_position">
          {{ $t(`hashtags.${userStore.user.role}`) }}
        </div>
      </div>
      <div class="b_slide_menu_bottom-line">
        <router-link
          class="b-blanball-version"
          :to="routeObject.APPLICATION.VERSIONS.absolute"
          @click="$emit('close')"
        >
          {{ $t('slide_menu.version') }}
          <span>{{ clientVersion }}</span>
        </router-link>
        <div class="b-blanball-made-by-flumx">Розроблено: FlumX</div>
      </div>
    </template>
  </SlideMenuWrapper>
</template>

<script>
import {
  ref,
  inject,
  computed,
  watch,
  watchEffect,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useI18n } from 'vue-i18n';

import { v4 as uuid } from 'uuid';

import VirtualList from '../main/virtualList/VirtualList.vue';
import Notification from '../main/notifications/Notification.vue';
import emptyList from '../shared/emptyList/EmptyList.vue';
import InfiniteLoading from '../main/infiniteLoading/InfiniteLoading.vue';
import ScrollToTop from '../ScrollToTop.vue';
import SubmitModal from '../shared/modals/SubmitModal.vue';
import ContextMenu from '../shared/modals/ContextMenuModal.vue';
import SlideMenuWrapper from './SlideMenuWrapper.vue';

import { useUserDataStore } from '../../stores/userData';
import { NewNotifications } from '../../workers/web-socket-worker/not-includes-to-socket/new_notifications';
import { NotificationsBus } from '../../workers/event-bus-worker';
import { API } from '../../workers/api-worker/api.worker';
import { startSpinner, finishSpinner } from '../../workers/loading-worker/loading.worker';

import { calcHeight } from '../../utils/calcHeight';

import { ROUTES } from '../../router/router.const';
import CONSTANTS from '../../consts';

import sidebarArrowBack from '../../assets/img/sidebar-arrow-back.svg';
import sidebarArrow from '../../assets/img/sidebar-arrow.svg';

export default {
  components: {
    InfiniteLoading,
    Notification,
    emptyList,
    ContextMenu,
    SlideMenuWrapper,
    SubmitModal,
    VirtualList,
    ScrollToTop,
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        slideConfig: {},
        activity: {},
        activeTab: {}
      })
    }
  },
  emits: [

  ],
  setup(context, { emit }) {
    const userStore = useUserDataStore();
    const clientVersion = ref(inject('clientVersion'));
    const routeObject = computed(() => {
      return ROUTES;
    });
    const triggerForRestart = ref('');
    const selectedByContextModalNotificationId = ref(null);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const isContextMenuActive = ref(false);
    const openContextMenu = (data) => {
      selectedByContextModalNotificationId.value = data.notification_id;
      contextMenuY.value = data.yPosition;
      contextMenuX.value = data.xPosition;
      isContextMenuActive.value = true;
    };
    const {
      calculatedHeight,
      minussedHeight,
      onAppHeightResize,
      plusHeight,
      minusHeight,
    } = calcHeight([100, 70, 20, context.config.activeTab.records.selectedList.length ? 110 : 80]);

    const slideMenuHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    return {
      userStore,
      clientVersion,
      routeObject,
      openContextMenu,
      isContextMenuActive,
      triggerForRestart,
      slideMenuHeight,
      test($event) {
        context.config.activeTab.$emit('loadNewData', context.config.activeTab.paginationPage + 1, $event)
      }
    }
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
    @include calc-height;
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
          border-bottom: 1px dashed $color-dfdeed;
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
    border-bottom: 2px solid $--b-main-black-color;
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
  color: $--b-main-black-color;
}
</style>
