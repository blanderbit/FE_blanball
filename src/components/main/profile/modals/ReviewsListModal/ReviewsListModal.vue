<template>
  <div class="b-reviews-list-modal__wrapper"
    @click.self="$emit('closeModal')">
    <div class="b-reviews-list-modal__modal-window">
      <div class="b-reviews-list-modal__top-side">
        <img
          class="b-close-modal-button"
          src="../../../../../assets/img/cross.svg"
          alt=""
          @click="$emit('closeModal')"
        />
        <div class="b-reviews-list-modal__titles">
          <div class="b-title">{{ $t('player_page.feedbacks') }}</div>
          <div class="b-title-mobile">
            <img src="../../../../../assets/img/arrow-left.svg" alt="" />
            <span>Відгуки про мене</span>
          </div>
          <div class="b-subtitle">
            {{ paginationTotalCount }} {{ $t('player_page.rates') }}
          </div>
        </div>
        <div class="b-rating-grade">
          <span>4</span>
          <img src="../../../../../assets/img/green-star.svg" alt="" />
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import InfiniteLoading from '../../../infiniteLoading/InfiniteLoading.vue';
import SmartList from '../../../../shared/smartList/SmartList.vue';
import ScrollToTop from '../../../../ScrollToTop.vue';
import Review from './Review.vue';

import { API } from '../../../../../workers/api-worker/api.worker';
import { PaginationWorker } from '../../../../../workers/pagination-worker';

export default {
  components: {
    InfiniteLoading,
    SmartList,
    ScrollToTop,
    Review,
  },
  emits: [
    'closeModal'
  ],
  setup() {
    const refList = ref();
    const route = useRoute();
    const blockScrollToTopIfExist = ref(false);
    const openedReviewId = ref(0);

    const triggerForRestart = ref(false);
    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const openCloseReview = (reviewId) => {
      if (openedReviewId.value === reviewId) {
        openedReviewId.value = 0;
      } else {
        openedReviewId.value = reviewId;
      }
    }

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.ReviewService.getMyReviews({ page: page }),
      dataTransformation: (item) => {
        item.metadata = {
          expanding: false,
        };
      },
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
      paginationPage,
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
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @include mobile {
      width: 100%;
      padding: 16px;
      border-radius: 0px;
      @include calc-height(120px);
      top: 120px;
      box-shadow: none;
    }

    // 80 and 120

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
