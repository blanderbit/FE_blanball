<template>
  <SubmitModal
    v-if="isSubmitModalOpened"
    :config="submitModalConfig"
    @closeModal="closeSubmitModal"
    @deleteEvent="deleteEvent"
    @leaveFromTheEvent=""
    @continue="closeSubmitModal"
  />

  <div v-if="userData" class="c-scheduled-events__block">
    <div v-if="userStore.user.id !== userData.id" class="c-selected-view-user">
      <span class="c-user-full-name"
        >{{ userData.profile.last_name }} {{ userData.profile.name }}</span
      >
      <img
        src="@images/cross.svg"
        alt=""
        @click="$emit('deactivateSelectedUser')"
      />
    </div>
    <div class="c-total-count-scheduled-events">
      <div class="c-selected-date">
        {{ formatedDate }}
      </div>
      <div class="c-count-scheduled">
        <span v-if="paginationTotalCount > 0">{{
          $t('scheduler.planned-count', { count: paginationTotalCount })
        }}</span>
        <span v-else>{{ $t('scheduler.not-planned') }}</span>
      </div>
    </div>
    <div class="c-scheduled-events__list">
      <SmartList
        :list="paginationElements"
        ref="refList"
        v-model:scrollbar-existing="blockScrollToTopIfExist"
      >
        <template #smartListItem="slotProps">
          <ScheduledEventCard
            :key="slotProps.index"
            :eventData="slotProps.smartListItem"
            :openedEventId="openedEventId"
            @declineEvent="declineEvent"
            @openCloseEvent="openCloseEvent"
          />
        </template>
        <template #after>
          <InfiniteLoading
            :identifier="triggerForRestart"
            ref="scrollbar"
            @infinite="loadDataPaginationData(paginationPage + 1, $event)"
          >
            <template #complete>
              <NoScheduledEvents
                v-if="!paginationElements.length"
                :userData="userData"
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

  <NotSelectedFriendCard v-else />
</template>

<script>
import { v4 as uuid } from 'uuid';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import uk from 'dayjs/locale/uk';

import NoScheduledEvents from './NoScheduledEvents.vue';
import SubmitModal from '@sharedComponents/modals/SubmitModal.vue';
import NotSelectedFriendCard from './NotSelectedFriendCard.vue';
import SmartList from '@sharedComponents/smartList/SmartList.vue';
import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import ScrollToTop from '@sharedComponents/scrollToTop/ScrollToTop.vue';
import ScheduledEventCard from './ScheduledEventCard.vue';

import { PaginationWorker } from '@workers/pagination-worker';
import { getDate } from '@utils/getDate';
import { getTime } from '@utils/getTime';
import { addMinutes } from '@utils/addMinutes';
import { useUserDataStore } from '@stores/userData';

const REQUEST_USER_ROLES = {
  AUTHOR: 'author',
  PLAYER: 'player',
  FAN: 'fan',
};

dayjs.extend(localizedFormat).locale(uk);

export default {
  components: {
    NoScheduledEvents,
    SubmitModal,
    NotSelectedFriendCard,
    SmartList,
    InfiniteLoading,
    ScheduledEventCard,
    ScrollToTop,
  },
  props: {
    userData: {
      type: Number,
    },
    date: {
      type: String,
    },
    scheduledEventsDotsData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['deactivateSelectedUser'],
  setup(props) {
    const refList = ref();
    const isSubmitModalOpened = ref(false);
    const submitModalConfig = ref({});
    const { t } = useI18n();
    const declineEventData = ref({});
    const openedEventId = ref(0);
    const triggerForRestart = ref(false);
    const userStore = useUserDataStore();

    const blockScrollToTopIfExist = ref(false);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const formatedDate = computed(() => {
      if (props.date) {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const isToday = dayjs(props.date).isSame(currentDate, 'day');

        if (isToday) {
          return t('scheduler.today');
        } else {
          return dayjs(props.date).format('dd D MMMM');
        }
      } else {
        return t('scheduler.today');
      }
    });

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.SchedulerService.getScheduledEventsDataOnSpecificDay({
          user_id: props.userData?.id,
          date: props.date,
          page: page,
        }),
      dataTransformation: handlingIncomeData,
    });

    function loadDataPaginationData(pageNumber, $state) {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    }

    function handlingIncomeData(event) {
      return {
        ...event,
        date: getDate(event.date_and_time),
        time: getTime(event.date_and_time),
        end_time: addMinutes(getTime(event.date_and_time), event.duration),
      };
    }

    const deleteEvent = async () => {
      const response = await API.EventService.deleteEvents([
        declineEventData.value.id,
      ]);

      if (response.data.length) {
        paginationElements.value = paginationElements.value.filter(
          (el) => el.id !== declineEventData.value.id
        );
        paginationTotalCount.value -= 1;
      }
      closeSubmitModal();
    };

    const openCloseEvent = (eventId) => {
      if (openedEventId.value !== eventId) {
        openedEventId.value = eventId;
      } else {
        openedEventId.value = 0;
      }
    };

    const showSubmitModal = () => {
      isSubmitModalOpened.value = true;
    };

    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
      declineEventData.value = {};
    };

    const declineEvent = (eventData) => {
      declineEventData.value = eventData;
      if (eventData.request_user_role === REQUEST_USER_ROLES.AUTHOR) {
        submitModalConfig.value = {
          title: t('modals.delete_event.title'),
          description: t('modals.delete_event.main-text', {
            eventName: declineEventData.value.name,
          }),
          button_1: t('modals.delete_event.button-1-text'),
          button_2: t('modals.delete_event.button-2-text'),
          right_btn_action: 'deleteEvent',
          left_btn_action: 'closeModal',
          btn_with_1: 132,
          btn_with_2: 132,
        };
      } else if (
        eventData.request_user_role === REQUEST_USER_ROLES.FAN ||
        eventData.request_user_role === REQUEST_USER_ROLES.PLAYER
      ) {
        submitModalConfig.value = {
          title: t('modals.leave_from_event.title'),
          description: t('modals.leave_from_event.main-text', {
            eventName: declineEventData.value.name,
          }),
          button_1: t('modals.leave_from_event.button-1-text'),
          button_2: t('modals.leave_from_event.button-2-text'),
          right_btn_action: 'leaveFromTheEvent',
          left_btn_action: 'closeModal',
          btn_with_1: 130,
          btn_with_2: 110,
        };
      }
      showSubmitModal();
    };

    watch(
      () => props.userData,
      () => {
        paginationClearData();
        if (props.scheduledEventsDotsData[props.date]) {
          loadDataPaginationData(1, null);
          restartInfiniteScroll();
        }
      }
    );

    watch(
      () => props.date,
      () => {
        paginationClearData();
        if (props.scheduledEventsDotsData[props.date]) {
          loadDataPaginationData(1, null);
          restartInfiniteScroll();
        }
      }
    );

    return {
      paginationTotalCount,
      refList,
      paginationElements,
      isSubmitModalOpened,
      paginationPage,
      userStore,
      triggerForRestart,
      submitModalConfig,
      formatedDate,
      blockScrollToTopIfExist,
      openedEventId,
      closeSubmitModal,
      loadDataPaginationData,
      deleteEvent,
      showSubmitModal,
      openCloseEvent,
      declineEvent,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f0f0f4: #f0f0f4;
.c-selected-view-user {
  align-items: center;
  justify-content: space-between;
  display: none;
  @include allDevicesBeforeDesktop {
    display: flex;
  }
  .c-user-full-name {
    @include exo(16px, 600);
    line-height: 24px;
    margin-bottom: 4px;
  }

  img {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }
}
.c-total-count-scheduled-events {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid $color-f0f0f4;
  padding-bottom: 8px;

  .c-selected-date {
    @include inter(13px, 500, $--b-main-green-color);
    line-height: 20px;
    padding: 0px 8px 0px 0px;
    border-right: 1px solid $color-f0f0f4;
    text-transform: capitalize;
  }
  .c-count-scheduled {
    @include inter(13px, 500, $--b-main-gray-color);
    line-height: 20px;
  }
}
.c-scheduled-events__list {
  overflow-y: scroll;
  height: 100%;
}
</style>
