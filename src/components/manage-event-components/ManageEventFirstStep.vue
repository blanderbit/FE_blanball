<template>
  <div class="b-event-m-1st" :style="stepStyle">
    <div class="b-event-m-1st__title-general mb-2">
      {{ $t('events.general-info') }}
    </div>
    <Dropdown
      style="margin-top: 10px;"
      :outside-title="true"
      :main-title="$t('events.event-type')"
      :placeholder="$t('events.event-type')"
      :disabled="true"
      :initValue="$t('events.friends-match')"
      display-name="name"
      display-value="value"
      :width="320"
      :height="40"
      name="game-type"
    />
    <div class="b-event-m-2st__input-name">
      <InputComponent
        :outside-title="true"
        :title="$t('events.event-name')"
        :placeholder="$t('events.event-name-placeholder')"
        :title-width="0"
        name="name"
      />
    </div>
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
    <div class="b-event-m-1st__title mt-3 mb-2">
      {{ $t('events.when-event-start') }}
    </div>
    <div class="b-event-m-1st__time-and-date mt-3">
      <div class="b-event-m-1st__input-calendar">
        <div class="b-event-m-1st__label">
          {{ $t('events.date') }}
        </div>
        <v-date-picker
          class="b-main-search__calendar"
          locale="ukr"
          :model-config="calendar.modelConfig"
          v-model="initialDate"
          :min-date="minEventDate"
          name="date"
        >
          <template #default="options">
            <div class="b-event-m-1st__calendar-cover">
              <input
                class="py-1 border rounded"
                :value="options.inputValue"
                readonly
                v-on="options.inputEvents"
                name="date"
                v-maska="'##.##.####'"
              />
            </div>
          </template>
        </v-date-picker>
        <img src="../../assets/img/calendar.svg" alt="" />
      </div>
      <span class="b-event-m-1st__subtitle">Оберіть із запропонованих або встановіть час власноруч</span>
      <div class="b-event-m-1st__input-time">
        <InputComponent
          :outside-title="true"
          :title="$t('events.start')"
          :placeholder="'17:00'"
          :title-width="0"
          name="time"
          v-maska="'##:##'"
        />
      </div>
      <div class="b-event-m-2st__input-time">
        <InputComponent
          :outside-title="true"
          :title="$t('events.end')"
          :placeholder="'18:10'"
          :title-width="0"
          name="end_time"
          v-maska="'##:##'"
        />
      </div>
    </div>
    <div class="b-event-m-2st__duration-select">
      <div v-for="option in eventDurationOptions" 
        :class="['b-event-m-2st__duration-item', 
        {'b-event-m-2st__duration-item-selected': option.id === selectedDurationID}]"
        @click="selectEventDuration(option)">
        <span>{{ option.text }}</span>
      </div>
    </div>
    <div class="b-event-m-1st__title mt-3 mb-2">
      {{ $t('events.place') }}
    </div>
    <ModalPositionMap  
        class="b-event-m-1st__input-location" 
        v-model="eventLocation">
    </ModalPositionMap>
    <ErrorMessage class="b-event-location__error-message" name="place.place_name"/>
    <div v-if="eventLocation.lat && eventLocation.lng" class="b-event-m-1st__event-map">
      <position-map
        :coords="eventLocationOnMap" 
        @map-loaded="loading = false"
        disable-change-coords>
      </position-map>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

import { ErrorMessage } from '@system.it.flumx.com/vee-validate'

import dayjs from 'dayjs'

import Dropdown from '../forms/Dropdown.vue'
import InputComponent from '../forms/InputComponent.vue'
import RadioButton from '../forms/RadioButton.vue'
import PositionMap from '../maps/PositionMap.vue'
import ModalPositionMap from '../maps/ModalPositionMap.vue'

import CONSTANTS from '../../consts/index'

import CalendarPic from '../../assets/img/calendar.svg'
import WatchPic from '../../assets/img/watch.svg'
import LocationPic from '../../assets/img/location-point.svg'
import UniPic from '../../assets/img/unisex.svg'
import MalePic from '../../assets/img/male-icon.svg'
import FemalePic from '../../assets/img/female-icon.svg'

const eventDurationOptions = ref([
  {
    id: 0,
    text: '30 хв',
    value: 30*60000
  },
  {
    id: 1,
    text: '60 хв',
    value: 60*60000
  },
  {
    id: 2,
    text: '1,5 год',
    value: 90*60000
  },
  {
    id: 3,
    text: '2 год',
    value: 120*60000
  },
])

export default {
  components: {
    Dropdown,
    InputComponent,
    RadioButton,
    ModalPositionMap,
    PositionMap,
    ErrorMessage,
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
  emits: [
    'changeEventLocation', 
    'changeEventDate', 
    'selectEventDuration'
  ],

  setup(props, { emit }) {
    const initialDate = ref(new Date())
    const eventLocation = ref({lat: '', lng: ''})
    const eventLocationOnMap = ref({})
    const selectedDurationID = ref('')
    const minEventDate = ref(new Date().toISOString().slice(0, 10))

    watch(() => eventLocation.value, (newData, oldData) => {
      emit('changeEventLocation', newData)
      
      eventLocationOnMap.value = {lat: newData.lat, lng: newData.lng}
    })


    watch(() => initialDate.value, (newData, oldData) => {
      emit('changeEventDate', newData)
    })


    const setEventInitDate = () => {
      emit('changeEventDate', dayjs(initialDate.value).format('YYYY-MM-DD'))
    }

    const stepStyle = computed(() => {
      return props.currentStep === 1 ? { height: 'auto' } : { height: '0px' }
    })

    const calendar = ref({
      inputMask: 'YYYY-MM-DD',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    })

    const selectEventDuration = (data) => {
      selectedDurationID.value = data.id

      emit('selectEventDuration', data.value)
    }

  
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

    setEventInitDate()

    return {
      icons,
      mockData,
      initialDate,
      calendar,
      eventLocationOnMap,
      eventLocation,
      stepStyle,
      eventDurationOptions,
      minEventDate,
      selectedDurationID,
      selectEventDuration,
    }
  },
}
</script>

<style lang="scss" scoped>

// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;
 $color-f4f4f4: #f4f4f4;
 $color-6f6f77: #6f6f77;
 $color-f0f0f4: #f0f0f4;


@import '../../assets/styles/calendar.scss';
.b-event-m-1st {
  overflow: hidden;

  .b-event-m-1st__title-general {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: $--b-main-black-color;
  }
  .b-event-m-2st__input-name {
    margin-top: 20px;
  }
  .b-event-m-1st__time-and-date {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .b-event-m-1st__input-calendar {
      width: 100%;
      margin-right: 12px;
      border: 1px solid $color-dfdeed;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      position: relative;
      .b-event-m-1st__label {
        position: absolute;
        left: 2px;
        top: -8px;
        padding: 0px 4px;
        background: $--b-main-white-color;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: $--b-main-gray-color;
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
      flex-basis: 100%;
    }

    .b-event-m-2st__input-time {
      flex-basis: 100%;
    }
  }
  .b-event-m-1st__input-location {
    min-width: 100%;
    border: 1px solid #DFDEED;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 12px 8px 12px 12px;
    margin-top: 16px;

    &::v-deep(.b-modal-position__address-text) {
      justify-content: space-between;
      flex-direction: row-reverse;
    }

    .b-event-m-1st__location-map {
      width: 100%;
    }
  }
    .b-event-m-1st__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: $--b-main-black-color;
    }
  .b-event-m-1st__radio-btn-wrapper {
    margin-top: 12px;
    $color1: $color-f4f4f4;
    $color2: $--b-main-green-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .radio-cover {
      flex-basis: 50%;
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
    height: 200px;
  }
}
.b-event-location__error-message {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $--b-error-color;
}
.b-event-m-1st__subtitle {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: $--b-main-gray-color;
  margin-bottom: 10px;
}
.b-event-m-2st__duration-select {
  border: 1px solid #DFDEED;
  border-radius: 6px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .b-event-m-2st__duration-item {
    flex-basis: 25%;
    background: $--b-main-white-color;
    border-radius: 4px;
    padding: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    text-align: center;  
    color: #6F6F77;
    cursor: pointer;

    &-selected {
      background: #F0F0F4;
      color: $--b-main-black-color;
      font-weight: 500;
    }
  }
}
</style>
