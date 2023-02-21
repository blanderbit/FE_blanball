<template>
  <div class="events-page">
    <div class="main-body">
      <div class="header-block">
        <div class="left-part">
          <div class="title">{{ $t('users.title') }}</div>
        </div>
        <div class="right-part">
          <div class="search-input-desktop">
            <InputComponent
              :title-width="0"
              :placeholder="$t('users.users-search')"
              :icon="SearchIcon"
            />
          </div>
        </div>
      </div>
      <div class="tab-block-wrapper">
        <div class="tab-block">
          <nuxt-link
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-element', { active: tab.isActive }]"
            :to="tab.url"
            @click="changeTab(tab.id)"
          >
            <img :src="tab.img" :alt="tab.name" />
            {{ $t('users.' + tab.name) }}
          </nuxt-link>
        </div>
      </div>
      <div class="main-search-block">
        <div class="search-block">
          <div class="first-line">
            <div class="left-block">
              <div class="radio-btn-wrapper">
                <div class="radio">
                  <input
                    id="radio-1"
                    v-model="eventData.gender"
                    name="radio"
                    type="radio"
                    :value="$t('users.men')"
                    checked
                  />
                  <label for="radio-1" class="radio-label">
                    <img src="../../../assets/img/male-icon.svg" alt="" />
                    {{ $t('users.men') }}
                  </label>
                </div>
                <div class="radio">
                  <input
                    id="radio-2"
                    v-model="eventData.gender"
                    name="radio"
                    type="radio"
                    :value="$t('users.women')"
                  />
                  <label for="radio-2" class="radio-label">
                    <img src="../../../assets/img/female-icon.svg" alt="" />
                    {{ $t('users.women') }}
                  </label>
                </div>
                <div class="radio">
                  <input
                    id="radio-3"
                    v-model="eventData.gender"
                    name="radio"
                    type="radio"
                    :value="$t('users.all')"
                  />
                  <label for="radio-3" class="radio-label">
                    <img src="../../../assets/img/unisex.svg" alt="" />
                    {{ $t('users.all') }}
                  </label>
                </div>
              </div>
            </div>
            <div class="middle-block">
              <img src="../../../assets/img/address-icon.svg" alt="" />
              <div class="address">35 West Fork Street, Missoula</div>
            </div>
            <div class="right-block">
              <div class="old-new-filter">
                <img src="../../../assets/img/sort-arrows.svg" alt="" />
                <div class="text-block">
                  {{ $t('users.sorting') }}
                  <span>{{ $t('users.new-first') }}</span>
                </div>
              </div>
              <div class="search-input-tablet">
                <img src="../../../assets/img/search.svg" alt="" />
              </div>
              <div class="icon-container">
                <img src="../../../assets/img/clear-filter.svg" alt="" />
              </div>
              <div class="icon-container">
                <img
                  class="set-filter"
                  src="../../../assets/img/set-filter.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="search-block-mob">
          <div class="filters-block">
            <div class="sorting-block sort-item">
              <div class="icon">
                <img src="../../../assets/img/sort-arrows.svg" alt="" />
              </div>
              <div class="text">
                <div class="title">{{ $t('events.sorting') }}</div>
                <div class="terms">{{ $t('events.first-new') }}</div>
              </div>
            </div>
            <div class="filtering-block sort-item">
              <div class="icon">
                <img src="../../../assets/img/set-filter.svg" alt="" />
              </div>
              <div class="text">
                <div class="title">{{ $t('events.filters') }}</div>
                <div class="terms">
                  {{ $t('events.found') }} 15 {{ $t('events.advertisments') }}
                </div>
              </div>
            </div>
            <div class="calendar-block sort-item">
              <div class="icon">
                <img src="../../../assets/img/calendar.svg" alt="" />
              </div>
              <div class="text">
                <div class="title">{{ $t('events.chose-date') }}</div>
                <div class="terms">19, 23 черв. 2022</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      teams
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
              <img src="../../../assets/img/hands-shake.svg" alt="" />
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
            <img src="../../../assets/img/location-point.svg" alt="" />
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
              <img src="../../../assets/img/hands-shake.svg" alt="" />
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
            <img src="../../../assets/img/location-point.svg" alt="" />
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
              <img src="../../../assets/img/hands-shake.svg" alt="" />
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
            <img src="../../../assets/img/location-point.svg" alt="" />
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
              <img src="../../../assets/img/hands-shake.svg" alt="" />
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
            <img src="../../../assets/img/location-point.svg" alt="" />
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
import InputComponent from '../../../components/forms/InputComponent.vue'

import SearchIcon from '../../../assets/img/search.svg'

export default {
  name: 'RatingPage',
  components: {
    InputComponent,
  },
  data() {
    return {
      eventData: {
        gender: '',
      },
      tabs: [
        {
          id: 0,
          name: 'general',
          img: '../../../assets/img/members.svg',
          url: '/users/general',
          isActive: false,
        },
        {
          id: 1,
          name: 'players',
          img: '../../../assets/img/runner.svg',
          url: '/users/players',
          isActive: false,
        },
        {
          id: 2,
          name: 'trainers',
          img: '../../../assets/img/ball.svg',
          url: '/users/trainers',
          isActive: false,
        },
        {
          id: 3,
          name: 'referee',
          img: '../../../assets/img/timer.svg',
          url: '/users/referee',
          isActive: false,
        },
        {
          id: 4,
          name: 'teams',
          img: '../../../assets/img/t-shirt.svg',
          url: '/users/teams',
          isActive: true,
        },
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
            { id: 6, day: 'Вс', number: 19, isActive: true },
          ],
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
            { id: 6, day: 'Вс', number: 26, isActive: false },
          ],
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
            { id: 6, day: 'Вс', number: 2, isActive: false },
          ],
        },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/mixins/device.scss';

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
        .search-input-desktop {
          width: 220px;
          height: 32px;
          margin-right: 8px;
          @media (max-width: 1200px) {
            display: none;
          }
        }
      }
    }
    .tab-block-wrapper {
      @include mobile {
        height: 36px;
        position: relative;
        overflow-x: scroll;
        margin-top: 24px;
      }
      .tab-block {
        display: flex;
        border-bottom: 1px solid #dfdeed;
        margin-top: 28px;
        @include mobile {
          position: absolute;
          margin-top: 0;
        }
        .tab-element {
          display: flex;
          align-items: center;
          margin-right: 24px;
          padding-bottom: 12px;
          text-decoration: none;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          color: #262541;
          user-select: none;
          img {
            margin-right: 8px;
          }
          &.active {
            border-bottom: 2px solid #262541;
          }
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
            .radio-btn-wrapper {
              $color1: #f4f4f4;
              $color2: #148783;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .radio {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 6px 12px;
                background: #ffffff;
                border: 1px solid #dfdeed;
                border-radius: 6px;
                margin-right: 8px;
                input[type='radio'] {
                  position: absolute;
                  opacity: 0;
                  + .radio-label {
                    display: flex;
                    align-items: center;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 24px;
                    text-transform: capitalize;
                    color: #262541;
                    img {
                      margin-right: 4px;
                    }
                    &:after {
                      content: '';
                      border-radius: 100%;
                      border: 1px solid #262541;
                      display: inline-block;
                      width: 13px;
                      height: 13px;
                      position: relative;
                      top: 0px;
                      margin-left: 12px;
                      vertical-align: top;
                      cursor: pointer;
                      text-align: center;
                      transition: all 250ms ease;
                    }
                  }
                  &:checked {
                    + .radio-label {
                      &:after {
                        border: 1px solid $color2;
                        background-color: $color2;
                        box-shadow: inset 0 0 0 3px $color1;
                      }
                    }
                  }
                  &:focus {
                    + .radio-label {
                      &:before {
                        outline: none;
                        border-color: $color2;
                      }
                    }
                  }
                  &:disabled {
                    + .radio-label {
                      &:before {
                        box-shadow: inset 0 0 0 4px $color1;
                        border-color: darken($color1, 25%);
                        background: darken($color1, 25%);
                      }
                    }
                  }
                  + .radio-label {
                    &:empty {
                      &:before {
                        margin-right: 0;
                      }
                    }
                  }
                }
              }
            }
          }
          .middle-block {
            display: flex;
            align-items: center;
            border-bottom: 1px dashed #262541;
            img {
              margin-right: 7px;
            }
            .address {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #262541;
            }
          }
          .right-block {
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
              span {
                display: block;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
              }
              img {
                margin-right: 6px;
              }
            }
            .search-input-tablet {
              display: none;
              @media (min-width: 992px) and (max-width: 1200px) {
                display: flex;
              }
              width: 32px;
              height: 32px;
              background: #ffffff;
              border: 1px solid #dfdeed;
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
              background: #efeff6;
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
            background: #fafafa;
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
                background: #efeff6;
              }
            }
            .text {
              @media (max-width: 768px) {
                display: none;
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
          background: #ffffff;
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
            background: linear-gradient(
              90.37deg,
              #4a7deb -29.39%,
              #8978ee 37.85%,
              #d243c5 97.19%
            );
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
            background: #fafafa;
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
              color: #4c4a82;
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
                background: #efeff6;
                border-radius: 4px;
                margin-right: 8px;
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
              border: 1px solid #efeff6;
              border-radius: 100px;
            }
          }
          .bottom-block {
            margin-top: 12px;
            border-top: 1px dashed #dfdeed;
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
                .titles,
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                }
                .players,
                .players-date {
                  color: #262541;
                }
                .visitors,
                .visitors-date {
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
          background: #ffffff;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          border: 1px solid #dfdeed;
          margin-bottom: 16px;
          width: 328px;
          @media (min-width: 1200px) and (max-width: 1400px) {
            width: 408px;
          }
          @media (min-width: 992px) and (max-width: 1200px) {
            width: 320px;
          }
          @media (min-width: 768px) and (max-width: 991px) {
            width: 344px;
          }
          @media (max-width: 768px) {
            width: 100%;
          }
          &.active {
            border: 1px solid #71ba12;
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
                background: #efeff6;
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
                background: #fafafa;
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
                flex-wrap: wrap;
                margin-top: 8px;
                .label {
                  padding: 0px 8px;
                  border: 1px solid #efeff6;
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
                background: #efeff6;
                color: #262541;
                width: fit-content;
                &.active {
                  background: #71ba12;
                  color: #fff;
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
                color: #4c4a82;
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
        background: #ffffff;
        border: 1px solid #dfdeed;
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
          background: #fafafa;
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
            border: 1px solid #efeff6;
            border-radius: 100px;
          }
        }
      }
    }
  }
}
</style>
