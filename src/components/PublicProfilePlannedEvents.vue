<template>
  <div class="b-public-profile__planned-events">
    <div class="b-planned-events__title">
      {{ $t('player_page.planned-events') }}
    </div>
    <div class="b-public-profile__events-list">
      <div v-if="paginationElements">
        <SmartList
          :list="paginationElements"
          ref="refList"
          v-model:scrollbar-existing="blockScrollToTopIfExist"
        >
          <template #smartListItem="slotProps">
            <div class="b-event">
              <div class="b-event__top-side">
                <div class="b-event__type">
                  {{ $t('events.friendly-match') }}
                </div>
                <div class="b-event__user-role">Вболівальник</div>
              </div>
              <div class="b-event__main-side">
                <div class="b-event_date-and-time">
                  {{ slotProps.smartListItem.date_and_time }}
                </div>

                <div class="b-event__labels">
                  <div class="b-event__label">
                    {{ $t(`hashtags.${slotProps.smartListItem.type}`) }}
                  </div>
                  <div class="b-event__label">
                    {{ $t(`events.${slotProps.smartListItem.gender}`) }}
                  </div>
                  <div class="b-event__label">...</div>
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { v4 as uuid } from 'uuid';

import { PaginationWorker } from '../workers/pagination-worker';

import SmartList from './smart-list/SmartList.vue';
import InfiniteLoading from '../workers/infinit-load-worker/InfiniteLoading.vue';
import ScrollToTop from './ScrollToTop.vue';

import { getDate } from '../utils/getDate';

import { API } from '../workers/api-worker/api.worker';

export default {
  name: 'RatingCard',
  components: {
    SmartList,
    ScrollToTop,
    InfiniteLoading,
  },
  props: {
    userRating: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const refList = ref();
    const route = useRoute();
    const blockScrollToTopIfExist = ref(false);

    const triggerForRestart = ref(false);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const emptyListMessages = computed(() => {
      return {
        title: 'Немає повідомлень для відображення',
        description: 'Вам ще не надходили сповіщення від інших користувачів',
      };
    });

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.EventService.getPlannedUserEvents({ page: page }),
      dataTransformation: (item) => {
        item.metadata = {
          expanding: false,
        };
        item.date_and_time = getDate(item.date_and_time);
        return item;
      },
    });

    paginationPage.value = 1;
    paginationTotalCount.value = route.meta.eventsData.data.total_count;
    paginationElements.value = route.meta.eventsData.data.results.map(
      (item) => {
        return {
          ...item,
          date_and_time: getDate(item.date_and_time),
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
      emptyListMessages,
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
.b-public-profile__planned-events {
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 0px 12px 12px 0px;
  padding: 24px;
  padding-left: 32px;
  width: 400px;
  border-right: 1px solid #efeff6;

  @media (max-width: 1400px) {
    width: 350px;
  }

  @media (max-width: 1200px) {
    width: 310px;
    padding: 16px;
  }

  @include beforeDesktop {
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    height: 400px;
    margin-left: 16px;
  }
  .b-planned-events__title {
    @include exo(16px, 700);
    line-height: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #dfdeed;
  }
}
.b-public-profile__events-list {
  overflow: scroll;
  height: 500px;

  @include beforeDesktop {
    height: 320px;
  }
  .b-event {
    padding: 16px 0px;
    border-bottom: 1px dashed #dfdeed;

    .b-event__top-side {
      display: flex;
      align-items: center;
      gap: 6px;

      .b-event__type {
        @include exo(14px, 600);
        line-height: 20px;
      }

      .b-event__user-role {
        @include inter(12px, 400);
        line-height: 20px;
        background: #f0f0f4;
        border-radius: 4px;
        padding: 0px 4px;
      }
    }
    .b-event__main-side {
      margin: 6px 0px;
      .b-event_date-and-time {
        @include inter(12px, 400, #575775);
        line-height: 20px;
      }
      .b-event__labels {
        display: flex;
        align-items: center;
        gap: 4px;
        .b-event__label {
          @include inter(12px, 400);
          line-height: 20px;
          border: 1px solid #dfdeed;
          border-radius: 100px;
          padding: 0px 8px;
          height: 20px;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
