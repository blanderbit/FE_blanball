<template>
  <div
    :class="['c-scheduled-event', eventData.status, { opened: isEventOpened }]"
    @click="$emit('openCloseEvent', eventData.id)"
  >
    <div :class="['c-scheduled-event-top-side', { opened: isEventOpened }]">
      <div :class="['c-event-main-info', { 'crossed-out': isEventCrossedOut }]">
        <div :class="['c-event-type', eventData.status]">
          {{ $t('events.friendly-match') }}
        </div>
        <div :class="['c-event-time', eventData.status]">
          {{ eventData.time }}
          <span v-if="!isEventOpened">-</span>
          <span :class="['c-event-duration', eventData.status]" v-else>{{
            formatedEventDuration
          }}</span>
          {{ eventData.end_time }}
        </div>
      </div>
      <div class="c-manage-event-block">
        <img
          v-if="isUserCanDeclineEvent"
          :src="eventCrossIcon"
          alt=""
          @click.stop="$emit('declineEvent', eventData)"
        />
        <img
          :class="['c-triangle-image', { animated: isEventOpened }]"
          :src="eventTriangleIcon"
          alt=""
        />
      </div>
    </div>
    <div v-if="isEventOpened" class="c-scheduled-event-main-side">
      <div class="c-main-side__top-block">
        <div class="c-event-name">{{ eventData.name }}</div>
      </div>
      <div class="c-main-side__center-block">
        <div class="c-main-side-content-block c-main-side__participants">
          <span>{{ $t('scheduler.members') }}</span>
          <div
            v-if="eventData.current_users.length"
            class="c-participants__list"
          >
            <div
              v-for="user in eventData.current_users.slice(
                0,
                showUserAvatarCount
              )"
              :style="`margin-left: ${
                user.id !== eventData.current_users[0]?.id ? -12 : 0
              }px`"
            >
              <userAvatar
                :link="user.profile.avatar_url"
                :avatarType="'small-circle'"
                :full-name="`${user.profile.last_name} ${user.profile.name}`"
              />
            </div>
            <div
              v-if="eventData.current_users.length > showUserAvatarCount"
              class="c-participants__list-plus"
              @click.stop="showInvitedUsersListModal"
            >
              + {{ plusUsersCount }}
            </div>
          </div>
          <div v-else class="c-no-participants">
            <img
              src="@images/scheduler/gray-plus.svg"
              alt=""
              @click.stop="joinScheduledEvent"
            />
            <span>{{ $t('scheduler.no-participants') }}</span>
          </div>
        </div>
        <div class="c-main-side-content-block c-main-side-place">
          <span>{{ $t('events.place') }}</span>
          <div class="c-place">{{ eventData.place.place_name }}</div>
        </div>
        <div class="c-main-side-content-block c-main-side-price">
          <span>{{ $t('events.event-price') }}</span>
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
        <span>{{ $t('scheduler.on-event-page') }}</span>
        <img src="@images/green-right-arrow.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import UserAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';

import { BlanballEventBus } from '@/workers/event-bus-worker';

import { ROUTES } from '@/router/router.const';

import grayCrossIcon from '@images/gray-cross.svg';
import blackCrossIcon from '@images/cross.svg';
import greenCrossIcon from '@images/green-cross.svg';

import grayTriangleIcon from '@images/dropdown-arrow-disabled.svg';
import blackTriangleIcon from '@images/arrow-down2.svg';
import greenTriangleIcon from '@images/green-arrow-down.svg';
import greenCheckMarkIcon from '@images/green-nike-icon.svg';

const EVENT_STATUSES = {
  PLANNED: 'Planned',
  ACTIVE: 'Active',
  FINISHED: 'Finished',
};

const REQUEST_USER_ROLES = {
  AUTHOR: 'author',
  PLAYER: 'player',
  FAN: 'fan',
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
  emits: ['openCloseEvent'],
  setup(props) {
    const router = useRouter();
    const eventCrossIcon = ref();
    const eventTriangleIcon = ref();
    const showUserAvatarCount = ref(5);

    const icons = computed(() => {
      return {
        cross: {
          blackCross: blackCrossIcon,
          grayCross: grayCrossIcon,
          greenCross: greenCrossIcon,
        },
        triangle: {
          blackTriangle: blackTriangleIcon,
          grayTriangle: grayTriangleIcon,
          greenTriangle: greenTriangleIcon,
        },
        checkMark: {
          greenCheckMark: greenCheckMarkIcon,
        },
      };
    });

    const plusUsersCount = computed(() => {
      return props.eventData.current_users.length - showUserAvatarCount.value;
    });

    const getEventCrossIcon = () => {
      switch (props.eventData.status) {
        case EVENT_STATUSES.PLANNED: {
          return icons.value.cross.blackCross;
        }
        case EVENT_STATUSES.FINISHED: {
          if (
            props.eventData.request_user_role === REQUEST_USER_ROLES.PLAYER ||
            props.eventData.request_user_role === REQUEST_USER_ROLES.FAN
          ) {
            return icons.value.checkMark.greenCheckMark;
          }
          return icons.value.cross.grayCross;
        }
        case EVENT_STATUSES.ACTIVE: {
          return icons.value.cross.greenCross;
        }
      }
    };

    const getEventTriangleIcon = () => {
      switch (props.eventData.status) {
        case EVENT_STATUSES.PLANNED: {
          return icons.value.triangle.blackTriangle;
        }
        case EVENT_STATUSES.FINISHED: {
          return icons.value.triangle.grayTriangle;
        }
        case EVENT_STATUSES.ACTIVE: {
          return icons.value.triangle.greenTriangle;
        }
      }
    };

    const isUserEventAuthor = computed(() => {
      return props.eventData.request_user_role === REQUEST_USER_ROLES.AUTHOR;
    });

    const isUserEventPlayer = computed(() => {
      return props.eventData.request_user_role === REQUEST_USER_ROLES.PLAYER;
    });

    const isUserEventFan = computed(() => {
      return props.eventData.request_user_role === REQUEST_USER_ROLES.FAN;
    });

    const isEventCrossedOut = computed(() => {
      return (
        !isEventOpened.value &&
        props.eventData.status === EVENT_STATUSES.FINISHED &&
        (props.eventData.request_user_role === REQUEST_USER_ROLES.PLAYER ||
          props.eventData.request_user_role === REQUEST_USER_ROLES.FAN)
      );
    });

    const formatedEventDuration = computed(() => {
      const hours = Math.floor(props.eventData.duration / 60);
      const minutes = props.eventData.duration % 60;

      return `${hours ? hours + ' год.' : ''} ${
        minutes ? minutes + ' хв.' : ''
      }`;
    });

    const isUserCanDeclineEvent = computed(() => {
      return (
        isUserEventAuthor.value ||
        isUserEventPlayer.value ||
        isUserEventFan.value
      );
    });

    const isEventOpened = computed(() => {
      return props.openedEventId === props.eventData.id;
    });

    const goToTheEventPage = async () => {
      await router.push(
        ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(props.eventData.id)
      );
      BlanballEventBus.emit('closeScheduler');
    };

    const joinScheduledEvent = () => {
      BlanballEventBus.emit('joinScheduledEvent', props.eventData);
    };

    onMounted(() => {
      eventCrossIcon.value = getEventCrossIcon();
      eventTriangleIcon.value = getEventTriangleIcon();
    });

    return {
      isEventOpened,
      isUserCanDeclineEvent,
      REQUEST_USER_ROLES,
      plusUsersCount,
      formatedEventDuration,
      eventCrossIcon,
      eventTriangleIcon,
      isEventCrossedOut,
      showUserAvatarCount,
      goToTheEventPage,
      joinScheduledEvent,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-fcfcfc: #fcfcfc;
$color-a8a8bd: #a8a8bd;
$color-ecfcfb: #ecfcfb;
$color-f9f9fc: #f9f9fc;
$color-f0f0f4: #f0f0f4;
$color-dfdeed: #dfdeed;

:deep(.b-avatar) {
  border: 1.5px solid #efeff6;
}
.c-scheduled-event {
  width: 100%;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  margin-top: 12px;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  &.Planned {
    background: $color-fcfcfc;
    border: 1px solid $--b-main-green-color;
  }

  &.opened {
    padding-bottom: 22px;
    .c-event-main-info {
      .c-event-time,
      .c-event-type {
        &.Planned {
          @include inter(14px, 600);
        }

        &.Active {
          @include inter(14px, 600, $--b-main-green-color);
        }

        &.Finished {
          @include inter(14px, 600, $color-a8a8bd);
        }
      }
    }
  }

  .c-manage-event-block {
    display: flex;
    align-items: center;
    gap: 12px;

    .c-triangle-image {
      width: 12px;
      height: 12px;
    }

    .c-triangle-image {
      transition: transform 0.3s ease-out;
      transform: rotate(0deg);
      &.animated {
        transition: transform 0.3s ease-out;
        transform: rotate(-180deg);
      }
    }
  }

  &.Active {
    background: $color-ecfcfb;
    border: none;

    .c-main-side__center-block {
      background: $--b-main-white-color !important;
    }

    .c-scheduled-event-main-side {
      border-top: 1px solid $--b-main-green-color !important;
    }
  }

  &.Finished {
    background: $color-f9f9fc;
    border: none;
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
    border-top: 1px solid $color-f0f0f4;

    .c-main-side__top-block {
      .c-event-name {
        @include exo(18px, 700);
        line-height: 24px;
      }
    }
    .c-main-side__center-block {
      padding: 16px;
      background: $color-f9f9fc;
      border-radius: 6px;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include tabletAndMobile {
        padding: 16px 8px;
      }

      .c-main-side-place {
        border-left: 1px solid $color-dfdeed;
        border-right: 1px solid $color-dfdeed;
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

        .c-participants__list {
          display: flex;
          align-items: center;

          .c-participants__list-plus {
            cursor: pointer;
            margin-left: 12px;
          }
        }

        .c-no-participants {
          display: flex;
          align-items: center;
          gap: 8px;

          span {
            @include inter(14px, 500, $--b-main-gray-color);
            line-height: 16px;
          }
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

  .c-event-main-info {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 20px;
    position: relative;

    &.crossed-out {
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 10px;
        width: calc(100% + 48px);
        height: 2px;
        background-color: #148783;
      }
    }

    .c-event-duration {
      line-height: 20px;
      padding: 4px 5px;
      border-radius: 6px;
      margin: 0px 16px;
      &.Planned {
        @include inter(14px, 400, $--b-main-gray-color);
        border: 1px solid #dfdeed;
      }

      &.Active {
        @include inter(14px, 400, $--b-main-green-color);
        border: 1px solid #8a8aa8;
      }

      &.Finished {
        @include inter(14px, 400, #8a8aa8);
        border: 1px solid #8a8aa8;
      }
    }

    .c-event-type {
      padding-right: 8px;
    }

    .c-event-time {
      &.Planned {
        @include inter(14px, 400);
      }

      &.Active {
        @include inter(14px, 400, $--b-main-green-color);
      }

      &.Finished {
        @include inter(14px, 400, $color-a8a8bd);
      }
    }
    .c-event-type {
      &.Planned {
        border-right: 1px solid $color-dfdeed;
        @include inter(14px, 400);
      }

      &.Active {
        border-right: 1px solid $--b-main-green-color;
        @include inter(14px, 400, $--b-main-green-color);
      }

      &.Finished {
        border-right: 1px solid $color-dfdeed;
        @include inter(14px, 400, $color-a8a8bd);
      }
    }
  }
}
</style>
