<template>
  <div class="event-card" @click="$emit('goToEventPage')">
    <div class="top-title">
      <div class="left-side">
        <div class="card-icon">
          <img src="@images/hands-shake.svg" alt="" />
        </div>
        <span :class="['status', `status-${card.status.toLowerCase()}`]">{{
          $t(`events.${card.status}`)
        }}</span>
        <span class="active-time">{{ card.time }} - {{ card.end_time }}</span>
        <div class="text-block">
          <div class="title">{{ $t('events.friendly-match') }}</div>
          <div class="date-time-mob">
            <div class="date">
              {{ card.date }}
            </div>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="date">
          {{ card.date }}
        </div>
        <div class="time">{{ card.time }}</div>
      </div>
    </div>
    <PlaceDetectorModal
      class="event-place"
      :disabled="disabledMap"
      v-if="card.place.place_name"
      :place="card.place"
    >
    </PlaceDetectorModal>
    <div class="main-text">
      {{ card.description }}
    </div>
    <div class="labels">
      <div v-if="card.gender" class="label">
        {{ $t(`events.${card.gender}`) }}
      </div>
      <div v-if="card.type" class="label">
        {{ $t(`events.${card.type}`) }}
      </div>
      <div v-if="card.need_ball" class="label">
        {{ $t('hashtags.need_ball') }}
      </div>
      <div v-if="card.need_form" class="label">
        {{ $t('hashtags.need_form') }}
      </div>
    </div>
    <div class="bottom-block">
      <div class="top-line">
        <div class="name">{{ card.name }}</div>
        <div class="price">
          {{ !card.price ? $t('events.for-free') : `${card.price}₴` }}
        </div>
      </div>
      <div class="bottom-line">
        <div class="left-side">
          <div class="titles">
            <div class="players">{{ $t('events.players') }}:</div>
            <div class="visitors">{{ $t('events.fans') }}:</div>
          </div>
          <div class="date">
            <div class="players-date">
              {{ card.count_current_users }} / {{ card.amount_members }}
            </div>
            <div class="visitors-date">{{ card.count_current_fans }} / Ꝏ</div>
          </div>
        </div>
        <div class="right-side">
          <GreenBtn
            v-if="greenButtonAvalable"
            :animation="true"
            :text="card.privacy ? $t('events.apply') : $t('events.join')"
            :width="120"
            :height="35"
            @click-function="eventJoin"
          />
          <WhiteBtn
            v-else
            class="right-side-white-btn"
            :text="$t(whiteButtonText)"
            :width="120"
            :height="35"
            :main-color="'$--b-main-black-color'"
            :is-border="true"
            :font-styles="{ 'font-weight': 400 }"
            @click-function="$emit('goToEventPage')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import { useDevice } from 'next-vue-device-detector';

import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import PlaceDetectorModal from '@mainComponents/maps/PlaceDetectorModal.vue';
import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';

export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
    disabledMap: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    GreenBtn,
    PlaceDetectorModal,
    WhiteBtn,
  },
  setup(props, context) {
    const device = useDevice();

    const eventJoin = (e) => {
      context.emit('eventJoin', e);
    };

    const greenButtonAvalable = computed(() => {
      return props.card.status === 'Planned' && !props.card.request_user_role;
    });

    const whiteButtonText = computed(() => {
      switch (props.card.request_user_role) {
        case 'author':
          return 'events.watch';
        case 'player':
          return 'events.you-are-player';
        case 'fan':
          return 'events.you-are-fan';
        case 'request_participation':
          return 'events.request-sent';
        default:
          return '';
      }
    });

    return {
      device,
      greenButtonAvalable,
      whiteButtonText,
      eventJoin,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-fafafa: #fafafa;
$color-4c4a82: #4c4a82;
$color-efeff6: #efeff6;
$color-393762: #393762;
$color-dfdeed: #dfdeed;
$color-ebbb53: #ebbb53;
$color-71ba12: #71ba12;
$color-e184a0: #e184a0;
$color-f0f0f4: #f0f0f4;

.event-card {
  position: relative;
  padding: 15px 15px;
  isolation: isolate;
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  margin-bottom: 16px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    border-radius: 6px 6px 0px 0px;
  }
  .address {
    &.desk-address {
      display: none;
      // @media (max-width: 992px) {
      //   display: none;
      // }
    }
    &.mob-address {
      // @media (max-width: 992px) {
      //   display: flex;
      // }
    }
    display: flex;
    background: $color-fafafa;
    padding: 0px 4px;
    margin-top: 4px;
    @media (max-width: 992px) {
      width: fit-content;
      margin-top: 8px;
    }
    img {
      margin-right: 5px;
    }
    p {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: $--b-main-gray-color;
      border-radius: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .top-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .date {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: right;
      color: $--b-main-black-color;
    }
    .time {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: $color-4c4a82;
    }
    .left-side {
      display: flex;
      // width: 262px;
      // min-width: 262px;
      .card-icon {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 48px;
        width: 48px;
        height: 48px;
        background: $color-efeff6;
        border-radius: 4px;
        margin-right: 8px;
      }
      .text-block {
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: $--b-main-black-color;
        }
        .date-time-mob {
          display: flex;
          align-items: center;
          margin-top: 4px;
          .date {
            margin-right: 12px;
          }
        }
      }
    }
    .right-side {
      display: none;
      position: relative;
      // @media (max-width: 992px) {
      //   display: none;
      // }
    }
  }

  .main-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: $color-393762;
    width: 100%;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 12px;
  }
  .labels {
    display: flex;
    align-items: center;
    margin-top: 12px;
    flex-wrap: wrap;
    gap: 8px 0px;
    .label {
      margin-right: 4px;
      font-family: 'Inter';
      font-style: normal;
      text-align: center;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: $--b-main-gray-color;
      padding: 0px 8px;
      border: 1px solid $color-efeff6;
      border-radius: 100px;
    }
  }
  .bottom-block {
    margin-top: 12px;
    border-top: 1px dashed $color-dfdeed;

    @include tabletAndMobile {
      margin-top: 20px;
    }

    .top-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      .name {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        width: 60%;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: $color-393762;
      }
      .price {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: $--b-main-black-color;
      }
    }
    .bottom-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      .left-side {
        display: flex;
        align-items: center;
        .titles {
          margin-right: 20px;

          @media (max-width: 400px) {
            margin-right: 10px;
          }
        }
        .titles,
        .date {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
        }
        .players,
        .players-date {
          color: $--b-main-black-color;
        }
        .visitors,
        .visitors-date {
          color: $--b-main-gray-color;
        }
      }
      .right-side {
        position: relative;
      }
    }
  }
}
.event-place:deep(.b-place-detector) {
  background: $color-efeff6;
  border-radius: 4px;
  margin-top: 10px;
  width: fit-content;
  max-width: 100%;
  cursor: pointer;
}
.status {
  position: absolute;
  right: 20px;
  top: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: $--b-main-white-color;
  border-radius: 4px;
  padding: 0px 4px;

  &-planned {
    background: $color-ebbb53;
  }

  &-active {
    background: $color-71ba12;
  }

  &-finished {
    background: $color-e184a0;
  }
}
.active-time {
  position: absolute;
  right: 25px;
  top: 45px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: $--b-main-gray-color;
}
.right-side-white-btn {
  background: $color-f0f0f4;
  border: none !important;
}
</style>
