<template>
  <div
    :class="['c-scheduled-event', eventData.status, { opened: isEventOpened }]"
    @click="$emit('openEvent', eventData.id)"
  >
    <div :class="['c-scheduled-event-top-side', { opened: isEventOpened }]">
      <div class="c-event-main-info">
        <div :class="['c-event-type', eventData.status]">
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
          @click.stop="$emit('declineEvent', eventData)"
        />
      </div>
    </div>
    <div v-if="isEventOpened" class="c-scheduled-event-main-side">
      <div class="c-main-side__top-block">
        <div class="c-event-name">{{ eventData.name }}</div>
      </div>
      <div class="c-main-side__center-block">
        <div class="c-main-side-content-block c-main-side__participants">
          <span>Учасники</span>
          <div
            v-if="eventData.current_users.length"
            class="c-participants__list"
          >
            {{ eventData }}
            <UserAvatar />
          </div>
          <div v-else class="">На даний момент немаэ учасникив</div>
        </div>
        <div class="c-main-side-content-block c-main-side-place">
          <span>Місце проведення</span>
          <div class="c-place">Запоріжжя, Центральна, стадіон «Торпеда»</div>
        </div>
        <div class="c-main-side-content-block c-main-side-price">
          <span>Вартість</span>
          <div class="c-price">
            {{
              eventData.price ? `${eventData.price} грн` : $t('events.for-free')
            }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isEventOpened"
      class="c-scheduler-event-bottom-side"
      @click.stop="goToTheEventPage"
    >
      <div class="c-go-to-the-event-page">
        <span>На сторінку події</span>
        <img src="../../../assets/img/green-right-arrow.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';

import { BlanballEventBus } from '../../../workers/event-bus-worker';

import { ROUTES } from '../../../router/router.const';

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
    const router = useRouter();

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

    const goToTheEventPage = async () => {
      await router.push(
        ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(props.eventData.id)
      );
      BlanballEventBus.emit('closeScheduler');
    };

    return {
      isEventOpened,
      getEventCrossIcon,
      goToTheEventPage,
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
      display: flex;
      align-items: center;
      justify-content: space-between;

      .c-main-side-place {
        border-left: 1px solid #dfdeed;
        border-right: 1px solid #dfdeed;
        padding: 0px 16px;
        .c-place {
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-height: 30%;
        }
      }

      .c-main-side-content-block {
        @include inter(14px, 600);
        line-height: 20px;
        width: 30%;
        span {
          @include inter(13px, 400, $--b-main-gray-color);
          line-height: 20px;
        }
      }
    }
  }

  .c-scheduler-event-bottom-side {
    margin-top: 16px;
    .c-go-to-the-event-page {
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        @include inter(14px, 400, $--b-main-green-color);
        line-height: 20px;
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

    .c-event-type {
      padding-right: 8px;

      &.Planned {
        border-right: 1px solid #dfdeed;
        @include inter(14px, 400);
      }

      &.Active {
        border-right: 1px solid $--b-main-green-color;
        @include inter(14px, 400, $--b-main-green-color);
      }

      &.Finished {
        border-right: 1px solid #dfdeed;
        @include inter(14px, 400, #a8a8bd);
      }
    }
  }
}
</style>
