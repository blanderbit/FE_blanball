<template>
  <div
    :class="['c-scheduled-event', eventData.status, { opened: isEventOpened }]"
    @click="$emit('openEvent', eventData.id)"
  >
    <div :class="['c-scheduled-event-top-side', { opened: isEventOpened }]">
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
    <div v-if="isEventOpened" class="c-scheduled-event-main-side">
      <div class="c-main-side__top-block">
        <div class="c-event-name">{{ eventData.name }}</div>
      </div>
      <div class="c-main-side__center-block">
        <div class="c-main-side__participants">
          <span>Учасники</span>
          <div class="c-participants__list">
            {{ eventData }}
            <UserAvatar
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import UserAvatar from '../../shared/userAvatar/UserAvatar.vue'

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
    openedEventId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    UserAvatar,
  },
  emits: ['openEvent'],
  setup(props) {
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

    const isEventOpened = computed(() => {
      return props.openedEventId === props.eventData.id;
    });

    return {
      isEventOpened,
      getEventCrossIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-scheduled-event {
  width: 100%;
  border-radius: 6px;
  padding: 12px;
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

  .c-scheduled-event-top-side {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.opened {
      padding-bottom: 12px;
    }
  }

  .c-scheduled-event-main-side {
    padding-top: 12px;
    border-top: 1px solid #f0f0f4;

    .c-main-side__top-block {
      .c-event-name {
        @include exo(18px, 700);
        line-height: 24px;
      }
    }
    .c-main-side__center-block {
      padding: 16px;
      background: #f9f9fc;
      border-radius: 6px;
      margin-top: 12px;

      .c-main-side__participants {
        span {
          @include inter(13px, 400, $--b-main-gray-color);
          line-height: 20px;
        }
      }
    }
  }

  &.opened {
  }

  .c-event-main-info {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 20px;
  }
}
</style>
