<template>
  <div class="b-event-m-1st" :style="stepStyle">
    <Dropdown
      style="margin-top: 10px;"
      :outside-title="true"
      :main-title="$t('events.event-type')"
      :placeholder="$t('events.event-type')"
      :disabled="true"
      display-name="name"
      display-value="value"
      :width="320"
      :height="40"
      name="type"
    />
    <div class="b-event-m-1st__title mt-3 mb-2">
      {{ $t('events.gender') }}
    </div>
    <div class="b-event-m-1st__radio-btn-wrapper">
      <div class="radio-cover">
        <radio-button
          name="gender"
          :title="$t('events.Man')"
          value="Man"
          :width="'auto'"
        ></radio-button>
      </div>
      <div class="radio-cover">
        <radio-button
          name="gender"
          :title="$t('events.Woman')"
          value="Woman"
          :width="'auto'"
        ></radio-button>
      </div>
      <div class="radio-cover">
        <radio-button
          name="gender"
          :title="$t('events.all')"
          value="All"
          :width="'auto'"
        ></radio-button>
      </div>
    </div>
    <div class="b-event-m-1st__sport-type mt-3">
      <Dropdown
        :outside-title="true"
        :main-title="$t('events.sport-type')"
        :placeholder="$t('events.sport-type')"
        :options="mockData.typeOfSportDropdown"
        display-name="name"
        display-value="value"
        :width="320"
        :height="40"
        name="type"
      />
    </div>
    <div class="b-event-m-1st__time-and-date mt-3">
      <div class="b-event-m-1st__input-calendar">
        <div class="b-event-m-1st__label">
          {{ $t('events.date') }}
        </div>
        <v-date-picker
          locale="ukr"
          :model-config="calendar.modelConfig"
          v-model="initialDate"
        >
          <template #default="options">
            <div class="b-event-m-1st__calendar-cover">
              <input
                class="py-1 border rounded"
                :value="options.inputValue"
                v-on="options.inputEvents"
                name="date"
              />
            </div>
          </template>
        </v-date-picker>
        <img src="../../assets/img/calendar.svg" alt="" />
      </div>
      <div class="b-event-m-1st__input-time">
        <InputComponent
          :outside-title="true"
          :title="'Початок'"
          :placeholder="'17:00'"
          :title-width="0"
          name="time"
        />
      </div>
      <div class="b-event-m-2st__input-time">
        <InputComponent
          :outside-title="true"
          :title="'Кінець'"
          :placeholder="'18:10'"
          :title-width="0"
          name="time"
        />
      </div>
    </div>
    <div class="b-event-m-1st__input-location">
      <!-- <InputComponent
        :placeholder="$t('events.place')"
        :title-width="0"
        :icon="icons.location"
        name="location"
      /> -->
      <ModalPositionMap v-model="userLocation"></ModalPositionMap>
    </div>
    <div class="b-event-m-1st__event-map">
      <img src="../../assets/img/map-manage-event.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

import Dropdown from '../forms/Dropdown.vue'
import InputComponent from '../forms/InputComponent.vue'
import RadioButton from '../forms/RadioButton.vue'
import ModalPositionMap from '../maps/ModalPositionMap.vue'

import CalendarPic from '../../assets/img/calendar.svg'
import WatchPic from '../../assets/img/watch.svg'
import LocationPic from '../../assets/img/location-point.svg'
import UniPic from '../../assets/img/unisex.svg'
import MalePic from '../../assets/img/male-icon.svg'
import FemalePic from '../../assets/img/female-icon.svg'

import CONSTANTS from '../../consts/index'

export default {
  components: {
    Dropdown,
    InputComponent,
    RadioButton,
    ModalPositionMap,
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    currentStep: {
      type: Number,
      default: null,
    },
  },
  emit: ['updateDate'],
  setup(props, { emit }) {
    const initialDate = ref(new Date())
    const userLocation = ref('')

    const stepStyle = computed(() => {
      return props.currentStep === 1 ? { height: 'auto' } : { height: '0px' }
    })
    watch(
      () => initialDate.value,
      () => {
        emit('updateDate', initialDate.value)
      }
    )
    watch(
      () => userLocation.value,
      () => {
        emit('updateLocation', userLocation.value)
      }
    )

    const calendar = ref({
      inputMask: 'YYYY-MM-DD',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    })
    const icons = computed(() => {
      return {
        calendar: CalendarPic,
        watch: WatchPic,
        location: LocationPic,
        unisexIcon: UniPic,
        maleIcon: MalePic,
        femaleIcon: FemalePic,
      }
    })
    const mockData = computed(() => {
      return {
        typeOfEventDropdown: CONSTANTS.manage_event.type_of_event_dropdown,
        typeOfSportDropdown: CONSTANTS.manage_event.type_of_sport_dropdown,
      }
    })

    return {
      icons,
      mockData,
      initialDate,
      calendar,
      userLocation,
      stepStyle,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-event-m-1st {
  overflow: hidden;
  .b-event-m-1st__time-and-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-event-m-1st__input-calendar {
      flex-basis: 30%;
      margin-right: 12px;
      border: 1px solid #dfdeed;
      border-radius: 6px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      width: 154px;
      min-width: 154px;
      position: relative;
      .b-event-m-1st__label {
        position: absolute;
        left: 2px;
        top: -8px;
        padding: 0px 4px;
        background: #ffffff;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #575775;
      }
      .b-event-m-1st__calendar-cover {
        width: 100%;
        input {
          height: 40px;
          border: transparent;
          width: 100%;
        }
      }
    }
    .b-event-m-1st__input-time {
      flex-basis: 30%;
      margin-right: 12px;
    }

    .b-event-m-2st__input-time {
      flex-basis: 30%;
    }
  }
  .b-event-m-1st__input-location {
    width: 100%;
    height: 40px;
    margin-top: 16px;
  }
  .b-event-m-1st__title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: #262541;
  }
  .b-event-m-1st__radio-btn-wrapper {
    margin-top: 12px;
    $color1: #f4f4f4;
    $color2: #148783;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .radio-cover {
      flex-basis: 30%;
      &:not(:last-child) {
        margin-right: 10px;
      }
      ::v-deep {
        .b-radio {
          margin-right: 0;
          .b-radio-label::before {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .b-event-m-1st__event-map {
    margin-top: 16px;
  }
}
</style>
