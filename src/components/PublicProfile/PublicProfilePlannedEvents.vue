<template>
  <div class="b-public-profile__planned-events">
    <div class="b-planned-events__title">
      {{ $t('player_page.planned-events') }}
    </div>
    <div class="b-public-profile__events-list">
      <SimpleListWrapper :requestForGetData="getPlannedEvents">
        <template #default="{ smartListItem: item }">
          <div class="b-event">
            <div class="b-event__top-side">
              <img
                class="b-event__top-side-arrow"
                src="../../assets/img/arrow-right-black.svg"
                alt=""
                @click="goToTheEvent(item.id)"
              />
              <div class="b-event__type">
                {{ $t('events.friendly-match') }}
              </div>
              <div
                :class="[
                  'b-event__user-role',
                  `b-event__user-role-${item.pk_user_role}`,
                ]"
              >
                {{ $t(`hashtags.${item.pk_user_role}`) }}
              </div>
            </div>
            <div class="b-event__main-side">
              <div class="b-event_date-and-time">
                {{ item.date_and_time }}
              </div>

              <div class="b-event__labels">
                <div class="b-event__label">
                  {{ $t(`hashtags.${item.type}`) }}
                </div>
                <div class="b-event__label">
                  {{ $t(`events.${item.gender}`) }}
                </div>
                <div class="b-event__label">...</div>
              </div>
            </div>
          </div>
        </template>
        <template #emptyList>
          <div class="b-no-events">
            <img src="../../assets/img/info-black.svg" alt="" />
            <span>{{ $t('no_records.noPublicProfilePlannedEvents.title', {fullName: userFullName}) }}</span>
          </div>
        </template>
      </SimpleListWrapper>
    </div>
  </div>
</template>

<script>

import SimpleListWrapper from '../simple-list/SimpleListWrapper.vue';

import { getDate } from '../../utils/getDate';

import { API } from '../../workers/api-worker/api.worker';

import { ROUTES } from '../../router/router.const';

export default {
  name: 'RatingCard',
  components: {
    SimpleListWrapper,
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
    userFullName: {
      type: String,
    }
  },
  setup(props) {
    const getPlannedEvents = (page) => {
      return API.EventService.getPlannedUserEvents({
        id: props.userId,
        page: page,
      }).then((res) => {
        res.data.results = res.data.results.map((item) => {
          return {
            ...item,
            date_and_time: getDate(item.date_and_time),
          };
        });
        return res;
      });
    };

    const goToTheEvent = (eventId) => {
      return router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(eventId));
    };

    return {
      goToTheEvent,
      getPlannedEvents,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f9f9fc: #f9f9fc;
$color-feefe7: #feefe7;
$color-efeff6: #efeff6;
$color-dfdeed: #dfdeed;
$color-f0f0f4: #f0f0f4;

::-webkit-scrollbar {
  display: none;
}

.b-public-profile__planned-events {
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 0px 12px 12px 0px;
  padding: 24px;
  padding-left: 32px;
  width: 400px;
  border-right: 1px solid $color-efeff6;

  @media (max-width: 1400px) {
    width: 350px;
  }

  @media (max-width: 1200px) {
    width: 400px;
    padding: 16px;
    margin-left: 16px;
    border-radius: 12px;
    margin-top: 20px;
  }

  @include beforeDesktop {
    background: $--b-main-white-color;
    height: 400px;
    width: 310px;
  }
  @include tabletAndMobile {
    margin-left: 0px;
    width: 400px;
  }

  @media (max-width: 430px) {
    width: 100%;
  }

  .b-planned-events__title {
    @include exo(16px, 700);
    line-height: 24px;
    padding-bottom: 16px;
  }
}
.b-public-profile__events-list {
  overflow: scroll;
  height: 500px;

  @include beforeDesktop {
    height: 320px;
  }
  .b-event {
    padding: 16px 0px;
    border-bottom: 1px dashed $color-dfdeed;

    .b-event__top-side {
      display: flex;
      align-items: center;
      gap: 6px;
      position: relative;

      .b-event__top-side-arrow {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
      }

      .b-event__type {
        @include exo(14px, 600);
        line-height: 10px;
      }

      .b-event__user-role {
        @include inter(12px, 400);
        line-height: 20px;
        border-radius: 4px;
        padding: 0px 4px;

        &-fan {
          background: $color-f0f0f4;
        }

        &-player {
          background: $color-feefe7;
        }
      }
    }
    .b-event__main-side {
      margin: 6px 0px;
      .b-event_date-and-time {
        @include inter(12px, 400, $--b-main-gray-color);
        line-height: 20px;
      }
      .b-event__labels {
        display: flex;
        align-items: center;
        gap: 4px;
        .b-event__label {
          @include inter(12px, 400);
          line-height: 20px;
          border: 1px solid $color-dfdeed;
          border-radius: 100px;
          padding: 0px 8px;
          height: 20px;
          margin-top: 6px;
        }
      }
    }
  }
}
.b-no-events {
  @include inter(13px, 400);
    line-height: 20px;
    display: flex;
    gap: 8px;
    word-break: break-word;
    border-radius: 6px;
    background: $color-f9f9fc;
    padding: 8px;
    padding-left: 12px;
}
</style>
