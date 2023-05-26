<template>
  <div @click.self="closeScheduler" class="c-scheduler-wrapper">
    <Teleport to="body">
      <JoinScheduledEventModal
        v-if="isJoinScheduledEventModalOpened"
        :eventData="joinEventData"
        @closeModal="closeJoinScheduledEventModal"
      />
    </Teleport>
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
        <div
          class="c-top-line"
          :style="`padding-bottom: ${isTopSideTabsVisible ? 0 : 12}px`"
        >
          <SchedulerTabs
            v-if="isTopSideTabsVisible"
            :selectedTabId="sidebarSelectedTabId"
            @switchTab="switchTab"
          />
          <div v-else class="c-top-line__left-block">
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
                @click-function="goToTheCreateEvent"
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
              :showMonth="inlineCalendarConfig.showMonth"
              :showYear="inlineCalendarConfig.showYear"
              :itemWidth="inlineCalendarConfig.itemWidth"
              :locale="inlineCalendarConfig.locale"
              :showButtons="inlineCalendarConfig.showButtons"
              @ready="fillInlineCalendar"
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
                    :minDate="inlineCalendarConfig.title.minDate"
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
        <div class="c-scheduler-bottom-side" :style="scheduledBottomBlockStyle">
          <div
            v-if="isMainBottomSideContentVisible"
            class="c-bottom-side-main-content"
          >
            <div class="c-plan-event-button">
              <WhiteBtn
                v-if="
                  bottomSidePlanEventButtonConfig.type ===
                  bottomSidePlanEventButtonTypes.WHITE_BTN
                "
                :text="$t('scheduler.plan-event')"
                :height="bottomSidePlanEventButtonConfig.height"
                :icon="bottomSidePlanEventButtonConfig.icon"
                :mainColor="'#575775'"
                :isBorder="true"
                :borderColor="'#DFDEED'"
                @click-function="goToTheCreateEvent"
              />
              <GreenBtn
                v-else
                :text="$t('scheduler.plan-event')"
                :height="bottomSidePlanEventButtonConfig.height"
                :icon="bottomSidePlanEventButtonConfig.icon"
                @click-function="goToTheCreateEvent"
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
              @click-function="goToTheCreateEvent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

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
import JoinScheduledEventModal from './modals/JoinScheduledEventModal.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '../../../stores/userData';
import {
  startSpinner,
  finishSpinner,
} from '../../../workers/loading-worker/loading.worker';
import { BlanballEventBus } from '../../../workers/event-bus-worker';
import { useWindowWidth } from '../../../utils/widthScreen';
import { useElementSize } from '@vueuse/core';
import { calcHeight } from '../../../utils/calcHeight';

import { CONSTS } from '../../../consts';
import { ROUTES } from '../../../router/router.const';

import 'vue-cal/dist/vuecal.css';

import closeIcon from '../../../assets/img/scheduler/close-icton.svg';
import goBackIcon from '../../../assets/img/back-arrow.svg';
import grayClockIcon from '../../../assets/img/scheduler/gray-clock.svg';
import whiteClockIcon from '../../../assets/img/scheduler/white-clock.svg';
import inviteUserIcon from '../../../assets/img/add-user-white.svg';

const mobileVersionSchedulerBottomMargin = 240;

const desktopMinHeight = 520;
const tabletMinHeight = 495;
const mobileMinHeight = 540;

const bottomSidePlanEventButtonTypes = {
  GREEN_BTN: 'greenBtn',
  WHITE_BTN: 'whiteBtn',
};

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
    JoinScheduledEventModal,
    SchedulerTabs,
    WhiteBtn,
  },
  props: {
    marginTop: {
      type: Number,
      default: 80,
    },
  },
  emits: ['closeWindow'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const inlineCalendar = ref();
    const isFriendsVisible = ref(false);
    const scheduledEventsDotsData = ref({});
    const dotsColor = ref('#148581');
    const maxDotsCount = ref(3);
    const inlineCalendarActiveDateDotsColor = ref('#fff');
    const userStore = useUserDataStore();
    const activatedUserInSidebarData = ref(userStore.user);
    const schedulerCommonBlock = ref();
    const hideBtnConfig = ref({});
    const prevDevice = ref();
    const joinEventData = ref(null);

    const isJoinScheduledEventModalOpened = ref(false);

    const { height: schedulerCommonBlockHeight } =
      useElementSize(schedulerCommonBlock);
    const { isTablet, isMobile, isMobileSmall, detectedDevice, DEVICE_TYPES } =
      useWindowWidth();
    const { calculatedHeight: schedulerCommonBlockCalculatedHeight } =
      calcHeight(mobileVersionSchedulerBottomMargin);

    const schedulerStartDate = ref(null);
    const schedulerEndDate = ref(null);

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
        whiteClock: whiteClockIcon,
        inviteUserIcon: inviteUserIcon,
      };
    });

    const bottomSidePlanEventButtonConfig = computed(() => {
      const isMobileOrSmall = isMobile.value || isMobileSmall.value;

      return {
        type: isMobileOrSmall
          ? bottomSidePlanEventButtonTypes.WHITE_BTN
          : bottomSidePlanEventButtonTypes.GREEN_BTN,
        height: isMobileOrSmall ? 32 : 40,
        icon: isMobileOrSmall ? icons.value.grayClock : icons.value.whiteClock,
      };
    });

    const isTopSideTabsVisible = computed(() => {
      return (
        (detectedDevice.value === DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP ||
          detectedDevice.value === DEVICE_TYPES.DESKTOP) &&
        schedulerConfig.value.activeView ===
          mockData.value.schedulerActiveViews.MONTH
      );
    });

    const isMainBottomSideContentVisible = computed(() => {
      return (
        !activatedUserInSidebarData.value ||
        activatedUserInSidebarData.value?.id === userStore.user.id
      );
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
          (isTablet.value || isMobile.value ? 55 : 0) -
          (isTablet.value || (isMobile.value && !isMobileSmall.value) ? 44 : 0)
        }px`,
      };
    });

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
        height: `${schdulerCommonBlockHeight.value}px`,
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
      title: {
        minDate: new Date(),
      },
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

    function configureHideBtn(image, action) {
      if (image) {
        hideBtnConfig.value.img = image;
      }
      if (action) {
        hideBtnConfig.value.action = () => action();
      }

      if (detectedDevice.value === DEVICE_TYPES.MOBILE_SMALL) {
        BlanballEventBus.emit(
          'configureSchedulerGoBackButtonOnMobile',
          hideBtnConfig.value
        );
      }
    }

    function showJoinScheduledEventModal(eventData) {
      joinEventData.value = eventData;
      isJoinScheduledEventModalOpened.value = true;
    }

    function closeJoinScheduledEventModal() {
      joinEventData.value = null;
      isJoinScheduledEventModalOpened.value = false;
    }

    function formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    }

    function backToTheMonthView() {
      schedulerConfig.value.activeView =
        mockData.value.schedulerActiveViews.MONTH;
      switchTab(mockData.value.sideBarTabs.MY_PLANNED);
    }

    function switchTab(tabId) {
      if (sidebarSelectedTabId.value !== tabId) {
        sidebarSelectedTabId.value = tabId;

        switch (sidebarSelectedTabId.value) {
          case mockData.value.sideBarTabs.FRIENDS_PLANNED: {
            schedulerConfig.value.activeView =
              mockData.value.schedulerActiveViews.DAY;
            configureScheduler(mockData.value.schedulerActiveViews.DAY);
            if (
              detectedDevice.value === DEVICE_TYPES.DESKTOP ||
              detectedDevice.value === DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP
            ) {
              schedulerConfig.value.isFriendsListShow = false;
              schedulerConfig.value.isScheduledEventsShow = true;
              deactivateUser();
              BlanballEventBus.emit('schedulerSidebarForceSwitchTab', {
                tabId: mockData.value.sideBarTabs.FRIENDS_PLANNED,
                userData: null,
              });
            } else {
              schedulerConfig.value.isFriendsListShow = true;
              schedulerConfig.value.isScheduledEventsShow = false;
            }
            break;
          }
          case mockData.value.sideBarTabs.MY_PLANNED: {
            schedulerConfig.value.activeView =
              mockData.value.schedulerActiveViews.DAY;
            configureScheduler(mockData.value.schedulerActiveViews.DAY);

            schedulerConfig.value.isFriendsListShow = false;
            schedulerConfig.value.isScheduledEventsShow = true;
            deactivateUser(userStore.user);
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

          configureHideBtn(icons.value.close, closeScheduler);

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

          configureHideBtn(icons.value.goBack, backToTheMonthView);

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

          inlineCalendarConfig.value.title.minDate = e.startDate;
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

    function closeScheduler() {
      emit('closeWindow');
    }

    function goToTheCreateEvent() {
      if (route.name === ROUTES.APPLICATION.EVENTS.CREATE.name) {
        closeScheduler();
      } else {
        router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute);
      }
    }

    function goToTheSchedulerUsersList() {
      deactivateUserAndLoadData(userStore.user);
      schedulerConfig.value.isFriendsListShow = true;
      schedulerConfig.value.isScheduledEventsShow = false;

      configureHideBtn(icons.value.goBack, backToTheMonthView);
    }

    function inlineCalendarChangeMonth(data) {
      inlineCalendarConfig.value.specMinDate = data.firstCellDate;
      inlineCalendarConfig.value.specMaxDate = data.lastCellDate;
      inlineCalendar.value.fillByProvidedDate(data.lastCellDate);
    }

    function activateUser(userData) {
      activateUserAndLoadData(userData);
      schedulerConfig.value.isFriendsListShow = false;
      schedulerConfig.value.isScheduledEventsShow = true;

      configureHideBtn(icons.value.goBack, goToTheSchedulerUsersList);
    }

    function deactivateUser(userData) {
      deactivateUserAndLoadData(userData);
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
      if (
        sidebarSelectedTabId.value ===
        mockData.value.sideBarTabs.FRIENDS_PLANNED
      ) {
        configureHideBtn(icons.value.goBack, () => {
          BlanballEventBus.emit('schedulerSidebarForceSwitchTab', {
            tabId: mockData.value.sideBarTabs.MY_PLANNED,
            userData: userStore.user,
          });
          hideBtnConfig.value.action = () => backToTheMonthView();
        });
      }
    });

    BlanballEventBus.on('joinScheduledEvent', (eventData) => {
      if (eventData.author.id === userStore.user.id) {
        router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(eventData.id));

        if (route.name === ROUTES.APPLICATION.EVENTS.GET_ONE.name) {
          closeScheduler();
        }
      } else {
        showJoinScheduledEventModal(eventData);
      }
    });

    onBeforeUnmount(() => {
      BlanballEventBus.off('activateUserInScheduler');
      BlanballEventBus.off('switchedSchedulerSidebarTab');
      BlanballEventBus.off('deactivateUser');
      BlanballEventBus.off('joinScheduledEvent');
    });

    function configureSchedulerAfterDesktopMode() {
      if (
        prevDevice.value === DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP ||
        prevDevice.value === DEVICE_TYPES.DESKTOP
      ) {
        if (
          sidebarSelectedTabId.value ===
            mockData.value.sideBarTabs.FRIENDS_PLANNED &&
          !schedulerConfig.value.isFriendsListShow
        ) {
          if (!activatedUserInSidebarData.value) {
            schedulerConfig.value.isFriendsListShow = true;
            schedulerConfig.value.isScheduledEventsShow = false;
          }
        }
      }
    }

    function configureSchedulerAfterMobileMode() {
      if (
        prevDevice.value !== DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP &&
        prevDevice.value !== DEVICE_TYPES.DESKTOP
      ) {
        if (schedulerConfig.value.isFriendsListShow) {
          schedulerConfig.value.isScheduledEventsShow = true;
          schedulerConfig.value.isFriendsListShow = false;
          BlanballEventBus.emit('schedulerSidebarForceSwitchTab', {
            tabId: mockData.value.sideBarTabs.FRIENDS_PLANNED,
            userData: null,
          });
        } else if (schedulerConfig.value.isScheduledEventsShow) {
          BlanballEventBus.emit('schedulerSidebarForceSwitchTab', {
            tabId: mockData.value.sideBarTabs.FRIENDS_PLANNED,
            userData: activatedUserInSidebarData.value,
          });
        }
      }
    }

    watch(
      () => detectedDevice.value,
      (newDevice) => {
        switch (newDevice) {
          case DEVICE_TYPES.MOBILE_SMALL: {
            configureSchedulerAfterDesktopMode();
            prevDevice.value = DEVICE_TYPES.MOBILE_SMALL;
            break;
          }
          case DEVICE_TYPES.MOBILE: {
            configureSchedulerAfterDesktopMode();
            prevDevice.value = DEVICE_TYPES.MOBILE;
            break;
          }
          case DEVICE_TYPES.TABLET: {
            configureSchedulerAfterDesktopMode();
            prevDevice.value = DEVICE_TYPES.TABLET;
            break;
          }
          case DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP: {
            configureSchedulerAfterMobileMode();
            prevDevice.value = DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP;
            break;
          }
          case DEVICE_TYPES.DESKTOP: {
            configureSchedulerAfterMobileMode();
            prevDevice.value = DEVICE_TYPES.DESKTOP;
            break;
          }
        }
      }
    );

    watch(
      () => detectedDevice.value,
      (newDevice) => {
        if (newDevice === DEVICE_TYPES.MOBILE_SMALL) {
          configureHideBtn(...Object.values(hideBtnConfig.value));
        }
      }
    );

    watch(
      () => route.name,
      () => {
        closeScheduler();
      }
    );

    function fillInlineCalendar() {
      inlineCalendar.value.fillByProvidedDate(schedulerEndDate.value);
    }

    return {
      isFriendsVisible,
      schedulerConfig,
      mockData,
      scheduledEventsDotsData,
      joinEventData,
      hideBtnConfig,
      scheduledBottomBlockStyle,
      schedulerCommonBlock,
      isJoinScheduledEventModalOpened,
      todayDate,
      inlineCalendarActiveDateDotsColor,
      inlineCalendarConfig,
      isTopSideTabsVisible,
      isTopPlanEventButtonVisible,
      sidebarSelectedTabId,
      isMainBottomSideContentVisible,
      activatedUserInSidebarData,
      scheduledEventsHeight,
      schedulerCommonBlockStyle,
      bottomSidePlanEventButtonTypes,
      inlineCalendar,
      bottomSidePlanEventButtonConfig,
      dotsColor,
      maxDotsCount,
      icons,
      formatDate,
      closeScheduler,
      activateUser,
      goToTheCreateEvent,
      fillInlineCalendar,
      deactivateUserEventsListTabletAndMobile,
      switchTab,
      setSchedulerDatesRangeAndLoadData,
      friendsBlockSwitcher,
      inlineCalendarChangeMonth,
      showJoinScheduledEventModal,
      closeJoinScheduledEventModal,
      removeYearFromDate,
    };
  },
};
</script>

<style scoped lang="scss">
$color-f9f9fc: #f9f9fc;
$color-f0f0f4: #f0f0f4;
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
    height: 40px;

    @include beforeDesktop {
      width: 464px;
      margin: 0 auto;
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

      :deep(.c-tabs) {
        margin-top: 8px;
      }

      .c-plan-event-button {
        :deep {
          .b-green-btn,
          .b_white-btn {
            font-weight: 400;
            margin-bottom: 10px;
            width: 464px !important;
            margin: 0 auto;

            @include mobile {
              width: 100% !important;
            }
          }
        }
      }

      .c-invite-selected-user-to-event {
        :deep(.b-green-btn) {
          width: 464px !important;
          margin: 0 auto;
          @include mobile {
            width: 215px !important;
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
        display: flex;
        align-items: center;
        justify-content: space-between;

        :deep {
          .c-tabs {
            margin-top: 0px !important;
            width: 100% !important;
            margin-right: 12px;
          }
        }

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
                  background: $color-f9f9fc;
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
                  background: $color-f9f9fc;
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
                border-left: 1px solid $color-f0f0f4;
                border-bottom: 1px solid $color-f0f0f4;

                &:nth-child(-n + 7):not(:nth-child(8)) {
                  border-top: 1px solid $color-f0f0f4;
                }

                &:nth-child(7n) {
                  border-right: 1px solid $color-f0f0f4;
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
