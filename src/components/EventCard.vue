<template>
  <div 
    class="b_event_card"
  >
    <div class="b_event_card_top-title">
      <div class="b_event_card_left-side">
        <div class="b_event_card_card-icon">
          <img src="../assets/img/hands-shake.svg" alt=""></div>
        <div class="b_event_card_text-block">
          <div class="b_event_card_title">{{ $t('events.friendly-match') }}</div>
          <div class="b_event_card_date-time-mob">
            <div class="b_event_card_date">{{card.date}} {{ $t('events.months.June') }}</div>
            <div class="b_event_card_time">{{card.time}}</div>
          </div>
          <div class="b_event_card_address desk-address">
            <img src="../assets/img/location-point.svg" alt="">
            <p>{{card.address}}</p>
          </div>
        </div>
      </div>
      <div class="b_event_card_right-side">
        <div class="b_event_card_date">{{card.date}} {{ $t('events.months.June') }}</div>
        <div class="b_event_card_time">{{card.time}}</div>
      </div>
    </div>
    <div class="b_event_card_address mob-address">
      <img src="../assets/img/location-point.svg" alt="">
      <p>{{card.address}}</p>
    </div>
    <div class="b_event_card_main-text">
      {{card.main_text}}
    </div>
    <div class="b_event_card_labels">
      <div class="b_event_card_label">{{ $t('events.football') }}</div>
      <div class="b_event_card_label">{{ $t('events.men') }}</div>
      <div class="b_event_card_label">{{ $t('events.without-category') }}</div>
    </div>
    <div class="b_event_card_bottom-block">
      <div class="b_event_card_top-line">
        <div class="b_event_card_name">{{card.name}}</div>
        <div class="b_event_card_price">{{ $t('events.for-free') }}</div>
      </div>
      <div class="b_event_card_bottom-line">
        <div class="b_event_card_left-side">
          <div class="b_event_card_titles">
            <div class="b_event_card_players">{{ $t('events.players') }}:</div>
            <div class="b_event_card_visitors">{{ $t('events.fans') }}:</div>
          </div>
          <div class="b_event_card_date">
            <div class="b_event_card_players-date">{{card.play_dates}}</div>
            <div class="b_event_card_visitors-date">{{card.visitor_dates}}</div>
          </div>
        </div>
        <div class="b_event_card_right-side">
          <GreenBtn 
            :text="'Долучитися'" 
            :width="115"
            :height="32"
            @click-function="goToEventPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

import GreenBtn from '../components/GreenBtn.vue'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    GreenBtn
  },
  setup() {
    const router = useRouter()

    function goToEventPage() {
      router.push('/application/events/3')
    }

    return {
      goToEventPage
    }
  }
}
</script>

<style lang="scss" scoped>
.b_event_card {
  position: relative;
  padding: 20px 16px;
  isolation: isolate;
  width: 328px;
  background: #FFFFFF;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  margin-bottom: 16px;
  @media (min-width: 1200px) and (max-width: 1400px) {
    width: 408px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 320px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 344px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(9037deg, #4A7DEB -2939%, #8978EE 3785%, #D243C5 9719%);
    border-radius: 6px 6px 0px 0px;
  }
  .b_event_card_address {
    &.b_event_card_desk-address {
      display: none;
    }
    &.b_event_card_mob-address {
    }
    display: flex;
    background: #FAFAFA;
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
  .b_event_card_top-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .b_event_card_date {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: right;
      color: #262541;
    }
    .b_event_card_time {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: #4C4A82;
    }
    .b_event_card_left-side {
      display: flex;
      .b_event_card_card-icon {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-width: 48px;
        width: 48px;
        height: 48px;
        background: #EFEFF6;
        border-radius: 4px;
        margin-right: 8px
      }
      .b_event_card_text-block {
        .b_event_card_title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .b_event_card_date-time-mob {
          display: flex;
          align-items: center;
          margin-top: 4px;
          .b_event_card_date {
            margin-right: 12px;
          }
        }
      }
    }
    .b_event_card_right-side {
      display: none;
    }
  }
  .b_event_card_main-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #393762;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 12px;
  }
  .b_event_card_labels {
    display: flex;
    align-items: center;
    margin-top: 12px;
    .b_event_card_label {
      margin-right: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #575775;
      padding: 0px 8px;
      border: 1px solid #EFEFF6;
      border-radius: 100px;
    }
  }
  .b_event_card_bottom-block {
    margin-top: 12px;
    border-top: 1px dashed #DFDEED;
    .b_event_card_top-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      .b_event_card_name {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #393762;
      }
      .b_event_card_price {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #262541;
      }
    }
    .b_event_card_bottom-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      .b_event_card_left-side {
        display: flex;
        align-items: center;
        .b_event_card_titles {
          margin-right: 30px;
        }
        .b_event_card_titles, .b_event_card_date {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
        }
        .b_event_card_players, .b_event_card_players-date {
          color: #262541;
        }
        .b_event_card_visitors, .b_event_card_visitors-date {
          color: #575775;
        }
      }
      .b_event_card_right-side {

      }
    }
  }
}
</style>