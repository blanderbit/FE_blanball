<template>
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
            {{ $t('my_events.friendly-match') }}
          </div>
        </div>
        <div class="b-event-info__right-part">
          <router-link :to="ALL_ROUTES.APPLICATION.EVENTS.CREATE.absolute">
            <GreenBtn
              :text="eventData.privacy ? $t('events.apply') : $t('buttons.join')"
              :width="150"
              :height="40"
            />
          </router-link>
          <div class="b-event-info__share-link">
            <img src="../../../assets/img/share-icon.svg" alt="" />
            <span @click="openEventShareModal">
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
          <div class="b-event-info__clothes">
            <div class="b-event-info__clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="" />
              <span>{{ $t('my_events.form1') }}</span>
            </div>
            <div class="b-event-info__clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="" />
              <span>{{ $t('my_events.form2') }}</span>
            </div>
          </div>
          <div class="b-event-info__title">
            {{ $t('my_events.description-event') }}
          </div>
          <div class="b-event-info__description">
            {{ eventData.description }}
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
        </div>
        <div class="b-event-info__right-side">
          <div class="b-event-info__users">
            <div class="b-event-info__user">
              <div class="b-event-info__left-side">
                <div class="b-event-info__picture">
                  <avatar
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
      </div>
    </div>

    <RightSidebar />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

import GreenBtn from '../../../components/GreenBtn.vue'
import RightSidebar from '../../../components/RightSidebar.vue'
import EventInfoUsersTable from '../../../components/EventInfoUsersTable.vue'
import PositionMap from '../../../components/maps/PositionMap.vue'
import ShareEventModal from '../../../components/ShareEventModal.vue'
import Avatar from '../../../components/Avatar.vue'
import TabLabel from '../../../components/TabLabel.vue'

import CONSTANTS from '../../../consts/index'
import { ROUTES } from '../../../router/router.const'

import emoji_1 from '../../../assets/img/emojies/1.svg'
import emoji_2 from '../../../assets/img/emojies/2.svg'
import emoji_3 from '../../../assets/img/emojies/3.svg'
import emoji_4 from '../../../assets/img/emojies/4.svg'
import emoji_5 from '../../../assets/img/emojies/5.svg'
import noReviews from '../../../assets/img/no-records/no-reviews.svg'

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    RightSidebar,
    EventInfoUsersTable,
    PositionMap,
    ShareEventModal,
    Avatar,
    TabLabel,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    const isTabLabel = ref(false)
    const { t } = useI18n()
    const eventData = ref(route.meta.eventData.data)
    const isShareEventModalOpened = ref(false)
    const currentFullRoute = ref(window.location.href)
    const activeTab = ref(0)

    const mockData = computed(() => {
      return {
        tabs: CONSTANTS.event_info.tabs.map((item) => ({
          ...item,
          name: t(item.name),
        })),
      }
    })

    function getDate(date) {
      return dayjs(date)
        .locale(dayjsUkrLocale)
        .format(
          Number(dayjs(date).locale(dayjsUkrLocale).format('YYYY')) ===
            new Date().getFullYear()
            ? 'D MMMM'
            : ' D MMMM, YYYY'
        )
    }

    const openEventShareModal = () => {
      isShareEventModalOpened.value = true
    }

    function getTime(time) {
      return dayjs(time).locale(dayjsUkrLocale).format('HH:mm')
    }

    const closeShareEventModal = () => {
      isShareEventModalOpened.value = false
    }

    const copyLinkButtonClick = () => {
      navigator.clipboard.writeText(currentFullRoute.value)
      closeShareEventModal()
      toast.success(t('notifications.event-share-link-copied'))
    }

    function addMinutes(time, minutesToAdd) {
      let timeArray = time.split(':')
      let hours = timeArray[0]
      let originalMinutes = timeArray[1]
      let date = new Date()
      date.setHours(hours)
      date.setMinutes(originalMinutes)
      date.setMinutes(date.getMinutes() + minutesToAdd)
      return date.toTimeString().substr(0, 5)
    }

    const goToUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId))
    }

    const handleIncomeData = () => {
      eventData.value.date = getDate(eventData.value.date_and_time)
      eventData.value.time = getTime(eventData.value.date_and_time)
      eventData.value.end_time = addMinutes(
        getTime(eventData.value.date_and_time),
        eventData.value.duration
      )
      for (let user of eventData.value.current_users) {
        user.raiting = Math.round(user.raiting)
        user.emoji = setUserEmoji(user.raiting)
      }
    }

    const setUserEmoji = (raiting) => {
      switch (raiting) {
        case 5:
          return emoji_5
          break
        case 4:
          return emoji_4
          break
        case 3:
          return emoji_3
          break
        case 2:
          return emoji_2
          break
        case 1:
          return emoji_1
          break
        default:
          return noReviews
      }
    }

    function changeTab(id, isDisabled) {
      if (isDisabled) return
      activeTab.value = id
    }

    function switchTabLabel(isDisabled) {
      if (isDisabled) {
        isTabLabel.value = !isTabLabel.value
      }
    }

    const ALL_ROUTES = computed(() => {
      return ROUTES
    })

    handleIncomeData()

    return {
      mockData,
      ALL_ROUTES,
      isShareEventModalOpened,
      eventData,
      currentFullRoute,
      isTabLabel,
      activeTab,
      copyLinkButtonClick,
      switchTabLabel,
      changeTab,
      openEventShareModal,
      goToUserProfile,
      closeShareEventModal,
    }
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.b-event-info {
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-gap: 28px;
  overflow: scroll;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
  .b-event-info__main-body {
    height: calc(100% + 70px);
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
        @media (max-width: 576px) {
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
        .b-event-info__address,
        .b-event-info__clothes {
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
          .b-event-info__clothe {
            margin-right: 16px;
            display: flex;
            align-items: center;
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
                border: 2px dashed #dfdeed;
                border-radius: 100px;
                padding: 4px;
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
