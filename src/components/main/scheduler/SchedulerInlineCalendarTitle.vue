<template>
  <vue-cal
    :small="config.small"
    :xsmall="config.xsmall"
    :time="config.time"
    :hide-view-selector="config.hideViewSelector"
    :hide-title-bar="config.hideTitleBar"
    :hide-body="config.hideBody"
    :active-view="config.activeView"
    :events-count-on-year-view="config.eventsCountOnYearView"
    :locale="config.locale"
    :disable-views="config.disableViews"
    :selected-date="minDate"
    @viewChange="onViewChange"
  >
    <template #title="{ title }">
      <div class="c-title">
        <slot name="title" :title="title"></slot>
      </div>
    </template>
    <template #arrow-prev>
      <img src="@images/scheduler/arrow-left.svg" alt="" />
    </template>
    <template #arrow-next>
      <img src="@images/scheduler/arrow-right.svg" alt="" />
    </template>
  </vue-cal>
</template>

<script>
 

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';



export default {
  components: {
    VueCal,
  },
  emits: ['changeMonth'],
  props: {
    minDate: {
      type: Date,
      default: null,
    },
  },
  setup(_, { emit }) {
    const mockData = computed(() => {
      return {
        schedulerActiveViews: CONSTS.scheduler.SCHEDULER_ACTIVE_VIEWS,
      };
    });

    const config = ref({
      small: false,
      xsmall: true,
      time: false,
      hideViewSelector: true,
      hideTitleBar: false,
      hideBody: false,
      activeView: mockData.value.schedulerActiveViews.MONTH,
      eventsCountOnYearView: false,
      locale: 'uk',
      disableViews: [
        mockData.value.schedulerActiveViews.WEEK,
        mockData.value.schedulerActiveViews.DAY,
        mockData.value.schedulerActiveViews.YEAR,
        mockData.value.schedulerActiveViews.YEARS,
      ],
    });

    const onViewChange = (data) => {
      emit('changeMonth', data);
    };

    return {
      config,
      onViewChange,
    };
  },
};
</script>

<style></style>
