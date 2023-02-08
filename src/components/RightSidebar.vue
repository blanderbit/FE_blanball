<template>
  <div class="b-right-sidebar">
    <div class="b-right-sidebar__title-block">
      <div class="b-right-sidebar__title">{{ randomElement.title }}</div>
      <div class="b-right-sidebar__subtitle">{{ randomElement.subTitle }}</div>
    </div>
    <div class="b-right-sidebar__cards-block">
      <SimpleListWrapper :requestForGetData="randomElement.request">
        <template #default="{ smartListItem: item }">
          <SmallEventCard
              :item="item"
          />
        </template>
        <template #emptyList>
          Указать верстку что пустой список для запланированых ивентов TODO
        </template>
      </SimpleListWrapper>
    </div>
  </div>
</template>

<script setup>
import SmallEventCard from './SmallEventCard.vue'
import SimpleListWrapper from './simple-list/SimpleListWrapper.vue'
import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'
import { API } from "../workers/api-worker/api.worker";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const {t} = useI18n();
const getPlanedEvents = (page) => { // TODO DUBLICATE
  return API.EventService.getPlannedUserEvents(
    {
      page
    }
  ).then(result => ({
    data: {
      results: result.data.map((i, index) => {
        i.id = index;
        i.time = `${dayjs(i.time_created)
          .locale(dayjsUkrLocale)
          .format('hh : mm')}`;
        i.date = `${dayjs(i.time_created)
          .locale(dayjsUkrLocale)
          .format('D MMMM')}`;
        return {
          ...i
        }
      })
    }
  }))
}

const getPopularEvents = (page) => { // TODO DUBLICATE
  return API.EventService.getPopularEventsListEvents(
    {
      page
    }
  ).then(result => ({
    data: {
      results: result.data.map((i, index) => {
        i.id = index;
        i.time = `${dayjs(i.time_created)
          .locale(dayjsUkrLocale)
          .format('hh : mm')}`;
        i.date = `${dayjs(i.time_created)
          .locale(dayjsUkrLocale)
          .format('D MMMM')}`;
        return {
          ...i
        }
      })
    }
  }))
}

const randomElement = computed(() => [
  {
    title: t('events.planned-events'),
    subTitle: t('events.your-events'),
    request: getPlanedEvents
  },
  {
    title: t('events.popular-events'),
    subTitle: t('events.your-popular-events'),
    request: getPopularEvents
  }
].getRandomElement());
</script>

<style lang="scss" scoped>
.b-right-sidebar {
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
  }
}
</style>