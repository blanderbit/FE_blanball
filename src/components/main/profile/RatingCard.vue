<template>
  <div class="b-rating-card">
    <div class="b-rating-card__title">{{ $t('profile.my-rating') }}</div>
    <div class="b-rating-card__subtitle">
      {{ $t('profile.based-on-reviews') }}
    </div>
    <div class="b-raiting-card-raiting-scale">
      <div class="b-card-stars">
        <StarRating
          :rating="ratingScale"
          :star-size="20"
          :increment="0.01"
          :show-rating="false"
          :read-only="true"
          :active-color="'#148783'"
          :border-color="'#148783'"
          :border-width="2"
          :padding="10"
          :inactive-color="'#fff'"
          :rounded-corners="true"
        />
      </div>
      <div class="b-user-raiting-grade">
        <span>{{ ratingScale || 0 }}</span> / 5.0
      </div>
    </div>
    <div v-if="ratingScale && reviewsCount" class="b-show-reviews-button"
      @click="$emit('showReviewsModal')">
      Переглянути відгуки ({{ reviewsCount }})
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating,
  },
  props: {
    ratingScale: {
      type: Number,
      default: null,
    },
    reviewsCount: {
      type: Number,
      default: null
    }
  },
};
</script>

<style lang="scss" scoped>
$color-efeff6: #efeff6;
$color-f9f9fc: #f9f9fc;
$color-fcfcfc: #fcfcfc;

.b-rating-card {
  height: fit-content;
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 8px;
  padding: 20px 16px;
  position: relative;

  @media (min-width: 1400px) {
    flex-basis: 360px;
  }

  @media (min-width: 1200px) and (max-width: 1400px) {
    flex-basis: 312px;
  }

  @include tabletAndMobile {
    box-shadow: none;
    background: $color-efeff6;
    padding: 12px 16px;
    margin-bottom: 16px;
  }

  .b-rating-card__title {
    @include exo(16px, 700);
    line-height: 20px;

    @include tabletAndMobile {
      @include exo(18px, 700);
    }
  }

  .b-rating-card__subtitle {
    @include exo(13px, 400, $--b-main-gray-color);
    line-height: 20px;
    margin-top: 4px;

    @include tabletAndMobile {
      display: none;
    }
  }

  .b-raiting-card-raiting-scale {
    background: $color-f9f9fc;
    border-radius: 100px;
    padding: 8px 16px 8px 12px;
    height: 44px;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include tabletAndMobile {
      background: $color-fcfcfc;
      margin-top: 8px;
    }

    .b-user-raiting-grade {
      @include inter(14px, 500, $--b-main-gray-color);
      line-height: 24px;

      span {
        @include inter(22px, 700);
        line-height: 28px;
        color: $--b-main-black-color;
      }
    }
  }

  .b-show-reviews-button {
    @include exo(14px, 400, $--b-main-gray-color);
    line-height: 20px;
    text-align: center;
    margin-top: 16px;
    cursor: pointer;

    @include tabletAndMobile {
      text-align: left;
    }
  }
}
</style>
