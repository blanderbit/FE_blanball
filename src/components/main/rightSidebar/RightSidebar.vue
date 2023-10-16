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
      <smallLoader v-if="loading" />
      <div v-if="popularEvents.length" v-for="event in popularEvents">
        <SmallEventCard :item="event" @clickSmallEventCard="goToEventPage" />
      </div>
      <div
        v-if="!popularEvents.length && !loading"
        class="b-right-sidebar__no-events"
      >
        <img src="@images/info-black.svg" alt="" />
        <span>{{ $t('no_records.noPopularEvents.title') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>


import SmallEventCard from '@mainComponents/events/SmallEventCard.vue';
import smallLoader from '@sharedComponents/loader/SmallLoader.vue';


import { addMinutes } from '@utils/addMinutes';
import { getDate } from '@utils/getDate';
import { getTime } from '@utils/getTime';




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

const onUserJoinedEvent = (data) => {
  const event = popularEvents.value.find((event) => event.id === data.eventId);

  if (event) {
    event.request_user_role = data.participateType;
  }
};

const onUserLeftEvent = (data) => {
  const event = popularEvents.value.find((event) => event.id === data.eventId);

  if (event) {
    event.request_user_role = '';
  }
};

EventBusInstance.on('userJoinedEvent', onUserJoinedEvent);
EventBusInstance.on('userLeftEvent', onUserLeftEvent);

onBeforeUnmount(() => {
  EventBusInstance.off('userLeftEvent', onUserLeftEvent);
  EventBusInstance.off('userJoinedEvent', onUserJoinedEvent);
});

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
    @include calc-height(72px, 90px, 20px);
    overflow: scroll;
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
