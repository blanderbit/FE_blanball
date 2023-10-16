<template>
  <Transition>
    <ModalWindow
      :is-title-shown="false"
      :window-width="332"
      @closeModal="$emit('closeModal')"
    >
      <template #modal-filter>
        <div class="b-modal-filters">
          <div class="b-modal-filters__title">
            {{ $t('users.filters') }}
          </div>
          <div class="b-modal-filters__subtitle">
            {{  $t('users.found-users', { count: elementsCount }) }}
          </div>
          <div class="b-modal-filters__game-type-input">
            <dropdown
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
            <RangeFilter v-model:age-range="ageRangeData" />
          </div>
          <div class="b-modal-filters__gender">
            <RadioGenderBox v-model:gender="genderData" />
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
 

import ModalWindow from '@sharedComponents/modals/ModalWindow.vue';
import dropdown from '@sharedComponents/dropdown/Dropdown.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import RangeFilter from '@mainComponents/filters/components/RangeFilter.vue';
import RadioGenderBox from '@mainComponents/filters/components/RadioGenderBox.vue';

import tickIcon from '@images/tick-white.svg';

import { CONSTS } from '@consts/index';

export default {
  name: 'ModalUsersFilters',
  components: {
    ModalWindow,
    GreenBtn,
    dropdown,
    RangeFilter,
    RadioGenderBox,
  },
  props: {
    dropdownPosition: {
      type: String,
      default: '',
    },
    rangeSlider: {
      type: Array,
      default: () => [],
    },
    gender: {
      type: String,
      default: '',
    },
    elementsCount: {
      type: Number,
      default: 0,
    },
  },
  emits: [
    'closeModal',
    'setModalWindowFilters',
    'clearFilters',
    'update:dropdownPosition',
    'update:rangeSlider',
    'update:gender',
  ],
  setup(props, { emit }) {
    const positionData = ref(props.dropdownPosition);
    const ageRangeData = ref(props.rangeSlider);
    const genderData = ref(props.gender);

    const positions = computed(() => CONSTS.profile.position);
    const icon = computed(() => tickIcon);

    watch(
      () => genderData.value,
      (newVal) => {
        emit('update:gender', newVal);
      }
    );
    watch(
      () => ageRangeData.value,
      (newVal) => {
        emit('update:rangeSlider', newVal);
      }
    );
    watch(
      () => positionData.value,
      (newVal) => {
        emit('update:dropdownPosition', newVal);
      }
    );

    function setFilters() {
      emit('setModalWindowFilters');
      emit('closeModal');
    }
    function clearAllData() {
      emit('clearFilters');
      emit('closeModal');
      positionData.value = '';
      ageRangeData.value = []
      genderData.value = '';
    }

    return {
      setFilters,
      clearAllData,
      positions,
      icon,
      positionData,
      ageRangeData,
      genderData,
    };
  },
};
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
    color: $--b-main-gray-color;
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
      color: $--b-main-black-color;
      padding: 4px 12px;
      cursor: pointer;
    }
  }
}
</style>
