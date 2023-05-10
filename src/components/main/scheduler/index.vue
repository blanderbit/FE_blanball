<template>
  <div @click.self="$emit('closeWindow')" class="c-scheduler-wrapper">
    <ContextModal
      v-if="isContextMenuActive"
      :clientX="contextMenuX"
      :clientY="contextMenuY"
      :modalItems="mockData.contextMenuItems"
      @closeModal="closeContextMenu"
      @itemClick="contextMenuItemClick"
    />

    <div class="c-common-block">
      <!-- Sidebar Slot -->
      <slot
        name="LeftSidebar"
        :isFriendsVisible="isFriendsVisible"
        :friendsBlockSwitcher="friendsBlockSwitcher"
      ></slot>
      <!-- Sidebar Slot -->
      <div class="c-right-block">
        <div class="c-friends-line">
          <slot
            name="TopFriendsBlock"
            :isFriendsVisible="isFriendsVisible"
            :friendsBlockSwitcher="friendsBlockSwitcher"
          ></slot>
          <div class="c-hide-btn" @click="$emit('closeWindow')">
            <img src="../../../assets/img/scheduler/close-icton.svg" alt="" />
          </div>
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
          </VueInlineCalendar>
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
              <div
                class="c-cell-wrapper"
                @mouseover="mouseOverCell(cell.formattedDate)"
                @mouseleave="mouseLeaveCell"
              >
                <div
                  v-if="showCornerThreeDots(cell.formattedDate)"
                  class="c-three-dots"
                  @click="openContextMenu"
                >
                  <div v-for="i in 3" :key="i" class="c-menu-dots"></div>
                </div>
                <div class="c-cell-number">
                  <span v-if="cell.content">{{ cell.content }}</span>
                </div>
                <div class="c-event-dots">
                  <slot
                    name="dots"
                    :dotsData="
                      scheduledEventsDotsData &&
                      scheduledEventsDotsData[cell.formattedDate]
                    "
                    :myEventsDotsColor="myEventsDotsColor"
                    :participationEventsDotsColor="participationEventsDotsColor"
                  ></slot>
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
import { computed, ref, watchEffect } from 'vue';

import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import VueCal from 'vue-cal';
import VueInlineCalendar from '../inlineCalendar/index.vue';

import ContextModal from '../../shared/modals/ContextModal.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '../../../stores/userData';
import {
  startSpinner,
  finishSpinner,
} from '../../../workers/loading-worker/loading.worker';

import { CONSTS } from '../../../consts';

import 'vue-cal/dist/vuecal.css';

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
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['closeWindow'],
  setup(props) {
    const isFriendsVisible = ref(false);
    const isThreeDotsShown = ref(false);
    const currentCellDay = ref('');
    const currentCellMonth = ref('');
    const scheduledEventsDotsData = ref({});
    const myEventsDotsColor = ref(props.config.myEventsDotColor || '#148581');
    const participationEventsDotsColor = ref(
      props.config.otherEventsDotColor || '#D62953'
    );
    const userStore = useUserDataStore();

    const schedulerStartDate = ref(null);
    const schedulerEndDate = ref(null);

    const isContextMenuActive = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);

    const mockData = computed(() => {
      return {
        contextMenuItems: CONSTS.scheduler.contextMenuItems,
      };
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
      activeView: SCHEDULER_ACTIVE_VIEWS.MONTH,
      eventsCountOnYearView: false,
      locale: 'uk',
      disableViews: [
        SCHEDULER_ACTIVE_VIEWS.WEEK,
        SCHEDULER_ACTIVE_VIEWS.YEAR,
        SCHEDULER_ACTIVE_VIEWS.YEAR,
      ],
      selectedDate: '',
    });

    watchEffect(() => {
      switch (schedulerConfig.value.activeView) {
        case SCHEDULER_ACTIVE_VIEWS.MONTH: {
          schedulerConfig.value.small = false;
          schedulerConfig.value.xsmall = true;
          schedulerConfig.value.hideBody = false;
          schedulerConfig.value.hideTitleBar = false;
          inlineCalendarConfig.value.visible = false;

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

          if (!isFriendsVisible.value) {
            friendsBlockSwitcher();
          }
          break;
        }
      }
    });

    function setSchedulerDatesRangeAndLoadData(e) {
      if (e.view === SCHEDULER_ACTIVE_VIEWS.MONTH) {
        schedulerStartDate.value = cloneDeep(e.firstCellDate);
        schedulerEndDate.value = cloneDeep(e.lastCellDate);
        getScheduledEventsDotsData(
          userStore.user.id,
          dayjs(schedulerStartDate.value).format('YYYY-MM-DD'),
          dayjs(schedulerEndDate.value).format('YYYY-MM-DD')
        );

        inlineCalendarConfig.value.specMinDate = schedulerStartDate.value;
        inlineCalendarConfig.value.specMaxDate = schedulerEndDate.value;
      }
    }

    function openContextMenu(e) {
      contextMenuX.value = e.clientX;
      contextMenuY.value = e.clientY;
      isContextMenuActive.value = true;
    }

    function closeContextMenu() {
      isContextMenuActive.value = false;
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

    function contextMenuItemClick(itemType) {
      console.log(itemType);
    }

    function friendsBlockSwitcher() {
      isFriendsVisible.value = !isFriendsVisible.value;
    }
    function mouseOverCell(val) {
      currentCellDay.value = +val.split('-')[1];
      currentCellMonth.value = +val.split('-')[2];
    }
    function mouseLeaveCell() {
      currentCellDay.value = '';
      currentCellMonth.value = '';
    }
    function removeYearFromDate(title) {
      return title.split(' ')[0];
    }
    function showCornerThreeDots(val) {
      return (
        currentCellDay.value === +val.split('-')[1] &&
        currentCellMonth.value === +val.split('-')[2]
      );
    }

    return {
      isFriendsVisible,
      isThreeDotsShown,
      currentCellDay,
      currentCellMonth,
      schedulerConfig,
      mockData,
      scheduledEventsDotsData,
      isContextMenuActive,
      contextMenuY,
      contextMenuX,
      myEventsDotsColor,
      inlineCalendarConfig,
      participationEventsDotsColor,
      closeContextMenu,
      contextMenuItemClick,
      openContextMenu,
      setSchedulerDatesRangeAndLoadData,
      friendsBlockSwitcher,
      mouseOverCell,
      mouseLeaveCell,
      removeYearFromDate,
      showCornerThreeDots,
    };
  },
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-bef0ef: #bef0ef;
$color-e9fcfb: #e9fcfb;

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

    .c-right-block {
      z-index: 1;
      background: $--b-main-white-color;
      .c-friends-line {
        padding-bottom: 14px;
        height: 51px;
        position: relative;
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
                .vuecal__heading {
                  font-weight: 600;
                }
              }
            }
            .vuecal__body {
              .vuecal__cell {
                &::before {
                  right: 0;
                  bottom: 0;
                }
                .vuecal__cell-content {
                  .c-cell-wrapper {
                    height: 100%;
                    padding-top: 12px;
                    position: relative;
                    .c-three-dots {
                      position: absolute;
                      top: 0;
                      right: 0;
                      width: 28px;
                      height: 28px;
                      right: 0px;
                      background: $color-bef0ef;
                      border-radius: 0px 0px 0px 4px;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      cursor: pointer;
                      .c-menu-dots {
                        width: 3px;
                        height: 3px;
                        background: $--b-main-green-color;
                        border-radius: 50%;
                        margin-bottom: 2px;
                      }
                    }
                    &:hover {
                      background: $color-e9fcfb;
                      color: $--b-main-green-color;
                    }
                    .c-event-dots {
                      margin-top: 10px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      display: flex;
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
}
</style>
