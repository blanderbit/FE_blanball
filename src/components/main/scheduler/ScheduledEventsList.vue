<template>
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
        <div
          :class="[
            'c-scheduled-event',
            { finished: event.status === 'Finished' },
          ]"
        >
          <div class="c-event-main-info">
            <div class="c-event-type">Дружній матч</div>
            <div class="c-event-time">17:00 – 19:00</div>
          </div>
          <div class="c-expand-event-button"></div>
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

import SimpleListWrapper from '../../shared/simpleList/SimpleList.vue';
import NoScheduledEvents from './NoScheduledEvents.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { getDate } from '../../../utils/getDate';

export default {
  components: {
    SimpleListWrapper,
    NoScheduledEvents,
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

    watch(
      () => props.date,
      () => {
        getPlannedEvents(1);
      }
    );

    return {
      totalCount,
      getPlannedEvents,
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
    background: #fcfcfc;
    border: 1px solid #148783;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 12px;
    justify-content: space-between;
    margin-top: 12px;

    .c-event-main-info {
      @include inter(14px, 400);
      display: flex;
      align-items: center;
      gap: 8px;
      line-height: 20px;
    }
  }
}
</style>
