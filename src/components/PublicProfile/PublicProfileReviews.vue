<template>
  <div class="b-public-profile-reviews__block">
    <div class="b-public-profile-reviews__info">
      <div class="b-public-profilereviews__titles-block">
        <div class="b-public-profile-reviews__title">
          {{ $t('player_page.rates-feedbacks') }}
        </div>
        <div class="b-user-reviews__subtitle">
          {{ paginationTotalCount }} {{  $t('player_page.rates') }}
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
      <div v-if="paginationElements">
        <SmartList
          :list="paginationElements"
          ref="refList"
          v-model:scrollbar-existing="blockScrollToTopIfExist"
        >
          <template #smartListItem="slotProps">
            <div class="b-public-profile__review">
              <div class="b-review__top-side">
                <div class="b-top-side__info">
                  <div class="b-review__stars">
                    <div class="b-review__grade">
                      {{ slotProps.smartListItem.stars }}
                    </div>
                    <img src="../../assets/img/star.svg" alt="" />
                  </div>
                  <div class="b-review__author-full-name">
                    {{ slotProps.smartListItem.author.profile.last_name }}
                    {{ slotProps.smartListItem.author.profile.name }}
                  </div>
                </div>
                <div class="b-top-side__date">
                  {{ slotProps.smartListItem.time_created }}
                </div>
              </div>
              <div class="b-review__main-side">
                <div class="b-review__text">
                  {{ slotProps.smartListItem.text }}
                </div>
              </div>
            </div>
          </template>
          <template #after>
            <InfiniteLoading
              :identifier="triggerForRestart"
              ref="scrollbar"
              @infinite="loadDataPaginationData(paginationPage + 1, $event)"
            >
              <template #complete>
                
                <ScrollToTop
                  :element-length="paginationElements"
                  :is-scroll-top-exist="blockScrollToTopIfExist"
                  @scroll-button-clicked="scrollToFirstElement()"
                />
              </template>
            </InfiniteLoading>
          </template>
        </SmartList>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import StarRating from 'vue-star-rating';

import { v4 as uuid } from 'uuid';

import { PaginationWorker } from '../../workers/pagination-worker';

import SmartList from '../smart-list/SmartList.vue';
import InfiniteLoading from '../../workers/infinit-load-worker/InfiniteLoading.vue';
import ScrollToTop from '../ScrollToTop.vue';

import { getDate } from '../../utils/getDate';

import { API } from '../../workers/api-worker/api.worker';

export default {
  name: 'RatingCard',
  components: {
    SmartList,
    ScrollToTop,
    InfiniteLoading,
    StarRating,
  },
  props: {
    userRating: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const usersReviews = ref(true);
    const refList = ref();
    const route = useRoute();
    const blockScrollToTopIfExist = ref(false);

    const triggerForRestart = ref(false);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };


    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.ReviewService.getUserReviews({ page: page }),
      dataTransformation: (item) => {
        item.metadata = {
          expanding: false,
        };
        item.time_created = getDate(item.time_created);
        return item;
      },
    });

    paginationPage.value = 1;
    paginationTotalCount.value = route.meta.reviewsData.data.total_count;
    paginationElements.value = route.meta.reviewsData.data.results.map(
      (item) => {
        return {
          ...item,
          time_created: getDate(item.time_created),
        };
      }
    );

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    return {
      usersReviews,
      triggerForRestart,
      paginationTotalCount,
      blockScrollToTopIfExist,
      paginationElements,
      paginationPage,
      restartInfiniteScroll,
      loadDataPaginationData,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.b-public-profile-reviews__block {
  height: 550px;
  @include beforeDesktop {
    padding: 16px;
    background: #ffffff;
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
      @include inter(12px, 400, #6f6f77);
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
    border-top: 1px dashed #dfdeed;

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
            @include inter(16px, 500, #f57125);
            line-height: 20px;
          }
        }

        .b-review__author-full-name {
          @include inter(14px, 500, #575775);
          line-height: 16px;
          margin-left: 8px;
        }
      }

      .b-top-side__date {
        @include inter(13px, 500, #575775);
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
