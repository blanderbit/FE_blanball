<template>
  <div class="b-public-profile-reviews__block">
    <div class="b-public-profile-reviews__info">
      <div class="b-public-profilereviews__titles-block">
        <div class="b-public-profile-reviews__title">
          {{ $t('player_page.rates-feedbacks') }}
        </div>
        <div class="b-user-reviews__subtitle">
          <span v-if="reviewsTotalCount > 0"
            >{{ reviewsTotalCount }} {{ $t('player_page.rates') }}</span
          >
          <span v-else>{{ $t('player_page.no-grades') }}</span>
        </div>
      </div>
      <div class="b-public-profile__raiting-star">
        <div class="b-public-profile__user-raiting">
          {{ userRating }} <span>/ {{ ratingMaxValue }}</span>
        </div>
        <img
          v-if="reviewsTotalCount > 0"
          src="@images/star.svg"
          alt=""
        />
        <img v-else src="@images/dashed-star.svg" alt="" />
      </div>
    </div>
    <div class="b-public-profile__reviews-list">
      <div v-if="!userShowReviews" class="b-public-profile__reviews-hidden">
        <img src="@images/info-black.svg" alt="" />
        <span>{{ $t('player_page.feedback-hidden') }}</span>
      </div>
      <SimpleListWrapper :requestForGetData="getReviews" v-else>
        <template #default="{ smartListItem: item }">
          <div class="b-public-profile__review">
            <div class="b-review__top-side">
              <div class="b-top-side__info">
                <div class="b-review__stars">
                  <div class="b-review__grade">
                    {{ item.stars }}
                  </div>
                  <img src="@images/star.svg" alt="" />
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
          <div class="b-public-profile__reviews-hidden">
            <img src="@images/info-black.svg" alt="" />
            <span>{{
              $t('no_records.noPublicProfileReviews.title', {
                fullName: userFullName,
              })
            }}</span>
          </div>
        </template>
      </SimpleListWrapper>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import StarRating from 'vue-star-rating';

import smartList from '@sharedComponents/smartList/SmartList.vue';
import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import ScrollToTop from '@sharedComponents/scrollToTop/ScrollToTop.vue';
import SimpleListWrapper from '@sharedComponents/simpleList/SimpleList.vue';

import { getDate } from '@utils/getDate';

import { API } from '@workers/api-worker/api.worker';

import { CONSTS } from '@consts';

export default {
  name: 'RatingCard',
  components: {
    smartList,
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
    userShowReviews: {
      type: Boolean,
      required: true,
    },
    userFullName: {
      type: String,
    },
  },
  setup(props) {
    const reviewsTotalCount = ref(0);

    const ratingMaxValue = computed(() => {
      return CONSTS.profile.ratingMaxValue
    })

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
      ratingMaxValue,
      getReviews,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f9f9fc: #f9f9fc;
$color-6f6f77: #6f6f77;
$color-dfdeed: #dfdeed;
$color-f57125: #f57125;

:deep(.b-scroll-top__return-top) {
  margin: 16px 0px;
}

.b-public-profile-reviews__block {
  overflow: hidden;
  @include beforeDesktop {
    padding: 16px;
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 12px;
    margin-top: 20px;
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
      @include exo(22px, 700);
      line-height: 28px;

      span {
        @include inter(14px, 500, $--b-main-gray-color);
        line-height: 24px;
      }
    }
  }
}
.b-public-profile__reviews-list {
  margin-top: 20px;
  position: relative;
  overflow-y: scroll;
  height: 430px;

  @include beforeDesktop {
    margin-top: 10px;
  }

  .b-public-profile__reviews-hidden {
    @include inter(13px, 400);
    line-height: 20px;
    display: flex;
    gap: 8px;
    word-break: break-word;
    border-radius: 6px;
    background: $color-f9f9fc;
    padding: 8px;
    padding-left: 12px;
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
          @include inter(14px, 500, $--b-main-gray-color);
          line-height: 16px;
          margin-left: 8px;
        }
      }

      .b-top-side__date {
        @include inter(13px, 500, $--b-main-gray-color);
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
