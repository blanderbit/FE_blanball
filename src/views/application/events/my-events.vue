<template>
  <div class="b-events-page">
    <ContextMenu
      v-if="isContextMenuActive"
      :client-x="contextMenuX"
      :client-y="contextMenuY"
      :menu-text="mockData.menu_text"
      @close-modal="isContextMenuActive = false"
    />
    <div class="b-events-page__main-body" ref="mainEventsBlock">
      <div class="b-events-page__header-block">
        <div class="b-events-page__left-part">
          <div class="b-events-page__title">
            {{ $t('events.my-events') }}
          </div>
          <div class="b-events-page__subtitle">
            {{ $t('events.renew-your-data') }}
          </div>
          <div class="b-events-page__event-switcher">
            <div class="b-events-page__general-events" @click="switchEvents">
              {{ $t('events.general-events') }}
            </div>
            <div class="b-events-page__my-events">
              {{ $t('events.my-events') }}
            </div>
          </div>
        </div>
        <div class="b-events-page__right-part">
          <GreenBtn
            :text="$t('buttons.create-event')"
            :width="168"
            :icon="iconPlus"
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
        <SmartGridList
          :list="paginationElements"
          ref="refList"
          :detectSizesForCards="detectSizesForCards"
          v-model:scrollbar-existing="blockScrollToTopIfExist"
        >
          <template #smartGridListItem="slotProps">
            <MyEventCard
              :key="slotProps.index"
              :card="slotProps.smartListItem"
              @card-right-click="myCardRightClick"
              @go-to-event-page="goToEventPage(slotProps.smartListItem.id)"
            />

            <!--  @update:expanding="slotProps.smartListItem.metadata.expanding = $event"-->
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
        </SmartGridList>
      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

import { v4 as uuid } from 'uuid'

import GreenBtn from '../../../components/GreenBtn.vue'
import InputComponent from '../../../components/forms/InputComponent.vue'
import ContextMenu from '../../../components/ModalWindows/ContextMenuModal.vue'
import EventCard from '../../../components/event-components/EventCard.vue'
import SmallLoader from '../../../components/SmallLoader.vue'
import SearchBlockEvents from '../../../components/SearchBlockEvents.vue'
import MyEventCard from '../../../components/MyEventCard.vue'
import RightSidebar from '../../../components/RightSidebar.vue'
import EmptyList from '../../../components/EmptyList.vue'
import FilterBlock from '../../../components/filters/FilterBlock.vue'
import SmartGridList from '../../../components/smart-list/SmartGridList.vue'
import ScrollToTop from '../../../components/ScrollToTop.vue'
import InfiniteLoading from '../../../workers/infinit-load-worker/InfiniteLoading.vue'
import EventsFilters from '../../../components/filters/block-filters/EventsFilters.vue'

import { API } from '../../../workers/api-worker/api.worker'
import { ROUTES } from '../../../router/router.const'
import { PaginationWorker } from '../../../workers/pagination-worker'
import { FilterPatch } from '../../../workers/api-worker/http/filter/filter.patch'

import CONSTANTS from '../../../consts/index'

import Plus from '../../../assets/img/plus.svg'

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    InputComponent,
    ContextMenu,
    EventCard,
    SmallLoader,
    SearchBlockEvents,
    MyEventCard,
    RightSidebar,
    EmptyList,
    SmartGridList,
    InfiniteLoading,
    ScrollToTop,
    FilterBlock,
    EventsFilters,
  },
  setup() {
    const scrollComponent = ref(null)
    const currentPage = ref(null)
    const totalPages = ref(null)
    const route = useRoute()
    const router = useRouter()
    const eventCards = ref([])
    const { t } = useI18n()
    const isLoaderActive = ref(false)
    const contextMenuX = ref(null)
    const contextMenuY = ref(null)
    const isContextMenuActive = ref(false)
    const mainEventsBlock = ref()

    const mockData = computed(() => {
      return {
        event_cards: CONSTANTS.event_page.event_cards,
        my_events: CONSTANTS.event_page.my_events,
        sport_type_dropdown: CONSTANTS.event_page.sport_type_dropdown,
        gender_dropdown: CONSTANTS.event_page.gender_dropdown,
        cities_dropdown: CONSTANTS.event_page.cities_dropdown,
        calendar: CONSTANTS.event_page.calendar,
        menu_text: CONSTANTS.event_page.menu_text,
      }
    })

    const iconPlus = computed(() => Plus)

    const emptyListMessages = computed(() => {
      return {
        title: 'Немає повідомлень для відображення',
        description: 'Вам ще не надходили сповіщення від інших користувачів',
      }
    })

    function switchEvents() {
      router.push(ROUTES.APPLICATION.EVENTS.absolute)
    }

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

    function myCardRightClick(e) {
      contextMenuX.value = e.clientX
      contextMenuY.value = e.clientY
      isContextMenuActive.value = true
    }

    function goToEventPage() {
      router.push('/application/events/3')
    }

    function goToCreateEvent() {
      router.push('/application/events/create')
    }

    const refList = ref()
    const blockScrollToTopIfExist = ref(false)
    const triggerForRestart = ref(false)

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid()
    }

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) => {
        return API.EventService.getAllMyEvents({
          ...getRawFilters(),
          page,
        })
      },
      dataTransformation: handlingIncomeData,
    })

    paginationPage.value = 1
    paginationElements.value =
      route.meta.eventData.data.results.map(handlingIncomeData)

    const { getRawFilters, updateFilter, filters, clearFilters, setFilters } =
      FilterPatch({
        router,
        filters: {
          duration: {
            type: Number,
            value: null,
          },
          dist: {
            type: Number,
            value: null,
          },
          point: {
            type: Number,
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
          restartInfiniteScroll()
          paginationClearData()
        },
      })

    const detectSizesForCards = ({
      itemWidth,
      itemCount,
      itemHeight,
      itemMinHeight,
    }) => {
      itemHeight.value = 100
      if (window.matchMedia('(min-width: 1400px)').matches) {
        itemWidth.value = mainEventsBlock.value.clientWidth / 3
        itemCount.value = 3
      } else if (
        window.matchMedia('(min-width: 1200px) and (max-width: 1400px)').matches
      ) {
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 992px) and (max-width: 1199px)').matches
      ) {
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches
      ) {
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 576px) and (max-width: 768px)').matches
      ) {
        itemWidth.value = mainEventsBlock.value.clientWidth
        itemCount.value = 1
      } else if (window.matchMedia('(max-width: 576px)').matches) {
        itemWidth.value = mainEventsBlock.value.clientWidth
        itemCount.value = 1
      }
    }

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      })
    }
    return {
      scrollComponent,
      eventCards,
      isLoaderActive,
      mockData,
      iconPlus,
      emptyListMessages,
      myCardRightClick,
      goToEventPage,
      goToCreateEvent,
      switchEvents,
      isContextMenuActive,
      refList,
      blockScrollToTopIfExist,
      triggerForRestart,
      paginationElements,
      paginationPage,
      paginationLoad,
      loadDataPaginationData,
      detectSizesForCards,
      mainEventsBlock,
      clearFilters,
      setFilters,
      filters,
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
    /*height: 90vh;*/
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
            border-top: 1px solid #f0f0f4;
            border-left: 1px solid #f0f0f4;
            border-bottom: 1px solid #f0f0f4;
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
            border: 1px solid #148581;
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
      .b-events-page__my-events-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 23px;
      }
    }
  }
}
</style>
