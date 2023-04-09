<template>
  <div class="b-hide-events-modal__wrapper">
    <div class="b-hide-events-modal__modal-window">
      <div class="b-hide-events-modal__top-side">
        <div class="b-hide-events-modal__title">Приховати події</div>
        <img
          class="b-hide-events-modal__close-button"
          src="../../../assets/img/cross.svg"
          alt=""
          @click="$emit('closeAndSave', requestIDs)"
        />
        <div class="b-hide-events-modal__tabs-block">
          <div class="b-hide-events-modal__tabs">
            <div
              v-for="tab in tabs"
              :class="[
                'b-hide-events-modal__tab',
                { selected: selectedTabId === tab.id },
              ]"
              @click="changeTab(tab.id)"
            >
              {{ tab.text }}
            </div>
          </div>
          <div class="b-cancel-hide-button" @click="closeModal">
            <span class="b-hide-button-desktop">Скасувати приховування</span>
            <span class="b-hide-button-mobile">Скасувати</span>
          </div>
        </div>
      </div>
      <div class="b-hide-events-modal__main-side" ref="mainEventsBlock">
        <div class="b-main-side__events-list">
          <SmartGridList
            :list="paginationElements"
            ref="refList"
            :detectSizesForCards="detectSizesForCards"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
          >
            <template #smartGridListItem="slotProps">
              <HideEventCard
                :data="slotProps.smartListItem"
                @eyeClick="onEyeClick"
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
          </SmartGridList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import SmartGridList from '../../smart-list/SmartGridList.vue';
import InfiniteLoading from '../../../workers/infinit-load-worker/InfiniteLoading.vue';
import ScrollToTop from '../../ScrollToTop.vue';
import HideEventCard from './HideEventCard.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { PaginationWorker } from '../../../workers/pagination-worker';
import { addMinutes } from '../../../utils/addMinutes';
import { getDate } from '../../../utils/getDate';
import { getTime } from '../../../utils/getTime';

export default {
  components: {
    SmartGridList,
    InfiniteLoading,
    ScrollToTop,
    HideEventCard,
  },
  emits: ['closeModal', 'closeAndSave'],
  setup(_, { emit }) {
    const selectedTabId = ref(1);
    const refList = ref();
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref(false);
    const mainEventsBlock = ref();
    const requestIDs = ref([]);

    const tabs = computed(() => [
      {
        id: 1,
        text: 'Деякі',
      },
      {
        id: 2,
        text: 'Всі',
      },
    ]);

    const changeTab = (tabId) => {
      selectedTabId.value = tabId;
    };

    const closeModal = () => {
      emit('closeModal');
    };

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.EventService.getMyPlannedEvents({
          page,
        }),
      dataTransformation: handlingIncomeData,
    });

    function handlingIncomeData(item) {
      return {
        ...item,
        date: getDate(item.date_and_time),
        time: getTime(item.date_and_time),
        end_time: addMinutes(getTime(item.date_and_time), item.duration),
      };
    }

    const onEyeClick = (eventId) => {
      const event = paginationElements.value.find(
        (event) => event.id === eventId
      );
      if (event) {
        if (requestIDs.value.includes(eventId)) {
            requestIDs.value.splice(requestIDs.value.indexOf(eventId), 1);
        } else {
            requestIDs.value.push(eventId);
        }
        event.hidden = !event.hidden;
      }
    };

    const detectSizesForCards = ({
      itemWidth,
      itemCount,
      itemHeight,
      itemMinHeight,
    }) => {
      if (window.matchMedia('(min-width: 1400px)').matches) {
        itemHeight.value = 150;
        itemWidth.value = mainEventsBlock.value.clientWidth / 3;
        itemCount.value = 3;
      } else if (
        window.matchMedia('(min-width: 1200px) and (max-width: 1400px)').matches
      ) {
        itemHeight.value = 150;
        itemWidth.value = mainEventsBlock.value.clientWidth / 3;
        itemCount.value = 3;
      } else if (
        window.matchMedia('(min-width: 992px) and (max-width: 1199px)').matches
      ) {
        itemHeight.value = 150;
        itemWidth.value = mainEventsBlock.value.clientWidth / 3;
        itemCount.value = 3;
      } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches
      ) {
        itemHeight.value = 150;
        itemWidth.value = mainEventsBlock.value.clientWidth / 3;
        itemCount.value = 3;
      } else if (
        window.matchMedia('(min-width: 576px) and (max-width: 768px)').matches
      ) {
        itemHeight.value = 140;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 430px) and (max-width: 576px)').matches
      ) {
        itemHeight.value = 135;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      } else if (window.matchMedia('(max-width: 430px)').matches) {
        itemHeight.value = 135;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      }
    };

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    loadDataPaginationData(1, null);

    return {
      tabs,
      selectedTabId,
      paginationElements,
      triggerForRestart,
      blockScrollToTopIfExist,
      refList,
      paginationPage,
      paginationTotalCount,
      mainEventsBlock,
      requestIDs,
      restartInfiniteScroll,
      onEyeClick,
      loadDataPaginationData,
      changeTab,
      closeModal,
      detectSizesForCards,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.vue-recycle-scroller__item-view) {
  @include mobile {
    padding: 0px;
  }
}
.b-hide-events-modal__wrapper {
  @include modal-wrapper;

  .b-hide-events-modal__modal-window {
    display: flex;
    flex-direction: column;
    width: 875px;
    height: 655px;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    background: #ffff;
    padding: 24px 20px;

    @include desktop {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @include beforeDesktop {
      width: 100%;
      height: 670px;
      box-shadow: 0px 0px 4px rgba(6, 95, 79, 0.04),
        0px -4px 8px rgba(6, 95, 79, 0.06);
      border-radius: 20px 20px 0px 0px;
      padding: 20px;
      position: absolute;
      bottom: 0;
    }

    @include mobile {
      padding: 22px 0px 8px;
      box-shadow: 0px 0px 4px rgba(6, 95, 79, 0.04),
        0px -4px 8px rgba(6, 95, 79, 0.06);
    }

    .b-hide-events-modal__top-side {
      @include mobile {
        position: fixed;
        bottom: 20px;
        width: 100%;
        padding: 0px 20px;
      }
      .b-hide-events-modal__title {
        @include inter(13px, 400);
        line-height: 24px;

        @include mobile {
          display: none;
        }
      }
      .b-hide-events-modal__close-button {
        cursor: pointer;
        width: 12px;
        height: 12px;
        position: absolute;
        right: 20px;
        top: 20px;

        @include beforeDesktop {
          display: none;
        }
      }

      .b-hide-events-modal__tabs-block {
        display: flex;
        margin-top: 8px;

        @include mobile {
          width: 100%;
          justify-content: space-between;
        }
        .b-hide-events-modal__tabs {
          display: flex;
          align-items: center;
          border: 1px solid #e2e2e4;
          border-radius: 6px;

          .b-hide-events-modal__tab {
            @include inter(13px, 400, $--b-main-gray-color);
            line-height: 22px;
            background: #ffffff;
            text-align: center;
            border-radius: 6px;
            width: 90px;
            padding: 2px;
            cursor: pointer;
            max-height: 30px;

            &.selected {
              background: #f0f0f4;
              border: 2px solid #fff;
              @include inter(13px, 500);
            }
          }
        }
        .b-cancel-hide-button {
          @include inter(13px, 400, $--b-main-gray-color);
          line-height: 32px;
          margin-left: 36px;
          cursor: pointer;

          span {
            border-bottom: 1px solid $--b-main-gray-color;
          }
          .b-hide-button-desktop {
            @include mobile {
              display: none;
            }
          }
          .b-hide-button-mobile {
            display: none;
            @include mobile {
              display: block;
            }
          }
        }
      }
    }
    .b-hide-events-modal__main-side {
      height: 100%;
      margin-top: 20px;
      overflow: hidden;
      @include mobile {
        margin-top: 0px;
      }

      .b-main-side__events-list {
        overflow-y: scroll;
        height: 100%;
      }
    }
  }
}
</style>
