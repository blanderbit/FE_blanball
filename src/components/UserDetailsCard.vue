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
              {{userData.name}}
              {{userData.surname}}
            </div>
            <img 
              :src="isEditMode ? icons.tickIcon : icons.editIcon"
              @click="toggleEditMode"
              alt=""
            >
          </div>
          <div class="b-user-card__labels">
            <div 
              v-for="label in labels" 
              :key="label" 
              class="b-user-card__label"
            >
              # {{ label.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-user-card__tabs-block">
      <div class="b-user-card__tab-titles">
        <div
          v-for="item in tabTitles"
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
        <div 
          v-if="currentTab === 0" 
          class="b-user-card__tab-body"
        >
          <div v-if="isEditMode" class="b-user-card__name-line">
            <div class="b-user-card__input-surname">
              <InputComponent
                :outside-title="true"
                :title="'Прізвище'"
                :height="40"
                :placeholder="userData.surname"
                :title-width="0"
              />
            </div>
            <div class="b-user-card__input-name">
              <InputComponent
                :outside-title="true"
                :title="`Ім'я`"
                :height="40"
                :placeholder="userData.name"
                :title-width="0"
              />
            </div>
          </div>
          <div class="b-user-card__textarea-line">
            <div v-if="!isEditMode" class="b-user-card__about-me">
              {{userData.about}}
              <div class="b-user-card__title">
                Про себе
              </div>
            </div>
            <TextAreaComponent
              v-else
              :height="88"
              :placeholder="userData.about"
              :title="'Декілька слів про себе'"
            />
          </div>
          <div class="b-user-card__birthday-line">
            <div v-if="!isEditMode" class="b-user-card__birth-date">
              {{userData.birth_date}}
              <div class="b-user-card__title">
                Дата народження
              </div>
            </div>
            <div v-else class="b-user-card__dropdowns">
              <Dropdown
                :outside-title="true"
                :main-title="'Вид спорту'"
                :options="days"
                :width="96"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
              <Dropdown
                :outside-title="true"
                :main-title="'Вид спорту'"
                :options="months"
                :width="168"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
              <Dropdown
                :outside-title="true"
                :main-title="'Вид спорту'"
                :options="years"
                :width="120"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
            </div>
          </div>
        </div>
        <div v-if="currentTab === 1" class="b-user-card__tab-body">
          <div class="b-user-card__body-features">
            <div class="b-user-card__height">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{userData.height}} см
                </div>
                <div class="b-user-card__title">
                  Зріст
                </div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="'Зріст'"
                :height="40"
                :placeholder="'168 см'"
                :title-width="0"
              />
            </div>
            <div class="b-user-card__weight">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{userData.weight}} кг
                </div>
                <div class="b-user-card__title">
                  Вага
                </div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="`Вага`"
                :height="40"
                :placeholder="'48 кг'"
                :title-width="0"
              />
            </div>
            <div class="b-user-card__main-leg">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{userData.main_leg}}
                </div>
                <div class="b-user-card__title">
                  Ударна нога
                </div>
              </div>
              <Dropdown
                v-else
                :outside-title="true"
                :main-title="'Ударна нога'"
                :options="mainLag"
                :width="200"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
            </div>
          </div>
          <div class="b-user-card__position">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{userData.position}}
              </div>
              <div class="b-user-card__title">
                Ігрова позиція
              </div>
            </div>
            <InputComponent
              v-else
              :title="'Ігрова позиція'"
              :placeholder="'Правий напівзахисник'"
              :title-width="0"
              :outside-title="true"
              :hasIcon="true"
              :height="40"
              :icon="[icons.sortIcon]"
            />
          </div>
        </div>
        <div v-if="currentTab === 2" class="b-user-card__tab-body">
          <div class="b-user-card__phone">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{userData.phone}}
              </div>
              <div class="b-user-card__title">
                Телефон
              </div>
            </div>
            <InputComponent
              v-else
              :title="'Телефон'"
              :placeholder="'+380 (95) 390 86 50'"
              :title-width="0"
              :outside-title="true"
              :height="40"
            />
          </div>
          <div class="b-user-card__area-line">
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
                :options="cities"
                :width="176"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
              <Dropdown
                :outside-title="true"
                :main-title="'Район'"
                :options="district"
                :width="216"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import InputComponent from '../components/InputComponent.vue'
import TextAreaComponent from '../components/TextAreaComponent.vue'
import Dropdown from '../components/Dropdown.vue'

import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg'
import tick from '../assets/img/tick.svg'
import edit from '../assets/img/edit.svg'

export default {
  name: 'UserDetailsCard',
  components: {
    InputComponent,
    Dropdown,
    TextAreaComponent
  },
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    tabTitles: {
      type: Array,
      default: () => []
    },
    days: {
      type: Array,
      default: () => []
    },
    months: {
      type: Array,
      default: () => []
    },
    years: {
      type: Array,
      default: () => []
    },
    mainLag: {
      type: Array,
      default: () => []
    },
    cities: {
      type: Array,
      default: () => []
    },
    district: {
      type: Array,
      default: () => []
    },
    userData: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const currentTab = ref(0)
    const isEditMode = ref(false)

    const icons = computed(() => {
      return {
        sortIcon: sortArrowHorizontally,
        tickIcon: tick,
        editIcon: edit
      }
    })

    function changeUserTab(id) {
      currentTab.value = id
    }
    function toggleEditMode() {
      isEditMode.value = !isEditMode.value
    }

    return {
      currentTab,
      changeUserTab,
      icons,
      isEditMode,
      toggleEditMode
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
            border-top: 1px solid #EFEFF6;
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
            }
          }
          .b-user-card__body-features {
            display: flex;
            justify-content: space-between;
            .b-user-card__height, .b-user-card__weight {
              width: 92px;
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