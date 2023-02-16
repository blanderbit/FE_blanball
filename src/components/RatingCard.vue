<template>
  <div class="b-rating-card">
    <div class="b-rating-card__top-table">
      <div class="b-rating-card__title">
        {{ $t('profile.my-rate') }}
      </div>
      <div class="b-rating-card__subtitle">
        {{ $t('profile.sub-rate') }}
      </div>
      <ReviewDetailsComponent :user-rate="ratingScale" />
      <div class="b-rating-card__btns-block">
        <div
          class="b-rating-card__left-btn"
          :style="{
            border: `1px solid ${rateStatus ? '#DFDEED' : '#148581'}`,
          }"
          @click="switchRate(false)"
        >
          {{ $t('profile.generally') }}
        </div>
        <div
          :class="[
            'b-rating-card__right-btn',
            { 'b-rating-card__right-btn__disabled': !ratingScale },
          ]"
          :style="{
            border: `1px solid ${rateStatus ? '#148581' : '#DFDEED'}`,
          }"
          @click="ratingScale ? switchRate(true) : null"
        >
          {{ $t('profile.detailed') }}
        </div>
      </div>
      <transition>
        <div v-if="rateStatus" class="b-rating-card__cards-block">
          <div v-if="paginationElements">
            <SmartList
              :list="paginationElements"
              ref="refList"
              v-model:scrollbar-existing="blockScrollToTopIfExist"
            >
              <template #smartListItem="slotProps">
                <div
                  :class="[
                    'b-rating-card__card',
                    {
                      'b-rating-card__card-opened':
                        openedReviewID === slotProps.smartListItem.id,
                    },
                  ]"
                  :style="{ 'border-top': idx !== 0 && '1px dashed #DFDEED' }"
                  @click="$emit('openReview', slotProps.smartListItem.id)"
                >
                  <div class="b-rating-card__top-line">
                    <div class="b-rating-card__name">
                      {{ slotProps.smartListItem.author.profile.name }}
                      {{ slotProps.smartListItem.author.profile.last_name }}
                    </div>
                    <div class="b-rating-card__rate">
                      <star-rating
                        :rating="slotProps.smartListItem.stars"
                        :star-size="14"
                        :show-rating="false"
                        :read-only="true"
                        :active-color="'#148783'"
                      >
                      </star-rating>
                      <span
                        v-if="openedReviewID === slotProps.smartListItem.id"
                        class="b-rating-card__hide-button"
                        @click="$emit('hideReview')"
                      >
                        Приховати
                      </span>
                    </div>
                  </div>
                  <div class="b-rating-card__bottom-line">
                    <div class="b-rating-card__date">
                      {{ slotProps.smartListItem.time_created }}
                    </div>
                  </div>
                  <div
                    v-if="openedReviewID === slotProps.smartListItem.id"
                    class="b-rating-card__text"
                  >
                    {{ slotProps.smartListItem.text }}
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
                    <EmptyList
                      v-if="!paginationElements.length"
                      :title="emptyListMessages.title"
                      :description="emptyListMessages.title"
                    />

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
          <div v-else class="b-rating-card__no-reviews-block">
            <div class="b-rating-card__no-data-title">
              {{ $t('profile.no-review') }}
            </div>
            <div class="b-rating-card__no-data-text">
              {{ $t('profile.add-to-event') }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import StarRating from 'vue-star-rating'
import dayjs from 'dayjs'

import { v4 as uuid } from 'uuid'

import { PaginationWorker } from '../workers/pagination-worker'
import { FilterPatch } from '../workers/api-worker/http/filter/filter.patch'

import ReviewDetailsComponent from '../components/ReviewDetails.vue'
import SmartList from './smart-list/SmartList.vue'
import InfiniteLoading from '../workers/infinit-load-worker/InfiniteLoading.vue'

import { API } from '../workers/api-worker/api.worker'

import CONSTANTS from '../consts/index'

export default {
  name: 'RatingCard',
  components: {
    ReviewDetailsComponent,
    SmartList,
    InfiniteLoading,
    StarRating
  },
  props: {
    ratingScale: {
      type: Number,
      default: null,
    },
    openedReviewID: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const rateStatus = ref(false)
    const usersReviews = ref(true)
    const isLoader = ref(false)
    const refList = ref()
    const route = useRoute();
    const router = useRouter();
    const blockScrollToTopIfExist = ref(false)

    const triggerForRestart = ref(false)

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid()
    }

    const mockData = computed(() => {
      return {
        rateBlock: CONSTANTS.users_page.rateBlock,
      }
    })

    const emptyListMessages = computed(() => {
      return {
        title: 'Немає повідомлень для відображення',
        description: 'Вам ще не надходили сповіщення від інших користувачів',
      }
    })

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.ReviewService.getMyReviews({'page': page}),
      dataTransformation: (item) => {
        item.metadata = {
          expanding: false,
        }
        item.time_created = dayjs(item.time_created).format('DD.MM.YYYY')
        return item
      },
    })

    paginationPage.value = 1
    paginationElements.value = route.meta.allReviewsData.data.results.map((item) => {
      return {
        ...item,
        time_created: `${dayjs(item.time_created)
          .format('D.MM.YYYY')}`,
      }
    })

    const { getRawFilters, filters, setFilters, clearFilters } = FilterPatch({
      router,
      filters: {},
      afterUpdateFiltersCallBack: () => {
        restartInfiniteScroll()
        paginationClearData()
      },
    })

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      })
    }

    function switchRate(val) {
      rateStatus.value = val
    }

    return {
      rateStatus,
      usersReviews,
      mockData,
      emptyListMessages,
      triggerForRestart,
      blockScrollToTopIfExist,
      paginationElements,
      paginationPage,
      restartInfiniteScroll,
      loadDataPaginationData,
      switchRate,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement()
      },
    }
  },
}
</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
    display: none;
}
.b-rating-card {
  height: fit-content;
  background: #ffffff;
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

  .b-rating-card__top-table {
    .b-rating-card__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #262541;
    }
    .b-rating-card__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #575775;
    }
    .b-rating-card__scale-block {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 12px;
      margin-bottom: 12px;
    }
    .b-rating-card__btns-block {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      display: flex;
      .b-rating-card__left-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        color: #262541;
        border-radius: 6px 0px 0px 6px;
        flex-basis: 50%;
        cursor: pointer;
      }
      .b-rating-card__right-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        color: #575775;
        border-radius: 0px 6px 6px 0px;
        flex-basis: 50%;
        cursor: pointer;
        transform: translateX();

        &__disabled {
          color: #a8a8bd;
          cursor: default;
        }
      }
    }
    .b-rating-card__cards-block {
      margin-top: 20px;
      position: relative;
      max-height: 400px;
      overflow-y: scroll;

      .b-rating-card__card-opened {
        background: #f9f9fc;
        border-bottom: 1px dashed #f0f0f4;
        border-radius: 8px;
        padding: 12px;
      }
      .b-rating-card__card {
        padding-top: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        .b-rating-card__top-line {
          display: flex;
          justify-content: space-between;
          .b-rating-card__name {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #262541;
          }
        }
        .b-rating-card__hide-button {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          background: #efeff6;
          border-radius: 4px;
          padding: 4px;
        }
        .b-rating-card__bottom-line {
          display: flex;
          justify-content: flex-start;
          .b-rating-card__date {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            color: #575775;
          }
        }
        .b-rating-card__text {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #262541;
          max-width: 100%;
          word-break: break-word;
          margin-top: 10px;
        }
      }
    }
    .b-rating-card__no-reviews-block {
      .b-rating-card__no-data-title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 28px;
        color: #262541;
      }
      .b-rating-card__no-data-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #575775;
        margin-top: 12px;
      }
    }
  }
}
</style>
