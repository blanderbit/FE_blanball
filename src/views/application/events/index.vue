<template>
  <div class="b-events-page">

    <div class="b-events-page__main-body" ref="mainEventsBlock">
      <div class="b-events-page__header-block">
        <div class="b-events-page__left-part">
          <div class="b-events-page__title">{{ $t('events.future-events') }}</div>
          <div class="b-events-page__subtitle">{{ $t('events.renew-your-data') }}</div>
          <div class="b-events-page__event-switcher">
            <div
                class="b-events-page__general-events"
            >
              {{ $t('events.general-events') }}
            </div>
            <div
                class="b-events-page__my-events"
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
              :icon="'../../../assets/img/plus.svg'"
              :height="40"
              @click-function="goToCreateEvent"
          />
        </div>
      </div>

      <div class="b-events-page__main-search-block">
       <events-filters
           :modelValue="filters"
           @update:value="setFilters"
           @clearFilters="clearFilters"
       ></events-filters>
        <div class="b-events-page__all-events-block">
          <SmartGridList
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
              />
            </template>
            <template #after>
              <InfiniteLoading
                  :identifier="triggerForRestart"
                  ref="scrollbar"
                  @infinite="loadDataPaginationData(paginationPage + 1, $event)">
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
          </SmartGridList>
        </div>
      </div>
    </div>

    <RightSidebar/>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import dayjs from 'dayjs'
  import dayjsUkrLocale from 'dayjs/locale/uk'
  import { useI18n } from 'vue-i18n'
  import { useEventDataStore } from '../../../stores/eventsData'

  import GreenBtn from '../../../components/GreenBtn.vue'
  import InputComponent from '../../../components/forms/InputComponent.vue'
  import ContextMenu from '../../../components/ContextMenuModal.vue'
  import EventCard from '../../../components/event-components/EventCard.vue'
  import SmallLoader from '../../../components/SmallLoader.vue'
  import SearchBlockEvents from '../../../components/SearchBlockEvents.vue'
  import MyEventCard from '../../../components/MyEventCard.vue'
  import RightSidebar from '../../../components/RightSidebar.vue'
  import EmptyList from '../../../components/EmptyList.vue'
  import SmartGridList from '../../../components/smart-list/SmartGridList.vue'
  
  import CONSTANTS from '../../../consts/index'
  import ScrollToTop from '../../../components/ScrollToTop.vue'
  import InfiniteLoading from '../../../workers/infinit-load-worker/InfiniteLoading.vue'
  import { API } from "../../../workers/api-worker/api.worker";
  import { ROUTES } from "../../../router/router.const";
  import Dropdown from '../../../components/forms/Dropdown.vue'
  import { PaginationWorker } from "../../../workers/pagination-worker";
  import { FilterPatch } from "../../../workers/api-worker/http/filter/filter.patch";
  import { v4 as uuid } from "uuid";
  import EventsFilters from '../../../components/filters/block-filters/EventsFilters.vue'
  import useTodaysDate from '../../../utils/todaysDate'
  
  export default {
    name: 'EventsPage',
    components: {
      GreenBtn,
      Dropdown,
      EmptyList,
      InputComponent,
      ContextMenu,
      EventCard,
      SmallLoader,
      SearchBlockEvents,
      MyEventCard,
      RightSidebar,
      SmartGridList,
      InfiniteLoading,
      ScrollToTop,
      EventsFilters
    },
    setup() {
      const eventStore = useEventDataStore()
      const todaysDate = useTodaysDate()
      const scrollComponent = ref(null);
      const router = useRouter();
      const eventCards = ref([]);
      const {t} = useI18n();
      const isLoaderActive = ref(false);
      const mainEventsBlock = ref();

      const mockData = computed(() => {
        return {
          event_cards: CONSTANTS.event_page.event_cards,
          sport_type_dropdown: CONSTANTS.event_page.sport_type_dropdown,
          gender_dropdown: CONSTANTS.event_page.gender_dropdown,
          cities_dropdown: CONSTANTS.event_page.cities_dropdown
        }
      })

      const emptyListMessages = computed(() => {
        return {
          title: "Немає повідомлень для відображення",
          description: "Вам ще не надходили сповіщення від інших користувачів"
        }
      });

      function getDate(date) {
        return dayjs(date).locale(dayjsUkrLocale).format('D MMMM')
      }

      function getTime(time) {
        return dayjs(time).locale(dayjsUkrLocale).format('HH:mm')
      }

      function handlingIncomeData(item) {
        return {
          ...item,
          date: getDate(item.date_and_time),
          time: getTime(item.date_and_time),
          labels: [
            item.type,
            item.gender === 'Man' ? t('events.men') : t('events.women'),
            item.need_form
              ? t('events.need-uniform')
              : t('events.do-not-need-uniform'),
          ],
        }
      }


      function goToEventPage(id) {
        router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(id))
      }

      function goToCreateEvent() {
        router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute)
      }

      function switchToMyEvents() {
        router.push(ROUTES.APPLICATION.MY_EVENTS.absolute)
      }


      const refList = ref();
      const blockScrollToTopIfExist = ref(false);
      const triggerForRestart = ref(false);

      const restartInfiniteScroll = () => {
        triggerForRestart.value = uuid()
      };

      const {
        paginationElements,
        paginationPage,
        paginationTotalCount,
        paginationLoad,
        paginationClearData
      } = PaginationWorker({
        paginationDataRequest: (page) => {
          return API.EventService.getAllEvents({
            ...getRawFilters(),
            page
          })
        },
        dataTransformation: handlingIncomeData
      });

      paginationPage.value = 1;
      paginationElements.value = router.currentRoute.value.meta.eventData.data.results.map(handlingIncomeData);
      const {
        getRawFilters,
        updateFilter,
        filters,
        clearFilters,
        setFilters
      } = FilterPatch({
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
            value: todaysDate,
            default: todaysDate
          },
          date_and_time_before: {
            type: String,
            value: todaysDate,
            default: todaysDate
          },
          ordering: {
            type: String,
            value: ''
          },
          place: {
            type: String,
            value: ''
          },
          status: {
            type: String,
            value: ''
          },
          gender: {
            type: String,
            value: ''
          },
          search: {
            type: String,
            value: ''
          },
          need_ball: {
            type: Boolean,
            value: false
          }
        },
        afterUpdateFiltersCallBack: () => {
          restartInfiniteScroll();
          paginationClearData();
        }
      });

      const detectSizesForCards = ({itemWidth, itemCount, itemHeight, itemMinHeight}) => {
        itemHeight.value = 300
        if (window.matchMedia('(min-width: 1400px)').matches) {
          itemWidth.value = mainEventsBlock.value.clientWidth / 3;
          itemCount.value = 3;
        } else if (window.matchMedia('(min-width: 1200px) and (max-width: 1400px)').matches) {
          itemWidth.value = mainEventsBlock.value.clientWidth / 2;
          itemCount.value = 2;
        } else if (window.matchMedia('(min-width: 992px) and (max-width: 1199px)').matches) {
          itemWidth.value = mainEventsBlock.value.clientWidth / 2;
          itemCount.value = 2;
        } else if (window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
          itemWidth.value = mainEventsBlock.value.clientWidth / 2;
          itemCount.value = 2;
        } else if (window.matchMedia('(min-width: 576px) and (max-width: 768px)').matches) {
          itemWidth.value = mainEventsBlock.value.clientWidth;
          itemCount.value = 1
        } else if (window.matchMedia('(max-width: 576px)').matches) {
          itemWidth.value = mainEventsBlock.value.clientWidth;
          itemCount.value = 1;
        }
      };

      const loadDataPaginationData = (pageNumber, $state) => {
        paginationLoad({pageNumber, $state, forceUpdate: paginationPage.value === 1})
      };

      return {
        emptyListMessages,
        scrollComponent,
        eventCards,
        isLoaderActive,
        switchToMyEvents,
        mainEventsBlock,
        mockData,
        filters,
        goToEventPage,
        goToCreateEvent,
        refList,
        blockScrollToTopIfExist,
        triggerForRestart,
        paginationElements,
        paginationPage,
        paginationLoad,
        loadDataPaginationData,
        detectSizesForCards,
        setFilters,
        clearFilters,
        scrollToFirstElement: () => {
          refList.value.scrollToFirstElement()
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'v-calendar/dist/style.css';

  .b-events-page {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 28px;
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
    .b-events-page__main-body {
      height: 90vh;
      -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
      &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
      }
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
            color: #262541;
            margin-bottom: 4px;
          }
          .b-events-page__subtitle {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #575775;
            @media (min-width: 992px) {
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
            color: #262541;
            display: flex;
            @media (max-width: 992px) {
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
              border: 1px solid #148581;
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
              border-top: 1px solid #F0F0F4;
              border-right: 1px solid #F0F0F4;
              border-bottom: 1px solid #F0F0F4;
              cursor: pointer;
            }
          }
        }
        .b-events-page__right-part {
          @media (max-width: 992px) {
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
        @media (max-width: 992px) {
          padding: 0;
        }
        .b-events-page__all-events-block {
          position: relative;
          margin-top: 23px;
          height: 76vh;
          overflow: hidden;
          .b-events-page__cards-event-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            overflow-y: scroll;
            height: 100%;
            -ms-overflow-style: none; /* for Internet Explorer, Edge */
            scrollbar-width: none; /* for Firefox */
            &::-webkit-scrollbar {
              display: none; /* for Chrome, Safari, and Opera */
            }
          }
        }
      }
    }
  }
</style>