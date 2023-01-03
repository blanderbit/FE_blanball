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
              :main-title="$t('users.position')"
              :options="positions"
              :placeholder="$t('users.position')"
              display-name="name"
              display-value="value"
              v-model="positionData"
              name="position"
            />
          </div>
          <div class="b-modal-filters__age-range">
            <RangeFilter 
              v-model:age-range="ageRangeData"
            />
          </div>
          <div class="b-modal-filters__gender">
            <RadioGenderBox
              v-model:gender="genderData"
            />
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
import RangeFilter from './components/RangeFilter.vue'
import RadioGenderBox from './components/RadioGenderBox.vue'

import tickIcon from '../../assets/img/tick-white.svg'

import CONSTANTS from "../../consts/index";

export default {
  name: 'ModalUsersFilters',
  components: {
    ModalWindow,
    GreenBtn,
    Dropdown,
    RangeFilter,
    RadioGenderBox
  },
  props: {
    dropdownPosition: {
      type: String,
      default: ''
    },
    rangeSlider: {
      type: Array,
      default: () => []
    },
    gender: {
      type: String,
      default: ''
    }
  },
  emits: [
    'closeModal', 
    'setModalWindowFilters',
    'clearFilters',
    'update:dropdownPosition', 
    'update:rangeSlider', 
    'update:gender'
  ],
  setup(props, { emit }) {
    const positionData = ref(props.dropdownPosition)
    const ageRangeData = ref(props.rangeSlider)
    const genderData = ref(props.gender)

    const positions = computed(() => CONSTANTS.profile.position)
    const icon = computed(() => tickIcon)
    
    watch(() => props.rangeSlider, (newVal) => {
      console.log(newVal)
    })

    watch(() => genderData.value, (newVal) => {
      emit('update:gender', newVal)
    })
    watch(() => ageRangeData.value, (newVal) => {
      emit('update:rangeSlider', newVal)
    })
    watch(() => positionData.value, (newVal) => {
      emit('update:dropdownPosition', newVal)
    })

    function setFilters() {
      emit('setModalWindowFilters')
      emit('closeModal')
    }
    function clearAllData() {
      emit('clearFilters')
      positionData.value = ''
      // ageRangeData.value = []
      genderData.value = ''
    }

    return {
      setFilters,
      clearAllData,
      positions,
      icon,
      positionData,
      ageRangeData,
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
    margin-bottom: 16px;
  }
  &__age-range {
    margin-bottom: 16px;
  }
  &__gender {

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