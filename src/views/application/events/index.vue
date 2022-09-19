<template>
  <div class="b-events-page">
    <ContextMenu 
      v-if="isContextMenuActive" 
      :client-x="contextMenuX"
      :client-y="contextMenuY"
      :menu-text="mockData.menu_text"
      @close-modal="isContextMenuActive = false"
    />
    <div class="b-events-page__main-body">
      <div class="b-events-page__header-block">
        <div class="b-events-page__left-part">
          <div class="b-events-page__title">{{ $t('events.title') }}</div>
          <div class="b-events-page__subtitle">{{ $t('events.subtitle') }}</div>
          <div class="b-events-page__event-switcher">
            <div 
              class="b-events-page__general-events"
              :style="{
                border: `1px solid ${eventsSwitcher ? '#DFDEED': '#148581'}`
              }"
              @click="switchEvents(false)"
            >
              {{ $t('events.general-events') }}
            </div>
            <div 
              class="b-events-page__my-events"
              :style="{
                border: `1px solid ${eventsSwitcher ? '#148581': '#DFDEED'}`
              }"
              @click="switchEvents(true)"
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
      <SearchBlockEvents 
        :sport-type-dropdown="mockData.sport_type_dropdown"
        :gender-dropdown="mockData.gender_dropdown"
        :cities-dropdown="mockData.cities_dropdown"
        :calendar="mockData.calendar"
      />
      <div class="b-events-page__cards-block">
        <div 
          v-if="!eventsSwitcher"
          class="b-events-page__all-events-block"
        >
          <EventCard
            v-for="card of mockData.event_cards"
            :key="card.id"
            :card="card"
          />
        </div>
        <div 
          v-if="eventsSwitcher"
          class="b-events-page__my-events-block"
        >
          <MyEventCard 
            v-for="card of mockData.my_events"
            :key="card.id"
            :card="card"
            @card-right-click="myCardRightClick"
          />
        </div>
      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '../../../router/index'

import GreenBtn from '../../../components/GreenBtn.vue'
import ContextMenu from '../../../components/ContextMenuModal.vue'
import RightSidebar from '../../../components/RightSidebar.vue'
import EventCard from '../../../components/EventCard.vue'
import MyEventCard from '../../../components/MyEventCard.vue'
import SearchBlockEvents from '../../../components/SearchBlockEvents.vue'

import CONSTANTS from '../../../consts/index'

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    ContextMenu,
    RightSidebar,
    EventCard,
    MyEventCard,
    SearchBlockEvents
  },
  setup() {
    const router = useRouter()

    const contextMenuX = ref(null)
    const contextMenuY = ref(null)
    const isContextMenuActive = ref(false)
    const eventsSwitcher = ref(false)

    const mockData = computed(() => {
      return {
        event_cards: CONSTANTS.event_page.event_cards,
        my_events: CONSTANTS.event_page.my_events,
        sport_type_dropdown: CONSTANTS.event_page.sport_type_dropdown,
        gender_dropdown: CONSTANTS.event_page.gender_dropdown,
        cities_dropdown: CONSTANTS.event_page.cities_dropdown,
        calendar: CONSTANTS.event_page.calendar,
        menu_text: CONSTANTS.event_page.menu_text
      }
    })

    function switchEvents(val) {
      eventsSwitcher.value = val
    }
    function myCardRightClick(e) {
      contextMenuX.value = e.clientX
      contextMenuY.value = e.clientY
      isContextMenuActive.value = true
    }
    function goToCreateEvent() {
      router.push(ROUTES.APPLICATION.EVENTS.CREATE.absolute)
    }

    return {
      contextMenuX,
      contextMenuY,
      isContextMenuActive,
      eventsSwitcher,
      mockData,
      switchEvents,
      myCardRightClick,
      goToCreateEvent
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-events-page {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 28px;
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
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
      .b-events-page__cards-block {
        .b-events-page__all-events-block {
          margin-top: 23px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
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