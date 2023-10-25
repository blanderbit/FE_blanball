<template>
  <SubmitModal
    v-if="isSubmitModalOpened"
    :config="submitModalConfig"
    @closeModal="closeSubmitModal"
    @deleteEvent="deleteEvent"
    @leaveFromTheEvent=""
    @continue="closeSubmitModal"
  />

  <div v-if="userData" class="c-scheduled-events__block">
    <div class="c-total-count-scheduled-events">
      <div class="c-today">{{ $t('scheduler.today') }}</div>
      <div class="c-count-scheduled">
        <span v-if="paginationTotalCount > 0">{{
          $t('scheduler.planned-count', { count: paginationTotalCount })
        }}</span>
        <span v-else>{{ $t('scheduler.not-planned') }}</span>
      </div>
    </div>
    <div class="c-scheduled-events__list">
      <SmartList
        :list="paginationElements"
        ref="refList"
        v-model:scrollbar-existing="blockScrollToTopIfExist"
      >
        <template #smartListItem="slotProps">
          <div
            :class="[
              'c-scheduled-event',
              slotProps.smartListItem.status,
              { selected: slotProps.smartListItem.id === selectedEventId },
            ]"
          >
            <div class="c-event-main-info">
              <div class="c-event-type">
                {{ $t('events.friendly-match') }}
              </div>
              <div class="c-event-time">
                {{ slotProps.smartListItem.time }} –
                {{ slotProps.smartListItem.end_time }}
              </div>
            </div>
            <div class="c-manage-event-block">
              <img
                :src="getEventCrossIcon(slotProps.smartListItem.status)"
                alt=""
                @click="declineEvent(slotProps.smartListItem)"
              />
            </div>
          </div>
        </template>
        <template #after>
          <InfiniteLoading
            :identifier="triggerForRestart"
            ref="scrollbar"
            @infinite="loadDataPaginationData(paginationPage + 1, $event)"
          >
            <NoScheduledEvents :userData="userData" />
            <template #complete>
              <ScrollToTop
                :element-length="paginationElements"
                :is-scroll-top-exist="blockScrollToTopIfExist"
                @scroll-button-clicked="scrollToFirstElement()"
              />
            </template>
          </InfiniteLoading>
        </template>
      </SmartList>
    </div>
  </div>

  <NotSelectedFriendCard v-else />
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { v4 as uuid } from 'uuid';

import NoScheduledEvents from './NoScheduledEvents.vue';
import SubmitModal from '../../shared/modals/SubmitModal.vue';
import NotSelectedFriendCard from './NotSelectedFriendCard.vue';
import SmartList from '../../shared/smartList/SmartList.vue';
import InfiniteLoading from '../infiniteLoading/InfiniteLoading.vue';
import ScrollToTop from '../../ScrollToTop.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { PaginationWorker } from '../../../workers/pagination-worker';
import { getDate } from '../../../utils/getDate';
import { getTime } from '../../../utils/getTime';
import { addMinutes } from '../../../utils/addMinutes';

import grayCrossIcon from '../../../assets/img/gray-cross.svg';
import blackCrossIcon from '../../../assets/img/cross.svg';
import greenCrossIcon from '../../../assets/img/green-cross.svg';

const EVENT_STATUSES = {
  PLANNED: 'Planned',
  ACTIVE: 'Active',
  FINISHED: 'Finished',
};

export default {
  components: {
    NoScheduledEvents,
    SubmitModal,
    NotSelectedFriendCard,
    SmartList,
    InfiniteLoading,
    ScrollToTop,
  },
  props: {
    userData: {
      type: Number,
    },
    date: {
      type: String,
    },
    scheduledEventsDotsData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const refList = ref();
    const isSubmitModalOpened = ref(false);
    const submitModalConfig = ref({});
    const { t } = useI18n();
    const declineEventData = ref({});
    const selectedEventId = ref(0);
    const triggerForRestart = ref(false);

    const blockScrollToTopIfExist = ref(false);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const icons = computed(() => {
      return {
        cross: {
          greenCross: greenCrossIcon,
          blackCross: blackCrossIcon,
          grayCross: grayCrossIcon,
        },
      };
    });

    const getEventCrossIcon = (eventStatus) => {
      switch (eventStatus) {
        case EVENT_STATUSES.PLANNED: {
          return icons.value.cross.blackCross;
        }
        case EVENT_STATUSES.ACTIVE: {
          return icons.value.cross.greenCross;
        }
        case EVENT_STATUSES.FINISHED: {
          return icons.value.cross.grayCross;
        }
      }
    };

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.SchedulerService.getScheduledEventsDataOnSpecificDay({
          user_id: props.userData.id,
          date: props.date,
          page: page,
        }),
      dataTransformation: handlingIncomeData,
    });

    function loadDataPaginationData(pageNumber, $state) {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    }

    function handlingIncomeData(event) {
      return {
        ...event,
        date: getDate(event.date_and_time),
        time: getTime(event.date_and_time),
        end_time: addMinutes(getTime(event.date_and_time), event.duration),
      };
    }

    const deleteEvent = async () => {
      await API.EventService.deleteEvents([declineEventData.value.id]);
      closeSubmitModal();
    };

    const showSubmitModal = () => {
      isSubmitModalOpened.value = true;
    };

    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
      declineEventData.value = {};
    };

    const declineEvent = (eventData) => {
      declineEventData.value = eventData;
      if (eventData.request_user_role === 'author') {
        submitModalConfig.value = {
          title: t('modals.delete_event.title'),
          description: t('modals.delete_event.main-text', {
            eventName: declineEventData.value.name,
          }),
          button_1: t('modals.delete_event.button-1-text'),
          button_2: t('modals.delete_event.button-2-text'),
          right_btn_action: 'deleteEvent',
          left_btn_action: 'closeModal',
          btn_with_1: 132,
          btn_with_2: 132,
        };
      } else {
        submitModalConfig.value = {
          title: t('modals.leave_from_event.title'),
          description: t('modals.leave_from_event.main-text', {
            eventName: declineEventData.value.name,
          }),
          button_1: t('modals.leave_from_event.button-1-text'),
          button_2: t('modals.leave_from_event.button-2-text'),
          right_btn_action: 'leaveFromTheEvent',
          left_btn_action: 'closeModal',
          btn_with_1: 130,
          btn_with_2: 110,
        };
      }
      showSubmitModal();
    };

    watch(
      () => props.userData,
      () => {
        paginationClearData();
        if (props.scheduledEventsDotsData[props.date]) {
          loadDataPaginationData(1, null);
          restartInfiniteScroll();
        }
      }
    );

    watch(
      () => props.date,
      () => {
        paginationClearData();
        if (props.scheduledEventsDotsData[props.date]) {
          loadDataPaginationData(1, null);
          restartInfiniteScroll();
        }
      }
    );

    return {
      paginationTotalCount,
      paginationElements,
      isSubmitModalOpened,
      paginationPage,
      triggerForRestart,
      submitModalConfig,
      blockScrollToTopIfExist,
      selectedEventId,
      closeSubmitModal,
      loadDataPaginationData,
      deleteEvent,
      showSubmitModal,
      declineEvent,
      getEventCrossIcon,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.c-total-count-scheduled-events {
  display: flex;
  align-items: center;
  gap: 8px;
  .c-today {
    @include inter(13px, 500, $--b-main-green-color);
    line-height: 20px;
    padding: 0px 8px 0px 0px;
    border-right: 1px solid #f0f0f4;
  }
  .c-count-scheduled {
    @include inter(13px, 500, $--b-main-gray-color);
    line-height: 20px;
  }
}
.c-scheduled-events__list {
  .c-scheduled-event {
    width: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 12px;
    justify-content: space-between;
    margin-top: 12px;
    cursor: pointer;

    &.Planned {
      background: #fcfcfc;
      border: 1px solid $--b-main-green-color;
      .c-event-main-info {
        @include inter(14px, 400);
      }
    }

    &.Active {
      background: #ecfcfb;
      border: none;

      .c-event-main-info {
        @include inter(14px, 400, $--b-main-green-color);
      }
    }

    &.Finished {
      background: #f9f9fc;
      border: none;

      .c-event-main-info {
        @include inter(14px, 400, #a8a8bd);
      }
    }

    .c-event-main-info {
      display: flex;
      align-items: center;
      gap: 8px;
      line-height: 20px;
    }
  }
}
</style>
