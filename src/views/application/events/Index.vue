<template>
  <ContextModal
    v-if="isEventJoinModalActive"
    :clientX="eventJoinModalX"
    :clientY="eventJoinModalY"
    :modalItems="eventJoinToolTipItems"
    :background="false"
    @closeModal="closeEventJoinModal"
    @itemClick="joinEventModalItemClick"
  />
  <div class="b-events-page">
    <div
      @click="goToCreateEvent"
      class="b-events-page-create-event-mobile-button"
    >
      <img src="@images/plus.svg" alt="" />
    </div>
    <div class="b-events-page__main-body" ref="mainEventsBlock">
      <div class="b-events-page__header-block">
        <div class="b-events-page__left-part">
          <div class="b-events-page__title">
            {{ $t('events.future-events') }}
          </div>
          <div class="b-events-page__event-switcher">
            <div class="b-events-page__general-events">
              {{ $t('events.general-events') }}
            </div>
            <div class="b-events-page__my-events" @click="switchToMyEvents">
              {{ $t('events.my-events') }}
            </div>
          </div>
          <div class="b-events-page__event-switcher-mobile">
            <div class="b-events-page__general-events-mobile">
              {{ $t('events.general-events') }}
            </div>
            <div
              class="b-events-page__my-events-mobile"
              @click="switchToMyEvents"
            >
              {{ $t('events.my-events') }}
            </div>
          </div>
        </div>
        <div class="b-events-page__right-part">
          <GreenBtn
            :text="$t('buttons.create-event')"
            :width="168"
            :icon="iconPlus"
            :height="32"
            @click-function="goToCreateEvent"
          />
        </div>
      </div>

      <div class="b-events-page__main-search-block">
        <events-filters
          :modelValue="filters"
          :elementsCount="paginationTotalCount"
          @update:value="setFilters"
          @clearFilters="clearFilters"
          @updatedActiveFilters="recalculateHeightAfterUpdateFiltersActive"
        ></events-filters>
        <div
          class="b-events-page__all-events-block"
          :id="allEventsBlockHeight"
          :style="`height: ${allEventsBlockHeight}`"
        >
          <smartGridList
            :list="paginationElements"
            ref="refList"
            :detectSizesForCards="detectSizesForCards"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
          >
            <template #smartGridListItem="slotProps">
              <EventCard
                :key="slotProps.index"
                :card="slotProps.smartListItem"
                @go-to-event-page="goToEventPage(slotProps.smartListItem.id)"
                @event-join="
                  showEventJoinModal($event, slotProps.smartListItem)
                "
              />
            </template>
            <template #after>
              <InfiniteLoading
                :identifier="triggerForRestart"
                ref="scrollbar"
                @infinite="loadDataPaginationData(paginationPage + 1, $event)"
              >
                <template #complete>
                  <emptyList
                    v-if="!paginationElements.length"
                    :title="emptyListMessages.title"
                    :description="emptyListMessages.title"
                    :buttonText="emptyListMessages.button_text"
                    @buttonClick="goToCreateEvent"
                  />

                  <ScrollToTop
                    :element-length="paginationElements"
                    :is-scroll-top-exist="blockScrollToTopIfExist"
                    @scroll-button-clicked="scrollToFirstElement()"
                  />
                </template>
              </InfiniteLoading>
            </template>
          </smartGridList>
        </div>
      </div>
    </div>

    <rightSidebar />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import MainInput from '@sharedComponents/input/MainInput.vue';
import ContextMenu from '@sharedComponents/modals/ContextModal.vue';
import EventCard from '@mainComponents/events/EventCard.vue';
import MyEventCard from '@mainComponents/events/MyEventCard.vue';
import rightSidebar from '@mainComponents/rightSidebar/RightSidebar.vue';
import emptyList from '@sharedComponents/emptyList/EmptyList.vue';
import smartGridList from '@sharedComponents/smartList/SmartGridList.vue';
import ScrollToTop from '@sharedComponents/scrollToTop/ScrollToTop.vue';
import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import Dropdown from '@sharedComponents/dropdown/Dropdown.vue';
import EventsFilters from '@mainComponents/filters/block-filters/EventsFilters.vue';
import ContextModal from '@sharedComponents/modals/ContextModal.vue';
import SelectFormsColorsModal from '@mainComponents/manageEvent/modals/SelectFormsColorsModal.vue';

import { PaginationWorker } from '@workers/pagination-worker';
import { FilterPatch } from '@workers/api-worker/http/filter/filter.patch';
import { addMinutes } from '@utils/addMinutes';
import { getDate } from '@utils/getDate';
import { getTime } from '@utils/getTime';
import { calcHeight } from '@workers/window-size-worker/calcHeight';
import {
  finishSpinner,
  startSpinner,
} from '@workers/loading-worker/loading.worker';
import { useUserDataStore } from '@stores/userData';

import Plus from '@images/plus.svg';

const eventJoinTypes = {
  PLAY: 'play',
  VIEW: 'view',
};

const eventParticipationTypes = {
  REQUEST_PARTICIPATION: 'request_participation',
  PLAYER: 'player',
  FAN: 'fan',
};

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    Dropdown,
    emptyList,
    MainInput,
    ContextMenu,
    EventCard,
    MyEventCard,
    rightSidebar,
    smartGridList,
    InfiniteLoading,
    ScrollToTop,
    EventsFilters,
    SelectFormsColorsModal,
    ContextModal,
  },
  setup() {
    const scrollComponent = ref(null);
    const isEventJoinModalActive = ref(false);
    const router = useRouter();
    const toast = useToast();
    const eventCards = ref([]);
    const joinEventData = ref(null);
    const eventJoinModalX = ref(null);
    const eventJoinModalY = ref(null);
    const { t } = useI18n();
    const isLoaderActive = ref(false);
    const mainEventsBlock = ref();
    const userStore = useUserDataStore();

    const eventJoinToolTipItems = computed(() => {
      return CONSTS.eventJoin.items;
    });

    const mockData = computed(() => {
      return {
        event_cards: CONSTS.event_page.event_cards,
        sport_type_dropdown: CONSTS.event_page.sport_type_dropdown,
        gender_dropdown: CONSTS.event_page.gender_dropdown,
      };
    });
    const iconPlus = computed(() => Plus);
    const emptyListMessages = computed(() => {
      return {
        title: t('no_records.noEvents.title'),
        description: t('no_records.noEvents.description'),
        button_text: t('no_records.noEvents.button_text'),
      };
    });

    const allEventsBlockHeightConfig = ref({
      default: [90, 65, 80, 40],
      mobile: [userStore.user.is_verified ? 0 : 40],
      tablet: [userStore.user.is_verified ? 0 : 40],
      recalculateOnVerifyEmail: true,
    });
    const { calculatedHeight, minusHeight, plusHeight } = calcHeight(
      ...Object.values(allEventsBlockHeightConfig.value)
    );

    const allEventsBlockHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    async function joinEvent(eventData, type) {
      let participationType;
      startSpinner();
      switch (type) {
        case eventJoinTypes.PLAY:
          participationType = eventParticipationTypes.PLAYER;
          await API.EventService.eventJoinAsPlayer(eventData.id);
          break;
        case eventJoinTypes.VIEW:
          participationType = eventParticipationTypes.FAN;
          await API.EventService.eventJoinAsFan(eventData.id);
          break;
      }

      const joinedEvent = paginationElements.value.find(
        (event) => event.id === eventData.id
      );

      if (joinedEvent.privacy) {
        joinedEvent.request_user_role =
          eventParticipationTypes.REQUEST_PARTICIPATION;
      } else {
        joinedEvent.request_user_role = participationType;
      }

      finishSpinner();

      switch (type) {
        case eventJoinTypes.PLAY:
          if (eventData.privacy) {
            toast.success(t('notifications.event-request-sent'));
          } else {
            toast.success(t('notifications.event-join-as-player'));
          }
          break;
        case eventJoinTypes.VIEW:
          toast.success(t('notifications.event-join-as-fan'));
          break;
      }
    }

    function joinEventModalItemClick(data) {
      switch (data) {
        case eventJoinTypes.PLAY:
          joinEvent(joinEventData.value, eventJoinTypes.PLAY);
          closeEventJoinModal();
          break;
        case eventJoinTypes.VIEW:
          joinEvent(joinEventData.value, eventJoinTypes.VIEW);
          closeEventJoinModal();
          break;
      }
    }

    const showEventJoinModal = (e, eventData) => {
      eventJoinModalX.value = e.clientX;
      eventJoinModalY.value = e.clientY;
      joinEventData.value = eventData;
      isEventJoinModalActive.value = true;
    };

    const closeEventJoinModal = () => {
      isEventJoinModalActive.value = false;
      eventJoinModalX.value = null;
      eventJoinModalY.value = null;
      joinEventData.value = null;
    };

    function handlingIncomeData(item) {
      return {
        ...item,
        date: getDate(item.date_and_time),
        time: getTime(item.date_and_time),
        end_time: addMinutes(getTime(item.date_and_time), item.duration),
        labels: [
          item.type,
          item.gender === 'Man' ? t('events.men') : t('events.women'),
          item.need_form
            ? t('events.need-uniform')
            : t('events.do-not-need-uniform'),
        ],
      };
    }
    function goToEventPage(id) {
      router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(id));
    }
    function goToCreateEvent() {
      router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute);
    }
    function switchToMyEvents() {
      router.push(ROUTES.APPLICATION.MY_EVENTS.index.absolute);
    }

    function recalculateHeightAfterUpdateFiltersActive(status) {
      if (status) {
        minusHeight(45);
      } else {
        plusHeight(45);
      }
    }

    const refList = ref();
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
      paginationDataRequest: (page) => {
        return API.EventService.getAllEvents({
          ...getRawFilters(),
          page,
        });
      },
      dataTransformation: handlingIncomeData,
    });
    paginationPage.value = 1;
    paginationTotalCount.value =
      router.currentRoute.value.meta.eventData.data.total_count;
    paginationElements.value =
      router.currentRoute.value.meta.eventData.data.results.map(
        handlingIncomeData
      );
    const { getRawFilters, updateFilter, filters, clearFilters, setFilters } =
      FilterPatch({
        router,
        filters: {
          duration: {
            type: Number,
            value: null,
          },
          dist: {
            type: String,
            value: null,
          },
          point: {
            type: String,
            value: null,
          },
          type: {
            type: String,
          },
          date_and_time_after: {
            type: String,
          },
          date_and_time_before: {
            type: String,
          },
          ordering: {
            type: String,
            value: '',
          },
          place: {
            type: String,
            value: '',
          },
          status: {
            type: String,
            value: '',
          },
          gender: {
            type: String,
            value: '',
          },
          search: {
            type: String,
            value: '',
          },
          need_ball: {
            type: Boolean,
            value: false,
          },
        },
        afterUpdateFiltersCallBack: () => {
          restartInfiniteScroll();
          paginationClearData();
        },
      });
    const detectSizesForCards = ({
      itemWidth,
      itemCount,
      itemHeight,
      itemMinHeight,
    }) => {
      if (window.matchMedia('(min-width: 1400px)').matches) {
        itemHeight.value = 320;
        itemWidth.value = mainEventsBlock.value.clientWidth / 3;
        itemCount.value = 3;
      } else if (
        window.matchMedia('(min-width: 1200px) and (max-width: 1400px)').matches
      ) {
        itemHeight.value = 305;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 992px) and (max-width: 1200px)').matches
      ) {
        itemHeight.value = 320;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 992px)').matches
      ) {
        itemHeight.value = 320;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 576px) and (max-width: 768px)').matches
      ) {
        itemHeight.value = 300;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      } else if (
        window.matchMedia('(min-width: 430px) and (max-width: 576px)').matches
      ) {
        itemHeight.value = 300;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      } else if (window.matchMedia('(max-width: 430px)').matches) {
        itemHeight.value = 330;
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

    return {
      emptyListMessages,
      scrollComponent,
      eventCards,
      isLoaderActive,
      paginationTotalCount,
      isEventJoinModalActive,
      mainEventsBlock,
      eventJoinModalY,
      eventJoinModalX,
      mockData,
      eventJoinToolTipItems,
      filters,
      refList,
      iconPlus,
      blockScrollToTopIfExist,
      triggerForRestart,
      paginationElements,
      paginationPage,
      allEventsBlockHeight,
      recalculateHeightAfterUpdateFiltersActive,
      joinEventModalItemClick,
      paginationLoad,
      loadDataPaginationData,
      detectSizesForCards,
      setFilters,
      clearFilters,
      showEventJoinModal,
      goToEventPage,
      goToCreateEvent,
      switchToMyEvents,
      closeEventJoinModal,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-148581: #148581;
$color-f0f0f4: #f0f0f4;

@import 'v-calendar/dist/style.css';
.b-events-page {
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-gap: 28px;
  position: relative;
  height: fit-content;

  @include allDevicesBeforeDesktop {
    grid-template-columns: 1fr;
  }

  .b-events-page-create-event-mobile-button {
    background: $--b-main-green-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 100px;
    padding: 12px;
    position: absolute;
    display: none;
    font-size: 24px;
    font-weight: 700px;
    width: 44px;
    height: 44px;
    right: 25px;
    z-index: 10;
    bottom: 15%;

    @include allDevicesBeforeDesktop {
      display: flex;
    }
  }
  .b-events-page__main-body {
    position: relative;
    .b-events-page__header-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .b-events-page__left-part {
        .b-events-page__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: $--b-main-black-color;
          margin-bottom: 4px;
        }
        .b-events-page__subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: $--b-main-gray-color;
          @include desktopDevice {
            display: none;
          }
        }
        .b-events-page__event-switcher {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
          color: $--b-main-black-color;
          display: flex;
          @include allDevicesBeforeDesktop {
            display: none;
          }
          .b-events-page__general-events {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 100px;
            height: 28px;
            border-radius: 6px 0px 0px 6px;
            border: 1px solid $color-148581;
            cursor: pointer;
          }
          .b-events-page__my-events {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 100px;
            height: 28px;
            border-radius: 0px 6px 6px 0px;
            border-top: 1px solid $color-f0f0f4;
            border-right: 1px solid $color-f0f0f4;
            border-bottom: 1px solid $color-f0f0f4;
            cursor: pointer;
          }
        }

        .b-events-page__event-switcher-mobile {
          display: none;
          align-items: center;
          justify-content: space-between;
          width: 344px;
          border: 1px solid $color-f0f0f4;
          border-radius: 6px;
          height: 36px;
          padding: 4px;
          margin-top: 16px;

          @include allDevicesBeforeDesktop {
            display: flex;
          }
          .b-events-page__general-events-mobile {
            flex: 50%;
            cursor: pointer;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            color: $--b-main-black-color;
            background: $color-f0f0f4;
            border-radius: 4px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .b-events-page__my-events-mobile {
            flex: 50%;
            cursor: pointer;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            text-align: center;
            color: $--b-main-gray-color;
          }
        }
      }
      .b-events-page__right-part {
        @include allDevicesBeforeDesktop {
          display: none;
        }
        a {
          text-decoration: none;
        }
      }
    }
    .b-events-page__main-search-block {
      margin-top: 36px;
      position: relative;
      @include allDevicesBeforeDesktop {
        padding: 0;
      }
      .b-events-page__all-events-block {
        position: relative;
        margin-top: 15px;
        overflow: hidden;
        .b-events-page__cards-event-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow-y: scroll;
          height: 100%;
        }
      }
    }
  }
}
</style>
