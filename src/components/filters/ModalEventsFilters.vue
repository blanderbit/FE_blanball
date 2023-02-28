<template>
  <Transition>
    <ModalWindow
      :is-title-shown="false"
      :window-width="332"
      @close-modal="$emit('closeModal')"
    >
      <template #modal-filter>
        <div class="b-modal-filters">
          <div class="b-modal-filters__title">
            {{ $t('users.filters') }}
          </div>
          <div class="b-modal-filters__subtitle">
            {{ $t('users.found') }} 15 {{ $t('users.advertisments') }}
          </div>
          <div class="b-modal-filters__game-type-input">
            <Dropdown
              :check-value-immediate="true"
              :options="sportTypeDropdown"
              :placeholder="$t('events.game-type')"
              display-name="name"
              display-value="value"
              v-model="gameTypeData"
              name="position"
            />
          </div>
          <div class="b-modal-filters__game-search-input">
            <InputComponent
              :placeholder="'Введіть ключові слова'"
              v-model="searchData"
              :title-width="0"
              :height="38"
              name="change_email"
            />
          </div>
          <div class="b-modal-filters__gender">
            <RadioGenderBox v-model:gender="genderData" />
          </div>
          <div class="b-modal-filters__status-event">
            <Dropdown
              :check-value-immediate="true"
              :options="statusDropdown"
              :placeholder="$t('events.event-status')"
              :height="32"
              display-value="value"
              display-name="name"
              v-model="gameStatusData"
            />
          </div>
          <div class="b-modal-filters__location">
            <ModalPositionMap v-model="locationData"></ModalPositionMap>
          </div>
          <div class="b-modal-filters__calendar">
            <img src="../../assets/img/calendar.svg" alt="" />
            <v-date-picker
              locale="ukr"
              :model-config="calendar.modelConfig"
              v-model="dateAndTimeData"
              is-range
            >
              <template v-slot="options">
                <div class="flex justify-center items-center">
                  <input
                    :value="options.inputValue.start"
                    v-on="options.inputEvents.start"
                    class="input-left border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                  />
                  -
                  <input
                    :value="options.inputValue.end"
                    v-on="options.inputEvents.end"
                    class="input-right border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                  />
                </div>
              </template>
            </v-date-picker>
          </div>
          <div class="b-modal-filters__btns-block">
            <div class="b-modal-filters__cancel-btn" @click="clearAllData">
              {{ $t('buttons.clear') }}
            </div>
            <GreenBtn
              :text="$t('buttons.apply')"
              :icon="icon"
              :width="140"
              @click-function="setFilters"
            />
          </div>
        </div>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref, watch } from 'vue'

import ModalWindow from '../ModalWindows/ModalWindow.vue'
import Dropdown from '../forms/Dropdown.vue'
import GreenBtn from '../GreenBtn.vue'
import RadioGenderBox from './components/RadioGenderBox.vue'
import ModalPositionMap from '../maps/ModalPositionMap.vue'
import ClearFilters from './components/ClearFilters.vue'
import InputComponent from '../forms/InputComponent.vue'

import CONSTANTS from '../../consts/index'

import tickIcon from '../../assets/img/tick-white.svg'

export default {
  name: 'ModalUsersFilters',
  components: {
    ModalWindow,
    GreenBtn,
    Dropdown,
    RadioGenderBox,
    ClearFilters,
    ModalPositionMap,
    InputComponent,
  },
  props: {
    dropdownGameType: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    location: {
      type: Object,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    dateAndTime: {
      type: Object,
      default: () => {},
    },
  },
  emits: [
    'closeModal',
    'setModalWindowFilters',
    'clearFilters',
    'update:dropdownGameType',
    'update:gender',
    'update:status',
    'update:location',
    'update:dateAndTime',
    'update:search'
  ],
  setup(props, { emit }) {
    const gameTypeData = ref(props.dropdownGameType)
    const gameStatusData = ref(props.status)
    const genderData = ref(props.gender)
    const searchData = ref(props.search)
    const locationData = ref(props.location)
    const dateAndTimeData = ref(props.dateAndTime)

    const sportTypeDropdown = CONSTANTS.event_page.sport_type_dropdown
    const statusDropdown = CONSTANTS.event_page.status_ropdown

    const icon = computed(() => tickIcon)

    const calendar = ref({
      inputMask: 'YYYY-MM-DD',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    })

    watch(
      () => genderData.value,
      (newVal) => {
        emit('update:gender', newVal)
      }
    )
    watch(
      () => gameTypeData.value,
      (newVal) => {
        emit('update:dropdownGameType', newVal)
      }
    )
    watch(
      () => searchData.value,
      (newVal) => {
        emit('update:search', newVal)
      }
    )
    watch(
      () => gameStatusData.value,
      (newVal) => {
        emit('update:status', newVal)
      }
    )
    watch(
      () => locationData.value,
      (newVal) => {
        emit('update:location', newVal)
      }
    )
    watch(
      () => dateAndTimeData.value,
      (newVal) => {
        emit('update:dateAndTime', newVal)
      }
    )

    function setFilters() {
      emit('setModalWindowFilters')
      emit('closeModal')
    }
    function clearAllData() {
      emit('clearFilters')
      emit('closeModal')
      gameStatusData.value = ''
      gameTypeData.value = ''
      searchData.value = ''
      locationData.value = {}
      genderData.value = ''
      dateAndTimeData.value = {
        start: '', 
        end: ''
      }
    }

    return {
      setFilters,
      clearAllData,
      statusDropdown,
      sportTypeDropdown,
      icon,
      gameStatusData,
      gameTypeData,
      searchData,
      locationData,
      genderData,
      dateAndTimeData,
      calendar,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-modal-filters {
  &__title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: $--b-main-black-color;
  }
  &__subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #575775;
    margin-bottom: 16px;
  }
  &__calendar {
    margin-top: 12px;
    margin-right: 4px;
    border: 1px solid #dfdeed;
    border-radius: 6px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 13px;
    input {
      height: 32px;
      width: 100px;
      padding: 4px 12px;
      background: #ffffff;
      border-radius: 6px;
      outline: none;
    }
    .input-left {
      border-radius: 6px 0 0 6px;
      border: transparent;
    }
    .input-right {
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      border-radius: 0 6px 6px 0;
    }
    img {
      display: inline;
    }
    &:deep .vc-popover-content-wrapper {
      .vc-popover-content {
        .vc-pane {
          .vc-header {
            width: 160px;
            padding: 17px 16px 0;
            .vc-title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              text-align: center;
              color: #808181;
            }
          }
          .vc-weeks {
            .vc-weekday {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              line-height: 16px;
              text-align: center;
              color: #0a3435;
            }
            .vc-day {
              span {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 16px;
                text-align: center;
                color: #0a3435;
                &:hover {
                  background-color: transparent;
                }
              }
              .vc-highlights {
                & + span {
                  color: #148783 !important;
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400 !important;
                  font-size: 14px;
                  line-height: 16px;
                  text-align: center;
                }
                .vc-day-layer {
                  .vc-highlight {
                    background: #e9fcfb !important;
                    border-radius: 6px !important;
                  }
                  .vc-highlight.vc-highlight-base-start {
                    background: #e9fcfb !important;
                  }
                  .vc-highlight.vc-highlight-base-middle {
                    background: #e9fcfb !important;
                  }
                  .vc-highlight.vc-highlight-base-end {
                    background: #e9fcfb !important;
                  }
                }
              }
            }
          }
        }
        .vc-arrows-container {
          width: 160px;
          .is-left {
            width: 12px;
          }
          .is-right {
            width: 12px;
          }
        }
      }
    }
  }
  .b-modal-filters__game-search-input {
    margin-bottom: 10px;
  }

  &__game-type-input {
    width: 100%;
    height: 40px;
    margin-bottom: 12px;
  }
  &__gender {
    margin-bottom: 12px;
  }
  &__status-event {
    margin-bottom: 12px;
  }
  &__btns-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    .b-modal-filters__cancel-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: $--b-main-black-color;
      padding: 4px 12px;
      cursor: pointer;
    }
  }
}
</style>
