<template>
  <div ref="el" class="b-right-sidebar">
    <div class="b-right-sidebar__title-block">
      <div class="b-right-sidebar__title">{{ $t('events.popular-events') }}</div>
      <div class="b-right-sidebar__subtitle">{{ $t('events.your-popular-events') }}</div>
    </div>

      <div :style="eventCardsStyle" class="b-right-sidebar__cards-block">
      <Spinner v-if="loading" />
      <div v-for="event in popularEvents">
        <SmallEventCard :item="event" @clickSmallEventCard="goToEventPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router";

import { useElementSize } from '@vueuse/core'

import SmallEventCard from './SmallEventCard.vue'
import Spinner from "../workers/infinit-load-worker/Spinner.vue";

import { API } from "../workers/api-worker/api.worker";
import { addMinutes } from '../utils/addMinutes'
import { getDate } from '../utils/getDate'
import { getTime } from '../utils/getTime'

import { ROUTES } from "../router/router.const";


const el = ref(null)
const { width, height } = useElementSize(el)

const popularEvents = ref([])
const router = useRouter();
const loading = ref(false)

const eventCardsStyle = computed(() => {
  return {
    'height': height.value - 126 + 'px',
    'overflow': 'scroll'
  }
})

const getPopularEvents = (page) => {
  loading.value = true
  return API.EventService.getPopularEventsListEvents(
    {
      page
    }
  ).then(result => ({
    data: {
      results: result.data.results.map((i) => {
        return {
          ...handlingIncomeData(i)
        }
      }),
    },
  }))
}

getPopularEvents().then((value) => {
  popularEvents.value = value.data.results
  loading.value = false
})

function handlingIncomeData(item) {
  return {
    ...item,
    date: getDate(item.date_and_time),
    time: getTime(item.date_and_time),
    end_time: addMinutes(getTime(item.date_and_time), item.duration),
  }
}

function goToEventPage(id) {
  router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(id))
}

</script>

<style lang="scss" scoped>
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
      color: #262541;
    }

    .b-right-sidebar__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
  }

  .b-right-sidebar__cards-block {
    margin-top: 20px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }
}
</style>
