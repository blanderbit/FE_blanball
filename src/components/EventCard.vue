<template>
  <div class="b-event-card">
    <div class="b-event-card__top-title">
      <div class="b-event-card__left-side">
        <div class="b-event-card__card-icon">
          <img src="../assets/img/hands-shake.svg" alt="" />
        </div>
        <div class="b-event-card__text-block">
          <div class="b-event-card__title">
            {{ $t('events.friendly-match') }}
          </div>
          <div class="b-event-card__date-time-mob">
            <div class="b-event-card__date">
              {{ card.date }} {{ $t('events.months.June') }}
            </div>
            <div class="b-event-card__time">{{ card.time }}</div>
          </div>
          <div class="b-event-card__address desk-address">
            <img src="../assets/img/location-point.svg" alt="" />
            <p>{{ card.address }}</p>
          </div>
        </div>
      </div>
      <div class="b-event-card__right-side">
        <div class="b-event-card__date">
          {{ card.date }} {{ $t('events.months.June') }}
        </div>
        <div class="b-event-card__time">{{ card.time }}</div>
      </div>
    </div>
    <div class="b-event-card__address mob-address">
      <img src="../assets/img/location-point.svg" alt="" />
      <p>{{ card.address }}</p>
    </div>
    <div class="b-event-card__main-text">
      {{ card.main_text }}
    </div>
    <div class="b-event-card__labels">
      <div class="b-event-card__label">{{ $t('events.football') }}</div>
      <div class="b-event-card__label">{{ $t('events.men') }}</div>
      <div class="b-event-card__label">{{ $t('events.without-category') }}</div>
    </div>
    <div class="b-event-card__bottom-block">
      <div class="b-event-card__top-line">
        <div class="b-event-card__name">{{ card.name }}</div>
        <div class="b-event-card__price">{{ $t('events.for-free') }}</div>
      </div>
      <div class="b-event-card__bottom-line">
        <div class="b-event-card__left-side">
          <div class="b-event-card__titles">
            <div class="b-event-card__players">{{ $t('events.players') }}:</div>
            <div class="b-event-card__visitors">{{ $t('events.fans') }}:</div>
          </div>
          <div class="b-event-card__date">
            <div class="b-event-card__players-date">{{ card.play_dates }}</div>
            <div class="b-event-card__visitors-date">
              {{ card.visitor_dates }}
            </div>
          </div>
        </div>
        <div class="b-event-card__right-side">
          <GreenBtn
            :text="$t('events.join')"
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

import { ROUTES } from '../router/router.const'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    GreenBtn,
  },
  setup() {
    const router = useRouter()

    function goToEventPage() {
      router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute('3'))
    }

    return {
      goToEventPage,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-event-card {
  position: relative;
  padding: 20px 16px;
  isolation: isolate;
  width: 328px;
  background: #ffffff;
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
    background: linear-gradient(
      9037deg,
      #4a7deb -2939%,
      #8978ee 3785%,
      #d243c5 9719%
    );
    border-radius: 6px 6px 0px 0px;
  }
  .b-event-card__address {
    &.b-event-card__desk-address {
      display: none;
    }
    &.b-event-card__mob-address {
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
      @include inter(12px, 400, #575775);
      line-height: 20px;
      border-radius: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .b-event-card__top-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .b-event-card__date {
      @include inter(14px, 500);
      line-height: 20px;
      text-align: right;
    }
    .b-event-card__time {
      @include inter(12px, 400, #4c4a82);
      line-height: 20px;
      text-align: right;
    }
    .b-event-card__left-side {
      display: flex;
      .b-event-card__card-icon {
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
      .b-event-card__text-block {
        .b-event-card__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: $--b-main-black-color;
        }
        .b-event-card__date-time-mob {
          display: flex;
          align-items: center;
          margin-top: 4px;
          .b-event-card__date {
            margin-right: 12px;
          }
        }
      }
    }
    .b-event-card__right-side {
      display: none;
    }
  }
  .b-event-card__main-text {
    @include inter(12px, 400, #393762);
    line-height: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 12px;
  }
  .b-event-card__labels {
    display: flex;
    align-items: center;
    margin-top: 12px;
    .b-event-card__label {
      @include inter(12px, 400, #575775);
      margin-right: 4px;
      line-height: 20px;
      color: #575775;
      padding: 0px 8px;
      border: 1px solid #efeff6;
      border-radius: 100px;
    }
  }
  .b-event-card__bottom-block {
    margin-top: 12px;
    border-top: 1px dashed #dfdeed;
    .b-event-card__top-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      .b-event-card__name {
        @include inter(12px, 500, #393762);
        line-height: 20px;
      }
      .b-event-card__price {
        @include inter(14px, 600);
        line-height: 20px;
        text-align: right;
      }
    }
    .b-event-card__bottom-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      .b-event-card__left-side {
        display: flex;
        align-items: center;
        .b-event-card__titles {
          margin-right: 30px;
        }
        .b-event-card__titles,
        .b-event-card__date {
          @include inter(14px, 600);
          line-height: 20px;
        }
        .b-event-card__players,
        .b-event-card__players-date {
          color: $--b-main-black-color;
        }
        .b-event-card__visitors,
        .b-event-card__visitors-date {
          color: #575775;
        }
      }
      .b-event-card__right-side {
      }
    }
  }
}
</style>
