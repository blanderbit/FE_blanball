<template>
  <InviteManyUsersToEventModal
    v-if="isInviteUsersModalOpened"
    :eventData="eventData"
    @closeModal="closeInviteUsersModal"
    @inviteUsers="inviteUsersToThisEvent"
  />
  <CopyModal v-if="isShareEventModalOpened" @closeModal="closeShareEventModal">
    <template #title>
      {{ $t('modals.share_event.title') }}
    </template>
    <template #header-image>
      <img src="../../../assets/img/share-arrow.svg" alt="" />
    </template>
    <template #input>
      <MainInput
        :height="40"
        :outsideTitle="true"
        :title-width="0"
        :title="$t('modals.share_event.input-text')"
        :isReadOnly="true"
        v-model="currentFullRoute"
        name="title"
      />
    </template>
    <template #button>
      <GreenBtn
        :text="$t('buttons.copy-link')"
        :height="40"
        @click-function="copyLinkButtonClick"
      />
    </template>
  </CopyModal>
  <ActionEventModal
    v-if="isActionEventModalOpened"
    :modalData="actionEventModalConfig"
    @closeModal="closeEventActiondModal"
  />
  <SubmitModal
    v-if="isSubmitModalOpened"
    :config="submitModalConfig"
    @closeModal="closeSubmitModal"
    @leaveFromTheEvent="leaveFromTheEvent"
  />
  <ContextModal
    v-if="isEventJoinModalActive"
    :clientX="eventJoinModalX"
    :clientY="eventJoinModalY"
    :modalItems="eventJoinToolTipItems"
    @closeModal="closeEventJoinModal"
    @itemClick="joinEventModalItemClick"
  />
  <div class="b-event-info">
    <div class="b-event-info__main-body">
      <div class="b-event-info__header-block">
        <div class="b-event-info__left-part">
          <div class="b-event-info__title">
            {{ eventData.name }}
          </div>
          <div class="b-event-info__subtitle">
            {{ $t('my_events.friendly-match') }}
          </div>
        </div>
        <div class="b-event-info__right-part">
          <GreenBtn
            class="b-event-info__right-part-green-btn"
            :text="greenButton.text"
            :width="greenButton.width"
            :icon="greenButton?.icon"
            :backgroundColor="greenButton?.color"
            :height="greenButton.height"
            @click-function="greenButton?.action($event)"
          />
          <div @click="openEventShareModal" class="b-event-info__share-link">
            <img src="../../../assets/img/share-icon.svg" alt="" />
            <span>
              {{ $t('my_events.share') }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="b-event-info__main-content-block"
        :style="`height: ${eventInfoMainBlockHeight}`"
      >
        <div class="b-event-info__details-block">
          <div class="b-event-info__left-side">
            <div class="b-event-info__timing">
              <img src="../../../assets/img/watch.svg" alt="" />
              {{ eventData.date }}, {{ eventData.time }} -
              {{ eventData.end_time }}
            </div>
            <div class="b-event-info__address">
              <img src="../../../assets/img/address-icon.svg" alt="" />
              <span>{{ eventData.place.place_name }}</span>
            </div>
            <div
              :class="[
                'b-event-info__price',
                { fee: eventData.price },
                { free: !eventData.price },
              ]"
              @mouseenter="eventPriceHover = true"
              @mouseleave="eventPriceHover = false"
            >
              <img
                v-if="!eventData.price"
                src="../../../assets/img/info.svg"
                alt=""
              />
              <img v-else src="../../../assets/img/green-info.svg" alt="" />
              <span
                >{{ $t('events.event-price') }}
                <span v-if="eventData.price" class="b-price">{{
                  `${eventData.price} грн`
                }}</span>
                <span class="b-price-free" v-else>{{
                  $t('events.for-free')
                }}</span>
              </span>
              <div class="b-event-info__price-tooltip-wrapper">
                <Transition>
                  <TabLabel
                    v-if="eventData.price && eventPriceHover"
                    class="b-event-info__price-tooltip"
                    :title="$t('events.price_description')"
                    :text="eventData.price_description"
                  />
                </Transition>
              </div>
            </div>

            <div class="b-event-info__main-info">
              <div class="b-event-info__labels">
                <div class="b-event-info__label">
                  {{ $t(`events.${eventData.type}`) }}
                </div>
                <div class="b-event-info__label">
                  {{ $t(`events.${eventData.gender}`) }}
                </div>
                <div v-if="eventData.need_ball" class="b-event-info__label">
                  {{ $t('hashtags.need_ball') }}
                </div>
                <div v-if="eventData.need_form" class="b-event-info__label">
                  {{ $t('hashtags.need_form') }}
                </div>
              </div>
              <EventInfoForms
                class="b-event-info__forms-block"
                v-if="Object.keys(eventData.forms).length !== 0"
                :formsData="eventData.forms"
              />

              <div class="b-event-info__description-block">
                <div class="b-event-info__title">
                  {{ $t('my_events.description-event') }}
                </div>
                <div class="b-event-info__description">
                  {{ eventData.description }}
                </div>
              </div>
            </div>
          </div>
          <div class="b-event-info__right-side">
            <div class="b-event-info__users">
              <div class="b-event-info__user">
                <div class="b-event-info__left-side">
                  <div class="b-event-info__picture">
                    <userAvatar
                      :border="true"
                      :link="eventData.author.profile.avatar_url"
                      :full-name="`${eventData.author.profile.last_name} ${eventData.author.profile.name}`"
                      @clickByAvatar="goToUserProfile(eventData.author.id)"
                    />
                  </div>
                  <div class="b-event-info__text-block">
                    <div class="b-event-info__name">
                      {{ eventData.author.profile.last_name }}
                      {{ eventData.author.profile.name }}
                    </div>
                    <div class="b-event-info__phone">
                      {{ eventData.author.phone }}
                    </div>
                  </div>
                </div>
                <div class="b-event-info__right-side">Організатор</div>
              </div>
            </div>
            <div class="b-event-info__map">
              <position-map
                class="b-event-map"
                :coords="{ lat: eventData.place.lat, lng: eventData.place.lon }"
                disable-change-coords
              >
              </position-map>
            </div>
          </div>
        </div>

        <div class="b-event-info__tables-block">
          <div class="b-event-info__tables-title">
            {{ $t('my_events.already-accepted') }}
          </div>

          <div class="b-event-info__tab-block">
            <div
              v-for="tab in mockData.tabs"
              v-show="tab.isShown"
              :key="tab.id"
              :class="[
                'b-event-info__tab-element',
                { active: activeTab === tab.id, disabled: tab.isDisabled },
              ]"
              @click="changeTab(tab.id, tab.isDisabled)"
            >
              <img :src="tab.img" :alt="tab.name" />
              <span
                @mouseenter="switchTabLabel(tab.isDisabled)"
                @mouseleave="switchTabLabel(tab.isDisabled)"
                >{{ tab.name }}</span
              >
              <Transition>
                <TabLabel
                  v-if="tab.isDisabled && isTabLabel"
                  :title="$t('profile.coming-soon-title')"
                  :text="$t('profile.coming-soon-text')"
                />
              </Transition>
            </div>
          </div>

          <div class="b-event-info__users-tables">
            <EventInfoUsersTable
              v-if="activeTab === 0"
              :data="eventData.current_users"
              :table-title-text="$t('my_events.players-list')"
              :table-color="'#148783'"
              :maxPlayersCount="eventData.amount_members"
              :emptyListData="noUsersData"
            >
              <template #user>
                <SmallUserCard
                  v-for="user of eventData.current_users"
                  :key="user.id"
                  :data-player="user"
                />
              </template>
            </EventInfoUsersTable>

            <EventInfoUsersTable
              v-if="activeTab === 1"
              :data="eventData.current_fans"
              :border="false"
              :emptyListData="noFansData"
            >
              <template #user>
                <SmallUserCard
                  v-for="user of eventData.current_fans"
                  :key="user.id"
                  :data-player="user"
                />
              </template>
            </EventInfoUsersTable>

            <ListOfEventRequestsToParticipations
              v-if="activeTab === 2"
              :requestsToParticipationsData="eventRequestsToParticipations"
              @acceptRequest="acceptRequestToParticipation"
              @declineRequest="declineRequestToParticipation"
            />
          </div>
        </div>
      </div>
    </div>
    <rightSidebar />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

import GreenBtn from '../../../components/shared/button/GreenBtn.vue';
import rightSidebar from '../../../components/main/rightSidebar/RightSidebar.vue';
import EventInfoUsersTable from '../../../components/main/events/EventInfoUsersTable.vue';
import PositionMap from '../../../components/maps/PositionMap.vue';
import CopyModal from '../../../components/shared/modals/CopyModal.vue';
import userAvatar from '../../../components/shared/userAvatar/UserAvatar.vue';
import TabLabel from '../../../components/shared/tabLabel/TabLabel.vue';
import ListOfEventRequestsToParticipations from '../../../components/ListOfEventRequestsToParticipations.vue';
import EventInfoForms from '../../../components/main/events/EventInfoForms.vue';
import ActionEventModal from '../../../components/main/events/modals/ActionEventModal.vue';
import EditEventModal from '../../../components/main/manageEvent/modals/EditEventModal.vue';
import SubmitModal from '../../../components/shared/modals/SubmitModal.vue';
import ContextModal from '../../../components/shared/modals/ContextModal.vue';
import MainInput from '../../../components/shared/input/MainInput.vue';
import InviteManyUsersToEventModal from '../../../components/main/events/modals/InviteToEventModal/InviteManyUsersToEventModal.vue';
import SmallUserCard from '../../../components/SmallUserCard.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { BlanballEventBus } from '../../../workers/event-bus-worker';
import { useUserDataStore } from '../../../stores/userData';
import { addMinutes } from '../../../utils/addMinutes';
import { getDate } from '../../../utils/getDate';
import { getTime } from '../../../utils/getTime';
import { copyToClipboard } from '../../../utils/copyToClipBoard';
import {
  startSpinner,
  finishSpinner,
} from '../../../workers/loading-worker/loading.worker';
import { calcHeight } from '../../../utils/calcHeight';

import { CONSTS } from '../../../consts/index';
import { ROUTES } from '../../../router/router.const';

import emoji_1 from '../../../assets/img/emojies/1.svg';
import emoji_2 from '../../../assets/img/emojies/2.svg';
import emoji_3 from '../../../assets/img/emojies/3.svg';
import emoji_4 from '../../../assets/img/emojies/4.svg';
import emoji_5 from '../../../assets/img/emojies/5.svg';
import noReviews from '../../../assets/img/no-records/no-reviews.svg';
import noUserRecords from '../../../assets/img/no-records/no-user-records.svg';
import editEvent from '../../../assets/img/edit-white.svg';
import NoEditPermIcon from '../../../assets/img/no-edit-perm-modal-icon.svg';
import ExitIcon from '../../../assets/img/exit-white.svg';
import PlusIcon from '../../../assets/img/plus.svg';

const eventJoinTypes = {
  PLAY: 'play',
  VIEW: 'view',
};

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    rightSidebar,
    EventInfoUsersTable,
    PositionMap,
    CopyModal,
    userAvatar,
    TabLabel,
    SmallUserCard,
    EventInfoForms,
    EditEventModal,
    ListOfEventRequestsToParticipations,
    InviteManyUsersToEventModal,
    ActionEventModal,
    SubmitModal,
    MainInput,
    ContextModal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const userStore = useUserDataStore();
    const isTabLabel = ref(false);
    const { t } = useI18n();
    const joinEventData = ref(null);
    const eventData = ref(route.meta.eventData.data);
    const isSubmitModalOpened = ref(false);
    const isInviteUsersModalOpened = ref(false);
    const eventRequestsToParticipations = ref(
      handlePreloadRequestsParticipationsData(
        route.meta.eventRequestsToParticipationData.data
      )
    );
    const isShareEventModalOpened = ref(false);
    const currentFullRoute = ref(window.location.href);
    const activeTab = ref(0);
    const eventPriceHover = ref(false);
    const isEventJoinModalActive = ref(false);
    const eventJoinModalX = ref(null);
    const eventJoinModalY = ref(null);

    const isActionEventModalOpened = ref(false);
    const actionEventModalConfig = computed(() => {
      return {
        title: t('modals.no_perm_to_edit.title'),
        description: t('modals.no_perm_to_edit.main-text'),
        image: NoEditPermIcon,
      };
    });

    handleIncomeEventData(eventData.value);

    watch(
      () => route.path,
      async (value) => {
        startSpinner();
        const response = await API.EventService.getOneEvent(
          value.split('/').slice(-1)[0]
        );
        handleIncomeEventData(response.data);
        eventData.value = response.data;
        joinEventData.value = null;
        finishSpinner();
      }
    );

    const mockData = computed(() => {
      return {
        tabs: CONSTS.event_info
          .tabs(eventData.value, userStore.user.id)
          .map((item) => ({
            ...item,
            name: t(item.name),
          })),
      };
    });

    const eventJoinToolTipItems = computed(() => {
      return CONSTS.eventJoin.items;
    });

    const submitModalConfig = computed(() => {
      return {
        title: t('modals.leave_from_event.title'),
        description: t('modals.leave_from_event.main-text', {
          eventName: eventData.value.name,
        }),
        button_1: t('modals.leave_from_event.button-1-text'),
        button_2: t('modals.leave_from_event.button-2-text'),
        left_btn_action: 'closeModal',
        right_btn_action: 'leaveFromTheEvent',
        btn_with_1: 130,
        btn_with_2: 110,
      };
    });

    const noUsersData = computed(() => {
      if (eventData.value.author.id === userStore.user.id) {
        return {
          title: t('no_records.noEventPlayers.title'),
          description: t('no_records.noEventPlayers.description_author'),
          button_text: t('buttons.invite-players'),
          image: noUserRecords,
          action: () => showInviteUsersModal(),
        };
      } else {
        return {
          title: t('no_records.noEventPlayers.title'),
          description: t('no_records.noEventPlayers.description_user'),
          button_text: !eventData.value.current_fans.some(
            (user) => user.id === userStore.user.id
          )
            ? !eventData.value.privacy
              ? t('buttons.join-participate')
              : t('events.apply')
            : null,
          image: noUserRecords,
          action: (e) => showEventJoinModal(e),
        };
      }
    });

    const noFansData = computed(() => {
      if (eventData.value.author.id === userStore.user.id) {
        return {
          title: t('no_records.noEventFans.title'),
          description: t('no_records.noEventFans.description_author'),
          image: noUserRecords,
        };
      } else {
        return {
          title: t('no_records.noEventFans.title'),
          description: t('no_records.noEventFans.description_user'),
          button_text: !eventData.value.current_users.some(
            (user) => user.id === userStore.user.id
          )
            ? t('buttons.become-a-fan')
            : null,
          image: noUserRecords,
          action: () => joinEvent(eventData.value, eventJoinTypes.VIEW),
        };
      }
    });

    function getButtonConfig() {
      const isEventAuthor = eventData.value.author.id === userStore.user.id;
      const isUserAttending = eventData.value.current_users.some(
        (user) => user.id === userStore.user.id
      );
      const isUserFan = eventData.value.current_fans.some(
        (user) => user.id === userStore.user.id
      );
      const { privacy, request_user_role } = eventData.value;
      const isSentRequest = request_user_role === 'request_participation';

      if (isEventAuthor) {
        return {
          text: t('buttons.edit'),
          icon: editEvent,
          height: 32,
          width: 140,
          action: () => editEventButtonClick(),
        };
      } else if (isUserAttending || isUserFan) {
        return {
          text: t('events.leave'),
          icon: ExitIcon,
          width: 185,
          height: 32,
          color: '#575775',
          action: () => eventLeaveButtonClick(),
        };
      } else if (privacy) {
        if (isSentRequest) {
          return {
            text: t('events.request-sent'),
            height: 32,
            width: 150,
            color: '#575775',
          };
        } else {
          return {
            text: t('events.apply'),
            icon: PlusIcon,
            height: 32,
            width: 150,
            action: (e) => showEventJoinModal(e),
          };
        }
      } else {
        return {
          text: t('events.join'),
          icon: PlusIcon,
          width: 125,
          height: 32,
          action: (e) => showEventJoinModal(e),
        };
      }
    }
    const greenButton = computed(() => {
      return getButtonConfig();
    });

    const showInviteUsersModal = () => {
      isInviteUsersModalOpened.value = true;
    };

    const closeInviteUsersModal = () => {
      isInviteUsersModalOpened.value = false;
    };

    const leaveFromTheEvent = async () => {
      startSpinner();
      let participateType = '';
      let leaveFrom = [];
      if (
        eventData.value.current_users.some(
          (user) => user.id === userStore.user.id
        )
      ) {
        await API.EventService.eventLeaveAsPlayer(eventData.value.id);
        leaveFrom = eventData.value.current_users;
      } else {
        await API.EventService.eventLeaveAsFan(eventData.value.id);
        leaveFrom = eventData.value.current_fans;
      }
      const index = leaveFrom.findIndex(
        (event) => event.id === userStore.user.id
      );
      if (index > -1) {
        leaveFrom.splice(index, 1);
      }
      finishSpinner();
      emitAfterEventJoinOrLeave(participateType, 'leave');
      closeSubmitModal();
      toast.info(t('notifications.event-leave'));
    };

    const acceptRequestToParticipation = async (id) => {
      startSpinner();

      await API.EventService.declineOrAcceptParticipations(id, true);
      let newEventData = await API.EventService.getOneEvent(eventData.value.id);
      let requestsToParticipations =
        await API.EventService.requestsToParticipations(eventData.value.id);
      eventData.value = newEventData.data;
      handleIncomeEventData(eventData.value);
      eventRequestsToParticipations.value =
        handlePreloadRequestsParticipationsData(requestsToParticipations.data);
      finishSpinner();
    };

    const declineRequestToParticipation = async (id) => {
      startSpinner();

      await API.EventService.declineOrAcceptParticipations(id, false);
      let requestsToParticipations =
        await API.EventService.requestsToParticipations(eventData.value.id);
      eventRequestsToParticipations.value =
        handlePreloadRequestsParticipationsData(requestsToParticipations.data);
      finishSpinner();
    };

    const openEventShareModal = () => {
      isShareEventModalOpened.value = true;
    };

    const closeShareEventModal = () => {
      isShareEventModalOpened.value = false;
    };

    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
    };

    const showSubmitModal = () => {
      isSubmitModalOpened.value = true;
    };

    function setUserEmoji(raiting) {
      switch (raiting) {
        case 5:
          return emoji_5;
        case 4:
          return emoji_4;
        case 3:
          return emoji_3;
        case 2:
          return emoji_2;
        case 1:
          return emoji_1;
        default:
          return noReviews;
      }
    }

    async function inviteUsersToThisEvent(ids) {
      startSpinner();
      closeInviteUsersModal();
      await API.EventService.inviteUsersToEvent(ids, eventData.value.id);
      finishSpinner();
      toast.success(t('notifications.sent-invites'));
    }

    function handlePreloadRequestsParticipationsData(data) {
      return data.results.map((item) => {
        item.sender.emoji = setUserEmoji(item.raiting);
        return {
          ...item,
        };
      });
    }

    const closeEventActiondModal = () => {
      isActionEventModalOpened.value = false;
    };
    const openEventActionModal = () => {
      isActionEventModalOpened.value = true;
    };

    function handleIncomeEventData(data) {
      data.date = getDate(data.date_and_time);
      data.time = getTime(data.date_and_time);
      data.end_time = addMinutes(getTime(data.date_and_time), data.duration);
      for (let user of data.current_users) {
        user.raiting = Math.round(user.raiting);
        user.emoji = setUserEmoji(user.raiting);
      }
    }

    function emitAfterEventJoinOrLeave(participateType, action) {
      let emitName = '';
      if (action === 'join') {
        emitName = 'userJoinedEvent';
      } else {
        emitName = 'userLeftEvent';
      }
      BlanballEventBus.emit(emitName, {
        eventId: eventData.value.id,
        participateType: participateType,
      });
    }

    function editEventButtonClick() {
      if (
        eventData.value.author.id === userStore.user.id &&
        eventData.value.status === 'Planned'
      ) {
        return router.push(
          ROUTES.APPLICATION.EVENTS.EDIT.absolute(eventData.value.id)
        );
      } else if (
        eventData.value.author.id === userStore.user.id &&
        eventData.value.status !== 'Planned'
      ) {
        openEventActionModal();
      }
    }

    function eventLeaveButtonClick() {
      showSubmitModal();
    }

    const copyLinkButtonClick = () => {
      copyToClipboard(currentFullRoute.value);
      closeShareEventModal();
      toast.success(t('notifications.event-share-link-copied'));
    };

    const goToUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId));
    };

    const showEventJoinModal = (e) => {
      eventJoinModalX.value = e.clientX;
      eventJoinModalY.value = e.clientY;
      joinEventData.value = eventData.value;
      isEventJoinModalActive.value = true;
    };

    const closeEventJoinModal = () => {
      isEventJoinModalActive.value = false;
      eventJoinModalX.value = null;
      eventJoinModalY.value = null;
      joinEventData.value = null;
    };

    async function joinEvent(data, type) {
      startSpinner();
      let toastText = '';
      let participateType = '';
      switch (type) {
        case eventJoinTypes.PLAY:
          await API.EventService.eventJoinAsPlayer(data.id);
          eventData.value.current_users.unshift(userStore.user);
          handleIncomeEventData(eventData.value);
          if (eventData.value.privacy) {
            toastText = t('notifications.event-request-sent');
            participateType = 'request_participation';
          } else {
            toastText = t('notifications.event-join-as-player');
            participateType = 'player';
          }
          break;
        case eventJoinTypes.VIEW:
          await API.EventService.eventJoinAsFan(data.id);
          eventData.value.current_fans.unshift(userStore.user);
          handleIncomeEventData(eventData.value);
          toastText = t('notifications.event-join-as-fan');
          participateType = 'fan';
          break;
      }
      emitAfterEventJoinOrLeave(participateType, 'join');
      finishSpinner();
      toast.success(toastText);
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

    function changeTab(id, isDisabled) {
      if (isDisabled) return;
      activeTab.value = id;
    }

    function switchTabLabel(isDisabled) {
      if (isDisabled) {
        isTabLabel.value = !isTabLabel.value;
      }
    }

    const ALL_ROUTES = computed(() => {
      return ROUTES;
    });

    const { calculatedHeight } = calcHeight(
      [90, 60],
      [userStore.user.is_verified ? 0 : 40],
      [userStore.user.is_verified ? 0 : 40],
      true
    );

    const eventInfoMainBlockHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    return {
      mockData,
      ALL_ROUTES,
      isShareEventModalOpened,
      eventData,
      currentFullRoute,
      isTabLabel,
      greenButton,
      activeTab,
      isActionEventModalOpened,
      noUsersData,
      actionEventModalConfig,
      noFansData,
      eventPriceHover,
      isSubmitModalOpened,
      isEventJoinModalActive,
      eventRequestsToParticipations,
      submitModalConfig,
      eventInfoMainBlockHeight,
      eventJoinModalX,
      isInviteUsersModalOpened,
      eventJoinModalY,
      eventJoinToolTipItems,
      closeEventJoinModal,
      copyLinkButtonClick,
      inviteUsersToThisEvent,
      switchTabLabel,
      closeSubmitModal,
      closeEventActiondModal,
      changeTab,
      joinEventModalItemClick,
      leaveFromTheEvent,
      showInviteUsersModal,
      closeInviteUsersModal,
      openEventShareModal,
      acceptRequestToParticipation,
      declineRequestToParticipation,
      goToUserProfile,
      closeShareEventModal,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-000: #000;
$color-e3fbfa: #e3fbfa;
$color-f9f9fc: #f9f9fc;
$color-8a8aa8: #8a8aa8;

.b-event-info {
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-gap: 28px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;

    &:deep(.b-right-sidebar) {
      display: none;
    }
  }

  .b-event-info__main-body {
    .b-event-info__header-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;

      .b-event-info__left-part {
        .b-event-info__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: $--b-main-black-color;
          margin-bottom: 4px;
          width: 90%;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .b-event-info__subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: $--b-main-gray-color;
        }
      }

      .b-event-info__right-part {
        display: flex;
        align-items: center;

        a {
          text-decoration: none;
        }

        @include mobile {
          position: fixed;
          bottom: 0;
          background: rgba(249, 249, 252, 0.9);
          backdrop-filter: blur(1px);
          border-radius: 12px 12px 0px 0px;
          padding: 8px 16px 12px;
          z-index: 2;
          justify-content: space-between;
          left: 50%;
          transform: translateX(-50%);
        }

        .b-event-info__right-part-green-btn {
          display: flex;
        }

        .b-event-info__share-link {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: $--b-main-gray-color;
          margin-left: 25px;
          display: flex;
          align-items: center;
          cursor: pointer;

          img {
            margin-right: 10px;
          }
        }
      }
    }

    .b-event-info__main-content-block {
      overflow-y: scroll;
    }

    .b-event-info__details-block {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-top: 24px;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      @include tabletAndMobile {
        border-top: none;
        margin-top: 20px;
      }

      .b-event-info__left-side {
        .b-event-info__timing,
        .b-event-info__address {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: $--b-main-black-color;
          margin-bottom: 10px;
          display: flex;

          img {
            margin-right: 8px;
          }

          span {
            border-bottom: 1px dashed $color-000;
          }
        }

        .b-event-info__price {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 0px;
          width: fit-content;
          cursor: pointer;
          position: relative;

          &.fee {
            border-bottom: 1px dashed $--b-main-green-color;
            border-radius: 4px 4px 0px 0px;
            background: $color-e3fbfa;

            span {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              display: flex;
              align-items: center;
              color: $--b-main-green-color;

              .b-price {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                margin-left: 6px;
                color: $--b-main-green-color;
              }
            }
          }

          &.free {
            background: $color-f9f9fc;
            border-radius: 4px;

            span {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              display: flex;
              align-items: center;
              color: $--b-main-black-color;

              .b-price-free {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                color: $--b-main-black-color;
                margin-left: 6px;
              }
            }
          }

          .b-event-info__price-tooltip-wrapper {
            width: fit-content;
            z-index: 2;

            :deep(.b-tab-label__label-text) {
              max-width: 200px;
            }

            .v-enter-active,
            .v-leave-active {
              transition: opacity 0.4s ease;
            }

            .v-enter-from,
            .v-leave-to {
              opacity: 0;
            }

            .b-event-info__price-tooltip {
              height: fit-content;
              width: max-content;
              word-break: break-word;
            }
          }
        }

        .b-event-info__main-info {
          display: flex;
          flex-direction: column;

          .b-event-info__forms-block {
            @include mobile {
              order: 3;
            }
          }

          .b-event-info__description-block {
            @include mobile {
              order: 1;
              margin-bottom: 6px;
              margin-top: 16px;
            }

            .b-event-info__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-gray-color;
              margin-bottom: 16px;
              max-width: 100%;
              word-break: break-word;
            }

            .b-event-info__description {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              color: $--b-main-black-color;
              max-width: 100%;
              word-break: break-word;
            }
          }

          .b-event-info__labels {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 0px;
            margin-top: 20px;
            margin-bottom: 12px;

            @include mobile {
              order: 2;
              margin-top: 8px;
              margin-bottom: 0px;
            }

            .b-event-info__label {
              margin-right: 4px;
              font-family: 'Inter';
              font-style: normal;
              text-align: center;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-black-color;
              padding: 0px 8px;
              border: 1px solid $color-dfdeed;
              border-radius: 100px;
            }
          }
        }
      }

      .b-event-info__right-side {
        .b-event-info__users {
          .b-event-info__user {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-top: 12px;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid $color-dfdeed;
            @include mobile {
              border-top: 1px solid $color-dfdeed;
            }

            .b-event-info__left-side {
              display: flex;
              align-items: center;

              .b-event-info__picture {
                margin-right: 12px;
                cursor: pointer;
              }

              .b-event-info__name {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: $--b-main-black-color;
              }

              .b-event-info__phone {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: $--b-main-gray-color;
              }
            }

            .b-event-info__right-side {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-gray-color;
            }
          }
        }

        .b-event-info__map {
          margin-top: 20px;
          height: 200px;

          .b-event-map {
            border-radius: 6px;
          }

          img {
            width: 100%;
          }
        }
      }
    }

    .b-event-info__tables-block {
      margin-top: 36px;

      @include mobile {
        padding-bottom: 70px;
      }

      .b-event-info__tables-title {
        margin-bottom: 32px;
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: $--b-main-black-color;
      }

      .b-event-info__judge-trainer-tables {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include tabletAndMobile {
          flex-direction: column;
        }
      }
    }
  }
}

.b-event-info__tab-block {
  display: flex;
  gap: 25px;
  width: 100%;
  flex-grow: 1;
  overflow-x: scroll;
  height: 180px;

  .b-event-info__tab-element {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    position: relative;
    line-height: 20px;
    color: $--b-main-gray-color;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding-bottom: 10px;
    min-width: fit-content;
    max-height: 30px;

    &.active {
      border-bottom: 2px solid $color-8a8aa8;
    }

    &.disabled {
      color: $--b-disabled-color;

      img {
        opacity: 0.6;
      }
    }

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.4s ease;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
}

.b-event-info__users-tables {
  border-top: 1px solid $color-dfdeed;
  margin-top: -150px;
  padding-top: 20px;
}
</style>
