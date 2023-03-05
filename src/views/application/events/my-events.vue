<template>
  <div class="b-events-page">
    <Loading :is-loading="loading"/>
    <DeleteEventsModal
      v-if="isDeleteEventsModalActive"
      @closeModal="closeDeleteEventsModal"
      @deleteEvents="deleteEvents"/>
    <ContextMenu
      class="b-context-menu"
      v-if="isContextMenuActive"
      :clientX="contextMenuX"
      :clientY="contextMenuY"
      :menu-text="mockData.menu_text"
      @close-modal="isContextMenuActive = false"
      @itemClick="contextMenuItemClick"
    />
    <div class="b-events-page__main-body" ref="mainEventsBlock">
      <div class="b-events-page__header-block">
        <div class="b-events-page__left-part">
          <div class="b-events-page__title">
            {{ $t('events.my-events') }}
          </div>
          <div class="b-events-page__event-switcher">
            <div class="b-events-page__general-events" @click="switchEvents">
              {{ $t('events.general-events') }}
            </div>
            <div class="b-events-page__my-events">
              {{ $t('events.my-events') }}
            </div>
          </div>
          <div class="b-events-page__event-switcher-mobile">
            <div class="b-events-page__general-events-mobile"  @click="switchEvents">
              {{ $t('events.general-events') }}
            </div>
            <div class="b-events-page__my-events-mobile">
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
          v-if="!selected.length"
          :modelValue="filters"
          @update:value="setFilters"
          @clearFilters="clearFilters"
        ></events-filters>


      <FilterBlock v-if="selected.length">
        <div class="b-events-page__after-select-block">
        <div class="b-left__side">
          <WhiteBtn
            class="b-left__side-cancel-button"
            :text="$t('buttons.pin')"
            :width="127"
            :icon="PinIcon"
            :height="32"
            @click-function="pinEvents"
          />
          <GreenBtn
            :text="$t('buttons.delete')"
            :width="127"
            :icon="WhiteBucket"
            :height="32"
            @click-function="openDeleteEventsModal"
          />
          <div v-if="selected.length" class="b-left__side-count-selected">
            {{ selected.length }}
          </div>
        </div>
        <div class="b-right__side">
          <div @click="declineSelect" class="b-right__side-cancel">
            {{ $t('buttons.decline') }}
          </div>
        </div>
      </div>
      </FilterBlock>
        <div class="b-events-page__all-events-block">
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
              :selected="selected"
              @card-right-click="myCardRightClick($event, slotProps.smartListItem)"
              @go-to-event-page="goToEventPage(slotProps.smartListItem.id)"
              @card-left-click="myCardLeftClick"
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
                  :buttonText="emptyListMessages.button_text"
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
    <RightSidebar />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

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
import WhiteBtn from '../../../components/WhiteBtn.vue'
import DeleteEventsModal from '../../../components/ModalWindows/DeleteEventsModal.vue'
import Loading from '../../../workers/loading-worker/Loading.vue'

import { API } from '../../../workers/api-worker/api.worker'
import { ROUTES } from '../../../router/router.const'
import { PaginationWorker } from '../../../workers/pagination-worker'
import { FilterPatch } from '../../../workers/api-worker/http/filter/filter.patch'
import { addMinutes } from '../../../utils/addMinutes'
import { getDate } from '../../../utils/getDate'
import { getTime } from '../../../utils/getTime'

import CONSTANTS from '../../../consts/index'

import Plus from '../../../assets/img/plus.svg'
import WhiteBucket from '../../../assets/img/white-bucket.svg'
import PinIcon from '../../../assets/img/pin.svg'


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
    WhiteBtn,
    Loading,
    DeleteEventsModal,
  },
  setup() {
    const scrollComponent = ref(null)
    const route = useRoute()
    const toast = useToast()
    const router = useRouter()
    const eventCards = ref([])
    const loading = ref(false)
    const selected = ref([])
    const { t } = useI18n()
    const isLoaderActive = ref(false)
    const contextMenuX = ref(null)
    const contextMenuY = ref(null)
    const isContextMenuActive = ref(false)
    const isDeleteEventsModalActive = ref(false)
    const mainEventsBlock = ref()
    const selectedContextMenuEvent = ref()
    const oneEventToDeleteId = ref(null)
    const oneEventToPinId = ref(null)
    const oneEventToUnPinId = ref(null)

    const mockData = computed(() => {
      return {
        event_cards: CONSTANTS.event_page.event_cards,
        my_events: CONSTANTS.event_page.my_events,
        sport_type_dropdown: CONSTANTS.event_page.sport_type_dropdown,
        gender_dropdown: CONSTANTS.event_page.gender_dropdown,
        calendar: CONSTANTS.event_page.calendar,
        menu_text: CONSTANTS.event_page.menu_text(selectedContextMenuEvent.value.pinned),
      }
    })

    const iconPlus = computed(() => Plus)

    const emptyListMessages = computed(() => {
      return {
        title: t('no_records.noMyEvents.title'),
        description: t('no_records.noMyEvents.description'),
        button_text: t('no_records.noMyEvents.button_text'),
      }
    })

    const contextMenuItemClick = (itemType) => {
      switch(itemType) {
        case 'select':
          if (selected.value.indexOf(selectedContextMenuEvent.value.id) === -1) {
            selected.value.push(selectedContextMenuEvent.value.id)
          }
          break
        case 'delete':
          oneEventToDeleteId.value = selectedContextMenuEvent.value.id
          openDeleteEventsModal()
          break
        case 'pin':
          oneEventToPinId.value = selectedContextMenuEvent.value.id
          pinEvents()
          break
        case 'unpin':
          oneEventToUnPinId.value = selectedContextMenuEvent.value.id
          unPinEvents()
          break
      }
    }

    function switchEvents() {
      router.push(ROUTES.APPLICATION.EVENTS.absolute)
    }

  
    function handlingIncomeData(item) {
      return {
        ...item,
        date: getDate(item.date_and_time),
        time: getTime(item.date_and_time),
        end_time: addMinutes(getTime(item.date_and_time), item.duration),
      }
    }

    function openDeleteEventsModal() {
      isDeleteEventsModalActive.value = true
    }

    function closeDeleteEventsModal() {
      isDeleteEventsModalActive.value = false
    }

    async function unPinEvents() {
      loading.value = true
      await API.EventService.unPinEvents([oneEventToUnPinId.value])
      selected.value = selected.value.filter((value) => ![oneEventToUnPinId.value].includes(value));
      oneEventToUnPinId.value = null
      let response = await API.EventService.getAllMyEvents()
      paginationElements.value = response.data.results.map(handlingIncomeData)
      loading.value = false
      toast.success(t('notifications.event-unpinned'))
    }

    async function pinEvents() {
      loading.value = true
      let eventsIDSToPin = oneEventToPinId.value 
        ? [oneEventToPinId.value]
        : selected.value
      await API.EventService.pinEvents(eventsIDSToPin)
      if (!oneEventToPinId.value) {
        selected.value = []
      } else {
        selected.value = selected.value.filter((value) => !eventsIDSToPin.includes(value));
        oneEventToPinId.value = null
      }
      let response = await API.EventService.getAllMyEvents()
      paginationElements.value = response.data.results.map(handlingIncomeData)
      loading.value = false
      toast.success(t('notifications.events-pinned'))
    }

    async function deleteEvents() {
      closeDeleteEventsModal()
      loading.value = true
      let eventsIDSToDelete = oneEventToDeleteId.value 
        ? [oneEventToDeleteId.value]
        : selected.value
      await API.EventService.deleteEvents(eventsIDSToDelete)
      if (!oneEventToDeleteId.value) {
        selected.value = []
      } else {
        selected.value = selected.value.filter((value) => !eventsIDSToDelete.includes(value));
        oneEventToDeleteId.value = null
      }
      let response = await API.EventService.getAllMyEvents()
      paginationElements.value = response.data.results.map(handlingIncomeData)
      loading.value = false
      toast.success(t('notifications.events-deleted'))
    }

    function myCardRightClick(e, event) {
      contextMenuX.value = e.clientX
      contextMenuY.value = e.clientY
      selectedContextMenuEvent.value = event
      isContextMenuActive.value = true
    }


    function myCardLeftClick(eventId) {
      if (selected.value.length) {
        if (selected.value.includes(eventId)) {
          let index = selected.value.indexOf(eventId);
          index !== -1 ? selected.value.splice(index, 1) : null
        } else {
          selected.value.push(eventId)
        }
      } else {
        goToEventPage(eventId)
      }
    }
  
    function goToEventPage(id) {
      router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(id))
    }
    function goToCreateEvent() {
      router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute)
    }

    function declineSelect() {
      selected.value = []
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
      if (window.matchMedia('(min-width: 1400px)').matches) {
        itemHeight.value = 125
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 1200px) and (max-width: 1400px)').matches
      ) {
        itemHeight.value = 160
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 992px) and (max-width: 1199px)').matches
      ) {
        itemHeight.value = 160
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches
      ) {
        itemHeight.value = 160
        itemWidth.value = mainEventsBlock.value.clientWidth / 2
        itemCount.value = 2
      } else if (
        window.matchMedia('(min-width: 576px) and (max-width: 768px)').matches
      ) {
        itemHeight.value = 125
        itemWidth.value = mainEventsBlock.value.clientWidth
        itemCount.value = 1
      } else if (window.matchMedia('(min-width: 485px) and (max-width: 576px)').matches) {
        itemHeight.value = 125
        itemWidth.value = mainEventsBlock.value.clientWidth
        itemCount.value = 1
      }
      else if (window.matchMedia('(max-width: 485px)').matches) {
        itemHeight.value = 155
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
      WhiteBucket,
      contextMenuX,
      contextMenuY,
      PinIcon,
      loading,
      selected,
      emptyListMessages,
      myCardRightClick,
      deleteEvents,
      pinEvents,
      contextMenuItemClick,
      declineSelect,
      goToEventPage,
      myCardLeftClick,
      openDeleteEventsModal,
      closeDeleteEventsModal,
      switchEvents,
      goToCreateEvent,
      isContextMenuActive,
      refList,
      isDeleteEventsModalActive,
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

// SCSS variables for hex colors
 $color-f0f0f4: #f0f0f4;
 $color-148581: #148581;
 $color-dfdeed: #dfdeed;


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
          color: $--b-main-black-color;
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
            border-top: 1px solid $color-f0f0f4;
            border-left: 1px solid $color-f0f0f4;
            border-bottom: 1px solid $color-f0f0f4;
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
            border: 1px solid $color-148581;
            cursor: pointer;
          }
        }
        .b-events-page__event-switcher-mobile {
          display: none;
          align-items: center;
          justify-content: space-between;
          width: 344px;
          border: 1px solid #F0F0F4;
          border-radius: 6px;
          height: 36px;
          padding: 4px;
          margin-top: 16px;

          @media (max-width: 992px) {
            display: flex;
          }
          .b-events-page__my-events-mobile {
            flex: 50%;
            cursor: pointer;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            color: $--b-main-black-color;
            background: #F0F0F4;
            border-radius: 4px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .b-events-page__general-events-mobile {
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
        @media (max-width: 992px) {
          display: none;
        }
        a {
          text-decoration: none;
        }
      }
    }
    .b-events-page__after-select-block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .b-left__side {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;

          .b-left__side-cancel-button {
            border: 1px solid #DFDEED !important;
            color: $--b-main-gray-color !important;
          }

          .b-left__side-count-selected {
            position: absolute;
            right: -10px;
            top: -10px;
            background: $--b-main-white-color;
            border: 2px solid $--b-main-green-color;
            border-radius: 100px;
            width: 28px;
            height: 24px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: $--b-main-black-color;
          }
        }

        .b-right__side {
          z-index: 2;
          .b-right__side-cancel {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            color: $--b-main-gray-color;
            cursor: pointer;
          }
        }
      }
    .b-events-page__main-search-block {
      margin-top: 36px;
      margin-bottom: 20px;
      position: relative;
      @media (max-width: 992px) {
        padding: 0;
      }
      .b-events-page__all-events-block {
        position: relative;
        margin-top: 23px;
        height: 76vh;
        overflow: scroll;
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
          scrollbar-width: none; /* for Firefox */
          &::-webkit-scrollbar {
            display: none; /* for Chrome, Safari, and Opera */
        }
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
