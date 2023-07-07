<template>
  <div
    :class="['b-review', { opened: isOpened }]"
    @click="$emit('openCloseReview', reviewData.id)"
  >
    <div class="b-review__top-side">
      <StarRating
        :rating="reviewData.stars"
        :star-size="14"
        :increment="0.01"
        :show-rating="false"
        :read-only="true"
        :active-color="'#148783'"
        :border-color="'#148783'"
        :border-width="2"
        :padding="4"
        :inactive-color="'#fff'"
        :rounded-corners="true"
      />
      <div class="b-review__date">
        {{ reviewDate }}
      </div>
      <div class="b-review__author-mobile">
        {{ reviewData.author.profile.last_name }}
        {{ reviewData.author.profile.name }}
      </div>
    </div>
    <div class="b-review__main-side">
      <span class="b-review__author"
        >{{ reviewData.author.profile.last_name }}
        {{ reviewData.author.profile.name }}</span
      >
      <div class="b-review__date-mobile">
        {{ reviewDate }}
      </div>
      <div v-if="isOpened" class="b-review__text">
        {{ reviewData.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import StarRating from 'vue-star-rating';

import { getDate } from '../../../../../utils/getDate';

export default {
  props: {
    reviewData: {
      type: Object,
      default: () => {},
    },
    openedReviewId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    StarRating,
  },
  setup(props) {
    const reviewDate = computed(() => {
      return getDate(props.reviewData.time_created);
    });

    const isOpened = computed(() => {
      return props.openedReviewId === props.reviewData.id;
    });

    return {
      reviewDate,
      isOpened,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f0f0f4: #f0f0f4;
$color-dfdeed: #dfdeed;
$color-f9f9fc: #f9f9fc;
.b-review {
  padding: 16px 0px;
  border-bottom: 1px dashed $color-f0f0f4;
  height: fit-content;

  @include mobile {
    padding: 12px 0px;
    border-top: 1px dashed $color-f0f0f4;
    border-bottom: none;
  }

  &.opened {
    background: $color-f9f9fc;
    padding: 12px;
    border: 1px dashed $color-dfdeed;
    border-radius: 8px;
  }

  .b-review__top-side {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mobile {
      flex-direction: row-reverse;
    }

    .b-review__date {
      @include inter(13px, 500, $--b-main-gray-color);
      line-height: 20px;
      @include mobile {
        display: none;
      }
    }
    .b-review__author-mobile {
      display: none;
      @include mobile {
        display: block;
        @include inter(13px, 500);
        line-height: 20px;
      }
    }
  }
  .b-review__main-side {
    margin-top: 4px;
    .b-review__author {
      @include inter(13px, 500, $--b-main-gray-color);
      line-height: 16px;
      @include mobile {
        display: none;
      }
    }
    .b-review__date-mobile {
      display: none;
      @include mobile {
        display: block;
        @include inter(12px, 400, $--b-main-gray-color);
        line-height: 20px;
      }
    }
    .b-review__text {
      @include inter(14px, 500);
      line-height: 24px;
      margin-top: 4px;
    }
  }
}
</style>
