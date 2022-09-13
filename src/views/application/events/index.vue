<template>
  <div class="events-page">
    <ContextMenu 
      v-if="isContextMenuActive" 
      :client-x="contextMenuX"
      :client-y="contextMenuY"
      :menu-text="menuText"
      @close-modal="isContextMenuActive = false"
    />
    <div class="main-body">
      <div class="header-block">
        <div class="left-part">
          <div class="title">{{ $t('events.title') }}</div>
          <div class="subtitle">{{ $t('events.subtitle') }}</div>
          <div class="event-switcher">
            <div 
              class="general-events"
              :style="{
                border: `1px solid ${eventsSwitcher ? '#DFDEED': '#148581'}`
              }"
              @click="switchEvents(false)"
            >
              {{ $t('events.general-events') }}
            </div>
            <div 
              class="my-events"
              :style="{
                border: `1px solid ${eventsSwitcher ? '#148581': '#DFDEED'}`
              }"
              @click="switchEvents(true)"
            >
              {{ $t('events.my-events') }}
            </div>
          </div>
        </div>
        <div class="right-part">
          <GreenBtn 
            :text="$t('buttons.create-event')"
            :width="168"
            :icon="'../../../assets/img/plus.svg'"
            :height="40"
            @click-function="goToCreateEvent"
          />
        </div>
      </div>
      <div class="main-search-block">
        <div class="search-block">
          <div class="first-line">
            <div class="left-block">
              <div class="old-new-filter">
                <img src="../../../assets/img/sort-arrows.svg" alt="">
                Cпочатку нові
              </div>
              <div class="dropdown-wrapper">
                <Dropdown 
                  :options="dataDropdown"
                  :width="140"
                  :height="32"
                />
              </div>
              <Dropdown 
                :options="dataDropdown"
                :width="160"
                :height="32"
              >
                <template #drop-icon >
                  <img src="../../../assets/img/cup.png" alt="">
                </template>
              </Dropdown>
            </div>
            <div class="right-block">
              <div class="search-input-desktop">
                <InputComponent 
                  :title-width="0"
                  :placeholder="'Пошук серед подій'"
                  :has-icon="true"
                  :icon="[
                    '../../../assets/img/search.svg'
                  ]"
                />
              </div>
              <div class="search-input-tablet">
                <img src="../../../assets/img/search.svg" alt="">
              </div>
              <div class="icon-container">
                <img src="../../../assets/img/clear-filter.svg" alt="">
              </div>
              <div class="icon-container">
                <img class="set-filter" src="../../../assets/img/cross.svg" alt="">
              </div>
            </div>
          </div>
          <div class="second-line">
            <div class="left-side">
              <div class="dropdown-wrapper">
                <Dropdown 
                  :options="dataDropdown2"
                  :width="132"
                  :height="32"
                >
                  <template #drop-icon >
                    <img src="../../../assets/img/male-icon.svg" alt="">
                  </template>
                </Dropdown>
              </div>
              <div class="calendar">
                <img src="../../../assets/img/calendar.svg" alt="">
                {{ $t('events.calendar') }}
              </div>
              <div class="dropdown-wrapper">
                <Dropdown 
                  :options="dataDropdown3"
                  :width="180"
                  :height="32"
                >
                  <template #drop-icon >
                    <img src="../../../assets/img/location-point.svg" alt="">
                  </template>
                </Dropdown>
              </div>
            </div>
            <div class="right-side">
              <div class="free-pay-games">
                <div :class="['grey-block', plan === 'free' ? 'right' : 'left']"></div>
                <div class="all" @click="changePlanSearch('all')">
                  {{ $t('events.all') }}
                </div>
                <div class="free" @click="changePlanSearch('free')">
                  {{ $t('events.free') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search-block-mob">
          <div class="filters-block">
            <div class="sorting-block sort-item">
              <div class="icon">
                <img src="../../../assets/img/sort-arrows.svg" alt="">
              </div>
              <div class="text">
                <div class="title">{{ $t('events.sorting') }}</div>
                <div class="terms">{{ $t('events.first-new') }}</div>
              </div>
            </div>
            <div class="filtering-block sort-item">
              <div class="icon">
                <img src="../../../assets/img/set-filter.svg" alt="">
              </div>
              <div class="text">
                <div class="title">{{ $t('events.filters') }}</div>
                <div class="terms">знайдено 15 оголошень</div>
              </div>
            </div>
            <div class="calendar-block sort-item">
              <div class="icon">
                <img src="../../../assets/img/calendar.svg" alt="">
              </div>
              <div class="text">
                <div class="title">{{ $t('events.chose-date') }}</div>
                <div class="terms">19, 23 черв. 2022</div>
              </div>
            </div>
          </div>
          <div class="dates-block">
            <div class="months">
              <div class="wrapper">
                <div class="arrow arrow-left">
                  <img src="../../../assets/img/arrow-left.svg" alt="">
                </div>
                <div class="main-part">{{ $t('events.months.June') }} 2022</div>
                <div class="arrow arrow-right">
                  <img src="../../../assets/img/arrow-right.svg" alt="">
                </div>
              </div>
            </div>
            <div class="dates-wrapper">
              <div class="dates">
                <div
                  v-for="week of calendar"
                  :key="week.id"
                  class="week"
                >
                  <div 
                    v-for="item of week.week"
                    :key="item.id"
                    :class="['date-item', {active: item.isActive}]"
                  >
                    <div class="day">{{item.day}}</div>
                    <div class="number">{{item.number}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          v-if="!eventsSwitcher"
          class="cards-block"
        >
          <div 
            v-for="card of eventCards"
            :key="card.id"
            class="event-card"
          >
            <div class="top-title">
              <div class="left-side">
                <div class="card-icon">
                  <img src="../../../assets/img/hands-shake.png" alt=""></div>
                <div class="text-block">
                  <div class="title">{{ $t('events.friendly-match') }}</div>
                  <div class="date-time-mob">
                    <div class="date">{{card.date}} {{ $t('events.months.June') }}</div>
                    <div class="time">{{card.time}}</div>
                  </div>
                  <div class="address desk-address">
                    <img src="../../../assets/img/location-point.svg" alt="">
                    <p>{{card.address}}</p>
                  </div>
                </div>
              </div>
              <div class="right-side">
                <div class="date">{{card.date}} {{ $t('events.months.June') }}</div>
                <div class="time">{{card.time}}</div>
              </div>
            </div>
            <div class="address mob-address">
              <img src="../../../assets/img/location-point.svg" alt="">
              <p>{{card.address}}</p>
            </div>
            <div class="main-text">
              {{card.main_text}}
            </div>
            <div class="labels">
              <div class="label">{{ $t('events.football') }}</div>
              <div class="label">{{ $t('events.men') }}</div>
              <div class="label">{{ $t('events.without-category') }}</div>
            </div>
            <div class="bottom-block">
              <div class="top-line">
                <div class="name">{{card.name}}</div>
                <div class="price">{{ $t('events.for-free') }}</div>
              </div>
              <div class="bottom-line">
                <div class="left-side">
                  <div class="titles">
                    <div class="players">{{ $t('events.players') }}:</div>
                    <div class="visitors">{{ $t('events.fans') }}:</div>
                  </div>
                  <div class="date">
                    <div class="players-date">{{card.play_dates}}</div>
                    <div class="visitors-date">{{card.visitor_dates}}</div>
                  </div>
                </div>
                <div class="right-side">
                  <GreenBtn 
                    :text="'Долучитися'" 
                    :width="115"
                    :height="32"
                    @click-function="goToEventPage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          v-if="eventsSwitcher"
          class="my-events-block"
        >
          <div 
            v-for="event in myEvents"
            :key="event.id"
            :class="['my-event-card', {active: event.isActive}]"
            @click.right.prevent="myCardRightClick"
          >
            <div class="left-block">
              <div class="col-1">
                <div class="card-icon">
                  <img src="../../../assets/img/hands-shake.png" alt="" />
                </div>
              </div>
              <div class="col-2">
                <div class="title">{{event.title}}</div>
                <div class="address">
                  <img src="../../../assets/img/location-point.svg" alt="">
                  <p>
                    {{event.address}}
                  </p>
                </div>
                <div class="labels">
                  <div 
                    v-for="label in event.labels"
                    :key="label"
                    class="label"
                  >
                    {{ label }}
                  </div>
                </div>
              </div>
            </div>
            <div class="right-block">
              <div class="col-3">
                <div 
                  :class="['state', {active: event.isActive}]"
                >
                  {{ event.isActive ? 'Активно' : 'Заплановано' }}
                </div>
                <div class="date">
                  {{ event.date }}
                </div>
                <div class="time">
                  {{ event.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-sidebar">
      <div class="title-block">
        <div class="title">{{ $t('events.planned-events') }}</div>
        <div class="subtitle">{{ $t('events.your-events') }}</div>
      </div>

      <div class="cards-block">
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../../components/GreenBtn.vue'
import Dropdown from '../../../components/Dropdown.vue'
import InputComponent from '../../../components/InputComponent.vue'
import ContextMenu from '../../../components/ContextMenuModal.vue'

import circleTick from '../../../assets/img/tick-in-circle.svg'
import bucket from '../../../assets/img/bucket.svg'
import pin from '../../../assets/img/pin.svg'


export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    Dropdown,
    InputComponent,
    ContextMenu
  },
  data() {
    return {
      eventCards: [
        {
          id: 0,
          url: '/my-events/friendly-match',
          date: 14,
          time: '12:00 – 14:00',
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          'main_text': 'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
          name: 'В’ячеслав Залізняк',
          'play_dates': '10 / 22',
          'visitor_dates': '17 / 30'
        },
        {
          id: 1,
          url: '/my-events/friendly-match',
          date: 14,
          time: '12:00 – 14:00',
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          'main_text': 'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
          name: 'В’ячеслав Залізняк',
          'play_dates': '10 / 22',
          'visitor_dates': '17 / 30'
        },       
        {
          id: 2,
          url: '/my-events/friendly-match',
          date: 14,
          time: '12:00 – 14:00',
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          'main_text': 'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
          name: 'В’ячеслав Залізняк',
          'play_dates': '10 / 22',
          'visitor_dates': '17 / 30'
        },     
        {
          id: 3,
          url: '/my-events/friendly-match',
          date: 14,
          time: '12:00 – 14:00',
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          'main_text': 'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
          name: 'В’ячеслав Залізняк',
          'play_dates': '10 / 22',
          'visitor_dates': '17 / 30'
        }
      ],
      menuText: [
        {
          id: 0,
          text: 'Виділити',
          img: circleTick
        },
        {
          id: 1,
          text: 'Видалити',
          img: bucket
        },
        {
          id: 2,
          text: 'Закріпити',
          img: pin
        }
      ],
      contextMenuX: null,
      contextMenuY: null,
      isContextMenuActive: false,
      myEvents: [
        {
          id: 0,
          title: 'Дружній матч',
          isActive: true,
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          date: '7 липня',
          time: '18:00 – 22:00',
          labels: ['Футбол', 'Чоловіки', 'Без розряду']
        },
        {
          id: 1,
          title: 'Дружній матч',
          isActive: true,
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          date: '7 липня',
          time: '18:00 – 22:00',
          labels: ['Футбол', 'Чоловіки', 'Без розряду']
        },
        {
          id: 2,
          title: 'Дружній матч',
          isActive: false,
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          date: '7 липня',
          time: '18:00 – 22:00',
          labels: ['Футбол', 'Чоловіки', 'Без розряду']
        },
        {
          id: 3,
          title: 'Дружній матч',
          isActive: false,
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          date: '7 липня',
          time: '18:00 – 22:00',
          labels: ['Футбол', 'Чоловіки', 'Без розряду']
        },
        {
          id: 4,
          title: 'Дружній матч',
          isActive: true,
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          date: '7 липня',
          time: '18:00 – 22:00',
          labels: ['Футбол', 'Чоловіки', 'Без розряду']
        },
        {
          id: 5,
          title: 'Дружній матч',
          isActive: true,
          address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
          date: '7 липня',
          time: '18:00 – 22:00',
          labels: ['Футбол', 'Чоловіки', 'Без розряду']
        }
      ],
      eventsSwitcher: false,
      plan: 'free',
      dataDropdown: [
        {
          id: 0,
          value: 'Футбол'
        },
        {
          id: 1,
          value: 'Хокей'
        },
        {
          id: 2,
          value: 'Баскетбол'
        }
      ],
      dataDropdown2: [
        {
          id: 0,
          value: this.$t('events.men')
        },
        {
          id: 1,
          value: this.$t('events.women')
        },
        {
          id: 2,
          value: this.$t('events.all')
        }
      ],
      dataDropdown3: [
        {
          id: 0,
          value: 'Запорожье'
        },
        {
          id: 1,
          value: 'Мелитополь'
        },
        {
          id: 2,
          value: 'Киев'
        }
      ],
      calendar: [
        {
          id: 0,
          week: [
            { id: 0, day: 'Пн', number: 13, isActive: false },
            { id: 1, day: 'Вт', number: 14, isActive: false },
            { id: 2, day: 'Ср', number: 15, isActive: false },
            { id: 3, day: 'Чт', number: 16, isActive: false },
            { id: 4, day: 'Пт', number: 17, isActive: false },
            { id: 5, day: 'Сб', number: 18, isActive: false },
            { id: 6, day: 'Вс', number: 19, isActive: true }
          ]
        },
        {
          id: 1,
          week: [
            { id: 0, day: 'Пн', number: 20, isActive: false },
            { id: 1, day: 'Вт', number: 21, isActive: false },
            { id: 2, day: 'Ср', number: 22, isActive: true },
            { id: 3, day: 'Чт', number: 23, isActive: false },
            { id: 4, day: 'Пт', number: 24, isActive: false },
            { id: 5, day: 'Сб', number: 25, isActive: false },
            { id: 6, day: 'Вс', number: 26, isActive: false }
          ]
        },
        {
          id: 2,
          week: [
            { id: 0, day: 'Пн', number: 27, isActive: true },
            { id: 1, day: 'Вт', number: 28, isActive: false },
            { id: 2, day: 'Ср', number: 29, isActive: false },
            { id: 3, day: 'Чт', number: 30, isActive: false },
            { id: 4, day: 'Пт', number: 31, isActive: false },
            { id: 5, day: 'Сб', number: 1, isActive: false },
            { id: 6, day: 'Вс', number: 2, isActive: false }
          ]
        }
      ]
    }
  },
  methods: {
    changePlanSearch(val) {
      this.plan = val
    },
    switchEvents(val) {
      this.eventsSwitcher = val
    },
    myCardRightClick(e) {
      this.contextMenuX = e.clientX
      this.contextMenuY = e.clientY
      this.isContextMenuActive = true
    },
    goToEventPage() {
      this.$router.push('/application/events/3')
    },
    goToCreateEvent() {
      this.$router.push('/application/events/create')
    }
  }
}
</script>

<style lang="scss" scoped>
  .events-page {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 28px;
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
    .main-body {
      .header-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-part {
          .title {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 32px;
            color: #262541;
            margin-bottom: 4px;     
          }
          .subtitle {
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
          .event-switcher {
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
            .general-events {
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
            .my-events {
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
        .right-part {
          @media (max-width: 992px) {
            display: none;
          }
          a {
            text-decoration: none;
          }
        }
      }
      .main-search-block {
        margin-top: 36px;
        position: relative;
        @media (max-width: 992px) {
          padding: 0;
        }
        .search-block {
          @media (max-width: 992px) {
            display: none;
          }
          .first-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-block {
              display: flex;
              align-items: center;
              .old-new-filter {
                display: flex;
                align-items: center;
                margin-right: 20px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 13px;
                line-height: 20px;
                color: #262541;
                img {
                  margin-right: 6px;
                }
              }
              .dropdown-wrapper {
                margin-right: 4px;
              }
            }
            .right-block {
              display: flex;
              align-items: center;
              .search-input-desktop {
                width: 220px;
                height: 32px;
                margin-right: 8px;
                @media (max-width: 1200px) {
                  display: none;
                }
              }
              .search-input-tablet {
                display: none;
                @media (min-width: 992px) and (max-width: 1200px) {
                  display: flex;
                }
                width: 32px;
                height: 32px;
                background: #FFFFFF;
                border: 1px solid #DFDEED;
                border-radius: 6px;
                margin-right: 8px;
                cursor: pointer;
                img {
                  margin: auto;
                }
              }
              .icon-container {
                width: 32px;
                min-width: 32px;
                height: 32px;
                background: #EFEFF6;
                border-radius: 6px;
                display: flex;
                margin-right: 8px;
                cursor: pointer;
                img {
                  margin: auto;
                }
              }
              .set-filter {
                cursor: pointer;
              }
            }
          }
          .second-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-side {
              display: flex;
              align-items: center;
              .dropdown-wrapper {
                margin-right: 4px;
              }
              .calendar {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 112px;
                height: 30px;
                background: #FFFFFF;
                border: 1px solid #DFDEED;
                border-radius: 6px;
                cursor: pointer;
                margin-right: 4px;
                img {
                  margin-right: 7px;
                }
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 24px;
                text-transform: capitalize;
                color: #262541;
              }
            }
            .right-side {
              .free-pay-games {
                display: flex;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 20px;
                text-align: center;
                padding: 4px;
                width: 186px;
                height: 32px;
                border: 1px solid #F0F0F4;
                border-radius: 6px;
                position: relative;
                .grey-block {
                  position: absolute;
                  top: 4px;
                  background: #EFEFF6;
                  border-radius: 4px;
                  height: 23px;
                  width: 88px;
                  z-index: -1;
                  &.right {
                    transition: all 0.6s ease;
                    right: 4px;      
                  }
                  &.left {
                    transition: all 0.6s ease;
                    left: 4px;
                  }
                }
                .all, .free {
                  flex-basis: 50%;
                  user-select: none;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .search-block-mob {
          @media (min-width: 992px) {
            display: none;
          }
          .filters-block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .icon {
              display: flex;
              width: 36px;
              min-width: 36px;
              height: 36px;
              background: #FAFAFA;
              border-radius: 6px;
              img {
                margin: auto;
              }
            }
            .title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 13px;
              line-height: 20px;
              color: #262541;
            }
            .terms {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .sort-item {
              display: flex;
              width: 132px;
              min-width: 132px;
              @media (min-width: 768px) {
                width: 196px;
                min-width: 196px;
              }
              &:last-child {
                width: auto;
                min-width: auto;
              }
              .icon {
                margin-right: 4px;
              }
            }
            .calendar-block {
              .icon {
                width: 32px;
                min-width: 32px;
                height: 32px;
                @media (min-width: 768px) {
                  width: 36px;
                  min-width: 36px;
                  height: 36px;
                  background: #EFEFF6;
                }
              }
              .text {
                @media (max-width: 768px) {
                  display: none;
                }
              }
            }
          }
          .dates-block {
            .months {
              .wrapper {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 8px;
                .arrow {
                  display: flex;
                  width: 24px;
                  height: 24px;
                  background: #FAFAFA;
                  border-radius: 6px;
                  img {
                    margin: auto;
                  }
                }
                .main-part {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 24px;
                  text-align: center;
                  color: #262541;
                  margin: 0 16px;
                }
              }
            }
            .dates-wrapper {
              position: relative;
              height: 60px;
              overflow: hidden;
              .dates {
                position: absolute;
                top: 0;
                left: 0;
                margin-top: 8px;
                display: flex;
                align-items: flex-start;
                .week {
                  display: flex;
                  align-items: flex-start;
                  position: relative;
                  margin: 0 12px;
                  &:after {
                    content: '';
                    display: block;
                    width: 1px;
                    height: 12px;
                    background: #000;
                    position: absolute;
                    right: -12px;
                    top: 50%;
                    margin-top: -6px;
                  }
                  .date-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    min-width: 3px;
                    height: 51px;
                    border-radius: 4px 4px 0px 0px;
                    margin-right: 6px;
                    &:last-child {
                      margin: 0;
                    }
                    &.active {
                      background: #FFDAEA;
                      border-bottom: 2px solid #C3305C;
                      .day {
                        color: #C3305C;
                      }
                      .number {
                        font-weight: 500;
                        color: #C3305C;
                      }
                    }
                    .day {
                      font-family: 'Inter';
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 16px;
                      text-align: center;
                      color: #575775;
                    }
                    .number {
                      margin-top: 2px;
                      font-family: 'Inter';
                      font-style: normal;
                      font-weight: 400;
                      font-size: 13px;
                      line-height: 20px;
                      text-align: center;
                      color: #262541;
                    }
                  }
                }
              }
            }

          }
        }
        .cards-block {
          margin-top: 23px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .event-card {
            position: relative;
            padding: 20px 16px;
            isolation: isolate;
            width: 328px;
            background: #FFFFFF;
            box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
            border-radius: 6px;
            margin-bottom: 16px;
            @media (min-width: 1200px) and (max-width: 1400px) {
              width: 408px;
            }
            @media (min-width: 992px) and (max-width: 1199px) {
              width: 320px;
            }
            @media (min-width: 768px) and (max-width: 991px) {
              width: 344px;
            }
            @media (max-width: 768px) {
              width: 100%;
            }
            &:before {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 6px;
              background: linear-gradient(90.37deg, #4A7DEB -29.39%, #8978EE 37.85%, #D243C5 97.19%);
              border-radius: 6px 6px 0px 0px;
            }
            .address {
              &.desk-address {
                display: none;
                // @media (max-width: 992px) {
                //   display: none;
                // }
              }
              &.mob-address {
                // @media (max-width: 992px) {
                //   display: flex;
                // }
              }
              display: flex;
              background: #FAFAFA;
              padding: 0px 4px;
              margin-top: 4px;
              @media (max-width: 992px) {
                width: fit-content;
                margin-top: 8px;
              }
              img {
                margin-right: 5px;
              }
              p {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
                border-radius: 4px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
            .top-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .date {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                text-align: right;
                color: #262541;
              }
              .time {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                text-align: right;
                color: #4C4A82;
              }
              .left-side {
                display: flex;
                // width: 262px;
                // min-width: 262px;
                .card-icon {
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  min-width: 48px;
                  width: 48px;
                  height: 48px;
                  background: #EFEFF6;
                  border-radius: 4px;
                  margin-right: 8px
                }
                .text-block {
                  .title {
                    font-family: 'Exo 2';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 24px;
                    color: #262541;
                  }
                  .date-time-mob {
                    display: flex;
                    align-items: center;
                    margin-top: 4px;
                    .date {
                      margin-right: 12px;
                    }
                  }
                }
              }
              .right-side {
                display: none;
                // @media (max-width: 992px) {
                //   display: none;
                // }
              }
            }
            
            .main-text {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #393762;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-top: 12px;
            }
            .labels {
              display: flex;
              align-items: center;
              margin-top: 12px;
              .label {
                margin-right: 4px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
                padding: 0px 8px;
                border: 1px solid #EFEFF6;
                border-radius: 100px;
              }
            }
            .bottom-block {
              margin-top: 12px;
              border-top: 1px dashed #DFDEED;
              .top-line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 12px;
                .name {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 20px;
                  color: #393762;
                }
                .price {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                  line-height: 20px;
                  text-align: right;
                  color: #262541;
                }
              }
              .bottom-line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 8px;
                .left-side {
                  display: flex;
                  align-items: center;
                  .titles {
                    margin-right: 30px;
                  }
                  .titles, .date {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                  }
                  .players, .players-date {
                    color: #262541;
                  }
                  .visitors, .visitors-date {
                    color: #575775;
                  }
                }
                .right-side {

                }
              }
            }
          }
        }
        .my-events-block {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 23px;
          .my-event-card {
            padding: 12px;
            background: #FFFFFF;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            border: 1px solid #DFDEED;
            margin-bottom: 16px;
            width: 328px;
            @media (min-width: 1200px) and (max-width: 1400px) {
              width: 408px;
            }
            @media (min-width: 992px) and (max-width: 1199px) {
              width: 320px;
            }
            @media (min-width: 768px) and (max-width: 991px) {
              width: 344px;
            }
            @media (max-width: 768px) {
              width: 100%;
            }
            &.active {
              border: 1px solid #71BA12;
            }
            .left-block {
              display: flex;
              .col-1 {
                margin-right: 8px;
                min-width: 50px;
                .card-icon {
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  min-width: 48px;
                  width: 48px;
                  height: 48px;
                  background: #EFEFF6;
                  border-radius: 4px;
                }
              }
              .col-2 {
                width: 150px;
                @media (min-width: 1200px) and (max-width: 1400px) {
                  width: 230px;
                }
                @media (min-width: 992px) and (max-width: 1199px) {
                  width: 150px;
                }
                @media (min-width: 768px) and (max-width: 991px) {
                  width: 165px;
                }
                @media (max-width: 768px) {
                  width: 70%;
                }
                .title {
                  font-family: 'Exo 2';
                  font-style: normal;
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 24px;
                  color: #262541;
                }
                .address {
                  display: flex;
                  background: #FAFAFA;
                  padding: 0px 4px;
                  margin-top: 4px;
                  img {
                    margin-right: 5px;
                  }
                  p {
                    font-family: "Inter";
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    color: #575775;
                    border-radius: 4px;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  }
                }
                .labels {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  margin-top: 8px;
                  .label {
                    padding: 0px 8px;
                    border: 1px solid #EFEFF6;
                    border-radius: 100px;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    color: #575775;
                    margin-right: 4px;
                    margin-bottom: 4px;
                  }
                }
              }
            }
            .right-block {
              .col-3 {
                min-width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .state {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 13px;
                  line-height: 20px;
                  text-align: center;
                  padding: 0px 4px;
                  border-radius: 4px;
                  background: #EFEFF6;
                  color:  #262541;
                  width: fit-content;
                  &.active {
                    background: #71BA12;
                    color:  #fff;
                  }
                }
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  text-align: right;
                  color: #262541;
                  margin-top: 12px;
                  margin-bottom: 4px;
                }
                .time {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  text-align: right;
                  color: #4C4A82;
                }
              }
            }
          }
        }
      }
    }
    .right-sidebar {
      @media (max-width: 992px) {
        display: none;
      }
      .title-block {
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: #262541;
        }
        .subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
        }
      }
      .cards-block {
        margin-top: 20px;
        .card {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #DFDEED;
          border-radius: 6px;
          padding: 10px 12px;
          margin-bottom: 16px;
          .close {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
            cursor: pointer;
          }
          .top-line {
            display: flex;
            align-items: center;
            .text-data {
              margin-left: 8px;
              .name {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 16px;
                color: #262541;
              }
              .bottom-line {
                display: flex;
                align-items: center;
                margin-top: 4px;
                .time {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  text-align: right;
                  color: #575775;
                  margin-right: 21px;
                }
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 16px;
                  text-align: right;
                  color: #262541;
                }
              }
            }
          }
          .address {
            display: flex;
            background: #FAFAFA;
            padding: 0px 4px;
            margin-top: 4px;
            img {
              margin-right: 5px;
            }
            p {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              border-radius: 4px;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
          .labels {
            display: flex;
            align-items: center;
            margin-top: 12px;
            .label {
              margin-right: 4px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              padding: 0px 8px;
              border: 1px solid #EFEFF6;
              border-radius: 100px;
            }
          }
        }
      }
    }
  }
</style>