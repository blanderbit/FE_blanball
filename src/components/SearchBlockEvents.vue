<template>
  <div class="b-main-search__wrapper">
    <div class="b-main-search__search-block">
      <div class="b-main-search__first-line">
        <div class="b-main-search__left-block">
          <div class="b-main-search__old-new-filter">
            <img src="../assets/img/sort-arrows.svg" alt="" />
            {{ $t('events.new-first') }}
          </div>
          <div class="b-main-search__dropdown-wrapper-game">
            <Dropdown :options="sportTypeDropdown" display-value="value" />
          </div>
          <div class="b-main-search__dropdown-wrapper-tournament">
            <Dropdown :options="sportTypeDropdown" display-value="value" />
          </div>
        </div>
        <div class="b-main-search__right-block">
          <div class="b-main-search__search-input-desktop">
            <InputComponent
              :title-width="0"
              :placeholder="$t('events.search-events')"
              :icon="searchIcon"
            />
          </div>
          <div class="b-main-search__search-input-tablet">
            <img src="../assets/img/search.svg" alt="" />
          </div>
          <div class="b-main-search__icon-container">
            <img src="../assets/img/clear-filter.svg" alt="" />
          </div>
          <div class="b-main-search__icon-container">
            <img
              class="b-main-search__set-filter"
              src="../assets/img/cross.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="b-main-search__second-line">
        <div class="b-main-search__left-side">
          <div class="b-main-search__dropdown-wrapper-gender">
            <Dropdown :options="genderDropdown" display-value="value">
              <template #drop-icon>
                <img src="../assets/img/male-icon.svg" alt="" />
              </template>
            </Dropdown>
          </div>
          <div class="b-main-search__calendar">
            <img src="../assets/img/calendar.svg" alt="" />
            <v-date-picker locale="ukr" v-model="range" is-range>
              <template v-slot="{ inputValue, inputEvents }">
                <div class="flex justify-center items-center">
                  <input
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                    class="input-left border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                  />
                  -
                  <input
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                    class="input-right border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                  />
                </div>
              </template>
            </v-date-picker>
          </div>
          <div class="b-main-search__dropdown-wrapper-cities">
            <Dropdown :options="citiesDropdown" display-value="value">
            </Dropdown>
          </div>
        </div>
        <div class="b-main-search__right-side">
          <div class="b-main-search__free-pay-games">
            <div
              :class="[
                'b-main-search__grey-block',
                plan === 'free' ? 'right' : 'left',
              ]"
            ></div>
            <div class="b-main-search__all" @click="changePlanSearch('all')">
              {{ $t('events.all') }}
            </div>
            <div class="b-main-search__free" @click="changePlanSearch('free')">
              {{ $t('events.free') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-main-search__search-block-mob">
      <div class="b-main-search__filters-block">
        <div class="b-main-search__sorting-block sort-item">
          <div class="b-main-search__icon">
            <img src="../assets/img/sort-arrows.svg" alt="" />
          </div>
          <div class="b-main-search__text">
            <div class="b-main-search__title">{{ $t('events.sorting') }}</div>
            <div class="b-main-search__terms">{{ $t('events.first-new') }}</div>
          </div>
        </div>
        <div class="b-main-search__filtering-block sort-item">
          <div class="b-main-search__icon">
            <img src="../assets/img/set-filter.svg" alt="" />
          </div>
          <div class="b-main-search__text">
            <div class="b-main-search__title">{{ $t('events.filters') }}</div>
            <div class="b-main-search__terms">
              {{ $t('events.found') }} 15 {{ $t('events.advertisments') }}
            </div>
          </div>
        </div>
        <div class="b-main-search__calendar-block sort-item">
          <div class="b-main-search__icon">
            <img src="../assets/img/calendar.svg" alt="" />
          </div>
          <div class="b-main-search__text">
            <div class="b-main-search__title">
              {{ $t('events.chose-date') }}
            </div>
            <div class="b-main-search__terms">19, 23 черв. 2022</div>
          </div>
        </div>
      </div>
      <div class="b-main-search__dates-block">
        <div class="b-main-search__months">
          <div class="b-main-search__wrapper">
            <div class="b-main-search__arrow arrow-left">
              <img src="../assets/img/arrow-left.svg" alt="" />
            </div>
            <div class="b-main-search__main-part">
              {{ $t('events.months.June') }} 2022
            </div>
            <div class="b-main-search__arrow arrow-right">
              <img src="../assets/img/arrow-right.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, reactive } from 'vue'

import Dropdown from './forms/Dropdown.vue'
import InputComponent from './forms/InputComponent.vue'

import search from '../assets/img/search.svg'

export default {
  components: {
    Dropdown,
    InputComponent,
  },
  props: {
    sportTypeDropdown: {
      type: Array,
      default: () => [],
    },
    genderDropdown: {
      type: Array,
      default: () => [],
    },
    citiesDropdown: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const plan = ref('free')
    const range = reactive({
      start: new Date(2020, 9, 12),
      end: new Date(2020, 9, 16),
    })

    const searchIcon = computed(() => {
      return search
    })

    function changePlanSearch(val) {
      plan.value = val
    }

    return {
      plan,
      searchIcon,
      changePlanSearch,
      range,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/search-event.block.scss';
</style>
