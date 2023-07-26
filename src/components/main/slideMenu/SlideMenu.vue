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
    :modalItems="config.activeTab.records.contextMenu"
    :background="false"
    @close-modal="closeContextMenu"
    @itemClick="contextMenuItemClick"
  />

  <SlideMenuWrapper
    :isMenuOpened="config.activity"
    :menuClosable="config.slideConfig.closable"
    :mainSideWidth="config.slideConfig.width"
    ref="SLIDE_MENU_WRAPPER"
    @close="closeSlideMenu"
  >
    <template #logo>
      <img
        v-if="config.slideConfig.logo.img"
        :src="config.slideConfig.logo.img"
        alt=""
      />
      <span
        v-else-if="config.slideConfig.logo.text"
        class="b-slide-menu-logo-text"
      >
        {{ $t(config.slideConfig.logo.text) }}
      </span>
    </template>

    <template #top-side>
      <div
        v-for="elementsBlock in config.slideConfig.topSide.elements"
        class="b_slide_menu-top-side"
        :style="config.slideConfig.topSide.style"
      >
        <div
          v-for="element in elementsBlock"
          class="b_slide_menu_top-side-element"
        >
          <component
            v-if="!element.componentProps.hideElement && element.componentName"
            :is="element.componentName"
            v-bind="element.componentProps"
            v-on="element.componentEmitsHandlers"
          >
          </component>
        </div>
      </div>
    </template>
    <template #tabs>
      <div
        v-if="config.activeTab"
        class="b-slide-menu__tabs"
        :style="slideMenuTabsStyle"
      >
        <div
          v-for="tab in config.slideConfig.tabs"
          :class="[
            'b-slide-menu__tab',
            { selected: tab.uniqueName === config.activeTab.uniqueName },
          ]"
          @click="openTab(tab)"
        >
          <div class="b-tab-title me-1">
            {{ $t(tab.title) }}
          </div>
          <div
            class="b-tab-badge d-flex align-items-center justify-content-center me-1"
            v-if="tab.badge.count > 0"
          >
            {{ tab.badge.count }}
          </div>
        </div>
      </div>
    </template>

    <template #main-content>
      <ul
        v-if="config.activity && config.activeTab"
        :style="`height: ${slideMenuHeight}`"
      >
        <virtual-list
          :elements="config.activeTab.paginationElements"
          :selectable="config.selectable"
          :virtualListRecord="activeTabRecords.record"
          v-model:selected-list="activeTabRecords.selectedList"
          v-model:scrollbar-existing="activeTabRecords.blockScrollToTopIfExist"
          @openContextMenu="openContextMenu"
          @removePushNotificationAfterSidebarAction="
            removePushNotificationAfterSidebarAction
          "
        >
          <template #before>
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
                  v-if="isEmptyListVisible"
                  :title="activeTabRecords.emptyListConfig.title"
                  :description="activeTabRecords.emptyListConfig.description"
                  :image="activeTabRecords.emptyListConfig.image"
                />
                <ScrollToTop
                  :is-scroll-top-exist="
                    activeTabRecords.blockScrollToTopIfExist
                  "
                  @scroll-button-clicked="scrollToFirstElement()"
                />
              </template>
            </InfiniteLoading>
          </template>
        </virtual-list>
      </ul>
    </template>

    <template v-if="config.slideConfig.bottomSideVisible" #bottom-block>
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
      <div class="b-privacy-links__button">
        <span>
          {{ $t('policy.data-security') }}
        </span>
      </div>
    </template>
  </SlideMenuWrapper>
</template>

<script>
import { ref, inject, computed, nextTick, onMounted } from 'vue';

import VirtualList from '@mainComponents/virtualList/VirtualList.vue';
import emptyList from '@sharedComponents/emptyList/EmptyList.vue';
import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import ScrollToTop from '@sharedComponents/scrollToTop/ScrollToTop.vue';
import SubmitModal from '@sharedComponents/modals/SubmitModal.vue';
import ContextMenu from '@sharedComponents/modals/ContextModal.vue';
import SlideMenuWrapper from './SlideMenuWrapper.vue';
import WhiteBtn from '@/components/shared/button/WhiteBtn.vue';

import { useUserDataStore } from '@/stores/userData';

import { ROUTES } from '@routes/router.const';
import { config } from 'dotenv';

export default {
  components: {
    InfiniteLoading,
    emptyList,
    ContextMenu,
    SlideMenuWrapper,
    SubmitModal,
    VirtualList,
    ScrollToTop,
    WhiteBtn,
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        slideConfig: {},
        activity: {},
        activeTab: {},
      }),
    },
  },
  emits: ['openTab'],
  setup(context, { emit }) {
    const scrollbar = ref();
    const SLIDE_MENU_WRAPPER = ref();
    const userStore = useUserDataStore();
    const clientVersion = ref(inject('clientVersion'));
    const routeObject = computed(() => {
      return ROUTES;
    });
    const triggerForRestart = ref('');
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const isContextMenuActive = ref(false);
    const itemOnWhatWasOpenedContextMenu = ref(null);

    const openContextMenu = (data) => {
      console.log(data);
      itemOnWhatWasOpenedContextMenu.value = data.itemData;
      contextMenuY.value = data.yPosition;
      contextMenuX.value = data.xPosition;
      isContextMenuActive.value = true;
    };

    const closeContextMenu = () => {
      contextMenuY.value = null;
      contextMenuX.value = null;
      isContextMenuActive.value = false;
    };

    const slideMenuHeight = computed(() => {
      return `${SLIDE_MENU_WRAPPER.value?.slideMenuWrapperMainContentHeight}px`;
    });

    const slideMenuTabStyle = computed(() => {
      return {
        width: `${100 / context.config.slideConfig.tabs.length}%`,
      };
    });

    const activeTabRecords = computed(() => {
      return context.config.activeTab.records;
    });

    const isLoadingState = computed(() => {
      if (scrollbar.value.state === undefined) {
        return false;
      }
      return scrollbar.value.state === 'loading';
    });

    const slideMenuTabsStyle = computed(() => {
      return {
        'margin-bottom': `${
          context.config.activeTab.paginationElements.length ? 0 : 16
        }px`,
        gap: `${context.config.slideConfig.tabsGapPx}px`,
      };
    });

    const isEmptyListVisible = computed(() => {
      return (
        activeTabRecords.value.emptyListConfig &&
        !context.config.activeTab.paginationElements.length &&
        !isLoadingState.value
      );
    });

    function openTab(tab) {
      if (tab.uniqueName !== context.config.activeTab.uniqueName) {
        emit('openTab', tab.uniqueName);
      }
    }

    function closeSlideMenu() {
      context.config.activity = false;
    }

    function contextMenuItemClick(itemActionType, item) {
      if (item.action && typeof item.action === 'function') {
        item.action(itemOnWhatWasOpenedContextMenu.value);
      }
    }

    return {
      userStore,
      clientVersion,
      routeObject,
      isContextMenuActive,
      triggerForRestart,
      contextMenuX,
      contextMenuY,
      slideMenuHeight,
      SLIDE_MENU_WRAPPER,
      isEmptyListVisible,
      slideMenuTabStyle,
      activeTabRecords,
      slideMenuTabsStyle,
      scrollbar,
      isLoadingState,
      openContextMenu,
      closeContextMenu,
      closeSlideMenu,
      contextMenuItemClick,
      openTab,
      test($event) {
        context.config.activeTab.$emit('loadNewData', {
          pageNumber: context.config.activeTab.paginationPage + 1,
          $state: $event,
        });
      },
    };
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

.b-slide-menu-logo-text {
  @include inter(22px, 700);
  line-height: 32px;
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

.b-slide-menu__tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $color-dfdeed;
  margin-top: 12px;
  width: 100%;

  @include beforeDesktop {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .b-slide-menu__tab {
    display: flex;
    align-items: center;
    padding: 0px 4px 8px 8px;
    cursor: pointer;

    &.selected {
      border-bottom: 2px solid $--b-main-black-color;
    }

    .b-tab-title {
      @include inter(13px, 400);
      line-height: 20px;
    }

    .b-tab-badge {
      @include inter(12px, 400, $--b-main-white-color);
      background: $--b-main-gray-color;
      border-radius: 100px;
      padding: 0px 4px;
      line-height: 16px;
      width: fit-content;
      height: 20px;
      min-width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
