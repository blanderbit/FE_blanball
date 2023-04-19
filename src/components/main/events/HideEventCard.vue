<template>
  <div :class="['b-hide-event-card', { hidden: data.hidden || isAllHidden }]">
    <div class="b-hide-event-card__top-side">
      <div class="b-hide-event-card__name">
        <img src="../../../assets/img/hands-shake-small.svg" alt="" />
        <span>{{ data.name }}</span>
      </div>
      <div
        class="b-show-or-hide__button"
        @click="!isAllHidden ? $emit('eyeClick', data.id) : null"
      >
        <img
          v-if="isAllHidden ? !isAllHidden : !data.hidden"
          class="b-show-or-hide__image"
          src="../../../assets/img/eye-opened.svg"
          alt=""
        />
        <img
          v-else
          class="b-show-or-hide__image"
          src="../../../assets/img/eye-crossed.svg"
          alt=""
        />
      </div>
      <div class="b-hide-event-card__date-time">
        {{ data.date }}, {{ data.time }} - {{ data.end_time }}
      </div>
    </div>
    <div class="b-hide-event-card__bottom-side">
      <div class="b-hide-event-card__place">
        <img src="../../../assets/img/location-point.svg" alt="" />
        <span>{{ data.place.place_name }}</span>
      </div>
      <div class="b-hide-event-card__labels">
        <div class="b-hide-event-card__label">
          {{ $t(`hashtags.${data.type}`) }}
        </div>
        <div class="b-hide-event-card__label">
          {{ $t(`events.${data.gender}`) }}
        </div>
        <div class="b-hide-event-card__label">...</div>
      </div>
      <div class="b-hide-event-card__detail-info">
        <span>Детальніша інформація</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    emits: ['eyeClick'],
    data: {
      type: Object,
      default: () => {},
    },
    isAllHidden: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$color-efeff6: #efeff6;
$color-f0f0f4: #f0f0f4;
$color-dfdeed: #dfdeed;
.b-hide-event-card {
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 6px;
  padding: 12px 12px;

  @include tabletAndMobile {
    box-shadow: none;
    border-bottom: 1px solid $color-efeff6;
    border-radius: 0px;
  }

  @include mobile {
    padding: 8px 12px;
  }

  &.hidden {
    background: $color-f0f0f4;
  }

  .b-hide-event-card__top-side {
    border-bottom: 1px solid $color-efeff6;

    @include tabletAndMobile {
      width: 85%;
    }
    .b-hide-event-card__name {
      display: flex;
      align-items: center;
      gap: 4px;
      @include exo(14px, 700);
      line-height: 20px;

      img {
        @include tabletAndMobile {
          display: none;
        }
      }
      span {
        width: 80%;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .b-show-or-hide__button {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;

      @include tabletAndMobile {
        top: 45%;
      }
    }
    .b-hide-event-card__date-time {
      @include inter(12px, 500, $--b-main-gray-color);
      padding: 8px 0px;
    }
  }
  .b-hide-event-card__bottom-side {
    margin-top: 8px;
    .b-hide-event-card__place {
      display: flex;
      align-items: center;
      gap: 6px;
      span {
        @include inter(12px, 400, $--b-main-gray-color);
      }
    }
    .b-hide-event-card__labels {
      display: flex;
      align-items: center;
      margin-top: 12px;
      .b-hide-event-card__label {
        @include inter(12px, 400);
        margin-right: 4px;
        line-height: 20px;
        padding: 0px 8px;
        border: 1px solid $color-dfdeed;
        border-radius: 100px;
      }
      @include tabletAndMobile {
        display: none;
      }
    }
    .b-hide-event-card__detail-info {
      display: none;
      @include tabletAndMobile {
        display: block;
        @include inter(12px, 400, $--b-main-gray-color);
        line-height: 20px;
        margin-top: 8px;
        span {
          padding-bottom: 3px;
          border-bottom: 1px dashed $color-dfdeed;
        }
      }
    }
  }
}
</style>
