<template>
  <div @click.self="$emit('closeWindow')" class="c-scheduler-wrapper">
    <div class="c-common-block">
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
          <VueInlineCalendar
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
              <img src="../../../assets/img/scheduler/arrow-left.svg" alt="" />
            </template>
            <template #next-button>
              <img src="../../../assets/img/scheduler/arrow-right.svg" alt="" />
            </template>

            <template #title> </template>
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
          <ScheduledEventsList
            v-if="inlineCalendarConfig.visible"
            :date="formatDate(inlineCalendarConfig.selectedDate)"
            :userData="activatedUserInSidebarId"
          />
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
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';

import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import VueCal from 'vue-cal';
import VueInlineCalendar from '../inlineCalendar/index.vue';

import ContextModal from '../../shared/modals/ContextModal.vue';
import WhiteBtn from '../../shared/button/WhiteBtn.vue';
import ScheduledEventsDots from './ScheduledEventsDots.vue';
import ScheduledEventsList from './ScheduledEventsList.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '../../../stores/userData';
import {
  startSpinner,
  finishSpinner,
} from '../../../workers/loading-worker/loading.worker';
import { BlanballEventBus } from '../../../workers/event-bus-worker';

import { CONSTS } from '../../../consts';
import { useWindowWidth } from '../../../utils/widthScreen';

import 'vue-cal/dist/vuecal.css';

import closeIcon from '../../../assets/img/scheduler/close-icton.svg';
import goBackIcon from '../../../assets/img/back-arrow.svg';
import grayClockIcon from '../../../assets/img/scheduler/gray-clock.svg';

const SCHEDULER_ACTIVE_VIEWS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  YEARS: 'years',
};

export default {
  name: 'VueScheduler',
  components: {
    VueCal,
    ContextModal,
    VueInlineCalendar,
    ScheduledEventsDots,
    ScheduledEventsList,
    WhiteBtn,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['closeWindow'],
  setup(props, { emit }) {
    const isFriendsVisible = ref(false);
    const isThreeDotsShown = ref(false);
    const scheduledEventsDotsData = ref({});
    const dotsColor = ref(props.config.myEventsDotColor || '#148581');
    const maxDotsCount = ref(3);
    const inlineCalendarActiveDateDotsColor = ref('#fff');
    const userStore = useUserDataStore();
    const activatedUserInSidebarId = ref(userStore.user);

    const schedulerStartDate = ref(null);
    const schedulerEndDate = ref(null);

    const mockData = computed(() => {
      return {
        contextMenuItems: CONSTS.scheduler.contextMenuItems,
        dates: CONSTS.dates,
        sideBarTabs: CONSTS.scheduler.TABS_ENUM,
      };
    });

    const sidebarSelectedTabId = ref(mockData.value.sideBarTabs.MY_PLANNED);

    const icons = computed(() => {
      return {
        close: closeIcon,
        goBack: goBackIcon,
        grayClock: grayClockIcon,
      };
    });

    const isTopPlanEventButtonVisible = computed(() => {
      return (
        schedulerConfig.value.activeView === SCHEDULER_ACTIVE_VIEWS.DAY &&
        sidebarSelectedTabId.value ===
          mockData.value.sideBarTabs.FRIENDS_PLANNED
      );
    });

    const todayDate = computed(() => {
      const date = new Date();
      return `${date.getDate()} ${
        mockData.value.dates.monthNames[date.getMonth()]
      }`;
    });

    const hideBtnConfig = ref({});

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
      activeView: SCHEDULER_ACTIVE_VIEWS.MONTH,
      eventsCountOnYearView: false,
      locale: 'uk',
      disableViews: [
        SCHEDULER_ACTIVE_VIEWS.WEEK,
        SCHEDULER_ACTIVE_VIEWS.YEAR,
        SCHEDULER_ACTIVE_VIEWS.YEARS,
      ],
      selectedDate: '',
    });

    function formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    }

    function backToTheMonthView() {
      configureScheduler(SCHEDULER_ACTIVE_VIEWS.MONTH);
      schedulerConfig.value.activeView = SCHEDULER_ACTIVE_VIEWS.MONTH;
    }

    function configureScheduler(data) {
      switch (data.view) {
        case SCHEDULER_ACTIVE_VIEWS.MONTH: {
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
        case SCHEDULER_ACTIVE_VIEWS.DAY: {
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

      if (e.view === SCHEDULER_ACTIVE_VIEWS.MONTH) {
        schedulerStartDate.value = cloneDeep(e.firstCellDate);
        schedulerEndDate.value = cloneDeep(e.lastCellDate);
        getScheduledEventsDotsData(
          userStore.user.id,
          formatDate(schedulerStartDate.value),
          formatDate(schedulerEndDate.value)
        );

        inlineCalendarConfig.value.specMinDate = schedulerStartDate.value;
        inlineCalendarConfig.value.specMaxDate = schedulerEndDate.value;
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

    BlanballEventBus.on('activateUserInScheduler', (userData) => {
      activatedUserInSidebarId.value = userData;
    });

    BlanballEventBus.on('switchedSchedulerSidebarTab', (tabId) => {
      sidebarSelectedTabId.value = tabId;
    });

    onBeforeUnmount(() => {
      BlanballEventBus.off('activateUserInScheduler');
      BlanballEventBus.off('switchedSchedulerSidebarTab');
    });

    return {
      isFriendsVisible,
      isThreeDotsShown,
      schedulerConfig,
      mockData,
      SCHEDULER_ACTIVE_VIEWS,
      scheduledEventsDotsData,
      hideBtnConfig,
      todayDate,
      inlineCalendarActiveDateDotsColor,
      inlineCalendarConfig,
      isTopPlanEventButtonVisible,
      activatedUserInSidebarId,
      dotsColor,
      maxDotsCount,
      icons,
      formatDate,
      setSchedulerDatesRangeAndLoadData,
      friendsBlockSwitcher,
      removeYearFromDate,
    };
  },
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-bef0ef: #bef0ef;
$color-e9fcfb: #e9fcfb;

:deep(.inline-calendar) {
  @include beforeDesktop {
    width: calc(100% + 40px);
    margin-left: -20px;
    padding-right: 0px;
  }
}

.vuecal__flex[grow] {
  flex: none !important;
}

.c-scheduler-wrapper {
  @include modal-wrapper;
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
    top: 80px;
    right: 160px;

    @include beforeDesktop {
      right: 0px;
      padding: 20px;
      width: 100%;
    }

    @include mobile {
      padding-top: 0px;
    }

    .c-right-block {
      z-index: 1;
      background: $--b-main-white-color;
      width: 100%;
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

          .c-current-date {
            @include inter(14px, 500, $--b-main-gray-color);
            line-height: 20px;
            text-align: center;

            span {
              @include inter(14px, 500);
            }
          }

          .c-plan-event-button {
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
                }
                @include mobile {
                  border: none !important;
                }
                .vuecal__cell-content {
                  .c-cell-wrapper {
                    height: 100%;
                    padding-top: 12px;
                    position: relative;
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
