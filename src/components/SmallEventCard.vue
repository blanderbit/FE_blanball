<template>
  <div
    class="b-small-event-card"
    @click="$emit('clickSmallEventCard', item.id)"
  >
    <div class="b-small-event-card__top-side">
      <div class="b-small-event-card__header">
        <div class="b-small-event-card__name">
          <img src="../assets/img/hands-shake-small.svg" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div
          v-if="item.request_user_role"
          :class="['b-small-event-card__user-role', item.request_user_role]"
        >
          {{ $t(`hashtags.${item.request_user_role}`) }}
        </div>
      </div>
      <div class="b-small-event-card__date-time">
        {{ item.date }}, {{ item.time }} - {{ item.end_time }}
      </div>
    </div>
    <div class="b-small-event-card__bottom-side">
      <div class="b-small-event-card__place">
        <img src="../assets/img/location-point.svg" alt="" />
        <span>{{ item.place.place_name }}</span>
      </div>
      <div class="b-small-event-card__labels">
        <div class="b-small-event-card__label">
          {{ $t(`hashtags.${item.type}`) }}
        </div>
        <div class="b-small-event-card__label">
          {{ $t(`events.${item.gender}`) }}
        </div>
        <div class="b-small-event-card__label">...</div>
      </div>
    </div>
  </div>
</template>
<script>
import PlaceDetector from './../components/maps/PlaceDetector.vue';

export default {
  name: 'SmallEventCard',
  components: {
    PlaceDetector,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.b-small-event-card {
  border-radius: 6px;
  border: 1px solid #f0f0f4;
  padding: 12px 0px;
  margin-bottom: 16px;
  cursor: pointer;

  .b-small-event-card__top-side {
    padding: 0px 12px 8px;
    padding-right: 0px;
    border-bottom: 1px solid #f0f0f4;

    .b-small-event-card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .b-small-event-card__name {
        display: flex;
        align-items: center;
        gap: 4px;
        @include exo(14px, 700);
        line-height: 20px;
        span {
          width: 80%;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      .b-small-event-card__user-role {
        border-radius: 4px 0px 0px 4px;
        padding: 2px 4px;

        &.author,
        &.player {
          @include inter(12px, 400, #ffff);
          background: #148783;
        }

        &.request_participation,
        &.fan {
          @include inter(12px, 400, $--b-main-gray-color);
          background: #efeff6;
        }
      }
    }
    .b-small-event-card__date-time {
      @include inter(12px, 500, $--b-main-gray-color);
      margin-top: 8px;
    }
  }
  .b-small-event-card__bottom-side {
    padding: 8px 12px 0px;
    .b-small-event-card__place {
      display: flex;
      align-items: center;
      gap: 6px;
      span {
        @include inter(12px, 400, $--b-main-gray-color);
      }
    }
    .b-small-event-card__labels {
      display: flex;
      align-items: center;
      margin-top: 12px;
      .b-small-event-card__label {
        margin-right: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-gray-color;
        padding: 0px 8px;
        border: 1px solid #efeff6;
        border-radius: 100px;
      }
    }
  }
}
</style>
