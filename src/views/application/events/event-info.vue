<template>
  <Loading :is-loading="loading" />
  <ShareEventModal
    v-if="isShareEventModalOpened"
    :shareLink="currentFullRoute"
    @copyLinkButtonClick="copyLinkButtonClick"
    @closeModal="closeShareEventModal"
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
          <router-link :to="ALL_ROUTES.APPLICATION.EVENTS.CREATE.absolute">
            <GreenBtn
              :text="
                eventData.privacy ? $t('events.apply') : $t('buttons.join')
              "
              :width="150"
              :height="40"
            />
          </router-link>
          <div @click="openEventShareModal" class="b-event-info__share-link">
            <img src="../../../assets/img/share-icon.svg" alt="" />
            <span>
              {{ $t('my_events.share') }}
            </span>
          </div>
        </div>
      </div>
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
          <div :class="['b-event-info__price', 
            {'fee': eventData.price},
            {'free': !eventData.price }]"
            @mouseenter="eventPriceHover=true"
            @mouseleave="eventPriceHover=false">
            <img v-if="!eventData.price" src="../../../assets/img/info.svg" alt="">
            <img  v-else src="../../../assets/img/green-info.svg" alt="">
            <span>{{ $t('events.event-price') }} <span v-if="eventData.price" 
              class="b-price">{{ `${eventData.price} грн` }}</span>
              <span class="b-price-free" v-else>{{ $t('events.for-free') }}</span>
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
          <div class="b-event-info__forms">
            <div class="b-event-info__form" v-for="form in eventData.forms">
              <span class="b-event-info__form-title">
                {{ $t('events.team_num', {'num': 1}) }}
              </span>
              <div class="b-event-info__form-content">

                <div v-if="form.type === 'T-Shirt'" class="b-event-info__form-content-t-thirt">
                  <div class="b-event-info__form-item">
                  <div class="b-event-info__form-item-name">
                    {{ $t('events.t-shirts') }}
                  </div>
                  <div class="b-event-info__form-item-color">
                    <div class="b-event-info__form-item-color-view"></div>
                    <div class="b-event-info__form-item-color-name">
                      Сині
                    </div> 
                  </div>
                </div>
                <div class="b-event-info__form-item">
                  <div class="b-event-info__form-item-name">
                    {{ $t('events.shorts') }}
                  </div>
                  <div class="b-event-info__form-item-color">
                    <div class="b-event-info__form-item-color-view"></div>
                    <div class="b-event-info__form-item-color-name">
                      Сині
                    </div> 
                  </div>
                </div>
                </div>
                <div  v-else class="b-event-info__form-content-shirt-front">
                  <div class="b-event-info__form-item">
                  <div class="b-event-info__form-item-name">
                    Маніжки
                  </div>
                  <div class="b-event-info__form-item-color">
                    <div class="b-event-info__form-item-color-view"></div>
                    <div class="b-event-info__form-item-color-name">
                      Сині
                    </div> 
                  </div>
                </div>
                </div>

              </div>
            </div>
          </div>
          <div class="b-event-info__title">
            {{ $t('my_events.description-event') }}
          </div>
          <div class="b-event-info__description">
            {{ eventData.description }}
          </div>
        </div>
        <div class="b-event-info__right-side">
          <div class="b-event-info__users">
            <div class="b-event-info__user">
              <div class="b-event-info__left-side">
                <div class="b-event-info__picture">
                  <avatar
                    :border="true"
                    :link="eventData.author.profile.avatar_url"
                    :full-name="`${eventData.author.profile.name} ${eventData.author.profile.last_name}`"
                    @clickByAvatar="goToUserProfile(eventData.author.id)"
                  ></avatar>
                </div>
                <div class="b-event-info__text-block">
                  <div class="b-event-info__name">
                    {{ eventData.author.profile.name }}
                    {{ eventData.author.profile.last_name }}
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
              @map-loaded="loading = false"
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

        <EventInfoUsersTable
          v-if="activeTab === 0"
          :data="eventData.current_users"
          :table-title-text="$t('my_events.players-list')"
          :table-color="'#148783'"
          :maxPlayersCount="eventData.amount_members"
        />

        <EventInfoUsersTable
          v-if="activeTab === 1"
          :data="eventData.current_fans"
          :border="false"
        />

        <ListOfEventRequestsToParticipations
          v-if="activeTab === 2"
          :requestsToParticipationsData="eventRequestsToParticipations"
          @acceptRequest="acceptRequestToParticipation"
          @declineRequest="declineRequestToParticipation"
        />
      </div>
    </div>

    <RightSidebar />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

import GreenBtn from '../../../components/GreenBtn.vue';
import RightSidebar from '../../../components/RightSidebar.vue';
import EventInfoUsersTable from '../../../components/EventInfoUsersTable.vue';
import PositionMap from '../../../components/maps/PositionMap.vue';
import ShareEventModal from '../../../components/ModalWindows/ShareEventModal.vue';
import Avatar from '../../../components/Avatar.vue';
import TabLabel from '../../../components/TabLabel.vue';
import ListOfEventRequestsToParticipations from '../../../components/ListOfEventRequestsToParticipations.vue';
import Loading from '../../../workers/loading-worker/Loading.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '../../../stores/userData';
import { addMinutes } from '../../../utils/addMinutes'
import { getDate } from '../../../utils/getDate'
import { getTime } from '../../../utils/getTime'

import CONSTANTS from '../../../consts/index';
import { ROUTES } from '../../../router/router.const';

import emoji_1 from '../../../assets/img/emojies/1.svg';
import emoji_2 from '../../../assets/img/emojies/2.svg';
import emoji_3 from '../../../assets/img/emojies/3.svg';
import emoji_4 from '../../../assets/img/emojies/4.svg';
import emoji_5 from '../../../assets/img/emojies/5.svg';
import noReviews from '../../../assets/img/no-records/no-reviews.svg';

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    RightSidebar,
    EventInfoUsersTable,
    PositionMap,
    ShareEventModal,
    Avatar,
    Loading,
    TabLabel,
    ListOfEventRequestsToParticipations,
  },
  setup() {
    const setUserEmoji = (raiting) => {
      switch (raiting) {
        case 5:
          return emoji_5;
          break;
        case 4:
          return emoji_4;
          break;
        case 3:
          return emoji_3;
          break;
        case 2:
          return emoji_2;
          break;
        case 1:
          return emoji_1;
          break;
        default:
          return noReviews;
      }
    };

    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const userStore = useUserDataStore();
    const isTabLabel = ref(false);
    const loading = ref(false);
    const { t } = useI18n();
    const eventData = ref(route.meta.eventData.data);
    const eventRequestsToParticipations = ref(
      handlePreloadRequestsParticipationsData(
        route.meta.eventRequestsToParticipationData.data
      )
    );
    const isShareEventModalOpened = ref(false);
    const currentFullRoute = ref(window.location.href);
    const activeTab = ref(0);
    const eventPriceHover = ref(false)

    handleIncomeEventData(eventData.value);

    const mockData = computed(() => {
      return {
        tabs: CONSTANTS.event_info.tabs(eventData.value, userStore.user.id).map((item) => ({
          ...item,
          name: t(item.name),
        })),
      };
    });

  
    const acceptRequestToParticipation = async (id) => {
      loading.value = true;

      await API.EventService.declineOrAcceptParticipations(id, true);
      let newEventData = await API.EventService.getOneEvent(eventData.value.id);
      let requestsToParticipations =
        await API.EventService.requestsToParticipations(eventData.value.id);
      eventData.value = newEventData.data;
      handleIncomeEventData(eventData.value);
      eventRequestsToParticipations.value =
        handlePreloadRequestsParticipationsData(requestsToParticipations.data);
      loading.value = false;
    };

    const declineRequestToParticipation = async (id) => {
      loading.value = true;

      await API.EventService.declineOrAcceptParticipations(id, false);
      let requestsToParticipations =
        await API.EventService.requestsToParticipations(eventData.value.id);
      eventRequestsToParticipations.value =
        handlePreloadRequestsParticipationsData(requestsToParticipations.data);
      loading.value = false;
    };

    const openEventShareModal = () => {
      isShareEventModalOpened.value = true;
    };


    const closeShareEventModal = () => {
      isShareEventModalOpened.value = false;
    };

    function handlePreloadRequestsParticipationsData(data) {

      return data.results.map((item) => {
        item.sender.emoji = setUserEmoji(item.raiting);
        return {
          ...item,
        };
      });
    }

    function handleIncomeEventData(data) {
      data.date = getDate(data.date_and_time);
      data.time = getTime(data.date_and_time);
      data.end_time = addMinutes(getTime(data.date_and_time), data.duration);
      for (let user of data.current_users) {
        user.raiting = Math.round(user.raiting);
        user.emoji = setUserEmoji(user.raiting);
      }
    }

    const copyLinkButtonClick = () => {
      navigator.clipboard.writeText(currentFullRoute.value);
      closeShareEventModal();
      toast.success(t('notifications.event-share-link-copied'));
    };

    
    const goToUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId));
    };

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

    return {
      mockData,
      ALL_ROUTES,
      isShareEventModalOpened,
      eventData,
      currentFullRoute,
      isTabLabel,
      loading,
      userStore,
      activeTab,
      eventPriceHover,
      eventRequestsToParticipations,
      copyLinkButtonClick,
      switchTabLabel,
      changeTab,
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
@import '../../../assets/styles/mixins/device.scss';

::-webkit-scrollbar {
  display: none;
}

.b-event-info {
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-gap: 28px;
  width: 100%;
  overflow: scroll;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;

    &::v-deep(.b-right-sidebar) {
      display: none;
    }
  }

  .b-event-info__main-body {
    height: calc(100% + 150px);
    overflow: auto;
    .b-event-info__header-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .b-event-info__left-part {
        .b-event-info__title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: #262541;
          margin-bottom: 4px;
        }
        .b-event-info__subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
        }
      }
      .b-event-info__right-part {
        display: flex;
        align-items: center;
        @include mobile {
          position: fixed;
          bottom: 0;
          left: 50%;
          z-index: 3;
          transform: translateX(-50%);
          margin-bottom: 10px;
        }
        a {
          text-decoration: none;
        }
        .b-event-info__share-link {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #575775;
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
    .b-event-info__details-block {
      border-top: 1px solid #dfdeed;
      padding-top: 14px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-top: 24px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      .b-event-info__left-side {
        .b-event-info__timing,
        .b-event-info__address {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
          margin-bottom: 10px;
          display: flex;
          img {
            margin-right: 8px;
          }
          span {
            border-bottom: 1px dashed #000;
          }
        }
        .b-event-info__price {
          display: flex;
          align-items: center;
          position: relative;
          gap: 6px;
          padding: 6px;
          max-width: fit-content;
          cursor: pointer;

          &.fee {
            border-bottom: 1px dashed #148783;
            border-radius: 4px 4px 0px 0px;
            background: #E3FBFA;
            span {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #148783;

            .b-price {
              font-family: 'Exo 2';
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              margin-left: 6px;
              color: #148783;
            }
          }
          }

          &.free {
            background: #F9F9FC;
            border-radius: 4px;
            span {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              display: flex;
              align-items: center;
              color: #262541;

            .b-price-free {
              font-family: 'Exo 2';
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              color: #262541;
              margin-left: 6px;
              }
            }
          }
          .b-event-info__price-tooltip-wrapper {
            position: absolute;
            top: 8px;
            left: 65px;
            width: fit-content;
            z-index: 2;

            .v-enter-active,
            .v-leave-active {
              transition: opacity 0.4s ease;
            }
            .v-enter-from,
            .v-leave-to {
              opacity: 0;
            }
            .b-event-info__price-tooltip {
              position: relative;
              height: fit-content;
              max-width: 390px;
              width: max-content;
              word-break: break-word;
            }
          }
        }
        .b-event-info__title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          margin-top: 20px;
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
          color: #262541;
          margin-bottom: 16px;
          max-width: 100%;
          word-break: break-word;
        }
        .b-event-info__labels {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 0px;
          margin-top: 20px;
          .b-event-info__label {
            margin-right: 4px;
            font-family: 'Inter';
            font-style: normal;
            text-align: center;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #262541;
            padding: 0px 8px;
            border: 1px solid #dfdeed;
            border-radius: 100px;
          }
        }
      }
      .b-event-info__forms {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 16px;
        .b-event-info__form {
          background: #F9F9FC;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          .b-event-info__form-title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 24px;
            color: #262541;
          }
          .b-event-info__form-content {
            .b-event-info__form-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 8px;
              margin-top: 8px;
              .b-event-info__form-item-name {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
              }
              .b-event-info__form-item-color {
                background: #EFEFF6;
                border-radius: 4px;
                padding: 2px 8px;
                min-width: 115px;
                display: flex;
                align-items: center;
                gap: 8px;

                .b-event-info__form-item-color-view {
                  border: 2px solid #fff;
                  border-radius: 2px;
                  background: #2946E1;
                  width: 14px;
                  height: 14px;
                }
                .b-event-info__form-item-color-name {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 20px;
                  color: #262541;
                }
              }
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
            border-bottom: 1px solid #dfdeed;
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
                color: #262541;
              }
              .b-event-info__phone {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #575775;
              }
            }
            .b-event-info__right-side {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
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
      .b-event-info__tables-title {
        margin-bottom: 32px;
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      .b-event-info__judge-trainer-tables {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 768px) {
          flex-direction: column;
        }
      }
    }
  }
}
.b-event-info__tab-block {
  display: flex;
  gap: 25px;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  border-bottom: 1px solid #dfdeed;
  margin-bottom: 30px;
  overflow-x: scroll;

  .b-event-info__tab-element {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    position: relative;
    line-height: 20px;
    color: #575775;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding-bottom: 10px;
    min-width: fit-content;

    &.active {
      border-bottom: 2px solid #8a8aa8;
    }

    &.disabled {
      color: #7f7db5;

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
</style>
