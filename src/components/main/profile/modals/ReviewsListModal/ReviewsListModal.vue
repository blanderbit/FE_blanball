<template>
  <div class="b-reviews-list-modal__wrapper" @click.self="$emit('closeModal')">
    <div
      class="b-reviews-list-modal__modal-window"
      :style="reviewListModalTopMargin"
    >
      <div class="b-reviews-list-modal__top-side">
        <img
          class="b-close-modal-button"
          src="@images/cross.svg"
          alt=""
          @click="$emit('closeModal')"
        />
        <div class="b-reviews-list-modal__titles">
          <div class="b-title">{{ $t('player_page.feedbacks') }}</div>
          <div class="b-title-mobile">
            <img
              src="@images/arrow-left.svg"
              alt=""
              @click="$emit('closeModal')"
            />
            <span>{{ $t('profile.reviews-about-me') }}</span>
          </div>
          <div class="b-subtitle">
            {{ paginationTotalCount }} {{ $t('player_page.rates') }}
          </div>
        </div>
        <div class="b-rating-grade">
          <span>{{ userRating }}</span>
          <img src="@images/green-star.svg" alt="" />
        </div>
      </div>
      <div class="b-reviews-list-modal__main-side">
        <div class="b-reviews-list" v-if="paginationElements">
          <SmartList
            :list="paginationElements"
            ref="refList"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
          >
            <template #smartListItem="slotProps">
              <Review
                :key="slotProps.index"
                :reviewData="slotProps.smartListItem"
                :openedReviewId="openedReviewId"
                @openCloseReview="openCloseReview"
              />
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
  </div>
</template>

<script>

import { v4 as uuid } from 'uuid';

import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import SmartList from '@sharedComponents/smartList/SmartList.vue';
import ScrollToTop from '@sharedComponents/scrollToTop/ScrollToTop.vue';
import Review from './Review.vue';


import { PaginationWorker } from '@workers/pagination-worker';
import { useHeaderHeightStore } from '@stores/headerHeight';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';

export default {
  components: {
    InfiniteLoading,
    SmartList,
    ScrollToTop,
    Review,
  },
  emits: ['closeModal'],
  props: {
    userRating: Number
  },
  setup() {
    const refList = ref();
    const route = useRoute();
    const blockScrollToTopIfExist = ref(false);
    const openedReviewId = ref(0);

    const headerHegihtStore = useHeaderHeightStore();
    const { isMobileSmall } = useWindowWidth();

    const triggerForRestart = ref(false);
    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const reviewListModalTopMargin = computed(() => {
      return {
        top: `${
          isMobileSmall.value ? headerHegihtStore.headerHeight + 'px' : '50%'
        }`,
      };
    });

    const openCloseReview = (reviewId) => {
      if (openedReviewId.value === reviewId) {
        openedReviewId.value = 0;
      } else {
        openedReviewId.value = reviewId;
      }
    };

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.ReviewService.getMyReviews({ page: page }),
    });

    paginationPage.value = 1;
    paginationElements.value = route.meta.allReviewsData.data.results;
    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    return {
      triggerForRestart,
      blockScrollToTopIfExist,
      paginationElements,
      refList,
      paginationPage,
      reviewListModalTopMargin,
      openedReviewId,
      paginationTotalCount,
      openCloseReview,
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
$color-dfdeed: #dfdeed;

:deep(.b-scroll-top__return-top) {
  margin: 16px 0px;
}
.b-reviews-list-modal__wrapper {
  @include modal-wrapper;

  @include mobile {
    background: transparent;
    z-index: 11 !important;
  }
  .b-reviews-list-modal__modal-window {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 560px;
    height: 588px;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 12px;
    padding: 24px;
    padding-right: 34px;
    background: $--b-main-white-color;

    @include afterMobile {
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @include mobile {
      width: 100%;
      padding: 16px;
      border-radius: 0px;
      @include calc-height(120px);
      box-shadow: none;
    }

    .b-reviews-list-modal__top-side {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid $color-dfdeed;
      position: relative;

      @include mobile {
        border-bottom: none;
      }
      .b-close-modal-button {
        cursor: pointer;
        position: absolute;
        right: -15px;
        top: -5px;

        @include mobile {
          display: none;
        }
      }

      .b-reviews-list-modal__titles {
        .b-title {
          @include exo(20px, 700);
          line-height: 24px;

          @include mobile {
            display: none;
          }
        }
        .b-title-mobile {
          display: none;

          img {
            cursor: pointer;
            margin-right: 12px;
            margin-left: 10px;
          }

          @include mobile {
            display: block;
            @include exo(16px, 700);
          }
        }
        .b-subtitle {
          @include inter(12px, 400, $--b-main-gray-color);
          line-height: 20px;
          margin-top: 4px;

          @include mobile {
            display: none;
          }
        }
      }
      .b-rating-grade {
        display: flex;
        align-items: center;
        gap: 4px;
        span {
          @include exo(20px, 700);
          line-height: 24px;

          @include mobile {
            @include exo(16px, 700);
          }
        }
      }
    }
    .b-reviews-list-modal__main-side {
      overflow: hidden;
      .b-reviews-list {
        overflow-y: scroll;
        height: 100%;
      }
    }
  }
}
</style>
