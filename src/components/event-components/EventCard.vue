<template>
  <div class="event-card">
    <div class="top-title">
      <div class="left-side">
        <div class="card-icon">
          <img src="../../assets/img/hands-shake.svg" alt="" />
        </div>
        <div class="text-block">
          <div class="title">{{ $t('events.friendly-match') }}</div>
          <div class="date-time-mob">
            <div class="date">
              {{ card.date }}
            </div>
            <div class="time">{{ card.time }}</div>
          </div>
          <PlaceDetector
            v-if="device.mobile"
            :place="card.place"
          ></PlaceDetector>
        </div>
      </div>
      <div class="right-side">
        <div class="date">
          {{ card.date }}
        </div>
        <div class="time">{{ card.time }}</div>
      </div>
    </div>
    <PlaceDetector v-if="!device.mobile" :place="card.place"></PlaceDetector>
    <div class="main-text">
      {{ card.description }}
    </div>
    <div class="labels">
      <div class="label">
        {{ card.gender }}
      </div>
      <div class="label">
        {{ card.type }}
      </div>
      <div v-if="card.need_ball" class="label">Need ball</div>
      <div v-if="card.need_form" class="label">Need form</div>
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
            :text="card.privacy ? $t('events.apply') : $t('events.join')"
            :width="120"
            :height="35"
            @click-function="$emit('goToEventPage')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../components/GreenBtn.vue'
import { useDevice } from 'next-vue-device-detector'

import PlaceDetector from '../../components/maps/PlaceDetector.vue'
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    GreenBtn,
    PlaceDetector,
  },
  setup() {
    const device = useDevice()
    return {
      device,
    }
  },
}
</script>

<style lang="scss" scoped>
.event-card {
  position: relative;
  padding: 20px 16px;
  isolation: isolate;
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  margin-bottom: 16px;
  height: fit-content;
  width: 100%;
  /*@media (min-width: 1200px) and (max-width: 1400px) {*/
  /*width: 408px;*/
  /*}*/
  /*@media (min-width: 992px) and (max-width: 1199px) {*/
  /*width: 320px;*/
  /*}*/
  /*@media (min-width: 768px) and (max-width: 991px) {*/
  /*width: 344px;*/
  /*}*/
  /*@media (max-width: 768px) {*/
  /*width: 100%;*/
  /*}*/
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(
      90.37deg,
      #4a7deb -29.39%,
      #8978ee 37.85%,
      #d243c5 97.19%
    );
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
    background: #fafafa;
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
      color: #575775;
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
      color: #262541;
    }
    .time {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: #4c4a82;
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
        background: #efeff6;
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
          color: #262541;
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
    color: #393762;
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
    .label {
      margin-right: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      padding: 0px 8px;
      border: 1px solid #efeff6;
      border-radius: 100px;
    }
  }
  .bottom-block {
    margin-top: 12px;
    border-top: 1px dashed #dfdeed;
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
        color: #393762;
      }
      .price {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #262541;
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
          margin-right: 30px;
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
          color: #262541;
        }
        .visitors,
        .visitors-date {
          color: #575775;
        }
      }
      .right-side {
      }
    }
  }
}
</style>
