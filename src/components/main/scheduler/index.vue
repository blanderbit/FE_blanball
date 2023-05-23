<template>
  <div @click.self="$emit('closeWindow')" class="c-scheduler-wrapper">
    <div
      class="c-common-block"
      :style="schedulerCommonBlockStyle"
      ref="schedulerCommonBlock"
    >
      <!-- Sidebar Slot -->
      <slot
        name="LeftSidebar"
        :isFriendsVisible="isFriendsVisible"
        :friendsBlockSwitcher="friendsBlockSwitcher"
      ></slot>
      <!-- Sidebar Slot -->
      <div class="c-right-block">
        <div class="c-top-line">
          <div class="c-top-line__left-block">
            <div class="c-current-date">
              {{ $t('scheduler.today-date') }} <span>{{ todayDate }}</span>
            </div>
            <div v-if="isTopPlanEventButtonVisible" class="c-plan-event-button">
              <WhiteBtn
                :text="$t('scheduler.plan-event')"
                :width="192"
                :height="32"
                :icon="icons.grayClock"
                :mainColor="'#575775'"
                :isBorder="true"
                :borderColor="'#DFDEED'"
              />
            </div>
          </div>
          <img
            class="c-hide-btn"
            :src="hideBtnConfig.img"
            alt=""
            @click="hideBtnConfig.action"
          />
        </div>
        <div class="c-scheduler-block">
          <div class="c-sheduled-content-on-specific-day">
            <VueInlineCalendar
              ref="inlineCalendar"
              v-if="inlineCalendarConfig.visible"
              :enableMousewheelScroll="
                inlineCalendarConfig.enableMousewheelScroll
              "
              v-model:selectedDate="inlineCalendarConfig.selectedDate"
              :specMinDate="inlineCalendarConfig.specMinDate"
              :specMaxDate="inlineCalendarConfig.specMaxDate"
              :showYear="inlineCalendarConfig.showYear"
              :showMonth="inlineCalendarConfig.showMonth"
              :itemWidth="inlineCalendarConfig.itemWidth"
              :locale="inlineCalendarConfig.locale"
              :showButtons="inlineCalendarConfig.showButtons"
            >
              <template #prev-button>
                <img
                  src="../../../assets/img/scheduler/arrow-left.svg"
                  alt=""
                />
              </template>
              <template #next-button>
                <img
                  src="../../../assets/img/scheduler/arrow-right.svg"
                  alt=""
                />
              </template>

              <template #title>
                <div class="c-inline-cal-title">
                  <SchedulerInlineCalendarTitle
                    @changeMonth="inlineCalendarChangeMonth"
                  >
                    <template #title="{ title }">
                      {{ removeYearFromDate(title) }}
                    </template>
                  </SchedulerInlineCalendarTitle>
                </div>
              </template>
              <template #scheduled-events="{ date }">
                <ScheduledEventsDots
                  :dotsCount="
                    scheduledEventsDotsData[formatDate(date.date)]
                      ?.user_scheduled_events_count
                  "
                  :maxDotsCount="maxDotsCount"
                  :dotsColor="
                    formatDate(date.date) ===
                    formatDate(inlineCalendarConfig.selectedDate)
                      ? inlineCalendarActiveDateDotsColor
                      : dotsColor
                  "
                />
              </template>
            </VueInlineCalendar>
            <div class="c-specific-day__main-content">
              <div
                v-if="schedulerConfig.isScheduledEventsShow"
                class="c-schduled-events-list"
                :id="scheduledEventsHeight"
                :style="scheduledEventsHeight"
              >
                <ScheduledEventsList
                  :date="formatDate(inlineCalendarConfig.selectedDate)"
                  :userData="activatedUserInSidebarData"
                  :scheduledEventsDotsData="scheduledEventsDotsData"
                  @deactivateSelectedUser="
                    deactivateUserEventsListTabletAndMobile
                  "
                />
              </div>

              <div
                v-if="schedulerConfig.isFriendsListShow"
                class="c-friends-list"
                :style="scheduledEventsHeight"
              >
                <SchedulerFriendsList
                  :activeUserId="activeUserId"
                  :searchValue="searchFriendsValue"
                  @activateUser="activateUser"
                />
              </div>
            </div>
          </div>
          <vue-cal
            :small="schedulerConfig.small"
            :xsmall="schedulerConfig.xsmall"
            :time="schedulerConfig.time"
            :hide-view-selector="schedulerConfig.hideViewSelector"
            :hide-title-bar="schedulerConfig.hideTitleBar"
            :hide-body="schedulerConfig.hideBody"
            v-model:active-view="schedulerConfig.activeView"
            :events-count-on-year-view="schedulerConfig.eventsCountOnYearView"
            :locale="schedulerConfig.locale"
            :disable-views="schedulerConfig.disableViews"
            :selected-date="schedulerConfig.selectedDate"
            @ready="setSchedulerDatesRangeAndLoadData"
            @viewChange="setSchedulerDatesRangeAndLoadData"
          >
            <template #title="{ title }">
              <div class="c-title">
                {{ removeYearFromDate(title) }}
              </div>
            </template>
            <template #arrow-prev>
              <img src="../../../assets/img/scheduler/arrow-left.svg" alt="" />
            </template>
            <template #arrow-next>
              <img src="../../../assets/img/scheduler/arrow-right.svg" alt="" />
            </template>
            <template #cell-content="{ cell, events }">
              <div class="c-cell-wrapper">
                <div class="c-cell-number">
                  <span v-if="cell.content">{{ cell.content }}</span>
                </div>
                <div class="c-event-dots">
                  <ScheduledEventsDots
                    :dotsCount="
                      scheduledEventsDotsData[cell.formattedDate]
                        ?.user_scheduled_events_count
                    "
                    :maxDotsCount="maxDotsCount"
                    :dotsColor="dotsColor"
                  />
                </div>
              </div>
            </template>
          </vue-cal>
        </div>
        <div
          class="c-scheduler-bottom-side"
          :style="scheduledBottomBlockStyle"
          @touchstart="startDragScheduler"
          @touchend="finishDragScheduler"
          @touchmove="dragScheduler"
        >
          <div
            v-if="isMainBottomSideContentVisible"
            class="c-bottom-side-main-content"
          >
            <div class="c-plan-event-button">
              <WhiteBtn
                :text="$t('scheduler.plan-event')"
                :height="32"
                :icon="icons.grayClock"
                :mainColor="'#575775'"
                :isBorder="true"
                :borderColor="'#DFDEED'"
              />
            </div>
            <SchedulerTabs
              :selectedTabId="sidebarSelectedTabId"
              @switchTab="switchTab"
            />
          </div>
          <div v-else class="c-invite-selected-user-to-event">
            <GreenBtn
              :height="40"
              :icon="icons.inviteUserIcon"
              :text="$t('player_page.invite')"
              @click-function="clickAcceptButton(request.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onBeforeUnmount, watch } from 'vue';

import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import VueCal from 'vue-cal';
import VueInlineCalendar from '../inlineCalendar/index.vue';

import ContextModal from '../../shared/modals/ContextModal.vue';
import WhiteBtn from '../../shared/button/WhiteBtn.vue';
import ScheduledEventsDots from './ScheduledEventsDots.vue';
import SchedulerTabs from './SchedulerTabs.vue';
import ScheduledEventsList from './ScheduledEventsList.vue';
import SchedulerFriendsList from './SchedulerFriendsList.vue';
import SchedulerInlineCalendarTitle from './SchedulerInlineCalendarTitle.vue';
import GreenBtn from '../../shared/button/GreenBtn.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '../../../stores/userData';
import {
  startSpinner,
  finishSpinner,
} from '../../../workers/loading-worker/loading.worker';
import { BlanballEventBus } from '../../../workers/event-bus-worker';

import { CONSTS } from '../../../consts';
import { useWindowWidth } from '../../../utils/widthScreen';
import { useElementSize } from '@vueuse/core';
import { calcHeight } from '../../../utils/calcHeight';

import 'vue-cal/dist/vuecal.css';

import closeIcon from '../../../assets/img/scheduler/close-icton.svg';
import goBackIcon from '../../../assets/img/back-arrow.svg';
import grayClockIcon from '../../../assets/img/scheduler/gray-clock.svg';
import inviteUserIcon from '../../../assets/img/add-user-white.svg';

const mobileVersionSchedulerBottomMargin = 240;

const desktopMinHeight = 520;
const tabletMinHeight = 495;
const mobileMinHeight = 540;

export default {
  name: 'VueScheduler',
  components: {
    VueCal,
    ContextModal,
    VueInlineCalendar,
    ScheduledEventsDots,
    ScheduledEventsList,
    SchedulerInlineCalendarTitle,
    SchedulerFriendsList,
    GreenBtn,
    SchedulerTabs,
    WhiteBtn,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    marginTop: {
      type: Number,
      default: 80,
    },
  },
  emits: ['closeWindow'],
  setup(props, { emit }) {
    const inlineCalendar = ref();
    const isFriendsVisible = ref(false);
    const isThreeDotsShown = ref(false);
    const scheduledEventsDotsData = ref({});
    const dotsColor = ref(props.config.myEventsDotColor || '#148581');
    const maxDotsCount = ref(3);
    const inlineCalendarActiveDateDotsColor = ref('#fff');
    const userStore = useUserDataStore();
    const activatedUserInSidebarData = ref(userStore.user);
    const schedulerCommonBlock = ref();
    const hideBtnConfig = ref({});

    const { height: schedulerCommonBlockHeight } =
      useElementSize(schedulerCommonBlock);
    const { isTablet, isMobile, isMobileSmall, detectedDevice, DEVICE_TYPES } =
      useWindowWidth();

    const schedulerStartDate = ref(null);
    const schedulerEndDate = ref(null);

    const dragging = ref(false);
    const dragStartPosition = ref(0);
    const draggedDistance = ref(0);

    const mockData = computed(() => {
      return {
        contextMenuItems: CONSTS.scheduler.contextMenuItems,
        dates: CONSTS.dates,
        sideBarTabs: CONSTS.scheduler.TABS_ENUM,
        schedulerActiveViews: CONSTS.scheduler.SCHEDULER_ACTIVE_VIEWS,
      };
    });

    const sidebarSelectedTabId = ref(mockData.value.sideBarTabs.MY_PLANNED);

    const icons = computed(() => {
      return {
        close: closeIcon,
        goBack: goBackIcon,
        grayClock: grayClockIcon,
        inviteUserIcon: inviteUserIcon,
      };
    });

    const isMainBottomSideContentVisible = computed(() => {
      return activatedUserInSidebarData.value?.id === userStore.user.id;
    });

    const isTopPlanEventButtonVisible = computed(() => {
      return (
        schedulerConfig.value.activeView ===
          mockData.value.schedulerActiveViews.DAY &&
        sidebarSelectedTabId.value ===
          mockData.value.sideBarTabs.FRIENDS_PLANNED
      );
    });

    const scheduledEventsHeight = computed(() => {
      return {
        height: `${
          schedulerCommonBlockHeight.value -
          44 -
          (isMainBottomSideContentVisible.value ||
          detectedDevice.value === DEVICE_TYPES.DESKTOP ||
          detectedDevice.value === DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP
            ? 130
            : 90) -
          (isTablet.value || isMobile.value ? 66 : 0) -
          (isTablet.value || (isMobile.value && !isMobileSmall.value) ? 32 : 0)
        }px`,
      };
    });

    const { calculatedHeight: schedulerCommonBlockCalculatedHeight } =
      calcHeight(mobileVersionSchedulerBottomMargin);

    const schdulerCommonBlockHeight = computed(() => {
      if (schedulerConfig.value.isScheduledEventsShow) {
        return isMobileSmall.value
          ? schedulerCommonBlockCalculatedHeight.value
          : schedulerCommonBlockCalculatedHeight.value;
      } else if (schedulerConfig.value.isFriendsListShow) {
        return schedulerCommonBlockCalculatedHeight.value;
      } else {
        return isMobileSmall.value
          ? mobileMinHeight
          : schedulerCommonBlockCalculatedHeight.value;
      }
    });

    const schedulerCommonBlockStyle = computed(() => {
      const selectedMinHeight = computed(() => {
        switch (detectedDevice.value) {
          case DEVICE_TYPES.MOBILE_SMALL: {
            return mobileMinHeight;
          }
          case DEVICE_TYPES.MOBILE: {
            return tabletMinHeight;
          }
          case DEVICE_TYPES.TABLET: {
            return tabletMinHeight;
          }
          case DEVICE_TYPES.DESKTOP: {
            return desktopMinHeight;
          }
        }
      });

      return {
        top: `${props.marginTop}px`,
        height: `${schdulerCommonBlockHeight.value + draggedDistance.value}px`,
        'min-height': `${selectedMinHeight.value}px`,
      };
    });

    const scheduledBottomBlockStyle = computed(() => {
      return {
        'margin-top': `${
          schedulerConfig.value.activeView ===
          mockData.value.schedulerActiveViews.MONTH
            ? isMobileSmall.value
              ? 12
              : 16
            : 0
        }px`,
      };
    });

    const todayDate = computed(() => {
      const date = new Date();
      return `${date.getDate()} ${
        mockData.value.dates.monthNames[date.getMonth()]
      }`;
    });

    const inlineCalendarConfig = ref({
      visible: false,
      enableMousewheelScroll: true,
      selectedDate: new Date(),
      specMinDate: new Date(),
      specMaxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      showYear: false,
      showMonth: false,
      itemWidth: 46,
      locale: 'uk',
      showButtons: false,
      disablePastDays: true,
    });

    const schedulerConfig = ref({
      small: false,
      xsmall: true,
      time: false,
      hideViewSelector: true,
      hideTitleBar: false,
      hideBody: false,
      activeView: mockData.value.schedulerActiveViews.MONTH,
      eventsCountOnYearView: false,
      isScheduledEventsShow: false,
      isFriendsListShow: false,
      locale: 'uk',
      disableViews: [
        mockData.value.schedulerActiveViews.WEEK,
        mockData.value.schedulerActiveViews.YEAR,
        mockData.value.schedulerActiveViews.YEARS,
      ],
      selectedDate: '',
    });

    function startDragScheduler(e) {
      dragging.value = true;
      dragStartPosition.value = e.touches[0].pageY;
    }

    function finishDragScheduler() {
      dragging.value = false;
    }

    function dragScheduler(e) {
      const draggedDist = e.touches[0].pageY - dragStartPosition.value;

      if (dragging.value) {
        switch (detectedDevice.value) {
          case DEVICE_TYPES.MOBILE_SMALL: {
            if (
              schdulerCommonBlockHeight.value <= mobileMinHeight &&
              draggedDist < 0
            ) {
              return;
            }
          }
          case DEVICE_TYPES.MOBILE || DEVICE_TYPES.TABLET: {
            if (
              schdulerCommonBlockHeight.value <= tabletMinHeight &&
              draggedDist < 0
            ) {
              return;
            }
          }
        }
        draggedDistance.value = draggedDist;
      }
    }

    function formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    }

    function backToTheMonthView() {
      schedulerConfig.value.activeView =
        mockData.value.schedulerActiveViews.MONTH;
      configureScheduler(mockData.value.schedulerActiveViews.MONTH);
    }

    function switchTab(tabId) {
      if (sidebarSelectedTabId.value !== tabId) {
        sidebarSelectedTabId.value = tabId;

        switch (sidebarSelectedTabId.value) {
          case mockData.value.sideBarTabs.FRIENDS_PLANNED: {
            schedulerConfig.value.activeView =
              mockData.value.schedulerActiveViews.DAY;
            configureScheduler(mockData.value.schedulerActiveViews.DAY);
            schedulerConfig.value.isFriendsListShow = true;
            schedulerConfig.value.isScheduledEventsShow = false;
            break;
          }
          case mockData.value.sideBarTabs.MY_PLANNED: {
            schedulerConfig.value.activeView =
              mockData.value.schedulerActiveViews.DAY;
            configureScheduler(mockData.value.schedulerActiveViews.DAY);
            schedulerConfig.value.isFriendsListShow = false;
            schedulerConfig.value.isScheduledEventsShow = true;
            schedulerConfig.value.isFriendsListShow = false;
            if (activatedUserInSidebarData.value) {
              deactivateUser();
            }
            break;
          }
        }
      }
    }

    function configureScheduler(data) {
      switch (data.view) {
        case mockData.value.schedulerActiveViews.MONTH: {
          schedulerConfig.value.small = false;
          schedulerConfig.value.xsmall = true;
          schedulerConfig.value.hideBody = false;
          schedulerConfig.value.hideTitleBar = false;
          inlineCalendarConfig.value.visible = false;

          hideBtnConfig.value.img = icons.value.close;
          hideBtnConfig.value.action = () => emit('closeWindow');

          if (isFriendsVisible.value) {
            friendsBlockSwitcher();
          }
          break;
        }
        case mockData.value.schedulerActiveViews.DAY: {
          schedulerConfig.value.small = true;
          schedulerConfig.value.xsmall = false;
          schedulerConfig.value.hideBody = true;
          schedulerConfig.value.hideTitleBar = true;
          inlineCalendarConfig.value.visible = true;
          inlineCalendarConfig.value.selectedDate = data.startDate;

          hideBtnConfig.value.img = icons.value.goBack;
          hideBtnConfig.value.action = () => backToTheMonthView();

          if (!isFriendsVisible.value) {
            friendsBlockSwitcher();
          }
          break;
        }
      }
    }

    function setSchedulerDatesRangeAndLoadData(e) {
      configureScheduler(e);

      switch (e.view) {
        case mockData.value.schedulerActiveViews.MONTH: {
          schedulerStartDate.value = cloneDeep(e.firstCellDate);
          schedulerEndDate.value = cloneDeep(e.lastCellDate);
          getScheduledEventsDotsData(
            userStore.user.id,
            formatDate(schedulerStartDate.value),
            formatDate(schedulerEndDate.value)
          );

          schedulerConfig.value.isScheduledEventsShow = false;
          schedulerConfig.value.isFriendsListShow = false;
          inlineCalendarConfig.value.specMinDate = schedulerStartDate.value;
          inlineCalendarConfig.value.specMaxDate = schedulerEndDate.value;
          break;
        }

        case mockData.value.schedulerActiveViews.DAY: {
          if (!schedulerConfig.value.isFriendsListShow) {
            schedulerConfig.value.isScheduledEventsShow = true;
          }
        }
      }
    }

    async function getScheduledEventsDotsData(userId, startDate, finishDate) {
      startSpinner();
      const response = await API.SchedulerService.getScheduledEventsData({
        user_id: userId,
        start_date: startDate,
        finish_date: finishDate,
      });
      scheduledEventsDotsData.value = response.data;
      finishSpinner();
    }

    function friendsBlockSwitcher() {
      isFriendsVisible.value = !isFriendsVisible.value;
    }
    function removeYearFromDate(title) {
      const currentYear = new Date().getFullYear();
      const splitedTitle = title.split(' ');
      const year = parseInt(splitedTitle[splitedTitle.length - 1]);

      if (!isNaN(year) && year === currentYear) {
        splitedTitle.pop();
      }

      return splitedTitle.join(' ');
    }

    function inlineCalendarChangeMonth(data) {
      inlineCalendarConfig.value.specMinDate = data.firstCellDate;
      inlineCalendarConfig.value.specMaxDate = data.lastCellDate;
      inlineCalendar.value.fillByProvidedDate(data.firstCellDate);
    }

    function activateUser(userData) {
      activateUserAndLoadData(userData);
      schedulerConfig.value.isFriendsListShow = false;
      schedulerConfig.value.isScheduledEventsShow = true;
    }

    function deactivateUser() {
      deactivateUserAndLoadData(userStore.user);
      schedulerConfig.value.isFriendsListShow = false;
      schedulerConfig.value.isScheduledEventsShow = true;
    }

    function deactivateUserEventsListTabletAndMobile() {
      deactivateUserAndLoadData(userStore.user);
      schedulerConfig.value.isFriendsListShow = true;
      schedulerConfig.value.isScheduledEventsShow = false;
    }

    function activateUserAndLoadData(userData) {
      activatedUserInSidebarData.value = userData;
      getScheduledEventsDotsData(
        userData.id,
        formatDate(schedulerStartDate.value),
        formatDate(schedulerEndDate.value)
      );
    }

    function deactivateUserAndLoadData(userData) {
      activatedUserInSidebarData.value = userData ? userData : null;
      getScheduledEventsDotsData(
        userStore.user.id,
        formatDate(schedulerStartDate.value),
        formatDate(schedulerEndDate.value)
      );
    }

    BlanballEventBus.on('activateUserInScheduler', (userData) => {
      activateUserAndLoadData(userData);
    });

    BlanballEventBus.on('deactivateUser', () => {
      deactivateUserAndLoadData();
    });

    BlanballEventBus.on('switchedSchedulerSidebarTab', (tabId) => {
      sidebarSelectedTabId.value = tabId;
    });

    onBeforeUnmount(() => {
      BlanballEventBus.off('activateUserInScheduler');
      BlanballEventBus.off('switchedSchedulerSidebarTab');
      BlanballEventBus.off('deactivateUser');
    });

    watch(
      () => detectedDevice.value,
      (newVal) => {
        switch (newVal) {
          case DEVICE_TYPES.MOBILE_SMALL: {
            break;
          }
          case DEVICE_TYPES.MOBILE: {
            break;
          }
          case DEVICE_TYPES.TABLET: {
            if (
              sidebarSelectedTabId.value ===
                mockData.value.sideBarTabs.FRIENDS_PLANNED &&
              !schedulerConfig.value.isFriendsListShow
            ) {
              schedulerConfig.value.isScheduledEventsShow = false;
              schedulerConfig.value.isFriendsListShow = true;
            }
            break;
          }
          case DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP: {
            if (schedulerConfig.value.isFriendsListShow) {
              schedulerConfig.value.isFriendsListShow = false;
              schedulerConfig.value.isScheduledEventsShow = true;
              sidebarSelectedTabId.value =
                mockData.value.sideBarTabs.FRIENDS_PLANNED;
              BlanballEventBus.emit('schedulerSidebarForceSwitchTab', {
                tabId: mockData.value.sideBarTabs.FRIENDS_PLANNED,
                userData: activatedUserInSidebarData.value,
              });
            }
            break;
          }
        }
      }
    );

    return {
      isFriendsVisible,
      isThreeDotsShown,
      schedulerConfig,
      mockData,
      scheduledEventsDotsData,
      hideBtnConfig,
      scheduledBottomBlockStyle,
      schedulerCommonBlock,
      todayDate,
      inlineCalendarActiveDateDotsColor,
      inlineCalendarConfig,
      isTopPlanEventButtonVisible,
      sidebarSelectedTabId,
      isMainBottomSideContentVisible,
      activatedUserInSidebarData,
      scheduledEventsHeight,
      schedulerCommonBlockStyle,
      inlineCalendar,
      dotsColor,
      maxDotsCount,
      icons,
      formatDate,
      finishDragScheduler,
      activateUser,
      startDragScheduler,
      dragScheduler,
      deactivateUserEventsListTabletAndMobile,
      switchTab,
      setSchedulerDatesRangeAndLoadData,
      friendsBlockSwitcher,
      inlineCalendarChangeMonth,
      removeYearFromDate,
    };
  },
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-bef0ef: #bef0ef;
$color-e9fcfb: #e9fcfb;

:deep {
  .inline-calendar {
    @include beforeDesktop {
      width: calc(100% + 40px);
      margin-left: -20px;
      padding-right: 0px;
    }

    @include mobile {
      width: calc(100% + 32px);
      margin-left: -16px;
    }
  }

  .vuecal__flex[grow] {
    @include mobile {
      flex: none !important;
    }
  }

  .vuecal__cell--selected {
    background: transparent;
  }

  .c-tabs {
    margin-bottom: 0px;
    margin-top: 8px;
    height: 40px;

    @include beforeDesktop {
      width: 464px;
      margin: 0 auto;
      margin-top: 8px;
    }
    @include mobile {
      width: inherit;
    }
  }
}

.c-schduled-events-list {
  overflow: scroll;
}

.c-friends-list {
  overflow: scroll;
  display: none;

  :deep(.c-user-card) {
    width: 100%;
  }

  @include beforeDesktop {
    display: block;
  }
}

.c-scheduler-wrapper {
  @include modal-wrapper($z-index: 500);
  display: flex;
  justify-content: flex-end;
  font-family: 'Inter', sans-serif;
  padding: 8px;
  .c-common-block {
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    height: fit-content;
    position: absolute;
    right: 160px;

    @include beforeDesktop {
      right: 0px;
      padding: 20px;
      width: 100%;
      border-radius: 0px;
      border-radius: 0px 0px 12px 12px;
      padding-bottom: 32px;
      padding-top: 0px;
    }

    @include mobile {
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 0px 0px 12px 12px;
      padding: 16px;
      padding-bottom: 32px;
      padding-top: 0px;
    }

    .c-scheduler-bottom-side {
      display: none;
      @include beforeDesktop {
        display: block;
      }

      .c-plan-event-button {
        :deep(.b_white-btn) {
          font-weight: 400;
          margin-bottom: 10px;
          width: 464px !important;
          margin: 0 auto;

          @include mobile {
            width: 100% !important;
          }
        }
      }

      .c-invite-selected-user-to-event {
        :deep(.b-green-btn) {
          width: 464px !important;
          margin: 0 auto;
          @include mobile {
            width: 100% !important;
          }
        }
      }
    }

    .c-right-block {
      z-index: 1;
      background: $--b-main-white-color;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .c-top-line {
        padding-bottom: 12px;
        position: relative;

        @include mobile {
          display: none;
        }

        .c-top-line__left-block {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 32px;

          .c-current-date {
            @include inter(14px, 500, $--b-main-gray-color);
            line-height: 20px;
            text-align: center;

            span {
              @include inter(14px, 500);
            }
          }

          .c-plan-event-button {
            :deep(.b_white-btn) {
              font-weight: 400;
            }

            @include beforeDesktop {
              display: none;
            }
          }
        }
        .c-hide-btn {
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
        }
      }
      .c-scheduler-block {
        width: 704px;
        height: 644px;
        box-shadow: none;
        @include beforeDesktop {
          width: 100%;
        }

        @include mobile {
          height: fit-content;
        }

        :deep {
          .vuecal__title {
            @include mobile {
              width: calc(100% - 105px);
              margin: 0px !important;
            }
          }
        }

        .c-sheduled-content-on-specific-day {
          :deep {
            .inline-calendar {
              padding: 0px;

              .vuecal__title {
                @include mobile {
                  width: fit-content !important;
                  margin: 0px 30px !important;
                }
              }
            }
          }

          .c-specific-day__main-content {
            @include beforeDesktop {
              padding: 0px 56px;
            }
            @include tabletAndMobile {
              padding: 0px 32px;
            }
            @include mobile {
              padding: 0px;
            }
          }
        }

        :deep {
          .vuecal__flex.vuecal.vuecal--day-view.vuecal--uk.vuecal--no-time.vuecal--small.vuecal--has-touch {
            display: none;
          }
          .vuecal__flex.vuecal.vuecal--day-view.vuecal--uk.vuecal--no-time.vuecal--small {
            display: none;
          }
        }

        .c-inline-cal-title {
          :deep {
            .vuecal__weekdays-headings,
            .vuecal__body {
              display: none;
            }
          }
        }

        &::v-deep {
          .vuecal__cell--today {
            background: transparent;

            .c-cell-wrapper {
              .c-cell-number {
                span {
                  background: $--b-main-green-color;
                  border-radius: 4px;
                  padding: 0px 10px;
                  color: $--b-main-white-color;
                  @include mobile {
                    padding: 4px;
                  }
                }
              }
            }
          }
          .vuecal {
            box-shadow: none;
            .vuecal__header {
              .vuecal__title-bar {
                background: none;
                justify-content: center;

                @include mobile {
                  background: #f9f9fc;
                  width: calc(100% + 40px);
                  margin-left: -20px;
                }
                .vuecal__title {
                  flex: 0;
                  margin: 0 30px;
                }
                .c-title {
                  font-weight: 500;
                  font-size: 12px;
                  color: $--b-main-black-color;
                }
              }
              .vuecal__menu {
                display: none;
              }
              .vuecal__weekdays-headings {
                border: none;

                @include mobile {
                  background: #f9f9fc;
                  width: calc(100% + 40px);
                  margin-left: -20px;
                  padding: 0px 20px;
                  margin-bottom: 8px;
                }

                .xsmall {
                  @include inter(12px, 500, $--b-main-gray-color);
                  line-height: 20px;
                  text-align: center;
                }
                .vuecal__heading {
                  font-weight: 600;
                }
              }
            }
            .vuecal__body {
              .vuecal__cell {
                border-left: 1px solid #f0f0f4;
                border-bottom: 1px solid #f0f0f4;

                &:nth-child(-n + 7):not(:nth-child(8)) {
                  border-top: 1px solid #f0f0f4;
                }

                &:nth-child(7n) {
                  border-right: 1px solid #f0f0f4;
                }
                &::before {
                  right: 0;
                  bottom: 0;
                  border: none;
                  width: fit-content;
                }
                @include mobile {
                  border: none !important;
                }

                .vuecal__flex[column] {
                  @include mobile {
                    flex: none !important;
                  }
                }

                .vuecal__cell-content {
                  @include mobile {
                    width: fit-content;
                    height: fit-content;
                  }
                  .c-cell-wrapper {
                    height: 100%;
                    padding-top: 12px;
                    position: relative;
                    @include mobile {
                      width: 46px;
                      height: 52px;
                    }
                  }
                  &:hover {
                    background: $color-e9fcfb;
                    color: $--b-main-green-color;
                  }
                  .c-event-dots {
                    margin-top: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
