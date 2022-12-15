<template>
  <div class="b-user-card">
    <div class="b-user-card__top-table">
      <div class="b-user-card__top-part">
        <div class="b-user-card__picture-block">
          <div class="b-user-card__profile-picture">
            <img src="../assets/img/user-photo.png" alt="" />
          </div>
        </div>
        <div class="b-user-card__text-block">
          <div class="b-user-card__name-line-wrapper">
            <div class="b-user-card__user-name">
              {{ userData.name }}
              {{ userData.last_name }}
            </div>
          </div>
          <div class="b-user-card__labels">
            <div
              v-for="label in labels"
              :key="label"
              class="b-user-card__label"
            >
              <span v-if="label">
                # {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-user-card__tabs-block">
      <div class="b-user-card__tab-titles">
        <div
          v-for="item in mockData.tabTitles"
          :key="item.id"
          class="b-user-card__tab-title"
          :style="{
            'flex-basis': item.width,
            'margin-right': item.id !== 2 ? '4px' : 0,
            background: currentTab === item.id ? '#FFFFFF' : '#F9F9FC',
            color: currentTab === item.id ? '#262541' : '#575775',
            'font-weight': currentTab === item.id ? 500 : 400,
          }"
          @click="changeUserTab(item.id)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="b-user-card__main-tab-body">
        <div v-show="currentTab === 0" class="b-user-card__tab-body">
          <div v-if="isEditMode" class="b-user-card__name-line">
            <div class="b-user-card__input-surname">
              <InputComponent
                :outside-title="true"
                :title="$t('profile.surname')"
                :height="40"
                :title-width="0"
                name="last_name"
              />
            </div>
            <div class="b-user-card__input-name">
              <InputComponent
                :outside-title="true"
                :title="$t('profile.name')"
                :height="40"
                :title-width="0"
                name="name"
              />
            </div>
          </div>
          <div class="b-user-card__textarea-line">
            <div v-if="!isEditMode" class="b-user-card__about-me">
              {{ userData.about_me }}
              <div class="b-user-card__title">{{ $t('profile.about-myself') }}</div>
            </div>
            <TextAreaComponent
              v-else
              :height="88"
              :title="$t('profile.words-about-myself')"
              name="about_me"
            />
          </div>
          <div class="b-user-card__birthday-line">
            <div v-if="!isEditMode" class="b-user-card__birth-date">
              {{ birthDate }}
              <div class="b-user-card__title">
                {{ $t('profile.birth-date') }}
              </div>
            </div>
            <div v-else class="b-user-card__dropdowns">
              <div class="b-user-card__dropdown-days">
                <Dropdown
                  :main-title="$t('profile.day')"
                  :options="mockData.days"
                  name="day"
                />
              </div>
              <div class="b-user-card__dropdown-months">
                <Dropdown
                  :main-title="$t('profile.month')"
                  :options="mockData.months"
                  name="month"
                />
              </div>
              <div class="b-user-card__dropdown-years">
                <Dropdown
                  :main-title="$t('profile.year')"
                  :options="mockData.years"
                  name="year"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-show="currentTab === 1" class="b-user-card__tab-body">
          <div class="b-user-card__body-features">
            <div class="b-user-card__height">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.height }} 
                  {{$t('profile.sm')}}
                </div>
                <div class="b-user-card__title">{{$t('profile.height')}}</div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="$t('profile.height')"
                :height="40"
                :title-width="0"
                name="height"
              />
            </div>
            <div class="b-user-card__weight">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.weight }} 
                  {{ $t('profile.kg') }}
                </div>
                <div class="b-user-card__title">
                  {{ $t('profile.weight') }}
                </div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="$t('profile.weight')"
                :height="40"
                :title-width="0"
                name="weight"
              />
            </div>
            <div class="b-user-card__main-leg">
              <div
                v-if="!isEditMode && userData.working_leg"
                class="b-user-card__to-show"
              >
                <div class="b-user-card__data">
                  {{ userData.working_leg }}
                </div>
                <div class="b-user-card__title">{{$t('profile.main-leg')}}</div>
              </div>
              <div 
                v-if="isEditMode"
                class="b-user-card__dropdown-main-leg"
              >
                <Dropdown
                  :main-title="$t('profile.main-leg')"
                  :options="mockData.mainLag"
                  name="working_leg"
                />
              </div>
            </div>
          </div>
          <div class="b-user-card__position">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{ userData.position }}
              </div>
              <div class="b-user-card__title">
                {{ $t('profile.game-position') }}
              </div>
            </div>
            <Dropdown
              v-else
              :outside-title="true"
              :main-title="$t('profile.game-position')"
              :options="mockData.position"
              :width="200"
              :height="40"
              display-name="value"
              display-value="value"
              name="position"
            />
          </div>
        </div>

        <div v-if="currentTab === 2" class="b-user-card__tab-body">
          <div class="b-user-card__phone">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{ phone }}
              </div>
              <div class="b-user-card__title">
                {{ $t('profile.phone') }}
              </div>
            </div>
            <InputComponent
              v-else
              :title="$t('profile.phone')"
              :placeholder="phone"
              :title-width="0"
              :outside-title="true"
              :height="40"
              name="phone"
            />
          </div>
          <!-- <div class="b-user-card__area-line">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{userData.location}}
              </div>
              <div class="b-user-card__title">
                Місце знаходження
              </div>
            </div>
            <div v-else class="b-user-card__dropdowns">
              <Dropdown
                :outside-title="true"
                :main-title="'Місто'"
                :options="mockData.cities"
                :width="176"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
              <Dropdown
                :outside-title="true"
                :main-title="'Район'"
                :options="mockData.district"
                :width="216"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

import InputComponent from './forms/InputComponent.vue'
import TextAreaComponent from '../components/TextAreaComponent.vue'
import Dropdown from './forms/Dropdown.vue'

import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg'
import tick from '../assets/img/tick.svg'
import edit from '../assets/img/edit.svg'

import { API } from "../workers/api-worker/api.worker"
import CONSTANTS from "../consts"

export default {
  name: 'UserDetailsCard',
  components: {
    InputComponent,
    Dropdown,
    TextAreaComponent
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
    phone: {
      type: String,
      default: '',
    },
    isEditMode: {
      type: Boolean,
      default: false,
    }
  },
  emits: [],
  setup(props, context) {
    const currentTab = ref(0)

    const labels = ref([
      props.userData.age ? `${props.userData.age} років` : null ,
      props.userData.gender ,
      props.userData.role ,
      props.userData.position
    ])

    const mockData = computed(() => {
      return {
        monthFromNumber: CONSTANTS.users_page.months.monthFromNumber,
        numberFromMonth: CONSTANTS.users_page.months.numberFromMonth,
        tabTitles: CONSTANTS.profile.tabTitles,
        labels: CONSTANTS.profile.labels,
        days: CONSTANTS.dates.days,
        months: CONSTANTS.dates.months,
        years: CONSTANTS.dates.years,
        mainLag: CONSTANTS.profile.mainLeg,
        cities: CONSTANTS.profile.cities,
        district: CONSTANTS.profile.district,
        position: CONSTANTS.profile.position
      }
    })

    const icons = computed(() => {
      return {
        sortIcon: sortArrowHorizontally,
        tickIcon: tick,
        editIcon: edit,
      }
    })

    const birthDate = computed(() => {
      return `${dayjs(props.userData.birthday)
        .locale(dayjsUkrLocale)
        .format('D MMMM YYYY')} p.`
    })

    function changeUserTab(id) {
      currentTab.value = id
    }

    return {
      changeUserTab,
      currentTab,
      icons,
      birthDate,
      mockData,
      labels
    }
  }
}
</script>

<style lang="scss" scoped>
.b-user-card {
  padding: 20px 16px;
  background: #eeeef3;
  border-radius: 8px;
  height: fit-content;
  @media (min-width: 1400px) {
    margin-right: 16px;
  }
  @media (min-width: 992px) {
    width: 464px;
    min-width: 464px;
  }
  @media (max-width: 992px) {
    width: 100%;
    min-width: 100%;
    order: 1;
    margin-bottom: 10px;
    margin-right: 0;
  }
  .b-user-card__top-table {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px 16px;
    margin-bottom: 16px;
    .b-user-card__top-part {
      display: flex;
      .b-user-card__profile-picture {
        position: relative;
        margin-right: 12px;
        img {
          display: block;
        }
      }
      .b-user-card__text-block {
        flex-basis: 100%;
        .b-user-card__name-line-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .b-user-card__user-name {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #262541;
            margin-bottom: 8px;
          }
          img {
            cursor: pointer;
          }
        }
        .b-user-card__labels {
          display: flex;
          flex-wrap: wrap;
          .b-user-card__label {
            span {
              display: block;
              margin-top: 4px;
              margin-right: 4px;
              background: #148581;
              border-radius: 100px;
              padding: 0 8px;
              height: 20px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .b-user-card__tabs-block {
    .b-user-card__tab-titles {
      display: flex;
      justify-content: space-between;
      .b-user-card__tab-title {
        border-radius: 4px 4px 0px 0px;
        padding: 8px 0;
        padding-left: 16px;
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .b-user-card__main-tab-body {
      padding: 24px 16px;
      background: #fff;
      .b-user-card__tab-body {
        .b-user-card__to-show {
          .b-user-card__data {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            color: #262541;
          }
          .b-user-card__title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
          }
        }
        .b-user-card__name-line {
          display: flex;
          justify-content: space-between;
          .b-user-card__input-surname,
          .b-user-card__input-name {
            width: 196px;
          }
          margin-bottom: 16px;
        }
        .b-user-card__textarea-line {
          .b-user-card__about-me {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
            .b-user-card__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              margin-top: 4px;
            }
          }
        }
        .b-user-card__birthday-line {
          padding-top: 12px;
          margin-top: 12px;
          border-top: 1px solid #efeff6;
          .b-user-card__birth-date {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
            .b-user-card__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
            }
          }
          .b-user-card__dropdowns {
            display: flex;
            justify-content: space-between;
            .b-user-card__dropdown-days {
              width: 96px;
            }
            .b-user-card__dropdown-months {
              width: 168px;
            }
            .b-user-card__dropdown-years {
              width: 120px;
            }
          }
        }
        .b-user-card__body-features {
          display: flex;
          justify-content: space-between;
          .b-user-card__height,
          .b-user-card__weight {
            width: 92px;
          }
          .b-user-card__main-leg {
            .b-user-card__dropdown-main-leg {
              width: 200px;
              ::v-deep {
                .vs__dropdown-toggle {
                  height: 40px;
                }
              }
            }
          }
        }
        .b-user-card__position {
          margin-top: 16px;
        }
        .b-user-card__area-line {
          margin-top: 16px;
          .b-user-card__dropdowns {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>