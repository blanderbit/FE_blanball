<template>
  <ContextMenu
    v-if="isContextMenuActive"
    :clientX="contextMenuX"
    :clientY="contextMenuY"
    :modalItems="mockData.menu_text"
    backgroundColor="transperent"
    @close-modal="isContextMenuActive = false"
    @itemClick="contextMenuItemClick"
  />

  <SubmitModal
    v-if="isSubmitModalOpened"
    :config="submitModalConfig"
    @closeModal="closeSubmitModal"
    @declineChanges="cancelChangesAndGoToTheNextRoute"
    @deleteEvents="deleteEvents"
  />
  <EditEventModal
    v-if="isEventUpdateModalOpened"
    :eventDataValue="updateEventData"
    @closeEventUpdateModal="closeEventUpdateModal"
  />
  <ActionEventModal
    v-if="isActionEventModalOpened"
    :modalData="actionEventModalConfig"
    @closeModal="closeEventActiondModal"
  />
  <div class="b-events-page">
    <div
      @click="goToCreateEvent"
      class="b-events-page-create-event-mobile-button"
    >
      <img src="../../../assets/img/plus.svg" alt="" />
    </div>
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
            <div
              class="b-events-page__general-events-mobile"
              @click="switchEvents"
            >
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
            :height="32"
            @click-function="goToCreateEvent"
          />
        </div>
      </div>

      <div class="b-events-page__main-search-block">
        <events-filters
          v-if="!selected.length"
          :modelValue="filters"
          :elementsCount="paginationTotalCount"
          @update:value="setFilters"
          @clearFilters="clearFilters"
          @updatedActiveFilters="recalculateHeightAfterUpdateFiltersActive"
        >
          <template #tabs>
            <div class="b-events-page__tabs">
              <div
                v-for="tab in tabs"
                :class="[
                  'b-events-page__tab',
                  { selected: tab.id === selectedTabId },
                ]"
                @click="changeTab(tab.id)"
              >
                <img :src="tab.img" alt="" />
                {{ tab.text }}
              </div>
            </div>
          </template>
        </events-filters>
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
                @click-function="showSubmitModal('deleteEvents')"
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
        <div
          class="b-events-page__all-events-block"
          :style="`height: ${myEventsBlockHeight}`"
        >
          <smartGridList
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
                @card-right-click="
                  myCardRightClick($event, slotProps.smartListItem)
                "
                @go-to-event-page="goToEventPage(slotProps.smartListItem.id)"
                @card-left-click="myCardLeftClick"
              />
            </template>
            <template #after>
              <InfiniteLoading
                ref="scrollbar"
                :identifier="triggerForRestart"
                @infinite="loadDataPaginationData(paginationPage + 1, $event)"
              >
                <template #complete>
                  <emptyList
                    v-if="!paginationElements.length"
                    :title="emptyListMessages.title"
                    :description="emptyListMessages.description"
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
import { ref, computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

import { v4 as uuid } from 'uuid';

import GreenBtn from '../../../components/shared/button/GreenBtn.vue';
import MainInput from '../../../components/shared/input/MainInput.vue';
import ContextMenu from '../../../components/shared/modals/ContextModal.vue';
import EventCard from '../../../components/main/events/EventCard.vue';
import MyEventCard from '../../../components/main/events/MyEventCard.vue';
import rightSidebar from '../../../components/main/rightSidebar/RightSidebar.vue';
import emptyList from '../../../components/shared/emptyList/EmptyList.vue';
import FilterBlock from '../../../components/filters/FilterBlock.vue';
import smartGridList from '../../../components/shared/smartList/SmartGridList.vue';
import ScrollToTop from '../../../components/ScrollToTop.vue';
import InfiniteLoading from '../../../components/main/infiniteLoading/InfiniteLoading.vue';
import EventsFilters from '../../../components/filters/block-filters/EventsFilters.vue';
import WhiteBtn from '../../../components/shared/button/WhiteBtn.vue';
import DeleteEventsModal from '../../../components/main/events/modals/DeleteEventsModal.vue';
import EditEventModal from '../../../components/main/manageEvent/modals/EditEventModal.vue';
import ActionEventModal from '../../../components/main/events/modals/ActionEventModal.vue';
import SubmitModal from '../../../components/shared/modals/SubmitModal.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { ROUTES } from '../../../router/router.const';
import { PaginationWorker } from '../../../workers/pagination-worker';
import { FilterPatch } from '../../../workers/api-worker/http/filter/filter.patch';
import { addMinutes } from '../../../utils/addMinutes';
import { getDate } from '../../../utils/getDate';
import { getTime } from '../../../utils/getTime';
import { prepareEventUpdateData } from '../../../utils/prepareEventUpdateData';
import { calcHeight } from '../../../utils/calcHeight';
import { useUserDataStore } from '../../../stores/userData';
import {
  startSpinner,
  finishSpinner,
} from '../../../workers/loading-worker/loading.worker';

import { CONSTS } from '../../../consts/index';

import Plus from '../../../assets/img/plus.svg';
import WhiteBucket from '../../../assets/img/white-bucket.svg';
import PinIcon from '../../../assets/img/pin.svg';
import NoEditPermIcon from '../../../assets/img/no-edit-perm-modal-icon.svg';
import CalendarIcon from '../../../assets/img/calendar.svg';
import WatchIcon from '../../../assets/img/watch-gray.svg';

const TABS_ENUM = {
  TOPICAL: 1,
  FINISHED: 2,
};

const MAX_PINNED_EVENTS_COUNT = 5;

const SubmitModalTypes = {
  CANCEL_CHANGES: 'cancelChanges',
  DELETE_EVENTS: 'deleteEvents',
  DELETE_EVENT: 'deleteEvent',
};

const CONTEXT_MENU_TYPES = {
  SELECT: 'select',
  DELETE: 'delete',
  PIN: 'pin',
  UNPIN: 'unpin',
  EDIT: 'edit',
};

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    MainInput,
    ContextMenu,
    EventCard,
    MyEventCard,
    rightSidebar,
    emptyList,
    smartGridList,
    EditEventModal,
    InfiniteLoading,
    ScrollToTop,
    FilterBlock,
    EventsFilters,
    WhiteBtn,
    ActionEventModal,
    DeleteEventsModal,
    SubmitModal,
  },
  setup() {
    const scrollComponent = ref(null);
    const route = useRoute();
    const toast = useToast();
    const router = useRouter();
    const eventCards = ref([]);
    const selected = ref([]);
    const { t } = useI18n();
    const isLoaderActive = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const isContextMenuActive = ref(false);
    const mainEventsBlock = ref();
    const selectedContextMenuEvent = ref();
    const oneEventToDeleteId = ref(null);
    const oneEventToPinId = ref(null);
    const oneEventToUnPinId = ref(null);
    const isEventUpdateModalOpened = ref(false);
    const updateEventData = ref({});
    const refList = ref();
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref('');
    const selectedTabId = ref(route.meta.tabId);
    const isActionEventModalOpened = ref(false);
    const isSubmitModalOpened = ref(false);
    const nextRoutePath = ref('');
    const actionEventModalData = ref({});
    const submitModalData = ref({});
    const userStore = useUserDataStore();

    const actionEventModalConfig = computed({
      get() {
        return actionEventModalData.value;
      },
      set() {},
    });

    const tabs = computed(() => [
      {
        id: 1,
        text: 'Актуальні',
        img: CalendarIcon,
      },
      {
        id: 2,
        text: 'Завершені',
        img: WatchIcon,
      },
    ]);

    const submitModalConfig = computed({
      get() {
        return submitModalData.value;
      },
      set() {},
    });

    const allEventsBlockHeightConfig = ref({
      default: [90, 65, 115, 60],
      mobile: [userStore.user.is_verified ? 0 : 40, -20],
      tablet: [userStore.user.is_verified ? 0 : 40],
      recalculateOnVerifyEmail: true,
    });
    const { calculatedHeight, minusHeight, plusHeight } = calcHeight(
      ...Object.values(allEventsBlockHeightConfig.value)
    );

    const myEventsBlockHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    const iconPlus = computed(() => Plus);

    const emptyListMessages = computed(() => {
      if (selectedTabId.value === TABS_ENUM.TOPICAL) {
        return {
          title: t('no_records.noMyTopicalEvents.title'),
          description: t('no_records.noMyTopicalEvents.description'),
          button_text: t('no_records.noMyTopicalEvents.button_text'),
        };
      } else {
        return {
          title: t('no_records.noMyFinishedEvents.title'),
          description: t('no_records.noMyFinishedEvents.description'),
          button_text: t('no_records.noMyFinishedEvents.button_text'),
        };
      }
    });

    const mockData = computed(() => {
      return {
        event_cards: CONSTS.event_page.event_cards,
        my_events: CONSTS.event_page.my_events,
        sport_type_dropdown: CONSTS.event_page.sport_type_dropdown,
        gender_dropdown: CONSTS.event_page.gender_dropdown,
        calendar: CONSTS.event_page.calendar,
        menu_text: CONSTS.event_page.menu_text(
          selectedContextMenuEvent.value.pinned
        ),
      };
    });

    const closeEventUpdateModal = () => {
      isEventUpdateModalOpened.value = false;
    };
    const showEventActiondModal = (modalData) => {
      actionEventModalConfig.value = modalData;
      isActionEventModalOpened.value = true;
    };
    const closeEventActiondModal = () => {
      isActionEventModalOpened.value = false;
    };
    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
    };

    const showSubmitModal = (modalType) => {
      isSubmitModalOpened.value = true;

      switch (modalType) {
        case SubmitModalTypes.CANCEL_CHANGES:
          submitModalData.value = {
            title: 'Вийти без збереження змін',
            description:
              'Ви дійсно хочете вийти, скасувавши всі внесені зміни?',
            button_1: 'Ні, не виходити',
            button_2: 'Так, вийти',
            right_btn_action: 'declineChanges',
            left_btn_action: 'closeModal',
            btn_with_1: 124,
            btn_with_2: 90,
          };
        case SubmitModalTypes.DELETE_EVENTS:
          submitModalData.value = {
            title: t('modals.delete_events.title'),
            description: t('modals.delete_events.main-text', {
              length: selected.value.length,
            }),
            button_1: t('modals.delete_events.button-1-text'),
            button_2: t('modals.delete_events.button-2-text'),
            right_btn_action: 'deleteEvents',
            left_btn_action: 'closeModal',
            btn_with_1: 132,
            btn_with_2: 132,
          };
      }
    };

    const contextMenuItemClick = async (itemType) => {
      switch (itemType) {
        case CONTEXT_MENU_TYPES.SELECT:
          if (
            selected.value.indexOf(selectedContextMenuEvent.value.id) === -1
          ) {
            selected.value.push(selectedContextMenuEvent.value.id);
          }
          break;
        case CONTEXT_MENU_TYPES.DELETE:
          oneEventToDeleteId.value = selectedContextMenuEvent.value.id;
          deleteEvents();
          break;
        case CONTEXT_MENU_TYPES.PIN:
          oneEventToPinId.value = selectedContextMenuEvent.value.id;
          pinEvents();
          break;
        case CONTEXT_MENU_TYPES.UNPIN:
          oneEventToUnPinId.value = selectedContextMenuEvent.value.id;
          unPinEvents();
          break;
        case CONTEXT_MENU_TYPES.EDIT:
          editEventsItemClick();
          break;
      }
    };

    function recalculateHeightAfterUpdateFiltersActive(status) {
      if (status) {
        minusHeight(45);
      } else {
        plusHeight(45);
      }
    }

    function switchEvents() {
      router.push(ROUTES.APPLICATION.EVENTS.absolute);
    }

    function handlingIncomeData(item) {
      return {
        ...item,
        date: getDate(item.date_and_time),
        time: getTime(item.date_and_time),
        end_time: addMinutes(getTime(item.date_and_time), item.duration),
      };
    }

    async function editEventsItemClick() {
      if (selectedContextMenuEvent.value.status === 'Planned') {
        let data = await prepareEventUpdateData(
          selectedContextMenuEvent.value.id
        );
        updateEventData.value = data;
        isEventUpdateModalOpened.value = true;
      } else {
        showEventActiondModal(
          (actionEventModalData.value = {
            title: t('modals.no_perm_to_edit.title'),
            description: t('modals.no_perm_to_edit.main-text'),
            image: NoEditPermIcon,
          })
        );
      }
    }

    async function unPinEvents() {
      startSpinner();
      let eventsIDSToUnPin = oneEventToUnPinId.value
        ? [oneEventToUnPinId.value]
        : selected.value;
      await API.EventService.unPinEvents(eventsIDSToUnPin);
      if (!oneEventToUnPinId.value) {
        selected.value = [];
      } else {
        selected.value = selected.value.filter(
          (value) => !eventsIDSToUnPin.includes(value)
        );
        oneEventToUnPinId.value = null;
      }
      loadDataPaginationData(1, null, true, false);
      finishSpinner();
      toast.success(t('notifications.events-unpinned'));
    }

    async function getCountPinnedEvents() {
      const response = await API.EventService.getCountPinnedEvents();
      return response.data.count;
    }

    async function pinEvents() {
      if ((await getCountPinnedEvents()) === MAX_PINNED_EVENTS_COUNT) {
        showEventActiondModal(
          (actionEventModalData.value = {
            title: t('modals.no_perm_to_pin.title'),
            description: t('modals.no_perm_to_pin.main-text'),
            image: NoEditPermIcon,
          })
        );
      } else {
        startSpinner();
        let eventsIDSToPin = oneEventToPinId.value
          ? [oneEventToPinId.value]
          : selected.value;
        await API.EventService.pinEvents(eventsIDSToPin);
        if (!oneEventToPinId.value) {
          selected.value = [];
        } else {
          selected.value = selected.value.filter(
            (value) => !eventsIDSToPin.includes(value)
          );
          oneEventToPinId.value = null;
        }
        loadDataPaginationData(1, null, true, false);
        finishSpinner();
        toast.success(t('notifications.events-pinned'));
      }
    }

    async function deleteEvents() {
      closeSubmitModal();
      startSpinner();
      let eventsIDSToDelete = oneEventToDeleteId.value
        ? [oneEventToDeleteId.value]
        : selected.value;
      await API.EventService.deleteEvents(eventsIDSToDelete);
      if (!oneEventToDeleteId.value) {
        selected.value = [];
      } else {
        selected.value = selected.value.filter(
          (value) => !eventsIDSToDelete.includes(value)
        );
        oneEventToDeleteId.value = null;
      }
      paginationElements.value = paginationElements.value.filter(
        (event) => !eventsIDSToDelete.includes(event.id)
      );
      finishSpinner();
      toast.success(t('notifications.events-deleted'));
    }

    function myCardRightClick(e, event) {
      contextMenuX.value = e.clientX;
      contextMenuY.value = e.clientY;
      selectedContextMenuEvent.value = event;
      isContextMenuActive.value = true;
    }

    function myCardLeftClick(eventId) {
      if (selected.value.length) {
        if (selected.value.includes(eventId)) {
          let index = selected.value.indexOf(eventId);
          index !== -1 ? selected.value.splice(index, 1) : null;
        } else {
          selected.value.push(eventId);
        }
      } else {
        goToEventPage(eventId);
      }
    }

    function goToEventPage(id) {
      router.push(ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(id));
    }
    function goToCreateEvent() {
      router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute);
    }
    async function changeTab(tabId) {
      if (tabId !== selectedTabId.value) {
        startSpinner();
        selectedTabId.value = tabId;

        switch (selectedTabId.value) {
          case TABS_ENUM.TOPICAL:
            await router.push(ROUTES.APPLICATION.MY_EVENTS.TOPICAL.absolute);
            break;
          case TABS_ENUM.FINISHED:
            await router.push(ROUTES.APPLICATION.MY_EVENTS.FINISHED.absolute);
            break;
        }
        clearFilters();
        paginationPage.value = 1;
        paginationTotalCount.value = route.meta.eventData.data.total_count;
        paginationElements.value =
          route.meta.eventData.data.results.map(handlingIncomeData);
        restartInfiniteScroll();
        finishSpinner();
      }
    }

    function declineSelect() {
      selected.value = [];
    }

    function restartInfiniteScroll() {
      triggerForRestart.value = uuid();
    }

    function cancelChangesAndGoToTheNextRoute() {
      router.push(nextRoutePath.value);
      nextRoutePath.value = '';
    }

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) => {
        if (selectedTabId.value === TABS_ENUM.TOPICAL) {
          return API.EventService.getMyTopicalEvents({
            ...getRawFilters(),
            page,
          });
        } else {
          return API.EventService.getMyFinishedEvents({
            ...getRawFilters(),
            page,
          });
        }
      },
      dataTransformation: handlingIncomeData,
    });

    paginationPage.value = 1;
    paginationTotalCount.value = route.meta.eventData.data.total_count;
    paginationElements.value =
      route.meta.eventData.data.results.map(handlingIncomeData);
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
        itemHeight.value = 125;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 1200px) and (max-width: 1400px)').matches
      ) {
        itemHeight.value = 160;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 992px) and (max-width: 1199px)').matches
      ) {
        itemHeight.value = 160;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches
      ) {
        itemHeight.value = 160;
        itemWidth.value = mainEventsBlock.value.clientWidth / 2;
        itemCount.value = 2;
      } else if (
        window.matchMedia('(min-width: 576px) and (max-width: 768px)').matches
      ) {
        itemHeight.value = 125;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      } else if (
        window.matchMedia('(min-width: 485px) and (max-width: 576px)').matches
      ) {
        itemHeight.value = 125;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      } else if (window.matchMedia('(max-width: 485px)').matches) {
        itemHeight.value = 155;
        itemWidth.value = mainEventsBlock.value.clientWidth;
        itemCount.value = 1;
      }
    };

    async function loadDataPaginationData(
      pageNumber,
      $state,
      forceUpdate,
      isLoading
    ) {
      if (isLoading) {
        startSpinner();
      }
      if (forceUpdate) {
        paginationClearData();
      }

      await paginationLoad({
        pageNumber,
        $state,
        forceUpdate,
      }).then(() => {
        if (isLoading) {
          finishSpinner();
        }
      });
    }

    onBeforeRouteLeave((to, from, next) => {
      nextRoutePath.value = to.fullPath;
      if (
        selected.value.length &&
        !isSubmitModalOpened.value &&
        !to.meta.noGuards
      ) {
        showSubmitModal('cancelChanges');
      } else {
        next();
      }
    });

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
      myEventsBlockHeight,
      actionEventModalConfig,
      isEventUpdateModalOpened,
      paginationTotalCount,
      selected,
      updateEventData,
      isActionEventModalOpened,
      selectedContextMenuEvent,
      emptyListMessages,
      isContextMenuActive,
      refList,
      blockScrollToTopIfExist,
      triggerForRestart,
      paginationElements,
      paginationPage,
      selectedTabId,
      mainEventsBlock,
      tabs,
      filters,
      isSubmitModalOpened,
      submitModalConfig,
      changeTab,
      paginationLoad,
      loadDataPaginationData,
      detectSizesForCards,
      clearFilters,
      myCardRightClick,
      deleteEvents,
      cancelChangesAndGoToTheNextRoute,
      closeSubmitModal,
      showSubmitModal,
      closeEventUpdateModal,
      recalculateHeightAfterUpdateFiltersActive,
      pinEvents,
      contextMenuItemClick,
      closeEventActiondModal,
      declineSelect,
      goToEventPage,
      myCardLeftClick,
      switchEvents,
      goToCreateEvent,
      setFilters,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
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
  position: relative;
  height: fit-content;

  @media (max-width: 992px) {
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
    bottom: calc(15% + 20px);

    @media (max-width: 992px) {
      display: flex;
    }
  }

  .b-events-page__main-body {
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
          border: 1px solid $color-f0f0f4;
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
            background: $color-f0f0f4;
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
          border: 1px solid $color-dfdeed !important;
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

      .b-events-page__tabs {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        gap: 32px;
        border-bottom: 1px solid $color-f0f0f4;

        .b-events-page__tab {
          @include inter(13px, 400, $--b-main-gray-color);
          line-height: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0px 4px 8px 0px;
          cursor: pointer;

          &.selected {
            @include inter(13px, 500);
            line-height: 20px;
            border-bottom: 2px solid $--b-main-black-color;
          }
        }
      }

      .b-events-page__all-events-block {
        position: relative;
        margin-top: 15px;
        height: 76vh;
        overflow: scroll;
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
