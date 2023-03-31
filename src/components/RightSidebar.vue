<template>
  <div ref="el" class="b-right-sidebar">
    <div class="b-right-sidebar__title-block">
      <div class="b-right-sidebar__title">
        {{ $t('events.popular-events') }}
      </div>
      <div class="b-right-sidebar__subtitle">
        {{ $t('events.your-popular-events') }}
      </div>
    </div>

    <div class="b-right-sidebar__cards-block">
      <Spinner v-if="loading" />
      <div v-if="popularEvents.length" v-for="event in popularEvents">
        <SmallEventCard :item="event" @clickSmallEventCard="goToEventPage" />
      </div>
      <div
        v-if="!popularEvents.length && !loading"
        class="b-right-sidebar__no-events"
      >
        <img src="../assets/img/info-black.svg" alt="" />
        <span>{{ $t('no_records.noPopularEvents.title') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount} from 'vue';
import { useRouter } from 'vue-router';

import SmallEventCard from './SmallEventCard.vue';
import Spinner from '../workers/infinit-load-worker/Spinner.vue';

import { API } from '../workers/api-worker/api.worker';
import { addMinutes } from '../utils/addMinutes';
import { getDate } from '../utils/getDate';
import { getTime } from '../utils/getTime';
import { BlanballEventBus } from '../workers/event-bus-worker';

import { ROUTES } from '../router/router.const';

const popularEvents = ref([]);
const router = useRouter();
const loading = ref(false);

const getPopularEvents = (page) => {
  loading.value = true;
  return API.EventService.getPopularEventsListEvents({
    page,
  }).then((result) => ({
    data: {
      results: result.data.results.map((i) => {
        return {
          ...handlingIncomeData(i),
        };
      }),
    },
  }));
};

getPopularEvents().then((value) => {
  popularEvents.value = value.data.results;
  loading.value = false;
});

BlanballEventBus.on('userJoinedEvent', (data) => {
  const event = popularEvents.value.find((event) => event.id === data.eventId);

  if (event) {
    console.log(data.participateType)
    event.request_user_role = data.participateType;
  }
});

BlanballEventBus.on('userLeftEvent', (data) => {
  const event = popularEvents.value.find((event) => event.id === data.eventId);

  if (event) {
    event.request_user_role = '';
  }
});

onBeforeUnmount(() => {
  BlanballEventBus.off('userLeftEvent');
  BlanballEventBus.off('userJoinedEvent');
})

function handlingIncomeData(item) {
  return {
    ...item,
    date: getDate(item.date_and_time),
    time: getTime(item.date_and_time),
    end_time: addMinutes(getTime(item.date_and_time), item.duration),
  };
}

function goToEventPage(id) {
  router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(id));
}
</script>

<style lang="scss" scoped>
$color-f9f9fc: #f9f9fc;
.b-right-sidebar {
  display: block;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;

  @media (max-width: 992px) {
    display: none;
  }

  .b-right-sidebar__title-block {
    .b-right-sidebar__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: $--b-main-black-color;
    }

    .b-right-sidebar__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: $--b-main-gray-color;
    }
  }

  .b-right-sidebar__cards-block {
    margin-top: 20px;
    height: calc(100vh - 72px - 90px - 20px);
    overflow: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }
  .b-right-sidebar__no-events {
    @include inter(13px, 400);
    line-height: 20px;
    display: flex;
    gap: 8px;
    word-break: break-word;
    border-radius: 6px;
    background: $color-f9f9fc;
    padding: 8px;
  }
}
</style>
