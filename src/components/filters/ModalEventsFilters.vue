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
          <div class="b-modal-filters__gender">
            <RadioGenderBox
              v-model:gender="genderData"
            />
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
          <div class="b-modal-filters__btns-block">
            <div 
              class="b-modal-filters__cancel-btn"
              @click="clearAllData"
            >
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

import ModalWindow from '../ModalWindow.vue'
import Dropdown from '../forms/Dropdown.vue'
import GreenBtn from '../GreenBtn.vue'
import RadioGenderBox from './components/RadioGenderBox.vue'
import ModalPositionMap from '../maps/ModalPositionMap.vue'
import ClearFilters from './components/ClearFilters.vue'

import tickIcon from '../../assets/img/tick-white.svg'

import CONSTANTS from "../../consts/index";

export default {
  name: 'ModalUsersFilters',
  components: {
    ModalWindow,
    GreenBtn,
    Dropdown,
    RadioGenderBox,
    ClearFilters,
    ModalPositionMap
  },
  props: {
    dropdownGameType: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    location: {
      type: Object,
      default: ''
    }
  },
  emits: [
    'closeModal', 
    'setModalWindowFilters',
    'clearFilters',
    'update:dropdownGameType',
    'update:gender',
    'update:status',
    'update:location'
  ],
  setup(props, { emit }) {
    const gameTypeData = ref(props.dropdownGameType)
    const gameStatusData = ref(props.status)
    const genderData = ref(props.gender)
    const locationData = ref(props.location)

    const sportTypeDropdown = CONSTANTS.event_page.sport_type_dropdown;
    const statusDropdown = CONSTANTS.event_page.status_ropdown;

    const icon = computed(() => tickIcon)
    
    watch(() => genderData.value, (newVal) => {
      emit('update:gender', newVal)
    })
    watch(() => gameTypeData.value, (newVal) => {
      emit('update:dropdownGameType', newVal)
    })
    watch(() => gameStatusData.value, (newVal) => {
      emit('update:status', newVal)
    })
    watch(() => locationData.value, (newVal) => {
      emit('update:location', newVal)
    })

    function setFilters() {
      emit('setModalWindowFilters')
      emit('closeModal')
    }
    function clearAllData() {
      emit('clearFilters')
      gameStatusData.value = ''
      gameTypeData.value = ''
      locationData.value = {}
      genderData.value = ''
    }

    return {
      setFilters,
      clearAllData,
      statusDropdown,
      sportTypeDropdown,
      icon,
      gameStatusData,
      gameTypeData,
      locationData,
      genderData
    }
  }
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
    color: #262541;
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
      color: #262541;
      padding: 4px 12px;
      cursor: pointer;
    }
  }
}




</style>