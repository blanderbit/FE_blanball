<template>
  <div class="b-player-card">
    <div class="b-player-card__left-part">
      <div
        class="b-player-card__team-label"
        :style="{ background: player.color }"
      >
        {{ player.label }}
      </div>
      <div class="b-player-card__player-name">{{ player.name }}</div>
    </div>
    <div class="b-player-card__right-part">
      <div class="b-player-card__rating">
        <star-rating
          :rating="rating"
          :star-size="16"
          :show-rating="false"
          :read-only="true"
          :active-color="'#148783'"
        >
        </star-rating>
      </div>
      <div class="b-player-card__message">
        <img src="../../../assets/img/message-icon.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import StarRating from 'vue-star-rating';

export default {
  name: 'RatePlayerCard',
  components: {
    StarRating,
  },
  props: {
    player: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const rating = ref(3);

    return {
      rating,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-2946e1: #2946e1;

.b-player-card {
  border-top: 1px dashed $color-dfdeed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  .b-player-card__left-part {
    display: flex;
    align-items: center;
    .b-player-card__team-label {
      margin-right: 8px;
      padding: 0px 4px;
      background: $color-2946e1;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      color: $--b-main-white-color;
      text-transform: uppercase;
    }

    .b-player-card__player-name {
      @include inter(13px, 400);
      line-height: 20px;
    }
  }

  .b-player-card__right-part {
    display: flex;
    align-items: center;
    .b-player-card__rating {
    }

    .b-player-card__message {
      margin-left: 22px;
    }
  }
}
</style>
