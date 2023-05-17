<template>
  <div
    :class="[
      'c-scheduled-event',
      eventData.status,
      { selected: eventData.id === selectedEventId },
    ]"
  >
    <div class="c-event-main-info">
      <div class="c-event-type">
        {{ $t('events.friendly-match') }}
      </div>
      <div class="c-event-time">
        {{ eventData.time }} –
        {{ eventData.end_time }}
      </div>
    </div>
    <div class="c-manage-event-block">
      <img
        :src="getEventCrossIcon(eventData.status)"
        alt=""
        @click="$emit('declineEvent', eventData)"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import grayCrossIcon from '../../../assets/img/gray-cross.svg';
import blackCrossIcon from '../../../assets/img/cross.svg';
import greenCrossIcon from '../../../assets/img/green-cross.svg';

const EVENT_STATUSES = {
  PLANNED: 'Planned',
  ACTIVE: 'Active',
  FINISHED: 'Finished',
};

export default {
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
    selectedEventId: {
      type: Number,
      default: 0,
    },
  },
  setup() {
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

    return {
      getEventCrossIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-scheduled-event {
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 12px;
  justify-content: space-between;
  cursor: pointer;
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
</style>
