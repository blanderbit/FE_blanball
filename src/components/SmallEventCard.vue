<template>
  <div
    class="b-small-event-card"
    @click="$emit('clickSmallEventCard', item.id)"
  >
    <div class="b-small-event-card__top-line">
      <div class="b-small-event-card__icon-pic">
        <img src="../assets/img/hands-shake.svg" alt="" />
      </div>
      <div class="b-small-event-card__text-data">
        <div class="b_small_event_card_name">
          {{ item.name }}
        </div>
        <div class="b-small-event-card__bottom-line">
          <div class="b-small-event-card__time">
            {{ item.time }} - {{ item.end_time }}
          </div>
          <div class="b-small-event-card__date">
            {{ item.date }}
          </div>
        </div>
      </div>
    </div>
    <PlaceDetector :place="item.place"> </PlaceDetector>
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
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-fafafa: #fafafa;
$color-efeff6: #efeff6;

.b-small-event-card {
  position: relative;
  width: 100%;
  background: $--b-main-white-color;
  border: 1px solid $color-dfdeed;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 16px;
  cursor: pointer;
  .b-small-event-card__close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .b-small-event-card__top-line {
    display: flex;
    align-items: center;
    .b-small-event-card__text-data {
      margin-left: 8px;
      .b-small-event-card__name {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        color: $--b-main-black-color;
      }
      .b-small-event-card__bottom-line {
        display: flex;
        align-items: center;
        margin-top: 4px;
        .b-small-event-card__time {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          text-align: right;
          color: $--b-main-gray-color;
          margin-right: 21px;
        }
        .b-small-event-card__date {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          text-align: right;
          color: $--b-main-black-color;
        }
      }
    }
  }
  .b-small-event-card__address {
    display: flex;
    background: $color-fafafa;
    padding: 0px 4px;
    margin-top: 4px;
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
      border: 1px solid $color-efeff6;
      border-radius: 100px;
    }
  }
}
.b_small_event_card_name {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: $--b-main-black-color;
  width: 90%;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
