<template>
  <SubmitModal
    v-if="isSubmitModalOpened"
    :config="submitModalConfig"
    @closeModal="closeSubmitModal"
    @deleteEvent="deleteEvent"
    @leaveFromTheEvent=""
    @continue="closeSubmitModal"
  />
  <div class="c-total-count-scheduled-events">
    <div class="c-today">{{ $t('scheduler.today') }}</div>
    <div class="c-count-scheduled">
      <span v-if="totalCount > 0">{{
        $t('scheduler.planned-count', { count: totalCount })
      }}</span>
      <span v-else>{{ $t('scheduler.not-planned') }}</span>
    </div>
  </div>
  <div class="c-scheduled-events__list">
    <SimpleListWrapper :requestForGetData="getPlannedEvents">
      <template #default="{ smartListItem: event }">
        <div :class="['c-scheduled-event', event.status]">
          <div class="c-event-main-info">
            <div class="c-event-type">Дружній матч</div>
            <div class="c-event-time">17:00 – 19:00</div>
          </div>
          <div class="c-manage-event-block">
            <img
              src="../../../assets/img/gray-cross.svg"
              alt=""
              @click="declineEvent(event)"
            />
          </div>
        </div>
      </template>
      <template #emptyList>
        <NoScheduledEvents :userData="userData" />
      </template>
    </SimpleListWrapper>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import SimpleListWrapper from '../../shared/simpleList/SimpleList.vue';
import NoScheduledEvents from './NoScheduledEvents.vue';
import SubmitModal from '../../shared/modals/SubmitModal.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { getDate } from '../../../utils/getDate';

import grayCrossIcon from '../../../assets/img/gray-cross.svg';
import blackCrossIcon from '../../../assets/img/cross.svg';
import greenCrossIcon from '../../../assets/img/green-cross.svg';

export default {
  components: {
    SimpleListWrapper,
    NoScheduledEvents,
    SubmitModal,
  },
  props: {
    userData: {
      type: Number,
    },
    date: {
      type: String,
    },
  },
  setup(props) {
    const totalCount = ref(0);
    const isSubmitModalOpened = ref(false);
    const submitModalConfig = ref({});
    const { t } = useI18n();
    const declineEventData = ref({});

    const getPlannedEvents = (page) => {
      return API.SchedulerService.getScheduledEventsDataOnSpecificDay({
        user_id: props.userData.id,
        date: props.date,
        page: page,
      }).then((response) => {
        response.data.results = response.data.results.map((event) => {
          return {
            ...event,
            date_and_time: getDate(event.date_and_time),
          };
        });
        totalCount.value = response.data.total_count;
        return response;
      });
    };

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
    return {
      totalCount,
      isSubmitModalOpened,
      submitModalConfig,
      getPlannedEvents,
      closeSubmitModal,
      deleteEvent,
      showSubmitModal,
      declineEvent,
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
