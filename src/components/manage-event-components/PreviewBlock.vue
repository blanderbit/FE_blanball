<template>
  <div class="b-event-preview" :style="wrapperStyle">
    <div :class="['b-event-preview__preview-block']">
      <div class="b-event-preview__preview-header">
        <div class="b-event-preview__title-block">
          <div class="b-event-preview__title">
            <img src="../../assets/img/img-icon.svg" alt="" />
            {{ $t('events.poster-preview') }}
          </div>
        </div>
        <div class="b-event-preview__subtitle">
          {{ $t('events.poster-main-preview') }}
        </div>
      </div>
      <div class="b-event-preview__form-block">
        <EventCard :card="eventData" />
      </div>
    </div>
  </div>
</template>
<script>
import GreenBtn from '../../components/GreenBtn.vue';
import EventCard from '../event-components/EventCard.vue';

export default {
  name: 'PreviewBlock',
  components: {
    GreenBtn,
    EventCard,
  },
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f9f9fc: #f9f9fc;

.b-event-preview {
  @include tabletAndMobile {
    position: fixed;
    bottom: 0;
    background: #0000005c;
    left: 0;
    right: 0;
    z-index: 3;
  }
  .b-event-preview__preview-block {
    padding: 24px 44px;
    background: $color-f9f9fc;
    border-radius: 12px;
    width: 564px;
    overflow: hidden;

    @include tabletAndMobile {
      display: none;
    }

    &.active {
      height: auto;
      @include tabletAndMobile {
        padding: 12px 8px;
      }
    }
    @media (min-width: 1200px) and (max-width: 1400px) {
      width: 504px;
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      width: auto;
      flex-basis: 50%;
    }
    @media (max-width: 1199px) {
      background: transparent;
      padding: 0;
      height: 44px;
    }
    @include tabletAndMobile {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      background: $color-f9f9fc;
    }
    .b-event-preview__preview-header {
      @media (max-width: 1199px) {
        background: $color-f9f9fc;
        padding: 13px;
        margin-bottom: 8px;
      }
      .b-event-preview__title-block {
        @media (max-width: 1200px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .b-event-preview__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: $--b-main-black-color;
          @media (max-width: 1200px) {
            display: flex;
            align-items: center;
          }
          img {
            margin-right: 10px;
            @media (min-width: 1200px) {
              display: none;
            }
          }
        }
      }
      .b-event-preview__subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: $--b-main-gray-color;
        margin: 6px 0 20px;
      }
    }
  }
}
</style>
