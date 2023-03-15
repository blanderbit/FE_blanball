<template>
  <div class="b-public-profile-reviews__block">
    <div class="b-public-profile-reviews__info">
      <div class="b-public-profilereviews__titles-block">
        <div class="b-public-profile-reviews__title">
          {{ $t('player_page.rates-feedbacks') }}
        </div>
        <div class="b-user-reviews__subtitle">
          {{ reviewsTotalCount }} {{ $t('player_page.rates') }}
        </div>
      </div>
      <div class="b-public-profile__raiting-star">
        <div class="b-public-profile__user-raiting">
          {{ userRating }}
        </div>
        <img src="../../assets/img/star.svg" alt="" />
      </div>
    </div>
    <div class="b-public-profile__reviews-list">
      <SimpleListWrapper :requestForGetData="getReviews">
        <template #default="{ smartListItem: item }">
          <div class="b-public-profile__review">
            <div class="b-review__top-side">
              <div class="b-top-side__info">
                <div class="b-review__stars">
                  <div class="b-review__grade">
                    {{ item.stars }}
                  </div>
                  <img src="../../assets/img/star.svg" alt="" />
                </div>
                <div class="b-review__author-full-name">
                  {{ item.author.profile.last_name }}
                  {{ item.author.profile.name }}
                </div>
              </div>
              <div class="b-top-side__date">
                {{ item.time_created }}
              </div>
            </div>
            <div class="b-review__main-side">
              <div class="b-review__text">
                {{ item.text }}
              </div>
            </div>
          </div>
        </template>
        <template #emptyList>
          Указать верстку что пустой список для отзывов юзера TODO
        </template>
      </SimpleListWrapper>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import StarRating from 'vue-star-rating';

import SmartList from '../smart-list/SmartList.vue';
import InfiniteLoading from '../../workers/infinit-load-worker/InfiniteLoading.vue';
import ScrollToTop from '../ScrollToTop.vue';
import SimpleListWrapper from '../simple-list/SimpleListWrapper.vue';

import { getDate } from '../../utils/getDate';

import { API } from '../../workers/api-worker/api.worker';

export default {
  name: 'RatingCard',
  components: {
    SmartList,
    ScrollToTop,
    InfiniteLoading,
    SimpleListWrapper,
    StarRating,
  },
  props: {
    userRating: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const reviewsTotalCount = ref(0);

    const getReviews = (page) => {
      return API.ReviewService.getUserReviews({
        id: props.userId,
        page: page,
      }).then((res) => {
        reviewsTotalCount.value = res.data.total_count;
        res.data.results = res.data.results.map((item) => {
          return {
            ...item,
            time_created: getDate(item.time_created),
          };
        });
        return res;
      });
    };

    return {
      reviewsTotalCount,
      getReviews,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-ffffff: $--b-main-white-color;
$color-6f6f77: #6f6f77;
$color-dfdeed: #dfdeed;
$color-f57125: #f57125;
$color-575775: $--b-main-gray-color;

.b-public-profile-reviews__block {
  height: 550px;
  @include beforeDesktop {
    padding: 16px;
    background: $color-ffffff;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 12px;
    margin-top: 20px;
    height: 400px;
  }
}
.b-public-profile-reviews__info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .b-public-profilereviews__titles-block {
    .b-public-profile-reviews__title {
      @include inter(16px, 700);
      line-height: 24px;
    }
    .b-user-reviews__subtitle {
      @include inter(12px, 400, $color-6f6f77);
      line-height: 20px;
    }
  }
  .b-public-profile__raiting-star {
    display: flex;
    align-items: center;
    gap: 4px;
    .b-public-profile__user-raiting {
      @include exo(16px, 700);
      line-height: 24px;
    }
  }
}
.b-public-profile__reviews-list {
  margin-top: 20px;
  position: relative;
  overflow-y: scroll;
  height: 500px;

  @media (max-width: 1400px) {
    height: 400px;
  }

  @include beforeDesktop {
    margin-top: 10px;
    height: 320px;
  }

  .b-public-profile__review {
    padding: 16px 5px;
    border-top: 1px dashed $color-dfdeed;

    .b-review__top-side {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .b-top-side__info {
        display: flex;
        align-items: center;

        .b-review__stars {
          display: flex;
          align-items: center;
          gap: 3px;

          .b-review__grade {
            @include inter(16px, 500, $color-f57125);
            line-height: 20px;
          }
        }

        .b-review__author-full-name {
          @include inter(14px, 500, $color-575775);
          line-height: 16px;
          margin-left: 8px;
        }
      }

      .b-top-side__date {
        @include inter(13px, 500, $color-575775);
        line-height: 20px;
      }
    }
    .b-review__main-side {
      margin-top: 4px;

      .b-review__text {
        @include inter(14px, 500);
        line-height: 24px;
        word-break: break-word;
      }
    }
  }
}
</style>
